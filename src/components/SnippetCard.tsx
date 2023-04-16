import { CodeSnippet } from "@prisma/client";
import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Paper,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useState } from "react";
import SnippetDialog from "./SnippetDialog";

type Props = {
  snippet: CodeSnippet;
};

export default function SnippetCard({ snippet }: Props) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    console.log("delete");
  };

  const copyToClipboard = async () => {
    await global.navigator.clipboard.writeText(snippet.code);
    setOpen(true);
  };

  return (
    <Card>
      {/* タイトル・言語 */}
      <CardActionArea onClick={() => setDialogOpen(true)}>
        <CardHeader
          title={snippet.title}
          subheader={
            <Typography mt={1}>Language: {snippet.language}</Typography>
          }
        />
      </CardActionArea>

      {/* スニペット */}
      <CardActionArea onClick={copyToClipboard}>
        <CardContent>
          <Tooltip title="Copy" placement="top-end">
            <Typography variant="body1">{snippet.code}</Typography>
          </Tooltip>
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
