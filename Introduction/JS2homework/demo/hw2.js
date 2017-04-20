// 封装获取id
function byId(id){
	if(typeof id==="string"){
		return document.getElementById(id);
	}else{
		return id;
	}
}
var bigBox=byId("bigBox");
var header=byId("header");
var spannum=header.getElementsByTagName("span");
console.log(spannum);
var picbox=byId("picbox");
var picnum=picbox.getElementsByTagName("div");//获取图片div的数组
var leng=picnum.length; //获取div的数量

var num=0; 
var timer=null; //放置计时器的变量
// 计时器
function startTime(){
	timer=setInterval(function(){
		num++;
		if(num>=leng){
			num=0;
		}
		changeImg();
	},1000);
}
// 图片轮播函数
function changeImg(){
	for(var i=0;i<leng;i++){
		spannum[i].className="";
		picnum[i].style.display="none";
	}
	spannum[num].className="bgcolor";
	picnum[num].style.display="block";

}
//停止计时器
function stopTime(){
	if(timer){
		clearInterval(timer);
	}
}

function allthink(){
	// 鼠标调用事件
	bigBox.onmouseover=function(){
		stopTime();
	}
	bigBox.onmouseout=function(){
		startTime();
	}
	bigBox.onmouseout();
	//点击选项卡事件
	for(j=0;j<leng;j++){    //遍历点击事件
		spannum[j].setAttribute("number",j);
		spannum[j].onclick=function(){
			 var ber=this.getAttribute("number");//鼠标滑过获取number的属性
			num=ber;
			changeImg();
		}
	}
	

}
allthink();