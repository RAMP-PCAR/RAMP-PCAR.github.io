/*! ramp-pcar 05-05-2015 19:34:55 : v. 5.3.1-rc1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/declare","require","dojo/dom-construct","dojo/io-query","dojo/_base/lang","dojo/dom","dojo/_base/array","dojo/topic","dijit/form/TextBox","dijit/TitlePane","esri/geometry/Extent","ramp/globalStorage","ramp/map","ramp/eventManager","ramp/ramp","utils/url","utils/util","utils/dictionary","utils/array","utils/popupManager"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){"use strict";function u(a,b){null===b?ca[a]=null:ca[a]=d.objectToQuery(b)}function v(a,b){da[a]=b}function w(a){var b=String.format(_,i18n.t("bookmarkLink.emailUrlSubject"),i18n.t("bookmarkLink.emailUrlBody"),encodeURIComponent(a));F.val(a),M.attr("href",b)}function x(){var a=O,b="?";r.forEachEntry(ca,function(c,d){d&&(a+=b+d,"?"===b&&(b="&"))}),r.isEmpty(da)||(a+="&"),r.forEachEntry(da,function(b,c){a+="#"+c}),ba?F.is(":visible")&&(N.show(),jQuery.urlShortener({longUrl:a,success:function(a){w(a),N.hide()},error:function(a){N.hide()}})):w(a),y(a),h.publish(n.BookmarkLink.BOOKMARK_GENERATED,{link:a})}function y(a){var b=a.indexOf("?");if(!(0>=b)){var c=a.split("?")[1],d=$("#wb-lng").find("li a"),e=d.attr("href"),f=d.attr("lang"),g=RAMP.locale,h=new RegExp("rcs\\.([\\w-+=]+)\\.({0})".format(g),"g");c=c.replace(h,"rcs.$1.{0}".format(f)),e=e.split("?")[0]+"?"+c,d.attr("href",e)}}function z(a){var b,c=a.toString(),d=c.indexOf(".");return b="-"===c.substring(0,1)?7:6,b>d?c:c.substring(0,d)}function A(a){var b;ba=a===!0?!0:a===!1?!1:!ba,b=i18n.t(ba?"bookmarkLink.longLink":"bookmarkLink.shortLink"),L.text(b),x()}function B(a){var c,e=new p(b.toUrl(document.location));if(D=RAMP.config,O=e.uri,e.query=e.query.replace("#",Z.SELECT_TAB+"="),E=d.queryToObject(e.query),-1===O.indexOf(a)&&(O+=a),jQuery.urlShortener.settings.apiKey="AIzaSyB52ByjsXrOYlXxc2Q9GVpClLDwt0Lw6pc",E[Z.PANEL_VISIBLE]&&(c={pv:q.parseBool(E[Z.PANEL_VISIBLE])},u(V,c),RAMP.state.ui.sidePanelOpened=c.pv),E[Z.FULL_SCREEN]&&(c={fs:q.parseBool(E[Z.FULL_SCREEN])},u(T,c),RAMP.state.ui.fullscreen=c.fs),E[Z.WMS_QUERY]&&(c={wq:q.parseBool(E[Z.WMS_QUERY])},u(U,c),RAMP.state.ui.wmsQuery=c.wq),E[Z.XMIN]){c={xmin:parseFloat(E[Z.XMIN].replace(/,/g,"")),ymin:parseFloat(E[Z.YMIN].replace(/,/g,"")),xmax:parseFloat(E[Z.XMAX].replace(/,/g,"")),ymax:parseFloat(E[Z.YMAX].replace(/,/g,"")),sr:E[Z.SPATIAL_REF]},u(S,c);var f={xmin:c.xmin,ymin:c.ymin,xmax:c.xmax,ymax:c.ymax,spatialReference:JSON.parse(c.sr)};D.extents.defaultExtent=f}E[Z.BASEMAP]&&(c={bm:E[Z.BASEMAP]},u(X,c),D.initialBasemapIndex=parseInt(E[Z.BASEMAP])),E[Z.LAYER_TRANSPARENCY]&&(u(n.FilterManager.LAYER_TRANSPARENCY_CHANGED,{lt:E[Z.LAYER_TRANSPARENCY]}),r.forEachEntry(JSON.parse(E[Z.LAYER_TRANSPARENCY]),function(a,b){var c=s.find(D.layers.feature.concat(D.layers.wms),function(b){return b.id===a});c.settings.opacity["default"]=b})),E[Z.SELECT_TAB]&&v(W,E[Z.SELECT_TAB]);var g;E[Z.VISIBLE_LAYERS]&&(g=E[Z.VISIBLE_LAYERS].split("+"),g.forEach(function(a){var b=o.getLayerConfigWithId(a);null!==b&&(b.settings.visible=!0,ea[a]=!0)}),u(Y.FILTER.VISIBLE_LAYERS,{vl:E[Z.VISIBLE_LAYERS]})),E[Z.HIDDEN_LAYERS]&&(g=E[Z.HIDDEN_LAYERS].split("+"),g.forEach(function(a){var b=o.getLayerConfigWithId(a);null!==b&&(b.settings.visible=!1,ea[a]=!1)}),u(Y.FILTER.HIDDEN_LAYERS,{hl:E[Z.HIDDEN_LAYERS]})),E[Z.VISIBLE_BOXES]&&(g=E[Z.VISIBLE_BOXES].split("+"),g.forEach(function(a){var b=o.getLayerConfigWithId(a);null!==b&&(b.settings.boundingBoxVisible=!0,fa[a]=!0)}),u(Y.FILTER.VISIBLE_BOXES,{vb:E[Z.VISIBLE_BOXES]})),E[Z.HIDDEN_BOXES]&&(g=E[Z.HIDDEN_BOXES].split("+"),g.forEach(function(a){var b=o.getLayerConfigWithId(a);null!==b&&(b.settings.boundingBoxVisible=!1,fa[a]=!1)}),u(Y.FILTER.HIDDEN_BOXES,{hb:E[Z.HIDDEN_BOXES]}));var h,i,j=[];for(h in Z)Z.hasOwnProperty(h)&&j.push(Z[h]);for(h in E)E.hasOwnProperty(h)&&-1===j.indexOf(h)&&(i={},i[h]=E[h],u(h,i))}function C(a){var b=m.getMap().getLayer(a);return b?!b.ramp.user:!1}var D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S="extentChange",T="fullscreen",U="wmsQuery",V="panelChange",W="selectedTab",X="basemapChange",Y={FILTER:{VISIBLE_LAYERS:"visibleLayers",HIDDEN_LAYERS:"hiddenLayers",VISIBLE_BOXES:"visibleBoxes",HIDDEN_BOXES:"hiddenBoxes"}},Z={PANEL_VISIBLE:"pv",FULL_SCREEN:"fs",WMS_QUERY:"wq",XMIN:"xmin",YMIN:"ymin",XMAX:"xmax",YMAX:"ymax",SPATIAL_REF:"sr",BASEMAP:"bm",LAYER_TRANSPARENCY:"lt",SELECT_TAB:"st",VISIBLE_LAYERS:"vl",HIDDEN_LAYERS:"hl",VISIBLE_BOXES:"vb",HIDDEN_BOXES:"hb"},_="mailto:?subject={0}&body={1}%0D%0A%0D%0A{2}",aa="button-pressed",ba=!1,ca={},da={},ea={},fa={},ga={},ha={init:function(){N=$("#getlink-section .loadingAnimation"),M=$(".getlink-email-button"),H=$("#getlink-toggle"),I=$("#getlink-section-container"),J=$("#getlink-section"),F=$("#getlink-input").on("focus",function(){var a=$(this).one("mouseup.mouseupSelect",function(){return a.select(),!1}).one("mousedown",function(){a.off("mouseup.mouseupSelect")}).select()}),K=$(".getlink-shorten-button").on("click",A),L=K.find("span.on-right"),G=t.registerPopup(H,"click",function(a){h.publish(n.BookmarkLink.GETLINK_PANEL_CHANGED,{visible:!0}),h.publish(n.GUI.TOOLBAR_SECTION_OPEN,{id:"get-link-section"}),P=$("#panel-div > .wb-tabs"),Q=P.find(" > ul[role=tablist]"),R=P.find(" > .tabpanels"),Q.find("li a").click(function(){var a=$(this).attr("href").substr(1);R.find("details[id="+a+"]").each(function(){h.publish(n.GUI.TAB_SELECTED,{id:this.id,tabName:$(this).data("panel-name")})}),R.find("details[aria-expanded=true]").each(function(){h.publish(n.GUI.TAB_DESELECTED,{id:this.id,tabName:$(this).data("panel-name")})})}),q.subscribeOnce(n.GUI.TOOLBAR_SECTION_OPEN,e.hitch(this,function(){this.isOpen()&&this.close()})),I.slideDown("fast",function(){a.resolve()})},{activeClass:aa,target:I,closeHandler:function(a){h.publish(n.BookmarkLink.GETLINK_PANEL_CHANGED,{visible:!1}),h.publish(n.GUI.TOOLBAR_SECTION_CLOSE,{id:"get-link-section"}),I.slideUp("fast",function(){A(!1),a.resolve()})},resetFocusOnClose:!0})}};return{createUI:function(){ha.init()},updateConfig:B,subscribeAndUpdate:function(){h.subscribe(n.Map.EXTENT_CHANGE,function(a){u(S,{xmin:z(a.extent.xmin),ymin:z(a.extent.ymin),xmax:z(a.extent.xmax),ymax:z(a.extent.ymax),sr:JSON.stringify(a.extent.spatialReference)}),x()}),h.subscribe(n.GUI.FULLSCREEN_CHANGE,function(a){u(T,{fs:a.visible}),x()}),h.subscribe(n.FilterManager.WMS_QUERY_CHANGE,function(a){u(U,{wq:a.allowed}),x()}),h.subscribe(n.GUI.TAB_SELECTED,function(a){v(W,a.id.replace("-lnk","")),x()}),h.subscribe(n.GUI.PANEL_CHANGE,function(a){u(V,{pv:a.visible}),x()}),h.subscribe(n.BasemapSelector.BASEMAP_CHANGED,function(a){u(X,{bm:RAMP.basemapIndex[a.id]}),x()}),h.subscribe(n.FilterManager.LAYER_VISIBILITY_TOGGLED,function(a){var b=a.id;if(C(b)){ea[b]=a.state;var c=r.filter(ea,function(a,b){return b&&!o.getLayerConfigWithId(a).settings.visible}),d=r.filter(ea,function(a,b){return!b&&o.getLayerConfigWithId(a).settings.visible});u(Y.FILTER.HIDDEN_LAYERS,r.isEmpty(d)?null:{hl:Object.keys(d).join("+")}),u(Y.FILTER.VISIBLE_LAYERS,r.isEmpty(c)?null:{vl:Object.keys(c).join("+")}),x()}}),h.subscribe(n.FilterManager.BOX_VISIBILITY_TOGGLED,function(a){var b=a.id;if(C(b)){fa[b]=a.state;var c=r.filter(fa,function(a,b){return b&&!o.getLayerConfigWithId(a).settings.boundingBoxVisible}),d=r.filter(fa,function(a,b){return!b&&o.getLayerConfigWithId(a).settings.boundingBoxVisible});u(Y.FILTER.HIDDEN_BOXES,r.isEmpty(d)?null:{hb:Object.keys(d).join("+")}),u(Y.FILTER.VISIBLE_BOXES,r.isEmpty(c)?null:{vb:Object.keys(c).join("+")}),x()}}),h.subscribe(n.FilterManager.LAYER_TRANSPARENCY_CHANGED,function(a){C(a.layerId)&&(u(n.FilterManager.LAYER_TRANSPARENCY_CHANGED,a),ga[a.layerId]=Math.round(100*a.value)/100,u(n.FilterManager.LAYER_TRANSPARENCY_CHANGED,{lt:JSON.stringify(ga)}),x())}),x()}}});