# Claude Introduction Page Project

## Overview
A responsive, modern introduction landing page for Claude, an AI assistant by Anthropic. The page features a clean design with animations, dark/light theme support, and interactive components.

## Features
- **Responsive Navigation:** Sticky navbar with mobile hamburger menu and scroll effects.
- **Hero Section:** Floating robot icon and dynamic typing effect.
- **AI Circuit Validator (New):** Integrated Teachable Machine model to verify circuit diagrams via webcam in real-time.
- **About Section:** Information about Claude with animated counter-up statistics.
- **Features Section:** Interactive cards with 3D tilt effect on hover.
- **Model Comparison:** Clear table layout for different Claude 4 model versions.
- **Affiliate Inquiry:** A professional contact form integrated with Formspree for partnership and API inquiries.
- **Comments Section:** Integrated Disqus for user feedback and discussions.
- **FAQ Section:** Functional accordion for frequently asked questions.
- **Theme Support:** Dark/Light mode toggle with persistence using local storage.

## Design Details
- **Typography:** Segoe UI, sans-serif.
- **Colors:** Deep purple/blue gradient for dark mode, soft beige/cream for light mode. Gold (`#d4a76a`) accent color for highlights and interactivity.
- **Styling:** Vanilla CSS with modern features like backdrop-filter, linear-gradients, and custom animations.
- **Interactivity:** Shadow "glow" effects on buttons and cards, 3D tilt effects, and smooth transitions.

## Project Structure
- `index.html`: Main HTML structure, linking to external CSS and JS.
- `style.css`: All styling rules, including styles for the new AI Circuit Validator.
- `main.js`: Interactive logic (typing effect, theme toggle, mobile menu, stats counter, and Teachable Machine integration).

## Latest Changes
- Implemented "AI 회로 검증기" (AI Circuit Validator) using Teachable Machine.
- Added real-time webcam processing and classification display.
- Added Teachable Machine model URL: `https://teachablemachine.withgoogle.com/models/-QV2XmXIr/`.
- Updated navigation and global styles to accommodate the new section.
