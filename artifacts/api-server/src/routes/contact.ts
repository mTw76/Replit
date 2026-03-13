import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactsTable, insertContactSchema } from "@workspace/db/schema";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = insertContactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }
  await db.insert(contactsTable).values(parsed.data);
  res.status(201).json({ success: true });
});

export default router;
