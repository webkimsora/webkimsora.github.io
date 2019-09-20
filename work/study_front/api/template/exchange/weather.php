<?php 
    $ch = curl_init(); 
     
    curl_setopt($ch, CURLOPT_URL, "http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=108");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = trim( curl_exec($ch) );
     
    header('Content-Type: text/xml');
    echo $output;
     
    curl_close($ch);
?>