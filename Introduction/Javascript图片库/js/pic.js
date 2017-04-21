function showPic(whichPic){
	if(!document.getElementById("place")) return false;
	var sourse=whichPic.getAttribute("href");
	var place=document.getElementById("place");
	place.setAttribute("src",sourse);

	if(document.getElementById("description")){
		var description=document.getElementById("description");

		if(whichPic.getAttribute("title")){
			var text=whichPic.getAttribute("title");
		}else{
			var text="";
		}
		if(description.firstChild.nodeType==3){  //文本节点的属性值是3 元素节点为1，属性节点为2
			description.firstChild.nodeValue=text;
		// description.chiildNodes[0].nodeValue=text; 与上面等价。寻找第一个子元素的值
		}
	}
	return true;
}
function onClickA(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("ulbox")) return false;

	var gallery=document.getElementById("ulbox");
	var links=gallery.getElementsByTagName("a");

	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			showPic(this);
			return !showPic(this);
		}
	}
}

function preparePlace(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("ulbox")) return false;


	var pic=document.createElement("img");
	pic.setAttribute("id","place");
	pic.setAttribute("src","imges/q10.jpg");
	pic.setAttribute("alt","my image gallery");

	var para=document.createElement("p");
	para.setAttribute("id","description");
	var txt=document.createTextNode("Choose an image.");
	para.appendChild(txt);

	var gallery=document.getElementById("ulbox"); 
	insertAfter(pic,gallery);
	insertAfter(para,pic);

	// gallery.parentNode.insertBefore(pic,gallery);   //把一个新元素插入到一个现有元素的前面
	// gallery.parentNode.insertBefore(para,gallery);


}

function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

// 在需要绑定的函数不多的时候使用
 /*window.onload=function(){
 	onClickA();
 } */

 // 封装一个函数,参数为打算在页面加载完毕时执行的函数的名字;
 function addLoadEvent(func){
 	var oldonload=window.onload;
 	if(typeof window.onload!='function'){
 		window.onload=func;
 	}else{
 		window.onload=function(){
 			oldonload();
 			func();
 		}
 	}
 }
 addLoadEvent(onClickA);
 addLoadEvent(preparePlace);
