import { chakra, Flex, Image, Text } from "@chakra-ui/react";

export const AuthImageHolder = () => {
  return (
    <Flex
      w={"full"}
      h={"inherit"}
      flexGrow={0.5}
      alignItems={"center"}
      justifyContent={"center"}
      display={["none", null, null, "initial"]}
    >
      <Image
        w={"full"}
        h={"full"}
        zIndex={0}
        userSelect={"none"}
        objectFit={"cover"}
        alt={"Background image"}
        filter={"brightness(50%)"}
        transition={"150ms ease-in-out"}
        _hover={{
          filter: "brightness(55%)",
        }}
        src={
          "https://source.unsplash.com/random/?futuristic,future,purple,dimmed"
        }
      />

      <Text
        left={12}
        zIndex={1}
        bottom={"10"}
        pos={"absolute"}
        fontWeight={"medium"}
      >
        <chakra.span userSelect={"none"}>Photos provided by </chakra.span>
        <chakra.a
          target={"_blank"}
          fontWeight={"extrabold"}
          rel={"noreferrer noopener"}
          href={"https://unsplash.com/"}
        >
          Unsplash
        </chakra.a>
        <chakra.span userSelect={"none"}>.</chakra.span>
      </Text>
    </Flex>
  );
};
