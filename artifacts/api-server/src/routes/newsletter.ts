import { Router, type IRouter } from "express";
import { db, subscribersTable } from "@workspace/db";
import { insertSubscriberSchema } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.post("/newsletter/subscribe", async (req, res) => {
  const parsed = insertSubscriberSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }

  const { name, email } = parsed.data;

  const existing = await db
    .select()
    .from(subscribersTable)
    .where(eq(subscribersTable.email, email))
    .limit(1);

  if (existing.length > 0) {
    res.status(409).json({ error: "Already subscribed" });
    return;
  }

  await db.insert(subscribersTable).values({ name, email });
  res.status(201).json({ success: true });
});

export default router;
