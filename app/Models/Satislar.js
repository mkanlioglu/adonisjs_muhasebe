'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Satislar extends Model {
    firmalars(){
        return this.belongsTo('App/Models/Firmalar')
    }
}

module.exports = Satislar
