import {
  Badge,
  Box,
  Button,
  chakra,
  Flex,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import NextLink from "next/link";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const user = {};
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const listener = (_: Event) => {
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
      as={"nav"}
      pos={"sticky"}
      role={"navigation"}
      borderBottom={"2px"}
      borderColor={"gray.700"}
      transition={"150ms ease-in-out"}
      boxShadow={scrolled ? "2xl" : "lg"}
      // Imitating `backdrop-filter` behavior on incompatible browsers
      sx={{
        // gray.700
        backgroundColor: "rgba(45, 55, 72, 0.885)",

        "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))":
          {
            backdropFilter: "blur(50px)",
            backgroundColor: "transparent",
          },
      }}
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
                  role={"heading"}
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
                pre-alpha
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
                role={"button"}
                rounded={"full"}
                colorScheme={"purple"}
              >
                Platform
              </Button>
            </NextLink>
          )}

          <NextLink
            passHref
            href={isEmpty(user) ? "/auth/login" : "/auth/logout"}
          >
            <Button
              as={Link}
              zIndex={0}
              size={"lg"}
              role={"button"}
              rounded={"full"}
              colorScheme={"gray"}
              style={{
                textDecoration: "none",
              }}
            >
              {isEmpty(user) ? "Login" : "Logout"}
            </Button>
          </NextLink>
        </Stack>
      </Flex>
    </Box>
  );
};
