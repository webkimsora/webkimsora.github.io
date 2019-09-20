<?php


//$domain2 = $_SERVER['HTTP_HOST'];
//
//if(!isset($_SERVER["HTTPS"]) &&($domain2 =="fortnite-event.com" || $domain2 =="www.fortnite-event.com" ) ) {  
//header('Location: https://www.fortnite-event.com'.$_SERVER['REQUEST_URI']);
//exit;
//}

$surl =$_SERVER['REQUEST_URI'];

$rname = "reservation";  
  $is_res ="N";
if(strpos($surl, $rname) !== false) {     
  $is_res ="Y";
} 


// 사전예약 종료 
$fsvr_date = date('Y-m-d H:i',time()); 
$fend_date = date('Y-m-d H:i',strtotime('2018-01-20 00:00'));    // 종료 날자 
//$fend_date = date('Y-m-d H:i',strtotime('2018-01-19 17:21'));    // 종료 날자 
$fevent_yn ="N";   // 사전예약 진행
if( $fsvr_date>= $fend_date )
{
	$fevent_yn ="Y"; // 사전예약 종료
}

?>


<!doctype html>
<html class="no-js" lang="ko">
    <head>
        <meta charset="utf-8">
        <title>포트나이트</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="글로벌 4천만 플레이어가 인정한 포트나이트, 한국어 서비스 시작! 이벤트 응모하고 GTX 1080 Ti , BenQ 모니터 등 특별한 경품 받으러 가즈아~!">
        <meta property="og:title" content="무료 배틀로얄 플레이 하러 가즈아~!" />
      	<meta property="og:type" content="website"/>
      	<meta property="og:url" content="http://<?PHP ECHO $_SERVER['HTTP_HOST'];?>"/>
      	<meta property="og:image" content="http://<?PHP ECHO $_SERVER['HTTP_HOST'];?>/libs/sns/f_sns3.jpg" />
      	<meta property="og:description" content="글로벌 4천만 플레이어가 인정한 포트나이트, 한국어 서비스 시작! 이벤트 응모하고 GTX 1080 Ti , BenQ 모니터 등 특별한 경품 받으러 가즈아~!" />

    	<meta name="twitter:card" content="summary_large_image" />
      	<meta name="twitter:title" content="무료 배틀로얄 플레이 하러 가즈아~!" />
      	<meta name="twitter:url" content="http://<?PHP ECHO $_SERVER['HTTP_HOST'];?>" />
      	<meta name="twitter:description" content="글로벌 4천만 플레이어가 인정한 포트나이트, 한국어 서비스 시작! 이벤트 응모하고 GTX 1080 Ti , BenQ 모니터 등 특별한 경품 받으러 가즈아~!" />
      	<meta name="twitter:image" content="http://<?PHP ECHO $_SERVER['HTTP_HOST'];?>/libs/sns/f_sns3.jpg" />

        <script>
        <!--
        var UserAgent = navigator.userAgent;
        var UADevice = UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i);
        var UAVendor = UserAgent.match(/LG|SAMSUNG|Samsung/);
        if ( UADevice !== null || UAVendor!== null){
            <?php 
                if ($is_res =="Y")
                {
                ?>
                    location.href = "./index_m.php#reservation";
                    <?php
                }else{
                    ?>
                        location.href = "./index_m.php";
                    <?php
                }
                    ?>

        }
        //-->
        </script>
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" >
        <link rel="stylesheet" href="./libs/front/css/main.css?v=42">
        <!--[if lte IE 8]>
        <script src="./assets/js/ie8Polyfill.js"></script>
        <![endif]-->

    <!-- Facebook Pixel Code -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1745855798793166');
      fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1745855798793166&ev=PageView&noscript=1"/></noscript>
    <!-- End Facebook Pixel Code -->


<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1595738937141654',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.11'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-109042594-7"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-109042594-7');
</script>
	
<script type="text/javascript" src="//wcs.naver.net/wcslog.js"></script>
<script type="text/javascript">
if(!wcs_add) var wcs_add = {};
wcs_add["wa"] = "5e2b375fc0c3f4";
wcs_do();
</script>


<!-- Google 리마케팅 태그 코드 -->
<!--------------------------------------------------
리마케팅 태그를 개인식별정보와 연결하거나 민감한 카테고리와 관련된 페이지에 추가해서는 안 됩니다. 리마케팅 태그를 설정하는 방법에 대해 자세히 알아보려면 다음 페이지를 참조하세요. http://google.com/ads/remarketingsetup
--------------------------------------------------->
<script type="text/javascript">
/* <![CDATA[ */
var google_conversion_id = 828469357;
var google_custom_params = window.google_tag_params;
var google_remarketing_only = true;
/* ]]> */
</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/828469357/?guid=ON&amp;script=0"/>
</div>
</noscript>


    </head>