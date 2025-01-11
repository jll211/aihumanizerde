import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.14.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

const extractHumanizedText = (content: string) => {
  // Direkter Versuch die Tags zu finden
  const match = content.match(/<humanized_text>([\s\S]*?)<\/humanized_text>/);
  
  if (!match) {
    // Wenn keine Tags gefunden, gib den kompletten Text zurück
    return content.trim();
  }
  
  // Nur den Inhalt zwischen den Tags
  return match[1].trim();
};

serve(async (req) => {
  console.log('Received request:', req.method, req.url);
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, type = 'standard' } = await req.json();
    console.log('Processing request:', { 
      type, 
      textLength: text?.length,
      textPreview: text?.substring(0, 100) + '...'
    });

    if (!text) {
      console.error('Missing text in request');
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
    });

    console.log('Sending request to Anthropic...');
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

Before providing your final humanized version, analyze and plan your approach. Include your analysis and planning within <humanization_strategy> tags. In your analysis:
a. Identify and list AI-typical phrases or structures you've found in the text
b. Propose natural alternatives for each identified phrase or structure
c. Plan how you'll vary sentence structure throughout the text
d. Identify specific spots where you'll add informal language and minor errors
e. Consider and note any German language-specific nuances you'll need to address
f. List German-specific idioms or expressions that could be incorporated
g. For blog articles, brainstorm personal anecdotes or examples that could be included
h. Consider the target audience and how to adjust the language accordingly
i. Outline a step-by-step approach for implementing your humanization strategy

After your analysis, provide the humanized text inside <humanized_text> tags. Finally, include a brief explanation of the changes you made and how they improve the text's human-like quality inside <explanation> tags.

Remember:
1. Always preserve the original tone, style, and intent of the text, even if it conflicts with text-type-specific guidelines.
2. Text-type-specific rules should complement, not override, the general guidelines.
3. When no specific text type is selected, apply only the standard humanizing process using the general guidelines.

Your goal is to create text that sounds natural and human-written while preserving the original meaning, intent, and tone.

Please provide only the content within the <humanized_text> tags in your response, without any additional commentary or explanations.`
      }]
    });

    console.log('Raw Anthropic response:', message.content[0].text);
    
    const content = message.content[0].text;
    let humanizedText;
    try {
      humanizedText = extractHumanizedText(content);
      console.log('Full extracted text:', humanizedText);
    } catch (error) {
      console.error('Full error details:', {
        error: error.message,
        originalContent: content
      });
      throw error;
    }

    return new Response(
      JSON.stringify({ humanizedText }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in humanize function:', error.message);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to humanize text',
        details: error.message 
      }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }, 
        status: 500 
      }
    );
  }
});