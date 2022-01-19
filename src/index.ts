import { Context, Probot } from 'probot';
import { features } from './features';
import type { ConfigInterface } from './config';

export = (app: Probot) => {
  app.on('issues.opened', async (context) => {
    const config = await getConfig(context);
    if (!config || !config.components) return;
    const utils = features(context);
    const issueInfo = context.issue();
    const issueRawInfo = await context.octokit.issues.get(issueInfo);
    const { title } = issueRawInfo.data;
    const { labels, contributor } = await utils.parseIssueTitle(title);

    if (contributor) {
      await utils.assignee([config.components[contributor]]);
    }

    if (labels && labels.length > 0) {
      await utils.labels(labels);
    }
  });

  app.on('pull_request.closed', async (context) => {
    const config = await getConfig(context);
    if (!config || !config.prClosedReply) return;
    const utils = features(context);
    await utils.reply(config.prClosedReply);
  });

  // get repo config for bot
  const getConfig = async (context: Context): Promise<Partial<ConfigInterface> | null> => {
    return await context.config('workflows_app_config.yml');
  };

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
