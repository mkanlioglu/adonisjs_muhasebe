'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Firmalar extends Model {
    satislars(){
        return this.hasMany('App/Models/Satislar')
    }
    alislars(){
        return this.hasMany('App/Models/Alislar')
    }
    odemelers(){
        return this.hasMany('App/Models/Odemeler')
    }
    tahsilatlars(){
        return this.hasMany('App/Models/Tahsilatlar')
    }
}

module.exports = Firmalar
