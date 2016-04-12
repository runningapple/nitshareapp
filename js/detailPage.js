document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

$(document).ready(function(){
	
	/*初始化swiper*/
	var swiper = new Swiper(".swiper-container",{
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
	});
	
	/*返回到上一页面*/
	$("#backdiv").click(function(){
		window.location.href = "main.html?index=homePage.html";
	});
	
});
