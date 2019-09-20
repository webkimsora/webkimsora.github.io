<?php 
    $ch = curl_init(); 
    $date = date('Ymd');
    $chk_url ="https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=AuKulizb6ciGdeg5ntzIZmlOnGzpnYVN&searchdate=".$date."&data=AP01";
     
    curl_setopt($ch, CURLOPT_URL, $chk_url );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = trim( curl_exec($ch) );
     
    header('Content-Type: text/xml');
    echo $output;
     
    curl_close($ch);
?>