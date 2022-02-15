import { Holder } from "./Holder";
import { Divider, Flex, FlexProps, Heading, Stack } from "@chakra-ui/react";

interface ISection extends FlexProps {
  title: string;
}

export const Section = ({ title, children }: ISection) => {
  return (
    <Holder>
      <Stack maxW={["2xl", null, "3xl", "full"]} mx={"auto"} spacing={8}>
        <Stack spacing={4} direction={"row"} alignItems={"center"}>
          <Heading userSelect={"none"}>{title}</Heading>
          <Divider />
        </Stack>

        <Flex alignItems={"center"} justifyContent={"center"}>
          {children}
        </Flex>
      </Stack>
    </Holder>
  );
};
