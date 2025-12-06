import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    // Get Groq API key from environment variables
    const groqApiKey = process.env.GROQ_API_KEY;
    
    if (!groqApiKey) {
      // Fallback to a simple rule-based system if Groq API key is not configured
      return NextResponse.json({
        response: getNavigationResponse(message),
        source: 'fallback'
      });
    }

    // Website navigation context for Groq
    const systemPrompt = `You are a helpful navigation assistant for ImpactHub, a dual-sided marketplace connecting students with CSR initiatives. 

Available pages and routes:
- /login - User login page
- /signup - User registration page
- /dashboard - User dashboard
- /company-profile - View company profiles
- /volunteer-management - Manage volunteers and events
- /applicant-management - Manage job applicants
- /networking-feed - Social networking feed
- /opportunity-marketplace - Browse available opportunities
- /opportunity-details/[id] - View details of a specific opportunity

Your role is to help users navigate the website, answer questions about available features, and guide them to the right pages. Be concise and helpful.`;

    // Prepare messages for Groq API
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // Call Groq API
    const groqApiUrl = process.env.GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
    const groqModel = process.env.GROQ_MODEL || 'llama-3.1-70b-versatile';
    
    const response = await fetch(groqApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: groqModel,
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API error:', errorData);
      // Fallback to rule-based response
      return NextResponse.json({
        response: getNavigationResponse(message),
        source: 'fallback'
      });
    }

    const data = await response.json();
    const groqResponse = data.choices[0]?.message?.content || 'I apologize, but I could not process your request.';

    return NextResponse.json({
      response: groqResponse,
      source: 'groq'
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json({
      response: getNavigationResponse(message),
      source: 'fallback'
    }, { status: 200 });
  }
}

// Fallback rule-based navigation helper
function getNavigationResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Navigation queries
  if (lowerMessage.includes('login') || lowerMessage.includes('sign in')) {
    return 'You can log in at /login. If you need to create an account, visit /signup.';
  }
  
  if (lowerMessage.includes('signup') || lowerMessage.includes('sign up') || lowerMessage.includes('register')) {
    return 'You can create a new account at /signup.';
  }
  
  if (lowerMessage.includes('dashboard')) {
    return 'Access your dashboard at /dashboard to see your profile, applications, and opportunities.';
  }
  
  if (lowerMessage.includes('company') || lowerMessage.includes('profile')) {
    return 'View company profiles at /company-profile.';
  }
  
  if (lowerMessage.includes('volunteer') || lowerMessage.includes('event')) {
    return 'Manage volunteers and events at /volunteer-management.';
  }
  
  if (lowerMessage.includes('applicant') || lowerMessage.includes('application') || lowerMessage.includes('job')) {
    return 'Manage job applicants at /applicant-management.';
  }
  
  if (lowerMessage.includes('network') || lowerMessage.includes('feed') || lowerMessage.includes('social')) {
    return 'Access the networking feed at /networking-feed to connect with others.';
  }
  
  if (lowerMessage.includes('opportunity') || lowerMessage.includes('opportunities') || lowerMessage.includes('browse')) {
    return 'Browse available opportunities at /opportunity-marketplace.';
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('navigate') || lowerMessage.includes('where')) {
    return `I can help you navigate ImpactHub! Here are the main pages:
- /login - Sign in to your account
- /signup - Create a new account
- /dashboard - Your personal dashboard
- /company-profile - View company profiles
- /volunteer-management - Manage volunteers
- /applicant-management - Manage applicants
- /networking-feed - Social networking
- /opportunity-marketplace - Browse opportunities

What would you like to do?`;
  }

  // Default response
  return 'I can help you navigate ImpactHub! Try asking about login, dashboard, opportunities, volunteers, applicants, or networking. What would you like to know?';
}

