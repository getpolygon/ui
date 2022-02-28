import {
  useRef,
  useState,
  useEffect,
  useContext,
  ReactElement,
  createContext,
} from "react";
import { noop } from "lodash";
import { Progress, VStack, CircularProgress } from "@chakra-ui/react";

type Props = {
  children: ReactElement | ReactElement[];
};

type Progress = {
  value: number;
  done: () => void;
  start: () => void;
};

const LoadingProgressContext = createContext<Progress>({
  value: 0,
  done: noop,
  start: noop,
});

export const useLoadingProgress = (): Progress => {
  return useContext<Progress>(LoadingProgressContext);
};

export const LoadingProgress = () => {
  const { value } = useLoadingProgress();

  return (
    <VStack
      top={0}
      left={0}
      right={0}
      zIndex={9999}
      align={"flex-end"}
      position={"absolute"}
    >
      <Progress
        size={"xs"}
        value={value}
        width={"full"}
        colorScheme={"purple"}
        sx={{ '>[role="progressbar"]': { transition: "width 200ms ease-out" } }}
      />

      <CircularProgress
        pr={2}
        size={"24px"}
        isIndeterminate
        color={"purple.400"}
        trackColor={"transparent"}
      />
    </VStack>
  );
};

export const LoadingProgressProvider = ({ children }: Props): ReactElement => {
  const step = useRef(5);
  const [value, setValue] = useState(0);
  const [isOn, setOn] = useState(false);

  useEffect(() => {
    if (isOn) {
      let timeout = 0;

      if (value < 20) step.current = 5;
      else if (value < 40) step.current = 4;
      else if (value < 60) step.current = 3;
      else if (value < 80) step.current = 2;
      else step.current = 1;

      if (value <= 98) {
        // @ts-ignore
        timeout = window.setTimeout(() => {
          setValue(value + step.current);
        }, 500);
      }

      return () => {
        if (timeout) window.clearTimeout(timeout);
      };
    }
  }, [value, isOn]);

  const start = () => {
    setValue(0);
    return setOn(true);
  };

  const done = () => {
    setValue(100);
    return setTimeout(() => setOn(false), 600);
  };

  return (
    <LoadingProgressContext.Provider
      value={{
        done,
        start,
        value,
      }}
    >
      {isOn && <LoadingProgress />}
      {children}
    </LoadingProgressContext.Provider>
  );
};
