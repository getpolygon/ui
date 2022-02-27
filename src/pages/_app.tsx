import React from "react";
import { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { queryClient } from "~/lib/http/react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

const Polygon = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position={"bottom-left"} />
      </QueryClientProvider>

      <ColorModeScript initialColorMode={"dark"} />
    </ChakraProvider>
  );
};

export default Polygon;
