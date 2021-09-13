// 初次加载页面显示 loading 动画
$(window).on('load', function() {
    // 当页面完全呈现后隐藏 loading 动画
    $('#is-loading').hide(0);
});
// END 初次加载页面显示 loading 动画
// 日夜模式开关切换页面背景颜色
var Arraycolor= new Array ("color","#000000dd","rgb(222 129 129 / 15%)"); // 第二个颜色是黑夜模式的背景色，第三个是白天的（即默认）背景色
var n=0;
function editBodyBg(){
    if (n==(Arraycolor.length-1)) n=0;
    n++;
    document.body.style.background = Arraycolor[n];
};
// END 日夜模式开关切换页面背景颜色
// 时间与日期
function getTime() {
    var dateObj = new Date();
    var year = dateObj.getFullYear(); // 年
    var month = dateObj.getMonth() + 1; // 月 (注意：月份+1)
    var date = dateObj.getDate(); // 日
    var day = dateObj.getDay();
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var week = weeks[day]; // 根据day值，获取星期数组中的星期数。
    var hours = dateObj.getHours(); // 小时
    var minutes = dateObj.getMinutes(); // 分钟
    var seconds = dateObj.getSeconds(); // 秒
    if (month < 10) {
        month = "0" + month;
    };
    if (date < 10) {
        date = "0" + date;
    };
    if (hours < 10) {
        hours = "0" + hours;
    };
    if (minutes < 10) {
        minutes = "0" + minutes;
    };
    if (seconds < 10) {
        seconds = "0" + seconds;
    };
    var newTime = hours + ":" + minutes + ":" + seconds; // 获取时间
    var newDate = year + "年" + month + "月" + date + "日" + "&nbsp &nbsp" + week; // 获取年月日
    document.getElementById("time").innerHTML = newTime; // 在div中写入时间
    document.getElementById("date").innerHTML = newDate; // 在div中写入年月日
    setTimeout('getTime()', 500); // 每隔 500ms 执行一次 getTime()
};
// END 时间与日期
// 搜索引擎
$(document).ready(function () {
    //搜索引擎菜单列表默认参数
    var se_list_preinstall = {
        '1': {
            id: 1,
            title: "必应",
            url: "https://cn.bing.com/search",
            name: "q",
            img: "../img/search/bing.png",
        },
        '2': {
            id: 2,
            title: "谷歌",
            url: "https://www.google.com/search",
            name: "q",
            img: "../img/search/google.png",
        },
        '3': {
            id: 3,
            title: "百度",
            url: "https://www.baidu.com/s",
            name: "wd",
            img: "../img/search/baidu.ico",
        },
        '4': {
            id: 4,
            title: "GitHub",
            url: "https://github.com/search",
            name: "q",
            img: "../img/search/github.png",
        },
        '5': {
            id: 5,
            title: "哔哩哔哩",
            url: "https://search.bilibili.com/all",
            name: "keyword",
            img: "../img/search/bilibili.png",
        },
        '6': {
            id: 6,
            title: "MDN",
            url: "https://developer.mozilla.org/zh-CN/search",
            name: "q",
            img: "../img/search/mdn.png",
        },
        '7': {
            id: 7,
            title: "菜鸟教程",
            url: "https://www.runoob.com",
            name: "s",
            img: "../img/search/cainiaojiaocheng.png",
        },
        '8': {
            id: 8,
            title: "思否",
            url: "https://segmentfault.com/search",
            name: "q",
            img: "../img/search/segmentfault.ico",
        },
        '9': {
            id: 9,
            title: "掘金",
            url: "https://juejin.im/search",
            name: "query",
            img: "../img/search/juejin.png",
        },
        '10': {
            id: 10,
            title: "知乎",
            url: "https://www.zhihu.com/search",
            name: "q",
            img: "../img/search/zhihu.jpg",
        },
    };
    //获取搜索引擎列表参数
    function getSeList() {
        var se_list_local = Cookies.get('se_list');
        if (se_list_local !== "{}" && se_list_local) {
            return JSON.parse(se_list_local);
        } else {
            setSeList(se_list_preinstall);
            return se_list_preinstall;
        };
    };
    //载入搜索引擎列表参数
    function setSeList(se_list) {
        if (se_list) {
            Cookies.set('se_list', se_list, { expires: 36500 });
            return true;
        };
        return false;
    };
    //选择搜索引擎点击事件
    $(document).on('click', function (e) {
        if ($(".search-engine").is(":hidden") && $(".se").is(e.target)) {
            if ($(".se").is(e.target)) {
                seList();
                $(".search-engine").show();
            };
        } else {
            if (!$(".search-engine").is(e.target) && $(".search-engine").has(e.target).length === 0) {
                $(".search-engine").hide();
            };
        };
    });
    //点击搜索引擎列表
    $(".search-engine-list").on("click", ".se-li", function () {
        var url = $(this).attr('url');
        var name = $(this).attr('name');
        var img = $(this).attr('img');
        $(".search").attr("action", url);
        $(".wd").attr("name", name);
        $(".se").attr("src", img);
        $(".search-engine").hide();
    });
    //加载搜索引擎列表
    function seList() {
        var html = "";
        var se_list = getSeList();
        for (var i in se_list) {
            html += "<li class='se-li' url='" + se_list[i]["url"] + "' name='" + se_list[i]["name"] + "' img='" + se_list[i]["img"] + "'><img src='" + se_list[i]["img"] + "'></img>" + se_list[i]["title"] + "</li>";
        };
    };
    // 生成并引入搜索引擎列表 cookie
    (function (factory) {
        var registeredInModuleLoader;
        if (typeof define === 'function' && define.amd) {
            define(factory);
            registeredInModuleLoader = true;
        };
        if (typeof exports === 'object') {
            module.exports = factory();
            registeredInModuleLoader = true;
        };
        if (!registeredInModuleLoader) {
            var OldCookies = window.Cookies;
            var api = window.Cookies = factory();
            api.noConflict = function () {
                window.Cookies = OldCookies;
                return api;
            };
        };
    }(function () {
        function extend() {
            var i = 0;
            var result = {};
            for (; i < arguments.length; i++) {
                var attributes = arguments[i];
                for (var key in attributes) {
                    result[key] = attributes[key];
                };
            };
            return result;
        };
        function decode(s) {
            return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
        };
        function init(converter) {
            function api() { }
            function set(key, value, attributes) {
                if (typeof document === 'undefined') {
                    return;
                };
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);
                if (typeof attributes.expires === 'number') {
                    attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
                };
                // We're using "expires" because "max-age" is not supported by IE
                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
                try {
                    var result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    };
                } catch (e) { }
                value = converter.write ?
                    converter.write(value, key) :
                    encodeURIComponent(String(value))
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                key = encodeURIComponent(String(key))
                    .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                    .replace(/[\(\)]/g, escape);
                var stringifiedAttributes = '';
                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue;
                    };
                    stringifiedAttributes += '; ' + attributeName;
                    if (attributes[attributeName] === true) {
                        continue;
                    };
                    // Considers RFC 6265 section 5.2:
                    // ...
                    // 3.  If the remaining unparsed-attributes contains a %x3B (";")
                    //     character:
                    // Consume the characters of the unparsed-attributes up to,
                    // not including, the first %x3B (";") character.
                    // ...
                    stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
                };
                return (document.cookie = key + '=' + value + stringifiedAttributes);
            };
            function get(key, json) {
                if (typeof document === 'undefined') {
                    return;
                };
                var jar = {};
                // To prevent the for loop in the first place assign an empty array
                // in case there are no cookies at all.
                var cookies = document.cookie ? document.cookie.split('; ') : [];
                var i = 0;
                for (; i < cookies.length; i++) {
                    var parts = cookies[i].split('=');
                    var cookie = parts.slice(1).join('=');
                    if (!json && cookie.charAt(0) === '"') {
                        cookie = cookie.slice(1, -1);
                    };
                    try {
                        var name = decode(parts[0]);
                        cookie = (converter.read || converter)(cookie, name) ||
                            decode(cookie);
                        if (json) {
                            try {
                                cookie = JSON.parse(cookie);
                            } catch (e) { }
                        };
                        jar[name] = cookie;
                        if (key === name) {
                            break;
                        };
                    } catch (e) { }
                };
                return key ? jar[key] : jar;
            };
            api.set = set;
            api.get = function (key) {
                return get(key, false /* read as raw */);
            };
            api.getJSON = function (key) {
                return get(key, true /* read as json */);
            };
            api.remove = function (key, attributes) {
                set(key, '', extend(attributes, {
                    expires: -1
                }));
            };
            api.defaults = {};
            api.withConverter = init;
            return api;
        };
        return init(function () { });
    }));
});
// END 搜索引擎
// 一言语句
$(document).ready(function hitokoto() {
    fetch('https://v1.hitokoto.cn/?c=i')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // 一言语句正文
            var hitokoto = document.getElementById('hitokoto');
            hitokoto.innerText = '\xa0\xa0\xa0\xa0' + data.hitokoto;
            // 一言语句作者与出处
            var hitofrom = document.getElementById('hitofrom');
            hitofrom.innerText = "—" + " " + data.from_who + '\xa0' + "《 " + data.from + " 》";
            // data.hitokoto: 正文
            // data.from_who: 作者
            // data.from: 出处
        })
        .catch(function (err) {
            console.error(err);
        });
});
// END 一言语句