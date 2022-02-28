import {
  AuthHeadingHelperCombo,
  IAuthHeadingHelperComboProps,
} from "./AuthHeadingHelperCombo";
import NextLink from "next/link";
import { ReactNode } from "react";
import { Seo } from "~/lib/seo/Seo";
import { Required } from "utility-types";
import { AuthFooter } from "./AuthFooter";
import { AuthImageHolder } from "./AuthImageHolder";
import { WEBSITE_TITLE } from "~/lib/seo/constants";
import { AuthAction, IAuthActionProps } from "./AuthAction";
import { Box, chakra, Divider, Flex, Spacer, Stack } from "@chakra-ui/react";

type IAuthUiProps = {
  seo: {
    prefix: string;
  };

  actions?: {
    primary: IAuthActionProps;
    secondary: IAuthActionProps;
  };

  children: ReactNode;
  heading: IAuthHeadingHelperComboProps;
};

type IAuthUiPropsStrict = Required<IAuthUiProps, "actions">;

// This function will apply default values to the fields that
// are optional.
const withApplyDefaultProps = (props: IAuthUiProps): IAuthUiPropsStrict => ({
  actions: props.actions ?? {
    primary: {
      href: "/",
      text: "← Back to the main page",
    },
    secondary: {
      text: "Forgot password?",
      href: "/auth/forgot-password",
    },
  },

  heading: {
    children: props.heading.children,
    helper: props.heading.helper ?? (
      <>
        Already using Polygon?{" "}
        <NextLink passHref href={"/auth/login"}>
          <chakra.a
            _hover={{
              color: "purple.200",
            }}
            color={"purple.300"}
          >
            Log in
          </chakra.a>
        </NextLink>{" "}
        to your account!
      </>
    ),
  },

  seo: props.seo,
  children: props.children,
});

export const AuthUi = (props: IAuthUiProps | IAuthUiPropsStrict) => {
  props = withApplyDefaultProps(props);

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
                  href={props.actions?.primary.href!}
                  text={props.actions?.primary.text!}
                />

                <Spacer />

                <AuthAction
                  href={props.actions?.secondary.href!}
                  text={props.actions?.secondary.text!}
                />
              </Flex>
            </Stack>

            <Stack spacing={1}>
              <Divider />
              <AuthFooter />
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
