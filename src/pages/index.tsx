import { useEffect, useState } from "react";

import Masonry from "@mui/lab/Masonry";
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { signIn, useSession } from "next-auth/react";

import SnippetCard from "@/components/SnippetCard";
import SnippetRegisterDialog from "@/components/SnippetRegisterDialog";

import {
  getApiSnippets,
  getGetApiSnippetsQueryKey,
} from "@/generated/api/snippets/snippets";
import { CodeSnippet } from "@/generated/schemas/orval";

import type { NextPage } from "next";

const Home: NextPage = () => {
  // ログイン状態を取得する
  const { data: session, status } = useSession();

  // スニペット一覧を取得する
  const { data, isLoading, isError, error } = useQuery(
    getGetApiSnippetsQueryKey(),
    getApiSnippets
  );

  // SnippetRegisterDialogを表示するためのstateを定義する
  const [openRegisterDialog, setOpenRegisterDialog] = useState(true);
  // 入力フォーム(ダイアログ左側)の高さを取得するため、最初はダイアログを表示し、初回レンダリング時に閉じる
  useEffect(() => {
    setOpenRegisterDialog(false);
  }, []);

  // SnippetRegisterDialogを表示する
  const handleAddButtonClick = () => {
    setOpenRegisterDialog(true);
  };

  return (
    <Container maxWidth="lg">
      {/* 未ログイン時 */}
      {!session && (
        <Button variant="contained" color="primary" onClick={() => signIn()}>
          Sign In
        </Button>
      )}

      {/* ログイン時 */}
      {session && (
        <>
          <Stack gap={2} margin={2}>
            <Typography variant="h4">Code Snippets</Typography>
            {/* スニペット登録ボタン */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddButtonClick}
            >
              Add New Snippet
            </Button>

            {/* APIエラー発生時 */}
            {isError && (
              <Alert severity="error">
                <AlertTitle>データ取得エラー</AlertTitle>
                {/* {error?.message} */}
              </Alert>
            )}

            {/* スニペット一覧 */}
            {isLoading ? (
              // データ取得中
              <Stack alignItems={"center"}>
                <CircularProgress />
              </Stack>
            ) : (
              // データ取得完了
              <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={2}>
                {(data as AxiosResponse<CodeSnippet[], any>).data.map(
                  (snippet: CodeSnippet) => (
                    <SnippetCard key={snippet.id} snippet={snippet} />
                  )
                )}
              </Masonry>
            )}
          </Stack>

          {/* スニペット登録ダイアログ */}
          <SnippetRegisterDialog
            open={openRegisterDialog}
            onClose={() => setOpenRegisterDialog(false)}
          />
        </>
      )}
    </Container>
  );
};

export default Home;
