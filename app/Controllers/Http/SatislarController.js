'use strict'
const Satislar = use('App/Models/Satislar')
const Database = use('Database')
const { validate } = use('Validator')
const moment = use('moment')

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
    };
    async yeni({view}){
        const firmalar = await Database.table('firmalars').select('*')
        return view.render('satislar.yeni',{
            'baslik':'Yeni Satış',
            'firmalar': firmalar
        })
    };
    async kaydet({session, request,response }){
        
        const satis = new Satislar();
        satis.tarih = moment(request.input('tarih')).format('YYYY-MM-DD')
        satis.firmalar_id = request.input('firmalar_id');
        satis.tutar = request.input('tutar');
        await satis.save();
        session.flash({
            bilgi : 'Satış başarıyla kaydedildi..'
        })
        return response.redirect('/satislar');
    };
    async edit({view,params,request}){
        const firmalar = await Database.table('firmalars').select('*')
        const satisArray = await Satislar.query().where('id',params.id).with('firmalars').fetch();
        const satis = satisArray.toJSON()
        satis[0].tarih = moment(satis[0].tarih).format('YYYY-MM-DD')
        return view.render('satislar.edit',{
            'baslik' : 'Satış Düzenle',
            satis : satis,
            firmalar : firmalar
        })
    };

    async incele({view,params,request}){

        const satisArray = await Satislar.query().where('id',params.id).with('firmalars').fetch();
        const satis = satisArray.toJSON()
        satis[0].tarih = moment(satis[0].tarih).format('YYYY-MM-DD')
        return view.render('satislar.incele',{
            'baslik' : 'Satış İncele',
            satis : satis
        })
    };
    
    async update({session, request,response, params }){
        const id = params.id;
        const rules = {
            firmalar_id: `required`,
          }
          const messages = {
            'firmalar_id.required': 'Lütfen firma adı seçiniz.',
          }
      
          const validation = await validate(request.all(), rules, messages)
      
          if (validation.fails()) {
            session
              .withErrors(validation.messages())
              .flashAll()
            return response.redirect('back')
          }

        const satis = await Satislar.find(id);
        satis.firmalar_id = request.input('firmalar_id');
        satis.tarih = moment(request.input('tarih')).format('YYYY-MM-DD');
        satis.tutar = request.input('tutar');

        await satis.save();

        session.flash({
            bilgi : 'Satış kaydı başarıyla güncellendi..'
        })

        return response.redirect('/satislar');

    };

    async sil({ params, session, response }){
      const id = params.id
      const satis = await Satislar.find(id);
      await satis.delete();
      session.flash({
          bilgi : 'Satış başarıyla silindi..'
      })

    return response.redirect('/satislar');

    }
}

module.exports = SatislarController
