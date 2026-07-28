import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10),
});

const contacts: Array<{ id: string; submittedAt: string } & z.infer<typeof contactSchema>> = [];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", (req, res) => {
    const result = contactSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Invalid form data", details: result.error.flatten() });
    }

    const contact = {
      ...result.data,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
    };
    contacts.push(contact);

    console.log(`[Contact] New inquiry from ${contact.name} <${contact.email}> at ${contact.company ?? "—"}`);

    return res.status(200).json({ success: true, message: "Message received" });
  });

  return httpServer;
}
