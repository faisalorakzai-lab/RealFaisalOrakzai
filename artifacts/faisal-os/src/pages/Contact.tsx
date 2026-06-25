import { motion } from "framer-motion";
import { useSubmitContact } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  type: z.string().min(1, "Request type is required"),
  organization: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactForm = z.infer<typeof schema>;

const requestTypes = ["Business Inquiry", "Partnership", "Media Contact", "Investment", "Speaking Invitation", "Collaboration"];

const socialLinks = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/faisalorakzaii" },
  { label: "Twitter / X", url: "https://x.com/faisalorakzaii" },
  { label: "Instagram", url: "https://www.instagram.com/faisalorakzaii" },
  { label: "Crunchbase", url: "https://www.crunchbase.com/person/faisal-orakzai" },
  { label: "GitHub", url: "https://github.com/faisalorakzai-lab" },
  { label: "ORCID", url: "https://orcid.org/0009-0000-0915-7272" },
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
      onSuccess: () => { setSubmitted(true); },
      onError: () => { toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" }); },
    });
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="pt-32 pb-16 border-b border-[#F3BA2F]/10 bg-grid">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
              <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.25em]">NETWORK HUB</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Connect</h1>
            <p className="text-white/40 text-xl max-w-xl">Collaboration is built on clarity and shared vision. Every serious request receives a response.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            <div className="space-y-10">
              <div>
                <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-6">INQUIRY TYPES</div>
                <div className="space-y-px bg-[#F3BA2F]/5">
                  {requestTypes.map((type, i) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => form.setValue("type", type)}
                      className="flex items-center justify-between bg-black px-6 py-4 cursor-pointer group hover:bg-[#F3BA2F]/3 transition-colors border-b border-white/5"
                    >
                      <span className="text-white/60 group-hover:text-white transition-colors text-sm">{type}</span>
                      <ArrowRight className="h-3 w-3 text-white/20 group-hover:text-[#F3BA2F] transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-6">PROFILES & NETWORKS</div>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((s) => (
                    <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/30 text-sm hover:text-[#F3BA2F] transition-colors font-mono text-xs">
                      <span className="text-[#F3BA2F]/30">→</span> {s.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="border border-[#F3BA2F]/10 p-6">
                <div className="text-[#F3BA2F] font-mono text-xs tracking-widest mb-3">RESPONSE TIME</div>
                <div className="text-white/50 text-sm">24–72 hours · Pakistan / UAE / Global</div>
              </div>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-20 space-y-6">
                <div className="w-16 h-16 border border-[#F3BA2F] flex items-center justify-center text-[#F3BA2F]">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold">Request Received</h2>
                <p className="text-white/40 max-w-sm">Your request has been logged. A member of the team will be in touch within 24–72 hours.</p>
                <button onClick={() => setSubmitted(false)} className="text-xs font-mono text-[#F3BA2F]/60 hover:text-[#F3BA2F] transition-colors">Submit another →</button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-8">START A CONVERSATION</div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-mono text-white/30 tracking-[0.25em]">FULL NAME</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-transparent border-0 border-b border-white/10 rounded-none focus:border-[#F3BA2F] text-white px-0 font-mono text-sm transition-colors" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-mono text-white/30 tracking-[0.25em]">EMAIL</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="bg-transparent border-0 border-b border-white/10 rounded-none focus:border-[#F3BA2F] text-white px-0 font-mono text-sm transition-colors" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="type" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-mono text-white/30 tracking-[0.25em]">INQUIRY TYPE</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-transparent border-0 border-b border-white/10 rounded-none text-white px-0 font-mono text-sm focus:border-[#F3BA2F]">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black border-[#F3BA2F]/20">
                            {requestTypes.map((t) => <SelectItem key={t} value={t} className="text-white/70 focus:text-[#F3BA2F] font-mono text-sm">{t}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="organization" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-mono text-white/30 tracking-[0.25em]">ORGANIZATION (OPTIONAL)</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-transparent border-0 border-b border-white/10 rounded-none focus:border-[#F3BA2F] text-white px-0 font-mono text-sm transition-colors" />
                        </FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-mono text-white/30 tracking-[0.25em]">MESSAGE</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={5} className="bg-transparent border-0 border-b border-white/10 rounded-none focus:border-[#F3BA2F] text-white px-0 font-mono text-sm resize-none transition-colors" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )} />
                    <motion.button
                      type="submit"
                      disabled={mutation.isPending}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-[#F3BA2F] text-black font-bold tracking-widest text-sm glow-gold hover:bg-[#ffd666] transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {mutation.isPending ? "TRANSMITTING..." : <>SUBMIT REQUEST <ArrowRight className="h-4 w-4" /></>}
                    </motion.button>
                  </form>
                </Form>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
