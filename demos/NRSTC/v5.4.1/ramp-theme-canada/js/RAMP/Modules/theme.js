/*! ramp-theme-canada 19-06-2015 18:15:02 : v. 5.4.1 
 * 
 * RAMP GIS viewer - Groundhog; Sample of an implementation of RAMP with Canada.ca Theme 
 **/
define(["dojo/_base/lang","utils/util","utils/popupManager"],function(a,b,c){"use strict";function d(a){q.clear().fromTo(".sub-panel-container.summary-data-details",k,{top:l.headerHeight+l.toolbarHeight,bottom:l.footerHeight},{top:l.headerHeightCollapsed+l.toolbarHeight,bottom:l.footerHeightCollapsed,ease:"easeOutCirc"},0).fromTo(".sub-panel-container.full-data-details",k,{top:l.headerHeight,bottom:l.footerHeight},{top:l.headerHeightCollapsed,bottom:l.footerHeightCollapsed,ease:"easeOutCirc"},0),o=b.isUndefined(a)?!o:a,o?(TweenLite.to(".full-data-mode .dataTables_scrollBody",k,{height:"+="+m,ease:"easeOutCirc",delay:.02}),p.play()):(TweenLite.to(".full-data-mode .dataTables_scrollBody",k-.02,{height:"-="+m,ease:"easeInCirc"}),e.removeClass("full-screen"),p.reverse())}var e=$("body"),f=$("main"),g=$("footer"),h=g.find(".footer-container"),i=$("#wb-sm"),j=$("body>header"),k=.5,l={headerHeight:194,headerHeightCollapsed:56,footerHeight:84,footerHeightCollapsed:5,toolbarHeight:32},m=l.headerHeight-l.headerHeightCollapsed+l.footerHeight-l.footerHeightCollapsed,n=new TimelineLite({paused:!0}),o=!1,p=new TimelineLite({paused:!0}),q=new TimelineLite;return n.to(h,k,{height:"471px",ease:"easeOutCirc"}).set(h,{scrollTop:0},0).set(g,{className:"+=expanded"},0),p.to(j,k,{top:"-99px",position:"relative",ease:"easeOutCirc"},0).set([i],{display:"none !important"}).to(f,k,{top:l.headerHeightCollapsed,bottom:l.footerHeightCollapsed,ease:"easeOutCirc"},0).to(g,k,{height:l.footerHeightCollapsed,ease:"easeOutCirc"},0).call(function(){e.addClass("full-screen")}).add(q,0),c.registerPopup(g,"hoverIntent, focus",function(a){n.eventCallback("onComplete",function(){a.resolve()}),n.play()},{targetSelector:".wb-navcurr, .wb-navcurr a",useAria:!1,timeout:500,closeHandler:function(a){n.eventCallback("onReverseComplete",function(){h.scrollTop(0),a.resolve()}),n.reverse()}}),TweenLite.to(h,k,{height:"84px",ease:"easeOutCirc"}),{fullScreenCallback:function(a,b){return p.eventCallback(a,b),this},isFullScreen:function(){return o},toggleFullScreenMode:function(a){return d(a),this},tooltipster:function(b,c,d,e){var f;switch(b=b||$("body"),c){case"map":break;default:f={theme:"tooltipster-shadow",delay:500}}switch(d){case"update":b.find(".tooltipstered").each(function(a,b){var c=$(b);c.attr("data-tooltip",c.attr("title")).tooltipster("content",c.attr("title")).removeAttr("title")});break;case"destroy":b.find(".tooltipstered").each(function(a,b){var c=$(b);c.tooltipster("destroy")});break;default:b.find(".tooltip, ._tooltip").each(function(b,c){var d=$(c),g=d.attr("title");g?d.attr("data-tooltip",d.attr("title")):d.attr("title",d.data("tooltip")),d.tooltipster(a.mixin({theme:d.data("tooltip-theme")||f.theme,maxWidth:d.data("tooltip-maxwidth")||null,delay:f.delay},e))}).removeAttr("title")}return this}}});