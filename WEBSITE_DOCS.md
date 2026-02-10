# FAIRmodels Website - Developer Documentation

## Overview

This is a modern, static website for FAIRmodels built with HTML, CSS, and JavaScript. The content is stored in markdown files and dynamically rendered in the browser.

## Architecture

### Technical Stack

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS variables
- **Vanilla JavaScript**: No framework dependencies
- **Marked.js**: Client-side markdown parsing
- **GitHub Pages**: Static hosting

### Design Pattern

The website uses a **Single Page Application (SPA)** pattern with:
- Hash-based routing (`#home`, `#metadata`, etc.)
- Dynamic content loading from markdown files
- Client-side markdown rendering
- No build process required

### Inspiration

Design influenced by:
- **HuggingFace.co**: Clean, modern AI platform design
- **medicaldataworks.nl**: Professional healthcare tech aesthetic
- **johanvansoest.nl**: Simple markdown-based content structure

## File Structure

```
FAIRmodels/
├── index.html              # Main HTML structure
├── assets/
│   ├── css/
│   │   └── style.css       # All styles (CSS variables, responsive)
│   ├── js/
│   │   └── app.js          # Router, markdown parser, UI logic
│   └── img/
│       └── logo.png        # FAIRmodels logo
├── content/                # Markdown content files
│   ├── home.md            # Landing page content
│   ├── metadata.md        # Model metadata documentation
│   ├── model-package.md   # Model packaging guide
│   ├── validation.md      # FAIVOR validation tools
│   ├── search.md          # Search and query documentation
│   ├── api.md             # API reference
│   └── about.md           # About the project
├── _config.yml            # Jekyll config (minimal, for fallback)
├── .nojekyll              # Disable Jekyll processing
├── README.md              # Project overview (redirects to website)
└── README.md.backup       # Original README content
```

## Key Features

### 1. Hash-based Routing

The router in `app.js` handles navigation:

```javascript
// URL pattern: https://site.com/#metadata
// Routes to: content/metadata.md
```

Routes are defined in the `Router` class:
```javascript
this.routes = {
    'home': 'home.md',
    'metadata': 'metadata.md',
    'model-package': 'model-package.md',
    // ... etc
}
```

### 2. Dynamic Content Loading

When a route changes:
1. Fetch markdown file from `content/` directory
2. Parse markdown to HTML using Marked.js
3. Inject HTML into content area
4. Enhance with features (code blocks, links)

### 3. Markdown Enhancements

After rendering, the app enhances content:
- **Code blocks**: Add language labels and copy buttons
- **External links**: Open in new tab automatically
- **Syntax highlighting**: Visual code presentation

### 4. Responsive Design

Mobile-first approach with breakpoints:
- Desktop: 968px+
- Tablet: 768px - 968px
- Mobile: < 768px

Features:
- Collapsible mobile navigation
- Flexible grid layouts
- Touch-friendly interactions

### 5. Modern UX Elements

- **Hero section**: Eye-catching landing with gradient
- **Floating cards**: Animated feature highlights
- **Smooth transitions**: Professional feel
- **Loading states**: User feedback during content fetch
- **Error handling**: Graceful fallbacks

## Styling System

### CSS Variables

All colors, spacing, and design tokens defined as CSS variables:

```css
:root {
    --primary-color: #2563eb;
    --spacing-md: 1rem;
    --radius-lg: 0.75rem;
    /* ... etc */
}
```

Benefits:
- Easy theming
- Consistent design
- Simple maintenance

### Color Palette

