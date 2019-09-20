 /**
 * Youtube API 로드
 */   
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 

  var mainPopVideo = null;
		
  function onYouTubeIframeAPIReady() {
    mainPopVideo = new YT.Player('popFrame', {
      height: '100%',           
      width: '100%',             
      //videoId: videoID,  
      playerVars: {             
          'autoplay': 0,
          'controls': 1,
          'showinfo': 0,
          'rel' : 0,
          'modestbranding' : 1
      },
      events: {
          'onReady': mainPopVideoReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
          'onStateChange': mainPopVideoStateChange    // 플레이어의 상태가 변경될 때마다 실행
      }
    });
  }

  function mainPopVideoReady(event) {
    console.log('onPlayerReady 실행');    
        // 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
//            event.target.playVideo();
  }

  // @ 메인 팝업 영상
  var playerState;
  var playing; //event.data 값 받아오는 전역변수 -> 재생:1, 정지:0, 시작안됨:-1 
  function mainPopVideoStateChange(event) {
    playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
    event.data == YT.PlayerState.PLAYING ? '재생 중' :
    event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
    event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
    event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
    event.data == -1 ? '시작되지 않음' : '예외';
    //console.log('onPlayerStateChange 실행: ' + playerState);

    playing = event.data; //event.data 값 받아오는 전역변수 -> 재생:1, 정지:0, 시작안됨:-1   
  }

(function(){
  var videoArr = ['zICGnq1EyFM','4cP2i0KkmYA','Z9jvr1PoeOo','MoOM1LBvm2w','QZhI2qD3WHM','ayoFOoUJfCQ','5qRXKLhNNT8','4QQQn3XSbTI']
  var indexVideo;

  $('.list li').on('click', function(){
    
    //var videoID = $(this).parent('li').data('video');
    var idx = $(this).index();
    var videoTag = videoArr[idx];
    indexVideo = idx;
    var $self = $(this)

    mui.modal.open('list-video');    
    mainPopVideo.loadVideoById(videoTag, 0, "large");

    console.log(idx)
  });

  $('.btn-next').on('click', function(){
      ++indexVideo;
      console.log(++indexVideo);
      if(indexVideo > 7){
        indexVideo = 0;
      }
      mainPopVideo.loadVideoById(videoArr[indexVideo], 0, "large"); 
  }); 
  
  $('.btn-prev').on('click', function(){
      --indexVideo;
      console.log(--indexVideo);
  });

/*
    //console.log($videoIdx)
    $('.btn-prev').on('click', function(){
      if(idx == 0) {
        console.log('첨')
      } else {
        $self.prev().trigger('click')
      }
    });
    $('.btn-next').on('click', function(){
      $self.next().trigger('click')
    });
  });*/


  $('#list-video .modal__close').on('click', function(){
    mainPopVideo.stopVideo();
  })
}());
