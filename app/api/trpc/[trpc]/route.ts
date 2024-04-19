import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/index";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: function (
      opts: FetchCreateContextFnOptions,
    ): object | Promise<object> {
      opts.resHeaders.append("Access-Control-Allow-Origin", "*");
      opts.resHeaders.append("Access-Control-Request-Method", "*");
      opts.resHeaders.append("Access-Control-Allow-Methods", "POST, GET");
      opts.resHeaders.append("Access-Control-Allow-Headers", "*");
      return opts;
    },
  });
};

export { handler as GET, handler as POST };
