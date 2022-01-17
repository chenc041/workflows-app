import { Context } from 'probot';
class Features {
  context!: Context;
  config!: Record<string, any>;
  constructor(context: Context, config: Record<string, any>) {
    this.config = config;
    this.context = context;
  }
  async replyIssue() {}

  async replyPr() {}
}

export const features = (context: Context, config: Record<string, any>) =>
  new Features(context, config);