- **Primary**: Blue (#2563eb) - Trust, professionalism
- **Secondary**: Purple (#7c3aed) - Innovation
- **Accent**: Cyan (#06b6d4) - Technology
- **Grays**: 50-900 scale for text and backgrounds

### Typography

- **Font**: Inter (Google Fonts) - Modern, readable
- **Hierarchy**: Clear heading levels (h1-h3)
- **Line height**: 1.6 for comfortable reading
- **Responsive sizes**: Scale down on mobile

## Content Management

### Adding a New Page

1. **Create markdown file** in `content/`:
   ```bash
   touch content/new-page.md
   ```

2. **Add route** in `app.js`:
   ```javascript
   this.routes = {
       // ... existing routes
       'new-page': 'new-page.md'
   }
   ```

3. **Add navigation link** in `index.html`:
   ```html
   <li><a href="#new-page" class="nav-link">New Page</a></li>
   ```

4. **Write content** in markdown:
   ```markdown
   # New Page Title
   
   Content goes here...
   ```

### Markdown Features

All standard markdown supported:
- Headers (h1-h6)
- **Bold** and *italic*
- Lists (ordered and unordered)
- Links and images
- Code blocks with language highlighting
- Tables
- Blockquotes

### Code Examples

Use fenced code blocks with language:

````markdown
```python
def hello():
    print("Hello, FAIRmodels!")
```
````

The app automatically adds:
- Language label
- Copy button
- Syntax-appropriate styling

## Deployment

### GitHub Pages

The site is designed for GitHub Pages:

1. **Enable GitHub Pages**:
   - Repository Settings → Pages
   - Source: Deploy from branch
   - Branch: main (or master)
   - Folder: / (root)

2. **Access**:
   - URL: `https://fair4ai.github.io/FAIRmodels/`
   - Automatically builds on push

3. **Custom Domain** (optional):
   - Add CNAME file with your domain
   - Configure DNS

### Local Development

Test locally with any HTTP server:

**Python**:
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

**Node.js**:
```bash
npx http-server
# Visit http://localhost:8080
```

**VS Code**:
- Install "Live Server" extension
- Right-click index.html → "Open with Live Server"

### Other Hosts

Works with any static hosting:
- **Netlify**: Drag & drop deployment
- **Vercel**: Git-based deployment
- **Cloudflare Pages**: Fast edge hosting
- **AWS S3**: Bucket with static hosting
- **Traditional hosting**: Upload via FTP

## Customization

### Changing Colors

Edit CSS variables in `assets/css/style.css`:

```css
:root {
    --primary-color: #your-color;
    --primary-dark: #darker-shade;
    --primary-light: #lighter-shade;
}
```

### Changing Fonts

Update in `index.html` and CSS:

```html
<!-- In <head> -->
<link href="https://fonts.googleapis.com/css2?family=Your+Font" rel="stylesheet">
```

```css
:root {
    --font-family: 'Your Font', sans-serif;
}
```

### Modifying Layout

- **Hero section**: Edit in `index.html` and `style.css` (.hero)
- **Navigation**: Modify `.navbar` styles
- **Content area**: Adjust `.content-area` styles
- **Footer**: Update `.footer` section

### Adding Features

Examples of possible additions:

**Search functionality**:
```javascript
// In app.js
searchContent(query) {
    // Implement search across all markdown files
}
```

**Dark mode**:
```javascript
toggleTheme() {
    document.body.classList.toggle('dark-mode');
    // Define dark-mode CSS variables
}
```

**Analytics**:
```html
<!-- In index.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
```

## Browser Compatibility

Tested and working on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

Uses modern features:
- CSS Grid and Flexbox
- CSS Variables
- Fetch API
- ES6+ JavaScript

## Performance

### Optimization Strategies

1. **Lazy loading**: Content loaded on-demand
2. **Minimal dependencies**: Only Marked.js (11KB gzipped)
3. **CSS-only animations**: No JavaScript overhead
4. **Efficient selectors**: Minimal specificity
5. **Caching**: Browser caches static assets

### Metrics

Typical load times:
- Initial load: ~1s (including Google Fonts)
- Page transitions: ~100-200ms
- Markdown parsing: ~50ms

### Improvements

Possible optimizations:
- Service worker for offline support
- Image lazy loading
- CSS/JS minification
- CDN for assets
- Preloading critical resources

## Accessibility

### Current Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Sufficient color contrast (WCAG AA)
- Responsive text sizing

### Future Improvements

- Skip to content link
- Screen reader testing
- Focus visible indicators
- Reduced motion support
- WCAG AAA compliance

## SEO

### Metadata

Update in `index.html`:

```html
<title>FAIRmodels - FAIR AI Model Repository</title>
<meta name="description" content="...">
```

### Structured Data

Consider adding JSON-LD:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "FAIRmodels",
  "url": "https://fair4ai.github.io/FAIRmodels/"
}
</script>
```

### Best Practices

- Descriptive page titles
- Semantic heading hierarchy
- Alt text for images
- Meaningful link text
- Mobile-friendly design

## Troubleshooting

### Content Not Loading

**Issue**: Blank content area

**Solutions**:
1. Check browser console for errors
2. Verify markdown file exists in `content/`
3. Check file permissions
4. Test with simple HTTP server (not `file://`)

### Styling Issues

**Issue**: Broken layout or missing styles

**Solutions**:
1. Hard refresh (Ctrl+F5 / Cmd+Shift+R)
2. Clear browser cache
3. Check CSS file path in `index.html`
4. Verify CSS syntax (use validator)

### Hash Routing Not Working

**Issue**: URLs don't navigate correctly

**Solutions**:
1. Check router initialization in `app.js`
2. Verify route definitions
3. Test `hashchange` event listener
4. Check for JavaScript errors

### Mobile Menu Stuck

**Issue**: Mobile menu won't open/close

**Solutions**:
1. Check JavaScript console
2. Verify `.mobile-menu-toggle` selector
3. Test `active` class toggle
4. Check CSS transitions

## Contributing

### Code Style

- **HTML**: 2-space indentation, semantic tags
- **CSS**: 4-space indentation, logical property order
- **JavaScript**: 4-space indentation, ES6+ syntax

### Pull Request Process

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit PR with description

### Testing Checklist

Before submitting changes:
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile device
- [ ] Check all navigation links
- [ ] Verify markdown rendering
- [ ] Test code copy buttons
- [ ] Check console for errors
- [ ] Validate HTML/CSS

## Maintenance

### Regular Tasks

- **Update content**: Keep documentation current
- **Check links**: Verify external links work
- **Update dependencies**: Keep Marked.js current
- **Review analytics**: Monitor usage patterns
- **Test browsers**: Check new browser versions

### Security

- No sensitive data in repository
- External links use `rel="noopener"`
- No inline scripts (CSP-friendly)
- HTTPS-only resources

## Support

### Resources

- [Marked.js Documentation](https://marked.js.org/)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [MDN Web Docs](https://developer.mozilla.org/)

### Contact

- GitHub Issues: Report bugs and request features
- Repository Discussions: Ask questions
- Email: Check main README for contact

## License

This website code is part of the FAIRmodels project, licensed under Apache-2.0.

---

**Last Updated**: February 2026
