<!DOCTYPE HTML>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>타이틀</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<!-- <meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0, width=device-width"> -->
	<link rel="stylesheet" type="text/css" href="./css/common.css"  media="all" />
	<script type="text/javascript" src="./js/jquery-1.11.3.min.js" ></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
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



<script>
	function add() {
		$.ajax({
			url: "testPhp.php",
			type: "post",
			data: 10,
		}).done(function(data) {
			alert(data);
		});
	}
</script>


<form>


	<input type="text" name="number1"> 더하기 <input type="text" name="number2"><br>
	<input type="button" onclick="add()" value="결과">
</form>



</body>
</html>



