'use strict'
const Satislar = use('App/Models/Satislar')
const Database = use('Database')
const { validate } = use('Validator')

class SatislarController {
    async index({ request, response, view }){
        let { page } = request.all();
        let sonraki = 0;
        page = Number(page) ? Number(page) : 1;
        let length = 10;
        let onceki = Number(page) ? Number(page)-1 : 1;
        if(page>1){onceki=page-1}else{onceki=0}
        const satislar = await Satislar.query().select('*',Database.raw('DATE_FORMAT(tarih, "%d.%m.%Y") as tarih')).with('firmalars').paginate(page,length);        
        const recordsTotal = await Satislar.getCount();
        const last = Math.ceil(recordsTotal/length);
        if(page<last){sonraki=page+1}else{sonraki=0}
        const satisList = satislar.toJSON();
        // return satisList
        return view.render('satislar.index',{
            'baslik': 'Satışlar',
            'onceki': onceki,
            'sonraki': sonraki,
            'last': last,
            'recordsTotal': recordsTotal,
            'data' : satisList
        });   
    }
    async yeni({view}){
        const firmalar = await Database.table('firmalars').select('*')
        return view.render('satislar.yeni',{
            'baslik':'Yeni Satış',
            'firmalar': firmalar
        })
    };
    async kaydet({session, request,response }){
        
        const satis = new Satislar();
        satis.tarih = request.input('tarih');
        satis.firmalar_id = request.input('firmalar_id');
        satis.tutar = request.input('tutar');
        await satis.save();
        session.flash({
            bilgi : 'Satış başarıyla kaydedildi..'
        })
        return response.redirect('/satislar');
    };
}

module.exports = SatislarController
