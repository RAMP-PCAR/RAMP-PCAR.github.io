/*! ramp-theme-canada 26-05-2015 16:06:39 : v. 5.4.0-8 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/lang","dojo/topic","dojo/Deferred","ramp/eventManager","ramp/map","ramp/globalStorage","utils/util","utils/dictionary","utils/popupManager","utils/tmplHelper","dojo/text!./templates/advanced_toolbar_template.json"],function(a,b,c,d,e,f,g,h,i,j,k){"use strict";function l(a){n.forEach(function(b){a&&a.name===b.name||!b.module||b.module.deactivate()})}var m,n=[],o=function(){function c(a,b){var c=r.find(".sub-panel-container");u.clear().fromTo(c,p,{"margin-top":0,paused:!0},{"margin-top":q,ease:"easeOutCirc"},0).seek(t.time()),b?(r.addClass("advanced-toolbar-mode"),t.eventCallback("onComplete",function(){a.resolve()}),t.play()):(t.eventCallback("onReverseComplete",function(){a.resolve(),r.removeClass("advanced-toolbar-mode")}),t.reverse())}var f,h,n,o="button-pressed",p=.4,q=32,r=$(".viewport"),s=r.find("#panel-toggle"),t=new TimelineLite({paused:!0}),u=new TimelineLite;return{init:function(){f=r.find("#advanced-toggle"),h=r.find("#advanced-toolbar"),tmpl.cache={},tmpl.templates=JSON.parse(j.stringifyTemplate(k)),h.append(tmpl("at_main")),n=h.find("#advanced-toolbar-list"),t.set(h,{display:"block"}).fromTo(n,p,{top:-q},{top:0,ease:"easeOutCirc"},0).to(s,p,{top:"+="+q,ease:"easeOutCirc"},0).add(u,0),i.registerPopup(f,"click",function(e){b.publish(d.GUI.TOOLBAR_SECTION_OPEN,{id:"advanced-toolbar"}),g.subscribeOnce(d.GUI.TOOLBAR_SECTION_OPEN,a.hitch(this,function(a){"advanced-toolbar"!==a.id&&this.isOpen()&&this.close()})),c(e,!0)},{activeClass:o,setClassBefore:!0,target:h,closeHandler:function(a){b.publish(d.GUI.TOOLBAR_SECTION_CLOSE,{id:"advanced-toolbar"}),l(),c(a,!1)}}),m=e.getMap()},addTool:function(a){n.append(a.module.node)}}}();return{init:function(){var a;o.init(),n=RAMP.config.advancedToolbar.tools,a=n.filter(function(a){return a.enabled}).map(function(a){return"tools/"+a.name}),require(a,function(){var a,b=[],d=Array.prototype.slice.call(arguments);d.forEach(function(){b.push(new c)}),g.afterAll(b,function(){n.forEach(o.addTool)}),d.forEach(function(d,e){a=new c,a.then(function(a){n[e].module=a,b[e].resolve()}),d.init(n[e].selector,a).on(d.event.ACTIVATE,function(){l(d)})})})}}});