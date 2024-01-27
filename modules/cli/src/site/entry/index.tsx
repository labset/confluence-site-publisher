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
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useMemo } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import { SiteContent } from "../components/site-content";
import { SiteLayout } from "../components/site-layout";
import { TopNavigationProps } from "../components/site-layout/top-navigation";

const Site = () => {
  const topNav: TopNavigationProps = {
    Logo: LocalLibraryIcon,
    brand: "viqueen.org",
  };
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode: "dark" },
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SiteLayout topNav={topNav}>
        <SiteContent />
      </SiteLayout>
    </ThemeProvider>
  );
};

const rootContainer = document.querySelector("#root");
if (rootContainer) {
  if (rootContainer.hasChildNodes()) {
    hydrateRoot(rootContainer, <Site />);
  } else {
    createRoot(rootContainer).render(<Site />);
  }
}
