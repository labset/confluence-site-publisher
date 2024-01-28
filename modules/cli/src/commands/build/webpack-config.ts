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

import { listFiles } from '@labset/fs-directory';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';

interface WebpackConfigProps {
    spaceKey: string;
}

// noinspection JSUnresolvedReference
const isDev = process.env.NODE_ENV === 'development';

const webpackConfig = ({
    spaceKey
}: WebpackConfigProps): { config: Configuration; siteOutput: string } => {
    const siteSources = path.join(__dirname, '..', '..', 'site', 'entry');
    const siteOutput = path.join(process.cwd(), 'output', 'site', spaceKey);

    const templates = path.join(process.cwd(), 'output', 'templates', spaceKey);
    const indexFiles = listFiles(templates, {
        fileFilter: (entry) => entry.name === 'index.html',
        directoryFilter: () => true
    });
    const htmlPlugins = indexFiles.map((template) => {
        const filename = template.replace(`${templates}/`, '');
        return new HtmlWebpackPlugin({
            template,
            filename
        });
    });
    const plugins = [...htmlPlugins];

    const siteEntry = isDev
        ? path.resolve(siteSources, 'index.tsx')
        : path.resolve(siteSources, 'index.js');

    const config: Configuration = {
        mode: 'development',
        entry: {
            site: siteEntry
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/'
                }
            ]
        },
        target: 'web',
        output: {
            filename: '[name].js',
            path: siteOutput,
            publicPath: '/'
        },
        plugins
    };
    return { config, siteOutput };
};

export { webpackConfig };
