import { env } from "@/lib/env";

type HeaderStore = Pick<Headers, "get">;

function isRoutableHost(host: string) {
  return !/^0\.0\.0\.0(?::\d+)?$/i.test(host) && !/^\[::\](?::\d+)?$/i.test(host);
}

export function getOriginFromHeaders(headerStore: HeaderStore) {
  const forwardedProto = headerStore.get("x-forwarded-proto");
  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost || headerStore.get("host");

  if (host && isRoutableHost(host)) {
    const protocol = forwardedProto || (host.includes("localhost") ? "http" : "https");
    return `${protocol}://${host}`;
  }

  return env.appUrl;
}

export function toRelativeAppRedirect(value: unknown, fallbackPath: string) {
  if (typeof value !== "string" || !value) {
    return fallbackPath;
  }

  if (value.startsWith("/")) {
    return value;
  }

  try {
    const url = new URL(value);
    const relativePath = `${url.pathname}${url.search}${url.hash}`;
    return relativePath.startsWith("/") ? relativePath : fallbackPath;
  } catch {
    return fallbackPath;
  }
}
