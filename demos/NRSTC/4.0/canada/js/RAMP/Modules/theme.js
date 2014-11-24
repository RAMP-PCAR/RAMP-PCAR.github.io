/*! ramp-theme-canada 21-11-2014 12:57:38 : v. 4.0.0 
 * 
 * RAMP GIS viewer - Dragonfly; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["utils/util","utils/popupManager"],function(a,b){"use strict";function c(b){var c=new TimelineLite({paused:!0});n=a.isUndefined(b)?!n:b,n?(o.play(),c.to(".sub-panel-container.summary-data-details",j,{top:k.headerHeightCollapsed+k.toolbarHeight,bottom:k.footerHeightCollapsed,ease:"easeOutCirc"},0).to(".sub-panel-container.full-data-details",j,{top:k.headerHeightCollapsed,bottom:k.footerHeightCollapsed,ease:"easeOutCirc"},0).to(".full-data-mode .dataTables_scrollBody",j,{height:"+="+l,ease:"easeOutCirc"},.01)):(o.reverse(),c.to(".sub-panel-container.summary-data-details",j,{top:k.headerHeight+k.toolbarHeight,bottom:k.footerHeight,ease:"easeInCirc"},0).to(".sub-panel-container.full-data-details",j,{top:k.headerHeight,bottom:k.footerHeight,ease:"easeInCirc"},0).to(".full-data-mode .dataTables_scrollBody",j-.01,{height:"-="+l,ease:"easeInCirc"},0)),c.play()}var d=$("body"),e=$("main"),f=$("footer"),g=f.find(".wb-navcurr"),h=$("#wb-sm"),i=$("header"),j=.5,k={headerHeight:194,headerHeightCollapsed:56,footerHeight:84,footerHeightCollapsed:5,toolbarHeight:32},l=k.headerHeight-k.headerHeightCollapsed+k.footerHeight-k.footerHeightCollapsed,m=new TimelineLite({paused:!0}),n=!1,o=new TimelineLite({paused:!0});return m.to(g,j,{top:"-313px",ease:"easeOutCirc"}).set(g,{className:"+=expanded"},0),o.to(i,j,{top:"-99px",position:"relative",ease:"easeOutCirc"},0).set([h],{display:"none !important"}).to(e,j,{top:k.headerHeightCollapsed,bottom:k.footerHeightCollapsed,ease:"easeOutCirc"},0).to(f,j,{height:k.footerHeightCollapsed,ease:"easeOutCirc"},0).set(d,{className:"+=full-screen"}),b.registerPopup(f,"hoverIntent, focus",function(a){m.onComplete=function(){a.resolve()},m.play()},{targetSelector:".wb-navcurr, .wb-navcurr a",useAria:!1,timeout:500,closeHandler:function(a){m.onComplete=function(){a.resolve()},m.reverse()}}),TweenLite.to(g,j,{top:"74px",ease:"easeOutCirc"}),{fullScreenCallback:function(a,b){return o.eventCallback(a,b),this},isFullScreen:function(){return n},toggleFullScreenMode:function(a){return c(a),this},tooltipster:function(a,b,c){var d;switch(a=a||$("body"),b){case"map":break;default:d={theme:"tooltipster-shadow",delay:500}}switch(c){case"update":a.find(".tooltipstered").each(function(a,b){var c=$(b);c.tooltipster("content",c.attr("title")).removeAttr("title")});break;case"destroy":a.find(".tooltipstered").each(function(a,b){var c=$(b);c.tooltipster("destroy")});break;default:a.find(".tooltip, ._tooltip").tooltipster({theme:"tooltipster-shadow",delay:500})}return this}}});