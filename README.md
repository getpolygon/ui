# ui

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fgetpolygon%2Fui.svg?type=small)](https://app.fossa.com/projects/git%2Bgithub.com%2Fgetpolygon%2Fui?ref=badge_small)
[![Node.js CI](https://github.com/getpolygon/ui/actions/workflows/node.js.yml/badge.svg)](https://github.com/getpolygon/ui/actions/workflows/node.js.yml)

This repository contains the source code to the official user interface of the Polygon Open-Source Project.

## Running locally

To run Polygon's UI locally, you will need to set several environment variables in a **`.env.local`** file in your **project's root**:

- **`POLYGON_CORE_URL`** - The URL of your Polygon core instance.
- **`IRON_SESSION_SECRET`** - A 512 bit random string for cookie encryption.

After setting the variables, you can run the following command to start the UI:

```shell
yarn dev
```

or, if you would like to run an optimized production build

```shell
yarn build
yarn start
```

## Deploying to a cloud provider

If you want to deploy your instance of Polygon's UI to a cloud provider such as Netlify or Vercel, we have got you covered. You can deploy with these providers by clicking any of the buttons below!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgetpolygon%2Fui&env=IRON_SESSION_SECRET,POLYGON_CORE_URL&project-name=polygon-ui&repo-name=polygon-ui)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/next-netlify-starter)

> Note: if you choose to host with Netlify, follow [Netlify's environment variable declaration documentation](https://docs.netlify.com/configure-builds/environment-variables/#declare-variables) to set required environment variables from the control panel.
