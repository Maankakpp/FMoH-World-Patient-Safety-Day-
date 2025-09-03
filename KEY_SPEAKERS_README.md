# Key Speakers Section

## Overview
The Key Speakers section has been added to your Health Day website with a modern, professional, and playful design. It features:

- **Featured Speakers**: Prominently displayed with larger cards and star badges
- **Additional Speakers**: Smaller cards in a grid layout
- **Interactive Elements**: Hover effects, social media links, and smooth transitions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## Features

### Design Elements
- **Gradient Backgrounds**: Beautiful blue-to-indigo gradients
- **Hover Effects**: Cards scale and change colors on hover
- **Expertise Tags**: Color-coded skill badges for each speaker
- **Social Media Links**: LinkedIn, Twitter, and website links
- **Fallback Images**: Uses UI Avatars API for placeholder images

### Speaker Information
Each speaker includes:
- Profile image
- Name and title
- Organization
- Bio/description
- Areas of expertise
- Social media links

## Customization

### Adding New Speakers
To add a new speaker, edit the `speakers` array in `src/components/KeySpeakers.tsx`:

```typescript
{
  id: 7,
  name: "Dr. New Speaker",
  title: "Medical Director",
  organization: "Healthcare Institute",
  image: "/speakers/speaker-7.jpg",
  bio: "Expert description here...",
  expertise: ["Specialty 1", "Specialty 2", "Specialty 3"],
  social: {
    linkedin: "https://linkedin.com/in/new-speaker",
    twitter: "https://twitter.com/newspeaker",
    website: "https://website.com"
  },
  featured: false // Set to true for featured speakers
}
```

### Adding Speaker Images
1. Place speaker images in the `public/speakers/` directory
2. Name them consistently (e.g., `speaker-1.jpg`, `speaker-2.jpg`)
3. Use the `generate-speaker-images.html` file to create placeholder images

### Styling Customization
The component uses Tailwind CSS classes. You can customize:
- Colors: Change `blue-600`, `indigo-600`, etc.
- Spacing: Modify `p-8`, `mb-16`, etc.
- Typography: Adjust `text-4xl`, `font-bold`, etc.

## File Structure
```
src/
├── components/
│   └── KeySpeakers.tsx          # Main component
public/
├── speakers/                     # Speaker images directory
│   ├── speaker-1.jpg
│   ├── speaker-2.jpg
│   └── ...
└── generate-speaker-images.html  # Image generator tool
```

## Integration
The Key Speakers section is automatically integrated into your website:
- Added to `src/App.tsx` in the main layout
- Navigation link added to `src/components/Header.tsx`
- Section ID: `key-speakers` for smooth scrolling

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for all screen sizes
- Graceful fallbacks for missing images

## Performance
- Lazy loading for images
- Optimized hover animations
- Minimal bundle size impact
- Efficient re-rendering

## Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

## Future Enhancements
Potential improvements you could add:
- Speaker search/filter functionality
- Speaker detail modal/popup
- Integration with backend API
- Speaker schedule/timeline
- Speaker ratings/reviews
- Speaker video introductions 