#!/bin/sh
set -e

ECR_REPO=$1

$(aws ecr get-login --region us-east-1)
docker build -t dnd-buddy .
docker tag dnd-buddy:latest $ECR_REPO
docker push $ECR_REPO