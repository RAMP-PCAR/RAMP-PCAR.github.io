/*! ramp-gis-viewer 24-06-2014 */
require(["dojo/parser","dojo/on","dojo/request/script","dojo/request/xhr","ramp/map","ramp/basemapSelector","ramp/maptips","ramp/datagrid","ramp/navigation","ramp/filterManager","ramp/bookmarkLink","utils/url","ramp/featureHighlighter","ramp/ramp","ramp/globalStorage","ramp/gui","ramp/eventManager","themes/theme","utils/util","utils/prototype!","utils/functionMangler!"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){"use strict";function t(){e.init(),h.init(),b.once(e.getMap(),"update-end",function(){s.subscribeAll([q.BasemapSelector.UI_COMPLETE,q.FilterManager.UI_COMPLETE],function(){k.init(window.location.pathname.split("/").last())});var a=e.getMap().__LOD.level?e.getMap().__LOD.level:0;i.init(a),m.init(),g.init(),f.init(),j.init(),r.tooltipster()})}s.checkConsole(),a.parse(),esri.config.defaults.io.corsDetection=!1;var u,v,w=$("html").attr("lang");"en"!==w&&"fr"!==w&&(w="en"),u="fr"===w?"config.fr.txt":"config.en.txt",v=d(u,{handleAs:"json"}),v.then(function(a){o.config=a,p.load(null,null,function(){}),t(),n.loadStrings()},function(a){})});