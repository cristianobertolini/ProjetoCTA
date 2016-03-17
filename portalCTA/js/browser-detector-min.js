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
 * 
 * Browser Detector - V1.0
 * @author  Marcius da Silva da Fonseca [mfonseca@ufsm.br]
 * @version 1.0.0-SNAPSHOT
 * @date    07/Jul/2014
 * 
 * This is a simple script to detect the current user's browser.
 * Note: This script uses userAgent and platform string sniffing to
 * do its magic, so be warned that if any browser vendor resolves
 * to change its default userAgent string, it may break this script.
 * 
 * Actually, the userAgent string changing was the very reason why I
 * created this script: I've used to use the www.devslide.com/labs
 * BrowserDetector, but them Microsoft's IE11 came along fucking up
 * with the common MSIE/XX.X pattern they used to use.
 * 
 * This script helps to manage the userAgent string matches, so, if
 * some userAgent changes in the future, just look at the 'BROWSERS'
 * array and adjust the respective browser's detection regex. You
 * can also add support to extra browser in that same array.
 *
 * Dont get me wrong... IE10+ is a good browser, but unfortunately,
 * still having some behavior nuances in comparison to all the other
 * major browsers... In my case, the problem was the way IE handled
 * iFrames (I know... iFrames are crap, but in my case it was the
 * only way to support a legacy system). IE did not execute the
 * iFrame's $(document).ready(...) statement, like the other browsers,
 * so the solution was to develop a way to detect IE and ask the user
 * to use another browser so he/she would be able to use a specific
 * feature of the legacy system.
 * Other than that, I just use it to suggest up-to-date browsers to
 * IE <= 8 users.
 * 
 * 
 * AGAIN! USE IT WISELLY!
 * 
 * Info sources:
 * https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
 * http://www.useragentstring.com/pages/Browserlist/
 * http://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-platform-as-of-today
 * http://user-agent-string.info/list-of-ua
 */
