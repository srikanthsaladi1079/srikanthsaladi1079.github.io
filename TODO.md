# Performance Optimization Tasks

## Information Gathered

- **style1.css**: Over 2000 lines with extensive styles, animations, and 20 particle definitions (HTML only renders 10).
- **website1.html**: Contains extensive inline JavaScript for validation, theme toggle, form handling, and lightbox functionality.
- **Particle Effect**: Complex animations with floating effects that can impact performance on lower-end devices.
- **Current Setup**: Static site with external CDN links, no minification or build process.

## Plan

1. **Minify CSS**: Create style1.min.css by removing comments, whitespace, and optimizing selectors. Reduce particle count to 10 in CSS to match HTML.
2. **Minify JavaScript**: Extract inline JS from website1.html into script.min.js and minify it.
3. **Optimize Particles**: Add JavaScript performance detection to disable particles on slower devices. Optimize animations with will-change for GPU acceleration.
4. **Update HTML**: Replace inline JS with link to script.min.js, use style1.min.css, add conditional particle loading.
5. **Enhance Build Process**: Update build.py to automate minification using cssmin and jsmin.

## Dependent Files to be Edited

- style1.css (optimize particles)
- website1.html (extract JS, update links, add performance checks)
- script.js (extract inline JS from HTML)
- build.py (enhance for minification)

## Followup Steps

- Test load times, FPS during animations, and functionality (theme toggle, form, lightbox).
- Verify responsiveness and accessibility.
- Measure performance improvements using browser dev tools.

## Status Update

User has confirmed to proceed with the plan. Starting implementation.

## Current Tasks

- [ ] Step 1: Optimize style1.css - Reduce particle count from 20 to 10 and add will-change for GPU acceleration
- [ ] Step 2: Extract inline JavaScript from website1.html into script.js
- [ ] Step 3: Add performance detection in script.js to conditionally disable particles on slower devices
- [ ] Step 4: Update website1.html to link to style1.min.css and script.min.js, remove inline JS
- [ ] Step 5: Enhance build.py to minify CSS and JS files using cssmin and jsmin
- [ ] Step 6: Run build.py to generate minified files
- [ ] Step 7: Test optimized site for performance and functionality
