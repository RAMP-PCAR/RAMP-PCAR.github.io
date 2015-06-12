/*! ramp-pcar 12-06-2015 14:06:41 : v. 5.5.0-4 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP 
 **/
define(["ramp/eventManager","dojo/Deferred","dojo/topic","dojo/text!./templates/filter_wms_meta_Template.json","utils/popupManager","utils/tmplHelper","utils/util"],function(a,b,c,d,e,f,g){"use strict";function h(){j=e.registerPopup($("#layerList"),"click",function(a){j.isOpen(null,"any")?(a.reject(),j.close(),i(this.target)):(i(this.target),a.resolve())},{closeHandler:function(a){a.resolve()},handleSelector:".metadata-button",openOnly:!0,activeClass:"button-pressed"})}function i(b){var e=$(b),h=e.parents("legend");if(h.hasClass("selected-row"))c.publish(a.GUI.SUBPANEL_CLOSE,{origin:"filterManager"});else{var i,k=e.data("layer-id"),l=RAMP.layerRegistry[k],m=l?l.ramp.config:null;if(c.publish(a.GUI.SUBPANEL_OPEN,{panelName:i18n.t("filterManager.metadata"),title:h.find(".layer-name span").text(),content:null,target:h.find(".layer-details"),origin:"filterManager",guid:k,doOnOpen:function(){h.addClass("selected-row")},doOnHide:function(){j.isOpen(null,"any")&&j.close(),h.removeClass("selected-row")}}),m.layerInfo)if(m.legend){var n;tmpl.cache={},tmpl.templates=JSON.parse(f.stringifyTemplate(d)),n=tmpl("wms_meta_main",{legendUrl:m.legend.imageUrl,getCapabilitiesUrl:m.url+"&request=GetCapabilities",serviceEndPointUrl:m.url}),c.publish(a.GUI.SUBPANEL_OPEN,{content:$(n),origin:"filterManager",update:!0,guid:k})}else c.publish(a.GUI.SUBPANEL_OPEN,{content:"<p>"+i18n.t("filterManager.metadataNotFound")+"</p><b>Service End Point URL</b><br><a href='"+m.url+"' tagget='_blank'>"+m.url+"</a>",origin:"filterManager",update:!0,guid:k});else{var o=function(){c.publish(a.GUI.SUBPANEL_OPEN,{content:"<p>"+i18n.t("filterManager.metadataNotFound")+"</p><h5>"+i18n.t("filterManager.serviceEndPointLabel")+"</h5><p><a href='"+m.url+"' tagget='_blank'>"+m.url+"</a></p>",origin:"filterManager",update:!0,guid:k})};i=m.metadataUrl;var p=null;m.catalogueUrl&&(p=[{key:"catalogue_url",value:m.catalogueUrl}]),i?g.transformXML(i,"assets/metadata/xstyle_default_"+RAMP.locale+".xsl",function(b,d){b?o():c.publish(a.GUI.SUBPANEL_OPEN,{content:$(d).append("<h5>"+i18n.t("filterManager.serviceEndPointLabel")+"</h5><p><a href='"+m.url+"' tagget='_blank'>"+m.url+"</a></p>"),origin:"filterManager",update:!0,guid:k})},null,p):o()}}}var j;return{init:function(){h()}}});