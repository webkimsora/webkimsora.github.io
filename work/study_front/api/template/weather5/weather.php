<?php 


    $post_msg = $_POST["codeDong"];
   
    $ch = curl_init(); 
    
     
    curl_setopt($ch, CURLOPT_URL, "http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=$post_msg");
    //http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=1168066000
    //http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=1168066000
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = trim( curl_exec($ch) );
     
    header('Content-Type: text/xml');
    echo $output;
   
    
     
    curl_close($ch);
    
?>
