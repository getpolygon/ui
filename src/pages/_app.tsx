import {
  ChakraProvider,
  ColorModeScript,
  ColorModeProvider,
} from "@chakra-ui/react";
import React from "react";
import { AppProps } from "next/app";
import { Seo } from "~/lib/seo/Seo";
import { QueryClientProvider } from "react-query";
import { queryClient } from "~/lib/http/react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "~/lib/security/AuthProvider";
import { SharedLayout } from "~/modules/layouts/SharedLayout";
import { LoadingProgressProvider } from "~/lib/ui/loading-progress";
import { WEBSITE_TITLE, WEBSITE_DESCRIPTION } from "~/lib/seo/constants";

const Polygon = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS={true}>
      <Seo title={WEBSITE_TITLE} description={WEBSITE_DESCRIPTION} />

      <ColorModeProvider
        options={{
          initialColorMode: "dark",
          useSystemColorMode: false,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <LoadingProgressProvider>
            {/* Contains logic related to the loading progress bar, etc. */}
            <SharedLayout>
              <AuthProvider>
                <Component {...pageProps} />
              </AuthProvider>
            </SharedLayout>
          </LoadingProgressProvider>

          <ReactQueryDevtools initialIsOpen={false} position={"bottom-left"} />
        </QueryClientProvider>

        <ColorModeScript initialColorMode={"dark"} />
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default Polygon;
