(function() {
    var CLIENT_WIDTH = document.body.clientWidth || document.documentElement.clientWidth,
        CLIENT_HEIGHT = document.body.clientHeight || document.documentElement.clientHeight;
    var Contrast = {
        setBg: function(src) {
            var img = new Image();
            img.src = src;
            img.onload = function() {
                Contrast.width = CLIENT_WIDTH;
                Contrast.height = img.height * CLIENT_WIDTH / img.width;
            }
            contrast_bg.style.backgroundImage = "url(" + src + ")";
        },
        width: 0,
        height: 0
    };
    window.Contrast = Contrast;

    // 对比
    var contOption = {
        active: false,
        lt_active: false,
        rt_active: false,
        lb_active: false,
        rb_active: false,
        opacity: 1,
        x: 0,
        y: 0,
        width: CLIENT_WIDTH / 2,
        height: CLIENT_HEIGHT / 2
    };
    var sx, sy, dx, dy; //0:default,1:对比,2:测量
    var contrast = document.createElement("div"),
        contrast_bg = document.createElement("div");
    document.body.appendChild(contrast);
    var cont_range = document.createElement("div"),
        cont_range_span = document.createElement("span");
    contrast.appendChild(contrast_bg).className = "contrast-bg";
    contrast.appendChild(cont_range).className = "contrast-range";
    contrast.appendChild(cont_range_span).className = "contrast-percentage";

    var cont_lt = document.createElement('span'),
        cont_rt = document.createElement('span'),
        cont_lb = document.createElement('span'),
        cont_rb = document.createElement('span');
    contrast.className = "contrast-box";
    contSet();
    contrast.appendChild(cont_lt).className = 'contrast-lt';
    contrast.appendChild(cont_rt).className = 'contrast-rt';
    contrast.appendChild(cont_lb).className = 'contrast-lb';
    contrast.appendChild(cont_rb).className = 'contrast-rb';

    function contSet() {
        contrast.style.left = contOption.x + 'px';
        contrast.style.top = contOption.y + 'px';
        if (contOption.width < 50) {
            contOption.width = 50;
        }
        contrast.style.width = contOption.width + 'px';
        if (contOption.height < 50) {
            contOption.height = 50;
        }
        contrast.style.height = contOption.height + 'px';
        contrast_bg.style.backgroundPosition = [(-contOption.x + 'px'), (-contOption.y + 'px')].join(' ');
    }
    var r_sw = 0,
        r_sx, r_dx;
    cont_range.addEventListener('touchstart', function(event) {
        cont_range_span.style.opacity = 1;
        r_sw = cont_range.offsetWidth;
        r_sx = event.touches[0].clientX;
        event.stopPropagation();
        event.preventDefault();
    });
    cont_range_isMoving = false;
    cont_range.addEventListener('touchmove', function(event) {
        cont_range_isMoving = true;
        r_dx = event.touches[0].clientX - r_sx;
        r_sx = event.touches[0].clientX;
        contOption.opacity += (r_dx) / r_sw;
        if (contOption.opacity > 1) {
            contOption.opacity = 1;
        } else if (contOption.opacity < 0) {
            contOption.opacity = 0;
        }
        cont_range_span.innerText = "opacity:" + parseInt(contOption.opacity * 100) + "%";
        contrast_bg.style.opacity = contOption.opacity;

        event.stopPropagation();
        event.preventDefault();
    });
    cont_range.addEventListener("touchend", function() {
        cont_range_isMoving = false;
        setTimeout(function() {
            if (cont_range_isMoving) {
                return;
            }
            cont_range_span.style.opacity = 0;
        }, 600);
    });

    contrast.addEventListener('touchstart', function(event) {
        if (toolbarOption.fullScreen.acitve) {
            return;
        }
        if (event.target == contrast || event.target == contrast_bg) {
            sx = event.touches[0].clientX;
            sy = event.touches[0].clientY;
            event.stopPropagation();
            event.preventDefault();
        }
    });

    document.addEventListener('touchmove', function(event) {
        if (toolbarOption.fullScreen.acitve) {
            return;
        }
        if (event.target == contrast || event.target == contrast_bg) {
            dx = event.touches[0].clientX - sx;
            dy = event.touches[0].clientY - sy;
            sx = event.touches[0].clientX;
            sy = event.touches[0].clientY;
            contOption.x += dx;
            contOption.y += dy;
            contSet();
        }
    });

    document.addEventListener('touchstart', function(event) {
        contOption.lt_active = event.target == cont_lt;
        contOption.rt_active = event.target == cont_rt;
        contOption.lb_active = event.target == cont_lb;
        contOption.rb_active = event.target == cont_rb;
        sx = event.touches[0].clientX;
        sy = event.touches[0].clientY;
    });
    document.addEventListener('touchmove', function(event) {
        dx = event.touches[0].clientX - sx;
        dy = event.touches[0].clientY - sy;
        sx = event.touches[0].clientX;
        sy = event.touches[0].clientY;
        if (contOption.lt_active) {
            contOption.x += dx;
            contOption.y += dy;
            contOption.width -= dx;
            contOption.height -= dy;
            contSet();
            event.stopPropagation();
            event.preventDefault();
        } else if (contOption.rt_active) {
            contOption.y += dy;
            contOption.width += dx;
            contOption.height -= dy;
            contSet();
            event.stopPropagation();
            event.preventDefault();
        } else if (contOption.lb_active) {
            contOption.x += dx;
            contOption.width -= dx;
            contOption.height += dy;
            contSet();
            event.stopPropagation();
            event.preventDefault();
        } else if (contOption.rb_active) {
            contOption.width += dx;
            contOption.height += dy;
            contSet();
            event.stopPropagation();
            event.preventDefault();
        }
    });
    document.addEventListener('touchend', function() {
        contOption.lt_active = false;
        contOption.rt_active = false;
        contOption.lb_active = false;
        contOption.rb_active = false;
    });

    // 截图
    var magnOption = {
        active: false,
        scale: 2,
        width: document.documentElement.clientWidth * 200 / 750,
        height: document.documentElement.clientWidth * 200 / 750
    }
    var magnifying = document.createElement("div");
    var measurement = document.createElement('div');
    var lt = document.createElement('span'),
        rt = document.createElement('span'),
        lb = document.createElement('span'),
        rb = document.createElement('span');

    document.body.appendChild(magnifying);
    document.body.appendChild(measurement);
    measurement.className = "contrast-measurement";
    measurement.style.display = "none";
    // 放大镜
    magnifying.className = "contrast-magnifying";
    magnifying.style.display = "none";


    function magnShow(isShow) {
        magnOption.active = isShow;
        measurement.style.display = 'none';
        magnifying.style.display = "none";
        isShow && resetMagnifying();
    }

    function resetMagnifying() {
        html2canvas(document.body, {
            x: 0,
            y: document.documentElement.scrollTop || document.body.scrollTop,
            scale: magnOption.scale,
            width: document.body.clientWidth || document.documentElement.clientWidth,
            height: document.body.clientHeight || document.documentElement.clientHeight,
            // imageTimeout: 0
        }).then(function(canvas) {
            magnifying.style.backgroundImage = "url(" + canvas.toDataURL() + ")";
            magnifying.style.display = "block";

        });
    }
    // 截图事件
    var mx, my, mx2, my2, mw, mh;
    document.body.addEventListener('touchstart', function(event) {
        if (magnOption.active) {
            measurement.style.display = "block";
            magnifying.style.backgroundPosition = [-(event.touches[0].clientX * 2 - magnOption.width / 2) + 'px', -(event.touches[0].clientY * 2 - magnOption.height / 2) + 'px'].join(' ');
            event.stopPropagation();
            event.preventDefault();
            mx = event.touches[0].clientX;
            my = event.touches[0].clientY + (document.documentElement.scrollTop || document.body.scrollTop);
            measurement.style.left = mx + 'px';
            measurement.style.top = my + 'px';
        }
    }, true);

    document.body.addEventListener('touchmove', function(event) {
        if (magnOption.active) {
            magnifying.style.backgroundPosition = [-(event.touches[0].clientX * 2 - magnOption.width / 2) + 'px', -(event.touches[0].clientY * 2 - magnOption.height / 2) + 'px'].join(' ');
            event.stopPropagation();
            event.preventDefault();
            mx2 = event.touches[0].clientX;
            my2 = event.touches[0].clientY + (document.documentElement.scrollTop || document.body.scrollTop);
            mw = Math.abs(mx2 - mx);
            mh = Math.abs(my2 - my);
            measurement.style.width = mw + 'px';
            measurement.style.height = mh + 'px';
            if (mx2 < mx) {
                measurement.style.left = mx2 + 'px';
            }
            if (my2 < my) {
                measurement.style.top = my2 + 'px';
            }
        }
    }, true);
    // 滚动事件
    window.addEventListener('scroll', function() {
        magnShow(false);
    });
    // 样式
    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "contrast2.css";
    document.head.appendChild(link);

    // 工具条
    var toolbar = document.createElement("div"),
        tool_compare = document.createElement("span"),
        tool_fullscreen = document.createElement("span");
    toolbarOption = {
        fullScreen: {
            active: false,
        },
        compare: {
            active: false
        }
    }
    document.body.appendChild(toolbar).className = "contrast-toolbar";
    toolbar.appendChild(tool_compare).className = "contrast-compare";
    toolbar.appendChild(tool_fullscreen).className = "contrast-fullscreen";

    function toolShow(isShow, x, y) {
        if (isShow) {
            toolbar.style.opacity = 1;
            toolbar.style.webkitTransform = "scale(1)";
            toolbar.style.left = x + 'px';
            toolbar.style.top = y + 'px';
        } else {
            toolbar.style.left = '-100px'
            toolbar.style.top = '-100px'
            toolbar.style.opacity = .4;
            toolbar.style.webkitTransform = 'scale(0)';
        }
    }
    var t = 0;
    document.body.addEventListener("touchstart", function(event) {
        if (Date.now() - t < 320) {
            toolShow(true, event.touches[0].clientX - 100,
                event.touches[0].clientY - 50);
        } else {
            toolShow(false)
        }
        t = Date.now();
    }, true);
    tool_compare.addEventListener("touchstart", function() {
        toolbarOption.compare.acitve = !toolbarOption.compare.acitve;
        if (toolbarOption.compare.acitve) {
            tool_compare.className = "contrast-compare active";
            contrast.style.display = "block";
        } else {
            tool_compare.className = "contrast-compare";
            contrast.style.display = "none";
        }
    }, true);
    tool_fullscreen.addEventListener("touchstart", function() {
        toolbarOption.fullScreen.acitve = !toolbarOption.fullScreen.acitve;
        if (toolbarOption.fullScreen.acitve) {
            tool_fullscreen.className = "contrast-fullscreen active";
            contOption.width = Contrast.width;
            contOption.height = Contrast.height;
            contOption.x = 0;
            contOption.y = 0;
        } else {
            tool_fullscreen.className = "contrast-fullscreen";
            contOption.width = CLIENT_WIDTH / 2;
            contOption.height = CLIENT_HEIGHT / 2;
            contOption.x = 0;
            contOption.y = 0;
        }
        contSet();
    }, true)
})(window);
