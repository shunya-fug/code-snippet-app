import { useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { CodeSnippet } from "@prisma/client";
import { useRouter } from "next/router";
import CodeEditor from "@/components/CodeEditor";
import { languages } from "prismjs";

const AddPage = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleCodeChange = (code: string) => {
    setCode(code);
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  const handleTagsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTags(event.target.value as string);
  };

  const handleSubmit = async () => {
    const newSnippet: Omit<CodeSnippet, "id" | "createdAt" | "updatedAt"> = {
      title,
      description,
      code,
      language,
      tags,
    };
    try {
      await axios.post("/api/snippets", newSnippet);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Add Code Snippet
      </Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            onChange={handleLanguageChange}
            MenuProps={{
              style: { maxHeight: 300 },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
            }}
          >
            {Object.keys(languages).map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <CodeEditor
          language={language || "js"}
          code={code}
          onCodeChange={handleCodeChange}
        />
        <TextField
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tags (comma-separated)"
          value={tags}
          onChange={handleTagsChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add
        </Button>
      </form>
    </Container>
  );
};

export default AddPage;
