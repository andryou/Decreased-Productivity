// (c) Andrew
// Icon by dunedhel: http://dunedhel.deviantart.com/
// Supporting functions by AdThwart - T. Joseph

var version = (function () {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', chrome.extension.getURL('manifest.json'), false);
	xhr.send(null);
	return JSON.parse(xhr.responseText).version;
}());
var cloakedTabs = [];
var uncloakedTabs = [];
var contextLoaded = false;
var dpicon, dptitle;

// ----- Supporting Functions

function enabled(url) {
	if (localStorage["enable"] == "true" || domainCheck(extractDomainFromURL(url)) == '1') return 'true';
	return 'false';
}
function in_array(needle,haystack) {
	for (key in haystack) if (haystack[key]==needle) {
		return true;
		break;
	}
	return false;
}
function domainCheck(domain) {
	var blackList = JSON.parse(localStorage['blackList']);
	var whiteList = JSON.parse(localStorage['whiteList']);
	if (domain.substr(0,4)=='www.') {
		if (in_array(domain.substr(4), whiteList)) return '0';
		if (in_array(domain.substr(4), blackList)) return '1';
	}
	if (in_array(domain, whiteList)) return '0';
	if (in_array(domain, blackList)) return '1';
	return '-1';
}
function extractDomainFromURL(url) {
	if (!url) return "";
	var x = url.substr(url.indexOf("://") + 3);
	x = x.substr(0, x.indexOf("/"));
	x = x.substr(x.indexOf("@") + 1);
	colPos = x.indexOf(":");
	if (colPos >= 0) x = x.substr(0, colPos);
	return x;
}
function domainHandler(domain,action) {
	// Initialize local storage
	if (typeof(localStorage['whiteList'])=='undefined') localStorage['whiteList'] = JSON.stringify([]);
	if (typeof(localStorage['blackList'])=='undefined') localStorage['blackList'] = JSON.stringify([]);
	var whiteList = JSON.parse(localStorage['whiteList']);
	var blackList = JSON.parse(localStorage['blackList']);
	
	// Remove domain from whitelist and blacklist
	var pos = whiteList.indexOf(domain);
	if (pos>-1) whiteList.splice(pos,1);
	pos = blackList.indexOf(domain);
	if (pos>-1) blackList.splice(blackList.indexOf(domain),1);
	
	switch(action) {
		case 0:	// Whitelist
			whiteList.push(domain);
			break;
		case 1:	// Blacklist
			blackList.push(domain);
			break;
		case 2:	// Remove
			break;
	}
	localStorage['whiteList'] = JSON.stringify(whiteList);
	localStorage['blackList'] = JSON.stringify(blackList);
	return false;
}
// ----- Options
function optionExists(opt) {
	return (typeof localStorage[opt] != "undefined");
}
function defaultOptionValue(opt, val) {
	if (!optionExists(opt)) localStorage[opt] = val;
}
function setDefaultOptions() {
	defaultOptionValue("version", version);
	defaultOptionValue("enable", "true");
	defaultOptionValue("enableToggle", "true");
	defaultOptionValue("hotkey", "CTRL F12");
	defaultOptionValue("paranoidhotkey", "ALT P");
	defaultOptionValue("global", "false");
	defaultOptionValue("newPages", "Uncloak");
	defaultOptionValue("sfwmode", "SFW");
	defaultOptionValue("savedsfwmode", "");
	defaultOptionValue("opacity1", "0.05");
	defaultOptionValue("opacity2", "0.5");
	defaultOptionValue("collapseimage", "false");
	defaultOptionValue("showIcon", "true");
	defaultOptionValue("iconType", "coffee");
	defaultOptionValue("iconTitle", "Decreased Productivity");
	defaultOptionValue("disableFavicons", "false");
	defaultOptionValue("hidePageTitles", "false");
	defaultOptionValue("pageTitleText", "Google Chrome");
	defaultOptionValue("enableStickiness", "false");
	defaultOptionValue("maxwidth", "0");
	defaultOptionValue("maxheight", "0");
	defaultOptionValue("showContext", "true");
	defaultOptionValue("showUnderline", "true");
	defaultOptionValue("removeBold", "false");
	defaultOptionValue("showUpdateNotifications", "true");
	defaultOptionValue("font", "Arial");
	defaultOptionValue("customfont", "");
	defaultOptionValue("fontsize", "12");
	defaultOptionValue("s_bg", "FFFFFF");
	defaultOptionValue("s_link", "000099");
	defaultOptionValue("s_table", "cccccc");
	defaultOptionValue("s_text", "000000");
	// delete old option if exists
	if (optionExists("globalEnable"))
		delete localStorage["globalEnable"];
	// delete old option if exists
	if (optionExists("style"))
		delete localStorage["style"];
	// set SFW Level to SFW (for new change in v0.46.3)
	if (localStorage["sfwmode"] == "true")
		localStorage["sfwmode"] = "SFW";
	if (!optionExists("blackList")) localStorage['blackList'] = JSON.stringify([]);
	if (!optionExists("whiteList")) localStorage['whiteList'] = JSON.stringify([]);
}
// Context Menu
chrome.contextMenus.create({"title": chrome.i18n.getMessage("whitelistdomain"), "contexts": ['browser_action','page_action'], "onclick": function(info, tab){
	if (tab.url.substring(0, 4) != 'http') return;
	domainHandler(extractDomainFromURL(tab.url), 0);
	if (localStorage["enable"] == "true") magician('false', localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"], tab.id, 'true');
}});
chrome.contextMenus.create({"title": chrome.i18n.getMessage("blacklistdomain"), "contexts": ['browser_action','page_action'], "onclick": function(info, tab){
	if (tab.url.substring(0, 4) != 'http') return;
	domainHandler(extractDomainFromURL(tab.url), 1);
	if (localStorage["enable"] == "true") magician('true', localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"], tab.id, 'true');
}});
chrome.contextMenus.create({"title": chrome.i18n.getMessage("removelist"), "contexts": ['browser_action','page_action'], "onclick": function(info, tab){
	if (tab.url.substring(0, 4) != 'http') return;
	domainHandler(extractDomainFromURL(tab.url), 2);
	if (localStorage["enable"] == "true")  {
		if (localStorage['newPages'] == 'Cloak' || localStorage['global'] == 'true') flag = 'true';
		else flag = 'false';
		magician(flag, localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"], tab.id, 'true');
	}
}});

// Called by clicking on the context menu item
function newCloak(info, tab) {
	// Enable cloaking (in case its been disabled) and open the link in a new tab
	localStorage["enable"] = "true";
	localStorage["sfwmode"] = "SFW";
	// If it's an image, load the "src" attribute
	if (info.mediaType) chrome.tabs.create({'url': info.srcUrl}, function(tab){cloakedTabs.push(tab.id);recursiveCloak('true', localStorage["global"], localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"], tab.id);});
	// Else, it's a normal link, so load the linkUrl.
	else chrome.tabs.create({'url': info.linkUrl}, function(tab){cloakedTabs.push(tab.id);recursiveCloak('true', localStorage["global"], localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"], tab.id);});
}
// Add context menu item that shows only if you right-click on links/images.
function dpContext(boo) {
	// Remove all existing DP context menus
	if (boo == 'true' && !contextLoaded) {
		chrome.contextMenus.create({"title": chrome.i18n.getMessage("opensafely"), "contexts": ['link', 'image'], "onclick": function(info, tab){newCloak(info, tab);}});
		contextLoaded = true;
	}
}
// ----- Main Functions
function uncloakAll(){
	cloakedTabs=[];
	uncloakedTabs=[];
}
function recursiveCloak(enable, global, showIcon, hideFavicon, hidePageTitle, titleText, tabId) {
	if (global == 'true') {
		chrome.windows.getAll({"populate":true}, function(windows) {
			for (var i=0; i<windows.length; i++) {
				for (var x=0; x<windows[i].tabs.length; x++) {
					// leave blacklisted sites cloaked (when in global mode)
					if (domainCheck(extractDomainFromURL(windows[i].tabs[x].url)) != 1) {
						var dpcloakindex = cloakedTabs.indexOf(windows[i].tabs[x].id);
						if (dpcloakindex != -1) cloakedTabs.splice(dpcloakindex, 1);
						else cloakedTabs.push(windows[i].tabs[x].id);
						magician(enable, showIcon, hideFavicon, hidePageTitle, titleText, windows[i].tabs[x].id, 'false');
					}
				}
			}
		});
	} else {
		if (tabId) magician(enable, showIcon, hideFavicon, hidePageTitle, titleText, tabId, 'true');
		else {
			// If no tabId is passed, it means the user changed an option on the Options page and we must go through all of the individual tabs that have cloaking enabled (we're in this section because global is false)
			for (var i=cloakedTabs.length-1; i>=0; --i) {
				chrome.tabs.executeScript(cloakedTabs[i], {code: "removeCss('productivity')", allFrames: true});
				magician(enable, showIcon, hideFavicon, hidePageTitle, titleText, cloakedTabs[i], 'true');
			}
		}
	}
}
function setDPIcon() {
	dpicon = localStorage["iconType"];
	dptitle = localStorage["iconTitle"];
	chrome.windows.getAll({"populate":true}, function(windows) {
		for (var i=0; i<windows.length; i++) {
			for (var x=0; x<windows[i].tabs.length; x++) {
				chrome.pageAction.setIcon({path: "img/addressicon/"+dpicon+".png", tabId: windows[i].tabs[x].id});
				chrome.pageAction.setTitle({title: dptitle, tabId: windows[i].tabs[x].id});
			}
		}
	});
}
function magician(enable, showIcon, hideFavicon, hidePageTitle, titleText, tabId, tabSpecific) {
	if (enable == 'true') {
		chrome.tabs.executeScript(tabId, {code: "init()", allFrames: true});
		if (hideFavicon == 'true') chrome.tabs.executeScript(tabId, {code: "faviconblank()", allFrames: true});
		if (hidePageTitle == 'true') chrome.tabs.executeScript(tabId, {code: 'replaceTitle("'+titleText+'");titleBind("'+titleText+'");', allFrames: true});
	} else {
		chrome.tabs.executeScript(tabId, {code: "removeCss('productivity')", allFrames: true});
	}
	if (showIcon == 'true') {
		if (enable == 'true') {
			chrome.pageAction.setIcon({path: "img/addressicon/"+dpicon+".png", tabId: tabId});
			chrome.pageAction.setTitle({title: dptitle, tabId: tabId});
		} else {
			chrome.pageAction.setIcon({path: "img/addressicon/"+dpicon+"-disabled.png", tabId: tabId});
			chrome.pageAction.setTitle({title: dptitle, tabId: tabId});
		}
		chrome.pageAction.show(tabId);
	} else chrome.pageAction.hide(tabId);
}
function dpHandle(tab) {
	if (localStorage["global"] == "true" && domainCheck(extractDomainFromURL(tab.url)) != 1) {
		if (localStorage["enable"] == "true") {
			localStorage["enable"] = "false";
			// Remove cloak in all windows and tabs.
			recursiveCloak('false', 'true', localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"]);
		} else {
			localStorage["enable"] = "true";
			// Activate cloak in all windows and tabs.
			recursiveCloak('true', 'true', localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"]);
		}
	} else {
		var dpcloakindex = cloakedTabs.indexOf(tab.id);
		var dpuncloakindex = uncloakedTabs.indexOf(tab.id);
		localStorage["enable"] = "true";
		if (dpcloakindex != -1) {
			if (dpuncloakindex == -1) uncloakedTabs.push(tab.id);
			cloakedTabs.splice(dpcloakindex, 1);
			recursiveCloak('false', 'false', localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"], tab.id);
		} else {
			if (dpcloakindex == -1) cloakedTabs.push(tab.id);
			uncloakedTabs.splice(dpuncloakindex, 1);
			recursiveCloak('true', 'false', localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"], tab.id);
		}
	}
}
// ----- Request library to support content script communication
chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
	if (changeinfo.status == "loading") {
		var dpcheck = false;
		var dpdomaincheck = domainCheck(extractDomainFromURL(tab.url));
		var dpcloakindex = cloakedTabs.indexOf(tabid);
		var dpuncloakindex = uncloakedTabs.indexOf(tabid);
		if (enabled(tab.url) == "true" && dpdomaincheck != 0 && (localStorage["global"] == "true" || (localStorage["global"] == "false" && dpcloakindex != -1)) || dpdomaincheck == 1)
			dpcheck = true;
		// Add tabId to cloakedTabs if not existing
		if (enabled(tab.url) == "true" && dpdomaincheck != 0 && (localStorage["global"] == "false" && localStorage["newPages"] == "Cloak" && dpuncloakindex == -1 && dpcloakindex == -1 || dpdomaincheck == 1)) 
			if (dpcloakindex == -1) cloakedTabs.push(tabid);
		// Cloak page if it meets the criteria
		if (dpcheck) {
			magician(enabled(tab.url), localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"], tabid, 'true');
			if (dpdomaincheck != 1 && localStorage["global"] == "false") localStorage["enable"] = "true";
		}
		if (localStorage["showIcon"] == "true") {
			if (dpcheck) {
				chrome.pageAction.setIcon({path: "img/addressicon/"+dpicon+".png", tabId: tabid});
				chrome.pageAction.setTitle({title: dptitle, tabId: tabid});
			} else {
				chrome.pageAction.setIcon({path: "img/addressicon/"+dpicon+"-disabled.png", tabId: tabid});
				chrome.pageAction.setTitle({title: dptitle, tabId: tabid});
			}
			chrome.pageAction.show(tabid);
		} else chrome.pageAction.hide(tabid);
		if (localStorage["enableStickiness"] == "true") {
			if (tab.openerTabId) {
				if (cloakedTabs.indexOf(tab.openerTabId) != -1 && dpuncloakindex == -1) {
					if (dpcloakindex == -1) cloakedTabs.push(tabid);
					magician('true', localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"], tabid, 'true');
				}
			}
		}
	}
});	
chrome.tabs.onRemoved.addListener(function(tabid) {
	var dpcloakindex = cloakedTabs.indexOf(tabid);
	var dpuncloakindex = uncloakedTabs.indexOf(tabid);
	if (dpcloakindex != -1) cloakedTabs.splice(dpcloakindex, 1);
	if (dpuncloakindex != -1) uncloakedTabs.splice(dpuncloakindex, 1);
});
var requestDispatchTable = {
	"get-enabled": function(request, sender, sendResponse) {
		var enable;
		var dpdomaincheck = domainCheck(extractDomainFromURL(sender.tab.url));
		if (enabled(sender.tab.url) == "true" && dpdomaincheck != 0 && (localStorage["global"] == "true" || (localStorage["global"] == "false" && (cloakedTabs.indexOf(sender.tab.id) != -1 || localStorage["newPages"] == "Cloak" || dpdomaincheck == 1)))) enable = 'true';
		else enable = 'false';
		sendResponse({enable: enable, background: localStorage["s_bg"], favicon: localStorage["disableFavicons"], hidePageTitles: localStorage["hidePageTitles"], pageTitleText: localStorage["pageTitleText"], enableToggle: localStorage["enableToggle"], hotkey: localStorage["hotkey"], paranoidhotkey: localStorage["paranoidhotkey"]});
	},
	"toggle": function(request, sender, sendResponse) {
		if (localStorage["savedsfwmode"] != "") {
			localStorage["sfwmode"] = localStorage["savedsfwmode"];
			localStorage["savedsfwmode"] = "";
		}
		dpHandle(sender.tab);
	},
	"toggleparanoid": function(request, sender, sendResponse) {
		if (localStorage["savedsfwmode"] == "") {
			localStorage["savedsfwmode"] = localStorage["sfwmode"];
			localStorage["sfwmode"] = "Paranoid";
			if (localStorage["global"] == "true") {
				if (localStorage["enable"] == "true") recursiveCloak('false', 'true', localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"]);
				recursiveCloak('true', 'true', localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"]);
				localStorage["enable"] = "true";
			} else {
				var dpcloakindex = cloakedTabs.indexOf(sender.tab.id);
				var dpuncloakindex = uncloakedTabs.indexOf(sender.tab.id);
				if (dpuncloakindex != -1) uncloakedTabs.splice(dpuncloakindex, 1);
				if (dpcloakindex == -1) cloakedTabs.push(sender.tab.id);
				else magician('false', localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"], sender.tab.id);
				magician('true', localStorage["showIcon"], localStorage["disableFavicons"], localStorage["hidePageTitles"], localStorage["pageTitleText"], sender.tab.id);
				localStorage["enable"] = "true";
			}
			return;
		} else {
			localStorage["sfwmode"] = localStorage["savedsfwmode"];
			localStorage["savedsfwmode"] = "";
		}
		dpHandle(sender.tab);
	},
	"get-settings": function(request, sender, sendResponse) {
		if (localStorage["font"] == '-Custom-') {
			if (localStorage["customfont"]) fontface = localStorage["customfont"];
			else fontface = 'Arial';
		} else fontface = localStorage["font"];
		if (localStorage["global"] == "false") sendResponse({enable: 'true', sfwmode: localStorage["sfwmode"], font: fontface, fontsize: localStorage["fontsize"], underline: localStorage["showUnderline"], background: localStorage["s_bg"], text: localStorage["s_text"], table: localStorage["s_table"], link: localStorage["s_link"], bold: localStorage["removeBold"], opacity1: localStorage["opacity1"], opacity2: localStorage["opacity2"], collapseimage: localStorage["collapseimage"], maxheight: localStorage["maxheight"], maxwidth: localStorage["maxwidth"]});
		else {
			var enable;
			var dpdomaincheck = domainCheck(extractDomainFromURL(sender.tab.url));
			if (enabled(sender.tab.url) == "true" && dpdomaincheck != 0 && (localStorage["global"] == "true" || (localStorage["global"] == "false" && (cloakedTabs.indexOf(sender.tab.id) != -1 || localStorage["newPages"] == "Cloak" || dpdomaincheck == 1)))) enable = 'true';
			else enable = 'false';
			sendResponse({enable: enable, sfwmode: localStorage["sfwmode"], font: fontface, fontsize: localStorage["fontsize"], underline: localStorage["showUnderline"], background: localStorage["s_bg"], text: localStorage["s_text"], table: localStorage["s_table"], link: localStorage["s_link"], bold: localStorage["removeBold"], opacity1: localStorage["opacity1"], opacity2: localStorage["opacity2"], collapseimage: localStorage["collapseimage"], maxheight: localStorage["maxheight"], maxwidth: localStorage["maxwidth"]});
		}
	}
}
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.reqtype in requestDispatchTable)
		requestDispatchTable[request.reqtype](request, sender, sendResponse);
	else
		sendResponse({});
});
// ----- If page action icon is clicked, either enable or disable the cloak
chrome.pageAction.onClicked.addListener(function(tab) {
	dpHandle(tab);
});
// Execute
setDefaultOptions();
setDPIcon();
if ((!optionExists("version") || localStorage["version"] != version) && localStorage["showUpdateNotifications"] == 'true') {
	chrome.tabs.create({ url: chrome.extension.getURL('updated.html'), selected: true });
	localStorage["version"] = version;
}
dpContext(localStorage["showContext"]);