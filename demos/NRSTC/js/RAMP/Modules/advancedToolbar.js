/*! ramp-gis-viewer 09-09-2014 13:44:31 : v. 2.0.0 
 * 
 * RAMP GIS viewer - Bobcat; Sample of an implementation of RAMP 
 **/
define(["dojo/_base/lang","dojo/_base/array","dojo/topic","dojo/Deferred","ramp/eventManager","ramp/map","ramp/globalStorage","utils/util","utils/dictionary","utils/popupManager","utils/tmplHelper","dojo/text!./templates/advanced_toolbar_template.json"],function(a,b,c,d,e,f,g,h,i,j,k,l){"use strict";function m(a){t.forEach(function(b){a&&a.name===b.name||!b.module||b.module.deactivate()})}var n,o,p,q,r="button-pressed",s=.4,t=[],u={init:function(){var b,d=$(".viewport"),g=d.find("#panel-toggle"),i=new TimelineLite({paused:!0,onComplete:function(){},onReverseComplete:function(){}});n=d.find("#advanced-toggle"),o=d.find("#advanced-toolbar"),tmpl.cache={},tmpl.templates=JSON.parse(k.stringifyTemplate(l)),o.append(tmpl("at_main")),p=o.find("#advanced-toolbar-list"),i.set(o,{display:"block"},0).set(d,{className:"+=advanced-toolbar-mode"},0).fromTo(p,s,{top:-32},{top:0,ease:"easeOutCirc"},0).to(g,s,{top:"+=32",ease:"easeOutCirc"},0),j.registerPopup(n,"click",function(f){c.publish(e.GUI.TOOLBAR_SECTION_OPEN,{id:"advanced-toolbar"}),h.subscribeOnce(e.GUI.TOOLBAR_SECTION_OPEN,a.hitch(this,function(a){"advanced-toolbar"!==a.id&&this.isOpen()&&this.close()})),b=d.find(".sub-panel-container"),TweenLite.fromTo(b,s,{"margin-top":0},{"margin-top":32,ease:"easeOutCirc"}),i.eventCallback("onComplete",f.resolve,[],this),i.play()},{activeClass:r,setClassBefore:!0,target:o,closeHandler:function(a){c.publish(e.GUI.TOOLBAR_SECTION_CLOSE,{id:"advanced-toolbar"}),m(),b=d.find(".sub-panel-container"),TweenLite.fromTo(b,s,{"margin-top":32},{"margin-top":0,ease:"easeInCirc"}),i.eventCallback("onReverseComplete",a.resolve,[],this),i.reverse()}}),q=f.getMap()},addTool:function(a){p.append(a.module.node)}};return{init:function(){var a;u.init(),t=g.config.advancedToolbar.tools,a=t.filter(function(a){return a.enabled}).map(function(a){return"tools/"+a.name}),require(a,function(){var a,b=[],c=Array.prototype.slice.call(arguments);c.forEach(function(){b.push(new d)}),h.afterAll(b,function(){t.forEach(u.addTool)}),c.forEach(function(c,e){a=new d,a.then(function(a){t[e].module=a,b[e].resolve()}),c.init(t[e].selector,a).on(c.event.ACTIVATE,function(){m(c)})})})}}});