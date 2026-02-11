# FAIR Model Metadata

The FAIRmodels platform uses comprehensive metadata to describe AI/ML models, making them findable, accessible, interoperable, and reusable. Our metadata system is based on Model Cards and extended with domain-specific fields.

## 🌐 Access the Repository

Browse all available AI/ML models at: **[https://v3.fairmodels.org](https://v3.fairmodels.org)**

The repository provides both human-friendly web interfaces and machine-readable formats for automated discovery and integration.

## 📊 Metadata Schema

Our metadata schema is built on [CEDAR metadata templates](https://cedar.metadatacenter.org/), providing a structured and validated approach to model description. Each model entry includes:

### Basic Information

- **Model Name**: Human-readable identifier
- **Model URI**: Unique persistent identifier for the model
- **Description**: Detailed explanation of the model's purpose and functionality
- **Version**: Model version information
- **Authors**: Model developers and contributors
- **Organization**: Affiliated institution or organization

### Technical Details

- **Model Type**: Classification, regression, segmentation, etc.
- **Algorithm**: Underlying machine learning algorithm or architecture
- **Input Parameters**: Required input features and their specifications
- **Output Format**: Prediction output structure and interpretation
- **Performance Metrics**: Accuracy, AUC, sensitivity, specificity, etc.

### Training Information

- **Training Dataset**: Description and characteristics of training data
- **Validation Dataset**: External validation information
- **Population Characteristics**: Demographics and clinical characteristics
- **Sample Size**: Number of samples used for training and validation
- **Feature Engineering**: Preprocessing and transformation details

### Deployment Information

- **Docker Image**: Link to containerized model
- **API Specification**: REST API endpoints and usage
- **License**: Model licensing information
- **Access Control**: Authentication and authorization requirements
- **Computational Requirements**: Hardware and software dependencies

### Healthcare-Specific Fields

For clinical AI models, we include additional metadata:

- **Clinical Domain**: Specialty area (oncology, cardiology, etc.)
- **Intended Use**: Clinical decision support, risk prediction, diagnosis, etc.
- **Regulatory Status**: FDA approval, CE marking, etc.
- **Clinical Validation**: External validation studies and results
- **Safety Considerations**: Known limitations and contraindications
- **Equity & Bias**: Fairness metrics and bias assessments

## 🔍 Machine-Readable Format

All metadata is available in JSON-LD format, enabling seamless integration with semantic web technologies and automated systems.

### Retrieve All Models

```bash
curl -H "accept: application/json-ld" https://v3.fairmodels.org
```

This returns a JSON-LD array containing all available models with their basic metadata.

### Retrieve Specific Model

Use the model's unique identifier to fetch complete metadata:

```bash
curl -H "accept: application/json-ld" https://v3.fairmodels.org/instance/e46b07fd-fbd5-4466-9e5b-79dfa36d347d
```

## 🎯 CEDAR Templates

We use CEDAR (Center for Expanded Data Annotation and Retrieval) templates to ensure consistent, validated metadata. CEDAR provides:

- **Controlled Vocabularies**: Standardized terms from ontologies (SNOMED, LOINC, etc.)
- **Value Constraints**: Validation rules for metadata fields
- **Semantic Annotations**: Links to ontology concepts
- **Template Versioning**: Track changes to metadata schema over time

### Creating Metadata

To add a new model to the repository:

1. Access the CEDAR Workbench
2. Fill out the FAIRmodels template
3. Validate your metadata
4. Submit to the repository
5. Receive a unique identifier

## 🏥 Healthcare Metadata Extensions

For clinical AI models, we extend the base schema with healthcare-specific elements:

### Clinical Performance

- **AUC-ROC**: Area under the receiver operating characteristic curve
- **Calibration**: Agreement between predicted and observed outcomes
- **Clinical Impact**: Effect on patient outcomes or clinical workflows
- **External Validation**: Performance in independent datasets

### Patient Population

- **Age Range**: Applicable patient age groups
- **Inclusion Criteria**: Patient selection criteria
- **Exclusion Criteria**: Contraindications
- **Disease Stage**: Applicable disease stages or severity
- **Comorbidities**: Relevant comorbid conditions

## 🔗 Linked Data & Interoperability

Our JSON-LD metadata enables rich interlinking with other data sources:

- **Publications**: Links to peer-reviewed publications
- **Datasets**: References to training/validation datasets
- **Clinical Trials**: Associated clinical trial registrations
- **Guidelines**: Relevant clinical practice guidelines
- **Standards**: Compliance with HL7 FHIR, DICOM, etc.

## 🚀 Best Practices

When creating model metadata:

1. **Be Comprehensive**: Include all relevant information
2. **Use Standards**: Leverage controlled vocabularies
3. **Be Transparent**: Clearly document limitations
4. **Enable Reproducibility**: Provide sufficient detail for replication
5. **Update Regularly**: Keep metadata current as models evolve
6. **Link Externally**: Reference publications and related resources

## 🔐 Access Control

Metadata is publicly accessible, but the actual models may have access restrictions:

- **Open**: Freely available
- **Registered**: Requires user registration
- **Licensed**: Requires specific license agreement
- **Private**: Access upon request

Each model's metadata clearly indicates its access level and requirements.

## 📚 Learn More

- [CEDAR Metadata Center](https://cedar.metadatacenter.org/)
- [Model Cards Documentation](https://modelcards.withgoogle.com/about)
- [JSON-LD Specification](https://json-ld.org/)
- [Schema.org SoftwareApplication](https://schema.org/SoftwareApplication)

---

Ready to explore model metadata? [Visit the repository →](https://v3.fairmodels.org)
