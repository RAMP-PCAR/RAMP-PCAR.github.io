/*! ramp-theme-intranet 26-05-2015 18:56:28 : v. 5.4.0-9 
 * 
 * RAMP GIS viewer - Elk; Sample of an implementation of RAMP with Intranet Theme 
 **/
define(["dojo/_base/lang","utils/util"],function(a,b){"use strict";function c(a){n.clear().fromTo(".sub-panel-container.summary-data-details",i,{top:j.headerHeight+j.toolbarHeight,bottom:j.footerHeight},{top:j.headerHeightCollapsed+j.toolbarHeight,bottom:j.footerHeightCollapsed,ease:"easeOutCirc"},0).fromTo(".sub-panel-container.full-data-details",i,{top:j.headerHeight,bottom:j.footerHeight},{top:j.headerHeightCollapsed,bottom:j.footerHeightCollapsed,ease:"easeOutCirc"},0),l=b.isUndefined(a)?!l:a,l?(TweenLite.to(".full-data-mode .dataTables_scrollBody",i,{height:"+="+k,ease:"easeOutCirc",delay:.02}),m.play()):(TweenLite.to(".full-data-mode .dataTables_scrollBody",i-.02,{height:"-="+k,ease:"easeInCirc"}),d.removeClass("full-screen"),m.reverse())}var d=$("body"),e=$("main"),f=$("footer"),g=$("#wb-bar"),h=$("body>header"),i=.5,j={headerHeight:195,headerHeightCollapsed:53,footerHeight:30,footerHeightCollapsed:5,subtitleHeight:35,toolbarHeight:32},k=j.headerHeight-j.headerHeightCollapsed+j.footerHeight-j.footerHeightCollapsed,l=!1,m=new TimelineLite({paused:!0}),n=new TimelineLite;return d.hasClass("sub-title")&&(j.headerHeight+=j.subtitleHeight,k+=j.subtitleHeight),m.to(h,i,{top:-1*g.outerHeight(),position:"relative",ease:"easeOutCirc"},0).to(e,i,{top:j.headerHeightCollapsed,bottom:j.footerHeightCollapsed,ease:"easeOutCirc"},0).to(f,i,{height:j.footerHeightCollapsed,ease:"easeOutCirc"},0).call(function(){d.addClass("full-screen")}).add(n,0),{fullScreenCallback:function(a,b){return m.eventCallback(a,b),this},isFullScreen:function(){return l},toggleFullScreenMode:function(a){return c(a),this},tooltipster:function(b,c,d,e){var f;switch(b=b||$("body"),c){case"map":break;default:f={theme:"tooltipster-shadow",delay:500}}switch(d){case"update":b.find(".tooltipstered").each(function(a,b){var c=$(b);c.attr("data-tooltip",c.attr("title")).tooltipster("content",c.attr("title")).removeAttr("title")});break;case"destroy":b.find(".tooltipstered").each(function(a,b){var c=$(b);c.tooltipster("destroy")});break;default:b.find(".tooltip, ._tooltip").each(function(b,c){var d=$(c),g=d.attr("title");g?d.attr("data-tooltip",d.attr("title")):d.attr("title",d.data("tooltip")),d.tooltipster(a.mixin({theme:d.data("tooltip-theme")||f.theme,maxWidth:d.data("tooltip-maxwidth")||null,delay:f.delay},e))}).removeAttr("title")}return this}}});