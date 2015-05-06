/*! ramp-pcar 06-05-2015 17:44:51 : v. 5.3.0-3 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/array","dojo/_base/lang","dojo/dom-attr","dojo/query","dojo/topic","dojo/text!./templates/basemap_selector_template.json","ramp/globalStorage","ramp/map","ramp/eventManager","esri/dijit/BasemapGallery","utils/dictionary","utils/popupManager","utils/util","utils/tmplHelper"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){"use strict";function o(){r.on("selection-change",function(){var a=r.getSelected();w.updateToggleLabel(),e.publish(i.BasemapSelector.BASEMAP_CHANGED,{id:a.id,cssStyle:a.scaleCssClass})})}function p(){e.subscribe(i.BasemapSelector.TOGGLE,function(a){q(a.id)})}function q(a,b){s!==a&&(t===b?(s=a,r.select(s)):(e.subscribe(i.BookmarkLink.BOOKMARK_GENERATED,function(a){window.location.href=a.link}),e.publish(i.BasemapSelector.BASEMAP_CHANGED,{id:a,cssStyle:""})))}var r,s,t,u,v="basemapGallery",w=function(){function a(){var a=p.time();p.clear().fromTo(h,s,{top:-g.find(".basemapselector-section").outerHeight()-20},{top:0,ease:"easeOutCirc"},0).seek(a)}function b(){j.isOpen()&&h.find("span[title]:visible").each(function(){var a=$(this);a.attr("title")&&(a.isOverflowed()?a.tooltipster({theme:".tooltipster-shadow"}):a.removeAttr("title"))})}var c,d,g,h,j,m,o,p=new TimelineLite({paused:!0}),s=.4,t="button-pressed";return{init:function(r,v){var w,x,y=[],z={};return c=$("#basemapControls"),d=$("#baseMapToggle"),u.forEach(function(a){z[a.tileSchema]||(z[a.tileSchema]=[]),z[a.tileSchema].push(a)}),k.forEachEntry(z,function(a,b){y.push({isActive:a===v,id:a,tileShema:v,name:a,maps:b})}),tmpl.templates=JSON.parse(n.stringifyTemplate(f)),c.append(tmpl("basemapselector",y)),g=c.find("#basemapselector-section-container"),h=g.find(".basemapselector-section"),j=l.registerPopup(c,"hoverIntent",function(c){d.addClass("button-pressed"),a(),p.eventCallback("onComplete",function(){c.resolve(),b()}),g.show(),p.play()},{activeClass:t,target:g,closeHandler:function(b){a(),p.eventCallback("onReverseComplete",function(){d.removeClass("button-pressed"),g.hide(),b.resolve()}),p.reverse()},timeout:500}),m=l.registerPopup(g,"click",function(a){var c,d,e;this.isOpen()||(c=h.height(),d=this.target.height(),e=new TimelineLite({onComplete:b}),m.close(),e.set(this.target,{display:"block"},0).fromTo(this.target,s,{height:c},{height:d},0).to(h,s,{height:d,ease:"easeOutCirc"},0)),a.resolve()},{closeHandler:function(a){this.target.hide(),a.resolve()},openOnly:!0,activeClass:t,handleSelector:".projection-button",containerSelector:".projection-list-item",targetSelector:".basemap-list-pane"}),o=l.registerPopup(g,"click",function(a){this.isOpen()||(o.close(),q(this.target.data("basemap-id"),this.target.data("tileshema"))),a.resolve()},{closeHandler:function(a){a.resolve()},openOnly:!0,handleSelector:".basemap-button",activeClass:t}),w=g.find("button[data-basemap-id='"+r+"']"),x=g.find("button[data-projection-id='"+v+"']"),o.open(w),m.open(x),g.hide(),e.publish(i.BasemapSelector.UI_COMPLETE),this},updateToggleLabel:function(){d.find("span:first").text(r.getSelected().title)}}}();return{init:function(){var b,c,d=[];u=RAMP.config.basemaps,RAMP.basemapIndex={},a.forEach(u,function(a,b){var c,e=[];a.layers.forEach(function(a){e.push(new esri.dijit.BasemapLayer(a))}),c=new esri.dijit.Basemap({id:a.id,layers:e,title:String.format("{0}, {1}",a.name,i18n.t("config.tileSchema."+a.tileSchema)),thumbnailUrl:a.thumbnail}),c.scaleCssClass=a.scaleCssClass,d.push(c),RAMP.basemapIndex[a.id]=b}),r=new j({showArcGISBasemaps:!1,basemaps:d,map:h.getMap()},v),r.on("error",function(a){}),r.startup(),b=u[RAMP.config.initialBasemapIndex],c=b.id,t=b.tileSchema,o(),p(),w.init(c,t).updateToggleLabel()}}});