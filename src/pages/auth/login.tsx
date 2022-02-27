import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  chakra,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { z } from "zod";
import { isNil } from "lodash";
import { NextPage } from "next";
import { useState } from "react";
import NextLink from "next/link";
import { Seo } from "~/lib/seo/Seo";
import axios from "~/lib/http/axios";
import { useForm } from "react-hook-form";
import { AuthUi } from "~/modules/auth/AuthUi";
import { WEBSITE_TITLE } from "~/lib/seo/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { SectionInDevelopment } from "~/components/SectionInDevelopment";

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
    <NextLink passHref href={"/auth/register"}>
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
  const { formState, register, handleSubmit } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const submit = async (payload: Schema) => {
    const response = await axios.post("/api/login", payload);
    return console.log(response);
  };

  const [showPassword, setShowPassword] = useState(false);
  const { errors, isValid, isDirty, isSubmitting } = formState;

  return (
    <>
      <Seo title={"Login" + " - " + WEBSITE_TITLE} />

      <SectionInDevelopment>
        <AuthUi
          actions={{
            helper,
            primary: {
              href: "/",
              text: "← Back to the main page",
            },
            secondary: {
              text: "Forgot password?",
              href: "/auth/forgot-password",
            },
          }}
          heading={heading}
          seo={{
            prefix: "Login",
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
                  id={"email"}
                  type={"email"}
                  placeholder={"john@doe.org"}
                  {...register("email")}
                />

                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!isNil(errors.password)}>
                <FormLabel htmlFor={"password"}>Password</FormLabel>

                <InputGroup>
                  <Input
                    id={"password"}
                    placeholder={"Minimum 8 characters"}
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />

                  <InputRightElement>
                    <IconButton
                      size={"sm"}
                      icon={
                        showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                      }
                      aria-label={"Toggle password visibility"}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>

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
    </>
  );
};

export default Page;
