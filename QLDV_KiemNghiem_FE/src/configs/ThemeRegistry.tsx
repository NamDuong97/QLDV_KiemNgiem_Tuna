import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

const theme = createTheme({
  typography: {
    fontFamily: `"Lora", sans-serif`,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          fontFamily: `"Lora", Lora Fallback`, // Áp dụng font cho tất cả thẻ
        },
        "html, body": {
          fontFamily: `"Lora", Lora Fallback`, // Đảm bảo toàn bộ trang web có font
        },
        a: {
          fontFamily: `"Lora", Lora Fallback`,
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
