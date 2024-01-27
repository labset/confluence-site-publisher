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

import { Command } from 'commander';

import { webpackBuild } from './commands/build/webpack-build';
import { extractSpace } from './commands/extract';
import { initStore } from './store';

const program = new Command();

program
    .command(`extract <spaceKey>`)
    .description(`extract all content and media from a confluence space`)
    .action(async (spaceKey: string) => {
        const destination = path.resolve(process.cwd(), 'output');
        const store = initStore({ spaceKey, destination });
        await extractSpace({ spaceKey, store });
    });

program
    .command('build <spaceKey>')
    .description('builds the site resources for a given confluence space')
    .option('--serve', 'with dev server running', false)
    .option('--open', 'with open browser session in dev server', false)
    .action(async (spaceKey: string, options) => {
        await webpackBuild({ ...options, spaceKey });
    });

// eslint-disable-next-line @typescript-eslint/no-var-requires
program.version(require('../package.json').version);
program.parse(process.argv);
