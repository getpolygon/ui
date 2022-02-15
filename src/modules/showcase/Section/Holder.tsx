import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface IHolder {
  children: ReactNode;
}

/**
 * This component is a universal responsive holder for the sections on the main page.
 */
export const Holder = ({ children }: IHolder) => {
  return (
    <Box as={"section"} role={"listitem"}>
      <Box maxW={["3xl", "4xl", null, "5xl"]} mx={"auto"}>
        {children}
      </Box>
    </Box>
  );
};
