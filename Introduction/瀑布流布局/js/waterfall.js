function waterfall(wrap,boxes){
	// 获取盒子的宽度，因为每个盒子的宽度相同，所以只需要获取第一个盒子的宽度
	//offsetWidth取不到盒子的外边距
	var boxWidth = boxes[0].offsetWidth + 20;
	// 获取浏览器内部宽度,不包括滚动条和工具栏
	var windowWidth = document.documentElement.clientWidth;
	// 获取一行可以放多少列,并向下取整
	var colsNumber = Math.floor(windowWidth / boxWidth);


	// 设置容器的宽度
	wrap.style.width = boxWidth * colsNumber + 'px';

	//定义一个数组并存储每一列的高度
	var everyHeight = new Array();

	// 用循环获取每一列的高度
	for(var i=0;i<boxes.length;i++){
		// 如果i小于列数，就把每一列的高度放入数组,数组的长度等于列数
		if(i<colsNumber){
			everyHeight[i] = boxes[i].offsetHeight + 20;
		// 当i大于列数的时候，开始控制定位盒子，找出最小高度	
		} else{
			var minHeight = Math.min.apply(null,everyHeight);
			// 找出左边距，先找出最小高度盒子的位置，即它的索引
			var minIndex = getIndex(minHeight,everyHeight);
			//找到最小高度和索引，开始找左边距
			var leftValue = boxes[minIndex].offsetLeft - 10;

			boxes[i].style.position='absolute';
			boxes[i].style.top=minHeight + 'px';
			boxes[i].style.left=leftValue + 'px';

			everyHeight[minIndex]+=boxes[i].offsetHeight + 20;
		}
	} 
}
//获取最小列的索引
function getIndex(minHeight,everyHeight){
	for(index in everyHeight){
		if(everyHeight[index] == minHeight){
			return index;
		}
	}
}

window.onload=function(){
	var wrap=document.getElementById("wrap");
	var boxes=wrap.getElementsByTagName("div");

	waterfall(wrap,boxes);
}