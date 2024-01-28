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
import { ReactRenderer } from "@atlaskit/renderer";
import { Provider } from "@atlaskit/smart-card";
import { Content } from "@labset/confsite-api";
import React from "react";

import { dataProviders } from "./data-providers";
import { SimpleCardClient } from "./simple-card-client";

interface AtlaskitContentRendererProps {
  content: Content;
}

const AtlaskitContentRenderer = ({ content }: AtlaskitContentRendererProps) => {
  return (
    <Provider client={new SimpleCardClient()}>
      <ReactRenderer document={content.body} dataProviders={dataProviders()} />;
    </Provider>
  );
};

export { AtlaskitContentRenderer };
