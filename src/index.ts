import { Context, Probot } from 'probot';
import { features } from './features';

export = (app: Probot) => {
  app.on('issues.opened', async (context) => {
    const config = await getConfig(context);
    if (!config) return;
    const utils = features(context, config);
    await utils.replyIssue();
  });

  app.on('pull_request.opened', async (context) => {
    const config = await getConfig(context);
    if (!config) return;
    const utils = features(context, config);
    await utils.replyPr();
  });

  // get repo config for bot
  const getConfig = async (context: Context): Promise<Record<string, any> | null> => {
    return await context.config('workflows_app_config.yml');
  };

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
