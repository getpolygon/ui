import { ReactElement, ReactNode } from "react";
import { Box, Stack, Text, useColorModeValue as mode } from "@chakra-ui/react";

interface FeatureProps {
  title: string;
  icon: ReactElement;
  children: ReactNode;
}

export const Feature = ({ title, children, icon }: FeatureProps) => {
  return (
    <Box
      p={4}
      rounded={"xl"}
      border={"2px"}
      boxShadow={"2xl"}
      maxW={["xl", "2xl"]}
      borderColor={"gray.700"}
    >
      <Stack
        spacing={{ base: 3, md: "6" }}
        direction={{ base: "column", md: "row" }}
      >
        <Box fontSize={"6xl"}>{icon}</Box>
        <Stack spacing={1}>
          <Text fontWeight="extrabold" fontSize="lg">
            {title}
          </Text>
          <Box color={mode("gray.600", "gray.400")}>{children}</Box>
        </Stack>
      </Stack>
    </Box>
  );
};
