let is_rotating = false;
function call_rotate(pImgName, pGiftNum, pDuration) {
	if(is_rotating) return;
	is_rotating = true;

	if(!pDuration) pDuration = 3000;
	let f_total_cnt = g_rotate_gift.length;
	single_angle = 360 / f_total_cnt;
	min_angle = 360 - (single_angle * (f_total_cnt - pGiftNum + 1));
	max_angle = 360 - (single_angle * (f_total_cnt - pGiftNum)) - 1;

	let f_tmp;
	if(angle_mode=='middle') {
		let f_more_width = $(pImgName).data('more-width'); //그림자가 있을 때 중앙 맞출 때 사용 (border 값이 80이면 40으로)
		f_more_width = typeof f_more_width !== 'undefined' ? f_more_width : 0;

		mid_angle = min_angle + ((max_angle - min_angle) / 2) - (single_angle / 2); 
		more_angle = mid_angle + ( (360 / f_total_cnt) / 2 ) + ( ( $(pImgName).width() * 3.14 ) / f_total_cnt ) + f_more_width;

		f_tmp = Math.floor(Math.random()*100);
	} 
	else if(angle_mode=='random') {
		let f_i=0;
		while(true) {
			f_i++;
			f_tmp = Math.floor(Math.random() * (f_total_cnt*50) );
			
			if(f_tmp <= single_angle) {
				more_angle = min_angle + f_tmp;
				break;
			}
			if(i > f_total_cnt) {
				mid_angle = min_angle + ((max_angle - min_angle) / 2);
				more_angle = mid_angle;
				break;
			}
		}
	}

	let f_cnt = f_total_cnt;
	if( f_tmp < (f_cnt*10) ) f_cnt+=1;
	else f_cnt+=2;

	angle = ( 360 * f_cnt ) + more_angle;
	$(pImgName).rotate({
		angle:0,
		duration: pDuration,
		animateTo:-1*angle,
		center: ["50%", "50%"],
		//easing: $.easing.easeInOutElastic,
		callback: function () {
			is_rotating = false;
			is_rotated = true;

			fnRouletteResult(pGiftNum);
		}
	});
}

function call_rotate_nomore(pImgName, pGiftNum, pDuration) {
	if(is_rotating) return;
	is_rotating = true;

	if(!pDuration) pDuration = 3000;
	let f_total_cnt = g_rotate_gift.length;
	single_angle = 360 / f_total_cnt;
	min_angle = 360 - (single_angle * (f_total_cnt - pGiftNum + 1));
	max_angle = 360 - (single_angle * (f_total_cnt - pGiftNum)) - 1;

	let f_tmp;
	if(angle_mode=='middle') {
		let f_more_width = $(pImgName).data('more-width'); //그림자가 있을 때 중앙 맞출 때 사용 (border 값이 80이면 40으로)
		f_more_width = typeof f_more_width !== 'undefined' ? f_more_width : 0;

		mid_angle = min_angle + ((max_angle - min_angle) / 2) - (single_angle / 2); 
		more_angle = mid_angle + ( (360 / f_total_cnt) / 2 ) + f_more_width;

		f_tmp = Math.floor(Math.random()*100);
	} 
	else if(angle_mode=='random') {
		let f_i=0;
		while(true) {
			f_i++;
			f_tmp = Math.floor(Math.random() * (f_total_cnt*50) );
			
			if(f_tmp <= single_angle) {
				more_angle = min_angle + f_tmp;
				break;
			}
			if(i > f_total_cnt) {
				mid_angle = min_angle + ((max_angle - min_angle) / 2);
				more_angle = mid_angle;
				break;
			}
		}
	}

	let f_cnt = f_total_cnt;
	if( f_tmp < (f_cnt*10) ) f_cnt+=1;
	else f_cnt+=2;

	angle = ( 360 * f_cnt ) + more_angle;
	$(pImgName).rotate({
		angle:0,
		duration: pDuration,
		animateTo:-1*angle,
		center: ["50%", "50%"],
		//easing: $.easing.easeInOutElastic,
		callback: function () {
			is_rotating = false;
			is_rotated = true;

			fnRouletteResult(pGiftNum);
		}
	});
}