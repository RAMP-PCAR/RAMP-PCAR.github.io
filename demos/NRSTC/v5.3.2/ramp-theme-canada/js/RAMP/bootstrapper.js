/*! ramp-theme-canada 21-05-2015 18:11:15 : v. 5.3.2 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
require(["dojo/parser","dojo/topic","dojo/request/script","dojo/request/xhr","dojo/number","dojo/dom","dojo/dom-construct","dojo/query","esri/config","esri/urlUtils","ramp/map","ramp/basemapSelector","ramp/maptips","ramp/datagrid","ramp/navigation","ramp/filterManager","ramp/imageExport","ramp/bookmarkLink","utils/url","ramp/featureHighlighter","ramp/ramp","ramp/globalStorage","ramp/gui","ramp/eventManager","ramp/advancedToolbar","ramp/geoSearch","ramp/theme","ramp/layerLoader","ramp/dataLoaderGui","ramp/dataLoader","ramp/stepItem","utils/util","utils/prototype!","utils/functionMangler!","dojo/domReady!"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F){"use strict";function G(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src=dojoConfig.fullPluginPath+a,b.appendChild(c)}function H(){function a(){var a,c,d=RAMP.map,f=g.create("div",{id:"scaleDiv","class":"esriScalebarLabel"});$(f).html("<span>"+i18n.t("map.scale")+"</span><br><span id='scaleLabel'><span/>"),a=e.format(d.getScale()),c="1 : "+a,g.place(f,h(".esriScalebarRuler")[0],"before"),g.empty("scaleLabel"),$("#scaleLabel").text(c),b.subscribe(x.BasemapSelector.BASEMAP_CHANGED,function(a){$(".esriScalebar > div").removeClass().addClass(a.cssStyle)})}function c(){p.init(),RAMP.config.advancedToolbar.enabled&&y.init(),n.init(),A.tooltipster(),RAMP.startupLayers.forEach(function(a){B.loadLayer(a)})}b.subscribe(x.Map.INITIAL_BASEMAP_LOADED,function(){a(),F.subscribeAll([x.BasemapSelector.UI_COMPLETE,x.FilterManager.UI_COMPLETE],function(){r.subscribeAndUpdate(),q.init(),C.init()});var b=k.getMap().__LOD.level?k.getMap().__LOD.level:0;o.init(b),t.init(),m.init(),l.init(),RAMP.flags.brokenWebBrowser||RAMP.flags.ie10client?window.setTimeout(c,2e3):c()}),k.init(),o.construct(),A.tooltipster()}function I(a){var c,d=$("li.map-toolbar-item #advanced-toggle").parent(),e=document.getElementsByTagName("html")[0].className.indexOf("dj_ie9")>-1,f=document.getElementsByTagName("html")[0].className.indexOf("dj_ie10")>-1;v.init(a),v.defineProjections(window.proj4),z.init(),i.defaults.io.proxyUrl=RAMP.config.proxyUrl,i.defaults.io.corsDetection=!e,e&&void 0!==RAMP.config.exportProxyUrl&&j.addProxyRule({proxyUrl:RAMP.config.exportProxyUrl,urlPrefix:RAMP.config.exportMapUrl}),RAMP.flags.brokenWebBrowser=e,RAMP.flags.ie10client=f,RAMP.config.advancedToolbar.enabled?d.removeClass("wb-invisible"):d.remove(),c=RAMP.config.plugins,c&&c.map(function(a){G(a)}),k.applyExtentDefaulting(),r.updateConfig(window.location.pathname.split("/").last()),b.subscribe(x.Map.EXTENTS_REPROJECTED,function(){b.subscribe(x.GUI.UPDATE_COMPLETE,function(){r.createUI(),B.init(),H()}),w.load(null,null,function(){}),u.loadStrings()}),k.projectConfigExtents()}F.checkConsole(),a.parse();var J,K,L=$("html").attr("lang");"en"!==L&&"fr"!==L&&(L="en"),RAMP.locale=L,i18n.init({lng:L+"-CA",load:"current",fallbackLng:!1}),J="fr"===L?"config.fr.json":"config.en.json",K=d(J,{handleAs:"json"}),K.then(function(a){if(RAMP.configServiceURL){var b=new s(require.toUrl(document.location)),d=b.queryObject.keys;if(d&&""!==d){var e=RAMP.configServiceURL+"docs/"+$("html").attr("lang")+"/"+d,f=c.get(e,{jsonp:"callback",timeout:5e3});f.then(function(b){b.forEach(function(b){F.mergeRecursive(a,b)}),I(a)},function(a){})}else I(a)}else I(a)},function(a){})});