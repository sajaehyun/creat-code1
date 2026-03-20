# Claude Introduction Page Project

## Overview
A responsive, modern introduction landing page for Claude, an AI assistant by Anthropic. The page features a clean design with animations, dark/light theme support, and interactive components.

## Features
- **Responsive Navigation:** Sticky navbar with mobile hamburger menu and scroll effects.
- **Hero Section:** Floating robot icon and dynamic typing effect.
- **About Section:** Information about Claude with animated counter-up statistics.
- **Features Section:** Interactive cards with 3D tilt effect on hover.
- **Model Comparison:** Clear table layout for different Claude 4 model versions.
- **FAQ Section:** Functional accordion for frequently asked questions.
- **Theme Support:** Dark/Light mode toggle with persistence using local storage.
- **Animations:** Smooth scrolling, 3D tilt, and dynamic typing effects. (Scroll-triggered fade-in animations have been removed for immediate visibility).

## Design Details
- **Typography:** Segoe UI, sans-serif.
- **Colors:** Deep purple/blue gradient for dark mode, soft beige/cream for light mode. Gold (`#d4a76a`) accent color for highlights and interactivity.
- **Styling:** Vanilla CSS with modern features like backdrop-filter, linear-gradients, and custom animations.
- **Interactivity:** Shadow "glow" effects on buttons and cards, 3D tilt effects, and smooth transitions.

## Project Structure
- `index.html`: Main HTML structure, linking to external CSS and JS.
- `style.css`: All styling rules, including the modified `.fade-in` class (set to `opacity: 1` by default).
- `main.js`: Interactive logic (typing effect, theme toggle, mobile menu, stats counter).

## Latest Changes
- Separated CSS and JavaScript into external files (`style.css` and `main.js`).
- Modified `.fade-in` class to ensure all sections are visible immediately upon page load.
- Removed `IntersectionObserver` logic responsible for the fade-in animation.
- Updated project documentation in `blueprint.md`.
