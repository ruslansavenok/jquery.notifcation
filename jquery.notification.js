/*  
 * 2013, Ruslan Savenok
 *
 * http://github.com/ruslansavenok/jquery.notifcation
 *
 */
(function ($) {

  var defaults = {
    classWrapper: "notifications__wrapper",
    classItem: "notifications__item",
    classClose: "notifications__item-close",
    content: "Empty Notification",
    animationSpeed: 300,
    autoHideIn: 5000,
    topPos: "10%",
    template: function () {
      return "<div class='" + this.classWrapper + "'>" +
              "<div class='" + this.classItem + "'>" +
                this.content +
                "<span class='" + this.classClose + "'>Close</span>" +
              "</div>" +
             "</div>";
    }
  };

  var autoHideTimeout;

  
  $.notification = function (options) {
    if (typeof options == "string") {
      options = $.extend({}, defaults, { content: options });
    } else {
      options = $.extend({}, defaults, options);
    }

    var $body = $("body");


    if ($("." + options.classWrapper).length) {
      hideNotifactions(showNotification);
    } else {
      showNotification();
    }
  

    $body.on("click", "." + options.classClose, function () {
      clearTimeout(autoHideTimeout);
      hideNotifactions();
    });


    function showNotification() {
      var $notification = $(options.template());
      
      $notification
        .appendTo($body)
        .show()
        .animate({
          top: $.isFunction(options.topPos) ? options.topPos($notification) : options.topPos
        }, options.animationSpeed, function () {
          if (options.autoHideIn) {
            clearTimeout(autoHideTimeout);
            autoHideTimeout = setTimeout(hideNotifactions, options.autoHideIn);
          }
        });
    }


    function hideNotifactions(callBack) {
      $("." + options.classWrapper).fadeOut(options.animationSpeed, function () {
        $(this).remove();
        if (callBack) callBack();
      });
    } 
  }
})(jQuery);