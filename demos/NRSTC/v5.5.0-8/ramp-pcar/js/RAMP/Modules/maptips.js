/*! ramp-pcar 03-07-2015 15:43:17 : v. 5.5.0-8 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP 
 **/
define(["dojo/topic","ramp/eventManager","ramp/layerLoader","utils/tmplHelper","dojo/text!./templates/feature_hovertip_template.json","dojo/text!./templates/feature_anchortip_template.json"],function(a,b,c,d,e,f){"use strict";function g(){return $(window).width()-m}function h(){var a=0;return null!==s.handle&&null!==s.node&&(a=parseInt(s.node.css("left"),10)+s.node.width()/2-20),a}function i(c,d){if(d=d||s.graphic||null,c=c||s.handle||null,c&&d&&c.offset().left>g()){var e=d._extent.getCenter(),f=RAMP.map.extent.xmax-RAMP.map.extent.xmin;e.setX(e.x+f/6),a.publish(b.Map.CENTER_AT,{point:e}),a.publish(b.Maptips.EXTENT_CHANGE,{scroll:!1})}else a.publish(b.Maptips.EXTENT_CHANGE,{scroll:!0})}function j(a,b){var e,f,g=a.getLayer().sourceLayerId;g||(g=a.getLayer().id);var h,i,j=c.getLayerConfig(g),k="";return tmpl.cache={},b===!0?(k=j.templates.anchor,tmpl.templates=o):(k=j.templates.hover,tmpl.templates=n),e=RAMP.data[g],e?(f=e.features[e.index[a.attributes[e.idField].toString()]],h=d.dataBuilder(f,j),i=tmpl(k,h)):i='<div class="map-tip-content">'+i18n.t("maptips.attribsDownloading")+"</div>",i}function k(c,d,e){var f=j(d,e);null!=f&&(c.tooltipster({offsetX:$(c)[0].getBBox().width/2,interactive:!0,arrow:!0,updateAnimation:Modernizr.csstransitions,autoClose:e!==!0,onlyOne:!0,interactiveTolerance:r,speed:q,theme:e===!0?".tooltipster-noir":".tooltipster-shadow"}),c.tooltipster("content",$(f)),e?(c.tooltipster("show").tooltipster("content",$(f).append('<button class="button-none button-close"><span class="wb-invisible">Close</span></button>')),$(c.tooltipster("elementTooltip")).find(".button-close").on("click",function(){a.publish(b.GUI.SUBPANEL_CLOSE,{origin:"all"})}),s.node=$(c.tooltipster("elementTooltip")),s.handle=c.tooltipster(),s.graphic=d):c.tooltipster("offsetX",$(c)[0].getBBox().width/2).mouseover())}function l(){a.subscribe(b.Maptips.SHOW,function(a){k($(a.target),a.graphic)}),a.subscribe(b.Maptips.SHOW_INTERACTIVE,function(a){i(a.target,a.graphic),k(a.target,a.graphic,!0)}),a.subscribe(b.Maptips.REPOSITION_INTERACTIVE,function(a){if(null!==s.handle&&null!==s.node){var b=a.offset||0;s.handle.tooltipster("offsetX",b).tooltipster("reposition"),window.setTimeout(function(){h()>g()?s.node.hide():s.node.show()},q+10)}}),a.subscribe(b.GUI.SUBPANEL_CHANGE,function(a){a.isComplete&&(a.visible?(m=a.offsetLeft,i()):m=0)})}var m,n=JSON.parse(d.stringifyTemplate(e)),o=JSON.parse(d.stringifyTemplate(f)),p={node:null,handle:null,graphic:null},q=150,r=0,s=Object.create(p);return{init:function(){l()}}});