/*! ramp-theme-usability 12-06-2015 14:23:13 : v. 5.5.0-4 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/_base/declare","dojo/topic","dojo/_base/lang","ramp/globalStorage","ramp/eventManager"],function(a,b,c,d,e){"use strict";function f(){h.on("navigation:panClick",function(a,c){b.publish(e.Navigation.PAN,{direction:c})}).on("navigation:zoomClick",function(a,c){var d="zoomIn"===c?1:-1;b.publish(e.Navigation.ZOOM_STEP,{level:d})}).on("navigation:zoomSliderChange",function(a,c){b.publish(e.Navigation.ZOOM,{level:c})}).on("navigation:fullExtentClick",function(){b.publish(e.Navigation.FULL_EXTENT)})}function g(){function a(a){h.navigation("toggleTransition",a)}b.subscribe(e.Map.EXTENT_CHANGE,function(a){h.navigation("setSliderVal",a.lod.level)}),b.subscribe(e.Map.ZOOM_START,function(){a(!0)}),b.subscribe(e.Map.PAN_START,function(){a(!0)}),b.subscribe(e.Map.EXTENT_CHANGE,function(){a(!1)})}var h;return{init:function(a){h.navigation("setSliderVal",a),f(),g()},construct:function(){var a=c.mixin({},RAMP.config.navWidget,{locale:RAMP.locale});h=$("#"+RAMP.config.divNames.navigation).navigation(a)}}});