/*! ramp-theme-canada 13-11-2014 09:59:09 : v. 3.0.1 
 * 
 * RAMP GIS viewer - Canada Goose; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/declare","dojo/topic","ramp/globalStorage","ramp/eventManager"],function(a,b,c,d){"use strict";function e(){g.on("navigation:panClick",function(a,c){b.publish(d.Navigation.PAN,{direction:c})}).on("navigation:zoomClick",function(a,c){var e="zoomIn"===c?1:-1;b.publish(d.Navigation.ZOOM_STEP,{level:e})}).on("navigation:zoomSliderChange",function(a,c){b.publish(d.Navigation.ZOOM,{level:c})}).on("navigation:fullExtentClick",function(){b.publish(d.Navigation.FULL_EXTENT)})}function f(){function a(a){g.navigation("toggleTransition",a)}b.subscribe(d.Map.EXTENT_CHANGE,function(a){g.navigation("setSliderVal",a.lod.level)}),b.subscribe(d.Map.ZOOM_START,function(){a(!0)}),b.subscribe(d.Map.PAN_START,function(){a(!0)}),b.subscribe(d.Map.EXTENT_CHANGE,function(){a(!1)})}var g;return{init:function(a){g.navigation("setSliderVal",a),e(),f()},construct:function(){g=$("#"+c.config.divNames.navigation).navigation(c.config.navWidget)}}});