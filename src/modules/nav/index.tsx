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

  const action = async () => {
    if (!isEmpty(user)) await signOut({ redirect: true });
    else await signIn();
  };

  useEffect(() => {
    const listener = window.addEventListener("scroll", () => {
      if (window.scrollY > 0) setScrolled(true);
      else setScrolled(false);
    });

    return () => {
      window.removeEventListener("scroll", () => listener);
    };
  }, []);

  return (
    <Flex
      top={0}
      w={"full"}
      pos={"sticky"}
      role={"navigation"}
      alignItems={"center"}
      justifyContent={"center"}
      backdropFilter={"blur(20px)"}
      boxShadow={scrolled ? "xl" : "none"}
    >
      <Box
        w={"5xl"}
        m={scrolled ? 0 : 4}
        backdropFilter={"blur(20px)"}
        transition={"100ms ease-in-out"}
        border={scrolled ? "none" : "2px"}
        rounded={scrolled ? "none" : "2xl"}
        boxShadow={scrolled ? "none" : "2xl"}
        roundedBottom={scrolled ? "2xl" : ""}
        borderColor={scrolled ? "transparent" : "gray.700"}
      >
        <Flex
          p={4}
          w={"full"}
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

          <Box>
            <Stack spacing={4} direction={"row"}>
              {!isEmpty(user) && (
                <NextLink href={"/platform"}>
                  <chakra.a>
                    <Button colorScheme={"purple"} size={"lg"} rounded={"xl"}>
                      Platform
                    </Button>
                  </chakra.a>
                </NextLink>
              )}

              <Button
                size={"lg"}
                rounded={"xl"}
                colorScheme={"gray"}
                onClick={async () => await action()}
              >
                {isEmpty(user) ? "Login" : "Logout"}
              </Button>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
