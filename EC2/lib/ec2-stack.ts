import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2"; // Allows working with EC2 and VPC resources
import * as iam from "@aws-cdk/aws-iam"; // Allows working with IAM resources
// import * as keypair from "cdk-ec2-key-pair"; // Helper to create EC2 SSH keypairs
import {readFileSync} from 'fs';

export class Ec2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
          
    // Look up the default VPC
    const vpc = ec2.Vpc.fromLookup(this, "VPC", {
      isDefault: true
    });

    // Create a key pair to be used with this EC2 Instance
    /* const key = new keypair.KeyPair(this, "KeyPair", {
      name: "cdk-keypair",
      description: "Key Pair created with CDK Deployment",
    });
    key.grantReadOnPublicKey;  */

    // Security group for the EC2 instance
    const securityGroup = new ec2.SecurityGroup(this, "SecurityGroup", {
      vpc,
      description: "Allow SSH (TCP port 22) and HTTP (TCP port 80) in",
      allowAllOutbound: true,
    });

    // Allow SSH access on port tcp/22
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      "Allow SSH Access"
    );

    // Allow HTTP access on port tcp/80
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(8081),
      "Allow HTTP Access"
    );

    // IAM role to allow access to other AWS services
    const role = iam.Role.fromRoleArn(this, 'Role', 'arn:aws:iam::219054532075:role/LabRole', {
      mutable: false,
    });

    // Look up the AMI Id for the Amazon Linux 2 Image with CPU Type X86_64
    const ami = new ec2.AmazonLinuxImage({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      cpuType: ec2.AmazonLinuxCpuType.X86_64,
    });

    const userDataScript = readFileSync('./lib/user-data.sh', 'utf8');
    // Create the EC2 instance using the Security Group, AMI, and KeyPair defined.
    const ec2Instance0 = new ec2.Instance(this, "Instance0", {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ami,
      securityGroup: securityGroup,
      keyName: 'mccmkeys',
      role: role,
    });
    ec2Instance0.addUserData(userDataScript);
    /* const ec2Instance1 = new ec2.Instance(this, "Instance1", {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ami,
      securityGroup: securityGroup,
      keyName: 'mccmkeys',
      role: role,
    });
    ec2Instance1.addUserData(userDataScript);
    const ec2Instance2 = new ec2.Instance(this, "Instance2", {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ami,
      securityGroup: securityGroup,
      keyName: 'mccmkeys',
      role: role,
    });
    ec2Instance2.addUserData(userDataScript); */
  }
}
