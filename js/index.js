/**
 * Created by Administrator on 2016/10/31.
 */

//banner图片部分
function banner(ele, url) {//ele让那个元素进行渐隐渐现，jQuery元素
    url = url || 'json/bannerData.txt';
    //获取元素
    var $bannerImg = ele.find('.bannerImg');
    var $img = null;
    var $ul = ele.find('ul');
    var $li = $ul.find('li');
    var data = null;
    var n = 0;
    var timer = null;
    //1、获取并解析数据
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        cache: false,
        async: false,//同步
        success: function (val) {//成功之后返回的数据
            data = val;
        }
    });
    //2、绑定数据
    bind();
    function bind() {
        var strImg = '';
        $.each(data, function (index, item) {
            strImg += '<img src="" realImg="' + item.imgSrc + '" alt=""/>';
        });
        $bannerImg.html(strImg);
    }

    //3、延迟加载
    $img = $bannerImg.find('img');
    lazyImg();
    function lazyImg() {
        $.each($img, function (index, item) {
            var tmp = new Image;
            tmp.src = $(item).attr('realImg');
            tmp.onload = function () {
                item.src = this.src;
                $img.first().css('zIndex', 1).stop().fadeIn(400);
                tmp = null;
            }
        })
    }
    //4、图片渐隐渐现
    clearInterval(timer);
    timer = setInterval(autoMove, 4000);
    function autoMove() {
        if (n >= $img.length - 1) {
            n = -1;
        }
        n++;
        setBanner();
    }
    function setBanner() {
        $.each($img, function (index, item) {
            if (index == n) {
                $(item).css('zIndex', 1).stop().fadeIn(400, function () {
                    $(this).siblings().stop().fadeOut();
                })
            } else {
                $(item).css('zIndex', 0)
            }
        });
        bannerTip();
    }

    //5、焦点自动轮播
    function bannerTip() {
        $.each($li, function (index, item) {
            item.className = index == n ? 'on' : null;
        })
    }
    //6、鼠标移入移出
    ele.mouseover(function () {
        clearInterval(timer);
    });
    ele.mouseout(function () {
        timer = setInterval(autoMove, 4000);
    });
    //7、点击焦点自动切换
    handleChange();
    function handleChange() {
        $.each($li, function (index, item) {
            $(item).mouseover(function () {
                n = index;
                setBanner();
            })
        })
    }
}

//banner左右切换版本
function banner1(ele) {
    var $boxInner =ele.find('.middle-Pic');
    var $img = $boxInner.children('div');
    var $btnLeft = $boxInner.find('.left');
    var $btnRight = $boxInner.find('.right');
    var timer = null;
    var n = 0;
    clearInterval(timer);
    timer = setInterval(autoMove, 4000);
    function autoMove() {
        if (n >= $img.length-1 ) {
            n = -1;
        }
        n++;
        setBanner();
    }
    function setBanner() {
        $.each($img, function (index, item) {
            if (index == n) {
                $(item).css('zIndex', 1).stop().fadeIn(200)
            } else {
                $(item).css('zIndex', 0);
            }
        });
    }
    ele.mouseover(function () {
        clearInterval(timer);
    });
    ele.mouseout(function () {
        timer = setInterval(autoMove, 4000);
    });
    $btnLeft.click(function(){
        autoMove();
    });
    $btnRight.click(function(){
        if(n<=0){
            n=$img.length;
        }
        n--;
        setBanner();
    })
}



function tab(ele) {//扩充选项卡插件
    //ele:jQuery元素
    var $btn = ele.children('input');//当前元素下所有按钮
    var $div = ele.children('div');//当前元素下所有内容框
    $btn.click(function () {//让当前按钮变量，让其他兄弟元素都变暗
        $(this).addClass('on').siblings().removeClass('on');
        $div.eq($(this).index()).addClass('show').siblings().removeClass('show');//让当前按钮对应的内容框显示，其他内容框都隐藏
    })
}
