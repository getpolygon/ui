import { isNil } from "lodash";
import { ReactNode } from "react";
import { Box, Divider, Heading, Stack, Text } from "@chakra-ui/react";

export interface IAuthHeadingHelperComboProps {
  helper?: ReactNode;
  children: ReactNode;
}

export const AuthHeadingHelperCombo = (props: IAuthHeadingHelperComboProps) => {
  return (
    <Box userSelect={"none"}>
      <Stack spacing={4}>
        {!isNil(props.helper) ? (
          <Stack>
            <Heading fontWeight={"extrabold"}>{props.children}</Heading>
            <Text>{props.helper}</Text>
          </Stack>
        ) : (
          <Heading fontWeight={"extrabold"}>{props.children}</Heading>
        )}

        <Divider />
      </Stack>
    </Box>
  );
};
