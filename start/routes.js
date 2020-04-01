'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('home').as('home').middleware(['auth'])

Route.get('register', 'Auth/RegisterController.showRegisterForm').middleware([
  'authenticated'
])
Route.post('register', 'Auth/RegisterController.register').as('register')
Route.get('register/confirm/:token', 'Auth/RegisterController.confirmEmail')
Route.get('login', 'Auth/LoginController.showLoginForm').middleware([
  'authenticated'
])
Route.post('login', 'Auth/LoginController.login').as('login')
Route.get('logout', 'Auth/AuthenticatedController.logout')
Route.get('password/reset', 'Auth/PasswordResetController.showLinkRequestForm')
Route.post('password/email', 'Auth/PasswordResetController.sendResetLinkEmail')
Route.get('password/reset/:token', 'Auth/PasswordResetController.showResetForm')
Route.post('password/reset', 'Auth/PasswordResetController.reset')

//API
Route.get('/api/firmalar','FirmalarController.apiListe').middleware(['auth'])


Route.get('firmalar','FirmalarController.index').as('firmalar')
Route.get('firmalar/yeni','FirmalarController.yeni').as('firmalar.yeni')
Route.post('firmalar/kaydet','FirmalarController.kaydet').as('firmalar.kaydet')
Route.get('firmalar/edit/:id','FirmalarController.edit').as('firmalar.edit')
Route.get('firmalar/incele/:id','FirmalarController.incele').as('firmalar.incele')
Route.put('/firmalar/:id','FirmalarController.update').as('firmalar.update')
Route.delete('/firmalar/:id','FirmalarController.sil').as('firmalar.sil')
Route.get('satislar','SatislarController.index')
Route.get('alislar','AlislarController.index')
Route.get('tahsilatlar','Tahsilatlarontroller.index')
Route.get('odemeler','OdemelerController.index')

Route.on('*').render('404')