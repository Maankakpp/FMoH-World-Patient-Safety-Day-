# 🔗 **Social Media Account Connection Guide**

## 🎯 **Quick Setup**

To connect your real social media accounts, follow these steps:

### **Step 1: Create Environment File**

Create a `.env` file in your project root with your API credentials:

```env
# Facebook Graph API - Your Profile: https://www.facebook.com/profile.php?id=61577614928449
REACT_APP_FACEBOOK_ACCESS_TOKEN=your_facebook_access_token_here
REACT_APP_FACEBOOK_PAGE_ID=61577614928449

# Twitter API v2
REACT_APP_TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
REACT_APP_TWITTER_USERNAME=your_twitter_username_here

# Instagram Basic Display API
REACT_APP_INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
```

---

## 📘 **Detailed Setup Instructions**

### **🔵 Facebook Setup**

1. **Go to Facebook Developers:**
   - Visit [developers.facebook.com](https://developers.facebook.com/)
   - Click "My Apps" → "Create App"
   - Choose "Business" type

2. **Configure Your App:**
   - Add "Facebook Login" product
   - Set Valid OAuth Redirect URIs: `http://localhost:3000/`
   - Go to "App Settings" → "Basic" to get App ID and App Secret

3. **Get Access Token:**
   ```bash
   # Generate short-lived token
   curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&grant_type=client_credentials"
   
   # Exchange for long-lived token
   curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_LIVED_TOKEN"
   ```

4. **Your Facebook Profile ID:**
   - Your Facebook profile: [https://www.facebook.com/profile.php?id=61577614928449](https://www.facebook.com/profile.php?id=61577614928449)
   - Your Profile ID: `61577614928449` (already configured)

5. **Update .env:**
   ```env
   REACT_APP_FACEBOOK_ACCESS_TOKEN=your_long_lived_token
   REACT_APP_FACEBOOK_PAGE_ID=61577614928449
   ```

### **🐦 Twitter Setup**

1. **Apply for Twitter API:**
   - Go to [developer.twitter.com](https://developer.twitter.com/)
   - Apply for API access (Basic plan is free)
   - Wait for approval (usually 1-2 days)

2. **Create App:**
   - Go to "Projects & Apps" → "Create App"
   - Get your Bearer Token from "Keys and Tokens"

3. **Update .env:**
   ```env
   REACT_APP_TWITTER_BEARER_TOKEN=your_bearer_token
   REACT_APP_TWITTER_USERNAME=your_twitter_username
   ```

### **📸 Instagram Setup**

1. **Create Facebook App:**
   - Go to [developers.facebook.com](https://developers.facebook.com/)
   - Create a new app or use existing Facebook app
   - Add "Instagram Basic Display" product

2. **Configure Instagram:**
   - Add your Instagram account
   - Set Valid OAuth Redirect URIs: `http://localhost:3000/`
   - Get your Access Token

3. **Update .env:**
   ```env
   REACT_APP_INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
   ```

---

## 🚀 **Testing Your Setup**

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Check browser console:**
   - Open browser developer tools (F12)
   - Look for messages like:
     - "Fetching Facebook posts..."
     - "Fetching Twitter posts..."
     - "Fetching Instagram posts..."

3. **Verify real posts appear:**
   - Your actual social media posts should now display
   - If no credentials are found, mock data will show

---

## 🔧 **Troubleshooting**

### **Facebook Issues:**
- **"Invalid access token"**: Regenerate your access token
- **"Page not found"**: Check your PAGE_ID is correct
- **"Permission denied"**: Ensure your app has proper permissions

### **Twitter Issues:**
- **"Unauthorized"**: Check your Bearer Token is correct
- **"Rate limit exceeded"**: Twitter has rate limits, wait and retry
- **"User not found"**: Verify your username is correct

### **Instagram Issues:**
- **"Invalid access token"**: Regenerate your Instagram token
- **"No posts found"**: Ensure your Instagram account has public posts

---

## 🔒 **Security Best Practices**

1. **Never commit .env file:**
   ```bash
   # Add to .gitignore
   echo ".env" >> .gitignore
   ```

2. **Use environment variables:**
   - Never hardcode API keys in your code
   - Always use `process.env.REACT_APP_*`

3. **Rotate tokens regularly:**
   - Facebook tokens expire, regenerate monthly
   - Twitter tokens are long-lived but rotate annually
   - Instagram tokens can be long-lived

---

## 📱 **Production Deployment**

For production, you'll need to:

1. **Update redirect URIs:**
   - Change from `localhost:3000` to your domain
   - Update in Facebook/Twitter/Instagram app settings

2. **Set production environment variables:**
   - Use your hosting platform's environment variable system
   - Vercel: Dashboard → Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables

3. **Test thoroughly:**
   - Ensure all social media posts load correctly
   - Check for any CORS or security issues

---

## 🎯 **What Happens Next**

Once you set up your credentials:

✅ **Automatic Updates**: Your website will automatically fetch latest posts  
✅ **Real Content**: Display actual posts from your social media accounts  
✅ **Live Engagement**: Show real likes, comments, and shares  
✅ **Fresh Images**: Display actual images from your posts  
✅ **Current Timestamps**: Show real posting times  

Your social media section will become a live feed of your actual social media activity! 🎉 