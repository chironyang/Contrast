(function() {
    /**
     * 样式初始化
     */
    var style = document.createElement('style');
    style.type = "text/css";
    style.innerHTML = '@-webkit-keyframes contrast-an-show{0%{opacity:0}20%{opacity:1}80%{opacity:1}100%{opacity:0}}';
    document.head.appendChild(style);
    var cssMap = {
            "contrast-bg": {
                width: "100%",
                height: "100%",
                backgroundSize: "7.5rem auto",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left top"
            },
            "contrast-tip": {
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                zIndex: "10000",
                color: "#000",
                fontSize: ".4rem",
            },
            "contrast-design": {
                position: "absolute",
                top: "0",
                left: "0",
                bottom: "0",
                paddingTop: "30px",
                display: "webkitBox",
                webkitBoxAlign: "center",
                webkitBoxPack: "center",
                right: "50%",
                textAlign: "center",
                backgroundColor: "rgba(255, 191, 0, .65)",
                webkitAnimation: "contrast-an-show 3s linear .1s both",
            },
            "contrast-drag": {
                position: "absolute",
                left: "0",
                top: "30%",
                right: "0",
                textAlign: "center",
                textShadow: "#FC0 0 0 8px",
                opacity: "0",
                webkitAnimation: "contrast-an-show 3s linear 3.4s both",
            },
            "contrast-range": {
                position: "fixed",
                bottom: "0",
                height: "140px",
                left: "0",
                right: "0",
                display: "-webkit-box",
                webkitBoxAlign: "center",
                webkitBoxPack: "center",
                backgroundColor: "rgba(255, 191, 0, .65)",
                opacity: "0",
                webkitAnimation: "contrast-an-show 3s linear 6.8s both",
            },
            "contrast-percentage": {
                position: "absolute",
                top: "300px",
                left: "50%",
                marginLeft: "-2em",
                padding: "0 4px",
                textAlign: "center",
                backgroundColor: "rgba(255, 235, 59,1)",
                color: "#000",
                webkitTransition: "opacity .2s ease-in",
                whiteSpace: "nowrap",
                fontSize: ".3rem",
            },
            "contrast-box": {
                zIndex: "10001",
                position: "absolute",
                display: "none",
                left: "0",
                top: "0",
                boxShadow: "rgba(0, 0, 0, .2) 0 0 2px",
                pointerEvents: "none",
                webkitTransition: "box-shadow .3s ease-in",
            },
            "contrast-box-inactive": {
                boxShadow: "rgba(0, 0, 0, .2) 0 0 2px",
            },
            "contrast-box-active": {
                boxShadow: "rgb(0, 0, 0) 0 0 4px"
            },
            "contrast-toolbar": {
                boxShadow: "#BBB 0 2px 8px",
                borderRadius: "50%",
                overflow: "hidden",
                position: "fixed",
                height: ".8rem",
                lineHeight: ".8rem",
                display: "-webkit-box",
                webkitBoxAlign: "center",
                overflow: "hidden",
                zIndex: "100002",
            },
            "contrast-toolbar-span": {
                backgroundColor: "rgba(0, 0, 0, .4)"
            },
            "contrast-toolbar-span-active": {
                backgroundColor: "rgba(33, 150, 243, 1)"
            },
            "contrast-compare": {
                display: "block",
                backgroundColor: "rgba(0, 0, 0, .4)",
                backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMAQMDwYKAwIBA/0J+AsHC6bjOZAAAA5UlEQVRIx+3VMQ6CQBAF0AkxVhZyAjkFLRyBzlIvYKys1dIjcANKOo/BETyCAZaYaDHGJbvLLrOuiRQU/HLyipnmDwycS5p+ByvE8YJdhCIAHvLUV5CZIRqAJ5ZgT4OHBDcaNBJENKglQA3MfZ47IgnUyROYwN+g+AwXdsD40MutIGkBs4EKWoBLC8gECGlQbwV4nkhQggAYkCBW4EWBBhTAmABBF5R9oBbz+MI9EEIXYNYDSx1UJmCgA8wNkJiA6aACE2ChAaqjhgTuGty4ivToqGJ3mcOBegfrkf2sn8HZ92HwvAEaVf3gbViUKQAAAABJRU5ErkJggg==')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: ".6rem",
                width: ".8rem",
                height: ".8rem",
            },

        }
        // 设置样式
    function setClass(dom, cssName) {
        if (cssMap[cssName]) {
            for (var attr in cssMap[cssName]) {
                if (window.isDebug) { dom.className = cssName; }
                dom.style[attr] = cssMap[cssName][attr];
            };
        }
    }


    var CLIENT_WIDTH = document.body.clientWidth || document.documentElement.clientWidth,
        CLIENT_HEIGHT = document.body.clientHeight || document.documentElement.clientHeight;

    // 工具对象
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


    var local_opacity = localStorage.getItem("contrastjs_opacity"),
        local_width = localStorage.getItem("contrastjs_width");



    // 对比参赛
    var contOption = {
        opacity: Number(local_opacity) || 1,
        width: Number(local_width) || CLIENT_WIDTH / 2,
        opacity_height: 140
    };
    // 添加对比界面
    var contrast = document.createElement("div"),
        contrast_bg = document.createElement("div");
    document.body.appendChild(contrast);
    var cont_range_span = document.createElement("span");
    contrast.appendChild(contrast_bg);
    setClass(contrast_bg, "contrast-bg");
    contrast.appendChild(cont_range_span)
    setClass(cont_range_span, "contrast-percentage");
    setClass(contrast, "contrast-box");
    contSet();
    // 引导界面
    if (local_opacity == undefined) {
        localStorage.setItem("contrastjs_width", contOption.width);
        // 添加引导界面
        var cont_tip_div = document.createElement("div"),
            cont_tip_span_design = document.createElement("span"),
            cont_tip_span_drag = document.createElement("span"),
            cont_tip_span_range = document.createElement("span")
        contrast.appendChild(cont_tip_div)
        setClass(cont_tip_div, "contrast-tip");

        cont_tip_div.appendChild(cont_tip_span_design)
        cont_tip_span_design.innerText = "左侧为设计稿";
        setClass(cont_tip_span_design, "contrast-design");

        cont_tip_div.appendChild(cont_tip_span_drag)
        cont_tip_span_drag.innerText = "横向滑动，调整设计稿宽度";
        setClass(cont_tip_span_drag, "contrast-drag");

        cont_tip_div.appendChild(cont_tip_span_range)
        cont_tip_span_range.innerText = "底部横向滑动，调整设计稿透明度";
        setClass(cont_tip_span_range, "contrast-range");
    }

    function contSet() {
        contrast.style.width = contOption.width + 'px';
        contrast.style.height = Contrast.height + 'px';
    }
    /**
     * 事件绑定
     */
    var r_sx, r_dx, r_sy,
        cont_range_isMoving = false,
        cont_width_isMoving = false;
    document.addEventListener('touchstart', function(event) {
        if (toolbarOption.compare.active) {
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
                cont_range_span.innerText = parseInt(contOption.opacity * 100) + "%";
                contrast_bg.style.opacity = contOption.opacity;
                localStorage.setItem("contrastjs_opacity", contOption.opacity);

            } else if (cont_width_isMoving) {
                setClass(contrast, "contrast-box-active");
                // 调整宽度区域
                contOption.width += r_dx;
                if (contOption.width > CLIENT_WIDTH) {
                    contOption.width = CLIENT_WIDTH
                } else if (contOption.width < 0) {
                    contOption.width = 0;
                }
                contrast.style.width = contOption.width + 'px';
                localStorage.setItem("contrastjs_width", contOption.width);

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
        }, 200);
        setTimeout(function() {
            if (!cont_width_isMoving) {
                setClass(contrast, "contrast-box-inactive");
            }
        }, 200)
    });

    /**
     * 工具条
     */
    var toolbar = document.createElement("div"),
        tool_compare = document.createElement("span");
    document.body.appendChild(toolbar);
    toolbar.appendChild(tool_compare);
    toolbarOption = {
        x: 60,
        y: 100,
        moving: false,
        hasTouched: false,
        compare: {
            active: false
        }
    }

    function toolSet() {
        toolbar.style.bottom = toolbarOption.y + "px";
        toolbar.style.right = toolbarOption.x + "px";
    }
    toolSet();
    setClass(toolbar, "contrast-toolbar");
    setClass(tool_compare, "contrast-compare");
    var t_dx = 0,
        t_sx, t_sy;
    toolbar.addEventListener('touchstart', function() {
        t_sx = event.touches[0].clientX
        t_sy = event.touches[0].clientY;
        toolbarOption.hasTouched = true;
    }, true);
    document.addEventListener("touchmove", function(event) {
        if (toolbarOption.hasTouched) {
            toolbarOption.moving = true;
            toolbarOption.x -= event.touches[0].clientX - t_sx;
            toolbarOption.y -= event.touches[0].clientY - t_sy;

            toolSet();

            t_sx = event.touches[0].clientX;
            t_sy = event.touches[0].clientY;

            event.preventDefault();
            event.stopPropagation();
        }
    }, true);
    document.addEventListener("touchend", function() {
        if (toolbarOption.hasTouched) {
            toolbarOption.hasTouched = false;
        }
        toolbarOption.moving = false;
    })
    tool_compare.addEventListener("touchend", function() {
        if (toolbarOption.moving) {
            return;
        }
        toolbarOption.compare.active = !toolbarOption.compare.active;
        if (toolbarOption.compare.active) {
            setClass(tool_compare, "contrast-toolbar-span-active");
            contrast.style.display = "block";
            if (cont_tip_div) {
                setTimeout(function() {
                    cont_tip_div.parentNode.removeChild(cont_tip_div);
                    cont_tip_div = null;
                }, 10000);
            }

        } else {
            setClass(tool_compare, "contrast-toolbar-span");
            contrast.style.display = "none";
        }
    }, true);

})();
