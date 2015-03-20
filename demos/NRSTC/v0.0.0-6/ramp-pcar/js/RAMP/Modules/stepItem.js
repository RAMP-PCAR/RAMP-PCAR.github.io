/*! ramp-pcar 20-03-2015 15:38:01 : v. 5.2.0-1 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/Evented","dojo/_base/declare","dojo/_base/lang","dojo/text!./templates/filter_manager_template.json","utils/util","utils/tmplHelper","utils/tmplUtil","utils/array","utils/dictionary","utils/bricks"],function(a,b,c,d,e,f,g,h,i,j){"use strict";var k,l,m=JSON.parse(f.stringifyTemplate(d));return k=b([a],{constructor:function(a){var b=this;c.mixin(this,{id:null,level:0,node:null,content:null,contentBricks:{},template:"default_step_template",_contentNode:null,_optionsContainerNode:null,_optionsBackgroundNode:null,_optionsNode:null,_childSteps:{},_activeChildStep:null,_parent:null,_stepData:{},_state:k.state.DEFAULT,_timeline:new TimelineLite({paused:!0}),_transitionDuration:.4},a),this.node=$(f.template.call(null,this.template,a,m)),this._contentNode=this.node.find("> .step-content"),this._optionsContainerNode=this.node.find("> .step-options-container"),this._optionsBackgroundNode=this._optionsContainerNode.find("> .options-bg"),this._optionsNode=this._optionsContainerNode.find("> .step-options"),this.content.forEach(function(a){b._addContentBrick(a)})},_addContentBrick:function(a){var b=this,c=a.type["new"](a.id,a.config);j.MultiBrick===a.type?c.content.forEach(function(a){b._wireBrickUp(a,c.contentBricks[a.id])}):b._wireBrickUp(a,c),this._contentNode.append(c.node),this._doInternalCheck()},_wireBrickUp:function(a,b){var c=this;this.contentBricks[b.id]=b,a.on&&a.on.forEach(function(a){b.on(a.eventName,function(d){a.callback&&a.callback.call(b,c,d),a.expose&&(c._doInternalCheck(),c.emit(b.id+"/"+a.eventName,d),a.expose.as&&c.emit(a.expose.as,{brick:b,brickData:d}))})}),b.on(j.Brick.event.CHANGE,function(){c._doInternalCheck()})},_internalCheckHelper:function(a,b,c){var d=!1;switch(a.type){case"all":d=a.check.every(function(a){return c[a].isValid()});break;case"any":d=a.check.some(function(a){return c[a].isValid()})}b.disable(!d)},_doInternalCheck:function(){var a=this;i.forEachEntry(this.contentBricks,function(b,c){c.required&&(j.MultiBrick.isPrototypeOf(c)&&Array.isArray(c.required)?c.required.forEach(function(b){a._internalCheckHelper(b,c.contentBricks[b.id],a.contentBricks)}):a._internalCheckHelper(c.required,c,a.contentBricks))}),this._state===k.state.ERROR&&this._notifyStateChange(k.state.DEFAULT)},_makeCloseTimeline:function(a,b){var c,d=new TimelineLite,e=[];return this._getCloseTimelines(e,a,b),e=e.reverse(),e.length>0&&(c=this._transitionDuration/2/e.length,d.add(e,"+=0","start",c)),d},_getCloseTimelines:function(a,b,c){var d=new TimelineLite,e=this;return this._activeChildStep&&(b||(d.call(function(){e._notifyCurrentStepChange()}).to(this._optionsContainerNode,this._transitionDuration,{top:-this._activeChildStep.getContentOuterHeight(),ease:"easeOutCirc"},0).set(this._activeChildStep,{className:"-=active-option"}).set(this._optionsContainerNode,{display:"none"}),a.push(d)),c&&this._notifyStateChange(k.state.DEFAULT),this._activeChildStep._getCloseTimelines(a)),this},_makeShiftTimeline:function(a){var b=new TimelineLite,c=this._childSteps[a],d=this._getChildNodes(),e=this._getChildNodes([a]);return this._activeChildStep&&b.set(d,{display:"inline-block"}).to(this._optionsBackgroundNode,this._transitionDuration,{height:c.getContentOuterHeight(),"line-height":c.getContentOuterHeight(),ease:"easeOutCirc"},0).fromTo(this._optionsNode,this._transitionDuration,{left:-this._activeChildStep.getContentPosition().left},{left:-c.getContentPosition().left,ease:"easeOutCirc"},0).set(e,{className:"-=active-option"}).set(c.node,{className:"+=active-option"}).set(this._optionsNode,{left:0}).set(e,{display:"none"}).call(function(){c._notifyStateChange(c._state)},null,null,this._transitionDuration/3),b},_makeOpenTimeline:function(a,b){var c,d=new TimelineLite,e=[];return this._getOpenTimelines(e,a,b),e.length>0&&(c=this._transitionDuration/2/e.length,d.add(e,"+=0","start",c)),d},_getOpenTimelines:function(a,b,c){var d=new TimelineLite,e=b?this._childSteps[b]:this._activeChildStep,f=this._getChildNodes([b]);return e&&(c||(d.set(this._optionsContainerNode,{display:"block",top:-9999},0).set(this._optionsNode,{left:0},0).set(f,{display:"none"},0).set(e.node,{className:"+=active-option",display:"inline-block"},0).call(function(){e._notifyCurrentStepChange()}).to(this._optionsBackgroundNode,0,{height:e.getContentOuterHeight(),"line-height":e.getContentOuterHeight()},0).to(this._optionsContainerNode,0,{height:e.getContentOuterHeight(),ease:"easeOutCirc"},0).fromTo(this._optionsContainerNode,this._transitionDuration,{top:-this._optionsContainerNode.height()},{top:0,ease:"easeOutCirc"},0).set(this._optionsContainerNode,{height:"auto"}),a.push(d)),this._notifyStateChange(k.state.SUCCESS),this.displayBrickNotices(),e._getOpenTimelines(a)),this},_getChildNodes:function(a){var b=[];return i.forEachEntry(this._childSteps,function(c,d){a&&-1!==a.indexOf(d.id)||b.push(d.node)}),b},_notifyCurrentStepChange:function(){this._emit(k.event.CURRENT_STEP_CHANGE,{id:this.id,level:this.level})},_notifyStateChange:function(a){var b;switch(this._state=a,a){case k.state.SUCCESS:b=j.Brick.state.SUCCESS;break;case k.state.ERROR:b=j.Brick.state.ERROR;break;default:b=j.Brick.state.DEFAULT}return i.forEachEntry(this.contentBricks,function(a,c){c.setState(b)}),this._emit(k.event.STATE_CHANGE,{id:this.id,level:this.level,state:this._state}),this},_emit:function(a,b){this.emit(a,b)},getData:function(){var a={stepData:this._stepData,bricksData:{}};return i.forEachEntry(this.contentBricks,function(b,d){c.mixin(a.bricksData,d.getData(!0))}),a},addChild:function(a){return this._optionsNode.append(a.node),this._childSteps[a.id]=a,a._parent=this,this},clearStep:function(a){var b=[];return this._notifyStateChange(k.state.DEFAULT),Array.isArray(a)?a.forEach(function(a){this.contentBricks[a].clear(),b.push(this.contentBricks[a])}):i.forEachEntry(this.contentBricks,function(a,c){c.clear(),b.push(c)}),this.displayBrickNotices(),this},setState:function(a,b,c){var d=this;1===this.level&&1===a?this.node.removeClass(l).addClass(c):i.forEachEntry(this._childSteps,function(e,f){e===b&&f.level===a&&d._optionsContainerNode.removeClass(l).addClass(c)})},currentStep:function(a,b){var c=this;1===this.level&&1===a?this.node.addClass(k.currentStepClass):(this.node.removeClass(k.currentStepClass),this._optionsContainerNode.removeClass(k.currentStepClass),i.forEachEntry(this._childSteps,function(d,e){d===b&&e.level===a&&c._optionsContainerNode.addClass(k.currentStepClass)}))},isValid:function(){return i.forEachEntry(this.contentBricks,function(a,b){return b.isValid()?void 0:!1}),!0},isCompleted:function(){return this._state===k.state.SUCCESS},setData:function(a){var b=this;a&&(a.bricksData&&i.forEachEntry(a.bricksData,function(a,c){b.contentBricks[a].setData(c)}),a.stepData&&(this._stepData=a.stepData))},displayBrickNotices:function(a){var b=this,c=[];a?i.forEachEntry(a,function(a,d){b.contentBricks[a].displayNotice(d),c.push(b.contentBricks[a])}):i.forEachEntry(this.contentBricks,function(a,b){b.displayNotice(),c.push(b)}),this._toggleBrickNotices(c,a)},_toggleBrickNotices:function(a,b){var c,d=this,e=this.getContentOuterHeight(),f=0,g=new TimelineLite({paused:!0});c=a.map(function(a){return a.noticeNode}).filter(function(a){return a.length>0}),b&&g.set(c,{height:0,visibility:"visible",position:"relative"},0),c.forEach(function(a){f+=a.height(),g.to(a,d._transitionDuration/2,{height:b?a.height():0,ease:"easeOutCirc"},0)}),b||g.set(c,{clearProps:"all"}),f=b?0:-f,this._parent&&g.to(this._parent._optionsBackgroundNode,this._transitionDuration/2,{height:e+f,"line-height":e+f,ease:"easeOutCirc"},0),g.play()},retreat:function(){var a,b=this;return this._timeline.seek("+=0",!1).clear(),a=this._makeCloseTimeline(!1,!0),this._timeline.add(a).call(function(){b._activeChildStep=null}),this._timeline.play(0),this},advance:function(a,b){var c,d,e,f,g=this._childSteps[a],h=this;return g?(this._timeline.seek("+=0",!1).clear(),f=this._activeChildStep?!0:!1,g.setData(b),c=this._makeCloseTimeline(f),d=this._makeShiftTimeline(a),e=this._makeOpenTimeline(a,f),this._timeline.add(c).add(d).add(e).call(function(){h._activeChildStep=g}),this._timeline.play(0),this):this},getContentPosition:function(){return this._contentNode.position()},getContentOuterHeight:function(){return this._contentNode.outerHeight()}}),c.mixin(k,{currentStepClass:"current-step",state:{SUCCESS:"step-state-success",ERROR:"step-state-error",DEFAULT:"step-state-default",LOADING:"step-state-loading"},event:{CURRENT_STEP_CHANGE:"stepItem/currentStepChange",STATE_CHANGE:"stepItem/stateChange"}}),l=Object.getOwnPropertyNames(k.state).map(function(a){return k.state[a]}).join(" "),k});