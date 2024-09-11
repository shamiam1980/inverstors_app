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

## VIP NOTE

<u>To correctly deploy a new build:</u>

- Frontend developer runs `npm run build` to create a new build

- Frontend developer uploads the build to the subdomain root folder

- Frontend developer sends the build to the backend developer to inject the new `index.html` file only, to sync file hashes between frontend and backend

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

# App Version in the FrontEnd

### NOTE

```

App version is semi-hidden in the upper right corner of the login screen

```

# API Requests

`/get_cookie `

GET request at start to get CSRF token

Response :

```
{"message": "welcome"}
```

with header that includes CSRF token in cookie as following:

`set-cookie:
csrftoken=9xt4TBwB7mWgWDHvQbJKjWjXJbB7ngeB; expires=Sun, 24 Aug 2025 23:32:55 GMT; Max-Age=31449600; Path=/; SameSite=Lax`

You can extract csrftoken by code js :

export function getCsrfToken() {
const csrfToken = document.cookie.split('; ')
.find(row => row.startsWith('csrftoken'))
?.split('=')[1];
return csrfToken || '';
}

or

const getCsrfToken = () => {
const csrfCookie = document.cookie
.split(';')
.map(cookie => cookie.trim())
.find(cookie => cookie.startsWith('csrftoken='));

    if (csrfCookie) {
      return csrfCookie.split('=')[1];
    }

    return null;

};

Now, in any post request we need to include the CSRF token in the request headers using the X-CSRFToken header.

---

`/login`

POST request include data for logging in as username and password
must include extracted CSRF token in header X-CSRFToken

Response:

Success 200 :

```
{'message': 'Login successful'}
```

Fail :

```
{'error': 'Invalid credentials'}, code =401
```

```
{'error': 'Invalid request method'}, code =405
```

---

`/logout`

GET request for logout

Response :

```
{"message": "Logout successful"} code = 200
```

---

`/user_data`

Responds with data of current logged in user with JSON:

```
{
  "userId": 1,
  "username": "el_erm@yahoo.com",
  "userFullName": "هشام إبراهيم القرم",
  "capitalVal": 10000,
  "capitalValPaid": 0,
  "capitalValRem": 10000,
  "investmentType": "project",
  "investmentSubType": "PROCYON ENERGY, CAMEROON",
  "profitAccountProfitVal": 2000,
  "profitAccountPaymentDue": "2024-09-06",
  "currYearVal": 2024,
  "currYearProfit": 1000,
  "currYearPaid": 1000,
  "lastYearVal": 2023,
  "lastYearProfit": 950,
  "lastYearPaid": 500,
  "yearBeforeVal": 2022,
  "yearBeforeProfit": 800,
  "yearBeforePaid": 0,
  "stockNumStocks": 1000,
  "stockCurrValPerStock": 110,
  "stockExpValThisYearPerStock": 120,
  "stockExpValNextYearPerStock": 130,
  "stockProfitThisYearPerStock": 3.5,
  "stockTotalProfitThisYear": 3500,
  "stockProfitNextYearPerStock": 4.5,
  "stockTotalProfitNextYear": 4500,
  "paymentsHistory": [
    {
      "value": 1000,
      "date": "2024-03-01",
      "done": true
    },
    {
      "value": 2000,
      "date": "2024-05-01",
      "done": true
    },
    {
      "value": 3000,
      "date": "2024-09-01",
      "done": false
    }
  ]
}
```

If user tried the request without logging-in, response will be code = 401:

```
{'error': 'Unauthorized'}
```
