
$(document).ready(function(){
	$("#loginbtn").tap(function(){
		$.ajax({
			type:"GET",
			
			/*这里需要进行跨域请求，论文里可以加以展开说明*/
			url:"http://localhost:8080/nitshare/serve/test",
			//async:false,/*同步*/
			jsonpCallback:'callback',
			data:{
				"id":"abc"
			},
			dataType:'jsonp',
			success : function(data){
				alert("ok");
			},
			error : function(XMLHttpRequest, textStatus, errorThrown, data){
//				alert("本宝宝不开心了");
				alert(errorThrown);
			}
		});
	});
});