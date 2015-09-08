/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */

$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#f1f1f1',
    particleRadius:7,
    lineWidth:1,
    curvedLines:false,
    parallax:true,
    proximity:200,
    density:20000
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });
});