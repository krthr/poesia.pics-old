/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'PoemsController.index')
Route.post('/', 'PoemsController.store')
Route.get('/poem/:id', 'PoemsController.show')
Route.get('/explore', 'PoemsController.explore')

Route.group(() => {
  Route.put('/poem/:id', 'PoemsController.update')
}).middleware('auth:web')

Route.group(() => {
  Route.route('/login', ['GET', 'POST'], 'AuthController.login')
  Route.route('/join', ['GET', 'POST'], 'AuthController.join')
}).middleware('noauth')

Route.route('/logout', ['GET', 'POST'], 'AuthController.logout')

Route.get('/:username', 'PoemsController.userPoems')
