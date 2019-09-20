$(document).ready(function(){

	instaSearch('');
});	


var page =1;
var instatype ="";

	var container = $(".gallery-list");
	var timer;



function instaSearch(q) {
		//$(".gallery-list").empty();
		
  if (page == 1) $(".gallery-list").empty();

	//	var q = "벨큐브";
		
		$.ajax({
			type: 'POST',
			url: '/ista/res_insta.php',
			data: "q="+encodeURIComponent(q)+"&page="+page+"&setpage=10",
			success: function(data){
				
				$.each(data, function(i, item) {

				
        d = parseInt(data[i].udate * 1000, 10);

	//alert(d);
        date3 = new Date(data[i].udate * 1000);
        idate = date3.toLocaleString(); // "Dec 20"uphoto

					 var ncode = ' <li class="gallery-list__item">';
						 ncode = ncode +'<a href="'+data[i].url+'" target="_blank">';
						 ncode = ncode +'<img src="'+data[i].src+'" alt="" class="gallery-list__thumbnail">';
						 ncode = ncode +' <p class="gallery-list__cont"><b>'+data[i].uname+'</b><br>'+ str_cut(data[i].utxt, 100)+'</p>';
						 ncode = ncode +' <p class="gallery-list__meta">';
						 ncode = ncode +'	<i class="spobj icon-instagram"></i>';
						 ncode = ncode +'	<span class="gallery-list__writer"><img src="'+data[i].uphoto+'" class="photo2">'+data[i].uname+'</span>';
						 ncode = ncode +'	<span class="gallery-list__date">'+idate+'</span></p></a></li>';

	//alert(ncode);

					$(".gallery-list").append(ncode);
				
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



