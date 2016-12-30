// If Javascript is detected, then add a class to animate intro elements
$(document).ready(function() {
	var element = document.getElementsByClassName("js");
	$(element).addClass('cooked');
});


// Smooth scrolling for anchor links
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


// Add class to fade-in content once its a certain amount of pixels from the bottom of the viewport
$(document).ready(function() {
  var element = document.getElementById("intro-desktop");
  $(element).addClass('marinate');

  $(window).scroll(function() {
    if( $("#intro-desktop").length > 0 ) {
      var elementTopToPageTop = $(element).offset().top;
      var windowTopToPageTop = $(window).scrollTop();
      var windowInnerHeight = window.innerHeight;
      var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
      var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
      var distanceFromBottomToAppear = 300;

      if(elementTopToWindowBottom > distanceFromBottomToAppear) {
        $(element).addClass('grilled');
      }
      else if(elementTopToWindowBottom < 0) {
        $(element).removeClass('grilled');
        $(element).addClass('marinate');
      }
    }
  });
});

$(document).ready(function() {
  var element = document.getElementsByClassName("pre-heat-A");
  $(element).addClass('marinate');

  $(window).scroll(function() {
    if( $(".pre-heat-A").length > 0 ) {
      var elementTopToPageTop = $(element).offset().top;
      var windowTopToPageTop = $(window).scrollTop();
      var windowInnerHeight = window.innerHeight;
      var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
      var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
      var distanceFromBottomToAppear = 300;

      if(elementTopToWindowBottom > distanceFromBottomToAppear) {
        $(element).addClass('grilled');
      }
      else if(elementTopToWindowBottom < 0) {
        $(element).removeClass('grilled');
        $(element).addClass('marinate');
      }
    }
  });
});

$(document).ready(function() {
  var element = document.getElementsByClassName("pre-heat-B");
  $(element).addClass('marinate');

  $(window).scroll(function() {
    if( $(".pre-heat-B").length > 0 ) {
      var elementTopToPageTop = $(element).offset().top;
      var windowTopToPageTop = $(window).scrollTop();
      var windowInnerHeight = window.innerHeight;
      var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
      var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
      var distanceFromBottomToAppear = 300;

      if(elementTopToWindowBottom > distanceFromBottomToAppear) {
        $(element).addClass('grilled');
      }
      else if(elementTopToWindowBottom < 0) {
        $(element).removeClass('grilled');
        $(element).addClass('marinate');
      }
    }
  });
});

$(document).ready(function() {
  var element = document.getElementsByTagName("footer");
  $(element).addClass('marinate');

  $(window).scroll(function() {
    if( $("footer").length > 0 ) {
      var elementTopToPageTop = $(element).offset().top;
      var windowTopToPageTop = $(window).scrollTop();
      var windowInnerHeight = window.innerHeight;
      var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
      var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
      var distanceFromBottomToAppear = 150;

      if(elementTopToWindowBottom > distanceFromBottomToAppear) {
        $(element).addClass('grilled');
      }
      else if(elementTopToWindowBottom < 0) {
        $(element).removeClass('grilled');
        $(element).addClass('marinate');
      }
    }
  });
});