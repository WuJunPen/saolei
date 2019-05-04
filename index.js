$(function () {
    var leiCode = 'X';
    var box = $(".box");
    var arr;
    var rows = 16;
    var cols = 16;
    createLei(rows, cols);
    //随机产生雷并保存到数组中
    function createLei(row, col) {
        arr = new Array(row);  //先声明一维 
        //再声明二维 
        for (var j = 0; j < row; j++) {
            arr[j] = new Array(col);
        }

        for (var i = 0; i < 20; i++) {
            var ran1 = Math.floor(Math.random() * 16);
            var ran2 = Math.floor(Math.random() * 16);
            if (arr[ran1][ran2] == leiCode)
                i--;
            else
                arr[ran1][ran2] = leiCode;
        }

    }

    calcLeiNum(rows, cols);
    function calcLeiNum(row, col) {
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var num = 0;
                if (arr[i][j] === leiCode) continue;
                //判断左上  
                if ((i - 1 >= 0) && (j - 1 >= 0)) {
                    if (arr[i - 1][j - 1] == leiCode)
                        num++;
                }
                //判断正上  
                if (i >= 1) {
                    if (arr[i - 1][j] == leiCode)
                        num++;
                }
                //判断右上  
                if ((i - 1 >= 0) && (j <= col - 2)) {
                    if (arr[i - 1][j + 1] == leiCode)
                        num++;
                }
                //判断左边  
                if (j >= 1) {
                    if (arr[i][j - 1] == leiCode)
                        num++;
                }
                //判断右边   
                if (j <= col - 2) {
                    if (arr[i][j + 1] == leiCode)
                        num++;
                }
                //判断左下  
                if ((i <= row - 2) && (j - 1 >= 0)) {
                    if (arr[i + 1][j - 1] == leiCode)
                        num++;
                }
                //判断正下  
                if (i <= row - 2) {
                    if (arr[i + 1][j] == leiCode)
                        num++;
                }
                //判断右下  
                if ((i <= row - 2) && (j <= col - 2)) {
                    if (arr[i + 1][j + 1] == leiCode)
                        num++;
                }
                arr[i][j] = num;
            }
        }
    }

    //初始化布局
    (function init() {
        for (var i = 0; i < 16; i++) {
            var ul = $("<ul></ul>");
            ul.css({ "width": "100%", "height": "40px", "margin-bottom": "4px", "list-style": "none" });
            box.append(ul);

            for (var j = 0; j < 16; j++) {

                var li = $("<li></li>");
                li.attr('id', i + "." + j);
                console.log(li.attr('id'));

                if (arr[i][j] == leiCode)//如果是雷
                    //console.log(arr[i][j]);
                    li.attr('class', 'lei');
                else {
                    li.attr('class', arr[i][j]);//标记周围雷的数目
                    //console.log(li.attr('class'));
                }
                li.css({
                    "float": "left",
                    "width": "49px",
                    "height": "43px",
                    "background-color": "gray  ",
                    "list-style": "none",
                    "margin-right": "1px",

                }
                )
                ul.append(li);
            }

        }

    })()

    //动态绑定事件

    // $(".box li").on("click", function () {
    //     if ($(this).attr('class') === 'lei') {
    //         $(this).css('background', 'url(images/timg.jpg) no-repeat center center');
    //     }
    //     else 
    //         console.log($(this).val());
    // }
    // )
    $(".box").delegate("li", "click", function () {
        if ($(this).attr('class') === 'lei') {
            for (var i = 0; i < 16 * 16; i++) {
                var li = $('li').eq(i);
                if (li.attr('class') == 'lei')
                    li.css('background', 'url(images/timg.jpg) no-repeat center center');
            }
        }
        else if ($(this).attr('class') === '0') {
            //$(this).css("background-color", "yellow");
            showSpace($(this));
        }
        else
            //console.log($(this).val());
            $(this).html($(this).attr('class'));
            $(this).css("background-color", "yellow");

    }
    )
    var li = $('.box').find('li');

    function findLi(row, col) {
        for (var i = 0; i < 16 * 16; i++) {
            if ($('li').eq(i).attr('id') == row + '.' + col)
                var li = $('li').eq(i);
        }
        return li;
    }

    //如果是空白格子即周围没有雷的话打开周围所有的格子
    function showSpace(object) {
        var id = object.attr("id");
        var row = parseInt(id.split('.')[0]);
        var col = parseInt(id.split('.')[1]);
        //console.log(row, col);
        //var li = findLi(row, col);
        if (object.css("background-color") == "yellow")
            return;
        object.css("background-color", "yellow");
        

        if (object.attr('class') == '0') {
            //判断左上  
            if ((row - 1 >= 0) && (col - 1 >= 0)) {
                var li = findLi(row - 1, col - 1);
                if(li.attr('class') != 'lei')
                   showSpace(li);
            }
            //判断正上  
            if (row >= 1) {
                console.log(666);
                
                var li = findLi(row - 1, col);
                if(li.attr('class') != 'lei')
                    showSpace(li);
            }
            //判断右上  
            if ((row - 1 >= 0) && (col <= cols - 2)) {
                var li = findLi(row - 1, col + 1);
                if(li.attr('class') != 'lei')
                    showSpace(li);
            }
            //判断左边  
            if (col >= 1) {
                var li = findLi(row, col - 1);
                if(li.attr('class') != 'lei')
                    showSpace(li);
            }
             //判断右边   
             if(col<=cols-2){  
                var li = findLi(row, col + 1);
                if(li.attr('class') != 'lei')
                    showSpace(li);
             }
        }else
            object.html(li.attr('class'));



            // //判断左上  
            // if ((row - 1 >= 0) && (col - 1 >= 0)) {
            //     // for (var i = 0; i < 16 * 16; i++) {
            //     //     if ($('li').eq(i).attr('id') == (row - 1) + '.' + (col - 1))
            //     //         var li = $('li').eq(i);
            //     // }
            //     var li = findLi(row - 1, col - 1);
            //     //console.log(li.attr('id'));
            //     if (li.attr('class') != '0') {
            //         li.html(li.attr('class'));
            //         li.css("background-color", "yellow");
            //     } else {
            //         li.css("background-color", "yellow");
            //         showSpace(li);
            //     }
            // }

            // //判断正上  
            // if (row >= 1) {
            //     var li = findLi(row - 1, col);
            //     //console.log(li.attr('id'));
            //     if (li.attr('class') != '0') {
            //         li.html(li.attr('class'));
            //         li.css("background-color", "yellow");
            //     } else {
            //         li.css("background-color", "yellow");
            //         showSpace(li);
            //     }
            // }

            // //判断右上  
            // if ((row - 1 >= 0) && (col <= col - 2)) {
            //     var li = findLi(row - 1, col + 1);
            //     if (li.attr('class') != '0') {
            //         li.html(li.attr('class'));
            //         li.css("background-color", "yellow");
            //     } else {
            //         li.css("background-color", "yellow");
            //         showSpace(li);
            //     }
            // }

            // //判断左边  
            // if (col >= 1) {
            //     var li = findLi(row, col - 1);
            //     if (li.attr('class') != '0') {
            //         li.html(li.attr('class'));
            //         li.css("background-color", "yellow");
            //     } else {
            //         li.css("background-color", "yellow");
            //         showSpace(li);
            //     }
            // }
        }

        function digui(i) {
            if (i >= 0 || i < 256) {
                if ((li.eq(i).attr('class') == '0') && (li.eq(i).attr('background-color') != 'yellow')) {
                    if (i % 16 != 0 && (li.eq(i - 1).attr('background-color') != 'yellow')) {
                        var dom = li.eq(i - 1);
                        dom.css("background-color", "yellow");
                        if (dom.attr('class') != '0') dom.html(dom.attr('class'));
                        else digui(i - 1);
                    }
                    if ((i + 1) % 16 != 0) {
                        var dom = li.eq(i + 1)
                        dom.css("background-color", "yellow");
                        if (dom.attr('class') != '0') dom.html(dom.attr('class'));
                        digui(i + 1);
                    }
                    if ((i - 16) >= 0) {
                        var dom = li.eq(i - 16)
                        dom.css("background-color", "yellow");
                        if (dom.attr('class') != '0') dom.html(dom.attr('class'));
                        digui(i - 16);
                    }
                    if ((i + 16) < 256) {
                        var dom = li.eq(i + 16)
                        dom.css("background-color", "yellow");
                        if (dom.attr('class') != '0') dom.html(dom.attr('class'));
                        digui(i + 16);
                    }
                    if ((i - 16) >= 0 && (i % 16 != 0)) {
                        var dom = li.eq(i - 17)
                        dom.css("background-color", "yellow");
                        if (dom.attr('class') != '0') dom.html(dom.attr('class'));
                        digui(i - 17);
                    }
                    if ((i - 16) >= 0 && (i + 1) % 16 != 0) {
                        var dom = li.eq(i - 15)
                        dom.css("background-color", "yellow");
                        if (dom.attr('class') != '0') dom.html(dom.attr('class'));
                        digui(i - 15);
                    }
                    if ((i + 16) < 256 && (i % 16 != 0)) {
                        var dom = li.eq(i + 15)
                        dom.css("background-color", "yellow");
                        if (dom.attr('class') != '0') dom.html(dom.attr('class'));
                        digui(i + 15);
                    }
                    if ((i + 16) < 256 && ((i + 1) % 16 != 0)) {
                        var dom = li.eq(i + 17)
                        dom.css("background-color", "yellow");
                        if (dom.attr('class') != '0') dom.html(dom.attr('class'));
                        digui(i + 17);
                    }
                }
            }
        }
    })