import axios from "~/lib/http/axios";
import { QueryClientProvider } from "react-query";
import { queryClient } from "~/lib/http/react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserProvider } from "~/lib/providers/UserProvider";
import App, { AppContext, AppInitialProps } from "next/app";
import { getSession, SessionProvider } from "next-auth/react";
import { TokenProvider } from "~/lib/providers/TokenProvider";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

class Polygon extends App {
  public static async getInitialProps(
    props: AppContext
  ): Promise<AppInitialProps> {
    const session = (await getSession(props.ctx)) as any;
    const response = await axios.get("/api/users/me", {
      headers: {
        "X-Refresh-Token": `${session?.user?.refreshToken}`,
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    const appProps = await App.getInitialProps(props);
    return {
      ...appProps,
      pageProps: {
        tokens: {
          access: session?.user?.accessToken ?? null,
          refresh: session?.user?.refreshToken ?? null,
        },
        user: response.status === 200 ? response.data : null,
      },
    };
  }

  public render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <TokenProvider tokens={pageProps.tokens}>
              <UserProvider user={pageProps.user}>
                <Component {...pageProps} />
              </UserProvider>
            </TokenProvider>
            <ColorModeScript initialColorMode={"dark"} />
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} position={"bottom-left"} />
        </QueryClientProvider>
      </SessionProvider>
    );
  }
}

export default Polygon;
