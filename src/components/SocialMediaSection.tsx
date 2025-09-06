import React, { useState, useEffect } from 'react';
import { Share2, Facebook, Twitter, Instagram, ExternalLink, Heart, MessageCircle, Share, Play } from 'lucide-react';
import { fetchAllSocialPosts, SocialPost } from '../services/socialMediaService';

const SocialMediaSection: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePlatform, setActivePlatform] = useState<'all' | 'facebook' | 'twitter' | 'instagram'>('all');

  // Fetch social media posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchAllSocialPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error loading social media posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = activePlatform === 'all' 
    ? posts.slice(0, 3) // Only show 3 posts maximum
    : posts.filter(post => post.platform === activePlatform).slice(0, 1); // Only 1 post per platform when filtered

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'twitter': return <Twitter className="h-5 w-5 text-blue-400" />;
      case 'instagram': return <Instagram className="h-5 w-5 text-pink-500" />;
      default: return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'facebook': return 'border-blue-200 bg-blue-50';
      case 'twitter': return 'border-blue-200 bg-blue-50';
      case 'instagram': return 'border-pink-200 bg-pink-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'facebook': return 'bg-blue-600 text-white';
      case 'twitter': return 'bg-blue-400 text-white';
      case 'instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <section id="social-media" className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-soft">
            <Share2 className="h-4 w-4" />
            Latest Updates
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Follow Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Social Media</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, announcements, and insights about World Patient Safety Day 2025
          </p>
        </div>

        {/* Platform Filter */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActivePlatform('all')}
            className={`px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 ${
              activePlatform === 'all' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
            }`}
          >
            <Share2 className="h-5 w-5" />
            All Platforms
          </button>
          <button
            onClick={() => setActivePlatform('facebook')}
            className={`px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 ${
              activePlatform === 'facebook' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
            }`}
          >
            <Facebook className="h-5 w-5" />
            Facebook
          </button>
          <button
            onClick={() => setActivePlatform('twitter')}
            className={`px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 ${
              activePlatform === 'twitter' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
            }`}
          >
            <Twitter className="h-5 w-5" />
            Twitter
          </button>
          <button
            onClick={() => setActivePlatform('instagram')}
            className={`px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 ${
              activePlatform === 'instagram' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
            }`}
          >
            <Instagram className="h-5 w-5" />
            Instagram
          </button>
        </div>

        {/* Posts Grid - Fixed 3 columns */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading latest posts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {filteredPosts.map((post) => (
              <div key={post.id} className={`bg-white rounded-2xl shadow-xl border ${getPlatformColor(post.platform)} overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
                {/* Platform Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getPlatformBadge(post.platform)} z-10`}>
                  {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                </div>

                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={post.authorImage} 
                      alt={post.author}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{post.author}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {getPlatformIcon(post.platform)}
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Post Content */}
                  <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt="Post content"
                      className="w-full h-48 object-cover"
                    />
                    {/* Video indicator for Facebook posts */}
                    {post.platform === 'facebook' && post.url.includes('/videos/') && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-3">
                          <Play className="h-8 w-8 text-white fill-current" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Post Actions */}
                <div className="p-6 pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="font-medium">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{post.shares}</span>
                      </div>
                    </div>
                    <a 
                      href={post.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors font-medium"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Empty placeholders to maintain 3-column layout */}
            {Array.from({ length: Math.max(0, 3 - filteredPosts.length) }).map((_, index) => (
              <div key={`placeholder-${index}`} className="bg-transparent border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center min-h-[400px]">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-sm">More posts coming soon</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Social Media Links */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://facebook.com/WorldPatientSafetyDay" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
              <Facebook className="h-6 w-6" />
              <span className="font-semibold">Facebook</span>
            </a>
            
            <a href="https://twitter.com/WHO" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-3 bg-blue-400 text-white px-8 py-4 rounded-full hover:bg-blue-500 transition-colors shadow-lg hover:shadow-xl">
              <Twitter className="h-6 w-6" />
              <span className="font-semibold">Twitter</span>
            </a>
            
            <a href="https://instagram.com/who" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg hover:shadow-xl">
              <Instagram className="h-6 w-6" />
              <span className="font-semibold">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;