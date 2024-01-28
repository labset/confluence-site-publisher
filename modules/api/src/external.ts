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
interface SpaceWithHomePage {
    id: string;
    key: string;
    name: string;
    homepage: {
        id: string;
        title: string;
    };
}

interface ContentData {
    id: string;
    title: string;
    type: 'page' | 'blogpost';
}

interface ContentById {
    results: Array<{
        excerpt: string;
        content: ContentData & {
            body: {
                atlas_doc_format: {
                    value: string;
                };
            };
            children: {
                page?: {
                    results: Array<ContentData>;
                };
            };
        };
    }>;
}

export type { ContentById, SpaceWithHomePage };
