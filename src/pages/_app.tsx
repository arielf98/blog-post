import ResponsiveAppBar from "@component/components/Appbar";
import { store } from "@component/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ResponsiveAppBar />
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}
