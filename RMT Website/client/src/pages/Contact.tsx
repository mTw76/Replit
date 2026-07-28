import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, CheckCircle2, Award, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Please tell us a bit more about your needs"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => setSubmitted(true),
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us at bharvey@rmt.solutions",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Get in Touch
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-foreground leading-none tracking-tight mb-6">
            Let's Have a Conversation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Tell us about your advertising goals. We'll show you how RMT can help you find the audiences
            and contexts most likely to respond to your specific campaigns.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div
              className="rounded-lg border border-primary/20 bg-primary/5 p-12 text-center flex flex-col items-center gap-6"
              data-testid="contact-success"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground mb-2">Message Received</h2>
                <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. Bill Harvey or a member of the RMT team will be in touch
                  with you shortly.
                </p>
              </div>
              <a
                href="mailto:bharvey@rmt.solutions"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Mail className="w-4 h-4" />
                bharvey@rmt.solutions
              </a>
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-card p-8">
              <h2 className="text-lg font-black text-foreground mb-6">Your Information</h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((d) => mutation.mutate(d))}
                  className="flex flex-col gap-5"
                  data-testid="form-contact"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Smith" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jane@company.com" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Phone
                          </FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+1 (555) 000-0000" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Company
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Your organization" {...field} data-testid="input-company" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          How Can We Help? *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your advertising goals, challenges, or questions..."
                            className="resize-none min-h-[130px]"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                      data-testid="button-submit-contact"
                    >
                      {mutation.isPending ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Direct Contact
            </p>
            <h3 className="font-black text-foreground mb-0.5">Bill Harvey</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Chairman, CEO & Chief Research Officer
            </p>
            <a
              href="mailto:bharvey@rmt.solutions"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
              data-testid="link-sidebar-email"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              bharvey@rmt.solutions
            </a>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 flex flex-col gap-3">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Our Guarantee</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We guarantee high response results or the equivalent of your money back. We're confident
              because we've consistently delivered.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 flex flex-col gap-3">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-sm font-bold text-foreground">Why Work With RMT?</h3>
            <ul className="flex flex-col gap-1.5">
              {[
                "Emmy® Award-winning technology",
                "6 independent proof studies",
                "Fortune 500 client experience",
                "Money-back makegood guarantee",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
