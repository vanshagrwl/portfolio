# Portfolio

A modern, animated portfolio website built with React, TypeScript, Vite, and Framer Motion.

## Features

- 🎨 Modern glassmorphism UI design
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🎯 Interactive elements with magnetic effects
- 📄 Resume download functionality
- 🏆 Certificates showcase with interactive stacking
- 💼 Projects showcase (Featured & Minor)
- 🛠️ Skills display with animated icons
- 📧 Contact section

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Add your assets to the `public` folder:
   - `photo.jpg` - Your profile photo
   - `resume.pdf` - Your resume PDF

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Deployment

### Netlify

This project is configured for Netlify deployment:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the `netlify.toml` configuration
4. Deploy!

The `netlify.toml` file includes:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect rules for client-side routing

## Project Structure

```
project/
├── public/
│   ├── photo.jpg          # Profile photo
│   ├── resume.pdf         # Resume PDF
│   └── README.md          # Public folder instructions
├── src/
│   ├── components/        # React components
│   │   ├── HeroBento.tsx
│   │   ├── Projects.tsx
│   │   ├── Certificates.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   └── Footer.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useMagneticEffect.ts
│   │   └── useSpotlight.ts
│   ├── utils/             # Utility functions
│   │   └── animations.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── netlify.toml           # Netlify configuration
└── package.json           # Dependencies
```

## Customization

### Update Projects

Edit `src/components/Projects.tsx` to add or modify projects.

### Update Certificates

Edit `src/components/Certificates.tsx` to add or modify certificates.

### Update Skills

Edit `src/components/Skills.tsx` to modify the skills list.

### Update Experience

Edit `src/components/Experience.tsx` to update work experience.

## License

MIT License - feel free to use this portfolio template for your own projects!

## Author

Vansh Agarwal - Full Stack Developer

