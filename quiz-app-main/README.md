# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

# Application Overview:
### My quiz application is designed to provide users with a seamless and intuitive experience. It adheres to the specified requirements, allowing users to take a quiz, navigate through questions, and view their results at the end. The application fetches quiz questions from the provided API, displays them to the user, and evaluates their answers upon submission or when the timer ends.

Approach to the Problem:
## Quiz Layout & Flow:

Implemented a start page where users enter their email address.
Displayed 15 questions to the user from the API.
Included a timer at the top of the page counting down from 30 minutes, auto-submitting the quiz when the timer reaches zero.
Navigation:

Enabled users to navigate to specific questions using a navigation panel.
Created an overview section displaying visited and attempted questions for user reference.

## End of Quiz:

Directed users to a report page after the quiz or when the timer ends.
Displayed each question with the user's answer and the correct answer side by side for easy comparison.

## Data Source:

Fetched quiz questions from the specified API endpoint and formatted choices as required.

## Code Quality and Functionality:
Ensured all functionalities were correctly implemented and thoroughly tested.
Wrote clean, well-organized, and bug-free code following best practices and reusability.
Used comments judiciously to explain complex or non-intuitive parts of the code, enhancing readability and maintainability.

## Extra Features:
Made the application responsive, adapting to different device sizes.
Implemented smooth transitions and animations when navigating between questions, enhancing the user experience.

## Challenges and Solutions:
One challenge faced was handling the timer countdown accurately across different devices and browsers. I overcame this challenge by using JavaScript's Date object and ensuring consistent time calculation methods.
Another challenge was synchronizing user answers with the correct answers for evaluation. I resolved this by carefully structuring the data and using appropriate comparison methods.

## Repository and Deployment:
Hosted the application on Netlify, ensuring seamless access for users.
Shared the repository link containing the complete source code for review and further development.

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
