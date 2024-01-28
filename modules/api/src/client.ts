/**
 * Copyright 2024 Labset (viqueen)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { config } from '@labset/confsite-cli/dist/config';
import type { AxiosInstance } from 'axios';
import axios, { AxiosError } from 'axios';

import { ContentById, SpaceWithHomePage } from './external';
import {
    Content,
    Identifier,
    ResourceDefinition,
    ResourceObject
} from './types';

interface ConfluenceApi {
    getSpaceHomepageIdentifier: (input: {
        spaceKey: string;
    }) => Promise<Identifier>;
    getContentById: (input: { contentId: string }) => Promise<Content>;
    getObjects: (input: {
        resourceObjects: Array<ResourceObject>;
    }) => Promise<Array<{ body: { data: ResourceDefinition } }>>;
}

interface ConfluenceApiClientProps {
    hostname: string;
    username: string;
    token: string;
}

const axiosErrorHandler = (error: AxiosError) => {
    const { data, status, statusText } = error.response || {};
    console.error('failed request', { data, status, statusText });
    throw Error('failed request');
};

class ConfluenceApiClient implements ConfluenceApi {
    private readonly client: AxiosInstance;

    constructor({ hostname, username, token }: ConfluenceApiClientProps) {
        this.client = axios.create({
            baseURL: `https://${hostname}`,
            auth: {
                username,
                password: token
            }
        });
    }

    async getSpaceHomepageIdentifier({
        spaceKey
    }: {
        spaceKey: string;
    }): Promise<Identifier> {
        const { data } = await this.client
            .get<SpaceWithHomePage>(
                `/wiki/rest/api/space/${spaceKey}?expand=homepage`
            )
            .catch(axiosErrorHandler);
        const { id, title } = data.homepage;
        return { id, title };
    }

    async getContentById({
        contentId
    }: {
        contentId: string;
    }): Promise<Content> {
        const contentExpansions = [
            'content.body.atlas_doc_format',
            'content.children.page.metadata.properties.emoji_title_published',
            'content.children.attachment.metadata.labels',
            'content.ancestors',
            'content.history',
            'content.metadata.properties.emoji_title_published',
            'content.metadata.labels'
        ];
        const query = new URLSearchParams({
            cql: `id=${contentId}`,
            expand: contentExpansions.join(',')
        });
        const { data } = await this.client
            .get<ContentById>(`/wiki/rest/api/search?${query.toString()}`)
            .catch(axiosErrorHandler);
        const item = data.results[0];
        const { id, title, type, body, children } = item.content;
        return {
            identifier: { id, title },
            type,
            body: JSON.parse(body.atlas_doc_format.value),
            children:
                children.page?.results.map((child) => ({
                    id: child.id,
                    title: child.title
                })) ?? []
        };
    }

    async getObjects({
        resourceObjects
    }: {
        resourceObjects: ResourceObject[];
    }): Promise<{ body: { data: ResourceDefinition } }[]> {
        const { data } = await this.client
            .post(
                '/gateway/api/object-resolver/resolve/batch',
                resourceObjects,
                {
                    headers: {
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        cookie: `tenant.session.token=${config.CONFLUENCE_CLOUD_TOKEN}`
                    }
                }
            )
            .catch(axiosErrorHandler);
        return data;
    }
}

export type { ConfluenceApi };
export { ConfluenceApiClient };
