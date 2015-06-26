/*! ramp-theme-fgp-int 26-06-2015 14:25:19 : v. 5.5.0-7 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/Evented","dojo/_base/lang","dojo/Deferred","dojo/text!./templates/tools_template.json","ramp/globalStorage","utils/tmplHelper","utils/popupManager","utils/util"],function(a,b,c,d,e,f,g,h){"use strict";return b.mixin(new a,{options:null,handle:null,node:null,outputFloat:null,workingLabel:null,tooltip:null,templates:null,event:{ACTIVATE:"basetool-activate",DEACTIVATE:"basetool-deactivate"},ns:"tools/",name:"BaseTool",initToggle:function(a,e,i){var j,k=this,l=[new c,new c];return h.afterAll(l,function(){tmpl.cache={},tmpl.templates=k.templates=b.mixin(JSON.parse(f.stringifyTemplate(d)),JSON.parse(f.stringifyTemplate(j))),this.node=$(tmpl(this.options.toolButtonTemplate,this.options.toolButtonData)),this.outputFloat=$(tmpl(this.options.outputFloatTemplate,this.options.outputFloatData)),this.workingLabel=tmpl(this.options.workingLabelTemplate,this.options.workingLabelData),this.handle=g.registerPopup(this.node.find(a),"click",function(a){k.emit(k.event.ACTIVATE,{tool:k}),k.options.activate.call(k),k.options.target.append(k.outputFloat),k.outputFloat.on("click",".float-default-button",k.options.defaultAction),k.tooltip=$("#mainMap.map > .tooltip").wrapInner("<span class='esri-tooltip'></span").append(k.workingLabel),a.resolve()},{closeHandler:function(a){k.emit(k.event.DEACTIVATE,{tool:k}),k.options.deactivate.call(k),k.outputFloat.detach(),k.outputFloat.off("click",".float-default-button",k.options.defaultAction),a.resolve()},activeClass:"button-pressed",useAria:!1}),e.resolve(this)},this),k.ns+=k.name,i18n.loadNamespace(k.ns,function(){l[0].resolve()}),require(["dojo/text!tools/templates/"+k.name+".json"],function(a){j=a,l[1].resolve()}),this.options=b.mixin({target:$("#mainMap"),outputFloatTemplate:"base_tool_float",outputFloatData:{clearMapButton:i18n.t("tools.basetool.clearmap")},workingLabelTemplate:"working_label",workingLabelData:{workingLabel:i18n.t("tools.basetool.working")},toolButtonTemplate:"base_tool_button",toolButtonData:{ns:k.ns},toolOutputTemplate:"base_tool_output",activate:function(){},deactivate:function(){},defaultAction:function(){}},i),this},displayTemplateOutput:function(a,b){var c;return b=b||this.options.toolOutputTemplate,tmpl.cache={},tmpl.templates=this.templates,c=tmpl(b,a),this.displayOutput(c),this},displayOutput:function(a){return this.outputFloat.find(".float-content").empty().append(a),this},working:function(a){return a?(this.tooltip.addClass("working"),this.outputFloat.find(".working-placeholder").replaceWith(this.workingLabel)):(this.tooltip.removeClass("working"),this.outputFloat.find(".working-placeholder").empty()),this},activate:function(){return this.handle&&this.handle.open(),this},deactivate:function(){return this.handle&&this.handle.isOpen()&&this.handle.close(),this}})});