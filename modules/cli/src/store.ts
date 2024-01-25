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
    pages: string;
    blogs: string;
}

const initStore = ({
    spaceKey,
    destination
}: {
    spaceKey: string;
    destination: string;
}): Store => {
    const output = path.resolve(destination, 'site', spaceKey);
    return {
        pages: path.resolve(output, 'notes'),
        blogs: path.resolve(output, 'articles')
    };
};

export { initStore };
export type { Store };
