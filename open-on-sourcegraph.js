// ==UserScript==
// @name        用Sourcegraph浏览Github项目
// @author      billypon
// @description 浏览github项目的时候添加sourcegraph的链接
// @version     1.0.2
// @namespace   http://www.canaansky.com/
// @match       https://github.com/*/*
// @run-at      document-idle
// ==/UserScript==

const actions = document.querySelector('.pagehead-actions');
if (actions) {
	const button = document.createElement('button');
	button.className = 'btn btn-sm';
	button.innerHTML = '<svg viewBox="0 0 40 40" style="height: 16px; vertical-align: text-bottom"><g fill="none" fill-rule="evenodd"><path d="M11.5941935,5.12629921 L20.4929032,36.888189 C21.0909677,39.0226772 23.3477419,40.279685 25.5325806,39.6951181 C27.7190323,39.1105512 29.0051613,36.9064567 28.4067742,34.7722835 L19.5064516,3.00944882 C18.9080645,0.875590551 16.6516129,-0.381732283 14.4667742,0.203149606 C12.2822581,0.786771654 10.9958065,2.99149606 11.5941935,5.12598425 L11.5941935,5.12629921 Z" fill="#F96316"></path><path d="M28.0722581,5.00598425 L5.7883871,29.5748031 C4.28516129,31.2314961 4.44225806,33.7647244 6.13741935,35.2327559 C7.83258065,36.7004724 10.4245161,36.5474016 11.9277419,34.8913386 L34.2116129,10.3228346 C35.7148387,8.66614173 35.5577419,6.13385827 33.8625806,4.66551181 C32.1667742,3.19653543 29.5741935,3.34992126 28.0722581,5.00566929 L28.0722581,5.00598425 Z" fill="#B200F8"></path><path d="M2.82258065,18.6204724 L34.6019355,28.8866142 C36.7525806,29.5811024 39.0729032,28.4412598 39.7841935,26.3395276 C40.4970968,24.2381102 39.3293548,21.9716535 37.1777419,21.2762205 L5.39935484,11.0110236 C3.24774194,10.3159055 0.928387097,11.455748 0.216774194,13.5574803 C-0.494193548,15.6588976 0.673548387,17.9259843 2.82322581,18.6204724 L2.82258065,18.6204724 Z" fill="#00B4F2"></path></g></svg>';
	button.onclick = function () {
		const array = location.pathname.split('/');
		if (array.length) {
			const menu = document.querySelector('#branch-select-menu .btn');
			const target = menu && menu.title && menu.title.indexOf('/') > 0 ? menu.title : array[4];
			if (target) {
				array.splice(3, target.split('/').length + 1, '-', array[3]);
				array[2] += `@${ target }`;
			}
		}
		location.href = `https://sourcegraph.com/github.com${ array.join('/') }`;
	}

	const action = document.createElement('li');
	action.append(button);

	actions.prepend(action);
}

