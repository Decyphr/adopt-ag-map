import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Toaster } from "~/components/ui/toaster";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
  <>
    <Component {...pageProps} />
    <Toaster />
  </>
  );
};

export default api.withTRPC(MyApp);
