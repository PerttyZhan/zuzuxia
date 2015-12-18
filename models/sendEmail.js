var nodemailer = require("nodemailer");
var settings = require('../settings');

var smtpTransport = nodemailer.createTransport("SMTP",{
    host:settings.sms.host,
    secureConnection:true,
    port:465,
    auth: {
        user: settings.sms.auth.user,
        pass: settings.sms.auth.pass
    }
});


function sendEmail(_to,random){
	
var _style = '<style type="text/css">a{text-decoration:none;color:#fff}.qmbox body{ margin:0 auto; padding:0; font-family:Microsoft Yahei,Tahoma,Arial; color:#333333;background-color:#fff; font-size:12px;}.qmbox a{color:#00a2ca; line-height:22px; text-decoration:none;}.qmbox a:hover{text-decoration:underline;color:#00a2ca;}.qmbox td{font-family:"Microsoft YaHei;}</style>';
var body = '<table width="800"  border="0"  align="center"  cellpadding="0"  cellspacing="0"  bgcolor="#ffffff"  style="font-family:&#39;Microsoft YaHei&#39;;"><tr><td><table width="800"  border="0"  align="center"  cellpadding="0"  cellspacing="0"  height="40"></table></td></tr><tr><td> <table width="800"  border="0"  align="center"  cellpadding="0"  cellspacing="0"  bgcolor="#00a1cc"  height="48"  style="font-family:&#39;Microsoft YaHei&#39;;"><tr><td width="800"  height="26"  border="0"  align="center"  valign="middle"  style="padding-left:20px;"><a>租租侠</a></td></tr></table></td></tr><tr><td><table width="800"  border="0"  align="left"  cellpadding="0"  cellspacing="0"  style=" border:1px solid #edecec; border-top:none; border-bottom:none; padding:0 20px;font-size:14px;color:#333333;"><tr><td width="760"  height="56"  border="0"  align="left"  colspan="2"  style=" font-size:16px;vertical-align:bottom;font-family:&#39;Microsoft YaHei&#39;;">尊敬的用户：</td></tr><tr><td width="760"  height="30"  border="0"  align="left"  colspan="2">&nbsp;</td></tr><tr><td width="720"  height="32"  border="0"  align="left"  valign="middle"  style=" width:720px; text-align:left;vertical-align:middle;line-height:32px;font-family:&#39;Microsoft YaHei&#39;;">您的校验码：'+random+'，工作人员不会索取，请勿泄漏。</td></tr><tr><td width="720"  height="32"  colspan="2"  style="padding-left:40px;">&nbsp;</td></tr><tr><td width="720"  height="32"  colspan="2"  style="padding-left:40px;">&nbsp;</td></tr><tr><td width="720"  height="32"  colspan="2"  style="padding-left:40px;">&nbsp;</td></tr><tr><td width="720"  height="14"  colspan="2"  style="padding-bottom:16px; border-bottom:1px dashed #e5e5e5;font-family:&#39;Microsoft YaHei&#39;;">青年颂</td></tr><tr><td width="720"  height="14"  colspan="2"  style="padding:8px 0 28px;color:#999999; font-size:12px;font-family:&#39;Microsoft YaHei&#39;;">此为系统邮件请勿回复</td></tr></table></td></tr></table>';
var _html = _style + body;
// setup e-mail data with unicode symbols
var mailOptions = {
        from: "zh@young.so", // sender address
        to: _to, // list of receivers
        subject: "青年颂邮箱验证码", // Subject line
        text: "", // plaintext body
        html: _html // html body
    }


	return {
		options:mailOptions,
		transport:smtpTransport
	};
	// // send mail with defined transport object
	// smtpTransport.sendMail(mailOptions, function(error, response){
	//     if(error){
	//         console.log(error);
	//     }else{
	//         console.log("Message sent: " + response.message);
	//     }

	//     // if you don't want to use this transport object anymore, uncomment following line
	//     smtpTransport.close(); // shut down the connection pool, no more messages
	// });
}


module.exports = sendEmail;
