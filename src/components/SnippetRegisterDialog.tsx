import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  langNames,
  langs,
  loadLanguage,
} from "@uiw/codemirror-extensions-langs";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

// 自作コンポーネント等
import {
  getGetApiSnippetsQueryKey,
  postApiSnippets,
} from "@/generated/api/snippets/snippets";
import { SnippetCreateWithoutUserInputSchema } from "@/generated/schemas/zod";
import { getWindowSize } from "@/hooks/useWindowSize";
import theme from "@/theme";
import RhfAutocompleteTextField from "./input/rhf/RhfAutocompleteTextField";
import RhfCodeEditor from "./input/rhf/RhfCodeEditor";
import RhfTagInput from "./input/rhf/RhfTagInput";
import RhfTextField from "./input/rhf/RhfTextField";

type Props = {
  open: boolean;
  onClose: () => void;
};

/// スニペット登録ダイアログ
const SnippetRegisterDialog = ({ open, onClose }: Props) => {
  // レイアウト調整
  // 画面小さい：全入力フォームを縦に表示
  // 画面大きい：エディタを横に表示
  // エディタを横に表示する際、高さは左側の入力フォームの高さに合わせる
  const { width } = getWindowSize();
  const formRef = useRef<HTMLDivElement>(null);
  const [editorHeight, setEditorHeight] = useState(0);
  useEffect(() => {
    if (formRef.current) {
      setEditorHeight(formRef.current.offsetHeight);
    }
  }, [open, width]);

  // フォームのバリデーション
  const { control, handleSubmit, reset, watch, setValue } = useForm({
    resolver: zodResolver(SnippetCreateWithoutUserInputSchema),
  });

  // ダイアログを閉じる際は入力内容をリセットする
  const onCloseThisDialog = () => {
    reset();
    onClose();
  };

  // 登録ボタンがクリックされたときの処理
  const queryClient = useQueryClient();
  const { mutate } = useMutation(postApiSnippets, {
    onSuccess: () => {
      // 登録成功時はスニペット一覧を再取得する
      queryClient.invalidateQueries(getGetApiSnippetsQueryKey());
    },
  });
  const handleRegisterButtonClicked = (data: any) => {
    mutate(data);
    onCloseThisDialog();
  };

  return (
    <Dialog open={open} onClose={onCloseThisDialog} fullWidth maxWidth="sm">
      <DialogTitle>スニペット登録</DialogTitle>
      <DialogContent sx={{ py: 0 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Stack gap={1.5} my={1} ref={formRef}>
            {/* タイトル */}
            <RhfTextField name="title" label="Title" control={control} />

            {/* 言語 */}
            <RhfAutocompleteTextField
              name="language"
              control={control}
              options={langNames}
              textFieldProps={{
                label: "Language",
              }}
              autocompleteProps={{
                onChange: (_, value) => setValue("language", value),
              }}
            />

            {/* コードエディタ(画面サイズが小さい場合) */}
            {width < theme.breakpoints.values.sm && (
              <RhfCodeEditor
                name="code"
                control={control}
                extensions={[loadLanguage(watch("language")) || langs.json()]}
              />
            )}

            {/* 説明 */}
            <RhfTextField
              name="description"
              label="Description"
              control={control}
            />

            {/* タグ */}
            <RhfTagInput
              name="tags"
              control={control}
              options={[]}
              textFieldProps={{
                label: "Tags",
              }}
            />
          </Stack>

          {theme.breakpoints.values.sm <= width && (
            <Stack flexGrow={1} alignSelf={"center"}>
              {/* コードエディタ(画面サイズが大きい場合) */}
              <RhfCodeEditor
                name="code"
                control={control}
                height={`${editorHeight}px`}
                extensions={[loadLanguage(watch("language")) || langs.json()]}
              />
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseThisDialog}>Cancel</Button>
        <Button onClick={handleSubmit(handleRegisterButtonClicked)}>
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SnippetRegisterDialog;
