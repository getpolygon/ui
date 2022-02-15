import { GiBarrier } from "react-icons/gi";
import { Box, BoxProps, Flex, Heading, Icon, Stack } from "@chakra-ui/react";

export const SectionInDevelopment = ({ children, ...rest }: BoxProps) => {
  return (
    <Box
      p={4}
      border={"4px"}
      rounded={"2xl"}
      bgColor={"gray.900"}
      borderColor={"yellow.500"}
      {...rest}
    >
      <Flex alignItems={"center"} justifyContent={"center"}>
        <Box>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Icon fontSize={"4em"} color={"yellow"} as={GiBarrier} />

            <Heading
              color={"gray.300"}
              userSelect={"none"}
              textAlign={"center"}
            >
              Section In Development
            </Heading>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};
