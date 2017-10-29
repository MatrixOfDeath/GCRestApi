webpackJsonp([2],{"+523":function(e,t,a){(function(e){var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};/*!
 * jQuery-Seat-Charts v1.1.5 -> v2 (Karim BOUBRIT)
 * https://github.com/mateuszmarkowski/jQuery-Seat-Charts
 *
 * Copyright 2013, 2016 Mateusz Markowski
 * Released under the MIT license
 * Upgrade by author: Karim BOUBRIT
 */
!function(e){e.fn.seatCharts=function(a){if(this.data("seatCharts"))return this.data("seatCharts");var n=this,s={},i=[],r={animate:!1,naming:{top:!0,left:!0,getId:function(e,t,a){return t+"_"+a},getLabel:function(e,t,a){return a}},legend:{node:null,items:[]},click:function(){return"available"==this.status()?"selected":"selected"==this.status()?"available":this.style()},focus:function(){return"available"==this.status()?"focused":this.style()},blur:function(){return this.status()},seats:{}},l=function(t,a){return function(n){var i=this;i.settings=e.extend({status:"available",style:"available",data:a.seats[n.character]||{}},n),i.settings.$node=e("<div></div>"),i.settings.$node.attr({id:i.settings.id,role:"checkbox","aria-checked":!1,focusable:!0,tabIndex:-1}).text(i.settings.label).addClass(["seatCharts-seat","seatCharts-cell","available"].concat(i.settings.classes,void 0===a.seats[i.settings.character]?[]:a.seats[i.settings.character].classes).join(" ")),i.data=function(){return i.settings.data},i.char=function(){return i.settings.character},i.node=function(){return i.settings.$node},i.style=function(){return 1==arguments.length?function(e){var t=i.settings.style;return e==t?t:(i.settings.status="focused"!=e?e:i.settings.status,i.settings.$node.attr("aria-checked","selected"==e),a.animate?i.settings.$node.switchClass(t,e,200):i.settings.$node.removeClass(t).addClass(e),i.settings.style=e)}(arguments[0]):i.settings.style},i.status=function(){return i.settings.status=1==arguments.length?i.style(arguments[0]):i.settings.status},function(n,r,l){e.each(["click","focus","blur"],function(e,o){i[o]=function(){return"focus"==o&&(void 0!==t.attr("aria-activedescendant")&&s[t.attr("aria-activedescendant")].blur(),t.attr("aria-activedescendant",l.settings.id),l.node().focus()),i.style("function"==typeof n[r][o]?n[r][o].apply(l):a[o].apply(l))}})}(a.seats,i.settings.character,i),i.node().on("click",i.click).on("mouseenter",i.focus).on("mouseleave",i.blur).on("keydown",function(e,a){return function(n){var i;switch(n.which){case 32:n.preventDefault(),e.click();break;case 40:case 38:if(n.preventDefault(),i=function e(t,s,r){var l;return l=t.index(r)||38!=n.which?t.index(r)==t.length-1&&40==n.which?t.first():t.eq(t.index(r)+(38==n.which?-1:1)):t.last(),i=l.find(".seatCharts-seat,.seatCharts-space").eq(s.index(a)),i.hasClass("seatCharts-space")?e(t,s,l):i}(a.parents(".seatCharts-container").find(".seatCharts-row:not(.seatCharts-header)"),a.parents(".seatCharts-row:first").find(".seatCharts-seat,.seatCharts-space"),a.parents(".seatCharts-row:not(.seatCharts-header)")),!i.length)return;e.blur(),s[i.attr("id")].focus(),i.focus(),t.attr("aria-activedescendant",i.attr("id"));break;case 37:case 39:if(n.preventDefault(),i=function(e){return e.index(a)||37!=n.which?e.index(a)==e.length-1&&39==n.which?e.first():e.eq(e.index(a)+(37==n.which?-1:1)):e.last()}(a.parents(".seatCharts-container:first").find(".seatCharts-seat:not(.seatCharts-space)")),!i.length)return;e.blur(),s[i.attr("id")].focus(),i.focus(),t.attr("aria-activedescendant",i.attr("id"))}}}(i,i.node()))}}(n,r);if(n.addClass("seatCharts-container"),e.extend(!0,r,a),r.naming.rows=r.naming.rows||function(e){for(var t=[],a=1;a<=e;a++)t.push(a);return t}(r.map.length),r.naming.columns=r.naming.columns||function(e){for(var t=[],a=1;a<=e;a++)t.push(a);return t}(r.map[0].split("").length),r.naming.top){var o=e("<div></div>").addClass("seatCharts-row seatCharts-header");r.naming.left&&o.append(e("<div></div>").addClass("seatCharts-cell")),e.each(r.naming.columns,function(t,a){o.append(e("<div></div>").addClass("seatCharts-cell").text(a))})}return n.append(o),e.each(r.map,function(t,a){var o=e("<div></div>").addClass("seatCharts-row");r.naming.left&&o.append(e("<div></div>").addClass("seatCharts-cell seatCharts-space").text(r.naming.rows[t])),e.each(a.match(/[a-z_]{1}(\[[0-9a-z_]{0,}(,[0-9a-z_ ]+)?\])?/gi),function(a,n){var c=n.match(/([a-z_]{1})(\[([0-9a-z_ ,]+)\])?/i),u=c[1],d=void 0!==c[3]?c[3].split(","):[],p=d.length?d[0]:null,h=2===d.length?d[1]:null;o.append("_"!=u?function(e){r.seats[u]=u in r.seats?r.seats[u]:{};var n=p||e.getId(u,e.rows[t],e.columns[a]);return s[n]=new l({id:n,label:h||e.getLabel(u,e.rows[t],e.columns[a]),row:t,column:a,character:u}),i.push(n),s[n].node()}(r.naming):e("<div></div>").addClass("seatCharts-cell seatCharts-space"))}),n.append(o)}),r.legend.items.length&&function(t){var a=(t.node||e("<div></div>").insertAfter(n)).addClass("seatCharts-legend"),s=e("<ul></ul>").addClass("seatCharts-legendList").appendTo(a);e.each(t.items,function(t,a){s.append(e("<li></li>").addClass("seatCharts-legendItem").append(e("<div></div>").addClass(["seatCharts-seat","seatCharts-cell",a[1]].concat(r.classes,void 0===r.seats[a[0]]?[]:r.seats[a[0]].classes).join(" "))).append(e("<span></span>").addClass("seatCharts-legendDescription").text(a[2])))})}(r.legend),n.attr({tabIndex:0}),n.focus(function(){n.attr("aria-activedescendant")&&s[n.attr("aria-activedescendant")].blur(),n.find(".seatCharts-seat:not(.seatCharts-space):first").focus(),s[i[0]].focus()}),n.data("seatCharts",{seats:s,seatIds:i,status:function(){var t=this;return 1==arguments.length?t.seats[arguments[0]].status():function(a,n){return"string"==typeof a?t.seats[a].status(n):function(){e.each(a,function(e,a){t.seats[a].status(n)})}()}(arguments[0],arguments[1])},each:function(e){var t=this;for(var a in t.seats)if(!1===e.call(t.seats[a],a))return a;return!0},node:function(){return e("#"+this.seatIds.join(",#"))},find:function(e){var t=this,a=t.set();return e instanceof RegExp?function(){return t.each(function(t){t.match(e)&&a.push(t,this)}),a}():1==e.length?function(e){return t.each(function(){this.char()==e&&a.push(this.settings.id,this)}),a}(e):function(){return e.indexOf(".")>-1?function(){var n=e.split(".");return t.each(function(e){this.char()==n[0]&&this.status()==n[1]&&a.push(this.settings.id,this)}),a}():function(){return t.each(function(){this.status()==e&&a.push(this.settings.id,this)}),a}()}()},set:function t(){var a=this;return{seats:[],seatIds:[],length:0,status:function(){var t=arguments,a=this;return 1==this.length&&0==t.length?this.seats[0].status():function(){e.each(a.seats,function(){this.status.apply(this,t)})}()},node:function(){return a.node.call(this)},each:function(){return a.each.call(this,arguments[0])},get:function(){return a.get.call(this,arguments[0])},find:function(){return a.find.call(this,arguments[0])},set:function(){return t.call(a)},push:function(e,t){this.seats.push(t),this.seatIds.push(e),++this.length}}},get:function(a){var n=this;return"string"==typeof a?n.seats[a]:function(){var s=n.set();return e.each(a,function(e,a){"object"===t(n.seats[a])&&s.push(a,n.seats[a])}),s}()}}),n.data("seatCharts")}}(e)}).call(t,a("7t+N"))},"00Sn":function(e,t,a){(function(e){function t(){e("#tab-link-facturation").removeClass("grayForbiddenLink"),e("#tab-link-facturation > span").removeClass("grayForbidden")}function a(){e.ajax({url:Routing.generate("ajax_panier_icon_menu"),type:"GET",async:!0,success:function(t,a){e("#panier-icon-menu").empty().append(t).effect("bounce",{times:3},300)},error:function(e){console.log(e),alert("Problème refresh Panier")}})}e(document).on("click","div.seatCharts-seat.seatCharts-cell",function(){var n=e(".slider-time").text(),s=e(".slider-time2").text(),i=e(this).attr("id"),r=e("#datepicker-altFormat").val();return that=e(this),e("#display-salle").append().load("/assets/loader.html").fadeIn(),e("#tab-link-produit").parent().tab("show"),e.ajax({url:Routing.generate("places_disponible_ajax"),type:"POST",data:{heureChoixDebut:r+" "+n+":00",heureChoixFin:r+" "+s+":00",idPlace:i,date:r},success:function(l,o){(l="1")&&e.ajax({url:Routing.generate("ajout_panier_place"),type:"POST",data:{heureChoixDebut:r+" "+n+":00",heureChoixFin:r+" "+s+":00",id:i,date:r},async:!0,success:function(n,s){e.ajax({url:Routing.generate("panier_ajax"),type:"POST",async:!0,success:function(n,s){(l="1")?(e(".row.panier-menu").empty().append(n),a(),t(),e.ajax({url:Routing.generate("produits_ajax"),type:"GET",async:!0,success:function(t,a){e("#display-salle").empty().append(t),e(".reservation-select-creneau").hide().fadeOut(),e(".recherche-horaire").hide().fadeOut()},error:function(e){console.log(e),alert("Problème récupération des produtis")}})):alert("La place n'est plus disponible")},error:function(e){console.log(e),alert("Problème ajout de la place choisi")}})},error:function(e){console.log(e),alert("Problème ajout salle")}})},error:function(e){alert("Problème lors de la vérification de la disponibilité de la salle n°"+idSalle)}}),!1})}).call(t,a("7t+N"))},"0hT6":function(e,t,a){(function(e){function t(){e.ajax({url:Routing.generate("ajax_panier_icon_menu"),type:"GET",async:!0,success:function(t,a){e("#panier-icon-menu").empty().append(t).effect("bounce",{times:3},300)},error:function(e){console.log(e),alert("Problème refresh Panier")}})}e(document).on("click",".buttonDeleteProduit",function(){console.log("Click on "+e(this).val()),e.ajax({url:Routing.generate("ajax_delete_panier"),type:"POST",data:{id:e(this).val()},async:!0,success:function(a,n){e.ajax({url:Routing.generate("panier_ajax"),type:"POST",async:!0,success:function(t,a){e(".row.panier-menu").empty().append(t)},error:function(e){console.log(e),alert("Problème refresh Panier")}}),t()},error:function(e){console.log(e),alert("Problème dans la recherche des disponibilités de salles")}})}),e(document).on("click",".buttonDeleteSalle",function(){console.log("Click on "+e(this).val()),e.ajax({url:Routing.generate("ajax_delete_panier_salle"),type:"POST",data:{idsalle:e(this).val()},async:!0,success:function(a,n){e.ajax({url:Routing.generate("panier_ajax"),type:"POST",async:!0,success:function(t,a){e(".row.panier-menu").empty().append(t)},error:function(e){console.log(e),alert("Problème refresh Panier")}}),t()},error:function(e){console.log(e),alert("Problème dans la recherche des disponibilités de salles")}})}),e(document).on("click",".buttonDeletePlace",function(){e.ajax({url:Routing.generate("ajax_delete_panier_place"),type:"POST",data:{idplace:e(this).val()},async:!0,success:function(a,n){e.ajax({url:Routing.generate("panier_ajax"),type:"POST",async:!0,success:function(t,a){e(".row.panier-menu").empty().append(t),e(this).sc_global.status(String(e(this).val()),"available")},error:function(e){console.log(e),alert("Problème refresh Panier")}}),t()},error:function(e){console.log(e),alert("Problème dans la recherche des disponibilités de places")}})}),e(document).on("change","select.select-qte-produit",function(){e.ajax({url:Routing.generate("ajax_ajout_produit_panier"),type:"POST",data:{id:e(this).parent().parent().find(".buttonDeleteProduit").val(),qte:this.value},async:!0,success:function(a){e.ajax({url:Routing.generate("panier_ajax"),type:"POST",async:!0,success:function(t,a){e(".row.panier-menu").empty().append(t)},error:function(e){console.log(e),alert("Problème refresh Panier")}}),t()},error:function(e){console.log(e),alert("Problème dans la recherche des disponibilités de salles")}})})}).call(t,a("7t+N"))},"0lsb":function(e,t,a){(function(e){function t(){e.ajax({url:Routing.generate("ajax_panier_icon_menu"),type:"GET",async:!0,success:function(t,a){e("#panier-icon-menu").empty().append(t).effect("bounce",{times:3},300)},error:function(e){console.log(e),alert("Problème refresh Panier")}})}e(document).on("click",".buttonAddProductPanier",function(){e.ajax({url:Routing.generate("ajax_ajout_produit_panier"),type:"POST",data:{id:e(this).val()},async:!0,success:function(a){e.ajax({url:Routing.generate("panier_ajax"),type:"POST",async:!0,success:function(a,n){e(".row.panier-menu").empty().append(a),t()},error:function(e){console.log(e),alert("Problème refresh Panier")}})},error:function(e){console.log(e),alert("Problème dans la recherche des disponibilités de salles")}})})}).call(t,a("7t+N"))},2:function(e,t,a){a("sX7u"),a("uOkG"),a("wBYT"),a("00Sn"),a("0lsb"),a("0hT6"),a("CuFu"),a("+523"),a("7gdm"),e.exports=a("CDBs")},"7gdm":function(e,t,a){(function(e,t){function a(){t.ajax({url:Routing.generate("ajax_places_map"),type:"GET",async:!0,success:function(e,t){r=n(e)},error:function(e){console.log(e),alert("Problème initialisation des places")}})}function n(e){var a=t("#selected-seats"),n=t("#counter"),r=t("#total"),l=t("#seat-map").seatCharts({map:t.parseJSON(e),seats:{n:{price:5,classes:"first-class",category:"Place VIP"},p:{price:5,classes:"economy-class",category:"Place"},f:{price:0,classes:"economy-class unavailable",category:"Place"}},naming:{top:!1,getLabel:function(e,t,a){return i++}},legend:{node:t("#legend"),items:[["p","available","Place disponible"],["f","unavailable","Déjà réservé"]]},click:function(){return"available"==this.status()?(t("<li>"+this.data().category+" Place # "+this.settings.label+": <b>€"+this.data().price+'</b> <a href="#" class="cancel-cart-item">[annuler]</a></li>').attr("id","cart-item-"+this.settings.id).data("seatId",this.settings.id).appendTo(a),n.text(l.find("selected").length+1),r.text(s(l)+this.data().price),"selected"):"selected"==this.status()?(n.text(l.find("selected").length-1),r.text(s(l)-this.data().price),t("#cart-item-"+this.settings.id).remove(),"available"):"unavailable"==this.status()?"unavailable":this.style()}});t("#selected-seats").on("click",".cancel-cart-item",function(){l.get(t(this).parents("li:first").data("seatId")).click()});var o=t(".slider-time").text(),c=t(".slider-time2").text(),u=t("#datepicker-altFormat").val();return setInterval(function(){t.ajax({url:Routing.generate("ajax_places_unavailable"),type:"POST",data:{heureChoixDebut:u+" "+o+":00",heureChoixFin:u+" "+c+":00"},dataType:"json",success:function(e){t.each(e,function(e,t){l.status(String(t.idplace),"unavailable")})}})},6e4),l}function s(e){var t=0;return e.find("selected").each(function(){t+=this.data().price}),t}var i=1,r=[];!function(e){function t(t){var n=e("#selected-seats"),s=e("#counter"),r=e("#total"),l=e("#seat-map").seatCharts({map:e.parseJSON(t),seats:{n:{price:5,classes:"first-class",category:"Place VIP"},p:{price:5,classes:"economy-class",category:"Place"},f:{price:0,classes:"economy-class unavailable",category:"Place"}},naming:{top:!1,getLabel:function(e,t,a){return i++}},legend:{node:e("#legend"),items:[["p","available","Place disponible"],["f","unavailable","Déjà réservé"]]},click:function(){return"available"==this.status()?(e("<li>"+this.data().category+" Place # "+this.settings.label+": <b>€"+this.data().price+'</b> <a href="#" class="cancel-cart-item">[annuler]</a></li>').attr("id","cart-item-"+this.settings.id).data("seatId",this.settings.id).appendTo(n),s.text(l.find("selected").length+1),r.text(a(l)+this.data().price),"selected"):"selected"==this.status()?(s.text(l.find("selected").length-1),r.text(a(l)-this.data().price),e("#cart-item-"+this.settings.id).remove(),"available"):"unavailable"==this.status()?"unavailable":this.style()}});e("#selected-seats").on("click",".cancel-cart-item",function(){l.get(e(this).parents("li:first").data("seatId")).click()});var o=e(".slider-time").text(),c=e(".slider-time2").text(),u=e(this).attr("id"),d=e("#datepicker-altFormat").val();return setInterval(function(){e.ajax({url:Routing.generate("ajax_places_unavailable"),type:"POST",data:{heureChoixDebut:d+" "+o+":00",heureChoixFin:d+" "+c+":00",idPlace:u,date:d},dataType:"json",success:function(t){e.each(t,function(e,t){l.status(String(t.idplace),"unavailable")})}})},6e4),l}function a(e){var t=0;return e.find("selected").each(function(){t+=this.data().price}),t}e.fn.sc_global=[],e.fn.getMap=function(){var a=e(".slider-time").text(),n=e(".slider-time2").text(),s=e("#datepicker-altFormat").val();e.ajax({url:Routing.generate("ajax_places_map"),type:"POST",data:{heureChoixDebut:s+" "+a+":00",heureChoixFin:s+" "+n+":00"},async:!0,success:function(e,a){r=t(e)},error:function(e){console.log(e),alert("Problème initialisation des places")}})}}(e),t(document).ready(function(){t("#seat-map").length&&t("#selected-seats").length&&t.ajax({url:Routing.generate("ajax_places_map"),type:"GET",async:!0,success:function(e,t){n(e)},error:function(e){console.log(e),alert("Problème initialisation des places")}})}),t(document).on("click","#tab-link-place",function(){t(this).parent().tab("show");var e=t(".slider-time").text(),n=t(".slider-time2").text(),s=t("#datepicker-altFormat").val();return t("#slider-range .heureActuelleDefaut").val(""),that=t(this),t("#display-salle").append().load("/assets/loader.html").fadeIn("slow"),t.ajax({url:Routing.generate("places_disponible"),type:"POST",data:{heureChoixDebut:s+" "+e+":00",heureChoixFin:s+" "+n+":00"},async:!0,success:function(e,n){a(),t("#display-salle").empty().append(e),t(".reservation-select-creneau").show("slow"),t(".recherche-horaire").show("slow"),t(".panier-menu").show("slide",{direction:"right"},1e3),t(".reservation-result-container").removeClass("col-md-12").addClass("col-md-9")},error:function(e){console.log(e),alert("Problème dans la recherche des disponibilités de places")}}),!1})}).call(t,a("7t+N"),a("7t+N"))},CDBs:function(e,t,a){(function(e){e("#display-salle").on("keyup",".cp",function(t){console.log("keyup"),5===e(this).val().length?e.ajax({type:"GET",url:Routing.generate("villes",{cp:e(this).val()}),beforeSend:function(){0==e(".loading-ville").length&&e("form .ville").parent().append('<div class="loading-ville"></div>'),e(".ville option").remove()},success:function(t){e.each(t.ville,function(t,a){e(".ville").append(e("<option>",{value:a,text:a}))}),e(".loading-ville").remove()}}):e(".ville").val("")}),e(".cp").keyup(function(){console.log("keyup"),5===e(this).val().length?e.ajax({type:"GET",url:Routing.generate("villes",{cp:e(this).val()}),beforeSend:function(){0==e(".loading-ville").length&&e("form .ville").parent().append('<div class="loading-ville"></div>'),e(".ville option").remove()},success:function(t){e.each(t.ville,function(t,a){e(".ville").append(e("<option>",{value:a,text:a}))}),e(".loading-ville").remove()}}):e(".ville").val("")})}).call(t,a("7t+N"))},CuFu:function(e,t,a){(function(e){function t(){return e(this).parent().tab("show"),that=e(this),e("#display-salle").append().load("/assets/loader.html").fadeIn("slow"),e.ajax({url:Routing.generate("ajax_adresses_panier"),type:"POST",async:!0,success:function(t,n){a(),e("#tab-link-facturation").parent().tab("show"),e("#display-salle").empty().append(t),e(".reservation-select-creneau").hide("slow"),e(".recherche-horaire").hide("slow")},error:function(e){console.log(e),alert("Problème dans d'acces à la page des adresses de facturation ")}}),!1}function a(){e("#tab-link-facturation").removeClass("grayForbiddenLink"),e("#tab-link-facturation > span").removeClass("grayForbidden")}function n(){e(".reservation-result-container").removeClass("col-md-9").addClass("col-md-12"),e(".panier-menu").hide("slide",{direction:"left"},600),e("#tab-link-validation").removeClass("grayForbiddenLink"),e("#tab-link-validation > span").removeClass("grayForbidden")}e(document).ready(function(){e.ajax({url:Routing.generate("ajax_panier_is_not_empty"),type:"GET",async:!0,success:function(e,t){"Success"&&a()},error:function(e){console.log(e)}})}),e(document).on("click","#tab-link-produit",function(){return that=e(this),e("#display-salle").append().load("/assets/loader.html").fadeIn(),e.ajax({url:Routing.generate("produits_ajax"),type:"GET",async:!0,success:function(t,a){e("#display-salle").empty().append(t),e(".reservation-select-creneau").hide().fadeOut(),e(".recherche-horaire").hide().fadeOut(),e(".panier-menu").show("slide",{direction:"right"},1e3),e(".reservation-result-container").removeClass("col-md-12").addClass("col-md-9")},error:function(e){console.log(e),alert("Problème récupération des produtis")}}),!1}),e(document).on("click","#tab-link-salle",function(){e(this).parent().tab("show");var t=e(".slider-time").text(),a=e(".slider-time2").text(),n=e("#datepicker-altFormat").val();return e("#slider-range .heureActuelleDefaut").val(""),that=e(this),e("#display-salle").append().load("/assets/loader.html").fadeIn("slow"),e.ajax({url:Routing.generate("salles_disponible"),type:"POST",data:{heureChoixDebut:n+" "+t+":00",heureChoixFin:n+" "+a+":00"},async:!0,success:function(t,a){e("#display-salle").empty().append(t),e(".reservation-select-creneau").show("slow"),e(".recherche-horaire").show("slow"),e(".panier-menu").show("slide",{direction:"right"},1e3),e(".reservation-result-container").removeClass("col-md-12").addClass("col-md-9")},error:function(e){console.log(e),alert("Problème dans la recherche des disponibilités de salles")}}),!1}),e(document).on("click","#tab-link-facturation",function(){e(this).parent().tab("show");var t=e(".slider-time").text(),a=e(".slider-time2").text(),n=e("#datepicker-altFormat").val();return e("#slider-range .heureActuelleDefaut").val(""),that=e(this),e("#display-salle").append().load("/assets/loader.html").fadeIn("slow"),e.ajax({url:Routing.generate("ajax_adresses_panier"),type:"POST",data:{heureChoixDebut:n+" "+t+":00",heureChoixFin:n+" "+a+":00"},async:!0,success:function(t,a){e("#display-salle").empty().append(t),e(".reservation-select-creneau").hide("slow"),e(".recherche-horaire").hide("slow"),e(".panier-menu").show("slide",{direction:"right"},1e3),e(".reservation-result-container").removeClass("col-md-12").addClass("col-md-9")},error:function(e){console.log(e),alert("Problème dans d'acces à la page des adresses de facturation ")}}),!1}),e(document).on("click","#tab-link-validation",function(){return e(this).parent().tab("show"),that=e(this),e("#display-salle").append().load("/assets/loader.html").fadeIn("slow"),e.ajax({url:Routing.generate("ajax_validation_panier"),type:"POST",async:!0,success:function(t,a){e("#display-salle").empty().append(t),e(".reservation-select-creneau").hide("slow"),e(".recherche-horaire").hide("slow"),e(".reservation-result-container").removeClass("col-md-9").addClass("col-md-12"),e(".panier-menu").hide("slide",{direction:"left"},600)},error:function(e){console.log(e),alert("Problème dans d'acces à la page des adresses de facturation ")}}),!1}),e(document).on("submit","#form-valid-adresse",function(t){t.preventDefault();var a=(Routing.generate("ajax_validation_panier"),e(this).serialize());return e("#display-salle").append().load("/assets/loader.html").fadeIn("slow"),e.ajax({url:Routing.generate("ajax_validation_panier"),type:"POST",data:a,async:!0,success:function(t,a){n(),e("#tab-link-validation").parent().tab("show"),e("#display-salle").empty().append(t),e(".reservation-select-creneau").hide("slow"),e(".recherche-horaire").hide("slow"),e(".reservation-result-container").removeClass("col-md-9").addClass("col-md-12")},error:function(e){console.log(e),alert("Problème dans d'acces à la page de validation")}}),!1}),e(document).on("submit","#ajaxPayment",function(t){return t.preventDefault(),e.ajax({url:Routing.generate("ajax_paiement_commande",{id:e(".idcommande").val()}),type:"POST",data:{date:e(".idcommande").val(),token:e(".token").val(),totalTTC:e(".totalTTC").val(),prix:e(".prix").val()},async:!0,success:function(e,a){Payplug.showPayment(e),t.preventDefault()},error:function(e){console.log(e),alert("Problème dans d'acces à la page de validation")}}),!1}),e(document).on("submit","#ajaxAddNewAdresse",function(t){t.preventDefault();var a=(Routing.generate("ajax_adresses_panier"),e(this).serialize());return e("#display-salle").append().load("/assets/loader.html").fadeIn("slow"),e.ajax({url:Routing.generate("ajax_adresses_panier"),type:"POST",data:a,async:!0,success:function(t,a){e("#display-salle").empty().append(t),e(".reservation-select-creneau").hide("slow"),e(".recherche-horaire").hide("slow")},error:function(e){console.log(e),alert("Problème dans d'acces à lajout de ladresse")}}),!1}),e(document).on("click","button.validPanier",function(){t()})}).call(t,a("7t+N"))},sX7u:function(e,t,a){(function(e){e(document).on("click","button.buttonSearch",function(){var t=e(".slider-time").text(),a=e(".slider-time2").text(),n=e("#datepicker-altFormat").val();return e("#slider-range .heureActuelleDefaut").val(""),that=e(this),e("#display-salle").append().load("/assets/loader.html").fadeIn(),e.ajax({url:Routing.generate("salles_disponible"),type:"POST",data:{heureChoixDebut:n+" "+t+":00",heureChoixFin:n+" "+a+":00"},async:!0,success:function(t,a){e("#display-salle").empty().append(t)},error:function(e){console.log(e),alert("Problème dans la recherche des disponibilités de salles")}}),!1})}).call(t,a("7t+N"))},uOkG:function(e,t,a){(function(e){e(document).on("click","button.buttonSearchPlace",function(){var t=e(".slider-time").text(),a=e(".slider-time2").text(),n=e("#datepicker-altFormat").val();return e("#slider-range .heureActuelleDefaut").val(""),that=e(this),e("#display-salle").append().load("/assets/loader.html").fadeIn(),e.ajax({url:Routing.generate("places_disponible"),type:"POST",data:{heureChoixDebut:n+" "+t+":00",heureChoixFin:n+" "+a+":00"},async:!0,success:function(t,a){e("#display-salle").empty().append(t),e(this).getMap()},error:function(e){console.log(e),alert("Problème dans la recherche des disponibilités de places")}}),!1})}).call(t,a("7t+N"))},wBYT:function(e,t,a){(function(e){function t(){e("#tab-link-facturation").removeClass("grayForbiddenLink"),e("#tab-link-facturation > span").removeClass("grayForbidden")}function a(){e.ajax({url:Routing.generate("ajax_panier_icon_menu"),type:"GET",async:!0,success:function(t,a){e("#panier-icon-menu").empty().append(t).effect("bounce",{times:3},300)},error:function(e){console.log(e),alert("Problème refresh Panier")}})}function n(){var t=e(".slider-time").text(),a=e(".slider-time2").text(),n=e("#datepicker-altFormat").val();return e("#slider-range .heureActuelleDefaut").val(""),that=e(this),e("#display-salle").append().load("/assets/loader.html").fadeIn(),e("#tab-link-place").length?$url="places_disponible":$url="salles_disponible",e.ajax({url:Routing.generate($url),type:"POST",data:{heureChoixDebut:n+" "+t+":00",heureChoixFin:n+" "+a+":00"},async:!0,success:function(t,a){e("#display-salle").empty().append(t),e("#tab-link-place").length&&e(this).getMap()},error:function(e){console.log(e),alert("Problème dans la recherche des disponibilités de salles")}}),!1}e(document).on("click","button.btn-success.buttonAddSalle",function(){var n=e(".slider-time").text(),s=e(".slider-time2").text(),i=e(this).val(),r=e("#datepicker-altFormat").val();return console.log("date altFormat"+r),that=e(this),e("#display-salle").append().load("/assets/loader.html").fadeIn(),e("#tab-link-produit").parent().tab("show"),e.ajax({url:Routing.generate("salles_disponible_ajax"),type:"POST",data:{heureChoixDebut:r+" "+n+":00",heureChoixFin:r+" "+s+":00",idSalle:i,date:r},success:function(l,o){(l="1")&&e.ajax({url:Routing.generate("ajout_panier_salle"),type:"POST",data:{heureChoixDebut:r+" "+n+":00",heureChoixFin:r+" "+s+":00",id:i,date:r},async:!0,success:function(n,s){e.ajax({url:Routing.generate("panier_ajax"),type:"POST",async:!0,success:function(n,s){(l="1")?(e(".row.panier-menu").empty().append(n),a(),t(),e.ajax({url:Routing.generate("produits_ajax"),type:"GET",async:!0,success:function(t,a){e("#display-salle").empty().append(t),e(".reservation-select-creneau").hide().fadeOut(),e(".recherche-horaire").hide().fadeOut()},error:function(e){console.log(e),alert("Problème récupération des produtis")}})):alert("La salle n'est plus disponible")},error:function(e){console.log(e),alert("Problème ajout de la salle choisi")}})},error:function(e){console.log(e),alert("Problème ajout salle")}})},error:function(e){alert("Problème lors de la vérification de la disponibilité de la salle n°"+i)}}),!1}),e(document).on("slidestop","#slider-range",function(e,t){n()})}).call(t,a("7t+N"))}},[2]);