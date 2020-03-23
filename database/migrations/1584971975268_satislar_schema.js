'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SatislarSchema extends Schema {
  up () {
    this.create('satislars', (table) => {
      table.increments()
      table.string('firma_id')
      table.date('tarih')
      table.timestamps()
    })
  }

  down () {
    this.drop('satislars')
  }
}

module.exports = SatislarSchema
