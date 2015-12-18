module("placement"),test("elements() order",function(){var a=$("#orderContainer"),b=$("#elementsOrder").validate({errorLabelContainer:a,wrap:"li"});deepEqual(b.elements().map(function(){return $(this).attr("id")}).get(),["order1","order2","order3","order4","order5","order6"],"elements must be in document order"),b.form(),deepEqual(a.children().map(function(){return $(this).attr("id")}).get(),["order1-error","order2-error","order3-error","order4-error","order5-error","order6-error"],"labels in error container must be in document order")}),test("error containers, simple",function(){expect(14);var a=$("#simplecontainer"),b=$("#form").validate({errorLabelContainer:a,showErrors:function(){a.find("h3").html(jQuery.validator.format("There are {0} errors in your form.",this.size())),this.defaultShowErrors()}});b.prepareForm(),ok(b.valid(),"form is valid"),equal(0,a.find(".error:not(input)").length,"There should be no error labels"),equal("",a.find("h3").html()),b.prepareForm(),b.errorList=[{message:"bar",element:{name:"foo"}},{message:"necessary",element:{name:"required"}}],ok(!b.valid(),"form is not valid after adding errors manually"),b.showErrors(),equal(a.find(".error:not(input)").length,2,"There should be two error labels"),ok(a.is(":visible"),"Check that the container is visible"),a.find(".error:not(input)").each(function(){ok($(this).is(":visible"),"Check that each label is visible")}),equal("There are 2 errors in your form.",a.find("h3").html()),b.prepareForm(),ok(b.valid(),"form is valid after a reset"),b.showErrors(),equal(a.find(".error:not(input)").length,2,"There should still be two error labels"),ok(a.is(":hidden"),"Check that the container is hidden"),a.find(".error:not(input)").each(function(){ok($(this).is(":hidden"),"Check that each label is hidden")})}),test("error containers, with labelcontainer I",function(){expect(16);var a=$("#container"),b=$("#labelcontainer"),c=$("#form").validate({errorContainer:a,errorLabelContainer:b,wrapper:"li"});ok(c.valid(),"form is valid"),equal(0,a.find(".error:not(input)").length,"There should be no error labels in the container"),equal(0,b.find(".error:not(input)").length,"There should be no error labels in the labelcontainer"),equal(0,b.find("li").length,"There should be no lis labels in the labelcontainer"),c.errorList=[{message:"bar",element:{name:"foo"}},{name:"required",message:"necessary",element:{name:"required"}}],ok(!c.valid(),"form is not valid after adding errors manually"),c.showErrors(),equal(0,a.find(".error:not(input)").length,"There should be no error label in the container"),equal(2,b.find(".error:not(input)").length,"There should be two error labels in the labelcontainer"),equal(2,b.find("li").length,"There should be two error lis in the labelcontainer"),ok(a.is(":visible"),"Check that the container is visible"),ok(b.is(":visible"),"Check that the labelcontainer is visible"),b.find(".error:not(input)").each(function(){ok($(this).is(":visible"),"Check that each label is visible1"),equal("li",$(this).parent()[0].tagName.toLowerCase(),"Check that each label is wrapped in an li"),ok($(this).parent("li").is(":visible"),"Check that each parent li is visible")})}),test("errorcontainer, show/hide only on submit",function(){expect(14);var a=$("#container"),b=$("#labelcontainer"),c=$("#testForm1").bind("invalid-form.validate",function(){ok(!0,"invalid-form event triggered called")}).validate({errorContainer:a,errorLabelContainer:b,showErrors:function(){a.html(jQuery.validator.format("There are {0} errors in your form.",this.numberOfInvalids())),ok(!0,"showErrors called"),this.defaultShowErrors()}});equal("",a.html(),"must be empty"),equal("",b.html(),"must be empty"),ok(!c.form(),"invalid form"),equal(2,b.find(".error:not(input)").length),equal("There are 2 errors in your form.",a.html()),ok(b.is(":visible"),"must be visible"),ok(a.is(":visible"),"must be visible"),$("#firstname").val("hix").keyup(),$("#testForm1").triggerHandler("keyup",[jQuery.event.fix({type:"keyup",target:$("#firstname")[0]})]),equal(1,b.find(".error:visible").length),equal("There are 1 errors in your form.",a.html()),$("#lastname").val("abc"),ok(c.form(),"Form now valid, trigger showErrors but not invalid-form")}),test("test label used as error container",function(a){expect(8);var b=$("#testForm16"),c=$("#testForm16text");b.validate({errorPlacement:function(a,b){$("label[for='"+b.attr("id")+"']").append(a)},errorElement:"span"}),ok(!c.valid()),equal("Field Label",c.next("label").contents().first().text(),"container label isn't disrupted"),a.hasError(c,"missing"),ok(!c.attr("aria-describedby"),"field does not require aria-describedby attribute"),c.val("foo"),ok(c.valid()),equal("Field Label",c.next("label").contents().first().text(),"container label isn't disrupted"),ok(!c.attr("aria-describedby"),"field does not require aria-describedby attribute"),a.noErrorFor(c)}),test("test error placed adjacent to descriptive label",function(a){expect(8);var b=$("#testForm16"),c=$("#testForm16text");b.validate({errorElement:"span"}),ok(!c.valid()),equal(1,b.find("label").length),equal("Field Label",b.find("label").text(),"container label isn't disrupted"),a.hasError(c,"missing"),c.val("foo"),ok(c.valid()),equal(1,b.find("label").length),equal("Field Label",b.find("label").text(),"container label isn't disrupted"),a.noErrorFor(c)}),test("test descriptive label used alongside error label",function(a){expect(8);var b=$("#testForm16"),c=$("#testForm16text");b.validate({errorElement:"label"}),ok(!c.valid()),equal(1,b.find("label.title").length),equal("Field Label",b.find("label.title").text(),"container label isn't disrupted"),a.hasError(c,"missing"),c.val("foo"),ok(c.valid()),equal(1,b.find("label.title").length),equal("Field Label",b.find("label.title").text(),"container label isn't disrupted"),a.noErrorFor(c)}),test("test custom errorElement",function(a){expect(4);var b=$("#userForm"),c=$("#username");b.validate({messages:{username:"missing"},errorElement:"label"}),ok(!c.valid()),a.hasError(c,"missing","Field should have error 'missing'"),c.val("foo"),ok(c.valid()),a.noErrorFor(c,"Field should not have a visible error")}),test("test existing label used as error element",function(a){expect(4);var b=$("#testForm14"),c=$("#testForm14text");b.validate({errorElement:"label"}),ok(!c.valid()),a.hasError(c,"required"),c.val("foo"),ok(c.valid()),a.noErrorFor(c)}),test("test existing non-label used as error element",function(a){expect(4);var b=$("#testForm15"),c=$("#testForm15text");b.validate({errorElement:"span"}),ok(!c.valid()),a.hasError(c,"required"),c.val("foo"),ok(c.valid()),a.noErrorFor(c)}),test("test existing non-error aria-describedby",function(a){expect(8);var b=$("#testForm17"),c=$("#testForm17text");equal(c.attr("aria-describedby"),"testForm17text-description"),b.validate({errorElement:"span"}),ok(!c.valid()),equal(c.attr("aria-describedby"),"testForm17text-description testForm17text-error"),a.hasError(c,"required"),c.val("foo"),ok(c.valid()),a.noErrorFor(c),strictEqual("This is where you enter your data",$("#testForm17text-description").text()),strictEqual("",$("#testForm17text-error").text(),"Error label is empty for valid field")}),test("test pre-assigned non-error aria-describedby",function(a){expect(7);var b=$("#testForm17"),c=$("#testForm17text");c.attr("aria-describedby","testForm17text-description testForm17text-error"),b.validate({errorElement:"span"}),ok(!c.valid()),equal(c.attr("aria-describedby"),"testForm17text-description testForm17text-error"),a.hasError(c,"required"),c.val("foo"),ok(c.valid()),a.noErrorFor(c),strictEqual("This is where you enter your data",$("#testForm17text-description").text()),strictEqual("",$("#testForm17text-error").text(),"Error label is empty for valid field")}),test("test id/name containing brackets",function(a){var b=$("#testForm18"),c=$("#testForm18\\[text\\]");b.validate({errorElement:"span"}),b.valid(),c.valid(),a.hasError(c,"required")}),test("test id/name containing $",function(a){var b=$("#testForm19"),c=$("#testForm19\\$text");b.validate({errorElement:"span"}),c.valid(),a.hasError(c,"required")});