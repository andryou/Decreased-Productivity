document.addEventListener('DOMContentLoaded', function () {
	$(".i18_dpoptions").click(function() { location.href='options.html'; });
	$(".i18_close").click(closeOptions);
	i18load();
});
function closeOptions() {
	window.open('', '_self', '');window.close();
}
var version = (function () {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', chrome.extension.getURL('manifest.json'), false);
	xhr.send(null);
	return JSON.parse(xhr.responseText).version;
}());
function i18load() {
	$("#title").html("Decreased Productivity v"+version);
	$(".i18_dpoptions").val(chrome.i18n.getMessage("dpoptions"));
	$(".i18_close").val(chrome.i18n.getMessage("close"));
	$(".i18_people").html(chrome.i18n.getMessage("people"));
	$(".i18_translators").html(chrome.i18n.getMessage("translators"));
	$(".i18_help").html(chrome.i18n.getMessage("help"));
	$(".i18_support").html(chrome.i18n.getMessage("support"));
	$(".i18_supportimg").attr({alt: chrome.i18n.getMessage("support"), title:  chrome.i18n.getMessage("support")});
}