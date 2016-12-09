// ==UserScript==
// @name        链接附加提取码
// @author      billypon
// @description 生成分享链接时自动附加提取码
// @version     1.0.0
// @namespace   http://www.canaansky.com/
// @match       http://pan.baidu.com/disk/*
// @match       https://pan.baidu.com/disk/*
// @run-at      document-idle
// @grant       GM_setClipboard
// ==/UserScript==

function listen(dialog, button, url, code) {
	var handler = function (event) {
		var target = event.target, list = target.classList;
		if (!list || !list.contains(dialog))
			return;
		console.info("dialog:", target);
		removeEventListener("DOMNodeInserted", handler);
		setTimeout(function () {
			button = target.querySelector(button);
			url = target.querySelector(url);
			code = target.querySelector(code);
			if (button && url && code) {
				console.info("elements:", button, url, code);
				button.addEventListener("click", function () {
					console.info("url:", url.value);
					console.info("code", code.value);
					setTimeout(function () {
						GM_setClipboard(url.value + "#" + code.value);
					});

				});
			}
		});
	}
	addEventListener("DOMNodeInserted", handler);
}

var domain = location.hostname.match(/\w+\.\w+$/)[0];
console.info("domain:", domain);
switch (domain) {
	case "baidu.com":
		listen("dialog-share", "#copyShare", ".share-url", ".share-password");
		break;
}

