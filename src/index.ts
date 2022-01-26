import { Context, Probot } from 'probot';
import { features } from './features';
import type { ConfigInterface } from './config';

const commitType = {
  build: 'build',
  chore: 'chore',
  ci: 'ci',
  docs: 'docs',
  feat: 'feat',
  fix: 'bug',
  perf: 'pref',
  refactor: 'refactor',
  revert: 'revert',
  style: 'style',
  test: 'test',
};

export = (app: Probot) => {
  app.on('issues.opened', async (context) => {
    const config = await getConfig(context);
    if (!config || !config.issueOpenedReply) return;
    const utils = features(context);
    const issueInfo = context.issue();
    const issueRawInfo = await context.octokit.issues.get(issueInfo);
    const { title } = issueRawInfo.data;
    const { contributor } = await utils.parseIssueTitle(title);
    const issueType = Object.keys(commitType).find((item) => title.startsWith(item));
    if (contributor && config.components) {
      await utils.assignee([config.components[contributor]]);
    }
    if (issueType) {
      await utils.labels([commitType[issueType as keyof typeof commitType]]);
    }
    await utils.reply(config.issueOpenedReply);
  });

  app.on('pull_request.opened', async (context) => {
    const config = await getConfig(context);
    const prInfo = await context.pullRequest();
    if (!config || !config.prOpenedReply) return;
    const utils = features(context);
    if (config.prOpenedReply.includes('${preview}') && config.previewUrl) {
      await utils.reply(
        config.prOpenedReply.replace(
          '${preview}',
          `[preview](${config.previewUrl.replace('${pull_num}', prInfo.pull_number)})`
        )
      );
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
