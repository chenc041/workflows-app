import { Context, Probot } from 'probot';

const defaultConfig = {
  issueOpenedReply: 'Thanks for opening this issue!',
  prOpenedReply: 'Thanks for submit this pr!',
}

export = (app: Probot) => {
  app.on('issues.opened', async (context) => {
    const config = await getConfig(context);
    const issueComment = context.issue({
      body: config.issueOpenedReply,
    });
    await context.octokit.issues.createComment(issueComment);
  });

  app.on('pull_request.opened', async (context) => {
    const config = await getConfig(context);
    const prComment = context.issue({
      body: config.prOpenedReply,
    });
    await context.octokit.issues.createComment(prComment);
    app.log.info('pull_request.opened', prComment, context);
  });

  // get repo config for bot
  const getConfig = async (context: Context): Promise<Record<string, any>> => {
    return await context.config('bot_config.yml') ?? defaultConfig;
  };

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
