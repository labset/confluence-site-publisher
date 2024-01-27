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

import ReactDOMServer from 'react-dom/server';

import { Content } from '../../confluence-api/types';
import { StaticWrapper } from '../../site/static-wrapper';
import { Store } from '../../store';

interface ExtractContentProps {
    content: Content;
    store: Store;
    asHomePage: boolean;
}

const resolveContentPath = ({
    content,
    store,
    asHomePage
}: ExtractContentProps) => {
    if (asHomePage) {
        return store.site.home;
    }
    const root = content.type === 'page' ? store.site.pages : store.site.blogs;
    return path.resolve(root, content.identifier.id);
};

const saveContentHtml = async ({
    content,
    store,
    asHomePage
}: ExtractContentProps) => {
    const indexHtml = ReactDOMServer.renderToStaticMarkup(
        StaticWrapper({ content })
    );
    const target = content.type === 'page' ? 'notes' : 'articles';
    const templatePath = asHomePage
        ? store.templates
        : path.resolve(store.templates, target, content.identifier.id);
    fs.mkdirSync(templatePath, { recursive: true });
    fs.writeFileSync(
        path.resolve(templatePath, 'index.html'),
        `<!DOCTYPE html>\n${indexHtml}`
    );
};

const extractContent = async ({
    content,
    store,
    asHomePage
}: ExtractContentProps) => {
    console.info(`📝 process content:`, content.identifier);
    const contentPath = resolveContentPath({ content, store, asHomePage });
    fs.mkdirSync(contentPath, { recursive: true });
    fs.writeFileSync(
        path.resolve(contentPath, 'data.json'),
        JSON.stringify(content)
    );

    await saveContentHtml({ content, store, asHomePage });
};

export { extractContent };
