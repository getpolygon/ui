import {
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface PasswordInputWithToggleProps extends InputProps {}

export const PasswordInputWithToggle = (
  props: PasswordInputWithToggleProps
) => {
  const [show, setShow] = useState(false);

  return (
    <InputGroup>
      <Input type={show ? "text" : "password"} {...props} />

      <InputRightElement>
        <IconButton
          size={"sm"}
          onClick={() => setShow(!show)}
          aria-label={"Toggle password visibility"}
          icon={show ? <AiFillEyeInvisible /> : <AiFillEye />}
        />
      </InputRightElement>
    </InputGroup>
  );
};
