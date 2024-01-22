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
import { randomUUID } from 'crypto';

import { prefix } from './index';

describe('prefix', () => {
    it('should prefix empty string', () => {
        const prefixed = prefix('');
        expect(prefixed).toEqual(`prefix_`);
    });
    it('should prefix any string', () => {
        const name = randomUUID();
        const prefixed = prefix(name);
        expect(prefixed).toEqual(`prefix_${name}`);
    });
});
