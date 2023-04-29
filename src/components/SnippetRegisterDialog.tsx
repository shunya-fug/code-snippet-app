import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import {
  langs,
  langNames,
  loadLanguage,
} from "@uiw/codemirror-extensions-langs";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { CodeSnippetCreateInputSchema } from "@/generated/schemas/zod";
import { getWindowSize } from "@/hooks/getWindowSize";
import theme from "@/theme";

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
    resolver: zodResolver(CodeSnippetCreateInputSchema),
  });

  // ダイアログを閉じる際は入力内容をリセットする
  const onCloseThisDialog = () => {
    reset();
    onClose();
  };

  // 登録ボタンがクリックされたときの処理
  const handleRegisterButtonClicked = async (data: any) => {
    try {
      await axios.post("/api/snippets", data);
    } catch (error) {
      console.error(error);
    }

    onCloseThisDialog();
  };

  return (
    <Dialog open={open} onClose={onCloseThisDialog} fullWidth maxWidth="sm">
      <DialogTitle>スニペット登録</DialogTitle>
      <DialogContent sx={{ py: 0 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Stack gap={1.5} my={1} ref={formRef}>
            {/* タイトル */}
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title"
                  type="text"
                  size="small"
                  fullWidth
                  sx={{ my: 0 }}
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            {/* 言語 */}
            <Controller
              name="language"
              control={control}
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  freeSolo
                  size="small"
                  sx={{ my: 0 }}
                  options={langNames}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="language"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                    />
                  )}
                  onChange={(_, value) => setValue("language", value)}
                />
              )}
            />

            {/* コードエディタ(画面サイズが小さい場合) */}
            {width < theme.breakpoints.values.sm && (
              <Controller
                name="code"
                control={control}
                render={({ field, fieldState }) => (
                  <CodeMirror
                    {...field}
                    theme={vscodeDark}
                    extensions={[
                      loadLanguage(watch("language")) || langs.json(),
                    ]}
                  />
                )}
              />
            )}

            {/* 説明 */}
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Description"
                  size="small"
                  fullWidth
                  margin="normal"
                  sx={{ my: 0 }}
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            {/* タグ */}
            <Controller
              name="tags"
              control={control}
              defaultValue={[] as string[]}
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  multiple
                  options={[]}
                  value={field.value || []}
                  onChange={(_, value) => {
                    field.onChange(value);
                  }}
                  freeSolo
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip
                        size="small"
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="tags"
                      size="small"
                      fullWidth
                      margin="normal"
                      sx={{ my: 0 }}
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
          </Stack>

          {theme.breakpoints.values.sm <= width && (
            <Stack flexGrow={1} alignSelf={"center"}>
              {/* コードエディタ(画面サイズが大きい場合) */}
              <Controller
                name="code"
                control={control}
                render={({ field, fieldState }) => (
                  <CodeMirror
                    {...field}
                    theme={vscodeDark}
                    height={`${editorHeight}px`}
                    extensions={[
                      loadLanguage(watch("language")) || langs.json(),
                    ]}
                  />
                )}
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
