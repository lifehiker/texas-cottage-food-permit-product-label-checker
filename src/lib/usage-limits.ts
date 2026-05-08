import { db } from "@/lib/db";

export const FREE_USAGE_LIMITS = {
  eligibility: 3,
  readiness: 1,
} as const;

type UsageKind = keyof typeof FREE_USAGE_LIMITS;

type UsageCookieState = {
  month: string;
  eligibility: number;
  readiness: number;
};

type UsageResult = {
  allowed: boolean;
  used: number;
  limit: number;
  remaining: number;
};

const COOKIE_NAME = "txcf_usage";

type RequestCookieStore = {
  get(name: string): { value: string } | undefined;
};

type ResponseCookieStore = {
  set(
    name: string,
    value: string,
    options: {
      httpOnly: boolean;
      sameSite: "lax";
      secure: boolean;
      path: string;
      maxAge: number;
    },
  ): void;
};

function getMonthKey(date = new Date()) {
  return date.toISOString().slice(0, 7);
}

function emptyUsageState(month = getMonthKey()): UsageCookieState {
  return {
    month,
    eligibility: 0,
    readiness: 0,
  };
}

function parseCookieValue(value?: string): UsageCookieState {
  if (!value) {
    return emptyUsageState();
  }

  try {
    const parsed = JSON.parse(value) as Partial<UsageCookieState>;
    if (parsed.month !== getMonthKey()) {
      return emptyUsageState();
    }

    return {
      month: parsed.month || getMonthKey(),
      eligibility: Number(parsed.eligibility || 0),
      readiness: Number(parsed.readiness || 0),
    };
  } catch {
    return emptyUsageState();
  }
}

export async function getUserUsage(userId: string, kind: UsageKind) {
  const now = new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

  if (kind === "eligibility") {
    const used = await db.eligibilityCheck.count({
      where: {
        userId,
        createdAt: { gte: monthStart },
      },
    });

    return finalizeUsage(kind, used);
  }

  const used = await db.readinessChecklist.count({
    where: {
      userId,
      createdAt: { gte: monthStart },
    },
  });

  return finalizeUsage(kind, used);
}

export function getAnonymousUsage(cookieStore: RequestCookieStore, kind: UsageKind) {
  const state = parseCookieValue(cookieStore.get(COOKIE_NAME)?.value);
  return finalizeUsage(kind, state[kind]);
}

export function incrementAnonymousUsage(
  cookieStore: RequestCookieStore,
  responseCookies: ResponseCookieStore,
  kind: UsageKind,
) {
  const state = parseCookieValue(cookieStore.get(COOKIE_NAME)?.value);
  const nextState = {
    ...state,
    [kind]: state[kind] + 1,
  };

  responseCookies.set(COOKIE_NAME, JSON.stringify(nextState), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 35,
  });
}

function finalizeUsage(kind: UsageKind, used: number): UsageResult {
  const limit = FREE_USAGE_LIMITS[kind];
  return {
    allowed: used < limit,
    used,
    limit,
    remaining: Math.max(limit - used, 0),
  };
}
