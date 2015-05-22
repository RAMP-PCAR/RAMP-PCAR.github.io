/*! ramp-theme-usability 28-04-2015 20:04:53 : v. 5.3.0 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/Evented","dojo/_base/declare","dojo/_base/lang","dojo/text!./templates/layer_selector_template.json","utils/util","utils/tmplHelper","utils/tmplUtil","utils/array","utils/dictionary"],function(a,b,c,d,e,f,g,h,i){"use strict";var j,k;return j=b([a],{constructor:function(a,b){c.mixin(this,{id:null,node:null,_config:null,_imageContainerNode:null,_displayNameNode:null,_controlsNode:null,_togglesNode:null,_controlStore:{},_toggleStore:{},_noticeStore:{},templates:JSON.parse(f.stringifyTemplate(d)),state:j.state.DEFAULT,type:null},b,{id:a.id,_config:a,stateMatrix:c.mixin(c.clone(j.stateMatrix),b.stateMatrix),transitionMatrix:c.mixin(c.clone(j.transitionMatrix),b.transitionMatrix)}),this.node=$(this._template(this.type,this._config)),this._imageBoxNode=this.node.find(".layer-details > div:first"),this._displayNameNode=this.node.find(".layer-name > span"),this._controlsNode=this.node.find(".layer-controls-group"),this._togglesNode=this.node.find(".layer-checkboxes"),this._noticesNode=this.node.find(".layer-notices"),this._generateParts("controls","layer_control_",this._controlStore),this._generateParts("toggles","layer_toggle_",this._toggleStore),this._generateParts("notices","layer_notice_",this._noticeStore),this.setState(this.state,b,!0)},_generateParts:function(a,b,c){var d,e,f=this,g=[];Object.getOwnPropertyNames(j.state).forEach(function(b){d=j.state[b],g=g.concat(f.stateMatrix[d][a])}),g=h.unique(g),g.forEach(function(a){e=f._generatePart(b,a),c[a]=e})},_generatePart:function(a,b,c){var d=$(this._template(a+b,{id:this.id,config:this._config,nameKey:b,data:c}));return d},setState:function(a,b,c){var d,f,g=this.transitionMatrix[this.state],h=this;if(-1!==g.indexOf(a)||c){switch(this.state=a,this.node.removeClass(k).addClass(this.state),b&&b.notices&&i.forEachEntry(b.notices,function(a,b){d=h._generatePart("layer_notice_",a,b),h._noticeStore[a]=d}),f=this.node.find(":focus"),this._setParts("controls",this._controlStore,this._controlsNode),this._setParts("toggles",this._toggleStore,this._togglesNode),this._setParts("notices",this._noticeStore,this._noticesNode),this.state){case j.state.DEFAULT:break;case j.state.LOADING:this.node.attr("aria-busy",!0);break;case j.state.LOADED:this.node.attr("aria-busy",!1),this.setState(j.state.DEFAULT);break;case j.state.ERROR:break;case j.state.OFF_SCALE:}return f.length>0&&(e.containsInDom(f[0])?f.focus():this.node.find(":focusable:first").focus()),!0}return!1},_setParts:function(a,b,c){var d=[];this.stateMatrix[this.state][a].forEach(function(a){d.push(b[a])}),c.children().detach().end().append(d)},_template:function(a,b){return tmpl.cache={},tmpl.templates=this.templates,b=b||{},b.fn=g,tmpl(a,b)}}),c.mixin(j,{state:{DEFAULT:"layer-state-default",LOADING:"layer-state-loading",LOADED:"layer-state-loaded",UPDATING:"layer-state-updating",ERROR:"layer-state-error",OFF_SCALE:"layer-state-off-scale"},controls:{METADATA:"metadata",SETTINGS:"settings",LOADING:"loading",REMOVE:"remove",RELOAD:"reload",ERROR:"error"},toggles:{EYE:"eye",BOX:"box",RELOAD:"reload",HIDE:"hide",ZOOM:"zoom",PLACEHOLDER:"placeholder"},notices:{SCALE:"scale",ERROR:"error",UPDATE:"update",USER:"user"},stateMatrix:{},transitionMatrix:{}}),j.stateMatrix[j.state.DEFAULT]={controls:[j.controls.METADATA,j.controls.SETTINGS,j.controls.REMOVE],toggles:[j.toggles.EYE,j.toggles.BOX],notices:[]},j.stateMatrix[j.state.LOADING]={controls:[j.controls.LOADING],toggles:[],notices:[]},j.stateMatrix[j.state.LOADED]={controls:[],toggles:[],notices:[]},j.stateMatrix[j.state.UPDATING]={controls:[j.controls.METADATA,j.controls.SETTINGS,j.controls.REMOVE],toggles:[j.toggles.EYE,j.toggles.BOX],notices:[j.notices.UPDATE]},j.stateMatrix[j.state.ERROR]={controls:[j.controls.RELOAD,j.controls.REMOVE],toggles:[],notices:[j.notices.ERROR]},j.stateMatrix[j.state.OFF_SCALE]={controls:[j.controls.METADATA,j.controls.SETTINGS,j.controls.REMOVE],toggles:[j.toggles.ZOOM,j.toggles.EYE,j.toggles.BOX],notices:[j.notices.SCALE]},j.transitionMatrix[j.state.DEFAULT]=[j.state.ERROR,j.state.OFF_SCALE,j.state.UPDATING],j.transitionMatrix[j.state.LOADING]=[j.state.LOADED,j.state.ERROR,j.state.UPDATING],j.transitionMatrix[j.state.LOADED]=[j.state.DEFAULT],j.transitionMatrix[j.state.UPDATING]=[j.state.LOADED,j.state.ERROR],j.transitionMatrix[j.state.ERROR]=[j.state.LOADING],j.transitionMatrix[j.state.OFF_SCALE]=[j.state.ERROR,j.state.DEFAULT,j.state.UPDATING],j.addStateMatrixPart=function(a,b,c,d){i.forEachEntry(a,function(a,e){d?e[b].unshift(c):e[b].push(c)})},j.removeStateMatrixPart=function(a,b,c){i.forEachEntry(a,function(a,d){h.remove(d[b],c)})},j.getStateMatrixTemplate=function(){return c.clone(j.stateMatrix)},k=Object.getOwnPropertyNames(j.state).map(function(a){return j.state[a]}).join(" "),j});