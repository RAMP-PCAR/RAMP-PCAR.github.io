/*! ramp-pcar 05-06-2015 17:51:48 : v. 5.4.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/lang","dojo/dom-attr","dojo/query","dojo/topic","dojo/text!./templates/basemap_selector_template.json","ramp/globalStorage","ramp/map","ramp/eventManager","esri/dijit/BasemapGallery","utils/dictionary","utils/popupManager","utils/util","utils/tmplHelper"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){"use strict";function n(){q.on("selection-change",function(){var a=q.getSelected();RAMP.layerCounts.base=a.layers.length,v.updateToggleLabel(),d.publish(h.BasemapSelector.BASEMAP_CHANGED,{id:a.id,cssStyle:a.scaleCssClass})})}function o(){d.subscribe(h.BasemapSelector.TOGGLE,function(a){p(a.id)})}function p(a,b){r!==a&&(s===b?(r=a,q.select(r)):(d.subscribe(h.BookmarkLink.BOOKMARK_GENERATED,function(a){window.location.href=a.link}),d.publish(h.BasemapSelector.BASEMAP_CHANGED,{id:a,cssStyle:""})))}var q,r,s,t,u="basemapGallery",v=function(){function a(){var a=r.time();r.clear().fromTo(i,s,{top:-g.find(".basemapselector-section").outerHeight()-20},{top:0,ease:"easeOutCirc"},0).seek(a)}function b(){l.isOpen()&&i.find("span[title]:visible").each(function(){var a=$(this);a.attr("title")&&(a.isOverflowed()?a.tooltipster({theme:".tooltipster-shadow"}):a.removeAttr("title"))})}var c,f,g,i,l,n,o,r=new TimelineLite({paused:!0}),s=.4,u="button-pressed";return{init:function(q,v){var w,x,y=[],z={};return c=$("#basemapControls"),f=$("#baseMapToggle"),t.forEach(function(a){z[a.tileSchema]||(z[a.tileSchema]=[]),z[a.tileSchema].push(a)}),j.forEachEntry(z,function(a,b){y.push({isActive:a===v,id:a,tileShema:v,name:a,maps:b})}),tmpl.templates=JSON.parse(m.stringifyTemplate(e)),c.append(tmpl("basemapselector",y)),g=c.find("#basemapselector-section-container"),i=g.find(".basemapselector-section"),l=k.registerPopup(c,"hoverIntent",function(c){f.addClass("button-pressed"),a(),r.eventCallback("onComplete",function(){c.resolve(),b()}),g.show(),r.play()},{activeClass:u,target:g,closeHandler:function(b){a(),r.eventCallback("onReverseComplete",function(){f.removeClass("button-pressed"),g.hide(),b.resolve()}),r.reverse()},timeout:500}),n=k.registerPopup(g,"click",function(a){var c,d,e;this.isOpen()||(c=i.height(),d=this.target.height(),e=new TimelineLite({onComplete:b}),n.close(),e.set(this.target,{display:"block"},0).fromTo(this.target,s,{height:c},{height:d},0).to(i,s,{height:d,ease:"easeOutCirc"},0)),a.resolve()},{closeHandler:function(a){this.target.hide(),a.resolve()},openOnly:!0,activeClass:u,handleSelector:".projection-button",containerSelector:".projection-list-item",targetSelector:".basemap-list-pane"}),o=k.registerPopup(g,"click",function(a){this.isOpen()||(o.close(),p(this.target.data("basemap-id"),this.target.data("tileshema"))),a.resolve()},{closeHandler:function(a){a.resolve()},openOnly:!0,handleSelector:".basemap-button",activeClass:u}),w=g.find('button[data-basemap-id="'+q+'"]'),x=g.find('button[data-projection-id="'+v+'"]'),o.open(w),n.open(x),g.hide(),this.updateToggleLabel(),d.publish(h.BasemapSelector.UI_COMPLETE),this},updateToggleLabel:function(){f.find("span:first").text(q.getSelected().title)}}}();return{init:function(){var a,b,c=[];t=RAMP.config.basemaps,RAMP.basemapIndex={},t.forEach(function(a,b){var d,e=[];a.layers.forEach(function(a){e.push(new esri.dijit.BasemapLayer(a))}),d=new esri.dijit.Basemap({id:a.id,layers:e,title:String.format("{0}, {1}",a.name,i18n.t("config.tileSchema."+a.tileSchema)),thumbnailUrl:a.thumbnail}),d.scaleCssClass=a.scaleCssClass,c.push(d),RAMP.basemapIndex[a.id]=b}),q=new i({showArcGISBasemaps:!1,basemaps:c,map:g.getMap()},u),q.on("error",function(a){}),q.startup(),a=t[RAMP.config.initialBasemapIndex],b=a.id,s=a.tileSchema,n(),o(),v.init(b,s)}}});