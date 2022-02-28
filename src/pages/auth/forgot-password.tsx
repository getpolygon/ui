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
import axios from "~/lib/http/axios";
import { useForm } from "react-hook-form";
import { AuthUi } from "~/modules/auth/AuthUi";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
});

type Schema = z.infer<typeof schema>;

const Page: NextPage = () => {
  const { register, handleSubmit, formState } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const { errors, isValid, isDirty, isSubmitting } = formState;

  const submit = async (payload: Schema) => {
    const response = await axios.post("/api/auth/reset-password", payload);
    console.log(response);
  };

  return (
    <AuthUi
      seo={{ prefix: "Password reset" }}
      actions={{
        secondary: {
          href: "/auth/signup",
          text: "Create an account at Polygon",
        },
      }}
      heading={{
        children: (
          <>
            Reset your password at{" "}
            <chakra.span fontWeight={"9000"} color={"purple.400"}>
              Polygon
            </chakra.span>{" "}
          </>
        ),
      }}
    >
      <form
        autoCorrect={"off"}
        autoComplete={"off"}
        autoCapitalize={"off"}
        onSubmit={handleSubmit(submit)}
      >
        <Stack spacing={4}>
          <FormControl isRequired isInvalid={!isNil(errors.email)}>
            <FormLabel>Email address</FormLabel>
            <Input
              type={"email"}
              placeholder={"john@doe.org"}
              {...register("email")}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type={"submit"}
            isLoading={isSubmitting}
            isDisabled={!isDirty || !isValid || isSubmitting}
          >
            Submit request
          </Button>
        </Stack>
      </form>
    </AuthUi>
  );
};

export default Page;
