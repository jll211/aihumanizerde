import OpenAI from "openai";
import { Request, Response } from 'express';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function humanizeText(text: string) {
  try {
    const thread = await openai.beta.threads.create();
    
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `Humanize this text while maintaining its meaning: ${text}`,
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID!,
    });

    // Poll for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while (runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      
      if (runStatus.status === "failed") {
        throw new Error("Assistant run failed");
      }
    }

    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data[0];
    
    const messageContent = lastMessage.content[0];
    if ('text' in messageContent) {
      return messageContent.text.value;
    }
    
    throw new Error("Unexpected message content type");
  } catch (error) {
    console.error("Error humanizing text:", error);
    throw error;
  }
}

export const humanizeHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: 'Text is required' });
      return;
    }

    const humanizedText = await humanizeText(text);
    res.json({ humanizedText });
  } catch (error) {
    console.error('Error in humanize endpoint:', error);
    res.status(500).json({ error: 'Failed to humanize text' });
  }
};