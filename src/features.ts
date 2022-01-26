import { Context } from 'probot';
// import translate from '@vitalets/google-translate-api';

class Features {
  context!: Context;
  constructor(context: Context) {
    this.context = context;
  }

  async labels(names: string[]) {
    const { owner, repo, issue_number } = await this.context.issue();
    await this.context.octokit.issues.addLabels({ owner, repo, issue_number, labels: names });
  }

  async assignee(assignees: string[]) {
    const issueInfo = await this.context.issue();
    await this.context.octokit.issues.addAssignees({ ...issueInfo, assignees });
  }

  async reply(content: string) {
    const issueComment = this.context.issue({
      body: content,
    });
    await this.context.octokit.issues.createComment(issueComment);
  }

  async parseIssueTitle(title: string) {
    const componentName = title
      .match(/\(\w+\)/g)
      ?.map((m) => m.replace(/\(|\)/gi, ''))
      .join('');

    return {
      contributor: componentName,
    };
  }

  // private log(identify: string, ...message: any[]) {
  //   this.context.log.info(identify, message);
  // }

  // private static async translateContext(text: string) {
  //   const result = await translate(text, {to: 'en'});
  //   return result.text;
  // }
}

export const features = (context: Context) => new Features(context);
