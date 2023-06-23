#!/usr/bin/env node

/*
 * Copyright 2023 Amazon.com, Inc. or its affiliates.
 */

import "source-map-support/register";

import { App } from "aws-cdk-lib";

import targetAccount from "../lib/accounts/target_account.json";
import { MRDataplaneStack } from "../lib/osml-stacks/model_runner/dataplane";

// set up the default CDK app
const app = new App();

// deploy model runner's data plane resources
new MRDataplaneStack(app, `${targetAccount.name}-Dataplane`, {
  env: {
    account: targetAccount.id,
    region: targetAccount.region
  },
  account: targetAccount
});

// build the cdk app deployment
app.synth();
