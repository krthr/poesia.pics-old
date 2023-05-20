import { Exception } from '@adonisjs/core/build/standalone'

const MESSAGE = 'Nombre de usuario ya se encuentra en uso'
const CODE = 'E_USER_ALREADY_EXISTS'
const STATUS = 409

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UserAlreadyExistException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UserAlreadyExistException extends Exception {
  public rawMessage = MESSAGE

  constructor() {
    super(MESSAGE, STATUS, CODE)
  }
}
