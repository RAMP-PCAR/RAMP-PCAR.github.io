/*! ramp-theme-canada 03-06-2015 18:50:11 : v. 5.4.0-rc1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/lang","dojo/topic","dojo/Deferred","esri/geometry/Extent","esri/graphic"],function(a,b,c,d,e){"use strict";function f(a){return function(b){var d=new FileReader,e=new c;d.onloadend=function(a){e.resolve(a.target.result)},d.onerror=function(a){e.reject(a.target.error)};try{d[a](b)}catch(f){e.reject(f)}return e.promise}}return{checkConsole:function(){for(var a,b=function(){},c=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],d=c.length,e=window.console=window.console||{};d--;)a=c[d],e[a]||(e[a]=b)},escapeHtml:function(a){return a.replaceAll("<","&lt;").replaceAll(">","&gt;")},isNumber:function(a){return isFinite(String(a).trim()||NaN)},parseBool:function(a){return"true"===a.toLowerCase()},afterAll:function(a,b,c){if(0===a.length)return void b();var d=0;a.forEach(function(e){e.then(function(){d++,d===a.length&&b.call(c)})})},arrayToQuery:function(a){return a.join("+")},queryToArray:function(a){return a.split("+")},subscribe:function(a,c,d){d?b.subscribe(a,c.call(d)):b.subscribe(a,c)},subscribeOnce:function(a,c){var d=null,e=function(a){d.remove(),c(a)};return d=b.subscribe(a,e)},subscribeOnceAny:function(a,b){function c(a){d.forEach(function(a){a.remove()}),b(a)}var d=[],e=this;a.forEach(function(a){d.push(e.subscribeOnce(a,c))})},subscribeAll:function(a,c){var d=[];a.forEach(function(a,e){d.push({fired:!1,args:null}),b.subscribe(a,function(){if(!d[e].fired&&(d[e].fired=!0,d[e].args=Array.prototype.slice.call(arguments),0===d.filter(function(a){return!a.fired}).length)){var a=d.map(function(a){return a.args});c(a)}})})},createLazyVariable:function(a){var b=null;return{reset:function(){b=null},get:function(){return null==b&&(b=a()),b}}},once:function(a){var b=!1;return function(){b||(a(),b=!0)}},isUndefined:function(a){return"undefined"==typeof a},compareGraphics:function(a,b){var c,d,e,f="0",g="1";return a&&b&&$.isFunction(a.getLayer)&&$.isFunction(b.getLayer)&&(d=a.getLayer(),e=b.getLayer(),c=d.objectIdField,f=d.sourceLayerId+a.attributes[c],g=e.sourceLayerId+b.attributes[c]),f===g},scrollbarWidth:function(){var a,b,c=jQuery('<div style="width: 100%; height:200px;">test</div>'),d=jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append(c),e=c[0],f=d[0];return jQuery("body").append(f),a=e.offsetWidth,d.css("overflow","scroll"),b=f.clientWidth,d.remove(),a-b},adjustWidthForSrollbar:function(a,b){var c=a.innerHeight()<a[0].scrollHeight?this.scrollbarWidth():0;b.forEach(function(a){a.css({right:c})})},executeOnLoad:function(a,b,d){var e,f=new c;f.then(function(){window.clearInterval(e),d()}),e=window.setInterval(function(){$.isFunction(a[b])&&f.resolve(!0)},500)},executeOnDone:function(a,b,d){function e(){d.cancel()}function f(){h--,0===h&&d.resolve(!0)}var g,h=0,i=[];d=d||new c;for(var j in a)a.hasOwnProperty(j)&&i.push(a[j]);h=i.length,i.forEach(function(a){g=new c(e),g.then(f),b(a,g)}),0===h&&d.resolve(!0)},guid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"===a?b:3&b|8;return c.toString(16)})},getWhereClause:function(a,b){return this.isNumber(b)?String.format("{0}={1}",a,b):String.format("Upper({0})=Upper('{1}')",a,b)},stripHtml:function(a){var b=document.createElement("DIV");return $(b).text(a),b.textContent||b.innerText||""},pointToExtent:function(a,b,c){var e=a.extent.getWidth()/a.width,f=c*e;return new d(b.x-f,b.y-f,b.x+f,b.y+f,a.spatialReference)},createGraphic:function(a){return new e({geometry:a,symbol:{color:[255,0,0,64],outline:{color:[240,128,128,255],width:1,type:"esriSLS",style:"esriSLSSolid"},type:"esriSFS",style:"esriSFSSolid"}})},endsWith:function(a,b){return-1!==a.indexOf(b,a.length-b.length)},mergeRecursive:function(){function a(a){if(null===a)return!1;if("object"!=typeof a)return!1;if(!("nodeName"in a))return!1;var b=a.nodeName;try{a.nodeName="is readonly?"}catch(c){return!0}return a.nodeName===b?!0:(a.nodeName=b,!1)}var b,c=function(b,d){if(a(d)||"object"!=typeof d||null===d)return b;for(var e in d)if(d.hasOwnProperty(e)){if($.isArray(d[e])){void 0===b[e]&&(b[e]=[]),$.merge(b[e],d[e]);continue}if(void 0===d[e])continue;"object"!=typeof d[e]||null===d[e]?b[e]=d[e]:"object"!=typeof b[e]||null===b[e]?b[e]=c(d[e].constructor===Array?[]:{},d[e]):c(b[e],d[e])}return b};if(b=arguments[0],"object"!=typeof b||null===b)return b;for(var d=1,e=arguments.length;e>d;d++)c(b,arguments[d]);return b},transformXML:function(a,b,d,e,f){function g(a,b){var c,d;if(window.ActiveXObject||window.hasOwnProperty("ActiveXObject")){var g,h=new ActiveXObject("Msxml2.XSLTemplate"),i=new ActiveXObject("Msxml2.DOMDocument"),j=new ActiveXObject("Msxml2.FreeThreadedDOMDocument");if(i.loadXML(a),j.loadXML(b),h.stylesheet=j,g=h.createProcessor(),g.input=i,f)for(d=0;d<f.length;d++)g.addParameter(f[d].key,f[d].value,"");g.transform(),c=g.output}else{var k=new XSLTProcessor;if(k.importStylesheet(b),f)for(d=0;d<f.length;d++)k.setParameter(null,f[d].key,f[d].value||"");c=k.transformToFragment(a,document),e||(c=$("body").append(c).children().last().detach())}return c}function h(a,b){a.endsWith(".xsl")?(l=b.responseText,p.resolve()):(k=b.responseText,o.resolve())}function i(a){var b=new window.XDomainRequest;b.open("GET",a),b.onload=function(){h(a,b)},b.ontimeout=function(){},b.onprogress=function(){},b.onerror=function(c){n=!0,h(a,b)},window.setTimeout(function(){b.send()},0)}function j(a){var b=new XMLHttpRequest;b.open("GET",a);try{b.responseType="msxml-document"}catch(c){}b.onreadystatechange=function(){4===b.readyState&&(200!==b.status&&(n=!0),h(a,b))},b.send("")}var k,l,m,n,o=new c,p=new c,q=[o,p],r=this;r.afterAll(q,function(){n||(m=g(k,l)),d(n,m)}),"withCredentials"in new XMLHttpRequest&&"ActiveXObject"in window?(j(a),j(b)):window.XDomainRequest?(i(a),j(b)):($.ajax({type:"GET",url:a,dataType:"xml",cache:!1,success:function(a){k=a,o.resolve()},error:function(){n=!0,o.resolve()}}),$.ajax({type:"GET",url:b,dataType:"xml",cache:!1,success:function(a){l=a,p.resolve()},error:function(){n=!0,p.resolve()}}))},readFileAsText:f("readAsText"),readFileAsBinary:f("readAsBinary"),readFileAsArrayBuffer:f("readAsArrayBuffer"),keyboardSortable:function(b,c){c=a.mixin({linkLists:!1,onStart:function(){},onUpdate:function(){},onStop:function(){}},c),b.each(function(a,d){function e(a,b,c){a.focus(),b.attr("aria-dropeffect","move"),c.attr("aria-grabbed","true").removeAttr("aria-dropeffect")}var f,g=$(d),h=g.find("> li"),i=!1;g.off("focusout",".sort-handle").off("keyup",".sort-handle"),g.on("focusout",".sort-handle",function(a){var b=$(this).closest("li");b.hasClass("list-item-grabbed")&&!i&&(h.removeAttr("aria-dropeffect"),b.removeClass("list-item-grabbed").attr({"aria-selected":!1,"aria-grabbed":!1}),f=!1,c.onStop.call(null,a,{item:null}))}).on("keyup",".sort-handle",function(d){var j=$(this).closest("li"),k=j[0].id,l=g.sortable("toArray"),m=l.indexOf(k);13===d.which||32===d.which?f?(h.removeAttr("aria-dropeffect"),j.attr("aria-grabbed","false").removeClass("list-item-grabbed"),c.onStop.call(null,d,{item:j}),f=!1):(h.attr("aria-dropeffect","move"),j.attr("aria-grabbed","true").removeAttr("aria-dropeffect").addClass("list-item-grabbed"),c.onStart.call(null,d,{item:j}),f=!0):38===d.which?f?m>0&&(i=!0,j.prev().before(j),e($(this),h,j),f=!0,m-=1,c.onUpdate.call(null,d,{item:j}),i=!1):(j=c.linkLists&&0===m&&0!==a?$(b[a-1]).find("> li:last"):j.prev(),j.find(":tabbable:first").focus()):40===d.which&&(f?m<h.length-1&&(i=!0,j.next().after(j),e($(this),h,j),f=!0,m+=1,c.onUpdate.call(null,d,{item:j}),i=!1):(j=c.linkLists&&m===h.length-1&&a<b.length-1?$(b[a+1]).find("> li:first"):j.next(),j.find(":tabbable:first").focus()))})})},resetTimelines:function(a,b){var c;a.forEach(function(a){c=a.timeLine.time(),a.timeLine.seek(0).clear(),a.generator.call(),b&&a.timeLine.seek(c)})},isSpatialRefEqual:function(a,b){return a.wkid&&b.wkid?a.wkid===b.wkid:a.wkt&&b.wkt?a.wkt===b.wkt:!1},containsInDom:function(a){return $.contains(document.documentElement,a)},styleBrowseFilesButton:function(a){function b(a){a.data.button.not(".disabled").addClass("btn-focus btn-hover")}function c(a){a.data.button.removeClass("btn-focus btn-hover btn-active")}function d(a){a.data.button.not(".disabled").addClass("btn-hover")}function e(a){a.data.button.removeClass("btn-hover btn-active")}function f(a){a.data.button.not(".disabled").addClass("btn-focus btn-hover btn-active")}function g(a){a.data.button.removeClass("btn-active")}var h,i;a.each(function(a,j){j=$(j),h=j.find("input[type='file']"),i=j.find(".browse-button"),h.on("focusin",{button:i},b).on("focusout",{button:i},c).on("mouseenter",{button:i},d).on("mouseleave",{button:i},e).on("mousedown",{button:i},f).on("mouseup",{button:i},g)})},detectDelimiter:function(a,b){var c,d=0,e=["|","^"],f={cell:[",",";","	","|","^"],line:["\r\n","\r","\n"]};return b="cell"!==b&&"line"!==b?"cell":b,f[b].forEach(function(b){var f,g=b;-1!==e.indexOf(b)&&(g="\\"+g),f=a.match(new RegExp(g,"g")),f&&f.length>d&&(d=f.length,c=b)}),c||f[b][0]},hexToRgb:function(a){var b=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;a=a.replace(b,function(a,b,c,d){return b+b+c+c+d+d});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return c?{r:parseInt(c[1],16),g:parseInt(c[2],16),b:parseInt(c[3],16)}:null},rgbToHex:function(a,b,c){return"#"+((1<<24)+(a<<16)+(b<<8)+c).toString(16).slice(1)},resetFormElement:function(a){a.wrap("<form>").closest("form").get(0).reset(),a.unwrap()},setSelectOptions:function(a,b,c){c||a.empty(),b.forEach(function(b){a.append($("<option/>",{value:b.value,text:b.text}))})},b64EncodeUnicode:function(a){return new Btoa(encodeURIComponent(a).replace(/%([0-9A-F]{2})/g,function(a,b){return String.fromCharCode("0x"+b)})).a},convertImageToCanvas:function(a){var b=document.createElement("canvas");return b.width=a.width,b.height=a.height,b.getContext("2d").drawImage(a,0,0),b},convertCanvasToDataURL:function(a,b){var c;return b=b||"image/png",c=a.toDataURL(b)}}});