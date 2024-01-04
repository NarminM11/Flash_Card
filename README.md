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

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Clone this repoistory:
git clone https://github.com/your-username/flash-cards-react-app.git
cd flash-cards-react-app

Install dependencies:
npm install

Then, run json server:
npm run json-server

Running React App:
npm start

The app will be available at http://localhost:3000.

Features -->

Home Page-->
General introduction and information about your projects with external links.

Flash Cards Page-->

Flash Card Structure:
Each card has two sides: front (short text, question, or image) and back (answer, information).
Cards include a last modification date/time and a status (Learned, Want to Learn, Noted).

Flash Card Management:
Create new flash cards.
Hovering over a card shows edit and delete buttons.
Edit/Update: Opens a pop-up page or turns the card into an editable component.
Delete: Removes a card from the collection.

Main Page Features:
Display Cards: List of cards fetched from http://localhost:3000/cards, sorted by most recent modification.
Create Card Option: Interface for adding new cards.
Search Functionality: Search cards based on text on either side.
Filter Option: Filter cards by their status(learned, noted, want to learn).
Sort Option: Sort cards based on modified date, status,front text order A-Z or Z-A.

Storage Integration:
All cards are fetched from the JSON server, and updates are persisted back to it.

Extra:
Pagination or Infinite Scrolling: Load more cards as the user scrolls down.

Contact Me Page:
A simple contact page that asks the user to enter the subject, email address, and content of the message. When the user submits, the message is sent to http://localhost:3000/messages as a JSON body and stored in a JSON file on the JSON server.

Deployed:
https://narminm11.github.io/Flash_Card/
