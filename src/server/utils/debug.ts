import { env } from "@/env";

function isDebugEnabled() {
  return env.NODE_ENV === "development";
}

export const debug = {
  log(scope: string, message: string, payload?: unknown) {
    if (!isDebugEnabled()) {
      return;
    }

    console.log(`[${scope}] ${message}`, payload ?? "");
  },

  warn(scope: string, message: string, payload?: unknown) {
    if (!isDebugEnabled()) {
      return;
    }

    console.warn(`[${scope}] ${message}`, payload ?? "");
  },

  error(scope: string, message: string, payload?: unknown) {
    if (!isDebugEnabled()) {
      return;
    }

    console.error(`[${scope}] ${message}`, payload ?? "");
  },

  async time<T>(
    scope: string,
    message: string,
    callback: () => Promise<T>
  ): Promise<T> {
    if (!isDebugEnabled()) {
      return callback();
    }

    const label = `[${scope}] ${message}`;

    console.time(label);

    try {
      return await callback();
    } finally {
      console.timeEnd(label);
    }
  }
};
