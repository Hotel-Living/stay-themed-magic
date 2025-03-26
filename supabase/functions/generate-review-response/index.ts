
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

interface RequestBody {
  rating: number;
  comment: string;
  property: string;
  tone: 'professional' | 'friendly' | 'apologetic' | 'enthusiastic' | 'formal' | 'grateful';
}

// Tone templates with instructions for the AI
const toneInstructions = {
  professional: "Write a professional and balanced response that addresses the feedback directly.",
  friendly: "Write a warm, conversational response as if talking to a friend, while maintaining professionalism.",
  apologetic: "Write an apologetic response that acknowledges mistakes and promises improvement.",
  enthusiastic: "Write an energetic, positive response that shows excitement about the feedback.",
  formal: "Write a very formal, business-like response with proper etiquette and structure.",
  grateful: "Write a heartfelt response emphasizing gratitude for the feedback."
};

// Sample templates for different rating ranges and tones
const responseTemplates = {
  professional: {
    positive: "Thank you for your positive review of {property}. We're pleased that you enjoyed your stay with us. Your feedback is valuable and helps us maintain our high standards. We look forward to welcoming you back in the future.",
    neutral: "Thank you for taking the time to review {property}. We appreciate your feedback and will use it to improve our services. We hope to have the opportunity to provide you with a better experience on your next visit.",
    negative: "Thank you for bringing these concerns to our attention regarding your stay at {property}. We apologize for not meeting your expectations. We take all feedback seriously and will address these issues promptly. Please contact our management team directly to discuss your experience further."
  },
  friendly: {
    positive: "Wow! Thanks so much for the amazing review of {property}! We're thrilled you had such a great time with us. It's guests like you that make what we do so rewarding. Can't wait to see you again soon!",
    neutral: "Hey there! Thanks for sharing your thoughts about {property}. We're always looking to up our game, so your feedback is super helpful. Hope we get to welcome you back soon for an even better experience!",
    negative: "Oh no! We're really sorry your stay at {property} wasn't what you hoped for. That's definitely not the experience we aim to provide. We'd love a chance to make it right - please reach out to us directly so we can chat about how to make your next stay absolutely fantastic."
  },
  apologetic: {
    positive: "Thank you for your kind review of {property}. While we're pleased you enjoyed your stay, we're always looking for ways we could have made your experience even better. Please accept our appreciation for your feedback and our commitment to continuous improvement.",
    neutral: "We sincerely apologize that your experience at {property} was not exceptional. Your feedback highlights areas where we need to improve, and we're grateful for the opportunity to address these issues. Please accept our apologies and our promise to do better.",
    negative: "We are deeply sorry for the disappointing experience you had at {property}. Your dissatisfaction is of great concern to us, and we take full responsibility for the issues you encountered. We would like to personally apologize and make amends. Please contact us directly so we can address your concerns properly."
  },
  enthusiastic: {
    positive: "Amazing! We're absolutely THRILLED by your fantastic review of {property}! What a joy to know you had such a wonderful experience with us! Your happiness is what drives us every day, and we're incredibly excited to welcome you back soon for another outstanding stay!",
    neutral: "Thanks for sharing your experience at {property}! We're eager to turn your next stay into a five-star adventure! Your feedback is exactly what we need to keep improving! Can't wait to wow you next time with all the upgrades and improvements we're working on!",
    negative: "We're genuinely disappointed your stay at {property} didn't meet expectations, but we're EXCITED about the opportunity to make things right! Your feedback is INVALUABLE for our growth! We're already working on dramatic improvements based on your comments! Please visit us again - we're passionate about earning back your trust!"
  },
  formal: {
    positive: "On behalf of the entire staff at {property}, we extend our sincere gratitude for your commendable review. It is with great satisfaction that we acknowledge your positive experience. We shall continue to maintain the standards that you have recognized and look forward to your esteemed patronage in the future.",
    neutral: "We hereby acknowledge receipt of your review regarding {property}. Your observations have been duly noted and will be forwarded to the appropriate departments for consideration. We trust that you will afford us another opportunity to serve you, at which time we hope to exceed your expectations.",
    negative: "We wish to express our profound regret regarding the circumstances of your stay at {property}. Please accept our formal apology for any inconvenience experienced. We respectfully request that you contact our executive office at your earliest convenience so that we may address your concerns with the attention they deserve."
  },
  grateful: {
    positive: "From the bottom of our hearts, thank you for your wonderful review of {property}. We're truly grateful that you chose to stay with us and even more thankful that you had such a positive experience. Your kind words mean everything to our team, and we're deeply appreciative of the time you took to share your thoughts.",
    neutral: "We're genuinely thankful for your honest feedback about {property}. Every comment helps us grow and improve, and we deeply appreciate you taking the time to share your experience. Your perspective is invaluable to us, and we're grateful for the opportunity to learn from it.",
    negative: "We're sincerely grateful for your candid review of {property}, even though we're saddened that we didn't meet your expectations. Thank you for giving us this opportunity to learn and improve. We truly value your feedback and are thankful for the chance to address these concerns. Your input is a gift that helps us become better."
  }
};

serve(async (req) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { rating, comment, property, tone = 'professional' } = await req.json() as RequestBody;

    if (!rating || !comment || !property) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Determine rating category
    let ratingCategory: 'positive' | 'neutral' | 'negative';
    if (rating >= 4) {
      ratingCategory = 'positive';
    } else if (rating === 3) {
      ratingCategory = 'neutral';
    } else {
      ratingCategory = 'negative';
    }

    // Get template based on tone and rating
    const selectedTone = tone in toneInstructions ? tone : 'professional';
    let template = responseTemplates[selectedTone][ratingCategory];
    
    // Replace placeholders in template
    let generatedResponse = template.replace('{property}', property);

    // Add specific comment acknowledgment
    if (comment.length > 10) {
      const commentSummary = comment.length > 100 
        ? comment.substring(0, 100) + "..."
        : comment;
      
      if (ratingCategory === 'positive') {
        generatedResponse += ` We particularly appreciate your comment about "${commentSummary}".`;
      } else if (ratingCategory === 'negative') {
        generatedResponse += ` Regarding your specific comment about "${commentSummary}", we will address this immediately.`;
      }
    }

    // Return the generated response
    return new Response(
      JSON.stringify({ 
        success: true, 
        generatedResponse,
        source: 'template'
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    // Handle errors
    console.error("Error generating response:", error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
