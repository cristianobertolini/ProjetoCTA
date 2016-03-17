/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2015 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Definição de modais de uso geral - v${project.version}
 */
function AbstractModalJS(){this._DEFAULTS={id:"modaljs",title:"@[title]",icon:"icon-info-sign",content:"@[content]",theme:"",closeable:true,closeMode:"hide",closeOnOverlayClick:false,buttons:{},preCreate:jQuery.UNDEFINED,postCreate:jQuery.UNDEFINED,preOpen:jQuery.UNDEFINED,postOpen:jQuery.UNDEFINED,postOpenAnimation:jQuery.UNDEFINED,preClose:jQuery.UNDEFINED,postClose:jQuery.UNDEFINED,postCloseAnimation:jQuery.UNDEFINED,preDispose:jQuery.UNDEFINED,postDispose:jQuery.UNDEFINED,preAppendOverlay:jQuery.UNDEFINED,postAppendOverlay:jQuery.UNDEFINED,preAppendModal:jQuery.UNDEFINED,postAppendModal:jQuery.UNDEFINED,preAppendHeader:jQuery.UNDEFINED,postAppendHeader:jQuery.UNDEFINED,preAppendContent:jQuery.UNDEFINED,postAppendContent:jQuery.UNDEFINED,openFx:{overlay:{effect:"fade",duration:500},modal:{effect:"slide",duration:500,direction:"left"}},closeFx:{overlay:{effect:"fade",duration:500},modal:{effect:"slide",duration:500,direction:"right"}},overlayDiv:{"class":"",classExt:""},scrollOverlayDiv:{"class":"",classExt:""},modalDiv:{"class":"bordered rounded shadowed",classExt:""},headerDiv:{"class":"stroked-bottom",classExt:""},contentDiv:{"class":"",classExt:""},cloneOptions:{},i18n:{br:{title:"T&iacute;tulo do Modal...",content:"Conte&uacute;do do Modal"},us:{title:"Modal Title...",content:"Modal Contents"}},locale:"br",debugMode:false};
this.getTheme=function(){return this.options.theme;};this.getOverlay=function(){return jQuery("body").find("#"+this.options.id+"_overlay");
};this.getScrollOverlay=function(){return jQuery("body").find("#"+this.options.id+"_scroll_overlay");};this.getModal=function(){return this.getScrollOverlay().find("#"+this.options.id);
};this.getHeader=function(){return this.getModal().find(".modaljs-header");};this.getContent=function(){return this.getModal().find(".modaljs-content");
};this.findInContent=function(selector){return this.getContent().find(selector);};this.find=function(selector){return this.getModal().find(selector);
};this.isOpen=function(){return this.getModal().is(":visible");};this.isClosed=function(){return !this.isOpen();};this.open=function(func){var modal=this;
modal._invokeHook(modal.options.preOpen);modal._resetAnimations();var overlayFx=modal.options.openFx.overlay;var modalFx=modal.options.openFx.modal;
modalFx.complete=function(){modal._invokeHook(modal.options.postOpenAnimation);if(jQuery.FunctionUtils.isFunction(func)){func();
}};modal.getOverlay().show(overlayFx);modal.getScrollOverlay().show();modal.getModal().show(modalFx);modal._invokeHook(modal.options.postOpen);
return modal;};this.close=function(func){var modal=this;modal._invokeHook(modal.options.preClose);modal._resetAnimations();
var overlayFx=modal.options.closeFx.overlay;var modalFx=modal.options.closeFx.modal;modalFx.complete=function(){modal.getScrollOverlay().hide();
modal._invokeHook(modal.options.postClose);if(jQuery.FunctionUtils.isFunction(func)){func();}};overlayFx.complete=function(){if(modal.options.closeMode==="dispose"){modal._invokeHook(modal.options.preDispose);
modal.getOverlay().remove();modal.getScrollOverlay().remove();modal._invokeHook(modal.options.postDispose);}};modal.getOverlay().hide(overlayFx);
modal.getModal().hide(modalFx);modal._invokeHook(modal.options.postClose);return modal;};this.resolveText=function(text){return jQuery.LocaleUtils.resolve(text,this.options.locale,this.options.i18n);
};this._create=function(opts){var modal=this;modal.options=jQuery.extend(true,{},modal._DEFAULTS,opts);modal._invokeHook(modal.options.preCreate);
modal.getOverlay().remove();modal.getScrollOverlay().remove();var $overlayDiv=modal._initOverlayDiv();var $scrollOverlayDiv=modal._initScrollOverlayDiv();
modal._invokeHook(modal.options.preAppendOverlay);jQuery("body").append($overlayDiv.hide()).append($scrollOverlayDiv.hide());
modal._invokeHook(modal.options.postAppendOverlay);var $modalDiv=modal._initModalDiv();modal._invokeHook(modal.options.preAppendModal);
$scrollOverlayDiv.append($modalDiv.hide());modal._invokeHook(modal.options.postAppendModal);var $headerDiv=modal._initHeaderDiv();
modal._invokeHook(modal.options.preAppendHeader);$modalDiv.append($headerDiv);modal._invokeHook(modal.options.postAppendHeader);
var $contentDiv=modal._initContentDiv();modal._invokeHook(modal.options.preAppendContent);$modalDiv.append($contentDiv);modal._invokeHook(modal.options.postAppendContent);
modal._invokeHook(modal.options.postCreate);return modal;};this._initOverlayDiv=function(){var modal=this;var $div=jQuery.WidgetUtils.createDiv(modal.options.overlayDiv);
$div.attr("id",modal.options.id+"_overlay");$div.addClass("modaljs-overlay").addClass(modal.getTheme());return $div;};this._initScrollOverlayDiv=function(){var modal=this;
var $div=jQuery.WidgetUtils.createDiv(modal.options.scrollOverlayDiv);$div.attr("id",modal.options.id+"_scroll_overlay");
$div.addClass("modaljs-scroll-overlay");if(modal.options.closeable&&modal.options.closeOnOverlayClick){$div.click(function(evt){var $target=jQuery(evt.target);
if(!$target.hasClass("modaljs-scroll-overlay")){return;}modal.close();});}return $div;};this._initModalDiv=function(){var modal=this;
var $div=jQuery.WidgetUtils.createDiv(modal.options.modalDiv);$div.attr("id",modal.options.id);$div.addClass("modaljs").addClass(modal.options.theme);
return $div;};this._initHeaderDiv=function(){var modal=this;if(jQuery.BooleanUtils.isFalse(modal.options.title)){return jQuery();
}var $div=jQuery.WidgetUtils.createDiv(modal.options.headerDiv);var $icon=jQuery();var iconSpace="";var $title=jQuery();var $btn=jQuery();
if(jQuery.ObjectUtils.isNotBlank(modal.options.icon)){var tmp=modal.options.icon;$icon=jQuery.StringUtils.isString(tmp)?jQuery("<i>",{"class":tmp}):jQuery.JqueryUtils.unwrap(tmp);
iconSpace=" ";}if(jQuery.ObjectUtils.isNotBlank(modal.options.title)){var tmp=modal.options.title;if(jQuery.StringUtils.isString(tmp)){$title=jQuery("<span>").append(modal.resolveText(tmp,modal.options.locale,modal.options.i18n));
}else{$title=jQuery.JqueryUtils.unwrap(tmp);}$title.css("display","inline-block");}if(modal.options.closeable){$btn=jQuery("<button>",{type:"button","class":"close"}).append("&times;");
$btn.click(function(){modal.close();});}$div.append($icon).append(iconSpace).append($title).append($btn);$div.addClass("modaljs-header");
return $div;};this._initContentDiv=function(){var modal=this;var $div=jQuery.WidgetUtils.createDiv(modal.options.contentDiv);
var tmp=modal.options.content;var $bodyWrapper=jQuery("<div>");if(jQuery.StringUtils.isString(tmp)){$bodyWrapper.append(modal.resolveText(tmp,modal.options.locale,modal.options.i18n));
}else{$bodyWrapper.append(jQuery.JqueryUtils.unwrapUnvaluedSafe(tmp,modal._unwrapOpts()));}$bodyWrapper.css({"min-height":"4em","padding-top":".5em"});
$div.append($bodyWrapper);var $btns=modal._initButtons();if($btns.length){var $actionsWrapper=jQuery("<div>").append($btns);
$actionsWrapper.addClass("form-actions no-margin-bottom no-padding-bottom stroked-top");$div.append($actionsWrapper);}$div.addClass("modaljs-content");
return $div;};this._initButtons=function(){var modal=this;var btns=modal.options.buttons;var $btnArray=new Array();var i=0;
var initBtn=function(btnObj,modal){var $btn=jQuery.JqueryUtils.unwrapUnvaluedSafe(btnObj,modal._unwrapOpts());var func=btnObj.clickFunction;
$btn.click(function(event){var $this=$(this);var wasEnabled=$this.isEnabled();$this.disable();var ret=true;if(jQuery.FunctionUtils.isFunction(func)){ret=jQuery.BooleanUtils.unwrapUnvaluedSafe(func,[event,modal]);
}if(ret){modal.close();}if(wasEnabled){$this.enable();}});if($btn.hasClass("main-action")){$btn.addClass(modal.getTheme());
}var order=tmp.order||$btn.data("order")||i;$btn.data("order",order);return $btn;};for(var key in btns){var tmp=btns[key];
if(!jQuery.BooleanUtils.isFalse(tmp)){var $btn=initBtn(tmp,modal);$btnArray.push($btn);}}$btnArray=$btnArray.sort(function(a,b){return a.data("order")-b.data("order");
});var $btns=jQuery();for(var j=0;j<$btnArray.length;j++){$btns=$btns.add($btnArray[j]);}return $btns;};this._resetAnimations=function(){var modal=this;
modal.getOverlay().stop(true,true);modal.getScrollOverlay().stop(true,true);modal.getModal().stop(true,true);return modal;
};this._unwrapOpts=function(){var modal=this;if(jQuery.BooleanUtils.isFalse(modal.options.cloneOptions)){return{locale:modal.options.locale,regional:modal.options.i18n,copy:false,deepCopy:false,detach:true};
}return jQuery.extend({},{locale:modal.options.locale,regional:modal.options.i18n,copy:true,deepCopy:true,detach:true},modal.options.cloneOptions);
};this._invokeHook=function(func){var modal=this;if(jQuery.FunctionUtils.isFunction(func)){return func(modal);}return jQuery.UNDEFINED;
};}function ModalJS(opts){AbstractModalJS.call(this);this._create(opts);}function AlertJS(opts){AbstractModalJS.call(this);
var _OLD_DEFS=this._DEFAULTS;this._DEFAULTS=jQuery.extend(true,{},_OLD_DEFS,{icon:"icon-warning-sign",buttons:{ok:{tagName:"<button>",label:"@[ok]","class":"btn small main-action",classExt:"",icon:"icon-check",disabled:function(){return false;
},clickFunction:function(event,modal){return true;}}},i18n:{br:{title:"Alerta...",ok:"OK"},us:{title:"Alert...",ok:"OK"}}});
this._create(opts);}function ConfirmJS(opts){AbstractModalJS.call(this);var _OLD_DEFS=this._DEFAULTS;this._DEFAULTS=jQuery.extend(true,{},_OLD_DEFS,{icon:"icon-warning-sign",buttons:{cancel:{order:0,tagName:"<button>",label:"@[cancel]","class":"btn small left",classExt:"",icon:"icon-ban-circle",disabled:function(){return false;
},clickFunction:function(event,modal){return true;}},no:{order:1,tagName:"<button>",label:"@[no]","class":"btn small",classExt:"",icon:"icon-thumbs-down-alt",disabled:function(){return false;
},clickFunction:function(event,modal){return true;}},yes:{order:2,tagName:"<button>",label:"@[yes]","class":"btn small main-action",classExt:"",icon:"icon-thumbs-up-alt",disabled:function(){return false;
},clickFunction:function(event,modal){return true;}}},i18n:{br:{title:"Confirma&ccedil;&atilde;o...",content:"Voc&ecirc; tem certeza?",yes:"Sim",no:"N&atilde;o",cancel:"Cancelar"},us:{title:"Confirm...",content:"Are you sure?",yes:"Yes",no:"No",cancel:"Cancel"}}});
this._create(opts);}
/*!
 * JsSimpleDateFormat v1.0 (20080509) - library for formatting and parsing date time
 * Copyright (C) 2008 AT Mulyana (atmulyana@yahoo.com)
 * http://www.javascriptbank.com/=JsSimpleDateFormat
 *  
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * 
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
*/
Function.prototype.__extends__=function(fParent,oExtMembers){this.prototype=new fParent();
for(m in oExtMembers){this.prototype[m]=oExtMembers[m];}};function JsDateFormatSymbols(sLocale){if(!JsDateFormatSymbols.__symbols__[sLocale]){sLocale="en";
}var oSymbols=JsDateFormatSymbols.__symbols__[sLocale];for(p in oSymbols){this["_"+p]=oSymbols[p];}}JsDateFormatSymbols.prototype={getAmPmStrings:function(){return this._amPmStrings;
},getEras:function(){return this._eras;},getMonths:function(){return this._months;},getShortMonths:function(){return this._shortMonths;
},getShortWeekdays:function(){return this._shortWeekdays;},getWeekdays:function(){return this._weekdays;},setAmPmStrings:function(arAmPmStrings){this._amPmStrings=arAmPmStrings;
},setEras:function(arEras){this._eras=arEras;},setMonths:function(arMonths){return this._months=arMonths;},setShortMonths:function(arShortMonths){return this._shortMonths=arShortMonths;
},setShortWeekdays:function(arShortWeekdays){return this._shortWeekdays=arShortWeekdays;},setWeekdays:function(arWeekdays){return this._weekdays=arWeekdays;
}};JsDateFormatSymbols.__symbols__={en:{amPmStrings:["AM","PM"],eras:["AD","BC"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],shortWeekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},us:{amPmStrings:["AM","PM"],eras:["AD","BC"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],shortWeekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},id:{amPmStrings:["AM","PM"],eras:["M","SM"],months:["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","Nopember","Desember"],shortMonths:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nop","Des"],shortWeekdays:["Min","Sen","Sel","Rab","Kam","Jum","Sab"],weekdays:["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"]},br:{amPmStrings:["AM","PM"],eras:["AC","DC"],months:["Janeiro","Fevereiro","MarÃ§o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],shortMonths:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],shortWeekdays:["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],weekdays:["Domingo","Segunda-feira","TerÃ§a-feira","Quarta-feira","Quinta-feira","Sexta-feira","SÃ¡bado"]},pt:{amPmStrings:["AM","PM"],eras:["AC","DC"],months:["Janeiro","Fevereiro","MarÃ§o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],shortMonths:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],shortWeekdays:["Dom","Seg","Ter","Qua","Qui","Sex","Sab"],weekdays:["Domingo","Segunda-feira","TerÃ§a-feira","Quarta-feira","Quinta-feira","Sexta-feira","SÃ¡bado"]}};
function JsSimpleDateFormat(sPattern,param){this._arPtn=[];this._ptn=null;this.flexWhiteSpace=false;if(sPattern){this.applyPattern(sPattern);
}else{this.applyPattern(this._getDefaultPattern());}if(param){if(param instanceof JsDateFormatSymbols){this.setDateFormatSymbols(param);
}else{this.setDateFormatSymbols(new JsDateFormatSymbols(param));}}else{this.setDateFormatSymbols(new JsDateFormatSymbols("en"));
}var oStDt=new Date();try{oStDt.setFullYear(oStDt.getFullYear()-80);}catch(e){oStDt=new Date(0);}this.set2DigitYearStart(oStDt);
}JsSimpleDateFormat._Base=function(){};JsSimpleDateFormat._Base.prototype={isNumber:function(){return false;},parse:function(s,isNN){return -1;
},toStr:function(){return"";}};JsSimpleDateFormat._Str=function(sInitVal){JsSimpleDateFormat._Base.call(this);this._vals=[];
if(sInitVal){this.append(sInitVal);}};JsSimpleDateFormat._Str.__extends__(JsSimpleDateFormat._Base,{flexWhiteSpace:false,append:function(s){this._vals.push(s);
},parse:function(s,isNN){var sVal=this.toStr();if(this.flexWhiteSpace){var sRe=sVal.replace(/\s+/g," ");if(sRe==" "){sRe="\\s+";
}else{sRe="\\s*"+sRe.replace(/^\s+/,"").replace(/\s+$/,"").replace(/([^a-zA-Z0-9\s])/g,"\\$1").replace(/\s+/g,"\\s*")+"\\s*";
}var reVal=new RegExp("^("+sRe+")");if(reVal.test(s)){return RegExp.$1.length;}}else{if(s.indexOf(sVal)==0){return sVal.length;
}}return -1;},toStr:function(){return this._vals.join("");}});JsSimpleDateFormat._Ltr=function(){JsSimpleDateFormat._Base.call(this);
this._count=1;this._parseVal=parseInt("NaN");};JsSimpleDateFormat._Ltr.__extends__(JsSimpleDateFormat._Base,{name:"",dt:new Date(),fmtSb:new JsDateFormatSymbols("en"),addCount:function(){this._count++;
},applyParseValue:function(oDate,oFields){return oDate;},getParseValue:function(){return this._parseVal;},getValue:function(){return -1;
}});JsSimpleDateFormat._Text=function(){JsSimpleDateFormat._Ltr.call(this);};JsSimpleDateFormat._Text.__extends__(JsSimpleDateFormat._Ltr,{getIndex:function(){return -1;
},getLong:function(){var i=this.getIndex(),arVals=this.getLongValues();if(i>=0&&i<arVals.length){return arVals[i];}return"";
},getLongValues:function(){return[];},getShort:function(){var i=this.getIndex(),arVals=this.getShortValues();if(i>=0&&i<arVals.length){return arVals[i];
}return"";},getShortValues:function(){return[];},getValue:function(){return this.getIndex();},parse:function(s,isNN){this._parseVal=parseInt("NaN");
var arLong=this.getLongValues(),arShort=this.getShortValues();var re=new RegExp("^("+arLong.join("|")+"|"+arShort.join("|")+")","i");
if(!re.test(s)){return -1;}var sVal=RegExp.$1.toUpperCase();for(var i=0;i<arLong.length;i++){if(sVal==arLong[i].toUpperCase()){this._parseVal=i;
return sVal.length;}}for(var i=0;i<arShort.length;i++){if(sVal==arShort[i].toUpperCase()){this._parseVal=i;return sVal.length;
}}},toStr:function(){if(this._count<4){return this.getShort();}return this.getLong();}});JsSimpleDateFormat._Number=function(){JsSimpleDateFormat._Ltr.call(this);
};JsSimpleDateFormat._Number.__extends__(JsSimpleDateFormat._Ltr,{getNumber:function(){return this.getValue();},isNumber:function(){return true;
},isValidVal:function(iVal){return true;},parse:function(s,isNN){this._parseVal="";var i=0,c=s.charAt(0),sVal="";if(isNN){while(i<this._count&&c>="0"&&c<="9"){sVal+=c;
if(++i<s.length){c=s.charAt(i);}else{break;}}}else{while(c>="0"&&c<="9"){sVal+=c;if(++i<s.length){c=s.charAt(i);}else{break;
}}}if(i==0){return -1;}var iVal=parseInt(sVal,10);if(this.isValidVal(iVal)){this._parseVal=iVal;}else{return -1;}return i;
},toStr:function(){var sVal=this.getNumber()+"",s="";if(sVal.charAt(0)=="-"){sVal=sVal.substr(1);s="-";}while(sVal.length<this._count){sVal="0"+sVal;
}return s+sVal;}});JsSimpleDateFormat._Month=function(){JsSimpleDateFormat._Text.call(this);};JsSimpleDateFormat._Month.__extends__(JsSimpleDateFormat._Text,{name:"month",isNumber:function(){if(this._count<3){return true;
}else{return false;}},isValidVal:function(iVal){return iVal>=1&&iVal<=12;},parse:function(s,isNN){if(this._count<3){return JsSimpleDateFormat._Number.prototype.parse.call(this,s,isNN);
}return JsSimpleDateFormat._Text.prototype.parse.call(this,s,isNN);},toStr:function(){if(this._count<3){return JsSimpleDateFormat._Number.prototype.toStr.call(this);
}return JsSimpleDateFormat._Text.prototype.toStr.call(this);}});JsSimpleDateFormat._Year=function(){JsSimpleDateFormat._Number.call(this);
};JsSimpleDateFormat._Year.__extends__(JsSimpleDateFormat._Number,{name:"year",stC:1900,stY:1970,parse:function(s,isNN){var j=0;
if(s.charAt(0)=="-"){s=s.substr(1);j++;}var i=JsSimpleDateFormat._Number.prototype.parse.call(this,s,isNN);if(i==-1){return -1;
}if(j>0){this._parseVal=-this._parseVal;}if(this._count<3&&this._parseVal>0&&i==2){var iY=this.stC+this._parseVal;if(iY<=this.stY){iY+=100;
}this._parseVal=iY;}return i+j;},toStr:function(){if(this._count<4){var sVal=(this.getNumber()%100)+"";if(sVal.length<2){return"0"+sVal;
}return sVal;}return JsSimpleDateFormat._Number.prototype.toStr.call(this);}});JsSimpleDateFormat._ltr={};JsSimpleDateFormat._ltr.G=function(){JsSimpleDateFormat._Text.call(this);
};JsSimpleDateFormat._ltr.G.__extends__(JsSimpleDateFormat._Text,{name:"era",getIndex:function(){return(this.dt.getFullYear()>0?0:1);
},getLongValues:function(){return this.fmtSb.getEras();},getShortValues:function(){return this.getLongValues();}});JsSimpleDateFormat._ltr.y=function(){JsSimpleDateFormat._Year.call(this);
};JsSimpleDateFormat._ltr.y.__extends__(JsSimpleDateFormat._Year,{applyParseValue:function(oDate,oFields){if(oFields.era){if(oFields.era.getParseValue()==0&&this._parseVal<=0){return null;
}if(oFields.era.getParseValue()==1&&this._parseVal>0){this._parseVal=-this._parseVal+1;}}oDate.setFullYear(this._parseVal);
return oDate;},getNumber:function(){var iVal=this.getValue();return(iVal<=0)?(-iVal+1):iVal;},getValue:function(){return this.dt.getFullYear();
}});JsSimpleDateFormat._ltr.M=function(){JsSimpleDateFormat._Month.call(this);};JsSimpleDateFormat._ltr.M.__extends__(JsSimpleDateFormat._Month,{applyParseValue:function(oDate,oFields){var iVal=this.getParseValue(),iD=oDate.getDate();
oDate.setMonth(iVal);while(oDate.getMonth()!=iVal){oDate.setDate(--iD);oDate.setMonth(iVal);}return oDate;},getIndex:function(){return this.dt.getMonth();
},getLongValues:function(){return this.fmtSb.getMonths();},getNumber:function(){return this.dt.getMonth()+1;},getParseValue:function(){return this._count<3?this._parseVal-1:this._parseVal;
},getShortValues:function(){return this.fmtSb.getShortMonths();}});JsSimpleDateFormat._ltr.D=function(){JsSimpleDateFormat._Number.call(this);
};JsSimpleDateFormat._ltr.D.__extends__(JsSimpleDateFormat._Number,{_ends:[31,28,31,30,31,30,31,31,30,31,30,31],name:"dayOfYear",_checkLeapYear:function(oDate){var oDt=new Date(oDate.getTime());
oDt.setDate(1);oDt.setMonth(1);oDt.setDate(29);if(oDt.getDate()==29){this._ends[1]=29;}else{this._ends[1]=28;}},applyParseValue:function(oDate,oFields){if(oFields.year){if(oFields.year.applyParseValue(oDate,oFields)==null){return null;
}}this._checkLeapYear(oDate);var arEnds=this._ends,iD=this.getParseValue(),iM=0;while(iD>arEnds[iM]&&iM<arEnds.length){iD-=arEnds[iM++];
}if(iM>=arEnds.length){return null;}oDate.setDate(1);oDate.setMonth(iM);oDate.setDate(iD);return oDate;},getDay:function(){this._checkLeapYear(this.dt);
var arEnds=this._ends;var iMonth=this.dt.getMonth(),iDay=0;for(var i=0;i<iMonth;i++){iDay+=arEnds[i];}return iDay+this.dt.getDate();
},getValue:function(){return this.getDay();},isValidVal:function(iVal){return iVal>=1&&iVal<=366;}});JsSimpleDateFormat._ltr.d=function(){JsSimpleDateFormat._ltr.D.call(this);
};JsSimpleDateFormat._ltr.d.__extends__(JsSimpleDateFormat._ltr.D,{name:"day",applyParseValue:function(oDate,oFields){if(oFields.year){if(oFields.year.applyParseValue(oDate,oFields)==null){return null;
}}this._checkLeapYear(oDate);if(oFields.month){if(oFields.month.applyParseValue(oDate,oFields)==null){return null;}}var arEnds=this._ends,iD=this.getParseValue(),iM=oDate.getMonth();
if(iD<1||iD>arEnds[iM]){return null;}oDate.setDate(iD);return oDate;},getDay:function(){return this.dt.getDate();},isValidVal:function(iVal){return iVal>=1&&iVal<=31;
}});JsSimpleDateFormat._ltr.w=function(){JsSimpleDateFormat._ltr.D.call(this);};JsSimpleDateFormat._ltr.w.__extends__(JsSimpleDateFormat._ltr.D,{name:"weekOfYear",_resetMonth:function(oDate){oDate.setMonth(0);
},applyParseValue:function(oDate,oFields){oDate.setDate(1);this._resetMonth(oDate);oDate.setTime(oDate.getTime()-oDate.getDay()*86400000+(this._parseVal-1)*7*86400000);
return oDate;},getParseValue:function(){return this.getValue();},getValue:function(){return this.getWeek();},getWeek:function(){var iDay=this.getDay();
var iWeek=Math.ceil(iDay/7);iDay=iDay%7;iDay=(iDay?iDay:7)-1;return((this.dt.getDay()<iDay)?(iWeek+1):iWeek);},isValidVal:function(iVal){return iVal>=1&&iVal<=54;
}});JsSimpleDateFormat._ltr.W=function(){JsSimpleDateFormat._ltr.w.call(this);};JsSimpleDateFormat._ltr.W.__extends__(JsSimpleDateFormat._ltr.w,{name:"weekOfMonth",_resetMonth:function(oDate){},getDay:function(){return this.dt.getDate();
},isValidVal:function(iVal){return iVal>=1&&iVal<=6;}});JsSimpleDateFormat._ltr.F=function(){JsSimpleDateFormat._Number.call(this);
};JsSimpleDateFormat._ltr.F.__extends__(JsSimpleDateFormat._Number,{name:"dayOfWeekInMonth",applyParseValue:function(oDate,oFields){oDate.setDate((this.getParseValue()-1)*7+1);
return oDate;},isValidVal:function(iVal){return iVal>=1&&iVal<=5;},getValue:function(){return Math.ceil(this.dt.getDate()/7);
}});JsSimpleDateFormat._ltr.E=function(){JsSimpleDateFormat._Text.call(this);};JsSimpleDateFormat._ltr.E.__extends__(JsSimpleDateFormat._Text,{name:"dayOfWeek",applyParseValue:function(oDate,oFields){oDate.setDate(1);
var iD=oDate.getDay();var iVal=(this._parseVal<iD)?(this._parseVal+7):this._parseVal;oDate.setTime(oDate.getTime()+(iVal-iD)*86400000);
return oDate;},getIndex:function(){return this.dt.getDay();},getLongValues:function(){return this.fmtSb.getWeekdays();},getShortValues:function(){return this.fmtSb.getShortWeekdays();
}});JsSimpleDateFormat._ltr.a=function(){JsSimpleDateFormat._Text.call(this);};JsSimpleDateFormat._ltr.a.__extends__(JsSimpleDateFormat._Text,{name:"ampm",getIndex:function(){return(this.dt.getHours()<12?0:1);
},getLongValues:function(){return this.fmtSb.getAmPmStrings();},getShortValues:function(){return this.getLongValues();}});
JsSimpleDateFormat._ltr.H=function(){JsSimpleDateFormat._Number.call(this);};JsSimpleDateFormat._ltr.H.__extends__(JsSimpleDateFormat._Number,{name:"hour",applyParseValue:function(oDate,oFields){oDate.setHours(this.getParseValue());
return oDate;},getValue:function(){return this.dt.getHours();},isValidVal:function(iVal){return iVal>=0&&iVal<=23;}});JsSimpleDateFormat._ltr.k=function(){JsSimpleDateFormat._ltr.H.call(this);
};JsSimpleDateFormat._ltr.k.__extends__(JsSimpleDateFormat._ltr.H,{getParseValue:function(){return this._parseVal==24?0:this._parseVal;
},getNumber:function(){var iH=this.dt.getHours();return(iH>0?iH:24);},isValidVal:function(iVal){return iVal>=1&&iVal<=24;
}});JsSimpleDateFormat._ltr.K=function(){JsSimpleDateFormat._Number.call(this);};JsSimpleDateFormat._ltr.K.__extends__(JsSimpleDateFormat._Number,{name:"h12",applyParseValue:function(oDate,oFields){var iVal=this.getParseValue();
if(oFields.ampm&&oFields.ampm.getParseValue()==1){iVal+=12;}oDate.setHours(iVal);return oDate;},getValue:function(){return this.dt.getHours()%12;
},isValidVal:function(iVal){return iVal>=0&&iVal<=11;}});JsSimpleDateFormat._ltr.h=function(){JsSimpleDateFormat._ltr.K.call(this);
};JsSimpleDateFormat._ltr.h.__extends__(JsSimpleDateFormat._ltr.K,{getParseValue:function(){return this._parseVal==12?0:this._parseVal;
},getNumber:function(){var iH=this.dt.getHours()%12;return(iH>0?iH:12);},isValidVal:function(iVal){return iVal>=1&&iVal<=12;
}});JsSimpleDateFormat._ltr.m=function(){JsSimpleDateFormat._Number.call(this);};JsSimpleDateFormat._ltr.m.__extends__(JsSimpleDateFormat._Number,{name:"minute",applyParseValue:function(oDate,oFields){oDate.setMinutes(this.getParseValue());
return oDate;},getValue:function(){return this.dt.getMinutes();},isValidVal:function(iVal){return iVal>=0&&iVal<=59;}});JsSimpleDateFormat._ltr.s=function(){JsSimpleDateFormat._Number.call(this);
};JsSimpleDateFormat._ltr.s.__extends__(JsSimpleDateFormat._Number,{name:"second",applyParseValue:function(oDate,oFields){oDate.setSeconds(this.getParseValue());
return oDate;},getValue:function(){return this.dt.getSeconds();},isValidVal:function(iVal){return iVal>=0&&iVal<=59;}});JsSimpleDateFormat._ltr.S=function(){JsSimpleDateFormat._Number.call(this);
};JsSimpleDateFormat._ltr.S.__extends__(JsSimpleDateFormat._Number,{name:"ms",applyParseValue:function(oDate,oFields){oDate.setMilliseconds(this.getParseValue());
return oDate;},getValue:function(){return this.dt.getMilliseconds();},isValidVal:function(iVal){return iVal>=0&&iVal<=999;
}});JsSimpleDateFormat.prototype={_getDefaultPattern:function(){return"dd MMMM yyyy hh:mm a";},_getInitDate:function(){var oDt=new Date(0);
oDt.setTime(oDt.getTime()+oDt.getTimezoneOffset()*60000);return oDt;},applyPattern:function(sPattern){this._arPtn=[];var oLtr=JsSimpleDateFormat._ltr;
var s=new JsSimpleDateFormat._Str(""),c="",oPtn=null,clsPtn,isQ=false,i=-1;while(++i<sPattern.length){var c1=sPattern.charAt(i);
if(c1=="'"){if(i<sPattern.length-1&&sPattern.charAt(i+1)=="'"){s.append("'");i++;}else{isQ=!isQ;}c="";}else{if(isQ){s.append(c1);
}else{if(c1==c){oPtn.addCount();}else{if(clsPtn=oLtr[c1]){oPtn=new clsPtn();if(s.toStr()!=""){this._arPtn.push(s);}s=new JsSimpleDateFormat._Str("");
this._arPtn.push(oPtn);c=c1;}else{s.append(c1);c="";}}}}}if(s.toStr()!=""){this._arPtn.push(s);}this._ptn=sPattern;},format:function(oDate){JsSimpleDateFormat._Ltr.prototype.fmtSb=this._fmtSb;
JsSimpleDateFormat._Ltr.prototype.dt=oDate;var s="",arPtn=this._arPtn;for(var i=0;i<arPtn.length;i++){s+=arPtn[i].toStr();
}return s;},get2DigitYearStart:function(){return this._stDt;},getDateFormatSymbols:function(){return this._fmtSb;},parse:function(s,oPos){JsSimpleDateFormat._Ltr.prototype.fmtSb=this._fmtSb;
JsSimpleDateFormat._Str.prototype.flexWhiteSpace=this.flexWhiteSpace;JsSimpleDateFormat._Year.prototype.stY=this._stY;JsSimpleDateFormat._Year.prototype.stC=this._stC;
if(!oPos){oPos={index:0,errorIndex:-1};}var i=oPos.index,j=0,arPtn=this._arPtn,oFields={};while(j<arPtn.length){var oPtn=arPtn[j++];
var isNN=(j<arPtn.length)?arPtn[j].isNumber():false;var k=oPtn.parse(s.substr(i),isNN);if(k==-1){oPos.errorIndex=i;return null;
}if(oPtn instanceof JsSimpleDateFormat._Ltr){var sFN=oPtn.name;if(oFields[sFN]){if(oFields[sFN].getParseValue()!=oPtn.getParseValue()){oPos.errorIndex=i;
return null;}}else{oFields[sFN]=oPtn;}}i+=k;}var oDate=this._getInitDate();var arFN=["year","month","dayOfWeek","dayOfWeekInMonth","weekOfMonth","weekOfYear","dayOfYear","day","hour","h12","minute","second","ms"];
for(j=0;j<arFN.length;j++){var sFN=arFN[j];if(oFields[sFN]){if(oFields[sFN].applyParseValue(oDate,oFields)==null){oPos.errorIndex=oPos.index+i;
return null;}}}JsSimpleDateFormat._Ltr.prototype.dt=oDate;for(var sFN in oFields){if(oFields[sFN].getParseValue()!=oFields[sFN].getValue()){oPos.errorIndex=oPos.index+i;
return null;}}oPos.index+=i;return oDate;},set2DigitYearStart:function(oStartDate){this._stDt=oStartDate;var iY=Math.abs(oStartDate.getFullYear());
this._stY=iY;this._stC=iY-(iY%100);},setDateFormatSymbols:function(oFormatSymbols){this._fmtSb=oFormatSymbols;},toPattern:function(){return this._ptn;
}};var Hashtable=(function(UNDEFINED){var FUNCTION="function",STRING="string",UNDEF="undefined";if(typeof encodeURIComponent==UNDEF||Array.prototype.splice===UNDEFINED||Object.prototype.hasOwnProperty===UNDEFINED){return null;
}function toStr(obj){return(typeof obj==STRING)?obj:""+obj;}function hashObject(obj){var hashCode;if(typeof obj==STRING){return obj;
}else{if(typeof obj.hashCode==FUNCTION){hashCode=obj.hashCode();return(typeof hashCode==STRING)?hashCode:hashObject(hashCode);
}else{return toStr(obj);}}}function merge(o1,o2){for(var i in o2){if(o2.hasOwnProperty(i)){o1[i]=o2[i];}}}function equals_fixedValueHasEquals(fixedValue,variableValue){return fixedValue.equals(variableValue);
}function equals_fixedValueNoEquals(fixedValue,variableValue){return(typeof variableValue.equals==FUNCTION)?variableValue.equals(fixedValue):(fixedValue===variableValue);
}function createKeyValCheck(kvStr){return function(kv){if(kv===null){throw new Error("null is not a valid "+kvStr);}else{if(kv===UNDEFINED){throw new Error(kvStr+" must not be undefined");
}}};}var checkKey=createKeyValCheck("key"),checkValue=createKeyValCheck("value");function Bucket(hash,firstKey,firstValue,equalityFunction){this[0]=hash;
this.entries=[];this.addEntry(firstKey,firstValue);if(equalityFunction!==null){this.getEqualityFunction=function(){return equalityFunction;
};}}var EXISTENCE=0,ENTRY=1,ENTRY_INDEX_AND_VALUE=2;function createBucketSearcher(mode){return function(key){var i=this.entries.length,entry,equals=this.getEqualityFunction(key);
while(i--){entry=this.entries[i];if(equals(key,entry[0])){switch(mode){case EXISTENCE:return true;case ENTRY:return entry;
case ENTRY_INDEX_AND_VALUE:return[i,entry[1]];}}}return false;};}function createBucketLister(entryProperty){return function(aggregatedArr){var startIndex=aggregatedArr.length;
for(var i=0,entries=this.entries,len=entries.length;i<len;++i){aggregatedArr[startIndex+i]=entries[i][entryProperty];}};}Bucket.prototype={getEqualityFunction:function(searchValue){return(typeof searchValue.equals==FUNCTION)?equals_fixedValueHasEquals:equals_fixedValueNoEquals;
},getEntryForKey:createBucketSearcher(ENTRY),getEntryAndIndexForKey:createBucketSearcher(ENTRY_INDEX_AND_VALUE),removeEntryForKey:function(key){var result=this.getEntryAndIndexForKey(key);
if(result){this.entries.splice(result[0],1);return result[1];}return null;},addEntry:function(key,value){this.entries.push([key,value]);
},keys:createBucketLister(0),values:createBucketLister(1),getEntries:function(destEntries){var startIndex=destEntries.length;
for(var i=0,entries=this.entries,len=entries.length;i<len;++i){destEntries[startIndex+i]=entries[i].slice(0);}},containsKey:createBucketSearcher(EXISTENCE),containsValue:function(value){var entries=this.entries,i=entries.length;
while(i--){if(value===entries[i][1]){return true;}}return false;}};function searchBuckets(buckets,hash){var i=buckets.length,bucket;
while(i--){bucket=buckets[i];if(hash===bucket[0]){return i;}}return null;}function getBucketForHash(bucketsByHash,hash){var bucket=bucketsByHash[hash];
return(bucket&&(bucket instanceof Bucket))?bucket:null;}function Hashtable(){var buckets=[];var bucketsByHash={};var properties={replaceDuplicateKey:true,hashCode:hashObject,equals:null};
var arg0=arguments[0],arg1=arguments[1];if(arg1!==UNDEFINED){properties.hashCode=arg0;properties.equals=arg1;}else{if(arg0!==UNDEFINED){merge(properties,arg0);
}}var hashCode=properties.hashCode,equals=properties.equals;this.properties=properties;this.put=function(key,value){checkKey(key);
checkValue(value);var hash=hashCode(key),bucket,bucketEntry,oldValue=null;bucket=getBucketForHash(bucketsByHash,hash);if(bucket){bucketEntry=bucket.getEntryForKey(key);
if(bucketEntry){if(properties.replaceDuplicateKey){bucketEntry[0]=key;}oldValue=bucketEntry[1];bucketEntry[1]=value;}else{bucket.addEntry(key,value);
}}else{bucket=new Bucket(hash,key,value,equals);buckets.push(bucket);bucketsByHash[hash]=bucket;}return oldValue;};this.get=function(key){checkKey(key);
var hash=hashCode(key);var bucket=getBucketForHash(bucketsByHash,hash);if(bucket){var bucketEntry=bucket.getEntryForKey(key);
if(bucketEntry){return bucketEntry[1];}}return null;};this.containsKey=function(key){checkKey(key);var bucketKey=hashCode(key);
var bucket=getBucketForHash(bucketsByHash,bucketKey);return bucket?bucket.containsKey(key):false;};this.containsValue=function(value){checkValue(value);
var i=buckets.length;while(i--){if(buckets[i].containsValue(value)){return true;}}return false;};this.clear=function(){buckets.length=0;
bucketsByHash={};};this.isEmpty=function(){return !buckets.length;};var createBucketAggregator=function(bucketFuncName){return function(){var aggregated=[],i=buckets.length;
while(i--){buckets[i][bucketFuncName](aggregated);}return aggregated;};};this.keys=createBucketAggregator("keys");this.values=createBucketAggregator("values");
this.entries=createBucketAggregator("getEntries");this.remove=function(key){checkKey(key);var hash=hashCode(key),bucketIndex,oldValue=null;
var bucket=getBucketForHash(bucketsByHash,hash);if(bucket){oldValue=bucket.removeEntryForKey(key);if(oldValue!==null){if(bucket.entries.length==0){bucketIndex=searchBuckets(buckets,hash);
buckets.splice(bucketIndex,1);delete bucketsByHash[hash];}}}return oldValue;};this.size=function(){var total=0,i=buckets.length;
while(i--){total+=buckets[i].entries.length;}return total;};}Hashtable.prototype={each:function(callback){var entries=this.entries(),i=entries.length,entry;
while(i--){entry=entries[i];callback(entry[0],entry[1]);}},equals:function(hashtable){var keys,key,val,count=this.size();
if(count==hashtable.size()){keys=this.keys();while(count--){key=keys[count];val=hashtable.get(key);if(val===null||val!==this.get(key)){return false;
}}return true;}return false;},putAll:function(hashtable,conflictCallback){var entries=hashtable.entries();var entry,key,value,thisValue,i=entries.length;
var hasConflictCallback=(typeof conflictCallback==FUNCTION);while(i--){entry=entries[i];key=entry[0];value=entry[1];if(hasConflictCallback&&(thisValue=this.get(key))){value=conflictCallback(key,thisValue,value);
}this.put(key,value);}},clone:function(){var clone=new Hashtable(this.properties);clone.putAll(this);return clone;}};Hashtable.prototype.toQueryString=function(){var entries=this.entries(),i=entries.length,entry;
var parts=[];while(i--){entry=entries[i];parts[i]=encodeURIComponent(toStr(entry[0]))+"="+encodeURIComponent(toStr(entry[1]));
}return parts.join("&");};return Hashtable;})();
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Function Utils for jquery - v${project.version}
 */
var oShow=jQuery.fn.show;
jQuery.fn.show=function(){jQuery(this).removeClass("hidden");return oShow.apply(this,arguments);};jQuery.extend({UNDEFINED:void 0,BLOCK_LEVEL_ELEMENTS:["address","article","aside","audio","blockquote","canvas","dd","div","dl","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","noscript","ol","output","p","pre","section","table","tfoot","ul","video"],LAYOUT_CONTAINER_ELEMENTS:["body","address","article","div","fieldset","footer","header","section"],FORM_ELEMENTS:["input","select","textarea","button"],FIELD_ELEMENTS:["input","select","textarea"],VOID_ELEMENTS:["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],ObjectUtils:{type:function(obj){return jQuery.type(obj);
},isUndefined:function(obj){return jQuery.ObjectUtils.type(obj)==="undefined";},isDefined:function(obj){return !jQuery.ObjectUtils.isUndefined(obj);
},isNull:function(obj){return jQuery.ObjectUtils.type(obj)==="null";},isNotNull:function(obj){return !jQuery.ObjectUtils.isNull(obj);
},isUnvalued:function(obj){return jQuery.ObjectUtils.isUndefined(obj)||jQuery.ObjectUtils.isNull(obj);},isValued:function(obj){return !jQuery.ObjectUtils.isUnvalued(obj);
},isPlain:function(obj){return jQuery.isPlainObject(obj);},isEmptyPlain:function(obj){return jQuery.ObjectUtils.isPlain(obj)&&jQuery.isEmptyObject(obj);
},isEmptyOrNullPlain:function(obj){return jQuery.ObjectUtils.isNull(obj)||jQuery.ObjectUtils.isEmptyPlain(obj);},isEmptyOrUnvaluedPlain:function(obj){return jQuery.ObjectUtils.isUnvalued(obj)||jQuery.ObjectUtils.isEmptyPlain(obj);
},isNotEmptyPlain:function(obj){return jQuery.ObjectUtils.isPlain(obj)&&!jQuery.isEmptyObject(obj);},isEmpty:function(obj){return(jQuery.ObjectUtils.isEmptyPlain(obj)||jQuery.StringUtils.isEmpty(obj)||jQuery.ArrayUtils.isEmpty(obj));
},isEmptyOrNull:function(obj){return(jQuery.ObjectUtils.isNull(obj)||jQuery.ObjectUtils.isEmpty(obj));},isEmptyOrUnvalued:function(obj){return jQuery.ObjectUtils.isUnvalued(obj)||jQuery.ObjectUtils.isEmpty(obj);
},isNotEmpty:function(obj){return jQuery.ObjectUtils.isValued(obj)&&!jQuery.ObjectUtils.isEmpty(obj);},isBlank:function(obj){return(jQuery.ObjectUtils.isEmptyPlain(obj)||jQuery.StringUtils.isBlank(obj)||jQuery.ArrayUtils.isEmpty(obj));
},isBlankOrNull:function(obj){return(jQuery.ObjectUtils.isNull(obj)||jQuery.ObjectUtils.isBlank(obj));},isBlankOrUnvalued:function(obj){return jQuery.ObjectUtils.isUnvalued(obj)||jQuery.ObjectUtils.isBlank(obj);
},isNotBlank:function(obj){return jQuery.ObjectUtils.isValued(obj)&&!jQuery.ObjectUtils.isBlank(obj);},isPrimitive:function(obj){return jQuery.ObjectUtils.isValued(obj)&&!jQuery.ObjectUtils.isPlain(obj)&&(typeof obj!=="object");
},hasPrimitive:function(obj){return jQuery.StringUtils.isString(obj)||jQuery.NumberUtils.isNumber(obj)||jQuery.BooleanUtils.isBoolean(obj);
},isBaseType:function(obj){return jQuery.ObjectUtils.hasPrimitive(obj)||jQuery.DateUtils.isDate(obj);},isBaseTypeOrUnvalued:function(obj){return jQuery.ObjectUtils.isUnvalued(obj)||jQuery.ObjectUtils.isBaseType(obj);
},toPrimitive:function(obj){if(jQuery.ObjectUtils.isPrimitive(obj)){return obj;}else{if(jQuery.StringUtils.isString(obj)){return jQuery.StringUtils.toPrimitive(obj);
}else{if(jQuery.BooleanUtils.isBoolean(obj)){return jQuery.BooleanUtils.toPrimitive(obj);}else{if(jQuery.NumberUtils.isNumber(obj)){return jQuery.NumberUtils.toPrimitive(obj);
}}}}return obj;},isSameType:function(obj1,obj2){return jQuery.ObjectUtils.type(obj1)===jQuery.ObjectUtils.type(obj2);},isNotSameType:function(obj1,obj2){return !jQuery.ObjectUtils.isSameType(obj1,obj2);
},getPathValue:function(sPath,params){if(!jQuery.StringUtils.isString(sPath)||!jQuery.ObjectUtils.isPlain(params)){return jQuery.UNDEFINED;
}var aPath=jQuery.ArrayUtils.removeBlanks(sPath.split(/[\[\]\.]+/));return jQuery.ObjectUtils._getPathValue(aPath,params);
},_getPathValue:function(aPath,params){var value=jQuery.UNDEFINED;if(jQuery.ArrayUtils.isNotEmpty(aPath)){value=params;for(var i=0;
(i<aPath.length&&jQuery.ObjectUtils.isValued(value));i++){var key=aPath[i].trim();if(jQuery.ObjectUtils.isPlain(value)){value=value[key];
}else{if(jQuery.ArrayUtils.isArray(value)){if(jQuery.StringUtils.isNumberString(key)){value=value[jQuery.NumberUtils.toNumber(key)];
}else{var tmpPath=aPath.slice(i);var tmpValue=[];for(var j=0;j<value.length;j++){var item=jQuery.ObjectUtils._getPathValue(tmpPath,value[j]);
tmpValue.push(item);}return tmpValue;}}else{value=jQuery.UNDEFINED;}}}}return value;},getNullSafePathValue:function(sPath,params){var value=jQuery.ObjectUtils.getPathValue(sPath,params);
return(jQuery.ObjectUtils.isNull(value))?jQuery.StringUtils.toNullSafe(value):value;},getUnvaluedSafePathValue:function(sPath,params){var value=jQuery.ObjectUtils.getPathValue(sPath,params);
return(jQuery.ObjectUtils.isUnvalued(value))?jQuery.StringUtils.toUnvaluedSafe(value):value;},parseExpression:function(expression){if(jQuery.ObjectUtils.isUndefined(expression)){return jQuery.UNDEFINED;
}else{if(jQuery.ObjectUtils.isNull(expression)){return null;}}var parsedExp={expression:expression,path:jQuery.UNDEFINED,transform:jQuery.UNDEFINED,format:jQuery.UNDEFINED,ifNull:jQuery.UNDEFINED,ifEmpty:jQuery.UNDEFINED,ifBlank:jQuery.UNDEFINED,ifTrue:jQuery.UNDEFINED,ifFalse:jQuery.UNDEFINED,ifPositive:jQuery.UNDEFINED,ifZero:jQuery.UNDEFINED,ifNegative:jQuery.UNDEFINED,ifUndefined:jQuery.UNDEFINED,"switch":jQuery.UNDEFINED,otherwise:jQuery.UNDEFINED,separator:jQuery.UNDEFINED,lastSeparator:jQuery.UNDEFINED,locale:jQuery.LocaleUtils.DEFAULT_LOCALE,silent:false};
var startDelimiter=jQuery.StringUtils.PARAM_START;var endDelimiter=jQuery.StringUtils.PARAM_END;if(jQuery.StringUtils.startsWith(expression,jQuery.StringUtils.SILENT_PARAM_START)){parsedExp.silent=true;
startDelimiter=jQuery.StringUtils.SILENT_PARAM_START;}var splitOpt=function(assignExpression){var array=[];if(jQuery.StringUtils.isNotBlank(assignExpression)){var idx=assignExpression.indexOf("=");
if(idx>=0){var i=0;var key=assignExpression.substring(0,idx).trim();var value=assignExpression.substring(idx+1);if(jQuery.StringUtils.isNotBlank(key)){array[i++]=key;
}array[i++]=(jQuery.ObjectUtils.isNotNull(value))?value.trim():"";}else{array[0]=assignExpression.trim();}}return array;};
var content=expression.substring(startDelimiter.length,expression.indexOf(endDelimiter));var opts=jQuery.ArrayUtils.toArray(content,{ignoreBlanks:true});
if(jQuery.ArrayUtils.isNotEmpty(opts)){for(var i=0;i<opts.length;i++){var opt=splitOpt(opts[i]);if(jQuery.ArrayUtils.isSingleton(opt)){parsedExp.path=jQuery.ArrayUtils.getSingleton(opt);
}else{if(jQuery.ArrayUtils.isEntry(opt)){var key=jQuery.ArrayUtils.getEntryKey(opt);var value=jQuery.ArrayUtils.getEntryValue(opt);
if(key==="silent"){if(!parsedExp.silent){parsedExp[key]=jQuery.BooleanUtils.toPrimitive(value);}}else{if(key==="switch"){var swtch={};
var pairs=value.split(";");for(var j=0;j<pairs.length;j++){var pair=pairs[j];var entry=pair.split(":");if(entry.length>0&&jQuery.StringUtils.isNotEmpty(entry[0])){if(jQuery.ArrayUtils.isSingleton(entry)){swtch[entry[0].trim()]="";
}else{if(jQuery.ArrayUtils.isEntry(entry)){swtch[entry[0].trim()]=entry[1].trim();}}}}value=swtch;}parsedExp[key]=value;}}}}}return jQuery.ObjectUtils.isValued(parsedExp.path)?parsedExp:null;
},getExpressionValue:function(parsedExp,params){var value=jQuery.UNDEFINED;var _parsedExp=parsedExp;if(jQuery.StringUtils.isString(_parsedExp)){_parsedExp=jQuery.ObjectUtils.parseExpression(_parsedExp);
}if(jQuery.ObjectUtils.isNotEmptyPlain(_parsedExp)){value=jQuery.ObjectUtils.copy(jQuery.ObjectUtils.getPathValue(_parsedExp.path,params));
if(jQuery.ArrayUtils.isArray(value)&&jQuery.ObjectUtils.isUnvalued(_parsedExp.ifEmpty)){var tmp="";for(var i=0;i<value.length;
i++){value[i]=jQuery.ObjectUtils._formatVal(_parsedExp,value[i]);if(jQuery.ObjectUtils.isValued(_parsedExp.separator)){tmp+=value[i];
if(i<(value.length-2)){tmp+=_parsedExp.separator;}else{if(i<(value.length-1)){tmp+=jQuery.ObjectUtils.isValued(_parsedExp.lastSeparator)?_parsedExp.lastSeparator:_parsedExp.separator;
}}}}if(jQuery.ObjectUtils.isValued(_parsedExp.separator)){value=tmp;}}else{value=jQuery.ObjectUtils._formatVal(_parsedExp,value);
}}return value;},_formatVal:function(exp,val){var _val=val;if(jQuery.ObjectUtils.isValued(exp.transform)){var _tmp=exp.transform;
if(jQuery.FunctionUtils.isFunction(window[_tmp])){var _args=new Array(_val);_val=window[_tmp].apply(window,_args);}}if(jQuery.ObjectUtils.isValued(exp.format)){var _tmp=exp.format;
var formatOpts={format:_tmp,locale:exp.locale};if(jQuery.DateUtils.isDate(_val)){_val=jQuery.DateUtils.formatDate(_val,formatOpts);
}else{if(jQuery.NumberUtils.isNumber(_val)){_val=jQuery.NumberUtils.formatNumber(_val,formatOpts);}}}if(jQuery.ObjectUtils.isUndefined(_val)){if(jQuery.ObjectUtils.isDefined(exp.ifUndefined)){_val=exp.ifUndefined;
}else{if(exp.silent){_val="";}else{return _val;}}}else{if(jQuery.ObjectUtils.isDefined(exp.ifNull)&&jQuery.ObjectUtils.isNull(_val)){_val=exp.ifNull;
}else{if(jQuery.ObjectUtils.isDefined(exp.ifEmpty)&&jQuery.ObjectUtils.isEmptyOrNull(_val)){_val=exp.ifEmpty;}else{if(jQuery.ObjectUtils.isDefined(exp.ifBlank)&&jQuery.ObjectUtils.isBlankOrNull(_val)){_val=exp.ifBlank;
}else{if(jQuery.ObjectUtils.isDefined(exp.ifTrue)&&(jQuery.BooleanUtils.isTrue(_val)||jQuery.BooleanUtils.isTrueString(_val))){_val=exp.ifTrue;
}else{if(jQuery.ObjectUtils.isDefined(exp.ifFalse)&&(jQuery.BooleanUtils.isFalse(_val)||jQuery.BooleanUtils.isFalseString(_val))){_val=exp.ifFalse;
}else{if(jQuery.ObjectUtils.isDefined(exp.ifPositive)&&jQuery.NumberUtils.isPositive(_val)){_val=exp.ifPositive;}else{if(jQuery.ObjectUtils.isDefined(exp.ifZero)&&jQuery.NumberUtils.isZero(_val)){_val=exp.ifZero;
}else{if(jQuery.ObjectUtils.isDefined(exp.ifNegative)&&jQuery.NumberUtils.isNegative(_val)){_val=exp.ifNegative;}else{if(jQuery.ObjectUtils.isDefined(exp.ifZeroOrPositive)&&jQuery.NumberUtils.isZeroOrPositive(_val)){_val=exp.ifZeroOrPositive;
}else{if(jQuery.ObjectUtils.isDefined(exp.ifZeroOrNegative)&&jQuery.NumberUtils.isZeroOrNegative(_val)){_val=exp.ifZeroOrNegative;
}else{if(jQuery.ObjectUtils.isDefined(exp["switch"])&&(jQuery.StringUtils.toString(_val) in exp["switch"])){_val=exp["switch"][jQuery.StringUtils.toString(_val)];
}else{if(jQuery.ObjectUtils.isDefined(exp.otherwise)){_val=exp.otherwise;}}}}}}}}}}}}}return _val;},isEquals:function(obj1,obj2){if(jQuery.ObjectUtils.isNotSameType(obj1,obj2)){return false;
}else{if(obj1===obj2){return true;}else{if(jQuery.BooleanUtils.isBoolean(obj1)||jQuery.StringUtils.isString(obj1)||jQuery.NumberUtils.isNumber(obj1)){return jQuery.ObjectUtils.toPrimitive(obj1)===jQuery.ObjectUtils.toPrimitive(obj2);
}else{if(jQuery.DateUtils.isDate(obj1)){return(obj1-obj2)===0;}else{if(jQuery.ArrayUtils.isArray(obj1)){if(jQuery.ArrayUtils.isNotSameSize(obj1,obj2)){return false;
}for(var i=0;i<obj1.length;i++){if(!jQuery.ObjectUtils.isEquals(obj1[i],obj2[i])){return false;}}return true;}else{if(jQuery.ObjectUtils.isPlain(obj1)){var keys1=(jQuery.ObjectUtils.getKeys(obj1)).sort();
var keys2=(jQuery.ObjectUtils.getKeys(obj2)).sort();if(jQuery.ObjectUtils.isNotEquals(keys1,keys2)){return false;}for(var i=0;
i<keys1.length;i++){var key=keys1[i];if(jQuery.ObjectUtils.isNotEquals(obj1[key],obj2[key])){return false;}}return true;}else{return false;
}}}}}}return false;},isNotEquals:function(obj1,obj2){return !jQuery.ObjectUtils.isEquals(obj1,obj2);},getKeys:function(obj){var keys=[];
if(jQuery.ObjectUtils.isPlain(obj)){var i=0;for(var propName in obj){keys[i]=propName;i++;}}return keys;},getValues:function(obj){var values=[];
if(jQuery.ObjectUtils.isPlain(obj)){var i=0;for(var propName in obj){values[i]=obj[propName];i++;}}return values;},hasProperty:function(obj,propname){return jQuery.ObjectUtils.isPlain(obj)&&obj.hasOwnProperty(propname)&&jQuery.ObjectUtils.isDefined(obj[propname]);
},removeBlanks:function(obj){var ret=obj;if(jQuery.ObjectUtils.isPlain(obj)){ret={};for(var propName in obj){var propValue=obj[propName];
if(jQuery.ObjectUtils.isNotBlank(propValue)){ret[propName]=propValue;}}}return ret;},toUnvaluedSafe:function(obj){if(jQuery.ObjectUtils.isUnvalued(obj)){return{};
}else{return obj;}},unwrap:function(value,opts){var ret=jQuery.UNDEFINED;var options=jQuery.ObjectUtils._getUnwrapOpts(opts);
if(jQuery.FunctionUtils.isFunction(value)){var tmp=value.apply(window,options.args);ret=jQuery.ObjectUtils.unwrap(tmp,options);
}else{ret=value;if(options.detach){if(jQuery.JqueryUtils.isJquery(ret)){ret.detach();}else{if(jQuery.DOMUtils.isDOM(ret)){jQuery(ret).detach();
}}}if(options.copy){ret=jQuery.ObjectUtils.copy(ret,options.deepCopy);}}return ret;},unwrapUnvaluedSafe:function(value,opts){return jQuery.ObjectUtils.toUnvaluedSafe(jQuery.ObjectUtils.unwrap(value,opts));
},_getUnwrapOpts:function(opts){if(jQuery.ObjectUtils.isPlain(opts)&&jQuery.BooleanUtils.isTrue(opts.skip)){return opts;}var options={locale:jQuery.LocaleUtils.DEFAULT_LOCALE,regional:{},args:[],detach:false,copy:false,deepCopy:false,skip:true};
if(jQuery.ArrayUtils.isArray(opts)){options.args=opts;}else{if(jQuery.ObjectUtils.isPlain(opts)){options=jQuery.extend({},options,opts);
}}return options;},copy:function(obj,deep){if(jQuery.ObjectUtils.isUndefined(obj)){return jQuery.UNDEFINED;}if(jQuery.ObjectUtils.isNull(obj)){return null;
}var isDeep=jQuery.BooleanUtils.isTrue(deep);var ret;if(jQuery.ObjectUtils.isPlain(obj)){ret=jQuery.extend(isDeep,{},obj);
}else{if(jQuery.DateUtils.isDate(obj)){ret=new Date(obj.getTime());}else{if(jQuery.ArrayUtils.isArray(obj)){if(isDeep){var len=jQuery.ArrayUtils.size(obj);
ret=new Array(len);for(var i=0;i<len;i++){ret[i]=jQuery.ObjectUtils.copy(obj[i],isDeep);}}else{ret=obj.slice();}}else{if(jQuery.JqueryUtils.isJquery(obj)){ret=obj.clone(isDeep,isDeep);
}else{if(jQuery.DOMUtils.isDOM(obj)){ret=obj.cloneNode(isDeep);}else{if(jQuery.ObjectUtils.hasPrimitive(obj)){ret=jQuery.ObjectUtils.toPrimitive(obj);
}else{ret=obj;}}}}}}return ret;}},StringUtils:{OPT_ASSIGN:"=",PARAM_START:"@{",SILENT_PARAM_START:"@!{",PARAM_END:"}",DEFAULT_SPLIT_DELIMITER:"|",isString:function(obj){return jQuery.ObjectUtils.type(obj)==="string";
},isNotString:function(obj){return !jQuery.StringUtils.isString(obj);},isEmpty:function(obj){return jQuery.StringUtils.isString(obj)&&(obj==="");
},isEmptyOrNull:function(obj){return jQuery.ObjectUtils.isNull(obj)||jQuery.StringUtils.isEmpty(obj);},isEmptyOrUnvalued:function(obj){return jQuery.ObjectUtils.isUnvalued(obj)||jQuery.StringUtils.isEmpty(obj);
},isNotEmpty:function(obj){return jQuery.StringUtils.isString(obj)&&!jQuery.StringUtils.isEmpty(obj);},isBlank:function(obj){return jQuery.StringUtils.isString(obj)&&(jQuery.StringUtils.isEmpty(obj)||(/^\s+$/).test(obj));
},isBlankOrNull:function(obj){return jQuery.ObjectUtils.isNull(obj)||jQuery.StringUtils.isBlank(obj);},isBlankOrUnvalued:function(obj){return jQuery.ObjectUtils.isUnvalued(obj)||jQuery.StringUtils.isBlank(obj);
},isNotBlank:function(obj){return jQuery.StringUtils.isString(obj)&&!jQuery.StringUtils.isBlank(obj);},size:function(obj){return jQuery.StringUtils.isNotEmpty(obj)?obj.length:0;
},isNumberString:function(obj){return jQuery.StringUtils.isNotBlank(obj)&&!isNaN(obj);},isBooleanString:function(obj){return jQuery.BooleanUtils.isBooleanString(obj);
},isTrueString:function(obj){return jQuery.BooleanUtils.isTrueString(obj);},isFalseString:function(obj){return jQuery.BooleanUtils.isFalseString(obj);
},isPrimitive:function(obj){return jQuery.ObjectUtils.isPrimitive(obj)&&jQuery.StringUtils.isString(obj);},toPrimitive:function(obj){var converted;
if(jQuery.StringUtils.isString(obj)){converted=(jQuery.ObjectUtils.isPrimitive(obj))?obj:obj.valueOf();}else{converted=String(obj);
}return converted;},toString:function(obj){return jQuery.StringUtils.toPrimitive(obj);},toNullSafe:function(obj){if(jQuery.ObjectUtils.isUndefined(obj)){return obj;
}else{if(jQuery.ObjectUtils.isNull(obj)){return"";}else{if(jQuery.StringUtils.isPrimitive(obj)){return obj;}else{return jQuery.StringUtils.toPrimitive(obj);
}}}},toUnvaluedSafe:function(obj){if(jQuery.ObjectUtils.isUnvalued(obj)){return"";}else{if(jQuery.StringUtils.isPrimitive(obj)){return obj;
}else{return jQuery.StringUtils.toPrimitive(obj);}}},startsWith:function(obj1,str,from){if(jQuery.StringUtils.isString(str)&&(jQuery.StringUtils.isString(obj1)||jQuery.ArrayUtils.isNotEmpty(obj1))){var start=(jQuery.NumberUtils.isPositive(from))?from:0;
return obj1.indexOf(str,start)===start;}return false;},endsWith:function(obj1,str){if(jQuery.StringUtils.isString(str)&&(jQuery.StringUtils.isString(obj1))){return obj1.lastIndexOf(str)===obj1.length-str.length;
}else{if(jQuery.ArrayUtils.isNotEmpty(obj1)){return obj1.lastIndexOf(str)===obj1.length-1;}}return false;},contains:function(str,strToFind,from){if(jQuery.StringUtils.isString(strToFind)&&(jQuery.StringUtils.isString(str)||jQuery.ArrayUtils.isArray(str))){var start=(jQuery.NumberUtils.isNumber(from))?from:0;
return str.indexOf(strToFind,start)>=start;}return false;},replaceParams:function(sequence,params){var replaced=sequence;
if(jQuery.StringUtils.isNotBlank(sequence)){var getStart=function(seq,from){var start1=seq.indexOf(jQuery.StringUtils.PARAM_START,from);
var start2=seq.indexOf(jQuery.StringUtils.SILENT_PARAM_START,from);if(start1>=0&&start2>=0){return(start1<start2)?start1:start2;
}else{if(start1>=0){return start1;}else{return start2;}}};var start=getStart(sequence,0);while(start>=0){var end=sequence.indexOf(jQuery.StringUtils.PARAM_END,start);
if(end>start){end=end+jQuery.StringUtils.PARAM_END.length;var expression=sequence.substring(start,end);var prop=jQuery.ObjectUtils.parseExpression(expression);
var value=jQuery.ObjectUtils.getExpressionValue(prop,params);if(jQuery.ObjectUtils.isDefined(value)){if(jQuery.ObjectUtils.isNotNull(value)){replaced=replaced.replace(expression,value);
}else{replaced=replaced.replace(expression,"");}}start=getStart(sequence,end);}else{break;}}}return replaced;},isParameterized:function(sequence){if(jQuery.StringUtils.isBlankOrUnvalued(sequence)){return false;
}var start;var start1=sequence.indexOf(jQuery.StringUtils.PARAM_START,0);var start2=sequence.indexOf(jQuery.StringUtils.SILENT_PARAM_START,0);
if(start1>=0&&start2>=0){start=(start1<start2)?start1:start2;}if(start>=0){var end=sequence.indexOf(jQuery.StringUtils.PARAM_END,start);
return(end>start);}return false;},isSameSize:function(obj1,obj2){return jQuery.ObjectUtils.isSameType(obj1,obj2)&&jQuery.StringUtils.isString(obj1)&&obj1.length===obj2.length;
},isNotSameSize:function(obj1,obj2){return !jQuery.StringUtils.isSameSize(obj1,obj2);},isSmallerSize:function(obj1,obj2){return jQuery.ObjectUtils.isSameType(obj1,obj2)&&jQuery.StringUtils.isString(obj1)&&obj1.length<obj2.length;
},isLargerSize:function(obj1,obj2){return jQuery.ObjectUtils.isSameType(obj1,obj2)&&jQuery.StringUtils.isString(obj1)&&obj1.length>obj2.length;
},removePunct:function(sequence){return sequence.replace(/[\[\]\.,-\/#!$%\^&\*;:{}=\-_`~()<>]/g,"");},removeAccents:function(sequence){if(jQuery.StringUtils.size(sequence)===0){return sequence;
}else{if(jQuery.StringUtils.size(sequence)===1){return jQuery.CharacterUtils.removeAccent(sequence.charAt(i));}else{var text=[];
for(var i=0;i<jQuery.StringUtils.size(sequence);i++){text.push(jQuery.CharacterUtils.removeAccent(sequence.charAt(i)));}return text.join("");
}}},truncate:function(sequence,max){var str=sequence;if(jQuery.ObjectUtils.isValued(str)){str=jQuery.StringUtils.toPrimitive(str);
return str.length>max?str.substr(0,max):str;}return str;},putLeading:function(sequence,leading,n){if(n<=0||jQuery.StringUtils.isEmptyOrUnvalued(leading)){return sequence;
}var leadingSeq="";for(var i=0;i<n;i++){leadingSeq+=leading;}return leadingSeq+sequence;},unwrap:function(value,opts){var tmp=jQuery.ObjectUtils.unwrap(value,opts);
return(jQuery.StringUtils.isString(tmp))?tmp:jQuery.UNDEFINED;},unwrapUnvaluedSafe:function(value,opts){return jQuery.StringUtils.toUnvaluedSafe(jQuery.StringUtils.unwrap(value,opts));
}},CharacterUtils:{ALPHA_PATTERN:/^[a-zA-Z]*$/,ALPHANUM_PATTERN:/^[a-zA-Z0-9]*$/,CONTROL_PATTERN:/^[\x00\x1F\x7F]*$/,DIGIT_PATTERN:/^[0-9]*$/,HEXDIGIT_PATTERN:/^[0-9a-fA-F]*$/,PRINT_PATTERN:/^[\x20-\x7E]*$/,WHITESPACE_PATTERN:/^[\s]*$/,DIACRITICS_REMOVAL_MAP:[{base:"A",letters:/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},{base:"AA",letters:/[\uA732]/g},{base:"AE",letters:/[\u00C6\u01FC\u01E2]/g},{base:"AO",letters:/[\uA734]/g},{base:"AU",letters:/[\uA736]/g},{base:"AV",letters:/[\uA738\uA73A]/g},{base:"AY",letters:/[\uA73C]/g},{base:"B",letters:/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},{base:"C",letters:/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},{base:"D",letters:/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},{base:"DZ",letters:/[\u01F1\u01C4]/g},{base:"Dz",letters:/[\u01F2\u01C5]/g},{base:"E",letters:/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},{base:"F",letters:/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},{base:"G",letters:/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},{base:"H",letters:/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},{base:"I",letters:/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},{base:"J",letters:/[\u004A\u24BF\uFF2A\u0134\u0248]/g},{base:"K",letters:/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},{base:"L",letters:/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},{base:"LJ",letters:/[\u01C7]/g},{base:"Lj",letters:/[\u01C8]/g},{base:"M",letters:/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},{base:"N",letters:/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},{base:"NJ",letters:/[\u01CA]/g},{base:"Nj",letters:/[\u01CB]/g},{base:"O",letters:/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},{base:"OI",letters:/[\u01A2]/g},{base:"OO",letters:/[\uA74E]/g},{base:"OU",letters:/[\u0222]/g},{base:"P",letters:/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},{base:"Q",letters:/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},{base:"R",letters:/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},{base:"S",letters:/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},{base:"T",letters:/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},{base:"TZ",letters:/[\uA728]/g},{base:"U",letters:/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},{base:"V",letters:/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},{base:"VY",letters:/[\uA760]/g},{base:"W",letters:/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},{base:"X",letters:/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},{base:"Y",letters:/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},{base:"Z",letters:/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},{base:"a",letters:/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},{base:"aa",letters:/[\uA733]/g},{base:"ae",letters:/[\u00E6\u01FD\u01E3]/g},{base:"ao",letters:/[\uA735]/g},{base:"au",letters:/[\uA737]/g},{base:"av",letters:/[\uA739\uA73B]/g},{base:"ay",letters:/[\uA73D]/g},{base:"b",letters:/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},{base:"c",letters:/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},{base:"d",letters:/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},{base:"dz",letters:/[\u01F3\u01C6]/g},{base:"e",letters:/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},{base:"f",letters:/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},{base:"g",letters:/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},{base:"h",letters:/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},{base:"hv",letters:/[\u0195]/g},{base:"i",letters:/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},{base:"j",letters:/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},{base:"k",letters:/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},{base:"l",letters:/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},{base:"lj",letters:/[\u01C9]/g},{base:"m",letters:/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},{base:"n",letters:/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},{base:"nj",letters:/[\u01CC]/g},{base:"o",letters:/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},{base:"oi",letters:/[\u01A3]/g},{base:"ou",letters:/[\u0223]/g},{base:"oo",letters:/[\uA74F]/g},{base:"p",letters:/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},{base:"q",letters:/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},{base:"r",letters:/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},{base:"s",letters:/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},{base:"t",letters:/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},{base:"tz",letters:/[\uA729]/g},{base:"u",letters:/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},{base:"v",letters:/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},{base:"vy",letters:/[\uA761]/g},{base:"w",letters:/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},{base:"x",letters:/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},{base:"y",letters:/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},{base:"z",letters:/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}],isCharacter:function(obj){return jQuery.StringUtils.isString(obj)&&jQuery.StringUtils.size(obj)===1;
},isNotCharacter:function(obj){return !jQuery.CharacterUtils.isCharacter(obj);},isLetter:function(obj){if(jQuery.CharacterUtils.isNotCharacter(obj)){return false;
}var c=jQuery.CharacterUtils.removeAccent(obj);return jQuery.CharacterUtils.ALPHA_PATTERN.test(c);},isDigit:function(obj){if(jQuery.CharacterUtils.isNotCharacter(obj)){return false;
}return jQuery.CharacterUtils.DIGIT_PATTERN.test(obj);},isPrint:function(obj){if(jQuery.CharacterUtils.isNotCharacter(obj)){return false;
}var c=jQuery.CharacterUtils.removeAccent(obj);return jQuery.CharacterUtils.PRINT_PATTERN.test(c);},isWhitespace:function(obj){if(jQuery.CharacterUtils.isNotCharacter(obj)){return false;
}return jQuery.CharacterUtils.WHITESPACE_PATTERN.test(obj);},isNonWhitespace:function(obj){if(jQuery.CharacterUtils.isNotCharacter(obj)){return false;
}return jQuery.CharacterUtils.isPrint(obj)&&!jQuery.CharacterUtils.isWhitespace(obj);},removeAccent:function(ch){if(jQuery.CharacterUtils.isNotCharacter(ch)){return ch;
}var c=ch;var mayBeAccented=!(/^[a-zA-Z0-9\s]*$/.test(c));if(mayBeAccented){for(var j=0;j<jQuery.CharacterUtils.DIACRITICS_REMOVAL_MAP.length;
j++){var tmp=c.replace(jQuery.CharacterUtils.DIACRITICS_REMOVAL_MAP[j].letters,jQuery.CharacterUtils.DIACRITICS_REMOVAL_MAP[j].base);
if(tmp!==c){c=tmp;break;}}}return c;}},BooleanUtils:{TRUE_VALUES:["true","yes","y","on","selected","checked"],FALSE_VALUES:["false","no","n","off","unselected","unchecked"],isBoolean:function(obj){return jQuery.ObjectUtils.type(obj)==="boolean";
},isNotBoolean:function(obj){return !jQuery.BooleanUtils.isBoolean(obj);},isBooleanString:function(obj){var lc=String(obj).toLowerCase();
return jQuery.StringUtils.isNotBlank(obj)&&(jQuery.ArrayUtils.contains(jQuery.BooleanUtils.TRUE_VALUES,lc)||jQuery.ArrayUtils.contains(jQuery.BooleanUtils.FALSE_VALUES,lc));
},isPrimitive:function(obj){return jQuery.ObjectUtils.isPrimitive(obj)&&jQuery.BooleanUtils.isBoolean(obj);},toPrimitive:function(obj){var converted=obj;
if(jQuery.ObjectUtils.isUnvalued(obj)){converted=false;}else{if(jQuery.BooleanUtils.isBoolean(obj)){converted=(jQuery.ObjectUtils.isPrimitive(obj))?obj:obj.valueOf();
}else{if(jQuery.StringUtils.isString(obj)){converted=false;if(jQuery.StringUtils.isNotBlank(obj)){converted=Boolean(obj);
var svalue=String(obj).toLowerCase();if(jQuery.ArrayUtils.contains(jQuery.BooleanUtils.FALSE_VALUES,svalue)||svalue==="undefined"||svalue==="null"){converted=false;
}}}else{converted=Boolean(obj);}}}return converted;},isTrue:function(obj){return jQuery.BooleanUtils.isBoolean(obj)&&jQuery.BooleanUtils.toBoolean(obj);
},isTrueString:function(obj){return jQuery.BooleanUtils.isBooleanString(obj)&&jQuery.BooleanUtils.toPrimitive(obj);},isFalse:function(obj){return jQuery.BooleanUtils.isBoolean(obj)&&!jQuery.BooleanUtils.toBoolean(obj);
},isFalseString:function(obj){return jQuery.BooleanUtils.isBooleanString(obj)&&!jQuery.BooleanUtils.toPrimitive(obj);},toBoolean:function(obj){return jQuery.BooleanUtils.toPrimitive(obj);
},toUnvaluedSafe:function(obj){return jQuery.BooleanUtils.toPrimitive(obj);},unwrap:function(value,opts){var tmp=jQuery.ObjectUtils.unwrap(value,opts);
return(jQuery.BooleanUtils.isBoolean(tmp))?tmp:jQuery.UNDEFINED;},unwrapUnvaluedSafe:function(value,opts){return jQuery.BooleanUtils.toUnvaluedSafe(jQuery.BooleanUtils.unwrap(value,opts));
}},DateUtils:{JANUARY:0,FEBRUARY:1,MARCH:2,APRIL:3,MAY:4,JUNE:5,JULY:6,AUGUST:7,SEPTEMBER:8,OCTOBER:9,NOVEMBER:10,DECEMBER:11,defaultFormatOptions:function(){return{format:"dd/MM/yyyy",locale:jQuery.LocaleUtils.DEFAULT_LOCALE};
},isDate:function(obj){return jQuery.ObjectUtils.type(obj)==="date";},isNotDate:function(obj){return !jQuery.DateUtils.isDate(obj);
},now:function(){return new Date();},nowStr:function(opts){var d=jQuery.DateUtils.now();return jQuery.DateUtils.formatDate(d,opts);
},year:function(date){var d=(jQuery.ObjectUtils.isValued(date))?date:jQuery.DateUtils.now();return d.getFullYear();},month:function(date){var d=(jQuery.ObjectUtils.isValued(date))?date:jQuery.DateUtils.now();
return d.getMonth();},monthName:function(date,locale){var l=jQuery.StringUtils.isNotBlank(locale)?locale:jQuery.LocaleUtils.DEFAULT_LOCALE;
var m=jQuery.DateUtils.month(date);var regional=(jQuery.ObjectUtils.isValued(jQuery.datepicker.regional[l]))?jQuery.datepicker.regional[l]:jQuery.datepicker.regional[""];
return regional.monthNames[m];},dayOfMonth:function(date){var d=(jQuery.ObjectUtils.isValued(date))?date:jQuery.DateUtils.now();
return d.getDate();},daysAgo:function(days,date){var tmp=jQuery.DateUtils.isDate(date)?new Date(date.getTime()):jQuery.DateUtils.now();
var day=tmp.getDate();tmp.setDate(day-days);return tmp;},monthsAgo:function(months,date){var tmp=jQuery.DateUtils.isDate(date)?new Date(date.getTime()):jQuery.DateUtils.now();
var month=tmp.getMonth();tmp.setMonth(month-months);return tmp;},yearsAgo:function(years,date){var tmp=jQuery.DateUtils.isDate(date)?new Date(date.getTime()):jQuery.DateUtils.now();
var year=tmp.getYear();tmp.setYear(year-years);return tmp;},daysAgoStr:function(days,opts){var d=jQuery.DateUtils.daysAgo(days);
return jQuery.DateUtils.formatDate(d,opts);},monthsAgoStr:function(months,opts){var d=jQuery.DateUtils.monthsAgo(months);
return jQuery.DateUtils.formatDate(d,opts);},yearsAgoStr:function(years,opts){var d=jQuery.DateUtils.yearsAgo(years);return jQuery.DateUtils.formatDate(d,opts);
},formatDate:function(date,opts){if(jQuery.ObjectUtils.isUnvalued(date)){return"";}var options=jQuery.extend({},jQuery.DateUtils.defaultFormatOptions(),jQuery.StringUtils.isString(opts)?{format:opts}:opts);
var formatter=new JsSimpleDateFormat(options.format,options.locale);return(jQuery.DateUtils.isDate(date))?formatter.format(date):"";
},toDate:function(sdate,opts){if(jQuery.ObjectUtils.isBlankOrUnvalued(sdate)){return null;}var options=jQuery.extend({},jQuery.DateUtils.defaultFormatOptions(),jQuery.StringUtils.isString(opts)?{format:opts}:opts);
var formatter=new JsSimpleDateFormat(options.format,options.locale);return(jQuery.StringUtils.isString(sdate))?formatter.parse(sdate):sdate;
},toUnvaluedSafe:function(obj){if(jQuery.DateUtils.isNotDate(obj)){return jQuery.DateUtils.now();}else{return obj;}},unwrap:function(value,opts){var tmp=jQuery.ObjectUtils.unwrap(value,opts);
return(jQuery.DateUtils.isDate(tmp))?tmp:jQuery.UNDEFINED;},unwrapUnvaluedSafe:function(value,opts){return jQuery.DateUtils.toUnvaluedSafe(jQuery.DateUtils.unwrap(value,opts));
}},NumberUtils:{defaultFormatOptions:function(){return{format:"#,###.##",locale:jQuery.LocaleUtils.DEFAULT_LOCALE};},isNumber:function(obj){return jQuery.ObjectUtils.type(obj)==="number"&&!isNaN(obj);
},isNotNumber:function(obj){return !jQuery.NumberUtils.isNumber(obj);},isZero:function(obj){return jQuery.NumberUtils.isNumber(obj)&&jQuery.NumberUtils.toPrimitive(obj)===0;
},isPositive:function(obj){return jQuery.NumberUtils.isNumber(obj)&&jQuery.NumberUtils.toPrimitive(obj)>0;},isNegative:function(obj){return jQuery.NumberUtils.isNumber(obj)&&jQuery.NumberUtils.toPrimitive(obj)<0;
},isZeroOrPositive:function(obj){return jQuery.NumberUtils.isZero(obj)||jQuery.NumberUtils.isPositive(obj);},isZeroOrNegative:function(obj){return jQuery.NumberUtils.isZero(obj)||jQuery.NumberUtils.isNegative(obj);
},isPrimitive:function(obj){return jQuery.ObjectUtils.isPrimitive(obj)&&jQuery.NumberUtils.isNumber(obj);},toPrimitive:function(obj){var converted;
if(jQuery.ObjectUtils.isUnvalued(obj)||jQuery.StringUtils.isBlank(obj)||jQuery.ArrayUtils.isArray(obj)){converted=NaN;}else{if(jQuery.NumberUtils.isNumber(obj)){converted=(jQuery.ObjectUtils.isPrimitive(obj))?obj:obj.valueOf();
}else{converted=Number(obj);}}return converted;},toNumber:function(obj){return jQuery.NumberUtils.toPrimitive(obj);},formatNumber:function(numberObj,opts){if(jQuery.ObjectUtils.isUnvalued(numberObj)){return"";
}var options=jQuery.extend({},jQuery.NumberUtils.defaultFormatOptions(),jQuery.StringUtils.isString(opts)?{format:opts}:opts);
return jQuery.formatNumber(numberObj,options);},toUnvaluedSafe:function(obj){if(jQuery.NumberUtils.isNotNumber(number)){var number=jQuery.NumberUtils.toPrimitive(obj);
return isNaN(number)?0:number;}else{return obj;}},unwrap:function(value,opts){var tmp=jQuery.ObjectUtils.unwrap(value,opts);
return(jQuery.NumberUtils.isNumber(tmp))?tmp:jQuery.UNDEFINED;},unwrapUnvaluedSafe:function(value,opts){return jQuery.NumberUtils.toUnvaluedSafe(jQuery.NumberUtils.unwrap(value,opts));
}},ArrayUtils:{isArray:function(obj){return jQuery.isArray(obj);},isNotArray:function(obj){return jQuery.ObjectUtils.isUnvalued(obj)||!jQuery.ArrayUtils.isArray(obj);
},isEmpty:function(obj){return jQuery.ArrayUtils.isArray(obj)&&obj.length===0;},isEmptyOrNull:function(obj){return jQuery.ObjectUtils.isNull(obj)||jQuery.ArrayUtils.isEmpty(obj);
},isEmptyOrUnvalued:function(obj){return jQuery.ObjectUtils.isUnvalued(obj)||jQuery.ArrayUtils.isEmpty(obj);},isNotEmpty:function(obj){return jQuery.ArrayUtils.isArray(obj)&&obj.length>0;
},size:function(obj){return jQuery.ArrayUtils.isNotEmpty(obj)?obj.length:0;},isSingleton:function(obj){return jQuery.ArrayUtils.isNotEmpty(obj)&&obj.length===1;
},isEmptyOrSingleton:function(obj){return jQuery.ArrayUtils.isEmpty(obj)||jQuery.ArrayUtils.isSingleton(obj);},isEntry:function(obj){return jQuery.ArrayUtils.isNotEmpty(obj)&&obj.length===2;
},isEmptyOrEntry:function(obj){return jQuery.ArrayUtils.isEmpty(obj)||jQuery.ArrayUtils.isEntry(obj);},getSingleton:function(array){if(jQuery.ArrayUtils.isEmpty(array)){return null;
}else{if(jQuery.ArrayUtils.isSingleton(array)){return array[0];}}throw new Error("given array is not a singleton");},isNotSingleton:function(obj){return !jQuery.ArrayUtils.isSingleton(obj);
},getEntryKey:function(array){if(jQuery.ArrayUtils.isEmpty(array)){return null;}else{if(jQuery.ArrayUtils.isEntry(array)){return array[0];
}}throw"given array is not a Entry ([key, value])";},getEntryValue:function(array){if(jQuery.ArrayUtils.isEmpty(array)){return null;
}else{if(jQuery.ArrayUtils.isEntry(array)){return array[1];}}throw"given array is not a Entry ([key, value])";},toArray:function(obj,opts){if(jQuery.ObjectUtils.isUndefined(obj)||jQuery.ObjectUtils.isNull(obj)){return obj;
}var options;var defaultOpts={ignoreBlanks:false,delimiter:jQuery.StringUtils.DEFAULT_SPLIT_DELIMITER};if(jQuery.StringUtils.isString(opts)||jQuery.RegexUtils.isRegex(opts)){options=jQuery.extend({},defaultOpts,{delimiter:opts});
}else{if(jQuery.BooleanUtils.isBoolean(opts)){options=jQuery.extend({},defaultOpts,{ignoreBlanks:opts});}else{options=jQuery.extend({},defaultOpts,opts);
}}var array=[];var ignore=jQuery.BooleanUtils.toBoolean(options.ignoreBlanks);if(jQuery.ArrayUtils.isArray(obj)){array=(ignore)?jQuery.ArrayUtils.removeBlanks(obj):obj;
}else{if(jQuery.StringUtils.isNotBlank(obj)){var tmp=obj.split(options.delimiter);array=(ignore)?jQuery.ArrayUtils.removeBlanks(tmp):tmp;
}else{if(jQuery.ObjectUtils.isPlain(obj)){array=jQuery.ObjectUtils.getValues(obj);}}}return array;},toString:function(array,opts){if(jQuery.ObjectUtils.isUnvalued(array)){return array;
}else{if(jQuery.ArrayUtils.isNotArray(array)){return String(array);}}var options;var defaultOpts={ignoreBlanks:false,delimiter:jQuery.StringUtils.DEFAULT_SPLIT_DELIMITER};
if(jQuery.StringUtils.isString(opts)||jQuery.RegexUtils.isRegex(opts)){options=jQuery.extend({},defaultOpts,{delimiter:opts});
}else{if(jQuery.BooleanUtils.isBoolean(opts)){options=jQuery.extend({},defaultOpts,{ignoreBlanks:opts});}else{options=jQuery.extend({},defaultOpts,opts);
}}var str="";for(var i=0;i<array.length;i++){str+=jQuery.ArrayUtils.toString(array[i],options);if(i<(array.length-1)){str+=options.delimiter;
}}return str;},toUnvaluedSafe:function(obj){if(jQuery.ObjectUtils.isUnvalued(obj)){return[];}else{if(jQuery.ArrayUtils.isNotArray(obj)){return[obj];
}else{return obj;}}},removeBlanks:function(obj){var ret=obj;if(jQuery.ArrayUtils.isArray(obj)){ret=[];var k=0;for(var i=0;
i<obj.length;i++){if(jQuery.ObjectUtils.isNotBlank(obj[i])){ret[k]=obj[i];k++;}}}return ret;},contains:function(array,toFind,from){if(jQuery.ObjectUtils.isDefined(toFind)&&jQuery.ArrayUtils.isArray(array)){var start=(jQuery.NumberUtils.isNumber(from))?from:0;
return array.indexOf(toFind,start)>=start;}return false;},isSameSize:function(obj1,obj2){return jQuery.ObjectUtils.isSameType(obj1,obj2)&&jQuery.ArrayUtils.isArray(obj1)&&obj1.length===obj2.length;
},isNotSameSize:function(obj1,obj2){return !jQuery.ArrayUtils.isSameSize(obj1,obj2);},isSmallerSize:function(obj1,obj2){return jQuery.ObjectUtils.isSameType(obj1,obj2)&&jQuery.ArrayUtils.isArray(obj1)&&obj1.length<obj2.length;
},isLargerSize:function(obj1,obj2){return jQuery.ObjectUtils.isSameType(obj1,obj2)&&jQuery.ArrayUtils.isArray(obj1)&&obj1.length>obj2.length;
},getFirst:function(array){if(jQuery.ArrayUtils.isNotArray(array)){return null;}var lastIndex=array.length-1;return(lastIndex<0)?null:array[0];
},getLast:function(array){if(jQuery.ArrayUtils.isNotArray(array)){return null;}var lastIndex=array.length-1;return(lastIndex<0)?null:array[lastIndex];
},unwrap:function(value,opts){var tmp=jQuery.ObjectUtils.unwrap(value,opts);return(jQuery.ArrayUtils.isArray(tmp))?tmp:jQuery.UNDEFINED;
},unwrapUnvaluedSafe:function(value,opts){return jQuery.ArrayUtils.toUnvaluedSafe(jQuery.ArrayUtils.unwrap(value,opts));}},RegexUtils:{isRegex:function(obj){return jQuery.ObjectUtils.type(obj)==="regexp";
},isNotRegex:function(obj){return !jQuery.RegexUtils.isRegex(obj);}},WidgetUtils:{getClass:function(obj){var class1=jQuery.ObjectUtils.getUnvaluedSafePathValue("class",obj);
var class2=jQuery.ObjectUtils.getUnvaluedSafePathValue("classExt",obj);return(class1+" "+class2).trim();},createTruncatedSpan:function(text,max,cssClass){var span=jQuery("<span>",{title:text});
var trunc=text;if(text.length>max){trunc=text.substring(0,max-3)+"...";span=jQuery("<span>",{title:text});}else{span=jQuery("<span>");
}jQuery(span).append(trunc);if(jQuery.StringUtils.isNotBlank(cssClass)){jQuery(span).attr("class",cssClass);}return span;
},createElement:function(attributes,locale,regional){var defaultAttrs={tagName:"<div>",disabled:false,readonly:false,checked:false,hidden:false};
var _normalizeTagName=function(str){var clean=str;if(jQuery.StringUtils.isNotBlank(clean)){clean=clean.replace(/[^\w\d]/g,"");
}return"<"+clean+">";};var attrs=jQuery.extend({},defaultAttrs,attributes);attrs.tagName=_normalizeTagName(attrs.tagName);
switch(attrs.tagName){case"<radio>":attrs.tagName="<input>";attrs.type="radio";break;case"<text>":attrs.tagName="<input>";
attrs.type="text";break;case"<file>":attrs.tagName="<input>";attrs.type="file";break;case"<password>":attrs.tagName="<input>";
attrs.type="password";break;case"<checkbox>":attrs.tagName="<input>";attrs.type="checkbox";break;case"<submit>":attrs.tagName="<input>";
if(jQuery.StringUtils.isBlankOrUnvalued(attrs.type)){attrs.type="submit";}break;case"<button>":attrs.tagName="<button>";if(jQuery.StringUtils.isBlankOrUnvalued(attrs.type)){attrs.type="button";
}break;}var $elem=jQuery(attrs.tagName);var propagateAttributes=["id","type","for","name","value","style","title","colspan","tabindex","placeholder"];
var attrNames=jQuery.ObjectUtils.getKeys(attrs);for(var i=0;i<attrNames.length;i++){var attrName=attrNames[i];if(jQuery.LocaleUtils.isLocalized(attrs[attrName])){attrs[attrName]=jQuery.LocaleUtils.resolve(attrs[attrName],locale,regional);
}var attrValue=attrs[attrName];if(jQuery.StringUtils.isNotBlank(attrValue)&&(jQuery.ArrayUtils.contains(propagateAttributes,attrName)||jQuery.StringUtils.startsWith(attrName,"data-"))){jQuery($elem).attr(attrName,attrValue);
}}if(!$elem.isVoidElement()){if(jQuery.ObjectUtils.isValued(attrs.icon)){jQuery($elem).append(jQuery("<i>",{"class":attrs.icon})).append(" ");
}if(jQuery.ObjectUtils.isValued(attrs.label)){jQuery($elem).append(attrs.label);}}jQuery($elem).attr("class",jQuery.WidgetUtils.getClass(attrs));
if(jQuery.BooleanUtils.unwrapUnvaluedSafe(attrs.disabled)){jQuery($elem).disable();}if(jQuery.BooleanUtils.unwrapUnvaluedSafe(attrs.readonly)){jQuery($elem).readonly();
}if(jQuery.BooleanUtils.unwrapUnvaluedSafe(attrs.checked)){jQuery($elem).check();}if(jQuery.BooleanUtils.unwrapUnvaluedSafe(attrs.hidden)){jQuery($elem).hide();
}if(jQuery.FunctionUtils.isFunction(attrs.click)){jQuery($elem).click(function(event){attrs.click(event);});}if(jQuery.FunctionUtils.isFunction(attrs.change)){jQuery($elem).change(function(event){attrs.change(event);
});}if(jQuery.FunctionUtils.isFunction(attrs.focus)){jQuery($elem).focus(function(event){attrs.focus(event);});}if(jQuery.FunctionUtils.isFunction(attrs.blur)){jQuery($elem).blur(function(event){attrs.blur(event);
});}return $elem;},_createMultipleSupport:function(attributes,locale,regional,functionName){var itens=[];for(var i=0;i<attributes.length;
i++){itens.push(jQuery.WidgetUtils[functionName](attributes[i],locale,regional));}return itens;},_createElementSupport:function(attributes,locale,regional,functionName,defAttrs,postCreation){var ret;
if(jQuery.ArrayUtils.isArray(attributes)){ret=jQuery.WidgetUtils._createMultipleSupport(attributes,locale,regional,functionName);
}else{var attrs;if(jQuery.ObjectUtils.isBaseType(attributes)){attrs=jQuery.extend({},{label:attributes,value:attributes},defAttrs);
}else{attrs=jQuery.extend({},attributes,defAttrs);}ret=jQuery.WidgetUtils.createElement(attrs,locale,regional);if(jQuery.FunctionUtils.isFunction(postCreation)){postCreation(ret,attrs,locale,regional);
}}return ret;},createButton:function(attributes,locale,regional){return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createButton",{tagName:"<button>"});
},createTextInput:function(attributes,locale,regional){return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createTextInput",{tagName:"<text>"});
},createPasswordInput:function(attributes,locale,regional){return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createPasswordInput",{tagName:"<password>"});
},createFileInput:function(attributes,locale,regional){return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createFileInput",{tagName:"<file>"});
},createRadio:function(attributes,locale,regional){return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createRadio",{tagName:"<radio>"});
},createCheckbox:function(attributes,locale,regional){return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createCheckbox",{tagName:"<checkbox>"});
},createSelect:function(attributes,locale,regional){var postCreation=function(element,attrs,locale,regionalArray){if(jQuery.ObjectUtils.isValued(attrs.options)){element.append(jQuery("<options>").append(jQuery.WidgetUtils.createOption(attrs.options,locale,regionalArray)));
}};return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createSelect",{tagName:"<select>"},postCreation);
},createOption:function(attributes,locale,regional){return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createOption",{tagName:"<option>"});
},createDiv:function(attributes,locale,regional){return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createDiv",{tagName:"<div>"});
},createSpan:function(attributes,locale,regional){return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createSpan",{tagName:"<span>"});
},createUl:function(attributes,locale,regional){var postCreation=function(element,attrs,locale,regionalArray){if(jQuery.ObjectUtils.isValued(attrs.li)){element.append(jQuery.WidgetUtils.createLi(attrs.li,locale,regionalArray));
}};return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createUl",{tagName:"<ul>"},postCreation);},createLi:function(attributes,locale,regional){return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createLi",{tagName:"<li>"});
},createTable:function(attributes,locale,regional){var postCreation=function(element,attrs,locale,regionalArray){if(jQuery.ObjectUtils.isValued(attrs.thead)){element.append(jQuery.WidgetUtils.createThead(attrs.thead,locale,regionalArray));
}if(jQuery.ObjectUtils.isValued(attrs.tbody)){element.append(jQuery.WidgetUtils.createTbody(attrs.tbody,locale,regionalArray));
}};return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createTable",{tagName:"<table>"},postCreation);
},createThead:function(attributes,locale,regional){var postCreation=function(element,attrs,locale,regionalArray){if(jQuery.ObjectUtils.isValued(attrs.tr)){element.append(jQuery.WidgetUtils.createTr(attrs.tr,locale,regionalArray));
}};return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createThead",{tagName:"<thead>"},postCreation);
},createTbody:function(attributes,locale,regional){var postCreation=function(element,attrs,locale,regionalArray){if(jQuery.ObjectUtils.isValued(attrs.tr)){element.append(jQuery.WidgetUtils.createTr(attrs.tr,locale,regionalArray));
}};return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createTbody",{tagName:"<tbody>"},postCreation);
},createTr:function(attributes,locale,regional){var postCreation=function(element,attrs,locale,regionalArray){if(jQuery.ObjectUtils.isValued(attrs.td)){element.append(jQuery.WidgetUtils.createTd(attrs.td,locale,regionalArray));
}else{if(jQuery.ObjectUtils.isValued(attrs.th)){element.append(jQuery.WidgetUtils.createTh(attrs.th,locale,regionalArray));
}}};return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createTr",{tagName:"<tr>"},postCreation);
},createTh:function(attributes,locale,regional){return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createTh",{tagName:"<th>"});
},createTd:function(attributes,locale,regional){return jQuery.WidgetUtils._createElementSupport(attributes,locale,regional,"createTd",{tagName:"<td>"});
},isCreateCompatible:function(attributes){if(jQuery.ArrayUtils.isArray(attributes)){var ret=true;for(var i=0;i<attributes.length;
i++){ret&&jQuery.ObjectUtils.hasProperty(attributes[i],"tagName");if(!ret){return false;}}return ret;}return jQuery.ObjectUtils.hasProperty(attributes,"tagName");
},createActiveBar:function(label){var box=jQuery("<div>",{"class":"box no-margin align-center small-rounded huge-padding-v width-100"});
var progress=jQuery("<div>",{"class":"progress active striped small margin-top"}).append(jQuery("<div>",{"class":"bar primary width-100"}));
if(jQuery.ObjectUtils.isValued(label)){jQuery(box).append(jQuery("<span>",{"class":"dimmed bold"}).append(label));}jQuery(box).append(progress);
return box;},createBouncingText:function(text,cssOptions){var fullTime=0.8;var incr=0.01;for(var i=1;i<text.length;i++){if(i%5===0){incr=incr+0.002;
}fullTime=fullTime+incr;}var pass=fullTime/(text.length+1);var charCSS={"animation-name":"bounce_fountainText","animation-duration":fullTime+"s","animation-iteration-count":"infinite","animation-direction":"linear",transform:"scale(.5)"};
var containerCSS={"font-size":"1.5em","user-select":"none",cursor:"default"};var container=jQuery("<span>").css(jQuery.extend({},containerCSS,cssOptions));
for(var i=0;i<text.length;i++){var delay=(i*pass)+pass;var letter=text[i]===" "?"&nbsp;":text[i];var letterDiv=jQuery("<span>").append(letter);
letterDiv.css(jQuery.extend({},charCSS,{"animation-delay":delay+"s"}));jQuery(container).append(letterDiv);}return container;
},blockUI:function(options){var opts={fadeIn:150,fadeOut:200,overlayCSS:{opacity:0.4}};var target;if(jQuery.StringUtils.isString(options)){opts.message=jQuery.WidgetUtils.createActiveBar(options);
}else{if(jQuery.JqueryUtils.isJquery(options)){opts.message=options;}else{if(jQuery.ObjectUtils.isPlain(options)){if(jQuery.StringUtils.isString(options.content)){opts.message=jQuery.WidgetUtils.createActiveBar(options.content);
}else{opts.message=jQuery.JqueryUtils.unwrapUnvaluedSafe(options.content);}if(jQuery.ObjectUtils.isValued(options.target)){target=jQuery.JqueryUtils.unwrapUnvaluedSafe(options.target);
}opts.css={"border-radius":"0.25rem",border:".25rem solid #BBB"};if(jQuery.ObjectUtils.isValued(options.css)){opts.css=jQuery.extend({},opts.css,options.css);
}}else{opts.message=jQuery.WidgetUtils.createActiveBar();}}}if(jQuery.ObjectUtils.isValued(target)){jQuery(target).block(opts);
}else{jQuery.blockUI(opts);}},unblockUI:function(target){if(jQuery.ObjectUtils.isValued(target)){jQuery(target).unblock();
}else{jQuery.unblockUI();}}},FunctionUtils:{isFunction:function(value){return jQuery.ObjectUtils.isValued(value)&&jQuery.isFunction(value);
},isNotFunction:function(value){return !jQuery.FunctionUtils.isFunction(value);},unwrap:function(value,opts){return jQuery.ObjectUtils.unwrap(value,opts);
}},LocaleUtils:{DEFAULT_LOCALE:"br",I18N_START:"@[",I18N_END:"]",toUnvaluedSafe:function(locale){return jQuery.StringUtils.isNotBlank(locale)?locale:jQuery.LocaleUtils.DEFAULT_LOCALE;
},isLocalized:function(sequence){if(jQuery.StringUtils.isNotString(sequence)||jQuery.StringUtils.isBlankOrUnvalued(sequence)){return false;
}var start=sequence.indexOf(jQuery.LocaleUtils.I18N_START,0);if(start>=0){var end=sequence.indexOf(jQuery.LocaleUtils.I18N_END,start);
return(end>start);}return false;},resolveKey:function(key,locale,regional){var str="";if(jQuery.StringUtils.isNotBlank(key)&&jQuery.ObjectUtils.isNotEmptyPlain(regional)){var l=jQuery.LocaleUtils.toUnvaluedSafe(locale);
try{str=regional[l][key];}catch(error){try{str=regional[""][key];}catch(error){}}}return jQuery.StringUtils.isNotBlank(str)?str:key;
},resolve:function(sequence,locale,regional){var replaced=sequence;if(jQuery.StringUtils.isNotBlank(sequence)){var start=sequence.indexOf(jQuery.LocaleUtils.I18N_START,0);
while(start>=0){start=start+jQuery.LocaleUtils.I18N_START.length;var end=sequence.indexOf(jQuery.LocaleUtils.I18N_END,start);
if(end>start){var key=sequence.substring(start,end);var expr=jQuery.LocaleUtils.I18N_START+key+jQuery.LocaleUtils.I18N_END;
var trimmedKey=key.trim();var value=jQuery.LocaleUtils.resolveKey(trimmedKey,locale,regional);replaced=replaced.replace(expr,value);
start=sequence.indexOf(jQuery.LocaleUtils.I18N_START,end);}else{break;}}}return replaced;}},ConsoleUtils:{time:function(name,enabled){var en=jQuery.BooleanUtils.isBoolean(enabled)?enabled:true;
if(en&&window.console&&jQuery.ObjectUtils.isDefined(window.console.time)){console.time(name);}},timeEnd:function(name,enabled){var en=jQuery.BooleanUtils.isBoolean(enabled)?enabled:true;
if(en&&window.console&&jQuery.ObjectUtils.isDefined(window.console.timeEnd)){console.timeEnd(name);}}},JqueryUtils:{isJquery:function(obj){return jQuery.ObjectUtils.isValued(obj)&&(obj instanceof jQuery);
},isNotJquery:function(obj){return !jQuery.JqueryUtils.isJquery(obj);},isEmpty:function(obj){return jQuery.JqueryUtils.isJquery(obj)&&obj.length===0;
},isEmptyOrNull:function(obj){return jQuery.ObjectUtils.isNull(obj)||jQuery.JqueryUtils.isEmpty(obj);},isEmptyOrUnvalued:function(obj){return jQuery.ObjectUtils.isUnvalued(obj)||jQuery.JqueryUtils.isEmpty(obj);
},isNotEmpty:function(obj){return jQuery.JqueryUtils.isJquery(obj)&&obj.length>0;},size:function(obj){return jQuery.JqueryUtils.isNotEmpty(obj)?obj.length:0;
},isSingleton:function(obj){return jQuery.JqueryUtils.isNotEmpty(obj)&&obj.length===1;},isNotSingleton:function(obj){return !jQuery.JqueryUtils.isSingleton(obj);
},isEmptyOrSingleton:function(obj){return jQuery.JqueryUtils.isEmpty(obj)||jQuery.JqueryUtils.isSingleton(obj);},toUnvaluedSafe:function(obj){if(jQuery.ObjectUtils.isUnvalued(obj)||jQuery.JqueryUtils.isNotJquery(obj)){return jQuery();
}else{return obj;}},unwrap:function(value,opts){var options=jQuery.ObjectUtils._getUnwrapOpts(opts);var tmp=jQuery.ObjectUtils.unwrap(value,options);
if(jQuery.StringUtils.isNotBlank(tmp)||jQuery.DOMUtils.isDOM(tmp)||jQuery.DOMUtils.isDOMArray(tmp)){return jQuery(tmp);}else{if(jQuery.ArrayUtils.isArray(tmp)){var $els=jquery();
for(var i=0;i<tmp.length;i++){var curr=tmp[i];if(jQuery.WidgetUtils.isCreateCompatible(curr)){$els=$els.add(jQuery.WidgetUtils.createElement(curr,options.locale,options.regional));
}else{if(jQuery.JqueryUtils.isJquery(curr)){$els=$els.add(curr);}}}return $els;}else{if(jQuery.WidgetUtils.isCreateCompatible(tmp)){return jQuery.WidgetUtils.createElement(tmp,options.locale,options.regional);
}else{return(jQuery.JqueryUtils.isJquery(tmp))?tmp:jQuery.UNDEFINED;}}}},unwrapUnvaluedSafe:function(value,opts){return jQuery.JqueryUtils.toUnvaluedSafe(jQuery.JqueryUtils.unwrap(value,opts));
}},DOMUtils:{isDOM:function(obj){if(jQuery.ObjectUtils.isUnvalued(obj)){return false;}return(jQuery.DOMUtils._isNode(obj)||jQuery.DOMUtils._isElement(obj));
},isDOMArray:function(obj){if(jQuery.ObjectUtils.isUnvalued(obj)||jQuery.ArrayUtils.isNotArray(obj)){return false;}var ret=true;
for(var i=0;i<obj.length;i++){ret=ret&&jQuery.DOMUtils.isDOM(obj[i]);if(!ret){break;}}return ret;},isNotDOM:function(obj){return !jQuery.DOMUtils.isDOM(obj);
},_isNode:function(obj){return(typeof Node==="object"?obj instanceof Node:obj&&typeof obj==="object"&&typeof obj.nodeType==="number"&&typeof obj.nodeName==="string");
},_isElement:function(obj){return(typeof HTMLElement==="object"?obj instanceof HTMLElement:obj&&typeof obj==="object"&&obj!==null&&obj.nodeType===1&&typeof obj.nodeName==="string");
},unwrap:function(value,opts){var tmp=jQuery.ObjectUtils.unwrap(value,opts);return(jQuery.DOMUtils.isDOM(tmp))?tmp:jQuery.UNDEFINED;
}},ValidationUtils:{isEmail:function(text){var re=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;return jQuery.StringUtils.isString(text)&&re.test(text);
}}});jQuery.fn.extend({tagName:function(){return jQuery(this).prop("tagName").toLowerCase();},hasAttr:function(attrName){var attr=jQuery(this).attr(attrName);
return jQuery.ObjectUtils.isDefined(attr);},hasValue:function(){var val=jQuery(this).val();return jQuery.StringUtils.isNotBlank(val);
},hasText:function(){var txt=jQuery(this).text();return jQuery.StringUtils.isNotBlank(txt);},hasValueOrText:function(){return(jQuery(this).isField())?jQuery(this).hasValue():jQuery(this).hasText();
},numberVal:function(value){if(arguments.length){jQuery(this).val(value);}var v=jQuery(this).val();return jQuery.NumberUtils.toNumber(v);
},booleanVal:function(value){if(arguments.length){jQuery(this).val(value);}var v=jQuery(this).val();return jQuery.BooleanUtils.toBoolean(v);
},numberValOrText:function(value){if(arguments.length){(jQuery(this).isField())?jQuery(this).val(value):jQuery(this).text(value);
}var v=(jQuery(this).isField())?jQuery(this).val():jQuery(this).text();return jQuery.NumberUtils.toNumber(v);},booleanValOrText:function(value){if(arguments.length){(jQuery(this).isField())?jQuery(this).val(value):jQuery(this).text(value);
}var v=(jQuery(this).isField())?jQuery(this).val():jQuery(this).text();return jQuery.BooleanUtils.toBoolean(v);},disable:function(){var $this=jQuery(this);
$this.filter("button, input, optgroup, option, select, textarea").filter(":not([disabled])").prop("disabled",true);return $this;
},enable:function(){var $this=jQuery(this);$this.filter("button, input, optgroup, option, select, textarea").filter("[disabled]").prop("disabled",false);
return $this;},isDisabled:function(){var $this=jQuery(this);var $tmp=$this.filter("button, input, optgroup, option, select, textarea").filter("[disabled]");
return $this.length>0&&$this.length===$tmp.length;},isEnabled:function(){var $this=jQuery(this);var $tmp=$this.filter("button, input, optgroup, option, select, textarea").filter(":not([disabled])");
return $this.length>0&&$this.length===$tmp.length;},check:function(){var $this=jQuery(this);$this.filter("input:radio, input:checkbox").filter(":not(:checked)").prop("checked",true).trigger("change");
return $this;},uncheck:function(){var $this=jQuery(this);$this.filter("input:radio, input:checkbox").filter(":checked").prop("checked",false).trigger("change");
return $this;},isChecked:function(){var $this=jQuery(this);var $tmp=$this.filter("input:radio, input:checkbox").filter(":checked");
return $this.length>0&&$this.length===$tmp.length;},isUnchecked:function(){var $this=jQuery(this);var $tmp=$this.filter("input:radio, input:checkbox").filter(":not(:checked)");
return $this.length>0&&$this.length===$tmp.length;},readonly:function(){var $this=jQuery(this);$this.filter(":input:not([readonly])").prop("readonly",true);
return $this;},editable:function(){var $this=jQuery(this);$this.filter(":input[readonly]").prop("readonly",false);return $this;
},isReadonly:function(){var $this=jQuery(this);var $tmp=$this.filter(":input[readonly]");return $this.length>0&&$this.length===$tmp.length;
},isEditable:function(){var $this=jQuery(this);var $tmp=$this.filter(":input:not([readonly])");return $this.length>0&&$this.length===$tmp.length;
},select:function(){var $this=jQuery(this);var $tmp=$this.filter("option:not(:selected)");$tmp.prop("selected",true).closest("select").trigger("change");
return $this;},unselect:function(){var $this=jQuery(this);var $tmp=$this.filter("option:selected");$tmp.prop("selected",false).closest("select").trigger("change");
return $this;},isSelected:function(){var $this=jQuery(this);var $tmp=$this.filter("option:selected");return $this.length>0&&$this.length===$tmp.length;
},isUnselected:function(){var $this=jQuery(this);var $tmp=$this.filter("option:not(:selected)");return $this.length>0&&$this.length===$tmp.length;
},isField:function(){var $this=jQuery(this);var $tmp=$this.filter("input, select, textarea");return $this.length>0&&$this.length===$tmp.length;
},isRadio:function(){var $this=jQuery(this);var $tmp=$this.filter("input:radio");return $this.length>0&&$this.length===$tmp.length;
},isCheckbox:function(){var $this=jQuery(this);var $tmp=$this.filter("input:checkbox");return $this.length>0&&$this.length===$tmp.length;
},isSelect:function(){var $this=jQuery(this);var $tmp=$this.filter("select");return $this.length>0&&$this.length===$tmp.length;
},isPre:function(){var $this=jQuery(this);var $tmp=$this.filter("pre");return $this.length>0&&$this.length===$tmp.length;
},isDiv:function(){var $this=jQuery(this);var $tmp=$this.filter("div");return $this.length>0&&$this.length===$tmp.length;
},isSpan:function(){var $this=jQuery(this);var $tmp=$this.filter("span");return $this.length>0&&$this.length===$tmp.length;
},isButton:function(){var $this=jQuery(this);var $tmp=$this.filter("button");return $this.length>0&&$this.length===$tmp.length;
},isSubmit:function(){var $this=jQuery(this);var $tmp=$this.filter('button[type="submit"], input[type="submit"]');return $this.length>0&&$this.length===$tmp.length;
},isTable:function(){var $this=jQuery(this);var $tmp=$this.filter("table");return $this.length>0&&$this.length===$tmp.length;
},isTableBody:function(){var $this=jQuery(this);var $tmp=$this.filter("tbody");return $this.length>0&&$this.length===$tmp.length;
},isDataRole:function(value){var $this=jQuery(this);var $tmp=$this.filter('[data-role="'+value+'"]');return $this.length>0&&$this.length===$tmp.length;
},isInput:function(){var $this=jQuery(this);var $tmp=$this.filter("input");return $this.length>0&&$this.length===$tmp.length;
},isForm:function(){var $this=jQuery(this);var $tmp=$this.filter("form");return $this.length>0&&$this.length===$tmp.length;
},isVoidElement:function(){var $this=jQuery(this);var $tmp=$this.filter("area, base, br, col, command, embed, hr, img, input, keygen, link, meta, param, source, track, wbr");
return $this.length>0&&$this.length===$tmp.length;},isLayoutContainer:function(){var $this=jQuery(this);var $tmp=$this.filter("body, address, article, div, fieldset, footer, header, section");
return $this.length>0&&$this.length===$tmp.length;},isDetached:function(){var all=jQuery.JqueryUtils.isNotEmpty(this);this.each(function(){var tmp=jQuery.contains(document,jQuery(this)[0]);
all=all&&!tmp;if(!all){return false;}});return all;},sourceHtml:function(){var all="";var first=true;this.each(function(){if(!first){all=all+"\n";
}var elementSource=jQuery(this)[0].outerHTML;all=all+elementSource;});return all;},closestChild:function(filter){var found=jQuery();
var currentSet=this.children();while(jQuery.JqueryUtils.isNotEmpty(currentSet)){found=currentSet.filter(filter);if(jQuery.JqueryUtils.isNotEmpty(found)){break;
}currentSet=currentSet.children();}return found.first();},onEnter:function(func){var $this=jQuery(this);if(jQuery.FunctionUtils.isFunction(func)){$this.keyup(function(event){var args=[event];
if(event.keyCode===13){func.apply(window,args);}});}else{if(jQuery.ArrayUtils.isEmpty(arguments)){$this.keyup();}}return this;
},getTheme:function(){var $this=jQuery(this);var themes=new Array("control","primary","info","success","warning","danger","error","inverse");
var classes=$this.attr("class");for(var i=0;i<themes.length;i++){if(classes.indexOf(themes[i])>=0){return themes[i];}}return"";
}});
/*!
 * jQuery blockUI plugin - http://malsup.com/jquery/block/
 * Copyright (c) 2007-2013 M. Alsup
 * Version 2.65.0-2013.09.02
 * Requires jQuery v1.7 or later
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * --
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function(){function setup($){$.fn._fadeIn=$.fn.fadeIn;
var noOp=$.noop||function(){};var msie=/MSIE/.test(navigator.userAgent);var ie6=/MSIE 6.0/.test(navigator.userAgent)&&!/MSIE 8.0/.test(navigator.userAgent);
var mode=document.documentMode||0;var setExpr=$.isFunction(document.createElement("div").style.setExpression);$.blockUI=function(opts){install(window,opts);
};$.unblockUI=function(opts){remove(window,opts);};$.growlUI=function(title,message,timeout,onClose){var $m=$('<div class="growlUI"></div>');
if(title){$m.append("<h1>"+title+"</h1>");}if(message){$m.append("<h2>"+message+"</h2>");}if(timeout===undefined){timeout=3000;
}var callBlock=function(opts){opts=opts||{};$.blockUI({message:$m,fadeIn:typeof opts.fadeIn!=="undefined"?opts.fadeIn:700,fadeOut:typeof opts.fadeOut!=="undefined"?opts.fadeOut:1000,timeout:typeof opts.timeout!=="undefined"?opts.timeout:timeout,centerY:false,showOverlay:false,onUnblock:onClose,css:$.blockUI.defaults.growlCSS});
};callBlock();var nonmousedOpacity=$m.css("opacity");$m.mouseover(function(){callBlock({fadeIn:0,timeout:30000});var displayBlock=$(".blockMsg");
displayBlock.stop();displayBlock.fadeTo(300,1);}).mouseout(function(){$(".blockMsg").fadeOut(1000);});};$.fn.block=function(opts){if(this[0]===window){$.blockUI(opts);
return this;}var fullOpts=$.extend({},$.blockUI.defaults,opts||{});this.each(function(){var $el=$(this);if(fullOpts.ignoreIfBlocked&&$el.data("blockUI.isBlocked")){return;
}$el.unblock({fadeOut:0});});return this.each(function(){if($.css(this,"position")=="static"){this.style.position="relative";
$(this).data("blockUI.static",true);}this.style.zoom=1;install(this,opts);});};$.fn.unblock=function(opts){if(this[0]===window){$.unblockUI(opts);
return this;}return this.each(function(){remove(this,opts);});};$.blockUI.version=2.65;$.blockUI.defaults={message:"<h1>Please wait...</h1>",title:null,draggable:true,theme:false,css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},themedCSS:{width:"30%",top:"40%",left:"35%"},overlayCSS:{backgroundColor:"#000",opacity:0.6,cursor:"wait"},cursorReset:"default",growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:0.6,cursor:"default",color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px","border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:false,baseZ:10000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,focusableElements:":input:enabled:visible",onBlock:null,onUnblock:null,onOverlayClick:null,quirksmodeOffsetHack:4,blockMsgClass:"blockMsg",ignoreIfBlocked:false};
var pageBlock=null;var pageBlockEls=[];function install(el,opts){var css,themedCSS;var full=(el==window);var msg=(opts&&opts.message!==undefined?opts.message:undefined);
opts=$.extend({},$.blockUI.defaults,opts||{});if(opts.ignoreIfBlocked&&$(el).data("blockUI.isBlocked")){return;}opts.overlayCSS=$.extend({},$.blockUI.defaults.overlayCSS,opts.overlayCSS||{});
css=$.extend({},$.blockUI.defaults.css,opts.css||{});if(opts.onOverlayClick){opts.overlayCSS.cursor="pointer";}themedCSS=$.extend({},$.blockUI.defaults.themedCSS,opts.themedCSS||{});
msg=msg===undefined?opts.message:msg;if(full&&pageBlock){remove(window,{fadeOut:0});}if(msg&&typeof msg!="string"&&(msg.parentNode||msg.jquery)){var node=msg.jquery?msg[0]:msg;
var data={};$(el).data("blockUI.history",data);data.el=node;data.parent=node.parentNode;data.display=node.style.display;data.position=node.style.position;
if(data.parent){data.parent.removeChild(node);}}$(el).data("blockUI.onUnblock",opts.onUnblock);var z=opts.baseZ;var lyr1,lyr2,lyr3,s;
if(msie||opts.forceIframe){lyr1=$('<iframe class="blockUI" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>');
}else{lyr1=$('<div class="blockUI" style="display:none"></div>');}if(opts.theme){lyr2=$('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+(z++)+';display:none"></div>');
}else{lyr2=$('<div class="blockUI blockOverlay" style="z-index:'+(z++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
}if(opts.theme&&full){s='<div class="blockUI '+opts.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:fixed">';
if(opts.title){s+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||"&nbsp;")+"</div>";
}s+='<div class="ui-widget-content ui-dialog-content"></div>';s+="</div>";}else{if(opts.theme){s='<div class="blockUI '+opts.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(z+10)+';display:none;position:absolute">';
if(opts.title){s+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title||"&nbsp;")+"</div>";
}s+='<div class="ui-widget-content ui-dialog-content"></div>';s+="</div>";}else{if(full){s='<div class="blockUI '+opts.blockMsgClass+' blockPage" style="z-index:'+(z+10)+';display:none;position:fixed"></div>';
}else{s='<div class="blockUI '+opts.blockMsgClass+' blockElement" style="z-index:'+(z+10)+';display:none;position:absolute"></div>';
}}}lyr3=$(s);if(msg){if(opts.theme){lyr3.css(themedCSS);lyr3.addClass("ui-widget-content");}else{lyr3.css(css);}}if(!opts.theme){lyr2.css(opts.overlayCSS);
}lyr2.css("position",full?"fixed":"absolute");if(msie||opts.forceIframe){lyr1.css("opacity",0);}var layers=[lyr1,lyr2,lyr3],$par=full?$("body"):$(el);
$.each(layers,function(){this.appendTo($par);});if(opts.theme&&opts.draggable&&$.fn.draggable){lyr3.draggable({handle:".ui-dialog-titlebar",cancel:"li"});
}var expr=setExpr&&(!$.support.boxModel||$("object,embed",full?null:el).length>0);if(ie6||expr){if(full&&opts.allowBodyStretch&&$.support.boxModel){$("html,body").css("height","100%");
}if((ie6||!$.support.boxModel)&&!full){var t=sz(el,"borderTopWidth"),l=sz(el,"borderLeftWidth");var fixT=t?"(0 - "+t+")":0;
var fixL=l?"(0 - "+l+")":0;}$.each(layers,function(i,o){var s=o[0].style;s.position="absolute";if(i<2){if(full){s.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:"+opts.quirksmodeOffsetHack+') + "px"');
}else{s.setExpression("height",'this.parentNode.offsetHeight + "px"');}if(full){s.setExpression("width",'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"');
}else{s.setExpression("width",'this.parentNode.offsetWidth + "px"');}if(fixL){s.setExpression("left",fixL);}if(fixT){s.setExpression("top",fixT);
}}else{if(opts.centerY){if(full){s.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
}s.marginTop=0;}else{if(!opts.centerY&&full){var top=(opts.css&&opts.css.top)?parseInt(opts.css.top,10):0;var expression="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+top+') + "px"';
s.setExpression("top",expression);}}}});}if(msg){if(opts.theme){lyr3.find(".ui-widget-content").append(msg);}else{lyr3.append(msg);
}if(msg.jquery||msg.nodeType){$(msg).show();}}if((msie||opts.forceIframe)&&opts.showOverlay){lyr1.show();}if(opts.fadeIn){var cb=opts.onBlock?opts.onBlock:noOp;
var cb1=(opts.showOverlay&&!msg)?cb:noOp;var cb2=msg?cb:noOp;if(opts.showOverlay){lyr2._fadeIn(opts.fadeIn,cb1);}if(msg){lyr3._fadeIn(opts.fadeIn,cb2);
}}else{if(opts.showOverlay){lyr2.show();}if(msg){lyr3.show();}if(opts.onBlock){opts.onBlock();}}bind(1,el,opts);if(full){pageBlock=lyr3[0];
pageBlockEls=$(opts.focusableElements,pageBlock);if(opts.focusInput){setTimeout(focus,20);}}else{center(lyr3[0],opts.centerX,opts.centerY);
}if(opts.timeout){var to=setTimeout(function(){if(full){$.unblockUI(opts);}else{$(el).unblock(opts);}},opts.timeout);$(el).data("blockUI.timeout",to);
}}function remove(el,opts){var count;var full=(el==window);var $el=$(el);var data=$el.data("blockUI.history");var to=$el.data("blockUI.timeout");
if(to){clearTimeout(to);$el.removeData("blockUI.timeout");}opts=$.extend({},$.blockUI.defaults,opts||{});bind(0,el,opts);
if(opts.onUnblock===null){opts.onUnblock=$el.data("blockUI.onUnblock");$el.removeData("blockUI.onUnblock");}var els;if(full){els=$("body").children().filter(".blockUI").add("body > .blockUI");
}else{els=$el.find(">.blockUI");}if(opts.cursorReset){if(els.length>1){els[1].style.cursor=opts.cursorReset;}if(els.length>2){els[2].style.cursor=opts.cursorReset;
}}if(full){pageBlock=pageBlockEls=null;}if(opts.fadeOut){count=els.length;els.stop().fadeOut(opts.fadeOut,function(){if(--count===0){reset(els,data,opts,el);
}});}else{reset(els,data,opts,el);}}function reset(els,data,opts,el){var $el=$(el);if($el.data("blockUI.isBlocked")){return;
}els.each(function(i,o){if(this.parentNode){this.parentNode.removeChild(this);}});if(data&&data.el){data.el.style.display=data.display;
data.el.style.position=data.position;if(data.parent){data.parent.appendChild(data.el);}$el.removeData("blockUI.history");
}if($el.data("blockUI.static")){$el.css("position","static");}if(typeof opts.onUnblock=="function"){opts.onUnblock(el,opts);
}var body=$(document.body),w=body.width(),cssW=body[0].style.width;body.width(w-1).width(w);body[0].style.width=cssW;}function bind(b,el,opts){var full=el==window,$el=$(el);
if(!b&&(full&&!pageBlock||!full&&!$el.data("blockUI.isBlocked"))){return;}$el.data("blockUI.isBlocked",b);if(!full||!opts.bindEvents||(b&&!opts.showOverlay)){return;
}var events="mousedown mouseup keydown keypress keyup touchstart touchend touchmove";if(b){$(document).bind(events,opts,handler);
}else{$(document).unbind(events,handler);}}function handler(e){if(e.type==="keydown"&&e.keyCode&&e.keyCode==9){if(pageBlock&&e.data.constrainTabKey){var els=pageBlockEls;
var fwd=!e.shiftKey&&e.target===els[els.length-1];var back=e.shiftKey&&e.target===els[0];if(fwd||back){setTimeout(function(){focus(back);
},10);return false;}}}var opts=e.data;var target=$(e.target);if(target.hasClass("blockOverlay")&&opts.onOverlayClick){opts.onOverlayClick();
}if(target.parents("div."+opts.blockMsgClass).length>0){return true;}return target.parents().children().filter("div.blockUI").length===0;
}function focus(back){if(!pageBlockEls){return;}var e=pageBlockEls[back===true?pageBlockEls.length-1:0];if(e){e.focus();}}function center(el,x,y){var p=el.parentNode,s=el.style;
var l=((p.offsetWidth-el.offsetWidth)/2)-sz(p,"borderLeftWidth");var t=((p.offsetHeight-el.offsetHeight)/2)-sz(p,"borderTopWidth");
if(x){s.left=l>0?(l+"px"):"0";}if(y){s.top=t>0?(t+"px"):"0";}}function sz(el,p){return parseInt($.css(el,p),10)||0;}}if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],setup);
}else{setup(jQuery);}})();
/*!
 * bootstrap-transition.js v2.3.2
 * Copyright 2013 Twitter, Inc.
 * http://getbootstrap.com/2.3.2/javascript.html#transitions
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function($){$(function(){$.support.transition=(function(){var transitionEnd=(function(){var el=document.createElement("bootstrap"),transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},name;
for(name in transEndEventNames){if(el.style[name]!==undefined){return transEndEventNames[name];}}}());return transitionEnd&&{end:transitionEnd};
})();});}(window.jQuery);!function($){var Collapse=function(element,options){this.$element=$(element);this.options=$.extend({},$.fn.collapse.defaults,options);
if(this.options.parent){this.$parent=$(this.options.parent);}this.options.toggle&&this.toggle();};Collapse.prototype={constructor:Collapse,dimension:function(){var hasWidth=this.$element.hasClass("width");
return hasWidth?"width":"height";},show:function(){var dimension,scroll,actives,hasData;if(this.transitioning||this.$element.hasClass("in")){return;
}dimension=this.dimension();scroll=$.camelCase(["scroll",dimension].join("-"));actives=this.$parent&&this.$parent.find("> .accordion-group > .in");
if(actives&&actives.length){hasData=actives.data("collapse");if(hasData&&hasData.transitioning){return;}actives.collapse("hide");
hasData||actives.data("collapse",null);}this.$element[dimension](0);this.transition("addClass",$.Event("show"),"shown");$.support.transition&&this.$element[dimension](this.$element[0][scroll]);
},hide:function(){var dimension;if(this.transitioning||!this.$element.hasClass("in")){return;}dimension=this.dimension();
this.reset(this.$element[dimension]());this.transition("removeClass",$.Event("hide"),"hidden");this.$element[dimension](0);
},reset:function(size){var dimension=this.dimension();this.$element.removeClass("collapse")[dimension](size||"auto")[0].offsetWidth;
this.$element[size!==null?"addClass":"removeClass"]("collapse");return this;},transition:function(method,startEvent,completeEvent){var that=this,complete=function(){if(startEvent.type=="show"){that.reset();
}that.transitioning=0;that.$element.trigger(completeEvent);};this.$element.trigger(startEvent);if(startEvent.isDefaultPrevented()){return;
}this.transitioning=1;this.$element[method]("in");$.support.transition&&this.$element.hasClass("collapse")?this.$element.one($.support.transition.end,complete):complete();
},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]();}};var old=$.fn.collapse;$.fn.collapse=function(option){return this.each(function(){var $this=$(this),data=$this.data("collapse"),options=$.extend({},$.fn.collapse.defaults,$this.data(),typeof option=="object"&&option);
if(!data){$this.data("collapse",(data=new Collapse(this,options)));}if(typeof option=="string"){data[option]();}});};$.fn.collapse.defaults={toggle:true};
$.fn.collapse.Constructor=Collapse;$.fn.collapse.noConflict=function(){$.fn.collapse=old;return this;};$(document).on("click.collapse.data-api","[data-toggle=collapse]",function(e){var $this=$(this),href,target=$this.attr("data-target")||e.preventDefault()||(href=$this.attr("href"))&&href.replace(/.*(?=#[^\s]+$)/,""),option=$(target).data("collapse")?"toggle":$this.data();
$this[$(target).hasClass("in")?"addClass":"removeClass"]("collapsed");$(target).collapse(option);});}(window.jQuery);
/*!
 * bootstrap-alert.js v2.3.1-custom
 * Copyright 2013 Twitter, Inc.
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function($){var dismiss='[data-dismiss="box"]',Alert=function(el){$(el).on("click",dismiss,this.close);
};Alert.prototype.close=function(e){var $this=$(this),selector=$this.attr("data-target"),$parent;if(!selector){selector=$this.attr("href");
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,"");}$parent=$(selector);e&&e.preventDefault();$parent.length||($parent=$this.hasClass("box")?$this:$this.parent());
$parent.trigger(e=$.Event("close"));if(e.isDefaultPrevented()){return;}$parent.removeClass("in");function removeElement(){$parent.trigger("closed").remove();
}$.support.transition&&$parent.hasClass("fade")?$parent.on($.support.transition.end,removeElement):removeElement();};var old=$.fn.alert;
$.fn.alert=function(option){return this.each(function(){var $this=$(this),data=$this.data("box");if(!data){$this.data("box",(data=new Alert(this)));
}if(typeof option==="string"){data[option].call($this);}});};$.fn.alert.Constructor=Alert;$.fn.alert.noConflict=function(){$.fn.alert=old;
return this;};$(document).on("click.box.data-api",dismiss,Alert.prototype.close);}(window.jQuery);
/*!
 * bootstrap-dropdown.js v2.3.1
 * Copyright 2013 Twitter, Inc.
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function($){var toggle="[data-toggle=dropdown]",Dropdown=function(element){var $el=$(element).on("click.dropdown.data-api",this.toggle);
$("html").on("click.dropdown.data-api",function(){$el.parent().removeClass("open");});};Dropdown.prototype={constructor:Dropdown,toggle:function(e){var $this=$(this),$parent,isActive;
var $li=$this.closest("li");if($this.is(".disabled, :disabled")||$li.is(".disabled, :disabled")){return;}$parent=getParent($this);
isActive=$parent.hasClass("open");clearMenus();if(!isActive){$parent.toggleClass("open");}$this.focus();return false;},keydown:function(e){var $this,$items,$active,$parent,isActive,index;
if(!/(38|40|27)/.test(e.keyCode)){return;}$this=$(this);var $li=$this.closest("li");e.preventDefault();e.stopPropagation();
if($this.is(".disabled, :disabled")||$li.is(".disabled, :disabled")){return;}$parent=getParent($this);isActive=$parent.hasClass("open");
if(!isActive||(isActive&&e.keyCode===27)){if(e.which===27){$parent.find(toggle).focus();}return $this.click();}$items=$("[role=menu] li:not(.divider):visible a",$parent);
if(!$items.length){return;}index=$items.index($items.filter(":focus"));if(e.keyCode===38&&index>0){index--;}if(e.keyCode===40&&index<$items.length-1){index++;
}if(!~index){index=0;}$items.eq(index).focus();}};function clearMenus(){$(toggle).each(function(){getParent($(this)).removeClass("open");
});}function getParent($this){var selector=$this.attr("data-target"),$parent;if(!selector){selector=$this.attr("href");selector=selector&&/#/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,"");
}$parent=selector&&$(selector);if(!$parent||!$parent.length){$parent=$this.parent();}return $parent;}var old=$.fn.dropdown;
$.fn.dropdown=function(option){return this.each(function(){var $this=$(this),data=$this.data("dropdown");if(!data){$this.data("dropdown",(data=new Dropdown(this)));
}if(typeof option==="string"){data[option].call($this);}});};$.fn.dropdown.Constructor=Dropdown;$.fn.dropdown.noConflict=function(){$.fn.dropdown=old;
return this;};$(document).on("click.dropdown.data-api",clearMenus).on("click.dropdown.data-api",".dropdown form",function(e){e.stopPropagation();
}).on("click.dropdown-menu",function(e){e.stopPropagation();}).on("click.dropdown.data-api",toggle,Dropdown.prototype.toggle).on("keydown.dropdown.data-api",toggle+", [role=menu]",Dropdown.prototype.keydown);
}(window.jQuery);
/*!
 * bootstrap-tab.js v2.3.1
 * Copyright 2013 Twitter, Inc.
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function($){var Tab=function(element){this.element=$(element);
};Tab.prototype={constructor:Tab,show:function(){var $this=this.element,$ul=$this.closest("ul:not(.dropdown-menu)"),selector=$this.attr("data-target"),previous,$target,e;
if(!selector){selector=$this.attr("href");selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,"");}if($this.parent("li").hasClass("active")){return;
}previous=$ul.find(".active:last a")[0];e=$.Event("show",{relatedTarget:previous});$this.trigger(e);if(e.isDefaultPrevented()){return;
}$target=$(selector);this.activate($this.parent("li"),$ul);this.activate($target,$target.parent(),function(){$this.trigger({type:"shown",relatedTarget:previous});
});},activate:function(element,container,callback){var $active=container.find("> .active"),transition=callback&&$.support.transition&&$active.hasClass("fade");
function next(){$active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");element.addClass("active");
if(transition){element[0].offsetWidth;element.addClass("in");}else{element.removeClass("fade");}if(element.parent(".dropdown-menu")){element.closest("li.dropdown").addClass("active");
}callback&&callback();}transition?$active.one($.support.transition.end,next):next();$active.removeClass("in");}};var old=$.fn.tab;
$.fn.tab=function(option){return this.each(function(){var $this=$(this),data=$this.data("tab");if(!data){$this.data("tab",(data=new Tab(this)));
}if(typeof option==="string"){data[option]();}});};$.fn.tab.Constructor=Tab;$.fn.tab.noConflict=function(){$.fn.tab=old;return this;
};$(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(e){e.preventDefault();$(this).tab("show");
});$(document).ready(function(){var tabs=$(".tabbable");$(tabs).each(function(){var nav=$(this).find(".nav").first();$(nav).find("a").click(function(e){e.preventDefault();
$(this).tab("show");});});});}(window.jQuery);
/*!
 * jsTree 3.0.0 - http://jstree.com/
 * Copyright (c) 2013 Ivan Bozhanov
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],factory);
}else{if(typeof exports==="object"){factory(require("jquery"));}else{factory(jQuery);}}}(function($,undefined){if($.jstree){return;
}var instance_counter=0,ccp_node=false,ccp_mode=false,ccp_inst=false,themes_loaded=[],src=$("script:last").attr("src"),_d=document,_node=_d.createElement("LI"),_temp1,_temp2;
_node.setAttribute("role","treeitem");_temp1=_d.createElement("I");_temp1.className="jstree-icon jstree-ocl";_node.appendChild(_temp1);
_temp1=_d.createElement("A");_temp1.className="jstree-anchor";_temp1.setAttribute("href","#");_temp2=_d.createElement("I");
_temp2.className="jstree-icon jstree-themeicon";_temp1.appendChild(_temp2);_node.appendChild(_temp1);_temp1=_temp2=null;$.jstree={version:"3.0.0-beta9",defaults:{plugins:[]},plugins:{},path:src&&src.indexOf("/")!==-1?src.replace(/\/[^\/]+$/,""):""};
$.jstree.create=function(el,options){var tmp=new $.jstree.core(++instance_counter),opt=options;options=$.extend(true,{},$.jstree.defaults,options);
if(opt&&opt.plugins){options.plugins=opt.plugins;}$.each(options.plugins,function(i,k){if(i!=="core"){tmp=tmp.plugin(k,options[k]);
}});tmp.init(el,options);return tmp;};$.jstree.core=function(id){this._id=id;this._cnt=0;this._data={core:{themes:{name:false,dots:false,icons:false},selected:[],last_error:{}}};
};$.jstree.reference=function(needle){if(needle&&!$(needle).length){if(needle.id){needle=needle.id;}var tmp=null;$(".jstree").each(function(){var inst=$(this).data("jstree");
if(inst&&inst._model.data[needle]){tmp=inst;return false;}});return tmp;}return $(needle).closest(".jstree").data("jstree");
};$.fn.jstree=function(arg){var is_method=(typeof arg==="string"),args=Array.prototype.slice.call(arguments,1),result=null;
this.each(function(){var instance=$.jstree.reference(this),method=is_method&&instance?instance[arg]:null;result=is_method&&method?method.apply(instance,args):null;
if(!instance&&!is_method&&(arg===undefined||$.isPlainObject(arg))){$(this).data("jstree",new $.jstree.create(this,arg));}if(instance&&!is_method){result=instance;
}if(result!==null&&result!==undefined){return false;}});return result!==null&&result!==undefined?result:this;};$.expr[":"].jstree=$.expr.createPseudo(function(search){return function(a){return $(a).hasClass("jstree")&&$(a).data("jstree")!==undefined;
};});$.jstree.defaults.core={data:false,strings:false,check_callback:false,error:$.noop,animation:200,multiple:true,themes:{name:false,url:false,dir:false,dots:true,icons:true,stripes:false,variant:false,responsive:true},expand_selected_onload:true};
$.jstree.core.prototype={plugin:function(deco,opts){var Child=$.jstree.plugins[deco];if(Child){this._data[deco]={};Child.prototype=this;
return new Child(opts,this);}return this;},init:function(el,options){this._model={data:{"#":{id:"#",parent:null,parents:[],children:[],children_d:[],state:{loaded:false}}},changed:[],force_full_redraw:false,redraw_timeout:false,default_state:{loaded:true,opened:false,selected:false,disabled:false}};
this.element=$(el).addClass("jstree jstree-"+this._id);this.settings=options;this.element.bind("destroyed",$.proxy(this.teardown,this));
this._data.core.ready=false;this._data.core.loaded=false;this._data.core.rtl=(this.element.css("direction")==="rtl");this.element[this._data.core.rtl?"addClass":"removeClass"]("jstree-rtl");
this.element.attr("role","tree");this.bind();this.trigger("init");this._data.core.original_container_html=this.element.find(" > ul > li").clone(true);
this._data.core.original_container_html.find("li").addBack().contents().filter(function(){return this.nodeType===3&&(!this.nodeValue||/^\s+$/.test(this.nodeValue));
}).remove();this.element.html("<ul class='jstree-container-ul'><li class='jstree-initial-node jstree-loading jstree-leaf jstree-last'><i class='jstree-icon jstree-ocl'></i><a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>"+this.get_string("Loading ...")+"</a></li></ul>");
this._data.core.li_height=this.get_container_ul().children("li:eq(0)").height()||18;this.trigger("loading");this.load_node("#");
},destroy:function(){this.element.unbind("destroyed",this.teardown);this.teardown();},teardown:function(){this.unbind();this.element.removeClass("jstree").removeData("jstree").find("[class^='jstree']").addBack().attr("class",function(){return this.className.replace(/jstree[^ ]*|$/ig,"");
});this.element=null;},bind:function(){this.element.on("dblclick.jstree",function(){if(document.selection&&document.selection.empty){document.selection.empty();
}else{if(window.getSelection){var sel=window.getSelection();try{sel.removeAllRanges();sel.collapse();}catch(ignore){}}}}).on("click.jstree",".jstree-ocl",$.proxy(function(e){this.toggle_node(e.target);
},this)).on("click.jstree",".jstree-anchor",$.proxy(function(e){e.preventDefault();$(e.currentTarget).focus();this.activate_node(e.currentTarget,e);
},this)).on("keydown.jstree",".jstree-anchor",$.proxy(function(e){var o=null;switch(e.which){case 13:case 32:e.type="click";
$(e.currentTarget).trigger(e);break;case 37:e.preventDefault();if(this.is_open(e.currentTarget)){this.close_node(e.currentTarget);
}else{o=this.get_prev_dom(e.currentTarget);if(o&&o.length){o.children(".jstree-anchor").focus();}}break;case 38:e.preventDefault();
o=this.get_prev_dom(e.currentTarget);if(o&&o.length){o.children(".jstree-anchor").focus();}break;case 39:e.preventDefault();
if(this.is_closed(e.currentTarget)){this.open_node(e.currentTarget,function(o){this.get_node(o,true).children(".jstree-anchor").focus();
});}else{o=this.get_next_dom(e.currentTarget);if(o&&o.length){o.children(".jstree-anchor").focus();}}break;case 40:e.preventDefault();
o=this.get_next_dom(e.currentTarget);if(o&&o.length){o.children(".jstree-anchor").focus();}break;case 46:e.preventDefault();
o=this.get_node(e.currentTarget);if(o&&o.id&&o.id!=="#"){o=this.is_selected(o)?this.get_selected():o;}break;case 113:e.preventDefault();
o=this.get_node(e.currentTarget);
/*!
								if(o && o.id && o.id !== '#') {
									// this.edit(o);
								}
								*/
break;
default:break;}},this)).on("load_node.jstree",$.proxy(function(e,data){if(data.status){if(data.node.id==="#"&&!this._data.core.loaded){this._data.core.loaded=true;
this.trigger("loaded");}if(!this._data.core.ready&&!this.get_container_ul().find(".jstree-loading:eq(0)").length){this._data.core.ready=true;
if(this._data.core.selected.length){if(this.settings.core.expand_selected_onload){var tmp=[],i,j;for(i=0,j=this._data.core.selected.length;
i<j;i++){tmp=tmp.concat(this._model.data[this._data.core.selected[i]].parents);}tmp=$.vakata.array_unique(tmp);for(i=0,j=tmp.length;
i<j;i++){this.open_node(tmp[i],false,0);}}this.trigger("changed",{action:"ready",selected:this._data.core.selected});}setTimeout($.proxy(function(){this.trigger("ready");
},this),0);}}},this)).on("init.jstree",$.proxy(function(){var s=this.settings.core.themes;this._data.core.themes.dots=s.dots;
this._data.core.themes.stripes=s.stripes;this._data.core.themes.icons=s.icons;this.set_theme(s.name||"default",s.url);this.set_theme_variant(s.variant);
},this)).on("loading.jstree",$.proxy(function(){this[this._data.core.themes.dots?"show_dots":"hide_dots"]();this[this._data.core.themes.icons?"show_icons":"hide_icons"]();
this[this._data.core.themes.stripes?"show_stripes":"hide_stripes"]();},this)).on("focus.jstree",".jstree-anchor",$.proxy(function(e){this.element.find(".jstree-hovered").not(e.currentTarget).mouseleave();
$(e.currentTarget).mouseenter();},this)).on("mouseenter.jstree",".jstree-anchor",$.proxy(function(e){this.hover_node(e.currentTarget);
},this)).on("mouseleave.jstree",".jstree-anchor",$.proxy(function(e){this.dehover_node(e.currentTarget);},this));},unbind:function(){this.element.off(".jstree");
$(document).off(".jstree-"+this._id);},trigger:function(ev,data){if(!data){data={};}data.instance=this;this.element.triggerHandler(ev.replace(".jstree","")+".jstree",data);
},get_container:function(){return this.element;},get_container_ul:function(){return this.element.children("ul:eq(0)");},get_string:function(key){var a=this.settings.core.strings;
if($.isFunction(a)){return a.call(this,key);}if(a&&a[key]){return a[key];}return key;},_firstChild:function(dom){dom=dom?dom.firstChild:null;
while(dom!==null&&dom.nodeType!==1){dom=dom.nextSibling;}return dom;},_nextSibling:function(dom){dom=dom?dom.nextSibling:null;
while(dom!==null&&dom.nodeType!==1){dom=dom.nextSibling;}return dom;},_previousSibling:function(dom){dom=dom?dom.previousSibling:null;
while(dom!==null&&dom.nodeType!==1){dom=dom.previousSibling;}return dom;},get_node:function(obj,as_dom){if(obj&&obj.id){obj=obj.id;
}var dom;try{if(this._model.data[obj]){obj=this._model.data[obj];}else{if(((dom=$(obj,this.element)).length||(dom=$("#"+obj,this.element)).length)&&this._model.data[dom.closest("li").attr("id")]){obj=this._model.data[dom.closest("li").attr("id")];
}else{if((dom=$(obj,this.element)).length&&dom.hasClass("jstree")){obj=this._model.data["#"];}else{return false;}}}if(as_dom){obj=obj.id==="#"?this.element:$(document.getElementById(obj.id));
}return obj;}catch(ex){return false;}},get_path:function(obj,glue,ids){obj=obj.parents?obj:this.get_node(obj);if(!obj||obj.id==="#"||!obj.parents){return false;
}var i,j,p=[];p.push(ids?obj.id:obj.text);for(i=0,j=obj.parents.length;i<j;i++){p.push(ids?obj.parents[i]:this.get_text(obj.parents[i]));
}p=p.reverse().slice(1);return glue?p.join(glue):p;},get_next_dom:function(obj,strict){var tmp;obj=this.get_node(obj,true);
if(obj[0]===this.element[0]){tmp=this._firstChild(this.get_container_ul()[0]);return tmp?$(tmp):false;}if(!obj||!obj.length){return false;
}if(strict){tmp=this._nextSibling(obj[0]);return tmp?$(tmp):false;}if(obj.hasClass("jstree-open")){tmp=this._firstChild(obj.children("ul")[0]);
return tmp?$(tmp):false;}if((tmp=this._nextSibling(obj[0]))!==null){return $(tmp);}return obj.parentsUntil(".jstree","li").next("li").eq(0);
},get_prev_dom:function(obj,strict){var tmp;obj=this.get_node(obj,true);if(obj[0]===this.element[0]){tmp=this.get_container_ul()[0].lastChild;
return tmp?$(tmp):false;}if(!obj||!obj.length){return false;}if(strict){tmp=this._previousSibling(obj[0]);return tmp?$(tmp):false;
}if((tmp=this._previousSibling(obj[0]))!==null){obj=$(tmp);while(obj.hasClass("jstree-open")){obj=obj.children("ul:eq(0)").children("li:last");
}return obj;}tmp=obj[0].parentNode.parentNode;return tmp&&tmp.tagName==="LI"?$(tmp):false;},get_parent:function(obj){obj=this.get_node(obj);
if(!obj||obj.id==="#"){return false;}return obj.parent;},get_children_dom:function(obj){obj=this.get_node(obj,true);if(obj[0]===this.element[0]){return this.get_container_ul().children("li");
}if(!obj||!obj.length){return false;}return obj.children("ul").children("li");},is_parent:function(obj){obj=this.get_node(obj);
return obj&&(obj.state.loaded===false||obj.children.length>0);},is_loaded:function(obj){obj=this.get_node(obj);return obj&&obj.state.loaded;
},is_loading:function(obj){obj=this.get_node(obj,true);return obj&&obj.hasClass("jstree-loading");},is_open:function(obj){obj=this.get_node(obj);
return obj&&obj.state.opened;},is_closed:function(obj){obj=this.get_node(obj);return obj&&this.is_parent(obj)&&!obj.state.opened;
},is_leaf:function(obj){return !this.is_parent(obj);},load_node:function(obj,callback){var t1,t2;if($.isArray(obj)){obj=obj.slice();
for(t1=0,t2=obj.length;t1<t2;t1++){this.load_node(obj[t1],callback);}return true;}obj=this.get_node(obj);if(!obj){callback.call(this,obj,false);
return false;}this.get_node(obj,true).addClass("jstree-loading");this._load_node(obj,$.proxy(function(status){obj.state.loaded=status;
this.get_node(obj,true).removeClass("jstree-loading");this.trigger("load_node",{node:obj,status:status});if(callback){callback.call(this,obj,status);
}},this));return true;},_load_node:function(obj,callback){var s=this.settings.core.data,t;if(!s){return callback.call(this,obj.id==="#"?this._append_html_data(obj,this._data.core.original_container_html.clone(true)):false);
}if($.isFunction(s)){return s.call(this,obj,$.proxy(function(d){return d===false?callback.call(this,false):callback.call(this,this[typeof d==="string"?"_append_html_data":"_append_json_data"](obj,typeof d==="string"?$(d):d));
},this));}if(typeof s==="object"){if(s.url){s=$.extend(true,{},s);if($.isFunction(s.url)){s.url=s.url.call(this,obj);}if($.isFunction(s.data)){s.data=s.data.call(this,obj);
}return $.ajax(s).done($.proxy(function(d,t,x){var type=x.getResponseHeader("Content-Type");if(type.indexOf("json")!==-1){return callback.call(this,this._append_json_data(obj,d));
}if(type.indexOf("html")!==-1){return callback.call(this,this._append_html_data(obj,$(d)));}},this)).fail($.proxy(function(){callback.call(this,false);
this._data.core.last_error={error:"ajax",plugin:"core",id:"core_04",reason:"Could not load node",data:JSON.stringify(s)};
this.settings.core.error.call(this,this._data.core.last_error);},this));}t=($.isArray(s)||$.isPlainObject(s))?JSON.parse(JSON.stringify(s)):s;
return callback.call(this,this._append_json_data(obj,t));}if(typeof s==="string"){return callback.call(this,this._append_html_data(obj,s));
}return callback.call(this,false);},_node_changed:function(obj){obj=this.get_node(obj);if(obj){this._model.changed.push(obj.id);
}},_append_html_data:function(dom,data){dom=this.get_node(dom);dom.children=[];dom.children_d=[];var dat=data.is("ul")?data.children():data,par=dom.id,chd=[],dpc=[],m=this._model.data,p=m[par],s=this._data.core.selected.length,tmp,i,j;
dat.each($.proxy(function(i,v){tmp=this._parse_model_from_html($(v),par,p.parents.concat());if(tmp){chd.push(tmp);dpc.push(tmp);
if(m[tmp].children_d.length){dpc=dpc.concat(m[tmp].children_d);}}},this));p.children=chd;p.children_d=dpc;for(i=0,j=p.parents.length;
i<j;i++){m[p.parents[i]].children_d=m[p.parents[i]].children_d.concat(dpc);}this.trigger("model",{nodes:dpc,parent:par});
if(par!=="#"){this._node_changed(par);this.redraw();}else{this.get_container_ul().children(".jstree-initial-node").remove();
this.redraw(true);}if(this._data.core.selected.length!==s){this.trigger("changed",{action:"model",selected:this._data.core.selected});
}return true;},_append_json_data:function(dom,data){dom=this.get_node(dom);dom.children=[];dom.children_d=[];var dat=data,par=dom.id,chd=[],dpc=[],m=this._model.data,p=m[par],s=this._data.core.selected.length,tmp,i,j;
if(dat.d){dat=dat.d;if(typeof dat==="string"){dat=JSON.parse(dat);}}if(!$.isArray(dat)){dat=[dat];}if(dat.length&&dat[0].id!==undefined&&dat[0].parent!==undefined){for(i=0,j=dat.length;
i<j;i++){if(!dat[i].children){dat[i].children=[];}m[dat[i].id]=dat[i];}for(i=0,j=dat.length;i<j;i++){m[dat[i].parent].children.push(dat[i].id);
p.children_d.push(dat[i].id);}for(i=0,j=p.children.length;i<j;i++){tmp=this._parse_model_from_flat_json(m[p.children[i]],par,p.parents.concat());
dpc.push(tmp);if(m[tmp].children_d.length){dpc=dpc.concat(m[tmp].children_d);}}}else{for(i=0,j=dat.length;i<j;i++){tmp=this._parse_model_from_json(dat[i],par,p.parents.concat());
if(tmp){chd.push(tmp);dpc.push(tmp);if(m[tmp].children_d.length){dpc=dpc.concat(m[tmp].children_d);}}}p.children=chd;p.children_d=dpc;
for(i=0,j=p.parents.length;i<j;i++){m[p.parents[i]].children_d=m[p.parents[i]].children_d.concat(dpc);}}this.trigger("model",{nodes:dpc,parent:par});
if(par!=="#"){this._node_changed(par);this.redraw();}else{this.redraw(true);}if(this._data.core.selected.length!==s){this.trigger("changed",{action:"model",selected:this._data.core.selected});
}return true;},_parse_model_from_html:function(d,p,ps){if(!ps){ps=[];}else{ps=[].concat(ps);}if(p){ps.unshift(p);}var c,e,m=this._model.data,data={id:false,text:false,icon:true,parent:p,parents:ps,children:[],children_d:[],data:null,state:{},li_attr:{id:false},a_attr:{href:"#"},original:false},i,tmp,tid;
for(i in this._model.default_state){if(this._model.default_state.hasOwnProperty(i)){data.state[i]=this._model.default_state[i];
}}tmp=$.vakata.attributes(d,true);$.each(tmp,function(i,v){v=$.trim(v);if(!v.length){return true;}data.li_attr[i]=v;if(i==="id"){data.id=v;
}});tmp=d.children("a").eq(0);if(tmp.length){tmp=$.vakata.attributes(tmp,true);$.each(tmp,function(i,v){v=$.trim(v);if(v.length){data.a_attr[i]=v;
}});}tmp=d.children("a:eq(0)").length?d.children("a:eq(0)").clone():d.clone();tmp.children("ins, i, ul").remove();tmp=tmp.html();
tmp=$("<div />").html(tmp);data.text=tmp.html();tmp=d.data();data.data=tmp?$.extend(true,{},tmp):null;data.state.opened=d.hasClass("jstree-open");
data.state.selected=d.children("a").hasClass("jstree-clicked");data.state.disabled=d.children("a").hasClass("jstree-disabled");
if(data.data&&data.data.jstree){for(i in data.data.jstree){if(data.data.jstree.hasOwnProperty(i)){data.state[i]=data.data.jstree[i];
}}}tmp=d.children("a").children(".jstree-themeicon");if(tmp.length){data.icon=tmp.hasClass("jstree-themeicon-hidden")?false:tmp.attr("rel");
}if(data.state.icon){data.icon=data.state.icon;}tmp=d.children("ul").children("li");do{tid="j"+this._id+"_"+(++this._cnt);
}while(m[tid]);data.id=data.li_attr.id||tid;if(tmp.length){tmp.each($.proxy(function(i,v){c=this._parse_model_from_html($(v),data.id,ps);
e=this._model.data[c];data.children.push(c);if(e.children_d.length){data.children_d=data.children_d.concat(e.children_d);
}},this));data.children_d=data.children_d.concat(data.children);}else{if(d.hasClass("jstree-closed")){data.state.loaded=false;
}}if(data.li_attr["class"]){data.li_attr["class"]=data.li_attr["class"].replace("jstree-closed","").replace("jstree-open","");
}if(data.a_attr["class"]){data.a_attr["class"]=data.a_attr["class"].replace("jstree-clicked","").replace("jstree-disabled","");
}m[data.id]=data;if(data.state.selected){this._data.core.selected.push(data.id);}return data.id;},_parse_model_from_flat_json:function(d,p,ps){if(!ps){ps=[];
}else{ps=ps.concat();}if(p){ps.unshift(p);}var tid=d.id,m=this._model.data,df=this._model.default_state,i,j,c,e,tmp={id:tid,text:d.text||"",icon:d.icon!==undefined?d.icon:true,parent:p,parents:ps,children:d.children||[],children_d:d.children_d||[],data:d.data,state:{},li_attr:{id:false},a_attr:{href:"#"},original:false};
for(i in df){if(df.hasOwnProperty(i)){tmp.state[i]=df[i];}}if(d&&d.data&&d.data.jstree&&d.data.jstree.icon){tmp.icon=d.data.jstree.icon;
}if(d&&d.data){tmp.data=d.data;if(d.data.jstree){for(i in d.data.jstree){if(d.data.jstree.hasOwnProperty(i)){tmp.state[i]=d.data.jstree[i];
}}}}if(d&&typeof d.state==="object"){for(i in d.state){if(d.state.hasOwnProperty(i)){tmp.state[i]=d.state[i];}}}if(d&&typeof d.li_attr==="object"){for(i in d.li_attr){if(d.li_attr.hasOwnProperty(i)){tmp.li_attr[i]=d.li_attr[i];
}}}if(!tmp.li_attr.id){tmp.li_attr.id=tid;}if(d&&typeof d.a_attr==="object"){for(i in d.a_attr){if(d.a_attr.hasOwnProperty(i)){tmp.a_attr[i]=d.a_attr[i];
}}}if(d&&d.children&&d.children===true){tmp.state.loaded=false;tmp.children=[];tmp.children_d=[];}m[tmp.id]=tmp;for(i=0,j=tmp.children.length;
i<j;i++){c=this._parse_model_from_flat_json(m[tmp.children[i]],tmp.id,ps);e=m[c];tmp.children_d.push(c);if(e.children_d.length){tmp.children_d=tmp.children_d.concat(e.children_d);
}}delete d.data;delete d.children;m[tmp.id].original=d;if(tmp.state.selected){this._data.core.selected.push(tmp.id);}return tmp.id;
},_parse_model_from_json:function(d,p,ps){if(!ps){ps=[];}else{ps=ps.concat();}if(p){ps.unshift(p);}var tid=false,i,j,c,e,m=this._model.data,df=this._model.default_state,tmp;
do{tid="j"+this._id+"_"+(++this._cnt);}while(m[tid]);tmp={id:false,text:typeof d==="string"?d:"",icon:typeof d==="object"&&d.icon!==undefined?d.icon:true,parent:p,parents:ps,children:[],children_d:[],data:null,state:{},li_attr:{id:false},a_attr:{href:"#"},original:false};
for(i in df){if(df.hasOwnProperty(i)){tmp.state[i]=df[i];}}if(d&&d.id){tmp.id=d.id;}if(d&&d.text){tmp.text=d.text;}if(d&&d.data&&d.data.jstree&&d.data.jstree.icon){tmp.icon=d.data.jstree.icon;
}if(d&&d.data){tmp.data=d.data;if(d.data.jstree){for(i in d.data.jstree){if(d.data.jstree.hasOwnProperty(i)){tmp.state[i]=d.data.jstree[i];
}}}}if(d&&typeof d.state==="object"){for(i in d.state){if(d.state.hasOwnProperty(i)){tmp.state[i]=d.state[i];}}}if(d&&typeof d.li_attr==="object"){for(i in d.li_attr){if(d.li_attr.hasOwnProperty(i)){tmp.li_attr[i]=d.li_attr[i];
}}}if(tmp.li_attr.id&&!tmp.id){tmp.id=tmp.li_attr.id;}if(!tmp.id){tmp.id=tid;}if(!tmp.li_attr.id){tmp.li_attr.id=tmp.id;}if(d&&typeof d.a_attr==="object"){for(i in d.a_attr){if(d.a_attr.hasOwnProperty(i)){tmp.a_attr[i]=d.a_attr[i];
}}}if(d&&d.children&&d.children.length){for(i=0,j=d.children.length;i<j;i++){c=this._parse_model_from_json(d.children[i],tmp.id,ps);
e=m[c];tmp.children.push(c);if(e.children_d.length){tmp.children_d=tmp.children_d.concat(e.children_d);}}tmp.children_d=tmp.children_d.concat(tmp.children);
}if(d&&d.children&&d.children===true){tmp.state.loaded=false;tmp.children=[];tmp.children_d=[];}delete d.data;delete d.children;
tmp.original=d;m[tmp.id]=tmp;if(tmp.state.selected){this._data.core.selected.push(tmp.id);}return tmp.id;},_redraw:function(){var nodes=this._model.force_full_redraw?this._model.data["#"].children.concat([]):this._model.changed.concat([]),f=document.createElement("UL"),tmp,i,j;
for(i=0,j=nodes.length;i<j;i++){tmp=this.redraw_node(nodes[i],true,this._model.force_full_redraw);if(tmp&&this._model.force_full_redraw){f.appendChild(tmp);
}}if(this._model.force_full_redraw){f.className=this.get_container_ul()[0].className;this.element.empty().append(f);}this._model.force_full_redraw=false;
this._model.changed=[];this.trigger("redraw",{nodes:nodes});},redraw:function(full){if(full){this._model.force_full_redraw=true;
}this._redraw();},redraw_node:function(node,deep,is_callback){var obj=this.get_node(node),par=false,ind=false,old=false,i=false,j=false,k=false,c="",d=document,m=this._model.data,f=false,s=false;
if(!obj){return false;}if(obj.id==="#"){return this.redraw(true);}deep=deep||obj.children.length===0;node=d.getElementById(obj.id);
if(!node){deep=true;if(!is_callback){par=obj.parent!=="#"?$("#"+obj.parent,this.element)[0]:null;if(par!==null&&(!par||!m[obj.parent].state.opened)){return false;
}ind=$.inArray(obj.id,par===null?m["#"].children:m[obj.parent].children);}}else{node=$(node);if(!is_callback){par=node.parent().parent()[0];
if(par===this.element[0]){par=null;}ind=node.index();}if(!deep&&obj.children.length&&!node.children("ul").length){deep=true;
}if(!deep){old=node.children("UL")[0];}s=node.attr("aria-selected");f=node.children(".jstree-anchor")[0]===document.activeElement;
node.remove();}node=_node.cloneNode(true);c="jstree-node ";for(i in obj.li_attr){if(obj.li_attr.hasOwnProperty(i)){if(i==="id"){continue;
}if(i!=="class"){node.setAttribute(i,obj.li_attr[i]);}else{c+=obj.li_attr[i];}}}if(s&&s!=="false"){node.setAttribute("aria-selected",true);
}if(!obj.children.length&&obj.state.loaded){c+=" jstree-leaf";}else{c+=obj.state.opened?" jstree-open":" jstree-closed";node.setAttribute("aria-expanded",obj.state.opened);
}if(obj.parent!==null&&m[obj.parent].children[m[obj.parent].children.length-1]===obj.id){c+=" jstree-last";}node.id=obj.id;
node.className=c;c=(obj.state.selected?" jstree-clicked":"")+(obj.state.disabled?" jstree-disabled":"");for(j in obj.a_attr){if(obj.a_attr.hasOwnProperty(j)){if(j==="href"&&obj.a_attr[j]==="#"){continue;
}if(j!=="class"){node.childNodes[1].setAttribute(j,obj.a_attr[j]);}else{c+=" "+obj.a_attr[j];}}}if(c.length){node.childNodes[1].className="jstree-anchor "+c;
}if((obj.icon&&obj.icon!==true)||obj.icon===false){if(obj.icon===false){node.childNodes[1].childNodes[0].className+=" jstree-themeicon-hidden";
}else{if(obj.icon.indexOf("/")===-1&&obj.icon.indexOf(".")===-1){node.childNodes[1].childNodes[0].className+=" "+obj.icon+" jstree-themeicon-custom";
}else{node.childNodes[1].childNodes[0].style.backgroundImage="url("+obj.icon+")";node.childNodes[1].childNodes[0].style.backgroundPosition="center center";
node.childNodes[1].childNodes[0].style.backgroundSize="auto";node.childNodes[1].childNodes[0].className+=" jstree-themeicon-custom";
}}}node.childNodes[1].innerHTML+=obj.text;if(deep&&obj.children.length&&obj.state.opened){k=d.createElement("UL");k.setAttribute("role","group");
k.className="jstree-children";for(i=0,j=obj.children.length;i<j;i++){k.appendChild(this.redraw_node(obj.children[i],deep,true));
}node.appendChild(k);}if(old){node.appendChild(old);}if(!is_callback){if(!par){par=this.element[0];}if(!par.getElementsByTagName("UL").length){i=d.createElement("UL");
i.setAttribute("role","group");i.className="jstree-children";par.appendChild(i);par=i;}else{par=par.getElementsByTagName("UL")[0];
}if(ind<par.childNodes.length){par.insertBefore(node,par.childNodes[ind]);}else{par.appendChild(node);}if(f){node.childNodes[1].focus();
}}return node;},open_node:function(obj,callback,animation){var t1,t2,d,t;if($.isArray(obj)){obj=obj.slice();for(t1=0,t2=obj.length;
t1<t2;t1++){this.open_node(obj[t1],callback,animation);}return true;}obj=this.get_node(obj);if(!obj||obj.id==="#"){return false;
}animation=animation===undefined?this.settings.core.animation:animation;if(!this.is_closed(obj)){if(callback){callback.call(this,obj,false);
}return false;}if(!this.is_loaded(obj)){if(this.is_loading(obj)){return setTimeout($.proxy(function(){this.open_node(obj,callback,animation);
},this),500);}this.load_node(obj,function(o,ok){return ok?this.open_node(o,callback,animation):(callback?callback.call(this,o,false):false);
});}else{d=this.get_node(obj,true);t=this;if(d.length){if(obj.children.length&&!this._firstChild(d.children("ul")[0])){obj.state.opened=true;
this.redraw_node(obj,true);d=this.get_node(obj,true);}if(!animation){d[0].className=d[0].className.replace("jstree-closed","jstree-open");
d[0].setAttribute("aria-expanded",true);}else{d.children("ul").css("display","none").end().removeClass("jstree-closed").addClass("jstree-open").attr("aria-expanded",true).children("ul").stop(true,true).slideDown(animation,function(){this.style.display="";
t.trigger("after_open",{node:obj});});}}obj.state.opened=true;if(callback){callback.call(this,obj,true);}this.trigger("open_node",{node:obj});
if(!animation||!d.length){this.trigger("after_open",{node:obj});}}},_open_to:function(obj){obj=this.get_node(obj);if(!obj||obj.id==="#"){return false;
}var i,j,p=obj.parents;for(i=0,j=p.length;i<j;i+=1){if(i!=="#"){this.open_node(p[i],false,0);}}return $(document.getElementById(obj.id));
},close_node:function(obj,animation){var t1,t2,t,d;if($.isArray(obj)){obj=obj.slice();for(t1=0,t2=obj.length;t1<t2;t1++){this.close_node(obj[t1],animation);
}return true;}obj=this.get_node(obj);if(!obj||obj.id==="#"){return false;}animation=animation===undefined?this.settings.core.animation:animation;
t=this;d=this.get_node(obj,true);if(d.length){if(!animation){d[0].className=d[0].className.replace("jstree-open","jstree-closed");
d.attr("aria-expanded",false).children("ul").remove();}else{d.children("ul").attr("style","display:block !important").end().removeClass("jstree-open").addClass("jstree-closed").attr("aria-expanded",false).children("ul").stop(true,true).slideUp(animation,function(){this.style.display="";
d.children("ul").remove();t.trigger("after_close",{node:obj});});}}obj.state.opened=false;this.trigger("close_node",{node:obj});
if(!animation||!d.length){this.trigger("after_close",{node:obj});}},toggle_node:function(obj){var t1,t2;if($.isArray(obj)){obj=obj.slice();
for(t1=0,t2=obj.length;t1<t2;t1++){this.toggle_node(obj[t1]);}return true;}if(this.is_closed(obj)){return this.open_node(obj);
}if(this.is_open(obj)){return this.close_node(obj);}},open_all:function(obj,animation,original_obj){if(!obj){obj="#";}obj=this.get_node(obj);
if(!obj){return false;}var dom=obj.id==="#"?this.get_container_ul():this.get_node(obj,true),i,j,_this;if(!dom.length){for(i=0,j=obj.children_d.length;
i<j;i++){if(this.is_closed(this._model.data[obj.children_d[i]])){this._model.data[obj.children_d[i]].state.opened=true;}}return this.trigger("open_all",{node:obj});
}original_obj=original_obj||dom;_this=this;dom=this.is_closed(obj)?dom.find("li.jstree-closed").addBack():dom.find("li.jstree-closed");
dom.each(function(){_this.open_node(this,function(node,status){if(status&&this.is_parent(node)){this.open_all(node,animation,original_obj);
}},animation||0);});if(original_obj.find("li.jstree-closed").length===0){this.trigger("open_all",{node:this.get_node(original_obj)});
}},close_all:function(obj,animation){if(!obj){obj="#";}obj=this.get_node(obj);if(!obj){return false;}var dom=obj.id==="#"?this.get_container_ul():this.get_node(obj,true),_this=this,i,j;
if(!dom.length){for(i=0,j=obj.children_d.length;i<j;i++){this._model.data[obj.children_d[i]].state.opened=false;}return this.trigger("close_all",{node:obj});
}dom=this.is_open(obj)?dom.find("li.jstree-open").addBack():dom.find("li.jstree-open");dom.vakata_reverse().each(function(){_this.close_node(this,animation||0);
});this.trigger("close_all",{node:obj});},is_disabled:function(obj){obj=this.get_node(obj);return obj&&obj.state&&obj.state.disabled;
},enable_node:function(obj){var t1,t2;if($.isArray(obj)){obj=obj.slice();for(t1=0,t2=obj.length;t1<t2;t1++){this.enable_node(obj[t1]);
}return true;}obj=this.get_node(obj);if(!obj||obj.id==="#"){return false;}obj.state.disabled=false;this.get_node(obj,true).children(".jstree-anchor").removeClass("jstree-disabled");
this.trigger("enable_node",{node:obj});},disable_node:function(obj){var t1,t2;if($.isArray(obj)){obj=obj.slice();for(t1=0,t2=obj.length;
t1<t2;t1++){this.disable_node(obj[t1]);}return true;}obj=this.get_node(obj);if(!obj||obj.id==="#"){return false;}obj.state.disabled=true;
this.get_node(obj,true).children(".jstree-anchor").addClass("jstree-disabled");this.trigger("disable_node",{node:obj});},activate_node:function(obj,e){if(this.is_disabled(obj)){return false;
}if(!this.settings.core.multiple||(!e.metaKey&&!e.ctrlKey&&!e.shiftKey)||(e.shiftKey&&(!this._data.core.last_clicked||!this.get_parent(obj)||this.get_parent(obj)!==this._data.core.last_clicked.parent))){if(!this.settings.core.multiple&&(e.metaKey||e.ctrlKey||e.shiftKey)&&this.is_selected(obj)){this.deselect_node(obj,false,false,e);
}else{this.deselect_all(true);this.select_node(obj,false,false,e);this._data.core.last_clicked=this.get_node(obj);}}else{if(e.shiftKey){var o=this.get_node(obj).id,l=this._data.core.last_clicked.id,p=this.get_node(this._data.core.last_clicked.parent).children,c=false,i,j;
for(i=0,j=p.length;i<j;i+=1){if(p[i]===o){c=!c;}if(p[i]===l){c=!c;}if(c||p[i]===o||p[i]===l){this.select_node(p[i],false,false,e);
}else{this.deselect_node(p[i],false,false,e);}}}else{if(!this.is_selected(obj)){this.select_node(obj,false,false,e);}else{this.deselect_node(obj,false,false,e);
}}}this.trigger("activate_node",{node:this.get_node(obj)});},hover_node:function(obj){obj=this.get_node(obj,true);if(!obj||!obj.length||obj.children(".jstree-hovered").length){return false;
}var o=this.element.find(".jstree-hovered"),t=this.element;if(o&&o.length){this.dehover_node(o);}obj.children(".jstree-anchor").addClass("jstree-hovered");
this.trigger("hover_node",{node:this.get_node(obj)});setTimeout(function(){t.attr("aria-activedescendant",obj[0].id);obj.attr("aria-selected",true);
},0);},dehover_node:function(obj){obj=this.get_node(obj,true);if(!obj||!obj.length||!obj.children(".jstree-hovered").length){return false;
}obj.attr("aria-selected",false).children(".jstree-anchor").removeClass("jstree-hovered");this.trigger("dehover_node",{node:this.get_node(obj)});
},select_node:function(obj,supress_event,prevent_open,e){var dom,t1,t2,th;if($.isArray(obj)){obj=obj.slice();for(t1=0,t2=obj.length;
t1<t2;t1++){this.select_node(obj[t1],supress_event,prevent_open,e);}return true;}obj=this.get_node(obj);if(!obj||obj.id==="#"){return false;
}dom=this.get_node(obj,true);if(!obj.state.selected){obj.state.selected=true;this._data.core.selected.push(obj.id);if(!prevent_open){dom=this._open_to(obj);
}if(dom&&dom.length){dom.children(".jstree-anchor").addClass("jstree-clicked");}this.trigger("select_node",{node:obj,selected:this._data.core.selected,event:e});
if(!supress_event){this.trigger("changed",{action:"select_node",node:obj,selected:this._data.core.selected,event:e});}}},deselect_node:function(obj,supress_event,e){var t1,t2,dom;
if($.isArray(obj)){obj=obj.slice();for(t1=0,t2=obj.length;t1<t2;t1++){this.deselect_node(obj[t1],supress_event,e);}return true;
}obj=this.get_node(obj);if(!obj||obj.id==="#"){return false;}dom=this.get_node(obj,true);if(obj.state.selected){obj.state.selected=false;
this._data.core.selected=$.vakata.array_remove_item(this._data.core.selected,obj.id);if(dom.length){dom.children(".jstree-anchor").removeClass("jstree-clicked");
}this.trigger("deselect_node",{node:obj,selected:this._data.core.selected,event:e});if(!supress_event){this.trigger("changed",{action:"deselect_node",node:obj,selected:this._data.core.selected,event:e});
}}},select_all:function(supress_event){var tmp=this._data.core.selected.concat([]),i,j;this._data.core.selected=this._model.data["#"].children_d.concat();
for(i=0,j=this._data.core.selected.length;i<j;i++){if(this._model.data[this._data.core.selected[i]]){this._model.data[this._data.core.selected[i]].state.selected=true;
}}this.redraw(true);this.trigger("select_all",{selected:this._data.core.selected});if(!supress_event){this.trigger("changed",{action:"select_all",selected:this._data.core.selected,old_selection:tmp});
}},deselect_all:function(supress_event){var tmp=this._data.core.selected.concat([]),i,j;for(i=0,j=this._data.core.selected.length;
i<j;i++){if(this._model.data[this._data.core.selected[i]]){this._model.data[this._data.core.selected[i]].state.selected=false;
}}this._data.core.selected=[];this.element.find(".jstree-clicked").removeClass("jstree-clicked");this.trigger("deselect_all",{selected:this._data.core.selected,node:tmp});
if(!supress_event){this.trigger("changed",{action:"deselect_all",selected:this._data.core.selected,old_selection:tmp});}},is_selected:function(obj){obj=this.get_node(obj);
if(!obj||obj.id==="#"){return false;}return obj.state.selected;},get_selected:function(full){return full?$.map(this._data.core.selected,$.proxy(function(i){return this.get_node(i);
},this)):this._data.core.selected;},get_state:function(){var state={core:{open:[],scroll:{left:this.element.scrollLeft(),top:this.element.scrollTop()},
/*!
					'themes' : {
						'name' : this.get_theme(),
						'icons' : this._data.core.themes.icons,
						'dots' : this._data.core.themes.dots
					},
					*/
selected:[]}},i;
for(i in this._model.data){if(this._model.data.hasOwnProperty(i)){if(i!=="#"){if(this._model.data[i].state.opened){state.core.open.push(i);
}if(this._model.data[i].state.selected){state.core.selected.push(i);}}}}return state;},set_state:function(state,callback){if(state){if(state.core){var res,n,t,_this;
if(state.core.open){if(!$.isArray(state.core.open)){delete state.core.open;this.set_state(state,callback);return false;}res=true;
n=false;t=this;$.each(state.core.open.concat([]),function(i,v){n=t.get_node(v);if(n){if(t.is_loaded(v)){if(t.is_closed(v)){t.open_node(v,false,0);
}if(state&&state.core&&state.core.open){$.vakata.array_remove_item(state.core.open,v);}}else{if(!t.is_loading(v)){t.open_node(v,$.proxy(function(){this.set_state(state,callback);
},t),0);}res=false;}}});if(res){delete state.core.open;this.set_state(state,callback);}return false;}if(state.core.scroll){if(state.core.scroll&&state.core.scroll.left!==undefined){this.element.scrollLeft(state.core.scroll.left);
}if(state.core.scroll&&state.core.scroll.top!==undefined){this.element.scrollTop(state.core.scroll.top);}delete state.core.scroll;
this.set_state(state,callback);return false;
/*!
					if(state.core.themes) {
						if(state.core.themes.name) {
							this.set_theme(state.core.themes.name);
						}
						if(typeof state.core.themes.dots !== 'undefined') {
							this[ state.core.themes.dots ? "show_dots" : "hide_dots" ]();
						}
						if(typeof state.core.themes.icons !== 'undefined') {
							this[ state.core.themes.icons ? "show_icons" : "hide_icons" ]();
						}
						delete state.core.themes;
						delete state.core.open;
						this.set_state(state, callback);
						return false;
					}
					*/
}if(state.core.selected){_this=this;
this.deselect_all();$.each(state.core.selected,function(i,v){_this.select_node(v);});delete state.core.selected;this.set_state(state,callback);
return false;}if($.isEmptyObject(state.core)){delete state.core;this.set_state(state,callback);return false;}}if($.isEmptyObject(state)){state=null;
if(callback){callback.call(this);}this.trigger("set_state");return false;}return true;}return false;},refresh:function(skip_loading){this._data.core.state=this.get_state();
this._cnt=0;this._model.data={"#":{id:"#",parent:null,parents:[],children:[],children_d:[],state:{loaded:false}}};var c=this.get_container_ul()[0].className;
if(!skip_loading){this.element.html("<ul class='jstree-container-ul'><li class='jstree-initial-node jstree-loading jstree-leaf jstree-last'><i class='jstree-icon jstree-ocl'></i><a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>"+this.get_string("Loading ...")+"</a></li></ul>");
}this.load_node("#",function(o,s){if(s){this.get_container_ul()[0].className=c;this.set_state($.extend(true,{},this._data.core.state),function(){this.trigger("refresh");
});}this._data.core.state=null;});},set_id:function(obj,id){obj=this.get_node(obj);if(!obj||obj.id==="#"){return false;}var i,j,m=this._model.data;
m[obj.parent].children[$.inArray(obj.id,m[obj.parent].children)]=id;for(i=0,j=obj.parents.length;i<j;i++){m[obj.parents[i]].children_d[$.inArray(obj.id,m[obj.parents[i]].children_d)]=id;
}for(i=0,j=obj.children.length;i<j;i++){m[obj.children[i]].parent=id;}for(i=0,j=obj.children_d.length;i<j;i++){m[obj.children_d[i]].parents[$.inArray(obj.id,m[obj.children_d[i]].parents)]=id;
}i=$.inArray(obj.id,this._data.core.selected);if(i!==-1){this._data.core.selected[i]=id;}i=this.get_node(obj.id,true);if(i){i.attr("id",id);
}delete m[obj.id];obj.id=id;m[id]=obj;return true;},get_text:function(obj){obj=this.get_node(obj);return(!obj||obj.id==="#")?false:obj.text;
},set_text:function(obj,val){var t1,t2,dom,tmp;if($.isArray(obj)){obj=obj.slice();for(t1=0,t2=obj.length;t1<t2;t1++){this.set_text(obj[t1],val);
}return true;}obj=this.get_node(obj);if(!obj||obj.id==="#"){return false;}obj.text=val;dom=this.get_node(obj,true);if(dom.length){dom=dom.children(".jstree-anchor:eq(0)");
tmp=dom.children("I").clone();dom.html(val).prepend(tmp);this.trigger("set_text",{obj:obj,text:val});}return true;},get_json:function(obj,options,flat){obj=this.get_node(obj||"#");
if(!obj){return false;}if(options&&options.flat&&!flat){flat=[];}var tmp={id:obj.id,text:obj.text,icon:this.get_icon(obj),li_attr:obj.li_attr,a_attr:obj.a_attr,state:{},data:options&&options.no_data?false:obj.data},i,j;
if(options&&options.flat){tmp.parent=obj.parent;}else{tmp.children=[];}if(!options||!options.no_state){for(i in obj.state){if(obj.state.hasOwnProperty(i)){tmp.state[i]=obj.state[i];
}}}if(options&&options.no_id){delete tmp.id;if(tmp.li_attr&&tmp.li_attr.id){delete tmp.li_attr.id;}}if(options&&options.flat&&obj.id!=="#"){flat.push(tmp);
}if(!options||!options.no_children){for(i=0,j=obj.children.length;i<j;i++){if(options&&options.flat){this.get_json(obj.children[i],options,flat);
}else{tmp.children.push(this.get_json(obj.children[i],options));}}}return options&&options.flat?flat:(obj.id==="#"?tmp.children:tmp);
},create_node:function(par,node,pos,callback,is_loaded){par=this.get_node(par);if(!par){return false;}pos=pos===undefined?"last":pos;
if(!pos.toString().match(/^(before|after)$/)&&!is_loaded&&!this.is_loaded(par)){return this.load_node(par,function(){this.create_node(par,node,pos,callback,true);
});}if(!node){node={text:this.get_string("New node")};}if(node.text===undefined){node.text=this.get_string("New node");}var tmp,dpc,i,j;
if(par.id==="#"){if(pos==="before"){pos="first";}if(pos==="after"){pos="last";}}switch(pos){case"before":tmp=this.get_node(par.parent);
pos=$.inArray(par.id,tmp.children);par=tmp;break;case"after":tmp=this.get_node(par.parent);pos=$.inArray(par.id,tmp.children)+1;
par=tmp;break;case"inside":case"first":pos=0;break;case"last":pos=par.children.length;break;default:if(!pos){pos=0;}break;
}if(pos>par.children.length){pos=par.children.length;}if(!node.id){node.id=true;}if(!this.check("create_node",node,par,pos)){this.settings.core.error.call(this,this._data.core.last_error);
return false;}if(node.id===true){delete node.id;}node=this._parse_model_from_json(node,par.id,par.parents.concat());if(!node){return false;
}tmp=this.get_node(node);dpc=[];dpc.push(node);dpc=dpc.concat(tmp.children_d);this.trigger("model",{nodes:dpc,parent:par.id});
par.children_d=par.children_d.concat(dpc);for(i=0,j=par.parents.length;i<j;i++){this._model.data[par.parents[i]].children_d=this._model.data[par.parents[i]].children_d.concat(dpc);
}node=tmp;tmp=[];for(i=0,j=par.children.length;i<j;i++){tmp[i>=pos?i+1:i]=par.children[i];}tmp[pos]=node.id;par.children=tmp;
this.redraw_node(par,true);if(callback){callback.call(this,this.get_node(node));}this.trigger("create_node",{node:this.get_node(node),parent:par.id,position:pos});
return node.id;},rename_node:function(obj,val){var t1,t2,old;if($.isArray(obj)){obj=obj.slice();for(t1=0,t2=obj.length;t1<t2;
t1++){this.rename_node(obj[t1],val);}return true;}obj=this.get_node(obj);if(!obj||obj.id==="#"){return false;}old=obj.text;
if(!this.check("rename_node",obj,this.get_parent(obj),val)){this.settings.core.error.call(this,this._data.core.last_error);
return false;}this.set_text(obj,val);this.trigger("rename_node",{node:obj,text:val,old:old});return true;},delete_node:function(obj){var t1,t2,par,pos,tmp,i,j,k,l,c;
if($.isArray(obj)){obj=obj.slice();for(t1=0,t2=obj.length;t1<t2;t1++){this.delete_node(obj[t1]);}return true;}obj=this.get_node(obj);
if(!obj||obj.id==="#"){return false;}par=this.get_node(obj.parent);pos=$.inArray(obj.id,par.children);c=false;if(!this.check("delete_node",obj,par,pos)){this.settings.core.error.call(this,this._data.core.last_error);
return false;}if(pos!==-1){par.children=$.vakata.array_remove(par.children,pos);}tmp=obj.children_d.concat([]);tmp.push(obj.id);
for(k=0,l=tmp.length;k<l;k++){for(i=0,j=obj.parents.length;i<j;i++){pos=$.inArray(tmp[k],this._model.data[obj.parents[i]].children_d);
if(pos!==-1){this._model.data[obj.parents[i]].children_d=$.vakata.array_remove(this._model.data[obj.parents[i]].children_d,pos);
}}if(this._model.data[tmp[k]].state.selected){c=true;pos=$.inArray(tmp[k],this._data.core.selected);if(pos!==-1){this._data.core.selected=$.vakata.array_remove(this._data.core.selected,pos);
}}}this.trigger("delete_node",{node:obj,parent:par.id});if(c){this.trigger("changed",{action:"delete_node",node:obj,selected:this._data.core.selected,parent:par.id});
}for(k=0,l=tmp.length;k<l;k++){delete this._model.data[tmp[k]];}this.redraw_node(par,true);return true;},check:function(chk,obj,par,pos){obj=obj&&obj.id?obj:this.get_node(obj);
par=par&&par.id?par:this.get_node(par);var tmp=chk.match(/^move_node|copy_node|create_node$/i)?par:obj,chc=this.settings.core.check_callback;
if(chk==="move_node"){if(obj.id===par.id||$.inArray(obj.id,par.children)===pos||$.inArray(par.id,obj.children_d)!==-1){this._data.core.last_error={error:"check",plugin:"core",id:"core_01",reason:"Moving parent inside child",data:JSON.stringify({chk:chk,pos:pos,obj:obj&&obj.id?obj.id:false,par:par&&par.id?par.id:false})};
return false;}}tmp=this.get_node(tmp,true);if(tmp.length){tmp=tmp.data("jstree");}if(tmp&&tmp.functions&&(tmp.functions[chk]===false||tmp.functions[chk]===true)){if(tmp.functions[chk]===false){this._data.core.last_error={error:"check",plugin:"core",id:"core_02",reason:"Node data prevents function: "+chk,data:JSON.stringify({chk:chk,pos:pos,obj:obj&&obj.id?obj.id:false,par:par&&par.id?par.id:false})};
}return tmp.functions[chk];}if(chc===false||($.isFunction(chc)&&chc.call(this,chk,obj,par,pos)===false)||(chc&&chc[chk]===false)){this._data.core.last_error={error:"check",plugin:"core",id:"core_03",reason:"User config for core.check_callback prevents function: "+chk,data:JSON.stringify({chk:chk,pos:pos,obj:obj&&obj.id?obj.id:false,par:par&&par.id?par.id:false})};
return false;}return true;},last_error:function(){return this._data.core.last_error;},move_node:function(obj,par,pos,callback,is_loaded){var t1,t2,old_par,new_par,old_ins,is_multi,dpc,tmp,i,j,k,l,p;
if($.isArray(obj)){obj=obj.reverse().slice();for(t1=0,t2=obj.length;t1<t2;t1++){this.move_node(obj[t1],par,pos,callback,is_loaded);
}return true;}obj=obj&&obj.id?obj:this.get_node(obj);par=this.get_node(par);pos=pos===undefined?0:pos;if(!par||!obj||obj.id==="#"){return false;
}if(!pos.toString().match(/^(before|after)$/)&&!is_loaded&&!this.is_loaded(par)){return this.load_node(par,function(){this.move_node(obj,par,pos,callback,true);
});}old_par=(obj.parent||"#").toString();new_par=(!pos.toString().match(/^(before|after)$/)||par.id==="#")?par:this.get_node(par.parent);
old_ins=this._model.data[obj.id]?this:$.jstree.reference(obj.id);is_multi=!old_ins||!old_ins._id||(this._id!==old_ins._id);
if(is_multi){if(this.copy_node(obj,par,pos,callback,is_loaded)){if(old_ins){old_ins.delete_node(obj);}return true;}return false;
}if(new_par.id==="#"){if(pos==="before"){pos="first";}if(pos==="after"){pos="last";}}switch(pos){case"before":pos=$.inArray(par.id,new_par.children);
break;case"after":pos=$.inArray(par.id,new_par.children)+1;break;case"inside":case"first":pos=0;break;case"last":pos=new_par.children.length;
break;default:if(!pos){pos=0;}break;}if(pos>new_par.children.length){pos=new_par.children.length;}if(!this.check("move_node",obj,new_par,pos)){this.settings.core.error.call(this,this._data.core.last_error);
return false;}if(obj.parent===new_par.id){dpc=new_par.children.concat();tmp=$.inArray(obj.id,dpc);if(tmp!==-1){dpc=$.vakata.array_remove(dpc,tmp);
if(pos>tmp){pos--;}}tmp=[];for(i=0,j=dpc.length;i<j;i++){tmp[i>=pos?i+1:i]=dpc[i];}tmp[pos]=obj.id;new_par.children=tmp;this._node_changed(new_par.id);
this.redraw(new_par.id==="#");}else{tmp=obj.children_d.concat();tmp.push(obj.id);for(i=0,j=obj.parents.length;i<j;i++){dpc=[];
p=old_ins._model.data[obj.parents[i]].children_d;for(k=0,l=p.length;k<l;k++){if($.inArray(p[k],tmp)===-1){dpc.push(p[k]);
}}old_ins._model.data[obj.parents[i]].children_d=dpc;}old_ins._model.data[old_par].children=$.vakata.array_remove_item(old_ins._model.data[old_par].children,obj.id);
for(i=0,j=new_par.parents.length;i<j;i++){this._model.data[new_par.parents[i]].children_d=this._model.data[new_par.parents[i]].children_d.concat(tmp);
}dpc=[];for(i=0,j=new_par.children.length;i<j;i++){dpc[i>=pos?i+1:i]=new_par.children[i];}dpc[pos]=obj.id;new_par.children=dpc;
new_par.children_d.push(obj.id);new_par.children_d=new_par.children_d.concat(obj.children_d);obj.parent=new_par.id;tmp=new_par.parents.concat();
tmp.unshift(new_par.id);p=obj.parents.length;obj.parents=tmp;tmp=tmp.concat();for(i=0,j=obj.children_d.length;i<j;i++){this._model.data[obj.children_d[i]].parents=this._model.data[obj.children_d[i]].parents.slice(0,p*-1);
Array.prototype.push.apply(this._model.data[obj.children_d[i]].parents,tmp);}this._node_changed(old_par);this._node_changed(new_par.id);
this.redraw(old_par==="#"||new_par.id==="#");}if(callback){callback.call(this,obj,new_par,pos);}this.trigger("move_node",{node:obj,parent:new_par.id,position:pos,old_parent:old_par,is_multi:is_multi,old_instance:old_ins,new_instance:this});
return true;},copy_node:function(obj,par,pos,callback,is_loaded){var t1,t2,dpc,tmp,i,j,node,old_par,new_par,old_ins,is_multi;
if($.isArray(obj)){obj=obj.reverse().slice();for(t1=0,t2=obj.length;t1<t2;t1++){this.copy_node(obj[t1],par,pos,callback,is_loaded);
}return true;}obj=obj&&obj.id?obj:this.get_node(obj);par=this.get_node(par);pos=pos===undefined?0:pos;if(!par||!obj||obj.id==="#"){return false;
}if(!pos.toString().match(/^(before|after)$/)&&!is_loaded&&!this.is_loaded(par)){return this.load_node(par,function(){this.copy_node(obj,par,pos,callback,true);
});}old_par=(obj.parent||"#").toString();new_par=(!pos.toString().match(/^(before|after)$/)||par.id==="#")?par:this.get_node(par.parent);
old_ins=this._model.data[obj.id]?this:$.jstree.reference(obj.id);is_multi=!old_ins||!old_ins._id||(this._id!==old_ins._id);
if(new_par.id==="#"){if(pos==="before"){pos="first";}if(pos==="after"){pos="last";}}switch(pos){case"before":pos=$.inArray(par.id,new_par.children);
break;case"after":pos=$.inArray(par.id,new_par.children)+1;break;case"inside":case"first":pos=0;break;case"last":pos=new_par.children.length;
break;default:if(!pos){pos=0;}break;}if(pos>new_par.children.length){pos=new_par.children.length;}if(!this.check("copy_node",obj,new_par,pos)){this.settings.core.error.call(this,this._data.core.last_error);
return false;}node=old_ins?old_ins.get_json(obj,{no_id:true,no_data:true,no_state:true}):obj;if(!node){return false;}if(node.id===true){delete node.id;
}node=this._parse_model_from_json(node,new_par.id,new_par.parents.concat());if(!node){return false;}tmp=this.get_node(node);
dpc=[];dpc.push(node);dpc=dpc.concat(tmp.children_d);this.trigger("model",{nodes:dpc,parent:new_par.id});for(i=0,j=new_par.parents.length;
i<j;i++){this._model.data[new_par.parents[i]].children_d=this._model.data[new_par.parents[i]].children_d.concat(dpc);}dpc=[];
for(i=0,j=new_par.children.length;i<j;i++){dpc[i>=pos?i+1:i]=new_par.children[i];}dpc[pos]=tmp.id;new_par.children=dpc;new_par.children_d.push(tmp.id);
new_par.children_d=new_par.children_d.concat(tmp.children_d);this._node_changed(new_par.id);this.redraw(new_par.id==="#");
if(callback){callback.call(this,tmp,new_par,pos);}this.trigger("copy_node",{node:tmp,original:obj,parent:new_par.id,position:pos,old_parent:old_par,is_multi:is_multi,old_instance:old_ins,new_instance:this});
return tmp.id;},cut:function(obj){if(!obj){obj=this._data.core.selected.concat();}if(!$.isArray(obj)){obj=[obj];}if(!obj.length){return false;
}var tmp=[],o,t1,t2;for(t1=0,t2=obj.length;t1<t2;t1++){o=this.get_node(obj[t1]);if(o&&o.id&&o.id!=="#"){tmp.push(o);}}if(!tmp.length){return false;
}ccp_node=tmp;ccp_inst=this;ccp_mode="move_node";this.trigger("cut",{node:obj});},copy:function(obj){if(!obj){obj=this._data.core.selected.concat();
}if(!$.isArray(obj)){obj=[obj];}if(!obj.length){return false;}var tmp=[],o,t1,t2;for(t1=0,t2=obj.length;t1<t2;t1++){o=this.get_node(obj[t1]);
if(o&&o.id&&o.id!=="#"){tmp.push(o);}}if(!tmp.length){return false;}ccp_node=tmp;ccp_inst=this;ccp_mode="copy_node";this.trigger("copy",{node:obj});
},get_buffer:function(){return{mode:ccp_mode,node:ccp_node,inst:ccp_inst};},can_paste:function(){return ccp_mode!==false&&ccp_node!==false;
},paste:function(obj){obj=this.get_node(obj);if(!obj||!ccp_mode||!ccp_mode.match(/^(copy_node|move_node)$/)||!ccp_node){return false;
}if(this[ccp_mode](ccp_node,obj)){this.trigger("paste",{parent:obj.id,node:ccp_node,mode:ccp_mode});}ccp_node=false;ccp_mode=false;
ccp_inst=false;},edit:function(obj,default_text){obj=this._open_to(obj);if(!obj||!obj.length){return false;}var rtl=this._data.core.rtl,w=this.element.width(),a=obj.children(".jstree-anchor"),s=$("<span>")
/*!
				oi = obj.children("i:visible"),
				ai = a.children("i:visible"),
				w1 = oi.width() * oi.length,
				w2 = ai.width() * ai.length,
				*/
,t=typeof default_text==="string"?default_text:this.get_text(obj),h1=$("<div />",{css:{position:"absolute",top:"-200px",left:(rtl?"0px":"-1000px"),visibility:"hidden"}}).appendTo("body"),h2=$("<input />",{value:t,"class":"jstree-rename-input",css:{padding:"0",border:"1px solid silver","box-sizing":"border-box",display:"inline-block",height:(this._data.core.li_height)+"px",lineHeight:(this._data.core.li_height)+"px",width:"150px"},blur:$.proxy(function(){var i=s.children(".jstree-rename-input"),v=i.val();
if(v===""){v=t;}h1.remove();s.replaceWith(a);s.remove();this.set_text(obj,t);if(this.rename_node(obj,v)===false){this.set_text(obj,t);
}},this),keydown:function(event){var key=event.which;if(key===27){this.value=t;}if(key===27||key===13||key===37||key===38||key===39||key===40||key===32){event.stopImmediatePropagation();
}if(key===27||key===13){event.preventDefault();this.blur();}},click:function(e){e.stopImmediatePropagation();},mousedown:function(e){e.stopImmediatePropagation();
},keyup:function(event){h2.width(Math.min(h1.text("pW"+this.value).width(),w));},keypress:function(event){if(event.which===13){return false;
}}}),fn={fontFamily:a.css("fontFamily")||"",fontSize:a.css("fontSize")||"",fontWeight:a.css("fontWeight")||"",fontStyle:a.css("fontStyle")||"",fontStretch:a.css("fontStretch")||"",fontVariant:a.css("fontVariant")||"",letterSpacing:a.css("letterSpacing")||"",wordSpacing:a.css("wordSpacing")||""};
this.set_text(obj,"");s.attr("class",a.attr("class")).append(a.contents().clone()).append(h2);a.replaceWith(s);h1.css(fn);
h2.css(fn).width(Math.min(h1.text("pW"+h2[0].value).width(),w))[0].select();},set_theme:function(theme_name,theme_url){if(!theme_name){return false;
}if(theme_url===true){var dir=this.settings.core.themes.dir;if(!dir){dir=$.jstree.path+"/themes";}theme_url=dir+"/"+theme_name+"/style.css";
}if(theme_url&&$.inArray(theme_url,themes_loaded)===-1){$("head").append('<link rel="stylesheet" href="'+theme_url+'" type="text/css" />');
themes_loaded.push(theme_url);}if(this._data.core.themes.name){this.element.removeClass("jstree-"+this._data.core.themes.name);
}this._data.core.themes.name=theme_name;this.element.addClass("jstree-"+theme_name);this.element[this.settings.core.themes.responsive?"addClass":"removeClass"]("jstree-"+theme_name+"-responsive");
this.trigger("set_theme",{theme:theme_name});},get_theme:function(){return this._data.core.themes.name;},set_theme_variant:function(variant_name){if(this._data.core.themes.variant){this.element.removeClass("jstree-"+this._data.core.themes.name+"-"+this._data.core.themes.variant);
}this._data.core.themes.variant=variant_name;if(variant_name){this.element.addClass("jstree-"+this._data.core.themes.name+"-"+this._data.core.themes.variant);
}},get_theme_variant:function(){return this._data.core.themes.variant;},show_stripes:function(){this._data.core.themes.stripes=true;
this.get_container_ul().addClass("jstree-striped");},hide_stripes:function(){this._data.core.themes.stripes=false;this.get_container_ul().removeClass("jstree-striped");
},toggle_stripes:function(){if(this._data.core.themes.stripes){this.hide_stripes();}else{this.show_stripes();}},show_dots:function(){this._data.core.themes.dots=true;
this.get_container_ul().removeClass("jstree-no-dots");},hide_dots:function(){this._data.core.themes.dots=false;this.get_container_ul().addClass("jstree-no-dots");
},toggle_dots:function(){if(this._data.core.themes.dots){this.hide_dots();}else{this.show_dots();}},show_icons:function(){this._data.core.themes.icons=true;
this.get_container_ul().removeClass("jstree-no-icons");},hide_icons:function(){this._data.core.themes.icons=false;this.get_container_ul().addClass("jstree-no-icons");
},toggle_icons:function(){if(this._data.core.themes.icons){this.hide_icons();}else{this.show_icons();}},set_icon:function(obj,icon){var t1,t2,dom,old;
if($.isArray(obj)){obj=obj.slice();for(t1=0,t2=obj.length;t1<t2;t1++){this.set_icon(obj[t1],icon);}return true;}obj=this.get_node(obj);
if(!obj||obj.id==="#"){return false;}old=obj.icon;obj.icon=icon;dom=this.get_node(obj,true).children(".jstree-anchor").children(".jstree-themeicon");
if(icon===false){this.hide_icon(obj);}else{if(icon===true){dom.removeClass("jstree-themeicon-custom "+old).css("background","").removeAttr("rel");
}else{if(icon.indexOf("/")===-1&&icon.indexOf(".")===-1){dom.removeClass(old).css("background","");dom.addClass(icon+" jstree-themeicon-custom").attr("rel",icon);
}else{dom.removeClass(old).css("background","");dom.addClass("jstree-themeicon-custom").css("background","url('"+icon+"') center center no-repeat").attr("rel",icon);
}}}return true;},get_icon:function(obj){obj=this.get_node(obj);return(!obj||obj.id==="#")?false:obj.icon;},hide_icon:function(obj){var t1,t2;
if($.isArray(obj)){obj=obj.slice();for(t1=0,t2=obj.length;t1<t2;t1++){this.hide_icon(obj[t1]);}return true;}obj=this.get_node(obj);
if(!obj||obj==="#"){return false;}obj.icon=false;this.get_node(obj,true).children("a").children(".jstree-themeicon").addClass("jstree-themeicon-hidden");
return true;},show_icon:function(obj){var t1,t2,dom;if($.isArray(obj)){obj=obj.slice();for(t1=0,t2=obj.length;t1<t2;t1++){this.show_icon(obj[t1]);
}return true;}obj=this.get_node(obj);if(!obj||obj==="#"){return false;}dom=this.get_node(obj,true);obj.icon=dom.length?dom.children("a").children(".jstree-themeicon").attr("rel"):true;
if(!obj.icon){obj.icon=true;}dom.children("a").children(".jstree-themeicon").removeClass("jstree-themeicon-hidden");return true;
}};$.vakata={};$.fn.vakata_reverse=[].reverse;$.vakata.attributes=function(node,with_values){node=$(node)[0];var attr=with_values?{}:[];
if(node&&node.attributes){$.each(node.attributes,function(i,v){if($.inArray(v.nodeName.toLowerCase(),["style","contenteditable","hasfocus","tabindex"])!==-1){return;
}if(v.nodeValue!==null&&$.trim(v.nodeValue)!==""){if(with_values){attr[v.nodeName]=v.nodeValue;}else{attr.push(v.nodeName);
}}});}return attr;};$.vakata.array_unique=function(array){var a=[],i,j,l;for(i=0,l=array.length;i<l;i++){for(j=0;j<=i;j++){if(array[i]===array[j]){break;
}}if(j===i){a.push(array[i]);}}return a;};$.vakata.array_remove=function(array,from,to){var rest=array.slice((to||from)+1||array.length);
array.length=from<0?array.length+from:from;array.push.apply(array,rest);return array;};$.vakata.array_remove_item=function(array,item){var tmp=$.inArray(item,array);
return tmp!==-1?$.vakata.array_remove(array,tmp):array;};(function(){var browser={},b_match=function(ua){ua=ua.toLowerCase();
var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||(ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua))||[];
return{browser:match[1]||"",version:match[2]||"0"};},matched=b_match(window.navigator.userAgent);if(matched.browser){browser[matched.browser]=true;
browser.version=matched.version;}if(browser.chrome){browser.webkit=true;}else{if(browser.webkit){browser.safari=true;}}$.vakata.browser=browser;
}());if($.vakata.browser.msie&&$.vakata.browser.version<8){$.jstree.defaults.core.animation=0;}var _i=document.createElement("I");
_i.className="jstree-icon jstree-checkbox";$.jstree.defaults.checkbox={visible:true,three_state:true,whole_node:true,keep_selected_style:true};
$.jstree.plugins.checkbox=function(options,parent){this.bind=function(){parent.bind.call(this);this._data.checkbox.uto=false;
this.element.on("init.jstree",$.proxy(function(){this._data.checkbox.visible=this.settings.checkbox.visible;if(!this.settings.checkbox.keep_selected_style){this.element.addClass("jstree-checkbox-no-clicked");
}},this)).on("loading.jstree",$.proxy(function(){this[this._data.checkbox.visible?"show_checkboxes":"hide_checkboxes"]();
},this));if(this.settings.checkbox.three_state){this.element.on("changed.jstree move_node.jstree copy_node.jstree redraw.jstree open_node.jstree",$.proxy(function(){if(this._data.checkbox.uto){clearTimeout(this._data.checkbox.uto);
}this._data.checkbox.uto=setTimeout($.proxy(this._undetermined,this),50);},this)).on("model.jstree",$.proxy(function(e,data){var m=this._model.data,p=m[data.parent],dpc=data.nodes,chd=[],c,i,j,k,l,tmp;
if(p.state.selected){for(i=0,j=dpc.length;i<j;i++){m[dpc[i]].state.selected=true;}this._data.core.selected=this._data.core.selected.concat(dpc);
}else{for(i=0,j=dpc.length;i<j;i++){if(m[dpc[i]].state.selected){for(k=0,l=m[dpc[i]].children_d.length;k<l;k++){m[m[dpc[i]].children_d[k]].state.selected=true;
}this._data.core.selected=this._data.core.selected.concat(m[dpc[i]].children_d);}}}for(i=0,j=p.children_d.length;i<j;i++){if(!m[p.children_d[i]].children.length){chd.push(m[p.children_d[i]].parent);
}}chd=$.vakata.array_unique(chd);for(k=0,l=chd.length;k<l;k++){p=m[chd[k]];while(p&&p.id!=="#"){c=0;for(i=0,j=p.children.length;
i<j;i++){c+=m[p.children[i]].state.selected;}if(c===j){p.state.selected=true;this._data.core.selected.push(p.id);tmp=this.get_node(p,true);
if(tmp&&tmp.length){tmp.children(".jstree-anchor").addClass("jstree-clicked");}}else{break;}p=this.get_node(p.parent);}}this._data.core.selected=$.vakata.array_unique(this._data.core.selected);
},this)).on("select_node.jstree",$.proxy(function(e,data){var obj=data.node,m=this._model.data,par=this.get_node(obj.parent),dom=this.get_node(obj,true),i,j,c,tmp;
this._data.core.selected=$.vakata.array_unique(this._data.core.selected.concat(obj.children_d));for(i=0,j=obj.children_d.length;
i<j;i++){m[obj.children_d[i]].state.selected=true;}while(par&&par.id!=="#"){c=0;for(i=0,j=par.children.length;i<j;i++){c+=m[par.children[i]].state.selected;
}if(c===j){par.state.selected=true;this._data.core.selected.push(par.id);tmp=this.get_node(par,true);if(tmp&&tmp.length){tmp.children(".jstree-anchor").addClass("jstree-clicked");
}}else{break;}par=this.get_node(par.parent);}if(dom.length){dom.find(".jstree-anchor").addClass("jstree-clicked");}},this)).on("deselect_node.jstree",$.proxy(function(e,data){var obj=data.node,dom=this.get_node(obj,true),i,j,tmp;
for(i=0,j=obj.children_d.length;i<j;i++){this._model.data[obj.children_d[i]].state.selected=false;}for(i=0,j=obj.parents.length;
i<j;i++){this._model.data[obj.parents[i]].state.selected=false;tmp=this.get_node(obj.parents[i],true);if(tmp&&tmp.length){tmp.children(".jstree-anchor").removeClass("jstree-clicked");
}}tmp=[];for(i=0,j=this._data.core.selected.length;i<j;i++){if($.inArray(this._data.core.selected[i],obj.children_d)===-1&&$.inArray(this._data.core.selected[i],obj.parents)===-1){tmp.push(this._data.core.selected[i]);
}}this._data.core.selected=$.vakata.array_unique(tmp);if(dom.length){dom.find(".jstree-anchor").removeClass("jstree-clicked");
}},this)).on("delete_node.jstree",$.proxy(function(e,data){var p=this.get_node(data.parent),m=this._model.data,i,j,c,tmp;
while(p&&p.id!=="#"){c=0;for(i=0,j=p.children.length;i<j;i++){c+=m[p.children[i]].state.selected;}if(c===j){p.state.selected=true;
this._data.core.selected.push(p.id);tmp=this.get_node(p,true);if(tmp&&tmp.length){tmp.children(".jstree-anchor").addClass("jstree-clicked");
}}else{break;}p=this.get_node(p.parent);}},this)).on("move_node.jstree",$.proxy(function(e,data){var is_multi=data.is_multi,old_par=data.old_parent,new_par=this.get_node(data.parent),m=this._model.data,p,c,i,j,tmp;
if(!is_multi){p=this.get_node(old_par);while(p&&p.id!=="#"){c=0;for(i=0,j=p.children.length;i<j;i++){c+=m[p.children[i]].state.selected;
}if(c===j){p.state.selected=true;this._data.core.selected.push(p.id);tmp=this.get_node(p,true);if(tmp&&tmp.length){tmp.children(".jstree-anchor").addClass("jstree-clicked");
}}else{break;}p=this.get_node(p.parent);}}p=new_par;while(p&&p.id!=="#"){c=0;for(i=0,j=p.children.length;i<j;i++){c+=m[p.children[i]].state.selected;
}if(c===j){if(!p.state.selected){p.state.selected=true;this._data.core.selected.push(p.id);tmp=this.get_node(p,true);if(tmp&&tmp.length){tmp.children(".jstree-anchor").addClass("jstree-clicked");
}}}else{if(p.state.selected){p.state.selected=false;this._data.core.selected=$.vakata.array_remove_item(this._data.core.selected,p.id);
tmp=this.get_node(p,true);if(tmp&&tmp.length){tmp.children(".jstree-anchor").removeClass("jstree-clicked");}}else{break;}}p=this.get_node(p.parent);
}},this));}};this._undetermined=function(){var i,j,m=this._model.data,s=this._data.core.selected,p=[],t=this;for(i=0,j=s.length;
i<j;i++){if(m[s[i]]&&m[s[i]].parents){p=p.concat(m[s[i]].parents);}}this.element.find(".jstree-closed").not(":has(ul)").each(function(){var tmp=t.get_node(this);
if(!tmp.state.loaded&&tmp.original&&tmp.original.state&&tmp.original.state.undetermined&&tmp.original.state.undetermined===true){p.push(tmp.id);
p=p.concat(tmp.parents);}});p=$.vakata.array_unique(p);i=$.inArray("#",p);if(i!==-1){p=$.vakata.array_remove(p,i);}this.element.find(".jstree-undetermined").removeClass("jstree-undetermined");
for(i=0,j=p.length;i<j;i++){if(!m[p[i]].state.selected){s=this.get_node(p[i],true);if(s&&s.length){s.children("a").children(".jstree-checkbox").addClass("jstree-undetermined");
}}}};this.redraw_node=function(obj,deep,is_callback){obj=parent.redraw_node.call(this,obj,deep,is_callback);if(obj){var tmp=obj.getElementsByTagName("A")[0];
tmp.insertBefore(_i.cloneNode(),tmp.childNodes[0]);}if(!is_callback&&this.settings.checkbox.three_state){if(this._data.checkbox.uto){clearTimeout(this._data.checkbox.uto);
}this._data.checkbox.uto=setTimeout($.proxy(this._undetermined,this),50);}return obj;};this.activate_node=function(obj,e){if(this.settings.checkbox.whole_node||$(e.target).hasClass("jstree-checkbox")){e.ctrlKey=true;
}return parent.activate_node.call(this,obj,e);};this.show_checkboxes=function(){this._data.core.themes.checkboxes=true;this.element.children("ul").removeClass("jstree-no-checkboxes");
};this.hide_checkboxes=function(){this._data.core.themes.checkboxes=false;this.element.children("ul").addClass("jstree-no-checkboxes");
};this.toggle_checkboxes=function(){if(this._data.core.themes.checkboxes){this.hide_checkboxes();}else{this.show_checkboxes();
}};};$.jstree.defaults.contextmenu={select_node:true,show_at_node:true,items:function(o,cb){return{create:{separator_before:false,separator_after:true,_disabled:false,label:"Create",action:function(data){var inst=$.jstree.reference(data.reference),obj=inst.get_node(data.reference);
inst.create_node(obj,{},"last",function(new_node){setTimeout(function(){inst.edit(new_node);},0);});}},rename:{separator_before:false,separator_after:false,_disabled:false,label:"Rename",action:function(data){var inst=$.jstree.reference(data.reference),obj=inst.get_node(data.reference);
inst.edit(obj);}},remove:{separator_before:false,icon:false,separator_after:false,_disabled:false,label:"Delete",action:function(data){var inst=$.jstree.reference(data.reference),obj=inst.get_node(data.reference);
if(inst.is_selected(obj)){inst.delete_node(inst.get_selected());}else{inst.delete_node(obj);}}},ccp:{separator_before:true,icon:false,separator_after:false,label:"Edit",action:false,submenu:{cut:{separator_before:false,separator_after:false,label:"Cut",action:function(data){var inst=$.jstree.reference(data.reference),obj=inst.get_node(data.reference);
if(inst.is_selected(obj)){inst.cut(inst.get_selected());}else{inst.cut(obj);}}},copy:{separator_before:false,icon:false,separator_after:false,label:"Copy",action:function(data){var inst=$.jstree.reference(data.reference),obj=inst.get_node(data.reference);
if(inst.is_selected(obj)){inst.copy(inst.get_selected());}else{inst.copy(obj);}}},paste:{separator_before:false,icon:false,_disabled:function(data){return !$.jstree.reference(data.reference).can_paste();
},separator_after:false,label:"Paste",action:function(data){var inst=$.jstree.reference(data.reference),obj=inst.get_node(data.reference);
inst.paste(obj);}}}}};}};$.jstree.plugins.contextmenu=function(options,parent){this.bind=function(){parent.bind.call(this);
this.element.on("contextmenu.jstree",".jstree-anchor",$.proxy(function(e){e.preventDefault();if(!this.is_loading(e.currentTarget)){this.show_contextmenu(e.currentTarget,e.pageX,e.pageY,e);
}},this)).on("click.jstree",".jstree-anchor",$.proxy(function(e){if(this._data.contextmenu.visible){$.vakata.context.hide();
}},this));$(document).on("context_hide.vakata",$.proxy(function(){this._data.contextmenu.visible=false;},this));};this.teardown=function(){if(this._data.contextmenu.visible){$.vakata.context.hide();
}parent.teardown.call(this);};this.show_contextmenu=function(obj,x,y,e){obj=this.get_node(obj);if(!obj||obj.id==="#"){return false;
}var s=this.settings.contextmenu,d=this.get_node(obj,true),a=d.children(".jstree-anchor"),o=false,i=false;if(s.show_at_node||x===undefined||y===undefined){o=a.offset();
x=o.left;y=o.top+this._data.core.li_height;}if(this.settings.contextmenu.select_node&&!this.is_selected(obj)){this.deselect_all();
this.select_node(obj,false,false,e);}i=s.items;if($.isFunction(i)){i=i.call(this,obj,$.proxy(function(i){this._show_contextmenu(obj,x,y,i);
},this));}if($.isPlainObject(i)){this._show_contextmenu(obj,x,y,i);}};this._show_contextmenu=function(obj,x,y,i){var d=this.get_node(obj,true),a=d.children(".jstree-anchor");
$(document).one("context_show.vakata",$.proxy(function(e,data){var cls="jstree-contextmenu jstree-"+this.get_theme()+"-contextmenu";
$(data.element).addClass(cls);},this));this._data.contextmenu.visible=true;$.vakata.context.show(a,{x:x,y:y},i);this.trigger("show_contextmenu",{node:obj,x:x,y:y});
};};(function($){var right_to_left=false,vakata_context={element:false,reference:false,position_x:0,position_y:0,items:[],html:"",is_visible:false};
$.vakata.context={settings:{hide_onmouseleave:0,icons:true},_trigger:function(event_name){$(document).triggerHandler("context_"+event_name+".vakata",{reference:vakata_context.reference,element:vakata_context.element,position:{x:vakata_context.position_x,y:vakata_context.position_y}});
},_execute:function(i){i=vakata_context.items[i];return i&&(!i._disabled||($.isFunction(i._disabled)&&!i._disabled({item:i,reference:vakata_context.reference,element:vakata_context.element})))&&i.action?i.action.call(null,{item:i,reference:vakata_context.reference,element:vakata_context.element,position:{x:vakata_context.position_x,y:vakata_context.position_y}}):false;
},_parse:function(o,is_callback){if(!o){return false;}if(!is_callback){vakata_context.html="";vakata_context.items=[];}var str="",sep=false,tmp;
if(is_callback){str+="<ul>";}$.each(o,function(i,val){if(!val){return true;}vakata_context.items.push(val);if(!sep&&val.separator_before){str+="<li class='vakata-context-separator'><a href='#' "+($.vakata.context.settings.icons?"":'style="margin-left:0px;"')+">&#160;</a></li>";
}sep=false;str+="<li class='"+(val._class||"")+(val._disabled===true||($.isFunction(val._disabled)&&val._disabled({item:val,reference:vakata_context.reference,element:vakata_context.element}))?" vakata-contextmenu-disabled ":"")+"' "+(val.shortcut?" data-shortcut='"+val.shortcut+"' ":"")+">";
str+="<a href='#' rel='"+(vakata_context.items.length-1)+"'>";if($.vakata.context.settings.icons){str+="<i ";if(val.icon){if(val.icon.indexOf("/")!==-1||val.icon.indexOf(".")!==-1){str+=" style='background:url(\""+val.icon+"\") center center no-repeat' ";
}else{str+=" class='"+val.icon+"' ";}}str+="></i><span class='vakata-contextmenu-sep'>&#160;</span>";}str+=val.label+(val.shortcut?' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-'+val.shortcut+'">'+(val.shortcut_label||"")+"</span>":"")+"</a>";
if(val.submenu){tmp=$.vakata.context._parse(val.submenu,true);if(tmp){str+=tmp;}}str+="</li>";if(val.separator_after){str+="<li class='vakata-context-separator'><a href='#' "+($.vakata.context.settings.icons?"":'style="margin-left:0px;"')+">&#160;</a></li>";
sep=true;}});str=str.replace(/<li class\='vakata-context-separator'\><\/li\>$/,"");if(is_callback){str+="</ul>";}if(!is_callback){vakata_context.html=str;
$.vakata.context._trigger("parse");}return str.length>10?str:false;},_show_submenu:function(o){o=$(o);if(!o.length||!o.children("ul").length){return;
}var e=o.children("ul"),x=o.offset().left+o.outerWidth(),y=o.offset().top,w=e.width(),h=e.height(),dw=$(window).width()+$(window).scrollLeft(),dh=$(window).height()+$(window).scrollTop();
if(right_to_left){o[x-(w+10+o.outerWidth())<0?"addClass":"removeClass"]("vakata-context-left");}else{o[x+w+10>dw?"addClass":"removeClass"]("vakata-context-right");
}if(y+h+10>dh){e.css("bottom","-1px");}e.show();},show:function(reference,position,data){var o,e,x,y,w,h,dw,dh,cond=true;
if(vakata_context.element&&vakata_context.element.length){vakata_context.element.width("");}switch(cond){case (!position&&!reference):return false;
case (!!position&&!!reference):vakata_context.reference=reference;vakata_context.position_x=position.x;vakata_context.position_y=position.y;
break;case (!position&&!!reference):vakata_context.reference=reference;o=reference.offset();vakata_context.position_x=o.left+reference.outerHeight();
vakata_context.position_y=o.top;break;case (!!position&&!reference):vakata_context.position_x=position.x;vakata_context.position_y=position.y;
break;}if(!!reference&&!data&&$(reference).data("vakata_contextmenu")){data=$(reference).data("vakata_contextmenu");}if($.vakata.context._parse(data)){vakata_context.element.html(vakata_context.html);
}if(vakata_context.items.length){e=vakata_context.element;x=vakata_context.position_x;y=vakata_context.position_y;w=e.width();
h=e.height();dw=$(window).width()+$(window).scrollLeft();dh=$(window).height()+$(window).scrollTop();if(right_to_left){x-=e.outerWidth();
if(x<$(window).scrollLeft()+20){x=$(window).scrollLeft()+20;}}if(x+w+20>dw){x=dw-(w+20);}if(y+h+20>dh){y=dh-(h+20);}vakata_context.element.css({left:x,top:y}).show().find("a:eq(0)").focus().parent().addClass("vakata-context-hover");
vakata_context.is_visible=true;$.vakata.context._trigger("show");}},hide:function(){if(vakata_context.is_visible){vakata_context.element.hide().find("ul").hide().end().find(":focus").blur();
vakata_context.is_visible=false;$.vakata.context._trigger("hide");}}};$(function(){right_to_left=$("body").css("direction")==="rtl";
var to=false;vakata_context.element=$("<ul class='vakata-context'></ul>");vakata_context.element.on("mouseenter","li",function(e){e.stopImmediatePropagation();
if($.contains(this,e.relatedTarget)){return;}if(to){clearTimeout(to);}vakata_context.element.find(".vakata-context-hover").removeClass("vakata-context-hover").end();
$(this).siblings().find("ul").hide().end().end().parentsUntil(".vakata-context","li").addBack().addClass("vakata-context-hover");
$.vakata.context._show_submenu(this);}).on("mouseleave","li",function(e){if($.contains(this,e.relatedTarget)){return;}$(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover");
}).on("mouseleave",function(e){$(this).find(".vakata-context-hover").removeClass("vakata-context-hover");if($.vakata.context.settings.hide_onmouseleave){to=setTimeout((function(t){return function(){$.vakata.context.hide();
};}(this)),$.vakata.context.settings.hide_onmouseleave);}}).on("click","a",function(e){e.preventDefault();}).on("mouseup","a",function(e){if(!$(this).blur().parent().hasClass("vakata-context-disabled")&&$.vakata.context._execute($(this).attr("rel"))!==false){$.vakata.context.hide();
}}).on("keydown","a",function(e){var o=null;switch(e.which){case 13:case 32:e.type="mouseup";e.preventDefault();$(e.currentTarget).trigger(e);
break;case 37:if(vakata_context.is_visible){vakata_context.element.find(".vakata-context-hover").last().parents("li:eq(0)").find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children("a").focus();
e.stopImmediatePropagation();e.preventDefault();}break;case 38:if(vakata_context.is_visible){o=vakata_context.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first();
if(!o.length){o=vakata_context.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last();
}o.addClass("vakata-context-hover").children("a").focus();e.stopImmediatePropagation();e.preventDefault();}break;case 39:if(vakata_context.is_visible){vakata_context.element.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children("a").focus();
e.stopImmediatePropagation();e.preventDefault();}break;case 40:if(vakata_context.is_visible){o=vakata_context.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first();
if(!o.length){o=vakata_context.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first();
}o.addClass("vakata-context-hover").children("a").focus();e.stopImmediatePropagation();e.preventDefault();}break;case 27:$.vakata.context.hide();
e.preventDefault();break;default:break;}}).on("keydown",function(e){e.preventDefault();var a=vakata_context.element.find(".vakata-contextmenu-shortcut-"+e.which).parent();
if(a.parent().not(".vakata-context-disabled")){a.mouseup();}}).appendTo("body");$(document).on("mousedown",function(e){if(vakata_context.is_visible&&!$.contains(vakata_context.element[0],e.target)){$.vakata.context.hide();
}}).on("context_show.vakata",function(e,data){vakata_context.element.find("li:has(ul)").children("a").addClass("vakata-context-parent");
if(right_to_left){vakata_context.element.addClass("vakata-context-rtl").css("direction","rtl");}vakata_context.element.find("ul").hide().end();
});});}($));$.jstree.defaults.dnd={copy:true,open_timeout:500,is_draggable:true,check_while_dragging:true};$.jstree.plugins.dnd=function(options,parent){this.bind=function(){parent.bind.call(this);
this.element.on("mousedown touchstart",".jstree-anchor",$.proxy(function(e){var obj=this.get_node(e.target),mlt=this.is_selected(obj)?this.get_selected().length:1;
if(obj&&obj.id&&obj.id!=="#"&&(e.which===1||e.type==="touchstart")&&(this.settings.dnd.is_draggable===true||($.isFunction(this.settings.dnd.is_draggable)&&this.settings.dnd.is_draggable.call(this,obj)))){this.element.trigger("mousedown.jstree");
return $.vakata.dnd.start(e,{jstree:true,origin:this,obj:this.get_node(obj,true),nodes:mlt>1?this.get_selected():[obj.id]},'<div id="jstree-dnd" class="jstree-'+this.get_theme()+'"><i class="jstree-icon jstree-er"></i>'+(mlt>1?mlt+" "+this.get_string("nodes"):this.get_text(e.currentTarget,true))+'<ins class="jstree-copy" style="display:none;">+</ins></div>');
}},this));};};$(function(){var lastmv=false,laster=false,opento=false,marker=$('<div id="jstree-marker">&#160;</div>').hide().appendTo("body");
$(document).bind("dnd_start.vakata",function(e,data){lastmv=false;}).bind("dnd_move.vakata",function(e,data){if(opento){clearTimeout(opento);
}if(!data.data.jstree){return;}if(data.event.target.id&&data.event.target.id==="jstree-marker"){return;}var ins=$.jstree.reference(data.event.target),ref=false,off=false,rel=false,l,t,h,p,i,o,ok,t1,t2,op,ps,pr;
if(ins&&ins._data&&ins._data.dnd){marker.attr("class","jstree-"+ins.get_theme());data.helper.children().attr("class","jstree-"+ins.get_theme()).find(".jstree-copy:eq(0)")[data.data.origin&&data.data.origin.settings.dnd.copy&&(data.event.metaKey||data.event.ctrlKey)?"show":"hide"]();
if((data.event.target===ins.element[0]||data.event.target===ins.get_container_ul()[0])&&ins.get_container_ul().children().length===0){ok=true;
for(t1=0,t2=data.data.nodes.length;t1<t2;t1++){ok=ok&&ins.check((data.data.origin&&data.data.origin.settings.dnd.copy&&(data.event.metaKey||data.event.ctrlKey)?"copy_node":"move_node"),(data.data.origin&&data.data.origin!==ins?data.data.origin.get_node(data.data.nodes[t1]):data.data.nodes[t1]),"#","last");
if(!ok){break;}}if(ok){lastmv={ins:ins,par:"#",pos:"last"};marker.hide();data.helper.find(".jstree-icon:eq(0)").removeClass("jstree-er").addClass("jstree-ok");
return;}}else{ref=$(data.event.target).closest("a");if(ref&&ref.length&&ref.parent().is(".jstree-closed, .jstree-open, .jstree-leaf")){off=ref.offset();
rel=data.event.pageY-off.top;h=ref.height();if(rel<h/3){o=["b","i","a"];}else{if(rel>h-h/3){o=["a","i","b"];}else{o=rel>h/2?["i","a","b"]:["i","b","a"];
}}$.each(o,function(j,v){switch(v){case"b":l=off.left-6;t=off.top-5;p=ins.get_parent(ref);i=ref.parent().index();break;case"i":l=off.left-2;
t=off.top-5+h/2+1;p=ref.parent();i=0;break;case"a":l=off.left-6;t=off.top-5+h;p=ins.get_parent(ref);i=ref.parent().index()+1;
break;}
/*!
								// TODO: moving inside, but the node is not yet loaded?
								// the check will work anyway, as when moving the node will be loaded first and checked again
								if(v === 'i' && !ins.is_loaded(p)) { }
								*/
ok=true;
for(t1=0,t2=data.data.nodes.length;t1<t2;t1++){op=data.data.origin&&data.data.origin.settings.dnd.copy&&(data.event.metaKey||data.event.ctrlKey)?"copy_node":"move_node";
ps=i;if(op==="move_node"&&v==="a"&&(data.data.origin&&data.data.origin===ins)&&p===ins.get_parent(data.data.nodes[t1])){pr=ins.get_node(p);
if(ps>$.inArray(data.data.nodes[t1],pr.children)){ps-=1;}}ok=ok&&((ins&&ins.settings&&ins.settings.dnd&&ins.settings.dnd.check_while_dragging===false)||ins.check(op,(data.data.origin&&data.data.origin!==ins?data.data.origin.get_node(data.data.nodes[t1]):data.data.nodes[t1]),p,ps));
if(!ok){if(ins&&ins.last_error){laster=ins.last_error();}break;}}if(ok){if(v==="i"&&ref.parent().is(".jstree-closed")&&ins.settings.dnd.open_timeout){opento=setTimeout((function(x,z){return function(){x.open_node(z);
};}(ins,ref)),ins.settings.dnd.open_timeout);}lastmv={ins:ins,par:p,pos:i};marker.css({left:l+"px",top:t+"px"}).show();data.helper.find(".jstree-icon:eq(0)").removeClass("jstree-er").addClass("jstree-ok");
laster={};o=true;return false;}});if(o===true){return;}}}}lastmv=false;data.helper.find(".jstree-icon").removeClass("jstree-ok").addClass("jstree-er");
marker.hide();}).bind("dnd_scroll.vakata",function(e,data){if(!data.data.jstree){return;}marker.hide();lastmv=false;data.helper.find(".jstree-icon:eq(0)").removeClass("jstree-ok").addClass("jstree-er");
}).bind("dnd_stop.vakata",function(e,data){if(opento){clearTimeout(opento);}if(!data.data.jstree){return;}marker.hide();var i,j,nodes=[];
if(lastmv){for(i=0,j=data.data.nodes.length;i<j;i++){nodes[i]=data.data.origin?data.data.origin.get_node(data.data.nodes[i]):data.data.nodes[i];
}lastmv.ins[data.data.origin&&data.data.origin.settings.dnd.copy&&(data.event.metaKey||data.event.ctrlKey)?"copy_node":"move_node"](nodes,lastmv.par,lastmv.pos);
}else{i=$(data.event.target).closest(".jstree");if(i.length&&laster&&laster.error&&laster.error==="check"){i=i.jstree(true);
if(i){i.settings.core.error.call(this,laster);}}}}).bind("keyup keydown",function(e,data){data=$.vakata.dnd._get();if(data.data&&data.data.jstree){data.helper.find(".jstree-copy:eq(0)")[data.data.origin&&data.data.origin.settings.dnd.copy&&(e.metaKey||e.ctrlKey)?"show":"hide"]();
}});});(function($){$.fn.vakata_reverse=[].reverse;var vakata_dnd={element:false,is_down:false,is_drag:false,helper:false,helper_w:0,data:false,init_x:0,init_y:0,scroll_l:0,scroll_t:0,scroll_e:false,scroll_i:false};
$.vakata.dnd={settings:{scroll_speed:10,scroll_proximity:20,helper_left:5,helper_top:10,threshold:5},_trigger:function(event_name,e){var data=$.vakata.dnd._get();
data.event=e;$(document).triggerHandler("dnd_"+event_name+".vakata",data);},_get:function(){return{data:vakata_dnd.data,element:vakata_dnd.element,helper:vakata_dnd.helper};
},_clean:function(){if(vakata_dnd.helper){vakata_dnd.helper.remove();}if(vakata_dnd.scroll_i){clearInterval(vakata_dnd.scroll_i);
vakata_dnd.scroll_i=false;}vakata_dnd={element:false,is_down:false,is_drag:false,helper:false,helper_w:0,data:false,init_x:0,init_y:0,scroll_l:0,scroll_t:0,scroll_e:false,scroll_i:false};
$(document).off("mousemove touchmove",$.vakata.dnd.drag);$(document).off("mouseup touchend",$.vakata.dnd.stop);},_scroll:function(init_only){if(!vakata_dnd.scroll_e||(!vakata_dnd.scroll_l&&!vakata_dnd.scroll_t)){if(vakata_dnd.scroll_i){clearInterval(vakata_dnd.scroll_i);
vakata_dnd.scroll_i=false;}return false;}if(!vakata_dnd.scroll_i){vakata_dnd.scroll_i=setInterval($.vakata.dnd._scroll,100);
return false;}if(init_only===true){return false;}var i=vakata_dnd.scroll_e.scrollTop(),j=vakata_dnd.scroll_e.scrollLeft();
vakata_dnd.scroll_e.scrollTop(i+vakata_dnd.scroll_t*$.vakata.dnd.settings.scroll_speed);vakata_dnd.scroll_e.scrollLeft(j+vakata_dnd.scroll_l*$.vakata.dnd.settings.scroll_speed);
if(i!==vakata_dnd.scroll_e.scrollTop()||j!==vakata_dnd.scroll_e.scrollLeft()){$.vakata.dnd._trigger("scroll",vakata_dnd.scroll_e);
}},start:function(e,data,html){if(e.type==="touchstart"&&e.originalEvent&&e.originalEvent.changedTouches&&e.originalEvent.changedTouches[0]){e.pageX=e.originalEvent.changedTouches[0].pageX;
e.pageY=e.originalEvent.changedTouches[0].pageY;e.target=document.elementFromPoint(e.originalEvent.changedTouches[0].pageX-window.pageXOffset,e.originalEvent.changedTouches[0].pageY-window.pageYOffset);
}if(vakata_dnd.is_drag){$.vakata.dnd.stop({});}try{e.currentTarget.unselectable="on";e.currentTarget.onselectstart=function(){return false;
};if(e.currentTarget.style){e.currentTarget.style.MozUserSelect="none";}}catch(ignore){}vakata_dnd.init_x=e.pageX;vakata_dnd.init_y=e.pageY;
vakata_dnd.data=data;vakata_dnd.is_down=true;vakata_dnd.element=e.currentTarget;if(html!==false){vakata_dnd.helper=$("<div id='vakata-dnd'></div>").html(html).css({display:"block",margin:"0",padding:"0",position:"absolute",top:"-2000px",lineHeight:"16px",zIndex:"10000"});
}$(document).bind("mousemove touchmove",$.vakata.dnd.drag);$(document).bind("mouseup touchend",$.vakata.dnd.stop);return false;
},drag:function(e){if(e.type==="touchmove"&&e.originalEvent&&e.originalEvent.changedTouches&&e.originalEvent.changedTouches[0]){e.pageX=e.originalEvent.changedTouches[0].pageX;
e.pageY=e.originalEvent.changedTouches[0].pageY;e.target=document.elementFromPoint(e.originalEvent.changedTouches[0].pageX-window.pageXOffset,e.originalEvent.changedTouches[0].pageY-window.pageYOffset);
}if(!vakata_dnd.is_down){return;}if(!vakata_dnd.is_drag){if(Math.abs(e.pageX-vakata_dnd.init_x)>$.vakata.dnd.settings.threshold||Math.abs(e.pageY-vakata_dnd.init_y)>$.vakata.dnd.settings.threshold){if(vakata_dnd.helper){vakata_dnd.helper.appendTo("body");
vakata_dnd.helper_w=vakata_dnd.helper.outerWidth();}vakata_dnd.is_drag=true;$.vakata.dnd._trigger("start",e);}else{return;
}}var d=false,w=false,dh=false,wh=false,dw=false,ww=false,dt=false,dl=false,ht=false,hl=false;vakata_dnd.scroll_t=0;vakata_dnd.scroll_l=0;
vakata_dnd.scroll_e=false;$(e.target).parentsUntil("body").addBack().vakata_reverse().filter(function(){return(/^auto|scroll$/).test($(this).css("overflow"))&&(this.scrollHeight>this.offsetHeight||this.scrollWidth>this.offsetWidth);
}).each(function(){var t=$(this),o=t.offset();if(this.scrollHeight>this.offsetHeight){if(o.top+t.height()-e.pageY<$.vakata.dnd.settings.scroll_proximity){vakata_dnd.scroll_t=1;
}if(e.pageY-o.top<$.vakata.dnd.settings.scroll_proximity){vakata_dnd.scroll_t=-1;}}if(this.scrollWidth>this.offsetWidth){if(o.left+t.width()-e.pageX<$.vakata.dnd.settings.scroll_proximity){vakata_dnd.scroll_l=1;
}if(e.pageX-o.left<$.vakata.dnd.settings.scroll_proximity){vakata_dnd.scroll_l=-1;}}if(vakata_dnd.scroll_t||vakata_dnd.scroll_l){vakata_dnd.scroll_e=$(this);
return false;}});if(!vakata_dnd.scroll_e){d=$(document);w=$(window);dh=d.height();wh=w.height();dw=d.width();ww=w.width();
dt=d.scrollTop();dl=d.scrollLeft();if(dh>wh&&e.pageY-dt<$.vakata.dnd.settings.scroll_proximity){vakata_dnd.scroll_t=-1;}if(dh>wh&&wh-(e.pageY-dt)<$.vakata.dnd.settings.scroll_proximity){vakata_dnd.scroll_t=1;
}if(dw>ww&&e.pageX-dl<$.vakata.dnd.settings.scroll_proximity){vakata_dnd.scroll_l=-1;}if(dw>ww&&ww-(e.pageX-dl)<$.vakata.dnd.settings.scroll_proximity){vakata_dnd.scroll_l=1;
}if(vakata_dnd.scroll_t||vakata_dnd.scroll_l){vakata_dnd.scroll_e=d;}}if(vakata_dnd.scroll_e){$.vakata.dnd._scroll(true);
}if(vakata_dnd.helper){ht=parseInt(e.pageY+$.vakata.dnd.settings.helper_top,10);hl=parseInt(e.pageX+$.vakata.dnd.settings.helper_left,10);
if(dh&&ht+25>dh){ht=dh-50;}if(dw&&hl+vakata_dnd.helper_w>dw){hl=dw-(vakata_dnd.helper_w+2);}vakata_dnd.helper.css({left:hl+"px",top:ht+"px"});
}$.vakata.dnd._trigger("move",e);},stop:function(e){if(e.type==="touchend"&&e.originalEvent&&e.originalEvent.changedTouches&&e.originalEvent.changedTouches[0]){e.pageX=e.originalEvent.changedTouches[0].pageX;
e.pageY=e.originalEvent.changedTouches[0].pageY;e.target=document.elementFromPoint(e.originalEvent.changedTouches[0].pageX-window.pageXOffset,e.originalEvent.changedTouches[0].pageY-window.pageYOffset);
}if(vakata_dnd.is_drag){$.vakata.dnd._trigger("stop",e);}$.vakata.dnd._clean();}};}(jQuery));$.jstree.defaults.search={ajax:false,fuzzy:true,case_sensitive:false,show_only_matches:false,close_opened_onclear:true};
$.jstree.plugins.search=function(options,parent){this.bind=function(){parent.bind.call(this);this._data.search.str="";this._data.search.dom=$();
this._data.search.res=[];this._data.search.opn=[];this._data.search.sln=null;if(this.settings.search.show_only_matches){this.element.on("search.jstree",function(e,data){if(data.nodes.length){$(this).find("li").hide().filter(".jstree-last").filter(function(){return this.nextSibling;
}).removeClass("jstree-last");data.nodes.parentsUntil(".jstree").addBack().show().filter("ul").each(function(){$(this).children("li:visible").eq(-1).addClass("jstree-last");
});}}).on("clear_search.jstree",function(e,data){if(data.nodes.length){$(this).find("li").css("display","").filter(".jstree-last").filter(function(){return this.nextSibling;
}).removeClass("jstree-last");}});}};this.search=function(str,skip_async){if(str===false||$.trim(str)===""){return this.clear_search();
}var s=this.settings.search,a=s.ajax?$.extend({},s.ajax):false,f=null,r=[],p=[],i,j;if(this._data.search.res.length){this.clear_search();
}if(!skip_async&&a!==false){if(!a.data){a.data={};}a.data.str=str;return $.ajax(a).fail($.proxy(function(){this._data.core.last_error={error:"ajax",plugin:"search",id:"search_01",reason:"Could not load search parents",data:JSON.stringify(a)};
this.settings.core.error.call(this,this._data.core.last_error);},this)).done($.proxy(function(d){if(d&&d.d){d=d.d;}this._data.search.sln=!$.isArray(d)?[]:d;
this._search_load(str);},this));}this._data.search.str=str;this._data.search.dom=$();this._data.search.res=[];this._data.search.opn=[];
f=new $.vakata.search(str,true,{caseSensitive:s.case_sensitive,fuzzy:s.fuzzy});$.each(this._model.data,function(i,v){if(v.text&&f.search(v.text).isMatch){r.push(i);
p=p.concat(v.parents);}});if(r.length){p=$.vakata.array_unique(p);this._search_open(p);for(i=0,j=r.length;i<j;i++){f=this.get_node(r[i],true);
if(f){this._data.search.dom=this._data.search.dom.add(f);}}this._data.search.res=r;this._data.search.dom.children(".jstree-anchor").addClass("jstree-search");
}this.trigger("search",{nodes:this._data.search.dom,str:str,res:this._data.search.res});};this.clear_search=function(){this._data.search.dom.children(".jstree-anchor").removeClass("jstree-search");
if(this.settings.search.close_opened_onclear){this.close_node(this._data.search.opn,0);}this.trigger("clear_search",{nodes:this._data.search.dom,str:this._data.search.str,res:this._data.search.res});
this._data.search.str="";this._data.search.res=[];this._data.search.opn=[];this._data.search.dom=$();};this._search_open=function(d){var t=this;
$.each(d.concat([]),function(i,v){v=document.getElementById(v);if(v){if(t.is_closed(v)){t._data.search.opn.push(v.id);t.open_node(v,function(){t._search_open(d);
},0);}}});};this._search_load=function(str){var res=true,t=this,m=t._model.data;if($.isArray(this._data.search.sln)){if(!this._data.search.sln.length){this._data.search.sln=null;
this.search(str,true);}else{$.each(this._data.search.sln,function(i,v){if(m[v]){$.vakata.array_remove_item(t._data.search.sln,v);
if(!m[v].state.loaded){t.load_node(v,function(o,s){if(s){t._search_load(str);}});res=false;}}});if(res){this._data.search.sln=[];
this._search_load(str);}}}};};(function($){$.vakata.search=function(pattern,txt,options){options=options||{};if(options.fuzzy!==false){options.fuzzy=true;
}pattern=options.caseSensitive?pattern:pattern.toLowerCase();var MATCH_LOCATION=options.location||0,MATCH_DISTANCE=options.distance||100,MATCH_THRESHOLD=options.threshold||0.6,patternLen=pattern.length,matchmask,pattern_alphabet,match_bitapScore,search;
if(patternLen>32){options.fuzzy=false;}if(options.fuzzy){matchmask=1<<(patternLen-1);pattern_alphabet=(function(){var mask={},i=0;
for(i=0;i<patternLen;i++){mask[pattern.charAt(i)]=0;}for(i=0;i<patternLen;i++){mask[pattern.charAt(i)]|=1<<(patternLen-i-1);
}return mask;}());match_bitapScore=function(e,x){var accuracy=e/patternLen,proximity=Math.abs(MATCH_LOCATION-x);if(!MATCH_DISTANCE){return proximity?1:accuracy;
}return accuracy+(proximity/MATCH_DISTANCE);};}search=function(text){text=options.caseSensitive?text:text.toLowerCase();if(pattern===text||text.indexOf(pattern)!==-1){return{isMatch:true,score:0};
}if(!options.fuzzy){return{isMatch:false,score:1};}var i,j,textLen=text.length,scoreThreshold=MATCH_THRESHOLD,bestLoc=text.indexOf(pattern,MATCH_LOCATION),binMin,binMid,binMax=patternLen+textLen,lastRd,start,finish,rd,charMatch,score=1,locations=[];
if(bestLoc!==-1){scoreThreshold=Math.min(match_bitapScore(0,bestLoc),scoreThreshold);bestLoc=text.lastIndexOf(pattern,MATCH_LOCATION+patternLen);
if(bestLoc!==-1){scoreThreshold=Math.min(match_bitapScore(0,bestLoc),scoreThreshold);}}bestLoc=-1;for(i=0;i<patternLen;i++){binMin=0;
binMid=binMax;while(binMin<binMid){if(match_bitapScore(i,MATCH_LOCATION+binMid)<=scoreThreshold){binMin=binMid;}else{binMax=binMid;
}binMid=Math.floor((binMax-binMin)/2+binMin);}binMax=binMid;start=Math.max(1,MATCH_LOCATION-binMid+1);finish=Math.min(MATCH_LOCATION+binMid,textLen)+patternLen;
rd=new Array(finish+2);rd[finish+1]=(1<<i)-1;for(j=finish;j>=start;j--){charMatch=pattern_alphabet[text.charAt(j-1)];if(i===0){rd[j]=((rd[j+1]<<1)|1)&charMatch;
}else{rd[j]=((rd[j+1]<<1)|1)&charMatch|(((lastRd[j+1]|lastRd[j])<<1)|1)|lastRd[j+1];}if(rd[j]&matchmask){score=match_bitapScore(i,j-1);
if(score<=scoreThreshold){scoreThreshold=score;bestLoc=j-1;locations.push(bestLoc);if(bestLoc>MATCH_LOCATION){start=Math.max(1,2*MATCH_LOCATION-bestLoc);
}else{break;}}}}if(match_bitapScore(i+1,MATCH_LOCATION)>scoreThreshold){break;}lastRd=rd;}return{isMatch:bestLoc>=0,score:score};
};return txt===true?{search:search}:search(txt);};}(jQuery));$.jstree.defaults.sort=function(a,b){return this.get_text(a)>this.get_text(b)?1:-1;
};$.jstree.plugins.sort=function(options,parent){this.bind=function(){parent.bind.call(this);this.element.on("model.jstree",$.proxy(function(e,data){this.sort(data.parent,true);
},this)).on("rename_node.jstree create_node.jstree",$.proxy(function(e,data){this.sort(data.parent||data.node.parent,false);
this.redraw_node(data.parent||data.node.parent,true);},this)).on("move_node.jstree copy_node.jstree",$.proxy(function(e,data){this.sort(data.parent,false);
this.redraw_node(data.parent,true);},this));};this.sort=function(obj,deep){var i,j;obj=this.get_node(obj);if(obj&&obj.children&&obj.children.length){obj.children.sort($.proxy(this.settings.sort,this));
if(deep){for(i=0,j=obj.children_d.length;i<j;i++){this.sort(obj.children_d[i],false);}}}};};var to=false;$.jstree.defaults.state={key:"jstree",events:"changed.jstree open_node.jstree close_node.jstree",ttl:false,filter:false};
$.jstree.plugins.state=function(options,parent){this.bind=function(){parent.bind.call(this);var bind=$.proxy(function(){this.element.on(this.settings.state.events,$.proxy(function(){if(to){clearTimeout(to);
}to=setTimeout($.proxy(function(){this.save_state();},this),100);},this));},this);this.element.on("ready.jstree",$.proxy(function(e,data){this.element.one("restore_state.jstree",bind);
if(!this.restore_state()){bind();}},this));};this.save_state=function(){var st={state:this.get_state(),ttl:this.settings.state.ttl,sec:+(new Date())};
$.vakata.storage.set(this.settings.state.key,JSON.stringify(st));};this.restore_state=function(){var k=$.vakata.storage.get(this.settings.state.key);
if(!!k){try{k=JSON.parse(k);}catch(ex){return false;}}if(!!k&&k.ttl&&k.sec&&+(new Date())-k.sec>k.ttl){return false;}if(!!k&&k.state){k=k.state;
}if(!!k&&$.isFunction(this.settings.state.filter)){k=this.settings.state.filter.call(this,k);}if(!!k){this.element.one("set_state.jstree",function(e,data){data.instance.trigger("restore_state",{state:$.extend(true,{},k)});
});this.set_state(k);return true;}return false;};this.clear_state=function(){return $.vakata.storage.del(this.settings.state.key);
};};(function($,undefined){$.vakata.storage={set:function(key,val){return window.localStorage.setItem(key,val);},get:function(key){return window.localStorage.getItem(key);
},del:function(key){return window.localStorage.removeItem(key);}};}(jQuery));$.jstree.defaults.types={"#":{},"default":{}};
$.jstree.plugins.types=function(options,parent){this.init=function(el,options){var i,j;if(options&&options.types&&options.types["default"]){for(i in options.types){if(i!=="default"&&i!=="#"&&options.types.hasOwnProperty(i)){for(j in options.types["default"]){if(options.types["default"].hasOwnProperty(j)&&options.types[i][j]===undefined){options.types[i][j]=options.types["default"][j];
}}}}}parent.init.call(this,el,options);this._model.data["#"].type="#";};this.bind=function(){parent.bind.call(this);this.element.on("model.jstree",$.proxy(function(e,data){var m=this._model.data,dpc=data.nodes,t=this.settings.types,i,j,c="default";
for(i=0,j=dpc.length;i<j;i++){c="default";if(m[dpc[i]].original&&m[dpc[i]].original.type&&t[m[dpc[i]].original.type]){c=m[dpc[i]].original.type;
}if(m[dpc[i]].data&&m[dpc[i]].data.jstree&&m[dpc[i]].data.jstree.type&&t[m[dpc[i]].data.jstree.type]){c=m[dpc[i]].data.jstree.type;
}m[dpc[i]].type=c;if(m[dpc[i]].icon===true&&t[c].icon!==undefined){m[dpc[i]].icon=t[c].icon;}}},this));};this.get_json=function(obj,options,flat){var i,j,m=this._model.data,opt=options?$.extend(true,{},options,{no_id:false}):{},tmp=parent.get_json.call(this,obj,opt,flat);
if(tmp===false){return false;}if($.isArray(tmp)){for(i=0,j=tmp.length;i<j;i++){tmp[i].type=tmp[i].id&&m[tmp[i].id]&&m[tmp[i].id].type?m[tmp[i].id].type:"default";
if(options&&options.no_id){delete tmp[i].id;if(tmp[i].li_attr&&tmp[i].li_attr.id){delete tmp[i].li_attr.id;}}}}else{tmp.type=tmp.id&&m[tmp.id]&&m[tmp.id].type?m[tmp.id].type:"default";
if(options&&options.no_id){tmp=this._delete_ids(tmp);}}return tmp;};this._delete_ids=function(tmp){if($.isArray(tmp)){for(var i=0,j=tmp.length;
i<j;i++){tmp[i]=this._delete_ids(tmp[i]);}return tmp;}delete tmp.id;if(tmp.li_attr&&tmp.li_attr.id){delete tmp.li_attr.id;
}if(tmp.children&&$.isArray(tmp.children)){tmp.children=this._delete_ids(tmp.children);}return tmp;};this.check=function(chk,obj,par,pos){if(parent.check.call(this,chk,obj,par,pos)===false){return false;
}obj=obj&&obj.id?obj:this.get_node(obj);par=par&&par.id?par:this.get_node(par);var m=obj&&obj.id?$.jstree.reference(obj.id):null,tmp,d,i,j;
m=m&&m._model&&m._model.data?m._model.data:null;switch(chk){case"create_node":case"move_node":case"copy_node":if(chk!=="move_node"||$.inArray(obj.id,par.children)===-1){tmp=this.get_rules(par);
if(tmp.max_children!==undefined&&tmp.max_children!==-1&&tmp.max_children===par.children.length){this._data.core.last_error={error:"check",plugin:"types",id:"types_01",reason:"max_children prevents function: "+chk,data:JSON.stringify({chk:chk,pos:pos,obj:obj&&obj.id?obj.id:false,par:par&&par.id?par.id:false})};
return false;}if(tmp.valid_children!==undefined&&tmp.valid_children!==-1&&$.inArray(obj.type,tmp.valid_children)===-1){this._data.core.last_error={error:"check",plugin:"types",id:"types_02",reason:"valid_children prevents function: "+chk,data:JSON.stringify({chk:chk,pos:pos,obj:obj&&obj.id?obj.id:false,par:par&&par.id?par.id:false})};
return false;}if(m&&obj.children_d&&obj.parents){d=0;for(i=0,j=obj.children_d.length;i<j;i++){d=Math.max(d,m[obj.children_d[i]].parents.length);
}d=d-obj.parents.length+1;}if(d<=0||d===undefined){d=1;}do{if(tmp.max_depth!==undefined&&tmp.max_depth!==-1&&tmp.max_depth<d){this._data.core.last_error={error:"check",plugin:"types",id:"types_03",reason:"max_depth prevents function: "+chk,data:JSON.stringify({chk:chk,pos:pos,obj:obj&&obj.id?obj.id:false,par:par&&par.id?par.id:false})};
return false;}par=this.get_node(par.parent);tmp=this.get_rules(par);d++;}while(par);}break;}return true;};this.get_rules=function(obj){obj=this.get_node(obj);
if(!obj){return false;}var tmp=this.get_type(obj,true);if(tmp.max_depth===undefined){tmp.max_depth=-1;}if(tmp.max_children===undefined){tmp.max_children=-1;
}if(tmp.valid_children===undefined){tmp.valid_children=-1;}return tmp;};this.get_type=function(obj,rules){obj=this.get_node(obj);
return(!obj)?false:(rules?$.extend({type:obj.type},this.settings.types[obj.type]):obj.type);};this.set_type=function(obj,type){var t,t1,t2,old_type,old_icon;
if($.isArray(obj)){obj=obj.slice();for(t1=0,t2=obj.length;t1<t2;t1++){this.set_type(obj[t1],type);}return true;}t=this.settings.types;
obj=this.get_node(obj);if(!t[type]||!obj){return false;}old_type=obj.type;old_icon=this.get_icon(obj);obj.type=type;if(old_icon===true||(t[old_type]&&t[old_type].icon&&old_icon===t[old_type].icon)){this.set_icon(obj,t[type].icon!==undefined?t[type].icon:true);
}return true;};};$.jstree.plugins.unique=function(options,parent){this.check=function(chk,obj,par,pos){if(parent.check.call(this,chk,obj,par,pos)===false){return false;
}obj=obj&&obj.id?obj:this.get_node(obj);par=par&&par.id?par:this.get_node(par);if(!par||!par.children){return true;}var n=chk==="rename_node"?pos:obj.text,c=[],m=this._model.data,i,j;
for(i=0,j=par.children.length;i<j;i++){c.push(m[par.children[i]].text);}switch(chk){case"delete_node":return true;case"rename_node":case"copy_node":i=($.inArray(n,c)===-1);
if(!i){this._data.core.last_error={error:"check",plugin:"unique",id:"unique_01",reason:"Child with name "+n+" already exists. Preventing: "+chk,data:JSON.stringify({chk:chk,pos:pos,obj:obj&&obj.id?obj.id:false,par:par&&par.id?par.id:false})};
}return i;case"move_node":i=(obj.parent===par.id||$.inArray(n,c)===-1);if(!i){this._data.core.last_error={error:"check",plugin:"unique",id:"unique_01",reason:"Child with name "+n+" already exists. Preventing: "+chk,data:JSON.stringify({chk:chk,pos:pos,obj:obj&&obj.id?obj.id:false,par:par&&par.id?par.id:false})};
}return i;}return true;};};var div=document.createElement("DIV");div.setAttribute("unselectable","on");div.className="jstree-wholerow";
div.innerHTML="&#160;";$.jstree.plugins.wholerow=function(options,parent){this.bind=function(){parent.bind.call(this);this.element.on("loading",$.proxy(function(){div.style.height=this._data.core.li_height+"px";
},this)).on("ready.jstree set_state.jstree",$.proxy(function(){this.hide_dots();},this)).on("ready.jstree",$.proxy(function(){this.get_container_ul().addClass("jstree-wholerow-ul");
},this)).on("deselect_all.jstree",$.proxy(function(e,data){this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked");
},this)).on("changed.jstree",$.proxy(function(e,data){this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked");
var tmp=false,i,j;for(i=0,j=data.selected.length;i<j;i++){tmp=this.get_node(data.selected[i],true);if(tmp&&tmp.length){tmp.children(".jstree-wholerow").addClass("jstree-wholerow-clicked");
}}},this)).on("open_node.jstree",$.proxy(function(e,data){this.get_node(data.node,true).find(".jstree-clicked").parent().children(".jstree-wholerow").addClass("jstree-wholerow-clicked");
},this)).on("hover_node.jstree dehover_node.jstree",$.proxy(function(e,data){this.get_node(data.node,true).children(".jstree-wholerow")[e.type==="hover_node"?"addClass":"removeClass"]("jstree-wholerow-hovered");
},this)).on("contextmenu.jstree",".jstree-wholerow",$.proxy(function(e){e.preventDefault();$(e.currentTarget).closest("li").children("a:eq(0)").trigger("contextmenu",e);
},this)).on("click.jstree",".jstree-wholerow",function(e){e.stopImmediatePropagation();var tmp=$.Event("click",{metaKey:e.metaKey,ctrlKey:e.ctrlKey,altKey:e.altKey,shiftKey:e.shiftKey});
$(e.currentTarget).closest("li").children("a:eq(0)").trigger(tmp).focus();}).on("click.jstree",".jstree-leaf > .jstree-ocl",$.proxy(function(e){e.stopImmediatePropagation();
var tmp=$.Event("click",{metaKey:e.metaKey,ctrlKey:e.ctrlKey,altKey:e.altKey,shiftKey:e.shiftKey});$(e.currentTarget).closest("li").children("a:eq(0)").trigger(tmp).focus();
},this)).on("mouseover.jstree",".jstree-wholerow, .jstree-icon",$.proxy(function(e){e.stopImmediatePropagation();this.hover_node(e.currentTarget);
return false;},this)).on("mouseleave.jstree",".jstree-node",$.proxy(function(e){this.dehover_node(e.currentTarget);},this));
};this.teardown=function(){if(this.settings.wholerow){this.element.find(".jstree-wholerow").remove();}parent.teardown.call(this);
};this.redraw_node=function(obj,deep,callback){obj=parent.redraw_node.call(this,obj,deep,callback);if(obj){var tmp=div.cloneNode(true);
if($.inArray(obj.id,this._data.core.selected)!==-1){tmp.className+=" jstree-wholerow-clicked";}obj.insertBefore(tmp,obj.childNodes[0]);
}return obj;};};}));
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],factory);}else{factory(window.jQuery||window.Zepto);
}}(function($){var Mask=function(el,mask,options){var jMask=this,old_value,regexMask;el=$(el);mask=typeof mask==="function"?mask(el.val(),undefined,el,options):mask;
jMask.init=function(){options=options||{};jMask.byPassKeys=[9,16,17,18,36,37,38,39,40,91];jMask.translation={"0":{pattern:/\d/},"9":{pattern:/\d/,optional:true},"#":{pattern:/\d/,recursive:true},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}};
jMask.translation=$.extend({},jMask.translation,options.translation);jMask=$.extend(true,{},jMask,options);regexMask=p.getRegexMask();
el.each(function(){if(options.maxlength!==false){el.attr("maxlength",mask.length);}if(options.placeholder){el.attr("placeholder",options.placeholder);
}el.attr("autocomplete","off");p.destroyEvents();p.events();var caret=p.getCaret();p.val(p.getMasked());p.setCaret(caret+p.getMaskCharactersBeforeCount(caret,true));
});};var p={getCaret:function(){var sel,pos=0,ctrl=el.get(0),dSel=document.selection,cSelStart=ctrl.selectionStart;if(dSel&&!~navigator.appVersion.indexOf("MSIE 10")){sel=dSel.createRange();
sel.moveStart("character",el.is("input")?-el.val().length:-el.text().length);pos=sel.text.length;}else{if(cSelStart||cSelStart==="0"){pos=cSelStart;
}}return pos;},setCaret:function(pos){if(el.is(":focus")){var range,ctrl=el.get(0);if(ctrl.setSelectionRange){ctrl.setSelectionRange(pos,pos);
}else{if(ctrl.createTextRange){range=ctrl.createTextRange();range.collapse(true);range.moveEnd("character",pos);range.moveStart("character",pos);
range.select();}}}},events:function(){el.on("keydown.mask",function(){old_value=p.val();});el.on("keyup.mask",p.behaviour);
el.on("paste.mask drop.mask",function(){setTimeout(function(){el.keydown().keyup();},100);});el.on("change.mask",function(){el.data("changeCalled",true);
});el.on("blur.mask",function(e){var el=$(e.target);if(el.prop("defaultValue")!==el.val()){el.prop("defaultValue",el.val());
if(!el.data("changeCalled")){el.trigger("change");}}el.data("changeCalled",false);});el.on("focusout.mask",function(){if(options.clearIfNotMatch&&!regexMask.test(p.val())){p.val("");
}});},getRegexMask:function(){var maskChunks=[],translation,pattern,optional,recursive,oRecursive,r;for(var i=0;i<mask.length;
i++){translation=jMask.translation[mask[i]];if(translation){pattern=translation.pattern.toString().replace(/.{1}$|^.{1}/g,"");
optional=translation.optional;recursive=translation.recursive;if(recursive){maskChunks.push(mask[i]);oRecursive={digit:mask[i],pattern:pattern};
}else{maskChunks.push((!optional&&!recursive)?pattern:(pattern+"?"));}}else{maskChunks.push("\\"+mask[i]);}}r=maskChunks.join("");
if(oRecursive){r=r.replace(new RegExp("("+oRecursive.digit+"(.*"+oRecursive.digit+")?)"),"($1)?").replace(new RegExp(oRecursive.digit,"g"),oRecursive.pattern);
}return new RegExp(r);},destroyEvents:function(){el.off("keydown.mask keyup.mask paste.mask drop.mask change.mask blur.mask focusout.mask").removeData("changeCalled");
},val:function(v){var isInput=el.is("input");return arguments.length>0?(isInput?el.val(v):el.text(v)):(isInput?el.val():el.text());
},getMaskCharactersBeforeCount:function(index,onCleanVal){for(var count=0,i=0,maskL=mask.length;i<maskL&&i<index;i++){if(!jMask.translation[mask.charAt(i)]){index=onCleanVal?index+1:index;
count++;}}return count;},determineCaretPos:function(originalCaretPos,oldLength,newLength,maskDif){var translation=jMask.translation[mask.charAt(Math.min(originalCaretPos-1,mask.length-1))];
return !translation?p.determineCaretPos(originalCaretPos+1,oldLength,newLength,maskDif):Math.min(originalCaretPos+newLength-oldLength-maskDif,newLength);
},behaviour:function(e){e=e||window.event;var keyCode=e.keyCode||e.which;if($.inArray(keyCode,jMask.byPassKeys)===-1){var caretPos=p.getCaret(),currVal=p.val(),currValL=currVal.length,changeCaret=caretPos<currValL,newVal=p.getMasked(),newValL=newVal.length,maskDif=p.getMaskCharactersBeforeCount(newValL-1)-p.getMaskCharactersBeforeCount(currValL-1);
if(newVal!==currVal){p.val(newVal);}if(changeCaret&&!(keyCode===65&&e.ctrlKey)){if(!(keyCode===8||keyCode===46)){caretPos=p.determineCaretPos(caretPos,currValL,newValL,maskDif);
}p.setCaret(caretPos);}return p.callbacks(e);}},getMasked:function(skipMaskChars){var buf=[],value=p.val(),m=0,maskLen=mask.length,v=0,valLen=value.length,offset=1,addMethod="push",resetPos=-1,lastMaskChar,check;
if(options.reverse){addMethod="unshift";offset=-1;lastMaskChar=0;m=maskLen-1;v=valLen-1;check=function(){return m>-1&&v>-1;
};}else{lastMaskChar=maskLen-1;check=function(){return m<maskLen&&v<valLen;};}while(check()){var maskDigit=mask.charAt(m),valDigit=value.charAt(v),translation=jMask.translation[maskDigit];
if(translation){if(valDigit.match(translation.pattern)){buf[addMethod](valDigit);if(translation.recursive){if(resetPos===-1){resetPos=m;
}else{if(m===lastMaskChar){m=resetPos-offset;}}if(lastMaskChar===resetPos){m-=offset;}}m+=offset;}else{if(translation.optional){m+=offset;
v-=offset;}}v+=offset;}else{if(!skipMaskChars){buf[addMethod](maskDigit);}if(valDigit===maskDigit){v+=offset;}m+=offset;}}var lastMaskCharDigit=mask.charAt(lastMaskChar);
if(maskLen===valLen+1&&!jMask.translation[lastMaskCharDigit]){buf.push(lastMaskCharDigit);}return buf.join("");},callbacks:function(e){var val=p.val(),changed=p.val()!==old_value;
if(changed===true){if(typeof options.onChange==="function"){options.onChange(val,e,el,options);}}if(changed===true&&typeof options.onKeyPress==="function"){options.onKeyPress(val,e,el,options);
}if(typeof options.onComplete==="function"&&val.length===mask.length){options.onComplete(val,e,el,options);}}};jMask.remove=function(){var caret=p.getCaret(),maskedCharacterCountBefore=p.getMaskCharactersBeforeCount(caret);
p.destroyEvents();p.val(jMask.getCleanVal()).removeAttr("maxlength");p.setCaret(caret-maskedCharacterCountBefore);};jMask.getCleanVal=function(){return p.getMasked(true);
};jMask.init();};$.fn.mask=function(mask,options){this.unmask();return this.each(function(){$(this).data("mask",new Mask(this,mask,options));
});};$.fn.unmask=function(){return this.each(function(){try{$(this).data("mask").remove();}catch(e){}});};$.fn.cleanVal=function(){return $(this).data("mask").getCleanVal();
};$("*[data-mask]").each(function(){var input=$(this),options={},prefix="data-mask-";if(input.attr(prefix+"reverse")==="true"){options.reverse=true;
}if(input.attr(prefix+"maxlength")==="false"){options.maxlength=false;}if(input.attr(prefix+"clearifnotmatch")==="true"){options.clearIfNotMatch=true;
}input.mask(input.attr("data-mask"),options);});}));jQuery.fn.extend({zipcodeMask:function(){return jQuery(this).mask("00000-000");
},phoneMask:function(){var $field=jQuery(this);if(jQuery.ObjectUtils.isUnvalued($field.attr("pattern"))){$field.attr("pattern","\\([0-9]{2}\\)[\\s][0-9]{4}-[0-9]{4,5}");
}return $field.mask("(00) 0000-00009");},cpfMask:function(){return jQuery(this).mask("000.000.000-00");},cnpjMask:function(){return jQuery(this).mask("00.000.000/0000-00");
},dateMask:function(){return jQuery(this).mask("00/00/0000");},timeMask:function(){return jQuery(this).mask("00:00");},datetimeMask:function(){return jQuery(this).mask("00/00/0000 00:00");
},moneyMask:function(){return jQuery(this).mask("#.##0,00",{reverse:true,maxlength:false});},integerMask:function(){return jQuery(this).mask("#0",{reverse:true,maxlength:false});
}});jQuery.extend({zipcodeMask:function(){jQuery('.zipcode:input[type="text"]').zipcodeMask();},phoneMask:function(){jQuery('.phone:input[type="text"]').phoneMask();
},cpfMask:function(){jQuery('.cpf:input[type="text"]').cpfMask();},cnpjMask:function(){jQuery('.cnpj:input[type="text"]').cnpjMask();
},dateMask:function(){jQuery('.date:input[type="text"]').dateMask();},timeMask:function(){jQuery('.time:input[type="text"]').timeMask();
},datetimeMask:function(){jQuery('.datetime:input[type="text"]').datetimeMask();},moneyMask:function(){jQuery('.money:input[type="text"]').moneyMask();
},integerMask:function(){jQuery('.integer:input[type="text"]').integerMask();},allMasks:function(){jQuery.zipcodeMask();jQuery.phoneMask();
jQuery.cpfMask();jQuery.cnpjMask();jQuery.dateMask();jQuery.timeMask();jQuery.datetimeMask();jQuery.moneyMask();jQuery.integerMask();
}});jQuery(document).ready(function(){jQuery.allMasks();});
/*!
 * jQuery Migrate - v1.2.1 - 2013-05-08
 * Copyright 2013 jQuery Foundation and other contributors
 * https://github.com/jquery/jquery-migrate
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function(jQuery,window,undefined){var warnedAbout={};
jQuery.migrateWarnings=[];if(!jQuery.migrateMute&&window.console&&window.console.log){window.console.log("JQMIGRATE: Logging is active");
}if(jQuery.migrateTrace===undefined){jQuery.migrateTrace=true;}jQuery.migrateReset=function(){warnedAbout={};jQuery.migrateWarnings.length=0;
};function migrateWarn(msg){var console=window.console;if(!warnedAbout[msg]){warnedAbout[msg]=true;jQuery.migrateWarnings.push(msg);
if(console&&console.warn&&!jQuery.migrateMute){console.warn("JQMIGRATE: "+msg);if(jQuery.migrateTrace&&console.trace){console.trace();
}}}}function migrateWarnProp(obj,prop,value,msg){if(Object.defineProperty){try{Object.defineProperty(obj,prop,{configurable:true,enumerable:true,get:function(){migrateWarn(msg);
return value;},set:function(newValue){migrateWarn(msg);value=newValue;}});return;}catch(err){}}jQuery._definePropertyBroken=true;
obj[prop]=value;}if(document.compatMode==="BackCompat"){migrateWarn("jQuery is not compatible with Quirks Mode");}var attrFn=jQuery("<input/>",{size:1}).attr("size")&&jQuery.attrFn,oldAttr=jQuery.attr,valueAttrGet=jQuery.attrHooks.value&&jQuery.attrHooks.value.get||function(){return null;
},valueAttrSet=jQuery.attrHooks.value&&jQuery.attrHooks.value.set||function(){return undefined;},rnoType=/^(?:input|button)$/i,rnoAttrNodeType=/^[238]$/,rboolean=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,ruseDefault=/^(?:checked|selected)$/i;
migrateWarnProp(jQuery,"attrFn",attrFn||{},"jQuery.attrFn is deprecated");jQuery.attr=function(elem,name,value,pass){var lowerName=name.toLowerCase(),nType=elem&&elem.nodeType;
if(pass){if(oldAttr.length<4){migrateWarn("jQuery.fn.attr( props, pass ) is deprecated");}if(elem&&!rnoAttrNodeType.test(nType)&&(attrFn?name in attrFn:jQuery.isFunction(jQuery.fn[name]))){return jQuery(elem)[name](value);
}}if(name==="type"&&value!==undefined&&rnoType.test(elem.nodeName)&&elem.parentNode){migrateWarn("Can't change the 'type' of an input or button in IE 6/7/8");
}if(!jQuery.attrHooks[lowerName]&&rboolean.test(lowerName)){jQuery.attrHooks[lowerName]={get:function(elem,name){var attrNode,property=jQuery.prop(elem,name);
return property===true||typeof property!=="boolean"&&(attrNode=elem.getAttributeNode(name))&&attrNode.nodeValue!==false?name.toLowerCase():undefined;
},set:function(elem,value,name){var propName;if(value===false){jQuery.removeAttr(elem,name);}else{propName=jQuery.propFix[name]||name;
if(propName in elem){elem[propName]=true;}elem.setAttribute(name,name.toLowerCase());}return name;}};if(ruseDefault.test(lowerName)){migrateWarn("jQuery.fn.attr('"+lowerName+"') may use property instead of attribute");
}}return oldAttr.call(jQuery,elem,name,value);};jQuery.attrHooks.value={get:function(elem,name){var nodeName=(elem.nodeName||"").toLowerCase();
if(nodeName==="button"){return valueAttrGet.apply(this,arguments);}if(nodeName!=="input"&&nodeName!=="option"){migrateWarn("jQuery.fn.attr('value') no longer gets properties");
}return name in elem?elem.value:null;},set:function(elem,value){var nodeName=(elem.nodeName||"").toLowerCase();if(nodeName==="button"){return valueAttrSet.apply(this,arguments);
}if(nodeName!=="input"&&nodeName!=="option"){migrateWarn("jQuery.fn.attr('value', val) no longer sets properties");}elem.value=value;
}};var matched,browser,oldInit=jQuery.fn.init,oldParseJSON=jQuery.parseJSON,rquickExpr=/^([^<]*)(<[\w\W]+>)([^>]*)$/;jQuery.fn.init=function(selector,context,rootjQuery){var match;
if(selector&&typeof selector==="string"&&!jQuery.isPlainObject(context)&&(match=rquickExpr.exec(jQuery.trim(selector)))&&match[0]){if(selector.charAt(0)!=="<"){migrateWarn("$(html) HTML strings must start with '<' character");
}if(match[3]){migrateWarn("$(html) HTML text after last tag is ignored");}if(match[0].charAt(0)==="#"){migrateWarn("HTML string cannot start with a '#' character");
jQuery.error("JQMIGRATE: Invalid selector string (XSS)");}if(context&&context.context){context=context.context;}if(jQuery.parseHTML){return oldInit.call(this,jQuery.parseHTML(match[2],context,true),context,rootjQuery);
}}return oldInit.apply(this,arguments);};jQuery.fn.init.prototype=jQuery.fn;jQuery.parseJSON=function(json){if(!json&&json!==null){migrateWarn("jQuery.parseJSON requires a valid JSON string");
return null;}return oldParseJSON.apply(this,arguments);};jQuery.uaMatch=function(ua){ua=ua.toLowerCase();var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];
return{browser:match[1]||"",version:match[2]||"0"};};if(!jQuery.browser){matched=jQuery.uaMatch(navigator.userAgent);browser={};
if(matched.browser){browser[matched.browser]=true;browser.version=matched.version;}if(browser.chrome){browser.webkit=true;
}else{if(browser.webkit){browser.safari=true;}}jQuery.browser=browser;}migrateWarnProp(jQuery,"browser",jQuery.browser,"jQuery.browser is deprecated");
jQuery.sub=function(){function jQuerySub(selector,context){return new jQuerySub.fn.init(selector,context);}jQuery.extend(true,jQuerySub,this);
jQuerySub.superclass=this;jQuerySub.fn=jQuerySub.prototype=this();jQuerySub.fn.constructor=jQuerySub;jQuerySub.sub=this.sub;
jQuerySub.fn.init=function init(selector,context){if(context&&context instanceof jQuery&&!(context instanceof jQuerySub)){context=jQuerySub(context);
}return jQuery.fn.init.call(this,selector,context,rootjQuerySub);};jQuerySub.fn.init.prototype=jQuerySub.fn;var rootjQuerySub=jQuerySub(document);
migrateWarn("jQuery.sub() is deprecated");return jQuerySub;};jQuery.ajaxSetup({converters:{"text json":jQuery.parseJSON}});
var oldFnData=jQuery.fn.data;jQuery.fn.data=function(name){var ret,evt,elem=this[0];if(elem&&name==="events"&&arguments.length===1){ret=jQuery.data(elem,name);
evt=jQuery._data(elem,name);if((ret===undefined||ret===evt)&&evt!==undefined){migrateWarn("Use of jQuery.fn.data('events') is deprecated");
return evt;}}return oldFnData.apply(this,arguments);};var rscriptType=/\/(java|ecma)script/i,oldSelf=jQuery.fn.andSelf||jQuery.fn.addBack;
jQuery.fn.andSelf=function(){migrateWarn("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");return oldSelf.apply(this,arguments);
};if(!jQuery.clean){jQuery.clean=function(elems,context,fragment,scripts){context=context||document;context=!context.nodeType&&context[0]||context;
context=context.ownerDocument||context;migrateWarn("jQuery.clean() is deprecated");var i,elem,handleScript,jsTags,ret=[];
jQuery.merge(ret,jQuery.buildFragment(elems,context).childNodes);if(fragment){handleScript=function(elem){if(!elem.type||rscriptType.test(elem.type)){return scripts?scripts.push(elem.parentNode?elem.parentNode.removeChild(elem):elem):fragment.appendChild(elem);
}};for(i=0;(elem=ret[i])!=null;i++){if(!(jQuery.nodeName(elem,"script")&&handleScript(elem))){fragment.appendChild(elem);
if(typeof elem.getElementsByTagName!=="undefined"){jsTags=jQuery.grep(jQuery.merge([],elem.getElementsByTagName("script")),handleScript);
ret.splice.apply(ret,[i+1,0].concat(jsTags));i+=jsTags.length;}}}}return ret;};}var eventAdd=jQuery.event.add,eventRemove=jQuery.event.remove,eventTrigger=jQuery.event.trigger,oldToggle=jQuery.fn.toggle,oldLive=jQuery.fn.live,oldDie=jQuery.fn.die,ajaxEvents="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",rajaxEvent=new RegExp("\\b(?:"+ajaxEvents+")\\b"),rhoverHack=/(?:^|\s)hover(\.\S+|)\b/,hoverHack=function(events){if(typeof(events)!=="string"||jQuery.event.special.hover){return events;
}if(rhoverHack.test(events)){migrateWarn("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'");}return events&&events.replace(rhoverHack,"mouseenter$1 mouseleave$1");
};if(jQuery.event.props&&jQuery.event.props[0]!=="attrChange"){jQuery.event.props.unshift("attrChange","attrName","relatedNode","srcElement");
}if(jQuery.event.dispatch){migrateWarnProp(jQuery.event,"handle",jQuery.event.dispatch,"jQuery.event.handle is undocumented and deprecated");
}jQuery.event.add=function(elem,types,handler,data,selector){if(elem!==document&&rajaxEvent.test(types)){migrateWarn("AJAX events should be attached to document: "+types);
}eventAdd.call(this,elem,hoverHack(types||""),handler,data,selector);};jQuery.event.remove=function(elem,types,handler,selector,mappedTypes){eventRemove.call(this,elem,hoverHack(types)||"",handler,selector,mappedTypes);
};jQuery.fn.error=function(){var args=Array.prototype.slice.call(arguments,0);migrateWarn("jQuery.fn.error() is deprecated");
args.splice(0,0,"error");if(arguments.length){return this.bind.apply(this,args);}this.triggerHandler.apply(this,args);return this;
};jQuery.fn.toggle=function(fn,fn2){if(!jQuery.isFunction(fn)||!jQuery.isFunction(fn2)){return oldToggle.apply(this,arguments);
}migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");var args=arguments,guid=fn.guid||jQuery.guid++,i=0,toggler=function(event){var lastToggle=(jQuery._data(this,"lastToggle"+fn.guid)||0)%i;
jQuery._data(this,"lastToggle"+fn.guid,lastToggle+1);event.preventDefault();return args[lastToggle].apply(this,arguments)||false;
};toggler.guid=guid;while(i<args.length){args[i++].guid=guid;}return this.click(toggler);};jQuery.fn.live=function(types,data,fn){migrateWarn("jQuery.fn.live() is deprecated");
if(oldLive){return oldLive.apply(this,arguments);}jQuery(this.context).on(types,this.selector,data,fn);return this;};jQuery.fn.die=function(types,fn){migrateWarn("jQuery.fn.die() is deprecated");
if(oldDie){return oldDie.apply(this,arguments);}jQuery(this.context).off(types,this.selector||"**",fn);return this;};jQuery.event.trigger=function(event,data,elem,onlyHandlers){if(!elem&&!rajaxEvent.test(event)){migrateWarn("Global events are undocumented and deprecated");
}return eventTrigger.call(this,event,data,elem||document,onlyHandlers);};jQuery.each(ajaxEvents.split("|"),function(_,name){jQuery.event.special[name]={setup:function(){var elem=this;
if(elem!==document){jQuery.event.add(document,name+"."+jQuery.guid,function(){jQuery.event.trigger(name,null,elem,true);});
jQuery._data(this,name,jQuery.guid++);}return false;},teardown:function(){if(this!==document){jQuery.event.remove(document,name+"."+jQuery._data(this,name));
}return false;}};});})(jQuery,window);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Table with pagination for DWR/Ajax apps - v${project.version}
 */
!function($){$.widget("mocca.ajaxPseudoTable",{name:"ajaxPseudoTable",version:"1.0.0-SNAPSHOT",options:{ajaxTable:null,ajaxFunctions:{validate:"validate",count:"count",search:"search"},toolbar:{position:"top","class":"no-print",jumpTo:{max:30,selectClass:"selectfield width-auto",inputClass:"textfield"},perPage:{values:[15,30,50,100],selectedIndex:0,"class":"selectfield width-auto"},pager:{clickablePages:6,activeClass:"active",disabledClass:"disabled","class":"pagination small inline-block pull-right"}},totalbar:{"class":"dimmed no-print"},table:{lineClass:"",lineStyle:"",headerFunction:null,bodyRowFunction:null,postAddLine:null,postAddLines:null,wrapper:{tagName:"<div>","class":"margin-v"},body:{tagName:"<div>","class":"striped"}},wrapper:{tagName:"<div>","class":"box no-margin bordered rounded shadowed",classExt:""},externalParams:{containerId:"",ignoreBlanks:true},error:{handler:null,redirectLink:null,messageParamName:"errorMessage"},preRefresh:null,postRefresh:null,refreshOnCreate:true,hideOnCreate:false,hideOnEmpty:false,startPage:1,locale:"br",debugMode:false},_create:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._create",widget.options.debugMode);widget.toolbarElem=$("<div>",{"class":$.WidgetUtils.getClass(widget.options.toolbar),style:"overflow: auto;"});
widget.gotoWrapper=$("<div>",{style:"display: inline-block;"});widget.perPageElem=$("<select>",{"class":$.WidgetUtils.getClass(widget.options.toolbar.perPage)});
widget.pagerElem=$("<div>",{"class":$.WidgetUtils.getClass(widget.options.toolbar.pager)});widget.pagerListElem=$("<ul>").appendTo($(widget.pagerElem));
widget.pagerElem2=$("<div>",{"class":$.WidgetUtils.getClass(widget.options.toolbar.pager)});widget.pagerListElem2=$("<ul>").appendTo($(widget.pagerElem2));
var containerId=widget.options.externalParams.containerId;if($.StringUtils.isNotEmpty(containerId)){widget.externalParamsContainer=$("#"+containerId);
}widget._initPerPageOptions();$(widget.gotoWrapper).append(widget._createGoto(1));widget._on(widget.perPageElem,{change:function(event){event.preventDefault();
widget.refresh();}});$(widget.toolbarElem).append(widget.gotoWrapper).append(" ").append(widget.perPageElem).append(" ").append(widget.pagerElem);
widget.tableWrapperElem=$.WidgetUtils.createElement(widget.options.table.wrapper);widget.tbodyElem=$.WidgetUtils.createElement(widget.options.table.body);
if($.ObjectUtils.isValued(widget.options.table.body.id)){$(widget.tbodyElem).attr("id",widget.options.table.body.id);}$(widget.tbodyElem).attr("data-role","body");
var headerTmp=widget.element.find('[data-role="header"]');if($(headerTmp).length===1){widget.headerRowElem=$(headerTmp).clone();
$(headerTmp).remove();}var bodyTmp=widget.element.find('[data-role="bodyRow"]');if($(bodyTmp).length===1){widget.bodyRowElem=$(bodyTmp).clone();
$(bodyTmp).remove();}if($.isFunction(widget.options.table.headerFunction)){$(widget.tableWrapperElem).append(widget.options.table.headerFunction());
}else{if($(headerTmp).length===1){$(widget.tableWrapperElem).append(widget.headerRowElem);}}$(widget.tableWrapperElem).append(widget.tbodyElem);
widget.totalbarElem=$("<div>",{"class":$.WidgetUtils.getClass(widget.options.totalbar)});widget.element.addClass($.WidgetUtils.getClass(widget.options.wrapper));
if(widget.options.toolbar.position==="top"){widget.element.append(widget.toolbarElem).append(widget.tableWrapperElem).append(widget.totalbarElem);
}else{if(widget.options.toolbar.position==="bottom"){widget.element.append(widget.totalbarElem).append(widget.tableWrapperElem).append(widget.toolbarElem);
}else{widget.toolbarElem2=$("<div>",{"class":$.WidgetUtils.getClass(widget.options.toolbar),style:"overflow: auto;"});$(widget.totalbarElem).addClass("pull-left");
$(widget.toolbarElem2).append(widget.totalbarElem).append(" ").append(widget.pagerElem2);widget.element.append(widget.toolbarElem).append(widget.tableWrapperElem).append(widget.toolbarElem2);
}}if($.ObjectUtils.isValued(widget.externalParamsContainer)){var refreshClick=$();refreshClick=refreshClick.add($(widget.externalParamsContainer).find(".table-refresh-click"));
refreshClick=refreshClick.add($(widget.externalParamsContainer).find(".table-refresh").filter(":button"));widget._on(refreshClick,{click:function(event){event.preventDefault();
widget.gotoFirstPage();}});var refreshChange=$();refreshChange=refreshChange.add($(widget.externalParamsContainer).find(".table-refresh-change"));
refreshChange=refreshChange.add($(widget.externalParamsContainer).find(".table-refresh").not(":button").filter(":input"));
widget._on(refreshChange,{change:function(event){event.preventDefault();widget.gotoFirstPage();}});var refreshEnter=$(widget.externalParamsContainer).find(".table-refresh-enter");
widget._on(refreshEnter,{keyup:function(event){if(event.keyCode===13){event.preventDefault();widget.gotoFirstPage();}}});
}window.dwrRemoteCalls=0;widget.itemCountVar=0;widget.currentPageVar=widget.options.startPage;widget.totalPagesVar=1;widget.firstResultVar=1;
widget.lastResultVar=0;widget._resetErrorSpans();if(widget.options.hideOnCreate){$(widget.element).hide();}else{if(widget.options.refreshOnCreate){widget.refresh();
}}$.ConsoleUtils.timeEnd(widget.name+"._create",widget.options.debugMode);},refresh:function(){var widget=this;var ajaxService=widget.options.ajaxTable;
var validateFunc=widget.options.ajaxFunctions.validate;var countFunc=widget.options.ajaxFunctions.count;var searchFunc=widget.options.ajaxFunctions.search;
if($.isFunction(widget.options.preRefresh)){widget.options.preRefresh({});}if(widget.options.hideOnEmpty){$(widget.element).hide();
}var errorHandlerFunc=function(errorString,exception){if($.isFunction(widget.options.error.handler)){widget.options.error.handler(errorString,exception);
}else{widget.errorHandler(errorString,exception);}};$(widget.gotoWrapper).empty();$(widget.pagerListElem).empty();$(widget.pagerListElem2).empty();
$(widget.tbodyElem).empty();$(widget.totalbarElem).empty();widget._resetErrorSpans();var wparams=widget.getParams();var noErrors=true;
if($.ObjectUtils.isDefined(ajaxService[validateFunc])){ajaxService[validateFunc](wparams,{callback:function(errors){$.ConsoleUtils.time(widget.name+".validateCallback",widget.options.debugMode);
var keys=$.ObjectUtils.getKeys(errors);if($.ArrayUtils.isNotEmpty(keys)){noErrors=false;for(var i=0;i<keys.length;i++){var field=keys[i];
var errorMsg=errors[field];if($.ObjectUtils.isValued(widget.externalParamsContainer)){var span=$(widget.externalParamsContainer).find("#_"+field);
$(span).empty().append(errorMsg).show();}}}$.ConsoleUtils.timeEnd(widget.name+".validateCallback",widget.options.debugMode);
},async:false,preHook:function(){$.ConsoleUtils.time(widget.name+".validate",widget.options.debugMode);widget._preHook();
},postHook:function(){widget._postHook();$.ConsoleUtils.timeEnd(widget.name+".validate",widget.options.debugMode);}});}else{console.warn("validate method not exposed on spring-dwr.xml");
}if(noErrors){ajaxService[countFunc](wparams,{callback:function(itemCount){$.ConsoleUtils.time(widget.name+".countCallback",widget.options.debugMode);
widget.itemCountVar=itemCount;widget.perPageVar=widget.perPage();widget.totalPagesVar=Math.ceil(widget.itemCountVar/widget.perPageVar);
if(widget.totalPagesVar<1){widget.totalPagesVar=1;}if(widget.currentPageVar>widget.totalPagesVar){widget.currentPageVar=widget.totalPagesVar;
}widget.firstResultVar=(widget.currentPageVar-1)*widget.perPageVar;widget.lastResultVar=((widget.firstResultVar+widget.perPageVar)<widget.itemCountVar)?(widget.firstResultVar+widget.perPageVar):widget.itemCountVar;
$(widget.gotoWrapper).append(widget._createGoto(widget.totalPagesVar));var range=widget._getPageRange();widget._addShortcutPage("first",1);
widget._addShortcutPage("previous",widget.currentPageVar-1);for(var i=range[0];i<=range[1];i++){widget._addNumberedPage(i);
}widget._addShortcutPage("next",widget.currentPageVar+1);widget._addShortcutPage("last",widget.totalPagesVar);if(widget.itemCountVar>0||!widget.options.hideOnEmpty){$(widget.element).show();
}if(widget.itemCountVar>0){ajaxService[searchFunc](widget.firstResultVar,widget.perPageVar,wparams,{callback:function(items){$.ConsoleUtils.time(widget.name+".searchCallback",widget.options.debugMode);
var max=widget.perPage();$.ConsoleUtils.time(widget.name+".addRowsLoop",widget.options.debugMode);for(var i=0;i<items.length&&i<max;
i++){var item=items[i];if($.ObjectUtils.isValued(item)){item.idx=i;}if(i>=widget.perPageVar){break;}var tr,$tr;if($.isFunction(widget.options.table.bodyRowFunction)){tr=widget.options.table.bodyRowFunction(item);
}else{var rowHtml=$(widget.bodyRowElem).clone().wrap("<div>").parent().html();rowHtml=$.StringUtils.replaceParams(rowHtml,item);
tr=rowHtml;}$tr=$.JqueryUtils.isJquery(tr)?tr:$(tr);$(widget.tbodyElem).append($tr);$tr.addClass(widget.options.table.lineClass);
$tr.attr("style",widget.options.table.lineStyle);if($.isFunction(widget.options.table.postAddLine)){widget.options.table.postAddLine($tr,item);
}}$.ConsoleUtils.timeEnd(widget.name+".addRowsLoop",widget.options.debugMode);if($.isFunction(widget.options.table.postAddLines)){$.ConsoleUtils.time(widget.name+".postAddLines",widget.options.debugMode);
widget.options.table.postAddLines({params:wparams});$.ConsoleUtils.timeEnd(widget.name+".postAddLines",widget.options.debugMode);
}$.ConsoleUtils.timeEnd(widget.name+".searchCallback",widget.options.debugMode);},async:true,errorHandler:errorHandlerFunc,preHook:function(){$.ConsoleUtils.time(widget.name+".search",widget.options.debugMode);
widget._preHook();},postHook:function(){widget._postHook();$.ConsoleUtils.timeEnd(widget.name+".search",widget.options.debugMode);
}});var fst=$.NumberUtils.formatNumber((widget.firstResultVar+1),{format:"#,###"});var lst=$.NumberUtils.formatNumber(widget.lastResultVar,{format:"#,###"});
var cnt=$.NumberUtils.formatNumber(widget.itemCountVar,{format:"#,###"});$(widget.totalbarElem).append($.StringUtils.replaceParams(widget._getString("totalbarLabel"),{first:fst,last:lst,count:cnt}));
}else{$(widget.totalbarElem).append(widget._getString("noResultLabel"));if($.isFunction(widget.options.table.postAddLines)){$.ConsoleUtils.time(widget.name+".postAddLines",widget.options.debugMode);
widget.options.table.postAddLines({params:wparams});$.ConsoleUtils.timeEnd(widget.name+".postAddLines",widget.options.debugMode);
}}$.ConsoleUtils.timeEnd(widget.name+".countCallback",widget.options.debugMode);},async:true,errorHandler:errorHandlerFunc,preHook:function(){$.ConsoleUtils.time(widget.name+".count",widget.options.debugMode);
widget._preHook();},postHook:function(){widget._postHook();$.ConsoleUtils.timeEnd(widget.name+".count",widget.options.debugMode);
}});}if($.isFunction(widget.options.postRefresh)){widget.options.postRefresh({noErrors:noErrors});}},getOpt:function(path){var widget=this;
return $.ObjectUtils.getPathValue(path,widget.options);},currentPage:function(){return this.currentPageVar;},totalPages:function(){return this.totalPagesVar;
},totalItems:function(){return this.itemCountVar;},perPage:function(){return Number($(this.perPageElem).val());},perPageValues:function(array){var widget=this;
$.ConsoleUtils.time(widget.name+".perPageValues",widget.options.debugMode);if($.ObjectUtils.isValued(array)){widget.options.toolbar.perPage.values=array;
widget._initPerPageOptions();widget.refresh();}$.ConsoleUtils.timeEnd(widget.name+".perPageValues",widget.options.debugMode);
return widget.options.toolbar.perPage.values;},perPageSelectedIndex:function(index){var widget=this;$.ConsoleUtils.time(widget.name+".perPageSelectedIndex",widget.options.debugMode);
if($.ObjectUtils.isValued(index)){if(index>=0&&index<widget.options.toolbar.perPage.values.length){widget.options.toolbar.perPage.selectedIndex=index;
widget._initPerPageOptions();widget.refresh();}}$.ConsoleUtils.timeEnd(widget.name+".perPageSelectedIndex",widget.options.debugMode);
return widget.options.toolbar.perPage.selectedIndex;},_initPerPageOptions:function(){var widget=this;$.ConsoleUtils.time(widget.name+"._initPerPageOptions",widget.options.debugMode);
$(widget.perPageElem).empty();var values=widget.options.toolbar.perPage.values;var selectedIndex=widget.options.toolbar.perPage.selectedIndex;
var optionsLabel=widget._getString("perPageLabel");if($.ArrayUtils.isArray(values)){for(var i=0;i<values.length;i++){var label;
if($.ObjectUtils.isValued(optionsLabel)){label=$.StringUtils.replaceParams(optionsLabel,{max:values[i]});}else{label=$.StringUtils.replaceParams(widget._getString("perPageLabel"),{max:values[i]});
}var opt=$("<option>",{value:values[i]}).append(label);if(selectedIndex===i){$(opt).select();}$(widget.perPageElem).append(opt);
}}$.ConsoleUtils.timeEnd(widget.name+"._initPerPageOptions",widget.options.debugMode);},gotoPage:function(value){var widget=this;
$.ConsoleUtils.time(widget.name+".gotoPage",widget.options.debugMode);if($.NumberUtils.isPositive(value)&&value<=widget.totalPagesVar){widget.currentPageVar=Number(value);
}widget.refresh();$.ConsoleUtils.timeEnd(widget.name+".gotoPage");return widget.currentPageVar;},gotoFirstPage:function(){return this.gotoPage(1);
},gotoPreviowsPage:function(){var widget=this;var prev=widget.currentPageVar-1;if(prev>=1){return widget.gotoPage(prev);}return widget.currentPageVar;
},gotoNextPage:function(){var widget=this;var nxt=widget.currentPageVar+1;if(nxt<=widget.totalPagesVar){return widget.gotoPage(nxt);
}return widget.currentPageVar;},gotoLastPage:function(){return this.gotoPage(this.totalPagesVar);},getParamKeys:function(){var widget=this;
$.ConsoleUtils.time(widget.name+".getParamKeys",widget.options.debugMode);var keys=[];if($.isFunction(widget.options.externalParams)){keys=$.ObjectUtils.getKeys(widget.options.externalParams());
}else{var i=0;if($.ObjectUtils.isValued(widget.externalParamsContainer)){var inputs=$(widget.externalParamsContainer).find(":input").not(":button");
$(inputs).each(function(){var key=$(this).attr("name");if($.StringUtils.isBlankOrUnvalued(key)){key=$(this).attr("id");}if($.StringUtils.isNotBlank(key)){keys[i]=key;
i++;}});}}$.ConsoleUtils.timeEnd(widget.name+".getParamKeys",widget.options.debugMode);return keys;},getParams:function(){var widget=this;
$.ConsoleUtils.time(widget.name+".getParams",widget.options.debugMode);var params={};if($.isFunction(widget.options.externalParams)){var tmp=widget.options.externalParams();
if($.ObjectUtils.isValued(tmp)){params=tmp;}}else{if($.ObjectUtils.isValued(widget.externalParamsContainer)){var inputs=$(widget.externalParamsContainer).find("input").not('[type="radio"]').not('[type="checkbox"]');
$(inputs).each(function(){widget._putParam(this,params);});var radios=$(widget.externalParamsContainer).find("input:radio:checked");
$(radios).each(function(){widget._putParam(this,params);});var checkboxes=$(widget.externalParamsContainer).find("input:checkbox:checked");
$(checkboxes).each(function(){widget._putParam(this,params);});var selects=$(widget.externalParamsContainer).find("select");
$(selects).each(function(){widget._putParam(this,params);});}}$.ConsoleUtils.timeEnd(widget.name+".getParams",widget.options.debugMode);
return params;},_resetErrorSpans:function(){var widget=this;if($.ObjectUtils.isValued(widget.externalParamsContainer)){var spans=$(widget.externalParamsContainer).find('span[id^="_"]');
$(spans).empty().hide();}},_putParam:function(paramElem,params){var widget=this;$.ConsoleUtils.time(widget.name+"._putParam",widget.options.debugMode);
var key=$(paramElem).attr("name");if($.StringUtils.isBlankOrUnvalued(key)){key=$(paramElem).attr("id");}if($.StringUtils.isNotBlank(key)){var putString=function(key,value,params,ignoreBlanks){if($.StringUtils.isNotBlank(value)||!ignoreBlanks){if($.StringUtils.isNotEmpty(params[key])){params[key]=params[key]+"|"+value;
}else{params[key]=value;}}};var value=$(paramElem).val();if($.ArrayUtils.isNotEmpty(value)){for(var i=0;i<value.length;i++){putString(key,value[i],params,widget.options.externalParams.ignoreBlanks);
}}else{putString(key,value,params,widget.options.externalParams.ignoreBlanks);}}$.ConsoleUtils.timeEnd(widget.name+"._putParam",widget.options.debugMode);
},_getPageRange:function(){var widget=this;$.ConsoleUtils.time(widget.name+"._getPageRange",widget.options.debugMode);var clickablePages=widget.options.toolbar.pager.clickablePages;
var halfDelta=clickablePages/2;var firstPageToShow=widget.currentPageVar-halfDelta;var lastPageToShow=widget.currentPageVar+halfDelta;
if(firstPageToShow<1){firstPageToShow=1;lastPageToShow=1+clickablePages;if(lastPageToShow>widget.totalPagesVar){lastPageToShow=widget.totalPagesVar;
}}if(lastPageToShow>widget.totalPagesVar){lastPageToShow=widget.totalPagesVar;firstPageToShow=widget.totalPagesVar-clickablePages;
if(firstPageToShow<1){firstPageToShow=1;}}$.ConsoleUtils.timeEnd(widget.name+"._getPageRange",widget.options.debugMode);return[firstPageToShow,lastPageToShow];
},_addShortcutPage:function(id,index){var widget=this;$.ConsoleUtils.time(widget.name+"._addShortcutPage",widget.options.debugMode);
var label1=widget._getString(id+"Label");var label2=widget._getString(id+"Label");var title1=$("<div/>").html(widget._getString(id+"Title")).text();
var title2=$("<div/>").html(widget._getString(id+"Title")).text();var page1=$("<li>",{id:id+"_"+widget.uuid});var page2=$("<li>",{id:id+"_"+widget.uuid});
var child1,child2;if(index===widget.currentPageVar||index<1||index>widget.totalPagesVar){$(page1).attr("class",widget.options.toolbar.pager.disabledClass);
$(page2).attr("class",widget.options.toolbar.pager.disabledClass);child1=$("<span>").append(label1);child2=$("<span>").append(label2);
}else{child1=$("<a>",{title:title1,href:"javascript:void(0);"}).append(label1);child2=$("<a>",{title:title2,href:"javascript:void(0);"}).append(label1);
$(child1).click(function(event){event.preventDefault();widget.gotoPage(index);});$(child2).click(function(event){event.preventDefault();
widget.gotoPage(index);});}$(child1).appendTo(page1);$(child2).appendTo(page2);$(widget.pagerListElem).append(page1);$(widget.pagerListElem2).append(page2);
$.ConsoleUtils.timeEnd(widget.name+"._addShortcutPage",widget.options.debugMode);},_addNumberedPage:function(index){var widget=this;
$.ConsoleUtils.time(widget.name+"._addNumberedPage",widget.options.debugMode);var page1=$("<li>",{id:"page"+index+"_"+widget.uuid});
var page2=$("<li>",{id:"page"+index+"_"+widget.uuid});var child1,child2;if(index===widget.currentPageVar){child1=$("<span>").append(index);
child2=$("<span>").append(index);$(page1).attr("class",widget.options.toolbar.pager.activeClass);$(page2).attr("class",widget.options.toolbar.pager.activeClass);
}else{child1=$("<a>",{href:"javascript:void(0);"}).append(index);child2=$("<a>",{href:"javascript:void(0);"}).append(index);
$(child1).click(function(event){event.preventDefault();widget.gotoPage(index);});$(child2).click(function(event){event.preventDefault();
widget.gotoPage(index);});}$(child1).appendTo(page1);$(child2).appendTo(page2);$(widget.pagerListElem).append(page1);$(widget.pagerListElem2).append(page2);
$.ConsoleUtils.timeEnd(widget.name+"._addNumberedPage",widget.options.debugMode);},_createGoto:function(nPages){var widget=this;
$.ConsoleUtils.time(widget.name+"._createGoto",widget.options.debugMode);var gotoElem;if(nPages<=widget.options.toolbar.jumpTo.max){gotoElem=$("<select>",{"class":widget.options.toolbar.jumpTo.selectClass});
for(var i=1;i<=nPages;i++){var label=$.StringUtils.replaceParams(widget._getString("gotoOptionLabel"),{index:i});var op=$("<option>").attr("value",i).append(label);
if(widget.currentPageVar===i){$(op).select();}$(gotoElem).append(op);}$(gotoElem).change(function(event){event.preventDefault();
var typed=$.NumberUtils.toNumber($(gotoElem).val());typed=$.NumberUtils.isPositive(typed)?typed:widget.currentPageVar;widget.gotoPage(typed);
});}else{gotoElem=$("<input>",{"class":widget.options.toolbar.jumpTo.inputClass,style:"width: 6em;",placeholder:widget._getString("gotoInputLabel")});
$(gotoElem).keyup(function(event){if(event.keyCode===13){var typed=$.NumberUtils.toNumber($(gotoElem).val());typed=$.NumberUtils.isNumber(typed)?typed:widget.currentPageVar;
if(typed<1){widget.gotoFirstPage();}else{if(typed>widget.totalPagesVar){widget.gotoLastPage();}else{widget.gotoPage(typed);
}}}});}$.ConsoleUtils.timeEnd(widget.name+"._createGoto",widget.options.debugMode);return gotoElem;},_getString:function(key){var widget=this;
return $.LocaleUtils.resolveKey(key,widget.options.locale,widget.regional);},_preHook:function(){var widget=this;if(window.dwrRemoteCalls<=0){$.WidgetUtils.blockUI({content:widget._getString("lockMessage")});
}window.dwrRemoteCalls++;},_postHook:function(){var widget=this;window.dwrRemoteCalls--;if(window.dwrRemoteCalls<=0){$.WidgetUtils.unblockUI();
}},errorHandler:function(errorString,exception){var widget=this;if($.ObjectUtils.isValued(widget.options.error.redirectLink)){var link=widget.options.error.redirectLink;
if($.ObjectUtils.isValued(widget.options.error.messageParamName)){if($.ObjectUtils.isValued(exception.cause)){link=link+"?"+widget.options.error.messageParamName+"="+exception.cause.message;
}else{link=link+"?"+widget.options.error.messageParamName+"="+exception.message;}}window.location=link;}},regional:{br:{gotoOptionLabel:"Ir para @{index}",gotoInputLabel:"Ir para...",perPageLabel:"@{max} por p&aacute;gina",totalbarLabel:"Mostrando do @{first} ao @{last} de @{count} resultados.",noResultLabel:"Sem resultados.",firstLabel:"&laquo;",firstTitle:"Primeira p&aacute;gina",previousLabel:"&lsaquo;",previousTitle:"P&aacute;gina anterior",nextLabel:"&rsaquo;",nextTitle:"Pr&oacute;xima p&aacute;gina",lastLabel:"&raquo;",lastTitle:"&Uacute;ltima p&aacute;gina",lockMessage:"Efetuando requisi&ccedil;&atilde;o. Por favor, aguarde..."},us:{gotoOptionLabel:"Go to @{index}",gotoInputLabel:"Go to...",perPageLabel:"@{max} per page",totalbarLabel:"Showing from @{first} to @{last} of @{count} results.",noResultLabel:"No results.",firstLabel:"&laquo;",firstTitle:"First page",previousLabel:"&lsaquo;",previousTitle:"Previous page",nextLabel:"&rsaquo;",nextTitle:"Next page",lastLabel:"&raquo;",lastTitle:"Last page",lockMessage:"Searching. Please, stand by..."}}});
}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Table with pagination for DWR/Ajax apps - v${project.version}
 */
!function($){$.widget("mocca.ajaxTable",{name:"ajaxTable",version:"1.0.0-SNAPSHOT",options:{ajaxTable:null,ajaxFunctions:{validate:"validate",count:"count",search:"search"},toolbar:{position:"top","class":"no-print",jumpTo:{max:30,selectClass:"selectfield width-auto",inputClass:"textfield"},perPage:{values:[15,30,50,100],selectedIndex:0,"class":"selectfield width-auto"},pager:{clickablePages:6,activeClass:"active",disabledClass:"disabled","class":"pagination small inline-block pull-right"}},totalbar:{"class":"dimmed no-print"},table:{"class":"table narrow striped",classExt:"",headerClass:"header",lineClass:"",lineStyle:"",columns:[{name:"column",headerCell:"Header 1",headerCellClass:"",headerCellStyle:"",headerCellTitle:"",bodyCell:"",bodyCellClass:"",bodyCellStyle:"",bodyCellTitle:""}],headerFunction:null,bodyRowFunction:null,postAddLine:null,postAddLines:null,wrapper:{"class":"table-wrapper scrollable stroked margin-v"}},wrapper:{tagName:"<div>","class":"box no-margin bordered rounded shadowed",classExt:""},externalParams:{containerId:"",ignoreBlanks:true},error:{handler:null,redirectLink:null,messageParamName:"errorMessage"},preRefresh:null,postRefresh:null,refreshOnCreate:true,hideOnCreate:false,hideOnEmpty:false,startPage:1,ordering:{enabled:false,orderBy:"",orderMode:"",arrow:{style:"float: left; color: #888;","class":"ordering"}},locale:"br",debugMode:false},_create:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._create",widget.options.debugMode);widget.toolbarElem=$("<div>",{"class":$.WidgetUtils.getClass(widget.options.toolbar),style:"overflow: auto;"});
widget.gotoWrapper=$("<div>",{style:"display: inline-block;"});widget.perPageElem=$("<select>",{"class":$.WidgetUtils.getClass(widget.options.toolbar.perPage)});
widget.pagerElem=$("<div>",{"class":$.WidgetUtils.getClass(widget.options.toolbar.pager)});widget.pagerListElem=$("<ul>").appendTo($(widget.pagerElem));
widget.pagerElem2=$("<div>",{"class":$.WidgetUtils.getClass(widget.options.toolbar.pager)});widget.pagerListElem2=$("<ul>").appendTo($(widget.pagerElem2));
var containerId=widget.options.externalParams.containerId;if($.StringUtils.isNotEmpty(containerId)){widget.externalParamsContainer=$("#"+containerId);
}widget._initPerPageOptions();$(widget.gotoWrapper).append(widget._createGoto(1));widget._on(widget.perPageElem,{change:function(event){event.preventDefault();
widget.refresh();}});$(widget.toolbarElem).append(widget.gotoWrapper).append(" ").append(widget.perPageElem).append(" ").append(widget.pagerElem);
var tableTmp=widget.element.find("table");if($(tableTmp).length===1){widget.tableElem=$(tableTmp).clone(true);$(tableTmp).remove();
widget.tbodyElem=$(widget.tableElem).find("tbody");var tableRowTmp=$(widget.tbodyElem).find('tr[data-role="tableRow"]');if($(tableRowTmp).length===1){widget.tableRowElem=$(tableRowTmp).clone(true);
$(tableRowTmp).remove();}}var hasTable=$.ObjectUtils.isValued(widget.tableElem);var hasTableRow=$.ObjectUtils.isValued(widget.tableRowElem);
widget.tableWrapperElem=$.WidgetUtils.createDiv(widget.options.table.wrapper);if(hasTable&&hasTableRow){$(widget.tableWrapperElem).append(widget.tableElem);
}else{widget.tableElem=$("<table>",{"class":$.WidgetUtils.getClass(widget.options.table)});if($.isFunction(widget.options.table.headerFunction)){$(widget.tableElem).append(widget.options.table.headerFunction());
}else{$(widget.tableElem).append(widget._createHeader());}widget.tbodyElem=$("<tbody>").appendTo($(widget.tableElem));$(widget.tableWrapperElem).append(widget.tableElem);
}widget.tableElem.show();if(widget.options.ordering.enabled){widget._initHeaderOrdering();}widget.totalbarElem=$("<div>",{"class":$.WidgetUtils.getClass(widget.options.totalbar)});
widget.element.addClass($.WidgetUtils.getClass(widget.options.wrapper));if(widget.options.toolbar.position==="top"){widget.element.append(widget.toolbarElem).append(widget.tableWrapperElem).append(widget.totalbarElem);
}else{if(widget.options.toolbar.position==="bottom"){widget.element.append(widget.totalbarElem).append(widget.tableWrapperElem).append(widget.toolbarElem);
}else{widget.toolbarElem2=$("<div>",{"class":$.WidgetUtils.getClass(widget.options.toolbar),style:"overflow: auto;"});$(widget.totalbarElem).addClass("pull-left");
$(widget.toolbarElem2).append(widget.totalbarElem).append(" ").append(widget.pagerElem2);widget.element.append(widget.toolbarElem).append(widget.tableWrapperElem).append(widget.toolbarElem2);
}}if($.ObjectUtils.isValued(widget.externalParamsContainer)){var refreshClick=$();refreshClick=refreshClick.add($(widget.externalParamsContainer).find(".table-refresh-click"));
refreshClick=refreshClick.add($(widget.externalParamsContainer).find(".table-refresh").filter(":button"));widget._on(refreshClick,{click:function(event){event.preventDefault();
widget.gotoFirstPage();}});var refreshChange=$();refreshChange=refreshChange.add($(widget.externalParamsContainer).find(".table-refresh-change"));
refreshChange=refreshChange.add($(widget.externalParamsContainer).find(".table-refresh").not(":button").filter(":input"));
widget._on(refreshChange,{change:function(event){event.preventDefault();widget.gotoFirstPage();}});var refreshEnter=$(widget.externalParamsContainer).find(".table-refresh-enter");
widget._on(refreshEnter,{keyup:function(event){if(event.keyCode===13){event.preventDefault();widget.gotoFirstPage();}}});
}window.dwrRemoteCalls=0;widget.itemCountVar=0;widget.currentPageVar=widget.options.startPage;widget.totalPagesVar=1;widget.firstResultVar=1;
widget.lastResultVar=0;widget._resetErrorSpans();if(widget.options.hideOnCreate){$(widget.element).hide();}else{if(widget.options.refreshOnCreate){widget.refresh();
}}$.ConsoleUtils.timeEnd(widget.name+"._create",widget.options.debugMode);},refresh:function(){var widget=this;var ajaxService=widget.options.ajaxTable;
var validateFunc=widget.options.ajaxFunctions.validate;var countFunc=widget.options.ajaxFunctions.count;var searchFunc=widget.options.ajaxFunctions.search;
if($.isFunction(widget.options.preRefresh)){widget.options.preRefresh({});}if(widget.options.hideOnEmpty){$(widget.element).hide();
}var errorHandlerFunc=function(errorString,exception){if($.isFunction(widget.options.error.handler)){widget.options.error.handler(errorString,exception);
}else{widget.errorHandler(errorString,exception);}};$(widget.gotoWrapper).empty();$(widget.pagerListElem).empty();$(widget.pagerListElem2).empty();
$(widget.tbodyElem).empty();$(widget.totalbarElem).empty();widget._resetErrorSpans();var wparams=widget.getParams();var noErrors=true;
if($.ObjectUtils.isDefined(ajaxService[validateFunc])){ajaxService[validateFunc](wparams,{callback:function(errors){$.ConsoleUtils.time(widget.name+".validateCallback",widget.options.debugMode);
var keys=$.ObjectUtils.getKeys(errors);if($.ArrayUtils.isNotEmpty(keys)){noErrors=false;for(var i=0;i<keys.length;i++){var field=keys[i];
var errorMsg=errors[field];if($.ObjectUtils.isValued(widget.externalParamsContainer)){var span=$(widget.externalParamsContainer).find("#_"+field);
$(span).empty().append(errorMsg).show();}}}$.ConsoleUtils.timeEnd(widget.name+".validateCallback",widget.options.debugMode);
},async:false,preHook:function(){$.ConsoleUtils.time(widget.name+".validate",widget.options.debugMode);widget._preHook();
},postHook:function(){widget._postHook();$.ConsoleUtils.timeEnd(widget.name+".validate",widget.options.debugMode);}});}else{console.warn("validate method not exposed on spring-dwr.xml");
}if(noErrors){ajaxService[countFunc](wparams,{callback:function(itemCount){$.ConsoleUtils.time(widget.name+".countCallback",widget.options.debugMode);
widget.itemCountVar=itemCount;widget.perPageVar=widget.perPage();widget.totalPagesVar=Math.ceil(widget.itemCountVar/widget.perPageVar);
if(widget.totalPagesVar<1){widget.totalPagesVar=1;}if(widget.currentPageVar>widget.totalPagesVar){widget.currentPageVar=widget.totalPagesVar;
}widget.firstResultVar=(widget.currentPageVar-1)*widget.perPageVar;widget.lastResultVar=((widget.firstResultVar+widget.perPageVar)<widget.itemCountVar)?(widget.firstResultVar+widget.perPageVar):widget.itemCountVar;
$(widget.gotoWrapper).append(widget._createGoto(widget.totalPagesVar));var range=widget._getPageRange();widget._addShortcutPage("first",1);
widget._addShortcutPage("previous",widget.currentPageVar-1);for(var i=range[0];i<=range[1];i++){widget._addNumberedPage(i);
}widget._addShortcutPage("next",widget.currentPageVar+1);widget._addShortcutPage("last",widget.totalPagesVar);if(widget.itemCountVar>0||!widget.options.hideOnEmpty){$(widget.element).show();
}if(widget.itemCountVar>0){ajaxService[searchFunc](widget.firstResultVar,widget.perPageVar,wparams,{callback:function(items){$.ConsoleUtils.time(widget.name+".searchCallback",widget.options.debugMode);
var max=widget.perPage();$.ConsoleUtils.time(widget.name+".addRowsLoop",widget.options.debugMode);for(var i=0;i<items.length&&i<max;
i++){var item=items[i];if($.ObjectUtils.isValued(item)){item.idx=i;}if(i>=widget.perPageVar){break;}var hasTable=$.ObjectUtils.isValued(widget.tableElem);
var hasTableRow=$.ObjectUtils.isValued(widget.tableRowElem);var tr,$tr;if($.isFunction(widget.options.table.bodyRowFunction)){tr=widget.options.table.bodyRowFunction(item);
}else{if(hasTable&&hasTableRow){var rowHtml=$(widget.tableRowElem).clone(true).wrap("<tbody>").parent().html();rowHtml=$.StringUtils.replaceParams(rowHtml,item);
tr=rowHtml;}else{tr=widget._createRow(item);}}$tr=$.JqueryUtils.isJquery(tr)?tr:$(tr);$(widget.tbodyElem).append($tr);$tr.addClass(widget.options.table.lineClass);
$tr.attr("style",widget.options.table.lineStyle);if($.isFunction(widget.options.table.postAddLine)){widget.options.table.postAddLine($tr,item);
}}$.ConsoleUtils.timeEnd(widget.name+".addRowsLoop",widget.options.debugMode);if($.isFunction(widget.options.table.postAddLines)){$.ConsoleUtils.time(widget.name+".postAddLines",widget.options.debugMode);
widget.options.table.postAddLines({params:wparams});$.ConsoleUtils.timeEnd(widget.name+".postAddLines",widget.options.debugMode);
}$.ConsoleUtils.timeEnd(widget.name+".searchCallback",widget.options.debugMode);},async:true,errorHandler:errorHandlerFunc,preHook:function(){$.ConsoleUtils.time(widget.name+".search",widget.options.debugMode);
widget._preHook();},postHook:function(){widget._postHook();$.ConsoleUtils.timeEnd(widget.name+".search",widget.options.debugMode);
}});var fst=$.NumberUtils.formatNumber((widget.firstResultVar+1),{format:"#,###"});var lst=$.NumberUtils.formatNumber(widget.lastResultVar,{format:"#,###"});
var cnt=$.NumberUtils.formatNumber(widget.itemCountVar,{format:"#,###"});$(widget.totalbarElem).append($.StringUtils.replaceParams(widget._getString("totalbarLabel"),{first:fst,last:lst,count:cnt}));
}else{$(widget.totalbarElem).append(widget._getString("noResultLabel"));if($.isFunction(widget.options.table.postAddLines)){$.ConsoleUtils.time(widget.name+".postAddLines",widget.options.debugMode);
widget.options.table.postAddLines({params:wparams});$.ConsoleUtils.timeEnd(widget.name+".postAddLines",widget.options.debugMode);
}}$.ConsoleUtils.timeEnd(widget.name+".countCallback",widget.options.debugMode);},async:true,errorHandler:errorHandlerFunc,preHook:function(){$.ConsoleUtils.time(widget.name+".count",widget.options.debugMode);
widget._preHook();},postHook:function(){widget._postHook();$.ConsoleUtils.timeEnd(widget.name+".count",widget.options.debugMode);
}});}if($.isFunction(widget.options.postRefresh)){widget.options.postRefresh({noErrors:noErrors});}},getOpt:function(path){var widget=this;
return $.ObjectUtils.getPathValue(path,widget.options);},currentPage:function(){return this.currentPageVar;},totalPages:function(){return this.totalPagesVar;
},totalItems:function(){return this.itemCountVar;},perPage:function(){return Number($(this.perPageElem).val());},perPageValues:function(array){var widget=this;
$.ConsoleUtils.time(widget.name+".perPageValues",widget.options.debugMode);if($.ObjectUtils.isValued(array)){widget.options.toolbar.perPage.values=array;
widget._initPerPageOptions();widget.refresh();}$.ConsoleUtils.timeEnd(widget.name+".perPageValues",widget.options.debugMode);
return widget.options.toolbar.perPage.values;},perPageSelectedIndex:function(index){var widget=this;$.ConsoleUtils.time(widget.name+".perPageSelectedIndex",widget.options.debugMode);
if($.ObjectUtils.isValued(index)){if(index>=0&&index<widget.options.toolbar.perPage.values.length){widget.options.toolbar.perPage.selectedIndex=index;
widget._initPerPageOptions();widget.refresh();}}$.ConsoleUtils.timeEnd(widget.name+".perPageSelectedIndex",widget.options.debugMode);
return widget.options.toolbar.perPage.selectedIndex;},_initPerPageOptions:function(){var widget=this;$.ConsoleUtils.time(widget.name+"._initPerPageOptions",widget.options.debugMode);
$(widget.perPageElem).empty();var values=widget.options.toolbar.perPage.values;var selectedIndex=widget.options.toolbar.perPage.selectedIndex;
var optionsLabel=widget._getString("perPageLabel");if($.ArrayUtils.isArray(values)){for(var i=0;i<values.length;i++){var label;
if($.ObjectUtils.isValued(optionsLabel)){label=$.StringUtils.replaceParams(optionsLabel,{max:values[i]});}else{label=$.StringUtils.replaceParams(widget._getString("perPageLabel"),{max:values[i]});
}var opt=$("<option>",{value:values[i]}).append(label);if(selectedIndex===i){$(opt).select();}$(widget.perPageElem).append(opt);
}}$.ConsoleUtils.timeEnd(widget.name+"._initPerPageOptions",widget.options.debugMode);},gotoPage:function(value){var widget=this;
$.ConsoleUtils.time(widget.name+".gotoPage",widget.options.debugMode);if($.NumberUtils.isPositive(value)&&value<=widget.totalPagesVar){widget.currentPageVar=Number(value);
}widget.refresh();$.ConsoleUtils.timeEnd(widget.name+".gotoPage");return widget.currentPageVar;},gotoFirstPage:function(){return this.gotoPage(1);
},gotoPreviowsPage:function(){var widget=this;var prev=widget.currentPageVar-1;if(prev>=1){return widget.gotoPage(prev);}return widget.currentPageVar;
},gotoNextPage:function(){var widget=this;var nxt=widget.currentPageVar+1;if(nxt<=widget.totalPagesVar){return widget.gotoPage(nxt);
}return widget.currentPageVar;},gotoLastPage:function(){return this.gotoPage(this.totalPagesVar);},getParamKeys:function(){var widget=this;
$.ConsoleUtils.time(widget.name+".getParamKeys",widget.options.debugMode);var keys=[];if($.isFunction(widget.options.externalParams)){keys=$.ObjectUtils.getKeys(widget.options.externalParams());
}else{var i=0;if($.ObjectUtils.isValued(widget.externalParamsContainer)){var inputs=$(widget.externalParamsContainer).find(":input").not(":button");
$(inputs).each(function(){var key=$(this).attr("name");if($.StringUtils.isBlankOrUnvalued(key)){key=$(this).attr("id");}if($.StringUtils.isNotBlank(key)){keys[i]=key;
i++;}});}}$.ConsoleUtils.timeEnd(widget.name+".getParamKeys",widget.options.debugMode);return keys;},getParams:function(){var widget=this;
$.ConsoleUtils.time(widget.name+".getParams",widget.options.debugMode);var params={};if($.isFunction(widget.options.externalParams)){var tmp=widget.options.externalParams();
if($.ObjectUtils.isValued(tmp)){params=tmp;}}else{if($.ObjectUtils.isValued(widget.externalParamsContainer)){var inputs=$(widget.externalParamsContainer).find("input").not('[type="radio"]').not('[type="checkbox"]');
$(inputs).each(function(){widget._putParam(this,params);});var radios=$(widget.externalParamsContainer).find("input:radio:checked");
$(radios).each(function(){widget._putParam(this,params);});var checkboxes=$(widget.externalParamsContainer).find("input:checkbox:checked");
$(checkboxes).each(function(){widget._putParam(this,params);});var selects=$(widget.externalParamsContainer).find("select");
$(selects).each(function(){widget._putParam(this,params);});}}if(widget.options.ordering.enabled){var theadElem=$(widget.tableElem).find("thead");
params.orderBy=$(theadElem).data("orderBy");params.orderMode=$(theadElem).data("orderMode");}$.ConsoleUtils.timeEnd(widget.name+".getParams",widget.options.debugMode);
return params;},_resetErrorSpans:function(){var widget=this;if($.ObjectUtils.isValued(widget.externalParamsContainer)){var spans=$(widget.externalParamsContainer).find('span[id^="_"]');
$(spans).empty().hide();}},_putParam:function(paramElem,params){var widget=this;$.ConsoleUtils.time(widget.name+"._putParam",widget.options.debugMode);
var key=$(paramElem).attr("name");if($.StringUtils.isBlankOrUnvalued(key)){key=$(paramElem).attr("id");}if($.StringUtils.isNotBlank(key)){var putString=function(key,value,params,ignoreBlanks){if($.StringUtils.isNotBlank(value)||!ignoreBlanks){if($.StringUtils.isNotEmpty(params[key])){params[key]=params[key]+"|"+value;
}else{params[key]=value;}}};var value=$(paramElem).val();if($.ArrayUtils.isNotEmpty(value)){for(var i=0;i<value.length;i++){putString(key,value[i],params,widget.options.externalParams.ignoreBlanks);
}}else{putString(key,value,params,widget.options.externalParams.ignoreBlanks);}}$.ConsoleUtils.timeEnd(widget.name+"._putParam",widget.options.debugMode);
},_getPageRange:function(){var widget=this;$.ConsoleUtils.time(widget.name+"._getPageRange",widget.options.debugMode);var clickablePages=widget.options.toolbar.pager.clickablePages;
var halfDelta=clickablePages/2;var firstPageToShow=widget.currentPageVar-halfDelta;var lastPageToShow=widget.currentPageVar+halfDelta;
if(firstPageToShow<1){firstPageToShow=1;lastPageToShow=1+clickablePages;if(lastPageToShow>widget.totalPagesVar){lastPageToShow=widget.totalPagesVar;
}}if(lastPageToShow>widget.totalPagesVar){lastPageToShow=widget.totalPagesVar;firstPageToShow=widget.totalPagesVar-clickablePages;
if(firstPageToShow<1){firstPageToShow=1;}}$.ConsoleUtils.timeEnd(widget.name+"._getPageRange",widget.options.debugMode);return[firstPageToShow,lastPageToShow];
},_addShortcutPage:function(id,index){var widget=this;$.ConsoleUtils.time(widget.name+"._addShortcutPage",widget.options.debugMode);
var label1=widget._getString(id+"Label");var label2=widget._getString(id+"Label");var title1=$("<div/>").html(widget._getString(id+"Title")).text();
var title2=$("<div/>").html(widget._getString(id+"Title")).text();var page1=$("<li>",{id:id+"_"+widget.uuid});var page2=$("<li>",{id:id+"_"+widget.uuid});
var child1,child2;if(index===widget.currentPageVar||index<1||index>widget.totalPagesVar){$(page1).attr("class",widget.options.toolbar.pager.disabledClass);
$(page2).attr("class",widget.options.toolbar.pager.disabledClass);child1=$("<span>").append(label1);child2=$("<span>").append(label2);
}else{child1=$("<a>",{title:title1,href:"javascript:void(0);"}).append(label1);child2=$("<a>",{title:title2,href:"javascript:void(0);"}).append(label1);
$(child1).click(function(event){event.preventDefault();widget.gotoPage(index);});$(child2).click(function(event){event.preventDefault();
widget.gotoPage(index);});}$(child1).appendTo(page1);$(child2).appendTo(page2);$(widget.pagerListElem).append(page1);$(widget.pagerListElem2).append(page2);
$.ConsoleUtils.timeEnd(widget.name+"._addShortcutPage",widget.options.debugMode);},_addNumberedPage:function(index){var widget=this;
$.ConsoleUtils.time(widget.name+"._addNumberedPage",widget.options.debugMode);var page1=$("<li>",{id:"page"+index+"_"+widget.uuid});
var page2=$("<li>",{id:"page"+index+"_"+widget.uuid});var child1,child2;if(index===widget.currentPageVar){child1=$("<span>").append(index);
child2=$("<span>").append(index);$(page1).attr("class",widget.options.toolbar.pager.activeClass);$(page2).attr("class",widget.options.toolbar.pager.activeClass);
}else{child1=$("<a>",{href:"javascript:void(0);"}).append(index);child2=$("<a>",{href:"javascript:void(0);"}).append(index);
$(child1).click(function(event){event.preventDefault();widget.gotoPage(index);});$(child2).click(function(event){event.preventDefault();
widget.gotoPage(index);});}$(child1).appendTo(page1);$(child2).appendTo(page2);$(widget.pagerListElem).append(page1);$(widget.pagerListElem2).append(page2);
$.ConsoleUtils.timeEnd(widget.name+"._addNumberedPage",widget.options.debugMode);},_createGoto:function(nPages){var widget=this;
$.ConsoleUtils.time(widget.name+"._createGoto",widget.options.debugMode);var gotoElem;if(nPages<=widget.options.toolbar.jumpTo.max){gotoElem=$("<select>",{"class":widget.options.toolbar.jumpTo.selectClass});
for(var i=1;i<=nPages;i++){var label=$.StringUtils.replaceParams(widget._getString("gotoOptionLabel"),{index:i});var op=$("<option>").attr("value",i).append(label);
if(widget.currentPageVar===i){$(op).select();}$(gotoElem).append(op);}$(gotoElem).change(function(event){event.preventDefault();
var typed=$.NumberUtils.toNumber($(gotoElem).val());typed=$.NumberUtils.isPositive(typed)?typed:widget.currentPageVar;widget.gotoPage(typed);
});}else{gotoElem=$("<input>",{"class":widget.options.toolbar.jumpTo.inputClass,style:"width: 6em;",placeholder:widget._getString("gotoInputLabel")});
$(gotoElem).keyup(function(event){if(event.keyCode===13){var typed=$.NumberUtils.toNumber($(gotoElem).val());typed=$.NumberUtils.isNumber(typed)?typed:widget.currentPageVar;
if(typed<1){widget.gotoFirstPage();}else{if(typed>widget.totalPagesVar){widget.gotoLastPage();}else{widget.gotoPage(typed);
}}}});}$.ConsoleUtils.timeEnd(widget.name+"._createGoto",widget.options.debugMode);return gotoElem;},_createHeader:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._createHeader",widget.options.debugMode);var columns=widget.options.table.columns;var tr=$("<tr>");
for(var i=0;i<columns.length;i++){var col=columns[i];var title="";if($.ObjectUtils.isValued(col.headerCellTitle)){if($.isFunction(col.headerCellTitle)){title=col.headerCellTitle();
}else{if($.StringUtils.isNotEmpty(col.headerCellTitle)){title=col.headerCellTitle;}}}var td;if($.isFunction(col.headerCell)){td=col.headerCell(i,widget.options);
}else{if($.StringUtils.isString(col.headerCell)){td=$("<th>",{"class":col.headerCellClass,style:col.headerCellStyle,title:title}).append(col.headerCell);
}else{if($.ObjectUtils.isUndefined(col.headerCell)||$.ObjectUtils.isEmpty(col.headerCell)){td=$("<th>",{"class":col.headerCellClass,style:col.headerCellStyle,title:title});
}else{$.error("Unsupported columns["+i+"].headerCell type.");}}}if($.StringUtils.isString(col.name)){$(td).data("name",col.name);
}$(tr).append(td);}$.ConsoleUtils.timeEnd(widget.name+"._createHeader",widget.options.debugMode);return $("<thead>",{"class":widget.options.table.headerClass}).append(tr);
},_initHeaderOrdering:function(){var widget=this;var defaultOrderby=widget.options.ordering.orderBy;var defaultOrdermode=widget.options.ordering.orderMode;
var theadElem=$(widget.tableElem).find("thead");if($.StringUtils.isNotBlank(defaultOrderby)&&$.StringUtils.isNotBlank(defaultOrdermode)){$(theadElem).data("orderBy",defaultOrderby);
$(theadElem).data("orderMode",defaultOrdermode);}var orderBy=$(theadElem).data("orderBy");var orderMode=$(theadElem).data("orderMode");
if($.StringUtils.isBlankOrUnvalued(orderBy)||$.StringUtils.isBlankOrUnvalued(orderMode)){orderBy="";orderMode="";}var cells=$(theadElem).find("th");
$(cells).each(function(){if($.StringUtils.isNotBlank($(this).data("name"))){$(this).wrapInner($("<div>",{"class":"innerDiv",style:"display: inline-block; cursor: pointer;"}));
$(this).children(":first").click(function(){var currentName=$(this).closest("th").data("name");if(currentName!==orderBy){orderBy=currentName;
orderMode="asc";}else{if(orderMode==="asc"){orderMode="desc";}else{orderBy="";orderMode="";}}$(theadElem).data("orderBy",orderBy);
$(theadElem).data("orderMode",orderMode);widget._refreshOrderingArrows();widget.refresh();});}});widget._refreshOrderingArrows();
},_refreshOrderingArrows:function(){var widget=this;var theadElem=$(widget.tableElem).find("thead");var orderBy=$(theadElem).data("orderBy");
var orderMode=$(theadElem).data("orderMode");if($.StringUtils.isBlankOrUnvalued(orderBy)||$.StringUtils.isBlankOrUnvalued(orderMode)){orderBy="";
orderMode="";}$(theadElem).find("span.ordering").remove();var cells=$(theadElem).find("th");$(cells).each(function(){if($.StringUtils.isNotBlank($(this).data("name"))){var currentName=$(this).data("name");
if(currentName===orderBy){var arrow=$.WidgetUtils.createSpan(widget.options.ordering.arrow);if(orderMode==="asc"){$(arrow).append(widget._getString("ascArrow"));
}else{$(arrow).append(widget._getString("descArrow"));}$(this).append(arrow);}}});},_createRow:function(item){var widget=this;
$.ConsoleUtils.time(widget.name+"._createRow",widget.options.debugMode);var columns=widget.options.table.columns;var tr=$("<tr>");
for(var i=0;i<columns.length;i++){var col=columns[i];var title="";if($.ObjectUtils.isValued(col.bodyCellTitle)){if($.isFunction(col.bodyCellTitle)){title=col.bodyCellTitle(item);
}else{if($.StringUtils.isNotEmpty(col.bodyCellTitle)){title=$.StringUtils.replaceParams(col.bodyCellTitle,item);}}}if($.isFunction(col.bodyCell)){$(tr).append(col.bodyCell(item));
}else{if($.StringUtils.isString(col.bodyCell)&&!$.ObjectUtils.isEmpty(col.bodyCell)){var value=$.StringUtils.replaceParams(col.bodyCell,item);
$(tr).append($("<td>",{"class":col.bodyCellClass,style:col.bodyCellStyle,title:title}).append(value));}else{if($.ObjectUtils.isUndefined(col.bodyCell)||$.ObjectUtils.isEmpty(col.bodyCell)){$(tr).append($("<td>",{"class":col.bodyCellClass,style:col.bodyCellStyle,title:title}));
}else{$.error("Unsupported columns["+i+"].headerCell type.");}}}}$.ConsoleUtils.timeEnd(widget.name+"._createRow",widget.options.debugMode);
return tr;},_getString:function(key){var widget=this;return $.LocaleUtils.resolveKey(key,widget.options.locale,widget.regional);
},_preHook:function(){var widget=this;if(window.dwrRemoteCalls<=0){$.WidgetUtils.blockUI({content:widget._getString("lockMessage")});
}window.dwrRemoteCalls++;},_postHook:function(){var widget=this;window.dwrRemoteCalls--;if(window.dwrRemoteCalls<=0){$.WidgetUtils.unblockUI();
}},errorHandler:function(errorString,exception){var widget=this;if($.ObjectUtils.isValued(widget.options.error.redirectLink)){var link=widget.options.error.redirectLink;
if($.ObjectUtils.isValued(widget.options.error.messageParamName)){if($.ObjectUtils.isValued(exception.cause)){link=link+"?"+widget.options.error.messageParamName+"="+exception.cause.message;
}else{link=link+"?"+widget.options.error.messageParamName+"="+exception.message;}}window.location=link;}},regional:{br:{gotoOptionLabel:"Ir para @{index}",gotoInputLabel:"Ir para...",perPageLabel:"@{max} por p&aacute;gina",totalbarLabel:"Mostrando do @{first} ao @{last} de @{count} resultados.",noResultLabel:"Sem resultados.",firstLabel:"&laquo;",firstTitle:"Primeira p&aacute;gina",previousLabel:"&lsaquo;",previousTitle:"P&aacute;gina anterior",nextLabel:"&rsaquo;",nextTitle:"Pr&oacute;xima p&aacute;gina",lastLabel:"&raquo;",lastTitle:"&Uacute;ltima p&aacute;gina",lockMessage:"Efetuando requisi&ccedil;&atilde;o. Por favor, aguarde...",ascArrow:"&#9650;",descArrow:"&#9660;"},us:{gotoOptionLabel:"Go to @{index}",gotoInputLabel:"Go to...",perPageLabel:"@{max} per page",totalbarLabel:"Showing from @{first} to @{last} of @{count} results.",noResultLabel:"No results.",firstLabel:"&laquo;",firstTitle:"First page",previousLabel:"&lsaquo;",previousTitle:"Previous page",nextLabel:"&rsaquo;",nextTitle:"Next page",lastLabel:"&raquo;",lastTitle:"Last page",lockMessage:"Searching. Please, stand by...",ascArrow:"&#9650;",descArrow:"&#9660;"}}});
}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Show/hide a element (alertId) if CAPS is on - v${project.version}
 */
!function($){$.fn.capsAlert=function(options){var defaults={alertId:"capsAlert_@{id}"};
var settings=$.extend(true,{},defaults,options);return this.each(function(){var currSelector="#"+settings.alertId.replace("@{id}",$(this).attr("id"));
$(currSelector).hide();$(this).keypress(function(e){var isShiftPressed=false;if(e.shiftKey){isShiftPressed=e.shiftKey;}else{if(e.modifiers){isShiftPressed=!!(e.modifiers&4);
}}if(((e.which>=65&&e.which<=90)&&!isShiftPressed)||((e.which>=97&&e.which<=122)&&isShiftPressed)){if($(this).val()){$(currSelector).show();
}else{$(currSelector).hide();}}else{$(currSelector).hide();}});});};}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Creates a canvas clock - v${project.version}
 */
!function($){$.widget("mocca.clock",{name:"clock",version:"1.0.0-SNAPSHOT",options:{ajaxService:null,size:480,showSeconds:true,showDigital:true,showDate:true,outerBezel:{startColor:"#1874AD",endColor:"#013659"},innerBezel:{startColor:"#013659",endColor:"#1874AD"},background:{startColor:"#FFF",endColor:"#FAFAFC"},hands:{hours:"#000",minutes:"#000",seconds:"#E33"},preRender:null,postRender:null,digital:"#AAB",locale:"br",debugMode:false},_create:function(){var widget=this;
var setSize=function($elem,size){$elem.css("max-width",size+"px").css("max-height",size+"px");};widget.$canvas=$("<canvas>").css("width","100%");
var wrapper=$("<div>").css("display","inline-block").append(widget.$canvas);setSize(wrapper,widget.options.size);$(widget.element).append(wrapper);
widget._draw();},_resolveString:function(key){var widget=this;return $.LocaleUtils.resolve(key,widget.options.locale,widget.regional);
},_draw:function(){var widget=this;var render=function(now){var timeout=widget.options.showSeconds?1000:10000-((now.second%10)*1000);
var nowDate=new Date(now.year,now.month,now.day,now.hour,now.minute,now.second,now.millisecond);if($.FunctionUtils.isFunction(widget.options.preRender)){widget.options.preRender({now:now,nowDate:nowDate});
}var canvas,size,halfsize,ang,sang,cang,sx,sy,ex,ey,nx,ny;canvas=widget.$canvas[0];size=widget.options.size;halfsize=size*0.5;
if(canvas.getContext){var defaultFill="#000";var defaultFont="Bold "+size*0.04+"px Arial";var largeFont="Bold "+size*0.06+"px Arial";
canvas.width=size;canvas.height=size;var c2d=canvas.getContext("2d");c2d.clearRect(0,0,size,size);var grad0=c2d.createLinearGradient(size*0.5,size*0.2,size*1.5,size*1.5);
grad0.addColorStop(0,widget.options.background.startColor);grad0.addColorStop(1,widget.options.background.endColor);c2d.beginPath();
c2d.arc(halfsize,halfsize,halfsize*0.9,0,2*Math.PI,false);c2d.fillStyle=grad0;c2d.fill();c2d.fillStyle=defaultFill;c2d.save();
var grad1=c2d.createLinearGradient(0,0,size,size);grad1.addColorStop(0,widget.options.outerBezel.startColor);grad1.addColorStop(1,widget.options.outerBezel.endColor);
var grad2=c2d.createLinearGradient(0,0,size,size);grad2.addColorStop(0,widget.options.innerBezel.startColor);grad2.addColorStop(1,widget.options.innerBezel.endColor);
c2d.font=defaultFont;c2d.textBaseline="middle";c2d.textAlign="center";c2d.lineWidth=1;c2d.save();c2d.strokeStyle=grad1;c2d.lineWidth=size*0.025;
c2d.beginPath();c2d.arc(halfsize,halfsize,size*0.45,0,Math.PI*2,true);c2d.shadowOffsetX=size*0.008;c2d.shadowOffsetY=size*0.008;
c2d.shadowColor="rgba(0,0,0,0.5)";c2d.shadowBlur=size*0.04;c2d.stroke();c2d.restore();c2d.strokeStyle=grad2;c2d.lineWidth=size*0.025;
c2d.beginPath();c2d.arc(halfsize,halfsize,size*0.43,0,Math.PI*2,true);c2d.stroke();c2d.strokeStyle=defaultFill;c2d.save();
c2d.translate(halfsize,halfsize);for(var i=1;i<=60;i++){ang=Math.PI/30*i;sang=Math.sin(ang);cang=Math.cos(ang);if(i%5===0){c2d.lineWidth=size*0.008;
sx=sang*size*0.35;sy=cang*size*-0.35;ex=sang*size*0.4;ey=cang*size*-0.4;nx=sang*size*0.32;ny=cang*size*-0.32;c2d.fillText(i/5,nx,ny);
}else{c2d.lineWidth=size*0.003;sx=sang*size*0.37;sy=cang*size*0.37;ex=sang*size*0.4;ey=cang*size*0.4;}c2d.beginPath();c2d.moveTo(sx,sy);
c2d.lineTo(ex,ey);c2d.stroke();}if(widget.options.showDate){var format=function(val){return(val<10)?"0"+val:val;};c2d.fillStyle=widget.options.digital;
c2d.font=largeFont;var time=format(now.day)+"/"+format(now.month+1)+"/"+now.year;c2d.fillText(time,size*0,size*-0.165);c2d.fillStyle=defaultFill;
c2d.strokeStyle=defaultFill;c2d.font=defaultFont;c2d.save();}if(widget.options.showDigital){var format=function(val){return(val<10)?"0"+val:val;
};c2d.fillStyle=widget.options.digital;c2d.strokeStyle=widget.options.digital;c2d.font=largeFont;c2d.lineWidth=1;c2d.strokeRect(size*-0.15,size*0.125,size*0.3,size*0.08);
var time=format(now.hour)+":"+format(now.minute);if(widget.options.showSeconds){time+=":"+format(now.second);}c2d.fillText(time,size*0,size*0.165);
c2d.fillStyle=defaultFill;c2d.strokeStyle=defaultFill;c2d.font=defaultFont;c2d.save();}c2d.lineWidth=size*0.016;c2d.rotate(Math.PI/6*(now.hour+(now.minute/60)+(now.second/3600)));
c2d.strokeStyle=widget.options.hands.hours;c2d.beginPath();c2d.moveTo(0,size*0.03);c2d.lineTo(0,size*-0.22);c2d.shadowOffsetX=size*0.008;
c2d.shadowOffsetY=size*0.008;c2d.shadowColor="rgba(0,0,0,0.35)";c2d.shadowBlur=size*0.025;c2d.stroke();c2d.restore();c2d.save();
c2d.lineWidth=size*0.0125;c2d.rotate(Math.PI/30*now.minute);c2d.strokeStyle=widget.options.hands.minutes;c2d.beginPath();
c2d.moveTo(0,size*0.03);c2d.lineTo(0,size*-0.35);c2d.shadowOffsetX=size*0.008;c2d.shadowOffsetY=size*0.008;c2d.shadowColor="rgba(0,0,0,0.35)";
c2d.shadowBlur=size*0.025;c2d.stroke();c2d.restore();c2d.save();if(widget.options.showSeconds){c2d.lineWidth=size*0.006;c2d.rotate(Math.PI/30*now.second);
c2d.strokeStyle=widget.options.hands.seconds;c2d.beginPath();c2d.moveTo(0,size*0.03);c2d.lineTo(0,size*-0.28);c2d.shadowOffsetX=size*0.006;
c2d.shadowOffsetY=size*0.006;c2d.shadowColor="rgba(200,0,0,0.35)";c2d.shadowBlur=size*0.025;c2d.stroke();c2d.restore();}c2d.restore();
}if($.FunctionUtils.isFunction(widget.options.postRender)){widget.options.postRender({now:now,nowDate:nowDate});}setTimeout(function(){widget._draw();
},timeout);};var as=widget.options.ajaxService;if($.ObjectUtils.isValued(as)){as.getDate({callback:function(serverDate){render(serverDate);
}});}else{var tmp=new Date();var now={year:tmp.getFullYear(),month:tmp.getMonth(),day:tmp.getDate(),hour:tmp.getHours(),minute:tmp.getMinutes(),second:tmp.getSeconds(),millisecond:tmp.getMilliseconds(),ampm:(tmp.getHours()>=12)?"PM":"AM"};
render(now);}},regional:{br:{},us:{}}});}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Adds a custom confirmation dialog on element.click() - v${project.version}
 */
!function($){$.widget("mocca.confirmDialog",{name:"confirmDialog",version:"1.0.0-SNAPSHOT",options:{id:null,title:"@[title]",content:"@[content]",event:"click",yesBtn:{tagName:"<button>",label:"@[yes]","class":"btn small primary",icon:"icon-check",disabled:function(){return false;
},clickFunction:function(event,$content,$dialogCaller){return true;}},noBtn:{tagName:"<button>",label:"@[no]","class":"btn small",icon:"icon-ban-circle",disabled:function(){return false;
},clickFunction:function(event,$content,$dialogCaller){return true;}},"class":"qtip-dialog",classExt:"",postCreateContent:null,qtip:{suppress:false},cloneOptions:{},locale:"br",debugMode:false},_create:function(){var widget=this;
widget.$main=$("<div>");var $topRow=$("<div>");var $bottomRow=$("<div>",{"class":"align-right"});widget.$content=widget._createContent();
var noBtn=$.ObjectUtils.unwrap(widget.options.noBtn);if(noBtn!==false){widget.$noBtn=widget._createButton(noBtn);}var yesBtn=$.ObjectUtils.unwrap(widget.options.yesBtn);
if(yesBtn!==false){widget.$yesBtn=widget._createButton(yesBtn);}$topRow.append(widget.$content);$bottomRow.append(widget.$noBtn).append(widget.$yesBtn);
widget.$main.append($topRow).append($bottomRow);widget.$main.hide();var classes=$.WidgetUtils.getClass(widget.options);var options=jQuery.extend({},{id:widget.getId(),hide:false,content:{text:widget.$main,title:{text:widget._resolveString(widget.options.title),button:true}},position:{my:"top center",at:"top center",target:$(window),adjust:{scroll:false}},show:{event:widget.options.event,solo:true,modal:{on:true,blur:false}},style:{classes:"qtip-light qtip-rounded "+classes}},widget.options.qtip);
$(widget.element).qtip(options);},getId:function(){var widget=this;return($.StringUtils.isNotBlank(widget.options.id))?widget.options.id:widget.uuid;
},showDialog:function(){var widget=this;$(widget.dialogContent).closest(".qtip").qtip("toggle",true);},hideDialog:function(){var widget=this;
widget.$main.closest(".qtip").qtip("toggle",false);},repositionDialog:function(){var widget=this;widget.$main.closest(".qtip").qtip("reposition");
},_createContent:function(){var widget=this;var mainDiv=$("<div>",{"class":"margin"});var content=widget.options.content;
if($.StringUtils.isString(content)){content=$.LocaleUtils.resolve(content,widget.options.locale,widget.regional);}else{var opts=widget._unwrapOpts();
opts.args=[$(widget.element)];content=$.JqueryUtils.unwrapUnvaluedSafe(content,opts);}if($.JqueryUtils.isJquery(content)){content.show();
}if($.FunctionUtils.isFunction(widget.options.postCreateContent)){widget.options.postCreateContent(content,$(widget.element));
}mainDiv.append(content);return mainDiv;},_createButton:function(buttonObj){var widget=this;var $btn=$.JqueryUtils.unwrapUnvaluedSafe(buttonObj,widget._unwrapOpts());
$($btn).click(function(event){var ret=true;if($.FunctionUtils.isFunction(buttonObj.clickFunction)){ret=$.BooleanUtils.unwrapUnvaluedSafe(buttonObj.clickFunction,[event,widget.$content,$(widget.element)]);
}if(ret){widget.hideDialog();}});return $btn;},_unwrapOpts:function(){var widget=this;if($.BooleanUtils.isFalse(widget.options.cloneOptions)){return{locale:widget.options.locale,regional:widget.regional,copy:false,deepCopy:false,detach:true};
}return $.extend({},{locale:widget.options.locale,regional:widget.regional,copy:true,deepCopy:true,detach:true},widget.options.cloneOptions);
},_resolveString:function(key){var widget=this;return $.LocaleUtils.resolve(key,widget.options.locale,widget.regional);},regional:{br:{title:"Confirma&ccedil;&atilde;o...",content:"Tem certeza?",yes:"Sim",no:"N&atilde;o"},us:{title:"Confirmation...",content:"Are you sure?",yes:"Yes",no:"No"}}});
}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Date/Time picker abstraction.
 * 
 * This plugin works as a wrapper to the jquery-ui datepicker,
 * timepicker-addon, br localizations and other customizations.
 * 
 * The intent is to easy up the use of these plugins.
 * 
 * USAGE:
 * 
 * $('#myInput').dateTimePicker();                                      // will instantiate a date picker
 * $('#myInput').dateTimePicker({mode: 'date'});                        // same as above
 * $('#myInput').dateTimePicker({mode: 'time'});                        // will instantiate a time picker
 * $('#myInput').dateTimePicker({mode: 'datetime'});                    // will instantiate a date and time picker
 * $('#myInput').dateTimePicker({picker: {showClearButton: true}});     // will show a button to clear the field
 * 
 * NOTE: Inside the 'picker' object you can put ANY option that you would pass to the original date/time pickers.
 */
!function($){jQuery(function($){$.datepicker.regional.br={closeText:"Fechar",prevText:"&#x3c;Anterior",nextText:"Pr&oacute;ximo&#x3e;",currentText:"Hoje",monthNames:["Janeiro","Fevereiro","Mar&ccedil;o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthNamesShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],dayNames:["Domingo","Segunda-feira","Ter&ccedil;a-feira","Quarta-feira","Quinta-feira","Sexta-feira","S&aacute;bado"],dayNamesShort:["Dom","Seg","Ter","Qua","Qui","Sex","S&aacute;b"],dayNamesMin:["Dom","Seg","Ter","Qua","Qui","Sex","S&aacute;b"],weekHeader:"Sm",dateFormat:"dd/mm/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:"",clearText:"Limpar"};
$.timepicker.regional.br={timeOnlyTitle:"Escolha o hor&aacute;rio",timeText:"Hor&aacute;rio",hourText:"Hora",minuteText:"Minutos",secondText:"Segundos",millisecText:"Milissegundos",microsecText:"Microssegundos",timezoneText:"Fuso hor&aacute;rio",currentText:"Agora",closeText:"Fechar",clearText:"Limpar",timeFormat:"HH:mm",amNames:["a.m.","AM","A"],pmNames:["p.m.","PM","P"],isRTL:false};
var originalGenerateHTML=$.datepicker._generateHTML;$.datepicker._generateHTML=function(inst){var thishtml=$(originalGenerateHTML.call($.datepicker,inst));
if(inst.settings.showButtonPanel&&inst.settings.showClearButton){var label=inst.settings.clearText?inst.settings.clearText:"Clear";
var clearBtn=$("<button>",{type:"button","class":"ui-datepicker-clear ui-state-default ui-priority-secondary ui-corner-all",style:"float: left;"}).append(label).click(function(){inst.input.datepicker("setDate",null);
inst.input.datepicker("hide");inst.input.blur();});thishtml=$("<div>").append(thishtml);$(".ui-datepicker-buttonpane",thishtml).append(clearBtn);
thishtml=thishtml.children();}return thishtml;};});$.widget("mocca.dateTimePicker",{options:{mode:"date",showExample:true,locale:"br",picker:{showButtonPanel:true,showClearButton:false}},getOpt:function(path){var widget=this;
var p=path;var val=$.ObjectUtils.getPathValue(p,widget.options);if($.ObjectUtils.isUnvalued(val)&&$.StringUtils.startsWith(p,"picker.")){p=p.substring("picker.".length);
val=$(widget.element).datepicker("option",p);}return val;},refresh:function(){var widget=this;$(widget.element).datepicker("refresh");
},show:function(){var widget=this;$(widget.element).datepicker("show");},hide:function(){var widget=this;$(widget.element).datepicker("hide");
},getDate:function(){var widget=this;return $(widget.element).datepicker("getDate");},setDate:function(date){var widget=this;
$(widget.element).datepicker("setDate",date);},isDisabled:function(){var widget=this;return $(widget.element).datepicker("isDisabled");
},enable:function(){var widget=this;return $(widget.element).datepicker("enable");},disable:function(){var widget=this;return $(widget.element).datepicker("disable");
},_create:function(){var widget=this;var mode=widget.getOpt("mode").toLowerCase();var pickerOpts=widget.getOpt("picker");
if(mode==="date"){pickerOpts=$.extend(true,{},widget._getDateRegional(),pickerOpts);$(widget.element).datepicker(pickerOpts);
}else{if(mode==="time"){pickerOpts=$.extend(true,{},widget._getTimeRegional(),pickerOpts);$(widget.element).timepicker(pickerOpts);
}else{pickerOpts=$.extend(true,{},widget._getDateRegional(),pickerOpts);pickerOpts=$.extend(true,{},widget._getTimeRegional(),pickerOpts);
$(widget.element).datetimepicker(pickerOpts);}}var showExample=widget.getOpt("showExample");if(showExample){var text=widget._getString("example")+": "+widget._getExample(mode);
$(widget.element).attr("placeholder",text);}$(widget.element).mask(widget._getMask(mode));},_destroy:function(){var widget=this;
$(widget.element).datepicker("destroy");},_toTime:function(date){var widget=this;date.setMicroseconds(date.getMicroseconds());
var timezone=widget.getOpt("picker.timezone");timezone=$.ObjectUtils.isValued(timezone)?$.timepicker.timezoneOffsetNumber(timezone):((new Date()).getTimezoneOffset()*-1);
var time={hour:date.getHours(),minute:date.getMinutes(),second:date.getSeconds(),millisec:date.getMilliseconds(),microsec:date.getMicroseconds(),timezone:timezone};
return time;},_getDateRegional:function(){var widget=this;var regional=$.datepicker.regional[widget.getOpt("locale")];if($.ObjectUtils.isUnvalued(regional)){regional=$.datepicker.regional[""];
}return regional;},_getTimeRegional:function(){var widget=this;var regional=$.timepicker.regional[widget.getOpt("locale")];
if($.ObjectUtils.isUnvalued(regional)){regional=$.timepicker.regional[""];}return regional;},_getDateFormat:function(){var widget=this;
var format=widget.getOpt("picker.dateFormat");return($.ObjectUtils.isValued(format))?format:widget._getDateRegional().dateFormat;
},_getTimeFormat:function(){var widget=this;var format=widget.getOpt("picker.timeFormat");return($.ObjectUtils.isValued(format))?format:widget._getTimeRegional().timeFormat;
},_getDateTimeSeparator:function(){var widget=this;return widget.getOpt("picker.separator");},_getExample:function(mode){var widget=this;
var exDate=$.datepicker.formatDate(widget._getDateFormat(),widget._EXAMPLE_DATE,widget._getDateRegional());var exTime=$.datepicker.formatTime(widget._getTimeFormat(),widget._toTime(widget._EXAMPLE_DATE),widget._getTimeRegional());
if(mode==="date"){return exDate;}else{if(mode==="time"){return exTime;}else{return exDate+widget._getDateTimeSeparator()+exTime;
}}},_getMask:function(mode){var widget=this;var maskDate=$.datepicker.formatDate(widget._getDateFormat(),widget._EXAMPLE_DATE,widget._getDateRegional()).replace(/\d/g,"0");
var maskTime=$.datepicker.formatTime(widget._getTimeFormat(),widget._EXAMPLE_DATE,widget._getTimeRegional()).replace(/\d/g,"0");
if(mode==="date"){return maskDate;}else{if(mode==="time"){return maskTime;}else{return maskDate+widget._getDateTimeSeparator()+maskTime;
}}},_getString:function(key){var bundle=this._i18n[this.options.locale];return bundle[key];},_i18n:{br:{example:"Ex"},us:{example:"Ex"}},_EXAMPLE_DATE:$.DateUtils.now()});
}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Make a band dockable on scroll - v${project.version}
 */
!function($){$.widget("mocca.dockable",{name:"dockable",version:"1.0.0-SNAPSHOT",options:{dockedClass:"docked",locale:"br",debugMode:false},_create:function(){var widget=this;
var $band=$(widget.element);var init=$band.offset().top;var docked;var scrollTopFunc=function(){return document.body.scrollTop||document.documentElement.scrollTop;
};var onscroll=function(){var offsettop=$band.offset().top;var scrollTop=scrollTopFunc();var diff=offsettop-scrollTop;if(!docked&&diff<0){$band.css("top","0");
$band.css("position","fixed");$band.addClass(widget.options.dockedClass);docked=true;}else{if(docked&&scrollTop<=init){$band.css("top",init+"px");
$band.css("position","static");$band.removeClass(widget.options.dockedClass);docked=false;}}};document.addEventListener("scroll",onscroll);
document.body.addEventListener("scroll",onscroll);}});$(document).ready(function(){$(".dockable").filter(":first").dockable();
});}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Dynamic list generator - v${project.version}
 */
!function($){$.widget("mocca.dynamicList",{name:"dynamicList",version:"1.0.0-SNAPSHOT",options:{addItem:{selector:"#addButton",event:"click"},createNew:null,createExisting:null,preCreateNew:null,preCreateExisting:null,preRemoveItem:null,postCreateNew:null,postCreateExisting:null,postRemoveItem:null,existingItems:null,existingReadonly:false,existingUnremovable:false,maxItems:30,locale:"br",debugMode:false},_create:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._create",widget.options.debugMode);widget.target=widget._getBodyTarget();widget.nextIndex=widget.getSize();
widget._initRowTemplates();widget._initPreallocatedRows();widget._initAddButton();widget._addExistingRows();widget._registerAddButtonEvent();
$.ConsoleUtils.timeEnd(widget.name+"._create",widget.options.debugMode);},_getBodyTarget:function(){var widget=this;var elem;
elem=$(widget.element);if(elem.isTableBody()||elem.isDataRole("body")||elem.hasClass("tbody")){return elem;}else{if(elem.isTable()){return elem.find("> tbody");
}}var tmp;tmp=elem.find('[data-role="body"]:first');if($.JqueryUtils.isSingleton(tmp)){return tmp;}tmp=elem.find(".tbody:first");
if($.JqueryUtils.isSingleton(tmp)){return tmp;}return elem;},_getRows:function(){var widget=this;return $(widget.target).find('> [data-role="bodyRow"]');
},_getParentRow:function(elem){return $(elem).closest('[data-role="bodyRow"]');},_initRowTemplates:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._initRowTemplates",widget.options.debugMode);var newTmp=widget.target.find('> [data-role="createNew"]');
if($.JqueryUtils.isSingleton(newTmp)){widget.bodyRowNew=newTmp.clone();newTmp.remove();}else{if($.JqueryUtils.isNotEmpty(newTmp)){throw new Error('Only one "createNew" is permited.');
}}var existingTmp=widget.target.find('> [data-role="createExisting"]');if($.JqueryUtils.isSingleton(existingTmp)){widget.bodyRowExisting=existingTmp.clone();
existingTmp.remove();}else{if($.JqueryUtils.isNotEmpty(existingTmp)){throw new Error('Only one "createExisting" is permited.');
}}if($.FunctionUtils.isNotFunction(widget.options.createNew)&&$.JqueryUtils.isEmptyOrUnvalued(widget.bodyRowNew)){throw new Error('"createNew" function nor template defined.');
}$.ConsoleUtils.timeEnd(widget.name+"._initRowTemplates",widget.options.debugMode);},_initPreallocatedRows:function(){var widget=this;
widget._initFields(widget.target);widget._initRemoveBtns(widget.target,widget.options.existingUnremovable);},_initAddButton:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._initAddButton",widget.options.debugMode);widget.addButtonEvent="click";if($.StringUtils.isString(widget.options.addItem)){widget.addButton=$(widget.options.addItem);
}else{widget.addButton=$(widget.options.addItem.selector);widget.addButtonEvent=widget.options.addItem.event;}if($.JqueryUtils.isEmpty(widget.addButton)){throw new Error('Must have at least one "add-buttom".');
}$.ConsoleUtils.timeEnd(widget.name+"._initAddButton",widget.options.debugMode);},_addExistingRows:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._addExistingRows",widget.options.debugMode);var existingItems=widget._unwrapExistingItems();
if($.ObjectUtils.isValued(existingItems)){var maxAdd=$.ArrayUtils.size(existingItems);if((widget.getSize()+maxAdd)>widget.options.maxItems){maxAdd=widget.options.maxItems-widget.getSize();
console.warn('"existingItems" has too much items. Some will be discarted.');}for(var i=0;i<maxAdd;i++){var currItem=existingItems[i];
if($.ObjectUtils.isValued(currItem)){widget._appenRow(currItem,true);}}}$.ConsoleUtils.timeEnd(widget.name+"._addExistingRows",widget.options.debugMode);
},_registerAddButtonEvent:function(){var widget=this;$.ConsoleUtils.time(widget.name+"._registerAddButtonEvent",widget.options.debugMode);
var trigger={};trigger[widget.addButtonEvent]=function(event){event.preventDefault();widget._appenRow(null,false);};widget._on(widget.addButton,trigger);
$.ConsoleUtils.timeEnd(widget.name+"._registerAddButtonEvent",widget.options.debugMode);},_unwrapExistingItems:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._unwrapExistingItems",widget.options.debugMode);var existingItems=null;if($.ObjectUtils.isValued(widget.options.existingItems)){if($.FunctionUtils.isFunction(widget.options.existingItems)){existingItems=widget.options.existingItems();
}else{if($.ArrayUtils.isArray(widget.options.existingItems)){existingItems=widget.options.existingItems;}}}$.ConsoleUtils.timeEnd(widget.name+"._unwrapExistingItems",widget.options.debugMode);
return existingItems;},_appenRow:function(item,existing){var widget=this;$.ConsoleUtils.time(widget.name+"._appenRow",widget.options.debugMode);
if(widget.getSize()<widget.options.maxItems){if(existing&&$.FunctionUtils.isFunction(widget.options.preCreateExisting)){widget.options.preCreateExisting();
}else{if(!existing&&$.FunctionUtils.isFunction(widget.options.preCreateNew)){widget.options.preCreateNew();}}var row=(existing)?widget._getRowExisting(item):widget._getRowNew(item);
row.show();$(widget.target).append(row);widget.nextIndex++;widget.refresh();if(existing&&$.FunctionUtils.isFunction(widget.options.postCreateExisting)){widget.options.postCreateExisting(row);
}else{if(!existing&&$.FunctionUtils.isFunction(widget.options.postCreateNew)){widget.options.postCreateNew(row);}}}$.ConsoleUtils.timeEnd(widget.name+"._appenRow",widget.options.debugMode);
},_initRemoveBtns:function(parent,unremovable){var widget=this;$.ConsoleUtils.time(widget.name+"._initRemoveBtns",widget.options.debugMode);
var removeTriggers=$(parent).find('button[data-role="removeItem"]');removeTriggers.click(function(event){event.preventDefault();
widget._removeRow(widget._getParentRow(this));});if(unremovable){$(removeTriggers).disable();}$.ConsoleUtils.timeEnd(widget.name+"._initRemoveBtns",widget.options.debugMode);
},_initFields:function(parent){var widget=this;$.ConsoleUtils.time(widget.name+"._initFields",widget.options.debugMode);var inputs=$(parent).find("input, textarea").not(":button");
var selects=$(parent).find("select");if(widget.options.existingReadonly){$(inputs).readonly();$(selects).disable();}$.ConsoleUtils.timeEnd(widget.name+"._initFields",widget.options.debugMode);
},_removeRow:function(toRemove){var widget=this;$.ConsoleUtils.time(widget.name+"._removeRow",widget.options.debugMode);if($.JqueryUtils.isNotEmpty(toRemove)){if($.FunctionUtils.isFunction(widget.options.preRemoveItem)){widget.options.preRemoveItem(toRemove);
}toRemove.remove();widget.refresh();if($.FunctionUtils.isFunction(widget.options.postRemoveItem)){widget.options.postRemoveItem(toRemove);
}}$.ConsoleUtils.timeEnd(widget.name+"._removeRow",widget.options.debugMode);},getSize:function(){var widget=this;return $.JqueryUtils.size(widget._getRows());
},removeRow:function(index){var widget=this;$.ConsoleUtils.time(widget.name+".removeRow",widget.options.debugMode);var rows=widget._getRows();
var size=widget.getSize();if(index>=0&&index<size){var toRemove=$(rows).get(index);widget._removeRow(toRemove);}$.ConsoleUtils.timeEnd(widget.name+".removeRow",widget.options.debugMode);
},refresh:function(){var widget=this;$.ConsoleUtils.time(widget.name+".refresh",widget.options.debugMode);if(widget.getSize()>=widget.options.maxItems){$(widget.addButton).disable();
}else{if(widget.getSize()<widget.options.maxItems){$(widget.addButton).enable();}}var rows=widget._getRows();rows.each(function(index,current){var row=$(current);
row.attr("data-index",index);row.find('[data-role="index"]').empty().append(index);row.find('[data-role="counter"]').empty().append((index+1));
});$.ConsoleUtils.timeEnd(widget.name+".refresh",widget.options.debugMode);},_getRowNew:function(item){var widget=this;var _item=jQuery.extend({},{index:widget.nextIndex},item);
$.ConsoleUtils.time(widget.name+"._getRowNew",widget.options.debugMode);var row;if($.JqueryUtils.isSingleton(widget.bodyRowNew)){var rowHtml=$(widget.bodyRowNew.clone()).sourceHtml();
rowHtml=$.StringUtils.replaceParams(rowHtml,_item);row=$($.parseHTML(rowHtml)[0]);}else{if($.FunctionUtils.isFunction(widget.options.createNew)){row=widget.options.createNew(_item);
}else{throw new Error('"createNew" function not defined and there is no "bodyRowNew" element.');}}row.attr("data-role","bodyRow");
widget._initRemoveBtns(row,false);$.ConsoleUtils.timeEnd(widget.name+"._getRowNew",widget.options.debugMode);return row;},_getRowExisting:function(item){var widget=this;
var _item=jQuery.extend({},{index:widget.nextIndex},item);$.ConsoleUtils.time(widget.name+"._getRowExisting",widget.options.debugMode);
var row;if($.JqueryUtils.isSingleton(widget.bodyRowExisting)){var rowHtml=$(widget.bodyRowExisting.clone()).sourceHtml();
rowHtml=$.StringUtils.replaceParams(rowHtml,_item);row=$($.parseHTML(rowHtml)[0]);}else{if($.FunctionUtils.isFunction(widget.options.createExisting)){row=widget.options.createExisting(_item);
}else{row=widget._getRowNew(_item);}}row.attr("data-role","bodyRow");widget._initFields(row);widget._initRemoveBtns(row,widget.options.existingUnremovable);
$.ConsoleUtils.timeEnd(widget.name+"._getRowExisting",widget.options.debugMode);return row;},_getString:function(key){var widget=this;
return $.LocaleUtils.resolveKey(key,widget.options.locale,widget.regional);},regional:{br:{},us:{}}});}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Table with pagination for DWR/Ajax apps - v${project.version}
 */
!function($){$.widget("mocca.filePicker",{name:"filePicker",version:"1.0.0-SNAPSHOT",options:{button:{"class":"btn",classExt:"primary",icon:"icon-folder-open"},wrapper:{"class":"input-append",classExt:"",style:"overflow: hidden; position: relative;"},locale:"br",debugMode:false},_create:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._create",widget.options.debugMode);$(widget.element).removeClass().removeAttr("style").css({opacity:0.2,display:"block",height:"100%",width:"100%",position:"absolute",right:0,top:0,"z-index":"-9999"});
var inputAppend=$.WidgetUtils.createDiv(widget.options.wrapper);var addonWrapper=$.WidgetUtils.createDiv({"class":"addon-wrapper"});
var addonButton=$.WidgetUtils.createButton(widget.options.button);var inputWrapper=$.WidgetUtils.createDiv({"class":"input-wrapper"});
var input=$.WidgetUtils.createTextInput({"class":"textfield",readonly:true,placeholder:"@[placeholder]"},widget.options.locale,widget.regional);
addonWrapper.append(addonButton);inputWrapper.append(input);$(widget.element).wrap(inputAppend).after(inputWrapper).after(addonWrapper);
$(widget.element).change(function(event){event.preventDefault();var filename=$(widget.element).val();var idx1=filename.lastIndexOf("\\");
var idx2=filename.lastIndexOf("/");if(idx1>idx2&&idx1>=0){filename=filename.substring(idx1+1);}else{if(idx2>idx1&&idx2>=0){filename=filename.substring(idx2+1);
}}if($.StringUtils.isNotBlank(filename)){$(input).val(filename);}});$(addonButton).click(function(event){event.preventDefault();
$(widget.element).click();});$.ConsoleUtils.timeEnd(widget.name+"._create",widget.options.debugMode);},_getString:function(key){var widget=this;
return $.LocaleUtils.resolveKey(key,widget.options.locale,widget.regional);},regional:{br:{placeholder:"Selecione um arquivo..."},us:{placeholder:"Choose a file..."}}});
}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Creates a simple dialog to find entities via DWR/Ajax - v${project.version}
 */
!function($){$.widget("mocca.findDialog",{name:"findDialog",version:"1.0.0-SNAPSHOT",options:{id:null,ajaxService:null,ajaxFunctions:{validate:"validate",search:"search"},maxResults:50,targets:[{fieldId:"value",expression:"@{id}",delimiter:";"},{fieldId:"description",expression:"@{nome}",delimiter:";"}],title:{text:"My Find Dialog",button:true},search:{panel:null,panelExt:null,keywordField:"keyword",keywordFieldPlaceholder:""},table:{"class":"table striped stroked narrow hovered",classExt:"",headerClass:"header",columns:[{headerCell:"Entidade",headerCellClass:"mini-padding-h",headerCellStyle:"",headerCellTitle:"",bodyCell:"Entidade id=@{id}",bodyCellClass:"mini-padding-h",bodyCellStyle:"",bodyCellTitle:""}],wrapper:{"class":"stroked margin-v",style:"max-height: 12em; overflow: auto;"},postAddLines:null},selection:{"class":"active",classExt:"primary",mode:"single",mandatory:true},cancelBtn:{"class":"btn small",icon:"icon-ban-circle",label:"@[cancel]"},cleanBtn:{"class":"btn small",icon:"icon-eraser",label:"@[selectNone]"},okBtn:{"class":"btn small primary",icon:"icon-check",label:"@[ok]"},message:{"class":"tip box bordered shadowed warning margin-bottom"},externalParams:{},postOk:null,postCancel:null,event:"click",cleanOnShow:false,refreshOnShow:false,locale:"br",debugMode:false},_create:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._create",widget.options.debugMode);widget.created=false;for(var i=0;i<widget.options.targets.length;
i++){var target=$.extend({},{delimiter:";",readonly:true},widget.options.targets[i]);var targetId=target.fieldId;if(target.readonly){$("#"+targetId).readonly();
}var toArrayOpts={ignoreBlanks:true,delimiter:target.delimiter};widget[targetId]=$.ArrayUtils.toArray($("#"+targetId).val(),toArrayOpts);
}widget._disabledChange(widget.options.disabled);widget.messageElem=$("<div>",{"class":$.WidgetUtils.getClass(widget.options.message)}).hide();
$.ConsoleUtils.time(widget.name+"._searchPanel",widget.options.debugMode);widget.searchPanelElem=$.isFunction(widget.options.search.panel)?widget.options.search.panel():widget._searchPanel();
if($.isFunction(widget.options.search.panelExt)){widget.options.search.panelExt(widget.searchPanelElem);}$.ConsoleUtils.timeEnd(widget.name+"._searchPanel",widget.options.debugMode);
widget.tableElem=$("<table>",{"class":$.WidgetUtils.getClass(widget.options.table)});if($.isFunction(widget.options.table.headerFunction)){$(widget.tableElem).append(widget.options.table.headerFunction());
}else{$(widget.tableElem).append(widget._createHeader());}widget.tbodyElem=$("<tbody>").appendTo($(widget.tableElem));widget.cleanBtn=$.WidgetUtils.createButton(widget.options.cleanBtn,widget.options.locale,widget.regional);
widget.cancelBtn=$.WidgetUtils.createButton(widget.options.cancelBtn,widget.options.locale,widget.regional);widget.okBtn=$.WidgetUtils.createButton(widget.options.okBtn,widget.options.locale,widget.regional);
$(widget.cleanBtn).click(function(){widget.unselectAll();});$(widget.cancelBtn).click(function(){widget.hideDialog();if($.FunctionUtils.isFunction(widget.options.postCancel)){widget.options.postCancel();
}});$(widget.okBtn).click(function(){$(widget.messageElem).empty();for(var i=0;i<widget.options.targets.length;i++){var targetId=widget.options.targets[i].fieldId;
widget[targetId]=[];}var selectedRow=$(widget.tbodyElem).find("."+widget.getOpt("selection.class"));if(selectedRow.length===0&&widget.options.selection.mandatory){$(widget.messageElem).append(widget._getString("noSelection")).show();
}else{$(widget.messageElem).hide();$(selectedRow).each(function(index){for(var i=0;i<widget.options.targets.length;i++){var targetId=widget.options.targets[i].fieldId;
widget[targetId][index]=$(this).data(targetId);}});for(var i=0;i<widget.options.targets.length;i++){var target=$.extend({},{delimiter:";",readonly:true},widget.options.targets[i]);
var targetId=target.fieldId;var toStringOpts={ignoreBlanks:true,delimiter:target.delimiter};$("#"+targetId).val($.ArrayUtils.toString(widget[targetId],toStringOpts));
}widget.hideDialog();}if($.FunctionUtils.isFunction(widget.options.postOk)){var selected={};for(var i=0;i<widget.options.targets.length;
i++){var targetId=widget.options.targets[i].fieldId;selected[targetId]=widget[targetId];}widget.options.postOk(selected);
}});widget.dialogContent=$("<div>").append(widget.messageElem).append(widget.searchPanelElem).append($("<div>",{"class":"row"}).append($("<div>",{"class":"span12"}).append($("<div>",{style:widget.options.table.wrapper.style}).append(widget.tableElem)))).append($("<div>",{"class":"row"}).append($("<div>",{"class":"span6"}).append(widget.cleanBtn)).append($("<div>",{"class":"span6 align-right"}).append(widget.cancelBtn).append(widget.okBtn)));
widget._registerRefreshers();widget.showDialog();$.ConsoleUtils.timeEnd(widget.name+"._create",widget.options.debugMode);
},refresh:function(){var widget=this;var ajaxService=widget.options.ajaxService;var validateFunc=widget.options.ajaxFunctions.validate;
var searchFunc=widget.options.ajaxFunctions.search;widget._clean(false);var noErrors=true;if($.ObjectUtils.isDefined(ajaxService[validateFunc])){ajaxService[validateFunc](widget.getParams(),{callback:function(errors){$.ConsoleUtils.time(widget.name+".validateCallback",widget.options.debugMode);
var keys=$.ObjectUtils.getKeys(errors);if($.ArrayUtils.isNotEmpty(keys)){noErrors=false;for(var i=0;i<keys.length;i++){var field=keys[i];
var errorMsg=errors[field];var span=widget.searchPanelElem.find("#_"+field);$(span).empty().append(errorMsg).show();}}$.ConsoleUtils.timeEnd(widget.name+".validateCallback",widget.options.debugMode);
},async:false,preHook:function(){$.ConsoleUtils.time(widget.name+".validate",widget.options.debugMode);widget._preHook();
},postHook:function(){widget._postHook();$.ConsoleUtils.timeEnd(widget.name+".validate",widget.options.debugMode);}});}else{console.warn("validate method not exposed on spring-dwr.xml");
}if(noErrors){ajaxService[searchFunc](0,(widget.options.maxResults+1),widget.getParams(),{callback:function(result){$.ConsoleUtils.time(widget.name+".searchCallback",widget.options.debugMode);
if(result.length===0){$(widget.messageElem).append(widget._getString("noResults")).show();}else{var max=result.length;if(result.length>widget.options.maxResults){max=widget.options.maxResults;
$(widget.messageElem).append(widget._getString("overResults")).show();}for(var i=0;i<max;i++){$(widget.tbodyElem).append(widget._createRow(result[i]));
}}widget.repositionDialog();widget.searchPanelElem.find("input:text, select, textarea").first().focus();$.ConsoleUtils.timeEnd(widget.name+".searchCallback",widget.options.debugMode);
},async:true,preHook:function(){widget._blockDialog();$.ConsoleUtils.time(widget.name+".search",widget.options.debugMode);
},postHook:function(){$.ConsoleUtils.timeEnd(widget.name+".search",widget.options.debugMode);widget._unblockDialog();}});
}},showDialog:function(){var widget=this;if(!widget.created){$(widget.element).qtip({suppress:false,id:widget._getId("id"),hide:{event:false,effect:function(){$(this).slideUp(500);
}},content:{text:widget.dialogContent,title:widget.options.title},position:{my:"center",at:"center",target:$(window),adjust:{scroll:true}},show:{event:widget.options.event,solo:true,modal:{on:true,blur:false},effect:function(){$(this).fadeTo(600,1);
}},style:{classes:"qtip-light qtip-rounded qtip-dialog"},events:{show:function(event){if(widget.options.cleanOnShow){widget.unselectAll();
widget._clean(true);widget.repositionDialog();}else{$(widget.messageElem).empty().hide();for(var i=0;i<widget.options.targets.length;
i++){var target=$.extend({},{delimiter:";",readonly:true},widget.options.targets[i]);var targetId=target.fieldId;var toArrayOpts={ignoreBlanks:true,delimiter:target.delimiter};
widget[targetId]=$.ArrayUtils.toArray($("#"+targetId).val(),toArrayOpts);}widget._refreshSelection();}if(widget.options.refreshOnShow){widget.refresh();
}widget.searchPanelElem.find("input:text, select, textarea").first().focus();},visible:function(){widget.searchPanelElem.find("input:text, select, textarea").first().focus();
}}});widget.created=true;}else{$(widget.dialogContent).closest(".qtip").qtip("toggle",true);widget.searchPanelElem.find("input:text, select, textarea").first().focus();
}},unselectAll:function(){var widget=this;for(var i=0;i<widget.options.targets.length;i++){var targetId=widget.options.targets[i].fieldId;
widget[targetId]=[];}var selectedRow=$(widget.tbodyElem).find("."+widget.getOpt("selection.class"));var selFullTheme=$.WidgetUtils.getClass(widget.options.selection);
$(selectedRow).each(function(index){$(this).removeClass(selFullTheme);});},_clean:function(cleanSearchPanel){var widget=this;
$(widget.messageElem).empty().hide();$(widget.tbodyElem).empty();if(cleanSearchPanel){var inputs=$(widget.searchPanelElem).find("input").not('[type="radio"]').not('[type="checkbox"]').not('[type="button"]');
var selects=$(widget.searchPanelElem).find("select");var checks=$(widget.searchPanelElem).find("input:checked");inputs.val("");
selects.val("");checks.uncheck();}},hideDialog:function(){var widget=this;$(widget.dialogContent).closest(".qtip").qtip("toggle",false);
},repositionDialog:function(){var widget=this;$(widget.dialogContent).qtip("reposition");},_setOption:function(key,value){var widget=this;
if(key==="disabled"){widget._disabledChange(value);}$.Widget.prototype._setOption.apply(widget,arguments);},_disabledChange:function(value){var widget=this;
$.ConsoleUtils.time(widget.name+"._disabledChange",widget.options.debugMode);var v=$.FunctionUtils.unwrap(value);if(v){$(widget.element).disable();
for(var i=0;i<widget.options.targets.length;i++){var targetId=widget.options.targets[i].fieldId;$("#"+targetId).disable();
}}else{$(widget.element).enable();for(var i=0;i<widget.options.targets.length;i++){var targetId=widget.options.targets[i].fieldId;
$("#"+targetId).enable();}}$.ConsoleUtils.timeEnd(widget.name+"._disabledChange",widget.options.debugMode);},getOpt:function(path){var widget=this;
return $.ObjectUtils.getPathValue(path,widget.options);},_searchPanel:function(){var widget=this;var inputElem=$("<input>",{id:widget.options.search.keywordField,type:"text","class":"textfield table-refresh",placeholder:widget.options.search.keywordFieldPlaceholder});
var searchBtn=$("<button>",{type:"button","class":"btn table-refresh"}).append($("<i>",{"class":"icon-search"})).append(" ").append(widget._getString("search"));
var errorMsg=$("<span>",{id:"_"+widget.options.search.keywordField,"class":"error pill"}).hide();var panel=$("<div>",{"class":"row margin-top"}).append($("<div>",{"class":"span12"}).append($("<div>",{"class":"input-append width-100"}).append($("<div>",{"class":"addon-wrapper"}).append(searchBtn)).append($("<div>",{"class":"input-wrapper"}).append(inputElem)))).append(errorMsg);
panel.append();return panel;},_registerRefreshers:function(){var widget=this;$.ConsoleUtils.time(widget.name+"._registerRefreshers",widget.options.debugMode);
var refreshes=$(widget.dialogContent).find(".table-refresh");$(refreshes).filter(":button").each(function(){$(this).click(function(event){event.preventDefault();
widget.refresh();});});$(refreshes).not(":button").filter(":input").each(function(){if($(this).attr("type")==="text"){$(this).keyup(function(event){if(event.keyCode===13){event.preventDefault();
widget.refresh();}});}else{$(this).change(function(event){event.preventDefault();widget.refresh();});}});widget.otherRefresherElems=$(refreshes).not(":button").filter(":input");
$.ConsoleUtils.timeEnd(widget.name+"._registerRefreshers",widget.options.debugMode);},_createHeader:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._createHeader",widget.options.debugMode);var columns=widget.options.table.columns;var tr=$("<tr>");
for(var i=0;i<columns.length;i++){var col=columns[i];var title="";if($.ObjectUtils.isValued(col.headerCellTitle)){if($.isFunction(col.headerCellTitle)){title=col.headerCellTitle();
}else{if($.StringUtils.isNotEmpty(col.headerCellTitle)){title=col.headerCellTitle;}}}if($.isFunction(col.headerCell)){$(tr).append(col.headerCell(i,widget.options));
}else{if($.StringUtils.isString(col.headerCell)){$(tr).append($("<th>",{"class":col.headerCellClass,style:col.headerCellStyle,title:title}).append(col.headerCell));
}else{if($.ObjectUtils.isUndefined(col.headerCell)||$.ObjectUtils.isEmpty(col.headerCell)){$(tr).append($("<th>",{"class":col.headerCellClass,style:col.headerCellStyle,title:title}));
}else{$.error("Unsupported columns["+i+"].headerCell type.");}}}}return $("<thead>",{"class":widget.options.table.headerClass}).append(tr);
$.ConsoleUtils.timeEnd(widget.name+"._createHeader",widget.options.debugMode);},_createRow:function(item){var widget=this;
$.ConsoleUtils.time(widget.name+"._createRow",widget.options.debugMode);var columns=widget.options.table.columns;var tr=$("<tr>",{"class":"clickable"});
for(var i=0;i<widget.options.targets.length;i++){var target=widget.options.targets[i];var targetId=target.fieldId;var exprValue=$.StringUtils.replaceParams(target.expression,item);
if($.StringUtils.isBlankOrUnvalued(exprValue)||exprValue===target.expression){$.error("Invalid expression for target "+targetId);
}else{$(tr).data(targetId,exprValue);}}for(var i=0;i<columns.length;i++){var col=columns[i];var title="";if($.ObjectUtils.isValued(col.bodyCellTitle)){if($.isFunction(col.bodyCellTitle)){title=col.bodyCellTitle(item);
}else{if($.StringUtils.isNotEmpty(col.bodyCellTitle)){title=$.StringUtils.replaceParams(col.bodyCellTitle,item);}}}if($.isFunction(col.bodyCell)){$(tr).append(col.bodyCell(item));
}else{if($.StringUtils.isString(col.bodyCell)&&!$.ObjectUtils.isEmpty(col.bodyCell)){var value=$.StringUtils.replaceParams(col.bodyCell,item);
$(tr).append($("<td>",{"class":col.bodyCellClass,style:col.bodyCellStyle,title:title}).append(value));}else{if($.ObjectUtils.isUndefined(col.bodyCell)||$.ObjectUtils.isEmpty(col.bodyCell)){$(tr).append($("<td>",{"class":col.bodyCellClass,style:col.bodyCellStyle,title:title}));
}else{$.error("Unsupported columns["+i+"].headerCell type.");}}}}$(tr).click(function(){var selClass=widget.getOpt("selection.class");
var selFullTheme=$.WidgetUtils.getClass(widget.options.selection);if(widget.options.selection.mode==="single"){var active=$(widget.tbodyElem).find("."+selClass);
$(active).removeClass(selFullTheme);$(this).addClass(selFullTheme);}else{if($(this).hasClass(selClass)){$(this).removeClass(selFullTheme);
}else{$(this).addClass(selFullTheme);}}});$.ConsoleUtils.timeEnd(widget.name+"._createRow",widget.options.debugMode);return tr;
},getParams:function(){var widget=this;$.ConsoleUtils.time(widget.name+".getParams",widget.options.debugMode);var params=$.FunctionUtils.unwrap(widget.options.externalParams,{copy:true});
var inputs=$(widget.searchPanelElem).find("input").not('[type="radio"]').not('[type="checkbox"]');$(inputs).each(function(){widget._putParam(this,params);
});var radios=$(widget.searchPanelElem).find("input:radio:checked");$(radios).each(function(){widget._putParam(this,params);
});var checkboxes=$(widget.searchPanelElem).find("input:checkbox:checked");$(checkboxes).each(function(){widget._putParam(this,params);
});var selects=$(widget.searchPanelElem).find("select");$(selects).each(function(){widget._putParam(this,params);});$.ConsoleUtils.timeEnd(widget.name+".getParams",widget.options.debugMode);
return params;},_getId:function(path){var widget=this;var id=widget.getOpt(path);if($.ObjectUtils.isUnvalued(id)){id=path.replace(".","_")+"_"+widget.uuid;
}return id;},_putParam:function(paramElem,params){var widget=this;$.ConsoleUtils.time(widget.name+"._putParam",widget.options.debugMode);
var key=$(paramElem).attr("name");if($.StringUtils.isBlankOrUnvalued(key)){key=$(paramElem).attr("id");}if($.StringUtils.isNotBlank(key)){var putString=function(key,value,params,ignoreBlanks){if($.StringUtils.isNotBlank(value)||!ignoreBlanks){if($.StringUtils.isNotEmpty(params[key])){params[key]=params[key]+"|"+value;
}else{params[key]=value;}}};var value=$(paramElem).val();if($.ArrayUtils.isNotEmpty(value)){for(var i=0;i<value.length;i++){putString(key,value[i],params,widget.options.externalParams.ignoreBlanks);
}}else{putString(key,value,params,widget.options.externalParams.ignoreBlanks);}}$.ConsoleUtils.timeEnd(widget.name+"._putParam",widget.options.debugMode);
},_getString:function(key){var widget=this;return $.LocaleUtils.resolveKey(key,widget.options.locale,widget.regional);},_refreshSelection:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._refreshSelection",widget.options.debugMode);var targetId=widget.options.targets[0].fieldId;
var rows=$(widget.tbodyElem).find("tr");var selFullTheme=$.WidgetUtils.getClass(widget.options.selection);$(rows).each(function(index){if($.ArrayUtils.contains(widget[targetId],$(this).data(targetId))){$(this).addClass(selFullTheme);
}else{$(this).removeClass(selFullTheme);}});$.ConsoleUtils.timeEnd(widget.name+"._refreshSelection",widget.options.debugMode);
},_blockDialog:function(){var widget=this;var target=widget.dialogContent.closest(".qtip-content");var content=$.WidgetUtils.createBouncingText(widget._getString("loading"));
$.WidgetUtils.blockUI({content:content,target:target,css:{width:"26em"}});},_unblockDialog:function(){var widget=this;var target=widget.dialogContent.closest(".qtip-content");
$.WidgetUtils.unblockUI(target);},_preHook:function(){var widget=this;if(window.dwrRemoteCalls<=0){$.WidgetUtils.blockUI({content:widget._getString("lockMessage")});
}window.dwrRemoteCalls++;},_postHook:function(){var widget=this;window.dwrRemoteCalls--;if(window.dwrRemoteCalls<=0){$.WidgetUtils.unblockUI();
}},errorHandler:function(errorString,exception){var widget=this;if($.ObjectUtils.isValued(widget.options.error.redirectLink)){var link=widget.options.error.redirectLink;
if($.ObjectUtils.isValued(widget.options.error.messageParamName)){if($.ObjectUtils.isValued(exception.cause)){link=link+"?"+widget.options.error.messageParamName+"="+exception.cause.message;
}else{link=link+"?"+widget.options.error.messageParamName+"="+exception.message;}}window.location=link;}},regional:{br:{search:"Pesquisar",cancel:"Cancelar",selectNone:"Limpar Sele&ccedil;&atilde;o",selectAll:"Selecionar todos",ok:"OK",noSelection:"Sem sele&ccedil;&atilde;o",noResults:"Sem resultados",loading:"Efetuando busca...",overResults:"A busca retornou resultados al&eacute;m dos exibidos.<br>Por favor, refine a busca."},us:{}}});
}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2014 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Adds the Official Brazilian Government Bar on the given element.
 * It adds only one bar per document.
 */
!function($){$.fn.govbar=function(options){var widget={name:"govbar",version:"1.0.0-SNAPSHOT",avaliableVersions:[1,2],createGovbar:function(opts){var version=settings.version;
if($.NumberUtils.isNotNumber(version)||!$.ArrayUtils.contains(widget.avaliableVersions,version)){version=$.ArrayUtils.getLast(widget.avaliableVersions);
}return this["_createGovbar"+version](opts);},_createGovbar1:function(opts){var main=$("<div>",{"class":"band govbar1 no-print"});
var pog=$("<div>",{"class":"govbar1-pog"});var list=$("<ul>",{"class":"govbar1-list pull-right"}).append($("<li>").append($("<a>",{href:"http://www.acessoainformacao.gov.br","class":"govbar1-acessoinfo",title:"Acesso &agrave;Â informa&ccedil;&atilde;o",target:"gov"}).append("www.acessoainformacao.gov.br"))).append($("<li>").append($("<a>",{href:"http://www.brasil.gov.br","class":"govbar1-portalbr",title:"Portal de Estado do Brasil",target:"gov"}).append("www.brasil.gov.br")));
if($.BooleanUtils.isTrue(opts.fluid)){main.append($("<div>",{"class":"container-fluid"}).append(list));}else{main.append(pog).append($("<div>",{"class":"container"}).append(list));
}if($.StringUtils.isNotBlank(opts.color)){main.addClass(opts.color);}return main;},_createGovbar2:function(opts){var main=$("<div>",{"class":"band govbar2 no-print"});
var leftList=$("<ul>",{"class":"govbar2-list"}).append($("<li>",{"class":"flag"}).append($("<a>",{href:"http://brasil.gov.br","class":"uppercase",target:"gov"}).append("Brasil"))).append($("<li>").append($("<a>",{href:"http://brasil.gov.br/barra#acesso-informacao",target:"gov"}).append("Acesso &agrave; informa&ccedil;&atilde;o")));
var rightList=$("<ul>",{"class":"govbar2-list pull-right"}).append($("<li>").append($("<a>",{href:"http://brasil.gov.br/barra#participe",target:"gov"}).append("Participe"))).append($("<li>").append($("<a>",{href:"http://www.servicos.gov.br",target:"gov"}).append("Servi&ccedil;os"))).append($("<li>").append($("<a>",{href:"http://www.planalto.gov.br/legislacao",target:"gov"}).append("Legisla&ccedil;&atilde;o"))).append($("<li>").append($("<a>",{href:"http://brasil.gov.br/barra#orgaos-atuacao-canais",target:"gov"}).append("Canais")));
var containerClass=($.BooleanUtils.isTrue(opts.fluid))?"container-fluid":"container";main.append($("<div>",{"class":containerClass}).append(leftList).append(rightList));
return main;}};var defaults={version:null,fluid:false,color:"",debugMode:false};var settings=$.extend(true,{},defaults,options);
return this.each(function(index,element){var hasbar=$(document).find('[data-role="govbar"]').length>0;if(hasbar){return;}if($(element).isLayoutContainer()){$.ConsoleUtils.time(widget.name+"._create",settings.debugMode);
var version=settings.version;if($.NumberUtils.isNotNumber(version)||!$.ArrayUtils.contains(widget.avaliableVersions,version)){version=$.ArrayUtils.getLast(widget.avaliableVersions);
}var govbar=widget.createGovbar(settings);govbar.attr("data-role","govbar");$(element).prepend(govbar);$.ConsoleUtils.timeEnd(widget.name+"._create",settings.debugMode);
}});};}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2015 Alexander Tapera do Rego.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * HelperBox - v${project.version}
 */
!function($){$.widget("mocca.helperBox",{name:"helperBox",version:"1.0.0-SNAPSHOT",options:{title:"","class":"box rounded bordered shadowed large-padding-bottom large-margin-top",minSize:"7em",titleClass:"primary stroked-bottom bold padding-top",readmoreClass:"btn small primary"},_create:function(){var widget=this;
var $element=$(widget.element);var content=$element.html();$element.empty().addClass(widget.options["class"]);var $titleBand=$("<div>",{"class":"helperBox-title"});
var $contentBand=$("<div>",{"class":"helperBox-content large-padding-v"}).css({height:widget.options.minSize});var $actionBand=$("<div>",{"class":"helperBox-readmore"});
$titleBand.append($("<h5>",{"class":widget.options.titleClass}).append(widget._getTitle()));$contentBand.append(content).append($("<div>",{"class":"helperBox-resume"}));
var $readmore=$("<button>",{"class":widget.options.readmoreClass,type:"button"}).append($("<i>",{"class":"icon-chevron-down"})).append(" Ver Mais");
$actionBand.append($("<span>",{"class":"helperBox-ellipsis"}).append("...")).append("<br>").append($readmore);$element.append($titleBand).append($contentBand).append($actionBand);
$readmore.click(function(evt){var $btn=$(this);var $helperBox=$(widget.element);var $helperContent=$helperBox.find(".helperBox-content");
var heightIni=$helperContent.outerHeight();$helperContent.css({height:"auto"});var heightFim=$helperContent.outerHeight();
var icon=$btn.find("i");if(icon.hasClass("icon-chevron-down")){if(heightIni<=heightFim){$helperContent.css({height:heightIni}).animate({height:heightFim});
}else{$helperContent.css({height:widget.options.minSize});}$btn.empty().append($("<i>",{"class":"icon-chevron-up"})).append(" Ver Menos");
}else{$btn.empty().append($("<i>",{"class":"icon-chevron-down"})).append(" Ver Mais");$helperContent.css({height:heightIni}).animate({height:widget.options.minSize});
}$helperContent.find(".helperBox-resume").toggle();$helperBox.find(".helperBox-ellipsis").toggle();});},_getTitle:function(){var widget=this;
var title=$(widget.element).attr("data-title");if(title){return title;}else{return widget.options.title;}}});}(window.jQuery);
$(document).ready(function(){$(".helperBox:not(.manual-init)").helperBox();});
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Locks the screen elements when one of the triggers is clicked - v${project.version}
 */
!function($){$.widget("mocca.lockOnClick",{name:"lockOnClick",version:"1.0.0-SNAPSHOT",options:{triggers:'button, input[type="button"], input[type="submit"], input[type="reset"]',targets:'button, input[type="button"], input[type="submit"], input[type="reset"]',timeout:0,listener:null,listenerPolling:1000,mode:"lock",lockScreen:{target:null,content:""},postLock:null,postUnlock:null,locale:"br",debugMode:false},_create:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._create",widget.options.debugMode);widget.lockTrigger=$();widget.triggers=$();widget.targets=$();
$(widget.element).each(function(idx,elem){var $elem=$(elem);var $trigger=$elem.filter(widget.options.triggers);if($trigger.length<1){$trigger=$elem.find(widget.options.triggers);
}widget.triggers=widget.triggers.add($trigger);if(widget.options.mode!=="lock"){var $target=$elem.filter(widget.options.targets);
if($target.length<1){$target=$elem.find(widget.options.targets);}widget.targets=widget.targets.add($target);}});widget.triggers.click(function(event){widget._lock($(this),event);
});$.ConsoleUtils.timeEnd(widget.name+"._create",widget.options.debugMode);},lock:function(){var widget=this;widget._lock(null,null);
},unlock:function(){var widget=this;widget._unlock(null);},_lock:function(lockTrigger,event){var widget=this;$.ConsoleUtils.time(widget.name+"._lock",widget.options.debugMode);
widget.lockTrigger=$.JqueryUtils.toUnvaluedSafe(lockTrigger);var isSubmit=$(lockTrigger).isSubmit();var manualSubmit=false;
if(isSubmit&&$.ObjectUtils.isValued(event)&&widget.options.mode!=="lock"){event.preventDefault();manualSubmit=true;}if(widget.options.mode==="disable"){widget.targets.disable();
}else{if(widget.options.mode==="lock"){widget._lockScreen();}else{widget.targets.disable();widget._lockScreen();}}if($.FunctionUtils.isFunction(widget.options.postLock)){widget.options.postLock(widget.lockTrigger);
}widget.lockTrigger.blur();if(widget.options.timeout>0){widget._initTimeout();}else{if($.FunctionUtils.isFunction(widget.options.listener)){widget._initListener();
}}if(manualSubmit){widget.lockTrigger.closest("form").submit();}$.ConsoleUtils.timeEnd(widget.name+"._lock",widget.options.debugMode);
},_unlock:function(unlockTrigger){var widget=this;$.ConsoleUtils.time(widget.name+"._unlock",widget.options.debugMode);var _unlockTrigger=$.JqueryUtils.toUnvaluedSafe(unlockTrigger);
widget._clearTimeout();widget._clearListener();if(widget.options.mode==="disable"){widget.targets.enable();}else{if(widget.options.mode==="lock"){widget._unlockScreen();
}else{widget.targets.enable();widget._unlockScreen();}}if($.FunctionUtils.isFunction(widget.options.postUnlock)){widget.options.postUnlock(widget.lockTrigger,_unlockTrigger);
}widget.lockTrigger=$();$.ConsoleUtils.timeEnd(widget.name+"._unlock",widget.options.debugMode);},_lockScreen:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._lockScreen",widget.options.debugMode);var lockOptions={};if($.StringUtils.isNotBlank(widget.options.lockScreen.content)){lockOptions.content=$.WidgetUtils.createBouncingText(widget.options.lockScreen.content);
}else{lockOptions.content=$.WidgetUtils.createBouncingText(widget._getString("processing"));}if($.ObjectUtils.isValued(widget.options.lockScreen.target)){lockOptions.target=widget.options.lockScreen.target;
}$.WidgetUtils.blockUI(lockOptions);$.ConsoleUtils.timeEnd(widget.name+"._lockScreen",widget.options.debugMode);},_unlockScreen:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._unlockScreen",widget.options.debugMode);$.WidgetUtils.unblockUI(widget.options.lockScreen.target);
$.ConsoleUtils.timeEnd(widget.name+"._unlockScreen",widget.options.debugMode);},_initTimeout:function(){var widget=this;$.ConsoleUtils.time(widget.name+"._initTimeout",widget.options.debugMode);
widget.timeout=setTimeout(function(){widget._clearTimeout();widget._unlock();},widget.options.timeout);$.ConsoleUtils.timeEnd(widget.name+"._initTimeout",widget.options.debugMode);
},_initListener:function(){var widget=this;$.ConsoleUtils.time(widget.name+"._initListener",widget.options.debugMode);widget.listener=setInterval(function(){var bol=widget.options.listener();
if(bol){widget._clearListener();widget._unlock();}},widget.options.listenerPolling);$.ConsoleUtils.timeEnd(widget.name+"._initListener",widget.options.debugMode);
},_clearTimeout:function(){var widget=this;$.ConsoleUtils.time(widget.name+"._clearTimeout",widget.options.debugMode);if($.ObjectUtils.isValued(widget.timeout)){clearTimeout(widget.timeout);
widget.timeout=null;}$.ConsoleUtils.timeEnd(widget.name+"._clearTimeout",widget.options.debugMode);},_clearListener:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._clearListener",widget.options.debugMode);if($.ObjectUtils.isValued(widget.listener)){clearInterval(widget.listener);
widget.listener=null;}$.ConsoleUtils.timeEnd(widget.name+"._clearListener",widget.options.debugMode);},_getString:function(key){var widget=this;
return $.LocaleUtils.resolveKey(key,widget.options.locale,widget.regional);},regional:{br:{processing:"Processando..."},us:{processing:"Processing..."}}});
}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Open a link. Has options to show a confirmation dialog before openning - v${project.version}
 */
!function($){$.widget("mocca.openUrl",{name:"openUrl",version:"1.0.0-SNAPSHOT",options:{url:"",target:"",showConfirmDialog:false,confirmDialog:{}},_create:function(){var widget=this;
var _openLocation=function(){if(widget.options.target){window.open(widget.options.url,widget.options.target);}else{location.href=widget.options.url;
}return true;};if(widget.options.showConfirmDialog){var dialogSettings;if(widget.options.confirmDialog.yesBtn!==false){dialogSettings=$.extend(true,{},widget.options.confirmDialog,{yesBtn:{clickFunction:_openLocation}});
}else{dialogSettings=$.extend(true,{},widget.options.confirmDialog);}$(widget.element).confirmDialog(dialogSettings);}else{$(widget.element).click(function(){_openLocation();
});}}});}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Panel - v${project.version}
 */
!function($){$.widget("mocca.panel",{name:"panel",version:"1.0.0-SNAPSHOT",options:{closeMode:"dispose",expand:{icon:"icon-chevron-sign-down",hint:"@[expand]"},collapse:{icon:"icon-chevron-sign-up",hint:"@[collapse]"},toggleDuration:500,preToggleContent:function(obj){},postToggleContent:function(obj){},preTogglePanel:function(obj){},postTogglePanel:function(obj){},togglePanelEffect:{},startCollapsed:false,startHidden:false,locale:"br",debugMode:false},_create:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._create",widget.options.debugMode);widget.$panel=$(widget.element);widget.$close=widget.$panel.find(".close");
widget.$toggle=widget.$panel.find(".toggle");widget.$title=widget.$panel.find(".panel-title");widget.$content=widget.$panel.find(".panel-content");
widget.$icon=widget.$panel.find(".panel-icon");widget.$toggle.click(function(evt){var obj=widget._getParams({event:evt,caller:widget.$toggle});
evt.preventDefault();widget.toggleContent(obj);});widget.$close.click(function(evt){var obj=widget._getParams({event:evt,caller:widget.$close});
evt.preventDefault();widget.togglePanel(obj);});if(widget.$panel.hasClass("hidden")||widget.options.startHidden){widget.$panel.hide();
widget.$panel.removeClass("hidden");}if(widget.$content.hasClass("hidden")||widget.options.startCollapsed){widget.$content.hide();
widget.$content.removeClass("hidden");}var obj=widget._getParams({});widget._firePreTogglePanel(obj);widget._firePreToggleContent(obj);
widget._refreshUI(obj);widget._firePostToggleContent(obj);widget._firePostTogglePanel(obj);$.ConsoleUtils.timeEnd(widget.name+"._create",widget.options.debugMode);
},isHidden:function(){var widget=this;return widget.$panel.css("display")==="none"||widget.$panel.isDetached();},isVisible:function(){var widget=this;
return !widget.isHidden();},isCollapsed:function(){var widget=this;return widget.$content.css("display")==="none";},isExpanded:function(){var widget=this;
return !widget.isCollapsed();},isEmpty:function(){var widget=this;var strContent=$.trim(widget.$content.html());return $.StringUtils.isBlankOrUnvalued(strContent);
},getContentStatus:function(){var widget=this;return widget.isExpanded()?widget.EXPAND:widget.COLLAPSE;},getPanelStatus:function(){var widget=this;
return widget.isHidden()?widget.HIDDEN:widget.VISIBLE;},collapse:function(obj){var widget=this;widget._toggleContentTo(widget.COLLAPSE,obj);
},expand:function(obj){var widget=this;widget._toggleContentTo(widget.EXPAND,obj);},toggleContent:function(obj){var widget=this;
if(widget.isExpanded()){widget.collapse(obj);}else{widget.expand(obj);}},hide:function(obj){var widget=this;widget._togglePanelTo(widget.HIDDEN,obj);
},show:function(obj){var widget=this;widget._togglePanelTo(widget.VISIBLE,obj);},togglePanel:function(obj){var widget=this;
if(widget.isVisible()){widget.hide(obj);}else{if(widget.options.closeMode==="hide"){widget.show(obj);}}},_togglePanelTo:function(targetStatus,obj){var widget=this;
if(widget.getPanelStatus()!==targetStatus&&!widget.$panel.isDetached()){var tmp=widget._getParams(obj);widget._firePreTogglePanel(tmp);
widget.$panel.toggle($.extend({},widget._getEffect(),{complete:function(){widget._refreshUI(tmp);widget._firePostTogglePanel(tmp);
if(targetStatus===widget.HIDDEN&&widget.options.closeMode==="dispose"){widget.$panel.remove();}}}));}},_toggleContentTo:function(targetStatus,obj){var widget=this;
if(widget.getContentStatus()!==targetStatus){var tmp=widget._getParams(obj);widget._firePreToggleContent(tmp);widget.$content.slideToggle({duration:widget.options.toggleDuration,complete:function(){widget._refreshUI(tmp);
widget._firePostToggleContent(tmp);}});}},_refreshUI:function(obj){var widget=this;var nxtStatus=widget.isExpanded()?widget.COLLAPSE:widget.EXPAND;
var ico=widget.options[nxtStatus].icon;var hint=widget._resolveString(widget.options[nxtStatus].hint);widget.$toggle.prop("title",hint);
widget.$toggle.find("i").removeClass().addClass(ico);},_firePreToggleContent:function(obj){var widget=this;if($.FunctionUtils.isFunction(widget.options.preToggleContent)){widget.options.preToggleContent(obj);
}},_firePostToggleContent:function(obj){var widget=this;if($.FunctionUtils.isFunction(widget.options.postToggleContent)){widget.options.postToggleContent(obj);
}},_firePreTogglePanel:function(obj){var widget=this;if($.FunctionUtils.isFunction(widget.options.preTogglePanel)){widget.options.preTogglePanel(obj);
}},_firePostTogglePanel:function(obj){var widget=this;if($.FunctionUtils.isFunction(widget.options.postTogglePanel)){widget.options.postTogglePanel(obj);
}},_getParams:function(obj){var widget=this;return $.extend({},{event:null,caller:null,widget:widget,title:widget.$title,content:widget.$content,},obj);
},_getEffect:function(){var widget=this;return $.extend({},{effect:"blind",duration:500},widget.options.togglePanelEffect);
},_resolveString:function(key){var widget=this;return $.LocaleUtils.resolve(key,widget.options.locale,widget.regional);},EXPAND:"expand",COLLAPSE:"collapse",HIDDEN:"hidden",VISIBLE:"visible",regional:{br:{expand:"Expandir",collapse:"Recolher"},us:{expand:"Expand",collapse:"Collapse"}}});
$(document).ready(function(){$(".panel:not(.manual-init)").panel();});}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Implements a password checker via DWR/Ajax - v${project.version}
 */
!function($){$.fn.passwordChecker=function(options){var defaults={id:"checker_@{id}",ajaxChecker:null,acceptableThreshold:40,strongThreshold:70,hide:"blur",title:{text:"Requisitos da senha",button:true},show:{event:"focus"},position:{my:"top left",at:"bottom left"},"class":"qtip-shadow qtip-light qtip-popup",validation:{"class":"margin-bottom",list:{"class":"icons",style:"margin-left: 0;"},valid:{"class":"success",icon:"icon-check"},invalid:{"class":"error",icon:"icon-minus-sign"}},gauge:{"class":"margin-bottom",progress:{"class":"progress mini mini-margin-top"},bar:{"class":"bar error",style:"width: 0%",weakClass:"error",acceptableClass:"warning",strongClass:"success"}},strength:{"class":"box narrow",title:{label:"Para melhorar a for&ccedil;a voc&ecirc; pode:","class":"label"},list:{"class":"icons",style:"margin-left: 0;"}}};
var settings=$.extend(true,{},defaults,options);var rules;settings.ajaxChecker.getRules({async:false,callback:function(ret){rules=ret;
}});var popupFactory=function(processedId){var validationBand=$("<div>",{id:processedId+"_Validation","class":$.WidgetUtils.getClass(settings.validation)});
var validationList=$("<ul>",{"class":$.WidgetUtils.getClass(settings.validation.list),style:settings.validation.list.style});
$(validationList).appendTo(validationBand);var gaugeBand=$("<div>",{id:processedId+"_Gauge","class":$.WidgetUtils.getClass(settings.gauge)});
var progress=$("<div>",{"class":$.WidgetUtils.getClass(settings.gauge.progress)});var bar=$("<div>",{"class":$.WidgetUtils.getClass(settings.gauge.bar),style:settings.gauge.bar.style});
$(bar).appendTo(progress);$(progress).appendTo(gaugeBand);var strengthBand=$("<div>",{id:processedId+"_Strength","class":$.WidgetUtils.getClass(settings.strength)});
var strengthTitle=$("<span>",{id:processedId+"_TipTitle","class":$.WidgetUtils.getClass(settings.strength.title)}).html(settings.strength.title.label);
var strengthList=$("<ul>",{"class":$.WidgetUtils.getClass(settings.strength.list),style:settings.strength.list.style});$(strengthTitle).appendTo(strengthBand);
$(strengthList).appendTo(strengthBand);for(var i=0;i<rules.length;i++){var rule=rules[i];if(rule.validationSupported&&rule.validationActive){var item=$("<li>",{"class":rule.id});
var icon=$("<i>",{"class":settings.validation.invalid.icon});$(icon).appendTo(item);$(item).append(rule.validationMessage);
$(item).appendTo(validationList);}if(rule.scoreSupported&&rule.scoreActive){var item=$("<li>",{"class":rule.id});$(item).hide();
$(item).html(rule.scoreMessage);$(item).appendTo(strengthList);}}var baloon=$("<div>",{id:processedId+"_Container"});$(validationBand).appendTo(baloon);
$(gaugeBand).appendTo(baloon);$(strengthBand).appendTo(baloon);$(strengthBand).hide();return $(baloon);};return this.each(function(){var PROCESSED_ID=$.StringUtils.replaceParams(settings.id,{id:$(this).attr("id")});
$(this).qtip({id:PROCESSED_ID,hide:settings.hide,position:settings.position,show:settings.show,content:{text:popupFactory(PROCESSED_ID),title:settings.title},style:{classes:$.WidgetUtils.getClass(settings)}});
$(this).keyup(function(){var password=$(this).val();settings.ajaxChecker.evaluate(password,function callback(results){var global;
settings.ajaxChecker.getGlobalResult({async:false,callback:function(ret){global=ret;}});var validationBand=$("#"+PROCESSED_ID+"_Validation");
var gaugeBand=$("#"+PROCESSED_ID+"_Gauge");var strengthBand=$("#"+PROCESSED_ID+"_Strength");var countStrengthTips=0;for(var i=0;
i<rules.length;i++){var rule=rules[i];var result=results[rule.id];if(rule.validationSupported&&rule.validationActive){var item=$(validationBand).find("li."+rule.id);
var icon=$(item).find("i");if(result.valid){$(item).removeClass(settings.validation.invalid["class"]).addClass(settings.validation.valid["class"]);
$(icon).removeClass(settings.validation.invalid.icon).addClass(settings.validation.valid.icon);}else{$(item).removeClass(settings.validation.valid["class"]).addClass(settings.validation.invalid["class"]);
$(icon).removeClass(settings.validation.valid.icon).addClass(settings.validation.invalid.icon);}}if(rule.scoreSupported&&rule.scoreActive){var item=$(strengthBand).find("li."+rule.id);
if(result.weak||result.acceptable){$(item).show();countStrengthTips++;}else{$(item).hide();}}}if(global.valid&&!global.strong&&countStrengthTips>0){$(strengthBand).show();
}else{$(strengthBand).hide();}var bar=$(gaugeBand).find(".bar");if(global.score<settings.acceptableThreshold){$(bar).removeClass(settings.gauge.bar.acceptableClass).removeClass(settings.gauge.bar.strongClass).addClass(settings.gauge.bar.weakClass);
}else{if(global.score<settings.strongThreshold){$(bar).removeClass(settings.gauge.bar.weakClass).removeClass(settings.gauge.bar.strongClass).addClass(settings.gauge.bar.acceptableClass);
}else{$(bar).removeClass(settings.gauge.bar.weakClass).removeClass(settings.gauge.bar.acceptableClass).addClass(settings.gauge.bar.strongClass);
}}$(bar).css("width",global.score+"%");});});});};}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Toggle on/off the echoing on the given password field - v${project.version}
 */
!function($){$.fn.passwordToggle=function(options){var defaults={passwordField:null,icon:{show:"icon-eye-open",hide:"icon-eye-close"}};
var settings=$.extend(true,{},defaults,options);var togglePasswordButton=function(btn,targetMode){if(targetMode==="text"){$(btn).addClass("active");
$(btn).find("i").removeClass(settings.icon.show).addClass(settings.icon.hide);}else{$(btn).removeClass("active");$(btn).find("i").removeClass(settings.icon.hide).addClass(settings.icon.show);
}};return this.each(function(){$(this).click(function(){var currType=$(settings.passwordField).attr("type");var value=$(settings.passwordField).val();
if(currType==="password"){$(settings.passwordField).attr("type","text");togglePasswordButton(this,"text");}else{if(currType==="text"){$(settings.passwordField).attr("type","password");
togglePasswordButton(this,"password");}}$(settings.passwordField).val(value);$(settings.passwordField).focus();});});};}(window.jQuery);

!function($){$.widget("mocca.tableSorter",{name:"tableSorter",version:"1.0.0-SNAPSHOT",options:{orderBy:"",orderMode:"",icons:{sortable:"icon-sort",asc:"icon-sort-by-attributes",desc:"icon-sort-by-attributes-alt",style:"display: inline-block; width: 1em; margin-right: .5rem;"},sortable:{"class":"clickable unselectable",style:""},formaters:{},useLocaleCompare:true,storeDefaultSorting:true,locale:"br",debugMode:false},_create:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._create",widget.options.debugMode);widget.remap=true;widget.$table=$(widget.element);widget.$thead=widget.$table.children("thead");
widget.$tbody=widget.$table.children("tbody");widget._initOrderBy();if(widget.size()<=0){widget.options.storeDefaultSorting=false;
widget.orderBy="";widget.orderMode="";}if(widget.options.storeDefaultSorting&&widget.size()>0){widget.$tbody.children("tr").each(function(i){$(this).data("defaultIndex",i);
});}widget._initHeaders();if(widget.orderBy!==""){widget._refreshHeaders();widget.sort();}$.ConsoleUtils.timeEnd(widget.name+"._create",widget.options.debugMode);
},size:function(){return this.$tbody.children("tr").length;},_initHeaders:function(){var widget=this;var $tr=widget.$thead.children("tr:last-child");
widget.headers={};$tr.children().each(function(i){var $curr=$(this);var currName=$curr.attr("data-name");if(currName){$curr.addClass(widget.options.sortable["class"]);
$curr.prepend($("<i>",{"class":widget.options.icons.sortable,style:widget.options.icons.style}));widget.headers[currName]={index:i,name:currName,type:$curr.attr("data-type")||"text",pattern:$curr.attr("data-pattern")||"",cell:$curr};
$curr.click(function(){widget._changeOrder(currName);widget.sort();});}});},_initOrderBy:function(){var widget=this;widget.orderBy=widget.$table.attr("data-orderBy")||(widget.options.orderBy||"");
if(widget.orderBy!==""){widget.orderMode=widget.$table.attr("data-orderMode")||(widget.options.orderMode||"asc");}else{widget.orderMode="";
}},_changeOrder:function(orderBy){var widget=this;$.ConsoleUtils.time(widget.name+"._changeOrder",widget.options.debugMode);
if(widget.orderBy!==""){var $thCell=widget.headers[widget.orderBy].cell;$thCell.children("i:first").removeClass().addClass(widget.options.icons.sortable);
$thCell.removeClass("sorting-asc").removeClass("sorting-desc");}if(widget.orderBy!==orderBy){widget.orderBy=orderBy;widget.orderMode="asc";
widget.remap=true;}else{if(widget.orderMode===""){widget.orderMode="asc";widget.remap=true;}else{if(widget.orderMode==="asc"){widget.orderMode="desc";
widget.remap=false;}else{if(widget.options.storeDefaultSorting){widget.orderBy="";widget.orderMode="";widget.remap=true;}else{widget.orderMode="asc";
widget.remap=false;}}}}widget._refreshHeaders();$.ConsoleUtils.timeEnd(widget.name+"._changeOrder",widget.options.debugMode);
},_refreshHeaders:function(){var widget=this;$.ConsoleUtils.time(widget.name+"._refreshHeaders",widget.options.debugMode);
if(widget.orderBy!==""){var $thCell=widget.headers[widget.orderBy].cell;switch(widget.orderMode){case"asc":$thCell.addClass("sorting-asc");
$thCell.children("i:first").eq(0).addClass(widget.options.icons.asc);break;case"desc":$thCell.addClass("sorting-desc");$thCell.children("i:first").eq(0).addClass(widget.options.icons.desc);
break;}}$.ConsoleUtils.timeEnd(widget.name+"._refreshHeaders",widget.options.debugMode);},_map:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._map",widget.options.debugMode);var items=[];var $trs=widget.$tbody.children("tr");if(widget.orderBy!==""){var orderByHeader=widget.headers[widget.orderBy];
$trs.each(function(){var $curr=$(this);var $td=$curr.children().eq(orderByHeader.index);var str=($td.attr("data-value")||$td.text()).trim();
var format=widget._getFormater(orderByHeader.type);var item={value:format(str,orderByHeader.pattern,widget.options.locale),tr:$curr};
items.push(item);});}else{$trs.each(function(){var $curr=$(this);var item={value:$curr.data("defaultIndex")||$trs.length,tr:$curr};
items.push(item);});}$.ConsoleUtils.timeEnd(widget.name+"._map",widget.options.debugMode);return items;},sort:function(){var widget=this;
$.ConsoleUtils.time(widget.name+".sort",widget.options.debugMode);try{if(widget.remap||!widget.items){widget.items=widget._map();
}var compare=widget._getAscCompare();if(widget.orderBy!==""&&widget.orderMode!=="asc"){compare=widget._getDescCompare();}var tbody=widget.$tbody[0];
for(var i=0;i<widget.items.length;i++){tbody.removeChild(widget.items[i].tr[0]);}widget.items=widget.items.sort(compare);
for(var i=0;i<widget.items.length;i++){tbody.appendChild(widget.items[i].tr[0]);}}finally{$.ConsoleUtils.timeEnd(widget.name+".sort",widget.options.debugMode);
}},_getFormater:function(type){var widget=this;var avaliableFormaters=$.extend({},widget.formaters,widget.options.formaters);
return avaliableFormaters[type]||avaliableFormaters.text;},formaters:{noAccentText:function(str,pattern,locale){return $.StringUtils.removeAccents(str);
},lowerText:function(str,pattern,locale){return str.toLowerCase();},lowerNoAccentText:function(str,pattern,locale){return $.StringUtils.removeAccents(str).toLowerCase();
},text:function(str,pattern,locale){return str;},ascii:function(str,pattern,locale){return str;},number:function(str,pattern,locale){var val=str.replace(new RegExp(/[^\d\.]/g),"");
return parseFloat("0"+val);},date:function(str,pattern,locale){return $.DateUtils.toDate(str,{locale:locale||"br",format:pattern||"dd/MM/yyyy"});
},time:function(str,pattern,locale){return $.DateUtils.toDate(str,{locale:locale||"br",format:pattern||"HH:mm"});},datetime:function(str,pattern,locale){return $.DateUtils.toDate(str,{locale:locale||"br",format:pattern||"dd/MM/yyyy HH:mm"});
}},_getAscCompare:function(){var widget=this;var isAscii=widget.orderBy!==""&&widget.headers[widget.orderBy].type==="ascii";
var localeCompare=widget.options.useLocaleCompare&&!isAscii;return function(a,b){var a_val=a.value,b_val=b.value;var bothNumber=($.NumberUtils.isNumber(a_val)&&$.NumberUtils.isNumber(b_val));
var bothNumberString=($.StringUtils.isNumberString(a_val)&&$.StringUtils.isNumberString(b_val));var bothDate=($.DateUtils.isDate(a_val)&&$.DateUtils.isDate(b_val));
var bothBool=($.BooleanUtils.isBoolean(a_val)&&$.BooleanUtils.isBoolean(b_val));if(bothNumber||bothNumberString||bothDate||bothBool){return a_val-b_val;
}else{a_val=$.StringUtils.toPrimitive(a_val);b_val=$.StringUtils.toPrimitive(b_val);if(localeCompare){return a_val.localeCompare(b_val);
}else{return a_val<b_val?-1:(a_val>b_val?1:0);}}};},_getDescCompare:function(){var widget=this;var localeCompare=widget.options.useLocaleCompare;
return function(b,a){var a_val=a.value,b_val=b.value;var bothNumber=($.NumberUtils.isNumber(a_val)&&$.NumberUtils.isNumber(b_val));
var bothNumberString=($.StringUtils.isNumberString(a_val)&&$.StringUtils.isNumberString(b_val));var bothDate=($.DateUtils.isDate(a_val)&&$.DateUtils.isDate(b_val));
var bothBool=($.BooleanUtils.isBoolean(a_val)&&$.BooleanUtils.isBoolean(b_val));if(bothNumber||bothNumberString||bothDate||bothBool){return a_val-b_val;
}else{a_val=$.StringUtils.toPrimitive(a_val);b_val=$.StringUtils.toPrimitive(b_val);if(localeCompare){return a_val.localeCompare(b_val);
}else{return a_val<b_val?-1:(a_val>b_val?1:0);}}};}});$(document).ready(function(){$("table.sortable:not(.manual-init)").tableSorter();
});}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Char/Word counter for text elements - v${project.version}
 */
!function($){$.widget("mocca.textCounter",{name:"textCounter",version:"1.0.0-SNAPSHOT",options:{maxChars:1024,showRemainingCounter:true,showCharCounter:true,showWordCounter:true,ignoreFieldMarkups:false,trimSpaces:false,wrapper:{"class":"",classExt:"",style:""},counterList:{"class":"list-h inner-separated pull-right",classExt:""},getTextValueFunction:function(element){return $(element).isField()?$(element).val():$(element).text();
},setTextValueFunction:function(element,text){$(element).isField()?$(element).val(text):$(element).text(text);},locale:"br",debugMode:false},_create:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._create",widget.options.debugMode);$(widget.element).wrap($.WidgetUtils.createDiv(widget.options.wrapper));
widget.counterListElement=$.WidgetUtils.createUl(widget.options.counterList);$(widget.element).after(widget.counterListElement);
if($(widget.element).isField()){$(widget.element).bind("input propertychange",function(){widget.refresh();});}widget._adjustText();
widget.refresh();$.ConsoleUtils.timeEnd(widget.name+"._create",widget.options.debugMode);},refresh:function(){var widget=this;
$.ConsoleUtils.time(widget.name+".refresh",widget.options.debugMode);var text=widget._getText();widget.counterListElement.empty();
var counters={remaining:widget._countRemaining(text),chars:widget._countChars(text),words:widget._countWords(text)};if(widget.options.showRemainingCounter&&$.NumberUtils.isPositive(widget.options.maxChars)&&$(widget.element).isField()){var li=$("<li>").append($.StringUtils.replaceParams(widget._getString("remaining"),counters));
if(counters.remaining<0){li.addClass("bold error");}widget.counterListElement.append(li);}if(widget.options.showCharCounter){widget.counterListElement.append($("<li>").append($.StringUtils.replaceParams(widget._getString("chars"),counters)));
}if(widget.options.showWordCounter){widget.counterListElement.append($("<li>").append($.StringUtils.replaceParams(widget._getString("words"),counters)));
}$.ConsoleUtils.timeEnd(widget.name+".refresh",widget.options.debugMode);},_adjustText:function(){var widget=this;$.ConsoleUtils.time(widget.name+"._adjustText",widget.options.debugMode);
var text=widget.options.getTextValueFunction(widget.element);if((($(widget.element).isField()||$(widget.element).isPre())&&widget.options.trimSpaces)||(!$(widget.element).isField()&&!$(widget.element).isPre())){text=text.replace(/[ ]+/g," ").replace(/^\s+|\s+$/gm,"");
widget.options.setTextValueFunction(widget.element,text);}$.ConsoleUtils.timeEnd(widget.name+"._adjustText",widget.options.debugMode);
},_getText:function(){var widget=this;$.ConsoleUtils.time(widget.name+"._getText",widget.options.debugMode);var text=widget.options.getTextValueFunction(widget.element);
text=text.replace(/[\r\f]+/,"");if($(widget.element).isField()){if(!widget.options.ignoreFieldMarkups&&widget._isFull(text)){text=text.substring(0,widget.options.maxChars);
widget.options.setTextValueFunction(widget.element,text);}if(widget.options.ignoreFieldMarkups){var regex=/(<\s*\/?\s*)([\w\d]+)(\s+[^>]+\s*)*(\/?>)/g;
text=text.replace(regex,"").replace(/\s+/g," ").trim();}}$.ConsoleUtils.timeEnd(widget.name+"._getText",widget.options.debugMode);
return text;},_countRemaining:function(text){var widget=this;$.ConsoleUtils.time(widget.name+"._countRemaining",widget.options.debugMode);
var ret=widget.options.maxChars-$.StringUtils.size(text);$.ConsoleUtils.timeEnd(widget.name+"._countRemaining",widget.options.debugMode);
return ret;},_countChars:function(text){var widget=this;$.ConsoleUtils.time(widget.name+"._countChars",widget.options.debugMode);
var ret=$.StringUtils.size(text);$.ConsoleUtils.timeEnd(widget.name+"._countChars",widget.options.debugMode);return ret;},_countWords:function(text){var widget=this;
$.ConsoleUtils.time(widget.name+"._countWords",widget.options.debugMode);var words=$.ArrayUtils.removeBlanks(text.split(" "));
$.ConsoleUtils.timeEnd(widget.name+"._countWords",widget.options.debugMode);var ret=$.ArrayUtils.size(words);return ret;},_isFull:function(text){var widget=this;
return $.NumberUtils.isPositive(widget.options.maxChars)&&$.StringUtils.size(text)>widget.options.maxChars;},isFull:function(){var widget=this;
return widget._isFull(widget._getText());},remainingCounter:function(){var widget=this;return widget._countRemaining(widget._getText());
},charCounter:function(){var widget=this;return widget._countChars(widget._getText());},wordCounter:function(){var widget=this;
return widget._countWords(widget._getText());},_getString:function(key){var widget=this;return $.LocaleUtils.resolveKey(key,widget.options.locale,widget.regional);
},regional:{br:{remaining:"Restam @{remaining} caracteres",chars:"Caracteres: @{chars}",words:"Palavras: @{words}"},us:{remaining:"Remaining  @{remaining} characters",chars:"Characters: @{chars}",words:"Words: @{words}"}}});
}(window.jQuery);
/*!
 *          DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2009-2013 Marcius da Silva da Fonseca.
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 *
 * *********************************************************************
 * Wizard - v${project.version}
 */
!function($){$.widget("mocca.wizard",{name:"wizard",version:"1.0.0-SNAPSHOT",options:{cancelBtn:{"class":"btn left responsive",icon:"icon-ban-circle",label:"@[cancel]"},firstBtn:{"class":"btn responsive hide-linear",icon:"icon-fast-backward",label:"@[first]"},previousBtn:{"class":"btn responsive hide-linear",icon:"icon-chevron-sign-left",label:"@[previous]"},nextBtn:{"class":"btn responsive hide-linear",icon:"icon-chevron-sign-right",label:"@[next]"},finishBtn:{"class":"btn primary responsive",type:"submit",icon:"icon-check",label:"@[finish]"},title:{tagName:"<h4>","class":"humanist-font primary"},header:{"class":"padding-v stroked-bottom hide-linear",classExt:"",style:""},actions:{"class":"padding-v stroked-top",classExt:"",style:""},getPreviousIndex:function(obj){},getNextIndex:function(obj){},preStepChange:function(obj){return true;
},postStepChange:function(obj){},validate:true,lockOnFinish:false,customButtons:null,cancelUrl:null,confirmOnCancel:false,enableActions:true,startStep:0,errorSelector:"span.error",errorElement:{tagName:"<span>","class":"pill error"},actionsPosition:"bottom",locale:"br",debugMode:false},_create:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._create",widget.options.debugMode);widget.$wizard=$(widget.element);widget.$header=$.WidgetUtils.createDiv(widget.options.header).addClass("wizard-header");
widget.$steps=widget.$wizard.find(".wizard-step").removeClass("hidden").hide();widget.$title=$("<div>",{"class":"wizard-title"});
var $innerTitle=$.WidgetUtils.createElement(widget.options.title,widget.options.locale,widget.regional);$innerTitle.append("...");
widget.$title.empty().append($innerTitle);widget.$pager=$("<div>",{"class":"wizard-pager"});var size=widget.getSize();var gap=0.5;
var stepWidth=(100-((size-1)*gap))/size;widget.$steps.each(function(index){$(this).data("index",index);var $page=$("<div>",{"class":"wizard-page"});
$page.data("index",index);if(index>0){$page.css("margin-left",gap+"%");}$page.css("width",stepWidth+"%");widget.$pager.append($page);
});widget.$header.append(widget.$title).append(widget.$pager);var cancelBtn=$.ObjectUtils.unwrap(widget.options.cancelBtn);
var firstBtn=$.ObjectUtils.unwrap(widget.options.firstBtn);var prevBtn=$.ObjectUtils.unwrap(widget.options.prevBtn);var nextBtn=$.ObjectUtils.unwrap(widget.options.nextBtn);
var finishBtn=$.ObjectUtils.unwrap(widget.options.finishBtn);widget.$cancel=(cancelBtn===false)?$():$.WidgetUtils.createButton(widget.options.cancelBtn,widget.options.locale,widget.regional);
widget.$first=(firstBtn===false)?$():$.WidgetUtils.createButton(widget.options.firstBtn,widget.options.locale,widget.regional);
widget.$prev=(prevBtn===false)?$():$.WidgetUtils.createButton(widget.options.previousBtn,widget.options.locale,widget.regional);
widget.$next=(nextBtn===false)?$():$.WidgetUtils.createButton(widget.options.nextBtn,widget.options.locale,widget.regional);
widget.$finish=(finishBtn===false)?$():$.WidgetUtils.createButton(widget.options.finishBtn,widget.options.locale,widget.regional);
if(widget.options.lockOnFinish){if($.ObjectUtils.isNotEmptyPlain(widget.options.lockOnFinish)){widget.$finish.lockOnClick(widget.options.lockOnFinish);
}else{widget.$finish.lockOnClick();}}if($.StringUtils.isNotBlank(widget.options.cancelUrl)){widget.$cancel.openUrl({url:widget.options.cancelUrl,showConfirmDialog:widget.options.confirmOnCancel});
}else{widget.$cancel.click(function(){window.history.back();});}widget.$first.click(function(){widget.gotoFirstStep();});
widget.$prev.click(function(){widget.gotoPreviousStep();});widget.$next.click(function(){widget.gotoNextStep();});widget.$actions=$.WidgetUtils.createDiv(widget.options.actions).addClass("wizard-actions");
widget.$actions.append(widget.$cancel).append(widget.$first).append(widget.$prev).append(widget.$next);var $extra=$.JqueryUtils.unwrapUnvaluedSafe(widget.options.customButtons);
widget.$customButtons=$extra.filter(".btn");widget.$actions.append(widget.$customButtons);widget.$actions.append(widget.$finish);
widget.disableActions();if(widget.options.actionsPosition==="top"){widget.$actions.addClass("top");widget.$wizard.prepend(widget.$actions);
if(widget.$actions.hasClass("stroked-top")){widget.$actions.removeClass("stroked-top").addClass("stroked-bottom");}}else{widget.$actions.addClass("bottom");
widget.$wizard.append(widget.$actions);}widget.$wizard.prepend(widget.$header);if(widget.hasStepsWithError()){widget.gotoFirstStepWithErrors();
}else{widget.gotoStep(widget.options.startStep);}$.ConsoleUtils.timeEnd(widget.name+"._create",widget.options.debugMode);
},getCurrentStep:function(){var widget=this;$.ConsoleUtils.time(widget.name+".getCurrentStep",widget.options.debugMode);var $curr=$();
$curr.data("index",-1);widget.$steps.each(function(index){var $step=$(this);if(!($step.css("display")==="none"||$step.isDetached())){$curr=$step;
return false;}});$.ConsoleUtils.timeEnd(widget.name+".getCurrentStep",widget.options.debugMode);return $curr;},getCurrentStepIndex:function(){var widget=this;
return widget.getCurrentStep().data("index");},getSize:function(){var widget=this;return $.JqueryUtils.size(widget.$steps);
},getLastStepIndex:function(){var widget=this;return widget.getSize()-1;},isFirstStep:function(){var widget=this;var index=widget.getCurrentStepIndex();
return index===0;},isLastStep:function(){var widget=this;var index=widget.getCurrentStepIndex();return index===widget.getLastStepIndex();
},gotoFirstStep:function(postChange){var widget=this;widget.gotoStep(0,postChange);},gotoPreviousStep:function(postChange){var widget=this;
$.ConsoleUtils.time(widget.name+".gotoPreviousStep",widget.options.debugMode);var targetIndex=widget.getCurrentStepIndex()-1;
if($.FunctionUtils.isFunction(widget.options.getPreviousIndex)){var tmp=widget.options.getPreviousIndex(widget._getHookParams());
if($.NumberUtils.isNumber(tmp)){targetIndex=tmp;}}widget.gotoStep(targetIndex,postChange);$.ConsoleUtils.timeEnd(widget.name+".gotoPreviousStep",widget.options.debugMode);
},gotoNextStep:function(postChange){var widget=this;$.ConsoleUtils.time(widget.name+".gotoNextStep",widget.options.debugMode);
var targetIndex=widget.getCurrentStepIndex()+1;if($.FunctionUtils.isFunction(widget.options.getPreviousIndex)){var tmp=widget.options.getNextIndex(widget._getHookParams());
if($.NumberUtils.isNumber(tmp)){targetIndex=tmp;}}widget.gotoStep(targetIndex,postChange);$.ConsoleUtils.timeEnd(widget.name+".gotoNextStep",widget.options.debugMode);
},gotoLastStep:function(postChange){var widget=this;widget.gotoStep(widget.getLastStepIndex(),postChange);},_autoValidate:function(){var widget=this;
var params=widget._getHookParams();var $allFields=params.currentStep.find("input, select, textarea");var $requiredFields=$allFields.filter("[required]:visible:enabled");
$(widget.options.errorSelector+'[id^="_"]').remove();$requiredFields.each(function(){var $this=$(this);var id=$this.attr("id");
if($.StringUtils.isNotBlank(id)){var $errorPlaceholder=$.WidgetUtils.createElement(widget.options.errorElement,widget.options.locale,widget.regional);
$errorPlaceholder.attr("id","_"+id);if(!$this.hasValue()){$errorPlaceholder.text(widget._resolveString("required"));if($errorPlaceholder.isDetached()){$errorPlaceholder.insertAfter($this);
}}}});},gotoStep:function(targetIndex,postChange){var widget=this;$.ConsoleUtils.time(widget.name+".gotoStep",widget.options.debugMode);
var $currStep=widget.getCurrentStep();var currIdx=$currStep.data("index");var isBacktracking=(targetIndex<currIdx);if(targetIndex!==currIdx&&targetIndex>=0&&targetIndex<=widget.getLastStepIndex()){var canAdvance=true;
if($.FunctionUtils.isFunction(widget.options.validate)){widget.options.validate(widget._getHookParams());canAdvance=!widget.stepHasError(currIdx);
}else{if($.BooleanUtils.isTrue(widget.options.validate)){widget._autoValidate();canAdvance=!widget.stepHasError(currIdx);
}}if(canAdvance&&$.FunctionUtils.isFunction(widget.options.preStepChange)){canAdvance=widget.options.preStepChange(widget._getHookParams());
if($.BooleanUtils.isNotBoolean(canAdvance)){canAdvance=true;}}if(canAdvance||isBacktracking){var $targetStep=widget.$steps.eq(targetIndex);
widget.disableActions();widget.$pager.find(".wizard-page").removeClass("active",350);var _postChange=function(){if($.FunctionUtils.isFunction(widget.options.postStepChange)){var params2=widget._getHookParams();
widget.options.postStepChange(params2);}if($.FunctionUtils.isFunction(postChange)){postChange();}};if(currIdx>=0){var leftFx={effect:"drop",duration:250,direction:"left"};
var rightFx={effect:"drop",duration:250,direction:"right"};var hideFx=(targetIndex>currIdx)?leftFx:rightFx;var showFx=(targetIndex>currIdx)?rightFx:leftFx;
hideFx.complete=function(){$targetStep.show(showFx);};showFx.complete=function(){widget._updateUI();_postChange();};$currStep.hide(hideFx);
}else{var showFx={effect:"fade",duration:250,complete:function(){widget._updateUI();_postChange();}};$targetStep.show(showFx);
}}else{widget._updateUI();}}$.ConsoleUtils.timeEnd(widget.name+".gotoStep",widget.options.debugMode);},gotoFirstStepWithErrors:function(postChange){var widget=this;
$.ConsoleUtils.time(widget.name+".gotoFirstStepWithErrors",widget.options.debugMode);var indexes=widget.getErrorIndexes();
if(indexes.length>0){widget.gotoStep(indexes[0],postChange);}$.ConsoleUtils.timeEnd(widget.name+".gotoFirstStepWithErrors",widget.options.debugMode);
},getErrorIndexes:function(){var widget=this;$.ConsoleUtils.time(widget.name+".getErrorIndexes",widget.options.debugMode);
var indexes=[];widget.$steps.each(function(index){if(widget.stepHasError(index)){indexes.push(index);}});$.ConsoleUtils.timeEnd(widget.name+".getErrorIndexes",widget.options.debugMode);
return indexes;},hasStepsWithError:function(){var widget=this;return widget.getErrorIndexes().length>0;},stepHasError:function(index){var widget=this;
$.ConsoleUtils.time(widget.name+".stepHasError",widget.options.debugMode);var $step=widget.$steps.eq(index);var $tmp=$step.find(widget.options.errorSelector).filter(":visible");
$.ConsoleUtils.timeEnd(widget.name+".stepHasError",widget.options.debugMode);return $.JqueryUtils.isNotEmpty($tmp);},getStepContaining:function(selector){var widget=this;
$.ConsoleUtils.time(widget.name+".getStepContaining",widget.options.debugMode);var ret=$();widget.$steps.each(function(){var $step=$(this);
var $found=$step.find(selector);if($.JqueryUtils.isNotEmpty($found)){ret=$step;return true;}});$.ConsoleUtils.timeEnd(widget.name+".getStepContaining",widget.options.debugMode);
return ret;},getStepIndexContaining:function(selector){var widget=this;$.ConsoleUtils.time(widget.name+".getStepIndexContaining",widget.options.debugMode);
var ret=-1;var $step=widget.getStepContaining(selector);if($.JqueryUtils.isNotEmpty($step)){ret=$step.data("index");}$.ConsoleUtils.timeEnd(widget.name+".getStepIndexContaining",widget.options.debugMode);
return ret;},setFocusOn:function(selector,postChange){var widget=this;$.ConsoleUtils.time(widget.name+".setFocusOn",widget.options.debugMode);
var currIndex=widget.getCurrentStepIndex();var index=widget.getStepIndexContaining(selector);if(index>=0&&index<widget.getSize()){if(currIndex!==index){widget.gotoStep(index,function(){if($.FunctionUtils.isFunction(postChange)){postChange();
}$(selector).focus();});}else{$(selector).focus();}}$.ConsoleUtils.timeEnd(widget.name+".setFocusOn",widget.options.debugMode);
},_updateUI:function(){var widget=this;$.ConsoleUtils.time(widget.name+"._updateUI",widget.options.debugMode);var $curr=widget.getCurrentStep();
var currIdx=$curr.data("index");var size=widget.getSize();var duration=450;if($.BooleanUtils.isTrue(widget.options.enableActions)){widget.enableActions();
}else{if($.FunctionUtils.isFunction(widget.options.enableActions)){widget.options.enableActions(widget._getHookParams());
}}var txt=widget._resolveString("title");var params={index:currIdx+1,size:size};txt=$.StringUtils.replaceParams(txt,params);
var stepTitle=$curr.attr("data-title");if($.StringUtils.isNotBlank(stepTitle)){txt=txt+": "+stepTitle;}var $innerTitle=$.WidgetUtils.createElement(widget.options.title,widget.options.locale,widget.regional);
$innerTitle.append(txt);widget.$title.empty().append($innerTitle);var $pages=widget.$pager.find(".wizard-page");$pages.unbind("click").removeAttr("title").removeClass("clickable").removeClass("active",duration,"swing",function(){var $this=$(this);
var index=$this.data("index");var $tmp=$(this);if(widget.stepHasError(index)){if(!$tmp.hasClass("error")){$tmp.addClass("error");
}if($.StringUtils.isBlankOrUnvalued($tmp.attr("title"))){var txt2=widget._resolveString("errorMsg");var p2={index:index+1};
txt2=$.StringUtils.replaceParams(txt2,p2);$tmp.attr("title",txt2);}if(currIdx!==index){if(!$tmp.hasClass("clickable")){$tmp.addClass("clickable");
$tmp.click(function(){widget.gotoStep(index);});}}}else{$tmp.removeClass("error");}if(currIdx===index&&!$tmp.hasClass("active")){$tmp.addClass("active",duration);
}});$.ConsoleUtils.timeEnd(widget.name+"._updateUI",widget.options.debugMode);},_getHookParams:function(){var widget=this;
var $curr=widget.getCurrentStep();return{widget:widget,currentStep:$curr,currentStepIndex:$curr.data("index"),lastStepIndex:widget.getLastStepIndex()};
},disableActions:function(){var widget=this;widget.disableCancel();widget.disableFirst();widget.disablePrevious();widget.disableNext();
widget.disableFinish();widget.disableCustom();},disableCancel:function(){var widget=this;widget.$cancel.disable();},disableFirst:function(){var widget=this;
widget.$first.disable();},disablePrevious:function(){var widget=this;widget.$prev.disable();},disableNext:function(){var widget=this;
widget.$next.disable();},disableFinish:function(){var widget=this;widget.$finish.disable();},disableCustom:function(){var widget=this;
widget.$customButtons.disable();},enableActions:function(){var widget=this;var params=widget._getHookParams();widget.$cancel.enable();
widget.$customButtons.enable();if(params.currentStepIndex<widget.getLastStepIndex()){widget.$next.enable();}if(params.currentStepIndex>0){widget.$first.enable();
widget.$prev.enable();}var finishable=$.BooleanUtils.toBoolean(params.currentStep.attr("data-finishable"));if(finishable||widget.isLastStep()){widget.$finish.enable();
}},enableCancel:function(){var widget=this;widget.$cancel.enable();},enableFirst:function(){var widget=this;var params=widget._getHookParams();
if(params.currentStepIndex>0){widget.$first.enable();}},enablePrevious:function(){var widget=this;var params=widget._getHookParams();
if(params.currentStepIndex>0){widget.$prev.enable();}},enableNext:function(){var widget=this;var params=widget._getHookParams();
if(params.currentStepIndex<widget.getLastStepIndex()){widget.$next.enable();}},enableFinish:function(){var widget=this;var params=widget._getHookParams();
var finishable=$.BooleanUtils.toBoolean(params.currentStep.attr("data-finishable"));if(finishable||widget.isLastStep()||widget.$wizard.hasClass("linear")){widget.$finish.enable();
}},enableCustom:function(){var widget=this;widget.$customButtons.enable();},toggleLinear:function(){var widget=this;widget.disableFinish();
widget.$wizard.toggleClass("linear");widget.enableFinish();},_resolveString:function(key){var widget=this;return $.LocaleUtils.resolveKey(key,widget.options.locale,widget.regional);
},regional:{br:{cancel:"Cancelar",first:"Primeira",previous:"Anterior",next:"Pr&oacute;xima",finish:"Enviar",title:"Passo @{index} de @{size}",errorMsg:"O passo @{index} contém erros!",required:"Campo obrigatório."},us:{cancel:"Cancel",first:"First",previous:"Previous",next:"Next",finish:"Send",title:"Step @{index} of @{size}",errorMsg:"Step @{index} has errors!",required:"Required field."}}});
$(document).ready(function(){$(".wizard:not(.manual-init)").wizard();});}(window.jQuery);
/*!
 * jquery.numberformatter - Formatting/Parsing Numbers in jQuery
 * 
 * Written by
 * Michael Abernethy (mike@abernethysoft.com),
 * Andrew Parry (aparry0@gmail.com)
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * @author Michael Abernethy, Andrew Parry
 * @version 1.2.4-RELEASE ($Id$)
 * 
 * Dependencies
 * 
 * jQuery (http://jquery.com)
 * jshashtable (http://www.timdown.co.uk/jshashtable)
 * 
 * Notes & Thanks
 * 
 * many thanks to advweb.nanasi.jp for his bug fixes
 * jsHashtable is now used also, so thanks to the author for that excellent little class.
 *
 * This plugin can be used to format numbers as text and parse text as Numbers
 * Because we live in an international world, we cannot assume that everyone
 * uses "," to divide thousands, and "." as a decimal point.
 *
 * As of 1.2 the way this plugin works has changed slightly, parsing text to a number
 * has 1 set of functions, formatting a number to text has it's own. Before things
 * were a little confusing, so I wanted to separate the 2 out more.
 *
 *
 * jQuery extension functions:
 *
 * formatNumber(options, writeBack, giveReturnValue) - Reads the value from the subject, parses to
 * a Javascript Number object, then formats back to text using the passed options and write back to
 * the subject.
 * 
 * parseNumber(options) - Parses the value in the subject to a Number object using the passed options
 * to decipher the actual number from the text, then writes the value as text back to the subject.
 * 
 * 
 * Generic functions:
 * 
 * formatNumber(numberString, options) - Takes a plain number as a string (e.g. '1002.0123') and returns
 * a string of the given format options.
 * 
 * parseNumber(numberString, options) - Takes a number as text that is formatted the same as the given
 * options then and returns it as a plain Number object.
 * 
 * To achieve the old way of combining parsing and formatting to keep say a input field always formatted
 * to a given format after it has lost focus you'd simply use a combination of the functions.
 * 
 * e.g.
 * $("#salary").blur(function(){
 *      $(this).parseNumber({format:"#,###.00", locale:"us"});
 *      $(this).formatNumber({format:"#,###.00", locale:"us"});
 * });
 *
 * The syntax for the formatting is:
 * 0 = Digit
 * # = Digit, zero shows as absent
 * . = Decimal separator
 * - = Negative sign
 * , = Grouping Separator
 * % = Percent (multiplies the number by 100)
 * 
 * For example, a format of "#,###.00" and text of 4500.20 will
 * display as "4.500,20" with a locale of "de", and "4,500.20" with a locale of "us"
 *
 *
 * As of now, the only acceptable locales are 
 * Arab Emirates -> "ae"
 * Australia -> "au"
 * Austria -> "at"
 * Brazil -> "br"
 * Canada -> "ca"
 * China -> "cn"
 * Czech -> "cz"
 * Denmark -> "dk"
 * Egypt -> "eg"
 * Finland -> "fi"
 * France  -> "fr"
 * Germany -> "de"
 * Greece -> "gr"
 * Great Britain -> "gb"
 * Hong Kong -> "hk"
 * India -> "in"
 * Israel -> "il"
 * Japan -> "jp"
 * Russia -> "ru"
 * South Korea -> "kr"
 * Spain -> "es"
 * Sweden -> "se"
 * Switzerland -> "ch"
 * Taiwan -> "tw"
 * Thailand -> "th"
 * United States -> "us"
 * Vietnam -> "vn"
 */
(function(jQuery){var nfLocales=new Hashtable();
var nfLocalesLikeUS=["ae","au","ca","cn","eg","gb","hk","il","in","jp","sk","th","tw","us"];var nfLocalesLikeDE=["at","br","de","dk","es","gr","it","nl","pt","tr","vn"];
var nfLocalesLikeFR=["bg","cz","fi","fr","no","pl","ru","se"];var nfLocalesLikeCH=["ch"];var nfLocaleFormatting=[[".",","],[",","."],[","," "],[".","'"]];
var nfAllLocales=[nfLocalesLikeUS,nfLocalesLikeDE,nfLocalesLikeFR,nfLocalesLikeCH];function FormatData(dec,group,neg){this.dec=dec;
this.group=group;this.neg=neg;}function init(){for(var localeGroupIdx=0;localeGroupIdx<nfAllLocales.length;localeGroupIdx++){var localeGroup=nfAllLocales[localeGroupIdx];
for(var i=0;i<localeGroup.length;i++){nfLocales.put(localeGroup[i],localeGroupIdx);}}}function formatCodes(locale,isFullLocale){if(nfLocales.size()==0){init();
}var dec=".";var group=",";var neg="-";if(isFullLocale==false){if(locale.indexOf("_")!=-1){locale=locale.split("_")[1].toLowerCase();
}else{if(locale.indexOf("-")!=-1){locale=locale.split("-")[1].toLowerCase();}}}var codesIndex=nfLocales.get(locale);if(codesIndex){var codes=nfLocaleFormatting[codesIndex];
if(codes){dec=codes[0];group=codes[1];}}return new FormatData(dec,group,neg);}jQuery.fn.formatNumber=function(options,writeBack,giveReturnValue){return this.each(function(){if(writeBack==null){writeBack=true;
}if(giveReturnValue==null){giveReturnValue=true;}var text;if(jQuery(this).is(":input")){text=new String(jQuery(this).val());
}else{text=new String(jQuery(this).text());}var returnString=jQuery.formatNumber(text,options);if(writeBack){if(jQuery(this).is(":input")){jQuery(this).val(returnString);
}else{jQuery(this).text(returnString);}}if(giveReturnValue){return returnString;}});};jQuery.formatNumber=function(numberString,options){var options=jQuery.extend({},jQuery.fn.formatNumber.defaults,options);
var formatData=formatCodes(options.locale.toLowerCase(),options.isFullLocale);var dec=formatData.dec;var group=formatData.group;
var neg=formatData.neg;var validFormat="0#-,.";var prefix="";var negativeInFront=false;for(var i=0;i<options.format.length;
i++){if(validFormat.indexOf(options.format.charAt(i))==-1){prefix=prefix+options.format.charAt(i);}else{if(i==0&&options.format.charAt(i)=="-"){negativeInFront=true;
continue;}else{break;}}}var suffix="";for(var i=options.format.length-1;i>=0;i--){if(validFormat.indexOf(options.format.charAt(i))==-1){suffix=options.format.charAt(i)+suffix;
}else{break;}}options.format=options.format.substring(prefix.length);options.format=options.format.substring(0,options.format.length-suffix.length);
var number=new Number(numberString);return jQuery._formatNumber(number,options,suffix,prefix,negativeInFront);};jQuery._formatNumber=function(number,options,suffix,prefix,negativeInFront){var options=jQuery.extend({},jQuery.fn.formatNumber.defaults,options);
var formatData=formatCodes(options.locale.toLowerCase(),options.isFullLocale);var dec=formatData.dec;var group=formatData.group;
var neg=formatData.neg;if(options.overrideGroupSep!=null){group=options.overrideGroupSep;}if(options.overrideDecSep!=null){dec=options.overrideDecSep;
}if(options.overrideNegSign!=null){neg=options.overrideNegSign;}var forcedToZero=false;if(isNaN(number)){if(options.nanForceZero==true){number=0;
forcedToZero=true;}else{return"";}}if(options.isPercentage==true||(options.autoDetectPercentage&&suffix.charAt(suffix.length-1)=="%")){number=number*100;
}var returnString="";if(options.format.indexOf(".")>-1){var decimalPortion=dec;var decimalFormat=options.format.substring(options.format.lastIndexOf(".")+1);
if(options.round==true){number=new Number(number.toFixed(decimalFormat.length));}else{var numStr=number.toString();if(numStr.lastIndexOf(".")>0){numStr=numStr.substring(0,numStr.lastIndexOf(".")+decimalFormat.length+1);
}number=new Number(numStr);}var decimalValue=new Number(number.toString().substring(number.toString().indexOf(".")));decimalString=new String(decimalValue.toFixed(decimalFormat.length));
decimalString=decimalString.substring(decimalString.lastIndexOf(".")+1);for(var i=0;i<decimalFormat.length;i++){if(decimalFormat.charAt(i)=="#"&&decimalString.charAt(i)!="0"){decimalPortion+=decimalString.charAt(i);
continue;}else{if(decimalFormat.charAt(i)=="#"&&decimalString.charAt(i)=="0"){var notParsed=decimalString.substring(i);if(notParsed.match("[1-9]")){decimalPortion+=decimalString.charAt(i);
continue;}else{break;}}else{if(decimalFormat.charAt(i)=="0"){decimalPortion+=decimalString.charAt(i);}}}}returnString+=decimalPortion;
}else{number=Math.round(number);}var ones=Math.floor(number);if(number<0){ones=Math.ceil(number);}var onesFormat="";if(options.format.indexOf(".")==-1){onesFormat=options.format;
}else{onesFormat=options.format.substring(0,options.format.indexOf("."));}var onePortion="";if(!(ones==0&&onesFormat.substr(onesFormat.length-1)=="#")||forcedToZero){var oneText=new String(Math.abs(ones));
var groupLength=9999;if(onesFormat.lastIndexOf(",")!=-1){groupLength=onesFormat.length-onesFormat.lastIndexOf(",")-1;}var groupCount=0;
for(var i=oneText.length-1;i>-1;i--){onePortion=oneText.charAt(i)+onePortion;groupCount++;if(groupCount==groupLength&&i!=0){onePortion=group+onePortion;
groupCount=0;}}if(onesFormat.length>onePortion.length){var padStart=onesFormat.indexOf("0");if(padStart!=-1){var padLen=onesFormat.length-padStart;
var pos=onesFormat.length-onePortion.length-1;while(onePortion.length<padLen){var padChar=onesFormat.charAt(pos);if(padChar==","){padChar=group;
}onePortion=padChar+onePortion;pos--;}}}}if(!onePortion&&onesFormat.indexOf("0",onesFormat.length-1)!==-1){onePortion="0";
}returnString=onePortion+returnString;if(number<0&&negativeInFront&&prefix.length>0){prefix=neg+prefix;}else{if(number<0){returnString=neg+returnString;
}}if(!options.decimalSeparatorAlwaysShown){if(returnString.lastIndexOf(dec)==returnString.length-1){returnString=returnString.substring(0,returnString.length-1);
}}returnString=prefix+returnString+suffix;return returnString;};jQuery.fn.parseNumber=function(options,writeBack,giveReturnValue){if(writeBack==null){writeBack=true;
}if(giveReturnValue==null){giveReturnValue=true;}var text;if(jQuery(this).is(":input")){text=new String(jQuery(this).val());
}else{text=new String(jQuery(this).text());}var number=jQuery.parseNumber(text,options);if(number){if(writeBack){if(jQuery(this).is(":input")){jQuery(this).val(number.toString());
}else{jQuery(this).text(number.toString());}}if(giveReturnValue){return number;}}};jQuery.parseNumber=function(numberString,options){var options=jQuery.extend({},jQuery.fn.parseNumber.defaults,options);
var formatData=formatCodes(options.locale.toLowerCase(),options.isFullLocale);var dec=formatData.dec;var group=formatData.group;
var neg=formatData.neg;if(options.overrideGroupSep!=null){group=options.overrideGroupSep;}if(options.overrideDecSep!=null){dec=options.overrideDecSep;
}if(options.overrideNegSign!=null){neg=options.overrideNegSign;}var valid="1234567890";var validOnce=".-";var strictMode=options.strict;
while(numberString.indexOf(group)>-1){numberString=numberString.replace(group,"");}numberString=numberString.replace(dec,".").replace(neg,"-");
var validText="";var hasPercent=false;if(options.isPercentage==true||(options.autoDetectPercentage&&numberString.charAt(numberString.length-1)=="%")){hasPercent=true;
}for(var i=0;i<numberString.length;i++){if(valid.indexOf(numberString.charAt(i))>-1){validText=validText+numberString.charAt(i);
}else{if(validOnce.indexOf(numberString.charAt(i))>-1){validText=validText+numberString.charAt(i);validOnce=validOnce.replace(numberString.charAt(i),"");
}else{if(options.allowPostfix){break;}else{if(strictMode){validText="NaN";break;}}}}}var number=new Number(validText);if(hasPercent){number=number/100;
var decimalPos=validText.indexOf(".");if(decimalPos!=-1){var decimalPoints=validText.length-decimalPos-1;number=number.toFixed(decimalPoints+2);
}else{number=number.toFixed(2);}}return number;};jQuery.fn.parseNumber.defaults={locale:"us",decimalSeparatorAlwaysShown:false,isPercentage:false,autoDetectPercentage:true,isFullLocale:false,strict:false,overrideGroupSep:null,overrideDecSep:null,overrideNegSign:null,allowPostfix:false};
jQuery.fn.formatNumber.defaults={format:"#,###.00",locale:"br",decimalSeparatorAlwaysShown:false,nanForceZero:true,round:true,isFullLocale:false,overrideGroupSep:null,overrideDecSep:null,overrideNegSign:null,isPercentage:false,autoDetectPercentage:true};
Number.prototype.toFixed=function(precision){return jQuery._roundNumber(this,precision);};jQuery._roundNumber=function(number,decimalPlaces){var power=Math.pow(10,decimalPlaces||0);
var value=String(Math.round(number*power)/power);if(decimalPlaces>0){var dp=value.indexOf(".");if(dp==-1){value+=".";dp=0;
}else{dp=value.length-(dp+1);}while(dp<decimalPlaces){value+="0";dp++;}}return value;};})(jQuery);
/*!
 * qTip2 - Pretty powerful tooltips - v2.2.1
 * http://qtip2.com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 * 
 * --
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function(window,document,undefined){(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],factory);
}else{if(jQuery&&!jQuery.fn.qtip){factory(jQuery);}}}(function($){var TRUE=true,FALSE=false,NULL=null,X="x",Y="y",WIDTH="width",HEIGHT="height",TOP="top",LEFT="left",BOTTOM="bottom",RIGHT="right",CENTER="center",FLIP="flip",FLIPINVERT="flipinvert",SHIFT="shift",QTIP,PROTOTYPE,CORNER,CHECKS,PLUGINS={},NAMESPACE="qtip",ATTR_HAS="data-hasqtip",ATTR_ID="data-qtip-id",WIDGET=["ui-widget","ui-tooltip"],SELECTOR="."+NAMESPACE,INACTIVE_EVENTS="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),CLASS_FIXED=NAMESPACE+"-fixed",CLASS_DEFAULT=NAMESPACE+"-default",CLASS_FOCUS=NAMESPACE+"-focus",CLASS_HOVER=NAMESPACE+"-hover",CLASS_DISABLED=NAMESPACE+"-disabled",replaceSuffix="_replacedByqTip",oldtitle="oldtitle",trackingBound,BROWSER={ie:(function(){for(var v=4,i=document.createElement("div");
(i.innerHTML="<!--[if gt IE "+v+"]><i></i><![endif]-->")&&i.getElementsByTagName("i")[0];v+=1){}return v>4?v:NaN;}()),iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||FALSE};
function QTip(target,options,id,attr){this.id=id;this.target=target;this.tooltip=NULL;this.elements={target:target};this._id=NAMESPACE+"-"+id;
this.timers={img:{}};this.options=options;this.plugins={};this.cache={event:{},target:$(),disabled:FALSE,attr:attr,onTooltip:FALSE,lastClass:""};
this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=FALSE;}PROTOTYPE=QTip.prototype;
PROTOTYPE._when=function(deferreds){return $.when.apply($,deferreds);};PROTOTYPE.render=function(show){if(this.rendered||this.destroyed){return this;
}var self=this,options=this.options,cache=this.cache,elements=this.elements,text=options.content.text,title=options.content.title,button=options.content.button,posOptions=options.position,namespace="."+this._id+" ",deferreds=[],tooltip;
$.attr(this.target[0],"aria-describedby",this._id);cache.posClass=this._createPosClass((this.position={my:posOptions.my,at:posOptions.at}).my);
this.tooltip=elements.tooltip=tooltip=$("<div/>",{id:this._id,"class":[NAMESPACE,CLASS_DEFAULT,options.style.classes,cache.posClass].join(" "),width:options.style.width||"",height:options.style.height||"",tracking:posOptions.target==="mouse"&&posOptions.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":FALSE,"aria-describedby":this._id+"-content","aria-hidden":TRUE}).toggleClass(CLASS_DISABLED,this.disabled).attr(ATTR_ID,this.id).data(NAMESPACE,this).appendTo(posOptions.container).append(elements.content=$("<div />",{"class":NAMESPACE+"-content",id:this._id+"-content","aria-atomic":TRUE}));
this.rendered=-1;this.positioning=TRUE;if(title){this._createTitle();if(!$.isFunction(title)){deferreds.push(this._updateTitle(title,FALSE));
}}if(button){this._createButton();}if(!$.isFunction(text)){deferreds.push(this._updateContent(text,FALSE));}this.rendered=TRUE;
this._setWidget();$.each(PLUGINS,function(name){var instance;if(this.initialize==="render"&&(instance=this(self))){self.plugins[name]=instance;
}});this._unassignEvents();this._assignEvents();this._when(deferreds).then(function(){self._trigger("render");self.positioning=FALSE;
if(!self.hiddenDuringWait&&(options.show.ready||show)){self.toggle(TRUE,cache.event,FALSE);}self.hiddenDuringWait=FALSE;});
QTIP.api[this.id]=this;return this;};PROTOTYPE.destroy=function(immediate){if(this.destroyed){return this.target;}function process(){if(this.destroyed){return;
}this.destroyed=TRUE;var target=this.target,title=target.attr(oldtitle),timer;if(this.rendered){this.tooltip.stop(1,0).find("*").remove().end().remove();
}$.each(this.plugins,function(name){this.destroy&&this.destroy();});for(timer in this.timers){clearTimeout(this.timers[timer]);
}target.removeData(NAMESPACE).removeAttr(ATTR_ID).removeAttr(ATTR_HAS).removeAttr("aria-describedby");if(this.options.suppress&&title){target.attr("title",title).removeAttr(oldtitle);
}this._unassignEvents();this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=NULL;delete QTIP.api[this.id];
}if((immediate!==TRUE||this.triggering==="hide")&&this.rendered){this.tooltip.one("tooltiphidden",$.proxy(process,this));
!this.triggering&&this.hide();}else{process.call(this);}return this.target;};function invalidOpt(a){return a===NULL||$.type(a)!=="object";
}function invalidContent(c){return !($.isFunction(c)||(c&&c.attr)||c.length||($.type(c)==="object"&&(c.jquery||c.then)));
}function sanitizeOptions(opts){var content,text,ajax,once;if(invalidOpt(opts)){return FALSE;}if(invalidOpt(opts.metadata)){opts.metadata={type:opts.metadata};
}if("content" in opts){content=opts.content;if(invalidOpt(content)||content.jquery||content.done){content=opts.content={text:(text=invalidContent(content)?FALSE:content)};
}else{text=content.text;}if("ajax" in content){ajax=content.ajax;once=ajax&&ajax.once!==FALSE;delete content.ajax;content.text=function(event,api){var loading=text||$(this).attr(api.options.content.attr)||"Loading...",deferred=$.ajax($.extend({},ajax,{context:api})).then(ajax.success,NULL,ajax.error).then(function(content){if(content&&once){api.set("content.text",content);
}return content;},function(xhr,status,error){if(api.destroyed||xhr.status===0){return;}api.set("content.text",status+": "+error);
});return !once?(api.set("content.text",loading),deferred):loading;};}if("title" in content){if($.isPlainObject(content.title)){content.button=content.title.button;
content.title=content.title.text;}if(invalidContent(content.title||FALSE)){content.title=FALSE;}}}if("position" in opts&&invalidOpt(opts.position)){opts.position={my:opts.position,at:opts.position};
}if("show" in opts&&invalidOpt(opts.show)){opts.show=opts.show.jquery?{target:opts.show}:opts.show===TRUE?{ready:TRUE}:{event:opts.show};
}if("hide" in opts&&invalidOpt(opts.hide)){opts.hide=opts.hide.jquery?{target:opts.hide}:{event:opts.hide};}if("style" in opts&&invalidOpt(opts.style)){opts.style={classes:opts.style};
}$.each(PLUGINS,function(){this.sanitize&&this.sanitize(opts);});return opts;}CHECKS=PROTOTYPE.checks={builtin:{"^id$":function(obj,o,v,prev){var id=v===TRUE?QTIP.nextid:v,new_id=NAMESPACE+"-"+id;
if(id!==FALSE&&id.length>0&&!$("#"+new_id).length){this._id=new_id;if(this.rendered){this.tooltip[0].id=this._id;this.elements.content[0].id=this._id+"-content";
this.elements.title[0].id=this._id+"-title";}}else{obj[o]=prev;}},"^prerender":function(obj,o,v){v&&!this.rendered&&this.render(this.options.show.ready);
},"^content.text$":function(obj,o,v){this._updateContent(v);},"^content.attr$":function(obj,o,v,prev){if(this.options.content.text===this.target.attr(prev)){this._updateContent(this.target.attr(v));
}},"^content.title$":function(obj,o,v){if(!v){return this._removeTitle();}v&&!this.elements.title&&this._createTitle();this._updateTitle(v);
},"^content.button$":function(obj,o,v){this._updateButton(v);},"^content.title.(text|button)$":function(obj,o,v){this.set("content."+o,v);
},"^position.(my|at)$":function(obj,o,v){"string"===typeof v&&(this.position[o]=obj[o]=new CORNER(v,o==="at"));},"^position.container$":function(obj,o,v){this.rendered&&this.tooltip.appendTo(v);
},"^show.ready$":function(obj,o,v){v&&(!this.rendered&&this.render(TRUE)||this.toggle(TRUE));},"^style.classes$":function(obj,o,v,p){this.rendered&&this.tooltip.removeClass(p).addClass(v);
},"^style.(width|height)":function(obj,o,v){this.rendered&&this.tooltip.css(o,v);},"^style.widget|content.title":function(){this.rendered&&this._setWidget();
},"^style.def":function(obj,o,v){this.rendered&&this.tooltip.toggleClass(CLASS_DEFAULT,!!v);},"^events.(render|show|move|hide|focus|blur)$":function(obj,o,v){this.rendered&&this.tooltip[($.isFunction(v)?"":"un")+"bind"]("tooltip"+o,v);
},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){if(!this.rendered){return;
}var posOptions=this.options.position;this.tooltip.attr("tracking",posOptions.target==="mouse"&&posOptions.adjust.mouse);
this._unassignEvents();this._assignEvents();}}};function convertNotation(options,notation){var i=0,obj,option=options,levels=notation.split(".");
while(option=option[levels[i++]]){if(i<levels.length){obj=option;}}return[obj||options,levels.pop()];}PROTOTYPE.get=function(notation){if(this.destroyed){return this;
}var o=convertNotation(this.options,notation.toLowerCase()),result=o[0][o[1]];return result.precedance?result.string():result;
};function setCallback(notation,args){var category,rule,match;for(category in this.checks){for(rule in this.checks[category]){if(match=(new RegExp(rule,"i")).exec(notation)){args.push(match);
if(category==="builtin"||this.plugins[category]){this.checks[category][rule].apply(this.plugins[category]||this,args);}}}}}var rmove=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,rrender=/^prerender|show\.ready/i;
PROTOTYPE.set=function(option,value){if(this.destroyed){return this;}var rendered=this.rendered,reposition=FALSE,options=this.options,checks=this.checks,name;
if("string"===typeof option){name=option;option={};option[name]=value;}else{option=$.extend({},option);}$.each(option,function(notation,value){if(rendered&&rrender.test(notation)){delete option[notation];
return;}var obj=convertNotation(options,notation.toLowerCase()),previous;previous=obj[0][obj[1]];obj[0][obj[1]]=value&&value.nodeType?$(value):value;
reposition=rmove.test(notation)||reposition;option[notation]=[obj[0],obj[1],value,previous];});sanitizeOptions(options);this.positioning=TRUE;
$.each(option,$.proxy(setCallback,this));this.positioning=FALSE;if(this.rendered&&this.tooltip[0].offsetWidth>0&&reposition){this.reposition(options.position.target==="mouse"?NULL:this.cache.event);
}return this;};PROTOTYPE._update=function(content,element,reposition){var self=this,cache=this.cache;if(!this.rendered||!content){return FALSE;
}if($.isFunction(content)){content=content.call(this.elements.target,cache.event,this)||"";}if($.isFunction(content.then)){cache.waiting=TRUE;
return content.then(function(c){cache.waiting=FALSE;return self._update(c,element);},NULL,function(e){return self._update(e,element);
});}if(content===FALSE||(!content&&content!=="")){return FALSE;}if(content.jquery&&content.length>0){element.empty().append(content.css({display:"block",visibility:"visible"}));
}else{element.html(content);}return this._waitForContent(element).then(function(images){if(self.rendered&&self.tooltip[0].offsetWidth>0){self.reposition(cache.event,!images.length);
}});};PROTOTYPE._waitForContent=function(element){var cache=this.cache;cache.waiting=TRUE;return($.fn.imagesLoaded?element.imagesLoaded():$.Deferred().resolve([])).done(function(){cache.waiting=FALSE;
}).promise();};PROTOTYPE._updateContent=function(content,reposition){this._update(content,this.elements.content,reposition);
};PROTOTYPE._updateTitle=function(content,reposition){if(this._update(content,this.elements.title,reposition)===FALSE){this._removeTitle(FALSE);
}};PROTOTYPE._createTitle=function(){var elements=this.elements,id=this._id+"-title";if(elements.titlebar){this._removeTitle();
}elements.titlebar=$("<div />",{"class":NAMESPACE+"-titlebar "+(this.options.style.widget?createWidgetClass("header"):"")}).append(elements.title=$("<div />",{id:id,"class":NAMESPACE+"-title","aria-atomic":TRUE})).insertBefore(elements.content).delegate(".qtip-close","mousedown keydown mouseup keyup mouseout",function(event){$(this).toggleClass("ui-state-active ui-state-focus",event.type.substr(-4)==="down");
}).delegate(".qtip-close","mouseover mouseout",function(event){$(this).toggleClass("ui-state-hover",event.type==="mouseover");
});if(this.options.content.button){this._createButton();}};PROTOTYPE._removeTitle=function(reposition){var elements=this.elements;
if(elements.title){elements.titlebar.remove();elements.titlebar=elements.title=elements.button=NULL;if(reposition!==FALSE){this.reposition();
}}};PROTOTYPE._createPosClass=function(my){return NAMESPACE+"-pos-"+(my||this.options.position.my).abbrev();};PROTOTYPE.reposition=function(event,effect){if(!this.rendered||this.positioning||this.destroyed){return this;
}this.positioning=TRUE;var cache=this.cache,tooltip=this.tooltip,posOptions=this.options.position,target=posOptions.target,my=posOptions.my,at=posOptions.at,viewport=posOptions.viewport,container=posOptions.container,adjust=posOptions.adjust,method=adjust.method.split(" "),tooltipWidth=tooltip.outerWidth(FALSE),tooltipHeight=tooltip.outerHeight(FALSE),targetWidth=0,targetHeight=0,type=tooltip.css("position"),position={left:0,top:0},visible=tooltip[0].offsetWidth>0,isScroll=event&&event.type==="scroll",win=$(window),doc=container[0].ownerDocument,mouse=this.mouse,pluginCalculations,offset,adjusted,newClass;
if($.isArray(target)&&target.length===2){at={x:LEFT,y:TOP};position={left:target[0],top:target[1]};}else{if(target==="mouse"){at={x:LEFT,y:TOP};
if((!adjust.mouse||this.options.hide.distance)&&cache.origin&&cache.origin.pageX){event=cache.origin;}else{if(!event||(event&&(event.type==="resize"||event.type==="scroll"))){event=cache.event;
}else{if(mouse&&mouse.pageX){event=mouse;}}}if(type!=="static"){position=container.offset();}if(doc.body.offsetWidth!==(window.innerWidth||doc.documentElement.clientWidth)){offset=$(document.body).offset();
}position={left:event.pageX-position.left+(offset&&offset.left||0),top:event.pageY-position.top+(offset&&offset.top||0)};
if(adjust.mouse&&isScroll&&mouse){position.left-=(mouse.scrollX||0)-win.scrollLeft();position.top-=(mouse.scrollY||0)-win.scrollTop();
}}else{if(target==="event"){if(event&&event.target&&event.type!=="scroll"&&event.type!=="resize"){cache.target=$(event.target);
}else{if(!event.target){cache.target=this.elements.target;}}}else{if(target!=="event"){cache.target=$(target.jquery?target:this.elements.target);
}}target=cache.target;target=$(target).eq(0);if(target.length===0){return this;}else{if(target[0]===document||target[0]===window){targetWidth=BROWSER.iOS?window.innerWidth:target.width();
targetHeight=BROWSER.iOS?window.innerHeight:target.height();if(target[0]===window){position={top:(viewport||target).scrollTop(),left:(viewport||target).scrollLeft()};
}}else{if(PLUGINS.imagemap&&target.is("area")){pluginCalculations=PLUGINS.imagemap(this,target,at,PLUGINS.viewport?method:FALSE);
}else{if(PLUGINS.svg&&target&&target[0].ownerSVGElement){pluginCalculations=PLUGINS.svg(this,target,at,PLUGINS.viewport?method:FALSE);
}else{targetWidth=target.outerWidth(FALSE);targetHeight=target.outerHeight(FALSE);position=target.offset();}}}}if(pluginCalculations){targetWidth=pluginCalculations.width;
targetHeight=pluginCalculations.height;offset=pluginCalculations.offset;position=pluginCalculations.position;}position=this.reposition.offset(target,position,container);
if((BROWSER.iOS>3.1&&BROWSER.iOS<4.1)||(BROWSER.iOS>=4.3&&BROWSER.iOS<4.33)||(!BROWSER.iOS&&type==="fixed")){position.left-=win.scrollLeft();
position.top-=win.scrollTop();}if(!pluginCalculations||(pluginCalculations&&pluginCalculations.adjustable!==FALSE)){position.left+=at.x===RIGHT?targetWidth:at.x===CENTER?targetWidth/2:0;
position.top+=at.y===BOTTOM?targetHeight:at.y===CENTER?targetHeight/2:0;}}}position.left+=adjust.x+(my.x===RIGHT?-tooltipWidth:my.x===CENTER?-tooltipWidth/2:0);
position.top+=adjust.y+(my.y===BOTTOM?-tooltipHeight:my.y===CENTER?-tooltipHeight/2:0);if(PLUGINS.viewport){adjusted=position.adjusted=PLUGINS.viewport(this,position,posOptions,targetWidth,targetHeight,tooltipWidth,tooltipHeight);
if(offset&&adjusted.left){position.left+=offset.left;}if(offset&&adjusted.top){position.top+=offset.top;}if(adjusted.my){this.position.my=adjusted.my;
}}else{position.adjusted={left:0,top:0};}if(cache.posClass!==(newClass=this._createPosClass(this.position.my))){tooltip.removeClass(cache.posClass).addClass((cache.posClass=newClass));
}if(!this._trigger("move",[position,viewport.elem||viewport],event)){return this;}delete position.adjusted;if(effect===FALSE||!visible||isNaN(position.left)||isNaN(position.top)||target==="mouse"||!$.isFunction(posOptions.effect)){tooltip.css(position);
}else{if($.isFunction(posOptions.effect)){posOptions.effect.call(tooltip,this,$.extend({},position));tooltip.queue(function(next){$(this).css({opacity:"",height:""});
if(BROWSER.ie){this.style.removeAttribute("filter");}next();});}}this.positioning=FALSE;return this;};PROTOTYPE.reposition.offset=function(elem,pos,container){if(!container[0]){return pos;
}var ownerDocument=$(elem[0].ownerDocument),quirks=!!BROWSER.ie&&document.compatMode!=="CSS1Compat",parent=container[0],scrolled,position,parentOffset,overflow;
function scroll(e,i){pos.left+=i*e.scrollLeft();pos.top+=i*e.scrollTop();}do{if((position=$.css(parent,"position"))!=="static"){if(position==="fixed"){parentOffset=parent.getBoundingClientRect();
scroll(ownerDocument,-1);}else{parentOffset=$(parent).position();parentOffset.left+=(parseFloat($.css(parent,"borderLeftWidth"))||0);
parentOffset.top+=(parseFloat($.css(parent,"borderTopWidth"))||0);}pos.left-=parentOffset.left+(parseFloat($.css(parent,"marginLeft"))||0);
pos.top-=parentOffset.top+(parseFloat($.css(parent,"marginTop"))||0);if(!scrolled&&(overflow=$.css(parent,"overflow"))!=="hidden"&&overflow!=="visible"){scrolled=$(parent);
}}}while((parent=parent.offsetParent));if(scrolled&&(scrolled[0]!==ownerDocument[0]||quirks)){scroll(scrolled,1);}return pos;
};var C=(CORNER=PROTOTYPE.reposition.Corner=function(corner,forceY){corner=(""+corner).replace(/([A-Z])/," $1").replace(/middle/gi,CENTER).toLowerCase();
this.x=(corner.match(/left|right/i)||corner.match(/center/)||["inherit"])[0].toLowerCase();this.y=(corner.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase();
this.forceY=!!forceY;var f=corner.charAt(0);this.precedance=(f==="t"||f==="b"?Y:X);}).prototype;C.invert=function(z,center){this[z]=this[z]===LEFT?RIGHT:this[z]===RIGHT?LEFT:center||this[z];
};C.string=function(join){var x=this.x,y=this.y;var result=x!==y?(x==="center"||y!=="center"&&(this.precedance===Y||this.forceY)?[y,x]:[x,y]):[x];
return join!==false?result.join(" "):result;};C.abbrev=function(){var result=this.string(false);return result[0].charAt(0)+(result[1]&&result[1].charAt(0)||"");
};C.clone=function(){return new CORNER(this.string(),this.forceY);};PROTOTYPE.toggle=function(state,event){var cache=this.cache,options=this.options,tooltip=this.tooltip;
if(event){if((/over|enter/).test(event.type)&&cache.event&&(/out|leave/).test(cache.event.type)&&options.show.target.add(event.target).length===options.show.target.length&&tooltip.has(event.relatedTarget).length){return this;
}cache.event=$.event.fix(event);}this.waiting&&!state&&(this.hiddenDuringWait=TRUE);if(!this.rendered){return state?this.render(1):this;
}else{if(this.destroyed||this.disabled){return this;}}var type=state?"show":"hide",opts=this.options[type],otherOpts=this.options[!state?"show":"hide"],posOptions=this.options.position,contentOptions=this.options.content,width=this.tooltip.css("width"),visible=this.tooltip.is(":visible"),animate=state||opts.target.length===1,sameTarget=!event||opts.target.length<2||cache.target[0]===event.target,identicalState,allow,showEvent,delay,after;
if((typeof state).search("boolean|number")){state=!visible;}identicalState=!tooltip.is(":animated")&&visible===state&&sameTarget;
allow=!identicalState?!!this._trigger(type,[90]):NULL;if(this.destroyed){return this;}if(allow!==FALSE&&state){this.focus(event);
}if(!allow||identicalState){return this;}$.attr(tooltip[0],"aria-hidden",!!!state);if(state){this.mouse&&(cache.origin=$.event.fix(this.mouse));
if($.isFunction(contentOptions.text)){this._updateContent(contentOptions.text,FALSE);}if($.isFunction(contentOptions.title)){this._updateTitle(contentOptions.title,FALSE);
}if(!trackingBound&&posOptions.target==="mouse"&&posOptions.adjust.mouse){$(document).bind("mousemove."+NAMESPACE,this._storeMouse);
trackingBound=TRUE;}if(!width){tooltip.css("width",tooltip.outerWidth(FALSE));}this.reposition(event,arguments[2]);if(!width){tooltip.css("width","");
}if(!!opts.solo){(typeof opts.solo==="string"?$(opts.solo):$(SELECTOR,opts.solo)).not(tooltip).not(opts.target).qtip("hide",$.Event("tooltipsolo"));
}}else{clearTimeout(this.timers.show);delete cache.origin;if(trackingBound&&!$(SELECTOR+'[tracking="true"]:visible',opts.solo).not(tooltip).length){$(document).unbind("mousemove."+NAMESPACE);
trackingBound=FALSE;}this.blur(event);}after=$.proxy(function(){if(state){if(BROWSER.ie){tooltip[0].style.removeAttribute("filter");
}tooltip.css("overflow","");if("string"===typeof opts.autofocus){$(this.options.show.autofocus,tooltip).focus();}this.options.show.target.trigger("qtip-"+this.id+"-inactive");
}else{tooltip.css({display:"",visibility:"",opacity:"",left:"",top:""});}this._trigger(state?"visible":"hidden");},this);
if(opts.effect===FALSE||animate===FALSE){tooltip[type]();after();}else{if($.isFunction(opts.effect)){tooltip.stop(1,1);opts.effect.call(tooltip,this);
tooltip.queue("fx",function(n){after();n();});}else{tooltip.fadeTo(90,state?1:0,after);}}if(state){opts.target.trigger("qtip-"+this.id+"-inactive");
}return this;};PROTOTYPE.show=function(event){return this.toggle(TRUE,event);};PROTOTYPE.hide=function(event){return this.toggle(FALSE,event);
};PROTOTYPE.focus=function(event){if(!this.rendered||this.destroyed){return this;}var qtips=$(SELECTOR),tooltip=this.tooltip,curIndex=parseInt(tooltip[0].style.zIndex,10),newIndex=QTIP.zindex+qtips.length,focusedElem;
if(!tooltip.hasClass(CLASS_FOCUS)){if(this._trigger("focus",[newIndex],event)){if(curIndex!==newIndex){qtips.each(function(){if(this.style.zIndex>curIndex){this.style.zIndex=this.style.zIndex-1;
}});qtips.filter("."+CLASS_FOCUS).qtip("blur",event);}tooltip.addClass(CLASS_FOCUS)[0].style.zIndex=newIndex;}}return this;
};PROTOTYPE.blur=function(event){if(!this.rendered||this.destroyed){return this;}this.tooltip.removeClass(CLASS_FOCUS);this._trigger("blur",[this.tooltip.css("zIndex")],event);
return this;};PROTOTYPE.disable=function(state){if(this.destroyed){return this;}if(state==="toggle"){state=!(this.rendered?this.tooltip.hasClass(CLASS_DISABLED):this.disabled);
}else{if("boolean"!==typeof state){state=TRUE;}}if(this.rendered){this.tooltip.toggleClass(CLASS_DISABLED,state).attr("aria-disabled",state);
}this.disabled=!!state;return this;};PROTOTYPE.enable=function(){return this.disable(FALSE);};PROTOTYPE._createButton=function(){var self=this,elements=this.elements,tooltip=elements.tooltip,button=this.options.content.button,isString=typeof button==="string",close=isString?button:"Close tooltip";
if(elements.button){elements.button.remove();}if(button.jquery){elements.button=button;}else{elements.button=$("<a />",{"class":"qtip-close "+(this.options.style.widget?"":NAMESPACE+"-icon"),title:close,"aria-label":close}).prepend($("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"}));
}elements.button.appendTo(elements.titlebar||tooltip).attr("role","button").click(function(event){if(!tooltip.hasClass(CLASS_DISABLED)){self.hide(event);
}return FALSE;});};PROTOTYPE._updateButton=function(button){if(!this.rendered){return FALSE;}var elem=this.elements.button;
if(button){this._createButton();}else{elem.remove();}};function createWidgetClass(cls){return WIDGET.concat("").join(cls?"-"+cls+" ":" ");
}PROTOTYPE._setWidget=function(){var on=this.options.style.widget,elements=this.elements,tooltip=elements.tooltip,disabled=tooltip.hasClass(CLASS_DISABLED);
tooltip.removeClass(CLASS_DISABLED);CLASS_DISABLED=on?"ui-state-disabled":"qtip-disabled";tooltip.toggleClass(CLASS_DISABLED,disabled);
tooltip.toggleClass("ui-helper-reset "+createWidgetClass(),on).toggleClass(CLASS_DEFAULT,this.options.style.def&&!on);if(elements.content){elements.content.toggleClass(createWidgetClass("content"),on);
}if(elements.titlebar){elements.titlebar.toggleClass(createWidgetClass("header"),on);}if(elements.button){elements.button.toggleClass(NAMESPACE+"-icon",!on);
}};function delay(callback,duration){if(duration>0){return setTimeout($.proxy(callback,this),duration);}else{callback.call(this);
}}function showMethod(event){if(this.tooltip.hasClass(CLASS_DISABLED)){return;}clearTimeout(this.timers.show);clearTimeout(this.timers.hide);
this.timers.show=delay.call(this,function(){this.toggle(TRUE,event);},this.options.show.delay);}function hideMethod(event){if(this.tooltip.hasClass(CLASS_DISABLED)||this.destroyed){return;
}var relatedTarget=$(event.relatedTarget),ontoTooltip=relatedTarget.closest(SELECTOR)[0]===this.tooltip[0],ontoTarget=relatedTarget[0]===this.options.show.target[0];
clearTimeout(this.timers.show);clearTimeout(this.timers.hide);if(this!==relatedTarget[0]&&(this.options.position.target==="mouse"&&ontoTooltip)||(this.options.hide.fixed&&((/mouse(out|leave|move)/).test(event.type)&&(ontoTooltip||ontoTarget)))){try{event.preventDefault();
event.stopImmediatePropagation();}catch(e){}return;}this.timers.hide=delay.call(this,function(){this.toggle(FALSE,event);
},this.options.hide.delay,this);}function inactiveMethod(event){if(this.tooltip.hasClass(CLASS_DISABLED)||!this.options.hide.inactive){return;
}clearTimeout(this.timers.inactive);this.timers.inactive=delay.call(this,function(){this.hide(event);},this.options.hide.inactive);
}function repositionMethod(event){if(this.rendered&&this.tooltip[0].offsetWidth>0){this.reposition(event);}}PROTOTYPE._storeMouse=function(event){(this.mouse=$.event.fix(event)).type="mousemove";
return this;};PROTOTYPE._bind=function(targets,events,method,suffix,context){if(!targets||!method||!events.length){return;
}var ns="."+this._id+(suffix?"-"+suffix:"");$(targets).bind((events.split?events:events.join(ns+" "))+ns,$.proxy(method,context||this));
return this;};PROTOTYPE._unbind=function(targets,suffix){targets&&$(targets).unbind("."+this._id+(suffix?"-"+suffix:""));
return this;};function delegate(selector,events,method){$(document.body).delegate(selector,(events.split?events:events.join("."+NAMESPACE+" "))+"."+NAMESPACE,function(){var api=QTIP.api[$.attr(this,ATTR_ID)];
api&&!api.disabled&&method.apply(api,arguments);});}PROTOTYPE._trigger=function(type,args,event){var callback=$.Event("tooltip"+type);
callback.originalEvent=(event&&$.extend({},event))||this.cache.event||NULL;this.triggering=type;this.tooltip.trigger(callback,[this].concat(args||[]));
this.triggering=FALSE;return !callback.isDefaultPrevented();};PROTOTYPE._bindEvents=function(showEvents,hideEvents,showTargets,hideTargets,showMethod,hideMethod){var similarTargets=showTargets.filter(hideTargets).add(hideTargets.filter(showTargets)),toggleEvents=[];
if(similarTargets.length){$.each(hideEvents,function(i,type){var showIndex=$.inArray(type,showEvents);showIndex>-1&&toggleEvents.push(showEvents.splice(showIndex,1)[0]);
});if(toggleEvents.length){this._bind(similarTargets,toggleEvents,function(event){var state=this.rendered?this.tooltip[0].offsetWidth>0:false;
(state?hideMethod:showMethod).call(this,event);});showTargets=showTargets.not(similarTargets);hideTargets=hideTargets.not(similarTargets);
}}this._bind(showTargets,showEvents,showMethod);this._bind(hideTargets,hideEvents,hideMethod);};PROTOTYPE._assignInitialEvents=function(event){var options=this.options,showTarget=options.show.target,hideTarget=options.hide.target,showEvents=options.show.event?$.trim(""+options.show.event).split(" "):[],hideEvents=options.hide.event?$.trim(""+options.hide.event).split(" "):[];
this._bind(this.elements.target,["remove","removeqtip"],function(event){this.destroy(true);},"destroy");if(/mouse(over|enter)/i.test(options.show.event)&&!/mouse(out|leave)/i.test(options.hide.event)){hideEvents.push("mouseleave");
}this._bind(showTarget,"mousemove",function(event){this._storeMouse(event);this.cache.onTarget=TRUE;});function hoverIntent(event){if(this.disabled||this.destroyed){return FALSE;
}this.cache.event=event&&$.event.fix(event);this.cache.target=event&&$(event.target);clearTimeout(this.timers.show);this.timers.show=delay.call(this,function(){this.render(typeof event==="object"||options.show.ready);
},options.prerender?0:options.show.delay);}this._bindEvents(showEvents,hideEvents,showTarget,hideTarget,hoverIntent,function(){if(!this.timers){return FALSE;
}clearTimeout(this.timers.show);});if(options.show.ready||options.prerender){hoverIntent.call(this,event);}};PROTOTYPE._assignEvents=function(){var self=this,options=this.options,posOptions=options.position,tooltip=this.tooltip,showTarget=options.show.target,hideTarget=options.hide.target,containerTarget=posOptions.container,viewportTarget=posOptions.viewport,documentTarget=$(document),bodyTarget=$(document.body),windowTarget=$(window),showEvents=options.show.event?$.trim(""+options.show.event).split(" "):[],hideEvents=options.hide.event?$.trim(""+options.hide.event).split(" "):[];
$.each(options.events,function(name,callback){self._bind(tooltip,name==="toggle"?["tooltipshow","tooltiphide"]:["tooltip"+name],callback,null,tooltip);
});if(/mouse(out|leave)/i.test(options.hide.event)&&options.hide.leave==="window"){this._bind(documentTarget,["mouseout","blur"],function(event){if(!/select|option/.test(event.target.nodeName)&&!event.relatedTarget){this.hide(event);
}});}if(options.hide.fixed){hideTarget=hideTarget.add(tooltip.addClass(CLASS_FIXED));}else{if(/mouse(over|enter)/i.test(options.show.event)){this._bind(hideTarget,"mouseleave",function(){clearTimeout(this.timers.show);
});}}if((""+options.hide.event).indexOf("unfocus")>-1){this._bind(containerTarget.closest("html"),["mousedown","touchstart"],function(event){var elem=$(event.target),enabled=this.rendered&&!this.tooltip.hasClass(CLASS_DISABLED)&&this.tooltip[0].offsetWidth>0,isAncestor=elem.parents(SELECTOR).filter(this.tooltip[0]).length>0;
if(elem[0]!==this.target[0]&&elem[0]!==this.tooltip[0]&&!isAncestor&&!this.target.has(elem[0]).length&&enabled){this.hide(event);
}});}if("number"===typeof options.hide.inactive){this._bind(showTarget,"qtip-"+this.id+"-inactive",inactiveMethod,"inactive");
this._bind(hideTarget.add(tooltip),QTIP.inactiveEvents,inactiveMethod);}this._bindEvents(showEvents,hideEvents,showTarget,hideTarget,showMethod,hideMethod);
this._bind(showTarget.add(tooltip),"mousemove",function(event){if("number"===typeof options.hide.distance){var origin=this.cache.origin||{},limit=this.options.hide.distance,abs=Math.abs;
if(abs(event.pageX-origin.pageX)>=limit||abs(event.pageY-origin.pageY)>=limit){this.hide(event);}}this._storeMouse(event);
});if(posOptions.target==="mouse"){if(posOptions.adjust.mouse){if(options.hide.event){this._bind(showTarget,["mouseenter","mouseleave"],function(event){if(!this.cache){return FALSE;
}this.cache.onTarget=event.type==="mouseenter";});}this._bind(documentTarget,"mousemove",function(event){if(this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(CLASS_DISABLED)&&this.tooltip[0].offsetWidth>0){this.reposition(event);
}});}}if(posOptions.adjust.resize||viewportTarget.length){this._bind($.event.special.resize?viewportTarget:windowTarget,"resize",repositionMethod);
}if(posOptions.adjust.scroll){this._bind(windowTarget.add(posOptions.container),"scroll",repositionMethod);}};PROTOTYPE._unassignEvents=function(){var options=this.options,showTargets=options.show.target,hideTargets=options.hide.target,targets=$.grep([this.elements.target[0],this.rendered&&this.tooltip[0],options.position.container[0],options.position.viewport[0],options.position.container.closest("html")[0],window,document],function(i){return typeof i==="object";
});if(showTargets&&showTargets.toArray){targets=targets.concat(showTargets.toArray());}if(hideTargets&&hideTargets.toArray){targets=targets.concat(hideTargets.toArray());
}this._unbind(targets)._unbind(targets,"destroy")._unbind(targets,"inactive");};$(function(){delegate(SELECTOR,["mouseenter","mouseleave"],function(event){var state=event.type==="mouseenter",tooltip=$(event.currentTarget),target=$(event.relatedTarget||event.target),options=this.options;
if(state){this.focus(event);tooltip.hasClass(CLASS_FIXED)&&!tooltip.hasClass(CLASS_DISABLED)&&clearTimeout(this.timers.hide);
}else{if(options.position.target==="mouse"&&options.position.adjust.mouse&&options.hide.event&&options.show.target&&!target.closest(options.show.target[0]).length){this.hide(event);
}}tooltip.toggleClass(CLASS_HOVER,state);});delegate("["+ATTR_ID+"]",INACTIVE_EVENTS,inactiveMethod);});function init(elem,id,opts){var obj,posOptions,attr,config,title,docBody=$(document.body),newTarget=elem[0]===document?docBody:elem,metadata=(elem.metadata)?elem.metadata(opts.metadata):NULL,metadata5=opts.metadata.type==="html5"&&metadata?metadata[opts.metadata.name]:NULL,html5=elem.data(opts.metadata.name||"qtipopts");
try{html5=typeof html5==="string"?$.parseJSON(html5):html5;}catch(e){}config=$.extend(TRUE,{},QTIP.defaults,opts,typeof html5==="object"?sanitizeOptions(html5):NULL,sanitizeOptions(metadata5||metadata));
posOptions=config.position;config.id=id;if("boolean"===typeof config.content.text){attr=elem.attr(config.content.attr);if(config.content.attr!==FALSE&&attr){config.content.text=attr;
}else{return FALSE;}}if(!posOptions.container.length){posOptions.container=docBody;}if(posOptions.target===FALSE){posOptions.target=newTarget;
}if(config.show.target===FALSE){config.show.target=newTarget;}if(config.show.solo===TRUE){config.show.solo=posOptions.container.closest("body");
}if(config.hide.target===FALSE){config.hide.target=newTarget;}if(config.position.viewport===TRUE){config.position.viewport=posOptions.container;
}posOptions.container=posOptions.container.eq(0);posOptions.at=new CORNER(posOptions.at,TRUE);posOptions.my=new CORNER(posOptions.my);
if(elem.data(NAMESPACE)){if(config.overwrite){elem.qtip("destroy",true);}else{if(config.overwrite===FALSE){return FALSE;}}}elem.attr(ATTR_HAS,id);
if(config.suppress&&(title=elem.attr("title"))){elem.removeAttr("title").attr(oldtitle,title).attr("title","");}obj=new QTip(elem,config,id,!!attr);
elem.data(NAMESPACE,obj);return obj;}QTIP=$.fn.qtip=function(options,notation,newValue){var command=(""+options).toLowerCase(),returned=NULL,args=$.makeArray(arguments).slice(1),event=args[args.length-1],opts=this[0]?$.data(this[0],NAMESPACE):NULL;
if((!arguments.length&&opts)||command==="api"){return opts;}else{if("string"===typeof options){this.each(function(){var api=$.data(this,NAMESPACE);
if(!api){return TRUE;}if(event&&event.timeStamp){api.cache.event=event;}if(notation&&(command==="option"||command==="options")){if(newValue!==undefined||$.isPlainObject(notation)){api.set(notation,newValue);
}else{returned=api.get(notation);return FALSE;}}else{if(api[command]){api[command].apply(api,args);}}});return returned!==NULL?returned:this;
}else{if("object"===typeof options||!arguments.length){opts=sanitizeOptions($.extend(TRUE,{},options));return this.each(function(i){var api,id;
id=$.isArray(opts.id)?opts.id[i]:opts.id;id=!id||id===FALSE||id.length<1||QTIP.api[id]?QTIP.nextid++:id;api=init($(this),id,opts);
if(api===FALSE){return TRUE;}else{QTIP.api[id]=api;}$.each(PLUGINS,function(){if(this.initialize==="initialize"){this(api);
}});api._assignInitialEvents(event);});}}}};$.qtip=QTip;QTIP.api={};$.each({attr:function(attr,val){if(this.length){var self=this[0],title="title",api=$.data(self,"qtip");
if(attr===title&&api&&"object"===typeof api&&api.options.suppress){if(arguments.length<2){return $.attr(self,oldtitle);}if(api&&api.options.content.attr===title&&api.cache.attr){api.set("content.text",val);
}return this.attr(oldtitle,val);}}return $.fn["attr"+replaceSuffix].apply(this,arguments);},clone:function(keepData){var titles=$([]),title="title",elems=$.fn["clone"+replaceSuffix].apply(this,arguments);
if(!keepData){elems.filter("["+oldtitle+"]").attr("title",function(){return $.attr(this,oldtitle);}).removeAttr(oldtitle);
}return elems;}},function(name,func){if(!func||$.fn[name+replaceSuffix]){return TRUE;}var old=$.fn[name+replaceSuffix]=$.fn[name];
$.fn[name]=function(){return func.apply(this,arguments)||old.apply(this,arguments);};});if(!$.ui){$["cleanData"+replaceSuffix]=$.cleanData;
$.cleanData=function(elems){for(var i=0,elem;(elem=$(elems[i])).length;i++){if(elem.attr(ATTR_HAS)){try{elem.triggerHandler("removeqtip");
}catch(e){}}}$["cleanData"+replaceSuffix].apply(this,arguments);};}QTIP.version="2.2.1";QTIP.nextid=0;QTIP.inactiveEvents=INACTIVE_EVENTS;
QTIP.zindex=15000;QTIP.defaults={prerender:FALSE,id:FALSE,overwrite:TRUE,suppress:TRUE,content:{text:TRUE,attr:"title",title:FALSE,button:FALSE},position:{my:"top left",at:"bottom right",target:FALSE,container:FALSE,viewport:FALSE,adjust:{x:0,y:0,mouse:TRUE,scroll:TRUE,resize:TRUE,method:"flipinvert flipinvert"},effect:function(api,pos,viewport){$(this).animate(pos,{duration:200,queue:FALSE});
}},show:{target:FALSE,event:"mouseenter",effect:TRUE,delay:90,solo:FALSE,ready:FALSE,autofocus:FALSE},hide:{target:FALSE,event:"mouseleave",effect:TRUE,delay:0,fixed:FALSE,inactive:FALSE,leave:"window",distance:FALSE},style:{classes:"",widget:FALSE,width:FALSE,height:FALSE,def:TRUE},events:{render:NULL,move:NULL,show:NULL,hide:NULL,toggle:NULL,visible:NULL,hidden:NULL,focus:NULL,blur:NULL}};
var TIP,TIPNS=".qtip-tip",MARGIN="margin",BORDER="border",COLOR="color",BG_COLOR="background-color",TRANSPARENT="transparent",IMPORTANT=" !important",HASCANVAS=!!document.createElement("canvas").getContext,INVALID=/rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i;
function camel(s){return s.charAt(0).toUpperCase()+s.slice(1);}var cssProps={},cssPrefixes=["Webkit","O","Moz","ms"];function vendorCss(elem,prop){var ucProp=prop.charAt(0).toUpperCase()+prop.slice(1),props=(prop+" "+cssPrefixes.join(ucProp+" ")+ucProp).split(" "),cur,val,i=0;
if(cssProps[prop]){return elem.css(cssProps[prop]);}while((cur=props[i++])){if((val=elem.css(cur))!==undefined){return cssProps[prop]=cur,val;
}}}function intCss(elem,prop){return Math.ceil(parseFloat(vendorCss(elem,prop)));}if(!HASCANVAS){var createVML=function(tag,props,style){return"<qtipvml:"+tag+' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '+(props||"")+' style="behavior: url(#default#VML); '+(style||"")+'" />';
};}else{var PIXEL_RATIO=window.devicePixelRatio||1,BACKING_STORE_RATIO=(function(){var context=document.createElement("canvas").getContext("2d");
return context.backingStorePixelRatio||context.webkitBackingStorePixelRatio||context.mozBackingStorePixelRatio||context.msBackingStorePixelRatio||context.oBackingStorePixelRatio||1;
}()),SCALE=PIXEL_RATIO/BACKING_STORE_RATIO;}function Tip(qtip,options){this._ns="tip";this.options=options;this.offset=options.offset;
this.size=[options.width,options.height];this.init((this.qtip=qtip));}$.extend(Tip.prototype,{init:function(qtip){var context,tip;
tip=this.element=qtip.elements.tip=$("<div />",{"class":NAMESPACE+"-tip"}).prependTo(qtip.tooltip);if(HASCANVAS){context=$("<canvas />").appendTo(this.element)[0].getContext("2d");
context.lineJoin="miter";context.miterLimit=100000;context.save();}else{context=createVML("shape",'coordorigin="0,0"',"position:absolute;");
this.element.html(context+context);qtip._bind($("*",tip).add(tip),["click","mousedown"],function(event){event.stopPropagation();
},this._ns);}qtip._bind(qtip.tooltip,"tooltipmove",this.reposition,this._ns,this);this.create();},_swapDimensions:function(){this.size[0]=this.options.height;
this.size[1]=this.options.width;},_resetDimensions:function(){this.size[0]=this.options.width;this.size[1]=this.options.height;
},_useTitle:function(corner){var titlebar=this.qtip.elements.titlebar;return titlebar&&(corner.y===TOP||(corner.y===CENTER&&this.element.position().top+(this.size[1]/2)+this.options.offset<titlebar.outerHeight(TRUE)));
},_parseCorner:function(corner){var my=this.qtip.options.position.my;if(corner===FALSE||my===FALSE){corner=FALSE;}else{if(corner===TRUE){corner=new CORNER(my.string());
}else{if(!corner.string){corner=new CORNER(corner);corner.fixed=TRUE;}}}return corner;},_parseWidth:function(corner,side,use){var elements=this.qtip.elements,prop=BORDER+camel(side)+"Width";
return(use?intCss(use,prop):(intCss(elements.content,prop)||intCss(this._useTitle(corner)&&elements.titlebar||elements.content,prop)||intCss(elements.tooltip,prop)))||0;
},_parseRadius:function(corner){var elements=this.qtip.elements,prop=BORDER+camel(corner.y)+camel(corner.x)+"Radius";return BROWSER.ie<9?0:intCss(this._useTitle(corner)&&elements.titlebar||elements.content,prop)||intCss(elements.tooltip,prop)||0;
},_invalidColour:function(elem,prop,compare){var val=elem.css(prop);return !val||(compare&&val===elem.css(compare))||INVALID.test(val)?FALSE:val;
},_parseColours:function(corner){var elements=this.qtip.elements,tip=this.element.css("cssText",""),borderSide=BORDER+camel(corner[corner.precedance])+camel(COLOR),colorElem=this._useTitle(corner)&&elements.titlebar||elements.content,css=this._invalidColour,color=[];
color[0]=css(tip,BG_COLOR)||css(colorElem,BG_COLOR)||css(elements.content,BG_COLOR)||css(elements.tooltip,BG_COLOR)||tip.css(BG_COLOR);
color[1]=css(tip,borderSide,COLOR)||css(colorElem,borderSide,COLOR)||css(elements.content,borderSide,COLOR)||css(elements.tooltip,borderSide,COLOR)||elements.tooltip.css(borderSide);
$("*",tip).add(tip).css("cssText",BG_COLOR+":"+TRANSPARENT+IMPORTANT+";"+BORDER+":0"+IMPORTANT+";");return color;},_calculateSize:function(corner){var y=corner.precedance===Y,width=this.options.width,height=this.options.height,isCenter=corner.abbrev()==="c",base=(y?width:height)*(isCenter?0.5:1),pow=Math.pow,round=Math.round,bigHyp,ratio,result,smallHyp=Math.sqrt(pow(base,2)+pow(height,2)),hyp=[(this.border/base)*smallHyp,(this.border/height)*smallHyp];
hyp[2]=Math.sqrt(pow(hyp[0],2)-pow(this.border,2));hyp[3]=Math.sqrt(pow(hyp[1],2)-pow(this.border,2));bigHyp=smallHyp+hyp[2]+hyp[3]+(isCenter?0:hyp[0]);
ratio=bigHyp/smallHyp;result=[round(ratio*width),round(ratio*height)];return y?result:result.reverse();},_calculateTip:function(corner,size,scale){scale=scale||1;
size=size||this.size;var width=size[0]*scale,height=size[1]*scale,width2=Math.ceil(width/2),height2=Math.ceil(height/2),tips={br:[0,0,width,height,width,0],bl:[0,0,width,0,0,height],tr:[0,height,width,0,width,height],tl:[0,0,0,height,width,height],tc:[0,height,width2,0,width,height],bc:[0,0,width,0,width2,height],rc:[0,0,width,height2,0,height],lc:[width,0,width,height,0,height2]};
tips.lt=tips.br;tips.rt=tips.bl;tips.lb=tips.tr;tips.rb=tips.tl;return tips[corner.abbrev()];},_drawCoords:function(context,coords){context.beginPath();
context.moveTo(coords[0],coords[1]);context.lineTo(coords[2],coords[3]);context.lineTo(coords[4],coords[5]);context.closePath();
},create:function(){var c=this.corner=(HASCANVAS||BROWSER.ie)&&this._parseCorner(this.options.corner);if((this.enabled=!!this.corner&&this.corner.abbrev()!=="c")){this.qtip.cache.corner=c.clone();
this.update();}this.element.toggle(this.enabled);return this.corner;},update:function(corner,position){if(!this.enabled){return this;
}var elements=this.qtip.elements,tip=this.element,inner=tip.children(),options=this.options,curSize=this.size,mimic=options.mimic,round=Math.round,color,precedance,context,coords,bigCoords,translate,newSize,border,BACKING_STORE_RATIO;
if(!corner){corner=this.qtip.cache.corner||this.corner;}if(mimic===FALSE){mimic=corner;}else{mimic=new CORNER(mimic);mimic.precedance=corner.precedance;
if(mimic.x==="inherit"){mimic.x=corner.x;}else{if(mimic.y==="inherit"){mimic.y=corner.y;}else{if(mimic.x===mimic.y){mimic[corner.precedance]=corner[corner.precedance];
}}}}precedance=mimic.precedance;if(corner.precedance===X){this._swapDimensions();}else{this._resetDimensions();}color=this.color=this._parseColours(corner);
if(color[1]!==TRANSPARENT){border=this.border=this._parseWidth(corner,corner[corner.precedance]);if(options.border&&border<1&&!INVALID.test(color[1])){color[0]=color[1];
}this.border=border=options.border!==TRUE?options.border:border;}else{this.border=border=0;}newSize=this.size=this._calculateSize(corner);
tip.css({width:newSize[0],height:newSize[1],lineHeight:newSize[1]+"px"});if(corner.precedance===Y){translate=[round(mimic.x===LEFT?border:mimic.x===RIGHT?newSize[0]-curSize[0]-border:(newSize[0]-curSize[0])/2),round(mimic.y===TOP?newSize[1]-curSize[1]:0)];
}else{translate=[round(mimic.x===LEFT?newSize[0]-curSize[0]:0),round(mimic.y===TOP?border:mimic.y===BOTTOM?newSize[1]-curSize[1]-border:(newSize[1]-curSize[1])/2)];
}if(HASCANVAS){context=inner[0].getContext("2d");context.restore();context.save();context.clearRect(0,0,6000,6000);coords=this._calculateTip(mimic,curSize,SCALE);
bigCoords=this._calculateTip(mimic,this.size,SCALE);inner.attr(WIDTH,newSize[0]*SCALE).attr(HEIGHT,newSize[1]*SCALE);inner.css(WIDTH,newSize[0]).css(HEIGHT,newSize[1]);
this._drawCoords(context,bigCoords);context.fillStyle=color[1];context.fill();context.translate(translate[0]*SCALE,translate[1]*SCALE);
this._drawCoords(context,coords);context.fillStyle=color[0];context.fill();}else{coords=this._calculateTip(mimic);coords="m"+coords[0]+","+coords[1]+" l"+coords[2]+","+coords[3]+" "+coords[4]+","+coords[5]+" xe";
translate[2]=border&&/^(r|b)/i.test(corner.string())?BROWSER.ie===8?2:1:0;inner.css({coordsize:(newSize[0]+border)+" "+(newSize[1]+border),antialias:""+(mimic.string().indexOf(CENTER)>-1),left:translate[0]-(translate[2]*Number(precedance===X)),top:translate[1]-(translate[2]*Number(precedance===Y)),width:newSize[0]+border,height:newSize[1]+border}).each(function(i){var $this=$(this);
$this[$this.prop?"prop":"attr"]({coordsize:(newSize[0]+border)+" "+(newSize[1]+border),path:coords,fillcolor:color[0],filled:!!i,stroked:!i}).toggle(!!(border||i));
!i&&$this.html(createVML("stroke",'weight="'+(border*2)+'px" color="'+color[1]+'" miterlimit="1000" joinstyle="miter"'));
});}window.opera&&setTimeout(function(){elements.tip.css({display:"inline-block",visibility:"visible"});},1);if(position!==FALSE){this.calculate(corner,newSize);
}},calculate:function(corner,size){if(!this.enabled){return FALSE;}var self=this,elements=this.qtip.elements,tip=this.element,userOffset=this.options.offset,isWidget=elements.tooltip.hasClass("ui-widget"),position={},precedance,corners;
corner=corner||this.corner;precedance=corner.precedance;size=size||this._calculateSize(corner);corners=[corner.x,corner.y];
if(precedance===X){corners.reverse();}$.each(corners,function(i,side){var b,bc,br;if(side===CENTER){b=precedance===Y?LEFT:TOP;
position[b]="50%";position[MARGIN+"-"+b]=-Math.round(size[precedance===Y?0:1]/2)+userOffset;}else{b=self._parseWidth(corner,side,elements.tooltip);
bc=self._parseWidth(corner,side,elements.content);br=self._parseRadius(corner);position[side]=Math.max(-self.border,i?bc:(userOffset+(br>b?br:-b)));
}});position[corner[precedance]]-=size[precedance===X?0:1];tip.css({margin:"",top:"",bottom:"",left:"",right:""}).css(position);
return position;},reposition:function(event,api,pos,viewport){if(!this.enabled){return;}var cache=api.cache,newCorner=this.corner.clone(),adjust=pos.adjusted,method=api.options.position.adjust.method.split(" "),horizontal=method[0],vertical=method[1]||method[0],shift={left:FALSE,top:FALSE,x:0,y:0},offset,css={},props;
function shiftflip(direction,precedance,popposite,side,opposite){if(direction===SHIFT&&newCorner.precedance===precedance&&adjust[side]&&newCorner[popposite]!==CENTER){newCorner.precedance=newCorner.precedance===X?Y:X;
}else{if(direction!==SHIFT&&adjust[side]){newCorner[precedance]=newCorner[precedance]===CENTER?(adjust[side]>0?side:opposite):(newCorner[precedance]===side?opposite:side);
}}}function shiftonly(xy,side,opposite){if(newCorner[xy]===CENTER){css[MARGIN+"-"+side]=shift[xy]=offset[MARGIN+"-"+side]-adjust[side];
}else{props=offset[opposite]!==undefined?[adjust[side],-offset[side]]:[-adjust[side],offset[side]];if((shift[xy]=Math.max(props[0],props[1]))>props[0]){pos[side]-=adjust[side];
shift[side]=FALSE;}css[offset[opposite]!==undefined?opposite:side]=shift[xy];}}if(this.corner.fixed!==TRUE){shiftflip(horizontal,X,Y,LEFT,RIGHT);
shiftflip(vertical,Y,X,TOP,BOTTOM);if(newCorner.string()!==cache.corner.string()||cache.cornerTop!==adjust.top||cache.cornerLeft!==adjust.left){this.update(newCorner,FALSE);
}}offset=this.calculate(newCorner);if(offset.right!==undefined){offset.left=-offset.right;}if(offset.bottom!==undefined){offset.top=-offset.bottom;
}offset.user=this.offset;if(shift.left=(horizontal===SHIFT&&!!adjust.left)){shiftonly(X,LEFT,RIGHT);}if(shift.top=(vertical===SHIFT&&!!adjust.top)){shiftonly(Y,TOP,BOTTOM);
}this.element.css(css).toggle(!((shift.x&&shift.y)||(newCorner.x===CENTER&&shift.y)||(newCorner.y===CENTER&&shift.x)));pos.left-=offset.left.charAt?offset.user:horizontal!==SHIFT||shift.top||!shift.left&&!shift.top?offset.left+this.border:0;
pos.top-=offset.top.charAt?offset.user:vertical!==SHIFT||shift.left||!shift.left&&!shift.top?offset.top+this.border:0;cache.cornerLeft=adjust.left;
cache.cornerTop=adjust.top;cache.corner=newCorner.clone();},destroy:function(){this.qtip._unbind(this.qtip.tooltip,this._ns);
if(this.qtip.elements.tip){this.qtip.elements.tip.find("*").remove().end().remove();}}});TIP=PLUGINS.tip=function(api){return new Tip(api,api.options.style.tip);
};TIP.initialize="render";TIP.sanitize=function(options){if(options.style&&"tip" in options.style){var opts=options.style.tip;
if(typeof opts!=="object"){opts=options.style.tip={corner:opts};}if(!(/string|boolean/i).test(typeof opts.corner)){opts.corner=TRUE;
}}};CHECKS.tip={"^position.my|style.tip.(corner|mimic|border)$":function(){this.create();this.qtip.reposition();},"^style.tip.(height|width)$":function(obj){this.size=[obj.width,obj.height];
this.update();this.qtip.reposition();},"^content.title|style.(classes|widget)$":function(){this.update();}};$.extend(TRUE,QTIP.defaults,{style:{tip:{corner:TRUE,mimic:FALSE,width:6,height:6,border:TRUE,offset:0}}});
var MODAL,OVERLAY,MODALCLASS="qtip-modal",MODALSELECTOR="."+MODALCLASS;OVERLAY=function(){var self=this,focusableElems={},current,onLast,prevState,elem;
function focusable(element){if($.expr[":"].focusable){return $.expr[":"].focusable;}var isTabIndexNotNaN=!isNaN($.attr(element,"tabindex")),nodeName=element.nodeName&&element.nodeName.toLowerCase(),map,mapName,img;
if("area"===nodeName){map=element.parentNode;mapName=map.name;if(!element.href||!mapName||map.nodeName.toLowerCase()!=="map"){return false;
}img=$("img[usemap=#"+mapName+"]")[0];return !!img&&img.is(":visible");}return(/input|select|textarea|button|object/.test(nodeName)?!element.disabled:"a"===nodeName?element.href||isTabIndexNotNaN:isTabIndexNotNaN);
}function focusInputs(blurElems){if(focusableElems.length<1&&blurElems.length){blurElems.not("body").blur();}else{focusableElems.first().focus();
}}function stealFocus(event){if(!elem.is(":visible")){return;}var target=$(event.target),tooltip=current.tooltip,container=target.closest(SELECTOR),targetOnTop;
targetOnTop=container.length<1?FALSE:(parseInt(container[0].style.zIndex,10)>parseInt(tooltip[0].style.zIndex,10));if(!targetOnTop&&target.closest(SELECTOR)[0]!==tooltip[0]){focusInputs(target);
}onLast=event.target===focusableElems[focusableElems.length-1];}$.extend(self,{init:function(){elem=self.elem=$("<div />",{id:"qtip-overlay",html:"<div></div>",mousedown:function(){return FALSE;
}}).hide();$(document.body).bind("focusin"+MODALSELECTOR,stealFocus);$(document).bind("keydown"+MODALSELECTOR,function(event){if(current&&current.options.show.modal.escape&&event.keyCode===27){current.hide(event);
}});elem.bind("click"+MODALSELECTOR,function(event){if(current&&current.options.show.modal.blur){current.hide(event);}});
return self;},update:function(api){current=api;if(api.options.show.modal.stealfocus!==FALSE){focusableElems=api.tooltip.find("*").filter(function(){return focusable(this);
});}else{focusableElems=[];}},toggle:function(api,state,duration){var docBody=$(document.body),tooltip=api.tooltip,options=api.options.show.modal,effect=options.effect,type=state?"show":"hide",visible=elem.is(":visible"),visibleModals=$(MODALSELECTOR).filter(":visible:not(:animated)").not(tooltip),zindex;
self.update(api);if(state&&options.stealfocus!==FALSE){focusInputs($(":focus"));}elem.toggleClass("blurs",options.blur);if(state){elem.appendTo(document.body);
}if((elem.is(":animated")&&visible===state&&prevState!==FALSE)||(!state&&visibleModals.length)){return self;}elem.stop(TRUE,FALSE);
if($.isFunction(effect)){effect.call(elem,state);}else{if(effect===FALSE){elem[type]();}else{elem.fadeTo(parseInt(duration,10)||90,state?1:0,function(){if(!state){elem.hide();
}});}}if(!state){elem.queue(function(next){elem.css({left:"",top:""});if(!$(MODALSELECTOR).length){elem.detach();}next();
});}prevState=state;if(current.destroyed){current=NULL;}return self;}});self.init();};OVERLAY=new OVERLAY();function Modal(api,options){this.options=options;
this._ns="-modal";this.init((this.qtip=api));}$.extend(Modal.prototype,{init:function(qtip){var tooltip=qtip.tooltip;if(!this.options.on){return this;
}qtip.elements.overlay=OVERLAY.elem;tooltip.addClass(MODALCLASS).css("z-index",QTIP.modal_zindex+$(MODALSELECTOR).length);
qtip._bind(tooltip,["tooltipshow","tooltiphide"],function(event,api,duration){var oEvent=event.originalEvent;if(event.target===tooltip[0]){if(oEvent&&event.type==="tooltiphide"&&/mouse(leave|enter)/.test(oEvent.type)&&$(oEvent.relatedTarget).closest(OVERLAY.elem[0]).length){try{event.preventDefault();
}catch(e){}}else{if(!oEvent||(oEvent&&oEvent.type!=="tooltipsolo")){this.toggle(event,event.type==="tooltipshow",duration);
}}}},this._ns,this);qtip._bind(tooltip,"tooltipfocus",function(event,api){if(event.isDefaultPrevented()||event.target!==tooltip[0]){return;
}var qtips=$(MODALSELECTOR),newIndex=QTIP.modal_zindex+qtips.length,curIndex=parseInt(tooltip[0].style.zIndex,10);OVERLAY.elem[0].style.zIndex=newIndex-1;
qtips.each(function(){if(this.style.zIndex>curIndex){this.style.zIndex-=1;}});qtips.filter("."+CLASS_FOCUS).qtip("blur",event.originalEvent);
tooltip.addClass(CLASS_FOCUS)[0].style.zIndex=newIndex;OVERLAY.update(api);try{event.preventDefault();}catch(e){}},this._ns,this);
qtip._bind(tooltip,"tooltiphide",function(event){if(event.target===tooltip[0]){$(MODALSELECTOR).filter(":visible").not(tooltip).last().qtip("focus",event);
}},this._ns,this);},toggle:function(event,state,duration){if(event&&event.isDefaultPrevented()){return this;}OVERLAY.toggle(this.qtip,!!state,duration);
},destroy:function(){this.qtip.tooltip.removeClass(MODALCLASS);this.qtip._unbind(this.qtip.tooltip,this._ns);OVERLAY.toggle(this.qtip,FALSE);
delete this.qtip.elements.overlay;}});MODAL=PLUGINS.modal=function(api){return new Modal(api,api.options.show.modal);};MODAL.sanitize=function(opts){if(opts.show){if(typeof opts.show.modal!=="object"){opts.show.modal={on:!!opts.show.modal};
}else{if(typeof opts.show.modal.on==="undefined"){opts.show.modal.on=TRUE;}}}};QTIP.modal_zindex=QTIP.zindex-200;MODAL.initialize="render";
CHECKS.modal={"^show.modal.(on|blur)$":function(){this.destroy();this.init();this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth>0);
}};$.extend(TRUE,QTIP.defaults,{show:{modal:{on:FALSE,effect:TRUE,blur:TRUE,stealfocus:TRUE,escape:TRUE}}});PLUGINS.viewport=function(api,position,posOptions,targetWidth,targetHeight,elemWidth,elemHeight){var target=posOptions.target,tooltip=api.elements.tooltip,my=posOptions.my,at=posOptions.at,adjust=posOptions.adjust,method=adjust.method.split(" "),methodX=method[0],methodY=method[1]||method[0],viewport=posOptions.viewport,container=posOptions.container,cache=api.cache,adjusted={left:0,top:0},fixed,newMy,containerOffset,containerStatic,viewportWidth,viewportHeight,viewportScroll,viewportOffset;
if(!viewport.jquery||target[0]===window||target[0]===document.body||adjust.method==="none"){return adjusted;}containerOffset=container.offset()||adjusted;
containerStatic=container.css("position")==="static";fixed=tooltip.css("position")==="fixed";viewportWidth=viewport[0]===window?viewport.width():viewport.outerWidth(FALSE);
viewportHeight=viewport[0]===window?viewport.height():viewport.outerHeight(FALSE);viewportScroll={left:fixed?0:viewport.scrollLeft(),top:fixed?0:viewport.scrollTop()};
viewportOffset=viewport.offset()||adjusted;function calculate(side,otherSide,type,adjust,side1,side2,lengthName,targetLength,elemLength){var initialPos=position[side1],mySide=my[side],atSide=at[side],isShift=type===SHIFT,myLength=mySide===side1?elemLength:mySide===side2?-elemLength:-elemLength/2,atLength=atSide===side1?targetLength:atSide===side2?-targetLength:-targetLength/2,sideOffset=viewportScroll[side1]+viewportOffset[side1]-(containerStatic?0:containerOffset[side1]),overflow1=sideOffset-initialPos,overflow2=initialPos+elemLength-(lengthName===WIDTH?viewportWidth:viewportHeight)-sideOffset,offset=myLength-(my.precedance===side||mySide===my[otherSide]?atLength:0)-(atSide===CENTER?targetLength/2:0);
if(isShift){offset=(mySide===side1?1:-1)*myLength;position[side1]+=overflow1>0?overflow1:overflow2>0?-overflow2:0;position[side1]=Math.max(-containerOffset[side1]+viewportOffset[side1],initialPos-offset,Math.min(Math.max(-containerOffset[side1]+viewportOffset[side1]+(lengthName===WIDTH?viewportWidth:viewportHeight),initialPos+offset),position[side1],mySide==="center"?initialPos-myLength:1000000000));
}else{adjust*=(type===FLIPINVERT?2:0);if(overflow1>0&&(mySide!==side1||overflow2>0)){position[side1]-=offset+adjust;newMy.invert(side,side1);
}else{if(overflow2>0&&(mySide!==side2||overflow1>0)){position[side1]-=(mySide===CENTER?-offset:offset)+adjust;newMy.invert(side,side2);
}}if(position[side1]<viewportScroll&&-position[side1]>overflow2){position[side1]=initialPos;newMy=my.clone();}}return position[side1]-initialPos;
}if(methodX!=="shift"||methodY!=="shift"){newMy=my.clone();}adjusted={left:methodX!=="none"?calculate(X,Y,methodX,adjust.x,LEFT,RIGHT,WIDTH,targetWidth,elemWidth):0,top:methodY!=="none"?calculate(Y,X,methodY,adjust.y,TOP,BOTTOM,HEIGHT,targetHeight,elemHeight):0,my:newMy};
return adjusted;};PLUGINS.polys={polygon:function(baseCoords,corner){var result={width:0,height:0,position:{top:10000000000,right:0,bottom:0,left:10000000000},adjustable:FALSE},i=0,next,coords=[],compareX=1,compareY=1,realX=0,realY=0,newWidth,newHeight;
i=baseCoords.length;while(i--){next=[parseInt(baseCoords[--i],10),parseInt(baseCoords[i+1],10)];if(next[0]>result.position.right){result.position.right=next[0];
}if(next[0]<result.position.left){result.position.left=next[0];}if(next[1]>result.position.bottom){result.position.bottom=next[1];
}if(next[1]<result.position.top){result.position.top=next[1];}coords.push(next);}newWidth=result.width=Math.abs(result.position.right-result.position.left);
newHeight=result.height=Math.abs(result.position.bottom-result.position.top);if(corner.abbrev()==="c"){result.position={left:result.position.left+(result.width/2),top:result.position.top+(result.height/2)};
}else{while(newWidth>0&&newHeight>0&&compareX>0&&compareY>0){newWidth=Math.floor(newWidth/2);newHeight=Math.floor(newHeight/2);
if(corner.x===LEFT){compareX=newWidth;}else{if(corner.x===RIGHT){compareX=result.width-newWidth;}else{compareX+=Math.floor(newWidth/2);
}}if(corner.y===TOP){compareY=newHeight;}else{if(corner.y===BOTTOM){compareY=result.height-newHeight;}else{compareY+=Math.floor(newHeight/2);
}}i=coords.length;while(i--){if(coords.length<2){break;}realX=coords[i][0]-result.position.left;realY=coords[i][1]-result.position.top;
if((corner.x===LEFT&&realX>=compareX)||(corner.x===RIGHT&&realX<=compareX)||(corner.x===CENTER&&(realX<compareX||realX>(result.width-compareX)))||(corner.y===TOP&&realY>=compareY)||(corner.y===BOTTOM&&realY<=compareY)||(corner.y===CENTER&&(realY<compareY||realY>(result.height-compareY)))){coords.splice(i,1);
}}}result.position={left:coords[0][0],top:coords[0][1]};}return result;},rect:function(ax,ay,bx,by){return{width:Math.abs(bx-ax),height:Math.abs(by-ay),position:{left:Math.min(ax,bx),top:Math.min(ay,by)}};
},_angles:{tc:3/2,tr:7/4,tl:5/4,bc:1/2,br:1/4,bl:3/4,rc:2,lc:1,c:0},ellipse:function(cx,cy,rx,ry,corner){var c=PLUGINS.polys._angles[corner.abbrev()],rxc=c===0?0:rx*Math.cos(c*Math.PI),rys=ry*Math.sin(c*Math.PI);
return{width:(rx*2)-Math.abs(rxc),height:(ry*2)-Math.abs(rys),position:{left:cx+rxc,top:cy+rys},adjustable:FALSE};},circle:function(cx,cy,r,corner){return PLUGINS.polys.ellipse(cx,cy,r,r,corner);
}};PLUGINS.svg=function(api,svg,corner){var doc=$(document),elem=svg[0],root=$(elem.ownerSVGElement),ownerDocument=elem.ownerDocument,strokeWidth2=(parseInt(svg.css("stroke-width"),10)||0)/2,frameOffset,mtx,transformed,viewBox,len,next,i,points,result,position,dimensions;
while(!elem.getBBox){elem=elem.parentNode;}if(!elem.getBBox||!elem.parentNode){return FALSE;}switch(elem.nodeName){case"ellipse":case"circle":result=PLUGINS.polys.ellipse(elem.cx.baseVal.value,elem.cy.baseVal.value,(elem.rx||elem.r).baseVal.value+strokeWidth2,(elem.ry||elem.r).baseVal.value+strokeWidth2,corner);
break;case"line":case"polygon":case"polyline":points=elem.points||[{x:elem.x1.baseVal.value,y:elem.y1.baseVal.value},{x:elem.x2.baseVal.value,y:elem.y2.baseVal.value}];
for(result=[],i=-1,len=points.numberOfItems||points.length;++i<len;){next=points.getItem?points.getItem(i):points[i];result.push.apply(result,[next.x,next.y]);
}result=PLUGINS.polys.polygon(result,corner);break;default:result=elem.getBBox();result={width:result.width,height:result.height,position:{left:result.x,top:result.y}};
break;}position=result.position;root=root[0];if(root.createSVGPoint){mtx=elem.getScreenCTM();points=root.createSVGPoint();
points.x=position.left;points.y=position.top;transformed=points.matrixTransform(mtx);position.left=transformed.x;position.top=transformed.y;
}if(ownerDocument!==document&&api.position.target!=="mouse"){frameOffset=$((ownerDocument.defaultView||ownerDocument.parentWindow).frameElement).offset();
if(frameOffset){position.left+=frameOffset.left;position.top+=frameOffset.top;}}ownerDocument=$(ownerDocument);position.left+=ownerDocument.scrollLeft();
position.top+=ownerDocument.scrollTop();return result;};PLUGINS.imagemap=function(api,area,corner,adjustMethod){if(!area.jquery){area=$(area);
}var shape=(area.attr("shape")||"rect").toLowerCase().replace("poly","polygon"),image=$('img[usemap="#'+area.parent("map").attr("name")+'"]'),coordsString=$.trim(area.attr("coords")),coordsArray=coordsString.replace(/,$/,"").split(","),imageOffset,coords,i,next,result,len;
if(!image.length){return FALSE;}if(shape==="polygon"){result=PLUGINS.polys.polygon(coordsArray,corner);}else{if(PLUGINS.polys[shape]){for(i=-1,len=coordsArray.length,coords=[];
++i<len;){coords.push(parseInt(coordsArray[i],10));}result=PLUGINS.polys[shape].apply(this,coords.concat(corner));}else{return FALSE;
}}imageOffset=image.offset();imageOffset.left+=Math.ceil((image.outerWidth(FALSE)-image.width())/2);imageOffset.top+=Math.ceil((image.outerHeight(FALSE)-image.height())/2);
result.position.left+=imageOffset.left;result.position.top+=imageOffset.top;return result;};var IE6,BGIFRAME='<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';
function Ie6(api,qtip){this._ns="ie6";this.init((this.qtip=api));}$.extend(Ie6.prototype,{_scroll:function(){var overlay=this.qtip.elements.overlay;
overlay&&(overlay[0].style.top=$(window).scrollTop()+"px");},init:function(qtip){var tooltip=qtip.tooltip,scroll;if($("select, object").length<1){this.bgiframe=qtip.elements.bgiframe=$(BGIFRAME).appendTo(tooltip);
qtip._bind(tooltip,"tooltipmove",this.adjustBGIFrame,this._ns,this);}this.redrawContainer=$("<div/>",{id:NAMESPACE+"-rcontainer"}).appendTo(document.body);
if(qtip.elements.overlay&&qtip.elements.overlay.addClass("qtipmodal-ie6fix")){qtip._bind(window,["scroll","resize"],this._scroll,this._ns,this);
qtip._bind(tooltip,["tooltipshow"],this._scroll,this._ns,this);}this.redraw();},adjustBGIFrame:function(){var tooltip=this.qtip.tooltip,dimensions={height:tooltip.outerHeight(FALSE),width:tooltip.outerWidth(FALSE)},plugin=this.qtip.plugins.tip,tip=this.qtip.elements.tip,tipAdjust,offset;
offset=parseInt(tooltip.css("borderLeftWidth"),10)||0;offset={left:-offset,top:-offset};if(plugin&&tip){tipAdjust=(plugin.corner.precedance==="x")?[WIDTH,LEFT]:[HEIGHT,TOP];
offset[tipAdjust[1]]-=tip[tipAdjust[0]]();}this.bgiframe.css(offset).css(dimensions);},redraw:function(){if(this.qtip.rendered<1||this.drawing){return this;
}var tooltip=this.qtip.tooltip,style=this.qtip.options.style,container=this.qtip.options.position.container,perc,width,max,min;
this.qtip.drawing=1;if(style.height){tooltip.css(HEIGHT,style.height);}if(style.width){tooltip.css(WIDTH,style.width);}else{tooltip.css(WIDTH,"").appendTo(this.redrawContainer);
width=tooltip.width();if(width%2<1){width+=1;}max=tooltip.css("maxWidth")||"";min=tooltip.css("minWidth")||"";perc=(max+min).indexOf("%")>-1?container.width()/100:0;
max=((max.indexOf("%")>-1?perc:1)*parseInt(max,10))||width;min=((min.indexOf("%")>-1?perc:1)*parseInt(min,10))||0;width=max+min?Math.min(Math.max(width,min),max):width;
tooltip.css(WIDTH,Math.round(width)).appendTo(container);}this.drawing=0;return this;},destroy:function(){this.bgiframe&&this.bgiframe.remove();
this.qtip._unbind([window,this.qtip.tooltip],this._ns);}});IE6=PLUGINS.ie6=function(api){return BROWSER.ie===6?new Ie6(api):FALSE;
};IE6.initialize="render";CHECKS.ie6={"^content|style$":function(){this.redraw();}};}));}(window,document));
/*!
 * Snippet : jQuery Syntax Highlighter v2.0.0-custom
 * http://steamdev.com/snippet
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!function($){window.log=function(){log.history=log.history||[];
log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments));}};$.fn.snippet=function(language,settings){if(typeof language==="object"){settings=language;
}if(typeof language==="string"){language=language.toLowerCase();}var defaults={style:"ide-eclipse",showNum:true,transparent:true,collapse:false,menu:true,showMsg:"Expand",hideMsg:"Collapse",txtMsg:"Plain",formatedMsg:"Formated",clipboard:"",startCollapsed:false,startText:false,box:"",boxColor:"",boxFill:""};
var styleArr=["acid","berries-dark","berries-light","bipolar","blacknblue","bright","contrast","darkblue","darkness","desert","dull","easter","emacs","golden","greenlcd","ide-anjuta","ide-codewarrior","ide-devcpp","ide-eclipse","ide-kdev","ide-msvcpp","kwrite","matlab","navy","nedit","neon","night","pablo","peachpuff","print","rand01","the","typical","vampire","vim","vim-dark","whatis","whitengrey","zellner"];
if(settings){$.extend(defaults,settings);}return this.each(function(){var useStyle=defaults.style.toLowerCase();if(defaults.style==="random"){var randomnumber=Math.floor(Math.random()*(styleArr.length));
useStyle=styleArr[randomnumber];}var o=$(this);var node=this.nodeName.toLowerCase();if(node==="pre"){if(o.data("orgHtml")==undefined||o.data("orgHtml")==null){var orgHtml=o.html();
o.data("orgHtml",orgHtml);}if(!o.parent().hasClass("snippet-wrap")){if(typeof language!=="string"){if(o.attr("class").length>0){var errclass=' class="'+o.attr("class")+'"';
}else{var errclass="";}if(o.attr("id").length>0){var errid=' id="'+o.attr("id")+'"';}else{var errid="";}var error="Snippet Error: You must specify a language on inital usage of Snippet. Reference <pre"+errclass+errid+">";
console.log(error);return false;}o.addClass("sh_"+language).addClass("snippet-formatted").wrap("<div class='snippet-container' style='"+o.attr("style")+";'><div class='sh_"+useStyle+" snippet-wrap'></div></div>");
o.removeAttr("style");sh_highlightDocument();if(defaults.showNum){var newhtml=o.html();newhtml=newhtml.replace(/\n/g,"</li><li>");
newhtml="<ol class='snippet-num'><li>"+newhtml+"</li></ol>";while(newhtml.indexOf("<li></li></ol>")!=-1){newhtml=newhtml.replace("<li></li></ol>","</ol>");
}}else{var newhtml=o.html();newhtml=newhtml.replace(/\n/g,"</li><li>");newhtml="<ul class='snippet-no-num'><li>"+newhtml+"</li></ul>";
while(newhtml.indexOf("<li></li></ul>")!=-1){newhtml=newhtml.replace("<li></li></ul>","</ul>");}}newhtml=newhtml.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
o.html(newhtml);while(o.find("li").eq(0).html()==""){o.find("li").eq(0).remove();}o.find("li").each(function(){if($(this).html().length<2){var rep=($(this).html()).replace(/\s/g,"");
if(rep==""){$(this).html("<span style='display:none;'>&nbsp;</span>");}}});var txtOnly="<pre class='snippet-textonly sh_sourceCode' style='display:none;'>"+o.data("orgHtml")+"</pre>";
var controls="<div class='snippet-menu sh_sourceCode' style='display:none;'><pre><a class='snippet-copy' href='#'>copy</a><a class='snippet-text' href='#'>text</a><a class='snippet-window' href='#'>pop-up</a></pre></div>";
o.parent().append(txtOnly);o.parent().prepend(controls);o.parent().hover(function(){$(this).find(".snippet-menu").fadeIn("fast");
},function(){$(this).find(".snippet-menu").fadeOut("fast");});if(defaults.clipboard!=""&&defaults.clipboard!=false){var cpy=o.parent().find("a.snippet-copy");
cpy.show();cpy.parents(".snippet-menu").show();var txt=o.parents(".snippet-wrap").find(".snippet-textonly").text();ZeroClipboard.setMoviePath(defaults.clipboard);
var clip=new ZeroClipboard.Client();clip.setText(txt);clip.glue(cpy[0],cpy.parents(".snippet-menu")[0]);clip.addEventListener("complete",function(client,text){if(text.length>500){text=text.substr(0,500)+"...\n\n("+(text.length-500)+" characters not shown)";
}alert("Copied text to clipboard:\n\n "+text);});cpy.parents(".snippet-menu").hide();}else{o.parent().find("a.snippet-copy").hide();
}o.parent().find("a.snippet-text").click(function(){var org=$(this).parents(".snippet-wrap").find(".snippet-formatted");var txt=$(this).parents(".snippet-wrap").find(".snippet-textonly");
org.toggle();txt.toggle();if(txt.is(":visible")){$(this).html(defaults.formatedMsg);}else{$(this).html(defaults.txtMsg);}$(this).blur();
return false;});o.parent().find("a.snippet-window").click(function(){var txt=$(this).parents(".snippet-wrap").find(".snippet-textonly").html();
snippetPopup(txt);$(this).blur();return false;});if(!defaults.menu){o.prev(".snippet-menu").find("pre,.snippet-clipboard").hide();
}if(defaults.collapse){var styleClass=o.parent().attr("class");var collapseShow="<div class='snippet-reveal "+styleClass+"'><pre class='sh_sourceCode'><a href='#' class='snippet-toggle'>"+defaults.showMsg+"</a></pre></div>";
var collapseHide="<div class='sh_sourceCode snippet-hide'><pre><a href='#' class='snippet-revealed snippet-toggle'>"+defaults.hideMsg+"</a></pre></div>";
o.parents(".snippet-container").append(collapseShow);o.parent().append(collapseHide);var root=o.parents(".snippet-container");
if(defaults.startCollapsed){root.find(".snippet-reveal").show();root.find(".snippet-wrap").eq(0).hide();}else{root.find(".snippet-reveal").hide();
root.find(".snippet-wrap").eq(0).show();}root.find("a.snippet-toggle").click(function(){root.find(".snippet-wrap").toggle();
return false;});}if(defaults.transparent){var styleObj={"background-color":"transparent","box-shadow":"none","-moz-box-shadow":"none","-webkit-box-shadow":"none"};
o.css(styleObj);o.next(".snippet-textonly").css(styleObj);o.parents(".snippet-container").find(".snippet-reveal pre").css(styleObj);
}if(defaults.startText){o.hide();o.next(".snippet-textonly").show();o.parent().find(".snippet-text").html("html");}if(defaults.box!=""){var spacer="<span class='box-sp'>&nbsp;</span>";
var boxNums=defaults.box.split(",");for(var i=0;i<boxNums.length;i++){var boxNum=boxNums[i];if(boxNum.indexOf("-")==-1){boxNum=parseFloat(boxNum)-1;
o.find("li").eq(boxNum).addClass("box").prepend(spacer);}else{var numStart=parseFloat(boxNum.split("-")[0])-1;var numEnd=parseFloat(boxNum.split("-")[1])-1;
if(numStart<numEnd){o.find("li").eq(numStart).addClass("box box-top").prepend(spacer);o.find("li").eq(numEnd).addClass("box box-bot").prepend(spacer);
for(var x=numStart+1;x<numEnd;x++){o.find("li").eq(x).addClass("box box-mid").prepend(spacer);}}else{if(numStart==numEnd){o.find("li").eq(numStart).addClass("box").prepend(spacer);
}}}}if(defaults.boxColor!=""){o.find("li.box").css("border-color",defaults.boxColor);}if(defaults.boxFill!=""){o.find("li.box, li.box-top, li.box-mid, li.box-bot").addClass("box-bg").css("background-color",defaults.boxFill);
}if($.browser.webkit){o.find(".snippet-num li.box").css("margin-left","-3.3em");o.find(".snippet-num li .box-sp").css("width","21px");
}}o.parents(".snippet-container").find("a").addClass("sh_url");}else{o.parent().attr("class","sh_"+useStyle+" snippet-wrap");
o.parents(".snippet-container").find(".snippet-reveal").attr("class","sh_"+useStyle+" snippet-wrap snippet-reveal");o.find("li.box, li.box-top, li.box-mid, li.box-bot").removeAttr("style").removeAttr("class");
o.find("li .box-sp").remove();if(defaults.transparent){var styleObj={"background-color":"transparent","box-shadow":"none","-moz-box-shadow":"none","-webkit-box-shadow":"none"};
o.css(styleObj);o.next(".snippet-textonly").css(styleObj);o.parents(".snippet-container").find(".snippet-hide pre").css(styleObj);
}else{var styleObj={"background-color":"","box-shadow":"","-moz-box-shadow":"","-webkit-box-shadow":""};o.css(styleObj);o.next(".snippet-textonly").css(styleObj);
o.parents(".snippet-container").find(".snippet-reveal pre").css(styleObj);}if(defaults.showNum){var list=o.find("li").eq(0).parent();
if(list.hasClass("snippet-no-num")){list.wrap("<ol class='snippet-num'></ol>");var li=o.find("li").eq(0);li.unwrap();}}else{var list=o.find("li").eq(0).parent();
if(list.hasClass("snippet-num")){list.wrap("<ul class='snippet-no-num'></ul>");var li=o.find("li").eq(0);li.unwrap();}}if(defaults.box!=""){var spacer="<span class='box-sp'>&nbsp;</span>";
var boxNums=defaults.box.split(",");for(var i=0;i<boxNums.length;i++){var boxNum=boxNums[i];if(boxNum.indexOf("-")==-1){boxNum=parseFloat(boxNum)-1;
o.find("li").eq(boxNum).addClass("box").prepend(spacer);}else{var numStart=parseFloat(boxNum.split("-")[0])-1;var numEnd=parseFloat(boxNum.split("-")[1])-1;
if(numStart<numEnd){o.find("li").eq(numStart).addClass("box box-top").prepend(spacer);o.find("li").eq(numEnd).addClass("box box-bot").prepend(spacer);
for(var x=numStart+1;x<numEnd;x++){o.find("li").eq(x).addClass("box box-mid").prepend(spacer);}}else{if(numStart==numEnd){o.find("li").eq(numStart).addClass("box").prepend(spacer);
}}}}if(defaults.boxColor!=""){o.find("li.box").css("border-color",defaults.boxColor);}if(defaults.boxFill!=""){o.find("li.box").addClass("box-bg").css("background-color",defaults.boxFill);
}if($.browser.webkit){o.find(".snippet-num li.box").css("margin-left","-3.3em");o.find(".snippet-num li .box-sp").css("width","21px");
}}sh_highlightDocument();if(!defaults.menu){o.prev(".snippet-menu").find("pre,.snippet-clipboard").hide();}else{o.prev(".snippet-menu").find("pre,.snippet-clipboard").show();
}}}else{var error="Snippet Error: Sorry, Snippet only formats '<pre>' elements. '<"+node+">' elements are currently unsupported.";
console.log(error);return false;}});};$(document).ready(function(){$("pre.snippet-c").snippet("c");$("pre.snippet-cpp").snippet("cpp");
$("pre.snippet-csharp").snippet("csharp");$("pre.snippet-css").snippet("css");$("pre.snippet-flex").snippet("flex");$("pre.snippet-html").snippet("html");
$("pre.snippet-java").snippet("java");$("pre.snippet-javascript").snippet("javascript");$("pre.snippet-perl").snippet("perl");
$("pre.snippet-php").snippet("php");$("pre.snippet-python").snippet("python");$("pre.snippet-ruby").snippet("ruby");$("pre.snippet-sql").snippet("sql");
$("pre.snippet-xml").snippet("xml");$("pre.snippet-properties").snippet("properties");});}(window.jQuery);function snippetPopup(content){top.consoleRef=window.open("","myconsole","width=600,height=300,left=50,top=50,menubar=0,toolbar=0,location=0,status=0,scrollbars=1,resizable=1");
top.consoleRef.document.writeln("<html><head><title>Snippet :: Code View :: "+location.href+'</title></head><body bgcolor=white onLoad="self.focus()"><pre>'+content+"</pre></body></html>");
top.consoleRef.document.close();}var ZeroClipboard={version:"1.0.7",clients:{},moviePath:"ZeroClipboard.swf",nextId:1,$:function(thingy){if(typeof(thingy)=="string"){thingy=document.getElementById(thingy);
}if(!thingy.addClass){thingy.hide=function(){this.style.display="none";};thingy.show=function(){this.style.display="";};thingy.addClass=function(name){this.removeClass(name);
this.className+=" "+name;};thingy.removeClass=function(name){var classes=this.className.split(/\s+/);var idx=-1;for(var k=0;
k<classes.length;k++){if(classes[k]==name){idx=k;k=classes.length;}}if(idx>-1){classes.splice(idx,1);this.className=classes.join(" ");
}return this;};thingy.hasClass=function(name){return !!this.className.match(new RegExp("\\s*"+name+"\\s*"));};}return thingy;
},setMoviePath:function(path){this.moviePath=path;},dispatch:function(id,eventName,args){var client=this.clients[id];if(client){client.receiveEvent(eventName,args);
}},register:function(id,client){this.clients[id]=client;},getDOMObjectPosition:function(obj,stopObj){var info={left:0,top:0,width:obj.width?obj.width:obj.offsetWidth,height:obj.height?obj.height:obj.offsetHeight};
while(obj&&(obj!=stopObj)){info.left+=obj.offsetLeft;info.top+=obj.offsetTop;obj=obj.offsetParent;}return info;},Client:function(elem){this.handlers={};
this.id=ZeroClipboard.nextId++;this.movieId="ZeroClipboardMovie_"+this.id;ZeroClipboard.register(this.id,this);if(elem){this.glue(elem);
}}};ZeroClipboard.Client.prototype={id:0,ready:false,movie:null,clipText:"",handCursorEnabled:true,cssEffects:true,handlers:null,glue:function(elem,appendElem,stylesToAdd){this.domElement=ZeroClipboard.$(elem);
var zIndex=99;if(this.domElement.style.zIndex){zIndex=parseInt(this.domElement.style.zIndex,10)+1;}if(typeof(appendElem)=="string"){appendElem=ZeroClipboard.$(appendElem);
}else{if(typeof(appendElem)=="undefined"){appendElem=document.getElementsByTagName("body")[0];}}var box=ZeroClipboard.getDOMObjectPosition(this.domElement,appendElem);
this.div=document.createElement("div");this.div.className="snippet-clipboard";var style=this.div.style;style.position="absolute";
style.left=""+box.left+"px";style.top=""+box.top+"px";style.width=""+box.width+"px";style.height=""+box.height+"px";style.zIndex=zIndex;
if(typeof(stylesToAdd)=="object"){for(addedStyle in stylesToAdd){style[addedStyle]=stylesToAdd[addedStyle];}}appendElem.appendChild(this.div);
this.div.innerHTML=this.getHTML(box.width,box.height);},getHTML:function(width,height){var html="";var flashvars="id="+this.id+"&width="+width+"&height="+height;
if(navigator.userAgent.match(/MSIE/)){var protocol=location.href.match(/^https/i)?"https://":"http://";html+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+protocol+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+width+'" height="'+height+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+ZeroClipboard.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+flashvars+'"/><param name="wmode" value="transparent"/></object>';
}else{html+='<embed id="'+this.movieId+'" src="'+ZeroClipboard.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+width+'" height="'+height+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" wmode="transparent" />';
}return html;},hide:function(){if(this.div){this.div.style.left="-2000px";}},show:function(){this.reposition();},destroy:function(){if(this.domElement&&this.div){this.hide();
this.div.innerHTML="";var body=document.getElementsByTagName("body")[0];try{body.removeChild(this.div);}catch(e){}this.domElement=null;
this.div=null;}},reposition:function(elem){if(elem){this.domElement=ZeroClipboard.$(elem);if(!this.domElement){this.hide();
}}if(this.domElement&&this.div){var box=ZeroClipboard.getDOMObjectPosition(this.domElement);var style=this.div.style;style.left=""+box.left+"px";
style.top=""+box.top+"px";}},setText:function(newText){this.clipText=newText;if(this.ready){this.movie.setText(newText);}},addEventListener:function(eventName,func){eventName=eventName.toString().toLowerCase().replace(/^on/,"");
if(!this.handlers[eventName]){this.handlers[eventName]=[];}this.handlers[eventName].push(func);},setHandCursor:function(enabled){this.handCursorEnabled=enabled;
if(this.ready){this.movie.setHandCursor(enabled);}},setCSSEffects:function(enabled){this.cssEffects=!!enabled;},receiveEvent:function(eventName,args){eventName=eventName.toString().toLowerCase().replace(/^on/,"");
switch(eventName){case"load":this.movie=document.getElementById(this.movieId);if(!this.movie){var self=this;setTimeout(function(){self.receiveEvent("load",null);
},1);return;}if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/)){var self=this;setTimeout(function(){self.receiveEvent("load",null);
},100);this.ready=true;return;}this.ready=true;try{this.movie.setText(this.clipText);}catch(e){}try{this.movie.setHandCursor(this.handCursorEnabled);
}catch(e){}break;case"mouseover":if(this.domElement&&this.cssEffects){this.domElement.addClass("hover");if(this.recoverActive){this.domElement.addClass("active");
}}break;case"mouseout":if(this.domElement&&this.cssEffects){this.recoverActive=false;if(this.domElement.hasClass("active")){this.domElement.removeClass("active");
this.recoverActive=true;}this.domElement.removeClass("hover");}break;case"mousedown":if(this.domElement&&this.cssEffects){this.domElement.addClass("active");
}break;case"mouseup":if(this.domElement&&this.cssEffects){this.domElement.removeClass("active");this.recoverActive=false;
}break;}if(this.handlers[eventName]){for(var idx=0,len=this.handlers[eventName].length;idx<len;idx++){var func=this.handlers[eventName][idx];
if(typeof(func)=="function"){func(this,args);}else{if((typeof(func)=="object")&&(func.length==2)){func[0][func[1]](this,args);
}else{if(typeof(func)=="string"){window[func](this,args);}}}}}}};if(!this.sh_languages){this.sh_languages={};}var sh_requests={};
function sh_isEmailAddress(a){if(/^mailto:/.test(a)){return false;}return a.indexOf("@")!==-1;}function sh_setHref(b,c,d){var a=d.substring(b[c-2].pos,b[c-1].pos);
if(a.length>=2&&a.charAt(0)==="<"&&a.charAt(a.length-1)===">"){a=a.substr(1,a.length-2);}if(sh_isEmailAddress(a)){a="mailto:"+a;
}b[c-2].node.href=a;}function sh_konquerorExec(b){var a=[""];a.index=b.length;a.input=b;return a;}function sh_highlightString(B,o){if(/Konqueror/.test(navigator.userAgent)){if(!o.konquered){for(var F=0;
F<o.length;F++){for(var H=0;H<o[F].length;H++){var G=o[F][H][0];if(G.source==="$"){G.exec=sh_konquerorExec;}}}o.konquered=true;
}}var N=document.createElement("a");var q=document.createElement("span");var A=[];var j=0;var n=[];var C=0;var k=null;var x=function(i,a){var p=i.length;
if(p===0){return;}if(!a){var Q=n.length;if(Q!==0){var r=n[Q-1];if(!r[3]){a=r[1];}}}if(k!==a){if(k){A[j++]={pos:C};if(k==="sh_url"){sh_setHref(A,j,B);
}}if(a){var P;if(a==="sh_url"){P=N.cloneNode(false);}else{P=q.cloneNode(false);}P.className=a;A[j++]={node:P,pos:C};}}C+=p;
k=a;};var t=/\r\n|\r|\n/g;t.lastIndex=0;var d=B.length;while(C<d){var v=C;var l;var w;var h=t.exec(B);if(h===null){l=d;w=d;
}else{l=h.index;w=t.lastIndex;}var g=B.substring(v,l);var M=[];for(;;){var I=C-v;var D;var y=n.length;if(y===0){D=0;}else{D=n[y-1][2];
}var O=o[D];var z=O.length;var m=M[D];if(!m){m=M[D]=[];}var E=null;var u=-1;for(var K=0;K<z;K++){var f;if(K<m.length&&(m[K]===null||I<=m[K].index)){f=m[K];
}else{var c=O[K][0];c.lastIndex=I;f=c.exec(g);m[K]=f;}if(f!==null&&(E===null||f.index<E.index)){E=f;u=K;if(f.index===I){break;
}}}if(E===null){x(g.substring(I),null);break;}else{if(E.index>I){x(g.substring(I,E.index),null);}var e=O[u];var J=e[1];var b;
if(J instanceof Array){for(var L=0;L<J.length;L++){b=E[L+1];x(b,J[L]);}}else{b=E[0];x(b,J);}switch(e[2]){case -1:break;case -2:n.pop();
break;case -3:n.length=0;break;default:n.push(e);break;}}}if(k){A[j++]={pos:C};if(k==="sh_url"){sh_setHref(A,j,B);}k=null;
}C=w;}return A;}function sh_getClasses(d){var a=[];var b=d.className;if(b&&b.length>0){var e=b.split(" ");for(var c=0;c<e.length;
c++){if(e[c].length>0){a.push(e[c]);}}}return a;}function sh_addClass(c,a){var d=sh_getClasses(c);for(var b=0;b<d.length;
b++){if(a.toLowerCase()===d[b].toLowerCase()){return;}}d.push(a);c.className=d.join(" ");}function sh_extractTagsFromNodeList(c,a){var f=c.length;
for(var d=0;d<f;d++){var e=c.item(d);switch(e.nodeType){case 1:if(e.nodeName.toLowerCase()==="br"){var b;if(/MSIE/.test(navigator.userAgent)){b="\r";
}else{b="\n";}a.text.push(b);a.pos++;}else{a.tags.push({node:e.cloneNode(false),pos:a.pos});sh_extractTagsFromNodeList(e.childNodes,a);
a.tags.push({pos:a.pos});}break;case 3:case 4:a.text.push(e.data);a.pos+=e.length;break;}}}function sh_extractTags(c,b){var a={};
a.text=[];a.tags=b;a.pos=0;sh_extractTagsFromNodeList(c.childNodes,a);return a.text.join("");}function sh_mergeTags(d,f){var a=d.length;
if(a===0){return f;}var c=f.length;if(c===0){return d;}var i=[];var e=0;var b=0;while(e<a&&b<c){var h=d[e];var g=f[b];if(h.pos<=g.pos){i.push(h);
e++;}else{i.push(g);if(f[b+1].pos<=h.pos){b++;i.push(f[b]);b++;}else{i.push({pos:h.pos});f[b]={node:g.node.cloneNode(false),pos:h.pos};
}}}while(e<a){i.push(d[e]);e++;}while(b<c){i.push(f[b]);b++;}return i;}function sh_insertTags(k,h){var g=document;var l=document.createDocumentFragment();
var e=0;var d=k.length;var b=0;var j=h.length;var c=l;while(b<j||e<d){var i;var a;if(e<d){i=k[e];a=i.pos;}else{a=j;}if(a<=b){if(i.node){var f=i.node;
c.appendChild(f);c=f;}else{c=c.parentNode;}e++;}else{c.appendChild(g.createTextNode(h.substring(b,a)));b=a;}}return l;}function sh_highlightElement(d,g){sh_addClass(d,"sh_sourceCode");
var c=[];var e=sh_extractTags(d,c);var f=sh_highlightString(e,g);var b=sh_mergeTags(c,f);var a=sh_insertTags(b,e);while(d.hasChildNodes()){d.removeChild(d.firstChild);
}d.appendChild(a);}function sh_getXMLHttpRequest(){if(window.ActiveXObject){return new ActiveXObject("Msxml2.XMLHTTP");}else{if(window.XMLHttpRequest){return new XMLHttpRequest();
}}throw"No XMLHttpRequest implementation available";}function sh_load(language,element,prefix,suffix){if(language in sh_requests){sh_requests[language].push(element);
return;}sh_requests[language]=[element];var request=sh_getXMLHttpRequest();var url=prefix+"sh_"+language+suffix;request.open("GET",url,true);
request.onreadystatechange=function(){if(request.readyState===4){try{if(!request.status||request.status===200){eval(request.responseText);
var elements=sh_requests[language];for(var i=0;i<elements.length;i++){sh_highlightElement(elements[i],sh_languages[language]);
}}else{throw"HTTP error: status "+request.status;}}finally{request=null;}}};request.send(null);}function sh_highlightDocument(prefix,suffix){var nodeList=document.getElementsByTagName("pre");
for(var i=0;i<nodeList.length;i++){var element=nodeList.item(i);var htmlClasses=element.className.toLowerCase();var htmlClass=htmlClasses.replace(/sh_sourcecode/g,"");
if(htmlClass.indexOf("sh_")!=-1){htmlClass=htmlClass.match(/(\bsh_)\w+\b/g)[0];}if(htmlClasses.indexOf("sh_sourcecode")!=-1){continue;
}if(htmlClass.substr(0,3)==="sh_"){var language=htmlClass.substring(3);if(language in sh_languages){sh_highlightElement(element,sh_languages[language]);
}else{if(typeof(prefix)==="string"&&typeof(suffix)==="string"){sh_load(language,element,prefix,suffix);}else{console.log('Found <pre> element with class="'+htmlClass+'", but no such language exists');
continue;}}break;}}}if(!this.sh_languages){this.sh_languages={};}sh_languages.c=[[[/\/\/\//g,"sh_comment",1],[/\/\//g,"sh_comment",7],[/\/\*\*/g,"sh_comment",8],[/\/\*/g,"sh_comment",9],[/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g,["sh_keyword","sh_normal","sh_classname"],-1],[/^[ \t]*#(?:[ \t]*include)/g,"sh_preproc",10,1],[/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g,"sh_preproc",-1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1],[/"/g,"sh_string",13],[/'/g,"sh_string",14],[/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g,"sh_keyword",-1],[/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g,"sh_type",-1],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1],[/\{|\}/g,"sh_cbracket",-1],[/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,"sh_function",-1],[/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g,["sh_usertype","sh_usertype","sh_normal"],-1]],[[/$/g,null,-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\?>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/-->/g,"sh_comment",-2],[/<!--/g,"sh_comment",5]],[[/(?:\/)?>/g,"sh_keyword",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/$/g,null,-2]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/$/g,null,-2],[/</g,"sh_string",11],[/"/g,"sh_string",12],[/\/\/\//g,"sh_comment",1],[/\/\//g,"sh_comment",7],[/\/\*\*/g,"sh_comment",8],[/\/\*/g,"sh_comment",9]],[[/$/g,null,-2],[/>/g,"sh_string",-2]],[[/$/g,null,-2],[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/"/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]],[[/'/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.cpp=[[[/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g,["sh_keyword","sh_normal","sh_classname"],-1],[/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g,"sh_keyword",-1],[/\/\/\//g,"sh_comment",1],[/\/\//g,"sh_comment",7],[/\/\*\*/g,"sh_comment",8],[/\/\*/g,"sh_comment",9],[/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g,["sh_keyword","sh_normal","sh_classname"],-1],[/^[ \t]*#(?:[ \t]*include)/g,"sh_preproc",10,1],[/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g,"sh_preproc",-1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1],[/"/g,"sh_string",13],[/'/g,"sh_string",14],[/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g,"sh_keyword",-1],[/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g,"sh_type",-1],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1],[/\{|\}/g,"sh_cbracket",-1],[/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,"sh_function",-1],[/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g,["sh_usertype","sh_usertype","sh_normal"],-1]],[[/$/g,null,-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\?>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/-->/g,"sh_comment",-2],[/<!--/g,"sh_comment",5]],[[/(?:\/)?>/g,"sh_keyword",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/$/g,null,-2]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/$/g,null,-2],[/</g,"sh_string",11],[/"/g,"sh_string",12],[/\/\/\//g,"sh_comment",1],[/\/\//g,"sh_comment",7],[/\/\*\*/g,"sh_comment",8],[/\/\*/g,"sh_comment",9]],[[/$/g,null,-2],[/>/g,"sh_string",-2]],[[/$/g,null,-2],[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/"/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]],[[/'/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.csharp=[[[/\b(?:using)\b/g,"sh_preproc",-1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))(?:[FfDdMmUulL]+)?\b/g,"sh_number",-1],[/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g,["sh_keyword","sh_normal","sh_classname"],-1],[/\b(?:abstract|event|new|struct|as|explicit|null|switch|base|extern|this|false|operator|throw|break|finally|out|true|fixed|override|try|case|params|typeof|catch|for|private|foreach|protected|checked|goto|public|unchecked|class|if|readonly|unsafe|const|implicit|ref|continue|in|return|virtual|default|interface|sealed|volatile|delegate|internal|do|is|sizeof|while|lock|stackalloc|else|static|enum|namespace|get|partial|set|value|where|yield)\b/g,"sh_keyword",-1],[/\/\/\//g,"sh_comment",1],[/\/\//g,"sh_comment",7],[/\/\*\*/g,"sh_comment",8],[/\/\*/g,"sh_comment",9],[/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g,["sh_keyword","sh_normal","sh_classname"],-1],[/^[ \t]*#(?:[ \t]*include)/g,"sh_preproc",10,1],[/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g,"sh_preproc",-1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1],[/"/g,"sh_string",13],[/'/g,"sh_string",14],[/\b(?:bool|byte|sbyte|char|decimal|double|float|int|uint|long|ulong|object|short|ushort|string|void)\b/g,"sh_type",-1],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1],[/\{|\}/g,"sh_cbracket",-1],[/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,"sh_function",-1],[/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g,["sh_usertype","sh_usertype","sh_normal"],-1]],[[/$/g,null,-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\?>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/-->/g,"sh_comment",-2],[/<!--/g,"sh_comment",5]],[[/(?:\/)?>/g,"sh_keyword",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/$/g,null,-2]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/$/g,null,-2],[/</g,"sh_string",11],[/"/g,"sh_string",12],[/\/\/\//g,"sh_comment",1],[/\/\//g,"sh_comment",7],[/\/\*\*/g,"sh_comment",8],[/\/\*/g,"sh_comment",9]],[[/$/g,null,-2],[/>/g,"sh_string",-2]],[[/$/g,null,-2],[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/"/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]],[[/'/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.css=[[[/\/\/\//g,"sh_comment",1],[/\/\//g,"sh_comment",7],[/\/\*\*/g,"sh_comment",8],[/\/\*/g,"sh_comment",9],[/(?:\.|#)[A-Za-z0-9_]+/g,"sh_selector",-1],[/\{/g,"sh_cbracket",10,1],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1]],[[/$/g,null,-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\?>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/-->/g,"sh_comment",-2],[/<!--/g,"sh_comment",5]],[[/(?:\/)?>/g,"sh_keyword",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/$/g,null,-2]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\}/g,"sh_cbracket",-2],[/\/\/\//g,"sh_comment",1],[/\/\//g,"sh_comment",7],[/\/\*\*/g,"sh_comment",8],[/\/\*/g,"sh_comment",9],[/[A-Za-z0-9_-]+[ \t]*:/g,"sh_property",-1],[/[.%A-Za-z0-9_-]+/g,"sh_value",-1],[/#(?:[A-Za-z0-9_]+)/g,"sh_string",-1]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.flex=[[[/^%\{/g,"sh_preproc",1,1],[/^%[sx]/g,"sh_preproc",16,1],[/^%option/g,"sh_preproc",17,1],[/^%(?:array|pointer|[aceknopr])/g,"sh_preproc",-1],[/[A-Za-z_][A-Za-z0-9_-]*/g,"sh_preproc",19,1],[/^%%/g,"sh_preproc",20,1]],[[/^%\}/g,"sh_preproc",-2],[/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g,["sh_keyword","sh_normal","sh_classname"],-1],[/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g,"sh_keyword",-1],[/\/\/\//g,"sh_comment",2],[/\/\//g,"sh_comment",8],[/\/\*\*/g,"sh_comment",9],[/\/\*/g,"sh_comment",10],[/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g,["sh_keyword","sh_normal","sh_classname"],-1],[/^[ \t]*#(?:[ \t]*include)/g,"sh_preproc",11,1],[/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g,"sh_preproc",-1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1],[/"/g,"sh_string",14],[/'/g,"sh_string",15],[/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g,"sh_keyword",-1],[/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g,"sh_type",-1],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1],[/\{|\}/g,"sh_cbracket",-1],[/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,"sh_function",-1],[/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g,["sh_usertype","sh_usertype","sh_normal"],-1]],[[/$/g,null,-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",3,1],[/<!DOCTYPE/g,"sh_preproc",5,1],[/<!--/g,"sh_comment",6],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",7,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",7,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\?>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",4]],[[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",4]],[[/-->/g,"sh_comment",-2],[/<!--/g,"sh_comment",6]],[[/(?:\/)?>/g,"sh_keyword",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",4]],[[/$/g,null,-2]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",3,1],[/<!DOCTYPE/g,"sh_preproc",5,1],[/<!--/g,"sh_comment",6],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",7,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",7,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/$/g,null,-2],[/</g,"sh_string",12],[/"/g,"sh_string",13],[/\/\/\//g,"sh_comment",2],[/\/\//g,"sh_comment",8],[/\/\*\*/g,"sh_comment",9],[/\/\*/g,"sh_comment",10]],[[/$/g,null,-2],[/>/g,"sh_string",-2]],[[/$/g,null,-2],[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/"/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]],[[/'/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]],[[/$/g,null,-2],[/[A-Za-z_][A-Za-z0-9_-]*/g,"sh_function",-1]],[[/$/g,null,-2],[/[A-Za-z_][A-Za-z0-9_-]*/g,"sh_keyword",-1],[/"/g,"sh_string",18],[/=/g,"sh_symbol",-1]],[[/$/g,null,-2],[/"/g,"sh_string",-2]],[[/$/g,null,-2],[/\{[A-Za-z_][A-Za-z0-9_-]*\}/g,"sh_type",-1],[/"/g,"sh_string",13],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1]],[[/^%%/g,"sh_preproc",21,1],[/<[A-Za-z_][A-Za-z0-9_-]*>/g,"sh_function",-1],[/"/g,"sh_string",13],[/\\./g,"sh_preproc",-1],[/\{[A-Za-z_][A-Za-z0-9_-]*\}/g,"sh_type",-1],[/\/\*/g,"sh_comment",22],[/\{/g,"sh_cbracket",23,1],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1]],[[/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g,["sh_keyword","sh_normal","sh_classname"],-1],[/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g,"sh_keyword",-1],[/\/\/\//g,"sh_comment",2],[/\/\//g,"sh_comment",8],[/\/\*\*/g,"sh_comment",9],[/\/\*/g,"sh_comment",10],[/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g,["sh_keyword","sh_normal","sh_classname"],-1],[/^[ \t]*#(?:[ \t]*include)/g,"sh_preproc",11,1],[/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g,"sh_preproc",-1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1],[/"/g,"sh_string",14],[/'/g,"sh_string",15],[/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g,"sh_keyword",-1],[/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g,"sh_type",-1],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1],[/\{|\}/g,"sh_cbracket",-1],[/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,"sh_function",-1],[/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g,["sh_usertype","sh_usertype","sh_normal"],-1]],[[/\*\//g,"sh_comment",-2],[/\/\*/g,"sh_comment",22]],[[/\}/g,"sh_cbracket",-2],[/\{/g,"sh_cbracket",23,1],[/\$./g,"sh_variable",-1],[/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g,["sh_keyword","sh_normal","sh_classname"],-1],[/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g,"sh_keyword",-1],[/\/\/\//g,"sh_comment",2],[/\/\//g,"sh_comment",8],[/\/\*\*/g,"sh_comment",9],[/\/\*/g,"sh_comment",10],[/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g,["sh_keyword","sh_normal","sh_classname"],-1],[/^[ \t]*#(?:[ \t]*include)/g,"sh_preproc",11,1],[/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g,"sh_preproc",-1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1],[/"/g,"sh_string",14],[/'/g,"sh_string",15],[/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g,"sh_keyword",-1],[/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g,"sh_type",-1],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1],[/\{|\}/g,"sh_cbracket",-1],[/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,"sh_function",-1],[/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g,["sh_usertype","sh_usertype","sh_normal"],-1]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.html=[[[/<\?xml/g,"sh_preproc",1,1],[/<!DOCTYPE/g,"sh_preproc",3,1],[/<!--/g,"sh_comment",4],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",5,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",5,1]],[[/\?>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",2]],[[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",2]],[[/-->/g,"sh_comment",-2],[/<!--/g,"sh_comment",4]],[[/(?:\/)?>/g,"sh_keyword",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",2]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.java=[[[/\b(?:import|package)\b/g,"sh_preproc",-1],[/\/\/\//g,"sh_comment",1],[/\/\//g,"sh_comment",7],[/\/\*\*/g,"sh_comment",8],[/\/\*/g,"sh_comment",9],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1],[/"/g,"sh_string",10],[/'/g,"sh_string",11],[/(\b(?:class|interface))([ \t]+)([$A-Za-z0-9_]+)/g,["sh_keyword","sh_normal","sh_classname"],-1],[/\b(?:abstract|assert|break|case|catch|class|const|continue|default|do|else|extends|false|final|finally|for|goto|if|implements|instanceof|interface|native|new|null|private|protected|public|return|static|strictfp|super|switch|synchronized|throw|throws|true|this|transient|try|volatile|while)\b/g,"sh_keyword",-1],[/\b(?:int|byte|boolean|char|long|float|double|short|void)\b/g,"sh_type",-1],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1],[/\{|\}/g,"sh_cbracket",-1],[/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,"sh_function",-1],[/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g,["sh_usertype","sh_usertype","sh_normal"],-1]],[[/$/g,null,-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\?>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/-->/g,"sh_comment",-2],[/<!--/g,"sh_comment",5]],[[/(?:\/)?>/g,"sh_keyword",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/$/g,null,-2]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/"/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]],[[/'/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.javascript=[[[/\/\/\//g,"sh_comment",1],[/\/\//g,"sh_comment",7],[/\/\*\*/g,"sh_comment",8],[/\/\*/g,"sh_comment",9],[/\b(?:abstract|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|final|finally|for|function|goto|if|implements|in|instanceof|interface|native|new|null|private|protected|prototype|public|return|static|super|switch|synchronized|throw|throws|this|transient|true|try|typeof|var|volatile|while|with)\b/g,"sh_keyword",-1],[/(\+\+|--|\)|\])(\s*)(\/=?(?![*\/]))/g,["sh_symbol","sh_normal","sh_symbol"],-1],[/(0x[A-Fa-f0-9]+|(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?)(\s*)(\/(?![*\/]))/g,["sh_number","sh_normal","sh_symbol"],-1],[/([A-Za-z$_][A-Za-z0-9$_]*\s*)(\/=?(?![*\/]))/g,["sh_normal","sh_symbol"],-1],[/\/(?:\\.|[^*\\\/])(?:\\.|[^\\\/])*\/[gim]*/g,"sh_regexp",-1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1],[/"/g,"sh_string",10],[/'/g,"sh_string",11],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1],[/\{|\}/g,"sh_cbracket",-1],[/\b(?:Math|Infinity|NaN|undefined|arguments)\b/g,"sh_predef_var",-1],[/\b(?:Array|Boolean|Date|Error|EvalError|Function|Number|Object|RangeError|ReferenceError|RegExp|String|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt)\b/g,"sh_predef_func",-1],[/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,"sh_function",-1]],[[/$/g,null,-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\?>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/-->/g,"sh_comment",-2],[/<!--/g,"sh_comment",5]],[[/(?:\/)?>/g,"sh_keyword",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/$/g,null,-2]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/"/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]],[[/'/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.javascript_dom=[[[/\/\/\//g,"sh_comment",1],[/\/\//g,"sh_comment",7],[/\/\*\*/g,"sh_comment",8],[/\/\*/g,"sh_comment",9],[/\b(?:abstract|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|final|finally|for|function|goto|if|implements|in|instanceof|interface|native|new|null|private|protected|prototype|public|return|static|super|switch|synchronized|throw|throws|this|transient|true|try|typeof|var|volatile|while|with)\b/g,"sh_keyword",-1],[/(\+\+|--|\)|\])(\s*)(\/=?(?![*\/]))/g,["sh_symbol","sh_normal","sh_symbol"],-1],[/(0x[A-Fa-f0-9]+|(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?)(\s*)(\/(?![*\/]))/g,["sh_number","sh_normal","sh_symbol"],-1],[/([A-Za-z$_][A-Za-z0-9$_]*\s*)(\/=?(?![*\/]))/g,["sh_normal","sh_symbol"],-1],[/\/(?:\\.|[^*\\\/])(?:\\.|[^\\\/])*\/[gim]*/g,"sh_regexp",-1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1],[/"/g,"sh_string",10],[/'/g,"sh_string",11],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1],[/\{|\}/g,"sh_cbracket",-1],[/\b(?:Math|Infinity|NaN|undefined|arguments)\b/g,"sh_predef_var",-1],[/\b(?:Array|Boolean|Date|Error|EvalError|Function|Number|Object|RangeError|ReferenceError|RegExp|String|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt)\b/g,"sh_predef_func",-1],[/\b(?:applicationCache|closed|Components|content|controllers|crypto|defaultStatus|dialogArguments|directories|document|frameElement|frames|fullScreen|globalStorage|history|innerHeight|innerWidth|length|location|locationbar|menubar|name|navigator|opener|outerHeight|outerWidth|pageXOffset|pageYOffset|parent|personalbar|pkcs11|returnValue|screen|availTop|availLeft|availHeight|availWidth|colorDepth|height|left|pixelDepth|top|width|screenX|screenY|scrollbars|scrollMaxX|scrollMaxY|scrollX|scrollY|self|sessionStorage|sidebar|status|statusbar|toolbar|top|window)\b/g,"sh_predef_var",-1],[/\b(?:alert|addEventListener|atob|back|blur|btoa|captureEvents|clearInterval|clearTimeout|close|confirm|dump|escape|find|focus|forward|getAttention|getComputedStyle|getSelection|home|moveBy|moveTo|open|openDialog|postMessage|print|prompt|releaseEvents|removeEventListener|resizeBy|resizeTo|scroll|scrollBy|scrollByLines|scrollByPages|scrollTo|setInterval|setTimeout|showModalDialog|sizeToContent|stop|unescape|updateCommands|onabort|onbeforeunload|onblur|onchange|onclick|onclose|oncontextmenu|ondragdrop|onerror|onfocus|onkeydown|onkeypress|onkeyup|onload|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onpaint|onreset|onresize|onscroll|onselect|onsubmit|onunload)\b/g,"sh_predef_func",-1],[/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,"sh_function",-1]],[[/$/g,null,-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\?>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/-->/g,"sh_comment",-2],[/<!--/g,"sh_comment",5]],[[/(?:\/)?>/g,"sh_keyword",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",3]],[[/$/g,null,-2]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",2,1],[/<!DOCTYPE/g,"sh_preproc",4,1],[/<!--/g,"sh_comment",5],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",6,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",6,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/"/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]],[[/'/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.perl=[[[/\b(?:import)\b/g,"sh_preproc",-1],[/(s)(\{(?:\\\}|[^}])*\}\{(?:\\\}|[^}])*\})([ixsmogce]*)/g,["sh_keyword","sh_regexp","sh_keyword"],-1],[/(s)(\((?:\\\)|[^)])*\)\((?:\\\)|[^)])*\))([ixsmogce]*)/g,["sh_keyword","sh_regexp","sh_keyword"],-1],[/(s)(\[(?:\\\]|[^\]])*\]\[(?:\\\]|[^\]])*\])([ixsmogce]*)/g,["sh_keyword","sh_regexp","sh_keyword"],-1],[/(s)(<.*><.*>)([ixsmogce]*)/g,["sh_keyword","sh_regexp","sh_keyword"],-1],[/(q(?:q?))(\{(?:\\\}|[^}])*\})/g,["sh_keyword","sh_string"],-1],[/(q(?:q?))(\((?:\\\)|[^)])*\))/g,["sh_keyword","sh_string"],-1],[/(q(?:q?))(\[(?:\\\]|[^\]])*\])/g,["sh_keyword","sh_string"],-1],[/(q(?:q?))(<.*>)/g,["sh_keyword","sh_string"],-1],[/(q(?:q?))([^A-Za-z0-9 \t])(.*\2)/g,["sh_keyword","sh_string","sh_string"],-1],[/(s)([^A-Za-z0-9 \t])(.*\2.*\2)([ixsmogce]*(?=[ \t]*(?:\)|;)))/g,["sh_keyword","sh_regexp","sh_regexp","sh_keyword"],-1],[/(s)([^A-Za-z0-9 \t])(.*\2[ \t]*)([^A-Za-z0-9 \t])(.*\4)([ixsmogce]*(?=[ \t]*(?:\)|;)))/g,["sh_keyword","sh_regexp","sh_regexp","sh_regexp","sh_regexp","sh_keyword"],-1],[/#/g,"sh_comment",1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1],[/(?:m|qr)(?=\{)/g,"sh_keyword",2],[/(?:m|qr)(?=#)/g,"sh_keyword",4],[/(?:m|qr)(?=\|)/g,"sh_keyword",6],[/(?:m|qr)(?=@)/g,"sh_keyword",8],[/(?:m|qr)(?=<)/g,"sh_keyword",10],[/(?:m|qr)(?=\[)/g,"sh_keyword",12],[/(?:m|qr)(?=\\)/g,"sh_keyword",14],[/(?:m|qr)(?=\/)/g,"sh_keyword",16],[/"/g,"sh_string",18],[/'/g,"sh_string",19],[/</g,"sh_string",20],[/\/[^\n]*\//g,"sh_string",-1],[/\b(?:chomp|chop|chr|crypt|hex|i|index|lc|lcfirst|length|oct|ord|pack|q|qq|reverse|rindex|sprintf|substr|tr|uc|ucfirst|m|s|g|qw|abs|atan2|cos|exp|hex|int|log|oct|rand|sin|sqrt|srand|my|local|our|delete|each|exists|keys|values|pack|read|syscall|sysread|syswrite|unpack|vec|undef|unless|return|length|grep|sort|caller|continue|dump|eval|exit|goto|last|next|redo|sub|wantarray|pop|push|shift|splice|unshift|split|switch|join|defined|foreach|last|chop|chomp|bless|dbmclose|dbmopen|ref|tie|tied|untie|while|next|map|eq|die|cmp|lc|uc|and|do|if|else|elsif|for|use|require|package|import|chdir|chmod|chown|chroot|fcntl|glob|ioctl|link|lstat|mkdir|open|opendir|readlink|rename|rmdir|stat|symlink|umask|unlink|utime|binmode|close|closedir|dbmclose|dbmopen|die|eof|fileno|flock|format|getc|print|printf|read|readdir|rewinddir|seek|seekdir|select|syscall|sysread|sysseek|syswrite|tell|telldir|truncate|warn|write|alarm|exec|fork|getpgrp|getppid|getpriority|kill|pipe|qx|setpgrp|setpriority|sleep|system|times|x|wait|waitpid)\b/g,"sh_keyword",-1],[/^\=(?:head1|head2|item)/g,"sh_comment",21],[/(?:\$[#]?|@|%)[\/A-Za-z0-9_]+/g,"sh_variable",-1],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1],[/\{|\}/g,"sh_cbracket",-1],[/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,"sh_function",-1]],[[/$/g,null,-2]],[[/\{/g,"sh_regexp",3]],[[/[ \t]+#.*/g,"sh_comment",-1],[/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,"sh_variable",-1],[/\\\{|\\\}|\}/g,"sh_regexp",-3]],[[/#/g,"sh_regexp",5]],[[/[ \t]+#.*/g,"sh_comment",-1],[/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,"sh_variable",-1],[/\\#|#/g,"sh_regexp",-3]],[[/\|/g,"sh_regexp",7]],[[/[ \t]+#.*/g,"sh_comment",-1],[/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,"sh_variable",-1],[/\\\||\|/g,"sh_regexp",-3]],[[/@/g,"sh_regexp",9]],[[/[ \t]+#.*/g,"sh_comment",-1],[/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,"sh_variable",-1],[/\\@|@/g,"sh_regexp",-3]],[[/</g,"sh_regexp",11]],[[/[ \t]+#.*/g,"sh_comment",-1],[/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,"sh_variable",-1],[/\\<|\\>|>/g,"sh_regexp",-3]],[[/\[/g,"sh_regexp",13]],[[/[ \t]+#.*/g,"sh_comment",-1],[/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,"sh_variable",-1],[/\\]|\]/g,"sh_regexp",-3]],[[/\\/g,"sh_regexp",15]],[[/[ \t]+#.*/g,"sh_comment",-1],[/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,"sh_variable",-1],[/\\\\|\\/g,"sh_regexp",-3]],[[/\//g,"sh_regexp",17]],[[/[ \t]+#.*/g,"sh_comment",-1],[/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g,"sh_variable",-1],[/\\\/|\//g,"sh_regexp",-3]],[[/$/g,null,-2],[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/$/g,null,-2],[/\\(?:\\|')/g,null,-1],[/'/g,"sh_string",-2]],[[/$/g,null,-2],[/>/g,"sh_string",-2]],[[/\=cut/g,"sh_comment",-2]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.php=[[[/\b(?:include|include_once|require|require_once)\b/g,"sh_preproc",-1],[/\/\//g,"sh_comment",1],[/#/g,"sh_comment",1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1],[/"/g,"sh_string",2],[/'/g,"sh_string",3],[/\b(?:and|or|xor|__FILE__|exception|php_user_filter|__LINE__|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|each|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|for|foreach|function|global|if|isset|list|new|old_function|print|return|static|switch|unset|use|var|while|__FUNCTION__|__CLASS__|__METHOD__)\b/g,"sh_keyword",-1],[/\/\/\//g,"sh_comment",4],[/\/\//g,"sh_comment",1],[/\/\*\*/g,"sh_comment",9],[/\/\*/g,"sh_comment",10],[/(?:\$[#]?|@|%)[A-Za-z0-9_]+/g,"sh_variable",-1],[/<\?php|~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1],[/\{|\}/g,"sh_cbracket",-1],[/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,"sh_function",-1]],[[/$/g,null,-2]],[[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/\\(?:\\|')/g,null,-1],[/'/g,"sh_string",-2]],[[/$/g,null,-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",5,1],[/<!DOCTYPE/g,"sh_preproc",6,1],[/<!--/g,"sh_comment",7],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",8,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",8,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\?>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",2]],[[/>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",2]],[[/-->/g,"sh_comment",-2],[/<!--/g,"sh_comment",7]],[[/(?:\/)?>/g,"sh_keyword",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",2]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",5,1],[/<!DOCTYPE/g,"sh_preproc",6,1],[/<!--/g,"sh_comment",7],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",8,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",8,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.python=[[[/\b(?:import|from)\b/g,"sh_preproc",-1],[/#/g,"sh_comment",1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1],[/\b(?:and|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|global|if|in|is|lambda|not|or|pass|print|raise|return|try|while)\b/g,"sh_keyword",-1],[/^(?:[\s]*'{3})/g,"sh_comment",2],[/^(?:[\s]*\"{3})/g,"sh_comment",3],[/^(?:[\s]*'(?:[^\\']|\\.)*'[\s]*|[\s]*\"(?:[^\\\"]|\\.)*\"[\s]*)$/g,"sh_comment",-1],[/(?:[\s]*'{3})/g,"sh_string",4],[/(?:[\s]*\"{3})/g,"sh_string",5],[/"/g,"sh_string",6],[/'/g,"sh_string",7],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\||\{|\}/g,"sh_symbol",-1],[/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g,"sh_function",-1]],[[/$/g,null,-2]],[[/(?:'{3})/g,"sh_comment",-2]],[[/(?:\"{3})/g,"sh_comment",-2]],[[/(?:'{3})/g,"sh_string",-2]],[[/(?:\"{3})/g,"sh_string",-2]],[[/$/g,null,-2],[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/$/g,null,-2],[/\\(?:\\|')/g,null,-1],[/'/g,"sh_string",-2]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.ruby=[[[/\b(?:require)\b/g,"sh_preproc",-1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1],[/"/g,"sh_string",1],[/'/g,"sh_string",2],[/</g,"sh_string",3],[/\/[^\n]*\//g,"sh_regexp",-1],[/(%r)(\{(?:\\\}|#\{[A-Za-z0-9]+\}|[^}])*\})/g,["sh_symbol","sh_regexp"],-1],[/\b(?:alias|begin|BEGIN|break|case|defined|do|else|elsif|end|END|ensure|for|if|in|include|loop|next|raise|redo|rescue|retry|return|super|then|undef|unless|until|when|while|yield|false|nil|self|true|__FILE__|__LINE__|and|not|or|def|class|module|catch|fail|load|throw)\b/g,"sh_keyword",-1],[/(?:^\=begin)/g,"sh_comment",4],[/(?:\$[#]?|@@|@)(?:[A-Za-z0-9_]+|'|\"|\/)/g,"sh_type",-1],[/[A-Za-z0-9]+(?:\?|!)/g,"sh_normal",-1],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1],[/(#)(\{)/g,["sh_symbol","sh_cbracket"],-1],[/#/g,"sh_comment",5],[/\{|\}/g,"sh_cbracket",-1]],[[/$/g,null,-2],[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/$/g,null,-2],[/\\(?:\\|')/g,null,-1],[/'/g,"sh_string",-2]],[[/$/g,null,-2],[/>/g,"sh_string",-2]],[[/^(?:\=end)/g,"sh_comment",-2]],[[/$/g,null,-2]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.sql=[[[/\b(?:VARCHAR|TINYINT|TEXT|DATE|SMALLINT|MEDIUMINT|INT|BIGINT|FLOAT|DOUBLE|DECIMAL|DATETIME|TIMESTAMP|TIME|YEAR|UNSIGNED|CHAR|TINYBLOB|TINYTEXT|BLOB|MEDIUMBLOB|MEDIUMTEXT|LONGBLOB|LONGTEXT|ENUM|BOOL|BINARY|VARBINARY)\b/gi,"sh_type",-1],[/\b(?:ALL|ASC|AS|ALTER|AND|ADD|AUTO_INCREMENT|BETWEEN|BINARY|BOTH|BY|BOOLEAN|CHANGE|CHECK|COLUMNS|COLUMN|CROSS|CREATE|DATABASES|DATABASE|DATA|DELAYED|DESCRIBE|DESC|DISTINCT|DELETE|DROP|DEFAULT|ENCLOSED|ESCAPED|EXISTS|EXPLAIN|FIELDS|FIELD|FLUSH|FOR|FOREIGN|FUNCTION|FROM|GROUP|GRANT|HAVING|IGNORE|INDEX|INFILE|INSERT|INNER|INTO|IDENTIFIED|IN|IS|IF|JOIN|KEYS|KILL|KEY|LEADING|LIKE|LIMIT|LINES|LOAD|LOCAL|LOCK|LOW_PRIORITY|LEFT|LANGUAGE|MODIFY|NATURAL|NOT|NULL|NEXTVAL|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUTFILE|OR|OUTER|ON|PROCEDURE|PROCEDURAL|PRIMARY|READ|REFERENCES|REGEXP|RENAME|REPLACE|RETURN|REVOKE|RLIKE|RIGHT|SHOW|SONAME|STATUS|STRAIGHT_JOIN|SELECT|SETVAL|SET|TABLES|TERMINATED|TO|TRAILING|TRUNCATE|TABLE|TEMPORARY|TRIGGER|TRUSTED|UNIQUE|UNLOCK|USE|USING|UPDATE|VALUES|VARIABLES|VIEW|WITH|WRITE|WHERE|ZEROFILL|TYPE|XOR)\b/gi,"sh_keyword",-1],[/"/g,"sh_string",1],[/'/g,"sh_string",2],[/`/g,"sh_string",3],[/#/g,"sh_comment",4],[/\/\/\//g,"sh_comment",5],[/\/\//g,"sh_comment",4],[/\/\*\*/g,"sh_comment",11],[/\/\*/g,"sh_comment",12],[/--/g,"sh_comment",4],[/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g,"sh_symbol",-1],[/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g,"sh_number",-1]],[[/"/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]],[[/'/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]],[[/`/g,"sh_string",-2],[/\\./g,"sh_specialchar",-1]],[[/$/g,null,-2]],[[/$/g,null,-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",6,1],[/<!DOCTYPE/g,"sh_preproc",8,1],[/<!--/g,"sh_comment",9],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",10,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",10,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\?>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",7]],[[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",7]],[[/-->/g,"sh_comment",-2],[/<!--/g,"sh_comment",9]],[[/(?:\/)?>/g,"sh_keyword",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",7]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/<\?xml/g,"sh_preproc",6,1],[/<!DOCTYPE/g,"sh_preproc",8,1],[/<!--/g,"sh_comment",9],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",10,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g,"sh_keyword",10,1],[/@[A-Za-z]+/g,"sh_type",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]],[[/\*\//g,"sh_comment",-2],[/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g,"sh_url",-1],[/(?:TODO|FIXME|BUG)(?:[:]?)/g,"sh_todo",-1]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.url=[[{regex:/(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,style:"sh_url"},{regex:/(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,style:"sh_url"}]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.xml=[[[/<\?xml/g,"sh_preproc",1,1],[/<!DOCTYPE/g,"sh_preproc",3,1],[/<!--/g,"sh_comment",4],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g,"sh_keyword",-1],[/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g,"sh_keyword",5,1],[/&(?:[A-Za-z0-9]+);/g,"sh_preproc",-1]],[[/\?>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",2]],[[/\\(?:\\|")/g,null,-1],[/"/g,"sh_string",-2]],[[/>/g,"sh_preproc",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",2]],[[/-->/g,"sh_comment",-2],[/<!--/g,"sh_comment",4]],[[/(?:\/)?>/g,"sh_keyword",-2],[/([^=" \t>]+)([ \t]*)(=?)/g,["sh_type","sh_normal","sh_symbol"],-1],[/"/g,"sh_string",2]]];
if(!this.sh_languages){this.sh_languages={};}sh_languages.properties=[[[/#/g,"sh_comment",1],[/!/g,"sh_comment",1],[/([^="]+)([ \t]*)(=)/g,["sh_type","sh_normal","sh_symbol"],-1]],[[/$/g,null,-2]]];

/*!
 * jQuery Timepicker Addon - v1.4.3 - 2013-11-30
 * Copyright (c) 2013 Trent Richardson
 * http://trentrichardson.com/examples/timepicker
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function($){$.ui.timepicker=$.ui.timepicker||{};
if($.ui.timepicker.version){return;}$.extend($.ui,{timepicker:{version:"1.4.3"}});var Timepicker=function(){this.regional=[];
this.regional[""]={currentText:"Now",closeText:"Done",amNames:["AM","A"],pmNames:["PM","P"],timeFormat:"HH:mm",timeSuffix:"",timeOnlyTitle:"Choose Time",timeText:"Time",hourText:"Hour",minuteText:"Minute",secondText:"Second",millisecText:"Millisecond",microsecText:"Microsecond",timezoneText:"Time Zone",isRTL:false};
this._defaults={showButtonPanel:true,timeOnly:false,showHour:null,showMinute:null,showSecond:null,showMillisec:null,showMicrosec:null,showTimezone:null,showTime:true,stepHour:1,stepMinute:1,stepSecond:1,stepMillisec:1,stepMicrosec:1,hour:0,minute:0,second:0,millisec:0,microsec:0,timezone:null,hourMin:0,minuteMin:0,secondMin:0,millisecMin:0,microsecMin:0,hourMax:23,minuteMax:59,secondMax:59,millisecMax:999,microsecMax:999,minDateTime:null,maxDateTime:null,onSelect:null,hourGrid:0,minuteGrid:0,secondGrid:0,millisecGrid:0,microsecGrid:0,alwaysSetTime:true,separator:" ",altFieldTimeOnly:true,altTimeFormat:null,altSeparator:null,altTimeSuffix:null,pickerTimeFormat:null,pickerTimeSuffix:null,showTimepicker:true,timezoneList:null,addSliderAccess:false,sliderAccessArgs:null,controlType:"slider",defaultValue:null,parse:"strict"};
$.extend(this._defaults,this.regional[""]);};$.extend(Timepicker.prototype,{$input:null,$altInput:null,$timeObj:null,inst:null,hour_slider:null,minute_slider:null,second_slider:null,millisec_slider:null,microsec_slider:null,timezone_select:null,hour:0,minute:0,second:0,millisec:0,microsec:0,timezone:null,hourMinOriginal:null,minuteMinOriginal:null,secondMinOriginal:null,millisecMinOriginal:null,microsecMinOriginal:null,hourMaxOriginal:null,minuteMaxOriginal:null,secondMaxOriginal:null,millisecMaxOriginal:null,microsecMaxOriginal:null,ampm:"",formattedDate:"",formattedTime:"",formattedDateTime:"",timezoneList:null,units:["hour","minute","second","millisec","microsec"],support:{},control:null,setDefaults:function(settings){extendRemove(this._defaults,settings||{});
return this;},_newInst:function($input,opts){var tp_inst=new Timepicker(),inlineSettings={},fns={},overrides,i;for(var attrName in this._defaults){if(this._defaults.hasOwnProperty(attrName)){var attrValue=$input.attr("time:"+attrName);
if(attrValue){try{inlineSettings[attrName]=eval(attrValue);}catch(err){inlineSettings[attrName]=attrValue;}}}}overrides={beforeShow:function(input,dp_inst){if($.isFunction(tp_inst._defaults.evnts.beforeShow)){return tp_inst._defaults.evnts.beforeShow.call($input[0],input,dp_inst,tp_inst);
}},onChangeMonthYear:function(year,month,dp_inst){tp_inst._updateDateTime(dp_inst);if($.isFunction(tp_inst._defaults.evnts.onChangeMonthYear)){tp_inst._defaults.evnts.onChangeMonthYear.call($input[0],year,month,dp_inst,tp_inst);
}},onClose:function(dateText,dp_inst){if(tp_inst.timeDefined===true&&$input.val()!==""){tp_inst._updateDateTime(dp_inst);
}if($.isFunction(tp_inst._defaults.evnts.onClose)){tp_inst._defaults.evnts.onClose.call($input[0],dateText,dp_inst,tp_inst);
}}};for(i in overrides){if(overrides.hasOwnProperty(i)){fns[i]=opts[i]||null;}}tp_inst._defaults=$.extend({},this._defaults,inlineSettings,opts,overrides,{evnts:fns,timepicker:tp_inst});
tp_inst.amNames=$.map(tp_inst._defaults.amNames,function(val){return val.toUpperCase();});tp_inst.pmNames=$.map(tp_inst._defaults.pmNames,function(val){return val.toUpperCase();
});tp_inst.support=detectSupport(tp_inst._defaults.timeFormat+(tp_inst._defaults.pickerTimeFormat?tp_inst._defaults.pickerTimeFormat:"")+(tp_inst._defaults.altTimeFormat?tp_inst._defaults.altTimeFormat:""));
if(typeof(tp_inst._defaults.controlType)==="string"){if(tp_inst._defaults.controlType==="slider"&&typeof($.ui.slider)==="undefined"){tp_inst._defaults.controlType="select";
}tp_inst.control=tp_inst._controls[tp_inst._defaults.controlType];}else{tp_inst.control=tp_inst._defaults.controlType;}var timezoneList=[-720,-660,-600,-570,-540,-480,-420,-360,-300,-270,-240,-210,-180,-120,-60,0,60,120,180,210,240,270,300,330,345,360,390,420,480,525,540,570,600,630,660,690,720,765,780,840];
if(tp_inst._defaults.timezoneList!==null){timezoneList=tp_inst._defaults.timezoneList;}var tzl=timezoneList.length,tzi=0,tzv=null;
if(tzl>0&&typeof timezoneList[0]!=="object"){for(;tzi<tzl;tzi++){tzv=timezoneList[tzi];timezoneList[tzi]={value:tzv,label:$.timepicker.timezoneOffsetString(tzv,tp_inst.support.iso8601)};
}}tp_inst._defaults.timezoneList=timezoneList;tp_inst.timezone=tp_inst._defaults.timezone!==null?$.timepicker.timezoneOffsetNumber(tp_inst._defaults.timezone):((new Date()).getTimezoneOffset()*-1);
tp_inst.hour=tp_inst._defaults.hour<tp_inst._defaults.hourMin?tp_inst._defaults.hourMin:tp_inst._defaults.hour>tp_inst._defaults.hourMax?tp_inst._defaults.hourMax:tp_inst._defaults.hour;
tp_inst.minute=tp_inst._defaults.minute<tp_inst._defaults.minuteMin?tp_inst._defaults.minuteMin:tp_inst._defaults.minute>tp_inst._defaults.minuteMax?tp_inst._defaults.minuteMax:tp_inst._defaults.minute;
tp_inst.second=tp_inst._defaults.second<tp_inst._defaults.secondMin?tp_inst._defaults.secondMin:tp_inst._defaults.second>tp_inst._defaults.secondMax?tp_inst._defaults.secondMax:tp_inst._defaults.second;
tp_inst.millisec=tp_inst._defaults.millisec<tp_inst._defaults.millisecMin?tp_inst._defaults.millisecMin:tp_inst._defaults.millisec>tp_inst._defaults.millisecMax?tp_inst._defaults.millisecMax:tp_inst._defaults.millisec;
tp_inst.microsec=tp_inst._defaults.microsec<tp_inst._defaults.microsecMin?tp_inst._defaults.microsecMin:tp_inst._defaults.microsec>tp_inst._defaults.microsecMax?tp_inst._defaults.microsecMax:tp_inst._defaults.microsec;
tp_inst.ampm="";tp_inst.$input=$input;if(tp_inst._defaults.altField){tp_inst.$altInput=$(tp_inst._defaults.altField).css({cursor:"pointer"}).focus(function(){$input.trigger("focus");
});}if(tp_inst._defaults.minDate===0||tp_inst._defaults.minDateTime===0){tp_inst._defaults.minDate=new Date();}if(tp_inst._defaults.maxDate===0||tp_inst._defaults.maxDateTime===0){tp_inst._defaults.maxDate=new Date();
}if(tp_inst._defaults.minDate!==undefined&&tp_inst._defaults.minDate instanceof Date){tp_inst._defaults.minDateTime=new Date(tp_inst._defaults.minDate.getTime());
}if(tp_inst._defaults.minDateTime!==undefined&&tp_inst._defaults.minDateTime instanceof Date){tp_inst._defaults.minDate=new Date(tp_inst._defaults.minDateTime.getTime());
}if(tp_inst._defaults.maxDate!==undefined&&tp_inst._defaults.maxDate instanceof Date){tp_inst._defaults.maxDateTime=new Date(tp_inst._defaults.maxDate.getTime());
}if(tp_inst._defaults.maxDateTime!==undefined&&tp_inst._defaults.maxDateTime instanceof Date){tp_inst._defaults.maxDate=new Date(tp_inst._defaults.maxDateTime.getTime());
}tp_inst.$input.bind("focus",function(){tp_inst._onFocus();});return tp_inst;},_addTimePicker:function(dp_inst){var currDT=(this.$altInput&&this._defaults.altFieldTimeOnly)?this.$input.val()+" "+this.$altInput.val():this.$input.val();
this.timeDefined=this._parseTime(currDT);this._limitMinMaxDateTime(dp_inst,false);this._injectTimePicker();},_parseTime:function(timeString,withDate){if(!this.inst){this.inst=$.datepicker._getInst(this.$input[0]);
}if(withDate||!this._defaults.timeOnly){var dp_dateFormat=$.datepicker._get(this.inst,"dateFormat");try{var parseRes=parseDateTimeInternal(dp_dateFormat,this._defaults.timeFormat,timeString,$.datepicker._getFormatConfig(this.inst),this._defaults);
if(!parseRes.timeObj){return false;}$.extend(this,parseRes.timeObj);}catch(err){$.timepicker.log("Error parsing the date/time string: "+err+"\ndate/time string = "+timeString+"\ntimeFormat = "+this._defaults.timeFormat+"\ndateFormat = "+dp_dateFormat);
return false;}return true;}else{var timeObj=$.datepicker.parseTime(this._defaults.timeFormat,timeString,this._defaults);if(!timeObj){return false;
}$.extend(this,timeObj);return true;}},_injectTimePicker:function(){var $dp=this.inst.dpDiv,o=this.inst.settings,tp_inst=this,litem="",uitem="",show=null,max={},gridSize={},size=null,i=0,l=0;
if($dp.find("div.ui-timepicker-div").length===0&&o.showTimepicker){var noDisplay=' style="display:none;"',html='<div class="ui-timepicker-div'+(o.isRTL?" ui-timepicker-rtl":"")+'"><dl><dt class="ui_tpicker_time_label"'+((o.showTime)?"":noDisplay)+">"+o.timeText+'</dt><dd class="ui_tpicker_time"'+((o.showTime)?"":noDisplay)+"></dd>";
for(i=0,l=this.units.length;i<l;i++){litem=this.units[i];uitem=litem.substr(0,1).toUpperCase()+litem.substr(1);show=o["show"+uitem]!==null?o["show"+uitem]:this.support[litem];
max[litem]=parseInt((o[litem+"Max"]-((o[litem+"Max"]-o[litem+"Min"])%o["step"+uitem])),10);gridSize[litem]=0;html+='<dt class="ui_tpicker_'+litem+'_label"'+(show?"":noDisplay)+">"+o[litem+"Text"]+'</dt><dd class="ui_tpicker_'+litem+'"><div class="ui_tpicker_'+litem+'_slider"'+(show?"":noDisplay)+"></div>";
if(show&&o[litem+"Grid"]>0){html+='<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';if(litem==="hour"){for(var h=o[litem+"Min"];
h<=max[litem];h+=parseInt(o[litem+"Grid"],10)){gridSize[litem]++;var tmph=$.datepicker.formatTime(this.support.ampm?"hht":"HH",{hour:h},o);
html+='<td data-for="'+litem+'">'+tmph+"</td>";}}else{for(var m=o[litem+"Min"];m<=max[litem];m+=parseInt(o[litem+"Grid"],10)){gridSize[litem]++;
html+='<td data-for="'+litem+'">'+((m<10)?"0":"")+m+"</td>";}}html+="</tr></table></div>";}html+="</dd>";}var showTz=o.showTimezone!==null?o.showTimezone:this.support.timezone;
html+='<dt class="ui_tpicker_timezone_label"'+(showTz?"":noDisplay)+">"+o.timezoneText+"</dt>";html+='<dd class="ui_tpicker_timezone" '+(showTz?"":noDisplay)+"></dd>";
html+="</dl></div>";var $tp=$(html);if(o.timeOnly===true){$tp.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">'+o.timeOnlyTitle+"</div></div>");
$dp.find(".ui-datepicker-header, .ui-datepicker-calendar").hide();}for(i=0,l=tp_inst.units.length;i<l;i++){litem=tp_inst.units[i];
uitem=litem.substr(0,1).toUpperCase()+litem.substr(1);show=o["show"+uitem]!==null?o["show"+uitem]:this.support[litem];tp_inst[litem+"_slider"]=tp_inst.control.create(tp_inst,$tp.find(".ui_tpicker_"+litem+"_slider"),litem,tp_inst[litem],o[litem+"Min"],max[litem],o["step"+uitem]);
if(show&&o[litem+"Grid"]>0){size=100*gridSize[litem]*o[litem+"Grid"]/(max[litem]-o[litem+"Min"]);$tp.find(".ui_tpicker_"+litem+" table").css({width:size+"%",marginLeft:o.isRTL?"0":((size/(-2*gridSize[litem]))+"%"),marginRight:o.isRTL?((size/(-2*gridSize[litem]))+"%"):"0",borderCollapse:"collapse"}).find("td").click(function(e){var $t=$(this),h=$t.html(),n=parseInt(h.replace(/[^0-9]/g),10),ap=h.replace(/[^apm]/ig),f=$t.data("for");
if(f==="hour"){if(ap.indexOf("p")!==-1&&n<12){n+=12;}else{if(ap.indexOf("a")!==-1&&n===12){n=0;}}}tp_inst.control.value(tp_inst,tp_inst[f+"_slider"],litem,n);
tp_inst._onTimeChange();tp_inst._onSelectHandler();}).css({cursor:"pointer",width:(100/gridSize[litem])+"%",textAlign:"center",overflow:"hidden"});
}}this.timezone_select=$tp.find(".ui_tpicker_timezone").append("<select></select>").find("select");$.fn.append.apply(this.timezone_select,$.map(o.timezoneList,function(val,idx){return $("<option />").val(typeof val==="object"?val.value:val).text(typeof val==="object"?val.label:val);
}));if(typeof(this.timezone)!=="undefined"&&this.timezone!==null&&this.timezone!==""){var local_timezone=(new Date(this.inst.selectedYear,this.inst.selectedMonth,this.inst.selectedDay,12)).getTimezoneOffset()*-1;
if(local_timezone===this.timezone){selectLocalTimezone(tp_inst);}else{this.timezone_select.val(this.timezone);}}else{if(typeof(this.hour)!=="undefined"&&this.hour!==null&&this.hour!==""){this.timezone_select.val(o.timezone);
}else{selectLocalTimezone(tp_inst);}}this.timezone_select.change(function(){tp_inst._onTimeChange();tp_inst._onSelectHandler();
});var $buttonPanel=$dp.find(".ui-datepicker-buttonpane");if($buttonPanel.length){$buttonPanel.before($tp);}else{$dp.append($tp);
}this.$timeObj=$tp.find(".ui_tpicker_time");if(this.inst!==null){var timeDefined=this.timeDefined;this._onTimeChange();this.timeDefined=timeDefined;
}if(this._defaults.addSliderAccess){var sliderAccessArgs=this._defaults.sliderAccessArgs,rtl=this._defaults.isRTL;sliderAccessArgs.isRTL=rtl;
setTimeout(function(){if($tp.find(".ui-slider-access").length===0){$tp.find(".ui-slider:visible").sliderAccess(sliderAccessArgs);
var sliderAccessWidth=$tp.find(".ui-slider-access:eq(0)").outerWidth(true);if(sliderAccessWidth){$tp.find("table:visible").each(function(){var $g=$(this),oldWidth=$g.outerWidth(),oldMarginLeft=$g.css(rtl?"marginRight":"marginLeft").toString().replace("%",""),newWidth=oldWidth-sliderAccessWidth,newMarginLeft=((oldMarginLeft*newWidth)/oldWidth)+"%",css={width:newWidth,marginRight:0,marginLeft:0};
css[rtl?"marginRight":"marginLeft"]=newMarginLeft;$g.css(css);});}}},10);}tp_inst._limitMinMaxDateTime(this.inst,true);}},_limitMinMaxDateTime:function(dp_inst,adjustSliders){var o=this._defaults,dp_date=new Date(dp_inst.selectedYear,dp_inst.selectedMonth,dp_inst.selectedDay);
if(!this._defaults.showTimepicker){return;}if($.datepicker._get(dp_inst,"minDateTime")!==null&&$.datepicker._get(dp_inst,"minDateTime")!==undefined&&dp_date){var minDateTime=$.datepicker._get(dp_inst,"minDateTime"),minDateTimeDate=new Date(minDateTime.getFullYear(),minDateTime.getMonth(),minDateTime.getDate(),0,0,0,0);
if(this.hourMinOriginal===null||this.minuteMinOriginal===null||this.secondMinOriginal===null||this.millisecMinOriginal===null||this.microsecMinOriginal===null){this.hourMinOriginal=o.hourMin;
this.minuteMinOriginal=o.minuteMin;this.secondMinOriginal=o.secondMin;this.millisecMinOriginal=o.millisecMin;this.microsecMinOriginal=o.microsecMin;
}if(dp_inst.settings.timeOnly||minDateTimeDate.getTime()===dp_date.getTime()){this._defaults.hourMin=minDateTime.getHours();
if(this.hour<=this._defaults.hourMin){this.hour=this._defaults.hourMin;this._defaults.minuteMin=minDateTime.getMinutes();
if(this.minute<=this._defaults.minuteMin){this.minute=this._defaults.minuteMin;this._defaults.secondMin=minDateTime.getSeconds();
if(this.second<=this._defaults.secondMin){this.second=this._defaults.secondMin;this._defaults.millisecMin=minDateTime.getMilliseconds();
if(this.millisec<=this._defaults.millisecMin){this.millisec=this._defaults.millisecMin;this._defaults.microsecMin=minDateTime.getMicroseconds();
}else{if(this.microsec<this._defaults.microsecMin){this.microsec=this._defaults.microsecMin;}this._defaults.microsecMin=this.microsecMinOriginal;
}}else{this._defaults.millisecMin=this.millisecMinOriginal;this._defaults.microsecMin=this.microsecMinOriginal;}}else{this._defaults.secondMin=this.secondMinOriginal;
this._defaults.millisecMin=this.millisecMinOriginal;this._defaults.microsecMin=this.microsecMinOriginal;}}else{this._defaults.minuteMin=this.minuteMinOriginal;
this._defaults.secondMin=this.secondMinOriginal;this._defaults.millisecMin=this.millisecMinOriginal;this._defaults.microsecMin=this.microsecMinOriginal;
}}else{this._defaults.hourMin=this.hourMinOriginal;this._defaults.minuteMin=this.minuteMinOriginal;this._defaults.secondMin=this.secondMinOriginal;
this._defaults.millisecMin=this.millisecMinOriginal;this._defaults.microsecMin=this.microsecMinOriginal;}}if($.datepicker._get(dp_inst,"maxDateTime")!==null&&$.datepicker._get(dp_inst,"maxDateTime")!==undefined&&dp_date){var maxDateTime=$.datepicker._get(dp_inst,"maxDateTime"),maxDateTimeDate=new Date(maxDateTime.getFullYear(),maxDateTime.getMonth(),maxDateTime.getDate(),0,0,0,0);
if(this.hourMaxOriginal===null||this.minuteMaxOriginal===null||this.secondMaxOriginal===null||this.millisecMaxOriginal===null){this.hourMaxOriginal=o.hourMax;
this.minuteMaxOriginal=o.minuteMax;this.secondMaxOriginal=o.secondMax;this.millisecMaxOriginal=o.millisecMax;this.microsecMaxOriginal=o.microsecMax;
}if(dp_inst.settings.timeOnly||maxDateTimeDate.getTime()===dp_date.getTime()){this._defaults.hourMax=maxDateTime.getHours();
if(this.hour>=this._defaults.hourMax){this.hour=this._defaults.hourMax;this._defaults.minuteMax=maxDateTime.getMinutes();
if(this.minute>=this._defaults.minuteMax){this.minute=this._defaults.minuteMax;this._defaults.secondMax=maxDateTime.getSeconds();
if(this.second>=this._defaults.secondMax){this.second=this._defaults.secondMax;this._defaults.millisecMax=maxDateTime.getMilliseconds();
if(this.millisec>=this._defaults.millisecMax){this.millisec=this._defaults.millisecMax;this._defaults.microsecMax=maxDateTime.getMicroseconds();
}else{if(this.microsec>this._defaults.microsecMax){this.microsec=this._defaults.microsecMax;}this._defaults.microsecMax=this.microsecMaxOriginal;
}}else{this._defaults.millisecMax=this.millisecMaxOriginal;this._defaults.microsecMax=this.microsecMaxOriginal;}}else{this._defaults.secondMax=this.secondMaxOriginal;
this._defaults.millisecMax=this.millisecMaxOriginal;this._defaults.microsecMax=this.microsecMaxOriginal;}}else{this._defaults.minuteMax=this.minuteMaxOriginal;
this._defaults.secondMax=this.secondMaxOriginal;this._defaults.millisecMax=this.millisecMaxOriginal;this._defaults.microsecMax=this.microsecMaxOriginal;
}}else{this._defaults.hourMax=this.hourMaxOriginal;this._defaults.minuteMax=this.minuteMaxOriginal;this._defaults.secondMax=this.secondMaxOriginal;
this._defaults.millisecMax=this.millisecMaxOriginal;this._defaults.microsecMax=this.microsecMaxOriginal;}}if(adjustSliders!==undefined&&adjustSliders===true){var hourMax=parseInt((this._defaults.hourMax-((this._defaults.hourMax-this._defaults.hourMin)%this._defaults.stepHour)),10),minMax=parseInt((this._defaults.minuteMax-((this._defaults.minuteMax-this._defaults.minuteMin)%this._defaults.stepMinute)),10),secMax=parseInt((this._defaults.secondMax-((this._defaults.secondMax-this._defaults.secondMin)%this._defaults.stepSecond)),10),millisecMax=parseInt((this._defaults.millisecMax-((this._defaults.millisecMax-this._defaults.millisecMin)%this._defaults.stepMillisec)),10),microsecMax=parseInt((this._defaults.microsecMax-((this._defaults.microsecMax-this._defaults.microsecMin)%this._defaults.stepMicrosec)),10);
if(this.hour_slider){this.control.options(this,this.hour_slider,"hour",{min:this._defaults.hourMin,max:hourMax});this.control.value(this,this.hour_slider,"hour",this.hour-(this.hour%this._defaults.stepHour));
}if(this.minute_slider){this.control.options(this,this.minute_slider,"minute",{min:this._defaults.minuteMin,max:minMax});
this.control.value(this,this.minute_slider,"minute",this.minute-(this.minute%this._defaults.stepMinute));}if(this.second_slider){this.control.options(this,this.second_slider,"second",{min:this._defaults.secondMin,max:secMax});
this.control.value(this,this.second_slider,"second",this.second-(this.second%this._defaults.stepSecond));}if(this.millisec_slider){this.control.options(this,this.millisec_slider,"millisec",{min:this._defaults.millisecMin,max:millisecMax});
this.control.value(this,this.millisec_slider,"millisec",this.millisec-(this.millisec%this._defaults.stepMillisec));}if(this.microsec_slider){this.control.options(this,this.microsec_slider,"microsec",{min:this._defaults.microsecMin,max:microsecMax});
this.control.value(this,this.microsec_slider,"microsec",this.microsec-(this.microsec%this._defaults.stepMicrosec));}}},_onTimeChange:function(){if(!this._defaults.showTimepicker){return;
}var hour=(this.hour_slider)?this.control.value(this,this.hour_slider,"hour"):false,minute=(this.minute_slider)?this.control.value(this,this.minute_slider,"minute"):false,second=(this.second_slider)?this.control.value(this,this.second_slider,"second"):false,millisec=(this.millisec_slider)?this.control.value(this,this.millisec_slider,"millisec"):false,microsec=(this.microsec_slider)?this.control.value(this,this.microsec_slider,"microsec"):false,timezone=(this.timezone_select)?this.timezone_select.val():false,o=this._defaults,pickerTimeFormat=o.pickerTimeFormat||o.timeFormat,pickerTimeSuffix=o.pickerTimeSuffix||o.timeSuffix;
if(typeof(hour)==="object"){hour=false;}if(typeof(minute)==="object"){minute=false;}if(typeof(second)==="object"){second=false;
}if(typeof(millisec)==="object"){millisec=false;}if(typeof(microsec)==="object"){microsec=false;}if(typeof(timezone)==="object"){timezone=false;
}if(hour!==false){hour=parseInt(hour,10);}if(minute!==false){minute=parseInt(minute,10);}if(second!==false){second=parseInt(second,10);
}if(millisec!==false){millisec=parseInt(millisec,10);}if(microsec!==false){microsec=parseInt(microsec,10);}if(timezone!==false){timezone=timezone.toString();
}var ampm=o[hour<12?"amNames":"pmNames"][0];var hasChanged=(hour!==parseInt(this.hour,10)||minute!==parseInt(this.minute,10)||second!==parseInt(this.second,10)||millisec!==parseInt(this.millisec,10)||microsec!==parseInt(this.microsec,10)||(this.ampm.length>0&&(hour<12)!==($.inArray(this.ampm.toUpperCase(),this.amNames)!==-1))||(this.timezone!==null&&timezone!==this.timezone.toString()));
if(hasChanged){if(hour!==false){this.hour=hour;}if(minute!==false){this.minute=minute;}if(second!==false){this.second=second;
}if(millisec!==false){this.millisec=millisec;}if(microsec!==false){this.microsec=microsec;}if(timezone!==false){this.timezone=timezone;
}if(!this.inst){this.inst=$.datepicker._getInst(this.$input[0]);}this._limitMinMaxDateTime(this.inst,true);}if(this.support.ampm){this.ampm=ampm;
}this.formattedTime=$.datepicker.formatTime(o.timeFormat,this,o);if(this.$timeObj){if(pickerTimeFormat===o.timeFormat){this.$timeObj.text(this.formattedTime+pickerTimeSuffix);
}else{this.$timeObj.text($.datepicker.formatTime(pickerTimeFormat,this,o)+pickerTimeSuffix);}}this.timeDefined=true;if(hasChanged){this._updateDateTime();
this.$input.focus();}},_onSelectHandler:function(){var onSelect=this._defaults.onSelect||this.inst.settings.onSelect;var inputEl=this.$input?this.$input[0]:null;
if(onSelect&&inputEl){onSelect.apply(inputEl,[this.formattedDateTime,this]);}},_updateDateTime:function(dp_inst){dp_inst=this.inst||dp_inst;
var dtTmp=(dp_inst.currentYear>0?new Date(dp_inst.currentYear,dp_inst.currentMonth,dp_inst.currentDay):new Date(dp_inst.selectedYear,dp_inst.selectedMonth,dp_inst.selectedDay)),dt=$.datepicker._daylightSavingAdjust(dtTmp),dateFmt=$.datepicker._get(dp_inst,"dateFormat"),formatCfg=$.datepicker._getFormatConfig(dp_inst),timeAvailable=dt!==null&&this.timeDefined;
this.formattedDate=$.datepicker.formatDate(dateFmt,(dt===null?new Date():dt),formatCfg);var formattedDateTime=this.formattedDate;
if(dp_inst.lastVal===""){dp_inst.currentYear=dp_inst.selectedYear;dp_inst.currentMonth=dp_inst.selectedMonth;dp_inst.currentDay=dp_inst.selectedDay;
}if(this._defaults.timeOnly===true){formattedDateTime=this.formattedTime;}else{if(this._defaults.timeOnly!==true&&(this._defaults.alwaysSetTime||timeAvailable)){formattedDateTime+=this._defaults.separator+this.formattedTime+this._defaults.timeSuffix;
}}this.formattedDateTime=formattedDateTime;if(!this._defaults.showTimepicker){this.$input.val(this.formattedDate);}else{if(this.$altInput&&this._defaults.timeOnly===false&&this._defaults.altFieldTimeOnly===true){this.$altInput.val(this.formattedTime);
this.$input.val(this.formattedDate);}else{if(this.$altInput){this.$input.val(formattedDateTime);var altFormattedDateTime="",altSeparator=this._defaults.altSeparator?this._defaults.altSeparator:this._defaults.separator,altTimeSuffix=this._defaults.altTimeSuffix?this._defaults.altTimeSuffix:this._defaults.timeSuffix;
if(!this._defaults.timeOnly){if(this._defaults.altFormat){altFormattedDateTime=$.datepicker.formatDate(this._defaults.altFormat,(dt===null?new Date():dt),formatCfg);
}else{altFormattedDateTime=this.formattedDate;}if(altFormattedDateTime){altFormattedDateTime+=altSeparator;}}if(this._defaults.altTimeFormat){altFormattedDateTime+=$.datepicker.formatTime(this._defaults.altTimeFormat,this,this._defaults)+altTimeSuffix;
}else{altFormattedDateTime+=this.formattedTime+altTimeSuffix;}this.$altInput.val(altFormattedDateTime);}else{this.$input.val(formattedDateTime);
}}}this.$input.trigger("change");},_onFocus:function(){if(!this.$input.val()&&this._defaults.defaultValue){this.$input.val(this._defaults.defaultValue);
var inst=$.datepicker._getInst(this.$input.get(0)),tp_inst=$.datepicker._get(inst,"timepicker");if(tp_inst){if(tp_inst._defaults.timeOnly&&(inst.input.val()!==inst.lastVal)){try{$.datepicker._updateDatepicker(inst);
}catch(err){$.timepicker.log(err);}}}}},_controls:{slider:{create:function(tp_inst,obj,unit,val,min,max,step){var rtl=tp_inst._defaults.isRTL;
return obj.prop("slide",null).slider({orientation:"horizontal",value:rtl?val*-1:val,min:rtl?max*-1:min,max:rtl?min*-1:max,step:step,slide:function(event,ui){tp_inst.control.value(tp_inst,$(this),unit,rtl?ui.value*-1:ui.value);
tp_inst._onTimeChange();},stop:function(event,ui){tp_inst._onSelectHandler();}});},options:function(tp_inst,obj,unit,opts,val){if(tp_inst._defaults.isRTL){if(typeof(opts)==="string"){if(opts==="min"||opts==="max"){if(val!==undefined){return obj.slider(opts,val*-1);
}return Math.abs(obj.slider(opts));}return obj.slider(opts);}var min=opts.min,max=opts.max;opts.min=opts.max=null;if(min!==undefined){opts.max=min*-1;
}if(max!==undefined){opts.min=max*-1;}return obj.slider(opts);}if(typeof(opts)==="string"&&val!==undefined){return obj.slider(opts,val);
}return obj.slider(opts);},value:function(tp_inst,obj,unit,val){if(tp_inst._defaults.isRTL){if(val!==undefined){return obj.slider("value",val*-1);
}return Math.abs(obj.slider("value"));}if(val!==undefined){return obj.slider("value",val);}return obj.slider("value");}},select:{create:function(tp_inst,obj,unit,val,min,max,step){var sel='<select class="ui-timepicker-select" data-unit="'+unit+'" data-min="'+min+'" data-max="'+max+'" data-step="'+step+'">',format=tp_inst._defaults.pickerTimeFormat||tp_inst._defaults.timeFormat;
for(var i=min;i<=max;i+=step){sel+='<option value="'+i+'"'+(i===val?" selected":"")+">";if(unit==="hour"){sel+=$.datepicker.formatTime($.trim(format.replace(/[^ht ]/ig,"")),{hour:i},tp_inst._defaults);
}else{if(unit==="millisec"||unit==="microsec"||i>=10){sel+=i;}else{sel+="0"+i.toString();}}sel+="</option>";}sel+="</select>";
obj.children("select").remove();$(sel).appendTo(obj).change(function(e){tp_inst._onTimeChange();tp_inst._onSelectHandler();
});return obj;},options:function(tp_inst,obj,unit,opts,val){var o={},$t=obj.children("select");if(typeof(opts)==="string"){if(val===undefined){return $t.data(opts);
}o[opts]=val;}else{o=opts;}return tp_inst.control.create(tp_inst,obj,$t.data("unit"),$t.val(),o.min||$t.data("min"),o.max||$t.data("max"),o.step||$t.data("step"));
},value:function(tp_inst,obj,unit,val){var $t=obj.children("select");if(val!==undefined){return $t.val(val);}return $t.val();
}}}});$.fn.extend({timepicker:function(o){o=o||{};var tmp_args=Array.prototype.slice.call(arguments);if(typeof o==="object"){tmp_args[0]=$.extend(o,{timeOnly:true});
}return $(this).each(function(){$.fn.datetimepicker.apply($(this),tmp_args);});},datetimepicker:function(o){o=o||{};var tmp_args=arguments;
if(typeof(o)==="string"){if(o==="getDate"){return $.fn.datepicker.apply($(this[0]),tmp_args);}else{return this.each(function(){var $t=$(this);
$t.datepicker.apply($t,tmp_args);});}}else{return this.each(function(){var $t=$(this);$t.datepicker($.timepicker._newInst($t,o)._defaults);
});}}});$.datepicker.parseDateTime=function(dateFormat,timeFormat,dateTimeString,dateSettings,timeSettings){var parseRes=parseDateTimeInternal(dateFormat,timeFormat,dateTimeString,dateSettings,timeSettings);
if(parseRes.timeObj){var t=parseRes.timeObj;parseRes.date.setHours(t.hour,t.minute,t.second,t.millisec);parseRes.date.setMicroseconds(t.microsec);
}return parseRes.date;};$.datepicker.parseTime=function(timeFormat,timeString,options){var o=extendRemove(extendRemove({},$.timepicker._defaults),options||{}),iso8601=(timeFormat.replace(/\'.*?\'/g,"").indexOf("Z")!==-1);
var strictParse=function(f,s,o){var getPatternAmpm=function(amNames,pmNames){var markers=[];if(amNames){$.merge(markers,amNames);
}if(pmNames){$.merge(markers,pmNames);}markers=$.map(markers,function(val){return val.replace(/[.*+?|()\[\]{}\\]/g,"\\$&");
});return"("+markers.join("|")+")?";};var getFormatPositions=function(timeFormat){var finds=timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|c{1}|t{1,2}|z|'.*?')/g),orders={h:-1,m:-1,s:-1,l:-1,c:-1,t:-1,z:-1};
if(finds){for(var i=0;i<finds.length;i++){if(orders[finds[i].toString().charAt(0)]===-1){orders[finds[i].toString().charAt(0)]=i+1;
}}}return orders;};var regstr="^"+f.toString().replace(/([hH]{1,2}|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g,function(match){var ml=match.length;
switch(match.charAt(0).toLowerCase()){case"h":return ml===1?"(\\d?\\d)":"(\\d{"+ml+"})";case"m":return ml===1?"(\\d?\\d)":"(\\d{"+ml+"})";
case"s":return ml===1?"(\\d?\\d)":"(\\d{"+ml+"})";case"l":return"(\\d?\\d?\\d)";case"c":return"(\\d?\\d?\\d)";case"z":return"(z|[-+]\\d\\d:?\\d\\d|\\S+)?";
case"t":return getPatternAmpm(o.amNames,o.pmNames);default:return"("+match.replace(/\'/g,"").replace(/(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g,function(m){return"\\"+m;
})+")?";}}).replace(/\s/g,"\\s?")+o.timeSuffix+"$",order=getFormatPositions(f),ampm="",treg;treg=s.match(new RegExp(regstr,"i"));
var resTime={hour:0,minute:0,second:0,millisec:0,microsec:0};if(treg){if(order.t!==-1){if(treg[order.t]===undefined||treg[order.t].length===0){ampm="";
resTime.ampm="";}else{ampm=$.inArray(treg[order.t].toUpperCase(),o.amNames)!==-1?"AM":"PM";resTime.ampm=o[ampm==="AM"?"amNames":"pmNames"][0];
}}if(order.h!==-1){if(ampm==="AM"&&treg[order.h]==="12"){resTime.hour=0;}else{if(ampm==="PM"&&treg[order.h]!=="12"){resTime.hour=parseInt(treg[order.h],10)+12;
}else{resTime.hour=Number(treg[order.h]);}}}if(order.m!==-1){resTime.minute=Number(treg[order.m]);}if(order.s!==-1){resTime.second=Number(treg[order.s]);
}if(order.l!==-1){resTime.millisec=Number(treg[order.l]);}if(order.c!==-1){resTime.microsec=Number(treg[order.c]);}if(order.z!==-1&&treg[order.z]!==undefined){resTime.timezone=$.timepicker.timezoneOffsetNumber(treg[order.z]);
}return resTime;}return false;};var looseParse=function(f,s,o){try{var d=new Date("2012-01-01 "+s);if(isNaN(d.getTime())){d=new Date("2012-01-01T"+s);
if(isNaN(d.getTime())){d=new Date("01/01/2012 "+s);if(isNaN(d.getTime())){throw"Unable to parse time with native Date: "+s;
}}}return{hour:d.getHours(),minute:d.getMinutes(),second:d.getSeconds(),millisec:d.getMilliseconds(),microsec:d.getMicroseconds(),timezone:d.getTimezoneOffset()*-1};
}catch(err){try{return strictParse(f,s,o);}catch(err2){$.timepicker.log("Unable to parse \ntimeString: "+s+"\ntimeFormat: "+f);
}}return false;};if(typeof o.parse==="function"){return o.parse(timeFormat,timeString,o);}if(o.parse==="loose"){return looseParse(timeFormat,timeString,o);
}return strictParse(timeFormat,timeString,o);};$.datepicker.formatTime=function(format,time,options){options=options||{};
options=$.extend({},$.timepicker._defaults,options);time=$.extend({hour:0,minute:0,second:0,millisec:0,microsec:0,timezone:null},time);
var tmptime=format,ampmName=options.amNames[0],hour=parseInt(time.hour,10);if(hour>11){ampmName=options.pmNames[0];}tmptime=tmptime.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g,function(match){switch(match){case"HH":return("0"+hour).slice(-2);
case"H":return hour;case"hh":return("0"+convert24to12(hour)).slice(-2);case"h":return convert24to12(hour);case"mm":return("0"+time.minute).slice(-2);
case"m":return time.minute;case"ss":return("0"+time.second).slice(-2);case"s":return time.second;case"l":return("00"+time.millisec).slice(-3);
case"c":return("00"+time.microsec).slice(-3);case"z":return $.timepicker.timezoneOffsetString(time.timezone===null?options.timezone:time.timezone,false);
case"Z":return $.timepicker.timezoneOffsetString(time.timezone===null?options.timezone:time.timezone,true);case"T":return ampmName.charAt(0).toUpperCase();
case"TT":return ampmName.toUpperCase();case"t":return ampmName.charAt(0).toLowerCase();case"tt":return ampmName.toLowerCase();
default:return match.replace(/'/g,"");}});return tmptime;};$.datepicker._base_selectDate=$.datepicker._selectDate;$.datepicker._selectDate=function(id,dateStr){var inst=this._getInst($(id)[0]),tp_inst=this._get(inst,"timepicker");
if(tp_inst){tp_inst._limitMinMaxDateTime(inst,true);inst.inline=inst.stay_open=true;this._base_selectDate(id,dateStr);inst.inline=inst.stay_open=false;
this._notifyChange(inst);this._updateDatepicker(inst);}else{this._base_selectDate(id,dateStr);}};$.datepicker._base_updateDatepicker=$.datepicker._updateDatepicker;
$.datepicker._updateDatepicker=function(inst){var input=inst.input[0];if($.datepicker._curInst&&$.datepicker._curInst!==inst&&$.datepicker._datepickerShowing&&$.datepicker._lastInput!==input){return;
}if(typeof(inst.stay_open)!=="boolean"||inst.stay_open===false){this._base_updateDatepicker(inst);var tp_inst=this._get(inst,"timepicker");
if(tp_inst){tp_inst._addTimePicker(inst);}}};$.datepicker._base_doKeyPress=$.datepicker._doKeyPress;$.datepicker._doKeyPress=function(event){var inst=$.datepicker._getInst(event.target),tp_inst=$.datepicker._get(inst,"timepicker");
if(tp_inst){if($.datepicker._get(inst,"constrainInput")){var ampm=tp_inst.support.ampm,tz=tp_inst._defaults.showTimezone!==null?tp_inst._defaults.showTimezone:tp_inst.support.timezone,dateChars=$.datepicker._possibleChars($.datepicker._get(inst,"dateFormat")),datetimeChars=tp_inst._defaults.timeFormat.toString().replace(/[hms]/g,"").replace(/TT/g,ampm?"APM":"").replace(/Tt/g,ampm?"AaPpMm":"").replace(/tT/g,ampm?"AaPpMm":"").replace(/T/g,ampm?"AP":"").replace(/tt/g,ampm?"apm":"").replace(/t/g,ampm?"ap":"")+" "+tp_inst._defaults.separator+tp_inst._defaults.timeSuffix+(tz?tp_inst._defaults.timezoneList.join(""):"")+(tp_inst._defaults.amNames.join(""))+(tp_inst._defaults.pmNames.join(""))+dateChars,chr=String.fromCharCode(event.charCode===undefined?event.keyCode:event.charCode);
return event.ctrlKey||(chr<" "||!dateChars||datetimeChars.indexOf(chr)>-1);}}return $.datepicker._base_doKeyPress(event);
};$.datepicker._base_updateAlternate=$.datepicker._updateAlternate;$.datepicker._updateAlternate=function(inst){var tp_inst=this._get(inst,"timepicker");
if(tp_inst){var altField=tp_inst._defaults.altField;if(altField){var altFormat=tp_inst._defaults.altFormat||tp_inst._defaults.dateFormat,date=this._getDate(inst),formatCfg=$.datepicker._getFormatConfig(inst),altFormattedDateTime="",altSeparator=tp_inst._defaults.altSeparator?tp_inst._defaults.altSeparator:tp_inst._defaults.separator,altTimeSuffix=tp_inst._defaults.altTimeSuffix?tp_inst._defaults.altTimeSuffix:tp_inst._defaults.timeSuffix,altTimeFormat=tp_inst._defaults.altTimeFormat!==null?tp_inst._defaults.altTimeFormat:tp_inst._defaults.timeFormat;
altFormattedDateTime+=$.datepicker.formatTime(altTimeFormat,tp_inst,tp_inst._defaults)+altTimeSuffix;if(!tp_inst._defaults.timeOnly&&!tp_inst._defaults.altFieldTimeOnly&&date!==null){if(tp_inst._defaults.altFormat){altFormattedDateTime=$.datepicker.formatDate(tp_inst._defaults.altFormat,date,formatCfg)+altSeparator+altFormattedDateTime;
}else{altFormattedDateTime=tp_inst.formattedDate+altSeparator+altFormattedDateTime;}}$(altField).val(altFormattedDateTime);
}}else{$.datepicker._base_updateAlternate(inst);}};$.datepicker._base_doKeyUp=$.datepicker._doKeyUp;$.datepicker._doKeyUp=function(event){var inst=$.datepicker._getInst(event.target),tp_inst=$.datepicker._get(inst,"timepicker");
if(tp_inst){if(tp_inst._defaults.timeOnly&&(inst.input.val()!==inst.lastVal)){try{$.datepicker._updateDatepicker(inst);}catch(err){$.timepicker.log(err);
}}}return $.datepicker._base_doKeyUp(event);};$.datepicker._base_gotoToday=$.datepicker._gotoToday;$.datepicker._gotoToday=function(id){var inst=this._getInst($(id)[0]),$dp=inst.dpDiv;
this._base_gotoToday(id);var tp_inst=this._get(inst,"timepicker");selectLocalTimezone(tp_inst);var now=new Date();this._setTime(inst,now);
$(".ui-datepicker-today",$dp).click();};$.datepicker._disableTimepickerDatepicker=function(target){var inst=this._getInst(target);
if(!inst){return;}var tp_inst=this._get(inst,"timepicker");$(target).datepicker("getDate");if(tp_inst){inst.settings.showTimepicker=false;
tp_inst._defaults.showTimepicker=false;tp_inst._updateDateTime(inst);}};$.datepicker._enableTimepickerDatepicker=function(target){var inst=this._getInst(target);
if(!inst){return;}var tp_inst=this._get(inst,"timepicker");$(target).datepicker("getDate");if(tp_inst){inst.settings.showTimepicker=true;
tp_inst._defaults.showTimepicker=true;tp_inst._addTimePicker(inst);tp_inst._updateDateTime(inst);}};$.datepicker._setTime=function(inst,date){var tp_inst=this._get(inst,"timepicker");
if(tp_inst){var defaults=tp_inst._defaults;tp_inst.hour=date?date.getHours():defaults.hour;tp_inst.minute=date?date.getMinutes():defaults.minute;
tp_inst.second=date?date.getSeconds():defaults.second;tp_inst.millisec=date?date.getMilliseconds():defaults.millisec;tp_inst.microsec=date?date.getMicroseconds():defaults.microsec;
tp_inst._limitMinMaxDateTime(inst,true);tp_inst._onTimeChange();tp_inst._updateDateTime(inst);}};$.datepicker._setTimeDatepicker=function(target,date,withDate){var inst=this._getInst(target);
if(!inst){return;}var tp_inst=this._get(inst,"timepicker");if(tp_inst){this._setDateFromField(inst);var tp_date;if(date){if(typeof date==="string"){tp_inst._parseTime(date,withDate);
tp_date=new Date();tp_date.setHours(tp_inst.hour,tp_inst.minute,tp_inst.second,tp_inst.millisec);tp_date.setMicroseconds(tp_inst.microsec);
}else{tp_date=new Date(date.getTime());tp_date.setMicroseconds(date.getMicroseconds());}if(tp_date.toString()==="Invalid Date"){tp_date=undefined;
}this._setTime(inst,tp_date);}}};$.datepicker._base_setDateDatepicker=$.datepicker._setDateDatepicker;$.datepicker._setDateDatepicker=function(target,date){var inst=this._getInst(target);
if(!inst){return;}if(typeof(date)==="string"){date=new Date(date);if(!date.getTime()){$.timepicker.log("Error creating Date object from string.");
}}var tp_inst=this._get(inst,"timepicker");var tp_date;if(date instanceof Date){tp_date=new Date(date.getTime());tp_date.setMicroseconds(date.getMicroseconds());
}else{tp_date=date;}if(tp_inst&&tp_date){if(!tp_inst.support.timezone&&tp_inst._defaults.timezone===null){tp_inst.timezone=tp_date.getTimezoneOffset()*-1;
}date=$.timepicker.timezoneAdjust(date,tp_inst.timezone);tp_date=$.timepicker.timezoneAdjust(tp_date,tp_inst.timezone);}this._updateDatepicker(inst);
this._base_setDateDatepicker.apply(this,arguments);this._setTimeDatepicker(target,tp_date,true);};$.datepicker._base_getDateDatepicker=$.datepicker._getDateDatepicker;
$.datepicker._getDateDatepicker=function(target,noDefault){var inst=this._getInst(target);if(!inst){return;}var tp_inst=this._get(inst,"timepicker");
if(tp_inst){if(inst.lastVal===undefined){this._setDateFromField(inst,noDefault);}var date=this._getDate(inst);if(date&&tp_inst._parseTime($(target).val(),tp_inst.timeOnly)){date.setHours(tp_inst.hour,tp_inst.minute,tp_inst.second,tp_inst.millisec);
date.setMicroseconds(tp_inst.microsec);if(tp_inst.timezone!=null){if(!tp_inst.support.timezone&&tp_inst._defaults.timezone===null){tp_inst.timezone=date.getTimezoneOffset()*-1;
}date=$.timepicker.timezoneAdjust(date,tp_inst.timezone);}}return date;}return this._base_getDateDatepicker(target,noDefault);
};$.datepicker._base_parseDate=$.datepicker.parseDate;$.datepicker.parseDate=function(format,value,settings){var date;try{date=this._base_parseDate(format,value,settings);
}catch(err){if(err.indexOf(":")>=0){date=this._base_parseDate(format,value.substring(0,value.length-(err.length-err.indexOf(":")-2)),settings);
$.timepicker.log("Error parsing the date string: "+err+"\ndate string = "+value+"\ndate format = "+format);}else{throw err;
}}return date;};$.datepicker._base_formatDate=$.datepicker._formatDate;$.datepicker._formatDate=function(inst,day,month,year){var tp_inst=this._get(inst,"timepicker");
if(tp_inst){tp_inst._updateDateTime(inst);return tp_inst.$input.val();}return this._base_formatDate(inst);};$.datepicker._base_optionDatepicker=$.datepicker._optionDatepicker;
$.datepicker._optionDatepicker=function(target,name,value){var inst=this._getInst(target),name_clone;if(!inst){return null;
}var tp_inst=this._get(inst,"timepicker");if(tp_inst){var min=null,max=null,onselect=null,overrides=tp_inst._defaults.evnts,fns={},prop;
if(typeof name==="string"){if(name==="minDate"||name==="minDateTime"){min=value;}else{if(name==="maxDate"||name==="maxDateTime"){max=value;
}else{if(name==="onSelect"){onselect=value;}else{if(overrides.hasOwnProperty(name)){if(typeof(value)==="undefined"){return overrides[name];
}fns[name]=value;name_clone={};}}}}}else{if(typeof name==="object"){if(name.minDate){min=name.minDate;}else{if(name.minDateTime){min=name.minDateTime;
}else{if(name.maxDate){max=name.maxDate;}else{if(name.maxDateTime){max=name.maxDateTime;}}}}for(prop in overrides){if(overrides.hasOwnProperty(prop)&&name[prop]){fns[prop]=name[prop];
}}}}for(prop in fns){if(fns.hasOwnProperty(prop)){overrides[prop]=fns[prop];if(!name_clone){name_clone=$.extend({},name);
}delete name_clone[prop];}}if(name_clone&&isEmptyObject(name_clone)){return;}if(min){if(min===0){min=new Date();}else{min=new Date(min);
}tp_inst._defaults.minDate=min;tp_inst._defaults.minDateTime=min;}else{if(max){if(max===0){max=new Date();}else{max=new Date(max);
}tp_inst._defaults.maxDate=max;tp_inst._defaults.maxDateTime=max;}else{if(onselect){tp_inst._defaults.onSelect=onselect;}}}}if(value===undefined){return this._base_optionDatepicker.call($.datepicker,target,name);
}return this._base_optionDatepicker.call($.datepicker,target,name_clone||name,value);};var isEmptyObject=function(obj){var prop;
for(prop in obj){if(obj.hasOwnProperty(prop)){return false;}}return true;};var extendRemove=function(target,props){$.extend(target,props);
for(var name in props){if(props[name]===null||props[name]===undefined){target[name]=props[name];}}return target;};var detectSupport=function(timeFormat){var tf=timeFormat.replace(/'.*?'/g,"").toLowerCase(),isIn=function(f,t){return f.indexOf(t)!==-1?true:false;
};return{hour:isIn(tf,"h"),minute:isIn(tf,"m"),second:isIn(tf,"s"),millisec:isIn(tf,"l"),microsec:isIn(tf,"c"),timezone:isIn(tf,"z"),ampm:isIn(tf,"t")&&isIn(timeFormat,"h"),iso8601:isIn(timeFormat,"Z")};
};var convert24to12=function(hour){hour%=12;if(hour===0){hour=12;}return String(hour);};var computeEffectiveSetting=function(settings,property){return settings&&settings[property]?settings[property]:$.timepicker._defaults[property];
};var splitDateTime=function(dateTimeString,timeSettings){var separator=computeEffectiveSetting(timeSettings,"separator"),format=computeEffectiveSetting(timeSettings,"timeFormat"),timeParts=format.split(separator),timePartsLen=timeParts.length,allParts=dateTimeString.split(separator),allPartsLen=allParts.length;
if(allPartsLen>1){return{dateString:allParts.splice(0,allPartsLen-timePartsLen).join(separator),timeString:allParts.splice(0,timePartsLen).join(separator)};
}return{dateString:dateTimeString,timeString:""};};var parseDateTimeInternal=function(dateFormat,timeFormat,dateTimeString,dateSettings,timeSettings){var date,parts,parsedTime;
parts=splitDateTime(dateTimeString,timeSettings);date=$.datepicker._base_parseDate(dateFormat,parts.dateString,dateSettings);
if(parts.timeString===""){return{date:date};}parsedTime=$.datepicker.parseTime(timeFormat,parts.timeString,timeSettings);
if(!parsedTime){throw"Wrong time format";}return{date:date,timeObj:parsedTime};};var selectLocalTimezone=function(tp_inst,date){if(tp_inst&&tp_inst.timezone_select){var now=date||new Date();
tp_inst.timezone_select.val(-now.getTimezoneOffset());}};$.timepicker=new Timepicker();$.timepicker.timezoneOffsetString=function(tzMinutes,iso8601){if(isNaN(tzMinutes)||tzMinutes>840||tzMinutes<-720){return tzMinutes;
}var off=tzMinutes,minutes=off%60,hours=(off-minutes)/60,iso=iso8601?":":"",tz=(off>=0?"+":"-")+("0"+Math.abs(hours)).slice(-2)+iso+("0"+Math.abs(minutes)).slice(-2);
if(tz==="+00:00"){return"Z";}return tz;};$.timepicker.timezoneOffsetNumber=function(tzString){var normalized=tzString.toString().replace(":","");
if(normalized.toUpperCase()==="Z"){return 0;}if(!/^(\-|\+)\d{4}$/.test(normalized)){return tzString;}return((normalized.substr(0,1)==="-"?-1:1)*((parseInt(normalized.substr(1,2),10)*60)+parseInt(normalized.substr(3,2),10)));
};$.timepicker.timezoneAdjust=function(date,toTimezone){var toTz=$.timepicker.timezoneOffsetNumber(toTimezone);if(!isNaN(toTz)){date.setMinutes(date.getMinutes()+-date.getTimezoneOffset()-toTz);
}return date;};$.timepicker.timeRange=function(startTime,endTime,options){return $.timepicker.handleRange("timepicker",startTime,endTime,options);
};$.timepicker.datetimeRange=function(startTime,endTime,options){$.timepicker.handleRange("datetimepicker",startTime,endTime,options);
};$.timepicker.dateRange=function(startTime,endTime,options){$.timepicker.handleRange("datepicker",startTime,endTime,options);
};$.timepicker.handleRange=function(method,startTime,endTime,options){options=$.extend({},{minInterval:0,maxInterval:0,start:{},end:{}},options);
function checkDates(changed,other){var startdt=startTime[method]("getDate"),enddt=endTime[method]("getDate"),changeddt=changed[method]("getDate");
if(startdt!==null){var minDate=new Date(startdt.getTime()),maxDate=new Date(startdt.getTime());minDate.setMilliseconds(minDate.getMilliseconds()+options.minInterval);
maxDate.setMilliseconds(maxDate.getMilliseconds()+options.maxInterval);if(options.minInterval>0&&minDate>enddt){endTime[method]("setDate",minDate);
}else{if(options.maxInterval>0&&maxDate<enddt){endTime[method]("setDate",maxDate);}else{if(startdt>enddt){other[method]("setDate",changeddt);
}}}}}function selected(changed,other,option){if(!changed.val()){return;}var date=changed[method].call(changed,"getDate");
if(date!==null&&options.minInterval>0){if(option==="minDate"){date.setMilliseconds(date.getMilliseconds()+options.minInterval);
}if(option==="maxDate"){date.setMilliseconds(date.getMilliseconds()-options.minInterval);}}if(date.getTime){other[method].call(other,"option",option,date);
}}$.fn[method].call(startTime,$.extend({onClose:function(dateText,inst){checkDates($(this),endTime);},onSelect:function(selectedDateTime){selected($(this),endTime,"minDate");
}},options,options.start));$.fn[method].call(endTime,$.extend({onClose:function(dateText,inst){checkDates($(this),startTime);
},onSelect:function(selectedDateTime){selected($(this),startTime,"maxDate");}},options,options.end));checkDates(startTime,endTime);
selected(startTime,endTime,"minDate");selected(endTime,startTime,"maxDate");return $([startTime.get(0),endTime.get(0)]);};
$.timepicker.log=function(err){if(window.console){window.console.log(err);}};$.timepicker._util={_extendRemove:extendRemove,_isEmptyObject:isEmptyObject,_convert24to12:convert24to12,_detectSupport:detectSupport,_selectLocalTimezone:selectLocalTimezone,_computeEffectiveSetting:computeEffectiveSetting,_splitDateTime:splitDateTime,_parseDateTimeInternal:parseDateTimeInternal};
if(!Date.prototype.getMicroseconds){Date.prototype.microseconds=0;Date.prototype.getMicroseconds=function(){return this.microseconds;
};Date.prototype.setMicroseconds=function(m){this.setMilliseconds(this.getMilliseconds()+Math.floor(m/1000));this.microseconds=m%1000;
return this;};}$.timepicker.version="1.4.3";})(jQuery);
/*!
 * Copyright (c) 2009-2012 CPD-UFSM. All rights reserved.
 * *********************************************************************
 *
 * @author Marcius da Silva da Fonseca (mfonseca@ufsm.br)
 * Created on: 13/12/2013 16:45
 *
 * Widget para exibir um Dialog de detalhes de um documento.
 * Implementado utilizando o Widget-Factory Framework do jquery-ui.
 *
 * O que e necessario?
 *  - Um AjaxService (DWR) que ofereca o metodo
 *      public Documento getDetalhesDocumento(Long idDocumento);
 *  - Mocca Framework (CSSs e Javascripts)
 *
 * E possivel usar sem ter o mocca integrado, no entanto, algumas
 * implementacoes/modificacoes serao necessarias.
 *
 * Basicamente, este plugin depende de:
 *  - jQuery 2.0.0+
 *  - jQuery-ui 1.10.0+ (completo)
 *  - plugin jquery-migrate 1.2.0+
 *  - plugin qtip2 2.2.0+
 *  - JsSimpleDateFormat 1.0+
 *  - jquery-extension-mocca 1.0+
 *
 *  Alem disso, e usado a grid-system do mocca e alguns poucos estilos
 *  de CSS. Neste caso, esta parte devera ser reescrita.
 *  Resumindo... melhor usar em conjuncao com o Mocca que ja possui
 *  tudo isso integrado! :)
 *
 *  COMO USAR:
 *
 *  <script>
 *      $(document).ready(function(){
 *          $('#btnAbreDialog').documentDialog({
 *              ajaxService:        meuAjaxService,         // [obrigatorio] classe chamada pelo dwr. Deve implementar 'getDetalhesDocumento(idDoc)'
 *              idDocument:         ${documento.id},        // [obrigatorio] o id do documento a ser exibido
 *              openDocumentLink:   ${url_open_doc},        // [opcional] a url para abrir o documento
 *              openAttachLink:     ${url_open_attach},     // [opcional] a url para abrir os anexos
 *              title:              'Titulo do dialog'      // [opcional] sobrescreve o titulo default
 *          });
 *      });
 *  </script>
 */
!function($){$.widget("ufsm.documentDialog",{name:"documentDialog",version:"1.0.0-SNAPSHOT",options:{ajaxService:null,idDocument:null,openDocumentLink:null,openAttachLink:null,title:"Detalhes do Documento",qtip:{},event:"click",locale:"br",debugMode:false},_create:function(){var widget=this;
$.ConsoleUtils.time(widget.name+"._create",widget.options.debugMode);widget._createContent();$(widget.element).qtip(widget._getQtipOptions());
$.ConsoleUtils.timeEnd(widget.name+"._create",widget.options.debugMode);},_createContent:function(){var widget=this;widget.$dialogContent=$("<div>",{"class":"small-font-size"});
widget.$tabbable=$("<div>",{"class":"tabbable"});var pane1Id="tab_"+widget.uuid+"_"+widget.options.idDocument+"_D";var pane2Id="tab_"+widget.uuid+"_"+widget.options.idDocument+"_T";
widget.$nav=$("<ul>",{"class":"nav tabs"}).append($("<li>",{"class":"active"}).append($("<a>",{href:"#"+pane1Id}).append(widget._resolveKey("details")))).append($("<li>").append($("<a>",{href:"#"+pane2Id}).append(widget._resolveKey("formalities"))));
widget.$pane1=$("<div>",{"class":"pane active",id:pane1Id});widget.$pane2=$("<div>",{"class":"pane",id:pane2Id});widget.$actions=$("<div>",{"class":"box no-margin-top stroked-top"});
widget.$tabbable.append(widget.$nav).append($("<div>",{"class":"content mini-padding-h"}).append(widget.$pane1).append(widget.$pane2));
widget.$dialogContent.append(widget.$tabbable).append(widget.$actions);widget.$nav.find("a").click(function(e){e.preventDefault();
$(this).tab("show");widget.repositionDialog();});},refresh:function(api){var widget=this;$.ConsoleUtils.time(widget.name+".refresh",widget.options.debugMode);
var ajaxService=widget.getOpt("ajaxService");var idDocument=widget.getOpt("idDocument");ajaxService.getDetalhesDocumento(idDocument,{callback:function(doc){widget._refreshPane1(doc);
widget._refreshPane2(doc);widget._refreshActions(doc);if($.ObjectUtils.isValued(api)){api.reposition();}},async:true});$.ConsoleUtils.timeEnd(widget.name+".refresh",widget.options.debugMode);
},showDialog:function(){var widget=this;widget.$dialogContent.closest(".qtip").qtip("toggle",true);},hideDialog:function(){var widget=this;
widget.$dialogContent.closest(".qtip").qtip("toggle",false);},repositionDialog:function(){var widget=this;widget.$dialogContent.closest(".qtip").qtip("reposition");
},getOpt:function(path){var widget=this;return $.ObjectUtils.getPathValue(path,widget.options);},_refreshPane1:function(doc){var widget=this;
$.ConsoleUtils.time(widget.name+"._createPane1",widget.options.debugMode);widget.$pane1.empty();if($.ObjectUtils.isUnvalued(doc)){return;
}widget.$pane1.append($("<div>",{"class":"row"}).append($("<div>",{"class":"span4"}).append($("<span>",{"class":"label"}).append(widget._resolveKey("number")).append(":")).append($("<span>",{"class":"block"}).append(doc.numeroProcesso))).append($("<div>",{"class":"span3"}).append($("<span>",{"class":"label"}).append(widget._resolveKey("dtCreation")).append(":")).append($("<span>",{"class":"block"}).append($.DateUtils.formatDate(doc.criacao)))).append($("<div>",{"class":"span5"}).append($("<span>",{"class":"label"}).append(widget._resolveKey("type")).append(":")).append($("<span>",{"class":"block"}).append(doc.tipoDocumento.descricao)))).append($("<div>",{"class":"row"}).append($("<div>",{"class":"span4"}).append($("<span>",{"class":"label"}).append(widget._resolveKey("source")).append(":")).append($("<span>",{"class":"block"}).append(doc.refProcedencia.entidadeLabel))).append($("<div>",{"class":"span3"}).append($("<span>",{"class":"label"}).append(doc.refProcedencia.identificadorLabel).append(":")).append($("<span>",{"class":"block"}).append(doc.refProcedencia.identificador))).append($("<div>",{"class":"span5"}).append($("<span>",{"class":"label"}).append(doc.refProcedencia.descricaoLabel).append(":")).append($("<span>",{"class":"block"}).append(doc.refProcedencia.descricao)))).append($("<div>",{"class":"row"}).append($("<div>",{"class":"span4"}).append($("<span>",{"class":"label"}).append(widget._resolveKey("dest")).append(":")).append($("<span>",{"class":"block"}).append(doc.refInteressado.entidadeLabel))).append($("<div>",{"class":"span3"}).append($("<span>",{"class":"label"}).append(doc.refInteressado.identificadorLabel).append(":")).append($("<span>",{"class":"block"}).append(doc.refInteressado.identificador))).append($("<div>",{"class":"span5"}).append($("<span>",{"class":"label"}).append(doc.refInteressado.descricaoLabel).append(":")).append($("<span>",{"class":"block"}).append(doc.refInteressado.descricao)))).append($("<div>",{"class":"row"}).append($("<div>",{"class":"span4"}).append($("<span>",{"class":"label"}).append(widget._resolveKey("subjectCode")).append(":")).append($("<span>",{"class":"block"}).append(doc.assunto.codigoEstruturado))).append($("<div>",{"class":"span8"}).append($("<span>",{"class":"label"}).append(widget._resolveKey("subjectDescr")).append(":")).append($("<span>",{"class":"block"}).append(doc.assunto.descricao)))).append($("<div>",{"class":"row"}).append($("<div>",{"class":"span12"}).append($("<span>",{"class":"label"}).append(widget._resolveKey("subjectSummary")).append(":")).append($("<span>",{"class":"block"}).append(doc.resumoAssunto))));
$.ConsoleUtils.timeEnd(widget.name+"._createPane1",widget.options.debugMode);},_refreshPane2:function(doc){var widget=this;
$.ConsoleUtils.time(widget.name+"._createPane2",widget.options.debugMode);widget.$pane2.empty();if($.ObjectUtils.isUnvalued(doc)){return;
}var userElemId="user_"+widget.uuid+"_"+doc.id;var recebElemId="receb_"+widget.uuid+"_"+doc.id;var despachoElemId="despacho_"+widget.uuid+"_"+doc.id;
var anexosElemId="anexos_"+widget.uuid+"_"+doc.id;var tramitacoes=doc.tramitacoes;var $tramitTableBody=$("<tbody>");for(var i=0;
i<tramitacoes.length;i++){var tramit=tramitacoes[i];var situacao=tramit.situacaoTramitacao.value;var $icos=$("<div>");if(situacao==="T"){continue;
}else{if(situacao==="E"){$icos.append($("<i>",{"class":"icon-envelope",title:widget._resolveKey("sent")}));}else{$icos.append($("<i>",{"class":"icon-envelope-alt",title:widget._resolveKey("received")}));
}}if($.ArrayUtils.isNotEmpty(tramit.anexos)){$icos.append(" ").append($("<i>",{"class":"icon-paper-clip",title:widget._resolveKey("hasAttachments")}));
}var $tr=$("<tr>",{style:"cursor: pointer;"});$tr.append($("<td>",{"class":"mini-padding-h"}).append($icos)).append($("<td>",{"class":"mini-padding-h"}).append($("<span>",{"class":"dimmed block"}).append(tramit.fluxo.descricao)).append($("<span>",{"class":"block"}).append(tramit.refDestino.descricao))).append($("<td>",{"class":"mini-padding-h"}).append($.DateUtils.formatDate(tramit.envio)));
$tr.data("usuario",$.ObjectUtils.getNullSafePathValue("usuarioInfo.nome",tramit));$tr.data("recebimento",$.DateUtils.formatDate(tramit.recebimento));
$tr.data("prazo",$.ObjectUtils.getNullSafePathValue("prazo",tramit));$tr.data("despacho",$.ObjectUtils.getNullSafePathValue("despacho",tramit));
$tr.data("anexos",$.ObjectUtils.getPathValue("anexos",tramit));$tr.click(function(){var $active=$(this).parent().find(".active");
$active.removeClass("active");$(this).addClass("active");$("#"+userElemId).empty().append($(this).data("usuario"));$("#"+recebElemId).empty().append($(this).data("recebimento"));
$("#"+despachoElemId).empty().append($(this).data("despacho"));var $anexosWrapper=$("#"+anexosElemId).empty();var anexosData=$(this).data("anexos");
if($.ArrayUtils.isNotEmpty(anexosData)){for(var j=0;j<anexosData.length;j++){var anexo=anexosData[j];var anexoLink=widget._getLink(widget.getOpt("openAttachLink"),anexo);
var $anexoElem=$("<button>",{"class":"btn mini",type:"button"});$anexoElem.append($("<i>",{"class":"icon-download-alt"})).append(" ").append(anexo.nomeArquivo);
$anexoElem.openUrl({url:anexoLink});if($.ObjectUtils.isUnvalued(anexoLink)){$anexoElem.disable();}$anexosWrapper.append($anexoElem).append(" ");
}}else{$anexosWrapper.append($("<span>",{"class":"dimmed italic"}).append(widget._resolveKey("noAttachments")));}});$tramitTableBody.append($tr);
}widget.$pane2.append($("<table>",{"class":"table bordered rounded shadowed striped stroked narrow hovered no-wrap"}).append($("<thead>",{"class":"header"}).append($("<tr>").append($("<th>",{"class":"mini-padding-h",style:"width: 3em;"}).append("")).append($("<th>",{"class":"mini-padding-h"}).append(widget._resolveKey("step_destiny"))).append($("<th>",{"class":"mini-padding-h",style:"width: 7em;"}).append(widget._resolveKey("dtSent"))))).append($tramitTableBody)).append($("<h5>",{"class":"info stroked-bottom width-100"}).append(widget._resolveKey("details"))).append($("<div>",{"class":"box no-margin-v"}).append($("<div>",{"class":"row"}).append($("<div>",{"class":"span12"}).append($("<span>",{"class":"label"}).append(widget._resolveKey("username")).append(":")).append(" ").append($("<span>",{"class":"dimmed",id:userElemId}).append(widget._resolveKey("noSelection"))))).append($("<div>",{"class":"row"}).append($("<div>",{"class":"span12"}).append($("<span>",{"class":"label"}).append(widget._resolveKey("dtReceived")).append(":")).append(" ").append($("<span>",{"class":"dimmed",id:recebElemId}).append(widget._resolveKey("noSelection"))))).append($("<div>",{"class":"row"}).append($("<div>",{"class":"span12"}).append($("<span>",{"class":"label"}).append(widget._resolveKey("dispatch")).append(":")).append($("<textarea>",{"class":"textfield width-100",style:"height: 5em;",id:despachoElemId,readonly:"readonly"})))).append($("<div>",{"class":"row no-margin-bottom"}).append($("<div>",{"class":"span12"}).append($("<span>",{"class":"label"}).append(widget._resolveKey("attachments")).append(":")).append($("<div>",{id:anexosElemId})))));
$.ConsoleUtils.timeEnd(widget.name+"._createPane2",widget.options.debugMode);},_refreshActions:function(doc){var widget=this;
$.ConsoleUtils.time(widget.name+"._createActionDiv",widget.options.debugMode);widget.$actions.empty();if($.ObjectUtils.isUnvalued(doc)){return;
}var openLink=widget._getLink(widget.getOpt("openDocumentLink"),doc);var $closeBtn=$("<button>",{type:"button","class":"btn small"}).append($("<i>",{"class":"icon-ban-circle"})).append(" ").append(widget._resolveKey("cancel"));
$closeBtn.click(function(){widget.hideDialog();});if($.ObjectUtils.isValued(openLink)){var $openBtn=$("<button>",{type:"button","class":"btn small primary pull-right"}).append($("<i>",{"class":"icon-folder-open"})).append(" ").append(widget._resolveKey("open"));
$openBtn.click(function(){location.href=openLink;});widget.$actions.append($("<div>",{"class":"row no-margin-v"}).append($("<div>",{"class":"span12"}).append($closeBtn).append($openBtn)));
}else{widget.$actions.append($("<div>",{"class":"row"}).append($("<div>",{"class":"span12"}).append($closeBtn)));}$.ConsoleUtils.timeEnd(widget.name+"._createActionDiv",widget.options.debugMode);
},_getQtipOptions:function(){var widget=this;return jQuery.extend({},{id:"doc_dialog_"+widget.uuid+"_"+widget.options.idDocument,hide:{event:false,effect:function(){$(this).slideUp(500);
}},content:{text:widget.$dialogContent,title:{text:widget.options.title,button:true}},position:{my:"center",at:"center",target:$(window),adjust:{scroll:false}},show:{event:widget.getOpt("event"),solo:true,modal:{on:true,blur:false},effect:function(){$(this).fadeTo(600,1);
}},style:{classes:"qtip-light qtip-rounded qtip-dialog-large"},events:{show:function(event,api){widget.refresh(api);}}},widget.options.qtip);
},_resolveKey:function(key){var widget=this;return $.LocaleUtils.resolveKey(key,widget.options.locale,widget.regional);},_resolveString:function(key){var widget=this;
return $.LocaleUtils.resolve(key,widget.options.locale,widget.regional);},_getLink:function(url,entity,appendId){var widget=this;
$.ConsoleUtils.time(widget.name+"._getLink",widget.options.debugMode);var link=null;var appId=$.BooleanUtils.isBoolean(appendId)?appendId:true;
if($.ObjectUtils.isValued(url)){link=url;if($.StringUtils.endsWith(link,"=")&&appId){link=link+entity.id;}link=$.StringUtils.replaceParams(link,entity);
}$.ConsoleUtils.timeEnd(widget.name+"._getLink",widget.options.debugMode);return link;},regional:{br:{dtCreation:"Criado em",dtSent:"Enviado em",dtReceived:"Recebido em",formalities:"Tramita&ccedil;&otilde;es",number:"N&uacute;mero",type:"Tipo",source:"Proced&ecirc;ncia",dest:"Interessado",subjectCode:"C&oacute;d. Assunto",subjectDescr:"Descri&ccedil;&atilde;o do Assunto",subjectSummary:"Resumo do Assunto",sent:"Enviado",received:"Recebido",hasAttachments:"Possui anexos",noAttachments:"Nao possui anexos",step_destiny:"Passo/Destino",details:"Detalhes",username:"Usu&aacute;rio",noSelection:"Selecione uma entrada acima...",dispatch:"Despacho",attachments:"Anexos",cancel:"Cancelar",open:"Abrir"},us:{dtCreation:"Created on",dtSent:"Sent on",dtReceived:"Received on",formalities:"Formalities",number:"Number",type:"Type",source:"Sender",dest:"Addressee",subjectCode:"Subject code",subjectDescr:"Subject description",subjectSummary:"Subject summary",sent:"Sent",received:"Received",hasAttachments:"Have attachments",noAttachments:"Don't attachments",step_destiny:"Step/Destiny",details:"Details",username:"User name",noSelection:"Select an item above...",dispatch:"Dispatch",attachments:"Attachments",cancel:"Cancel",open:"Open"}}});
}(window.jQuery);
