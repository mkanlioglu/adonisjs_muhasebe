'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SatislarDatSchema extends Schema {
  up () {
    this.create('satislar_dat', (table) => {
      table.increments()
      table.integer('satis_id',21)
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
    this.drop('satislar_dat')
  }
}

module.exports = SatislarDatSchema
