document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

$(document).ready(function(){
	
	
	/*读取页面跳转过来携带的参数*/
	var myurl = location.href;
	var id = decodeURI(myurl.split("?")[1].split("&")[0].split("=")[1]);
	var back = myurl.split("?")[1].split("&")[1].split("=")[1];
	
	loadDetail();
	
	function initSwiper(){
		/*初始化swiper*/
		var swiper = new Swiper(".swiper-container",{
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev'
		});
	}
	
	function loadDetail(){
		$.ajax({
			type:"get",
			url:"http://115.28.73.144:8080/nitshare/serve/commodity.detail",
			async:true,//异步刷新
			data:{
				"id": id,
			},
			jsonpCallback:'callback',
			dataType:'jsonp',
			success:function(data){
				var addtext = "";
				if ("test" != data[0].imgUrl0){
					addtext += '<div class="swiper-slide"><img src="'+data[0].imgUrl0+'" /></div>';
				}
				if ("test" != data[0].imgUrl1){
					addtext += '<div class="swiper-slide"><img src="'+data[0].imgUrl1+'" /></div>';
				}
				if ("test" != data[0].imgUrl2){
					addtext += '<div class="swiper-slide"><img src="'+data[0].imgUrl2+'" /></div>';
				}	
				
				$(".swiper-wrapper").append(addtext);
				$("#desitem").append(data[0].description);
				$("#priceitem").append("￥"+data[0].price);
				$("#areaitem").append(data[0].tradePlace);
				$("#selleritem").append(data[0].uid);
				
				initSwiper();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown, data){
				alert(errorThrown);
			}
		});
	}
	
	/*返回到上一页面*/
	$("#backdiv").click(function(){
		if ("1" != back){
			window.location.href = "main.html?index=homePage.html";
		} else{
			window.history.back(-1);
		}
		
	});
	
});
