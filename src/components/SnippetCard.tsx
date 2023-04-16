import { CodeSnippet } from "@prisma/client";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

type Props = {
  snippet: CodeSnippet;
};

export default function SnippetCard({ snippet }: Props) {
  return (
    <Card>
      <CardHeader
        title={snippet.title}
        action={
          <>
            <Edit />
            <Delete />
          </>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {snippet.description}
        </Typography>
        <Typography variant="body1">{snippet.code}</Typography>
        <Typography variant="caption">Language: {snippet.language}</Typography>
        <Typography variant="caption">Tags: {snippet.tags}</Typography>
      </CardContent>
    </Card>
  );
}
