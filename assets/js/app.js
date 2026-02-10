// Main application logic for FAIRmodels website

// Configuration
const config = {
    contentPath: 'content/',
    defaultPage: 'home'
};

// Router
class Router {
    constructor() {
        this.routes = {
            'home': 'home.md',
            'metadata': 'metadata.md',
            'model-package': 'model-package.md',
            'validation': 'validation.md',
            'search': 'search.md',
            'api': 'api.md',
            'about': 'about.md'
        };
        
        this.init();
    }
    
    init() {
        // Handle hash changes
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Handle initial load
        this.handleRoute();
        
        // Setup navigation
        this.setupNavigation();
        
        // Setup mobile menu
        this.setupMobileMenu();
    }
    
    handleRoute() {
        let hash = window.location.hash.slice(1) || config.defaultPage;
        
        // Show/hide hero section
        const heroSection = document.getElementById('hero');
        if (hash === 'home') {
            heroSection.style.display = 'block';
        } else {
            heroSection.style.display = 'none';
        }
        
        // Load content
        this.loadContent(hash);
        
        // Update active nav link
        this.updateActiveNav(hash);
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    async loadContent(page) {
        const contentDiv = document.getElementById('content');
        
        // Show loading state
        contentDiv.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading...</p></div>';
        
        try {
            const filePath = `${config.contentPath}${this.routes[page] || this.routes.home}`;
            const response = await fetch(filePath);
            
            if (!response.ok) {
                throw new Error('Content not found');
            }
            
            const markdown = await response.text();
            const html = marked.parse(markdown);
            
            contentDiv.innerHTML = html;
            
            // Add syntax highlighting to code blocks if needed
            this.enhanceCodeBlocks();
            
            // Make external links open in new tab
            this.processLinks();
            
        } catch (error) {
            console.error('Error loading content:', error);
            contentDiv.innerHTML = `
                <div class="error-message">
                    <h2>Content Not Found</h2>
                    <p>The requested page could not be loaded. Please try again or return to the <a href="#home">home page</a>.</p>
                </div>
            `;
        }
    }
    
    updateActiveNav(page) {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page link
        const activeLink = document.querySelector(`a[href="#${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    setupNavigation() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                navMenu.classList.remove('active');
            });
        });
    }
    
    setupMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (toggle) {
            toggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                toggle.classList.toggle('active');
            });
        }
    }
    
    enhanceCodeBlocks() {
        // Add copy button to code blocks
        document.querySelectorAll('pre code').forEach(block => {
            const pre = block.parentElement;
            
            // Add language label if available
            const language = block.className.match(/language-(\w+)/)?.[1] || 'code';
            
            // Wrap in code container
            const container = document.createElement('div');
            container.className = 'code-container';
            pre.parentNode.insertBefore(container, pre);
            container.appendChild(pre);
            
            // Add header with language and copy button
            const header = document.createElement('div');
            header.className = 'code-header';
            header.innerHTML = `
                <span class="code-language">${language}</span>
                <button class="code-copy" title="Copy to clipboard">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy
                </button>
            `;
            
            container.insertBefore(header, pre);
            
            // Add copy functionality
            const copyBtn = header.querySelector('.code-copy');
            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(block.textContent);
                    copyBtn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Copied!
                    `;
                    setTimeout(() => {
                        copyBtn.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copy
                        `;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    }
    
    processLinks() {
        // Make external links open in new tab
        document.querySelectorAll('#content a').forEach(link => {
            if (link.hostname && link.hostname !== window.location.hostname) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }
}

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Router();
});

// Configure marked options
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
});
