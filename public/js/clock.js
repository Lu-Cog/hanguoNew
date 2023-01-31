function clockModule(options) {
    this._initial(options);
}
clockModule.prototype = {
    constructor: this,
    _initial: function (options) {
        var par = {
            Module: [],//需要显示时钟的模块，不限个数
            clocksize: [200, 200],//时钟大小,默认200，如果定义的单独时钟无长宽大小，默认为该值大小
            clockbgcolor: "#ffffff",//时钟背景颜色
            defaultcolor: {
                kdcolor: "#eee",
                zscolor: "#000",
                Minutehand: "#000",//分针颜色
                Hourhand: "#000",//时针颜色
                Secondhand: "#f00",//秒针颜色
                textcolor: "#000000",//文字颜色
                brimcolor: "#000000"//边框颜色
            },
            clockparameter: [{
                timezone: '',//时区
                cw: null,//宽度
                ch: null,//高度
                bgcolor: null,//时钟背景颜色
                cityName: '',//城市名称
                cityEnglish: '',//英文名称
                font: '',//字体大小设置
                kdcolor: null,
                zscolor: null,
                Minutehand: null,
                Hourhand: null,
                Secondhand: null,
                textcolor: null,
                brimcolor: null//边框颜色
            }],//每个时钟的参数配置
            expandmethod: function () { }//自定义扩展方法类
        };
        //封装extend合并方法
        this.extend = function (o, n, override) {
            for (var key in n) {
                if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
                    o[key] = n[key];
                }
            }
            return o;
        };
        this.$ = function (className, topWindow) {
            var expression = /^\#|[\.]|\-\b$/;
            var v = expression.test(className);
            if (v == true) {
                if (className.indexOf("#") != -1) {
                    topWindow != undefined ? className = topWindow.getElementById(className.slice(1)) : className = document.getElementById(className.slice(1));
                } else if (className.indexOf(".") != -1) {
                    if (!document.getElementsByClassName) {
                        topWindow != undefined ? className = this.getElementsByClassName(topWindow, className.slice(1))[0] : className = this.getElementsByClassName(document, className.slice(1))[0];
                    } else {
                        topWindow != undefined ? className = topWindow.getElementsByClassName(className.slice(1))[0] : className = document.getElementsByClassName(className.slice(1))[0];
                    }
                }
            }
            return className;
        };
        //判断是否存在class属性方法
        this.hasClass = function (elements, cName) {
            return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
        };
        //添加class属性方法
        this.addClass = function (elements, cName) {
            if (!this.hasClass(elements, cName)) {
                elements.className += " " + cName;
            };
        };
        //删除class属性方法 elements当前结构  cName类名
        this.removeClass = function (elements, cName) {
            if (this.hasClass(elements, cName)) {
                elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换
            };
        };
        this.eve = function (eve) {
            var evt = eve || window.event; //指向触发事件的元素
            var obj = evt.target || evt.srcElement || eve.srcElement; //指向触发事件的元素
            return obj;
        },
            //根据class类名条件筛选结构
            this.getElementsByClassName = function (parent, className) {
                //获取所有父节点下的tag元素　
                var aEls = parent.getElementsByTagName("*");
                var arr = [];
                //循环所有tag元素　
                for (var i = 0; i < aEls.length; i++) {
                    //将tag元素所包含的className集合（这里指一个元素可能包含多个class）拆分成数组,赋值给aClassName	　　　　
                    var aClassName = aEls[i].className.split(' ');　　　　 //遍历每个tag元素所包含的每个className
                    for (var j = 0; j < aClassName.length; j++) {　　　　　　 //如果符合所选class，添加到arr数组				　　　　　
                        if (aClassName[j] == className) {
                            arr.push(aEls[i]);　　　　　　　　 //如果className里面包含'box' 则跳出循环						　　　　　　　　
                            break; //防止一个元素出现多次相同的class被添加多次						　　　　　　
                        }
                    };
                };
                return arr;
            }
        this.par = this.extend(par, options, true);
        this.show(this.par, this);
    },
    show: function (par, clock) {
        var doclist = par.Module;
        for (var i = 0; i < doclist.length; i++) {
            var pagination = clock.$(doclist[i]);
            var clockparameter = clock.par.clockparameter[i];
            if (clockparameter != undefined) {
                clock.clocksite(pagination, clock, clockparameter);
            }
        }
        clock.par.expandmethod(clock);
    },
    clocksite: function (doc, clock, clockparameter) {
        var kdcolor, zscolor, Minutehand, Hourhand, Secondhand, textcolor, brimcolor;
        var canvasbox = document.createElement("canvas");
        clock.addClass(canvasbox, "canvasbox");
        canvasbox.style.overflow = "hidden";
        canvasbox.style.borderRadius = "50%";
        doc.appendChild(canvasbox);
        // var titletime = document.createElement("div");
        // clock.addClass(titletime,"titletime");
        // doc.appendChild(titletime);
        // var titleName= document.createElement("div");
        // clock.addClass(titleName,"cityName");
        // titleName.innerHTML=clockparameter.cityName;
        // doc.appendChild(titleName);
        // var titleEnglish = document.createElement("div");
        // clock.addClass(titleEnglish,"cityEnglish");
        // titleEnglish.innerHTML=clockparameter.cityEnglish;
        // doc.appendChild(titleEnglish);
        if (clockparameter.cw == null && clockparameter.ch == null) {
            var clocksize = clock.par.clocksize;
            for (var i = 0; i < clocksize.length; i++) {
                if (i == 0) {
                    canvasbox.height = clocksize[i];
                } else if (i == 1) {
                    canvasbox.width = clocksize[i];
                }
            }
        } else {
            canvasbox.height = clockparameter.ch;
            canvasbox.width = clockparameter.cw;
        }
        if (clockparameter.bgcolor == null) {
            canvasbox.style.backgroundColor = clock.par.clockbgcolor;
        } else {
            canvasbox.style.backgroundColor = clockparameter.bgcolor;
        }
        if (clockparameter.kdcolor == null) {
            kdcolor = clock.par.defaultcolor.kdcolor;
        } else {
            kdcolor = clockparameter.kdcolor;
        }
        if (clockparameter.zscolor == null) {
            zscolor = clock.par.defaultcolor.zscolor;
        } else {
            zscolor = clockparameter.zscolor;
        }
        if (clockparameter.Minutehand == null) {
            Minutehand = clock.par.defaultcolor.Minutehand;
        } else {
            Minutehand = clockparameter.Minutehand;
        }
        if (clockparameter.Hourhand == null) {
            Hourhand = clock.par.defaultcolor.Hourhand;
        } else {
            Hourhand = clockparameter.Hourhand;
        }
        if (clockparameter.Secondhand == null) {
            Secondhand = clock.par.defaultcolor.Secondhand;
        } else {
            Secondhand = clockparameter.Secondhand;
        }
        if (clockparameter.textcolor == null) {
            textcolor = clock.par.defaultcolor.textcolor;
        } else {
            textcolor = clockparameter.textcolor;
        }
        if (clockparameter.brimcolor == null) {
            brimcolor = clock.par.defaultcolor.brimcolor;
        } else {
            brimcolor = clockparameter.brimcolor;
        }
        var ctx = canvasbox.getContext("2d");
        var width = ctx.canvas.clientWidth;
        var height = ctx.canvas.clientHeight;
        var r = width / 2;
        var rem = width / 200;
        var drawAround = function () {
            ctx.save();
            ctx.beginPath();
            ctx.translate(r, r);
            ctx.lineWidth = 5 * rem;
            ctx.strokeStyle = brimcolor;
            ctx.arc(0, 0, r - 5, 0, 2 * Math.PI, false);
            ctx.stroke();
            var housNumbers = [];
            ctx.font = clockparameter.font;
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            housNumbers.forEach(function (number, i) {
                var rad = 2 * Math.PI / 12 * i;
                var x = Math.cos(rad) * (r - 30);
                var y = Math.sin(rad) * (r - 30);
                ctx.fillStyle = textcolor;
                ctx.fillText(number, x, y);
            });
            for (var i = 0; i < 60; i++) {
                var rad = 2 * Math.PI / 60 * i;
                var x = Math.cos(rad) * (r - 12);
                var y = Math.sin(rad) * (r - 12);
                ctx.beginPath();
                if (i % 5 != 0) {
                    ctx.fillStyle = kdcolor;
                } else {
                    ctx.fillStyle = zscolor;
                }
                ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
                ctx.fill();
            }
        }
        var drawhHour = function (hour, minute) {
            ctx.save()
            ctx.beginPath();
            var rad = 2 * Math.PI / 12 * hour;
            var mrad = 2 * Math.PI / 12 / 60 * minute;
            ctx.rotate(rad + mrad);
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            ctx.strokeStyle = Hourhand;
            ctx.moveTo(0, 10);
            ctx.lineTo(0, -r / 2);
            ctx.stroke();
            ctx.restore();
        }
        var drawMinute = function (minute) {
            ctx.save()
            ctx.beginPath();
            var rad = 2 * Math.PI / 60 * minute;
            ctx.rotate(rad);
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.strokeStyle = Minutehand;
            ctx.moveTo(0, 10);
            ctx.lineTo(0, -r + 20);
            ctx.stroke();
            ctx.restore();
        }
        var drawSecond = function (second) {
            ctx.save()
            ctx.beginPath();
            var rad = 2 * Math.PI / 60 * second;
            ctx.rotate(rad);
            ctx.fillStyle = Secondhand;
            ctx.moveTo(-2, 20);
            ctx.lineTo(2, 20);
            ctx.lineTo(1, -r + 18);
            ctx.lineTo(-1, -r + 18);
            ctx.fill();
            ctx.restore();
        }
        var drawDot = function () {
            ctx.beginPath();
            ctx.fillStyle = "#fff";
            ctx.arc(0, 0, 3, 0, 2 * Math.PI, false);
            ctx.fill();
        }
        // var datetime=function(hour, minute,clockdate){
        // 	titletime.innerHTML=clockdate+"<span>"+hour+"</span>:<span>"+minute+"</span>";
        // }
        var draw = function () {
            ctx.clearRect(0, 0, width, height);
            var timezone = clockparameter.timezone; //目标时区时间
            var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
            var nowDate = new Date().getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
            var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
            var hour = targetDate.getHours();
            var minute = targetDate.getMinutes();
            var second = targetDate.getSeconds();
            var Month = targetDate.getMonth();
            var Dates = targetDate.getDate();
            var clockdate = Month + "月" + Dates + "日";
            drawAround();
            drawSecond(second);
            drawMinute(minute);
            drawhHour(hour, minute);
            // datetime(hour, minute,clockdate)
            drawDot();
            ctx.restore();
        }
        draw();
        setInterval(draw, 1000);
    }
}


