jQuery(function(o){function r(){var e=n.getItem("collapsibleNav")||"{}";return e=JSON.parse(e)}function l(e){if(!(e=o(e)).closest("li").children("a:first").length)return!1;var t,a=d(e),i=r();return i[a]=!i[a],t=i,n.setItem("collapsibleNav",JSON.stringify(t)),i[a]}var n=localStorage,d=function(e){var t=(e=o(e)).closest("li").children("a:first");return t.length?(e.closest("[id]").attr("id")||"no_id")+"_"+t.attr("href"):null};o(".collapsible-nav .pages-hierarchy").each(function(e,t){t=o(t);var a,i,n,s=o('<button class="toggle-list">');s.insertBefore(t),s.parent("li").addClass("is-toggling"),a=s,i=r(),n=d(a),Boolean(i[n])&&s.addClass("is-expanded"),s.on("click",function(){var e,t;e=o(this),t=l(e),e.toggleClass("is-expanded",t),e.blur()})})}),jQuery(function(a){var i=location.pathname+location.search;a("#sidebar, .js-sidebar").each(function(e,t){a(t).find("ul a").filter('[href="'+i+'"]').removeClass("selected").filter(":eq(0)").addClass("selected")})}),jQuery(function(e){e('<span id="gotobottom">').appendTo("body");var t=e('<a class="gotobottom" title="Nach unten" href="#gotobottom">Nach unten</a>');e("a.gototop").attr("title","Nach oben").after(t)}),jQuery(function(e){var t=e.trim(e("h1 .current-project").text()),a=e.trim(document.title).replace(new RegExp("- "+t+".*"),""),i=e("p.breadcrumb");e('<span class="page-title">').html(a).appendTo(i),e('<span class="separator">').html("»").appendTo(i)}),jQuery(function(u){function e(a){var i,n="redmine_api_token",e=sessionStorage.getItem(n),s=(new Date).getTime();(e=e&&JSON.parse(e))&&e.updatedAt+1e4>s?a(e.token):(sessionStorage.setItem(n,null),i=function(e){var t=JSON.stringify({token:e,updatedAt:s});sessionStorage.setItem(n,t),a(e)},u.ajax({url:"/my/api_key",dataType:"text",success:function(e){var t=/<pre>(.*?)<\/pre>/.exec(e);t?i(t[1]):console.log("Could not collect api key!")}}))}function i(e,t){c=c||u('<nav class="cross-links">').appendTo("body");var a=e.title.replace(/_/g," "),i=e.labelPrefix?'<strong class="label-prefix">'+e.labelPrefix+"</strong>":"";u('<a class="cross-link">').html(i+e.label).attr({href:t+"/"+encodeURIComponent(e.id),title:a}).addClass("type-"+(e.type||"book")).appendTo(c)}var t,a,n,s,o,r=(t=u("#issue-form.edit_issue").attr("action"))?/\d+/.exec(t)[0]:null,l=u("#main-menu, .js-project-menu").find("a.wiki").attr("href")||null,d=(a=document.title+" "+u("h1, h2").text(),n={},a.replace(/#(\d+)/g,function(e,t){n[t]=t}),Object.keys(n)),c=null;r&&l&&(s=l+"/index.json",o=function(e){u.each(e.wiki_pages,function(e,t){var a;-1<t.title.indexOf("#"+r)&&(a=Object.assign({id:t.title,label:t.title.replace(/_/g," "),labelPrefix:"Briefing "},t),i(a,l))})},e(function(a){u.ajax({url:s,dataType:"json",beforeSend:function(e){var t=btoa(a+":x");e.setRequestHeader("Authorization","Basic "+t)},success:function(e){o(e)}})})),d.length&&u("#main-menu, .js-project-menu").find("a.wiki").is(".selected")&&u.each(d,function(e,t){i({title:"Ticket #"+t,id:t,label:"#"+t,labelPrefix:"Ticket ",type:"ticket"},"/issues")}),u("#top-menu, #main-menu").find('a[href$="/wiki"]').each(function(e,i){i=u(i);function t(e){var t=u('<div class="wiki-flyout-anchor">');r.html(e);var a=r.find(".collapsible-nav").detach();a.find("> li:has(a:contains(Briefings))").remove(),a.find("a:contains(Veraltete) + .pages-hierarchy").remove(),r.empty(),a.appendTo(r),t.append(r).insertAfter(i)}function a(e){clearTimeout(c),c=setTimeout(function(){i.parent().toggleClass("flyout-active",e)},200)}var n="wikiFlyouts",s=localStorage,o=i.attr("href"),r=u('<div class="wiki-flyout">'),l=JSON.parse(s.getItem(n)||"{}"),d=l[o],c=null;i.add(r).on("mouseenter",function(){a(!0)}),i.add(r).on("mouseleave",function(){a(!1)}),d&&d.expires>(new Date).getTime()?t(d.html):u.ajax({url:o,dataType:"text",success:function(e){e=e.replace(/^[\s\S]+?<div id="sidebar">|<div id="content">[\s\S]+?$/g,""),l[o]={expires:(new Date).getTime()+18e5,html:e},s.setItem(n,JSON.stringify(l)),t(e)}})})}),jQuery(function(e){e(".wiki-page + .collapsible.collapsed").removeClass("collapsed")}),jQuery(function(a){a("code:not(:has(*))").each(function(e,t){(t=a(t)).attr({"data-label-copied":"Inhalt wurde in die Zwischenablage kopiert!","data-label-to-copy":"In die Zwischenablage kopieren","data-clipboard-action":"copy"}),t.addClass("has-clipboard-copy"),t.one("mouseover.mtoCopy focus.mtoCopy",function(){t.off(".mtoCopy"),t.attr({"data-clipboard-text":t.text()}),setClipboardJS(t.get(0)),t.on("click",function(){t.addClass("was-copied"),setTimeout(function(){t.removeClass("was-copied")},1e3)})})})});var PurpleMine=PurpleMine||{};PurpleMine.HistoryTabs=function(){"use strict";var n,s={en:{all:"All",notes:"Notes",details:"Changes"},ro:{all:"Toate",notes:"Note",details:"Schimbări"},fr:{all:"Tout",notes:"Remarques",details:"Changements"},pl:{all:"Wszystko",notes:"Notatki",details:"Zmiany"},de:{all:"Alles",notes:"Kommentare",details:"Änderungen"},ja:{all:"すべて",notes:"注記",details:"変更"}};var o=function(){var e=$(this),t=e.attr("data-tab");n.$tabs.removeClass("selected"),e.addClass("selected"),n.$history.removeClass("hide-details").removeClass("hide-notes"),"notes"===t?n.$history.addClass("hide-details"):"details"===t&&n.$history.addClass("hide-notes")};return function(){if(n)return n;var e,t,a,i;(n=this).$tabsContainer=null,this.$tabs=null,this.$history=$("#history"),this.lang=document.documentElement.lang,void 0===s[this.lang]&&(this.lang="en"),this._=s[this.lang],0<this.$history.length&&0<$("#history > h3").length&&(e="",i="</a></li>",e+='<div class="tabs"><ul>',e+=(t='<li><a href="javascript:;" class="')+"selected "+(a='history-tab" data-tab="')+'all">'+n._.all+i,e+=t+a+'notes">'+n._.notes+i,e+=t+a+'details">'+n._.details+i,e+="</ul></div>",n.$tabsContainer=$(e),$("#history > h3").after(n.$tabsContainer),n.$tabs=n.$tabsContainer.find(".history-tab"),n.$tabs.on("click",o),n.$history.find(".has-notes:first").addClass("first-of-notes"),n.$history.find(".has-details:first").addClass("first-of-details"))}}(),jQuery(function(e){var t;window.jsToolBar&&(PurpleMine.hlLanguages="apache,conf,console,csharp,css,diff,html,ini,java,javascript,less,markdown,mustache,nginx,php,plaintext,python,ruby,scss,shell,smarty,sql,vb,xml,yaml".split(","),t=(t=String(jsToolBar.prototype.precodeMenu).replace(/var\s+hlLanguages\s+=[^;]+/,"var hlLanguages = window.PurpleMine.hlLanguages")).replace(/^[\s\r\n]*function[^{]+\{|\}[\s\r\n]*$/g,""),jsToolBar.prototype.precodeMenu=new Function("fn",t))}),(PurpleMine=PurpleMine||{}).MenuCollapse=function(){"use strict";var n,t={en:{topMenuToggler:"Expand/collapse top menu"},ro:{topMenuToggler:"Deschide/închide meniul de sus"},fr:{topMenuToggler:"Développer/réduire le menu principal"},pl:{topMenuToggler:"Zwiń/rozwiń górne menu"},de:{topMenuToggler:"Ein-/Ausklappen Hauptmenu"},ja:{topMenuToggler:"トップメニューの展開/折りたたみ"}};function e(){if(n)return n;for(var e in(n=this).lang=document.documentElement.lang,void 0===t[this.lang]&&(this.lang="en"),this._=t[this.lang],this.menus={top:{$el:$("#top-menu")}},this.menus)this.menus.hasOwnProperty(e)&&0<this.menus[e].$el.length&&function(e){if("none"===n.menus[e].$el.css("maxHeight"))return;n.menus[e].collapsed=!0,window.localStorage&&(n.menus[e].collapsed=null===localStorage.getItem(a(e)));(function(e){var t=e+"-menu-toggler",a=n._[e+"MenuToggler"],i='<a href="javascript:;" class="'+t+'" title="'+a+'"></a>';n.menus[e].$toggler=$(i),n.menus[e].$el.prepend(n.menus[e].$toggler),n.menus[e].$toggler.on("click",{menu:e},n.toggleMenu)})(e),!1===n.isCollapsed(e)&&n.expandMenu(e)}(e)}function a(e){return"PurpleMine:"+e+"MenuExpanded"}return e.prototype.toggleMenu=function(e){var t=e.data.menu||"";n.isCollapsed(t)?n.expandMenu(t):n.collapseMenu(t)},e.prototype.isCollapsed=function(e){return this.menus[e].collapsed},e.prototype.expandMenu=function(e){this.menus[e].$el.addClass("expanded"),this.menus[e].$toggler.addClass("expanded"),this.menus[e].collapsed=!1,window.localStorage&&localStorage.setItem(a(e),"x")},e.prototype.collapseMenu=function(e){this.menus[e].$el.removeClass("expanded"),this.menus[e].$toggler.removeClass("expanded"),this.menus[e].collapsed=!0,window.localStorage&&localStorage.removeItem(a(e))},e}(),(PurpleMine=PurpleMine||{}).RevisionGraph=function(e,t,a){"use strict";var i=t,n=$.map(i,function(e){return e}),s=n.length-1,o=$("table.changesets tr.changeset");null!==revisionGraph?revisionGraph.clear():revisionGraph=new Raphael(e);var r=revisionGraph.set(),l=o.first().find("td").first().position().left-$(e).position().left,d=$(e).position().top,c=l+20*(a+1),u=o.last().position().top+o.last().height()-d;revisionGraph.setSize(c,u);var p,h,g,f,m,b,v,y=["#e74c3c","#584492","#019851","#ed820c","#4183c4"];if(a>=y.length){Raphael.getColor.reset();for(var w=0;w<=a;w++)y.push(Raphael.getColor(.9))}$.each(n,function(e,a){a.hasOwnProperty("space")||(a.space=0),g=o.eq(s-a.rdmid).position().top-d+17,h=10+l+20*a.space,revisionGraph.circle(h,g,3.5).attr({fill:y[a.space],stroke:"none"}).toFront(),$.each(a.parent_scmids,function(e,t){p=i[t],(p?(p.hasOwnProperty("space")||(p.space=0),m=o.eq(s-p.rdmid).position().top-d+17,f=10+l+20*p.space,p.space===a.space?revisionGraph.path(["M",h,g,"V",m]):revisionGraph.path(["M",h,g,"C",h,g,h,g+(m-g)/2,h+(f-h)/2,g+(m-g)/2,"C",h+(f-h)/2,g+(m-g)/2,f,m-(m-g)/2,f,m])):revisionGraph.path(["M",h,g,"V",u])).attr({stroke:y[a.space],"stroke-width":1.5}).toBack()}),(v=revisionGraph.circle(h,g,10)).attr({fill:"#000",opacity:0,cursor:"pointer",href:a.href}),null!==a.refs&&0<a.refs.length&&((b=document.createElementNS(revisionGraph.canvas.namespaceURI,"title")).appendChild(document.createTextNode(a.refs)),v.node.appendChild(b)),r.push(v)}),r.toFront()},$(function(){"use strict";window.drawRevisionGraph&&(window.drawRevisionGraph=PurpleMine.RevisionGraph,$(window).resize())}),(PurpleMine=PurpleMine||{}).SidebarToggler=function(){"use strict";var a,e={en:{toggler:"Toggle sidebar"},ro:{toggler:"Deschide/închide bara laterală"},fr:{toggler:"Basculer la barre latérale"},pl:{toggler:"Pokaż/ukryj panel boczny"},ja:{toggler:"サイドバーの切り替え"}};function t(){if(a)return a;(a=this).sidebarVisible=!0,this.sidebarHiding=null,this.$toggler=null,this.$main=$("#main"),this.$sidebar=$("#sidebar"),this.lang=document.documentElement.lang,void 0===e[this.lang]&&(this.lang="en"),this._=e[this.lang],"relative"===this.$main.css("position")&&$(window).on("load",function(){$("#context-menu").appendTo("#wrapper3")}),function(){window.localStorage&&(a.sidebarVisible=null===localStorage.getItem("PurpleMine:sidebarHidden"));0<a.$sidebar.length&&!1===a.$main.hasClass("nosidebar")&&(function(){var e='<a href="javascript:;" class="sidebar-toggler" title="'+a._.toggler+'"></a>';a.$toggler=$(e),a.$main.append(a.$toggler),a.$toggler.on("click",a.toggleSidebar)}(),function(){var t=document.getElementsByTagName("body")[0];window.onkeydown=function(e){t===e.target&&83===e.keyCode&&!1===e.ctrlKey&&!1===e.altKey&&!1===e.shiftKey&&a.toggleSidebar()}}(),!1===a.sidebarVisible&&a.hideSidebar(!0))}()}return t.prototype.toggleSidebar=function(){a.sidebarVisible?a.hideSidebar():a.showSidebar()},t.prototype.hideSidebar=function(e){!0===e?this.$sidebar.addClass("sidebar-hiding sidebar-hidden"):(this.$sidebar.addClass("sidebar-hiding"),this.sidebarHiding=setTimeout(function(){a.$sidebar.addClass("sidebar-hidden")},500)),this.$toggler.addClass("sidebar-hidden"),this.sidebarVisible=!1,window.localStorage&&localStorage.setItem("PurpleMine:sidebarHidden","x")},t.prototype.showSidebar=function(){clearTimeout(this.sidebarHiding),a.$sidebar.removeClass("sidebar-hidden"),setTimeout(function(){a.$sidebar.removeClass("sidebar-hiding")},50),this.$toggler.removeClass("sidebar-hidden"),this.sidebarVisible=!0,window.localStorage&&localStorage.removeItem("PurpleMine:sidebarHidden")},t}(),$(function(){"use strict";new PurpleMine.SidebarToggler,new PurpleMine.HistoryTabs,new PurpleMine.MenuCollapse});