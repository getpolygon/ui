import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export interface IAuthActionProps {
  text: string;
  href: string;
}

export const AuthAction = (props: IAuthActionProps) => {
  return (
    <NextLink href={props.href} passHref>
      <Link
        fontSize={"sm"}
        color={"purple.300"}
        style={{
          textDecoration: "none",
        }}
      >
        {props.text}
      </Link>
    </NextLink>
  );
};
