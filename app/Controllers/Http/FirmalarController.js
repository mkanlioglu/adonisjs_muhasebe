'use strict'
const Firmalar = use('App/Models/Firmalar')

class FirmalarController {
    async index({ view }){
        const firmalar = await Firmalar.all();
        return view.render('firmalar',{
            baslik: "Firmalar",
            firmalar:firmalar.toJSON()
        })        
    }
}

module.exports = FirmalarController
