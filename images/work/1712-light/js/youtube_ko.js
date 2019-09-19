/**
 * Youtube API 로드
 */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var movieID = ['eL_mptivn08', 'C4ZemlyjnPY'];
var vid = document.getElementById("myVideo"); 
var soundClick = false;

var movieMain;
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('pop-player', {
        height: '315', // <iframe> 태그 지정시 필요없음
        width: '560', // <iframe> 태그 지정시 필요없음
        videoId: movieID[0], // <iframe> 태그 지정시 필요없음
        playerVars: { // <iframe> 태그 지정시 필요없음
          controls: '1',
          //showinfo: '0',
          rel: '0',
          autoplay: '0',
          iv_load_policy: '3'
        },
        events: {
          'onReady': onPlayerReady, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
          'onStateChange': onPlayerStateChange // 플레이어의 상태가 변경될 때마다 실행
        }
    });

    worldMovie = new YT.Player('worldMovie', {
        height: '315', // <iframe> 태그 지정시 필요없음
        width: '560', // <iframe> 태그 지정시 필요없음
        videoId: movieID[1], // <iframe> 태그 지정시 필요없음
        playerVars: { // <iframe> 태그 지정시 필요없음
          controls: '1',
          showinfo: '0',
          rel: '0',
          autoplay: '0',
          iv_load_policy: '3'
        },
        events: {
          'onReady': onPlayerReady, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
          'onStateChange': onPlayerStateChange // 플레이어의 상태가 변경될 때마다 실행
        }
    });
    
    mediaMovie = new YT.Player('mediaMovie', {
        height: '315', // <iframe> 태그 지정시 필요없음
        width: '560', // <iframe> 태그 지정시 필요없음
        playerVars: { // <iframe> 태그 지정시 필요없음
          controls: '1',
          showinfo: '0',
          rel: '0',
          autoplay: '0',
          iv_load_policy: '3'
        },
        events: {
          'onReady': onPlayerReady, // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
          'onStateChange': onPlayerStateChange // 플레이어의 상태가 변경될 때마다 실행
        }
    });
}

function onPlayerReady(event) {
	console.log('onPlayerReady 실행');
	// 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
	//event.target.playVideo();
}

var playerState;

function onPlayerStateChange(event) {
	playerState = event.data == YT.PlayerState.ENDED ? '종료됨' :
			event.data == YT.PlayerState.PLAYING ? '재생 중' :
			event.data == YT.PlayerState.PAUSED ? '일시중지 됨' :
			event.data == YT.PlayerState.BUFFERING ? '버퍼링 중' :
			event.data == YT.PlayerState.CUED ? '재생준비 완료됨' :
			event.data == -1 ? '시작되지 않음' : '예외';

	//console.log('onPlayerStateChange 실행: ' + playerState);
	
	// 재생여부를 통계로 쌓는다.
	collectPlayCount(event.data);

    // 일시중지
	if(event.data == YT.PlayerState.PAUSED){
		console.log(played+ '일시중지');        

    }

	//종료시 실행
	if(event.data == YT.PlayerState.ENDED){
		console.log(played);        

        if(soundClick == true) {
            vid.pause();
        } else {
            $('.btnSound a').removeClass('on');
            vid.play();   
        }        
	}
}

var played = false;
function collectPlayCount(data) {
	if (data == YT.PlayerState.PLAYING) {
		// todo statistics
		played = true;      
        
		console.log(played+'2');        

        vid.pause();
        $('.btnSound a').addClass('on');
	}
}

////////
;(function() {
    // @ 영상
    
	$('.movieTab li').click(function(){
        var mediaID = ['eL_mptivn08', 'C4ZemlyjnPY', '-TiEGsrZdaY'];

		var idx = $(this).data('movie');
        var moviedata = mediaID[idx];

        $(this).addClass('on').siblings('li').removeClass('on');

		mediaMovie.loadVideoById(moviedata,0,"large");
		//$('.contentsMovie').show();
	})

}());