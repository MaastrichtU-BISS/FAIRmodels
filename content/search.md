# Search & Query FAIRmodels

FAIRmodels provides powerful search and query capabilities, enabling both human users and automated systems to discover and access AI model metadata efficiently.

## 🔍 Search Methods

### Web Interface

The primary way to browse models is through our web interface:

**[https://v3.fairmodels.org](https://v3.fairmodels.org)**

Features include:
- Full-text search across all metadata
- Filter by model type, clinical domain, performance metrics
- Sort by relevance, date, performance
- Preview model details
- Direct links to containerized models

### Programmatic Access

For automated systems and integration workflows, we provide machine-readable access via:

- **JSON-LD API**: RESTful access to metadata
- **SPARQL Endpoint**: Semantic queries via RDF databases
- **GraphQL**: Flexible data retrieval (coming soon)

## 📊 JSON-LD API

All model metadata is available in JSON-LD format, a linked data format that is both human-readable and machine-interpretable.

### Retrieve All Models

Get a list of all available models:

```bash
curl -H "accept: application/json-ld" https://v3.fairmodels.org
```

**Response:**
```json
[
  {
    "@context": "https://schema.org/",
    "@type": "SoftwareApplication",
    "identifier": "e46b07fd-fbd5-4466-9e5b-79dfa36d347d",
    "name": "Example Prediction Model",
    "description": "Clinical prediction model for...",
    "url": "https://v3.fairmodels.org/instance/e46b07fd-fbd5-4466-9e5b-79dfa36d347d"
  },
  ...
]
```

### Retrieve Specific Model

Access detailed metadata for a specific model using its unique identifier:

```bash
curl -H "accept: application/json-ld" \
  https://v3.fairmodels.org/instance/e46b07fd-fbd5-4466-9e5b-79dfa36d347d
```

**Response:**
```json
{
  "@context": "https://schema.org/",
  "@type": "SoftwareApplication",
  "identifier": "e46b07fd-fbd5-4466-9e5b-79dfa36d347d",
  "name": "Example Prediction Model",
  "description": "Detailed description of the model...",
  "version": "1.0.0",
  "author": {
    "@type": "Person",
    "name": "Dr. Jane Smith",
    "affiliation": "University Hospital"
  },
  "applicationCategory": "Clinical Decision Support",
  "operatingSystem": "Docker",
  "softwareRequirements": "Docker 20.10+",
  "url": "https://hub.docker.com/r/example/model",
  "license": "Apache-2.0",
  "citation": "Smith J, et al. Journal. 2025;1:123-456",
  "keywords": ["oncology", "prediction", "machine learning"],
  "performance": {
    "auc": 0.85,
    "accuracy": 0.82,
    "sensitivity": 0.78,
    "specificity": 0.87
  }
}
```

### Content Negotiation

The API supports content negotiation. Request different formats by setting the `Accept` header:

```bash
# JSON-LD
curl -H "Accept: application/json-ld" https://v3.fairmodels.org

# HTML (web page)
curl -H "Accept: text/html" https://v3.fairmodels.org

# RDF/XML
curl -H "Accept: application/rdf+xml" https://v3.fairmodels.org
```

## 🎯 SPARQL Queries

For advanced semantic queries, load the JSON-LD metadata into an RDF database and query using SPARQL.

### Setup with GraphDB

[GraphDB](https://www.ontotext.com/products/graphdb/) is a recommended RDF database that can parse JSON-LD:

1. **Download GraphDB**: Free edition available
2. **Create Repository**: Create a new RDF repository
3. **Import Data**: Load JSON-LD files from FAIRmodels
4. **Query**: Use SPARQL endpoint

### Example SPARQL Queries

#### Find All Models by Author

```sparql
PREFIX schema: <https://schema.org/>

SELECT ?model ?name ?author
WHERE {
  ?model a schema:SoftwareApplication ;
         schema:name ?name ;
         schema:author ?authorNode .
  ?authorNode schema:name ?author .
  FILTER(CONTAINS(LCASE(?author), "smith"))
}
```

#### Models with AUC > 0.80

```sparql
PREFIX schema: <https://schema.org/>

SELECT ?model ?name ?auc
WHERE {
  ?model a schema:SoftwareApplication ;
         schema:name ?name ;
         schema:performance ?perf .
  ?perf schema:auc ?auc .
  FILTER(?auc > 0.80)
}
ORDER BY DESC(?auc)
```

#### Models by Clinical Domain

```sparql
PREFIX schema: <https://schema.org/>

SELECT ?model ?name ?category
WHERE {
  ?model a schema:SoftwareApplication ;
         schema:name ?name ;
         schema:applicationCategory ?category .
  FILTER(CONTAINS(LCASE(?category), "oncology"))
}
```

#### Recent Models

```sparql
PREFIX schema: <https://schema.org/>

SELECT ?model ?name ?date
WHERE {
  ?model a schema:SoftwareApplication ;
         schema:name ?name ;
         schema:datePublished ?date .
}
ORDER BY DESC(?date)
LIMIT 10
```

#### Models with External Validation

```sparql
PREFIX schema: <https://schema.org/>

SELECT ?model ?name ?validation
WHERE {
  ?model a schema:SoftwareApplication ;
         schema:name ?name ;
         schema:validation ?validation .
  ?validation schema:validationType "external" .
}
```

## 🗄️ Setting Up Your Own SPARQL Endpoint

### Using GraphDB

1. **Install GraphDB**
   ```bash
   # Download from https://www.ontotext.com/products/graphdb/
   # Or use Docker
   docker pull ontotext/graphdb:10.7.0
   docker run -p 7200:7200 ontotext/graphdb:10.7.0
   ```

2. **Create Repository**
   - Open GraphDB Workbench: http://localhost:7200
   - Setup → Repositories → Create new repository
   - Repository ID: `fairmodels`
   - Ruleset: `RDFS-Plus`

3. **Import FAIRmodels Data**
   ```bash
   # Fetch all models
   curl -H "Accept: application/json-ld" \
     https://v3.fairmodels.org > fairmodels.jsonld
   
   # Import via GraphDB Workbench
   # Import → RDF → Upload fairmodels.jsonld
   ```

4. **Query**
   - Use SPARQL tab in GraphDB Workbench
   - Or query via HTTP:
   ```bash
   curl -X POST http://localhost:7200/repositories/fairmodels \
     -H "Content-Type: application/sparql-query" \
     -d 'SELECT * WHERE { ?s ?p ?o } LIMIT 10'
   ```

### Using Apache Jena Fuseki

Alternative lightweight SPARQL server:

```bash
# Download Fuseki
wget https://dlcdn.apache.org/jena/binaries/apache-jena-fuseki-5.0.0.tar.gz
tar xzf apache-jena-fuseki-5.0.0.tar.gz
cd apache-jena-fuseki-5.0.0

# Start server
./fuseki-server --mem /fairmodels

# Upload data
curl -X POST http://localhost:3030/fairmodels/data \
  -H "Content-Type: application/ld+json" \
  --data-binary @fairmodels.jsonld

# Query
curl http://localhost:3030/fairmodels/sparql \
  --data-urlencode 'query=SELECT * WHERE { ?s ?p ?o } LIMIT 10'
```

## 🔗 Federated Queries

Combine FAIRmodels data with other linked data sources:

```sparql
PREFIX schema: <https://schema.org/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>

SELECT ?model ?name ?disease ?diseaseLabel
WHERE {
  # Local FAIRmodels data
  ?model a schema:SoftwareApplication ;
         schema:name ?name ;
         schema:keywords ?disease .
  
  # Federated query to Wikidata
  SERVICE <https://query.wikidata.org/sparql> {
    ?diseaseEntity wdt:P31 wd:Q12136 ;
                   rdfs:label ?diseaseLabel .
    FILTER(CONTAINS(LCASE(?diseaseLabel), LCASE(?disease)))
    FILTER(LANG(?diseaseLabel) = "en")
  }
}
LIMIT 10
```

## 📚 Integration Examples

### Python

```python
import requests

# Fetch all models
response = requests.get(
    'https://v3.fairmodels.org',
    headers={'Accept': 'application/json-ld'}
)
models = response.json()

# Find oncology models
oncology_models = [
    m for m in models 
    if 'oncology' in m.get('keywords', [])
]

# Fetch specific model
model_id = 'e46b07fd-fbd5-4466-9e5b-79dfa36d347d'
model_details = requests.get(
    f'https://v3.fairmodels.org/instance/{model_id}',
    headers={'Accept': 'application/json-ld'}
).json()

print(f"Model: {model_details['name']}")
print(f"AUC: {model_details['performance']['auc']}")
```

### JavaScript

```javascript
// Fetch all models
const response = await fetch('https://v3.fairmodels.org', {
  headers: { 'Accept': 'application/json-ld' }
});
const models = await response.json();

// Filter by category
const clinicalModels = models.filter(m => 
  m.applicationCategory === 'Clinical Decision Support'
);

// Fetch specific model
const modelId = 'e46b07fd-fbd5-4466-9e5b-79dfa36d347d';
const modelResponse = await fetch(
  `https://v3.fairmodels.org/instance/${modelId}`,
  { headers: { 'Accept': 'application/json-ld' } }
);
const modelDetails = await modelResponse.json();

console.log(`Model: ${modelDetails.name}`);
console.log(`Performance: ${JSON.stringify(modelDetails.performance)}`);
```

### R

```r
library(httr)
library(jsonlite)

# Fetch all models
response <- GET(
  'https://v3.fairmodels.org',
  add_headers(Accept = 'application/json-ld')
)
models <- fromJSON(content(response, 'text'))

# Filter high-performance models
high_perf <- models[models$performance$auc > 0.85, ]

# Fetch specific model
model_id <- 'e46b07fd-fbd5-4466-9e5b-79dfa36d347d'
model_response <- GET(
  paste0('https://v3.fairmodels.org/instance/', model_id),
  add_headers(Accept = 'application/json-ld')
)
model_details <- fromJSON(content(model_response, 'text'))

print(paste("Model:", model_details$name))
print(paste("AUC:", model_details$performance$auc))
```

## 🔐 Authentication & Rate Limiting

### Current Policy

- **Public Access**: All metadata is publicly accessible
- **No API Key Required**: For read operations
- **Rate Limiting**: 100 requests per minute per IP

### Future Authentication

For write operations (submitting models):
- User registration required
- API token authentication
- OAuth2 support

## 📊 Search Statistics

Monitor search and usage statistics:

```bash
# Popular models
curl https://v3.fairmodels.org/stats/popular

# Recent searches
curl https://v3.fairmodels.org/stats/searches

# Usage metrics
curl https://v3.fairmodels.org/stats/usage
```

## 🛠️ Advanced Search Features

### Filtering

Add query parameters to filter results:

```bash
# By category
curl "https://v3.fairmodels.org?category=oncology"

# By minimum AUC
curl "https://v3.fairmodels.org?min_auc=0.80"

# By license
curl "https://v3.fairmodels.org?license=Apache-2.0"

# Combined filters
curl "https://v3.fairmodels.org?category=cardiology&min_auc=0.75&license=MIT"
```

### Pagination

For large result sets:

```bash
# Page 1 (default: 20 results)
curl "https://v3.fairmodels.org?page=1&per_page=20"

# Page 2
curl "https://v3.fairmodels.org?page=2&per_page=20"
```

### Sorting

```bash
# By performance (descending)
curl "https://v3.fairmodels.org?sort=performance&order=desc"

# By date (newest first)
curl "https://v3.fairmodels.org?sort=date&order=desc"

# By name (alphabetical)
curl "https://v3.fairmodels.org?sort=name&order=asc"
```

## 📖 Schema & Ontologies

FAIRmodels uses standard schemas and ontologies:

- **Schema.org**: Base vocabulary for software applications
- **SNOMED CT**: Clinical terminology
- **LOINC**: Laboratory and clinical observations
- **NCIT**: Cancer terminology
- **FHIR**: Healthcare data standards

This ensures compatibility with other healthcare and research systems.

## 🤝 Contributing Search Improvements

Help improve search capabilities:

- Suggest new filter criteria
- Report search issues
- Contribute to query examples
- Improve documentation

Contact us via [GitHub](https://github.com/MaastrichtU-BISS) or submit pull requests.

---

Ready to explore models? [Start searching →](https://v3.fairmodels.org)
