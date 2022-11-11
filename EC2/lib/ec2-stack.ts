import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as iam from "@aws-cdk/aws-iam";
// import * as keypair from "cdk-ec2-key-pair";

export class Ec2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // Look up the default VPC
    const vpc = ec2.Vpc.fromLookup(this, "VPC", {
      isDefault: true
    });

    // Create a key pair to be used with this EC2 Instance
    // const key = new keypair.KeyPair(this, "KeyPair", {
    //  name: "cdk-keypair",
    //  description: "Key Pair created with CDK Deployment",
    //});
    //key.grantReadOnPublicKey;  

    //Use an existent key pair in AWS
    const key = {
      keyPairName: `${process.env.KEY_PAIR_NAME}`,
    }

    // Create a security group for the EC2 instance
    const securityGroup = new ec2.SecurityGroup(this, "SecurityGroup", {
     vpc,
     description: "Allow SSH (TCP port 22) and HTTP (TCP port 8081) in",
     allowAllOutbound: true,
    });

    // Allow SSH access on port tcp/22
    securityGroup.addIngressRule(
     ec2.Peer.anyIpv4(),
     ec2.Port.tcp(22),
     "Allow SSH Access"
    );

    // Allow HTTP access on port tcp/8081
    securityGroup.addIngressRule(
     ec2.Peer.anyIpv4(),
     ec2.Port.tcp(8081),
     "Allow HTTP Access"
    );

    // Import a security group for the EC2 instance by securityGroupId
    // const securityGroup = ec2.SecurityGroup.fromSecurityGroupId(this, 'SecurityGroupImport', `${process.env.SECURITY_GROUP_ID}`, {
    //  allowAllOutbound: true,
    // });

    // Create IAM role to allow access to other AWS services
    // const role = new iam.Role(this, "ec2Role", {
    //  assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
    //});

    // IAM policy attachment to allow access to 
    //role.addManagedPolicy(
    //  iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMManagedInstanceCore")
    //);

    // Import an IAM role to allow access to other AWS services
    const role = iam.Role.fromRoleArn(this, 'Role', `${process.env.ROLE_ARN}`, {
      mutable: false,
    });

    // Look up the AMI Id for the Amazon Linux 2 Image with CPU Type X86_64
    const ami = new ec2.AmazonLinuxImage({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      cpuType: ec2.AmazonLinuxCpuType.X86_64,
    });

    // Commands to run after instance creation
    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      'yum update -y', 
      'yum install docker -y', 
      'yum install git -y', 
      'service docker start',
      'git clone https://github.com/MariaCamilaCubides/AYGO-Taller3.git',
      'cd /AYGO-Taller3/App',
      'docker build -t ui .',
      'docker run -d -p 8081:80 ui');
    [0,1,2].forEach((item) => {
      // Create the EC2 instance using the Security Group, AMI, and KeyPair defined.
      new ec2.Instance(this, `EC2Instance${item}`, {
        vpc,
        instanceType: ec2.InstanceType.of(
          ec2.InstanceClass.T2,
          ec2.InstanceSize.MICRO
        ),
        machineImage: ami,
        securityGroup: securityGroup,
        keyName: key.keyPairName,
        role: role,
        userData,
      });
    })
  }
}
