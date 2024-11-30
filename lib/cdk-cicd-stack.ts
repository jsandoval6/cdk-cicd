import * as cdk from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './PipelineStage';

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super( scope, id, props );
    
    const pipeline = new CodePipeline( this, 'Pipeline', {
      pipelineName: 'AwesomePipeline',
      synth: new ShellStep( 'Synth', {
        input: CodePipelineSource.gitHub( 'jsandoval6/cdk-cicd', 'cicd-practice' ),
        commands: [
          'npm ci',
          'npx cdk synth'
        ],
        primaryOutputDirectory: './cdk.out'
      })
    } )
    
    new cdk.CfnOutput( this, 'PipelineName', {
      value: 'AwesomePipeline'
    } )

    const testStage = pipeline.addStage( new PipelineStage( this, 'PipelineTestStage', {
      stageName: 'Test'
    } ) );

    testStage.addPre( new CodeBuildStep( 'unit-test', {
      commands: [
        'npm ci',
        'npm run test'
      ]
    }))
  }
}
