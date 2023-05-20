import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new TooManyRequestException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class TooManyRequestException extends Exception {
  constructor(public rawMessage: string) {
    super(rawMessage, 429, 'E_TOO_MANY_REQUESTS')
  }
}
