$(function () {

    $("#header").load("common/header.html");
    $("#form").load("common/form.html");
    $("#footer").load("common/footer.html");


});
$('.counter').countUp();

layui.use('element', function () {
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块

    //监听导航点击
    element.on('nav(demo)', function (elem) {
        console.log(elem)
        layer.msg(elem.text());
    });
});
var slidesPerView4 = 3,
    spaceBetween4 = 30,
    slidesPerView5 = 2,
    spaceBetween5 = 50,
    spaceBetween6 = 30,
    slidesPerView6 = 5
function init() {
    $('.mySwiper7').height($('#bannerImg').height())
    $('.industry').height($('.mySwiper2_img').height())

    if ($(document).width() <= 750) {
        slidesPerView4 = 1
        spaceBetween4 = 0
        slidesPerView5 = 1
        spaceBetween5 = 0
        spaceBetween6 = 10
        slidesPerView6 = 2
    }
}
init()
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 10,
    freeMode: true,
    watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
    thumbs: {
        swiper: swiper,
    },
});
var swiper3 = new Swiper(".mySwiper3", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

var swiper4 = new Swiper(".mySwiper4", {
    loop: true,
    slidesPerView: slidesPerView4,
    spaceBetween: spaceBetween4,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
        resize: function() {
            if ($(document).width() <= 750) {
                this.params.slidesPerView = 1;
                this.params.spaceBetween = 0;
            } else {
                this.params.spaceBetween = 30;
                this.params.slidesPerView = 3;
            }
            this.update(); //窗口变化时，更新Swiper的一些属性，如宽高等
        },
    }
});
var swiper5 = new Swiper(".mySwiper5", {
    loop: true,
    slidesPerView: slidesPerView5,
    spaceBetween: spaceBetween5,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
        resize: function() {
            if ($(document).width() <= 750) {
                this.params.slidesPerView = 1;
                this.params.spaceBetween = 0;
            } else {
                this.params.spaceBetween = 50;
                this.params.slidesPerView = 2;
            }
            this.update(); //窗口变化时，更新Swiper的一些属性，如宽高等
        },
    }
});

var swiper6 = new Swiper(".mySwiper6", {
    loop: true, //环路，让Swiper看起来是循环的
    speed: 10000, //速度
    freeMode: true, //根据惯性滑动可能不止一格且不会贴合
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    autoplay: true, //自动切换
    autoplay: {
        delay: 0, //自动切换的时间间隔，单位ms
        disableOnInteraction: false //用户操作swiper之后，是否禁止autoplay
    },
    noSwiping: true, //设为true时，可以在slide上（或其他元素）增加类名'swiper-no-swiping'，使该slide无法拖动
    autoHeight: true, //自动高度
    spaceBetween: spaceBetween6, //两个slide的间隔
    slidesPerView: slidesPerView6, //设置slider容器能够同时显示的slides数量
    observeParents: true, //当Swiper的父元素变化时Swiper更新。
    on: {
        resize: function() {
            if ($(document).width() <= 750) {
                this.params.slidesPerView = 2;
                this.params.spaceBetween = 10;
            } else {
                this.params.spaceBetween = 30;
                this.params.slidesPerView = 5;
            }
            this.update(); //窗口变化时，更新Swiper的一些属性，如宽高等
        },
    }
});
var swiper7 = new Swiper(".mySwiper7", {
    // loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

new WOW().init();

certifySwiper = new Swiper('#certify .swiper-container', {
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    loopedSlides: 5,
    // autoplay: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: swiper,
    },
    on: {
        progress: function (progress) {
            for (i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i);
                var slideProgress = this.slides[i].progress;
                modify = 1;
                if (Math.abs(slideProgress) > 1) {
                    modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                }
                translate = slideProgress * modify * 260 + 'px';
                scale = 1 - Math.abs(slideProgress) / 5;
                zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                slide.css('zIndex', zIndex);
                slide.css('opacity', 1);
                if (Math.abs(slideProgress) > 3) {
                    slide.css('opacity', 0);
                }
            }
        },
        setTransition: function (transition) {
            for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i)
                slide.transition(transition);
            }

        }
    }

})

var resizeTimer = null;
$(window).resize(function () {
    if (resizeTimer) {
        clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function () {
        init()
    }, 100)
})
$(document).scroll(function () {
    var scroH = $(document).scrollTop(); //滚动高度
    var viewH = $(window).height(); //可见高度 
    var contentH = $(document).height(); //内容高度

    if (scroH > viewH) { //距离顶部大于100px时
        $('.header').css('background-color', 'rgba(255, 255, 255, 1)')
    } else {
        $('.header').css('background-color', 'rgba(255, 255, 255, .5)')
    }
    if (contentH - (scroH + viewH) <= 100) { //距离底部高度小于100px
    }
    if (contentH = (scroH + viewH)) { //滚动条滑到底部啦
    }

})


//时间
new clockModule({
    Module: ["#clockModule1", "#clockModule2", "#clockModule3", "#clockModule4", "#clockModule5", "#clockModule6", "#clockModule7", "#clockModule8", "#clockModule9",],//需要时钟的模块名称
    clockparameter: [{
        timezone: '8',//时钟显示时区
        cw: 120,//时钟宽度
        ch: 120,//时钟高度
        // bgcolor: "#25f500",//时钟背景颜色
    },
    {
        timezone: '0',
        cw: 120,
        ch: 120,
    },
    {
        timezone: '5',
        cw: 120,
        ch: 120,
    }, {
        timezone: '8',
        cw: 120,
        ch: 120,
    }, {
        timezone: '8',
        cw: 120,
        ch: 120,
    }, {
        timezone: '8',
        cw: 120,
        ch: 120,
    }, {
        timezone: '8',
        cw: 120,
        ch: 120,
    }, {
        timezone: '8',
        cw: 120,
        ch: 120,
    }, {
        timezone: '8',
        cw: 120,
        ch: 120,
    }

    ]//对单独时钟设置参数
})

/*鼠标移入停止轮播，鼠标离开 继续轮播*/
var comtainer = document.getElementById('mySwiper6');
comtainer.onmouseenter = function () {
    swiper6.autoplay.stop();
};
comtainer.onmouseleave = function () {
    swiper6.autoplay.start();
}
