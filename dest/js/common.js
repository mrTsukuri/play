$('.menu_btn').click(function(){
  $('.menu_btn span:nth-child(2)').toggleClass('transparent');
  $('.menu_btn span:nth-child(1)').toggleClass('rotate-top');
  $('.menu_btn span:nth-child(3)').toggleClass('rotate-bottom');
});
$('.menu_btn').click(function(){
	$('.main_nav').toggleClass('active');
	$('.menu_btn').toggleClass('active');
});