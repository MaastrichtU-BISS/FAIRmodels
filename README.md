# FAIRmodels

Welcome to the FAIRmodels website. This FAIRmodels platform has various components, which are explained below.

## FAIR Model metadata
AI/ML model descriptions can be found at [https://v2.fairmodels.org](https://v2.fairmodels.org). This description is based on Model Cards, and extended with several specific fields for search and application of AI models in practice. This repository is using a CEDAR metadata template to describe the metadata.

This webpage can also be read by computer systems by requesting for the JSON-LD syntax (as the HTTP accept header). An example is shown below:
```
curl -H "accept: application/json-ld" https://v2.fairmodels.org
```

Based on the JSON list of received results, the key can be used to retrieve the metadata of a specific model:

```
curl -H "accept: application/json-ld" https://v2.fairmodels.org/instance/3f400afb-df5e-4798-ad50-0687dd439d9b
```

## Actual models and interoperability
The actual AI/ML models are Docker images, which contain a standardized REST API to describe input and output of the AI model. This input/output is similar to the input/output defined in the FAIR mdoel metadata. More details on developing the Docker image for a specific model can be found at [https://github.com/MaastrichtU-BISS/FAIRmodels-model-package](https://github.com/MaastrichtU-BISS/FAIRmodels-model-package). Afterwards, the docker image name can be incorporated into the FAIR model metadata.

## Executing models
To execute models, we have developed a Jupyter notebook to perform an example model validation. This Jupyter Notebook only requires:

- the URI of the metadata
- a dataset to perform the validation

This example notebook can be found at [https://github.com/MaastrichtU-CDS/FAIVOR_models/blob/main/validation/validation.ipynb](https://github.com/MaastrichtU-CDS/FAIVOR_models/blob/main/validation/validation.ipynb)

## Searching FAIRmodels
The current webpage contains a rudimentary visualisation of the FAIR model metadata. To search the model metadata, the JSON-LD objects can be loaded into an RDF database system, and afterwards searched using (preferably) SPARQL. One database which can parse JSON-LD objects and make them available in a SPARQL endpoint is [GraphDB](https://www.ontotext.com/products/graphdb/).