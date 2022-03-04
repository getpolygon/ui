import { Axios } from "axios";
import { isNil } from "lodash";
import axios from "~/lib/http/axios";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

const AUTHORIZATION_HEADER: string = "Authorization";
const REFRESH_TOKEN_HEADER: string = "X-Refresh-Token";

const configureInstance = (
  instance: Axios,
  ctx: GetServerSidePropsContext
): Axios => {
  instance.interceptors.request.use((c) => {
    c.headers = {
      [REFRESH_TOKEN_HEADER]: `${ctx.req.session.auth.refreshToken}`,
      [AUTHORIZATION_HEADER]: `Bearer ${ctx.req.session.auth.accessToken}`,
    };

    c.validateStatus = () => true;
    return c;
  });

  return instance;
};

interface IWithTokenAuthOptions {
  options?: {
    instance?: Axios;
  };
}

interface IWithTokenAuthCallbacks<OS, OF> {
  onFail: () => Promise<OF>;
  onSuccess: (axios: Axios) => Promise<OS>;
}

interface IWithTokenAuthProps<OS, OF>
  extends IWithTokenAuthCallbacks<OS, OF>,
    IWithTokenAuthOptions {
  ctx: GetServerSidePropsContext;
}

export const withTokenAuth = async <OS = {}, OF = {}>({
  ctx,
  onFail,
  options,
  onSuccess,
}: IWithTokenAuthProps<OS, OF>) => {
  if (isNil(ctx.req.session.auth)) return await onFail();
  else return onSuccess(configureInstance(options?.instance ?? axios, ctx));
};
