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

function enabled(tab, dpcloakindex) {
	dpdomaincheck = domainCheck(extractDomainFromURL(tab.url));
	dpcloakindex = dpcloakindex || cloakedTabs.indexOf(tab.windowId+"|"+tab.id);
	if ((localStorage["enable"] == "true" || dpdomaincheck == '1') && dpdomaincheck != '0' && (localStorage["global"] == "true" || (localStorage["global"] == "false" && (dpcloakindex != -1 || localStorage["newPages"] == "Cloak" || dpdomaincheck == '1')))) return 'true';
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
	blackList = JSON.parse(localStorage['blackList']);
	whiteList = JSON.parse(localStorage['whiteList']);
	if (domain.substr(0,4)=='www.') {
		if (in_array(domain.substr(4), whiteList)) return '0';
		if (in_array(domain.substr(4), blackList)) return '1';
	} else {
		// temp until regex support is coded
		if (in_array('www.'+domain, whiteList)) return '0';
		if (in_array('www.'+domain, blackList)) return '1';
	}
	if (in_array(domain, whiteList)) return '0';
	if (in_array(domain, blackList)) return '1';
	return '-1';
}
function extractDomainFromURL(url) {
	if (!url) return "";
	z = url.substr(url.indexOf("://") + 3);
	z = z.substr(0, z.indexOf("/"));
	z = z.substr(z.indexOf("@") + 1);
	colPos = z.indexOf(":");
	if (colPos >= 0) z = z.substr(0, colPos);
	return z;
}
function domainHandler(domain,action) {
	// Initialize local storage
	if (typeof(localStorage['whiteList'])=='undefined') localStorage['whiteList'] = JSON.stringify([]);
	if (typeof(localStorage['blackList'])=='undefined') localStorage['blackList'] = JSON.stringify([]);
	whiteList = JSON.parse(localStorage['whiteList']);
	blackList = JSON.parse(localStorage['blackList']);
	
	// Remove domain from whitelist and blacklist
	pos = whiteList.indexOf(domain);
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
	// fix hotkey shortcut if in old format (if using + as separator instead of space)
	if (localStorage["hotkey"].indexOf('+') != -1) {
		localStorage["hotkey"] = localStorage["hotkey"].replace(/\+$/, "APLUSA").replace(/\+/g, " ").replace(/APLUSA/, "+");
	}
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
	if (localStorage["enable"] == "true") magician('false', tab.id);
}});
chrome.contextMenus.create({"title": chrome.i18n.getMessage("blacklistdomain"), "contexts": ['browser_action','page_action'], "onclick": function(info, tab){
	if (tab.url.substring(0, 4) != 'http') return;
	domainHandler(extractDomainFromURL(tab.url), 1);
	if (localStorage["enable"] == "true") magician('true', tab.id);
}});
chrome.contextMenus.create({"title": chrome.i18n.getMessage("removelist"), "contexts": ['browser_action','page_action'], "onclick": function(info, tab){
	if (tab.url.substring(0, 4) != 'http') return;
	domainHandler(extractDomainFromURL(tab.url), 2);
	if (localStorage["enable"] == "true")  {
		if (localStorage['newPages'] == 'Cloak' || localStorage['global'] == 'true') flag = 'true';
		else flag = 'false';
		magician(flag, tab.id);
	}
}});

