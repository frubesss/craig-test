# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deployment

This application supports both production and preview deployments:

### Production Deployment (GitHub Pages)

The production website is available at: https://frubesss.github.io/craig-test

**Setup Instructions:**
1. **Enable GitHub Pages**: In the repository settings, go to "Pages" and set the source to "GitHub Actions"
2. **Automatic Deployment**: The app automatically deploys when code is pushed to the `main` branch
3. **Manual Deployment**: You can trigger deployment from the Actions tab

### Preview Deployments (Pull Requests)

Every pull request automatically gets its own preview deployment using Surge.sh.

**Features:**
- Each PR gets a unique preview URL: `https://pr-{number}-craig-test.surge.sh`
- Previews are automatically updated when you push new changes to the PR
- Previews are automatically cleaned up when the PR is closed
- Bot comments on PRs with the preview URL

**Setup Instructions:**
1. **Create Surge.sh Account**: Sign up at [surge.sh](https://surge.sh/)
2. **Generate Token**: Run `surge token` locally to get your token
3. **Add Secret**: In repository settings → Secrets → Actions, add `SURGE_TOKEN` with your token
4. **Automatic Operation**: Preview deployments will work automatically for all new PRs

The deployment workflows build the React app and publish it using the latest GitHub Actions.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
