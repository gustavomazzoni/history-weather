# Assignment

Make a system in PHP to collect the last 30 days of weather data from forecast.io API for a given location. We expect you to do multiple API requests simultaneously.

You can find the API documentation here: https://developer.forecast.io/docs/v2.  
Apply for a API key here: https://developer.forecast.io/register

# Timing

We don't specify a timeframe for the assignment. Just ping us when you are done, on this endpoint: `https://hooks.slack.com/services/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` ([docs](https://api.slack.com/incoming-webhooks)). Please mention your name and a link to what we need to review.


---------------

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
