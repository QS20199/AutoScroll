var timer;
var speed = document.getElementById("speed");
var btn = document.getElementById("ctrl-btn");
var count = 0;
// speed.value = 30; //default

//状态初始化
chrome.storage.local.get(function(ret) {
	speed.value = ret.speed || 30; //default
	if (ret.status == "on") {
		btn.innerHTML = "已启用";
		btn.dataset.status = "on";
		btn.classList.add("btn-success");
	} else {
		//保持原有即可
	}
})

//事件绑定
btn.addEventListener("click", function(event) {
	this.classList.toggle('btn-success');
	if (this.dataset.status == "on") { //本身已启用
		this.innerHTML = '已停用';
		this.dataset.status = "off";
		chrome.storage.local.set({status: "off"});
	} else {
		this.innerHTML = "已启用";
		this.dataset.status = "on";
		chrome.storage.local.set({status: "on"});
	}

	chrome.runtime.getBackgroundPage(function(win){
		win.changeAnimate("turn " + btn.dataset.status);
	})
}, false)

setInterval(function() {
	//循环检查speed值写入storage.不用onchange是因为onchange只有onmouseup的时候才触发,体验不好
	chrome.storage.local.set({speed: speed.value});
}, 100);

var animate = function() {
	count += speed.value / 100;
	if (count > 1) {
		chrome.tabs.executeScript({
			code: 'document.body.scrollTop += ' + count
		});
		count -= Math.floor(count);
	}
}

// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//   console.log(response.farewell);
// });

// runtime.getBackgroundPage.