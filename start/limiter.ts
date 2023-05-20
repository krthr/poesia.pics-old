/*
|--------------------------------------------------------------------------
| Define HTTP rate limiters
|--------------------------------------------------------------------------
|
| The "Limiter.define" method callback receives an instance of the HTTP
| context you can use to customize the allowed requests and duration
| based upon the user of the request.
|
*/

import { Limiter } from '@adonisjs/limiter/build/services'

Limiter.define('generate_poem', function ({ auth }) {
  if (auth.user) {
    return Limiter.allowRequests(4)
      .every('1 min')
      .usingKey(auth.user.username)
      .limitExceeded((error) => {
        const retryAfter = Math.ceil(error.retryAfter / 1000)
        error.message = `Solo puedes crear 3 poemas por minuto. Debes esperar ${retryAfter} segundos para volver a intentarlo.`
      })
  }

  return Limiter.allowRequests(1)
    .every('10 secs')
    .limitExceeded((error) => {
      const retryAfter = Math.ceil(error.retryAfter / 1000)
      error.message = `Debes esperar ${retryAfter} segundos para volver a crear un nuevo poema. También puedes crear una cuenta y ampliar el límite.`
    })
})
