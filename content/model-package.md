# FAIRmodels Model Package

The FAIRmodels Model Package system enables you to containerize your AI/ML models with a standardized REST API, making them interoperable and deployable across different platforms.

## 🎯 Overview

The model package system provides:

- **Python Package**: Convenience tools for building model containers
- **Standardized API**: REST API specification for all models
- **Docker Containers**: Portable, reproducible model execution
- **Easy Integration**: Simple workflow from model to deployment

## 📦 GitHub Repository

**[MaastrichtU-BISS/FAIRmodels-model-package](https://github.com/MaastrichtU-BISS/FAIRmodels-model-package)**

The repository contains:
- Python package for model packaging
- Docker base images
- API specifications
- Example models
- Documentation

## 🚀 Quick Start

### 1. Install the Package

Install the FAIRmodels package from GitHub:

```bash
pip install git+https://github.com/MaastrichtU-BISS/FAIRmodels-model-package.git#subdirectory=package
```

This package provides command-line tools (`fm-build`) and Python classes for creating standardized model containers.

### 2. Choose Your Approach

You can package your model using one of two methods:

**Option A: JSON Specification** (for simple models)
- Best for logistic regression without transformations
- No coding required
- Quick and straightforward

**Option B: Python Script** (for complex models)
- Full flexibility
- Custom preprocessing and predictions
- Support for any model type

## 📝 Method 1: JSON Specification

### Example: Logistic Regression Model

Create a JSON file describing your model:

```json
{
    "model_type": "logistic_regression",
    "model_uri": "https://v3.fairmodels.org/instance/3f400afb-df5e-4798-ad50-0687dd439d9b",
    "model_name": "pCR Prediction - Clinical Parameters",
    "intercept": -0.6,
    "covariate_weights": {
        "cT": -0.074,
        "cN": -0.060,
        "tLength": -0.085
    }
}
```

### JSON Fields

- **model_type**: Type of model (`logistic_regression`)
- **model_uri**: Unique identifier from FAIRmodels repository
- **model_name**: Human-readable model name
- **intercept**: Intercept value for the regression
- **covariate_weights**: Dictionary of feature names and their coefficients

### Build Container from JSON

```bash
fm-build model_spec.json your-dockerhub/model-name
```

This creates a Docker image with your model ready to deploy.

## 🐍 Method 2: Python Script

For more complex models, create a Python class that inherits from the base model class.

### Example: Logistic Regression with Preprocessing

```python
from math import log, exp
from model_execution import logistic_regression

class MyPredictionModel(logistic_regression):
    def __init__(self):
        self._model_parameters = {
            "model_uri": "https://v3.fairmodels.org/instance/3f400afb-df5e-4798-ad50-0687dd439d9b",
            "model_name": "pCR Prediction - Clinical Parameters",
            "intercept": -0.6,
            "covariate_weights": {
                "cT": -0.074,
                "cN": -0.060,
                "tLength": -0.085
            }
        }
    
    def _preprocess(self, data):
        """
        Transform input data before prediction.
        
        Parameters:
        - data: dictionary or list of dictionaries with input data
        
        Returns:
        - preprocessed_data: transformed data
        """
        if isinstance(data, list):
            for i in range(len(data)):
                data[i]['tLength'] = log(data[i]['tLength'])
        else:
            data['tLength'] = log(data['tLength'])
        
        return data
```

### Example: Custom Prediction Function

For models that don't fit standard patterns:

```python
from model_execution import model_execution

class CustomModel(model_execution):
    def __init__(self):
        self._model_parameters = {
            "model_uri": "https://example.org/my-model",
            "model_name": "My Custom Prediction Model"
        }
    
    def predict(self, data):
        """
        Calculate predictions using custom logic.
        
        Parameters:
        - data: dictionary or list of dictionaries with input data
        
        Returns:
        - predictions: model output
        """
        # Your custom prediction logic here
        return predictions
    
    def get_input_parameters(self):
        """
        Define required input parameters.
        
        Returns:
        - list of parameter names
        """
        return ["feature1", "feature2", "feature3"]
```

### Build Container from Python

```bash
fm-build my_model.py --class_name MyPredictionModel your-dockerhub/model-name
```

The `--class_name` argument specifies which class in your Python file to use.

## 🐳 Running Your Model Container

### Start the Container

```bash
docker run --rm -p 8000:8000 your-dockerhub/model-name
```

This starts the model server on port 8000.

### View Model Metadata

Open your browser to [http://localhost:8000](http://localhost:8000) or use curl:

```bash
curl http://localhost:8000
```

Returns the model's metadata in JSON format.

### Make Predictions

#### Send Prediction Request

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"cT": 3, "cN": 1, "tLength": 7}'
```

This submits data for prediction and returns a job ID.

#### Check Prediction Status

```bash
curl http://localhost:8000/status
```

Returns the status of your prediction job:
- `1`: Queued
- `2`: Processing
- `3`: Complete
- `4`: Error

#### Retrieve Results

Once status is `3` (complete):

```bash
curl http://localhost:8000/result
```

Returns the prediction results.

## 📋 REST API Specification

All FAIRmodels containers implement a standardized REST API:

### Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Model metadata |
| `/predict` | POST | Submit prediction request |
| `/status` | GET | Check prediction status |
| `/result` | GET | Retrieve prediction result |
| `/health` | GET | Health check |

### API Specification File

The complete OpenAPI specification is available in the repository:
[`docker_image/api-specification.yaml`](https://github.com/MaastrichtU-BISS/FAIRmodels-model-package/blob/main/docker_image/api-specification.yaml)

## 🔧 Advanced Features

### Batch Predictions

Submit multiple data points in a single request:

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '[
    {"cT": 3, "cN": 1, "tLength": 7},
    {"cT": 2, "cN": 0, "tLength": 5},
    {"cT": 4, "cN": 2, "tLength": 9}
  ]'
```

### Environment Variables

Configure your container with environment variables:

```bash
docker run -e MODEL_TIMEOUT=300 \
           -e MAX_BATCH_SIZE=100 \
           -p 8000:8000 \
           your-dockerhub/model-name
```

### Volume Mounting

For models that require additional files:

```bash
docker run -v /path/to/weights:/app/weights \
           -p 8000:8000 \
           your-dockerhub/model-name
```

## 🎓 Supported Model Types

The package currently supports:

- **Logistic Regression**: With or without transformations
- **Linear Regression**: Continuous predictions
- **Deep Learning**: PyTorch, TensorFlow, Keras models
- **Tree-Based**: Random Forest, XGBoost, LightGBM
- **Custom Models**: Any Python-based model with custom predict function

## 📦 Base Images

Pre-built base images are available:

```bash
ghcr.io/maastrichtu-biss/fairmodels-model-package/base-image:latest
```

These images include:
- Python runtime
- FastAPI server
- Common ML libraries
- REST API implementation

## 🔐 Security Considerations

When deploying models:

1. **Access Control**: Implement authentication if needed
2. **Input Validation**: Validate all input data
3. **Rate Limiting**: Prevent abuse
4. **Logging**: Monitor usage and errors
5. **Updates**: Keep base images updated

## 🧪 Testing Your Package

### Local Testing

Test your model locally before building:

```python
from your_model import MyPredictionModel

model = MyPredictionModel()
result = model.predict({"cT": 3, "cN": 1, "tLength": 7})
print(result)
```

### Container Testing

After building, test the container:

```bash
# Start container
docker run -d -p 8000:8000 --name test-model your-dockerhub/model-name

# Test metadata endpoint
curl http://localhost:8000

# Test prediction
curl -X POST http://localhost:8000/predict -d '{"cT": 3, "cN": 1, "tLength": 7}'

# Cleanup
docker stop test-model
docker rm test-model
```

## 📚 Examples & Templates

Check the repository for example models:

- Simple logistic regression
- Logistic regression with preprocessing
- Deep learning model (TensorFlow)
- Ensemble model
- Custom prediction logic

## 🤝 Contributing

We welcome contributions! If you have:

- New model types to support
- Improvements to the API
- Bug fixes
- Documentation enhancements

Please submit a pull request to the [GitHub repository](https://github.com/MaastrichtU-BISS/FAIRmodels-model-package).

## 📖 Further Reading

- [Docker Documentation](https://docs.docker.com/)
- [FastAPI Framework](https://fastapi.tiangolo.com/)
- [Model Cards](https://modelcards.withgoogle.com/)
- [OpenAPI Specification](https://swagger.io/specification/)

---

Ready to package your model? [Get started with the repository →](https://github.com/MaastrichtU-BISS/FAIRmodels-model-package)
