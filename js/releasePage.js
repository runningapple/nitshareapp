document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

$(document).ready(function(){

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 30
    });
    
    $("#backhome").click(function(){
    	window.location.href = "main.html?index=homePage.html";
    });
    
    $("#sub_pic_one,#sub_pic_two,#sub_pic_three").click(function(){
    	$("#filepic").trigger("click");
    });
//  
//  $("#sub_pic_two").click(function(){
//  	$("#file_two").trigger("click");
//  });
//
//  $("#sub_pic_three").click(function(){
//  	$("#file_three").trigger("click");
//  });
    
    /**
     * 如果图片改变则上传图片到服务器，并返回图片地址
     */
    $("#filepic").change(function(){
//  	alert($(this).val());
	    $("#picdiv").ajaxSubmit({
	    	type: "POST",
	    	//url: "http://115.28.73.144:8080/nitshare/serve/uploadfile",
	    	url: "http://127.0.0.1:8080/nitshareserver/serve/uploadfile",
	    	dataType: "jsonp",
			jsonpCallback:'callback',
	    	success: function(data){
	    		alert("in");
	    	},
	    	error: function(XmlHttpRequest,textStatus,errorThrown){
	    		alert("error");
	    	}
	    });
//		var options = {
//			url: "http://localhost:8080/nitshare/serve/uploadfile",
//			type: "POST",
//			dataType: "jsonp",
//			jsonpCallback:'callback',
//		};
//		
//		$("#picdiv").submit(function(){
//			$(this).ajaxSubmit(options);
//			return false;
//		});
	});

    
});
