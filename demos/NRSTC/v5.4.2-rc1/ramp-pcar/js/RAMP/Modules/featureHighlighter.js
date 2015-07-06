/*! ramp-pcar 06-07-2015 14:40:07 : v. 5.4.2-rc1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/declare","dojo/topic","ramp/globalStorage","ramp/map","ramp/eventManager","utils/util","utils/dictionary"],function(a,b,c,d,e,f,g){"use strict";function h(a){var b=new esri.Graphic({geometry:a.geometry,attributes:{}});return b.symbol=a.getLayer().renderer.getSymbol(a),g.forEachEntry(a.attributes,function(a,c){b.attributes[a]=c}),b}function i(){if(!w){var a=Snap.select("svg"),b=a.selectAll("svg g"),c=a.select(".hoverlightLayer"),d=a.select(".zoomlightLayer"),e=a.select(".highlightLayer");w=a.group(b),a.add(w),w.after(e),w.before(c),w.before(d),w.attr({"class":"graphics"})}}function j(a){var b=a.graphic,c=h(b);i(),t.clear(),x=c,t.sourceLayerId=b.getLayer().id,t.objectIdField=b.getLayer().objectIdField,t.add(c),w.attr({opacity:.35})}function k(){x&&(x=null,w&&w.attr({opacity:1}),o(),t.clear()),RAMP.state.hilite.click.objId=-1}function l(a){var b=a.graphic,c=h(b);i(),u.clear(),u.add(c)}function m(){u.clear()}function n(a){var b=a.graphic,c=h(b);i(),y=c,v.clear(),v.sourceLayerId=b.getLayer().id,v.objectIdField=b.getLayer().objectIdField,v.add(c),w&&w.attr({opacity:.35})}function o(){y&&(y=null,v.clear(),!x&&w&&w.attr({opacity:1})),RAMP.state.hilite.zoom.objId=-1}function p(){x&&window.setTimeout(function(){var a,c=Snap.select("svg .highlightLayer > *:first-child");c&&(a=c.getBBox().width/2,b.publish(e.Maptips.REPOSITION_INTERACTIVE,{offset:a}))},10)}function q(){b.subscribe(e.FeatureHighlighter.HIGHLIGHT_SHOW,j),b.subscribe(e.FeatureHighlighter.HIGHLIGHT_HIDE,k),b.subscribe(e.FeatureHighlighter.HOVERLIGHT_SHOW,l),b.subscribe(e.FeatureHighlighter.HOVERLIGHT_HIDE,m),b.subscribe(e.FeatureHighlighter.ZOOMLIGHT_SHOW,n),b.subscribe(e.FeatureHighlighter.ZOOMLIGHT_HIDE,o),t.on("graphic-node-add",function(a){b.publish(e.Maptips.SHOW_INTERACTIVE,{target:$(a.node),graphic:x})}),v.on("graphic-node-add",function(a){var c,d,f,g="0",h="1";x&&(d=y.getLayer(),f=x.getLayer(),c=d.objectIdField,g=d.sourceLayerId+y.attributes[c],h=f.sourceLayerId+x.attributes[c]),g!==h&&b.publish(e.Maptips.SHOW,{target:$(a.node),graphic:y})}),b.subscribe(e.Map.ZOOM_END,p),b.subscribe(e.Map.PAN_END,p),b.subscribe(e.Map.REORDER_END,function(){w=null})}var r,s,t,u,v,w,x,y;return{init:function(){s=RAMP.config,r=d.getMap(),t=new esri.layers.GraphicsLayer({id:"highlightLayer",className:"highlightLayer"}),t.ramp={type:c.layerType.Highlight},u=new esri.layers.GraphicsLayer({id:"hoverlightLayer",className:"hoverlightLayer"}),u.ramp={type:c.layerType.Hoverlight},v=new esri.layers.GraphicsLayer({id:"zoomLightLayer",className:"zoomlightLayer"}),v.ramp={type:c.layerType.Zoomlight},r.addLayer(t),r.addLayer(u,0),r.addLayer(v,0),q()}}});