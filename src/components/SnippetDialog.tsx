import { CodeSnippet } from "@prisma/client";
import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  Paper,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Edit, Delete } from "@mui/icons-material";
import SnippetDisplay from "./SnippetDisplay";

type Props = {
  snippet: CodeSnippet;
  open: boolean;
  onClose: () => void;
};

export default function SnippetDialog({ snippet, open, onClose }: Props) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleDelete = () => {
    console.log("delete");
  };

  const copyToClipboard = async () => {
    await global.navigator.clipboard.writeText(snippet.code);
    setSnackBarOpen(true);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Card>
        {/* タイトル・言語 */}
        <CardHeader
          title={snippet.title}
          action={
            <>
              <Edit />
              <Delete />
            </>
          }
          subheader={
            <Typography mt={1}>Language: {snippet.language}</Typography>
          }
        />

        <CardContent component={Stack} gap={2}>
          {/* スニペット */}
          <CardActionArea onClick={copyToClipboard}>
            <Tooltip title="Copy" placement="top-end">
              <SnippetDisplay snippet={snippet} />
            </Tooltip>
          </CardActionArea>
          <Snackbar
            open={snackBarOpen}
            autoHideDuration={2000}
            onClose={() => setSnackBarOpen(false)}
          >
            <Alert>Copied to clipboard!</Alert>
          </Snackbar>

          {/* 概要 */}
          {snippet.description && (
            <Typography
              variant="body2"
              color="textSecondary"
              component={Paper}
              padding={1}
            >
              {snippet.description}
            </Typography>
          )}

          {/* タグ */}
          {snippet.tags && (
            <Typography
              variant="caption"
              component={Paper}
              padding={1}
              gap={1}
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              Tags:
              {snippet.tags?.split(",").map((tag) => (
                <Chip
                  label={tag}
                  key={tag}
                  size="small"
                  onDelete={handleDelete}
                />
              ))}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Dialog>
  );
}