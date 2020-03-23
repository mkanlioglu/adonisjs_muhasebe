'use strict'

const { validateAll } = use('Validator')
const User = use('App/Models/User')
const randomString = require('random-string')
// const Mail = use('Mail')

class RegisterController {
  showRegisterForm ({ view }) {
    return view.render('auth.register')
  }

  async register ({ request, session, response }) {
    // validate form inputs
    const data = request.only(['username', 'ad_soyad', 'password'])
    const rules = {
      ad_soyad: 'required|unique:users,ad_soyad',
      username: 'required|unique:users,username',
      password: 'required'
    }
    const messages = {
      'username.required' : 'Kullanıcı Adı Girmelisiniz.',
      'username.unique'   : 'Bu Kullanıcı Adı Daha Önce Kullanılmış. Farklı bir kullanıcı adı giriniz.',
      'ad_soyad.required' : 'Adı Soyadı Girmelisiniz.',
      'ad_soyad.unique'   : 'Bu Adı Soyadı Daha Önce Kullanılmış. Farklı bir Ad Soyad giriniz.',
      'password.required' : 'Parola Girmelisiniz.',
  }
  const validation = await validateAll(data, rules, messages)
    if (validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(['password'])

      return response.redirect('back')
    }

    // Kullanıcı oluştur
    const user = await User.create({
      username: request.input('username'),
      ad_soyad: request.input('ad_soyad'),
      password: request.input('password'),
      is_active: true
    })

    /* send confirmation email
    await Mail.send('auth.emails.confirm_email', user.toJSON(), message => {
      message
        .to(user.email)
        .from('hello@adonisjs.com')
        .subject('Lütfen e-posta adresinizi doğrulayın.')
    })
    */

    // display success message
    session.flash({
      notification: {
        type: 'success',
        message: 'Kayıt tamamlandı!'
      }
    })

    return response.redirect('/login')
  }

  /*
  async confirmEmail ({ params, session, response }) {
    // get user with the cinfirmation token
    const user = await User.findBy('confirmation_token', params.token)

    // set confirmation to null and is_active to true
    user.confirmation_token = null
    user.is_active = true

    // persist user to database
    await user.save()

    // display success message
    session.flash({
      notification: {
        type: 'Başarılı',
        message: 'E-posta adresiniz doğrulandı.'
      }
    })

    return response.redirect('/login')
  }
  */
}

module.exports = RegisterController
