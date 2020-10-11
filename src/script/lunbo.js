//

define([], function() {
    return {
        //  搜索条
        search: ! function() {
            $('.icon1').on('click', function() {
                $(".nav2 ul ").hide()
                $('button').show()
                $('.icon2').show()
                $(".searchF input").stop(true).animate({
                    width: 854
                })


            })
            $('button').on('click', function() {

                $(".nav2 ul").show()
                $(this).hide()
                $('.icon2').hide()
                $(".searchF input").stop(true).animate({
                    width: 0
                })

            })
        }(),


        // 轮播图
        lunbo: ! function() {
            class Lunbo {
                constructor() {
                    this.lunbo = $('.lunbo')
                    this.leftarrow = $('#left');
                    this.rightarrow = $('#right');
                    this.bntlist = $('.banner ol li')
                    this.piclist = $('.banner ul li')
                    this.index = 0
                    this.timer = null
                }
                init() {
                    let _this = this
                    this.timer = window.setInterval(function() {
                        _this.clickRight()
                    }, 2000)

                    this.lunbo.hover(function() {
                        _this.leftarrow.show();
                        _this.rightarrow.show()
                        clearInterval(_this.timer)

                    }, function() {
                        _this.leftarrow.hide();
                        _this.rightarrow.hide();
                        _this.timer = window.setInterval(function() {
                            _this.clickRight()
                        }, 2000)

                    })
                    this.bntlist.on('click', function() {
                        _this.index = $(this).index()
                        _this.tabswitch()
                    })
                    this.rightarrow.on('click', function() {
                        _this.clickRight()
                    })
                    this.leftarrow.on('click', function() {
                        _this.clickLeft()
                    })

                }
                tabswitch() {
                    this.piclist.eq(this.index).stop(true).animate({
                        opacity: 1
                    }).siblings().stop(true).animate({
                        opacity: 0
                    })
                    this.bntlist.eq(this.index).addClass('active').siblings().removeClass('active')
                }
                clickLeft() {
                    this.index--;
                    if (this.index < 0) {
                        this.index = this.bntlist.size() - 1
                    }
                    this.tabswitch()
                }
                clickRight() {
                    this.index++;
                    if (this.index > this.bntlist.size() - 1) {
                        this.index = 0
                    }
                    this.tabswitch()
                }



            }
            new Lunbo().init()
        }(),
        // 渲染
        render: ! function() {
            $.ajax({
                url: "http://192.168.11.65//h5/umyjs/taobaoitem_test/php/list.php",
                dataType: 'json'
            }).done(function(data) {
                console.log(data)
                let strhtml = ''
                $.each(data, function(index, value) {
                    strhtml += `
                    <li>
                <a href="javascript:;"><img class="lazy" src=" ${value.url }" alt=" ">
                    <h5>${value.title}</h5>

                    <p class="item"> 活动价3099元爆款热销中
                    </p>
                    <p class="price">${value.price}</p>
                </a>
            </li>
                    `
                    if (index >= 3) {
                        return false
                    }
                })
                $('.fool-3 ul').html(strhtml)
                $(window).on('scroll', function() {

                    $("img.lazy").lazyload({
                        effect: "fadeIn"
                    })

                })
            })
        }()

    }
})