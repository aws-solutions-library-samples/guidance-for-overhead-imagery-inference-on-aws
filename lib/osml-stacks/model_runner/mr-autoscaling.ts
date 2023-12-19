/*
 * Copyright 2023 Amazon.com, Inc. or its affiliates.
 */

import { App, Environment, Stack, StackProps } from "aws-cdk-lib";
import { MRAutoScaling, MRDataplane, OSMLAccount } from "osml-cdk-constructs";

export interface MRAutoScalingStackProps extends StackProps {
  readonly env: Environment;
  readonly account: OSMLAccount;
  readonly mrDataplane: MRDataplane;
}

export class MRAutoScalingStack extends Stack {
  public resources: MRAutoScaling;

  /**
   * Constructor for the model runner autoscaling cdk stack
   * @param parent the parent cdk app object
   * @param name the name of the stack to be created in the parent app object.
   * @param props the properties required to create the stack.
   * @returns the created MRAutoScalingStack object
   */
  constructor(parent: App, name: string, props: MRAutoScalingStackProps) {
    super(parent, name, {
      terminationProtection: props.account.prodLike,
      ...props
    });

    // Create required model runner testing resources
    this.resources = new MRAutoScaling(this, "MRAutoscaling", {
      account: props.account,
      mrDataplane: props.mrDataplane
    });
  }
}
