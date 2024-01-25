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

interface ExtractPageTreeProps {
    identifier: Identifier;
}

const extractPageTree = async ({ identifier }: ExtractPageTreeProps) => {
    const content = await confluenceApi.getContentById(identifier.id);
    console.info(`📝 process content:`, content.identifier);
    for (const child of content.children) {
        await extractPageTree({ identifier: child });
    }
};

export { extractPageTree };
