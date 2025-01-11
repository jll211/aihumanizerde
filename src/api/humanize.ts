import Anthropic from '@anthropic-ai/sdk';
import { Request, Response } from 'express';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function humanizeText(text: string, type: string = 'standard') {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `You are an expert AI assistant specializing in humanizing and improving German-language texts. Your task is to transform the given text into a more natural, human-sounding version while adhering to specific guidelines based on the text type.

Here is the original German text you need to humanize:

<original_text>
${text}
</original_text>

The type of text you are working with is:

<text_type>
${type}
</text_type>

Your goal is to make the text sound as if it were written by a human, while maintaining the original content, intent, and context. Follow these steps to humanize the text:

1. Analyze the text for AI-typical formulations and sentence structures.
2. Apply the general humanization guidelines (listed below).
3. If a specific text type is provided, apply the relevant text-type-specific guidelines as complementary rules.
4. If no specific text type is provided or "standard" is selected, apply only the general humanization guidelines.
5. Create a humanization strategy.
6. Implement the strategy to produce the humanized text.
7. Provide an explanation of the changes made.

General guidelines for humanizing the text:
1. Remove all AI-typical elements, sentence structures, phrasings, and tonality.
2. Simplify sentence structure and vary sentence length for a more natural flow.
3. Use active voice and simple, easy-to-understand word choices.
4. Ensure good readability for the average person ("Otto Normalverbraucher").
5. Avoid technical language, replace it with simple words (except for academic texts).
6. Remove AI-typical structural elements like excessive bullet points and emojis.
7. Create a naturally flowing text that sounds like it was written by a human.
8. Maintain the original tone and content while removing AI-typical elements.
9. Preserve the style and tone of the original, even if specific instructions below may state otherwise.
10. Include 1-2 minimal grammar or spelling errors to enhance the human feel (but don't overdo it).

Specific instructions based on text type (apply these in addition to the general guidelines, not in place of them):

For blog articles:
- Use a conversational tone while maintaining professionalism.
- Include personal anecdotes or examples where appropriate.
- Break up long paragraphs into shorter, more digestible chunks.

For professional/business emails:
- Maintain a formal yet friendly tone.
- Use appropriate salutations and closings.
- Be concise and to the point while remaining polite.
- Aim for short emails with a focus on clarity.
- Keep salutation and closing as they were before.
- Preserve the original German formal/informal address ('Du' or 'Sie').

For academic texts:
- Maintain a formal and objective tone.
- Use field-specific terminology where necessary.
- Rephrase content to avoid potential plagiarism issues.
- Preserve citations and references.
- Aim for a similar length and style while re-structuring sentences to avoid plagiarism.

For social media posts:
- Adapt the tone to fit the specific platform (e.g., more casual for Instagram, more professional for LinkedIn).
- Keep the content concise and engaging.
- Use hashtags sparingly and only when relevant.
- Encourage interaction without being overly promotional.
- Do not use emojis unless explicitly requested by the user.

For standard text (without a specific text type):
- Apply all general humanization guidelines.
- Maintain the original tone and content of the text.
- Adapt the language to sound natural and human-written without changing the overall style or purpose of the text.

Please provide only the humanized text without any additional commentary or explanations.`
      }]
    });

    return message.content;
  } catch (error) {
    console.error("Error humanizing text:", error);
    throw error;
  }
}

export const humanizeHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, type = 'standard' } = req.body;
    if (!text) {
      res.status(400).json({ error: 'Text is required' });
      return;
    }

    const humanizedText = await humanizeText(text, type);
    res.json({ humanizedText });
  } catch (error) {
    console.error('Error in humanize endpoint:', error);
    res.status(500).json({ error: 'Failed to humanize text' });
  }
};