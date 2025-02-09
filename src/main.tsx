import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import customTheme from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
