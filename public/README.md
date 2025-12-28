# Public Assets

This folder contains static assets that will be served directly.

## Required Files

1. **resume.pdf** - Your resume PDF file
   - Place your resume PDF here with the exact filename: `resume.pdf`
   - The download button in the hero section will automatically link to this file

2. **photo.jpg** - Your profile photo
   - Place your profile photo here with the exact filename: `photo.jpg`
   - Recommended size: 400x400px or larger (square aspect ratio)
   - Supported formats: JPG, PNG, or WebP
   - The photo will be displayed in the hero section with a circular frame

## File Structure

```
public/
  ├── resume.pdf
  └── photo.jpg
```

Note: If the photo fails to load, the component will automatically fall back to displaying your initials "VA".

