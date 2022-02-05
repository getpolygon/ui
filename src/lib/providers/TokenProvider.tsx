import { useTokenStore } from "~/lib/stores/useTokenStore";
import { createContext, ReactNode, useEffect } from "react";

interface ITokenContext {
  tokens: {
    access: string | null;
    refresh: string | null;
  };
}

const TokenContext = createContext<ITokenContext>({
  tokens: {
    access: null,
    refresh: null,
  },
});

interface ITokenContextProvider extends ITokenContext {
  children: ReactNode;
}

export const TokenProvider = ({
  tokens: __tokens,
  children,
}: ITokenContextProvider) => {
  const [tokens = __tokens, setAccess, setRefresh] = useTokenStore(
    ({ tokens, setAccess, setRefresh }) => [tokens, setAccess, setRefresh]
  );

  useEffect(() => {
    setAccess(__tokens.access);
    setRefresh(__tokens.refresh);
  }, []);

  return (
    <TokenContext.Provider value={{ tokens }}>{children}</TokenContext.Provider>
  );
};
