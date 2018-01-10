(function() {
    var Clip = {};
    window.Clip = Clip;
    Clip.setBg = function(src) {
            contrast.style.backgroundImage = "url(" + src + ")";
        }
        // 工具条
    var bar = document.createElement("div"),
        cont = document.createElement("div"),
        magn = document.createElement("div");

    bar.appendChild(cont);
    bar.appendChild(magn);
    document.body.appendChild(bar);
    magn.className = "clip-btn-magn";
    cont.className = "clip-btn-cont";
    bar.className = "clip-bar";


    cont.addEventListener('touchend', function() {
        contShow(!contOption.active);
        event.stopPropagation();
        event.preventDefault();
    });

    magn.addEventListener('touchend', function() {
        magnShow(!magnOption.active);
        event.stopPropagation();
        event.preventDefault();
    });

    // 对比
    var contOption = {
        active: false,
        lt_active: false,
        rt_active: false,
        lb_active: false,
        rb_active: false,
        x: 0,
        y: 0,
        width: 100,
        height: 100
    };
    var sx, sy, dx, dy; //0:default,1:对比,2:测量
    var contrast = document.createElement("div");
    document.body.appendChild(contrast);

    var cont_lt = document.createElement('span'),
        cont_rt = document.createElement('span'),
        cont_lb = document.createElement('span'),
        cont_rb = document.createElement('span');
    contrast.className = "clip-contrast";
    contrast.style.display = "none";
    contrast.style.width = contOption.width + 'px';
    contrast.style.height = contOption.height + 'px';
    contrast.style.opacity = .5;
    contrast.appendChild(cont_lt).className = 'clip-lt';
    contrast.appendChild(cont_rt).className = 'clip-rt';
    contrast.appendChild(cont_lb).className = 'clip-lb';
    contrast.appendChild(cont_rb).className = 'clip-rb';


    function contShow(isShow) {
        contOption.active = isShow;
        contrast.style.display = isShow ? "block" : "none";
        cont.className = isShow ? "clip-btn-cont active" : "clip-btn-cont";
    }

    function contSet() {
        contrast.style.left = contOption.x + 'px';
        contrast.style.top = contOption.y + 'px';
        contrast.style.width = contOption.width + 'px';
        contrast.style.height = contOption.height + 'px';
        contrast.style.backgroundPosition = [(-contOption.x + 'px'), (-contOption.y + 'px')].join(' ');

    }
    contrast.addEventListener('touchstart', function(event) {
        if (contOption.active && event.target == contrast) {
            sx = event.touches[0].clientX;
            sy = event.touches[0].clientY;
            event.stopPropagation();
            event.preventDefault();
        }
    });

    document.addEventListener('touchmove', function(event) {
        if (contOption.active && event.target == contrast) {
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
        // event.stopPropagation();
        // event.preventDefault();
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
    measurement.className = "clip-measurement";
    measurement.style.display = "none";
    // 放大镜
    magnifying.className = "clip-magnifying";
    magnifying.style.display = "none";


    function magnShow(isShow) {
        magnOption.active = isShow;
        measurement.style.display = 'none';
        magnifying.style.display = "none";
        magn.className = isShow ? "clip-btn-magn active" : "clip-btn-magn";
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
    })
})(window);
