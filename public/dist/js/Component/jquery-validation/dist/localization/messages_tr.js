!function(a){"function"==typeof define&&define.amd?define(["jquery","../jquery.validate"],a):a(jQuery)}(function(a){a.extend(a.validator.messages,{required:"Bu alanın doldurulması zorunludur.",remote:"Lütfen bu alanı düzeltin.",email:"Lütfen geçerli bir e-posta adresi giriniz.",url:"Lütfen geçerli bir web adresi (URL) giriniz.",date:"Lütfen geçerli bir tarih giriniz.",dateISO:"Lütfen geçerli bir tarih giriniz(ISO formatında)",number:"Lütfen geçerli bir sayı giriniz.",digits:"Lütfen sadece sayısal karakterler giriniz.",creditcard:"Lütfen geçerli bir kredi kartı giriniz.",equalTo:"Lütfen aynı değeri tekrar giriniz.",extension:"Lütfen geçerli uzantıya sahip bir değer giriniz.",maxlength:a.validator.format("Lütfen en fazla {0} karakter uzunluğunda bir değer giriniz."),minlength:a.validator.format("Lütfen en az {0} karakter uzunluğunda bir değer giriniz."),rangelength:a.validator.format("Lütfen en az {0} ve en fazla {1} uzunluğunda bir değer giriniz."),range:a.validator.format("Lütfen {0} ile {1} arasında bir değer giriniz."),max:a.validator.format("Lütfen {0} değerine eşit ya da daha küçük bir değer giriniz."),min:a.validator.format("Lütfen {0} değerine eşit ya da daha büyük bir değer giriniz."),require_from_group:"Lütfen bu alanların en az {0} tanesini doldurunuz."})});