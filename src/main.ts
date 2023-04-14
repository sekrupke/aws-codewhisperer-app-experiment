import {App, RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {LambdaIntegration, RestApi} from "aws-cdk-lib/aws-apigateway";
import {Table} from "aws-cdk-lib/aws-dynamodb";
import {Code, Function, Runtime} from "aws-cdk-lib/aws-lambda";

/**
 * WARNING: Errors in this code are intended as they may show actual capabilities of AWS CodeWhisperer.
 */

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const customerS3Bucket = new Table(this, 'CustomerS3Bucket', {
      tableName: 'CustomerS3Bucket',
    });

    const customerTable = new Table(this, 'CustomerTable', {
      tableName: 'CustomerTable',
      partitionKey: {
        name: 'customerId',
        type: Table.AttributeType.STRING
      },
      billingMode: Table.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const customerRestApi = new RestApi(this, 'CustomerRestApi', {
      restApiName: 'Customer Service',
      description: 'This service serves customers',
      deployOptions: {
        stageName: 'dev',
      },
    });

    // CDK Nodejs Lambda function
    const importCustomerFunction =  new Function(this, 'ImportCustomerFunction', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('src'),
      handler: 'importCustomer.handler',
      environment: {
        TABLE_NAME: 'Customer'
      }
    });

    customerS3Bucket.grantReadData(importCustomerFunction);
    customerTable.grantReadWriteData(importCustomerFunction);

  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'aws-codewhisperer-app-experiment-dev', { env: devEnv });
// new MyStack(app, 'aws-codewhisperer-app-experiment-prod', { env: prodEnv });

app.synth();