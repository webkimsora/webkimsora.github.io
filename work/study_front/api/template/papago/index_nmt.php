<!DOCTYPE HTML>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>타이틀</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<!-- <meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, width=device-width"> -->
	<link rel="stylesheet" type="text/css" href="./css/common.css"  media="all" />
	<script type="text/javascript" src="./js/jquery-1.11.3.min.js" ></script>
	<!-- <script type="text/javascript" src="./js/jquery.easing.1.3.js" ></script> -->
	<!-- <script type="text/javascript" src="./js/jquery.bxslider.min.js" ></script> -->
	<!-- <script type="text/javascript" src="./js/swiper.min.js" ></script> -->
	<script type="text/javascript" src="./js/common.js" ></script>

	<!--html5 및 css3 미지원 브라우저를 위한 설정-->
	<!--[if lt IE 9]>
		<link href="/css/html5Reset.css" rel="stylesheet" />
		<script src="/js/html5.js"></script>
		<script src="/js/respond.min.js"></script>
	<![endif]-->

</head>
<body>
<style>
.text {font-size: 30px; border:1px solid #eee; height: 300px;}
</style>
<!--
{"message":
	{"@type":"response",
	"@service":"naverservice.nmt.proxy",
	"@version":"1.0.0",
	"result":{"
		srcLangType":"ko",
		"tarLangType":"en",
		"translatedText":"Die.
	"}}
}
-->

<form>
	<textarea id="papagoText"  name="papagoText" ></textarea>
	<input type="button" onclick="papago()" value="결과">
</form>

<script>


//onkeydown="papago()"



function papago(){
	if($('#papagoText').val() == ''){
		return false;
	}
	
	
	$.ajax({     
		type:    'POST',
		url:     'papago_nmt.php',
		data:    $("form").serialize(),
		success: function(data) 
		{
			var contact = JSON.parse(data); //json 파싱
			$('.text').text(contact.message.result.translatedText);
			
		},error : function() {
            alert('통신실패!!');
        }

	});
}

/*
var str = '<?= $response ?>';
var contact = JSON.parse(str);
*/



</script>

<div class="text"></div>


</body>
</html>



