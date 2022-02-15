import { Flex } from "@chakra-ui/react";
import { getCsrfToken } from "next-auth/react";
import { GetServerSideProps, NextPage } from "next";
import { SectionInDevelopment } from "~/components/SectionInDevelopment";

type Props = {
  csrfToken: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const csrfToken = await getCsrfToken(ctx);
  return {
    props: {
      csrfToken: csrfToken!,
    },
  };
};

const Page: NextPage<Props> = () => {
  return (
    <Flex h={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <SectionInDevelopment />
    </Flex>
  );
};

export default Page;
