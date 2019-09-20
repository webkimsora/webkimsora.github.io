<?php 
    $ch = curl_init(); 
     
    curl_setopt($ch, CURLOPT_URL, "http://www.kma.go.kr/servlet/NeoboardProcess?mode=stdxml&bid=press&url=http%3A%2F%2Fwww.kma.go.kr%2Fnotify%2Fpress%2Fkma_list.jsp&start_date=20180814&end_date=20180820");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = trim( curl_exec($ch) );
     
    header('Content-Type: text/xml');
    echo $output;
     
    curl_close($ch);
?>