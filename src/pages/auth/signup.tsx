import { z } from "zod";
import { NextPage } from "next";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { isNil } from "lodash";
import axios from "~/lib/http/axios";
import { AuthUi } from "~/modules/auth/AuthUi";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionInDevelopment } from "~/components/SectionInDevelopment";

const schema = z.object({
  lastName: z.string({ required_error: "Please enter your last name" }),
  firstName: z.string({ required_error: "Please enter your first name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" }),
});

type Schema = z.infer<typeof schema>;

const heading = (
  <>
    Register at{" "}
    <chakra.span fontWeight={"9000"} color={"purple.400"}>
      Polygon
    </chakra.span>
  </>
);

const helper = (
  <>
    Already using Polygon?{" "}
    <NextLink passHref href={"/auth/login"}>
      <chakra.a
        _hover={{
          color: "purple.200",
        }}
        color={"purple.300"}
      >
        Log in
      </chakra.a>
    </NextLink>{" "}
    to your account!
  </>
);

const Page: NextPage = () => {
  const { formState, register, handleSubmit } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const { errors, isValid, isSubmitting, isDirty } = formState;
  const submit = async (payload: Schema) => {
    const response = await axios.post("/api/auth/register", payload);
    console.log(response);
  };

  return (
    <SectionInDevelopment>
      <AuthUi
        seo={{
          prefix: "Register",
        }}
        heading={{
          helper,
          children: heading,
        }}
        actions={{
          primary: {
            href: "/",
            text: "← Back to the main page",
          },
          secondary: {
            text: "Forgot password?",
            href: "/auth/forgot-password",
          },
        }}
      >
        <form
          autoCorrect={"off"}
          autoComplete={"off"}
          autoCapitalize={"off"}
          onSubmit={handleSubmit(submit)}
        >
          <Stack>
            <Stack direction={"row"}>
              <FormControl isRequired isInvalid={!isNil(errors.firstName)}>
                <FormLabel>First name</FormLabel>
                <Input placeholder={"John"} {...register("firstName")} />
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!isNil(errors.lastName)}>
                <FormLabel>Last name</FormLabel>
                <Input placeholder={"Doe"} {...register("lastName")} />
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              </FormControl>
            </Stack>

            <FormControl isRequired isInvalid={!isNil(errors.email)}>
              <FormLabel>Email address</FormLabel>
              <Input
                type={"email"}
                placeholder={"john@doe.org"}
                {...register("email")}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!isNil(errors.password)}>
              <FormLabel>Password</FormLabel>
              <Input
                type={"password"}
                placeholder={"Minimum 8 characters"}
                {...register("password")}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Button
              type={"submit"}
              isLoading={isSubmitting}
              isDisabled={!isValid || isSubmitting || !isDirty}
            >
              Sign Up
            </Button>
          </Stack>
        </form>
      </AuthUi>
    </SectionInDevelopment>
  );
};

export default Page;