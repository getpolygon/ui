import { NextPage } from "next";
import { useEffect } from "react";
import { useAuthProvider } from "~/lib/security/AuthProvider";
import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";

const Page: NextPage = () => {
  const { signOut } = useAuthProvider();

  useEffect(() => {
    setTimeout(() => signOut(), 1200);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      w={"full"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Stack alignItems={"center"} justifyContent={"center"}>
        <Spinner colorScheme={"purple"} />
        <Text textAlign={"center"}>Logging you out</Text>
      </Stack>
    </Flex>
  );
};

export default Page;
