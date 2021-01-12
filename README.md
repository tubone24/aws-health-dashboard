# AWS Health Dashboard

![img](https://i.imgur.com/AoeQGrV.png)

[![license](https://img.shields.io/github/license/tubone24/aws-health-dashboard.svg)](LICENSE)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![MIT](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Easily check the status of **AWS**

This is a web page where you can check the status of **AWS**.

The official [AWS Service Health Dashboard](https://status.aws.amazon.com/) is difficult to use, so I recreated it using Next.js Vercel.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Test & Lint](#test--lint)
- [Demo](#demo)
- [License](#license)

## Background

The official [AWS Service Health Dashboard](https://status.aws.amazon.com/) has only RSS links, making it a rather difficult web page to use.

Since it is difficult to use, I recreated it with Next.js Vercel.

## Install

### Deploy your own

Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/tubone24/aws-health-dashboard&project-name=aws-health-dashboard&repository-name=aws-health-dashboard)

### Local Run

You can develop while using the hot reload function.

```
npm install

npm run dev
```

### Build

```
npm run build
```

## Test & Lint

You can run test and lint by executing the following command; make sure to run it before Pull Request.

```
npm run test-all
```

Also, this test code uses the jest snapshot, so if there are any changes in the UI.
Please update the snapshot using the command below.

```
npm test -- -u
```

## Demo

You can use the demo site on this link below.

<https://aws-health-dashboard.vercel.app/>

![img](https://i.imgur.com/XblRysI.png)

## License

[MIT © tubone24](LICENSE)
