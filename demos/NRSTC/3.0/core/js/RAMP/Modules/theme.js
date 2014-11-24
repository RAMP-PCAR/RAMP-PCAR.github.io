/*! ramp-pcar 12-11-2014 15:03:54 : v. 3.0.1 
 * 
 * RAMP GIS viewer - Canada Goose; Sample of an implementation of RAMP 
 **/
define(["utils/util"],function(a){"use strict";function b(b){var c=new TimelineLite({paused:!0});l=a.isUndefined(b)?!l:b,l?(m.play(),c.to(".sub-panel-container.summary-data-details",i,{top:j.headerHeightCollapsed+j.toolbarHeight,bottom:j.footerHeightCollapsed,ease:"easeOutCirc"},0).to(".sub-panel-container.full-data-details",i,{top:j.headerHeightCollapsed,bottom:j.footerHeightCollapsed,ease:"easeOutCirc"},0).to(".full-data-mode .dataTables_scrollBody",i,{height:"+="+k,ease:"easeOutCirc"},.01)):(m.reverse(),c.to(".sub-panel-container.summary-data-details",i,{top:j.headerHeight+j.toolbarHeight,bottom:j.footerHeight,ease:"easeInCirc"},0).to(".sub-panel-container.full-data-details",i,{top:j.headerHeight,bottom:j.footerHeight,ease:"easeInCirc"},0).to(".full-data-mode .dataTables_scrollBody",i-.01,{height:"-="+k,ease:"easeInCirc"},0)),c.play()}var c=$("body"),d=$("main"),e=$("footer"),f=$("#wb-sm"),g=$("#wb-bar"),h=$("header"),i=.5,j={headerHeight:155,headerHeightCollapsed:64,footerHeight:30,footerHeightCollapsed:5,subtitleHeight:35,toolbarHeight:32},k=j.headerHeight-j.headerHeightCollapsed+j.footerHeight-j.footerHeightCollapsed,l=!1,m=new TimelineLite({paused:!0});return m.to(h,i,{top:-1*g.outerHeight(),position:"relative",ease:"easeOutCirc"},0).set([g,f],{display:"none !important"}).to(d,i,{top:j.headerHeightCollapsed,bottom:j.footerHeightCollapsed,ease:"easeOutCirc"},0).to(e,i,{height:j.footerHeightCollapsed,ease:"easeOutCirc"},0).set(c,{className:"+=full-screen"}),{fullScreenCallback:function(a,b){return m.eventCallback(a,b),this},isFullScreen:function(){return l},toggleFullScreenMode:function(a){return b(a),this},tooltipster:function(a,b,c){var d;switch(a=a||$("body"),b){case"map":break;default:d={theme:"tooltipster-shadow",delay:500}}switch(c){case"update":a.find(".tooltipstered").each(function(a,b){var c=$(b);c.tooltipster("content",c.attr("title")).removeAttr("title")});break;case"destroy":a.find(".tooltipstered").each(function(a,b){var c=$(b);c.tooltipster("destroy")});break;default:a.find(".tooltip, ._tooltip").tooltipster({theme:"tooltipster-shadow",delay:500})}return this}}});