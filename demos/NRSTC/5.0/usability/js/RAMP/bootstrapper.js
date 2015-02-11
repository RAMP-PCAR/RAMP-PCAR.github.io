/*! ramp-theme-usability 11-02-2015 19:13:04 : v. 5.0.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
require(["dojo/parser","dojo/on","dojo/topic","dojo/request/script","dojo/request/xhr","dojo/_base/array","esri/config","ramp/map","ramp/basemapSelector","ramp/maptips","ramp/datagrid","ramp/navigation","ramp/filterManager","ramp/bookmarkLink","utils/url","ramp/featureHighlighter","ramp/ramp","ramp/globalStorage","ramp/gui","ramp/eventManager","ramp/advancedToolbar","ramp/theme","ramp/layerLoader","ramp/dataLoaderGui","ramp/dataLoader","utils/util","utils/prototype!","utils/functionMangler!"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z){"use strict";function A(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src=dojoConfig.fullPluginPath+a,b.appendChild(c)}function B(){c.subscribe(t.Map.INITIAL_BASEMAP_LOADED,function(){z.subscribeAll([t.BasemapSelector.UI_COMPLETE,t.FilterManager.UI_COMPLETE],function(){n.subscribeAndUpdate()});var a=h.getMap().__LOD.level?h.getMap().__LOD.level:0;l.init(a),p.init(),j.init(),i.init(),m.init(),x.init(),RAMP.config.advancedToolbar.enabled&&u.init(),k.init(),v.tooltipster(),f.forEach(RAMP.startupLayers,function(a){w.loadLayer(a)})}),h.init(),l.construct(),v.tooltipster()}function C(a){var b,d=$("li.map-toolbar-item #advanced-toggle").parent();r.init(a),r.defineProjections(window.proj4),g.defaults.io.proxyUrl=RAMP.config.proxyUrl,g.defaults.io.corsDetection=!0,RAMP.config.advancedToolbar.enabled?d.removeClass("wb-invisible"):d.remove(),b=RAMP.config.plugins,b&&f.map(b,function(a){A(a)}),h.applyExtentDefaulting(),n.updateConfig(window.location.pathname.split("/").last()),c.subscribe(t.Map.EXTENTS_REPROJECTED,function(){c.subscribe(t.GUI.UPDATE_COMPLETE,function(){n.createUI(),w.init(),B()}),s.load(null,null,function(){}),q.loadStrings()}),h.projectConfigExtents()}z.checkConsole(),a.parse();var D,E,F=$("html").attr("lang");"en"!==F&&"fr"!==F&&(F="en"),RAMP.locale=F,i18n.init({lng:F+"-CA",load:"current",fallbackLng:!1}),D="fr"===F?"config.fr.json":"config.en.json",E=e(D,{handleAs:"json"}),E.then(function(a){if(RAMP.configServiceURL){var b=new o(require.toUrl(document.location)),c=b.queryObject.keys;if(c&&""!==c){var e=RAMP.configServiceURL+"docs/"+$("html").attr("lang")+"/"+c,g=d.get(e,{jsonp:"callback",timeout:2e3});g.then(function(b){f.forEach(b,function(b){z.mergeRecursive(a,b)}),C(a)},function(a){})}else C(a)}else C(a)},function(a){})});