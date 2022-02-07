import Document, { Html, Head, Main, NextScript } from "next/document";

class Polygon extends Document {
  public render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel={"manifest"} href={"/manifest.json"} />
          <link rel={"apple-touch-icon"} href={"/icon-256x256.png"} />
          <link rel={"preconnect"} href={"https://fonts.googleapis.com"} />
          <link
            rel={"preconnect"}
            crossOrigin={""}
            href={"https://fonts.gstatic.com"}
          />
          <link
            rel={"stylesheet"}
            href={
              "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
            }
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Polygon;
