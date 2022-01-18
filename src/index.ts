import { Context, Probot } from 'probot';
import { features } from './features';
import type { ConfigInterface } from './config';

export = (app: Probot) => {
  app.on('issues.opened', async (context) => {
    const config = await getConfig(context);
    if (!config) return;
    const utils = features(context);
    const issueInfo = context.issue();
    const issueRawInfo = await context.octokit.issues.get(issueInfo);
    const { title } = issueRawInfo.data;
    const issueTypeReg = /^\w+/gim;
    const componentReg = /\(\w+\)/gim;
    const issueType = title.match(issueTypeReg);
    const component = title.match(componentReg);

    if (component && component.length > 0) {
      const componentName = component[0].replace('(', '').replace(')', '');
      await utils.assignee([config.components[componentName]])
    }

    if (issueType && issueType.length > 0) {
      await utils.labels(issueType);
    }

  });

  // get repo config for bot
  const getConfig = async (context: Context): Promise<ConfigInterface | null> => {
    return await context.config('workflows_app_config.yml');
  };

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
