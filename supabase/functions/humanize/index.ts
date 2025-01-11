import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.14.1'

// Update CORS headers to allow requests from Netlify domain
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://tiny-mochi-8039ea.netlify.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
};

serve(async (req) => {
  console.log('Received request:', req.method, req.url);
  console.log('Request headers:', Object.fromEntries(req.headers.entries()));

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, {
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      }
    });
  }

  try {
    const { text, type = 'standard' } = await req.json();
    console.log('Processing request with:', { type, textLength: text?.length });

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

Please provide only the humanized text without any additional commentary or explanations.`
      }]
    });

    console.log('Received response from Anthropic:', {
      status: 'success',
      responseLength: message.content.length
    });

    return new Response(
      JSON.stringify({ humanizedText: message.content }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
        }
      }
    );
  } catch (error) {
    console.error('Error in humanize function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to humanize text' }),
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