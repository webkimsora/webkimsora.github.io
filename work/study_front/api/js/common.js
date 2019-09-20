const nav = function(idx,idx2){
	$('nav > ul > li').eq(idx).addClass('active')
	$('nav > ul > li').eq(idx).find('li').eq(idx2).addClass('active')
}



function editor(id)
{
	CodeMirror.fromTextArea(document.getElementById(id), {
		lineNumbers: true,
		//styleActiveLine: true,
		matchBrackets: true,
		theme: "dracula",
	});
}


$(window).on({
	'load' : function(){
		$('.showFrame').height($(window).height() - 120);
		$('.desButton a').click(function(){
			if($('.explain').is(':visible')){
				$('.explain').stop().slideUp();
				$(this).text('설명보기');
			}else{
				$('.explain').stop().slideDown();
				$(this).text('설명닫기');
			}
		})
		
		$('.btnMenu a').click(function(){
			$('nav').stop().slideToggle('fast')
		})
		
	},
	'resize' : function(){
		$('.showFrame').height($(window).height() - 120)
	}
});




