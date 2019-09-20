$(document).ready(function(){

	//instaSearch('',15);
});	


var page =1;
var instatype ="";

	var container = $(".insta-list-wrap");




function instaSearch(q,setpage) {
		//$(".gallery-list").empty();
		
  if (page == 1) $(".insta-list-wrap").empty();

	//	var q = "벨큐브";
		
		$.ajax({
			type: 'POST',
			url: '/ista/res_insta.php',
			data: "q="+q+"&page="+page+"&setpage=18",
			success: function(data){

				$.each(data, function(i, item) {

				
        d = parseInt(data[i].udate * 1000, 10);

	//alert(d);
        date3 = new Date(data[i].udate * 1000);
        idate = date3.toLocaleString(); // "Dec 20"uphoto


				
						 var  ncode = '<div class="item">';
						 ncode = ncode +'<img class="insta-list-photo" src="'+data[i].src+'"  width=250 height=220  alt="사진">';
						 ncode = ncode +'<div class="insta-list-profile">';
						 ncode = ncode +'<img class="profile photo1" src="'+data[i].uphoto+'" alt="인스타그램 프로필">';
						 ncode = ncode +'<img class="mark" src="/images/event2/insta-mark.png"  alt=""></div>';
						 ncode = ncode +'<div class="insta-list-detail">';
						 ncode = ncode +'<h3 class="detail-name">'+ str_cut(data[i].uname, 20)+'</h3>';
						 ncode = ncode +'<p class="detail-content">'+ str_cut(data[i].utxt, 30)+'</p>';
						 ncode = ncode +'<p class="detail-date">'+idate+'</p>';
						 ncode = ncode +'</div>';
						 ncode = ncode +'</div>';



	//alert(ncode);

					$(".insta-list-wrap").append(ncode);
				
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
  instaSearch(q,'18');
}



