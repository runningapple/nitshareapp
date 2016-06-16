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
		ajaxFileUpload();
	});

	/**
	 *图片上传方法 
	 */
	function ajaxFileUpload(){
		var formData = new FormData();
		formData.append('file',$("#filepic")[0].files[0]);	//将文件转成二进制形式
		formData.append("uid",localStorage.id);
		$.ajax({
			type:"post",
			url:"http://115.28.73.144:8080/nitshare/serve/fileupload",
			async:false,
			contentType: false,	//这个一定要写
			processData: false, //这个也一定要写，不然会报错
			data:formData,
			dataType:'json',	//返回类型，有json，text，HTML。这里并没有jsonp格式，所以别妄想能用jsonp做跨域了。
			success:function(data){
//				alert("提交成功，请继续填写商品详细信息");
			},
			error:function(XMLHttpRequest, textStatus, errorThrown, data){
				alert(errorThrown);
			}
		});
	}
    
    $("#releasebtn").click(function(){
		var cname = $("#name").val();
		var price = $("#price").val();
		var description = $("#description").val();
		var bargain = "0";
		var uid = localStorage.id;//用户id
		$.ajax({
			type:"get",
			url:"http://115.28.73.144:8080/nitshare/serve/commodity.add",
			async:false,
			data:{
				"cname":cname,
				"price":price,
				"description":description,
				"bargain":bargain,
				"uid":uid
			},
			jsonpCallback:'callback',
			dataType:'jsonp',
			success:function(data){
				alert("添加成功");
				window.location.href = "main.html?page=homePage.html";
			},
			error:function(XMLHttpRequest, textStatus, errorThrown, data){
				alert(errorThrown);
			}
		});    	
    });
});
