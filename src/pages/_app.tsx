import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

import createEmotionCache from "../createEmotionCache";
import theme from "../theme";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";

const queryClient = new QueryClient();

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  session: Session;
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
  session,
}: MyAppProps) {
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
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
