# workflows-app

> A GitHub App built with [Probot](https://github.com/probot/probot) that A workflows app

> This app can auto reply pr or issue and auto distribution that to component owner


## How to use
- [install workflows-app](https://github.com/apps/workflows-app)

#### Config file
> Create a file called workflows_app_config.yml in the .github directory, the bot will read the config file. <br/>
> Get example info can see config.example.yml

### Config file field meanings
| Key              | Type   | Description                        | example                                                     |
|------------------|--------|------------------------------------|-------------------------------------------------------------|
| issueOpenedReply | string | auto reply when a issue opened     | `Thanks for opening this issue!`                            |
| prOpenedReply    | string | auto reply when a pr opened        | `The ${preview} will be available after the CI is complete` |
| previewUrl       | string | auto reply the project preview url | `https://xxx-preview-${pull_num}.xx.com`                    |
| components       | object | the components owner map           | `table: chenc`                                              |

## Dev

```sh
# Install dependencies
pnpm install

# Run the bot
pnpm start
```

## Docker

```sh
# 1. Build container
docker build -t workflows-app .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> workflows-app
```

## Contributing

If you have suggestions for how workflows-app could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2022 chenc <double_cl@163.com>
