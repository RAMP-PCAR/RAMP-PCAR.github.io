/*! ramp-theme-fgp-int 18-06-2015 17:27:33 : v. 5.4.1-rc1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/_base/lang","dojo/topic","dojo/Deferred","ramp/eventManager","ramp/map","ramp/globalStorage","utils/util","utils/dictionary","utils/popupManager","utils/tmplHelper","dojo/text!./templates/advanced_toolbar_template.json"],function(a,b,c,d,e,f,g,h,i,j,k){"use strict";function l(a){n.forEach(function(b){a&&a.name===b.name||!b.module||b.module.deactivate()})}var m,n=[],o=function(){function a(a,b){var c=q.find(".sub-panel-container");t.clear().fromTo(c,o,{"margin-top":0,paused:!0},{"margin-top":p,ease:"easeOutCirc"},0).seek(s.time()),b?(q.addClass("advanced-toolbar-mode"),s.eventCallback("onComplete",function(){a.resolve()}),s.play()):(s.eventCallback("onReverseComplete",function(){a.resolve(),q.removeClass("advanced-toolbar-mode")}),s.reverse())}var c,f,h,n="button-pressed",o=.4,p=32,q=$(".viewport"),r=q.find("#panel-toggle"),s=new TimelineLite({paused:!0}),t=new TimelineLite;return{init:function(){c=q.find("#advanced-toggle"),f=q.find("#advanced-toolbar"),tmpl.cache={},tmpl.templates=JSON.parse(j.stringifyTemplate(k)),f.append(tmpl("at_main")),h=f.find("#advanced-toolbar-list"),s.set(f,{display:"block"}).fromTo(h,o,{top:-p},{top:0,ease:"easeOutCirc"},0).to(r,o,{top:"+="+p,ease:"easeOutCirc"},0).add(t,0),i.registerPopup(c,"click",function(c){b.publish(d.GUI.TOOLBAR_SECTION_OPEN,{id:"advanced-toolbar"});var e=this;g.subscribeOnce(d.GUI.TOOLBAR_SECTION_OPEN,function(a){"advanced-toolbar"!==a.id&&e.isOpen()&&e.close()}),a(c,!0)},{activeClass:n,setClassBefore:!0,target:f,closeHandler:function(c){b.publish(d.GUI.TOOLBAR_SECTION_CLOSE,{id:"advanced-toolbar"}),l(),a(c,!1)}}),m=e.getMap()},addTool:function(a){h.append(a.module.node)}}}();return{init:function(){var a;o.init(),n=RAMP.config.advancedToolbar.tools,a=n.filter(function(a){return a.enabled}).map(function(a){return"tools/"+a.name}),require(a,function(){var a,b=[],d=Array.prototype.slice.call(arguments);d.forEach(function(){b.push(new c)}),g.afterAll(b,function(){n.forEach(o.addTool)}),d.forEach(function(d,e){a=new c,a.then(function(a){n[e].module=a,b[e].resolve()}),d.init(n[e].selector,a).on(d.event.ACTIVATE,function(){l(d)})})})}}});