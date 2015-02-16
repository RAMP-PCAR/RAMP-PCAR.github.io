/*! ramp-theme-usability 13-02-2015 19:37:32 : v. 5.0.1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/Evented","dojo/_base/declare","dojo/_base/lang","dojo/text!./templates/layer_selector_template.json","utils/tmplHelper","utils/tmplUtil","utils/array","utils/dictionary"],function(a,b,c,d,e,f,g,h){"use strict";var i,j;return i=b([a],{constructor:function(a,b){c.mixin(this,{id:null,node:null,_config:null,_imageContainerNode:null,_displayNameNode:null,_controlsNode:null,_togglesNode:null,_controlStore:{},_toggleStore:{},_noticeStore:{},templates:JSON.parse(e.stringifyTemplate(d)),state:i.state.DEFAULT,type:null},b,{id:a.id,_config:a,stateMatrix:c.mixin(c.clone(i.stateMatrix),b.stateMatrix),transitionMatrix:c.mixin(c.clone(i.transitionMatrix),b.transitionMatrix)}),this.node=$(this._template(this.type,this._config)),this._imageBoxNode=this.node.find(".layer-details > div:first"),this._displayNameNode=this.node.find(".layer-name > span"),this._controlsNode=this.node.find(".layer-controls-group"),this._togglesNode=this.node.find(".layer-checkboxes"),this._noticesNode=this.node.find(".layer-notices"),this._generateParts("controls","layer_control_",this._controlStore),this._generateParts("toggles","layer_toggle_",this._toggleStore),this._generateParts("notices","layer_notice_",this._noticeStore),this.setState(this.state,null,!0)},_generateParts:function(a,b,c){var d,e,f=this,h=[];Object.getOwnPropertyNames(i.state).forEach(function(b){d=i.state[b],h=h.concat(f.stateMatrix[d][a])}),h=g.unique(h),h.forEach(function(a){e=f._generatePart(b,a),c[a]=e})},_generatePart:function(a,b,c){var d=$(this._template(a+b,{id:this.id,config:this._config,nameKey:b,data:c}));return d},setState:function(a,b,c){var d,e=this.transitionMatrix[this.state],f=this;if(-1!==e.indexOf(a)||c){switch(this.state=a,this.node.removeClass(j).addClass(this.state),b&&b.notices&&h.forEachEntry(b.notices,function(a,b){d=f._generatePart("layer_notice_",a,b),f._noticeStore[a]=d}),this._setParts("controls",this._controlStore,this._controlsNode),this._setParts("toggles",this._toggleStore,this._togglesNode),this._setParts("notices",this._noticeStore,this._noticesNode),this.state){case i.state.DEFAULT:break;case i.state.LOADING:this.node.attr("aria-busy",!0);break;case i.state.LOADED:this.node.attr("aria-busy",!1),this.setState(i.state.DEFAULT);break;case i.state.ERROR:break;case i.state.OFF_SCALE:}return!0}return!1},_setParts:function(a,b,c){var d=[];this.stateMatrix[this.state][a].forEach(function(a){d.push(b[a])}),c.empty().append(d)},_template:function(a,b){return tmpl.cache={},tmpl.templates=this.templates,b=b||{},b.fn=f,tmpl(a,b)}}),c.mixin(i,{state:{DEFAULT:"layer-state-default",LOADING:"layer-state-loading",LOADED:"layer-state-loaded",UPDATING:"layer-state-updating",ERROR:"layer-state-error",OFF_SCALE:"layer-state-off-scale"},controls:{METADATA:"metadata",SETTINGS:"settings",LOADING:"loading",REMOVE:"remove",RELOAD:"reload",ERROR:"error"},toggles:{EYE:"eye",BOX:"box",RELOAD:"reload",HIDE:"hide",ZOOM:"zoom",PLACEHOLDER:"placeholder"},notices:{SCALE:"scale",ERROR:"error",UPDATE:"update"},stateMatrix:{},transitionMatrix:{}}),i.stateMatrix[i.state.DEFAULT]={controls:[i.controls.METADATA,i.controls.SETTINGS],toggles:[i.toggles.EYE,i.toggles.BOX],notices:[]},i.stateMatrix[i.state.LOADING]={controls:[i.controls.LOADING],toggles:[],notices:[]},i.stateMatrix[i.state.LOADED]={controls:[],toggles:[],notices:[]},i.stateMatrix[i.state.UPDATING]={controls:[i.controls.METADATA,i.controls.SETTINGS],toggles:[i.toggles.EYE,i.toggles.BOX],notices:[i.notices.UPDATE]},i.stateMatrix[i.state.ERROR]={controls:[i.controls.RELOAD,i.controls.REMOVE],toggles:[],notices:[i.notices.ERROR]},i.stateMatrix[i.state.OFF_SCALE]={controls:[i.controls.METADATA,i.controls.SETTINGS],toggles:[i.toggles.ZOOM,i.toggles.EYE,i.toggles.BOX],notices:[i.notices.SCALE]},i.transitionMatrix[i.state.DEFAULT]=[i.state.ERROR,i.state.OFF_SCALE,i.state.UPDATING],i.transitionMatrix[i.state.LOADING]=[i.state.LOADED,i.state.ERROR,i.state.UPDATING],i.transitionMatrix[i.state.LOADED]=[i.state.DEFAULT],i.transitionMatrix[i.state.UPDATING]=[i.state.LOADED,i.state.ERROR],i.transitionMatrix[i.state.ERROR]=[i.state.LOADING],i.transitionMatrix[i.state.OFF_SCALE]=[i.state.ERROR,i.state.DEFAULT,i.state.UPDATING],j=Object.getOwnPropertyNames(i.state).map(function(a){return i.state[a]}).join(" "),i});