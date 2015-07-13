/*! ramp-theme-canada 13-07-2015 12:10:30 : v. 5.5.0-10 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
require(["dojo/parser","dojo/topic","dojo/request/script","dojo/request/xhr","dojo/number","dojo/dom","dojo/dom-construct","dojo/query","esri/config","esri/urlUtils","ramp/map","ramp/basemapSelector","ramp/maptips","ramp/datagrid","ramp/navigation","ramp/filterManager","ramp/imageExport","ramp/bookmarkLink","utils/url","ramp/featureHighlighter","ramp/globalStorage","ramp/gui","ramp/eventManager","ramp/advancedToolbar","ramp/geoSearch","ramp/theme","ramp/layerLoader","ramp/dataLoaderGui","ramp/metadataHandler","utils/util","utils/prototype!","utils/functionMangler!","dojo/domReady!"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D){"use strict";function E(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src=dojoConfig.fullPluginPath+a,b.appendChild(c)}function F(){function a(){var a,c,d=RAMP.map,f=g.create("div",{id:"scaleDiv","class":"esriScalebarLabel"});$(f).html("<span>"+i18n.t("map.scale")+'</span><br><span id="scaleLabel"><span/>'),a=e.format(d.getScale()),c="1 : "+a,g.place(f,h(".esriScalebarRuler")[0],"before"),g.empty("scaleLabel"),$("#scaleLabel").text(c),b.subscribe(w.BasemapSelector.BASEMAP_CHANGED,function(a){$(".esriScalebar > div").removeClass().addClass(a.cssStyle)})}function c(){p.init(),C.init(),RAMP.config.advancedToolbar.enabled&&x.init(),n.init(),D.tooltipster(),RAMP.startupLayers.forEach(function(a){A.loadLayer(a)})}b.subscribe(w.Map.INITIAL_BASEMAP_LOADED,function(){a(),D.subscribeAll([w.BasemapSelector.UI_COMPLETE,w.FilterManager.UI_COMPLETE],function(){r.subscribeAndUpdate(),q.init(),B.init()});var b=k.getMap().__LOD.level?k.getMap().__LOD.level:0;o.init(b),t.init(),m.init(),l.init(),RAMP.flags.brokenWebBrowser||RAMP.flags.ie10client?window.setTimeout(c,2e3):c()}),k.init(),y.init(),o.construct(),D.tooltipster($("#map-navigation"),null,null,"tooltipster-above"),D.tooltipster()}function G(a){var c,d=$("li.map-toolbar-item #advanced-toggle").parent(),e=document.getElementsByTagName("html")[0].className.indexOf("dj_ie9")>-1,f=document.getElementsByTagName("html")[0].className.indexOf("dj_ie10")>-1;u.init(a),u.defineProjections(window.proj4),i.defaults.io.proxyUrl=RAMP.config.proxyUrl,i.defaults.io.corsDetection=!e,e&&void 0!==RAMP.config.exportProxyUrl&&j.addProxyRule({proxyUrl:RAMP.config.exportProxyUrl,urlPrefix:RAMP.config.exportMapUrl}),RAMP.flags.brokenWebBrowser=e,RAMP.flags.ie10client=f,RAMP.config.advancedToolbar.enabled?d.removeClass("wb-invisible"):d.remove(),c=RAMP.config.plugins,c&&c.map(function(a){E(a)}),k.applyExtentDefaulting(),r.updateConfig(window.location.pathname.split("/").last()),b.subscribe(w.Map.EXTENTS_REPROJECTED,function(){b.subscribe(w.GUI.UPDATE_COMPLETE,function(){r.createUI(),A.init(),F()}),v.load(null,null,function(){})}),k.projectConfigExtents()}D.checkConsole(),a.parse();var H,I,J=$("html").attr("lang");"en"!==J&&"fr"!==J&&(J="en"),RAMP.locale=J,i18n.init({lng:J+"-CA",load:"current",fallbackLng:!1}),H="fr"===J?"config.fr.json":"config.en.json",I=d(H,{handleAs:"json"}),I.then(function(a){if(RAMP.configServiceURL){var b=new s(require.toUrl(document.location)),d=b.queryObject.keys;if(d&&""!==d){var e=RAMP.configServiceURL+"docs/"+$("html").attr("lang")+"/"+d,f=c.get(e,{jsonp:"callback",timeout:5e3});f.then(function(b){b.forEach(function(b){D.mergeRecursive(a,b)}),G(a)},function(a){})}else G(a)}else G(a)},function(a){})});