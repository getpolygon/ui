import { ReactNode } from "react";
import { Navbar } from "~/modules/nav";
import { Flex } from "@chakra-ui/react";
import { Footer } from "~/modules/nav/Footer";

interface IWelcomeLayoutProps {
  children: ReactNode;
}

export const WelcomeLayout = ({ children }: IWelcomeLayoutProps) => {
  return (
    <Flex h={"inherit"} flexDirection={"column"}>
      <Navbar />
      {children}
      <Footer />
    </Flex>
  );
};
