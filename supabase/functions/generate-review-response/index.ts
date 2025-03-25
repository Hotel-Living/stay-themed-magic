
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ReviewResponseRequest {
  rating: number;
  comment: string;
  property: string;
  tone?: 'professional' | 'friendly' | 'apologetic';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { rating, comment, property, tone = 'professional' }: ReviewResponseRequest = await req.json();
    
    console.log(`Generating ${tone} response for ${property} review with rating: ${rating}`);
    console.log(`Review comment: ${comment}`);
    
    let responseTemplate = "";
    
    // Use OpenAI if API key is available, otherwise fall back to template-based responses
    if (openAIApiKey) {
      try {
        const prompt = `
You are an AI assistant for a hotel manager responding to a guest review.

Hotel name: ${property}
Review rating: ${rating}/5
Review comment: "${comment}"

Write a ${tone} response to this review that:
1. Thanks the guest for their feedback
2. Acknowledges specific points they mentioned (cleanliness, staff, food, etc.)
3. Addresses any concerns in a constructive way
4. Invites them to return in the future

The tone should be:
${tone === 'professional' ? 
  '- Formal and professional, using industry-appropriate language' : 
  tone === 'friendly' ? 
  '- Warm, personable, and conversational with a personal touch' : 
  '- Apologetic, empathetic, and focused on making things right'}

${rating >= 4 ? '- Include enthusiasm and gratitude for the positive feedback' : 
  rating === 3 ? '- Show appreciation but acknowledge room for improvement' : 
  '- Express sincere apologies and offer specific solutions'}

Keep the response concise (under 200 words) and end with an appropriate sign-off from the management team.
`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are a helpful assistant that generates hotel review responses.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 500,
            timeout: 60
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("OpenAI API error:", errorData);
          throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
          responseTemplate = data.choices[0].message.content.trim();
          console.log("Generated AI response successfully using OpenAI");
        } else {
          throw new Error("Invalid response structure from OpenAI");
        }
      } catch (openAIError) {
        console.error("Error with OpenAI:", openAIError);
        
        // Provide a more specific error message based on the error
        let errorMessage = "An error occurred with the AI service";
        
        if (openAIError.message.includes("429")) {
          errorMessage = "AI service is currently experiencing high demand. Please try again later.";
        } else if (openAIError.message.includes("401") || openAIError.message.includes("403")) {
          errorMessage = "Authentication error with AI service. Please check API credentials.";
        } else if (openAIError.message.includes("timeout") || openAIError.message.includes("504")) {
          errorMessage = "AI service request timed out. Please try again later.";
        }
        
        // Fall back to template-based system
        console.log("Falling back to template-based response due to:", errorMessage);
        responseTemplate = generateTemplateResponse(rating, comment, property, tone);
        
        // Include a note about the fallback
        responseTemplate = `${responseTemplate}\n\n[Note: This is a template-based response as our AI system is currently unavailable. ${errorMessage}]`;
      }
    } else {
      // No API key, use template-based system
      console.log("No OpenAI API key found, using template-based response");
      responseTemplate = generateTemplateResponse(rating, comment, property, tone);
    }
    
    return new Response(JSON.stringify({
      success: true,
      generatedResponse: responseTemplate,
      source: openAIApiKey ? 'ai' : 'template'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error in generate-review-response function:", error);
    
    // Create a user-friendly error message
    const userMessage = error instanceof Error 
      ? `Error: ${error.message}` 
      : "An unknown error occurred while generating the response";
    
    return new Response(JSON.stringify({ 
      error: userMessage,
      success: false
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

// Template-based response generation (fallback system)
function generateTemplateResponse(
  rating: number, 
  comment: string, 
  property: string,
  tone: 'professional' | 'friendly' | 'apologetic' = 'professional'
): string {
  let responseTemplate = "";
  
  // Professional tone templates
  const professionalTemplates = {
    positive: `Dear valued guest,\n\nThank you for your positive feedback regarding your stay at ${property}. We are pleased to learn that you enjoyed your experience with us. Your comments are greatly appreciated and motivate our team to maintain the high standards we strive for.\n\nWe look forward to welcoming you back for another exceptional stay in the future.\n\nBest regards,\nThe Management Team at ${property}`,
    neutral: `Dear guest,\n\nThank you for taking the time to share your feedback about your recent stay at ${property}. We appreciate your candid review and regret that we did not fully meet your expectations. Your comments help us identify areas where we can enhance our service quality.\n\nWe value your patronage and hope to have the opportunity to better serve you in the future.\n\nSincerely,\nThe Management Team at ${property}`,
    negative: `Dear guest,\n\nThank you for bringing your concerns to our attention regarding your stay at ${property}. We sincerely apologize for the shortcomings you experienced. Please be assured that your feedback is taken seriously and will be addressed promptly with the appropriate departments.\n\nWe would welcome the opportunity to discuss your experience in more detail and demonstrate our commitment to improvement.\n\nSincerely,\nThe Management Team at ${property}`
  };
  
  // Friendly tone templates
  const friendlyTemplates = {
    positive: `Hi there!\n\nWow, thank you so much for the wonderful review of your stay with us at ${property}! We're absolutely thrilled that you had such a great time. It's feedback like yours that puts a smile on all our faces here.\n\nWe can't wait to welcome you back soon for another amazing stay!\n\nWarmly,\nYour friends at ${property}`,
    neutral: `Hi there!\n\nThanks so much for sharing your thoughts about your stay with us at ${property}. We really appreciate your honest feedback! While we're glad you enjoyed some aspects of your stay, we're sorry we didn't completely wow you this time around.\n\nWe'd love to have you back and make your next experience even better!\n\nAll the best,\nThe team at ${property}`,
    negative: `Hi there,\n\nThank you for taking the time to let us know about your experience at ${property}. We're really sorry to hear that your stay wasn't what you'd hoped for. Your happiness is super important to us, and it's clear we missed the mark this time.\n\nWe'd love a chance to make things right and show you the true ${property} experience next time!\n\nTake care,\nThe team at ${property}`
  };
  
  // Apologetic tone templates
  const apologeticTemplates = {
    positive: `Dear esteemed guest,\n\nWhile we're sincerely grateful for your positive feedback about ${property}, we want to apologize for any aspect of your stay that may have fallen short of perfect. Even though you've rated us well, we constantly strive to improve every detail of our service.\n\nWe would be honored to welcome you back and promise to ensure an even better experience.\n\nWith gratitude,\nThe Management at ${property}`,
    neutral: `Dear valued guest,\n\nWe are truly sorry that your experience at ${property} was not as exceptional as it should have been. Your feedback is incredibly important to us, and we sincerely apologize for not exceeding your expectations. Please know that we take your comments to heart.\n\nWe would be grateful for the opportunity to regain your trust on a future visit.\n\nWith sincere apologies,\nThe Management at ${property}`,
    negative: `Dear valued guest,\n\nWe are deeply sorry and genuinely distressed to learn about your disappointing experience at ${property}. There is simply no excuse for the issues you encountered, and we take full responsibility. Your experience is far from the standard we set for ourselves.\n\nWe would be extremely grateful for the chance to speak with you personally and make amends. Please contact us directly at your convenience.\n\nWith our most sincere apologies,\nThe Management at ${property}`
  };
  
  // Select the appropriate template based on tone and rating
  if (tone === 'professional') {
    if (rating >= 4) {
      responseTemplate = professionalTemplates.positive;
    } else if (rating === 3) {
      responseTemplate = professionalTemplates.neutral;
    } else {
      responseTemplate = professionalTemplates.negative;
    }
  } else if (tone === 'friendly') {
    if (rating >= 4) {
      responseTemplate = friendlyTemplates.positive;
    } else if (rating === 3) {
      responseTemplate = friendlyTemplates.neutral;
    } else {
      responseTemplate = friendlyTemplates.negative;
    }
  } else {
    if (rating >= 4) {
      responseTemplate = apologeticTemplates.positive;
    } else if (rating === 3) {
      responseTemplate = apologeticTemplates.neutral;
    } else {
      responseTemplate = apologeticTemplates.negative;
    }
  }
  
  // Customize based on specific comments
  if (comment.toLowerCase().includes("clean") || comment.toLowerCase().includes("tidy")) {
    responseTemplate = responseTemplate.replace("your experience with us", "your experience with us, especially regarding the cleanliness of our property");
  }
  
  if (comment.toLowerCase().includes("staff") || comment.toLowerCase().includes("service")) {
    responseTemplate = responseTemplate.replace("your experience with us", "your experience with us and your kind words about our staff");
  }
  
  if (comment.toLowerCase().includes("food") || comment.toLowerCase().includes("breakfast") || comment.toLowerCase().includes("restaurant")) {
    responseTemplate = responseTemplate.replace("your experience with us", "your dining experience with us");
  }
  
  console.log("Generated template-based response successfully with tone:", tone);
  return responseTemplate;
}
