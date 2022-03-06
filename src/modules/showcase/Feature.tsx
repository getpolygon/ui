import { ReactElement } from "react";
import { Box, BoxProps, Stack, Text } from "@chakra-ui/react";

export interface IFeature extends BoxProps {
  title: string;
  icon: ReactElement;
}

export const Feature = ({ title, children, icon, ...rest }: IFeature) => {
  return (
    <Box
      p={4}
      as={"section"}
      border={"2px"}
      rounded={"xl"}
      role={"article"}
      userSelect={"none"}
      maxW={["xl", "2xl"]}
      borderColor={"gray.700"}
      transition={"240ms ease-in-out"}
      _hover={{
        boxShadow: "xl",
        transform: "translateY(-6px)",
      }}
      {...rest}
    >
      <Stack
        spacing={{ base: 3, md: "6" }}
        direction={{ base: "column", md: "row" }}
      >
        <Box as={"section"} role={"img"} fontSize={"6xl"}>
          {icon}
        </Box>

        <Stack as={"section"} spacing={1}>
          <Text role={"term"} fontWeight={"extrabold"} fontSize={"lg"}>
            {title}
          </Text>

          <Box color={"gray.400"}>{children}</Box>
        </Stack>
      </Stack>
    </Box>
  );
};
