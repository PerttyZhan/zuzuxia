module("messages"),test("predefined message not overwritten by addMethod(a, b, undefined)",function(){var a="my custom message";$.validator.messages.custom=a,$.validator.addMethod("custom",function(){}),deepEqual(a,$.validator.messages.custom),delete $.validator.messages.custom,delete $.validator.methods.custom}),test("group error messages",function(){$.validator.addClassRules({requiredDateRange:{required:!0,date:!0,dateRange:!0}}),$.validator.addMethod("dateRange",function(){return new Date($("#fromDate").val())<new Date($("#toDate").val())},"Please specify a correct date range.");var a=$("#dateRangeForm");a.validate({groups:{dateRange:"fromDate toDate"},errorPlacement:function(b){a.find(".errorContainer").append(b)}}),ok(!a.valid()),equal(1,a.find(".errorContainer *").length),equal("Please enter a valid date.",a.find(".errorContainer .error:not(input)").text()),$("#fromDate").val("12/03/2006"),$("#toDate").val("12/01/2006"),ok(!a.valid()),equal("Please specify a correct date range.",a.find(".errorContainer .error:not(input)").text()),$("#toDate").val("12/04/2006"),ok(a.valid()),ok(a.find(".errorContainer .error:not(input)").is(":hidden"))}),test("read messages from metadata",function(){var a,b,c=$("#testForm9");c.validate(),a=$("#testEmail9"),a.valid(),equal(c.find("#testEmail9").next(".error:not(input)").text(),"required"),a.val("bla").valid(),equal(c.find("#testEmail9").next(".error:not(input)").text(),"email"),b=$("#testGeneric9"),b.valid(),equal(c.find("#testGeneric9").next(".error:not(input)").text(),"generic"),b.val("bla").valid(),equal(c.find("#testGeneric9").next(".error:not(input)").text(),"email")}),test("read messages from metadata, with meta option specified, but no metadata in there",function(){var a=$("#testForm1clean");a.validate({meta:"validate",rules:{firstnamec:"required"}}),ok(!a.valid(),"not valid")});