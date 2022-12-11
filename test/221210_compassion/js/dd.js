<script>
			//imc
			$main_imc = $('.main-imc-slider');
			// 특별한 나눔
			$main_sponsorship = $('.main-special-sponsorship-slider');
			$main_imc.each(function() {
				dataDevice = $(this).attr('data-device');
				$(this).owlCarousel(
						{
							loop : true,
							items : 1,
							margin : 0,
							nav : false,
							dots : true,
							autoplay : true,
							autoplayTimeout : 4000,
							autoplayHoverPause : true,
							smartSpeed : 700,
							nav : true,
							dotsContainer : '.imc-controls.type-' + dataDevice
									+ ' .imc-dots'
						// onTranslated: tabIdxChange
						})
				$('.button-imc-pause').click(function() {
					$main_imc.trigger('stop.owl.autoplay');
				})
				$('.button-imc-play').click(function() {
					$main_imc.trigger('play.owl.autoplay');
				})
			})
			// 접근성 focus 관련 tabindex 조정 script
			// function tabIdxChange() {
			//   $main_imc.find('.owl-item .g-button-basic-64').each(function () {
			//     $(this).attr('tabindex', '-1');
			//   })
			//   $main_imc.find('.owl-item.active .g-button-basic-64').attr('tabindex', '0');
			// }
			// tabIdxChange();

			$main_sponsorship.owlCarousel({
				loop : false,
				autoWidth : true,
				items : 3,
				margin : 24,
				nav : true,
				responsiveClass : true,
				responsive : {
					320 : {
						nav : false
					},
					640 : {
						items : 3
					}
				}
			})
		</script>