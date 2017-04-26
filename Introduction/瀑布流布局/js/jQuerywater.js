var data=[{
	"src":"1.jpg",
	"title":"第一张图片"
},
{
	"src":"2.jpg",
	"title":"第二张图片"	
},
{
	"src":"3.jpg",
	"title":"第三张图片"
},
{
	"src":"4.jpg",
	"title":"第四张图片"
},
{
	"src":"5.jpg",
	"title":"第五张图片"
},
{
	"src":"6.jpg",
	"title":"第六张图片"
},
{
	"src":"7.jpg",
	"title":"第七张图片"
},
{
	"src":"8.jpg",
	"title":"第八张图片"
},
{
	"src":"9.jpg",
	"title":"第九张图片"
},
{
	"src":"10.jpg",
	"title":"第十张图片"
},
{
	"src":"11.jpg",
	"title":"第十一张图片"
},
{
	"src":"12.jpg",
	"title":"第十二张图片"
},
{
	"src":"13.jpg",
	"title":"第十三张图片"
},
{
	"src":"14.jpg",
	"title":"第十四张图片"
},
{	
	"src":"15.jpg",
	"title":"第十五张图片"
}]


$(document).ready(function(event){
	//获取容器与盒子
	var wrap = $('#wrap');
	var boxes = $('#wrap').children('div');
	waterfall(wrap,boxes);

	// 触发滚动条函数
	$(this).scroll(function(event){
		appendBox(wrap,boxes);
	});
});


function waterfall(wrap,boxes){
	// 获取屏幕可以显示的列数
	var boxWidth = boxes.eq(0).width() + 40;
	var windowWidth=$(window).width();
	var colsNumber = Math.floor(windowWidth/boxWidth);

	//设置容器的宽度
	wrap.width(boxWidth * colsNumber);

	//定义一个数组并存储每一列的高度
	var everyHeight=new Array();
	for(var i =0;i<boxes.length;i++){
		if(i < colsNumber){
			everyHeight[i] = boxes.eq(i).height() + 40;
		}else{
			//获取最小列的高度
			var minHeight = Math.min.apply(null,everyHeight);
			//获得最小列的索引
			var minIndex = getIndex(minHeight,everyHeight);
			var leftValue = boxes.eq(minIndex).position().left;
			//设置盒子样式
			setStyle(boxes.eq(i),minHeight,leftValue,i);
			// 更新最小列的高度
			everyHeight[minIndex]+=boxes.eq(i).height()+40;
		};
		//鼠标经过实现半透明的交互效果
		boxes.eq(i).hover(function(event){
			$(this).stop().animate({
				'opacity' : '0.5'
			},500);
		},function(event){
			$(this).stop().animate({
				'opacity' : '1'
			},500);
		});
	}
}

//获取最小列的索引
function getIndex(minHeight,everyHeight){
	for(index in everyHeight){
		if(everyHeight[index]==minHeight){
			return index;
		}
	}
}

getStartNumber=0;
//设置追加盒子的样式
function setStyle(box,top,left,index){
	if(getStartNumber>=index){
		return false;
	};
	box.css({
		'position':'absolute',
		'top':top,
		'left':left,
		'opacity' :'0'
	}).stop().animate({
		'opacity' :'1'
	},1000);
	getStartNumber = index;
};

//追加盒子函数
function appendBox(wrap){
	if(getCheck(wrap)){
			for(i in data){
			var innerString = '<div><img src="image/'+ data[i].src+'" alt="5"><a href="http://www.imooc.com" target="_blank">'+ data[i].title +'</a></div>';
			wrap.append(innerString);
		};
	}else {
		return false;
	};
	waterfall(wrap,wrap.children('div'));
};

//数据请求检验，检查是否追加
function getCheck(wrap){
	//获取文档高度
	var documentHeight = $(window).height();
	//获取文档向上滚动的高度；
	var scrollHeight = $(window).scrollTop();
	console.log(scrollHeight);

	//获取最后一个盒子所在列的总高度
	var boxes = wrap.children('div')
	var lastBoxTop = boxes.eq(boxes.length-1).offset().top;
	var lastHeight = boxes.eq(boxes.length-1).height()+20;
	//最后盒子所在列的总高度
	var lastColHeight = lastBoxTop + lastHeight;

	return documentHeight + scrollHeight >=lastColHeight ? true : false;
}