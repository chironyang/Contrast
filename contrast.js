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
                contrast.style.height = Contrast.height + 'px';
            }
            contrast_bg.style.backgroundImage = "url(" + src + ")";
        },
        width: 0,
        height: 0
    };
    window.Contrast = Contrast;

    // 对比
    var contOption = {
        opacity: 1,
        width: CLIENT_WIDTH / 2,
        opacity_height:140
    };
    var sx, sy, dx, dy; //0:default,1:对比,2:测量
    var contrast = document.createElement("div"),
        contrast_bg = document.createElement("div");
    document.body.appendChild(contrast);
    var cont_range_span = document.createElement("span"),
        cont_tip_div = document.createElement("div"),
        cont_tip_span_design = document.createElement("span"),
        cont_tip_span_drag = document.createElement("span"),
        cont_tip_span_range = document.createElement("span")
    contrast.appendChild(contrast_bg).className = "contrast-bg";
    contrast.appendChild(cont_range_span).className = "contrast-percentage";
    contrast.appendChild(cont_tip_div).className = "contrast-tip";
    cont_tip_div.appendChild(cont_tip_span_design).className = "contrast-design";
    cont_tip_span_design.innerText = "左侧为设计稿";
    cont_tip_div.appendChild(cont_tip_span_drag).className = "contrast-drag";
    cont_tip_span_drag.innerText = "横向滑动，调整设计稿宽度";
    cont_tip_div.appendChild(cont_tip_span_range).className = "contrast-range";
    cont_tip_span_range.innerText = "底部横向滑动，调整设计稿透明度";
    

    contrast.className = "contrast-box";
    contSet();

    function contSet() {
        contrast.style.width = contOption.width + 'px';
        contrast.style.height = Contrast.height + 'px';
    }
    var r_sx, r_dx, r_sy,
        cont_range_isMoving = false,
        cont_width_isMoving = false;
    document.addEventListener('touchstart', function(event) {
        if (toolbarOption.compare.acitve) {
            r_sx = event.touches[0].clientX;
            r_sy = event.touches[0].clientY;
            if (CLIENT_HEIGHT - event.touches[0].clientY < contOption.opacity_height) {
                cont_range_isMoving = true;
                cont_range_span.style.opacity = 1;
            } else {
                cont_width_isMoving = true;
            }
        }
    }, true);
    document.addEventListener('touchmove', function(event) {
        if (Math.abs(event.touches[0].clientX - r_sx) / Math.abs(event.touches[0].clientY - r_sy) > 1) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (toolbarOption.compare.active) {
            r_dx = event.touches[0].clientX - r_sx;
            r_sx = event.touches[0].clientX;
            if (cont_range_isMoving) {
                // 调整透明度区域
                contOption.opacity += (r_dx) / CLIENT_WIDTH;
                if (contOption.opacity > 1) {
                    contOption.opacity = 1;
                } else if (contOption.opacity < 0) {
                    contOption.opacity = 0;
                }
                cont_range_span.innerText = "设计稿透明度:" + parseInt(contOption.opacity * 100) + "%";
                contrast_bg.style.opacity = contOption.opacity;

            } else if (cont_width_isMoving) {
                contrast.className = "contrast-box active";
                // 调整宽度区域
                contOption.width += r_dx;
                if (contOption.width > CLIENT_WIDTH) {
                    contOption.width = CLIENT_WIDTH
                } else if (contOption.width < 0) {
                    contOption.width = 0;
                }
                contrast.style.width = contOption.width + 'px';

            }
        }
    }, true);
    document.addEventListener("touchend", function() {
        cont_range_isMoving = false;
        cont_width_isMoving = false;
        setTimeout(function() {
            if (!cont_range_isMoving) {
                cont_range_span.style.opacity = 0;

            }
        }, 1400);
        setTimeout(function() {
            if (!cont_width_isMoving) {
                contrast.className = "contrast-box";
            }
        }, 600)
    });
    // 样式
    var link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "contrast.css";
    document.head.appendChild(link);

    // 工具条
    var toolbar = document.createElement("div"),
        tool_compare = document.createElement("span");
    toolbarOption = {
        compare: {
            active: false
        }
    }
    document.body.appendChild(toolbar).className = "contrast-toolbar";
    toolbar.appendChild(tool_compare).className = "contrast-compare";
    // toolbar.appendChild(tool_fullscreen).className = "contrast-fullscreen";

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
            toolbarOption.compare.active = true;
            setTimeout(function(){
                cont_tip_div.parentNode.removeChild(cont_tip_div);
            },10000);

        } else {
            tool_compare.className = "contrast-compare";
            contrast.style.display = "none";
            toolbarOption.compare.active = false;
        }
    }, true);
})(window);
