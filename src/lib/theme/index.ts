import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: "purple",
    components: ["Badge", "Button"],
  })
);

export default theme;
