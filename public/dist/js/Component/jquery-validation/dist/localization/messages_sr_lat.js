!function(a){"function"==typeof define&&define.amd?define(["jquery","../jquery.validate"],a):a(jQuery)}(function(a){a.extend(a.validator.messages,{required:"Polje je obavezno.",remote:"Sredite ovo polje.",email:"Unesite ispravnu e-mail adresu",url:"Unesite ispravan URL.",date:"Unesite ispravan datum.",dateISO:"Unesite ispravan datum (ISO).",number:"Unesite ispravan broj.",digits:"Unesite samo cifre.",creditcard:"Unesite ispravan broj kreditne kartice.",equalTo:"Unesite istu vrednost ponovo.",extension:"Unesite vrednost sa odgovarajućom ekstenzijom.",maxlength:a.validator.format("Unesite manje od {0} karaktera."),minlength:a.validator.format("Unesite barem {0} karaktera."),rangelength:a.validator.format("Unesite vrednost dugačku između {0} i {1} karaktera."),range:a.validator.format("Unesite vrednost između {0} i {1}."),max:a.validator.format("Unesite vrednost manju ili jednaku {0}."),min:a.validator.format("Unesite vrednost veću ili jednaku {0}.")})});