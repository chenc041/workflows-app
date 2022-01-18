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
    await this.context.octokit.issues.addAssignees({ ...issueInfo, assignees })
  }

  // private log(identify: string, ...message: any[]) {
  //   this.context.log.info(identify, message);
  // }

  // private static async translateIssueOrPr(text: string) {
  //   const result = await translate(text, {to: 'en'});
  //   return result.text;
  // }

}

export const features = (context: Context) =>
  new Features(context);
