import {
  AuthHeadingHelperCombo,
  IAuthHeadingHelperComboProps,
} from "./AuthHeadingHelperCombo";
import { ReactNode } from "react";
import { Seo } from "~/lib/seo/Seo";
import { Assign } from "utility-types";
import { AuthImageHolder } from "./AuthImageHolder";
import { WEBSITE_TITLE } from "~/lib/seo/constants";
import { AuthAction, IAuthActionProps } from "./AuthAction";
import { Box, Flex, Spacer, Stack } from "@chakra-ui/react";

interface IAuthUiProps {
  seo: {
    prefix: string;
  };

  actions: {
    primary: IAuthActionProps;
    secondary: IAuthActionProps;
  };

  heading: IAuthHeadingHelperComboProps;
}

export const AuthUi = (
  props: Assign<IAuthUiProps, { children: ReactNode }>
) => {
  return (
    <>
      <Seo title={props.seo.prefix + " - " + WEBSITE_TITLE} />

      <Flex h={"100vh"} alignItems={"center"}>
        <AuthImageHolder />

        <Flex
          w={"full"}
          px={[4, 12]}
          flexGrow={[0.5, 1]}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack maxW={"xl"} w={"full"} spacing={6}>
            <Stack spacing={6}>
              <AuthHeadingHelperCombo helper={props.heading.helper}>
                {props.heading.children}
              </AuthHeadingHelperCombo>

              <Box>{props.children}</Box>

              <Flex alignItems={"center"}>
                <AuthAction
                  href={props.actions.primary.href}
                  text={props.actions.primary.text}
                />

                <Spacer />

                <AuthAction
                  href={props.actions.secondary.href}
                  text={props.actions.secondary.text}
                />
              </Flex>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
