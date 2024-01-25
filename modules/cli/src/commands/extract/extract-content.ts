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
import * as fs from 'fs';
import * as path from 'path';

import { Content } from '../../confluence-api/types';
import { Store } from '../../store';

interface ExtractContentProps {
    content: Content;
    store: Store;
}

const resolveContentPath = ({ content, store }: ExtractContentProps) => {
    const root = content.type === 'page' ? store.pages : store.blogs;
    const target = path.resolve(root, content.identifier.id);
    fs.mkdirSync(target, { recursive: true });
    return target;
};

const extractContent = async ({ content, store }: ExtractContentProps) => {
    console.info(`📝 process content:`, content.identifier);
    const contentPath = resolveContentPath({ content, store });
    fs.writeFileSync(
        path.resolve(contentPath, 'data.json'),
        JSON.stringify(content)
    );
};

export { extractContent };
