define(['jquery.pagination'], function() {
    let array_default = []
    let array = []
    let prev = null
    let next = null
    return {
        listRender: ! function() {
            $.ajax({
                url: 'http://localhost/h5/umyjs/taobaoitem_test/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = ''
                $.each(data, function(index, value) {
                    $strhtml += `     <li>
                    <a href="./detail.html?sid=${value.sid}"><img class="lazy" src=" ${value.url }" alt=" ">
                        <h5>${value.title}</h5>
    
                        <p class="item"> 活动价3099元爆款热销中
                        </p>
                        <p class="price">${value.price}</p>
                    </a>
                </li>`
                })
                $('.list ul').html($strhtml)
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
                $('.list li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });

            })
        }(),
        page: ! function() {
            $('.page').pagination({
                pageCount: 3, //总的页数
                jump: true, //是否开启跳转到指定的页数，布尔值。
                prevContent: '上一页', //将图标改成上一页下一页。
                nextContent: '下一页',
                callback: function(api) {
                    console.log(api.getCurrent()); //获取当前的点击的页码。
                    $.ajax({
                        url: 'http://localhost/h5/umyjs/taobaoitem_test/php/listdata.php',
                        data: {
                            page: api.getCurrent() //传输数据
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        let $strhtml = '<ul>';
                        $.each(data, function(index, value) {
                            $strhtml += `
                                <li>
                                    <a href="detail.html?sid=${value.sid}" target="_blank">
                                        <img src="${value.url}"/>
                                        <p>${value.sid}${value.title}</p>
                                        <span class="price">￥${value.price}</span>
                                        <span>${value.sailnumber}</span>
                                    </a>
                                </li>
                            `;
                        });
                        $strhtml += '</ul>';
                        $('.list').html($strhtml);

                        //将页面的li元素加载到两个数组中
                        $('.list li').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });
                    });
                }

            });

        }(),
        paixu: ! function() {
            // 默认
            $('.list-body  button').eq(0).on('click', function() {
                    $.each(array_default, function(index, value) {
                        $('.list ul').append(value);
                    });
                    return;
                })
                // 升序
            $('.list-body  button').eq(1).on('click', function() {

                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html()); //取上个价格
                        next = parseFloat(array[j + 1].find('.price').html()); //下一个的价格
                        console.log(prev)
                            //通过价格的判断，改变的是数组li的位置。
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }


                $.each(array, function(index, value) {
                    $('.list ul').append(value);
                });
            });
        }()
    }

});