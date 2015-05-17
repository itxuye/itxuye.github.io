var i = 0, got = -1, len = document.getElementsByTagName('script').length;
while ( i <= len && got == -1){
	var js_url = document.getElementsByTagName('script')[i].src,
	got =  '/assets/themes/njupt/js/bg.js' ; i++ ;
}
var bg_src=new Array(),
	bg_img=new Image(),bg_img2=new Image(),
	bg_new_img=new Image(),bg_new_img2=new Image(),
	bg=$('<div id=bg/>'),bg2=$('<div id=bg2/>'),
	bg1=$('<div id=bg1/>'),
	next_img=$('<div id=next_img/>'),
	index,slider;

function Ajax_bg_src(){
	jQuery.ajax({
		type:'GET',
		url: '/bg.txt' ,
		success:function(data){
			bg_src=data.split('<!--bg_src-->');
			//alert(bg_src);
			background();//获取地址成功显示
		}
    });
}
function bg_image_pos(W,o,o_img,bg_new_img){
	var LH=bg_new_img.height/bg_new_img.width*W.width(),//对firefox，汗~~啊
		LW=bg_new_img.width/bg_new_img.height*W.height();
	if(LH>=W.height()){
		$(o_img).css({
			'width':W.width(),
			'height':LH
		});
		o.css({
			'margin-left':0,
			'margin-top':(W.height()-LH)/2//垂直居中
		});
		
	}else{
		$(o_img).css({
			'height':W.height(),
			'width':LW
		});
		o.css({
			'margin-top':0,
			'margin-left':(W.width()-LW)/2//水平居中
		});
	}
}
function background_slides(){
	if(index<bg_src.length-1){//下一张图片地址
		index+=1;
	}else{
		index=0;
	}
	bg_new_img2.src="";//重要,没这句会出现空白
	bg_new_img2.src=bg_src[index];
	bg_new_img2.onload=function(){//图片载入成功事件
		$('#bg2')[0]||($('body').append(bg2),
		$('#bg2').append(bg_img2));
		$('#bg').animate({opacity:0},2000);
		$('#bg2').animate({opacity:0},0);//第一次消失
		bg_img2.src=bg_new_img2.src;
		bg_image_pos($(window),$('#bg2'),bg_img2,bg_new_img2);//定位
		$('#bg2').animate({opacity:1},2000);
	};
	slider = setTimeout(function(){
		background_slides2();
	},30000);
}
function background_slides2(){
	if(index<bg_src.length-1){//下一张图片地址
		index+=1;
	}else{
		index=0;
	}
	bg_new_img.src="";//重要,没这句会出现空白
	bg_new_img.src=bg_src[index];
	bg_new_img.onload=function(){//图片载入成功事件
		$('#bg2').animate({opacity:0},2000);
		bg_img.src=bg_new_img.src;
		bg_image_pos($(window),$('#bg'),bg_img,bg_new_img);//定位
		$('#bg').animate({opacity:1},2000);
	};
	slider = setTimeout(function(){
		background_slides();
	},30000);
}
function background(){//背景
	index = Math.floor(Math.random() * bg_src.length);//伪随机获取图片地址
	bg_new_img.src="";//重要,没这句会出现空白
	bg_new_img.src=bg_src[index];
	bg_new_img.onload=function(){//图片载入成功事件
		$('#bg')[0]||($('body').append(bg).append(bg1),
		$('#bg').append(bg_img));
		$('#bg').animate({opacity:0},0,function(){
			bg_img.src=bg_new_img.src;
			bg_image_pos($(window),$('#bg'),bg_img,bg_new_img);//定位
			$('#bg').animate({opacity:1},2000);
		});
		$(window).resize(function(){//改变窗口调整大小
			bg_image_pos($(window),$('#bg'),bg_img,bg_new_img);
			bg_image_pos($(window),$('#bg2'),bg_img2,bg_new_img2);
		});
	};
	if(bg_src.length>1){
		$('body').append(next_img);
		$('#next_img').text('下一张背景');
		$('#next_img').bind("click",function(){
			next();
		});
		slider = setTimeout(function(){
			background_slides();
		},30000);
	}
}
function next(){
	//alert(1);
	clearTimeout(slider);
	$('#bg').remove();
	$('#bg2').remove();
	background();
}
$(document).ready(function () {
	Ajax_bg_src();
	
})
