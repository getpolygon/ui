import { NextPage } from "next";

const Page: NextPage = (props: any) => {
  return <>{JSON.stringify(props, undefined, 4)}</>;
};

export default Page;
