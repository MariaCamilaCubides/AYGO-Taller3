#!/bin/bash
sudo su
yum update -y
yum install -y docker
yum install -y git
service docker start
git clone https://github.com/MariaCamilaCubides/AYGO-Taller3.git
cd /AYGO-Taller3
docker build -t ui .
docker run -d -p 8081:80 ui