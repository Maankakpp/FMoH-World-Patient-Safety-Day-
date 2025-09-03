// Social Media Service - For fetching real social media posts
// This service can be connected to real social media APIs

export interface SocialPost {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram';
  content: string;
  image?: string;
  author: string;
  authorImage?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  url: string;
}

// Environment variables for API keys (set these in your .env file with VITE_ prefix)
const FACEBOOK_ACCESS_TOKEN = import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN;
const FACEBOOK_PAGE_ID = import.meta.env.VITE_FACEBOOK_PAGE_ID || '61577614928449'; // Your Facebook profile ID
const TWITTER_BEARER_TOKEN = import.meta.env.VITE_TWITTER_BEARER_TOKEN;
const TWITTER_USERNAME = import.meta.env.VITE_TWITTER_USERNAME || 'WHO';
const INSTAGRAM_ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;

// Facebook Graph API - Fetch posts from your specific profile
export const fetchFacebookPosts = async (pageId: string, accessToken: string): Promise<SocialPost[]> => {
  try {
    console.log(`Fetching Facebook posts from profile ID: ${pageId}`);
    
    // Fetch posts from the specific profile
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}/posts?fields=id,message,created_time,full_picture,permalink_url,reactions.summary(true),comments.summary(true),shares&limit=10&access_token=${accessToken}`
    );
    
    if (!response.ok) {
      throw new Error(`Facebook API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      console.log('No Facebook posts found');
      return [];
    }
    
    console.log(`Found ${data.data.length} Facebook posts`);
    
    return (data.data as Array<{ id: string; message?: string; created_time: string; full_picture?: string; permalink_url: string; reactions?: { summary?: { total_count?: number } }; comments?: { summary?: { total_count?: number } }; shares?: { count?: number } }>).map((post) => ({
      id: post.id,
      platform: 'facebook' as const,
      content: post.message || 'Shared a post',
      image: post.full_picture,
      author: 'World Patient Safety Day',
      authorImage: 'https://ui-avatars.com/api/?name=WPSD&background=2563eb&color=fff&size=64',
      timestamp: formatTimestamp(post.created_time),
      likes: post.reactions?.summary?.total_count || 0,
      comments: post.comments?.summary?.total_count || 0,
      shares: post.shares?.count || 0,
      url: post.permalink_url
    }));
  } catch (error: unknown) {
    console.error('Error fetching Facebook posts:', error);
    return [];
  }
};

// Twitter API v2 (requires bearer token)
export const fetchTwitterPosts = async (username: string, bearerToken: string): Promise<SocialPost[]> => {
  try {
    // First get user ID
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );
    const userData = await userResponse.json();
    
    if (!userData.data?.id) return [];
    
    // Then get tweets
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userData.data.id}/tweets?max_results=10&tweet.fields=created_at,public_metrics&expansions=attachments.media_keys&media.fields=url,preview_image_url`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );
    const tweetsData = await tweetsResponse.json();
    
    return (tweetsData.data as Array<{ id: string; text: string; created_at: string; attachments?: { media_keys?: string[] }; public_metrics?: { like_count?: number; reply_count?: number; retweet_count?: number } }>).map((tweet) => ({
      id: tweet.id,
      platform: 'twitter' as const,
      content: tweet.text,
      image: tweet.attachments?.media_keys?.[0] ? 
        tweetsData.includes?.media?.find((m: { media_key: string; url?: string }) => m.media_key === tweet.attachments?.media_keys?.[0])?.url : undefined,
      author: 'WHO Somalia',
      authorImage: 'https://ui-avatars.com/api/?name=WHO&background=1da1f2&color=fff&size=64',
      timestamp: formatTimestamp(tweet.created_at),
      likes: tweet.public_metrics?.like_count || 0,
      comments: tweet.public_metrics?.reply_count || 0,
      shares: tweet.public_metrics?.retweet_count || 0,
      url: `https://twitter.com/${username}/status/${tweet.id}`
    }));
  } catch (error: unknown) {
    console.error('Error fetching Twitter posts:', error);
    return [];
  }
};

