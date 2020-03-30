'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class LoginController {
  showLoginForm ({ view }) {
    return view.render('auth.login')
  }

  async login ({ request, auth, session, response }) {
    
    const { username, password, remember } = request.all()
    
    const user = await User.query()
      .where('username', username)
      .where('is_active', true)
      .first()

    if (user) {
      
      const passwordVerified = await Hash.verify(password, user.password)

      if (passwordVerified) {
        
        await auth.remember(!!remember).login(user)

        return response.route('home')
      }
    }

    
    session.flash({
      notification: {
        type: 'danger',
        message: `Giriş bilgileriniz doğrulanamadı. Kullanıcı adı ve parolayı doğru yazdığınızdan emin olun..`
      }
    })

    return response.redirect('back')
  }
}

module.exports = LoginController
