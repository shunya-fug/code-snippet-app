import { Button, Container, Stack, Typography } from "@mui/material";
import { CodeSnippet } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

import SnippetCard from "@/components/SnippetCard";
import SnippetRegisterDialog from "@/components/SnippetRegisterDialog";
import Masonry from "@mui/lab/Masonry";
import axios from "axios";

const Home: NextPage = () => {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  // SnippetRegisterDialogを表示するためのstateを定義する
  const [openRegisterDialog, setOpenRegisterDialog] = useState(true);
  // 入力フォーム(ダイアログ左側)の高さを取得するため、最初はダイアログを表示し、初回レンダリング時に閉じる
  useEffect(() => {
    setOpenRegisterDialog(false);
  }, []);

  const handleAddButtonClick = () => {
    // SnippetRegisterDialogを表示する
    setOpenRegisterDialog(true);
  };

  // スニペット一覧を取得する
  const fetchSnippets = async () => {
    try {
      const res = await axios.get<CodeSnippet[]>(
        "http://localhost:3000/api/snippets"
      );
      setSnippets(res.data);
    } catch (err) {
      console.error("【スニペット一覧取得エラー】", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSnippets();
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Stack gap={2} margin={2}>
        <Typography variant="h4">Code Snippets</Typography>
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

      {/* スニペット登録ダイアログ */}
      <SnippetRegisterDialog
        open={openRegisterDialog}
        onClose={() => setOpenRegisterDialog(false)}
      />
    </Container>
  );
};

export default Home;
