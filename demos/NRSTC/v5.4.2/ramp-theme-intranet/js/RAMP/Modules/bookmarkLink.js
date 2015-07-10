/*! ramp-theme-intranet 10-07-2015 15:01:17 : v. 5.4.2 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["require","dojo/io-query","dojo/_base/lang","dojo/topic","ramp/globalStorage","ramp/map","ramp/eventManager","ramp/layerLoader","utils/url","utils/util","utils/dictionary","utils/array","utils/popupManager"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){"use strict";function n(a,c){null===c?W[a]=null:W[a]=b.objectToQuery(c)}function o(a,b){X[a]=b}function p(a){var b=String.format(T,i18n.t("bookmarkLink.emailUrlSubject"),encodeURIComponent(a));y.val(a),F.attr("href",b)}function q(){var a=H,b="?";k.forEachEntry(W,function(c,d){d&&(a+=b+d,"?"===b&&(b="&"))}),k.isEmpty(X)||(a+="&"),k.forEachEntry(X,function(b,c){a+="#"+c}),V?y.is(":visible")&&(G.show(),jQuery.urlShortener({longUrl:a,success:function(a){p(a),G.hide()},error:function(a){G.hide()}})):p(a),r(a),d.publish(g.BookmarkLink.BOOKMARK_GENERATED,{link:a})}function r(a){var b=a.indexOf("?");if(!(0>=b)){var c=a.split("?")[1],d=$("#wb-lng").find("li a"),e=d.attr("href"),f=d.attr("lang"),g=RAMP.locale,h=new RegExp("rcs\\.([\\w-+=]+)\\.({0})".format(g),"g");c=c.replace(h,"rcs.$1.{0}".format(f)),e=e.split("?")[0]+"?"+c,d.attr("href",e)}}function s(a){var b,c=a.toString(),d=c.indexOf(".");return b="-"===c.substring(0,1)?7:6,b>d?c:c.substring(0,d)}function t(a){var b;V=a===!0?!0:a===!1?!1:!V,b=V?i18n.t("bookmarkLink.longLink"):i18n.t("bookmarkLink.shortLink"),E.text(b),q()}function u(c){var d,e=new i(a.toUrl(document.location));if(w=RAMP.config,H=e.uri,e.query=e.query.replace("#",S.SELECT_TAB+"="),x=b.queryToObject(e.query),-1===H.indexOf(c)&&(H+=c),jQuery.urlShortener.settings.apiKey="AIzaSyB52ByjsXrOYlXxc2Q9GVpClLDwt0Lw6pc",x[S.PANEL_VISIBLE]&&(d={pv:j.parseBool(x[S.PANEL_VISIBLE])},n(O,d),RAMP.state.ui.sidePanelOpened=d.pv),x[S.FULL_SCREEN]&&(d={fs:j.parseBool(x[S.FULL_SCREEN])},n(M,d),RAMP.state.ui.fullscreen=d.fs),x[S.WMS_QUERY]&&(d={wq:j.parseBool(x[S.WMS_QUERY])},n(N,d),RAMP.state.ui.wmsQuery=d.wq),x[S.XMIN]){d={xmin:parseFloat(x[S.XMIN].replace(/,/g,"")),ymin:parseFloat(x[S.YMIN].replace(/,/g,"")),xmax:parseFloat(x[S.XMAX].replace(/,/g,"")),ymax:parseFloat(x[S.YMAX].replace(/,/g,"")),sr:x[S.SPATIAL_REF]},n(L,d);var f={xmin:d.xmin,ymin:d.ymin,xmax:d.xmax,ymax:d.ymax,spatialReference:JSON.parse(d.sr)};w.extents.defaultExtent=f}x[S.BASEMAP]&&(d={bm:x[S.BASEMAP]},n(Q,d),w.initialBasemapIndex=parseInt(x[S.BASEMAP])),x[S.LAYER_TRANSPARENCY]&&(n(g.FilterManager.LAYER_TRANSPARENCY_CHANGED,{lt:x[S.LAYER_TRANSPARENCY]}),k.forEachEntry(JSON.parse(x[S.LAYER_TRANSPARENCY]),function(a,b){var c=l.find(w.layers.feature.concat(w.layers.wms),function(b){return b.id===a});c.settings.opacity["default"]=b})),x[S.SELECT_TAB]&&o(P,x[S.SELECT_TAB]);var m;x[S.VISIBLE_LAYERS]&&(m=x[S.VISIBLE_LAYERS].split("+"),m.forEach(function(a){var b=h.getLayerConfig(a);null!==b&&(b.settings.visible=!0,Y[a]=!0)}),n(R.FILTER.VISIBLE_LAYERS,{vl:x[S.VISIBLE_LAYERS]})),x[S.HIDDEN_LAYERS]&&(m=x[S.HIDDEN_LAYERS].split("+"),m.forEach(function(a){var b=h.getLayerConfig(a);null!==b&&(b.settings.visible=!1,Y[a]=!1)}),n(R.FILTER.HIDDEN_LAYERS,{hl:x[S.HIDDEN_LAYERS]})),x[S.VISIBLE_BOXES]&&(m=x[S.VISIBLE_BOXES].split("+"),m.forEach(function(a){var b=h.getLayerConfig(a);null!==b&&(b.settings.boundingBoxVisible=!0,Z[a]=!0)}),n(R.FILTER.VISIBLE_BOXES,{vb:x[S.VISIBLE_BOXES]})),x[S.HIDDEN_BOXES]&&(m=x[S.HIDDEN_BOXES].split("+"),m.forEach(function(a){var b=h.getLayerConfig(a);null!==b&&(b.settings.boundingBoxVisible=!1,Z[a]=!1)}),n(R.FILTER.HIDDEN_BOXES,{hb:x[S.HIDDEN_BOXES]}));var p,q,r=[];for(p in S)S.hasOwnProperty(p)&&r.push(S[p]);for(p in x)x.hasOwnProperty(p)&&-1===r.indexOf(p)&&(q={},q[p]=x[p],n(p,q))}function v(a){var b=f.getMap().getLayer(a);return b?!b.ramp.user:!1}var w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L="extentChange",M="fullscreen",N="wmsQuery",O="panelChange",P="selectedTab",Q="basemapChange",R={FILTER:{VISIBLE_LAYERS:"visibleLayers",HIDDEN_LAYERS:"hiddenLayers",VISIBLE_BOXES:"visibleBoxes",HIDDEN_BOXES:"hiddenBoxes"}},S={PANEL_VISIBLE:"pv",FULL_SCREEN:"fs",WMS_QUERY:"wq",XMIN:"xmin",YMIN:"ymin",XMAX:"xmax",YMAX:"ymax",SPATIAL_REF:"sr",BASEMAP:"bm",LAYER_TRANSPARENCY:"lt",SELECT_TAB:"st",VISIBLE_LAYERS:"vl",HIDDEN_LAYERS:"hl",VISIBLE_BOXES:"vb",HIDDEN_BOXES:"hb"},T="mailto:?subject={0}&body={1}",U="button-pressed",V=!1,W={},X={},Y={},Z={},_={},aa={init:function(){G=$("#getlink-section .loadingAnimation"),F=$(".getlink-email-button"),A=$("#getlink-toggle"),B=$("#getlink-section-container"),C=$("#getlink-section"),y=$("#getlink-input").on("focus",function(){var a=$(this).one("mouseup.mouseupSelect",function(){return a.select(),!1}).one("mousedown",function(){a.off("mouseup.mouseupSelect")}).select()}),D=$(".getlink-shorten-button").on("click",t),E=D.find("span.on-right"),z=m.registerPopup(A,"click",function(a){d.publish(g.BookmarkLink.GETLINK_PANEL_CHANGED,{visible:!0}),d.publish(g.GUI.TOOLBAR_SECTION_OPEN,{id:"get-link-section"}),I=$("#panel-div > .wb-tabs"),J=I.find(" > ul[role=tablist]"),K=I.find(" > .tabpanels"),J.find("li a").click(function(){var a=$(this).attr("href").substr(1);K.find("details[id="+a+"]").each(function(){d.publish(g.GUI.TAB_SELECTED,{id:this.id,tabName:$(this).data("panel-name")})}),K.find("details[aria-expanded=true]").each(function(){d.publish(g.GUI.TAB_DESELECTED,{id:this.id,tabName:$(this).data("panel-name")})})});var b=this;j.subscribeOnce(g.GUI.TOOLBAR_SECTION_OPEN,function(){b.isOpen()&&b.close()}),B.slideDown("fast",function(){a.resolve()})},{activeClass:U,target:B,closeHandler:function(a){d.publish(g.BookmarkLink.GETLINK_PANEL_CHANGED,{visible:!1}),d.publish(g.GUI.TOOLBAR_SECTION_CLOSE,{id:"get-link-section"}),B.slideUp("fast",function(){t(!1),a.resolve()})},resetFocusOnClose:!0})}};return{createUI:function(){aa.init()},updateConfig:u,subscribeAndUpdate:function(){d.subscribe(g.Map.EXTENT_CHANGE,function(a){n(L,{xmin:s(a.extent.xmin),ymin:s(a.extent.ymin),xmax:s(a.extent.xmax),ymax:s(a.extent.ymax),sr:JSON.stringify(a.extent.spatialReference)}),q()}),d.subscribe(g.GUI.FULLSCREEN_CHANGE,function(a){n(M,{fs:a.visible}),q()}),d.subscribe(g.FilterManager.WMS_QUERY_CHANGE,function(a){n(N,{wq:a.allowed}),q()}),d.subscribe(g.GUI.TAB_SELECTED,function(a){o(P,a.id.replace("-lnk","")),q()}),d.subscribe(g.GUI.PANEL_CHANGE,function(a){n(O,{pv:a.visible}),q()}),d.subscribe(g.BasemapSelector.BASEMAP_CHANGED,function(a){n(Q,{bm:RAMP.basemapIndex[a.id]}),q()}),d.subscribe(g.FilterManager.LAYER_VISIBILITY_TOGGLED,function(a){var b=a.id;if(v(b)){Y[b]=a.state;var c=k.filter(Y,function(a,b){return b&&!h.getLayerConfig(a).settings.visible}),d=k.filter(Y,function(a,b){return!b&&h.getLayerConfig(a).settings.visible});n(R.FILTER.HIDDEN_LAYERS,k.isEmpty(d)?null:{hl:Object.keys(d).join("+")}),n(R.FILTER.VISIBLE_LAYERS,k.isEmpty(c)?null:{vl:Object.keys(c).join("+")}),q()}}),d.subscribe(g.FilterManager.BOX_VISIBILITY_TOGGLED,function(a){var b=a.id;if(v(b)){Z[b]=a.state;var c=k.filter(Z,function(a,b){return b&&!h.getLayerConfig(a).settings.boundingBoxVisible}),d=k.filter(Z,function(a,b){return!b&&h.getLayerConfig(a).settings.boundingBoxVisible});n(R.FILTER.HIDDEN_BOXES,k.isEmpty(d)?null:{hb:Object.keys(d).join("+")}),n(R.FILTER.VISIBLE_BOXES,k.isEmpty(c)?null:{vb:Object.keys(c).join("+")}),q()}}),d.subscribe(g.FilterManager.LAYER_TRANSPARENCY_CHANGED,function(a){v(a.layerId)&&(n(g.FilterManager.LAYER_TRANSPARENCY_CHANGED,a),_[a.layerId]=Math.round(100*a.value)/100,n(g.FilterManager.LAYER_TRANSPARENCY_CHANGED,{lt:JSON.stringify(_)}),q())}),d.subscribe(g.LayerLoader.LAYER_REMOVED,function(a){var b;b="undefined"==typeof a.layerId?a.layer.id:a.layerId,delete _[b],delete Y[b]}),q()}}});