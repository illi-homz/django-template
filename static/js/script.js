'use strict';

var rootJS = '@@webRoot/assets/js';
var rootComponents = '@@webRoot/assets/components';
~~include("".concat(rootJS, "/lib/webp.js"));
~~include("".concat(rootJS, "/lib/jquery.min.js"));
~~include("".concat(rootJS, "/lib/slick.min.js"));
~~include("".concat(rootJS, "/lib/validator.js"));
~~include("".concat(rootJS, "/lib/maskedinput.min.js")); // blocks

~~include("".concat(rootComponents, "/air-datepicker/air-datepicker.js"));
var gz = {
  goToBlock(target, event) {
    var isMobile = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (event) event.preventDefault();
    if (isMobile) this.header.toggleMenu();
    $('html,body').animate({
      scrollTop: typeof target === 'string' ? target : $(target.hash).offset().top
    });
  }

};
~~include("".concat(rootComponents, "/select/select.js"));

gz.init = function () {
  $("._input-phone").mask("+7(999)999-99-99");
  this.store.init();
  this.gPopup.init();
};

$(document).ready(() => {
  gz.init();
});