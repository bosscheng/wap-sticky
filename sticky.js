/*
* date: 2019-07-22
* desc: 向下滚动的时候，吸附在指定位置的。safari 浏览器用 sticky，chrome 浏览器用 position：fixed
* 需要结合 .sticky{position:-webkit-sticky;left:0;right:0;top:0;} 使用。
*/
!(function (wap) {

    function offset(element) {
        var obj = element.getBoundingClientRect();
        return {
            left: (obj.left + window.pageXOffset) || 0,
            top: (obj.top + window.pageYOffset) || 0,
            width: (Math.round(obj.width)) || 0,
            height: (Math.round(obj.height)) || 0
        }
    }

    wap.stickyTop = function (el) {
        if (!document.querySelector(el)) {
            return;
        }

        var $el = document.querySelector(el);
        var $pl = $el.parentNode.querySelector('.placeholder');

        function check() {

            var positionValue = $el.style['position'] || getComputedStyle($el).getPropertyValue('position');

            if (positionValue.indexOf("sticky") < 0) {

                var _offsetTop = offset($el.parentNode).top;

                if (window.scrollY > _offsetTop) {
                    if (positionValue !== 'fixed') {
                        $el.style.removeProperty('position');
                        $el.style.cssText += ('; position:fixed;');
                        $pl && $pl.style.removeProperty('height');
                        $pl && ($pl.style.cssText += (';height:' + offset($el).height + 'px;'));
                    }
                } else {
                    if (positionValue !== 'static') {
                        $el.style.removeProperty('position');
                        $el.style.cssText += ('; position:static;');
                        $pl && $pl.style.removeProperty('height');
                        $pl && ($pl.style.cssText += (';height:0'));
                    }
                }
            }
        }

        check();
        window.addEventListener("scroll", check);
    };

})(window._wap = window._wap || {});
