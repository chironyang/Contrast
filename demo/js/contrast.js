!function(){function t(t,o){if(i[o])for(var e in i[o])window.isDebug&&(t.className=o),t.style[e]=i[o][e]}function o(){s.style.width=d.width+"px",s.style.height=r.height+"px"}function e(){k.style.bottom=toolbarOption.y+"px",k.style.right=toolbarOption.x+"px"}var n=document.createElement("style");n.type="text/css",n.innerHTML="@-webkit-keyframes contrast-an-show{0%{opacity:0}20%{opacity:1}80%{opacity:1}100%{opacity:0}}",document.head.appendChild(n);var i={"contrast-bg":{width:"100%",height:"100%",backgroundSize:"7.5rem auto",backgroundRepeat:"no-repeat",backgroundPosition:"left top"},"contrast-tip":{position:"fixed",top:"0",left:"0",right:"0",bottom:"0",zIndex:"10000",color:"#000",fontSize:".4rem"},"contrast-design":{position:"absolute",top:"0",left:"0",bottom:"0",paddingTop:"30px",display:"webkitBox",webkitBoxAlign:"center",webkitBoxPack:"center",right:"50%",textAlign:"center",backgroundColor:"rgba(255, 191, 0, .65)",webkitAnimation:"contrast-an-show 3s linear .1s both"},"contrast-drag":{position:"absolute",left:"0",top:"30%",right:"0",textAlign:"center",textShadow:"#FC0 0 0 8px",opacity:"0",webkitAnimation:"contrast-an-show 3s linear 3.4s both"},"contrast-range":{position:"fixed",bottom:"0",height:"140px",left:"0",right:"0",display:"-webkit-box",webkitBoxAlign:"center",webkitBoxPack:"center",backgroundColor:"rgba(255, 191, 0, .65)",opacity:"0",webkitAnimation:"contrast-an-show 3s linear 6.8s both"},"contrast-percentage":{position:"absolute",top:"50%",left:"0",minWidth:"100%",textAlign:"center",backgroundColor:"yellow",webkitTransition:"opacity .2s ease-in",whiteSpace:"nowrap",fontSize:".3rem"},"contrast-box":{zIndex:"10001",position:"absolute",display:"none",left:"0",top:"0",boxShadow:"rgba(0, 0, 0, .2) 0 0 2px",webkitTransition:"box-shadow .3s ease-in"},"contrast-box-inactive":{boxShadow:"rgba(0, 0, 0, .2) 0 0 2px"},"contrast-box-active":{boxShadow:"rgb(0, 0, 0) 0 0 4px"},"contrast-toolbar":{boxShadow:"#BBB 0 2px 8px",borderRadius:"50%",overflow:"hidden",position:"fixed",height:".8rem",lineHeight:".8rem",display:"-webkit-box",webkitBoxAlign:"center",overflow:"hidden",zIndex:"100002"},"contrast-toolbar-span":{backgroundColor:"rgba(0, 0, 0, .4)"},"contrast-toolbar-span-active":{backgroundColor:"rgba(33, 150, 243, 1)"},"contrast-compare":{display:"block",backgroundColor:"rgba(0, 0, 0, .4)",backgroundImage:"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMAQMDwYKAwIBA/0J+AsHC6bjOZAAAA5UlEQVRIx+3VMQ6CQBAF0AkxVhZyAjkFLRyBzlIvYKys1dIjcANKOo/BETyCAZaYaDHGJbvLLrOuiRQU/HLyipnmDwycS5p+ByvE8YJdhCIAHvLUV5CZIRqAJ5ZgT4OHBDcaNBJENKglQA3MfZ47IgnUyROYwN+g+AwXdsD40MutIGkBs4EKWoBLC8gECGlQbwV4nkhQggAYkCBW4EWBBhTAmABBF5R9oBbz+MI9EEIXYNYDSx1UJmCgA8wNkJiA6aACE2ChAaqjhgTuGty4ivToqGJ3mcOBegfrkf2sn8HZ92HwvAEaVf3gbViUKQAAAABJRU5ErkJggg==')",backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:".6rem",width:".8rem",height:".8rem"}},a=document.body.clientWidth||document.documentElement.clientWidth,c=document.body.clientHeight||document.documentElement.clientHeight,r={setBg:function(t){var o=new Image;o.src=t,o.onload=function(){r.width=a,r.height=o.height*a/o.width,s.style.height=r.height+"px"},p.style.backgroundImage="url("+t+")"},width:0,height:0};window.Contrast=r;var d={opacity:1,width:a/2,opacity_height:140},s=document.createElement("div"),p=document.createElement("div");document.body.appendChild(s);var l=document.createElement("span");s.appendChild(p),t(p,"contrast-bg"),s.appendChild(l),t(l,"contrast-percentage"),t(s,"contrast-box"),o();var h=document.cookie.search(/\bcontrastjs\b/)<0;if(h){document.cookie="contrastjs";var b=document.createElement("div"),u=document.createElement("span"),g=document.createElement("span"),m=document.createElement("span");s.appendChild(b),t(b,"contrast-tip"),b.appendChild(u),u.innerText="左侧为设计稿",t(u,"contrast-design"),b.appendChild(g),g.innerText="横向滑动，调整设计稿宽度",t(g,"contrast-drag"),b.appendChild(m),m.innerText="底部横向滑动，调整设计稿透明度",t(m,"contrast-range")}var A,y,w,x=!1,v=!1;document.addEventListener("touchstart",function(t){toolbarOption.compare.active&&(A=t.touches[0].clientX,w=t.touches[0].clientY,c-t.touches[0].clientY<d.opacity_height?(x=!0,l.style.opacity=1):v=!0)},!0),document.addEventListener("touchmove",function(o){Math.abs(o.touches[0].clientX-A)/Math.abs(o.touches[0].clientY-w)>1&&(o.preventDefault(),o.stopPropagation()),toolbarOption.compare.active&&(y=o.touches[0].clientX-A,A=o.touches[0].clientX,x?(d.opacity+=y/a,d.opacity>1?d.opacity=1:d.opacity<0&&(d.opacity=0),l.innerText="设计稿透明度:"+parseInt(100*d.opacity)+"%",p.style.opacity=d.opacity):v&&(t(s,"contrast-box-active"),d.width+=y,d.width>a?d.width=a:d.width<0&&(d.width=0),s.style.width=d.width+"px"))},!0),document.addEventListener("touchend",function(){x=!1,v=!1,setTimeout(function(){x||(l.style.opacity=0)},1400),setTimeout(function(){v||t(s,"contrast-box-inactive")},600)});var k=document.createElement("div"),f=document.createElement("span");document.body.appendChild(k),k.appendChild(f),toolbarOption={x:60,y:100,moving:!1,hasTouched:!1,compare:{active:!1}},e(),t(k,"contrast-toolbar"),t(f,"contrast-compare");var E,B;k.addEventListener("touchstart",function(){E=event.touches[0].clientX,B=event.touches[0].clientY,toolbarOption.hasTouched=!0},!0),document.addEventListener("touchmove",function(t){toolbarOption.hasTouched&&(toolbarOption.moving=!0,toolbarOption.x-=t.touches[0].clientX-E,toolbarOption.y-=t.touches[0].clientY-B,e(),E=t.touches[0].clientX,B=t.touches[0].clientY,t.preventDefault(),t.stopPropagation())},!0),document.addEventListener("touchend",function(){toolbarOption.hasTouched&&(toolbarOption.hasTouched=!1),toolbarOption.moving=!1}),f.addEventListener("touchend",function(){toolbarOption.moving||(toolbarOption.compare.active=!toolbarOption.compare.active,toolbarOption.compare.active?(t(f,"contrast-toolbar-span-active"),s.style.display="block",b&&setTimeout(function(){b.parentNode.removeChild(b),b=null},1e4)):(t(f,"contrast-toolbar-span"),s.style.display="none"))},!0)}();