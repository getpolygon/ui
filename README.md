<h1 style="text-align: center">Polygon</h1>
<h2 style="text-align: center">An open-source & privacy-oriented social network that is not hungry for your data.</h2>

## How to run on your local machine

Configure the required environment variables ```IRON_SESSION_SECRET``` and ```POLYGON_CORE_URL``` (the url of your Polygon core instance) in a ```.env``` file in the root of your project.
Then, run the command ```npm run dev```. The development server will start on port 3000 and can be accessed by going to ```localhost:3000```. If you wish, you may set the port the dev server is hosted on with the command ```npm run dev -- -p PORT```.

## How to deploy your project to Vercel/Netlify
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgetpolygon%2Fui&env=IRON_SESSION_SECRET,POLYGON_CORE_URL&project-name=polygon-ui&repo-name=polygon-ui)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/next-netlify-starter)

Press the one of the above buttons. The Vercel/Netlify website will deploy everything for you. Enjoy your new website!

Note: Vercel will prompt you for the environment variables during the setup phase, but Netlify will not. If you choose Netlify to post your Polygon UI instance, follow [Netlify's environment variable declaration documentation](https://docs.netlify.com/configure-builds/environment-variables/#declare-variables) to set the required environment variables.
