# FAIRmodels

> **Note**: This repository has been converted to a modern static website. The content is now available through [index.html](index.html).

## Quick Links

- **[View Website](https://fair4ai.github.io/FAIRmodels/)** - Full website with modern design
- **[Browse Models](https://v3.fairmodels.org)** - Access the model repository
- **[Model Package](https://github.com/MaastrichtU-BISS/FAIRmodels-model-package)** - Create containerized models
- **[FAIVOR Dashboard](https://github.com/MaastrichtU-BISS/FAIVOR-Dashboard)** - Validate models locally

## Overview

FAIRmodels is a comprehensive platform for making AI/ML models **Findable**, **Accessible**, **Interoperable**, and **Reusable**. The platform provides:

- 📋 **Model Metadata Repository** - Standardized, machine-interpretable model descriptions
- 📦 **Model Package System** - Containerize models with standardized REST APIs
- ✅ **Validation Tools (FAIVOR)** - Validate model performance on local data
- 🔍 **Search & Query** - JSON-LD and SPARQL interfaces for model discovery

## Documentation

All documentation is now available through the website:

- [Home](content/home.md) - Introduction and overview
- [Model Metadata](content/metadata.md) - Metadata schema and access
- [Model Package](content/model-package.md) - Containerization guide
- [Validation](content/validation.md) - FAIVOR validation tools
- [Search & Query](content/search.md) - Searching and querying models
- [API Reference](content/api.md) - Complete API documentation
- [About](content/about.md) - Project background and team

## Local Development

To run the website locally:

```bash
# Simple HTTP server with Python
python -m http.server 8000

# Or with Node.js
npx http-server

# Then visit http://localhost:8000
```

## GitHub Pages

This website is designed to work with GitHub Pages. The site automatically loads content from markdown files in the `content/` directory.

## Legacy Documentation

The original README content is preserved in [README.md.backup](README.md.backup).

## License

Apache-2.0 - See [LICENSE](LICENSE) for details.