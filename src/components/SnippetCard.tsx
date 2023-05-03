import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Snackbar,
  Stack,
} from "@mui/material";
import { useState } from "react";

import type { CodeSnippet } from "@/generated/schemas/orval";
import SnippetDialog from "./SnippetDialog";
import SnippetDisplay from "./SnippetDisplay";

type Props = {
  snippet: CodeSnippet;
};

export default function SnippetCard({ snippet }: Props) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const copyToClipboard = async () => {
    await global.navigator.clipboard.writeText(snippet.code);
    setOpen(true);
  };

  return (
    <Card>
      <CardActionArea onClick={() => setDialogOpen(true)}>
        {/* 言語 */}
        <Stack alignItems="flex-end">
          <Chip
            label={snippet.language}
            sx={{ borderRadius: 1 }}
            size="small"
          />
        </Stack>

        {/* タイトル */}
        <CardHeader title={snippet.title} sx={{ py: 0 }} />
      </CardActionArea>

      {/* スニペット */}
      <CardActionArea onClick={copyToClipboard}>
        <CardContent sx={{ padding: 1 }}>
          <SnippetDisplay snippet={snippet} />
        </CardContent>
      </CardActionArea>

      {/* ダイアログ */}
      <SnippetDialog
        snippet={snippet}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />

      {/* コピー時の表示 */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      >
        <Alert>Copied to clipboard!</Alert>
      </Snackbar>
    </Card>
  );
}
