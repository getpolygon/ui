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
import { useEffect, useState } from "react";
import { useToast } from "~/lib/ui/useToast";
import { AuthUi } from "~/modules/auth/AuthUi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { AuthUiSearchParam } from "~/modules/auth/AuthUiSearchParam";
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
  const { searchParams } = new URL(window.location.href);
  const [callbackUrl, setCallbackUrl] = useState("/platform");
  const { errors, isValid, isDirty, isSubmitting } = formState;

  const submit = async (payload: Schema) => {
    const response = await axios.post("/api/auth/login", payload);
    if (response.status === 200) {
      return Router.push(callbackUrl);
    } else {
      return toast({
        status: "error",
        title: "There was an error",
        // Sorry for the ternary ternary operator. I hate it too :)
        description:
          response.status === 403
            ? "Please provide valid credentials"
            : response.status === 404
            ? "The account with the supplied email does not exist"
            : "We were not able to understand your error",
      });
    }
  };

  useEffect(() => {
    {
      const cbUrl = searchParams.get(AuthUiSearchParam.CallbackUrl);
      const authRequired = Boolean(
        searchParams.get(AuthUiSearchParam.AuthRequired)
      );

      if (cbUrl) setCallbackUrl(cbUrl);
      if (authRequired) {
        toast({
          status: "error",
          title: "Authentication required",
          description: "Please login or create a new account to continue",
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
};

export default Page;
