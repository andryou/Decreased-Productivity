// (c) Andrew
// Icon by dunedhel: http://dunedhel.deviantart.com/
// Supporting functions by AdThwart - T. Joseph
var origtitle;
var postloaddelay;
var timestamp = Math.round(new Date().getTime()/1000.0);
function addCloak(sfw, f, fsize, u, bg, text, table, link, bold, o1, o2, collapseimage) {
	if (!jQuery("style[__decreased__='productivity']").length) {
		// Inject CSS into page
		var cssinject  = document.createElement("style");
		cssinject.setAttribute("__decreased__", "productivity");
		
		var curlocation = document.location.href;
		var boldcss = '';
		var fontType = '';
		
		// If the font isn't Calibri, make it 10pt
		//if (f != 'Calibri') fsize='10';
		if (f != 'Serif' && f != 'Monospace' && f != '-Unchanged-') f = '"' + f + '", sans-serif';
		if (f != '-Unchanged-') fontType = 'font-size: ' + fsize + 'px !important; font-family: ' + f + ' !important; h1, h2, h3, h4, h5, h6, h7, h8 { font-size: ' + fsize + 'px !important; font-weight: bold !important; } ';
		
		if (bold == 'true') boldcss = 'font-weight: normal !important; ';
		
		// The code that does the magic
		var magic = 'html, html *, html *[style], body *:before, body *:after { background-color: #' + bg + ' !important; border-color: #' + table + ' !important; border-collapse: collapse !important; color: #' + text + ' !important; stroke: #' + text + ' !important; fill: #' + bg + ' !important; ' + fontType + 'text-decoration: none !important; -webkit-filter: initial !important; box-shadow: none !important; -webkit-box-shadow: none !important; text-shadow: none !important; ' + boldcss + '} ';
		if (curlocation.match(/^https?:\/\/www\.facebook\.com\//i)) {
			magic += 'html, html *:not(.img), body *:not(.img):before, body *:not(.img):after { background-image: none !important; } ';
			magic += '*:after { content: initial !important; }  ';
			if (sfw == 'SFW' || sfw == 'SFW1' || sfw == 'SFW2') magic += 'i.img { opacity: '+o1+' !important; } i.img:hover { opacity: '+o2+' !important; } ';
			else if (o1 == 0 && collapseimage == 'true') magic += 'i.img { display: none !important; } ';
			else if (sfw == 'Paranoid') magic += 'i.img { visibility: hidden !important; opacity: 0 !important; } ';
		} else {
			magic += 'html, html *, body *:before, body *:after { background-image: none !important; } ';
		}
		if (curlocation.match(/^https?:\/\/www\.engadget\.com\//i)) {
			magic += 'html, html *, html *[style], body *:before, body *:after { border-width: 0px !important; }';
		} else {
			magic += 'html, html *, html *[style], body *:before, body *:after { border-width: 1px !important; }';
		}
		magic += 'input[type=text],input[type=password],input[type=file],input[type=search],textarea,input[type=button],input[type=submit],#lastpass-notification button[type="button"] { border: 1px dotted #' + table + ' !important; background-color: #' + bg + ' !important; color: #' + text + ' !important; } html::selection, html *::selection { background: #888888 !important; color: #fff !important; } a { color: #' + link + ' !important; text-decoration: ';
		
		if (u == 'true') magic += 'underline !important; }';
		else magic += 'none !important; }';
		
		if (sfw == 'SFW' || sfw == 'SFW1' || sfw == 'SFW2') {
			if (o1 == 0 && collapseimage == 'true') magic += ' iframe, img, input[type=image], path, polygon { display: none !important; }';
			else magic += ' iframe, img, input[type=image], path, polygon { opacity: '+o1+' !important; } iframe:hover, img:hover, input[type=image]:hover, path:hover, polygon:hover { opacity: '+o2+' !important; }';
		}
		if (sfw == 'SFW') {
			if (o1 == 0 && collapseimage == 'true') magic += ' object, embed, param, video, audio { display: none !important; }';
			else magic += ' object, embed, param, video, audio { opacity: '+o1+' !important; } object:hover, embed:hover, param:hover, video:hover, audio:hover { opacity: '+o2+' !important; }';
		}
		if (sfw == 'SFW1') magic += ' object, embed, param, video, audio { display: none !important; opacity: 0 !important; }';
		if (sfw == 'Paranoid') magic += ' iframe, img, input[type=image], path, polygon, object, embed, param, video, audio { display: none !important; opacity: 0 !important; }';
		
		magic += ' .dp'+timestamp+'_visible { visibility: visible !important; opacity: 1 !important; }';
		magic += ' .dp'+timestamp+'_unbold { font-weight: normal !important }';
		magic += ' .dp'+timestamp+'_link { color: #'+link+' !important; background-color: #'+bg+' !important; background-image: none !important; }';
		magic += ' .dp'+timestamp+'_text { color: #'+text+' !important; background-color: #'+bg+' !important; background-image: none !important; }';
		magic += ' .dp'+timestamp+'_hide { display: none !important }';
		
		if (curlocation.match(/^https?:\/\/www\.facebook\.com\//i)) {
			magic += " ._52c6, ._5ine, .__cy, .fbPhotosPhotoTagboxes, ._jfi, ._5vb_ ._5aqh::before { position: initial !important; } "; // fix link caption, event cover photo, full-screen photo mode (._jfi = uploaded image thumbnail), instagram
			magic += " ._4zoz._4zoz._4zoz, ._559p { clear: both !important; } "; // fix main timeline post status box
		}
		else if (curlocation.match(/^https?:\/\/www\.instagram\.com\//i)) {
			magic += " ._ovg3g, ._njmhc { position: initial !important; } ._sppa1 { display: none !important; } ";
		}
		else if (curlocation.match(/^https?:\/\/www\.youtube\.com\//i)) {
			magic += " .like-button-renderer-like-button:before, .like-button-renderer-dislike-button:before { content: '' !important; } ";
		}
		else if (curlocation.match(/^https?:\/\/web\.whatsapp\.com\//i)) {
			magic += " .message-in { float: none !important; } "; // fix incoming message display
			magic += " .msg { clear: both !important; } "; // fix outgoing message display
			magic += " .message-meta { position: initial !important; } "; // fix message timestamping
			magic += ' .bubble { border: 1px dotted #' + table + ' !important; } '; // distinguish bubbles
			magic += ' .drawer-manager, .drawer-manager > .pane { background-color: transparent !important; } '; // fix white screen bug
		}	
		else if (curlocation.match(/^https?:\/\/twitter\.com\//i)) {
			magic += " .QuoteTweet, .QuoteTweet *, #playerContainer, #playerContainer * { background-color: transparent !important; } ";
			if (sfw != 'Paranoid' && sfw != 'SFW1') magic += " #playerContainer video { opacity: 1 !important; } ";
			magic += " .Grid--withGutter>.Grid-cell { margin-right: -1px !important; margin-left: -1px !important; } ";
		}
		else if (curlocation.match(/^https?:\/\/plus\.google\.com\//i)) {
			magic += " .x2 { position: initial !important; } ";
		}
		else if (curlocation.match(/^https?:\/\/www\.engadget\.com\//i)) {
			magic += " .o-hit { cursor: initial !important; } ";
			magic += " .o-hit .o-hit__link { position: initial !important; } ";
		}
		else if (curlocation.match(/^https?:\/\/.*\.?((lifehack|gawk)er|deadspin|jalopnik|gizmodo|jezebel|kotaku)\.com\//i)) {
			magic += " .img-border:after { position: initial !important; } ";
		}
		else if (curlocation.match(/^https?:\/\/www\.reddit\.com\//i)) {
			magic += ' .res-nightmode #header-bottom-right { background-color: #' + bg + ' !important; border-color: #' + table + ' !important; } ';
			magic += ' .RES-keyNav-activeElement, .RES-keyNav-activeElement .md-container, .res-commentBoxes .comment, .res-commentBoxes .comment .comment, .res-commentBoxes .comment .comment .comment, .res-commentBoxes .comment .comment .comment .comment, .res-commentBoxes .comment .comment .comment .comment .comment, .res-commentBoxes .comment .comment .comment .comment .comment .comment, .res-commentBoxes .comment .comment .comment .comment .comment .comment .comment, .res-commentBoxes .comment .comment .comment .comment .comment .comment .comment .comment, .res-commentBoxes .comment .comment .comment .comment .comment .comment .comment .comment .comment, .res-commentBoxes .comment .comment .comment .comment .comment .comment .comment .comment .comment .comment  { background-color: #' + bg + ' !important; border-color: #' + table + ' !important; } ';
			magic  += ' .res-nightmode .link, .res-nightmode .RES-keyNav-activeElement, .res-nightmode .RES-keyNav-activeElement .md-container, .res-nightmode.res-commentBoxes .comment, .res-nightmode.res-commentBoxes .comment .comment, .res-nightmode.res-commentBoxes .comment .comment .comment, .res-nightmode.res-commentBoxes .comment .comment .comment .comment, .res-nightmode.res-commentBoxes .comment .comment .comment .comment .comment, .res-nightmode.res-commentBoxes .comment .comment .comment .comment .comment .comment, .res-nightmode.res-commentBoxes .comment .comment .comment .comment .comment .comment .comment, .res-nightmode.res-commentBoxes .comment .comment .comment .comment .comment .comment .comment .comment, .res-nightmode.res-commentBoxes .comment .comment .comment .comment .comment .comment .comment .comment .comment, .res-nightmode.res-commentBoxes .comment .comment .comment .comment .comment .comment .comment .comment .comment .comment { background-color: #' + bg + ' !important; border-color: #' + table + ' !important; } ';
			magic += ' .res-nightmode #header-bottom-right a, .res-nightmode a.title, .res-nightmode a.title:visited, .res-nightmode .RES-keyNav-activeElement > .tagline, .res-nightmode .RES-keyNav-activeElement .md-container > .md, .res-nightmode .RES-keyNav-activeElement .md-container > .md p, .res-nightmode #search input[type="text"] { color: #' + text + ' !important; } ';
			magic += ' .usertext-edit textarea { border: 1px dotted #' + table + ' !important; } ';
		}
		cssinject.innerText = magic;
		document.documentElement.appendChild(cssinject, null);
	}
	removeCss('initialstealth');
}
function dpPostLoad(dpheight, dpwidth, sfwmode, bold) {
	if (bold == 'true') {
		jQuery("a:not([__decreased__])").addClass('dp'+timestamp+'_link dp'+timestamp+'_unbold').attr('__decreased__', 'link');
		jQuery("body *:not([__decreased__])").addClass('dp'+timestamp+'_text dp'+timestamp+'_unbold').attr('__decreased__', 'element');
	} else {
		jQuery("a:not([__decreased__])").addClass('dp'+timestamp+'_link').attr('__decreased__', 'link');
		jQuery("body *:not([__decreased__])").addClass('dp'+timestamp+'_text').attr('__decreased__', 'element');
	}
	if (dpwidth > 0 && dpheight > 0) {
		jQuery("img:not([__decreased__])").each(function() {
			jQuery(this).attr('__decreased__', 'image');
			if (this.width <= dpwidth && this.height <= dpheight)
				jQuery(this).addClass('dp'+timestamp+'_visible');
			else
				if (sfwmode == "Paranoid") jQuery(this).addClass('dp'+timestamp+'_hide');
		});
	}
}
function removeCss(name) {
	jQuery("style[__decreased__='"+name+"']").remove();
	if (name == 'productivity') {
		faviconrestore();
		jQuery('title').unbind('DOMSubtreeModified.decreasedproductivity');
		jQuery('body').unbind('DOMSubtreeModified.decreasedproductivity');
		if (origtitle) document.title = origtitle;
		jQuery("[__decreased__]").each(function() {
			jQuery(this).removeClass('dp'+timestamp+'_visible dp'+timestamp+'_unbold dp'+timestamp+'_link dp'+timestamp+'_text dp'+timestamp+'_hide').removeAttr("__decreased__");
		});
	}
}
function init() {
	chrome.extension.sendRequest({reqtype: "get-settings"}, function(response) {
		if (response.enable == "true") {
			addCloak(response.sfwmode, response.font, response.fontsize, response.underline, response.background, response.text, response.table, response.link, response.bold, response.opacity1, response.opacity2, response.collapseimage);
			dpPostLoad(response.maxheight, response.maxwidth, response.sfwmode, response.bold);
			jQuery('body').unbind('DOMSubtreeModified.decreasedproductivity');
			jQuery('body').bind('DOMSubtreeModified.decreasedproductivity', function() {
				clearTimeout(postloaddelay);
				postloaddelay = setTimeout(function(){ dpPostLoad(response.maxheight, response.maxwidth, response.sfwmode, response.bold) }, 500);
			});
		}
	});
}
// Favicon.js - Change favicon dynamically [http://ajaxify.com/run/favicon].
// Copyright (c) 2006 Michael Mahemoff
// Modifications - Andrew Y.
function faviconblank() {
	var link = document.createElement("link");
	link.type = "image/x-icon";
	link.rel = "shortcut icon";
	link.id = "decreasedproductivity"+timestamp;
	link.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oFFAADATTAuQQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAEklEQVQ4y2NgGAWjYBSMAggAAAQQAAGFP6pyAAAAAElFTkSuQmCC'; // transparent png
	faviconclear();
	document.getElementsByTagName("head")[0].appendChild(link);
}
function faviconclear() {
	jQuery("link[rel='shortcut icon'], link[rel='icon']").each(function() {
		jQuery(this).attr('data-rel', jQuery(this).attr('rel')).removeAttr('rel');
	});
}
function faviconrestore() {
	jQuery("link#decreasedproductivity"+timestamp).remove();
	jQuery("link[data-rel='shortcut icon'], link[data-rel='icon']").each(function() {
		jQuery(this).attr('rel', jQuery(this).attr('data-rel')).removeAttr('data-rel');
	});
}
// Favicon Blanking Code END
function replaceTitle(text) {
	if (document.title != text) {
		if (document.title && !origtitle) origtitle = document.title;
		document.title=text;
	}
}
function titleBind(text) {
	jQuery('title').unbind('DOMSubtreeModified.decreasedproductivity');
	jQuery('title').bind('DOMSubtreeModified.decreasedproductivity', function() {
		replaceTitle(text);
	});
}
// Initially hide all elements on page (injected code is removed when page is loaded)
chrome.extension.sendRequest({reqtype: "get-enabled"}, function(response) {
	if (response.enableToggle == 'true') {
		jQuery(document).ready(function() {
			var listener = new window.keypress.Listener();
			listener.simple_combo(response.hotkey, function() {
				chrome.extension.sendRequest({reqtype: "toggle"});
			});
		});
	}
	if (response.enable == "true") {
		if (response.favicon == 'true') faviconblank();
		if (response.hidePageTitles == 'true') {
			replaceTitle(response.pageTitleText);
			titleBind(response.pageTitleText);
		}
		var stealth = document.createElement("style");
		stealth.setAttribute("__decreased__", "initialstealth");
		stealth.innerText += "html, html *, html *[style], body *:before, body *:after { background-color: #" + response.background + " !important; background-image: none !important; background: #" + response.background + " !important; } html * { visibility: hidden !important; }";
		document.documentElement.appendChild(stealth, null);
		init();
	}
});