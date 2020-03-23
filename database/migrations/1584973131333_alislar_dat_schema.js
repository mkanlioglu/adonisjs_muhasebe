'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlislarDatSchema extends Schema {
  up () {
    this.create('alislar_dats', (table) => {
      table.increments()
      table.integer('alis_id',21)
      table.string('urun_adi',255)
      table.float('miktar',21)
      table.float('fiyat',21)
      table.float('tutar',21)
      table.integer('kdv_oran',21)
      table.float('kdv_tutar',21)
      table.float('kdvli_tutar',21)
      table.timestamps()
    })
  }

  down () {
    this.drop('alislar_dats')
  }
}

module.exports = AlislarDatSchema
