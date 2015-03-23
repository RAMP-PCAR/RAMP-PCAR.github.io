/*! ramp-pcar 23-03-2015 15:06:48 : v. 5.2.0-rc1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/declare","require","dojo/dom-construct","dojo/io-query","dojo/_base/lang","dojo/dom","dojo/_base/array","dojo/topic","dijit/form/TextBox","dijit/TitlePane","esri/geometry/Extent","ramp/globalStorage","ramp/map","ramp/eventManager","ramp/ramp","utils/url","utils/util","utils/dictionary","utils/array","utils/popupManager"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){"use strict";function u(a,b){_[a]=null===b?null:d.objectToQuery(b)}function v(a,b){aa[a]=b}function w(a){var b=String.format(X,i18n.t("bookmarkLink.emailUrlSubject"),i18n.t("bookmarkLink.emailUrlBody"),encodeURIComponent(a));F.val(a),M.attr("href",b)}function x(){var a=O,b="?";r.forEachEntry(_,function(c,d){d&&(a+=b+d,"?"===b&&(b="&"))}),r.isEmpty(aa)||(a+="&"),r.forEachEntry(aa,function(b,c){a+="#"+c}),Z?F.is(":visible")&&(N.show(),jQuery.urlShortener({longUrl:a,success:function(a){w(a),N.hide()},error:function(a){N.hide()}})):w(a),y(a),h.publish(n.BookmarkLink.BOOKMARK_GENERATED,{link:a})}function y(a){var b=a.indexOf("?");if(!(0>=b)){var c=a.split("?")[1],d=$("#wb-lng").find("li a"),e=d.attr("href");e=e.split("?")[0]+"?"+c,d.attr("href",e)}}function z(a){var b,c=a.toString(),d=c.indexOf(".");return b="-"===c.substring(0,1)?7:6,b>d?c:c.substring(0,d)}function A(a){var b;Z=a===!0?!0:a===!1?!1:!Z,b=i18n.t(Z?"bookmarkLink.longLink":"bookmarkLink.shortLink"),L.text(b),x()}function B(a){var c,e=new p(b.toUrl(document.location));if(D=RAMP.config,O=e.uri,E=d.queryToObject(e.query),-1===O.indexOf(a)&&(O+=a),jQuery.urlShortener.settings.apiKey="AIzaSyB52ByjsXrOYlXxc2Q9GVpClLDwt0Lw6pc",E[W.PANEL_VISIBLE]&&(c={pv:q.parseBool(E[W.PANEL_VISIBLE])},u(S,c),RAMP.state.ui.sidePanelOpened=c.pv),E[W.FULL_SCREEN]&&(c={fs:q.parseBool(E[W.FULL_SCREEN])},u(Q,c),RAMP.state.ui.fullscreen=c.fs),E[W.WMS_QUERY]&&(c={wq:q.parseBool(E[W.WMS_QUERY])},u(R,c),RAMP.state.ui.wmsQuery=c.wq),E[W.XMIN]){c={xmin:parseFloat(E[W.XMIN].replace(/,/g,"")),ymin:parseFloat(E[W.YMIN].replace(/,/g,"")),xmax:parseFloat(E[W.XMAX].replace(/,/g,"")),ymax:parseFloat(E[W.YMAX].replace(/,/g,"")),sr:E[W.SPATIAL_REF]},u(P,c);var f={xmin:c.xmin,ymin:c.ymin,xmax:c.xmax,ymax:c.ymax,spatialReference:JSON.parse(c.sr)};D.extents.defaultExtent=f}E[W.BASEMAP]&&(c={bm:E[W.BASEMAP]},u(U,c),D.initialBasemapIndex=parseInt(E[W.BASEMAP])),E[W.LAYER_TRANSPARENCY]&&(u(n.FilterManager.LAYER_TRANSPARENCY_CHANGED,{lt:E[W.LAYER_TRANSPARENCY]}),r.forEachEntry(JSON.parse(E[W.LAYER_TRANSPARENCY]),function(a,b){var c=s.find(D.layers.feature.concat(D.layers.wms),function(b){return b.id===a});c.settings.opacity["default"]=b})),E[W.SELECT_TAB]&&u(T,{index:E[W.SELECT_TAB]});var g;E[W.VISIBLE_LAYERS]&&(g=E[W.VISIBLE_LAYERS].split("+"),g.forEach(function(a){var b=o.getLayerConfigWithId(a);null!==b&&(b.settings.visible=!0,ba[a]=!0)}),u(V.FILTER.VISIBLE_LAYERS,{vl:E[W.VISIBLE_LAYERS]})),E[W.HIDDEN_LAYERS]&&(g=E[W.HIDDEN_LAYERS].split("+"),g.forEach(function(a){var b=o.getLayerConfigWithId(a);null!==b&&(b.settings.visible=!1,ba[a]=!1)}),u(V.FILTER.HIDDEN_LAYERS,{hl:E[W.HIDDEN_LAYERS]})),E[W.VISIBLE_BOXES]&&(g=E[W.VISIBLE_BOXES].split("+"),g.forEach(function(a){var b=o.getLayerConfigWithId(a);null!==b&&(b.settings.boundingBoxVisible=!0,ca[a]=!0)}),u(V.FILTER.VISIBLE_BOXES,{vb:E[W.VISIBLE_BOXES]})),E[W.HIDDEN_BOXES]&&(g=E[W.HIDDEN_BOXES].split("+"),g.forEach(function(a){var b=o.getLayerConfigWithId(a);null!==b&&(b.settings.boundingBoxVisible=!1,ca[a]=!1)}),u(V.FILTER.HIDDEN_BOXES,{hb:E[W.HIDDEN_BOXES]}));var h,i,j=[];for(h in W)W.hasOwnProperty(h)&&j.push(W[h]);for(h in E)E.hasOwnProperty(h)&&-1===j.indexOf(h)&&(i={},i[h]=E[h],u(h,i))}function C(a){var b=m.getMap().getLayer(a);return q.isUndefined(b)?!1:b.ramp.user?!1:!0}var D,E,F,G,H,I,J,K,L,M,N,O,P="extentChange",Q="fullscreen",R="wmsQuery",S="panelChange",T="selectedTab",U="basemapChange",V={FILTER:{VISIBLE_LAYERS:"visibleLayers",HIDDEN_LAYERS:"hiddenLayers",VISIBLE_BOXES:"visibleBoxes",HIDDEN_BOXES:"hiddenBoxes"}},W={PANEL_VISIBLE:"pv",FULL_SCREEN:"fs",WMS_QUERY:"wq",XMIN:"xmin",YMIN:"ymin",XMAX:"xmax",YMAX:"ymax",SPATIAL_REF:"sr",BASEMAP:"bm",LAYER_TRANSPARENCY:"lt",SELECT_TAB:"st",VISIBLE_LAYERS:"vl",HIDDEN_LAYERS:"hl",VISIBLE_BOXES:"vb",HIDDEN_BOXES:"hb"},X="mailto:?subject={0}&body={1}%0D%0A%0D%0A{2}",Y="button-pressed",Z=!1,_={},aa={},ba={},ca={},da={},ea={init:function(){N=$("#getlink-section .loadingAnimation"),M=$(".getlink-email-button"),H=$("#getlink-toggle"),I=$("#getlink-section-container"),J=$("#getlink-section"),F=$("#getlink-input").on("focus",function(){var a=$(this).one("mouseup.mouseupSelect",function(){return a.select(),!1}).one("mousedown",function(){a.off("mouseup.mouseupSelect")}).select()}),K=$(".getlink-shorten-button").on("click",A),L=K.find("span.on-right"),G=t.registerPopup(H,"click",function(a){h.publish(n.BookmarkLink.GETLINK_PANEL_CHANGED,{visible:!0}),h.publish(n.GUI.TOOLBAR_SECTION_OPEN,{id:"get-link-section"}),q.subscribeOnce(n.GUI.TOOLBAR_SECTION_OPEN,e.hitch(this,function(){this.isOpen()&&this.close()})),I.slideDown("fast",function(){a.resolve()})},{activeClass:Y,target:I,closeHandler:function(a){h.publish(n.BookmarkLink.GETLINK_PANEL_CHANGED,{visible:!1}),h.publish(n.GUI.TOOLBAR_SECTION_CLOSE,{id:"get-link-section"}),I.slideUp("fast",function(){A(!1),a.resolve()})},resetFocusOnClose:!0})}};return{createUI:function(){ea.init()},updateConfig:B,subscribeAndUpdate:function(){h.subscribe(n.Map.EXTENT_CHANGE,function(a){u(P,{xmin:z(a.extent.xmin),ymin:z(a.extent.ymin),xmax:z(a.extent.xmax),ymax:z(a.extent.ymax),sr:JSON.stringify(a.extent.spatialReference)}),x()}),h.subscribe(n.GUI.FULLSCREEN_CHANGE,function(a){u(Q,{fs:a.visible}),x()}),h.subscribe(n.FilterManager.WMS_QUERY_CHANGE,function(a){u(R,{wq:a.allowed}),x()}),h.subscribe(n.GUI.TAB_SELECTED,function(a){v(T,a.id.replace("-link","")),x()}),h.subscribe(n.GUI.PANEL_CHANGE,function(a){u(S,{pv:a.visible}),x()}),h.subscribe(n.BasemapSelector.BASEMAP_CHANGED,function(a){u(U,{bm:RAMP.basemapIndex[a.id]}),x()}),h.subscribe(n.FilterManager.LAYER_VISIBILITY_TOGGLED,function(a){var b=a.id;if(C(b)){ba[b]=a.state;var c=r.filter(ba,function(a,b){return b&&!o.getLayerConfigWithId(a).settings.visible}),d=r.filter(ba,function(a,b){return!b&&o.getLayerConfigWithId(a).settings.visible});u(V.FILTER.HIDDEN_LAYERS,r.isEmpty(d)?null:{hl:Object.keys(d).join("+")}),u(V.FILTER.VISIBLE_LAYERS,r.isEmpty(c)?null:{vl:Object.keys(c).join("+")}),x()}}),h.subscribe(n.FilterManager.BOX_VISIBILITY_TOGGLED,function(a){var b=a.id;if(C(b)){ca[b]=a.state;var c=r.filter(ca,function(a,b){return b&&!o.getLayerConfigWithId(a).settings.boundingBoxVisible}),d=r.filter(ca,function(a,b){return!b&&o.getLayerConfigWithId(a).settings.boundingBoxVisible});u(V.FILTER.HIDDEN_BOXES,r.isEmpty(d)?null:{hb:Object.keys(d).join("+")}),u(V.FILTER.VISIBLE_BOXES,r.isEmpty(c)?null:{vb:Object.keys(c).join("+")}),x()}}),h.subscribe(n.FilterManager.LAYER_TRANSPARENCY_CHANGED,function(a){C(a.layerId)&&(u(n.FilterManager.LAYER_TRANSPARENCY_CHANGED,a),da[a.layerId]=Math.round(100*a.value)/100,u(n.FilterManager.LAYER_TRANSPARENCY_CHANGED,{lt:JSON.stringify(da)}),x())}),x()}}});