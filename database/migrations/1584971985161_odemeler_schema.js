'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OdemelerSchema extends Schema {
  up () {
    this.create('odemelers', (table) => {
      table.increments()
      table.string('firma_id')
      table.date('tarih')
      table.float('tutar')
      table.string('aciklama',255)
      table.timestamps()
    })
  }

  down () {
    this.drop('odemelers')
  }
}

module.exports = OdemelerSchema
