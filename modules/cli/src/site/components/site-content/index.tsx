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
import { Content } from "@labset/confsite-api";
import { LinearProgress, Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SiteContent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<Content | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get("data.json");
      return data;
    };
    fetchData()
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {loading && <LinearProgress color="inherit" />}
      {!loading && content && (
        <Box>
          <Typography variant="h3">{content.identifier.title}</Typography>
        </Box>
      )}
    </>
  );
};

export { SiteContent };
