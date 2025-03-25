
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ReviewResponseRequest {
  rating: number;
  comment: string;
  property: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { rating, comment, property }: ReviewResponseRequest = await req.json();
    
    console.log(`Generating response for ${property} review with rating: ${rating}`);
    console.log(`Review comment: ${comment}`);
    
    // Generate a response based on the rating
    let responseTemplate = "";
    
    if (rating >= 4) {
      // Positive review
      responseTemplate = `Dear valued guest,\n\nThank you for your wonderful feedback about your stay at ${property}. We're delighted to hear that you enjoyed your experience with us. Your positive comments are greatly appreciated and motivate our team to continue providing exceptional service.\n\nWe look forward to welcoming you back on your next visit!\n\nWarm regards,\nThe ${property} Team`;
    } else if (rating === 3) {
      // Neutral review
      responseTemplate = `Dear guest,\n\nThank you for taking the time to share your feedback about your recent stay at ${property}. We appreciate your honest review and are sorry to hear that we didn't exceed your expectations. We value your input as it helps us identify areas where we can improve our service quality.\n\nWe would love the opportunity to welcome you back and provide you with a more memorable experience in the future.\n\nSincerely,\nThe ${property} Team`;
    } else {
      // Negative review
      responseTemplate = `Dear guest,\n\nThank you for bringing your concerns to our attention. We sincerely apologize that your experience at ${property} did not meet your expectations. We take all feedback seriously and will address the issues you've mentioned. Your comments have been shared with our team to implement necessary improvements.\n\nWe would appreciate the opportunity to discuss your experience further and make things right. Please feel free to contact us directly.\n\nSincerely,\nThe ${property} Management Team`;
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
    
    console.log("Generated response successfully");

    return new Response(JSON.stringify({
      success: true,
      generatedResponse: responseTemplate,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error in generate-review-response function:", error);
    
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
