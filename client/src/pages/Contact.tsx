import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, CheckCircle2, Award, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Please tell us a bit more about your needs"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const sidebarItems = [
  {
    icon: Award,
    title: "Emmy® Award-Winning Technology",
    description: "2022 Engineering, Science & Technology Emmy Award",
  },
  {
    icon: CheckCircle2,
    title: "Makegood Guarantee",
    description: "High response results or the equivalent of your money back",
  },
  {
    icon: Users,
    title: "Proven with Major Brands",
    description: "Fortune 500 companies, major retailers, TV networks",
  },
];

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
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at bharvey@rmt.solutions",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <Badge variant="outline" className="mb-4 text-xs px-3 py-1">Get in Touch</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Let's Have a Conversation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tell us about your advertising goals. We'll show you how RMT can help you find the audiences
            and contexts most likely to respond to your specific campaigns.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <Card className="p-10 border-card-border text-center flex flex-col items-center gap-5" data-testid="contact-success">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-foreground mb-2">Message Received</h2>
                <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. Bill Harvey or a member of the RMT team will be in touch
                  with you shortly. We look forward to the conversation.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>
                  Or email directly:{" "}
                  <a href="mailto:bharvey@rmt.solutions" className="text-primary hover:underline">
                    bharvey@rmt.solutions
                  </a>
                </span>
              </div>
            </Card>
          ) : (
            <Card className="p-8 border-card-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Your Information</h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                  data-testid="form-contact"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jane Smith"
                              {...field}
                              data-testid="input-name"
                            />
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
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="jane@company.com"
                              {...field}
                              data-testid="input-email"
                            />
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
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              {...field}
                              data-testid="input-phone"
                            />
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
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your organization"
                              {...field}
                              data-testid="input-company"
                            />
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
                        <FormLabel>How Can We Help? *</FormLabel>
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

                  <Button
                    type="submit"
                    size="lg"
                    disabled={mutation.isPending}
                    className="w-full sm:w-auto"
                    data-testid="button-submit-contact"
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          <Card className="p-6 border-card-border bg-card">
            <h3 className="font-bold text-foreground mb-1">Bill Harvey</h3>
            <p className="text-xs text-muted-foreground mb-4">Chairman, CEO & Chief Research Officer</p>
            <a
              href="mailto:bharvey@rmt.solutions"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
              data-testid="link-sidebar-email"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              bharvey@rmt.solutions
            </a>
          </Card>

          <div className="flex flex-col gap-4">
            {sidebarItems.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Card className="p-5 border-card-border bg-primary/5 border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-2">Our Guarantee</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We guarantee high response results or the equivalent of your money back (a makegood). We're
              confident because we've consistently delivered.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
