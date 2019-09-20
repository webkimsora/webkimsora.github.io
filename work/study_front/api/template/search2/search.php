<?php
  $keyword = $_POST['KEYWORD'];
  $type = $_POST['TYPE'];
  $START = $_POST['START'];
  $DISPALY = $_POST['DISPALY'];
  $client_id = "7Ua1NH5U0timrSR40Cpb";
  $client_secret = "k28d75wL9s";
  $client_params = '&display='.$DISPALY.'&start='.$START;
  $encText = urlencode($keyword);
  $searchOption = $type;
  $url = "https://openapi.naver.com/v1/search/$searchOption?query=".$encText.$client_params; // json 결과
//  $url = "https://openapi.naver.com/v1/search/blog.xml?query=".$encText; // xml 결과
  $is_post = false;
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, $is_post);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $headers = array();
  $headers[] = "X-Naver-Client-Id: ".$client_id;
  $headers[] = "X-Naver-Client-Secret: ".$client_secret;
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  $response = curl_exec ($ch);
  $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  //echo "status_code:".$status_code." ";
  curl_close ($ch);
  if($status_code == 200) {
    echo $response;
  } else {
    echo "Error 내용:".$response;
  }
?>