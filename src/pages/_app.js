import Head from "next/head";
import Layout from "./layout";
import "../styles/globals.css";
import Hadi from "../public/Hadi.jpg";
import icon from "../public/favicon.ico";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Hadi Azari</title>
        <link rel="icon" href={icon.src} />

        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Hadi Azari" />
        <meta
          property="og:description"
          content="High-Level BackEnd Developer | Mid-Level FrontEnd Developer"
        />
        <meta property="og:image" content={Hadi.src} />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}
