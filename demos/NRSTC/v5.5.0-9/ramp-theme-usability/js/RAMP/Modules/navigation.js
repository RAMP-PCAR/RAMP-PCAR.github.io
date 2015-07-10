/*! ramp-theme-usability 10-07-2015 14:20:56 : v. 5.5.0-9 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/_base/declare","dojo/topic","dojo/_base/lang","ramp/globalStorage","ramp/eventManager","esri/geometry/Point","utils/util"],function(a,b,c,d,e,f,g){"use strict";function h(){function a(a){var b=g.latLongToMapPoint(a.coords.latitude,a.coords.longitude,l.extent.spatialReference);l.centerAndZoom(b,12)}function c(){k&&k.getCurrentPosition(a,function(){g.tooltipster($(".jq-navigation-geoButton"),null,"destroy"),$(".jq-navigation-geoLocate").attr("title",i18n.t("geolocate.noSupport")),g.tooltipster($(".jq-navigation-geoButton"),null,null,"tooltipster-error-above"),$(".jq-navigation-geoLocate").attr("class","jq-navigation-geoLocate-disabled"),k=null})}j.on("navigation:panClick",function(a,c){b.publish(e.Navigation.PAN,{direction:c})}).on("navigation:zoomClick",function(a,c){var d="zoomIn"===c?1:-1;b.publish(e.Navigation.ZOOM_STEP,{level:d})}).on("navigation:zoomSliderChange",function(a,c){b.publish(e.Navigation.ZOOM,{level:c})}).on("navigation:fullExtentClick",function(){b.publish(e.Navigation.FULL_EXTENT)}).on("navigation:geoLocateClick",function(){c()})}function i(){function a(a){j.navigation("toggleTransition",a)}b.subscribe(e.Map.EXTENT_CHANGE,function(a){j.navigation("setSliderVal",a.lod.level)}),b.subscribe(e.Map.ZOOM_START,function(){a(!0)}),b.subscribe(e.Map.PAN_START,function(){a(!0)}),b.subscribe(e.Map.EXTENT_CHANGE,function(){a(!1)})}var j,k,l;return{init:function(a){l=RAMP.map,k=navigator.geolocation,j.navigation("setSliderVal",a),h(),i()},construct:function(){var a=c.mixin({},RAMP.config.navWidget,{locale:RAMP.locale});j=$("#"+RAMP.config.divNames.navigation).navigation(a)}}});