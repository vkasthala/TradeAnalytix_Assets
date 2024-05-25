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
  authToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZnllcnMuaW4iLCJpYXQiOjE3MTY0NDEzNTQsImV4cCI6MTcxNjUxMDY1NCwibmJmIjoxNzE2NDQxMzU0LCJhdWQiOlsieDowIiwieDoxIiwieDoyIiwiZDoxIiwiZDoyIixbIng6MCIsIng6MSIsIng6MiIsImQ6MSIsImQ6MiJdXSwic3ViIjoiYWNjZXNzX3Rva2VuIiwiYXRfaGFzaCI6ImdBQUFBQUJtVHRFSzUwVUtyNFZlRnZsLVA4YXZrLWJ2dEwtQkVZajFBQWhyV2x5QmpLR1g2ZDF0U0VSVXBDbVFUc2VXUTQ1elNLNjdKdzBYUGNaTkY3R0FfTUZveGJEcGczTGt2b1FEZzRITXpNRU15SUtZa2I4PSIsImRpc3BsYXlfbmFtZSI6Ik5JVEhJTiBCQUxBS1JJU0hOQSBOQVlBSyIsIm9tcyI6IksxIiwiaHNtX2tleSI6ImMwYWQ5MDgxNzY2Zjk0OTU2MWU0ZWM0OGEyNzNmMGMyNzY0Zjk1YzAwMWIxN2RkZjVkZjIzZWJhIiwiZnlfaWQiOiJZTjAyMDQ3IiwiYXBwVHlwZSI6MTAyLCJwb2FfZmxhZyI6Ik4ifQ.oPhx6_gkl_PRN13ZI5xd4SE2chbNPuoDH_ER9CUqVNI',
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
