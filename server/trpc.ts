import type { AppRouter } from "./index";
import { createTRPCReact } from "@trpc/react-query";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export function createContext({
  resHeaders,
  info,
  req,
}: FetchCreateContextFnOptions) {
  resHeaders.append("Access-Control-Allow-Origin", "*");
  return { resHeaders, info, req };
}

export const trpc = createTRPCReact<AppRouter>();

export type TRPCAppContext = typeof createContext;
