import axios from "~/lib/http/axios";
import App, { AppContext, AppInitialProps } from "next/app";
import { UserProvider } from "~/lib/providers/UserProvider";
import { getSession, SessionProvider } from "next-auth/react";
import { TokenProvider } from "~/lib/providers/TokenProvider";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

class Polygon extends App {
  public static async getInitialProps(
    props: AppContext
  ): Promise<AppInitialProps> {
    // prettier-ignore
    const session = await getSession(props.ctx) as any;
    const response = await axios.get("/api/users/me", {
      headers: {
        // This is done on purpose. Do not remove the expression from backticks ("`")
        "X-Refresh-Token": `${session?.user?.refreshToken}`,
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });

    const appProps = await App.getInitialProps(props);
    return {
      ...appProps,
      pageProps: {
        user: response.status === 200 ? response.data : null,
        tokens: {
          access: session?.user?.accessToken ?? null,
          refresh: session?.user?.refreshToken ?? null,
        },
      },
    };
  }

  public render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <SessionProvider refetchInterval={0} session={pageProps.session}>
        <ChakraProvider>
          <TokenProvider tokens={pageProps.tokens}>
            <UserProvider user={pageProps.user}>
              <Component {...pageProps} />
            </UserProvider>
          </TokenProvider>

          <ColorModeScript initialColorMode={"dark"} />
        </ChakraProvider>
      </SessionProvider>
    );
  }
}

export default Polygon;
