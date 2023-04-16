import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Button, Container, Typography } from "@mui/material";
import { CodeSnippet } from "@prisma/client";

import SnippetCard from "@/components/SnippetCard";
import { useRouter } from "next/router";

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
    <Container maxWidth="md">
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
      {snippets.map((snippet: CodeSnippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </Container>
  );
};

export default Home;
