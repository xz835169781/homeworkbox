$(function(){
	var imgs=$('.picbox').find('img');
	var dotschild=$('.dots').find('span');
	var imgleng=imgs.length;
	var num=0;
	var timer=null;
	// 计时器
	function changeTime(){
		timer=setInterval(function(){
			num++;
			if(num>=imgleng){
				num=0;
			}
		changPic();
		},1500)
	}
	//停止计时器
	function stopTime(){
		if(timer){
			clearInterval(timer);
		}
	}
	// 切换图片操作
	function changPic(){
		for(var i=0;i<imgleng;i++){
			dotschild[i].className="";
			imgs[i].style.display='none';
		}
		dotschild[num].className="active";
		imgs[num].style.display='block';
	}
	// 鼠标离开计时器运作
	$('.picbox').mouseleave(function(){
		changeTime();
	});
	//鼠标经过停止
	$('.picbox').mouseenter(function(){
		stopTime();
	});
	$('.picbox').mouseleave();
	//选项卡切换上下张
	$('.prev').on('click',function(){
		num--;
		if(num<0){
			num=imgleng-1;
		}
		changPic();
	})
	$('.next').on('click',function(){
		num++;
		if(num>=imgleng){
			num=0;
		}
		changPic();
	})
	//小圆点按钮点击事件
		$('.dots').on('click','span',function(){
			num=$(this).index();
			changPic();
		});


});