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
import { Box, Container, Toolbar } from "@mui/material";
import React, { PropsWithChildren } from "react";

import { TopNavigation, TopNavigationProps } from "./top-navigation";

interface SiteLayoutProps {
  topNav: TopNavigationProps;
}

const SiteLayout = ({
  children,
  topNav,
}: PropsWithChildren<SiteLayoutProps>) => {
  return (
    <Box sx={{ display: "flex" }}>
      <TopNavigation Logo={topNav.Logo} brand={topNav.brand} />
      <Box component="main" sx={{ flexGrow: 2, p: 3 }}>
        <Toolbar />
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  );
};

export { SiteLayout };
export type { SiteLayoutProps };
