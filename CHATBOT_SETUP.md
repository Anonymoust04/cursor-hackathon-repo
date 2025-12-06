# Chatbot Setup Guide

This guide explains how to set up the Groq-powered navigation chatbot for ImpactHub.

## Overview

The chatbot helps users navigate the ImpactHub website by answering questions about available pages, features, and routes. It uses Groq's fast inference API when configured, with a fallback to a rule-based system.

## Features

- **Navigation Assistance**: Helps users find pages and features
- **Quick Actions**: Provides quick navigation buttons for common pages
- **Conversational Interface**: Natural language interaction
- **Fallback System**: Works even without API key using rule-based responses

## Setup Instructions

### 1. Get Groq API Key

1. Visit [Groq's website](https://console.groq.com) and sign up for API access
2. Navigate to your API dashboard
3. Generate a new API key
4. Copy the API key

### 2. Configure Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Optional: Customize the model and endpoint:

```env
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
GROQ_MODEL=llama-3.1-70b-versatile
```

Available Groq models:
- `llama-3.1-70b-versatile` (default) - Fast and versatile
- `llama-3.1-8b-instant` - Ultra-fast, smaller model
- `mixtral-8x7b-32768` - High-quality responses
- `gemma2-9b-it` - Google's Gemma model

**Important**: Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

### 3. Test the Chatbot

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to any page on your website
3. Look for the chat icon in the bottom-right corner
4. Click it to open the chatbot
5. Try asking questions like:
   - "How do I log in?"
   - "Where can I find opportunities?"
   - "Show me the networking feed"
   - "Help me navigate the site"

## How It Works

### With Groq API Key

When `GROQ_API_KEY` is configured, the chatbot uses Groq's fast inference API for intelligent responses. Groq provides ultra-fast inference speeds, making the chatbot very responsive. The system prompt includes:
- Available routes and pages
- Navigation context
- User assistance guidelines

### Without Groq API Key (Fallback)

If no API key is configured, the chatbot uses a rule-based system that recognizes keywords and provides appropriate navigation guidance.

## Available Routes

The chatbot knows about these routes:
- `/login` - User login page
- `/signup` - User registration page
- `/dashboard` - User dashboard
- `/company-profile` - View company profiles
- `/volunteer-management` - Manage volunteers and events
- `/applicant-management` - Manage job applicants
- `/networking-feed` - Social networking feed
- `/opportunity-marketplace` - Browse available opportunities
- `/opportunity-details/[id]` - View details of a specific opportunity

## Customization

### Adding New Routes

To add new routes that the chatbot should know about:

1. Update `app/api/chatbot/route.ts`:
   - Add the route to the `systemPrompt` in the `POST` function
   - Add a pattern match in the `getNavigationResponse` function

2. Update `components/Chatbot.tsx`:
   - Add the route to the `routePatterns` array if you want auto-navigation
   - Add quick action buttons in the `quickActions` array

### Styling

The chatbot component uses Tailwind CSS. You can customize:
- Colors: Modify `bg-blue-600` classes
- Size: Adjust `w-96` and `h-[600px]` classes
- Position: Change `bottom-24 right-6` classes

## Troubleshooting

### Chatbot Not Appearing

- Ensure `Chatbot` component is imported in `app/layout.tsx`
- Check browser console for errors
- Verify the component is rendering (check React DevTools)

### API Errors

- Verify `GROQ_API_KEY` is set correctly in `.env.local`
- Check that the API key is valid and has proper permissions
- Review server logs for detailed error messages
- The chatbot will fall back to rule-based responses if API fails
- Ensure you're using a valid Groq model name (see available models above)

### Responses Not Working

- Check network tab in browser DevTools
- Verify `/api/chatbot` endpoint is accessible
- Check server logs for errors
- Ensure environment variables are loaded (restart dev server after adding)

## Security Notes

- API keys are stored server-side only (in `.env.local`)
- Never expose API keys in client-side code
- The chatbot API route handles all API communication server-side
- User messages are sent to the API but not stored permanently

## Future Enhancements

Potential improvements:
- Conversation history persistence
- User preference learning
- Multi-language support
- Voice input/output
- Integration with user authentication for personalized responses

