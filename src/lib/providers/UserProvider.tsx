import { createContext, ReactNode, useEffect } from "react";
import { User, useUserStore } from "~/lib/stores/useUserStore";

interface IUserContext {
  user: Partial<User> | null;
}

const UserContext = createContext<IUserContext>({
  user: null,
});

interface IUserContextProvider extends IUserContext {
  children: ReactNode;
}

export const UserProvider = ({
  children,
  user: __user,
}: IUserContextProvider) => {
  const [user = __user, setUser] = useUserStore(({ user, setUser }) => [
    user,
    setUser,
  ]);

  useEffect(() => {
    setUser(__user);
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
