# AI Image Detection

A modern Next.js web application that detects whether an uploaded image is AI-generated or real using advanced detection algorithms.

## Features

- 🖼️ **Drag & Drop Upload** - Intuitive image upload with drag and drop support
- 🔗 **URL Support** - Analyze images directly from URLs
- ⚡ **Fast Analysis** - Get results in seconds
- 🎯 **Accurate Detection** - Powered by multiple AI detection APIs
- 📊 **Detailed Results** - View probability scores and confidence levels
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔒 **Privacy Focused** - Images processed securely and never stored

## Tech Stack

- **Next.js 14+** with App Router
- **React 18+**
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **External AI Detection APIs**

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-detection
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

4. Add your API keys to `.env.local` (when integrating real APIs):
```
API_KEY_1=your_first_api_key_here
API_KEY_2=your_second_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ai-detection/
├── app/
│   ├── api/
│   │   └── detect/
│   │       └── route.js          # API endpoint for image detection
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── Hero.jsx              # Hero section with headline
│   │   ├── UploadBox.jsx         # Image upload interface
│   │   ├── Progress.jsx          # Loading indicator
│   │   ├── ResultBox.jsx         # Detection results display
│   │   └── Footer.jsx            # Footer with links
│   ├── layout.jsx                # Root layout
│   ├── page.jsx                  # Homepage
│   └── globals.css               # Global styles
├── public/                       # Static assets
├── package.json
├── tailwind.config.js
└── next.config.js
```

## Integrating Real AI Detection APIs

The app currently uses simulated API responses. To integrate real AI detection services:

1. Choose your AI detection APIs (examples):
   - [Hive AI](https://thehive.ai/apis/content-moderation)
   - [Optic](https://optic.xyz/)
   - [Illuminarty](https://illuminarty.ai/)

2. Sign up and get API keys

3. Add keys to `.env.local`

4. Update `app/api/detect/route.js`:
   - Replace `simulateAPI1Detection` and `simulateAPI2Detection` functions
   - Add proper API calls with your credentials
   - See comments in the file for example implementation

## Customization

### Styling

- Edit `tailwind.config.js` to customize theme colors
- Modify component styles in individual `.jsx` files
- Update `app/globals.css` for global style changes

### Content

- Update text in `app/components/Hero.jsx`
- Modify navbar links in `app/components/Navbar.jsx`
- Change footer content in `app/components/Footer.jsx`

## Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Deployment

Deploy easily to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-detection)

Or deploy to any platform that supports Next.js:
- Vercel
- Netlify
- Railway
- AWS
- Google Cloud

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub or contact the maintainer.

