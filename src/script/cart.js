define([], function() {
    // 加减产品数量
    return {
        render_cart: ! function() {
            var sidarr = $.cookie('cookieid').split(',')
            var numarr = $.cookie('cookienum').split(',')
            $.ajax({
                    url: 'http://localhost/h5/umyjs/taobaoitem_test/php/list.php',
                    dataType: 'json'
                }).done(
                    function(data) {
                        if (sidarr) {
                            $('.empty-cart').hide()
                        }
                        var str = ''
                        var oneprice = 0
                        for (var i = 0; i <= sidarr.length; i++) {
                            //  渲染
                            $.each(data, function(index, value) {

                                if (value.sid == sidarr[i]) {
                                    str += `<div class="goods-item goods-item-sele">
                                <div class="goods-info">
                                    <div class="cell b-checkbox">
                                        <div class="cart-checkbox">
                                            <input type="checkbox" checked="" name="" id="" value="" />
                                            <span class="line-circle"></span>
                                        </div>
                                    </div>
                                    <div class="cell b-goods">
                                        <div class="goods-name">
                                            <div class="goods-pic">
                                                <a href=""><img src="${value.url}" alt="" /></a>
                                            </div>
                                            <div class="goods-msg">
                                                <div class="goods-d-info">
                                                    <a href="">${value.title}</a>
                                                </div>
                                                <div class="goods-ex">
                                                    <span class="promise"></span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cell b-props">
                                    <div class="prop-text"></div>
                                </div>
                                <div class="cell b-price">
                                    <strong>${value.price}</strong>
                                    <div class="sales-promotion-dropdown">
                                    </div>
                                </div>
                                <div class="cell b-quantity">
                                    <div class="quantity-form">
                                        <a class="quantity-down" href="javascript:void(0)">-</a>
                                        <input type="text" value="${numarr[i]}" />
                                        <a class="quantity-add" href="javascript:void(0)">+</a>
                                    </div>
                                </div>
                                <div class="cell b-sum">
                                    <strong>${(value.price*numarr[i]).toFixed(2)}</strong>
                                </div>
                                <div class="cell b-action">
                                    <a href="javascript:void(0)">删除</a>
                                </div>
                            </div>
                          </div>`

                                    oneprice += Number((value.price * numarr[i]).toFixed(2))



                                }
                            })

                        }
                        $('.item-list').append(str);

                        // 全选
                        var all = $('.allsel')
                        var input = $('.b-checkbox  .cart-checkbox input').not('.allsel')

                        all.on('click', function() {
                            // input.prop('checked', $(this).prop('checked'))
                            if ($(this).prop('checked')) {
                                input.prop('checked', true)
                                $('.totalprice').html(oneprice)
                            } else {
                                input.prop('checked', false)
                                $('.totalprice').html(0.00.toFixed(2))
                            }

                        })
                        input.on('click', function() {

                                if ($('.b-checkbox  .cart-checkbox input:checked').size() === input.size()) {
                                    all.prop('checked', true)

                                } else {
                                    all.prop('checked', false)
                                }
                                oneprice = 0
                                $('.goods-item-sele').each(function(index, elemet) {
                                    $('.totalprice').html(0.00.toFixed(2))


                                    if ($(this).find('.b-checkbox  .cart-checkbox input').prop('checked')) {

                                        oneprice += Number($(this).find('.b-sum strong').html())
                                    }
                                })
                                $('.totalprice').html(oneprice)

                            })
                            // 加减产品数量
                        jiajian()
                            // 删除
                        move()
                    })
                // 加减产品数量
            function jiajian() {
                $('.goods-item-sele').each(function(index, element) {

                    $(this).find('.quantity-add').on('click', function() {

                        var a = parseInt($(this).siblings('input').prop('value'))
                        a++
                        $(this).siblings('input').prop('value', a)
                            // var a = $(this).find('.quantity-form input').var()

                        numarr.splice(index, 1, a)

                        $.cookie('cookienum', numarr, { expires: 10, path: '/' })
                        var b = $(this).parent().parent().siblings('.b-price ').find('strong').html()
                        Number(b)
                        $(this).parent().parent().siblings(' .b-sum ').find('strong').html(a * b)

                    })
                    $(this).find('.quantity-down').on('click', function() {

                        var a = parseInt($(this).siblings('input').prop('value'))
                        a--
                        $(this).siblings('input').prop('value', a)

                        // var a = $(this).find('.quantity-form input').var()
                        numarr.splice(index, 1, a)
                        $.cookie('cookienum', numarr, { expires: 10, path: '/' })
                        var b = $(this).parent().parent().siblings('.b-price ').find('strong').html()
                        Number(b)
                        $(this).parent().parent().siblings(' .b-sum ').find('strong').html(a * b)
                    })
                })

            }
            // 删除
            function move() {
                $('.goods-item-sele').each(function(index, element) {
                    $(this).find(' .b-action a').on('click', function() {
                        // console.log()
                        // sidarr[index]

                        if (confirm('你确定要删除')) {
                            element.remove()
                            numarr.splice(index, 1)
                            sidarr.splice(index, 1)
                            $.cookie('cookienum', numarr, { expires: 10, path: '/' })
                            $.cookie('cookieid', sidarr, { expires: 10, path: '/' })
                        }


                    })
                })
            }
        }(),

    }

});