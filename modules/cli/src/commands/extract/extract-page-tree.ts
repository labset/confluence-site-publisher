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
import { confluenceApi } from '../../confluence-api';
import { Identifier } from '../../confluence-api/types';
import { Store } from '../../store';

import { extractContent } from './extract-content';

interface ExtractPageTreeProps {
    identifier: Identifier;
    asHomePage: boolean;
    store: Store;
}

const extractPageTree = async ({
    identifier,
    store,
    asHomePage
}: ExtractPageTreeProps) => {
    const content = await confluenceApi.getContentById(identifier.id);
    await extractContent({ content, store, asHomePage });
    for (const child of content.children) {
        await extractPageTree({ identifier: child, store, asHomePage: false });
    }
};

export { extractPageTree };
