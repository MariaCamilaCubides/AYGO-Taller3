#!/usr/bin/env node
import 'source-map-support/register';
import * as dotenv from 'dotenv'
import * as cdk from '@aws-cdk/core';
import { Ec2Stack } from '../lib/ec2-stack';

dotenv.config();

const app = new cdk.App();
new Ec2Stack(app, 'Ec2Stack', {
  env: { account: process.env.AWS_ACCOUNT, region: process.env.AWS_REGION },
});