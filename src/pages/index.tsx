import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Button, Container, Stack, Typography } from "@mui/material";
import { CodeSnippet } from "@prisma/client";

import SnippetCard from "@/components/SnippetCard";
import { useRouter } from "next/router";
import Masonry from "@mui/lab/Masonry";

const Home: NextPage = () => {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);

  const router = useRouter();

  const handleAddButtonClick = () => {
    router.push("/add");
  };

  useEffect(() => {
    const fetchSnippets = async () => {
      const res = await fetch("/api/snippets");
      const data = await res.json();
      setSnippets(data);
    };
    fetchSnippets();
  }, []);

  return (
    <Container maxWidth="lg">
      <Stack gap={2} margin={2}>
        <Typography variant="h4" gutterBottom>
          Code Snippets
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddButtonClick}
        >
          Add New Snippet
        </Button>
        <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={2}>
          {snippets.map((snippet: CodeSnippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </Masonry>
      </Stack>
    </Container>
  );
};

export default Home;
