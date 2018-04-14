
			$(document).ready(function() {
				$('#fullpage').fullpage({
					scrollingSpeed: 400,

					afterRender: function(){
							$(document).snowfall('clear');
					        $(document).snowfall({
					            image: "image/huaban.png",
					            flakeCount:30,
					            minSize: 5,
					            maxSize: 22
					        });
					},

					afterLoad: function(anchorLink, index){
						if(index == 1){
							$(document).snowfall('clear');
					        $(document).snowfall({
					            image: "image/huaban.png",
					            flakeCount:30,
					            minSize: 5,
					            maxSize: 22
					        });
						}
						if(index == 2){
							$(document).snowfall('clear');
							$(document).snowfall({
								image: "image/flake.png",
								flakeCount: 30,
								minSize: 5,
								maxSize: 22
							});
							
							// $('.sec2').find('div.words').delay(500).animate({
							// 		left: '+=500px'
							// 	}, 1500);
						}
						if(index == 4){		// 心形
							$(document).snowfall('clear');
					        $(document).snowfall({
					            image: "image/huaban.png",
					            flakeCount:30,
					            minSize: 5,
					            maxSize: 22
					        });
						}
					}
				});
			});