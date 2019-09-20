
	
	

	
	// $.fn.serializeObject = function(){
	//    var o = {};
	//    var a = this.serializeArray(); //[{name:"name", value:"김소라"}… 등등 값 받아서 뿌려줌]
	//    var n = []; //배열
	//    var pushbool = false;
	// 
	//    for(var i = 0; i < a.length; i++){
	//       if($(this).find('[name="'+a[i].name+'"]').data('params') == false){
	//           pushbool = true;
	//       }else{
	//           n.push({
	//               name : a[i].name,
	//               value : a[i].value
	//           });
	//       }
	//   }
	//   if(pushbool){
	//        a = n;
	//    }
	// 
	//    $.each(a, function() {
	//        if (o[this.name]) {
	//            if (!o[this.name].push) {
	//                o[this.name] = [o[this.name]];
	//            }
	//            o[this.name].push(this.value || '');
	//        } else {
	//            o[this.name] = this.value || '';
	//        }
	//    });
	// 
	//    return o;
	// };
	// 
	// function deleteSpecialC($el) { }
	// 
	// var textChk = function($el) { }