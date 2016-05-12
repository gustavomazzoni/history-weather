# Assignment

Make a system in PHP to collect the last 30 days of weather data from forecast.io API for a given location. We expect you to do multiple API requests simultaneously.

You can find the API documentation here: https://developer.forecast.io/docs/v2.  
Apply for a API key here: https://developer.forecast.io/register

# Timing

We don't specify a timeframe for the assignment. Just ping us when you are done, on this endpoint: `https://hooks.slack.com/services/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` ([docs](https://api.slack.com/incoming-webhooks)). Please mention your name and a link to what we need to review.


---------------
## Solution
It was built a single page application using [React](https://facebook.github.io/react/), for the client side, consuming a RESTful API developed in [Node](https://nodejs.org/) that makes the integration to the external forecast.io API to retrieve forecast information.

### Node RESTful API
* Handles the communication with Forecast API through a lib class created named ForecastAPI.
* Deals with any error Forecast API can return.
* Caches Forecast API JSON response object for 6 hours with [Redis](http://redis.io/). This have minimized the external API calls a lot and reduced the response process time. And off course would reduce the API cost.
* The router name was defined to expose an URL that indicates it's an API and it's versioned. And it's similar to Forecast API URL so it's easy to understand.

### React webapp
* Modularized the components in the view making them reusable and self-managed.
* Each component makes their own API request simultaneously with each other.


Modules required in client side:
* React
* React-DOM
* Babel
* Webpack

Modules required in server side:
* NodeJS
* ExpressJS
* Redis

Modules required for testing:
* Mocha
* Chai

## Running the app
### Download the project
Download or clone the project using following command:
```sh
$ git clone git@github.com:madewithlove/technical-assignment-using-forecast-io-gustavomazzoni.git
```
### Install
Install Redis
```sh
$ brew update && brew install redis
```
Install project dependencies
```sh
$ npm install
```
### Configure
Apply for The Dark Sky Forecast API key (if you have not done yet).

Set the key to FORECAST_API_KEY environment variable. For example, on MacOS:
```sh
$ export FORECAST_API_KEY=<API Key>
```
### Run
Start Redis server
```sh
$ redis-server
```
Then build and start the project
```sh
$ npm run build
$ npm start
```

Open on your browser:
http://localhost:3000/

### Test the API
#### The Time Machine Call
It is possible to request a forecast for an arbitrary date in the past or future:
```sh
http://localhost:3000/api/v1/weather/LATITUDE,LONGITUDE,TIME
```
Detail information about this API service can be found directly at Forecast.io API website:

https://developer.forecast.io/docs/v2#time_call
