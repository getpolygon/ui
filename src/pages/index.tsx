import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { Navbar } from "~/modules/nav";
import { Footer } from "~/modules/nav/Footer";
import { Box, Flex, Stack } from "@chakra-ui/react";

const Page: NextPage = () => {
  return (
    <>
      <NextSeo />

      <Flex h={"100vh"} w={"100vw"} direction={"column"}>
        <Navbar />

        <Box w={"full"} flexGrow={1}>
          <Stack></Stack>
        </Box>

        <Footer />
      </Flex>
    </>
  );
};

export default Page;
