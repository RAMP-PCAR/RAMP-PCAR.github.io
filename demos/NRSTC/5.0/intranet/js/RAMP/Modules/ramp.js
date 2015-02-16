/*! ramp-theme-intranet 13-02-2015 19:29:02 : v. 5.0.1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/_base/declare","dojo/query","dojo/_base/array","dojo/dom","dojo/dom-class","dojo/dom-style","dojo/dom-construct","dojo/request/script","ramp/globalStorage","ramp/map","utils/array","utils/dictionary","utils/util","utils/tmplUtil"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){"use strict";return{loadStrings:function(){},getLayerConfigWithId:function(a){return k.find(RAMP.config.layers.wms.concat(RAMP.config.layers.feature),function(b){return b.id===a})},getSymbolForFeature:function(a){var b=a.getLayer().ramp.config;return n.getGraphicIcon(a,b)},getServiceURL:function(a,b,c){var d=a+"configservice/map?mapid="+b+"&lang="+c;return d}}});