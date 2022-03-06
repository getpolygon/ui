import {
  Box,
  Button,
  Center,
  chakra,
  Flex,
  Heading,
  Icon,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Seo } from "~/lib/seo/Seo";
import { BiLinkExternal } from "react-icons/bi";
import { Section } from "~/modules/showcase/Section";
import { Features } from "~/modules/showcase/Features";
import { Holder } from "~/modules/showcase/Section/Holder";
import { WelcomeLayout } from "~/modules/layouts/Welcome.layout";
import { SectionInDevelopment } from "~/components/SectionInDevelopment";

const Page: NextPage = () => {
  return (
    <Flex h={"100vh"} direction={"column"}>
      <Seo />

      <WelcomeLayout>
        <Box as={"main"} role={"main"} px={4} py={20} flexGrow={1}>
          {/* Sections */}
          <Stack role={"list"} spacing={8}>
            {/* Hero + CTA Buttons */}
            <Box role={"presentation"} as={"section"} maxW={"5xl"} mx={"auto"}>
              <Stack spacing={4}>
                <Holder>
                  <Stack userSelect={"none"}>
                    <Box as={"section"}>
                      <Center>
                        <Heading
                          as={"legend"}
                          role={"heading"}
                          fontSize={"4rem"}
                          color={"purple.400"}
                          fontWeight={"extrabold"}
                        >
                          Polygon
                        </Heading>
                      </Center>
                    </Box>

                    <Box w={"full"} as={"section"}>
                      <Box mx={"auto"} maxW={"xl"}>
                        <Text
                          fontSize={"1.2em"}
                          color={"gray.400"}
                          role={"definition"}
                          textAlign={"center"}
                          fontWeight={"semibold"}
                        >
                          Polygon is an upcoming open-source & privacy-oriented
                          social network that is <chakra.span color={"purple.400"} fontWeight={"bold"}>not</chakra.span>{" "} hungry for your data.
                        </Text>
                      </Box>
                    </Box>
                  </Stack>
                </Holder>

                <Holder>
                  <Stack
                    alignItems={"center"}
                    justifyContent={"center"}
                    direction={["column", "row"]}
                  >
                    {/* <Button
                      as={"a"}
                      size={"lg"}
                      role={"button"}
                      rounded={"full"}
                      target={"_blank"}
                      colorScheme={"purple"}
                      href={"https://ko-fi.com/"}
                      rel={"noreferrer noopener"}
                    >
                      Donate
                    </Button> */}

                    <Button
                      as={"a"}
                      size={"lg"}
                      role={"button"}
                      rounded={"full"}
                      target={"_blank"}
                      colorScheme={"gray"}
                      rel={"noreferrer noopener"}
                      href={"https://github.com/polygon-isecure/core/"}
                    >
                      Get Started
                    </Button>
                  </Stack>
                </Holder>
              </Stack>
            </Box>

            <Section title={"Features"}>
              <Features />
            </Section>

            {/* For developers */}
            <Holder>
              <SectionInDevelopment>
                <Stack
                  p={5}
                  mx={"auto"}
                  spacing={3}
                  maxW={"5xl"}
                  border={"4px"}
                  as={"section"}
                  rounded={"3xl"}
                  boxShadow={"2xl"}
                  bgColor={"gray.900"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  borderColor={"purple.700"}
                >
                  <Box userSelect={"none"}>
                    <Stack spacing={1}>
                      <Heading
                        fontSize={"2.2em"}
                        color={"gray.300"}
                        fontWeight={"extrabold"}
                      >
                        For developers
                      </Heading>

                      <Text
                        fontWeight={"semibold"}
                        fontSize={"0.8885em"}
                        color={"gray.500"}
                      >
                        Thank you for your interest in helping us develop Polygon, it is greatly appreciated! We&#39;re still working out the kinks in the system. Please see the API documentation below.
                      </Text>
                    </Stack>
                  </Box>

                  <Spacer />

                  <Flex
                    w={"full"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <chakra.button
                      px={7}
                      py={3}
                      as={"a"}
                      w={"full"}
                      href={"#"}
                      rounded={"xl"}
                      fontSize={"xl"}
                      target={"_blank"}
                      color={"gray.200"}
                      bgColor={"purple.500"}
                      fontWeight={"semibold"}
                      rel={"noreferrer noopener"}
                      _hover={{
                        boxShadow: "2xl",
                        bgColor: "purple.600",
                        transform: "translateY(-3.8px)",
                      }}
                      transition={"240ms ease-in-out"}
                    >
                      <Flex alignItems={"center"}>
                        <Spacer />
                        <Text>API Docs</Text>
                        <Spacer />
                        <Icon as={BiLinkExternal} />
                      </Flex>
                    </chakra.button>
                  </Flex>
                </Stack>
              </SectionInDevelopment>
            </Holder>
          </Stack>
        </Box>
      </WelcomeLayout>
    </Flex>
  );
};

export default Page;