_UTILS={JS_NEW_LINE:"\n",isValued:function(obj){return(typeof obj!=="undefined"&&obj!==null);
},isEmpty:function(obj){return(!_UTILS.isValued(obj)||obj.length<1);},size:function(obj){return(_UTILS.isValued(obj))?obj.length:0;
},isString:function(obj){return obj!==null&&(typeof obj==="string"||obj instanceof String);},isArray:function(obj){return _UTILS.isValued(obj)&&(Object.prototype.toString.call(obj)==="[object Array]");
},isFunction:function(obj){return !!(obj&&obj.constructor&&obj.call&&obj.apply);},isRegExp:function(obj){return obj!==null&&(obj instanceof RegExp||obj.constructor===RegExp);
},toNullSafe:function(obj,defaultReturn){var def=(_UTILS.isValued(defaultReturn))?defaultReturn:"";return _UTILS.isValued(obj)?obj:def;
},nullSafeGet:function(obj,field,defaultReturn){var def=(_UTILS.isValued(defaultReturn))?defaultReturn:"";return _UTILS.isValued(obj)?_UTILS.toNullSafe(obj[field],def):def;
},toEmptySafe:function(obj,defaultReturn){return !_UTILS.isEmpty(obj)?obj:defaultReturn;},emptySafeGet:function(obj,field,defaultReturn){return _UTILS.isValued(obj)?_UTILS.toEmptySafe(obj[field],defaultReturn):defaultReturn;
},addRegExp:function(re,array){if(!_UTILS.isValued(array)){return;}if(_UTILS.isString(re)){array.push(new RegExp(re,"i"));
}else{if(_UTILS.isRegExp(re)){array.push(re);}}},extend:function(def,custom){var opts={};if(_UTILS.isValued(def)){for(var key in def){opts[key]=def[key];
}}if(_UTILS.isValued(custom)){for(var key in custom){opts[key]=custom[key];}}return opts;},asString:function(obj){if(_UTILS.isValued(obj)){return _UTILS.isString(obj)?obj:String(obj);
}return void (0);},repeat:function(str,n){var tmp="";if(n>0&&!_UTILS.isEmpty(str)){for(var i=0;i<n;i++){tmp+=str;}}return tmp;
},search:function(propName,propValue,array){for(var i=0;i<_UTILS.size(array);i++){var curr=array[i];if(curr[propName]===propValue){return curr;
}}return null;},getElement:function(id){return window.document.getElementById(id);},getWindowSize:function(){var w,h;if(_UTILS.isValued(window.innerWidth)){w=window.innerWidth;
h=window.innerHeight;}else{if(window.document.documentElement.clientWidth!==0){w=window.document.documentElement.clientWidth;
h=window.document.documentElement.clientHeight;}else{w=window.document.body.clientWidth;h=window.document.body.clientHeight;
}}return{width:parseInt(w),height:parseInt(h)};},writeCookie:function(name,value,days){var expiration="";if(parseInt(days)>0){var date=new Date();
date.setTime(date.getTime()+parseInt(days)*24*60*60*1000);expiration="; expires="+date.toGMTString();}document.cookie=name+"="+value+expiration+"; path=/";
},readCookie:function(name){if(!document.cookie){return"";}var searchName=name+"=";var data=document.cookie.split(";");for(var i=0;
i<data.length;i++){while(data[i].charAt(0)===" "){data[i]=data[i].substring(1,data[i].length);}if(data[i].indexOf(searchName)===0){return data[i].substring(searchName.length,data[i].length);
}}return"";},addLoadEvent:function(func){var oldonload=window.onload;if(!_UTILS.isFunction(window.onload)){window.onload=func;
}else{window.onload=function(){if(oldonload){oldonload();}func();};}},show:function(DOM_Element){if(DOM_Element.style.display==="none"){DOM_Element.style.display="";
}}};BrowserDetector={ANY:"any",UNKNOWN:"unknown",locale:"br",detected:null,BROWSERS:[{id:"unknown",name:"Unknown Browser",vendor:"Unknown Vendor"},{id:"msie",name:"Internet Explorer",vendor:"Microsoft Corporation",url:"http://www.getie.com/",showOnNotice:true,supportedPlatforms:["windows","xbox"],patterns:[{uaHave:[/MSIE[\/\s](\d+(\.\d+)*)/i],uaDontHave:[],uaVersion:/MSIE[\/\s](\d+(\.\d+)*)/i},{uaHave:[/Trident[\/\s](\d+(\.\d+)*)/i],uaDontHave:[],uaVersion:/rv\:(\d+(\.\d+)*)/i}],fallbackEngines:[{maxBrowserVersion:"any",id:"trident"}]},{id:"netscape",name:"Netscape",vendor:"Netscape Communications Corporation",supportedPlatforms:["windows","linux"],patterns:[{uaHave:[/Netscape[\/\s](\d+(\.\d+)*)/i],uaDontHave:[],uaVersion:/Netscape[\/\s](\d+(\.\d+)*)/i},{uaHave:[/Navigator[\/\s](\d+(\.\d+)*)/i],uaDontHave:[],uaVersion:/Navigator[\/\s](\d+(\.\d+)*)/i}],fallbackEngines:[{maxBrowserVersion:"any",id:"gecko"}]},{id:"opera",name:"Opera",url:"http://www.opera.com/",vendor:"Opera Software",showOnNotice:true,supportedPlatforms:["windows","linux","mac","ios","android","nintendo"],patterns:[{uaHave:[/OPR[\/\s](\d+(\.\d+)*)/i],uaDontHave:[],uaVersion:/OPR[\/\s](\d+(\.\d+)*)/i},{uaHave:[/Presto[\/\s](\d+(\.\d+)*)/i],uaDontHave:[],uaVersion:/Version[\/\s](\d+(\.\d+)*)/i},{uaHave:[/Opera[\/\s](\d+(\.\d+)*)/i],uaDontHave:[],uaVersion:/Opera[\/\s](\d+(\.\d+)*)/i}],fallbackEngines:[{maxBrowserVersion:"15",id:"presto"},{maxBrowserVersion:"any",id:"blink"}]},{id:"chrome",name:"Chrome",vendor:"Google Inc.",url:"http://www.google.com/chrome/",showOnNotice:true,supportedPlatforms:["windows","linux","mac","ios","android"],patterns:[{uaHave:[/Chrome[\/\s](\d+(\.\d+)*)/i],uaDontHave:[/Chromium[\/\s](\d+(\.\d+)*)/i],uaVersion:/Chrome[\/\s](\d+(\.\d+)*)/i}],fallbackEngines:[{maxBrowserVersion:"28",id:"webkit"},{maxBrowserVersion:"any",id:"blink"}]},{id:"safari",name:"Safari",vendor:"Apple Inc.",url:"http://www.apple.com/safari/",showOnNotice:true,supportedPlatforms:["mac","ios"],patterns:[{uaHave:[/Safari[\/\s](\d+(\.\d+)*)/i],uaDontHave:[/Chrome[\/\s](\d+(\.\d+)*)/i,/Chromium[\/\s](\d+(\.\d+)*)/i],uaVersion:/Version[\/\s](\d+(\.\d+)*)/i}],fallbackEngines:[{maxBrowserVersion:"any",id:"webkit"}]},{id:"firefox",name:"Firefox",vendor:"Mozilla Foundation",url:"http://www.getfirefox.com/",showOnNotice:true,supportedPlatforms:["windows","linux","mac","ios","android"],patterns:[{uaHave:[/Firefox[\/\s](\d+(\.\d+)*)/i],uaDontHave:[/Chromium[\/\s](\d+(\.\d+)*)/i],uaVersion:/Firefox[\/\s](\d+(\.\d+)*)/i}],fallbackEngines:[{maxBrowserVersion:"any",id:"gecko"}]},{id:"netfront",name:"NetFront",vendor:"Access Co. Ltd.",url:"http://gl.access-company.com/products/browser/",supportedPlatforms:["playstation"],patterns:[{uaHave:[/NetFront[\/\s](\d+(\.\d+)*)/i],uaDontHave:[],uaVersion:/NetFront[\/\s](\d+(\.\d+)*)/i},{uaHave:[/Playstation/i],uaDontHave:[],uaVersion:null}],fallbackEngines:[{maxBrowserVersion:"any",id:"webkit"}]}],ENGINES:[{id:"unknown",name:"Unknown Browser Engine",vendor:"Unknown Vendor"},{id:"trident",name:"Trident",vendor:"Microsoft Corporation",patterns:[{uaHave:[/Trident[\/\s](\d+(\.\d+)*)/i],uaDontHave:[],uaVersion:/Trident[\/\s](\d+(\.\d+)*)/i}]},{id:"presto",name:"Presto",vendor:"Opera Software",patterns:[{uaHave:[/Presto[\/\s](\d+(\.\d+)*)/i],uaDontHave:[],uaVersion:/Presto[\/\s](\d+(\.\d+)*)/i}]},{id:"blink",name:"Blink",vendor:"Google Inc.",patterns:[{uaHave:[/Chrome[\/\s](\d+(\.\d+)*)/i],uaDontHave:[],uaVersion:/Chrome[\/\s](\d+(\.\d+)*)/i},{uaHave:[/Chromium[\/\s](\d+(\.\d+)*)/i],uaDontHave:[],uaVersion:/Chromium[\/\s](\d+(\.\d+)*)/i}]},{id:"webkit",name:"WebKit",vendor:"Apple Inc.",patterns:[{uaHave:[/AppleWebKit[\/\s](\d+(\.\d+)*)/i],uaDontHave:[/Chrome[\/\s](\d+(\.\d+)*)/i],uaVersion:/AppleWebKit[\/\s](\d+(\.\d+)*)/i}]},{id:"gecko",name:"Gecko",vendor:"Mozilla Foundation",patterns:[{uaHave:[/Gecko[\/\s](\d+(\.\d+)*)/i],uaDontHave:[],uaVersion:/Gecko[\/\s](\d+(\.\d+)*)/i}]}],PLATFORMS:[{id:"unknown",name:"Unknown Platform",vendor:"Unknown Vendor"},{id:"windows",name:"Windows",vendor:"Microsoft Corporation",patterns:[{platform:/^Win\d\d(.)*/i,uaHave:[],uaDontHave:[/Mobi/i,/Xbox/i]}]},{id:"windows-phone",name:"Windows Phone",vendor:"Microsoft Corporation",mobile:true,patterns:[{platform:/^Win\d\d(.)*/i,uaHave:[/Mobi/i],uaDontHave:[/Xbox/i]}]},{id:"linux",name:"Linux",vendor:"Community",patterns:[{platform:/^Linux(.)*/i,uaHave:[],uaDontHave:[/Mobi/i]}]},{id:"mac",name:"Mac",vendor:"Apple Inc.",patterns:[{platform:/^Mac(.)*/i,uaHave:[],uaDontHave:[/Mobi/i]}]},{id:"ios",name:"iOS",vendor:"Apple Inc.",mobile:true,patterns:[{platform:/^iPhone(.)*/i,uaHave:[],uaDontHave:[]},{platform:/^iPod(.)*/i,uaHave:[],uaDontHave:[]},{platform:/^iPad(.)*/i,uaHave:[],uaDontHave:[]},{platform:/^Mac(.)*/i,uaHave:[/Mobi/i],uaDontHave:[]}]},{id:"android",name:"Android",vendor:"Google Inc.",mobile:true,patterns:[{platform:/^Android(.)*/i,uaHave:[],uaDontHave:[]},{platform:/^Linux(.)*/i,uaHave:[/Mobi/i],uaDontHave:[]}]},{id:"blackberry",name:"BlackBerry",vendor:"BlackBerry Limited",mobile:true,patterns:[{platform:/^BlackBerry(.)*/i,uaHave:[],uaDontHave:[]}]},{id:"freebsd",name:"FreeBSD",vendor:"The FreeBSD Project",patterns:[{platform:/^FreeBSD(.)*/i,uaHave:[],uaDontHave:[]}]},{id:"solaris",name:"Solaris",vendor:"Sun Microsystems",patterns:[{platform:/^SunOS(.)*/i,uaHave:[],uaDontHave:[]}]},{id:"xbox",name:"XBox (360/One)",vendor:"Microsoft Corporation",patterns:[{platform:/^Win\d\d(.)*/i,uaHave:[/Xbox/i],uaDontHave:[]},{platform:/^Xbox(.)*/i,uaHave:[],uaDontHave:[]}]},{id:"playstation",name:"PlayStation (PSP/PSVITA/PS3/PS4)",vendor:"Sony Corporation",patterns:[{platform:/^Live[ ]?Area(.)*/i,uaHave:[],uaDontHave:[]},{platform:/^Playstation(.)*/i,uaHave:[],uaDontHave:[]},{platform:/^PSP(.)*/i,uaHave:[],uaDontHave:[]}]},{id:"nintendo",name:"Nintendo (DS/DSi/3DS/Wii/WiiU)",vendor:"Nintendo Co. Ltd.",patterns:[{platform:/^Nintendo(.)*/i,uaHave:[],uaDontHave:[]}]}],DEFAULT_REJECTION_RULES:[{browser:"msie",comp:"<",version:"9"},{browser:"firefox",comp:"<",version:"25"},{engine:"blink",comp:"<",version:"28"},{engine:"webkit",comp:"<",version:"533"}],CUSTOM_REJECTION_RULES:[],REJECTION_RULES:[],Browser:function(browser){this.id=_UTILS.nullSafeGet(browser,"id");
this.name=_UTILS.nullSafeGet(browser,"name");this.vendor=_UTILS.nullSafeGet(browser,"vendor");this.url=_UTILS.nullSafeGet(browser,"url");
this.showOnNotice=_UTILS.nullSafeGet(browser,"showOnNotice",false);this.supportedPlatforms=_UTILS.nullSafeGet(browser,"supportedPlatforms",[]);
this.patterns=_UTILS.nullSafeGet(browser,"patterns",[]);this.fallbackEngines=_UTILS.nullSafeGet(browser,"fallbackEngines",[]);
this.version=BrowserDetector.UNKNOWN;this.engine=null;this.platform=null;this.rejectionRule=null;this.userAgentStr="";this.platformStr="";
this.match=function(uaString){for(var i=0;i<this.patterns.length;i++){var uaHave=_UTILS.nullSafeGet(this.patterns[i],"uaHave",[]);
var uaDontHave=_UTILS.nullSafeGet(this.patterns[i],"uaDontHave",[]);var match=true;for(var j=0;j<uaHave.length;j++){match=match&&uaHave[j].test(uaString);
if(!match){break;}}if(match){for(var j=0;j<uaDontHave.length;j++){match=match&&!(uaDontHave[j].test(uaString));if(!match){break;
}}}if(match){return i;}}return -1;};this.isPrior=function(version){return BrowserDetector.isValidVersion(this.version)&&BrowserDetector.isValidVersion(version)&&(BrowserDetector.compareVersions(this.version,version)<0);
};this.isSameOrPrior=function(version){return BrowserDetector.isValidVersion(this.version)&&BrowserDetector.isValidVersion(version)&&(BrowserDetector.compareVersions(this.version,version)<=0);
};this.getFallbackEngine=function(){if(_UTILS.isEmpty(this.fallbackEngines)){return new BrowserDetector.Engine(BrowserDetector.ENGINES[0]);
}for(var i=0;i<this.fallbackEngines.length;i++){var curr=browser.fallbackEngines[i];if(curr.maxBrowserVersion===BrowserDetector.ANY||this.isSameOrPrior(curr.maxBrowserVersion)){return new BrowserDetector.Engine(_UTILS.search("id",curr.id,BrowserDetector.ENGINES));
}}};this.toString=function(level,newLine){var lvl=_UTILS.isValued(level)?level:0;var eol=_UTILS.isValued(newLine)?newLine:_UTILS.JS_NEW_LINE;
var str="{"+eol;str+=_UTILS.repeat("    ",lvl)+"    id:      "+this.id+eol;str+=_UTILS.repeat("    ",lvl)+"    name:    "+this.name+eol;
str+=_UTILS.repeat("    ",lvl)+"    vendor:  "+this.vendor+eol;str+=_UTILS.repeat("    ",lvl)+"    version: "+this.version+eol;
str+=_UTILS.repeat("    ",lvl)+"    url:     "+this.url+eol;str+=_UTILS.repeat("    ",lvl)+"    nav.userAgent: "+this.userAgentStr+eol;
str+=_UTILS.repeat("    ",lvl)+"    nav.platform:  "+this.platformStr+eol;str+=_UTILS.repeat("    ",lvl)+"    platform: "+this.platform.toString(lvl+1,eol)+eol;
str+=_UTILS.repeat("    ",lvl)+"    engine: "+this.engine.toString(lvl+1,eol)+eol;str+=_UTILS.repeat("    ",lvl)+"}";return str;
};},Engine:function(engine){this.id=_UTILS.nullSafeGet(engine,"id");this.name=_UTILS.nullSafeGet(engine,"name");this.vendor=_UTILS.nullSafeGet(engine,"vendor");
this.patterns=_UTILS.nullSafeGet(engine,"patterns",[]);this.version=BrowserDetector.UNKNOWN;this.match=function(uaString){for(var i=0;
i<this.patterns.length;i++){var uaHave=_UTILS.nullSafeGet(this.patterns[i],"uaHave",[]);var uaDontHave=_UTILS.nullSafeGet(this.patterns[i],"uaDontHave",[]);
var match=true;for(var j=0;j<uaHave.length;j++){match=match&&uaHave[j].test(uaString);if(!match){break;}}if(match){for(var j=0;
j<uaDontHave.length;j++){match=match&&!(uaDontHave[j].test(uaString));if(!match){break;}}}if(match){return i;}}return -1;
};this.toString=function(level,newLine){var lvl=_UTILS.isValued(level)?level:0;var eol=_UTILS.isValued(newLine)?newLine:_UTILS.JS_NEW_LINE;
var str="{"+eol;str+=_UTILS.repeat("    ",lvl)+"    id:      "+this.id+eol;str+=_UTILS.repeat("    ",lvl)+"    name:    "+this.name+eol;
str+=_UTILS.repeat("    ",lvl)+"    vendor:  "+this.vendor+eol;str+=_UTILS.repeat("    ",lvl)+"    version: "+this.version+eol;
str+=_UTILS.repeat("    ",lvl)+"}";return str;};},Platform:function(platform){this.id=_UTILS.nullSafeGet(platform,"id");this.name=_UTILS.nullSafeGet(platform,"name");
this.vendor=_UTILS.nullSafeGet(platform,"vendor");this.mobile=_UTILS.nullSafeGet(platform,"mobile",false);this.patterns=_UTILS.nullSafeGet(platform,"patterns",[]);
this.match=function(uaString,platString){for(var i=0;i<this.patterns.length;i++){var platform=_UTILS.nullSafeGet(this.patterns[i],"platform",[]);
var uaHave=_UTILS.nullSafeGet(this.patterns[i],"uaHave",[]);var uaDontHave=_UTILS.nullSafeGet(this.patterns[i],"uaDontHave",[]);
var match=platform.test(platString);if(match){for(var j=0;j<uaHave.length;j++){match=match&&uaHave[j].test(uaString);if(!match){break;
}}if(match){for(var j=0;j<uaDontHave.length;j++){match=match&&!(uaDontHave[j].test(uaString));if(!match){break;}}}}if(match){return i;
}}return -1;};this.toString=function(level,newLine){var lvl=_UTILS.isValued(level)?level:0;var eol=_UTILS.isValued(newLine)?newLine:_UTILS.JS_NEW_LINE;
var str="{"+eol;str+=_UTILS.repeat("    ",lvl)+"    id:     "+this.id+eol;str+=_UTILS.repeat("    ",lvl)+"    name:   "+this.name+eol;
str+=_UTILS.repeat("    ",lvl)+"    vendor: "+this.vendor+eol;str+=_UTILS.repeat("    ",lvl)+"    mobile: "+this.mobile+eol;
str+=_UTILS.repeat("    ",lvl)+"}";return str;};},RejectionRule:function(rule){this.browser=_UTILS.nullSafeGet(rule,"browser",BrowserDetector.ANY);
this.engine=_UTILS.nullSafeGet(rule,"engine",BrowserDetector.ANY);this.platform=_UTILS.nullSafeGet(rule,"platform",BrowserDetector.ANY);
this.version=_UTILS.nullSafeGet(rule,"version",BrowserDetector.ANY);this.comp=_UTILS.nullSafeGet(rule,"comp","<");this.match=function(browser,engine){if(this.browser===BrowserDetector.ANY&&this.engine===BrowserDetector.ANY){return true;
}else{if(this.browser!==BrowserDetector.ANY&&this.browser===browser.id){if(this.version===BrowserDetector.ANY){return true;
}else{if(BrowserDetector.isValidVersion(browser.version)&&BrowserDetector.isValidVersion(this.version)){return((this.comp==="==")&&(BrowserDetector.compareVersions(browser.version,this.version)===0))||((this.comp==="!=")&&(BrowserDetector.compareVersions(browser.version,this.version)!==0))||((this.comp===">=")&&(BrowserDetector.compareVersions(browser.version,this.version)>=0))||((this.comp==="<=")&&(BrowserDetector.compareVersions(browser.version,this.version)<=0))||((this.comp===">")&&(BrowserDetector.compareVersions(browser.version,this.version)>0))||((this.comp==="<")&&(BrowserDetector.compareVersions(browser.version,this.version)<0));
}}}else{if(this.engine!==BrowserDetector.ANY&&this.engine===engine.id){if(this.version===BrowserDetector.ANY){return true;
}else{if(BrowserDetector.isValidVersion(engine.version)&&BrowserDetector.isValidVersion(this.version)){return((this.comp==="==")&&(BrowserDetector.compareVersions(engine.version,this.version)===0))||((this.comp==="!=")&&(BrowserDetector.compareVersions(engine.version,this.version)!==0))||((this.comp===">=")&&(BrowserDetector.compareVersions(engine.version,this.version)>=0))||((this.comp==="<=")&&(BrowserDetector.compareVersions(engine.version,this.version)<=0))||((this.comp===">")&&(BrowserDetector.compareVersions(engine.version,this.version)>0))||((this.comp==="<")&&(BrowserDetector.compareVersions(engine.version,this.version)<0));
}}}}}return false;};this.toString=function(level,newLine){var lvl=_UTILS.isValued(level)?level:0;var eol=_UTILS.isValued(newLine)?newLine:_UTILS.JS_NEW_LINE;
var str="{"+eol;str+=_UTILS.repeat("    ",lvl)+"    index:    "+this.index+eol;str+=_UTILS.repeat("    ",lvl)+"    browser:  "+this.browser+eol;
str+=_UTILS.repeat("    ",lvl)+"    engine:   "+this.engine+eol;str+=_UTILS.repeat("    ",lvl)+"    platform: "+this.platform+eol;
var vrsn=(this.version===BrowserDetector.ANY)?this.version:(this.comp+" "+this.version);str+=_UTILS.repeat("    ",lvl)+"    version:  "+vrsn+eol;
str+=_UTILS.repeat("    ",lvl)+"}";return str;};},isValidVersion:function(vrsn){return !_UTILS.isEmpty(vrsn)&&(/^\d+(\.\d+)*$/i).test(_UTILS.asString(vrsn));
},compareVersions:function(vrsn1,vrsn2){var split1=_UTILS.asString(vrsn1).split(".");var split2=_UTILS.asString(vrsn2).split(".");
var smaller=split1.length<=split2.length?split1:split2;var bigger=split1.length>=split2.length?split1:split2;while(smaller.length<bigger.length){smaller.push("0");
}for(var i=0;i<bigger.length;i++){var n1=Number(split1[i]);var n2=Number(split2[i]);var diff=n1-n2;if(diff!==0){return diff;
}}return 0;},detect:function(options){var start=new Date().getTime();var opts=_UTILS.extend({uaString:navigator.userAgent,platString:navigator.platform,force:false},options);
var reproccess=opts.force||!_UTILS.isValued(BrowserDetector.detected);if(reproccess){opts.force=false;BrowserDetector.detected=null;
var browser=new BrowserDetector.Browser(BrowserDetector.BROWSERS[0]);for(var i=1;i<BrowserDetector.BROWSERS.length;i++){var curr=new BrowserDetector.Browser(BrowserDetector.BROWSERS[i]);
var matchIndex=curr.match(opts.uaString);if(matchIndex>=0){browser=curr;var versionRegex=browser.patterns[matchIndex].uaVersion;
if(_UTILS.isValued(versionRegex)){var exec=versionRegex.exec(opts.uaString);if(!_UTILS.isEmpty(exec)){browser.version=RegExp.$1;
}}break;}}var engine=new BrowserDetector.Engine(BrowserDetector.ENGINES[0]);for(var i=1;i<BrowserDetector.ENGINES.length;
i++){var curr=new BrowserDetector.Engine(BrowserDetector.ENGINES[i]);var matchIndex=curr.match(opts.uaString);if(matchIndex>=0){engine=curr;
var versionRegex=engine.patterns[matchIndex].uaVersion;if(_UTILS.isValued(versionRegex)){var exec=versionRegex.exec(opts.uaString);
if(!_UTILS.isEmpty(exec)){engine.version=RegExp.$1;}}break;}}if(engine.id===BrowserDetector.UNKNOWN&&browser.id!==BrowserDetector.UNKNOWN){engine=browser.getFallbackEngine();
}var platform=new BrowserDetector.Platform(BrowserDetector.PLATFORMS[0]);for(var i=1;i<BrowserDetector.PLATFORMS.length;i++){var curr=new BrowserDetector.Platform(BrowserDetector.PLATFORMS[i]);
var matchIndex=curr.match(opts.uaString,opts.platString);if(matchIndex>=0){platform=curr;break;}}BrowserDetector.REJECTION_RULES=[];
for(var i=0;i<BrowserDetector.DEFAULT_REJECTION_RULES.length;i++){BrowserDetector.reject(BrowserDetector.DEFAULT_REJECTION_RULES[i],BrowserDetector.REJECTION_RULES);
}for(var i=0;i<BrowserDetector.CUSTOM_REJECTION_RULES.length;i++){BrowserDetector.reject(BrowserDetector.CUSTOM_REJECTION_RULES[i],BrowserDetector.REJECTION_RULES);
}var rule=null;for(var i=0;i<BrowserDetector.REJECTION_RULES.length;i++){var curr=new BrowserDetector.RejectionRule(BrowserDetector.REJECTION_RULES[i]);
curr.index=i;if(curr.match(browser,engine,platform)){rule=curr;break;}}browser.engine=engine;browser.platform=platform;browser.rejectionRule=rule;
browser.userAgentStr=opts.uaString;browser.platformStr=opts.platString;BrowserDetector.detected=browser;}var end=new Date().getTime();
BrowserDetector.time=(end-start)+" msecs";if(reproccess){BrowserDetector.time+=" *";}return BrowserDetector.detected;},reject:function(rejected,targetList){if(_UTILS.isValued(rejected)){if(_UTILS.isArray(rejected)){for(var i=0;
i<rejected.length;i++){BrowserDetector.reject(rejected[i],targetList);}}else{var list=_UTILS.isValued(targetList)?targetList:BrowserDetector.CUSTOM_REJECTION_RULES;
BrowserDetector.detected=null;rejected.browser=_UTILS.toEmptySafe(rejected.browser,BrowserDetector.ANY);rejected.engine=_UTILS.toEmptySafe(rejected.engine,BrowserDetector.ANY);
rejected.version=_UTILS.toEmptySafe(_UTILS.asString(rejected.version),BrowserDetector.ANY);rejected.comp=_UTILS.toEmptySafe(rejected.comp,"<");
var found=false;for(var i=0;i<list.length;i++){var tmp=list[i];if(rejected.browser===tmp.browser&&rejected.engine===tmp.engine){found=true;
tmp.version=rejected.version;}}if(!found){list.push(rejected);}}}},getRejectionRule:function(options){return(BrowserDetector.detect(options)).rejectionRule;
},getRejectionRuleIndex:function(options){var rule=BrowserDetector.getRejectionRule(options);return _UTILS.nullSafeGet(rule,"index",-1);
},isRejected:function(options){return BrowserDetector.getRejectionRuleIndex(options)>=0;},isPrior:function(version,options){return(BrowserDetector.detect(options)).isPrior(version);
},isSameOrPrior:function(version,options){return(BrowserDetector.detect(options)).isSameOrPrior(version);},isUnknownPlatform:function(options){return BrowserDetector.UNKNOWN===(BrowserDetector.detect(options)).platform.id;
},isWindows:function(options){return"windows"===(BrowserDetector.detect(options)).platform.id;},isWindowsPhone:function(options){return"windows-phone"===(BrowserDetector.detect(options)).platform.id;
},isLinux:function(options){return"linux"===(BrowserDetector.detect(options)).platform.id;},isMac:function(options){return"mac"===(BrowserDetector.detect(options)).platform.id;
},isIos:function(options){return"ios"===(BrowserDetector.detect(options)).platform.id;},isAndroid:function(options){return"android"===(BrowserDetector.detect(options)).platform.id;
},isBlackberry:function(options){return"blackberry"===(BrowserDetector.detect(options)).platform.id;},isFreebsd:function(options){return"freebsd"===(BrowserDetector.detect(options)).platform.id;
},isSolaris:function(options){return"solaris"===(BrowserDetector.detect(options)).platform.id;},isXbox:function(options){return"xbox"===(BrowserDetector.detect(options)).platform.id;
},isPlaystation:function(options){return"playstation"===(BrowserDetector.detect(options)).platform.id;},isNintendo:function(options){return"nintendo"===(BrowserDetector.detect(options)).platform.id;
},isMobile:function(options){return(BrowserDetector.detect(options)).platform.mobile;},isUnknownBrowser:function(options){return BrowserDetector.UNKNOWN===(BrowserDetector.detect(options)).id;
},isMsie:function(options){return"msie"===(BrowserDetector.detect(options)).id;},isNetscape:function(options){return"netscape"===(BrowserDetector.detect(options)).id;
},isOpera:function(options){return"opera"===(BrowserDetector.detect(options)).id;},isChrome:function(options){return"chrome"===(BrowserDetector.detect(options)).id;
},isSafari:function(options){return"safari"===(BrowserDetector.detect(options)).id;},isFirefox:function(options){return"firefox"===(BrowserDetector.detect(options)).id;
},isNetfront:function(options){return"netfront"===(BrowserDetector.detect(options)).id;},isUnknownEngine:function(options){return BrowserDetector.UNKNOWN===(BrowserDetector.detect(options)).engine.id;
},isTrident:function(options){return"trident"===(BrowserDetector.detect(options)).engine.id;},isBlink:function(options){return"blink"===(BrowserDetector.detect(options)).engine.id;
},isGecko:function(options){return"gecko"===(BrowserDetector.detect(options)).engine.id;},isWebkit:function(options){return"webkit"===(BrowserDetector.detect(options)).engine.id;
},isPresto:function(options){return"presto"===(BrowserDetector.detect(options)).engine.id;},toString:function(level,newLine){var lvl=_UTILS.isValued(level)?level:0;
var eol=_UTILS.isValued(newLine)?newLine:_UTILS.JS_NEW_LINE;var str="{"+eol;if(_UTILS.isValued(BrowserDetector.detected)){str+=_UTILS.repeat("    ",lvl)+"    time: "+BrowserDetector.time+eol;
str+=_UTILS.repeat("    ",lvl)+"    DetectedBrowser: "+BrowserDetector.detected.toString(lvl+1,eol)+eol;}str+=_UTILS.repeat("    ",lvl)+"    RejectionRules: ["+eol;
for(var i=0;i<BrowserDetector.REJECTION_RULES.length;i++){var matched="";if(BrowserDetector.getRejectionRuleIndex()===i){matched="[[matched]] ";
}var curr=new BrowserDetector.RejectionRule(BrowserDetector.REJECTION_RULES[i]);curr.index=i;str+=_UTILS.repeat("    ",lvl+2)+matched+curr.toString(lvl+2,eol)+eol;
}str+=_UTILS.repeat("    ",lvl)+"    ]"+eol;str+=_UTILS.repeat("    ",lvl)+"}";return str;},showNotice:function(options){if(BrowserDetector.isRejected(options)){if(_UTILS.readCookie("bdnotice")==="1"){return;
}BrowserDetector._writeNoticeCode();BrowserDetector._positionNotice();var el=this;window.onresize=function(){el._positionNotice();
};if(BrowserDetector.isMsie()&&BrowserDetector.isPrior("7")){window.onscroll=function(){el._positionNotice();};}_UTILS.getElement("browser-detector-close").onclick=function(){el._remindMe(false);
};_UTILS.getElement("browser-detector-remind-later").onclick=function(){el._remindMe(false);};_UTILS.getElement("browser-detector-never-remind").onclick=function(){el._remindMe(true);
};}},showNoticeOnLoad:function(options){_UTILS.addLoadEvent(function(){BrowserDetector.showNotice(options);});},_positionNotice:function(){var windowSize=_UTILS.getWindowSize();
var noticeEl=_UTILS.getElement("browser-detector");var noticeSize=_UTILS.isValued(noticeEl)?{width:parseInt(noticeEl.offsetWidth),height:parseInt(noticeEl.offsetHeight)}:null;
if(noticeEl===null||noticeSize===null||windowSize===null||!windowSize.width||!windowSize.height){return;}noticeEl.style.left=(windowSize.width-noticeSize.width)/2+"px";
var offset=0;if(BrowserDetector.isMsie()&&BrowserDetector.isPrior("7")){offset=(window.document.documentElement.scrollTop!==0)?window.document.documentElement.scrollTop:window.document.body.scrollTop;
}noticeEl.style.top=(windowSize.height-noticeSize.height-20+offset)+"px";this.noticeHeight=noticeSize.height;},_remindMe:function(never){_UTILS.writeCookie("bdnotice",1,never?365:7);
_UTILS.getElement("browser-detector").style.display="none";_UTILS.getElement("black_overlay").style.display="none";},_getNoticeBrowsers:function(){var browserList=[];
for(var i=1;i<BrowserDetector.BROWSERS.length;i++){var match=false;var browser=new BrowserDetector.Browser(BrowserDetector.BROWSERS[i]);
if(browser.showOnNotice&&!_UTILS.isEmpty(browser.url)){var engine=browser.getFallbackEngine();for(var j=0;j<BrowserDetector.REJECTION_RULES.length;
j++){var rule=new BrowserDetector.RejectionRule(BrowserDetector.REJECTION_RULES[j]);match=match||rule.match(browser,engine);
if(match){break;}}if(!match){browserList.push(browser);}}}return browserList;},_writeNoticeCode:function(){var noticeElement=document.getElementById("browser-detector");
if(!_UTILS.isValued(noticeElement)){var locale=BrowserDetector.regional[BrowserDetector.locale];var title=locale.title;var notice=locale.notice;
var selectBrowser=locale.selectBrowser;var remindMeLater=locale.remindMeLater;var neverRemindAgain=locale.neverRemindAgain;
var code='<div id="black_overlay"></div><div id="browser-detector"><a href="javascript:;" id="browser-detector-close">&times;</a>';
notice=notice.replace("\n",'</p><p class="bd-notice">');notice=notice.replace("{browser_name}",(this.browser+" "+this.browserVersion));
code+='<p class="bd-title">'+title+'</p><p class="bd-notice">'+notice+'</p><p class="bd-notice"><b>'+selectBrowser+"</b></p>";
var browsersList=BrowserDetector._getNoticeBrowsers();code+='<ul class="bd-browsers-list">';for(var i=0;(i<browsersList.length&&i<5);
i++){var tmp=browsersList[i];code+='<li class="'+tmp.id+'"><a href="'+tmp.url+'" target="_blank" title="'+tmp.vendor+'">'+tmp.name+"</a></li>";
}code+="</ul>";code+='<ul class="bd-skip-buttons">';code+='<li><button id="browser-detector-remind-later" type="button">'+remindMeLater+"</button></li>";
code+='<li><button id="browser-detector-never-remind" type="button">'+neverRemindAgain+"</button></li>";code+="</ul>";code+="</div>";
window.document.body.innerHTML+=code;}else{_UTILS.show(noticeElement);}},regional:{us:{title:"Outdated Browser Detected",notice:"Our website has detected that you are using an outdated browser. Using your current browser will prevent you from accessing features on our website. An upgrade is not required, but is strongly recommend to improve your browsing experience on our website.",selectBrowser:"Use the links below to download a new browser or upgrade your existing browser.",remindMeLater:"Remind me later",neverRemindAgain:"No, don't remind me again"},br:{title:"Navegador Obsoleto Detectado",notice:"O sistema detectou que voc&ecirc; est&aacute; usando um navegador defasado.\nUsar seu atual navegador o privar&aacute; acesso &agrave; algumas funcionalidades do sistema. Uma atualiza&ccedil;&atilde;o &eacute; altamente recomendada para melhorar sua experi&ecirc;ncia de utiliza&ccedil;&atilde;o do sistema",selectBrowser:"Use os links abaixo para instalar um novo navegador ou atualizar o existente.",remindMeLater:"Lembrar depois",neverRemindAgain:"N&atilde;o lembrar novamente"}}};

