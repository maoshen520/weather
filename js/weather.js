$(function(){

    //天气图标的数据
    var weatherIcons = {

        yun: {
          title: '多云',
          icon: 'yun.png'
        },
    
        qing: {
          title: '晴',
          icon: 'qing.png'
        },
    
        lei: {
          title: '雷阵雨',
          icon: 'lei.png'
        },
    
        yu: {
          title: '小雨',
          icon: 'xiao.png'
        },
    
        //未知天气的默认图标
        default: {
          title: '未知',
          icon: ''
        }
    }

    //封装天气数据
    function weatherData(city){

        var data = {
            appid: '22282817',
            appsecret: 'IV7NU4m6',
            version: 'v6',
        };

        //输入框中的城市名赋给天气数据的city值
        if (city !== undefined) {
            data.city = city;
        }
            
        //获取当天的天气数据
        $.ajax({

            type:'GET',
            url:'https://www.tianqiapi.com/api',
            data:data,
            // {
            //     appid: '22282817',
            //     appsecret: 'IV7NU4m6',
            //     version: 'v6',
            // },

            dataType:'jsonp',
            success: function(data){

                console.log('data==>',data)

                //获取定位的位置名
                $('.cityname').text(data.city);
                $('.date').text(data.date);

                //获取实时天气数据
                var weatherData = ['date','week','tem','wea','air_level','win','win_speed','win_meter']
                for(var i=0;i<weatherData.length;i++){

                    //判断wea等于哪个，换对应的图标
                    if(weatherData[i] === 'wea'){
                        $('.' + weatherData[i]).css({
                            backgroundImage:'url(' + './images/' + (weatherIcons[data.wea_img] == undefined ? weatherIcons.default : weatherIcons[data.wea_img]).icon +')'
                        });
                    }else {
                        $('.' + weatherData[i]).text(weatherData[i] === 'tem' ? data[weatherData[i]] + '℃' : data[weatherData[i]]);
                    }
                }




                var data2 = {
                    appid: '22282817',
                    appsecret: 'IV7NU4m6',
                    version: 'v9',
                };

                //输入框中的城市名赋给天气数据的city值
                if (city !== undefined) {
                    data2.city = city;
                }

                //获取24小时天气和未来6天天气
                $.ajax({

                    type:'GET',
                    url:'https://www.tianqiapi.com/api',
                    data:data2,
                    // {
                    //     appid: '22282817',
                    //     appsecret: 'IV7NU4m6',
                    //     version: 'v9',
                    // },
                
                    dataType:'jsonp',
                    success: function(fulture){
                
                        console.log('fulture==>',fulture)

                        //24小时的天气数据
                        var houseWeather = fulture.data[0].hours;

                        $.each(houseWeather,function(i,v){

                            var $li = $(`<li>
                                    <div>${v.hours}</div>
                                    <div class="hoursDataImages">
                                        <img src="${'./images/' + (weatherIcons[data.wea_img] == undefined ? weatherIcons.default : weatherIcons[data.wea_img]).icon }" alt="">
                                    </div>
                                    <div>${v.tem}℃</div>
                                    <div>${v.win}</div>
                                </li>`)
                            $('.hWeather').append($li);

                        })


                        //获取未来六天的天气数据
                        var fultureData = fulture.data.slice(1);//slice为生成一个新的数组，从fulture.data下的下标为1的元素开始
                        console.log('fultureData==>',fultureData);

                        $.each(fultureData,function(i,v){

                            var $li = $(`<li class="clearfix">
                            <div>${v.day.replace(/（星期[一二三四五六日]）/, '')}</div>
                            <div class="fultureDataImages">
                                <img src="${'./images/' + (weatherIcons[data.wea_img] == undefined ? weatherIcons.default : weatherIcons[data.wea_img]).icon }" alt="">                       
                            </div>  
                            <div>${v.tem2 + '℃' + '~' + + v.tem1 + '℃'}</div>
                            <div>${v.win}</div>
                        </li>`)
                        $('.fWeather').append($li)

                        })
                        // <div class="fultureDataImages" style="background-image:url(' ${'./images/' + (weatherIcons[data.wea_img] == undefined ? weatherIcons.default : weatherIcons[data.wea_img]).icon }')"></div>

                    }
                })
            }
        
        })
    }
    weatherData()


    // 搜索框绑定事件
    $('.search-icon').on('click',function(){

        //获取输入的城市
        var city = $('.inp').val();
        console.log('city==>',city)

        if (city == undefined || city.trim() == '') {
            return;
        }

        //先清除这两个里的数据,在添加新的数据
        $('.hWeather,.fWeather').empty();


        weatherData(city);

    })

})