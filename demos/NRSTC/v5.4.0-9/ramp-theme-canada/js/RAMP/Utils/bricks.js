/*! ramp-theme-canada 26-05-2015 18:49:46 : v. 5.4.0-9 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/lang","dojo/text!./templates/bricks_template.json","utils/util","utils/tmplHelper","utils/array","utils/dictionary"],function(a,b,c,d,e,f){"use strict";function g(a,b){return $(d.template.call(this,a,b,t))}var h,i,j,k,l,m,n,o,p,q,r,s,t=JSON.parse(d.stringifyTemplate(b));return h=Base.extend({event:{CHANGE:"brick/change"},state:{SUCCESS:"brick/success",ERROR:"brick/error",DEFAULT:"brick/default"},initialize:function(b,d){a.mixin(this,{required:null,freezeStates:[],baseTemplate:"default_base_template",noticeTemplate:"default_brick_notice",guid:c.guid()},d,{id:b,_isFrozen:!1,_listeners:{}}),this.node=g(this.baseTemplate,this),a.mixin(this,{noticeNode:this.node.find(".brick-notice-placeholder")}),this.required&&(Array.isArray(this.required)?this.required.forEach(function(a){a.type=a.type?a.type:"all"}):this.required.type=this.required.type?this.required.type:"all")},notify:function(a,b){var c=this;return this._listeners[a]||(this._listeners[a]=[]),this._listeners[a].forEach(function(a){a.call(c,b)}),this},on:function(a,b){return this._listeners[a]||(this._listeners[a]=[]),this._listeners[a].push(b),this},setState:function(a){return this.freeze(-1!==this.freezeStates.indexOf(a)),this},displayNotice:function(a,b){return b=b||this.noticeTemplate,a?this.noticeNode.empty().append(g(b,a)):this.noticeNode.empty(),this},clear:function(){return this.noticeNode.empty(),this},isValid:function(){return!0},setData:function(){return this},getData:function(a,b){var c={};return a=a||{},b?c[this.id]=a:c=a,c},freeze:function(a){this._isFrozen=a,this.disable(a,!0)},disable:function(a,b){return(!this._isFrozen||b)&&(a?this.node.find("button").addClass("disabled").attr("aria-disabled",!0).end().find("input, select").attr("disabled",!0):this.node.find("button").removeClass("disabled").attr("aria-disabled",!1).end().find("input, select").attr("disabled",!1)),this}}),n=h.extend({initialize:function(b,c){var d=this;a.mixin(this,{template:"default_multi_brick_template",containerClass:"multi-brick-container",content:[]}),h.initialize.call(this,b,c),a.mixin(this,{multiContainer:this.node.find(".multi-container"),contentBricks:{}}),this.content.forEach(function(a){var b=a.type["new"](a.id,a.config);d.contentBricks[b.id]=b,d.header&&(b.node=$(b.node.prop("outerHTML").replace("<h3","<h4").replace("</h3>","</h4>"))),d.multiContainer.append(b.node)})},setState:function(a){return f.forEachEntry(this.contentBricks,function(b,c){c.setState(a)}),this},clear:function(){return f.forEachEntry(this.contentBricks,function(a,b){b.clear()}),this},isValid:function(){return f.forEachEntry(this.contentBricks,function(a,b){return b.isValid()?void 0:!1}),!0},setData:function(a){return f.forEachEntry(this.contentBricks,function(b,c){c.setData(a)}),this},getData:function(b){var c={};return f.forEachEntry(this.contentBricks,function(b,d){a.mixin(c,d.getData(!0))}),h.getData.call(this,c,b)}}),i=h.extend({event:a.mixin({},h.event,{CLICK:"buttonBrick/click"}),initialize:function(b,c){var d=this;a.mixin(this,{template:"default_button_brick_template",containerClass:"button-brick-container",buttonClass:"btn-primary",label:"Ok"}),h.initialize.call(this,b,c),this.node.on("click","button:not(.disabled)",function(){d.notify(d.event.CLICK,null)})},isValid:function(){return!0},getData:function(a){var b={};return h.getData.call(this,b,a)}}),j=h.extend({initialize:function(b,c){var d=this;a.mixin(this,{template:"default_checkbox_brick_template",containerClass:"checkbox-brick-container",label:c.header,checked:!1,onLabel:"on",offLabel:"off",value:"on"}),h.initialize.call(this,b,c),a.mixin(this,{userChecked:!1,inputNode:this.node.find("input[type='checkbox']#"+this.guid)}),this.inputNode.on("change",function(){var a=d.inputNode.is(":checked");d.setChecked(a,!0)})},isValid:function(){return!0},setChecked:function(a,b){return this.userChecked=b?!0:!1,this.checked=a,b||this.inputNode.prop("checked",this.checked?"checked":""),this.node.toggleClass("checkbox-checked",this.checked),this.notify(this.event.CHANGE,this.getData()),this},clear:function(){return this.setChecked(!1,!1),h.clear.call(this),this},isUserEntered:function(){return this.userChecked},setData:function(a){return this.setChecked(a.inputValue,a.userChecked),h.setData.call(a),this},getData:function(a){var b={checked:this.checked};return h.getData.call(this,b,a)}}),k=j.extend({initialize:function(b,c){var d={};a.mixin(d,{containerClass:"checkbox-brick-container formstone-brick"},c),j.initialize.call(this,b,d),this.inputNode.checkbox()}}),l=j.extend({initialize:function(b,c){var d={};a.mixin(d,{template:"default_toggle_brick_template",containerClass:"toggle-brick-container"},c),j.initialize.call(this,b,d),this.inputNode.checkbox({toggle:!0,labels:{on:this.onLabel,off:this.offLabel}}),this.header&&this.node.find(".fs-checkbox.fs-checkbox-toggle").prepend(this.node.find(".fs-checkbox-state"))}}),m=n.extend({event:a.mixin({},n.event,i.event,{OK_CLICK:"okCancelButtonBrick/okClick",CANCEL_CLICK:"okCancelButtonBrick/cancelClick"}),okButtonId:"okButton",cancelButtonId:"cancelButton",initialize:function(b,c){var d,e=this;d={containerClass:"okcancelbutton-brick-container",header:c.header,content:[{id:this.okButtonId,type:i,config:{label:c.okLabel,containerClass:"ok-button-brick-container",buttonClass:"ok-btn "+(c.okButtonClass||"btn-sm btn-primary"),freezeStates:c.okFreezeStates||[]}},{id:this.cancelButtonId,type:i,config:{label:c.cancelLabel,containerClass:"cancel-button-brick-container",buttonClass:"cancel-btn "+(c.cancelButtonClass||"btn-sm button-none"),freezeStates:c.cancelFreezeStates||[]}}],required:c.required},c.reverseOrder&&d.content.reverse(),n.initialize.call(this,b,d),a.mixin(this,{okButtonBrick:this.contentBricks[this.okButtonId],cancelButtonBrick:this.contentBricks[this.cancelButtonId]}),this.okButtonBrick.on(this.event.CLICK,function(){e.notify(e.event.OK_CLICK,null),e.notify(e.event.CLICK,null)}),this.cancelButtonBrick.on(this.event.CLICK,function(){e.notify(e.event.CANCEL_CLICK,null),e.notify(e.event.CLICK,null)})}}),o=h.extend({initialize:function(b,c){var d=this;a.mixin(this,{template:"default_choice_brick_template",containerClass:"choice-brick-container"}),h.initialize.call(this,b,c),a.mixin(this,{selectedChoice:"",userSelected:!1}),this.choiceButtons=this.node.find(".btn-choice"),this.node.on("click",".btn-choice:not(.button-pressed)",function(a){var b=$(a.currentTarget).data("key");d.setChoice(b,!0)})},setChoice:function(a,b){return(a!==this.selectedChoice||(b?!0:!1)!==this.userSelected)&&(this.userSelected=b?!0:!1,this.selectedChoice=a,this.choiceButtons.removeClass("button-pressed").filter("[data-key='"+a+"']").addClass("button-pressed"),this.notify(this.event.CHANGE,this.getData())),this},isUserSelected:function(){return this.userSelected},clear:function(){return this.setChoice("",!1),h.clear.call(this),this},isValid:function(){return""!==this.selectedChoice},setData:function(a){return this.setChoice(a.selectedChoice,a.userSelected),h.setData.call(a),this},getData:function(a){var b={selectedChoice:this.selectedChoice,userSelected:this.userSelected};return h.getData.call(this,b,a)}}),r=h.extend({initialize:function(b,d){var e=this;a.mixin(this,{template:"default_simpleinput_brick_template",containerClass:"simpleinput-brick-container",guid:c.guid(),label:d.header}),h.initialize.call(this,b,d),a.mixin(this,{inputValue:"",userEntered:!1,formGroup:this.node.find(".form-group"),inputNode:this.node.find("input[type='text']#"+this.guid)}),this.inputNode.on("input",function(a){var b=$(a.target).val();e.setInputValue(b,!0)})},setInputValue:function(a,b){return this.userEntered=b?!0:!1,this.inputValue=a,b||this.inputNode.val(a),this.notify(this.event.CHANGE,this.getData()),this},isUserEntered:function(){return this.userEntered},setState:function(a){switch(a){case this.state.SUCCESS:this.formGroup.addClass("has-feedback has-success");break;case this.state.ERROR:this.formGroup.addClass("has-feedback has-error");break;case this.state.DEFAULT:this.formGroup.removeClass("has-feedback has-success has-error")}return h.setState.call(this,a),this},clear:function(){return this.setInputValue("",!1),h.clear.call(this),this},isValid:function(){return""!==this.inputValue},setData:function(a){return this.setInputValue(a.inputValue,a.userEntered),h.setData.call(a),this},getData:function(a){var b={inputValue:this.inputValue,userEntered:this.userEntered};return h.getData.call(this,b,a)}}),p=h.extend({initialize:function(b,d){var e=this;a.mixin(this,{template:"default_dropdown_brick_template",containerClass:"dropdown-brick-container",guid:c.guid(),label:d.header}),h.initialize.call(this,b,d),a.mixin(this,{dropDownValue:"",dropDownText:"",userSelected:!1,selectNode:this.node.find("select#"+this.guid)}),this.selectNode.on("change",function(){var a=e.selectNode.find("option:selected");e.setDropDownValue(a,!0)}),this.options&&this.setDropDownOptions(this.options)},selectOption:function(a,b){var c=this.selectNode.find("option[value='"+a+"']");return this.selectNode.val(a),this.setDropDownValue(c,b),this},setDropDownValue:function(a,b){var c=a.val(),d=a.find("option:selected").text();return this.userSelected=b?!0:!1,this.dropDownValue=c,this.dropDownText=d,this.notify(this.event.CHANGE,this.getData()),this},setDropDownOptions:function(a,b){return c.setSelectOptions(this.selectNode,a,b),this},isUserSelected:function(){return this.userSelected},clear:function(){return this.selectOption(""),h.clear.call(this),this},isValid:function(){return""!==this.dropDownValue},setData:function(a){return a.options&&this.setDropDownOptions(a.options,a.append),a.selectedOption?this.selectOption(a.selectedOption,a.userSelected):a.options&&a.options.length>0&&this.selectOption(a.options[0].value,!1),h.setData.call(a),this},getData:function(a){var b={dropDownValue:this.dropDownValue,dropDownText:this.dropDownText,userSelected:this.userSelected};return h.getData.call(this,b,a)}}),q=r.extend({initialize:function(b,d){var e=this,f={};a.mixin(f,{template:"default_colorpicker_brick_template",containerClass:"colorpicker-brick-container",guid:c.guid(),label:d.header,pickerPosition:"top"},d),r.initialize.call(this,b,f),a.mixin(this,{picker:null,pickerSwatch:this.node.find("#"+this.guid+"pickerSwatch")}),this.picker=new jscolor.color(this.inputNode[0],{pickerPosition:"top",styleElement:this.pickerSwatch[0],onImmediateChange:function(){e.notify(e.event.CHANGE,e.getData())}}),this.picker.fromString((new RColor).get(!0).slice(1)),this.pickerSwatch.on("click",function(){e.picker.showPicker()})},setInputValue:function(){},getData:function(a){var b={hex:this.picker.toString(),rgb:this.picker.rgb,rgb_:this.picker.rgb.map(function(a){return Math.round(255*a)}),hsv:this.picker.hsv};return h.getData.call(this,b,a)}}),s=r.extend({initialize:function(b,d){var e=this,f={};a.mixin(f,{template:"default_fileinput_brick_template",containerClass:"fileinput-brick-container",guid:c.guid(),label:d.header},d),r.initialize.call(this,b,f),a.mixin(this,{fileValue:null,userSelected:!1,browseFilesContainer:this.node.find(".browse-files"),fileNode:this.node.find("input[type='file']#"+this.guid+"realBrowse"),filePseudoNode:this.node.find("#"+this.guid+"pseudoBrowse")}),c.styleBrowseFilesButton(this.browseFilesContainer),this.fileNode.on("change",function(a){var b=a.target.files[0];e.setFileValue(b,!0)})},setInputValue:function(a,b){return this.setFileValue(null,!1),r.setInputValue.call(this,a,b),this},setFileValue:function(a,b){return this.userSelected=b?!0:!1,this.fileValue=a,this.filePseudoNode.toggleClass("selected",this.fileValue?!0:!1),this.fileValue?(r.setInputValue.call(this,this.fileValue.name,!1),this.notify(this.event.CHANGE,this.getData())):c.resetFormElement(this.fileNode),this},isUserSelected:function(){return this.userSelected},clear:function(){return this.setInputValue("",!1),h.clear.call(this),this},isValid:function(){return r.isValid.call(this)||this.fileValue?!0:!1},setData:function(a){return a.fileValue?this.setFileValue(a.fileValue,a.userSelected):a.inputValue&&this.setInputValue(a.inputValue,a.userEntered),r.setData.call(a),this},getData:function(b){var c=r.getData.call(this);return a.mixin(c,{fileValue:this.fileValue,fileName:this.fileValue?this.fileValue.name:this.inputValue.split("/").pop(),userSelected:this.userSelected}),h.getData.call(this,c,b)}}),{Brick:h,MultiBrick:n,ButtonBrick:i,CheckboxBrick:j,CheckboxfsBrick:k,ToggleBrick:l,OkCancelButtonBrick:m,ChoiceBrick:o,DropDownBrick:p,ColorPickerBrick:q,SimpleInputBrick:r,FileInputBrick:s}});