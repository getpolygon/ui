import { UseToastOptions, useToast as useChakraToast } from "@chakra-ui/react";

export const useToast = (props?: UseToastOptions) => {
  return useChakraToast({
    duration: 5000,
    isClosable: true,
    variant: "left-accent",
    position: "bottom-right",
    ...props,
  });
};
