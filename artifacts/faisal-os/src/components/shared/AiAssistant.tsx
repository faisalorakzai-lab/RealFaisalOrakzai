import { useState } from "react";
import { useAiChat } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'AdamX initialized. How can I assist you with the Faisal OS today?' }
  ]);

  const chatMutation = useAiChat();

  const handleSend = () => {
    if (!message.trim()) return;

    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    const currentMessage = message;
    setMessage("");

    chatMutation.mutate(
      { data: { message: currentMessage } },
      {
        onSuccess: (data) => {
          setChatHistory(prev => [...prev, { role: 'assistant', content: data.reply }]);
        },
        onError: () => {
          setChatHistory(prev => [...prev, { role: 'assistant', content: 'Connection to core lost. Please try again.' }]);
        }
      }
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-card border border-secondary/50 rounded-lg shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden glow-blue"
          >
            <div className="bg-secondary/10 p-4 border-b border-secondary/20 flex justify-between items-center">
              <div className="flex items-center gap-2 text-secondary">
                <Bot className="h-5 w-5" />
                <span className="font-mono font-bold tracking-wider">ADAM_X</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-80 p-4 overflow-y-auto space-y-4 bg-background/50">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-md text-sm ${msg.role === 'user' ? 'bg-primary/20 text-primary-foreground border border-primary/30' : 'bg-card border border-border text-card-foreground'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {chatMutation.isPending && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border p-3 rounded-md text-sm flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-border bg-card flex gap-2">
              <Input 
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Query AdamX..."
                className="bg-background border-secondary/30 focus-visible:ring-secondary"
              />
              <Button size="icon" onClick={handleSend} disabled={chatMutation.isPending} className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shadow-lg glow-blue relative"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
