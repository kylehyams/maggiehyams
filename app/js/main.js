// Add animation class to body on load
$(function() {
	$('body').addClass('animate');
});

// Scroll on page
(function (jQuery) {
	jQuery.mark = {
		jump: function (options) {
			var defaults = {
				selector: 'a.scroll-on-page-link'
			};
			if (typeof options == 'string') {
				defaults.selector = options;
			}
		
			options = jQuery.extend(defaults, options);
				return jQuery(options.selector).click(function (e) {
				var jumpobj = jQuery(this);
				var target = jumpobj.attr('href');
				var thespeed = 1250;
				var offset = jQuery(target).offset().top;
				jQuery('html,body').animate({
					scrollTop: offset
				}, thespeed, 'easeInOutQuart');
				e.preventDefault();
			});
		}
	};
})(jQuery);


jQuery(function(){  
	jQuery.mark.jump();
});
