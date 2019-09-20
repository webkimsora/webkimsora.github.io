<?php
  $post_msg = $_POST['keywordText'];
  $post_display = $_POST['listCount'];
  $post_start = $_POST['startCount'];
  $client_id = "qAw9ynbdqF0f3rZXQm9X";
  $client_secret = "DljOUZ2_BR";
  $client_Display = '&display='.$post_display; //보여줄갯수
  $client_Start = '&start='.$post_start; //보여줄 시작 인덱스
  $searchOption = $_POST['searchOption']; // 검색종류
  $genre = '&genre='.$_POST['genre']; // 장르종류
  $encText = urlencode($post_msg);
    $url = "https://openapi.naver.com/v1/search/$searchOption?query=".$encText.$client_Display.$client_Start.$genre; // json 결과
//  $url = "https://openapi.naver.com/v1/search/blog.xml?query=".$encText; // xml 결과
  $is_post = false;
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, $is_post);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $headers = array();
  $headers[] = "X-Naver-Client-Id: ".$client_id;
  $headers[] = "X-Naver-Client-Secret: ".$client_secret;
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  $response = curl_exec ($ch);
  $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  echo $response;
  //echo "status_code:".$status_code.;  
  
  curl_close ($ch);
  if($status_code == 200) {
    
  } else {
    echo "Error 내용:".$response;
  }
?>