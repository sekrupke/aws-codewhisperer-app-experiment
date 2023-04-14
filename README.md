# aws-codewhisperer-app-experiment
This is a basic serverless application that was developed as an experiment for using AWS CodeWhisperer for programming.

# Experiment Overview
![Experiment Overview](overview.png)

# CDK Setup of the App with projen
Setup of the Serverless CDK App with projen.

### What AWS CodeWhisperer did?
* Could not support in this case

### What did we do?
* ```npx projen new awscdk-app-ts```

### Problems
* None

# Creation of the Serverless CDK Stack
Programming of the Serverless Stack with AWS CDK.

### What AWS CodeWhisperer did?
* Gave line-based hints for AWS CDK components and their configuration
* Provided good hints for names, e.g. "customerTable"
* Gave hints that show contextual knowledge without typing, e.g.:
  * ```customerTable.grantReadWriteData(importCustomerFunction);```

### What did we do?
* Orchestrating of components
* Fix errors that may result from imports/ other CDK versions

### Problems
* Some hints were pointless or doesn't match
* Only one-liner suggestions, not whole AWS CDK components
* Errors (maybe methods from old CDK versions were suggested)