import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  chakra,
} from "@chakra-ui/react";
import { z } from "zod";
import axios from "axios";
import { isNil } from "lodash";
import { NextPage } from "next";
import Router from "next/router";
import NextLink from "next/link";
import { useToast } from "~/lib/ui/useToast";
import { AuthUi } from "~/modules/auth/AuthUi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SectionInDevelopment } from "~/components/SectionInDevelopment";
import { PasswordInputWithToggle } from "~/components/PasswordInputWithToggle";

const schema = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" }),
});

type Schema = z.infer<typeof schema>;

const heading = (
  <>
    Login to{" "}
    <chakra.span fontWeight={"9000"} color={"purple.400"}>
      Polygon
    </chakra.span>
  </>
);

const helper = (
  <>
    Don{"'"}t have an account?{" "}
    <NextLink passHref href={"/auth/signup"}>
      <chakra.a
        _hover={{
          color: "purple.200",
        }}
        color={"purple.300"}
      >
        Create one
      </chakra.a>
    </NextLink>{" "}
    now!
  </>
);

const Page: NextPage = () => {
  const { formState, register, handleSubmit, control } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const toast = useToast();
  const { errors, isValid, isDirty, isSubmitting } = formState;

  const submit = async (payload: Schema) => {
    const response = await axios.post("/api/auth/login", payload);
    if (response.status === 200) return Router.push("/platform");
    else {
      let reason: string;

      switch (response.status) {
        case 403:
          reason = "Please provide a valid password";
        case 404:
          reason = "The account with the supplied email does not exist";
        default:
          reason = "We were not able to understand your error";
      }

      return toast({
        status: "error",
        description: reason,
        title: "There was an error",
      });
    }
  };

  return (
    <SectionInDevelopment>
      <AuthUi
        seo={{
          prefix: "Login",
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
            <FormControl isRequired isInvalid={!isNil(errors.email)}>
              <FormLabel htmlFor={"email"}>Email</FormLabel>

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

            <Button
              type={"submit"}
              isLoading={isSubmitting}
              disabled={!isValid || !isDirty || isSubmitting}
            >
              Log in
            </Button>
          </Stack>
        </form>
      </AuthUi>
    </SectionInDevelopment>
  );
};

export default Page;
