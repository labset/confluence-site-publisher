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
import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { config } from '../config';

import { axiosErrorHandler } from './helpers';
import { Content, Identifier } from './types';

interface ConfluenceApi {
    getSpaceHomepageIdentifier: (spaceKey: string) => Promise<Identifier>;
    getSpaceBlogPosts: (spaceKey: string) => Promise<Content[]>;
    getContentById: (contentId: string) => Promise<Content>;
}

class ConfluenceApiClient implements ConfluenceApi {
    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: `https://${config.CONFLUENCE_SITE_NAME}`,
            auth: {
                username: config.CONFLUENCE_USERNAME,
                password: config.CONFLUENCE_API_TOKEN
            }
        });
    }

    async getSpaceHomepageIdentifier(spaceKey: string): Promise<Identifier> {
        const { data } = await this.client
            .get(`/wiki/rest/api/space/${spaceKey}?expand=homepage`)
            .catch(axiosErrorHandler);
        const { id, title } = data.homepage;
        return { id, title };
    }

    async getSpaceBlogPosts(spaceKey: string): Promise<Content[]> {
        const query = new URLSearchParams({
            cql: `space=${spaceKey} and type=blogpost order by created desc`,
            expand: 'content.history,content.metadata.labels,content.children.attachment.metadata.labels'
        });
        const { data } = await this.client
            .get(`/wiki/rest/api/search?${query.toString()}`)
            .catch(axiosErrorHandler);
        const { results } = data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return results.map((item: any) => {
            const { id, title } = item.content;
            return { id, title };
        });
    }

    async getContentById(contentId: string): Promise<Content> {
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
            .get(`/wiki/rest/api/search?${query.toString()}`)
            .catch(axiosErrorHandler);
        const item = data.results[0];
        const { id, title, type, children } = item.content;
        return {
            identifier: { id, title },
            type,
            children:
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                children.page?.results.map((child: any) => ({
                    id: child.id,
                    title: child.title
                })) ?? []
        };
    }
}

const confluenceApi = new ConfluenceApiClient();
export { confluenceApi };
export type { ConfluenceApi };
