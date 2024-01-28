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

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

import { filter } from '@atlaskit/adf-utils/traverse';
import { Content } from '@labset/confsite-api';

import { api } from '../../api';
import { Store } from '../../store';

import { rewriteUrl } from './helpers/rewrite-url';

interface ExtractObjectsProps {
    content: Content;
    store: Store;
}

const extractObjects = async ({ content, store }: ExtractObjectsProps) => {
    const resourceObjects = filter(
        content.body,
        (node) => node.type === 'inlineCard'
    ).map((item) => {
        return {
            resourceUrl: item.attrs?.url
        };
    });
    if (resourceObjects.length < 1) return;

    const resolvedObjects = await api.getObjects({ resourceObjects });
    resolvedObjects.forEach((item) => {
        if (!item.body) {
            return;
        }
        const data = item.body.data;
        const { url, name, generator } = data;
        const definition = {
            name,
            generator,
            url: rewriteUrl(url),
            '@type': data['@type']
        };
        const urlHash = crypto
            .createHash('sha512')
            .update(definition.url)
            .digest('hex');
        fs.writeFileSync(
            path.resolve(store.site.objects, `${urlHash}.json`),
            JSON.stringify(definition)
        );
    });
};

export { extractObjects };
