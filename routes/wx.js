
var settings = require('../settings');
var oAuth = require('wechat-oauth');
var client = new oAuth(settings.wx.app_id,settings.wx.app_secret);

module.exports =  client.getAuthorizeURLForWebsite('http://young.so/wechat/login');