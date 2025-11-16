import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  featureId: z.string(),
  action: z.enum(["increment", "decrement"]),
});

// In-memory reaction store (dev/demo only). Replace with DB in production.
const globalAny = global as { __featureReactions?: Record<string, number> };

// Default initial values
const defaultReactions: Record<string, number> = {
  qrCodePayments: 74,
  paymentLinks: 81,
  fastPayouts: 68,
  donations: 76,
  multiCurrency: 72,
  subscriptions: 15,
  invoicing: 18,
  customers: 13,
  teamAccounts: 22,
  virtualCards: 19,
  physicalCards: 16,
};

// Initialize or reset to defaults
if (!globalAny.__featureReactions) {
  globalAny.__featureReactions = { ...defaultReactions };
} else {
  // Reset values that are suspiciously low (like 13) to their defaults
  // This handles the case where old state has incorrect values
  Object.keys(defaultReactions).forEach((key) => {
    const existingValue = globalAny.__featureReactions![key];
    // If value doesn't exist or is suspiciously low (like 13) and default is high, reset to default
    // This catches the "all 13" issue while preserving legitimate user reactions
    if (
      existingValue === undefined ||
      (existingValue < 50 && defaultReactions[key] >= 50)
    ) {
      globalAny.__featureReactions![key] = defaultReactions[key];
    }
  });
}

const reactionStore: Record<string, number> = globalAny.__featureReactions;

export async function GET() {
  return NextResponse.json(reactionStore);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { featureId, action } = parsed.data;

  if (!reactionStore[featureId]) {
    reactionStore[featureId] = 13; // Default starting value
  }

  if (action === "increment") {
    reactionStore[featureId] = (reactionStore[featureId] || 0) + 1;
  } else if (action === "decrement") {
    reactionStore[featureId] = Math.max(0, (reactionStore[featureId] || 0) - 1);
  }

  return NextResponse.json({
    count: reactionStore[featureId],
    allReactions: reactionStore,
  });
}
