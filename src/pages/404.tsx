import { NextPage } from "next";
import NextLink from "next/link";
import { Box, Flex, Image, Link, Stack, Text } from "@chakra-ui/react";

const Page: NextPage = () => {
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      bgSize={"cover"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image
        width={"100vw"}
        height={"100vh"}
        objectFit={"cover"}
        userSelect={"none"}
        position={"absolute"}
        filter={"brightness(30%)"}
        src={"/404-background.gif"}
        alt={"Futuristic background"}
      />

      <Box
        p={4}
        rounded={"lg"}
        pos={"absolute"}
        color={"gray.200"}
        bgColor={"gray.800"}
      >
        <Text textAlign={"center"} fontWeight={"extrabold"} fontSize={"4.5em"}>
          404
        </Text>

        <Text textAlign={"center"} fontWeight={"semibold"} fontSize={"1.4em"}>
          Seems like you got lost...
        </Text>

        <Stack pt={2} textAlign={"center"} color={"purple.500"}>
          <NextLink href={"/"} passHref>
            <Link textDecor={"underline"} fontWeight={"semibold"}>
              Go back to the main page
            </Link>
          </NextLink>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Page;
