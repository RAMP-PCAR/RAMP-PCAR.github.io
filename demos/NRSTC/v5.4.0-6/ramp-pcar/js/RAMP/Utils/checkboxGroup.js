/*! ramp-pcar 08-05-2015 14:52:01 : v. 5.4.0-6 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP 
 **/
define(["dojo/Evented","dojo/_base/declare","dojo/_base/lang","utils/checkbox","utils/array"],function(a,b,c,d,e){"use strict";var f;return f=b([a],{constructor:function(a,b){var e,g=this;c.mixin(this,{nodes:[],nodeIdAttr:"id",checkboxes:[],cssClass:{active:"active",focus:"focused",check:"checked"},label:{check:"checked",uncheck:"unchecked"},onChange:function(){},master:{node:null,checkbox:null,nodeIdAttr:null,cssClass:{active:"active",focus:"focused",check:"checked"},label:{check:"checked",uncheck:"unchecked"},onChange:function(){}}},b,{nodes:a}),e={nodeIdAttr:this.nodeIdAttr,cssClass:this.cssClass,label:this.label,onChange:this.onChange},this.master.node?(this.master.checkbox=new d(this.master.node,c.mixin(e,this.master)),this.master.checkbox.on(d.event.TOGGLE,function(a){g.emit(f.event.MASTER_TOGGLE,a),a.agency===d.agency.USER&&g.setState(a.checkbox.state)})):this.master=null,this.addCheckbox(this.nodes)},addCheckbox:function(a){var b,c,g=this,h={nodeIdAttr:this.nodeIdAttr,cssClass:this.cssClass,label:this.label,onChange:this.onChange};a.each(function(a,i){i=$(i),c=e.indexOf(g.checkboxes,function(a){return a.node.is(i)}),-1===c?(b=new d(i,h),g.checkboxes.push(b),b.on(d.event.TOGGLE,function(a){g.emit(f.event.MEMBER_TOGGLE,a),a.agency===d.agency.USER&&g._checkMaster()})):g.checkboxes[c].reset()}),this._checkMaster()},_checkMaster:function(){var a;a=0===this.checkboxes.filter(function(a){return!a.validate().state}).length,this.master&&this.master.checkbox.setState(a)},setState:function(a,b){var c,d=this.master.checkbox?this.master.checkbox.id:void 0;if(b&&d!==b){for(var e=0;e<this.checkboxes.length&&(c=this.checkboxes[e],c.id!==b);e++);c&&c.setState(a),this._checkMaster()}else this.master.checkbox.setState(a),this.checkboxes.forEach(function(b){b.setState(a)});return this},setEachState:function(a){return this.checkboxes.forEach(function(b){b.setState(a(b))}),this._checkMaster(),this},_purgeInvalid:function(){var a,b;for(a=this.checkboxes.length-1;a>=0;a--)b=this.checkboxes[a],b.state===d.state.INVALID&&e.remove(this.checkboxes,a)}}),c.mixin(f,{event:{MEMBER_TOGGLE:"checkbox/member-toggle",MASTER_TOGGLE:"checkbox/master-toggle"}}),f});