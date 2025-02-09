import { extendTheme } from "@chakra-ui/react";

// Define a custom theme
const customTheme = extendTheme({
  config: {
    initialColorMode: "light", // Set default mode (light or dark)
    useSystemColorMode: false, // Disable system mode detection
  },
  colors: {
    primary: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3", // Main color
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Inter, sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "xl",
      },
      variants: {
        solid: {
          bg: "primary.500",
          color: "white",
          _hover: {
            bg: "primary.600",
          },
        },
      },
    },
  },
});

export default customTheme;
