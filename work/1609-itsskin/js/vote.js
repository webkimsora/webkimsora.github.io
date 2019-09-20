
var _nVidx = "";  // 선택 노래
var _nVid = "";  // 선택 노래
var _nVtitle = "";  // 선택 노래

$(document).ready(function(){


	getVoteList('logo','ctitle','w');
	getVoteList('jingle','ctitle','w');




	$("#od_a1").bind("click",function(e){
		getVoteList('logo','ctitle','w');		
		$("#od_a1").addClass("is-active");
		$("#od_a2").removeClass("is-active");
	});
	$("#od_a2").bind("click",function(e){
		getVoteList('logo','vcnt','w');		
		$("#od_a2").addClass("is-active");
		$("#od_a1").removeClass("is-active");
	});
	

	$("#od_b1").bind("click",function(e){
		getVoteList('jingle','ctitle','w');		
		$("#od_b1").addClass("is-active");
		$("#od_b2").removeClass("is-active");
	});
	$("#od_b2").bind("click",function(e){
		getVoteList('jingle','vcnt','w');		
		$("#od_b2").addClass("is-active");
		$("#od_b1").removeClass("is-active");
	});
	


});






function getVoteList(vtype,otype,type){
//	alert(page);
	$.ajax({
		type : "post",
	 	url : '/_interface/vote_list.php',
	 	datatype : 'text',
	 	data : 'vtype='+vtype+'&otype='+otype+'&type='+type, 
	 	error : function(e) { alert('Error #'+e.data); },
	    success: function(data) {
	    	var oJson = eval("("+data+")");
	    	if(oJson.list != ""){
	    	//	$(".total").html(oJson.total);
		    	setVoteList(oJson.list,vtype);
	    	}else{
	    		//alert("마지막 페이지 입니다.");
	    	//	$('#pop_wrap_19').modal(smodalOption);
	    	}
	    }
	});
}//end fnc 

function getVoteDetail(vidx){
//	alert(page);
	$.ajax({
		type : "post",
	 	url : '/_interface/vote_detail.php',
	 	datatype : 'text',
	 	data : 'vidx='+vidx, 
	 	error : function(e) { alert('Error #'+e.data); },
	    success: function(data) {
	    	var oJson = eval("("+data+")");
	    	if(oJson.list != ""){


				$(".play-title").html(oJson.ptitle);
				$(".play-content").html(oJson.pmemo);
				$(".play-id").html(oJson.pid);
				//$("#Audio").attr('src','./data/'+oJson.pfile);
				$(".play-audio").html('<audio id="Audio" src="./data/'+oJson.pfile+'" preload="auto" controls></audio> ').promise().done(function(){
					// 오디오 커스터마이징 실행
					$( '#Audio' ).audioPlayer();
				}); 
				$(".play-cnt").html(oJson.pcnt);

				$(".song-title").html(oJson.ptitle);
				$(".song-id").html(oJson.pid);

				_nVid = oJson.pmemo;
				_nVtitle = oJson.ptitle;

	    	}else{
	    		//alert("마지막 페이지 입니다.");
	    	//	$('#pop_wrap_19').modal(smodalOption);
	    	}
	    }
	});
}//end fnc 

function setVoteList(data, vtype){
	if (vtype =="logo")
	{	
		$(".vote-list1").html(data);
	}
	else
	{
		$(".vote-list2").html(data);
	}

	$(".mp_play").unbind('click');
	$(".mp_play").bind('click',function(e){	
		e.preventDefault();
		var dIdx = $(this).attr("dIdx");		
		 _nVidx = dIdx; 
			getVoteDetail(dIdx);
    mui.modal.open('popup-play');
	//	_DelIdx = dIdx; //삭제 ID 설정
	});

	$(".mp_share").unbind('click');
	$(".mp_share").bind('click',function(e){	
		e.preventDefault();
		var dIdx = $(this).attr("dIdx");		
		 _nVidx = dIdx; 
			getVoteDetail(dIdx);


    mui.modal.open('popup-share-event');
	//	_DelIdx = dIdx; //삭제 ID 설정
	});



}//end fnc

