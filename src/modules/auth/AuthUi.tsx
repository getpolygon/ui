import {
  Box,
  chakra,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";
import { Seo } from "~/lib/seo/Seo";
import { Assign } from "utility-types";
import { WEBSITE_TITLE } from "~/lib/seo/constants";

interface IAction {
  text: string;
  href: string;
}

interface IAuthUiProps {
  seo: {
    prefix: string;
  };

  heading: ReactNode;
  actions: {
    helper: ReactNode;
    primary: IAction;
    secondary: IAction;
  };
}

export const AuthUi = (
  props: Assign<IAuthUiProps, { children: ReactNode }>
) => {
  return (
    <>
      <Seo title={props.seo.prefix + " - " + WEBSITE_TITLE} />

      <Flex w={"full"} h={"100vh"} alignItems={"center"}>
        {/* Static content */}
        <Box
          py={8}
          px={4}
          w={"full"}
          maxW={"4xl"}
          h={"inherit"}
          flexGrow={0.5}
          display={["none", null, null, "initial"]}
        >
          <Image
            w={"full"}
            h={"full"}
            zIndex={0}
            rounded={"xl"}
            boxShadow={"2xl"}
            userSelect={"none"}
            objectFit={"cover"}
            alt={"Background image"}
            filter={"brightness(50%)"}
            transition={"150ms ease-in-out"}
            _hover={{
              filter: "brightness(60%)",
            }}
            src={
              "https://source.unsplash.com/random/?futuristic,future,purple,dimmed"
            }
          />

          <Text
            left={12}
            zIndex={1}
            bottom={50}
            pos={"absolute"}
            fontWeight={"medium"}
          >
            <chakra.span userSelect={"none"}>Images provided by </chakra.span>
            <chakra.a
              target={"_blank"}
              fontWeight={"extrabold"}
              rel={"noreferrer noopener"}
              href={"https://unsplash.com/"}
            >
              Unsplash
            </chakra.a>
            <chakra.span userSelect={"none"}>.</chakra.span>
          </Text>
        </Box>

        <Flex
          w={"full"}
          px={[4, 12]}
          flexGrow={[0.5, 1]}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack maxW={"2xl"} w={"full"} spacing={6}>
            <Stack spacing={6}>
              <Box userSelect={"none"}>
                <Stack spacing={4}>
                  <Stack>
                    <Heading fontWeight={"extrabold"}>{props.heading}</Heading>
                    <Text>{props.actions.helper}</Text>
                  </Stack>

                  <Divider />
                </Stack>
              </Box>

              <Box>{props.children}</Box>

              <Flex alignItems={"center"}>
                <NextLink href={props.actions.primary.href} passHref>
                  <Link
                    fontSize={"sm"}
                    color={"purple.300"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {props.actions.primary.text}
                  </Link>
                </NextLink>

                <Spacer />

                <NextLink href={props.actions.secondary.href} passHref>
                  <Link
                    fontSize={"sm"}
                    color={"purple.300"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {props.actions.secondary.text}
                  </Link>
                </NextLink>
              </Flex>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
