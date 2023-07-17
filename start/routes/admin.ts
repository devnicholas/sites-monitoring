import Route from '@ioc:Adonis/Core/Route'
import AuthController from 'App/Controllers/Http/AuthController'
import DashboardController from 'App/Controllers/Http/DashboardController'
import SearchesController from 'App/Controllers/Http/SearchesController'

Route.group(() => {
    // Admin group
    Route.get('/login', AuthController.loginPage).as('admin.login')
    Route.post('/login', AuthController.login).as('admin.login.store')

    Route.get('/forgot-password', AuthController.forgotPasswordPage).as('forgot-password')
    Route.post('/forgot-password', AuthController.forgotPassword).as('forgot-password.store')
    Route.get('/recover-password/:token', AuthController.recoverPasswordPage).as('recover-password')
    Route.post('/recover-password', AuthController.recoverPassword).as('recover-password.store')

    Route.group(() => {
        // Auth routes
        Route.any('/logout', AuthController.logout).as('logout')

        Route.get('/', DashboardController.index).as('admin.main')

        Route.get('/search', SearchesController.index).as('admin.search')

        Route.resource('users', 'UsersController').except(['show']).as('admin.users')
        Route.resource('sites', 'SitesController').as('admin.sites')
        Route.resource('verifications', 'VerificationsController').only(['index', 'show']).as('admin.verifications')
        Route.resource('notifications', 'NotificationsController').only(['index']).as('admin.notifications')
    }).middleware(['auth', 'notification'])
}).prefix('admin')
