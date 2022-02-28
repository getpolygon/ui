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
import { isNil } from "lodash";
import { NextPage } from "next";
import NextLink from "next/link";
import axios from "~/lib/http/axios";
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

  const { errors, isValid, isDirty, isSubmitting } = formState;

  const submit = async (payload: Schema) => {
    const response = await axios.post("/api/login", payload);
    return console.log(response);
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
