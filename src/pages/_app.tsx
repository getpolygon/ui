import {
  ChakraProvider,
  ColorModeScript,
  ColorModeProvider,
} from "@chakra-ui/react";
import React from "react";
import { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { queryClient } from "~/lib/http/react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SharedLayout } from "~/modules/layouts/SharedLayout";
import { LoadingProgressProvider } from "~/lib/ui/loading-progress";

const Polygon = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS={true}>
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
              <Component {...pageProps} />
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
