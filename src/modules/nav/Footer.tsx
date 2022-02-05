/**
 * This template was generously provided by Chakra Templates for free.
 * Visit their website at https://chakra-templates.dev/ for more awesome
 * templates.
 */
import {
  Badge,
  Box,
  chakra,
  Container,
  Stack,
  StackItem,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

const SocialButton = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) => {
  return (
    <chakra.button
      w={8}
      h={8}
      as={"a"}
      href={href}
      rounded={"full"}
      target={"_blank"}
      cursor={"pointer"}
      alignItems={"center"}
      display={"inline-flex"}
      justifyContent={"center"}
      bgColor={"whiteAlpha.100"}
      rel={"noreferrer noopener"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: "whiteAlpha.200",
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const Footer = () => {
  return (
    <Box roundedTop={"lg"} color={"gray.200"} bgColor={"gray.900"}>
      <Container
        py={4}
        as={Stack}
        spacing={4}
        maxW={"6xl"}
        alignItems={"center"}
        direction={{ base: "column", md: "row" }}
        justify={{ base: "center", md: "space-between" }}
      >
        <Box userSelect={"none"}>
          <Stack alignItems={"center"} direction={"row"}>
            <StackItem>
              <Text fontSize={"2xl"} fontWeight={"bold"} color={"purple.400"}>
                Polygon
              </Text>
            </StackItem>

            <StackItem>
              <Badge
                fontSize={"0.65em"}
                rounded={"full"}
                colorScheme={"purple"}
              >
                alpha
              </Badge>
            </StackItem>
          </Stack>
        </Box>

        <Text userSelect={"none"} textAlign={"center"}>
          &copy; {new Date().getFullYear()} Polygon Open-Source Project. All
          rights reserved
        </Text>

        <Stack direction={"row"} spacing={4}>
          <SocialButton
            label={"Discord"}
            href={"https://discord.com/invite/tExw2XqgtU"}
          >
            <FaDiscord />
          </SocialButton>

          <SocialButton
            label={"GitHub"}
            href={"https://github.com/polygon-isecure"}
          >
            <FaGithub />
          </SocialButton>

          <SocialButton label={"Email"} href={"mailto:support@polygon.am"}>
            <MdOutlineMailOutline />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
};
