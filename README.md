# FAIRmodels

Welcome to the FAIRmodels website. This FAIRmodels platform has various components, which are explained below.

## FAIR Model metadata
AI/ML model descriptions can be found at [https://v3.fairmodels.org](https://v3.fairmodels.org). This description is based on Model Cards, and extended with several specific fields for search and application of AI models in practice. This repository is using a [CEDAR metadata template](https://cedar.metadatacenter.org/) to describe the metadata of the AI model. One of the items in this metadata is the acutal link to the AI model, which can be retrieved if the metadata author made the model available (with or without authentication/authorization possibilities).

This webpage can also be read by computer systems by requesting for the JSON-LD syntax (as the HTTP accept header). An example is shown below:
```
curl -H "accept: application/json-ld" https://v3.fairmodels.org
```

Based on the JSON list of received results, the key can be used to retrieve the metadata of a specific model:

```
curl -H "accept: application/json-ld" https://v3.fairmodels.org/instance/e46b07fd-fbd5-4466-9e5b-79dfa36d347d
```

## Making AI models interoperable
The actual AI/ML models are Docker images, which contain a standardized REST API to describe input and output of the AI model. This input/output is similar to the input/output defined in the FAIR model metadata. More details on developing the Docker image for a specific model can be found at [https://github.com/MaastrichtU-BISS/FAIRmodels-model-package](https://github.com/MaastrichtU-BISS/FAIRmodels-model-package). Afterwards, the docker image name can be incorporated into the FAIR model metadata.

## Evaluating AI models in your own environment
One of the aims of FAIRmodels is to standardize model execution in a local (hospital) environment. However, before using an AI model, organisations want to test whether the model gives equal performance on the local hospital population, in comparison to the training/validation dataset.
For this purpose, we developed the FAIVOR (**F**AIR **AI** Validati**o**n and **r**eporting) tool. This tool can be freely downloaded, and executed on a local dataset. For more information, please see [https://github.com/MaastrichtU-BISS/FAIVOR-Dashboard](https://github.com/MaastrichtU-BISS/FAIVOR-Dashboard).

## Searching FAIRmodels
The current webpage contains a rudimentary visualisation of the FAIR model metadata. To search the model metadata, the JSON-LD objects can be loaded into an RDF database system, and afterwards searched using (preferably) SPARQL. One database which can parse JSON-LD objects and make them available in a SPARQL endpoint is [GraphDB](https://www.ontotext.com/products/graphdb/).