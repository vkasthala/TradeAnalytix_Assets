// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /*apiUrl: 'https://tradeanalytix.com/service',
  redirectUri: 'http://localhost:4200/oauth-redirect',*/
  /*apiUrl: 'https://tradeanalytix.com/service',
  redirectUri: 'https://tradeanalytix.com/oauth-redirect',*/
  /*apiUrl: 'https://tradeanalytix.com/service/us',
  redirectUri: 'https://us.tradeanalytix.com/oauth-redirect',*/
  // apiUrl: 'https://in.cuetrade.io/service',
  // redirectUri: 'http://localhost:4200/oauth-redirect',
  // redirectUri: 'https://in.cuetrade.io/oauth-redirect',
  apiUrl: 'http://localhost:8080/service',
  redirectUri: 'http://localhost:4200/oauth-redirect',
  tradingServiceUri: 'http://localhost:8081/tradingservice',
  clientCode: 'GPJIG4CRFK-102',
  authToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZnllcnMuaW4iLCJpYXQiOjE3MTY2MTY0MzEsImV4cCI6MTcxNjY4MzQ1MSwibmJmIjoxNzE2NjE2NDMxLCJhdWQiOlsieDowIiwieDoxIiwieDoyIiwiZDoxIiwiZDoyIixbIng6MCIsIng6MSIsIng6MiIsImQ6MSIsImQ6MiJdXSwic3ViIjoiYWNjZXNzX3Rva2VuIiwiYXRfaGFzaCI6ImdBQUFBQUJtVVh6dmNuS1NDRVJQdjJXbFV6RkFCZU5CVmFRUFZiN3FBVGxrTkI1Vm9ZVzhBUF9qMTVWYnQ2dWdZd2VDeFJYazk2NjJweG5hVWgzN3RhWkNjQ1J5UVdkbGtlbVFfeXEzZzRfS3RkNDJMeDFPLWxrPSIsImRpc3BsYXlfbmFtZSI6Ik5JVEhJTiBCQUxBS1JJU0hOQSBOQVlBSyIsIm9tcyI6IksxIiwiaHNtX2tleSI6ImMwYWQ5MDgxNzY2Zjk0OTU2MWU0ZWM0OGEyNzNmMGMyNzY0Zjk1YzAwMWIxN2RkZjVkZjIzZWJhIiwiZnlfaWQiOiJZTjAyMDQ3IiwiYXBwVHlwZSI6MTAyLCJwb2FfZmxhZyI6Ik4ifQ.D-hrR3NPa2bWii7OvmlwQbLaBCy3a5HFOOb1rawhP8A',
  tz: 'Asia/Calcutta'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
