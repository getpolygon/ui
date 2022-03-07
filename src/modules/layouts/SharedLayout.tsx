import Router from "next/router";
import { useEffect } from "react";
import { useLoadingProgress } from "~/lib/ui/loading-progress";

export const SharedLayout = ({ children }: { children: JSX.Element }) => {
  const { start, done } = useLoadingProgress();

  const onRouteChangeStart = () => start();
  const onRouteChangeComplete = () => setTimeout(() => done(), 500);

  useEffect(() => {
    Router.events.on("routeChangeStart", onRouteChangeStart);
    Router.events.on("routeChangeError", onRouteChangeComplete);
    Router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", onRouteChangeStart);
      Router.events.off("routeChangeError", onRouteChangeComplete);
      Router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  });

  return children;
};
