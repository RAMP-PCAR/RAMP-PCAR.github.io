/*! ramp-theme-usability 13-07-2015 12:19:41 : v. 5.5.0-10 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/Evented","dojo/_base/declare","dojo/_base/lang","dojo/text!./templates/layer_selector_template.json","utils/tmplHelper","utils/array","ramp/layerItem"],function(a,b,c,d,e,f,g){"use strict";return b([a],{constructor:function(a,b){var f=this;c.mixin(this,{node:null,_listNode:null,templates:JSON.parse(e.stringifyTemplate(d)),layerGroupType:"layer_group",layerType:null,layerState:g.state.DEFAULT,layerItems:[]},b),tmpl.cache={},tmpl.templates=this.templates,this.node=$(tmpl(this.layerGroupType,{})),this._listNode=this.node.find("ul"),this.layerItems.forEach(function(a){f.addLayerItem(a)})},addLayerItem:function(a,b){var d,e={state:this.layerState,type:this.layerType};return c.mixin(e,b),d=new g(a,e),this.layerItems.push(d),this._listNode.prepend(d.node),1===this.layerItems.length&&this.node.show(),d},removeLayerItem:function(a){var b=this.getLayerItem(a);return b.node.remove(),f.remove(this.layerItems,b,function(a){return a.id===b.id}),0===this.layerItems.length&&this.node.hide(),this},_constructStateMatrix:function(a,b){return b=b||g.getStateMatrixTemplate(),a.settings.panelEnabled||g.removeStateMatrixPart(b,"controls",g.controls.SETTINGS),a.layerExtent||a.isStatic||g.addStateMatrixPart(b,"toggles",g.toggles.QUERY,[g.state.DEFAULT,g.state.UPDATING,g.state.OFF_SCALE]),b},setState:function(a,b,c){var d=this.getLayerItem(a);d&&d.setState(b,c)},getLayerItem:function(a){var b;return b=f.find(this.layerItems,function(b){return b.id===a})}})});