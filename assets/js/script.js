'use strict';

const rootJS = '@@webRoot/assets/js'
const rootComponents = '@@webRoot/assets/components'

~~include(`${rootJS}/lib/webp.js`);
~~include(`${rootJS}/lib/jquery.min.js`);
~~include(`${rootJS}/lib/slick.min.js`);
~~include(`${rootJS}/lib/validator.js`);
~~include(`${rootJS}/lib/maskedinput.min.js`);

// blocks
~~include(`${rootComponents}/air-datepicker/air-datepicker.js`);


const gz = {
    goToBlock(target, event, isMobile=false)
    {
        if (event) event.preventDefault();
        if (isMobile) this.header.toggleMenu()

        $('html,body').animate({
        scrollTop: typeof(target) === 'string'
            ? target
            : $(target.hash).offset().top
        });
    },
}

~~include(`${rootComponents}/select/select.js`)


gz.init = function() {
    $("._input-phone").mask("+7(999)999-99-99");
    this.store.init()
    this.gPopup.init()
}

$(document).ready(() => {
    gz.init()
})
