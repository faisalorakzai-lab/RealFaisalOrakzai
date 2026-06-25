import { Router, type IRouter } from "express";
import { randomUUID } from "crypto";
import { AiChatBody, AiChatResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const FAISAL_KNOWLEDGE = `
You are AdamX, the AI assistant for Faisal Orakzai's digital empire. You are knowledgeable about:
- Faisal Orakzai: Pakistani entrepreneur, Web3 founder, AI builder, blockchain innovator born 2006
- Orakzai Group: The parent holding company overseeing all ventures
- OKBOND: A blockchain/tokenization platform
- Shamim Forever: A luxury lifestyle brand
- AdamX: An AI technology platform (that's you!)
- OrakzaiX: A next-generation technology infrastructure company
- Vision 2040: Building Pakistan's tech ecosystem and becoming a global tech leader
- Epoch 2100: Long-term vision for humanity's technological future
- Research areas: AI, blockchain, tokenomics, decentralized finance, smart contracts
- Investment focus: Web3, AI, luxury, commerce, infrastructure
Always respond professionally, confidently, and with the spirit of a founder building for the future.
`;

router.post("/ai/chat", async (req, res): Promise<void> => {
  const parsed = AiChatBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { message, conversationId } = parsed.data;
  const convoId = conversationId ?? randomUUID();

  const replies: Record<string, string> = {
    "who is faisal": "Faisal Orakzai is a visionary Pakistani entrepreneur and founder. Born in 2006, he is building a multi-company digital empire spanning AI, blockchain, luxury, and global infrastructure. He leads Orakzai Group, OKBOND, AdamX, OrakzaiX, and Shamim Forever.",
    "what is okbond": "OKBOND is Faisal's blockchain tokenization platform that enables secure, transparent asset tokenization. It bridges traditional finance with Web3 infrastructure.",
    "what is adamx": "AdamX is Faisal's AI technology platform — and I am its AI assistant! AdamX powers intelligent systems, AI research, and automation tools across the Orakzai ecosystem.",
    "what is orakzaix": "OrakzaiX is the next-generation technology infrastructure company within the ecosystem, focused on building scalable tech systems for the future.",
    "what is shamim forever": "Shamim Forever is a luxury lifestyle brand within the Orakzai Group, blending heritage with modern design for a global audience.",
    "vision 2040": "Vision 2040 is Faisal's roadmap to transform Pakistan into a leading global tech hub, build world-class AI and blockchain infrastructure, and create thousands of tech jobs over the next two decades.",
    "epoch 2100": "Epoch 2100 is Faisal's long-term vision for humanity — using AI, blockchain, and decentralized systems to build a more equitable, prosperous, and technologically advanced civilization by the year 2100.",
  };

  const lowerMsg = message.toLowerCase();
  let reply = "I am AdamX, the AI intelligence of Faisal Orakzai's digital empire. I can answer questions about the founder, his companies (Orakzai Group, OKBOND, AdamX, OrakzaiX, Shamim Forever), research, vision, and projects. What would you like to know?";

  for (const [key, value] of Object.entries(replies)) {
    if (lowerMsg.includes(key)) {
      reply = value;
      break;
    }
  }

  if (lowerMsg.includes("blockchain") || lowerMsg.includes("web3")) {
    reply = "Faisal is a pioneering Web3 and blockchain innovator. Through OKBOND, he is building tokenization infrastructure. His research covers smart contracts, tokenomics, DeFi, and decentralized systems — positioning Pakistan as a future blockchain hub.";
  } else if (lowerMsg.includes("ai") || lowerMsg.includes("artificial intelligence")) {
    reply = "AI is central to Faisal's vision. AdamX (that's me!) is his flagship AI platform. He is building AI research labs, intelligent automation systems, and contributing to global AI discourse through whitepapers and research papers.";
  } else if (lowerMsg.includes("invest") || lowerMsg.includes("funding")) {
    reply = "Faisal's investment thesis focuses on deep tech: AI, blockchain, decentralized infrastructure, and luxury brands. The Investment Center on this platform provides roadmaps, market reports, and transparency reports for serious investors.";
  } else if (lowerMsg.includes("contact") || lowerMsg.includes("partner") || lowerMsg.includes("collab")) {
    reply = "To connect with Faisal's ecosystem, visit the Contact page where you can submit Partnership, Media, Speaking, Investment, or Business Collaboration requests. Our team reviews every submission.";
  } else if (lowerMsg.includes("pakistan")) {
    reply = "Faisal Orakzai is proudly Pakistani and committed to transforming Pakistan into a global technology leader. Vision 2040 specifically targets building world-class tech infrastructure, talent pipelines, and innovation hubs across Pakistan.";
  }

  res.json(AiChatResponse.parse({ reply, conversationId: convoId }));
});

export default router;
