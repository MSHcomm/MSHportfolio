# Mohamed Gedan - Senior Embedded Systems & Firmware Architect

Welcome to the source code of my personal portfolio and resume website! 

This is a modern, responsive, and highly optimized web application built to showcase my experience in embedded systems, firmware architecture, and low-level development. 

## Tech Stack

This project was built from the ground up prioritizing extreme performance, low overhead, and a "Dark Infrastructure" aesthetic:

- **Framework**: [Astro](https://astro.build/) - For shipping zero-JS by default and static HTML generation.
- **UI Components**: [React](https://react.dev/) - Used strictly for interactive "Islands" (like the 3D scene, terminal emulator, and bento grids).
- **Styling**: Scoped Vanilla CSS - No heavy CSS frameworks like Tailwind or Bootstrap. Uses native CSS variables and modern Grid/Flexbox layouts.
- **3D Graphics**: Three.js & React Three Fiber - For the interactive background particle sphere and terminal effects.

## Features

- **Blazing Fast**: Perfect Lighthouse scores. Astro islands ensure JavaScript is only loaded exactly where needed.
- **Bento Grid Layout**: A responsive, fluid grid system that neatly categorizes skills, certifications, and education.
- **Dark Infrastructure Theme**: A custom-designed dark mode with subtle glowing accents and monospace typography that reflects an embedded engineering environment.
- **Full i18n Support**: Native static swapping between English and German without heavy translation libraries.
- **Accessibility (A11y)**: Fully compliant with screen readers, aria-labels, and semantic HTML tags.

## Development

To run this project locally, you will need Node.js and NPM installed.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:4321`.

3. **Build for production:**
   ```bash
   npm run build
   ```
   This will generate a highly optimized static build in the `dist/` directory.

## License & Copyright

All rights reserved. The content and design of this portfolio are the intellectual property of Mohamed Gedan. 
