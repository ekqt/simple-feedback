import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserProvider from "../components/Providers/UserProvider";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <UserProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    );
}

export default MyApp;
