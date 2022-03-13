export const enum AuthQueryParams {
  CallbackUrl = "callback-url",
  IsRedirected = "is-redirected",
  AuthRequired = "auth-required",
}

export const useAuthQueryParams = <T>(
  param: AuthQueryParams,
  parse: boolean = false
): T | string | null => {
  const { searchParams } = new URL(window.location.href);
  const foundParam = searchParams.get(param);

  if (foundParam !== null) {
    if (parse) {
      return JSON.parse(foundParam) as T;
    } else {
      return foundParam;
    }
  } else {
    return null;
  }
};
