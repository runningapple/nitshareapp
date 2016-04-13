
$(document).ready(function(){
	
	function ajaxFileUpload(){
		$.ajaxFileUpload({
			url: 'http://localhost:8080/nitshare/serve/uploadfile',
			secureuri:false,
			fileElementId:'picfile',
			dataType: 'json',
			type: 'POST',
			async: false,
			success: function(data){
				$("#result").html("添加成功");
			},
			error: function(data, status, e){
				$("#result").html("添加失败");
			}
		});
	}
	
	$("#sub").click(function(){
		ajaxFileUpload();
	});
	
});
