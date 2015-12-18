!function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A;return p=void 0,k=null,t="x",v="y",u="xy",g="left",m="right",q="up",d="down",i=10,h=40,c=["webkit","moz","ms","o",""],l=/\-?[0-9]+\.?[0-9]*/g,f="ontouchend"in a,n=f?"touchstart":"mousedown",j=f?"touchmove":"mousemove",e=f?"touchend":"mouseup",r=a.innerHeight,s=a.innerWidth,y=function(){},z=function(a,b){var d,e,f,g,h;for(h=[],f=0,g=c.length;g>f;f++)e=c[f],d=e?""+e+"Transition":"transition",h.push(a.style[d]=b);return h},A=function(a,b,d,e){var f,g,h,i,j;for(j=[],h=0,i=c.length;i>h;h++)g=c[h],f=g?""+g+"Transform":"transform",j.push(a.style[f]="translate3d("+(b||0)+"px, "+(d||0)+"px, "+(e||0)+"px)");return j},x=function(a){var b,d,e,f,g,h,i;for(g=[],d="",b="",h=0,i=c.length;i>h;h++)if(f=c[h],e=f?""+f+"Transform":"transform",d=a.style[e],d&&"string"==typeof d){b=d.match(/\((.*)\)/g)[0],g=b&&b.match(l);break}return g.length?{x:g[0]||0,y:g[1]||0,z:g[2]||0}:void 0},o=function(){function a(a,b){this.ele=a,this.direction=b,this._isPressed=!1,this.onStart=this.onMove=this.onEnd=y,this.coord=this.eventCoords=this.cacheCoords=this.finger=this.absFinger=k,this.orient=[],this.isSlider=!1,this.isWebapp=!1,this.duration="400"}var b,c;return c=[function(a){var b,c;return c=a.touches&&(a.touches.length?a.touches:[a]),b=a.changedTouches&&a.changedTouches[0]||a.originalEvent&&a.originalEvent.changedTouches&&a.originalEvent.changedTouches[0]||c[0].originalEvent||c[0],{x:b.clientX,y:b.clientY}},function(a){var b;return b=a,{x:b.clientX,y:b.clientY}}],b=f?c[0]:c[1],a.prototype.start=function(a){return(this.onStart=a)&&this},a.prototype.move=function(a){return(this.onMove=a)&&this},a.prototype.end=function(a){return(this.onEnd=a)&&this},a.prototype.setCoord=function(a){var b,c,d;c=this.coord={x:a[t]||0,y:a[v]||0},d=this.ele,A(d,c[t],c[v]);for(b in c)d.setAttribute(b,c[b]);return this},a.prototype.onTouchStart=function(a){var c;return this._isPressed=!0,this.eventCoords=b(a),this.cacheCoords=this.coord,this.finger=this.absFinger=k,this.isSlider&&this.onSliderStart(a),c=this.onStart.apply(this,[a])},a.prototype.onTouchMove=function(a){var c,e,f,j,k,l,n,o,p,r,s;if(a.preventDefault(),!this._isPressed)return!1;if(n=b(a),f=this.direction,l=this.finger={x:n.x-this.eventCoords.x,y:n.y-this.eventCoords.y},c=this.absFinger={x:Math.abs(l.x),y:Math.abs(l.y)},f!==u&&(o=f===t?v:t,c[f]<i||c[o]>h))return!1;if(p=[],c.x>i&&p.push(l.x<0?g:m),c.y>i&&p.push(l.y<0?q:d),this.orient=p,r=this.onMove.apply(this,[a]),r===!1)return!1;j=this.ele,k=this.coord={x:f.indexOf(t)<0?this.cacheCoords[t]:this.cacheCoords[t]-0+l.x,y:f.indexOf(v)<0?this.cacheCoords[v]:this.cacheCoords[v]-0+l.y},A(j,k[t],k[v]),s=[];for(e in k)s.push(j.setAttribute(e,k[e]));return s},a.prototype.onTouchEnd=function(a){var b,c;return this._isPressed=!1,b=this.ele,this.isSlider&&this.onSliderEnd(a),c=x(this.ele),c&&this.setCoord(c),this.orient=[]},a.prototype.onSliderStart=function(a){return z(this.ele,k)},a.prototype.onSliderEnd=function(a,b){var c,e,f,h,i,j,l,n,o,r,s,u,w,x,y,B;return null==b&&(b={}),s=b.jumpPage,i=s,u=this.orient.join(""),B=0,l=!1,w=this.page,x=this.pageNum,f=this.ele,e=this.duration,c=this.absFinger,o=u.indexOf(q)>-1,h=u.indexOf(d)>-1,j=u.indexOf(g)>-1,n=u.indexOf(m)>-1,r=this.direction===v,s!==p?w=s:r?(o&&w++,h&&w--):(j&&w++,n&&w--),w>=x&&(w=x-1,l=!0),0>w&&(w=0,l=!0),l!==!0||i||(e*=r?c[v]/this.pageHeight:c[t]/this.pageWidth),z(f,"all "+e+"ms ease-in"),r?(B="-"+w*this.pageHeight,A(f,0,B,0)):(B="-"+w*this.pageWidth,A(f,B,0,0)),this.page=w,i&&this.onTouchEnd.call(this,k),y=this.onEnd.apply(this,[a]),this},a.prototype.init=function(){var a,b,c,d,f,g,h;this.coord={x:0,y:0},h=this._onTouchStart=function(a){return function(b){return a.onTouchStart(b)}}(this),g=this._onTouchMove=function(a){return function(b){return a.onTouchMove(b)}}(this),f=this._onTouchEnd=function(a){return function(b){return a.onTouchEnd(b)}}(this),c=this.ele,c.addEventListener(n,h,!1),c.addEventListener(j,g,!1),c.addEventListener(e,f,!1),d=this.coord={x:0,y:0},b=this.direction,A(c,d[t],d[v]);for(a in d)c.setAttribute(a,d[a]);return this},a.prototype.destroy=function(){var a;return a=this.ele,a.removeEventListener(n,this._onTouchStart,!1),a.removeEventListener(j,this._onTouchMove,!1),a.removeEventListener(e,this._onTouchEnd,!1),this},a.prototype.slider=function(a){var b,c,d,e,f,h,i,j,k,l;if(f=this.ele,"string"==typeof a)a=f.querySelectorAll(a);else if(!a)for(a=[],c=f.childNodes,i=0,k=c.length;k>i;i++)b=c[i],1===b.nodeType&&a.push(b);if(this.isSlider=!0,this.page=0,this.elPages=a,e=a.length,h=this.pageNum=e?e:0,this.direction===t)for(j=0,l=a.length;l>j;j++)d=a[j],d.style.cssFloat=g;return this},a.prototype.webapp=function(a){var b,c;return this.isWebapp=!0,this.slider(a).fullscreen(),a=this.elPages,b=this.ele,c=this.pageNum,b.style.height=""+r*c+"px",this.height(r),this.direction===t&&this.width(s),this},a.prototype.height=function(a){var b,c,d,e,f,g;for(d=this.ele,c=this.elPages,e=this.pageNum,a=String(a).replace("px",""),"100%"===a&&(a=r),this.pageHeight=a,this.direction===t&&(d.style.height=""+a+"px"),f=0,g=c.length;g>f;f++)b=c[f],b.style.height=""+a+"px";return this},a.prototype.width=function(a){var b,c,d,e,f,g;for(d=this.ele,c=this.elPages,e=this.pageNum,a=String(a).replace("px",""),"100%"===a&&(a=s),this.pageWidth=a,this.direction===t&&(d.style.width=""+a*e+"px"),f=0,g=c.length;g>f;f++)b=c[f],b.style.width=""+a+"px";return this},a.prototype.fullscreen=function(){var a,b,c;for(b=this.ele,a=b;c=a.parentNode;)1===c.nodeType&&(c.style.height="100%",c.style.overflow="hidden"),a=c;return this},a.prototype.time=function(a){return this.duration=String(a).replace("ms",""),this},a.prototype.jump=function(a){return this.onSliderEnd(k,{jumpPage:a}),this},a}(),w=function(a,b){var c;return c=new o(a,b||t),c.init()},"function"==typeof define?define(function(a,b,c){return w}):a.Slip=w}(window,document);