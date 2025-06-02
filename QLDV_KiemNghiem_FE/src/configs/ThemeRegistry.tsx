import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

const theme = createTheme({
  typography: {
    fontFamily: `"IBM Plex Sans", sans-serif`,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          fontFamily: `"IBM Plex Sans",sans-serif`, // Áp dụng font cho tất cả thẻ
        },
        "html, body": {
          fontFamily: `"IBM Plex Sans",sans-serif`, // Đảm bảo toàn bộ trang web có font
        },
        a: {
          fontFamily: `"IBM Plex Sans",sans-serif`,
          textDecoration: "none",
          color: "inherit",
        },
      },
    },
  },
  colorSchemes: "#FFF",
});

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
