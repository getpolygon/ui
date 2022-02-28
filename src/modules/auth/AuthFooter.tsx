import { Box, Center, chakra, Text } from "@chakra-ui/react";

export const AuthFooter = () => (
  <Box w={"full"}>
    <Box p={4}>
      <Center>
        <Text
          fontSize={"sm"}
          color={"gray.500"}
          userSelect={"none"}
          textAlign={"center"}
        >
          Crafted by{" "}
          <chakra.a
            target={"_blank"}
            color={"purple.400"}
            rel={"noreferrer noopener"}
            href={"https://github.com/polygon-isecure"}
          >
            Polygon Open-Source Project
          </chakra.a>{" "}
          at 🇦🇲 and open-source collaborators worldwide.
        </Text>
      </Center>
    </Box>
  </Box>
);
