


function ajaxFileUpload() {
    var file = $("#realPicFile").val();
    if(!/\.(gif|jpg|jpeg|png|JPG|PNG)$/.test(file))
    {
        Error("不支持的图片格式.图片类型必须是.jpeg,jpg,png,gif格式.");
        return false;
    }
    $.ajaxFileUpload({
        url : 'http://localhost:8080/nitshareserver/serve/uploadfile?inputId=realPicFile',//用于文件上传的服务器端请求地址  
        secureuri : false,//一般设置为false  
        fileElementId : 'realPicFile',//文件上传空间的id属性  <input type="file" id="file" name="file" />  
        dataType : 'json',//返回值类型 一般设置为json  
        success : function(data, status) //服务器成功响应处理函数  
        {   
            // 图片在服务器上的相对地址，加随机数防止不刷新
			alert("success");
        },
        error : function(data, status, e)//服务器响应失败处理函数  
        {
            alert("WTF");
        }
    });
    return false;
}