import { env } from "@/lib/env";

type HeaderStore = Pick<Headers, "get">;

export function getOriginFromHeaders(headerStore: HeaderStore) {
  const forwardedProto = headerStore.get("x-forwarded-proto");
  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost || headerStore.get("host");

  if (host) {
    const protocol = forwardedProto || (host.includes("localhost") ? "http" : "https");
    return `${protocol}://${host}`;
  }

  return env.appUrl;
}
