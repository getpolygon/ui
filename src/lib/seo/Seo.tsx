import {
  WEBSITE_DEFAULT_LOCALE,
  WEBSITE_DESCRIPTION,
  WEBSITE_TITLE,
  WEBSITE_TYPE,
} from "./constants";
import { NextSeo } from "next-seo";

interface ISeoProps {
  title?: string;
  description?: string;
}

export const Seo = (props: ISeoProps) => (
  <NextSeo
    noindex
    nofollow
    title={props.title ?? WEBSITE_TITLE}
    description={props.description ?? WEBSITE_DESCRIPTION}
    openGraph={{
      type: WEBSITE_TYPE,
      locale: WEBSITE_DEFAULT_LOCALE,
      title: props.title ?? WEBSITE_TITLE,
      site_name: props.title ?? WEBSITE_TITLE,
      description: props.description ?? WEBSITE_DESCRIPTION,
    }}
  />
);
