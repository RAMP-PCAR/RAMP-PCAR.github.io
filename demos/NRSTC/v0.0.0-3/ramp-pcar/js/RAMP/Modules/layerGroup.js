/*! ramp-pcar 20-03-2015 14:17:01 : v. 5.2.0-1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/Evented","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/text!./templates/layer_selector_template.json","utils/tmplHelper","utils/array","utils/dictionary","ramp/layerItem"],function(a,b,c,d,e,f,g,h,i){"use strict";return b([a],{constructor:function(a,b){var d=this;c.mixin(this,{node:null,_listNode:null,templates:JSON.parse(f.stringifyTemplate(e)),groupType:"layer_group",layerType:null,layerState:i.state.DEFAULT,layers:[],layerItems:[]},b,{layers:a}),this.node=$(this._template(this.groupType)),this._listNode=this.node.find("ul"),this.layers.forEach(function(a){d.addLayerItem(a)})},addLayerItem:function(a,b){var d,e={};return b&&b.stateMatrix?b.stateMatrix=this._constructStateMatrix(a,b.stateMatrix):e.stateMatrix=this._constructStateMatrix(a),c.mixin(e,{state:this.layerState,type:this.layerType},b),d=new i(a,e),this.layerItems.push(d),this._listNode.prepend(d.node),1===this.layerItems.length&&this.node.show(),d},removeLayerItem:function(a){var b=this.getLayerItem(a);return b.node.remove(),g.remove(this.layerItems,b,function(a){return a.id===b.id}),0===this.layerItems.length&&this.node.hide(),this},_constructStateMatrix:function(a,b){return b=b||i.getStateMatrixTemplate(),a.settings.panelEnabled||i.removeStateMatrixPart(b,"controls",i.controls.SETTINGS),(!a.layerExtent||a.isStatic)&&(i.removeStateMatrixPart(b,"toggles",i.toggles.BOX),i.addStateMatrixPart(b,"toggles",i.toggles.PLACEHOLDER)),b},setState:function(a,b,c){var d=this.getLayerItem(a);d&&d.setState(b,c)},getLayerItem:function(a){var b;return b=g.find(this.layerItems,function(b){return b.id===a})},_template:function(a,b){return tmpl.cache={},tmpl.templates=this.templates,b=b||{},tmpl(a,b)}})});