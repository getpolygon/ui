import { Box } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { options } from "~/lib/security/iron-session";
import { withIronSessionSsr } from "iron-session/next";
import { withTokenAuth } from "~/lib/http/withTokenAuth";

interface Props {
  posts: { [key: string]: unknown }[];
}

export const getServerSideProps: GetServerSideProps<Props> = withIronSessionSsr(
  async (ctx) => {
    return await withTokenAuth({
      ctx,
      onSuccess: async (axios) => {
        const response = await axios.get("/api/discover/posts");
        return {
          props: {
            posts: response.data,
          },
        };
      },

      onFail: async () => ({
        redirect: {
          permanent: false,
          destination:
            "/auth/login?auth-required=true&is-redirected=true&callback-url=/",
        },
      }),
    });
  },
  options
);

const Page: NextPage<Props> = ({ posts }) => {
  return (
    <Box>
      <code>
        <pre>{JSON.stringify(posts, undefined, 4)}</pre>
      </code>
    </Box>
  );
};

export default Page;
