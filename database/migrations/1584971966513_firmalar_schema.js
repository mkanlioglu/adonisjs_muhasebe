'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FirmalarSchema extends Schema {
  up () {
    this.create('firmalars', (table) => {
      table.increments()
      table.string('firma_adi',255).notNullable().unique()
      table.string('vergi_dairesi',255)
      table.string('vergi_no',255).unique()
      table.string('is_tel',255)
      table.string('cep_tel',255)
      table.timestamps()
    })
  }

  down () {
    this.drop('firmalars')
  }
}

module.exports = FirmalarSchema
