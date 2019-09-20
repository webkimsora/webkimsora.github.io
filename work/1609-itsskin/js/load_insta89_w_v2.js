$(document).ready(function(){

	//instaSearch('');
});	


var page =1;
var instatype ="";

	var container = $(".insta-list-wrap");
	var timer;



function instaSearch(q) {
		//$(".gallery-list").empty();
	//	console.log(page)

	//alert(page);
		
  if (page == 1) $(".insta-list-wrap").empty();

	//	var q = "벨큐브";
		
		$.ajax({
			type: 'POST',
			url: '/ista/res_insta_w.php',
			data: "q="+encodeURIComponent(q)+"&page="+page+"&setpage=6",
			success: function(data){
				
				$.each(data, function(i, item) {


				if(data[i].src =="E")
					{
					//	alert("더이상 게시물이 없습니다");
						$(".gallery__more").hide();
					}
					else
					{
								
						d = parseInt(data[i].udate * 1000, 10);

					//alert(d);
						date3 = new Date(data[i].udate * 1000);
						idate = date3.toLocaleString(); // "Dec 20"uphoto

						idate2 = idate.substr(8, 44);



						var ncode ='<li><img class="insta-list-photo" src="'+data[i].src+'" width=170 height=170  alt="사진">';
						 ncode = ncode +'<div class="insta-list-profile">';
						 ncode = ncode +'<img class="profile photo2" src="'+data[i].uphoto+'"  alt="인스타그램 프로필">';
						 ncode = ncode +'<img class="mark" src="/images/event2/popup/insta-mark.png"  alt=""></div>';
						 ncode = ncode +'<div class="insta-list-detail">';
						 ncode = ncode +'<h3 class="detail-name"> '+str_cut(data[i].uname, 15)+' </h3>';
						 ncode = ncode +'<p class="detail-content">'+ str_cut(data[i].utxt, 40)+'...</p>';
						 ncode = ncode +'<p class="detail-date">'+idate+'</p>';
						 ncode = ncode +'</div></li>';


//						 var  ncode = ncode +'<div class="item">';
//						 ncode = ncode +'<img class="insta-list-photo" src="'+data[i].src+'"  alt="인스타그램 사진">';
//						 ncode = ncode +'<div class="insta-list-profile">';
//						 ncode = ncode +'<img class="profile photo2" src="'+data[i].uphoto+'" alt="인스타그램 프로필">';
//						 ncode = ncode +'<img class="mark" src="/images/event2/insta-mark.png"  alt=""></div>';
//						 ncode = ncode +'<div class="insta-list-detail">';
//						 ncode = ncode +'<h3 class="detail-name">'+data[i].uname+'</h3>';
//						 ncode = ncode +'<p class="detail-content">'+ str_cut(data[i].utxt, 60)+'</p>';
//						 ncode = ncode +'<p class="detail-date">'+idate+'</p>';
//						 ncode = ncode +'</div>';
//						 ncode = ncode +'</div>';

//					 var ncode = ' <li class="gallery-list__item">';
//						 ncode = ncode +'<a href="'+data[i].url+'" target="_blank">';
//						 ncode = ncode +'<img src="'+data[i].src+'" alt="" class="gallery-list__thumbnail">';
//						 ncode = ncode +' <p class="gallery-list__cont"><b>'+data[i].uname+'</b><br>'+ str_cut(data[i].utxt, 100)+'</p>';
//						 ncode = ncode +' <p class="gallery-list__meta">';
//						 ncode = ncode +'	<i class="spobj icon-instagram"></i>';
//						 ncode = ncode +'	<span class="gallery-list__writer"><img src="'+data[i].uphoto+'" class="photo2">'+data[i].uname+'</span>';
//						 ncode = ncode +'	<span class="gallery-list__date">'+idate+'</span></p></a></li>';

	//alert(ncode);

					$(".insta-list-wrap").append(ncode);
					}
				
				});
			},
			error: function(xhr, type, exception) { 
				$(container).html("Error: " + type); 
			}
		});
	}
	
function moreItems()
{
	page= page+1;

	instaSearch(instatype);
}


function str_cut(text, n) {
  var short = text.substr(0, n);
  if (/^\S/.test(text.substr(n)))
    short = short.replace(/\s+\S*$/, "");
  return short;
}

function selectTag(q) {
  page = 1;
  instatype =q; 
  instaSearch(q);
}



