import { createTheme } from "@mui/material/styles";
import type {} from "@mui/lab/themeAugmentation";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#61AFEF",
    },
    secondary: {
      main: "#C678DD",
    },
    background: {
      paper: "#1E1E1E",
      default: "#121212",
    },
    text: {
      primary: "#D4D4D4",
      secondary: "#8A8A8A",
    },
  },
  typography: {
    fontFamily: [
      "Fira Code",
      "Roboto Mono",
      "Menlo",
      "Monaco",
      "Consolas",
      "Ubuntu Mono",
      "Noto Mono",
      "Oxygen Mono",
      "Liberation Mono",
      "Courier New",
      "monospace",
    ].join(","),
  },
});

export default theme;
