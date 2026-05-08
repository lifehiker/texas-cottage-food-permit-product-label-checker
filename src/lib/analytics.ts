import { db } from "@/lib/db";

export async function trackServerEvent(eventName: string, payload?: Record<string, unknown>) {
  await db.analyticsEvent.create({
    data: {
      eventName,
      payloadJson: payload ? JSON.stringify(payload) : null,
    },
  });
}
