'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlislarSchema extends Schema {
  up () {
    this.create('alislars', (table) => {
      table.increments()
      table.string('firma_id')
      table.date('tarih')
      table.timestamps()
    })
  }

  down () {
    this.drop('alislars')
  }
}

module.exports = AlislarSchema
