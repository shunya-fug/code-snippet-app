import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { languages } from "prismjs";
import { Controller, useForm } from "react-hook-form";
import CodeEditor from "./CodeEditor";

import { CodeSnippetCreateInputSchema } from "@/generated/schemas/zod";

type Props = {
  open: boolean;
  onClose: () => void;
};

/// スニペット登録ダイアログ
const SnippetRegisterDialog = ({ open, onClose }: Props) => {
  const { control, handleSubmit, watch, setValue, reset } = useForm({
    resolver: zodResolver(CodeSnippetCreateInputSchema),
  });

  /// 入力内容をリセットしてダイアログを閉じる
  const onCloseThisDialog = () => {
    reset();
    onClose();
  };

  /// 登録ボタンがクリックされたときの処理
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
        <Stack gap={1.5} my={1}>
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
              <FormControl
                fullWidth
                margin="normal"
                sx={{ my: 0 }}
                error={fieldState.invalid}
              >
                <InputLabel size="small">Language</InputLabel>
                <Select
                  {...field}
                  size="small"
                  label="Language"
                  MenuProps={{
                    style: { maxHeight: 300 },
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "center",
                    },
                  }}
                >
                  {Object.keys(languages).map((language) => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />

          {/* コード */}
          <Controller
            name="code"
            control={control}
            render={({ field, fieldState }) => (
              <CodeEditor
                {...field}
                language={watch("language", "plain")}
                code={watch("code", "")}
                onCodeChange={setValue}
                fieldState={fieldState}
              />
            )}
          />

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
