import { ReactElement, ReactNode } from "react";

import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import createEmotionCache from "../createEmotionCache";
import theme from "../theme";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";

/**
 * @see https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#with-typescript
 */
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const queryClient = new QueryClient();

const clientSideEmotionCache = createEmotionCache();
type MyAppProps = AppProps & {
  Component: NextPageWithLayout;
  session: Session;
  emotionCache?: EmotionCache;
};

function MyApp({
  Component,
  session,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
