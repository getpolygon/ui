import {
  Badge,
  Box,
  Button,
  chakra,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useUserStore } from "~/lib/stores/useUserStore";

export const Navbar = () => {
  const user = useUserStore(({ user }) => user);
  const [scrolled, setScrolled] = useState(false);

  const action = () => {
    if (!isEmpty(user)) signOut({ redirect: true });
    else signIn();
  };

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 0) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <Box
      px={8}
      py={4}
      top={0}
      zIndex={1}
      pos={"sticky"}
      role={"navigation"}
      borderBottom={"2px"}
      borderColor={"gray.700"}
      backdropFilter={"blur(20px)"}
      transition={"150ms ease-in-out"}
      boxShadow={scrolled ? "2xl" : "xl"}
    >
      <Flex
        mx={"auto"}
        maxW={"6xl"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Stack direction={"row"} alignItems={"center"}>
            <NextLink href={"/"} passHref>
              <chakra.a>
                <Text
                  fontWeight={"bold"}
                  color={"purple.400"}
                  fontSize={["3xl", "4xl"]}
                >
                  Polygon
                </Text>
              </chakra.a>
            </NextLink>

            <Box>
              <Badge rounded={"full"} colorScheme={"purple"}>
                alpha
              </Badge>
            </Box>
          </Stack>
        </Box>

        <Stack spacing={4} direction={"row"}>
          {!isEmpty(user) && (
            <NextLink href={"/platform"}>
              <Button
                as={"a"}
                size={"lg"}
                rounded={"full"}
                colorScheme={"purple"}
              >
                Platform
              </Button>
            </NextLink>
          )}

          <Button
            zIndex={0}
            size={"lg"}
            rounded={"full"}
            colorScheme={"gray"}
            onClick={() => action()}
          >
            {isEmpty(user) ? "Login" : "Logout"}
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};
