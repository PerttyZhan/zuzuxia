$.validator.addMethod("accept",function(a,b,c){var d,e,f="string"==typeof c?c.replace(/\s/g,"").replace(/,/g,"|"):"image/*",g=this.optional(b);if(g)return g;if("file"===$(b).attr("type")&&(f=f.replace(/\*/g,".*"),b.files&&b.files.length))for(d=0;d<b.files.length;d++)if(e=b.files[d],!e.type.match(new RegExp("\\.?("+f+")$","i")))return!1;return!0},$.validator.format("Please enter a value with a valid mimetype."));