// Instagram Basic Display API (requires access token)
export const fetchInstagramPosts = async (accessToken: string): Promise<SocialPost[]> => {
  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`
    );
    const data = await response.json();
    
    return (data.data as Array<{ id: string; caption?: string; media_type: string; media_url: string; permalink: string; timestamp: string }>)
      .filter((post) => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM')
      .map((post) => ({
        id: post.id,
        platform: 'instagram' as const,
        content: post.caption || '',
        image: post.media_url,
        author: 'WHO Somalia',
        authorImage: 'https://ui-avatars.com/api/?name=WHO&background=e4405f&color=fff&size=64',
        timestamp: formatTimestamp(post.timestamp),
        likes: 0, // Instagram API doesn't provide likes count in basic display
        comments: 0,
        shares: 0,
        url: post.permalink
      }));
  } catch (error: unknown) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
};

// Helper function to format timestamps
const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  return date.toLocaleDateString();
};

// Combined function to fetch all social media posts from real APIs
export const fetchAllSocialPosts = async (): Promise<SocialPost[]> => {
  const allPosts: SocialPost[] = [];
  
  try {
    // Fetch Facebook posts if credentials are available
    if (FACEBOOK_ACCESS_TOKEN && FACEBOOK_PAGE_ID) {
      console.log('Fetching Facebook posts from your profile...');
      const facebookPosts = await fetchFacebookPosts(FACEBOOK_PAGE_ID, FACEBOOK_ACCESS_TOKEN);
      // Take the latest 3 Facebook posts
      allPosts.push(...facebookPosts.slice(0, 3));
    }
    
    // Fetch Twitter posts if credentials are available
    if (TWITTER_BEARER_TOKEN) {
      console.log('Fetching Twitter posts...');
      const twitterPosts = await fetchTwitterPosts(TWITTER_USERNAME, TWITTER_BEARER_TOKEN);
      allPosts.push(...twitterPosts.slice(0, 1)); // Take only 1 Twitter post
    }
    
    // Fetch Instagram posts if credentials are available
    if (INSTAGRAM_ACCESS_TOKEN) {
      console.log('Fetching Instagram posts...');
      const instagramPosts = await fetchInstagramPosts(INSTAGRAM_ACCESS_TOKEN);
      allPosts.push(...instagramPosts.slice(0, 1)); // Take only 1 Instagram post
    }
    
    // If no real posts were fetched, use mock data
    if (allPosts.length === 0) {
      console.log('No real social media credentials found, using mock data...');
      return getMockPosts();
    }
    
    // Sort by timestamp (newest first)
    allPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return allPosts.slice(0, 3); // Return maximum 3 posts
    
  } catch (error) {
    console.error('Error fetching social media posts:', error);
    return getMockPosts();
  }
};

// Mock data fallback
const getMockPosts = (): SocialPost[] => {
  return [
    {
      id: '1',
      platform: 'facebook',
      content: '🎥 NEW VIDEO: Watch our exclusive behind-the-scenes look at World Patient Safety Day 2025 preparations! See how healthcare professionals across Somalia are getting ready for this transformative event. #PatientSafety #Healthcare #Somalia #WPSD2025',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop',
      author: 'World Patient Safety Day',
      authorImage: 'https://ui-avatars.com/api/?name=WPSD&background=2563eb&color=fff&size=64',
      timestamp: '2 hours ago',
      likes: 245,
      comments: 18,
      shares: 32,
      url: 'https://www.facebook.com/61577614928449/videos/1263637095424549'
    },
    {
      id: '2',
      platform: 'twitter',
      content: '🚨 Breaking: Registration for World Patient Safety Day 2025 is now OPEN! Healthcare professionals from across Somalia are invited to join us in Mogadishu. Secure your spot today! #PatientSafety #Healthcare #Somalia',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop',
      author: 'WHO Somalia',
      authorImage: 'https://ui-avatars.com/api/?name=WHO&background=1da1f2&color=fff&size=64',
      timestamp: '4 hours ago',
      likes: 189,
      comments: 12,
      shares: 45,
      url: 'https://twitter.com/WHO'
    },
    {
      id: '3',
      platform: 'instagram',
      content: 'Behind the scenes: Preparing for World Patient Safety Day 2025! Our team is working tirelessly to ensure this event will be a game-changer for healthcare in Somalia. #BehindTheScenes #PatientSafety #Healthcare',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&h=300&fit=crop',
      author: 'WHO Somalia',
      authorImage: 'https://ui-avatars.com/api/?name=WHO&background=e4405f&color=fff&size=64',
      timestamp: '1 day ago',
      likes: 312,
      comments: 24,
      shares: 67,
      url: 'https://instagram.com/who'
    }
  ];
}; 