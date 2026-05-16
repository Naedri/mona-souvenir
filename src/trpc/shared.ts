import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";

export const trpcConfig = {
  transformer: superjson,
  links: [
    httpBatchLink({
      url: "/api/trpc"
    })
  ]
};
