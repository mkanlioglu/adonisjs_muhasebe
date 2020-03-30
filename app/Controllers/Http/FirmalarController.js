'use strict'
const Firmalar = use('App/Models/Firmalar')

class FirmalarController {
    async index({ request, response, view }){
        let { page } = request.all();
        let sonraki = 0;
        page = Number(page) ? Number(page) : 1;
        let length = 10;
        let onceki = Number(page) ? Number(page)-1 : 1;
        if(page>1){onceki=page-1}else{onceki=0}
        const firmalar = await Firmalar.query().paginate(page,length);
        const recordsTotal = await Firmalar.getCount();
        const last = Math.ceil(recordsTotal/length);
        if(page<last){sonraki=page+1}else{sonraki=0}
        const firmalist = firmalar.toJSON();
        return view.render('firmalar',{
            'baslik': 'Firmalar',
            'onceki': onceki,
            'sonraki': sonraki,
            'last': last,
            'recordsTotal': recordsTotal,
            'data' : firmalist
        });   
    };
}

module.exports = FirmalarController
