import { Context, Probot } from 'probot';

export = (app: Probot) => {
  app.on('issues.opened', async (context) => {
    const issueComment = context.issue({
      body: 'Thanks for opening this issue!',
    });

    const config = await getConfig(context);

    console.log(config, 'config');

    app.log.info('issue opened', issueComment);
    await context.octokit.issues.createComment(issueComment);
  });

  app.on('pull_request.opened', async (context) => {
    app.log.info('context', context);

    const prMetadata = context.pullRequest();
    const prComment = context.issue({
      body: `Thanks for Pr  num ${prMetadata.pull_number}`,
    });
    await context.octokit.issues.createComment(prComment);
    app.log.info('pull_request.opened', prComment, context);
  });

  // get repo config for bot
  const getConfig = async (context: Context): Promise<Record<string, any> | null> => {
    return await context.config('config.yml');
  };

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
