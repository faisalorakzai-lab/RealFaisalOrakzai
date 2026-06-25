import { motion } from "framer-motion";
import { useSubmitContact } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Globe, Briefcase, Mic, TrendingUp, Users, CheckCircle } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  type: z.string().min(1, "Request type is required"),
  organization: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof schema>;

const requestTypes = [
  { value: "Partnership", label: "Partnership", icon: <Briefcase className="h-4 w-4" /> },
  { value: "Media", label: "Media Request", icon: <Mic className="h-4 w-4" /> },
  { value: "Speaking", label: "Speaking Invitation", icon: <Globe className="h-4 w-4" /> },
  { value: "Investment", label: "Investment Inquiry", icon: <TrendingUp className="h-4 w-4" /> },
  { value: "Business Collaboration", label: "Business Collaboration", icon: <Users className="h-4 w-4" /> },
];

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitContact();

  const form = useForm<ContactForm>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", type: "", organization: "", message: "" },
  });

  const onSubmit = (data: ContactForm) => {
    mutation.mutate({ data }, {
      onSuccess: () => {
        setSubmitted(true);
        toast({ title: "Request Submitted", description: "We will review your request and respond shortly." });
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to submit request. Please try again.", variant: "destructive" });
      },
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono tracking-widest mb-6">
            <span className="animate-pulse h-2 w-2 rounded-full bg-primary inline-block" /> NETWORK HUB ACTIVE
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold font-mono tracking-tighter uppercase mb-4">CONTACT & <span className="text-primary">NETWORK</span></h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">Connect with the Orakzai ecosystem. Every serious request receives a response.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Request Types */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold font-mono tracking-tighter uppercase mb-2">WHAT CAN WE DO?</h2>
              <p className="text-muted-foreground text-sm">Select the appropriate request type for the fastest routing to the right team.</p>
            </div>
            <div className="space-y-3">
              {requestTypes.map((type) => (
                <motion.div key={type.value} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 p-4 bg-card border border-border/50 hover:border-primary/30 transition-all group cursor-pointer" onClick={() => form.setValue("type", type.value)}>
                  <div className="text-primary">{type.icon}</div>
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">{type.label}</span>
                </motion.div>
              ))}
            </div>
            <div className="bg-card border border-border/50 p-6 space-y-3">
              <h3 className="font-bold text-sm font-mono uppercase">GLOBAL REACH</h3>
              <p className="text-xs text-muted-foreground">Pakistan · UAE · UK · USA · Remote</p>
              <div className="border-t border-border/50 pt-3 text-xs text-muted-foreground font-mono">RESPONSE TIME: 24-72 HOURS</div>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center space-y-6 py-20">
              <div className="w-20 h-20 border-2 border-primary flex items-center justify-center text-primary">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold font-mono uppercase">REQUEST RECEIVED</h2>
              <p className="text-muted-foreground max-w-sm">Your request has been logged in our system. A member of the Orakzai team will be in touch within 24-72 hours.</p>
              <button onClick={() => setSubmitted(false)} className="text-xs font-mono text-primary hover:underline">SUBMIT ANOTHER REQUEST</button>
            </motion.div>
          ) : (
            <div className="bg-card border border-border/50 p-8">
              <h2 className="text-lg font-bold font-mono uppercase mb-6">SUBMIT REQUEST</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono text-muted-foreground tracking-widest">FULL NAME</FormLabel>
                        <FormControl><Input {...field} className="bg-background border-border/50 focus:border-primary font-mono text-sm" data-testid="input-name" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono text-muted-foreground tracking-widest">EMAIL</FormLabel>
                        <FormControl><Input {...field} type="email" className="bg-background border-border/50 focus:border-primary font-mono text-sm" data-testid="input-email" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="type" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono text-muted-foreground tracking-widest">REQUEST TYPE</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background border-border/50 focus:border-primary font-mono text-sm" data-testid="select-type">
                            <SelectValue placeholder="Select type..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {requestTypes.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="organization" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono text-muted-foreground tracking-widest">ORGANIZATION (OPTIONAL)</FormLabel>
                      <FormControl><Input {...field} className="bg-background border-border/50 focus:border-primary font-mono text-sm" data-testid="input-organization" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono text-muted-foreground tracking-widest">MESSAGE</FormLabel>
                      <FormControl><Textarea {...field} rows={5} className="bg-background border-border/50 focus:border-primary font-mono text-sm resize-none" data-testid="textarea-message" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" disabled={mutation.isPending} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono rounded-none glow-gold" data-testid="button-submit">
                    {mutation.isPending ? "TRANSMITTING..." : "SUBMIT REQUEST"}
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
