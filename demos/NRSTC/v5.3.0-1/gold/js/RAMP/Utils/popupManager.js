/*! ramp-pcar 08-05-2015 10:55:53 : v. 5.3.0-1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/Deferred","dojo/_base/lang","utils/util"],function(a,b,c){"use strict";function d(a){var b=Object.create(f,{_attr:{value:a}});return b._spawnPopups().forEach(function(a){a.useAria&&(a.handle.attr("aria-pressed",!1),a.handle[0]!==a.target[0]&&a.handle.attr("aria-haspopup",!0),a.setTargetAttr()),a.target.find(".button-close").on("click",function(){a.close(),a.resetFocusOnClose&&a.handle.focus()})}),b}var e={reverseEvent:null,openOnly:!1,handle:null,handleSelector:null,target:null,targetSelector:null,containerSelector:null,openHandler:null,closeHandler:null,timeout:0,activeClass:null,setClassBefore:!1,useAria:!0,resetFocusOnClose:!1},f={_attr:null,_getActualHandle:function(a){var b;return a?b=$(a):this._attr.handle&&(b=this._attr.handleSelector?this._attr.handle.find(this._attr.handleSelector):this._attr.handle),b},_spawnPopups:function(a){var c,d=[],e=this._getActualHandle(a);return e.each(b.hitch(this,function(a,e){e=$(e),c=this._attr.target?this._attr.targetSelector?this._attr.target.find(this._attr.targetSelector):this._attr.target:this._attr.containerSelector&&this._attr.targetSelector?e.parents(this._attr.containerSelector).find(this._attr.targetSelector):this._attr.targetSelector?e.find(this._attr.targetSelector):e,c.length>0&&d.push(b.mixin(Object.create(g),{openHandler:this._attr.openHandler,closeHandler:this._attr.closeHandler||this._attr.openHandler,activeClass:this._attr.activeClass,setClassBefore:this._attr.setClassBefore,useAria:this._attr.useAria,resetFocusOnClose:this._attr.resetFocusOnClose,handle:e,target:c}))})),d},isOpen:function(a,b){var c,d;switch(b=b||"all",d=this._spawnPopups(a),b){case"all":c=d.every(function(a){return a.isOpen()});break;case"any":c=d.some(function(a){return a.isOpen()})}return c},open:function(a){this._spawnPopups(a).forEach(function(a){a.open()})},close:function(a){this._spawnPopups(a).forEach(function(a){a.close()})},toggle:function(a,b){this._spawnPopups(a).forEach(function(a){a.toggle(b)})},setTargetAttr:function(a){this._spawnPopups().forEach(function(b){b.setTargetAttr(a)})}},g={_isAnimating:!1,openHandler:null,closeHandler:null,activeClass:null,setClassBefore:null,useAria:null,handle:null,target:null,isOpen:function(){return this.handle.hasClass(this.activeClass)},open:function(){this._performAction(this.openHandler,function(){this.handle.addClass(this.activeClass)},function(){this.setTargetAttr(!0)})},close:function(){this._performAction(this.closeHandler,function(){this.handle.removeClass(this.activeClass)},function(){this.setTargetAttr(!1)})},toggle:function(a){a="boolean"==typeof a?!a:this.isOpen(),a?this.close():this.open()},_performAction:function(b,c,d){var e=this;if($.isFunction(b)&&!this._isAnimating){var f=new a;f.then(function(){e._isAnimating=!1,e.setClassBefore||c.call(e),d.call(e)},function(){e._isAnimating=!1}),this._isAnimating=!0,this.setClassBefore&&c.call(this),b.call(this,f)}},setTargetAttr:function(a){a!==!0&&a!==!1&&(a=this.isOpen()),this.useAria&&(this.handle.attr("aria-pressed",a),this.handle[0]!==this.target[0]&&this.target.attr({"aria-expanded":a,"aria-hidden":!a}))}};return{registerPopup:function(a,f,g,h){var i,j;return f=f.split(",").map(function(a){return a.trim()}),j=b.mixin(Object.create(e),{activeClass:c.guid()},h,{handle:a,openHandler:g}),i=d(j),f.forEach(function(b){switch(b){case"hoverIntent":var d,e=function(a){window.clearTimeout(d),i.open(a.currentTarget)},f=function(a){var b=a?a.currentTarget:null;i.close(b)};c.executeOnLoad($(document),"hoverIntent",function(){i._attr.handle.hoverIntent({over:e,out:f,selector:i._attr.handleSelector,timeout:i._attr.timeout}).on("click focusin",i._attr.handleSelector,e).on("focusout",i._attr.handleSelector,function(){d=window.setTimeout(f,i._attr.timeout)})});break;case"hover":i._attr.handle.on("mouseenter",i._attr.handleSelector,function(a){i.open(a.currentTarget)}).on("mouseleave",i._attr.handleSelector,function(a){i.close(a.currentTarget)});break;case"focus":i._attr.handle.on("focusin",i._attr.handleSelector,function(a){i.open(a.currentTarget)}).on("focusout",i._attr.handleSelector,function(a){i.close(a.currentTarget)});break;default:i._attr.reverseEvent?a.on(b,i._attr.handleSelector,function(a){i.open(a.currentTarget)}).on(i._attr.reverseEvent,i._attr.handleSelector,function(a){i.close(a.currentTarget)}):i._attr.openOnly?a.on(b,i._attr.handleSelector,function(a){i.open(a.currentTarget)}):a.on(b,i._attr.handleSelector,function(a){i.toggle(a.currentTarget)})}}),i}}});