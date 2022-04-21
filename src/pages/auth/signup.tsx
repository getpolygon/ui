import {
  Button,
  chakra,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
} from "@chakra-ui/react";
import {
  AuthQueryParams,
  useAuthQueryParams,
} from "~/lib/ui/hooks/useAuthQueryParams";
import { z } from "zod";
import { isNil } from "lodash";
import { NextPage } from "next";
import NextLink from "next/link";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "~/lib/http/axios";
import { AuthUi } from "~/modules/auth/AuthUi";
import { useToast } from "~/lib/ui/hooks/useToast";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInputWithToggleProps } from "~/components/PasswordInputWithToggle";

const PasswordInputWithToggle = dynamic<PasswordInputWithToggleProps>(() =>
  import("~/components/PasswordInputWithToggle").then(
    (m) => m.PasswordInputWithToggle
  )
);

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
  const schema = z
    .object({
      lastName: z.string({ required_error: "Please enter your last name" }),
      firstName: z.string({ required_error: "Please enter your first name" }),

      username: z
        .string()
        .min(3, { message: "Username must contain at least 3 characters" })
        .max(15, { message: "Username cannot contain more than 15 characters" })
        .regex(/^[a-z0-9_-]{3,15}$/gm, {
          message: "Please enter a valid username, only lowercase",
        }),

      email: z
        .string()
        .email({ message: "Please provide a valid email address" }),

      password: z
        .string()
        .min(8, { message: "Password should be at least 8 characters long" }),

      confirmPassword: z
        .string()
        .min(8, { message: "Password should be at least 8 characters long" }),
    })
    .refine((f) => f.password === f.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  // prettier-ignore
  const { formState, register, handleSubmit, control } = useForm<z.infer<typeof schema>>({ mode: "onChange", resolver: zodResolver(schema) });
  const { errors, isValid, isSubmitting, isDirty } = formState;
  const toast = useToast();

  const callbackUrl = useAuthQueryParams(AuthQueryParams.CallbackUrl);
  const authRequired = useAuthQueryParams(AuthQueryParams.AuthRequired);
  const isRedirected = useAuthQueryParams(AuthQueryParams.IsRedirected);

  const submit = async (payload: z.infer<typeof schema>) => {
    if (!isValid || !isDirty) {
      return toast({
        status: "warning",
        title: "Invalid payload",
        description: "Contents of your submission are invalid or corrupted",
      });
    } else {
      const response = await axios.post("/api/auth/register", payload);
      if (response.status === 201) {
        return toast({
          status: "success",
          title: "Account created successfully",
        });
      } else {
        return toast({
          status: "error",
          title: "An error occurred",
          description: "There was an issue while creating your account",
        });
      }
    }
  };

  useEffect(() => {
    if (authRequired && isRedirected) {
      toast({
        title: "Please create an account to proceed",
        description: "The resource is only accessible to registered users",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <Input
                type={"text"}
                variant={"filled"}
                placeholder={"First name"}
                {...register("firstName")}
              />

              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!isNil(errors.lastName)}>
              <Input
                type={"text"}
                variant={"filled"}
                placeholder={"Last name"}
                {...register("lastName")}
              />

              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>
          </Stack>

          <FormControl isRequired isInvalid={!isNil(errors.username)}>
            <InputGroup>
              <InputLeftAddon>{"@"}</InputLeftAddon>
              <Input
                type={"text"}
                variant={"filled"}
                placeholder={"Username"}
                {...register("username")}
              />
            </InputGroup>

            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!isNil(errors.email)}>
            <Input
              type={"email"}
              variant={"filled"}
              placeholder={"Email address"}
              {...register("email")}
            />

            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!isNil(errors.password)}>
            <Controller
              control={control}
              name={"password"}
              render={({ field }) => (
                <PasswordInputWithToggle
                  id={"password"}
                  variant={"filled"}
                  placeholder={"Password (min. 8 characters)"}
                  onChange={(f) => field.onChange(f.currentTarget.value)}
                />
              )}
            />

            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!isNil(errors.confirmPassword)}>
            <Controller
              control={control}
              name={"confirmPassword"}
              render={({ field }) => (
                <PasswordInputWithToggle
                  id={"confirmPassword"}
                  variant={"filled"}
                  placeholder={"Confirm password (min. 8 characters)"}
                  onChange={(f) => field.onChange(f.currentTarget.value)}
                />
              )}
            />

            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
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
