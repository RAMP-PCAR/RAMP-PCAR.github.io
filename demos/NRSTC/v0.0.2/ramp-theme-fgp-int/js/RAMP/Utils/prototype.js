/*! ramp-theme-fgp-int 26-05-2015 14:54:01 : v. 5.4.0-8 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["esri/geometry/Extent"],function(a){"use strict";function b(a,b,c){"function"!=typeof a.prototype[b]&&(a.prototype[b]=c)}function c(a,b,c){"function"!=typeof a[b]&&(a[b]=c)}function d(){b(Array,"remove",function(){for(var a,b,c=arguments,d=c.length;d&&this.length;)for(a=c[--d];-1!==(b=this.indexOf(a));)this.splice(b,1);return this}),b(Array,"append",function(a){this.push.apply(this,a)}),b(Array,"sum",function(){var a,b;for(a=0,b=0;a<this.length;++a)b+=this[a];return b}),b(Array,"isEmpty",function(){return 0===this.length}),b(Array,"last",function(){return this[this.length-1]}),b(Array,"contains",function(a){return this.indexOf(a)>-1}),c(Array,"flatten",function a(b){var c,d,e,f=[];for(c=0,d=b.length;d>c;c++)e=Object.prototype.toString.call(b[c]).split(" ").pop().split("]").shift().toLowerCase(),e&&(f=f.concat(/^(array|collection|arguments|object)$/.test(e)?a.call(b[c]):b[c]));return f}),c(Array,"max",function(a){return Math.max.apply(Math,a)}),c(Array,"min",function(a){return Math.min.apply(Math,a)})}function e(){c(Object,"create",function(a){function b(){}return b.prototype=a,new b})}function f(){c(String,"format",function(){var a,b,c=arguments[0];for(a=0;a<arguments.length-1;a++)b=new RegExp("\\{"+a+"\\}","gm"),c=c.replace(b,arguments[a+1]);return c}),b(String,"replaceAll",function(a,b){return this.toString().split(a).join(b)}),String.prototype.endsWith||Object.defineProperty(String.prototype,"endsWith",{value:function(a,b){var c=this.toString();(void 0===b||b>c.length)&&(b=c.length),b-=a.length;var d=c.indexOf(a,b);return-1!==d&&d===b}})}function g(){b(a,"clone",function(){return new a(this.xmin,this.ymin,this.xmax,this.ymax,this.spatialReference)}),b(a,"width",function(){return Math.abs(this.xmin-this.xmax)}),b(a,"height",function(){return Math.abs(this.ymin-this.ymax)}),b(a,"xyAspectFactor",function(){return this.width()/this.height()}),b(a,"centerX",function(){return(this.xmin+this.xmax)/2}),b(a,"centerY",function(){return(this.ymin+this.ymax)/2}),b(a,"center",function(){return{X:this.centerX,Y:this.centerY}}),b(a,"pan",function(b,c){var d=this.centerX()-b,e=this.centerY()-c;return new a(this.xmin-d,this.ymin-e,this.xmax-d,this.ymax-e,this.spatialReference)})}function h(){$.fn.findInputLabel=function(){return this.map(function(){return $(this).parent().find("label[for='"+this.id+"']")[0]})},$.fn.isOverflowed=function(){var a,b=$(this),c=b.clone().css({display:"inline",width:"auto",visibility:"hidden","font-size":b.css("font-size")}).appendTo("body");return a=c.width()>b.width()||b.width()>b.parent().width(),c.remove(),a},$.fn.forceStyle=function(a){var b=$(this);for(var c in a)a.hasOwnProperty(c)&&(b[0].style.cssText+=";"+c+":"+a[c]+" !important");return b}}return f(),e(),d(),g(),h(),{load:function(a,b,c){c()}}});