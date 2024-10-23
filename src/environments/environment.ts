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

  //Prod
  apiUrl: 'https://in.cuetrade.io/service',
  redirectUri: 'https://in.cuetrade.io/oauth-redirect',
  tradingServiceUri: 'https://trading.cuetrade.io/tradingservice',
  websocketUrl: 'https://trading.cuetrade.io:5001',
  //Uncomment this only in local
  // env: 'local',
  //Comment this only in local
  env: 'prod',

  //Local Dev
  // apiUrl: 'http://localhost:8080/service',
  // redirectUri: 'http://localhost:4200/oauth-redirect',
  // tradingServiceUri: 'http://localhost:8081/tradingservice',
  // websocketUrl: 'http://localhost:5001',


  clientCode: 'GPJIG4CRFK-102',
  authToken: '',
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
