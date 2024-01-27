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
import * as path from 'path';

interface Store {
    site: {
        home: string;
        pages: string;
        blogs: string;
    };
    templates: string;
}

const initStore = ({
    spaceKey,
    destination
}: {
    spaceKey: string;
    destination: string;
}): Store => {
    const siteOutput = path.resolve(destination, 'site', spaceKey);
    const templatesOutput = path.resolve(destination, 'templates', spaceKey);
    return {
        site: {
            home: siteOutput,
            pages: path.resolve(siteOutput, 'notes'),
            blogs: path.resolve(siteOutput, 'articles')
        },
        templates: templatesOutput
    };
};

export { initStore };
export type { Store };
