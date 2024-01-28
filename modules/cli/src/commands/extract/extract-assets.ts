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
import fs from 'fs';
import path from 'path';

import { traverse } from '@atlaskit/adf-utils/traverse';
import type { ADFEntity } from '@atlaskit/adf-utils/types';
import { Content } from '@labset/confsite-api';
import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { Store } from '../../store';

interface ExtractAssetsProps {
    content: Content;
    store: Store;
}

const UUID_REGEX =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const fetchEmoji = async (client: AxiosInstance, id: string, store: Store) => {
    const targetFile = path.resolve(store.site.assets.emojis, `${id}.png`);
    if (fs.existsSync(targetFile)) return;
    if (id.match(UUID_REGEX)) return;

    const targetUrl = id.startsWith('atlassian')
        ? `/atlassian/${id.split('-')[1]}_64.png`
        : `/standard/caa27a19-fc09-4452-b2b4-a301552fd69c/64x64/${id}.png`;

    return client
        .get(`${targetUrl}`, { responseType: 'stream' })
        .then((response) => ({ stream: response.data }))
        .then(({ stream }) => {
            const file = fs.createWriteStream(targetFile);
            return stream.pipe(file);
        });
};

const extractEmojis = async ({ content, store }: ExtractAssetsProps) => {
    const client = axios.create({
        baseURL:
            'https://pf-emoji-service--cdn.us-east-1.prod.public.atl-paas.net'
    });

    if (content.emoji) await fetchEmoji(client, content.emoji, store);

    traverse(content.body, {
        emoji: (node: ADFEntity) => {
            if (!node.attrs) return;
            fetchEmoji(client, node.attrs.id, store);
        }
    });
};

const extractAssets = async ({ content, store }: ExtractAssetsProps) => {
    await extractEmojis({ content, store });
};

export { extractAssets };
