import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { z } from "zod";
import { isNil } from "lodash";
import { NextPage } from "next";
import NextLink from "next/link";
import axios from "~/lib/http/axios";
import { useToast } from "~/lib/ui/useToast";
import { AuthUi } from "~/modules/auth/AuthUi";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInputWithToggle } from "~/components/PasswordInputWithToggle";

const schema = z.object({
  username: z.string().regex(/^[a-z0-9_-]{3,15}$/gm, {
    message: "Please enter a valid username",
  }),
  lastName: z.string({ required_error: "Please enter your last name" }),
  firstName: z.string({ required_error: "Please enter your first name" }),
  email: z.string().email({ message: "Please provide a valid email address" }),
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
  const { formState, register, handleSubmit, control } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const toast = useToast();
  const { errors, isValid, isSubmitting, isDirty } = formState;

  const submit = async (payload: Schema) => {
    const response = await axios.post("/api/auth/register", payload);
    if (response.status === 201) {
      toast({
        status: "success",
        title: "Account created successfully",
      });
    } else {
      toast({
        status: "error",
        title: "An error occurred",
        description: "There was an issue while creating your account",
      });
    }
  };

  return (
    <AuthUi
      seo={{
        prefix: "Register",
      }}
      heading={{
        helper,
        children: heading,
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
              <FormLabel htmlFor={"firstName"}>First name</FormLabel>

              <Input
                type={"text"}
                placeholder={"John"}
                {...register("firstName")}
              />

              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!isNil(errors.lastName)}>
              <FormLabel htmlFor={"lastName"}>Last name</FormLabel>

              <Input
                type={"text"}
                placeholder={"Doe"}
                {...register("lastName")}
              />

              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>
          </Stack>

          <FormControl isRequired isInvalid={!isNil(errors.username)}>
            <FormLabel htmlFor={"username"}>Username</FormLabel>

            <Input
              type={"text"}
              placeholder={"john_doe-1234"}
              {...register("username")}
            />

            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!isNil(errors.email)}>
            <FormLabel htmlFor={"email"}>Email address</FormLabel>

            <Input
              type={"email"}
              placeholder={"john@doe.org"}
              {...register("email")}
            />

            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!isNil(errors.password)}>
            <FormLabel htmlFor={"password"}>Password</FormLabel>

            <Controller
              control={control}
              name={"password"}
              render={({ field }) => (
                <PasswordInputWithToggle
                  id={"password"}
                  placeholder={"Minimum 8 characters"}
                  onChange={(f) => field.onChange(f.currentTarget.value)}
                />
              )}
            />

            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={}>
            <FormLabel htmlFor={"password"}>Confirm Password</FormLabel>

            <Controller
              control={control}
              name={"password"}
              render={({ field }) => (
                <PasswordInputWithToggle
                  id={"confirm-password"}
                  placeholder={"Minimum 8 characters"}
                  onChange={(f) => field.onChange(f.currentTarget.value)}
                />
              )}
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
  );
};

export default Page;
