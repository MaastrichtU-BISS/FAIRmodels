# FAIVOR: FAIR AI Validation and Reporting

FAIVOR (**F**AIR **AI** Validati**o**n and **R**eporting) is a comprehensive tool for validating AI models in your local environment before deployment. It enables organizations to test whether models perform adequately on their specific patient populations.

## 🎯 Why Model Validation?

Before deploying an AI model in a clinical or production environment, organizations need to:

- **Verify Performance**: Ensure the model performs well on local data
- **Assess Generalizability**: Check if training results translate to the local population
- **Identify Bias**: Detect potential performance disparities across subgroups
- **Build Trust**: Generate evidence for clinical and regulatory acceptance
- **Document Results**: Create reports for stakeholders

FAIVOR addresses all these needs with an integrated validation platform.

## 🌐 GitHub Repository

**[MaastrichtU-BISS/FAIVOR-Dashboard](https://github.com/MaastrichtU-BISS/FAIVOR-Dashboard)**

The repository includes:
- Web-based dashboard for validation workflows
- Backend ML validator service
- Database for storing validation results
- Complete Docker Compose setup
- Comprehensive documentation

## ✨ Key Features

### 🔍 Model Import & Discovery

- Import models by URL from FAIRmodels repository
- Search for models by title, description, or metadata
- Browse model details and specifications
- View training and validation performance

### 📊 Validation Workflow

1. **Select Model**: Choose from imported models or add new ones
2. **Upload Data**: Provide your local validation dataset
3. **Configure Validation**: Set validation parameters and metrics
4. **Run Validation**: Execute validation on your data
5. **Review Results**: Analyze performance metrics and visualizations
6. **Generate Report**: Create comprehensive validation reports

### 📈 Comprehensive Metrics

FAIVOR calculates multiple performance metrics:

- **Classification**: Accuracy, Precision, Recall, F1-Score, AUC-ROC, AUC-PR
- **Calibration**: Calibration plots, Brier score, Expected Calibration Error
- **Clinical Impact**: Decision curve analysis, net benefit
- **Fairness**: Performance stratified by subgroups
- **Reliability**: Confidence intervals, bootstrap validation

### 📋 Reporting

- Detailed validation reports
- Performance visualizations
- Comparison with published performance
- Export to PDF or HTML
- Share with stakeholders

### 🔐 Privacy & Security

- Local data processing (data never leaves your environment)
- User authentication and authorization
- Secure data storage
- Audit logging
- GDPR/HIPAA compliant workflows

## 🚀 Getting Started

### Development Setup (Quick Start)

Clone and start the development environment:

```bash
git clone https://github.com/MaastrichtU-BISS/FAIVOR-Dashboard.git
cd FAIVOR-Dashboard
docker compose up
```

Visit [http://localhost:5173](http://localhost:5173)

This setup includes:
- Hot module replacement for code changes
- Automatic database migrations
- Pre-built backend ML validator
- No local installation required

### Production Deployment

For production use, create a `.env` configuration file:

```bash
cat > .env << 'EOF'
# Database Configuration
DB_USER=postgres
DB_PASSWORD=your-secure-password
DB_NAME=faivor
DB_PORT=5432

# Authentication
AUTH_SECRET=generate-with-openssl-rand-base64-32
AUTH_URL=https://your-domain.com

# Backend Services
PUBLIC_VALIDATOR_URL=http://faivor-backend:8000
PUBLIC_ORGANIZATION_NAME=Your Organization
EOF
```

Start the production stack:

```bash
docker compose -f docker-compose.prod.yml up
```

Visit [http://localhost:3000](http://localhost:3000)

### Backend Development (Optional)

To develop both frontend and backend with hot reload:

```bash
# Clone backend repository
git clone https://github.com/MaastrichtU-BISS/FAIVOR-ML-Validator.git

# Start with backend development profile
docker compose --profile backend-dev up --scale faivor-backend=0
```

## 🏗️ Architecture

FAIVOR consists of three main components:

### Frontend Dashboard (SvelteKit)
- User interface for validation workflows
- Model search and management
- Results visualization
- Report generation

### ML Validator Backend (Python/FastAPI)
- Model execution engine
- Metrics calculation
- Data preprocessing
- Validation algorithms

### PostgreSQL Database
- Model metadata storage
- Validation results
- User management
- Audit logs

### Architecture Diagram

View the complete [technical architecture](https://github.com/MaastrichtU-BISS/FAIVOR-Dashboard/blob/main/docs/techstack.excalidraw.png) and [database schema](https://github.com/MaastrichtU-BISS/FAIVOR-Dashboard/blob/main/docs/db-schema.drawio.png) in the repository.

## 🔧 Configuration

### Required Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `postgres` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | Database username | `faivor` |
| `DB_PASSWORD` | Database password | *required* |
| `DB_NAME` | Database name | `faivor` |
| `AUTH_SECRET` | Token signing secret | *required* |
| `AUTH_URL` | Auth base URL | *required* |

### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PUBLIC_VALIDATOR_URL` | ML Validator endpoint | `http://localhost:8000` |
| `PUBLIC_DASHBOARD_ORIGIN` | CORS origins | same-origin |
| `PUBLIC_ORGANIZATION_NAME` | Organization name | `FAIVOR` |

### Generating Secrets

Generate a secure `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

## 🌐 Reverse Proxy Setup

When deploying behind Nginx, Traefik, or Caddy:

### Nginx Configuration

```nginx
location / {
    proxy_pass http://dashboard:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
}
```

### Important Headers

Ensure your proxy forwards:
- `X-Forwarded-For`
- `X-Forwarded-Proto`
- `X-Forwarded-Host`
- `Origin`

### CORS Configuration

Set `PUBLIC_DASHBOARD_ORIGIN` for allowed origins:

```bash
PUBLIC_DASHBOARD_ORIGIN=https://your-domain.com,https://www.your-domain.com
```

## 🔄 CI/CD & Docker Images

FAIVOR uses automated builds via GitHub Actions:

### Dashboard Images

- **Workflow**: `.github/workflows/dashboard-docker-build.yml`
- **Trigger**: Push to any branch
- **Registry**: `ghcr.io/maastrichtu-biss/faivor-dashboard:{branch}`
- **Latest**: `ghcr.io/maastrichtu-biss/faivor-dashboard:main`

### ML Validator Images

- **Workflow**: Backend repository workflow
- **Trigger**: Push/PR to main
- **Registry**: `ghcr.io/maastrichtu-biss/faivor-ml-validator:latest`

Production deployments automatically pull the latest images from GitHub Container Registry.

## 📝 Using FAIVOR

### 1. Import a Model

From the dashboard:
1. Click "Import Model"
2. Enter the FAIRmodels URL or search by metadata
3. Review model details
4. Confirm import

### 2. Prepare Your Data

FAIVOR accepts data in multiple formats:
- CSV files
- JSON arrays
- FHIR resources
- HL7 messages

Your data should include:
- Input features required by the model
- Outcome/label (for validation)
- Optional: Stratification variables (age, gender, etc.)

### 3. Run Validation

1. Select imported model
2. Upload validation dataset
3. Configure:
   - Outcome variable
   - Positive class definition
   - Metrics to calculate
   - Subgroup analysis
4. Start validation
5. Monitor progress

### 4. Review Results

The dashboard displays:
- Overall performance metrics
- ROC and PR curves
- Calibration plots
- Confusion matrix
- Subgroup performance
- Comparison with published results

### 5. Generate Report

Export comprehensive validation reports including:
- Executive summary
- Detailed metrics
- Visualizations
- Methodology description
- Recommendations

## 🧪 Example Validation

### Sample CSV Data

```csv
patient_id,age,gender,feature1,feature2,outcome
1,65,M,120,80,1
2,45,F,110,75,0
3,70,M,135,90,1
```

### API Request

```bash
curl -X POST http://localhost:8000/validate \
  -H "Content-Type: application/json" \
  -d '{
    "model_id": "model-uuid",
    "data": [...],
    "outcome_column": "outcome",
    "metrics": ["auc", "accuracy", "calibration"]
  }'
```

## 📊 Validation Metrics

### Performance Metrics

- **AUC-ROC**: Discrimination ability
- **AUC-PR**: Precision-recall trade-off
- **Accuracy**: Overall correctness
- **Sensitivity**: True positive rate
- **Specificity**: True negative rate
- **PPV/NPV**: Predictive values

### Calibration Metrics

- **Calibration plots**: Agreement between predicted and observed
- **Brier score**: Overall calibration measure
- **Expected Calibration Error**: Calibration error across bins
- **Hosmer-Lemeshow test**: Statistical calibration test

### Clinical Utility

- **Decision curve analysis**: Net benefit across thresholds
- **Clinical impact**: Effect on decisions and outcomes
- **Cost-effectiveness**: If cost data available

## 🔬 Advanced Features

### Subgroup Analysis

Validate performance across patient subgroups:
- Age groups
- Gender
- Race/ethnicity
- Disease severity
- Geographic location

Identify potential bias and performance disparities.

### Temporal Validation

Test model performance over time:
- Prospective validation
- Temporal trends
- Model drift detection

### External Validation

Compare against external datasets:
- Multi-site validation
- Population transfer
- Geographic generalization

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
```bash
# Rebuild without cache
docker compose down
docker compose build --no-cache
docker compose up
```

**Migration Errors**
```bash
# Reset database
docker compose down -v
docker compose up
```

**Authentication Issues**
```bash
# Regenerate AUTH_SECRET
openssl rand -base64 32
# Update .env file
# Restart containers
```

## 📚 Additional Resources

- [FAIVOR Paper](https://research-software-directory.org/projects/faivor) - Research Software Directory
- [JOSS Publication](https://github.com/MaastrichtU-BISS/FAIVOR-Dashboard/tree/main/JOSS%20paper) - Journal article
- [Technical Documentation](https://github.com/MaastrichtU-BISS/FAIVOR-Dashboard/tree/main/docs)
- [API Documentation](https://github.com/MaastrichtU-BISS/FAIVOR-ML-Validator)

## 🤝 Contributing

We welcome contributions! Areas for contribution:

- New validation metrics
- Additional data format support
- Enhanced visualizations
- Performance optimizations
- Documentation improvements

See the [GitHub repository](https://github.com/MaastrichtU-BISS/FAIVOR-Dashboard) for contribution guidelines.

## 📄 License

FAIVOR is licensed under Apache-2.0. See [LICENSE](https://github.com/MaastrichtU-BISS/FAIVOR-Dashboard/blob/main/LICENSE) for details.

---

Ready to validate your models? [Get started with FAIVOR →](https://github.com/MaastrichtU-BISS/FAIVOR-Dashboard)
