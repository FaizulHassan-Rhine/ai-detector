# Cursor AI Prompt --- Image Authenticity Detection Website

## Project Summary

Build a **Next.js (App Router)** web application that allows users to
detect whether an uploaded image is **AI-generated or Real** using two
external APIs. The site should support: - Drag & drop image upload -
Manual file selection - Pasting an image URL - Displaying upload
progress with icons - Showing API detection results - Minimal modern UI
with **TailwindCSS** - Icons from **lucide-react** - Components written
in **JSX**

------------------------------------------------------------------------

## Tech Stack

-   **Next.js 14+ (App Router)**
-   **TailwindCSS**
-   **lucide-react** for icons
-   **React Hooks** for state management
-   **External API calls** for image authenticity detection

------------------------------------------------------------------------

## Page Structure

    app/
    ├── layout.jsx
    ├── page.jsx               # homepage (hero + upload)
    ├── api/
    │   ├── detect/route.js    # route to call external detection APIs
    │   └── ...
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── UploadBox.jsx
        ├── Progress.jsx
        ├── ResultBox.jsx
        └── Footer.jsx

------------------------------------------------------------------------

## Requirements

### Navbar

-   Left: Logo or site title
-   Right: Minimal navigation (Home, Docs, API)
-   Sticky top, shadow, modern design

### Hero Section

-   Centered headline and subtext
-   Upload Box component inside hero
-   Support:
    -   Drag & drop image
    -   File upload button
    -   Paste image URL input

### Upload Flow

1.  User uploads image or pastes URL
2.  Show **progress bar + lucide icons** while uploading
3.  Send image to **Next.js API route** (`/api/detect`)
4.  API calls **two external image detection APIs**
5.  Combine responses
6.  Show final result in `ResultBox`

### Result Section

-   Show analysis:
    -   Probability of AI
    -   Probability Real
    -   API confidence
-   Show uploaded image preview
-   Clean card UI

### Footer

-   Simple copyright
-   Links (GitHub, Contact)

------------------------------------------------------------------------

## Styling Notes

-   Use **Tailwind** for all styling
-   Rounded-xl cards, glass background
-   Soft gradients for hero section
-   Responsive grid layout

------------------------------------------------------------------------

## lucide-react Icons to Use

-   `UploadCloud`
-   `Link`
-   `Image`
-   `CheckCircle`
-   `Loader`
-   `AlertTriangle`

------------------------------------------------------------------------

## API Instructions (Backend)

Your `/api/detect` route should: - Accept image file or URL - Upload to
external APIs - Return merged JSON result

Example structure:

``` js
return NextResponse.json({
  api1: result1,
  api2: result2,
  final: "AI" || "REAL",
});
```

------------------------------------------------------------------------

## UI Flow Summary

1.  User visits homepage
2.  Hero shows upload box
3.  User uploads image
4.  Progress loader appears
5.  API detects authenticity
6.  Show result card with probabilities
7.  Footer at bottom

------------------------------------------------------------------------

## Goal

This `.md` prompt will be used in **Cursor AI** to generate full code
for the Next.js app automatically.

------------------------------------------------------------------------

**End of Prompt File**
