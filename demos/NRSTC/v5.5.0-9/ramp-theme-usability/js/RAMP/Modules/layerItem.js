/*! ramp-theme-usability 10-07-2015 14:20:56 : v. 5.5.0-9 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Usability Theme 
 **/
define(["dojo/Evented","dojo/_base/declare","dojo/_base/lang","dojo/text!./templates/layer_selector_template.json","utils/util","utils/tmplHelper","utils/tmplUtil","utils/array","utils/dictionary","utils/bricks"],function(a,b,c,d,e,f,g,h,i,j){"use strict";function k(a){return"undefined"!=typeof a&&a&&0!==a.length||(a=Object.getOwnPropertyNames(m.state).map(function(a){return m.state[a]})),a}function l(a,b){return"undefined"!=typeof b&&b&&0!==b.length||(b=Object.getOwnPropertyNames(m[a]).map(function(b){return m[a][b]})),b}var m,n;return m=b([a],{constructor:function(a,b){c.mixin(this,{id:null,node:null,_config:null,_imageContainerNode:null,_displayNameNode:null,_controlsNode:null,_togglesNode:null,_noticesNode:null,_settingsNode:null,_controlStore:{},_toggleStore:{},_noticeStore:{},_settingsStore:{},templates:JSON.parse(f.stringifyTemplate(d)),state:m.state.DEFAULT,type:null},b,{id:a.id,_config:a,stateMatrix:c.mixin(c.clone(m.stateMatrix),b.stateMatrix),transitionMatrix:c.mixin(c.clone(m.transitionMatrix),b.transitionMatrix)}),m.brickTemplates||(m.brickTemplates={boundingBoxBrick:{type:j.CheckboxfsBrick,config:{label:i18n.t("filterManager.boundingBox"),customContainerClass:"bbox",checked:!1}},allDataBrick:{type:j.ChoiceBrick,config:{header:i18n.t("filterManager.layerData"),template:"default_choice_brick_inline_template",containerClass:"choice-brick-inline-container",customContainerClass:"all-data",choices:[{key:"layerDataPrefetch",value:i18n.t("filterManager.layerDataPrefetch")}]}},allDataCheckedBrick:{type:j.ChoiceBrick,config:{header:i18n.t("filterManager.layerData"),template:"default_choice_brick_inline_template",containerClass:"choice-brick-inline-container",customContainerClass:"all-data",isEnabled:!1,preselect:"layerDataPrefetch",choices:[{key:"layerDataPrefetch",value:i18n.t("filterManager.layerDataPrefetch")}]}}}),tmpl.cache={},tmpl.templates=this.templates;var e=this._config;e.fn=g,this.node=$(tmpl(this.type,e)),this._imageBoxNode=this.node.find(".layer-details > div:first"),this._displayNameNode=this.node.find(".layer-name > span"),this._controlsNode=this.node.find(".layer-controls-group"),this._togglesNode=this.node.find(".layer-checkboxes"),this._noticesNode=this.node.find(".layer-notices"),this._settingsNode=this.node.find(".layer-settings"),this._generateParts("controls","layer_control_",this._controlStore),this._generateParts("toggles","layer_toggle_",this._toggleStore),this._generateParts("notices","layer_notice_",this._noticeStore),this._generateParts("settings","layer_setting_",this._settingsStore),this.setState(this.state,b,!0)},_generateParts:function(a,b,c){var d,e,f,g,i=this,k=[];Object.getOwnPropertyNames(m.state).forEach(function(b){d=m.state[b],k=k.concat(i.stateMatrix[d][a])}),k=h.unique(k),k.forEach(function(a){m.brickTemplates[a]?(f=m.brickTemplates[a],g=f.type["new"](a,f.config),j.CheckboxBrick.isPrototypeOf(g)?g.inputNode.attr("data-layer-id",i._config.id):g.choiceButtons.attr("data-layer-id",i._config.id),e=g.node):e=i._generatePart(b,a),c[a]=e})},_generatePart:function(a,b,c){tmpl.cache={},tmpl.templates=this.templates;var d={id:this.id,config:this._config,nameKey:b,data:c};d.fn=g;var e=$(tmpl(a+b,d));return e},setState:function(a,b,c){var d,f,g=this.transitionMatrix[this.state],h=this;if(-1!==g.indexOf(a)||c){switch(this.state=a,this.node.removeClass(n).addClass(this.state),b&&b.notices&&i.forEachEntry(b.notices,function(a,b){d=h._generatePart("layer_notice_",a,b),h._noticeStore[a]=d}),f=this.node.find(":focus"),this._setParts("controls",this._controlStore,this._controlsNode),this._setParts("toggles",this._toggleStore,this._togglesNode),this._setParts("notices",this._noticeStore,this._noticesNode),this._setParts("settings",this._settingsStore,this._settingsNode),this.state){case m.state.DEFAULT:break;case m.state.LOADING:this.node.attr("aria-busy",!0);break;case m.state.LOADED:this.node.attr("aria-busy",!1),this.setState(m.state.DEFAULT);break;case m.state.ERROR:break;case m.state.OFF_SCALE:}return f.length>0&&(e.containsInDom(f[0])?f.focus():this.node.find(":focusable:first").focus()),!0}return!1},refresh:function(){this.setState(this.state,null,!0)},_setParts:function(a,b,c){var d=[];this.stateMatrix[this.state][a].forEach(function(a){d.push(b[a])}),c.children().detach().end().append(d)}}),c.mixin(m,{state:{DEFAULT:"layer-state-default",LOADING:"layer-state-loading",LOADED:"layer-state-loaded",UPDATING:"layer-state-updating",ERROR:"layer-state-error",OFF_SCALE:"layer-state-off-scale"},partTypes:{TOGGLES:"toggles",CONTROLS:"controls",NOTICES:"notices",SETTINGS:"settings"},controls:{METADATA:"metadata",SETTINGS:"settings",LOADING:"loading",REMOVE:"remove",RELOAD:"reload",ERROR:"error"},toggles:{EYE:"eye",BOX:"box",RELOAD:"reload",HIDE:"hide",ZOOM:"zoom",PLACEHOLDER:"placeholder",QUERY:"query"},notices:{SCALE:"scale",ERROR:"error",UPDATE:"update",USER:"user"},settings:{OPACITY:"opacity",BOUNDING_BOX:"boundingBoxBrick",SNAPSHOT:"snapshot",ALL_DATA:"allDataBrick",ALL_DATA_CHECKED:"allDataCheckedBrick"},stateMatrix:{},transitionMatrix:{},brickTemplates:null}),m.stateMatrix[m.state.DEFAULT]={controls:[m.controls.METADATA,m.controls.SETTINGS,m.controls.REMOVE],toggles:[],notices:[],settings:[m.settings.OPACITY]},m.stateMatrix[m.state.LOADING]={controls:[m.controls.LOADING],toggles:[],notices:[],settings:[m.settings.OPACITY]},m.stateMatrix[m.state.LOADED]={controls:[],toggles:[],notices:[],settings:[]},m.stateMatrix[m.state.UPDATING]={controls:[m.controls.METADATA,m.controls.SETTINGS,m.controls.REMOVE],toggles:[],notices:[m.notices.UPDATE],settings:[m.settings.OPACITY]},m.stateMatrix[m.state.ERROR]={controls:[m.controls.RELOAD,m.controls.REMOVE],toggles:[],notices:[m.notices.ERROR],settings:[m.settings.OPACITY]},m.stateMatrix[m.state.OFF_SCALE]={controls:[m.controls.METADATA,m.controls.SETTINGS,m.controls.REMOVE],toggles:[m.toggles.ZOOM],notices:[m.notices.SCALE],settings:[m.settings.OPACITY]},m.transitionMatrix[m.state.DEFAULT]=[m.state.ERROR,m.state.OFF_SCALE,m.state.UPDATING],m.transitionMatrix[m.state.LOADING]=[m.state.LOADED,m.state.ERROR,m.state.UPDATING],m.transitionMatrix[m.state.LOADED]=[m.state.DEFAULT],m.transitionMatrix[m.state.UPDATING]=[m.state.LOADED,m.state.ERROR],m.transitionMatrix[m.state.ERROR]=[m.state.LOADING],m.transitionMatrix[m.state.OFF_SCALE]=[m.state.ERROR,m.state.DEFAULT,m.state.UPDATING],m.addStateMatrixPart=function(a,b,c,d,e){var f;d=k(d),d.forEach(function(d){f=a[d][b],e?f.unshift(c):f.push(c)})},m.addStateMatrixParts=function(a,b,c,d,e,f){var g=this;c=l(b,c),d=k(d),f&&d.forEach(function(c){a[c][b]=[]}),c.forEach(function(c){g.addStateMatrixPart(a,b,c,d,e)})},m.removeStateMatrixPart=function(a,b,c,d){d=k(d),d.forEach(function(d){h.remove(a[d][b],c)})},m.removeStateMatrixParts=function(a,b,c,d){var e=this;c=l(b,c),d=k(d),c.forEach(function(c){e.removeStateMatrixPart(a,b,c,d)})},m.getStateMatrixTemplate=function(){return c.clone(m.stateMatrix)},n=Object.getOwnPropertyNames(m.state).map(function(a){return m.state[a]}).join(" "),m});