'use strict'
const Firmalar = use('App/Models/Firmalar')
const { validate } = use('Validator')

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
        return view.render('firmalar.index',{
            'baslik': 'Firmalar',
            'onceki': onceki,
            'sonraki': sonraki,
            'last': last,
            'recordsTotal': recordsTotal,
            'data' : firmalist
        });   
    };

    yeni({view}){
        return view.render('firmalar.yeni',{
            'baslik':'Yeni Firma'
        })
    };

    async kaydet({session, request,response }){

        const rules = {
            firma_adi: 'required|unique:firmalars,firma_adi',
            vergi_no: 'required|unique:firmalars,vergi_no'
          }

          const messages = {
            'firma_adi.required': 'Lütfen firma adı giriniz.',
            'firma_adi.unique': 'Bu firma adı daha önce kaydedilmiş.',
            'vergi_no.required': 'Lütfen vergi numarası giriniz.',
            'vergi_no.unique': 'Bu vergi numarası daha önce kaydedilmiş.'
          }
      
          const validation = await validate(request.all(), rules, messages)
      
          if (validation.fails()) {
            session
              .withErrors(validation.messages())
              .flashAll()
            return response.redirect('back')
          }

        const firma = new Firmalar();

        firma.firma_adi = request.input('firma_adi');
        firma.vergi_dairesi = request.input('vergi_dairesi');
        firma.vergi_no = request.input('vergi_no');
        firma.is_tel = request.input('is_tel');
        firma.cep_tel = request.input('cep_tel');

        await firma.save();

        session.flash({
            bilgi : 'Firma başarıyla kaydedildi..'
        })

        return response.redirect('/firmalar');

    };

    async edit({view,params,request}){

        const firma = await Firmalar.find(params.id);
        return view.render('firmalar.edit',{
            'baslik' : 'Firma Düzenle',
            firma : firma
        })
    };

    async incele({view,params,request}){

        const firma = await Firmalar.find(params.id);
        return view.render('firmalar.incele',{
            'baslik' : 'Firma İncele',
            firma : firma
        })
    };
    
    async update({session, request,response, params }){
        const id = params.id;
        const rules = {
            firma_adi: `required|unique:firmalars,firma_adi,id,${id}`,
            vergi_no: `required|unique:firmalars,vergi_no,id,${id}`
          }
          const messages = {
            'firma_adi.required': 'Lütfen firma adı giriniz.',
            'firma_adi.unique': 'Bu firma adı daha önce kaydedilmiş.',
            'vergi_no.required': 'Lütfen vergi numarası giriniz.',
            'vergi_no.unique': 'Bu vergi numarası daha önce kaydedilmiş.'
          }
      
          const validation = await validate(request.all(), rules, messages)
      
          if (validation.fails()) {
            session
              .withErrors(validation.messages())
              .flashAll()
            return response.redirect('back')
          }

        const firma = await Firmalar.find(id);
        firma.firma_adi = request.input('firma_adi');
        firma.vergi_dairesi = request.input('vergi_dairesi');
        firma.vergi_no = request.input('vergi_no');
        firma.is_tel = request.input('is_tel');
        firma.cep_tel = request.input('cep_tel');

        await firma.save();

        session.flash({
            bilgi : 'Firma kaydı başarıyla güncellendi..'
        })

        return response.redirect('/firmalar');

    };

    async sil({ params, session, response }){
      const firma_id = params.id
      const firma = await Firmalar.find(firma_id);
      await firma.delete();
      session.flash({
          bilgi : 'Firma başarıyla silindi..'
      })

    return response.redirect('/firmalar');

    }


};


module.exports = FirmalarController
