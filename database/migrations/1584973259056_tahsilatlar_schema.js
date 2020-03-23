'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TahsilatlarSchema extends Schema {
  up () {
    this.create('tahsilatlars', (table) => {
      table.increments()
      table.string('firma_id')
      table.date('tarih')
      table.float('tutar')
      table.string('aciklama',255)
      table.timestamps()
    })
  }

  down () {
    this.drop('tahsilatlars')
  }
}

module.exports = TahsilatlarSchema
