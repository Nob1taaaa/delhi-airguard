# Voice Assistant Backend Setup

## ✅ What I've Done:

1. **Created `.env.local` file** with:
   ```
   VITE_API_URL=http://localhost:8000
   ```

2. **Updated API endpoints** in:
   - `src/utils/aiLogic.ts`
   - `src/components/Chat/FloatingChat.tsx`

3. **Tested backend** - Confirmed it's working:
   - Backend is running on `http://localhost:8000`
   - Successfully fetched Varanasi AQI data: `{"aqi":237,"pm25":151.6,...}`

## 🔄 To Make It Work Locally:

**Restart your dev server:**
```bash
# Stop the current dev server (Ctrl+C in the terminal)
# Then restart it:
npm run dev
```

The voice assistant will now be able to fetch AQI data for ANY city!

## 🌐 For Production (Vercel):

You need to deploy your backend and add the environment variable in Vercel:

1. **Deploy Backend** (options):
   - Railway.app (easiest for Python)
   - Render.com
   - Heroku
   - Or any Python hosting service

2. **Add Environment Variable in Vercel**:
   - Go to your Vercel project settings
   - Add: `VITE_API_URL` = `https://your-backend-url.com`

## 🎤 Test Voice Assistant:

After restarting, try saying:
- "What is the AQI in Varanasi?"
- "Is it safe to run in Mumbai?"
- "Check pollution in Bangalore"

It will fetch real-time data from your backend! 🚀
