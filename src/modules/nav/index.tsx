import {
  Badge,
  Box,
  Button,
  chakra,
  Flex,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { BsDoorOpenFill } from "react-icons/bs";
import { AiFillGithub as GitHub } from "react-icons/ai";
import { useAuthProvider } from "~/lib/security/AuthProvider";

export const Navbar = () => {
  const { user } = useAuthProvider();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Adding a listener to animate the navbar on scroll.
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
      as={"nav"}
      pos={"sticky"}
      role={"navigation"}
      borderBottom={"2px"}
      borderColor={"gray.700"}
      transition={"150ms ease-in-out"}
      boxShadow={scrolled ? "xl" : "md"}
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

        <Stack alignItems={"center"} direction={"row"} spacing={3}>
          {user !== null && (
            <NextLink href={"/platform"} passHref>
              <IconButton
                isRound
                as={"a"}
                role={"button"}
                icon={<BsDoorOpenFill />}
                aria-label={"Go to the platform page"}
              />
            </NextLink>
          )}

          <NextLink href={"https://github.com/polygon-isecure/"} passHref>
            <chakra.a
              role={"button"}
              target={"_blank"}
              rel={"noreferrer noopener"}
              _hover={{
                cursor: "pointer",
                transform: "scale(1.1)",
              }}
              style={{
                transition: "0.24s ease",
                backgroundColor: "transparent",
              }}
            >
              <GitHub
                size={"3rem"}
                style={{
                  color: "white",
                  padding: "8px",
                  borderRadius: "50px",
                }}
              />
            </chakra.a>
          </NextLink>

          <NextLink
            passHref
            href={user === null ? "/auth/login" : "/auth/logout"}
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
              {user === null ? "Login" : "Logout"}
            </Button>
          </NextLink>
        </Stack>
      </Flex>
    </Box>
  );
};
