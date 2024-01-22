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
import type { SxProps } from "@mui/material";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import React, { ComponentType } from "react";

interface TopNavigationProps {
  Logo: ComponentType<{ sx?: SxProps }>;
  brand: string;
}

const TopNavigation = ({ Logo, brand }: TopNavigationProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Logo sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              marginRight: 2,
            }}
          >
            {brand}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { TopNavigation };
export type { TopNavigationProps };
