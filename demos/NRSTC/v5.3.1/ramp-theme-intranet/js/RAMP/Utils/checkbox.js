/*! ramp-theme-intranet 08-05-2015 15:36:17 : v. 5.3.1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/Evented","dojo/_base/declare","dojo/_base/lang","utils/util"],function(a,b,c,d){"use strict";var e;return e=b([a],{constructor:function(a,b){c.mixin(this,{node:null,labelNode:null,nodeIdAttr:"id",cssClass:{active:"active",focus:"focused",check:"checked"},label:{check:"checked",uncheck:"unchecked"},onChange:function(){},state:null,id:null},b,{node:a}),this._initListeners(),this.id=this.node.data(this.nodeIdAttr)||this.node.attr(this.nodeIdAttr)||this.node.id,this.labelNode=this.node.findInputLabel(),this._toggleLabel()},_initListeners:function(){var a=this;this.node.on("change",function(){a._toggleLabel(),a._emit(e.agency.USER)}).on("focus",function(){a.node.findInputLabel().addClass(a.cssClass.focus)}).on("focusout",function(){a.node.findInputLabel().removeClass(a.cssClass.focus)})},_toggleLabel:function(){var a;this.state=this.node.is(":checked"),this.state?(a=String.format(this.label.check,this.labelNode.data("label-name")),this.labelNode.addClass(this.cssClass.check).prop("title",a).find("> span").text(a)):(a=String.format(this.label.uncheck,this.labelNode.data("label-name")),this.labelNode.removeClass(this.cssClass.check).prop("title",a).find("> span").text(a)),this.onChange.call(this)},_emit:function(a){this.emit(e.event.TOGGLE,{agency:a,checkbox:this})},setState:function(a){return this.validate(),this.state!==e.state.INVALID&&this.state!==a&&(this.node.prop("checked",a),this._toggleLabel(),this._emit(e.agency.CODE)),this},validate:function(){return this.node&&d.containsInDom(this.node[0])?this.state===e.state.INVALID&&this.reset():this.state=e.state.INVALID,this},reset:function(){this.node.off("change focus focusout").removeClass("tooltipstered"),this._initListeners(),this._toggleLabel()}}),c.mixin(e,{state:{INVALID:"checkbox-invalid"},agency:{USER:"USER",CODE:"CODE"},event:{TOGGLE:"checkbox/toggle"}}),e});