// Called by clicking on the context menu item
function newCloak(info, tab) {
	// Enable cloaking (in case its been disabled) and open the link in a new tab
	localStorage["enable"] = "true";
	// If it's an image, load the "src" attribute
	if (info.mediaType) chrome.tabs.create({'url': info.srcUrl}, function(tab){ cloakedTabs.push(tab.windowId+"|"+tab.id);recursiveCloak('true', localStorage["global"], tab.id); });
	// Else, it's a normal link, so load the linkUrl.
	else chrome.tabs.create({'url': info.linkUrl}, function(tab){ cloakedTabs.push(tab.windowId+"|"+tab.id);recursiveCloak('true', localStorage["global"], tab.id); });
}
// Add context menu item that shows only if you right-click on links/images.
function dpContext(boo) {
	if (boo == 'true' && !contextLoaded) {
		chrome.contextMenus.create({"title": chrome.i18n.getMessage("opensafely"), "contexts": ['link', 'image'], "onclick": function(info, tab){newCloak(info, tab);}});
		contextLoaded = true;
	}
}
// ----- Main Functions
function checkChrome(url) {
	if (url.substring(0, 6) == 'chrome') return true;
	return false;
}
function hotkeyChange() {
	chrome.windows.getAll({"populate":true}, function(windows) {
		for (i=0; i<windows.length; i++) {
			for (x=0; x<windows[i].tabs.length; x++) {
				if (checkChrome(windows[i].tabs[x].url)) continue;
				chrome.tabs.executeScript(windows[i].tabs[x].id, {code: 'hotkeySet("'+localStorage["enableToggle"]+'","'+localStorage["hotkey"]+'","'+localStorage["paranoidhotkey"]+'");', allFrames: true});
			}
		}
	});
}
function optionsSaveTrigger(prevglob, newglob) {
	enable = localStorage["enable"];
	global = newglob;
	if (prevglob == 'true' && newglob == 'false') {
		global = 'true';
		enable = 'false';
	}
	if (global == 'false') {
		for (i=cloakedTabs.length-1; i>=0; --i) {
			magician(enable, parseInt(cloakedTabs[i].split("|")[1]));
		}
		if (enable == 'false') cloakedTabs = [];
	} else recursiveCloak(enable, global);
}
function recursiveCloak(enable, global, tabId) {
	if (global == 'true') {
		chrome.windows.getAll({"populate":true}, function(windows) {
			for (i=0; i<windows.length; i++) {
				for (x=0; x<windows[i].tabs.length; x++) {
					if (checkChrome(windows[i].tabs[x].url)) continue;
					enabletemp = enable;
					dpdomaincheck = domainCheck(extractDomainFromURL(windows[i].tabs[x].url));
					// Ensure whitelisted or blacklisted tabs stay as they are
					if (enabletemp == 'true' && dpdomaincheck == '0') enabletemp = 'false';
					else if (enabletemp == 'false' && dpdomaincheck == '1') enabletemp = 'true';
					dpTabId = windows[i].tabs[x].windowId+"|"+windows[i].tabs[x].id;
					dpcloakindex = cloakedTabs.indexOf(dpTabId);
					dpuncloakindex = uncloakedTabs.indexOf(dpTabId);
					if (enabletemp == 'false') {
						if (dpuncloakindex == -1) uncloakedTabs.push(dpTabId);
						if (dpcloakindex != -1) cloakedTabs.splice(dpcloakindex, 1);
					} else {
						if (dpcloakindex == -1) cloakedTabs.push(dpTabId);
						if (dpuncloakindex != -1) uncloakedTabs.splice(dpuncloakindex, 1);
					}
					magician(enabletemp, windows[i].tabs[x].id);
				}
			}
		});
	} else {
		if (tabId) magician(enable, tabId);
	}
}
function magician(enable, tabId) {
	if (enable == 'true') {
		if (localStorage["disableFavicons"] == 'true' && localStorage["hidePageTitles"] == 'true')
			chrome.tabs.executeScript(tabId, {code: 'init();faviconblank();replaceTitle("'+localStorage["pageTitleText"]+'");titleBind("'+localStorage["pageTitleText"]+'");', allFrames: true});
		else if (localStorage["disableFavicons"] == 'true' && localStorage["hidePageTitles"] != 'true')
			chrome.tabs.executeScript(tabId, {code: 'init();faviconblank();titleRestore();', allFrames: true});
		else if (localStorage["disableFavicons"] != 'true' && localStorage["hidePageTitles"] == 'true')
			chrome.tabs.executeScript(tabId, {code: 'init();faviconrestore();replaceTitle("'+localStorage["pageTitleText"]+'");titleBind("'+localStorage["pageTitleText"]+'");', allFrames: true});
		else if (localStorage["disableFavicons"] != 'true' && localStorage["hidePageTitles"] != 'true')
			chrome.tabs.executeScript(tabId, {code: 'init();faviconrestore();titleRestore();', allFrames: true});
	} else chrome.tabs.executeScript(tabId, {code: "removeCss();", allFrames: true});
	if (localStorage["showIcon"] == 'true') {
		if (enable == 'true') chrome.pageAction.setIcon({path: "img/addressicon/"+dpicon+".png", tabId: tabId});
		else chrome.pageAction.setIcon({path: "img/addressicon/"+dpicon+"-disabled.png", tabId: tabId});
		chrome.pageAction.setTitle({title: dptitle, tabId: tabId});
		chrome.pageAction.show(tabId);
	} else chrome.pageAction.hide(tabId);
}
function dpHandle(tab) {
	if (checkChrome(tab.url)) return;
	if (localStorage["global"] == "true" && domainCheck(extractDomainFromURL(tab.url)) != 1) {
		if (localStorage["enable"] == "true") {
			localStorage["enable"] = "false";
			recursiveCloak('false', 'true');
		} else {
			localStorage["enable"] = "true";
			recursiveCloak('true', 'true');
		}
	} else {
		dpTabId = tab.windowId+"|"+tab.id;
		dpcloakindex = cloakedTabs.indexOf(dpTabId);
		dpuncloakindex = uncloakedTabs.indexOf(dpTabId);
		localStorage["enable"] = "true";
		if (dpcloakindex != -1) {
			if (dpuncloakindex == -1) uncloakedTabs.push(dpTabId);
			cloakedTabs.splice(dpcloakindex, 1);
			magician('false', tab.id);
		} else {
			cloakedTabs.push(dpTabId);
			if (dpuncloakindex != -1) uncloakedTabs.splice(dpuncloakindex, 1);
			magician('true', tab.id);
		}
	}
}
function setDPIcon() {
	dpicon = localStorage["iconType"];
	dptitle = localStorage["iconTitle"];
	chrome.windows.getAll({"populate":true}, function(windows) {
		for (i=0; i<windows.length; i++) {
			for (x=0; x<windows[i].tabs.length; x++) {
				if (cloakedTabs.indexOf(windows[i].tabs[x].windowId+"|"+windows[i].tabs[x].id) != -1) chrome.pageAction.setIcon({path: "img/addressicon/"+dpicon+".png", tabId: windows[i].tabs[x].id});
				else chrome.pageAction.setIcon({path: "img/addressicon/"+dpicon+"-disabled.png", tabId: windows[i].tabs[x].id});
				chrome.pageAction.setTitle({title: dptitle, tabId: windows[i].tabs[x].id});
				if (localStorage["showIcon"] == 'true') chrome.pageAction.show(windows[i].tabs[x].id);
				else chrome.pageAction.hide(windows[i].tabs[x].id);
			}
		}
	});
}
// ----- Request library to support content script communication
chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
	if (changeinfo.status == "loading") {
		dpTabId = tab.windowId+"|"+tabid;
		dpcloakindex = cloakedTabs.indexOf(dpTabId);
		enable = enabled(tab, dpcloakindex);
		if (localStorage["showIcon"] == "true") {
			if (enable == "true") chrome.pageAction.setIcon({path: "img/addressicon/"+dpicon+".png", tabId: tabid});
			else chrome.pageAction.setIcon({path: "img/addressicon/"+dpicon+"-disabled.png", tabId: tabid});
			chrome.pageAction.setTitle({title: dptitle, tabId: tabid});
			chrome.pageAction.show(tabid);
		} else chrome.pageAction.hide(tabid);
		if (checkChrome(tab.url)) return;
		if (enable == "true") {
			if (dpcloakindex == -1) cloakedTabs.push(dpTabId);
			magician('true', tabid);
			if (localStorage["global"] == "false" && localStorage["enable"] == "false") localStorage["enable"] = "true";
		} else {
			if (localStorage["enableStickiness"] == "true") {
				if (tab.openerTabId) {
					if (cloakedTabs.indexOf(tab.windowId+"|"+tab.openerTabId) != -1 && uncloakedTabs.indexOf(dpTabId) == -1) {
						if (domainCheck(extractDomainFromURL(tab.url)) != '0') {
							cloakedTabs.push(dpTabId);
							magician('true', tabid);
						} else uncloakedTabs.push(dpTabId);
					}
				} else {
					chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
						if (cloakedTabs.indexOf(tabs[0].windowId+"|"+tabs[0].id) != -1 && uncloakedTabs.indexOf(dpTabId) == -1) {
							if (domainCheck(extractDomainFromURL(tab.url)) != '0') {
								cloakedTabs.push(dpTabId);
								magician('true', tabid);
							} else uncloakedTabs.push(dpTabId);
						}
					});
				}
			}
		}
	}
});	
chrome.tabs.onRemoved.addListener(function(tabid, windowInfo) {
	dpTabId = windowInfo.windowId+"|"+tabid;
	dpcloakindex = cloakedTabs.indexOf(dpTabId);
	dpuncloakindex = uncloakedTabs.indexOf(dpTabId);
	if (dpcloakindex != -1) cloakedTabs.splice(dpcloakindex, 1);
	if (dpuncloakindex != -1) uncloakedTabs.splice(dpuncloakindex, 1);
});
requestDispatchTable = {
	"get-enabled": function(request, sender, sendResponse) {
		dpTabId = sender.tab.windowId+"|"+sender.tab.id;
		dpcloakindex = cloakedTabs.indexOf(dpTabId);
		enable = enabled(sender.tab, dpcloakindex);
		if (enable == 'true' && dpcloakindex == -1) cloakedTabs.push(dpTabId);
		sendResponse({enable: enable, background: localStorage["s_bg"], favicon: localStorage["disableFavicons"], hidePageTitles: localStorage["hidePageTitles"], pageTitleText: localStorage["pageTitleText"], enableToggle: localStorage["enableToggle"], hotkey: localStorage["hotkey"], paranoidhotkey: localStorage["paranoidhotkey"]});
	},
	"toggle": function(request, sender, sendResponse) {
		if (localStorage["savedsfwmode"] != "") {
			dpTabId = sender.tab.windowId+"|"+sender.tab.id;
			localStorage["sfwmode"] = localStorage["savedsfwmode"];
			localStorage["savedsfwmode"] = "";
			if (localStorage["global"] == "true") recursiveCloak('true', 'true');
			else {
				dpuncloakindex = uncloakedTabs.indexOf(dpTabId);
				if (dpuncloakindex != -1) uncloakedTabs.splice(dpuncloakindex, 1);
				if (cloakedTabs.indexOf(dpTabId) == -1) cloakedTabs.push(dpTabId);
				magician('true', sender.tab.id);
			}
			localStorage["enable"] = "true";
		} else {
			dpHandle(sender.tab);
		}
	},
	"toggleparanoid": function(request, sender, sendResponse) {
		if (localStorage["savedsfwmode"] == "") {
			localStorage["savedsfwmode"] = localStorage["sfwmode"];
			localStorage["sfwmode"] = "Paranoid";
			if (localStorage["global"] == "true") recursiveCloak('true', 'true');
			else {
				dpTabId = sender.tab.windowId+"|"+sender.tab.id;
				dpuncloakindex = uncloakedTabs.indexOf(dpTabId);
				if (dpuncloakindex != -1) uncloakedTabs.splice(dpuncloakindex, 1);
				if (cloakedTabs.indexOf(dpTabId) == -1) cloakedTabs.push(dpTabId);
				magician('true', sender.tab.id);
			}
			localStorage["enable"] = "true";
		} else {
			localStorage["sfwmode"] = localStorage["savedsfwmode"];
			localStorage["savedsfwmode"] = "";
			dpHandle(sender.tab);
		}
	},
	"get-settings": function(request, sender, sendResponse) {
		if (localStorage["font"] == '-Custom-') {
			if (localStorage["customfont"]) fontface = localStorage["customfont"];
			else fontface = 'Arial';
		} else fontface = localStorage["font"];
		if (localStorage["global"] == "false") enable = 'true';
		else enable = enabled(sender.tab);
		sendResponse({enable: enable, sfwmode: localStorage["sfwmode"], font: fontface, fontsize: localStorage["fontsize"], underline: localStorage["showUnderline"], background: localStorage["s_bg"], text: localStorage["s_text"], table: localStorage["s_table"], link: localStorage["s_link"], bold: localStorage["removeBold"], opacity1: localStorage["opacity1"], opacity2: localStorage["opacity2"], collapseimage: localStorage["collapseimage"], maxheight: localStorage["maxheight"], maxwidth: localStorage["maxwidth"]});
	}
}
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.reqtype in requestDispatchTable) requestDispatchTable[request.reqtype](request, sender, sendResponse);
	else sendResponse({});
});
// ----- If page action icon is clicked, either enable or disable the cloak
chrome.pageAction.onClicked.addListener(function(tab) {
	dpHandle(tab);
});
// Execute
setDefaultOptions();
setDPIcon();
if ((!optionExists("version") || localStorage["version"] != version) && localStorage["showUpdateNotifications"] == 'true') {
	chrome.tabs.create({ url: chrome.extension.getURL('updated.html'), selected: false });
	localStorage["version"] = version;
}
dpContext(localStorage["showContext"]);