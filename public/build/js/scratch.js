function scratchCardsReload() {

    var blocks = '';
    for (var id = 1; id <= 9; id++) {
        blocks += '<div class="container" id="scratch-cn-'+id+'">' +
            '<canvas class="canvas" class="scratch-can" id="scratch-can-'+id+'" width="190" height="140" data-field="'+id+'"></canvas>' +
            '<div class="winner-box">' +
            '<div class="blinker"><i id="gabo-'+id+'"><img id="gabo-image-'+id+'" src="" style="width: 100px;"></i></div>' +
            '</div>' +
            '</div>';
    }
    $(".game-containers").html(blocks+'<div class="clr"></div>');

    scratchCards();
}

function scratchCard(id, opened) {
    'use strict';

    var isDrawing, lastPoint;
    var container    = document.getElementById('scratch-cn-'+id),
        canvas       = document.getElementById('scratch-can-'+id),
        canvasWidth  = canvas.width,
        canvasHeight = canvas.height,
        ctx          = canvas.getContext('2d'),
        image        = new Image(),
        brush        = new Image(),
        scratched    = 20;
    image.src = 'data:image/png;base64,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';

    image.onload = function() {
        ctx.drawImage(image, 0, 0);
        $('.winner-box').css({visibility: 'visible'});
    };
    brush.src = 'data:image/png;base64,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';

    canvas.addEventListener('mousedown', handleMouseDown, false);
    canvas.addEventListener('touchstart', handleMouseDown, false);
    canvas.addEventListener('mousemove', handleMouseMove, false);
    canvas.addEventListener('touchmove', handleMouseMove, false);
    canvas.addEventListener('mouseup', handleMouseUp, false);
    canvas.addEventListener('touchend', handleMouseUp, false);

    function distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }

    function angleBetween(point1, point2) {
        return Math.atan2( point2.x - point1.x, point2.y - point1.y );
    }

    function getFilledInPixels(stride) {
        if (!stride || stride < 1) { stride = 1; }

        var pixels   = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
            pdata    = pixels.data,
            l        = pdata.length,
            total    = (l / stride),
            count    = 0;

        for(var i = count = 0; i < l; i += stride) {
            if (parseInt(pdata[i]) === 0) {
                count++;
            }
        }

        return Math.round((count / total) * 100);
    }

    function getMouse(e, canvas) {
        var offsetX = 0, offsetY = 0, mx, my;

        if (canvas.offsetParent !== undefined) {
            do {
                offsetX += canvas.offsetLeft;
                offsetY += canvas.offsetTop;
            } while ((canvas = canvas.offsetParent));
        }

        if (!hasTouch()) {
            mx = e.pageX - offsetX;
            my = e.pageY - offsetY;
        } else {
            var touch = e.touches[0];
            mx = touch.pageX - offsetX;
            my = touch.pageY - offsetY;
        }

        return {x: mx, y: my};
    }

    function handlePercentage(filledInPixels,scratched) {
        filledInPixels = filledInPixels || 0;


        if (filledInPixels >= 1 && opened != 1) {
            opened = 1;
            // if(window.config['game_process_step'] == 3){
            //    window.config['game_process_step_4'] = 1;
            // }
            gameStep(id);
            $('#scratch-cn-'+id+' .winner-box').addClass("opened");
        }

        if (filledInPixels > scratched) {
            $('#scratch-can-'+id).fadeOut(500);
        }
    }

    function handleMouseDown(e) {
        isDrawing = true;
        lastPoint = getMouse(e, canvas);
    }

    function handleMouseMove(e) {
        if (!isDrawing) { return; }

        e.preventDefault();

        var currentPoint = getMouse(e, canvas),
            dist = distanceBetween(lastPoint, currentPoint),
            angle = angleBetween(lastPoint, currentPoint),
            x, y;

        for (var i = 0; i < dist; i++) {
            x = lastPoint.x + (Math.sin(angle) * i) - 25;
            y = lastPoint.y + (Math.cos(angle) * i) - 25;
            ctx.globalCompositeOperation = 'destination-out';
            ctx.drawImage(brush, x, y);
        }

        lastPoint = currentPoint;
        handlePercentage(getFilledInPixels(32),scratched);
    }

    function handleMouseUp(e) {
        isDrawing = false;
    }

    function hasTouch() {
        return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    }
}


function scratchCards() {
    for (var k = 1; k <= 9; k++) {
        scratchCard(k);
    }
}


/* Chartist.js 0.10.0 */
!function(a,b){"function"==typeof define&&define.amd?define("Chartist",[],function(){return a.Chartist=b()}):"object"==typeof exports?module.exports=b():a.Chartist=b()}(this,function(){var a={version:"0.10.0"};return function(a,b,c){"use strict";c.namespaces={svg:"http://www.w3.org/2000/svg",xmlns:"http://www.w3.org/2000/xmlns/",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",ct:"http://gionkunz.github.com/chartist-js/ct"},c.noop=function(a){return a},c.alphaNumerate=function(a){return String.fromCharCode(97+a%26)},c.extend=function(a){var b,d,e;for(a=a||{},b=1;b<arguments.length;b++){d=arguments[b];for(var f in d)e=d[f],"object"!=typeof e||null===e||e instanceof Array?a[f]=e:a[f]=c.extend(a[f],e)}return a},c.replaceAll=function(a,b,c){return a.replace(new RegExp(b,"g"),c)},c.ensureUnit=function(a,b){return"number"==typeof a&&(a+=b),a},c.quantity=function(a){if("string"==typeof a){var b=/^(\d+)\s*(.*)$/g.exec(a);return{value:+b[1],unit:b[2]||void 0}}return{value:a}},c.querySelector=function(a){return a instanceof Node?a:b.querySelector(a)},c.times=function(a){return Array.apply(null,new Array(a))},c.sum=function(a,b){return a+(b?b:0)},c.mapMultiply=function(a){return function(b){return b*a}},c.mapAdd=function(a){return function(b){return b+a}},c.serialMap=function(a,b){var d=[],e=Math.max.apply(null,a.map(function(a){return a.length}));return c.times(e).forEach(function(c,e){var f=a.map(function(a){return a[e]});d[e]=b.apply(null,f)}),d},c.roundWithPrecision=function(a,b){var d=Math.pow(10,b||c.precision);return Math.round(a*d)/d},c.precision=8,c.escapingMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"},c.serialize=function(a){return null===a||void 0===a?a:("number"==typeof a?a=""+a:"object"==typeof a&&(a=JSON.stringify({data:a})),Object.keys(c.escapingMap).reduce(function(a,b){return c.replaceAll(a,b,c.escapingMap[b])},a))},c.deserialize=function(a){if("string"!=typeof a)return a;a=Object.keys(c.escapingMap).reduce(function(a,b){return c.replaceAll(a,c.escapingMap[b],b)},a);try{a=JSON.parse(a),a=void 0!==a.data?a.data:a}catch(b){}return a},c.createSvg=function(a,b,d,e){var f;return b=b||"100%",d=d||"100%",Array.prototype.slice.call(a.querySelectorAll("svg")).filter(function(a){return a.getAttributeNS(c.namespaces.xmlns,"ct")}).forEach(function(b){a.removeChild(b)}),f=new c.Svg("svg").attr({width:b,height:d}).addClass(e).attr({style:"width: "+b+"; height: "+d+";"}),a.appendChild(f._node),f},c.normalizeData=function(a,b,d){var e,f={raw:a,normalized:{}};return f.normalized.series=c.getDataArray({series:a.series||[]},b,d),e=f.normalized.series.every(function(a){return a instanceof Array})?Math.max.apply(null,f.normalized.series.map(function(a){return a.length})):f.normalized.series.length,f.normalized.labels=(a.labels||[]).slice(),Array.prototype.push.apply(f.normalized.labels,c.times(Math.max(0,e-f.normalized.labels.length)).map(function(){return""})),b&&c.reverseData(f.normalized),f},c.safeHasProperty=function(a,b){return null!==a&&"object"==typeof a&&a.hasOwnProperty(b)},c.isDataHoleValue=function(a){return null===a||void 0===a||"number"==typeof a&&isNaN(a)},c.reverseData=function(a){a.labels.reverse(),a.series.reverse();for(var b=0;b<a.series.length;b++)"object"==typeof a.series[b]&&void 0!==a.series[b].data?a.series[b].data.reverse():a.series[b]instanceof Array&&a.series[b].reverse()},c.getDataArray=function(a,b,d){function e(a){if(c.safeHasProperty(a,"value"))return e(a.value);if(c.safeHasProperty(a,"data"))return e(a.data);if(a instanceof Array)return a.map(e);if(!c.isDataHoleValue(a)){if(d){var b={};return"string"==typeof d?b[d]=c.getNumberOrUndefined(a):b.y=c.getNumberOrUndefined(a),b.x=a.hasOwnProperty("x")?c.getNumberOrUndefined(a.x):b.x,b.y=a.hasOwnProperty("y")?c.getNumberOrUndefined(a.y):b.y,b}return c.getNumberOrUndefined(a)}}return a.series.map(e)},c.normalizePadding=function(a,b){return b=b||0,"number"==typeof a?{top:a,right:a,bottom:a,left:a}:{top:"number"==typeof a.top?a.top:b,right:"number"==typeof a.right?a.right:b,bottom:"number"==typeof a.bottom?a.bottom:b,left:"number"==typeof a.left?a.left:b}},c.getMetaData=function(a,b){var c=a.data?a.data[b]:a[b];return c?c.meta:void 0},c.orderOfMagnitude=function(a){return Math.floor(Math.log(Math.abs(a))/Math.LN10)},c.projectLength=function(a,b,c){return b/c.range*a},c.getAvailableHeight=function(a,b){return Math.max((c.quantity(b.height).value||a.height())-(b.chartPadding.top+b.chartPadding.bottom)-b.axisX.offset,0)},c.getHighLow=function(a,b,d){function e(a){if(void 0!==a)if(a instanceof Array)for(var b=0;b<a.length;b++)e(a[b]);else{var c=d?+a[d]:+a;g&&c>f.high&&(f.high=c),h&&c<f.low&&(f.low=c)}}b=c.extend({},b,d?b["axis"+d.toUpperCase()]:{});var f={high:void 0===b.high?-Number.MAX_VALUE:+b.high,low:void 0===b.low?Number.MAX_VALUE:+b.low},g=void 0===b.high,h=void 0===b.low;return(g||h)&&e(a),(b.referenceValue||0===b.referenceValue)&&(f.high=Math.max(b.referenceValue,f.high),f.low=Math.min(b.referenceValue,f.low)),f.high<=f.low&&(0===f.low?f.high=1:f.low<0?f.high=0:f.high>0?f.low=0:(f.high=1,f.low=0)),f},c.isNumeric=function(a){return null!==a&&isFinite(a)},c.isFalseyButZero=function(a){return!a&&0!==a},c.getNumberOrUndefined=function(a){return c.isNumeric(a)?+a:void 0},c.isMultiValue=function(a){return"object"==typeof a&&("x"in a||"y"in a)},c.getMultiValue=function(a,b){return c.isMultiValue(a)?c.getNumberOrUndefined(a[b||"y"]):c.getNumberOrUndefined(a)},c.rho=function(a){function b(a,c){return a%c===0?c:b(c,a%c)}function c(a){return a*a+1}if(1===a)return a;var d,e=2,f=2;if(a%2===0)return 2;do e=c(e)%a,f=c(c(f))%a,d=b(Math.abs(e-f),a);while(1===d);return d},c.getBounds=function(a,b,d,e){function f(a,b){return a===(a+=b)&&(a*=1+(b>0?o:-o)),a}var g,h,i,j=0,k={high:b.high,low:b.low};k.valueRange=k.high-k.low,k.oom=c.orderOfMagnitude(k.valueRange),k.step=Math.pow(10,k.oom),k.min=Math.floor(k.low/k.step)*k.step,k.max=Math.ceil(k.high/k.step)*k.step,k.range=k.max-k.min,k.numberOfSteps=Math.round(k.range/k.step);var l=c.projectLength(a,k.step,k),m=l<d,n=e?c.rho(k.range):0;if(e&&c.projectLength(a,1,k)>=d)k.step=1;else if(e&&n<k.step&&c.projectLength(a,n,k)>=d)k.step=n;else for(;;){if(m&&c.projectLength(a,k.step,k)<=d)k.step*=2;else{if(m||!(c.projectLength(a,k.step/2,k)>=d))break;if(k.step/=2,e&&k.step%1!==0){k.step*=2;break}}if(j++>1e3)throw new Error("Exceeded maximum number of iterations while optimizing scale step!")}var o=2.221e-16;for(k.step=Math.max(k.step,o),h=k.min,i=k.max;h+k.step<=k.low;)h=f(h,k.step);for(;i-k.step>=k.high;)i=f(i,-k.step);k.min=h,k.max=i,k.range=k.max-k.min;var p=[];for(g=k.min;g<=k.max;g=f(g,k.step)){var q=c.roundWithPrecision(g);q!==p[p.length-1]&&p.push(q)}return k.values=p,k},c.polarToCartesian=function(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}},c.createChartRect=function(a,b,d){var e=!(!b.axisX&&!b.axisY),f=e?b.axisY.offset:0,g=e?b.axisX.offset:0,h=a.width()||c.quantity(b.width).value||0,i=a.height()||c.quantity(b.height).value||0,j=c.normalizePadding(b.chartPadding,d);h=Math.max(h,f+j.left+j.right),i=Math.max(i,g+j.top+j.bottom);var k={padding:j,width:function(){return this.x2-this.x1},height:function(){return this.y1-this.y2}};return e?("start"===b.axisX.position?(k.y2=j.top+g,k.y1=Math.max(i-j.bottom,k.y2+1)):(k.y2=j.top,k.y1=Math.max(i-j.bottom-g,k.y2+1)),"start"===b.axisY.position?(k.x1=j.left+f,k.x2=Math.max(h-j.right,k.x1+1)):(k.x1=j.left,k.x2=Math.max(h-j.right-f,k.x1+1))):(k.x1=j.left,k.x2=Math.max(h-j.right,k.x1+1),k.y2=j.top,k.y1=Math.max(i-j.bottom,k.y2+1)),k},c.createGrid=function(a,b,d,e,f,g,h,i){var j={};j[d.units.pos+"1"]=a,j[d.units.pos+"2"]=a,j[d.counterUnits.pos+"1"]=e,j[d.counterUnits.pos+"2"]=e+f;var k=g.elem("line",j,h.join(" "));i.emit("draw",c.extend({type:"grid",axis:d,index:b,group:g,element:k},j))},c.createGridBackground=function(a,b,c,d){var e=a.elem("rect",{x:b.x1,y:b.y2,width:b.width(),height:b.height()},c,!0);d.emit("draw",{type:"gridBackground",group:a,element:e})},c.createLabel=function(a,b,d,e,f,g,h,i,j,k,l){var m,n={};if(n[f.units.pos]=a+h[f.units.pos],n[f.counterUnits.pos]=h[f.counterUnits.pos],n[f.units.len]=b,n[f.counterUnits.len]=Math.max(0,g-10),k){var o='<span class="'+j.join(" ")+'" style="'+f.units.len+": "+Math.round(n[f.units.len])+"px; "+f.counterUnits.len+": "+Math.round(n[f.counterUnits.len])+'px">'+e[d]+"</span>";m=i.foreignObject(o,c.extend({style:"overflow: visible;"},n))}else m=i.elem("text",n,j.join(" ")).text(e[d]);l.emit("draw",c.extend({type:"label",axis:f,index:d,group:i,element:m,text:e[d]},n))},c.getSeriesOption=function(a,b,c){if(a.name&&b.series&&b.series[a.name]){var d=b.series[a.name];return d.hasOwnProperty(c)?d[c]:b[c]}return b[c]},c.optionsProvider=function(b,d,e){function f(b){var f=h;if(h=c.extend({},j),d)for(i=0;i<d.length;i++){var g=a.matchMedia(d[i][0]);g.matches&&(h=c.extend(h,d[i][1]))}e&&b&&e.emit("optionsChanged",{previousOptions:f,currentOptions:h})}function g(){k.forEach(function(a){a.removeListener(f)})}var h,i,j=c.extend({},b),k=[];if(!a.matchMedia)throw"window.matchMedia not found! Make sure you're using a polyfill.";if(d)for(i=0;i<d.length;i++){var l=a.matchMedia(d[i][0]);l.addListener(f),k.push(l)}return f(),{removeMediaQueryListeners:g,getCurrentOptions:function(){return c.extend({},h)}}},c.splitIntoSegments=function(a,b,d){var e={increasingX:!1,fillHoles:!1};d=c.extend({},e,d);for(var f=[],g=!0,h=0;h<a.length;h+=2)void 0===c.getMultiValue(b[h/2].value)?d.fillHoles||(g=!0):(d.increasingX&&h>=2&&a[h]<=a[h-2]&&(g=!0),g&&(f.push({pathCoordinates:[],valueData:[]}),g=!1),f[f.length-1].pathCoordinates.push(a[h],a[h+1]),f[f.length-1].valueData.push(b[h/2]));return f}}(window,document,a),function(a,b,c){"use strict";c.Interpolation={},c.Interpolation.none=function(a){var b={fillHoles:!1};return a=c.extend({},b,a),function(b,d){for(var e=new c.Svg.Path,f=!0,g=0;g<b.length;g+=2){var h=b[g],i=b[g+1],j=d[g/2];void 0!==c.getMultiValue(j.value)?(f?e.move(h,i,!1,j):e.line(h,i,!1,j),f=!1):a.fillHoles||(f=!0)}return e}},c.Interpolation.simple=function(a){var b={divisor:2,fillHoles:!1};a=c.extend({},b,a);var d=1/Math.max(1,a.divisor);return function(b,e){for(var f,g,h,i=new c.Svg.Path,j=0;j<b.length;j+=2){var k=b[j],l=b[j+1],m=(k-f)*d,n=e[j/2];void 0!==n.value?(void 0===h?i.move(k,l,!1,n):i.curve(f+m,g,k-m,l,k,l,!1,n),f=k,g=l,h=n):a.fillHoles||(f=k=h=void 0)}return i}},c.Interpolation.cardinal=function(a){var b={tension:1,fillHoles:!1};a=c.extend({},b,a);var d=Math.min(1,Math.max(0,a.tension)),e=1-d;return function f(b,g){var h=c.splitIntoSegments(b,g,{fillHoles:a.fillHoles});if(h.length){if(h.length>1){var i=[];return h.forEach(function(a){i.push(f(a.pathCoordinates,a.valueData))}),c.Svg.Path.join(i)}if(b=h[0].pathCoordinates,g=h[0].valueData,b.length<=4)return c.Interpolation.none()(b,g);for(var j,k=(new c.Svg.Path).move(b[0],b[1],!1,g[0]),l=0,m=b.length;m-2*!j>l;l+=2){var n=[{x:+b[l-2],y:+b[l-1]},{x:+b[l],y:+b[l+1]},{x:+b[l+2],y:+b[l+3]},{x:+b[l+4],y:+b[l+5]}];j?l?m-4===l?n[3]={x:+b[0],y:+b[1]}:m-2===l&&(n[2]={x:+b[0],y:+b[1]},n[3]={x:+b[2],y:+b[3]}):n[0]={x:+b[m-2],y:+b[m-1]}:m-4===l?n[3]=n[2]:l||(n[0]={x:+b[l],y:+b[l+1]}),k.curve(d*(-n[0].x+6*n[1].x+n[2].x)/6+e*n[2].x,d*(-n[0].y+6*n[1].y+n[2].y)/6+e*n[2].y,d*(n[1].x+6*n[2].x-n[3].x)/6+e*n[2].x,d*(n[1].y+6*n[2].y-n[3].y)/6+e*n[2].y,n[2].x,n[2].y,!1,g[(l+2)/2])}return k}return c.Interpolation.none()([])}},c.Interpolation.monotoneCubic=function(a){var b={fillHoles:!1};return a=c.extend({},b,a),function d(b,e){var f=c.splitIntoSegments(b,e,{fillHoles:a.fillHoles,increasingX:!0});if(f.length){if(f.length>1){var g=[];return f.forEach(function(a){g.push(d(a.pathCoordinates,a.valueData))}),c.Svg.Path.join(g)}if(b=f[0].pathCoordinates,e=f[0].valueData,b.length<=4)return c.Interpolation.none()(b,e);var h,i,j=[],k=[],l=b.length/2,m=[],n=[],o=[],p=[];for(h=0;h<l;h++)j[h]=b[2*h],k[h]=b[2*h+1];for(h=0;h<l-1;h++)o[h]=k[h+1]-k[h],p[h]=j[h+1]-j[h],n[h]=o[h]/p[h];for(m[0]=n[0],m[l-1]=n[l-2],h=1;h<l-1;h++)0===n[h]||0===n[h-1]||n[h-1]>0!=n[h]>0?m[h]=0:(m[h]=3*(p[h-1]+p[h])/((2*p[h]+p[h-1])/n[h-1]+(p[h]+2*p[h-1])/n[h]),isFinite(m[h])||(m[h]=0));for(i=(new c.Svg.Path).move(j[0],k[0],!1,e[0]),h=0;h<l-1;h++)i.curve(j[h]+p[h]/3,k[h]+m[h]*p[h]/3,j[h+1]-p[h]/3,k[h+1]-m[h+1]*p[h]/3,j[h+1],k[h+1],!1,e[h+1]);return i}return c.Interpolation.none()([])}},c.Interpolation.step=function(a){var b={postpone:!0,fillHoles:!1};return a=c.extend({},b,a),function(b,d){for(var e,f,g,h=new c.Svg.Path,i=0;i<b.length;i+=2){var j=b[i],k=b[i+1],l=d[i/2];void 0!==l.value?(void 0===g?h.move(j,k,!1,l):(a.postpone?h.line(j,f,!1,g):h.line(e,k,!1,l),h.line(j,k,!1,l)),e=j,f=k,g=l):a.fillHoles||(e=f=g=void 0)}return h}}}(window,document,a),function(a,b,c){"use strict";c.EventEmitter=function(){function a(a,b){d[a]=d[a]||[],d[a].push(b)}function b(a,b){d[a]&&(b?(d[a].splice(d[a].indexOf(b),1),0===d[a].length&&delete d[a]):delete d[a])}function c(a,b){d[a]&&d[a].forEach(function(a){a(b)}),d["*"]&&d["*"].forEach(function(c){c(a,b)})}var d=[];return{addEventHandler:a,removeEventHandler:b,emit:c}}}(window,document,a),function(a,b,c){"use strict";function d(a){var b=[];if(a.length)for(var c=0;c<a.length;c++)b.push(a[c]);return b}function e(a,b){var d=b||this.prototype||c.Class,e=Object.create(d);c.Class.cloneDefinitions(e,a);var f=function(){var a,b=e.constructor||function(){};return a=this===c?Object.create(e):this,b.apply(a,Array.prototype.slice.call(arguments,0)),a};return f.prototype=e,f["super"]=d,f.extend=this.extend,f}function f(){var a=d(arguments),b=a[0];return a.splice(1,a.length-1).forEach(function(a){Object.getOwnPropertyNames(a).forEach(function(c){delete b[c],Object.defineProperty(b,c,Object.getOwnPropertyDescriptor(a,c))})}),b}c.Class={extend:e,cloneDefinitions:f}}(window,document,a),function(a,b,c){"use strict";function d(a,b,d){return a&&(this.data=a||{},this.data.labels=this.data.labels||[],this.data.series=this.data.series||[],this.eventEmitter.emit("data",{type:"update",data:this.data})),b&&(this.options=c.extend({},d?this.options:this.defaultOptions,b),this.initializeTimeoutId||(this.optionsProvider.removeMediaQueryListeners(),this.optionsProvider=c.optionsProvider(this.options,this.responsiveOptions,this.eventEmitter))),this.initializeTimeoutId||this.createChart(this.optionsProvider.getCurrentOptions()),this}function e(){return this.initializeTimeoutId?a.clearTimeout(this.initializeTimeoutId):(a.removeEventListener("resize",this.resizeListener),this.optionsProvider.removeMediaQueryListeners()),this}function f(a,b){return this.eventEmitter.addEventHandler(a,b),this}function g(a,b){return this.eventEmitter.removeEventHandler(a,b),this}function h(){a.addEventListener("resize",this.resizeListener),this.optionsProvider=c.optionsProvider(this.options,this.responsiveOptions,this.eventEmitter),this.eventEmitter.addEventHandler("optionsChanged",function(){this.update()}.bind(this)),this.options.plugins&&this.options.plugins.forEach(function(a){a instanceof Array?a[0](this,a[1]):a(this)}.bind(this)),this.eventEmitter.emit("data",{type:"initial",data:this.data}),this.createChart(this.optionsProvider.getCurrentOptions()),this.initializeTimeoutId=void 0}function i(a,b,d,e,f){this.container=c.querySelector(a),this.data=b||{},this.data.labels=this.data.labels||[],this.data.series=this.data.series||[],this.defaultOptions=d,this.options=e,this.responsiveOptions=f,this.eventEmitter=c.EventEmitter(),this.supportsForeignObject=c.Svg.isSupported("Extensibility"),this.supportsAnimations=c.Svg.isSupported("AnimationEventsAttribute"),this.resizeListener=function(){this.update()}.bind(this),this.container&&(this.container.__chartist__&&this.container.__chartist__.detach(),this.container.__chartist__=this),this.initializeTimeoutId=setTimeout(h.bind(this),0)}c.Base=c.Class.extend({constructor:i,optionsProvider:void 0,container:void 0,svg:void 0,eventEmitter:void 0,createChart:function(){throw new Error("Base chart type can't be instantiated!")},update:d,detach:e,on:f,off:g,version:c.version,supportsForeignObject:!1})}(window,document,a),function(a,b,c){"use strict";function d(a,d,e,f,g){a instanceof Element?this._node=a:(this._node=b.createElementNS(c.namespaces.svg,a),"svg"===a&&this.attr({"xmlns:ct":c.namespaces.ct})),d&&this.attr(d),e&&this.addClass(e),f&&(g&&f._node.firstChild?f._node.insertBefore(this._node,f._node.firstChild):f._node.appendChild(this._node))}function e(a,b){return"string"==typeof a?b?this._node.getAttributeNS(b,a):this._node.getAttribute(a):(Object.keys(a).forEach(function(b){if(void 0!==a[b])if(b.indexOf(":")!==-1){var d=b.split(":");this._node.setAttributeNS(c.namespaces[d[0]],b,a[b])}else this._node.setAttribute(b,a[b])}.bind(this)),this)}function f(a,b,d,e){return new c.Svg(a,b,d,this,e)}function g(){return this._node.parentNode instanceof SVGElement?new c.Svg(this._node.parentNode):null}function h(){for(var a=this._node;"svg"!==a.nodeName;)a=a.parentNode;return new c.Svg(a)}function i(a){var b=this._node.querySelector(a);return b?new c.Svg(b):null}function j(a){var b=this._node.querySelectorAll(a);return b.length?new c.Svg.List(b):null}function k(){return this._node}function l(a,d,e,f){if("string"==typeof a){var g=b.createElement("div");g.innerHTML=a,a=g.firstChild}a.setAttribute("xmlns",c.namespaces.xmlns);var h=this.elem("foreignObject",d,e,f);return h._node.appendChild(a),h}function m(a){return this._node.appendChild(b.createTextNode(a)),this}function n(){for(;this._node.firstChild;)this._node.removeChild(this._node.firstChild);return this}function o(){return this._node.parentNode.removeChild(this._node),this.parent()}function p(a){return this._node.parentNode.replaceChild(a._node,this._node),a}function q(a,b){return b&&this._node.firstChild?this._node.insertBefore(a._node,this._node.firstChild):this._node.appendChild(a._node),this}function r(){return this._node.getAttribute("class")?this._node.getAttribute("class").trim().split(/\s+/):[]}function s(a){return this._node.setAttribute("class",this.classes(this._node).concat(a.trim().split(/\s+/)).filter(function(a,b,c){return c.indexOf(a)===b}).join(" ")),this}function t(a){var b=a.trim().split(/\s+/);return this._node.setAttribute("class",this.classes(this._node).filter(function(a){return b.indexOf(a)===-1}).join(" ")),this}function u(){return this._node.setAttribute("class",""),this}function v(){return this._node.getBoundingClientRect().height}function w(){return this._node.getBoundingClientRect().width}function x(a,b,d){return void 0===b&&(b=!0),Object.keys(a).forEach(function(e){function f(a,b){var f,g,h,i={};a.easing&&(h=a.easing instanceof Array?a.easing:c.Svg.Easing[a.easing],delete a.easing),a.begin=c.ensureUnit(a.begin,"ms"),a.dur=c.ensureUnit(a.dur,"ms"),h&&(a.calcMode="spline",a.keySplines=h.join(" "),a.keyTimes="0;1"),b&&(a.fill="freeze",i[e]=a.from,this.attr(i),g=c.quantity(a.begin||0).value,a.begin="indefinite"),f=this.elem("animate",c.extend({attributeName:e},a)),b&&setTimeout(function(){try{f._node.beginElement()}catch(b){i[e]=a.to,this.attr(i),f.remove()}}.bind(this),g),d&&f._node.addEventListener("beginEvent",function(){d.emit("animationBegin",{element:this,animate:f._node,params:a})}.bind(this)),f._node.addEventListener("endEvent",function(){d&&d.emit("animationEnd",{element:this,animate:f._node,params:a}),b&&(i[e]=a.to,this.attr(i),f.remove())}.bind(this))}a[e]instanceof Array?a[e].forEach(function(a){f.bind(this)(a,!1)}.bind(this)):f.bind(this)(a[e],b)}.bind(this)),this}function y(a){var b=this;this.svgElements=[];for(var d=0;d<a.length;d++)this.svgElements.push(new c.Svg(a[d]));Object.keys(c.Svg.prototype).filter(function(a){return["constructor","parent","querySelector","querySelectorAll","replace","append","classes","height","width"].indexOf(a)===-1}).forEach(function(a){b[a]=function(){var d=Array.prototype.slice.call(arguments,0);return b.svgElements.forEach(function(b){c.Svg.prototype[a].apply(b,d)}),b}})}c.Svg=c.Class.extend({constructor:d,attr:e,elem:f,parent:g,root:h,querySelector:i,querySelectorAll:j,getNode:k,foreignObject:l,text:m,empty:n,remove:o,replace:p,append:q,classes:r,addClass:s,removeClass:t,removeAllClasses:u,height:v,width:w,animate:x}),c.Svg.isSupported=function(a){return b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#"+a,"1.1")};var z={easeInSine:[.47,0,.745,.715],easeOutSine:[.39,.575,.565,1],easeInOutSine:[.445,.05,.55,.95],easeInQuad:[.55,.085,.68,.53],easeOutQuad:[.25,.46,.45,.94],easeInOutQuad:[.455,.03,.515,.955],easeInCubic:[.55,.055,.675,.19],easeOutCubic:[.215,.61,.355,1],easeInOutCubic:[.645,.045,.355,1],easeInQuart:[.895,.03,.685,.22],easeOutQuart:[.165,.84,.44,1],easeInOutQuart:[.77,0,.175,1],easeInQuint:[.755,.05,.855,.06],easeOutQuint:[.23,1,.32,1],easeInOutQuint:[.86,0,.07,1],easeInExpo:[.95,.05,.795,.035],easeOutExpo:[.19,1,.22,1],easeInOutExpo:[1,0,0,1],easeInCirc:[.6,.04,.98,.335],easeOutCirc:[.075,.82,.165,1],easeInOutCirc:[.785,.135,.15,.86],easeInBack:[.6,-.28,.735,.045],easeOutBack:[.175,.885,.32,1.275],easeInOutBack:[.68,-.55,.265,1.55]};c.Svg.Easing=z,c.Svg.List=c.Class.extend({constructor:y})}(window,document,a),function(a,b,c){"use strict";function d(a,b,d,e,f,g){var h=c.extend({command:f?a.toLowerCase():a.toUpperCase()},b,g?{data:g}:{});d.splice(e,0,h)}function e(a,b){a.forEach(function(c,d){u[c.command.toLowerCase()].forEach(function(e,f){b(c,e,d,f,a)})})}function f(a,b){this.pathElements=[],this.pos=0,this.close=a,this.options=c.extend({},v,b)}function g(a){return void 0!==a?(this.pos=Math.max(0,Math.min(this.pathElements.length,a)),this):this.pos}function h(a){return this.pathElements.splice(this.pos,a),this}function i(a,b,c,e){return d("M",{x:+a,y:+b},this.pathElements,this.pos++,c,e),this}function j(a,b,c,e){return d("L",{x:+a,y:+b},this.pathElements,this.pos++,c,e),this}function k(a,b,c,e,f,g,h,i){return d("C",{x1:+a,y1:+b,x2:+c,y2:+e,x:+f,y:+g},this.pathElements,this.pos++,h,i),this}function l(a,b,c,e,f,g,h,i,j){return d("A",{rx:+a,ry:+b,xAr:+c,lAf:+e,sf:+f,x:+g,y:+h},this.pathElements,this.pos++,i,j),this}function m(a){var b=a.replace(/([A-Za-z])([0-9])/g,"$1 $2").replace(/([0-9])([A-Za-z])/g,"$1 $2").split(/[\s,]+/).reduce(function(a,b){return b.match(/[A-Za-z]/)&&a.push([]),a[a.length-1].push(b),a},[]);"Z"===b[b.length-1][0].toUpperCase()&&b.pop();var d=b.map(function(a){var b=a.shift(),d=u[b.toLowerCase()];return c.extend({command:b},d.reduce(function(b,c,d){return b[c]=+a[d],b},{}))}),e=[this.pos,0];return Array.prototype.push.apply(e,d),Array.prototype.splice.apply(this.pathElements,e),this.pos+=d.length,this}function n(){var a=Math.pow(10,this.options.accuracy);return this.pathElements.reduce(function(b,c){var d=u[c.command.toLowerCase()].map(function(b){return this.options.accuracy?Math.round(c[b]*a)/a:c[b]}.bind(this));return b+c.command+d.join(",")}.bind(this),"")+(this.close?"Z":"")}function o(a,b){return e(this.pathElements,function(c,d){c[d]*="x"===d[0]?a:b}),this}function p(a,b){return e(this.pathElements,function(c,d){c[d]+="x"===d[0]?a:b}),this}function q(a){return e(this.pathElements,function(b,c,d,e,f){var g=a(b,c,d,e,f);(g||0===g)&&(b[c]=g)}),this}function r(a){var b=new c.Svg.Path(a||this.close);return b.pos=this.pos,b.pathElements=this.pathElements.slice().map(function(a){return c.extend({},a)}),b.options=c.extend({},this.options),b}function s(a){var b=[new c.Svg.Path];return this.pathElements.forEach(function(d){d.command===a.toUpperCase()&&0!==b[b.length-1].pathElements.length&&b.push(new c.Svg.Path),b[b.length-1].pathElements.push(d)}),b}function t(a,b,d){for(var e=new c.Svg.Path(b,d),f=0;f<a.length;f++)for(var g=a[f],h=0;h<g.pathElements.length;h++)e.pathElements.push(g.pathElements[h]);return e}var u={m:["x","y"],l:["x","y"],c:["x1","y1","x2","y2","x","y"],a:["rx","ry","xAr","lAf","sf","x","y"]},v={accuracy:3};c.Svg.Path=c.Class.extend({constructor:f,position:g,remove:h,move:i,line:j,curve:k,arc:l,scale:o,translate:p,transform:q,parse:m,stringify:n,clone:r,splitByCommand:s}),c.Svg.Path.elementDescriptions=u,c.Svg.Path.join=t}(window,document,a),function(a,b,c){"use strict";function d(a,b,c,d){this.units=a,this.counterUnits=a===f.x?f.y:f.x,this.chartRect=b,this.axisLength=b[a.rectEnd]-b[a.rectStart],this.gridOffset=b[a.rectOffset],this.ticks=c,this.options=d}function e(a,b,d,e,f){var g=e["axis"+this.units.pos.toUpperCase()],h=this.ticks.map(this.projectValue.bind(this)),i=this.ticks.map(g.labelInterpolationFnc);h.forEach(function(j,k){var l,m={x:0,y:0};l=h[k+1]?h[k+1]-j:Math.max(this.axisLength-j,30),c.isFalseyButZero(i[k])&&""!==i[k]||("x"===this.units.pos?(j=this.chartRect.x1+j,m.x=e.axisX.labelOffset.x,"start"===e.axisX.position?m.y=this.chartRect.padding.top+e.axisX.labelOffset.y+(d?5:20):m.y=this.chartRect.y1+e.axisX.labelOffset.y+(d?5:20)):(j=this.chartRect.y1-j,m.y=e.axisY.labelOffset.y-(d?l:0),"start"===e.axisY.position?m.x=d?this.chartRect.padding.left+e.axisY.labelOffset.x:this.chartRect.x1-10:m.x=this.chartRect.x2+e.axisY.labelOffset.x+10),g.showGrid&&c.createGrid(j,k,this,this.gridOffset,this.chartRect[this.counterUnits.len](),a,[e.classNames.grid,e.classNames[this.units.dir]],f),g.showLabel&&c.createLabel(j,l,k,i,this,g.offset,m,b,[e.classNames.label,e.classNames[this.units.dir],"start"===g.position?e.classNames[g.position]:e.classNames.end],d,f))}.bind(this))}var f={x:{pos:"x",len:"width",dir:"horizontal",rectStart:"x1",rectEnd:"x2",rectOffset:"y2"},y:{pos:"y",len:"height",dir:"vertical",rectStart:"y2",rectEnd:"y1",rectOffset:"x1"}};c.Axis=c.Class.extend({constructor:d,createGridAndLabels:e,projectValue:function(a,b,c){throw new Error("Base axis can't be instantiated!")}}),c.Axis.units=f}(window,document,a),function(a,b,c){"use strict";function d(a,b,d,e){var f=e.highLow||c.getHighLow(b,e,a.pos);this.bounds=c.getBounds(d[a.rectEnd]-d[a.rectStart],f,e.scaleMinSpace||20,e.onlyInteger),this.range={min:this.bounds.min,max:this.bounds.max},c.AutoScaleAxis["super"].constructor.call(this,a,d,this.bounds.values,e)}function e(a){return this.axisLength*(+c.getMultiValue(a,this.units.pos)-this.bounds.min)/this.bounds.range}c.AutoScaleAxis=c.Axis.extend({constructor:d,projectValue:e})}(window,document,a),function(a,b,c){"use strict";function d(a,b,d,e){var f=e.highLow||c.getHighLow(b,e,a.pos);this.divisor=e.divisor||1,this.ticks=e.ticks||c.times(this.divisor).map(function(a,b){return f.low+(f.high-f.low)/this.divisor*b}.bind(this)),this.ticks.sort(function(a,b){return a-b}),this.range={min:f.low,max:f.high},c.FixedScaleAxis["super"].constructor.call(this,a,d,this.ticks,e),this.stepLength=this.axisLength/this.divisor}function e(a){return this.axisLength*(+c.getMultiValue(a,this.units.pos)-this.range.min)/(this.range.max-this.range.min)}c.FixedScaleAxis=c.Axis.extend({constructor:d,projectValue:e})}(window,document,a),function(a,b,c){"use strict";function d(a,b,d,e){c.StepAxis["super"].constructor.call(this,a,d,e.ticks,e);var f=Math.max(1,e.ticks.length-(e.stretch?1:0));this.stepLength=this.axisLength/f}function e(a,b){return this.stepLength*b}c.StepAxis=c.Axis.extend({constructor:d,projectValue:e})}(window,document,a),function(a,b,c){"use strict";function d(a){var b=c.normalizeData(this.data,a.reverseData,!0);this.svg=c.createSvg(this.container,a.width,a.height,a.classNames.chart);var d,e,g=this.svg.elem("g").addClass(a.classNames.gridGroup),h=this.svg.elem("g"),i=this.svg.elem("g").addClass(a.classNames.labelGroup),j=c.createChartRect(this.svg,a,f.padding);d=void 0===a.axisX.type?new c.StepAxis(c.Axis.units.x,b.normalized.series,j,c.extend({},a.axisX,{ticks:b.normalized.labels,stretch:a.fullWidth})):a.axisX.type.call(c,c.Axis.units.x,b.normalized.series,j,a.axisX),e=void 0===a.axisY.type?new c.AutoScaleAxis(c.Axis.units.y,b.normalized.series,j,c.extend({},a.axisY,{high:c.isNumeric(a.high)?a.high:a.axisY.high,low:c.isNumeric(a.low)?a.low:a.axisY.low})):a.axisY.type.call(c,c.Axis.units.y,b.normalized.series,j,a.axisY),d.createGridAndLabels(g,i,this.supportsForeignObject,a,this.eventEmitter),e.createGridAndLabels(g,i,this.supportsForeignObject,a,this.eventEmitter),a.showGridBackground&&c.createGridBackground(g,j,a.classNames.gridBackground,this.eventEmitter),b.raw.series.forEach(function(f,g){var i=h.elem("g");i.attr({"ct:series-name":f.name,"ct:meta":c.serialize(f.meta)}),i.addClass([a.classNames.series,f.className||a.classNames.series+"-"+c.alphaNumerate(g)].join(" "));var k=[],l=[];b.normalized.series[g].forEach(function(a,h){var i={x:j.x1+d.projectValue(a,h,b.normalized.series[g]),y:j.y1-e.projectValue(a,h,b.normalized.series[g])};k.push(i.x,i.y),l.push({value:a,valueIndex:h,meta:c.getMetaData(f,h)})}.bind(this));var m={lineSmooth:c.getSeriesOption(f,a,"lineSmooth"),showPoint:c.getSeriesOption(f,a,"showPoint"),showLine:c.getSeriesOption(f,a,"showLine"),showArea:c.getSeriesOption(f,a,"showArea"),areaBase:c.getSeriesOption(f,a,"areaBase")},n="function"==typeof m.lineSmooth?m.lineSmooth:m.lineSmooth?c.Interpolation.monotoneCubic():c.Interpolation.none(),o=n(k,l);if(m.showPoint&&o.pathElements.forEach(function(b){var h=i.elem("line",{x1:b.x,y1:b.y,x2:b.x+.01,y2:b.y},a.classNames.point).attr({"ct:value":[b.data.value.x,b.data.value.y].filter(c.isNumeric).join(","),"ct:meta":c.serialize(b.data.meta)});this.eventEmitter.emit("draw",{type:"point",value:b.data.value,index:b.data.valueIndex,meta:b.data.meta,series:f,seriesIndex:g,axisX:d,axisY:e,group:i,element:h,x:b.x,y:b.y})}.bind(this)),m.showLine){var p=i.elem("path",{d:o.stringify()},a.classNames.line,!0);this.eventEmitter.emit("draw",{type:"line",values:b.normalized.series[g],path:o.clone(),chartRect:j,index:g,series:f,seriesIndex:g,seriesMeta:f.meta,axisX:d,axisY:e,group:i,element:p})}if(m.showArea&&e.range){var q=Math.max(Math.min(m.areaBase,e.range.max),e.range.min),r=j.y1-e.projectValue(q);o.splitByCommand("M").filter(function(a){return a.pathElements.length>1}).map(function(a){var b=a.pathElements[0],c=a.pathElements[a.pathElements.length-1];return a.clone(!0).position(0).remove(1).move(b.x,r).line(b.x,b.y).position(a.pathElements.length+1).line(c.x,r)}).forEach(function(c){var h=i.elem("path",{d:c.stringify()},a.classNames.area,!0);this.eventEmitter.emit("draw",{type:"area",values:b.normalized.series[g],path:c.clone(),series:f,seriesIndex:g,axisX:d,axisY:e,chartRect:j,index:g,group:i,element:h})}.bind(this))}}.bind(this)),this.eventEmitter.emit("created",{bounds:e.bounds,chartRect:j,axisX:d,axisY:e,svg:this.svg,options:a})}function e(a,b,d,e){c.Line["super"].constructor.call(this,a,b,f,c.extend({},f,d),e)}var f={axisX:{offset:30,position:"end",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop,type:void 0},axisY:{offset:40,position:"start",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop,type:void 0,scaleMinSpace:20,onlyInteger:!1},width:void 0,height:void 0,showLine:!0,showPoint:!0,showArea:!1,areaBase:0,lineSmooth:!0,showGridBackground:!1,low:void 0,high:void 0,chartPadding:{top:15,right:15,bottom:5,left:10},fullWidth:!1,reverseData:!1,classNames:{chart:"ct-chart-line",label:"ct-label",labelGroup:"ct-labels",series:"ct-series",line:"ct-line",point:"ct-point",area:"ct-area",grid:"ct-grid",gridGroup:"ct-grids",gridBackground:"ct-grid-background",vertical:"ct-vertical",horizontal:"ct-horizontal",start:"ct-start",end:"ct-end"}};c.Line=c.Base.extend({constructor:e,createChart:d})}(window,document,a),function(a,b,c){"use strict";function d(a){var b,d;a.distributeSeries?(b=c.normalizeData(this.data,a.reverseData,a.horizontalBars?"x":"y"),b.normalized.series=b.normalized.series.map(function(a){return[a]})):b=c.normalizeData(this.data,a.reverseData,a.horizontalBars?"x":"y"),this.svg=c.createSvg(this.container,a.width,a.height,a.classNames.chart+(a.horizontalBars?" "+a.classNames.horizontalBars:""));var e=this.svg.elem("g").addClass(a.classNames.gridGroup),g=this.svg.elem("g"),h=this.svg.elem("g").addClass(a.classNames.labelGroup);if(a.stackBars&&0!==b.normalized.series.length){var i=c.serialMap(b.normalized.series,function(){return Array.prototype.slice.call(arguments).map(function(a){
    return a}).reduce(function(a,b){return{x:a.x+(b&&b.x)||0,y:a.y+(b&&b.y)||0}},{x:0,y:0})});d=c.getHighLow([i],a,a.horizontalBars?"x":"y")}else d=c.getHighLow(b.normalized.series,a,a.horizontalBars?"x":"y");d.high=+a.high||(0===a.high?0:d.high),d.low=+a.low||(0===a.low?0:d.low);var j,k,l,m,n,o=c.createChartRect(this.svg,a,f.padding);k=a.distributeSeries&&a.stackBars?b.normalized.labels.slice(0,1):b.normalized.labels,a.horizontalBars?(j=m=void 0===a.axisX.type?new c.AutoScaleAxis(c.Axis.units.x,b.normalized.series,o,c.extend({},a.axisX,{highLow:d,referenceValue:0})):a.axisX.type.call(c,c.Axis.units.x,b.normalized.series,o,c.extend({},a.axisX,{highLow:d,referenceValue:0})),l=n=void 0===a.axisY.type?new c.StepAxis(c.Axis.units.y,b.normalized.series,o,{ticks:k}):a.axisY.type.call(c,c.Axis.units.y,b.normalized.series,o,a.axisY)):(l=m=void 0===a.axisX.type?new c.StepAxis(c.Axis.units.x,b.normalized.series,o,{ticks:k}):a.axisX.type.call(c,c.Axis.units.x,b.normalized.series,o,a.axisX),j=n=void 0===a.axisY.type?new c.AutoScaleAxis(c.Axis.units.y,b.normalized.series,o,c.extend({},a.axisY,{highLow:d,referenceValue:0})):a.axisY.type.call(c,c.Axis.units.y,b.normalized.series,o,c.extend({},a.axisY,{highLow:d,referenceValue:0})));var p=a.horizontalBars?o.x1+j.projectValue(0):o.y1-j.projectValue(0),q=[];l.createGridAndLabels(e,h,this.supportsForeignObject,a,this.eventEmitter),j.createGridAndLabels(e,h,this.supportsForeignObject,a,this.eventEmitter),a.showGridBackground&&c.createGridBackground(e,o,a.classNames.gridBackground,this.eventEmitter),b.raw.series.forEach(function(d,e){var f,h,i=e-(b.raw.series.length-1)/2;f=a.distributeSeries&&!a.stackBars?l.axisLength/b.normalized.series.length/2:a.distributeSeries&&a.stackBars?l.axisLength/2:l.axisLength/b.normalized.series[e].length/2,h=g.elem("g"),h.attr({"ct:series-name":d.name,"ct:meta":c.serialize(d.meta)}),h.addClass([a.classNames.series,d.className||a.classNames.series+"-"+c.alphaNumerate(e)].join(" ")),b.normalized.series[e].forEach(function(g,k){var r,s,t,u;if(u=a.distributeSeries&&!a.stackBars?e:a.distributeSeries&&a.stackBars?0:k,r=a.horizontalBars?{x:o.x1+j.projectValue(g&&g.x?g.x:0,k,b.normalized.series[e]),y:o.y1-l.projectValue(g&&g.y?g.y:0,u,b.normalized.series[e])}:{x:o.x1+l.projectValue(g&&g.x?g.x:0,u,b.normalized.series[e]),y:o.y1-j.projectValue(g&&g.y?g.y:0,k,b.normalized.series[e])},l instanceof c.StepAxis&&(l.options.stretch||(r[l.units.pos]+=f*(a.horizontalBars?-1:1)),r[l.units.pos]+=a.stackBars||a.distributeSeries?0:i*a.seriesBarDistance*(a.horizontalBars?-1:1)),t=q[k]||p,q[k]=t-(p-r[l.counterUnits.pos]),void 0!==g){var v={};v[l.units.pos+"1"]=r[l.units.pos],v[l.units.pos+"2"]=r[l.units.pos],!a.stackBars||"accumulate"!==a.stackMode&&a.stackMode?(v[l.counterUnits.pos+"1"]=p,v[l.counterUnits.pos+"2"]=r[l.counterUnits.pos]):(v[l.counterUnits.pos+"1"]=t,v[l.counterUnits.pos+"2"]=q[k]),v.x1=Math.min(Math.max(v.x1,o.x1),o.x2),v.x2=Math.min(Math.max(v.x2,o.x1),o.x2),v.y1=Math.min(Math.max(v.y1,o.y2),o.y1),v.y2=Math.min(Math.max(v.y2,o.y2),o.y1);var w=c.getMetaData(d,k);s=h.elem("line",v,a.classNames.bar).attr({"ct:value":[g.x,g.y].filter(c.isNumeric).join(","),"ct:meta":c.serialize(w)}),this.eventEmitter.emit("draw",c.extend({type:"bar",value:g,index:k,meta:w,series:d,seriesIndex:e,axisX:m,axisY:n,chartRect:o,group:h,element:s},v))}}.bind(this))}.bind(this)),this.eventEmitter.emit("created",{bounds:j.bounds,chartRect:o,axisX:m,axisY:n,svg:this.svg,options:a})}function e(a,b,d,e){c.Bar["super"].constructor.call(this,a,b,f,c.extend({},f,d),e)}var f={axisX:{offset:30,position:"end",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop,scaleMinSpace:30,onlyInteger:!1},axisY:{offset:40,position:"start",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:c.noop,scaleMinSpace:20,onlyInteger:!1},width:void 0,height:void 0,high:void 0,low:void 0,referenceValue:0,chartPadding:{top:15,right:15,bottom:5,left:10},seriesBarDistance:15,stackBars:!1,stackMode:"accumulate",horizontalBars:!1,distributeSeries:!1,reverseData:!1,showGridBackground:!1,classNames:{chart:"ct-chart-bar",horizontalBars:"ct-horizontal-bars",label:"ct-label",labelGroup:"ct-labels",series:"ct-series",bar:"ct-bar",grid:"ct-grid",gridGroup:"ct-grids",gridBackground:"ct-grid-background",vertical:"ct-vertical",horizontal:"ct-horizontal",start:"ct-start",end:"ct-end"}};c.Bar=c.Base.extend({constructor:e,createChart:d})}(window,document,a),function(a,b,c){"use strict";function d(a,b,c){var d=b.x>a.x;return d&&"explode"===c||!d&&"implode"===c?"start":d&&"implode"===c||!d&&"explode"===c?"end":"middle"}function e(a){var b,e,f,h,i,j=c.normalizeData(this.data),k=[],l=a.startAngle;this.svg=c.createSvg(this.container,a.width,a.height,a.donut?a.classNames.chartDonut:a.classNames.chartPie),e=c.createChartRect(this.svg,a,g.padding),f=Math.min(e.width()/2,e.height()/2),i=a.total||j.normalized.series.reduce(function(a,b){return a+b},0);var m=c.quantity(a.donutWidth);"%"===m.unit&&(m.value*=f/100),f-=a.donut?m.value/2:0,h="outside"===a.labelPosition||a.donut?f:"center"===a.labelPosition?0:f/2,h+=a.labelOffset;var n={x:e.x1+e.width()/2,y:e.y2+e.height()/2},o=1===j.raw.series.filter(function(a){return a.hasOwnProperty("value")?0!==a.value:0!==a}).length;j.raw.series.forEach(function(a,b){k[b]=this.svg.elem("g",null,null)}.bind(this)),a.showLabel&&(b=this.svg.elem("g",null,null)),j.raw.series.forEach(function(e,g){if(0!==j.normalized.series[g]||!a.ignoreEmptyValues){k[g].attr({"ct:series-name":e.name}),k[g].addClass([a.classNames.series,e.className||a.classNames.series+"-"+c.alphaNumerate(g)].join(" "));var p=i>0?l+j.normalized.series[g]/i*360:0,q=Math.max(0,l-(0===g||o?0:.2));p-q>=359.99&&(p=q+359.99);var r=c.polarToCartesian(n.x,n.y,f,q),s=c.polarToCartesian(n.x,n.y,f,p),t=new c.Svg.Path((!a.donut)).move(s.x,s.y).arc(f,f,0,p-l>180,0,r.x,r.y);a.donut||t.line(n.x,n.y);var u=k[g].elem("path",{d:t.stringify()},a.donut?a.classNames.sliceDonut:a.classNames.slicePie);if(u.attr({"ct:value":j.normalized.series[g],"ct:meta":c.serialize(e.meta)}),a.donut&&u.attr({style:"stroke-width: "+m.value+"px"}),this.eventEmitter.emit("draw",{type:"slice",value:j.normalized.series[g],totalDataSum:i,index:g,meta:e.meta,series:e,group:k[g],element:u,path:t.clone(),center:n,radius:f,startAngle:l,endAngle:p}),a.showLabel){var v;v=1===j.raw.series.length?{x:n.x,y:n.y}:c.polarToCartesian(n.x,n.y,h,l+(p-l)/2);var w;w=j.normalized.labels&&!c.isFalseyButZero(j.normalized.labels[g])?j.normalized.labels[g]:j.normalized.series[g];var x=a.labelInterpolationFnc(w,g);if(x||0===x){var y=b.elem("text",{dx:v.x,dy:v.y,"text-anchor":d(n,v,a.labelDirection)},a.classNames.label).text(""+x);this.eventEmitter.emit("draw",{type:"label",index:g,group:b,element:y,text:""+x,x:v.x,y:v.y})}}l=p}}.bind(this)),this.eventEmitter.emit("created",{chartRect:e,svg:this.svg,options:a})}function f(a,b,d,e){c.Pie["super"].constructor.call(this,a,b,g,c.extend({},g,d),e)}var g={width:void 0,height:void 0,chartPadding:5,classNames:{chartPie:"ct-chart-pie",chartDonut:"ct-chart-donut",series:"ct-series",slicePie:"ct-slice-pie",sliceDonut:"ct-slice-donut",label:"ct-label"},startAngle:0,total:void 0,donut:!1,donutWidth:60,showLabel:!0,labelOffset:0,labelPosition:"inside",labelInterpolationFnc:c.noop,labelDirection:"neutral",reverseData:!1,ignoreEmptyValues:!1};c.Pie=c.Base.extend({constructor:f,createChart:e,determineAnchorPosition:d})}(window,document,a),a});

/* Pizzicato */
!function(t){"use strict";function e(t,e){this.options={},t=t||this.options;var i={frequency:350,peak:1};this.inputNode=this.filterNode=o.context.createBiquadFilter(),this.filterNode.type=e,this.outputNode=n.context.createGain(),this.filterNode.connect(this.outputNode);for(var s in i)this[s]=t[s],this[s]=void 0===this[s]||null===this[s]?i[s]:this[s]}function i(){var t,e,i=o.context.sampleRate*this.time,s=n.context.createBuffer(2,i,o.context.sampleRate),a=s.getChannelData(0),r=s.getChannelData(1);for(e=0;i>e;e++)t=this.reverse?i-e:e,a[e]=(2*Math.random()-1)*Math.pow(1-t/i,this.decay),r[e]=(2*Math.random()-1)*Math.pow(1-t/i,this.decay);this.reverbNode.buffer=s}var n={},o=n,s="object"==typeof module&&module.exports,a="function"==typeof define&&define.amd;s?module.exports=n:a?define([],n):t.Pizzicato=t.Pz=n;var r=t.AudioContext||t.webkitAudioContext;if(!r)return void console.error("No AudioContext found in this environment. Please ensure your window or global object contains a working AudioContext constructor function.");n.context=new r;var c=n.context.createGain();c.connect(n.context.destination),n.Util={isString:function(t){return"[object String]"===toString.call(t)},isObject:function(t){return"[object Object]"===toString.call(t)},isFunction:function(t){return"[object Function]"===toString.call(t)},isNumber:function(t){return"[object Number]"===toString.call(t)&&t===+t},isArray:function(t){return"[object Array]"===toString.call(t)},isInRange:function(t,e,i){return o.Util.isNumber(t)&&o.Util.isNumber(e)&&o.Util.isNumber(i)?t>=e&&i>=t:!1},isBool:function(t){return"boolean"==typeof t},isOscillator:function(t){return t&&"[object OscillatorNode]"===t.toString()},isEffect:function(t){for(var e in n.Effects)if(t instanceof n.Effects[e])return!0;return!1},normalize:function(t,e,i){return o.Util.isNumber(t)&&o.Util.isNumber(e)&&o.Util.isNumber(i)?(i-e)*t/1+e:void 0},getDryLevel:function(t){return!o.Util.isNumber(t)||t>1||0>t?0:.5>=t?1:1-2*(t-.5)},getWetLevel:function(t){return!o.Util.isNumber(t)||t>1||0>t?0:t>=.5?1:1-2*(.5-t)}},Object.defineProperty(n,"volume",{enumerable:!0,get:function(){return c.gain.value},set:function(t){o.Util.isInRange(t,0,1)&&c&&(c.gain.value=t)}}),Object.defineProperty(n,"masterGainNode",{enumerable:!1,get:function(){return c},set:function(t){console.error("Can't set the master gain node")}}),n.Events={on:function(t,e,i){if(t&&e){this._events=this._events||{};var n=this._events[t]||(this._events[t]=[]);n.push({callback:e,context:i||this,handler:this})}},trigger:function(t){if(t){var e,i,n,o;if(this._events=this._events||{},e=this._events[t]||(this._events[t]=[])){for(i=Math.max(0,arguments.length-1),n=[],o=0;i>o;o++)n[o]=arguments[o+1];for(o=0;o<e.length;o++)e[o].callback.apply(e[o].context,n)}}},off:function(t){t?this._events[t]=void 0:this._events={}}},n.Sound=function(t,e){function i(t){var e=["wave","file","input","script","sound"];if(t&&!d.isFunction(t)&&!d.isString(t)&&!d.isObject(t))return"Description type not supported. Initialize a sound using an object, a function or a string.";if(d.isObject(t)){if(!d.isString(t.source)||-1===e.indexOf(t.source))return"Specified source not supported. Sources can be wave, file, input or script";if(!("file"!==t.source||t.options&&t.options.path))return"A path is needed for sounds with a file source";if(!("script"!==t.source||t.options&&t.options.audioFunction))return"An audio function is needed for sounds with a script source"}}function s(t,e){t=t||{},this.getRawSourceNode=function(){var e=this.sourceNode?this.sourceNode.frequency.value:t.frequency,i=n.context.createOscillator();return i.type=t.type||"sine",i.frequency.value=e||440,i},this.sourceNode=this.getRawSourceNode(),d.isFunction(e)&&e()}function a(t,e){t=d.isArray(t)?t:[t];var i=new XMLHttpRequest;i.open("GET",t[0],!0),i.responseType="arraybuffer",i.onload=function(i){n.context.decodeAudioData(i.target.response,function(t){h.getRawSourceNode=function(){var e=n.context.createBufferSource();return e.loop=this.loop,e.buffer=t,e},d.isFunction(e)&&e()}.bind(h),function(i){return console.error("Error decoding audio file "+t[0]),t.length>1?(t.shift(),void a(t,e)):(i=i||new Error("Error decoding audio file "+t[0]),void(d.isFunction(e)&&e(i)))}.bind(h))},i.onreadystatechange=function(e){4===i.readyState&&200!==i.status&&console.error("Error while fetching "+t[0]+". "+i.statusText)},i.send()}function r(t,e){navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,navigator.getUserMedia&&navigator.getUserMedia({audio:!0},function(t){h.getRawSourceNode=function(){return n.context.createMediaStreamSource(t)},d.isFunction(e)&&e()}.bind(h),function(t){d.isFunction(e)&&e(t)})}function c(t,e){var i=d.isFunction(t)?t:t.audioFunction,o=d.isObject(t)&&t.bufferSize?t.bufferSize:null;if(!o)try{n.context.createScriptProcessor()}catch(s){o=2048}this.getRawSourceNode=function(){var t=n.context.createScriptProcessor(o,1,1);return t.onaudioprocess=i,t}}function u(t,e){this.getRawSourceNode=t.sound.getRawSourceNode,t.sound.sourceNode&&o.Util.isOscillator(t.sound.sourceNode)&&(this.sourceNode=this.getRawSourceNode(),this.frequency=t.sound.frequency)}var h=this,d=n.Util,l=i(t),f=d.isObject(t)&&d.isObject(t.options),p=.04,v=.04;if(l)throw console.error(l),new Error("Error initializing Pizzicato Sound: "+l);this.masterVolume=n.context.createGain(),this.masterVolume.connect(n.masterGainNode),this.fadeNode=n.context.createGain(),this.lastTimePlayed=0,this.effects=[],this.playing=this.paused=!1,this.loop=f&&t.options.loop,this.attack=f&&d.isNumber(t.options.attack)?t.options.attack:p,this.sustain=f&&d.isNumber(t.options.sustain)?t.options.sustain:v,this.volume=f&&d.isNumber(t.options.volume)?t.options.volume:1,t?d.isString(t)?a.bind(this)(t,e):d.isFunction(t)?c.bind(this)(t,e):"file"===t.source?a.bind(this)(t.options.path,e):"wave"===t.source?s.bind(this)(t.options,e):"input"===t.source?r.bind(this)(t,e):"script"===t.source?c.bind(this)(t.options,e):"sound"===t.source&&u.bind(this)(t.options,e):s.bind(this)({},e)},n.Sound.prototype=Object.create(n.Events,{play:{enumerable:!0,value:function(t,e){this.playing||(o.Util.isNumber(e)||(e=this.offsetTime||0),o.Util.isNumber(t)||(t=0),this.playing=!0,this.paused=!1,this.sourceNode=this.getSourceNode(),this.applyAttack(),o.Util.isFunction(this.sourceNode.start)&&(this.lastTimePlayed=n.context.currentTime-e,this.sourceNode.start(o.context.currentTime+t,e)),this.trigger("play"))}},stop:{enumerable:!0,value:function(){(this.paused||this.playing)&&(this.paused=this.playing=!1,this.stopWithSustain(),this.offsetTime=0,this.trigger("stop"))}},pause:{enumerable:!0,value:function(){if(!this.paused&&this.playing){this.paused=!0,this.playing=!1,this.stopWithSustain();var t=o.context.currentTime-this.lastTimePlayed;this.sourceNode.buffer?this.offsetTime=t%(this.sourceNode.buffer.length/o.context.sampleRate):this.offsetTime=t,this.trigger("pause")}}},clone:{enumerable:!0,value:function(){for(var t=new n.Sound({source:"sound",options:{loop:this.loop,attack:this.attack,sustain:this.sustain,volume:this.volume,sound:this}}),e=0;e<this.effects.length;e++)t.addEffect(this.effects[e]);return t}},onEnded:{enumerable:!0,value:function(){this.playing&&this.stop(),this.paused||this.trigger("end")}},addEffect:{enumerable:!0,value:function(t){return t&&o.Util.isEffect(t)?(this.effects.push(t),this.connectEffects(),void(this.sourceNode&&(this.fadeNode.disconnect(),this.fadeNode.connect(this.getInputNode())))):void console.warn("Invalid effect.")}},removeEffect:{enumerable:!0,value:function(t){var e=this.effects.indexOf(t);if(-1===e)return void console.warn("Cannot remove effect that is not applied to this sound.");var i=this.playing;i&&this.pause(),this.fadeNode.disconnect();for(var n=0;n<this.effects.length;n++)this.effects[n].outputNode.disconnect();this.effects.splice(e,1),this.connectEffects(),i&&this.play()}},connectEffects:{enumerable:!0,value:function(){for(var t=0;t<this.effects.length;t++){var e=t===this.effects.length-1,i=e?this.masterVolume:this.effects[t+1].inputNode;this.effects[t].outputNode.disconnect(),this.effects[t].outputNode.connect(i)}}},volume:{enumerable:!0,get:function(){return this.masterVolume?this.masterVolume.gain.value:void 0},set:function(t){o.Util.isInRange(t,0,1)&&this.masterVolume&&(this.masterVolume.gain.value=t)}},frequency:{enumerable:!0,get:function(){return this.sourceNode&&o.Util.isOscillator(this.sourceNode)?this.sourceNode.frequency.value:null},set:function(t){this.sourceNode&&o.Util.isOscillator(this.sourceNode)&&(this.sourceNode.frequency.value=t)}},getSourceNode:{enumerable:!0,value:function(){this.sourceNode&&this.sourceNode.disconnect();var t=this.getRawSourceNode();return t.connect(this.fadeNode),t.onended=this.onEnded.bind(this),this.fadeNode.connect(this.getInputNode()),t}},getInputNode:{enumerable:!0,value:function(){return this.effects.length>0?this.effects[0].inputNode:this.masterVolume}},getAnalyser:{enumerable:!0,value:function(){return this.analyser?this.analyser:(this.analyser=n.context.createAnalyser(),this.masterVolume.disconnect(),this.masterVolume.connect(this.analyser),this.analyser.connect(n.masterGainNode),this.analyser)}},applyAttack:{enumerable:!1,value:function(){this.attack&&(this.fadeNode.gain.setValueAtTime(1e-5,n.context.currentTime),this.fadeNode.gain.linearRampToValueAtTime(1,n.context.currentTime+this.attack))}},stopWithSustain:{enumerable:!1,value:function(t){var e=this.sourceNode,i=function(){return o.Util.isFunction(e.stop)?e.stop(0):e.disconnect()};this.sustain||i(),this.fadeNode.gain.setValueAtTime(this.fadeNode.gain.value,n.context.currentTime),this.fadeNode.gain.linearRampToValueAtTime(1e-5,n.context.currentTime+this.sustain),window.setTimeout(function(){i()},1e3*this.sustain)}}}),n.Effects={},n.Effects.Delay=function(t){this.options={},t=t||this.options;var e={feedback:.5,time:.3,mix:.5};this.inputNode=n.context.createGain(),this.outputNode=n.context.createGain(),this.dryGainNode=n.context.createGain(),this.wetGainNode=n.context.createGain(),this.feedbackGainNode=n.context.createGain(),this.delayNode=n.context.createDelay(),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.delayNode.connect(this.feedbackGainNode),this.feedbackGainNode.connect(this.delayNode),this.inputNode.connect(this.delayNode),this.delayNode.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode);for(var i in e)this[i]=t[i],this[i]=void 0===this[i]||null===this[i]?e[i]:this[i]},n.Effects.Delay.prototype=Object.create(null,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.mix=t,this.dryGainNode.gain.value=n.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=n.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(t){o.Util.isInRange(t,0,180)&&(this.options.time=t,this.delayNode.delayTime.value=t)}},feedback:{enumerable:!0,get:function(){return this.options.feedback},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.feedback=parseFloat(t,10),this.feedbackGainNode.gain.value=this.feedback)}}}),n.Effects.Compressor=function(t){this.options={},t=t||this.options;var e={threshold:-24,knee:30,attack:.003,release:.25,ratio:12};this.inputNode=this.compressorNode=n.context.createDynamicsCompressor(),this.outputNode=n.context.createGain(),this.compressorNode.connect(this.outputNode);for(var i in e)this[i]=t[i],this[i]=void 0===this[i]||null===this[i]?e[i]:this[i]},n.Effects.Compressor.prototype=Object.create(null,{threshold:{enumerable:!0,get:function(){return this.compressorNode.threshold.value},set:function(t){n.Util.isInRange(t,-100,0)&&(this.compressorNode.threshold.value=t)}},knee:{enumerable:!0,get:function(){return this.compressorNode.knee.value},set:function(t){n.Util.isInRange(t,0,40)&&(this.compressorNode.knee.value=t)}},attack:{enumerable:!0,get:function(){return this.compressorNode.attack.value},set:function(t){n.Util.isInRange(t,0,1)&&(this.compressorNode.attack.value=t)}},release:{enumerable:!0,get:function(){return this.compressorNode.release.value},set:function(t){n.Util.isInRange(t,0,1)&&(this.compressorNode.release.value=t)}},ratio:{enumerable:!0,get:function(){return this.compressorNode.ratio.value},set:function(t){n.Util.isInRange(t,1,20)&&(this.compressorNode.ratio.value=t)}},getCurrentGainReduction:function(){return this.compressorNode.reduction}}),n.Effects.LowPassFilter=function(t){e.call(this,t,"lowpass")},n.Effects.HighPassFilter=function(t){e.call(this,t,"highpass")};var u=Object.create(null,{frequency:{enumerable:!0,get:function(){return this.filterNode.frequency.value},set:function(t){n.Util.isInRange(t,10,22050)&&(this.filterNode.frequency.value=t)}},peak:{enumerable:!0,get:function(){return this.filterNode.Q.value},set:function(t){n.Util.isInRange(t,1e-4,1e3)&&(this.filterNode.Q.value=t)}}});n.Effects.LowPassFilter.prototype=u,n.Effects.HighPassFilter.prototype=u,n.Effects.Distortion=function(t){this.options={},t=t||this.options;var e={gain:.5};this.waveShaperNode=n.context.createWaveShaper(),this.inputNode=this.outputNode=this.waveShaperNode;for(var i in e)this[i]=t[i],this[i]=void 0===this[i]||null===this[i]?e[i]:this[i]},n.Effects.Distortion.prototype=Object.create(null,{gain:{enumerable:!0,get:function(){return this.options.gain},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.gain=t,this.adjustGain())}},adjustGain:{writable:!1,configurable:!1,enumerable:!1,value:function(){for(var t,e=o.Util.isNumber(this.options.gain)?parseInt(100*this.options.gain,10):50,i=44100,n=new Float32Array(i),s=Math.PI/180,a=0;i>a;++a)t=2*a/i-1,n[a]=(3+e)*t*20*s/(Math.PI+e*Math.abs(t));this.waveShaperNode.curve=n}}}),n.Effects.Flanger=function(t){this.options={},t=t||this.options;var e={time:.45,speed:.2,depth:.1,feedback:.1,mix:.5};this.inputNode=n.context.createGain(),this.outputNode=n.context.createGain(),this.inputFeedbackNode=n.context.createGain(),this.wetGainNode=n.context.createGain(),this.dryGainNode=n.context.createGain(),this.delayNode=n.context.createDelay(),this.oscillatorNode=n.context.createOscillator(),this.gainNode=n.context.createGain(),this.feedbackNode=n.context.createGain(),this.oscillatorNode.type="sine",this.inputNode.connect(this.inputFeedbackNode),this.inputNode.connect(this.dryGainNode),this.inputFeedbackNode.connect(this.delayNode),this.inputFeedbackNode.connect(this.wetGainNode),this.delayNode.connect(this.wetGainNode),this.delayNode.connect(this.feedbackNode),this.feedbackNode.connect(this.inputFeedbackNode),this.oscillatorNode.connect(this.gainNode),this.gainNode.connect(this.delayNode.delayTime),this.dryGainNode.connect(this.outputNode),this.wetGainNode.connect(this.outputNode),this.oscillatorNode.start(0);for(var i in e)this[i]=t[i],this[i]=void 0===this[i]||null===this[i]?e[i]:this[i]},n.Effects.Flanger.prototype=Object.create(null,{time:{enumberable:!0,get:function(){return this.options.time},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.time=t,this.delayNode.delayTime.value=o.Util.normalize(t,.001,.02))}},speed:{enumberable:!0,get:function(){return this.options.speed},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.speed=t,this.oscillatorNode.frequency.value=o.Util.normalize(t,.5,5))}},depth:{enumberable:!0,get:function(){return this.options.depth},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.depth=t,this.gainNode.gain.value=o.Util.normalize(t,5e-4,.005))}},feedback:{enumberable:!0,get:function(){return this.options.feedback},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.feedback=t,this.feedbackNode.gain.value=o.Util.normalize(t,0,.8))}},mix:{enumberable:!0,get:function(){return this.options.mix},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.mix=t,this.dryGainNode.gain.value=n.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=n.Util.getWetLevel(this.mix))}}}),n.Effects.StereoPanner=function(t){this.options={},t=t||this.options;var e={pan:0};this.inputNode=n.context.createGain(),this.outputNode=n.context.createGain(),n.context.createStereoPanner?(this.pannerNode=n.context.createStereoPanner(),this.inputNode.connect(this.pannerNode),this.pannerNode.connect(this.outputNode)):this.inputNode.connect(this.outputNode);for(var i in e)this[i]=t[i],this[i]=void 0===this[i]||null===this[i]?e[i]:this[i]},n.Effects.StereoPanner.prototype=Object.create(null,{pan:{enumerable:!0,get:function(){return this.options.pan},set:function(t){o.Util.isInRange(t,-1,1)&&(this.options.pan=t,this.pannerNode&&(this.pannerNode.pan.value=t))}}}),n.Effects.Convolver=function(t,e){this.options={},t=t||this.options;var i=this,s=new XMLHttpRequest,a={mix:.5};this.callback=e,this.inputNode=n.context.createGain(),this.convolverNode=n.context.createConvolver(),this.outputNode=n.context.createGain(),this.wetGainNode=n.context.createGain(),this.dryGainNode=n.context.createGain(),this.inputNode.connect(this.convolverNode),this.convolverNode.connect(this.wetGainNode),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.wetGainNode.connect(this.outputNode);for(var r in a)this[r]=t[r],this[r]=void 0===this[r]||null===this[r]?a[r]:this[r];return t.impulse?(s.open("GET",t.impulse,!0),s.responseType="arraybuffer",s.onload=function(t){var e=t.target.response;n.context.decodeAudioData(e,function(t){i.convolverNode.buffer=t,i.callback&&o.Util.isFunction(i.callback)&&i.callback()},function(t){t=t||new Error("Error decoding impulse file"),i.callback&&o.Util.isFunction(i.callback)&&i.callback(t)})},s.onreadystatechange=function(e){4===s.readyState&&200!==s.status&&console.error("Error while fetching "+t.impulse+". "+s.statusText)},void s.send()):void console.error("No impulse file specified.")},n.Effects.Convolver.prototype=Object.create(null,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.mix=t,this.dryGainNode.gain.value=n.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=n.Util.getWetLevel(this.mix))}}}),n.Effects.PingPongDelay=function(t){this.options={},t=t||this.options;var e={feedback:.5,time:.3,mix:.5};this.inputNode=n.context.createGain(),this.outputNode=n.context.createGain(),this.delayNodeLeft=n.context.createDelay(),this.delayNodeRight=n.context.createDelay(),this.dryGainNode=n.context.createGain(),this.wetGainNode=n.context.createGain(),this.feedbackGainNode=n.context.createGain(),this.channelMerger=n.context.createChannelMerger(2),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.delayNodeLeft.connect(this.channelMerger,0,0),this.delayNodeRight.connect(this.channelMerger,0,1),this.delayNodeLeft.connect(this.delayNodeRight),this.feedbackGainNode.connect(this.delayNodeLeft),this.delayNodeRight.connect(this.feedbackGainNode),this.inputNode.connect(this.feedbackGainNode),this.channelMerger.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode);for(var i in e)this[i]=t[i],this[i]=void 0===this[i]||null===this[i]?e[i]:this[i]},n.Effects.PingPongDelay.prototype=Object.create(null,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.mix=t,this.dryGainNode.gain.value=n.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=n.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(t){o.Util.isInRange(t,0,180)&&(this.options.time=t,this.delayNodeLeft.delayTime.value=t,this.delayNodeRight.delayTime.value=t)}},feedback:{enumerable:!0,get:function(){return this.options.feedback},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.feedback=parseFloat(t,10),this.feedbackGainNode.gain.value=this.feedback)}}}),n.Effects.Reverb=function(t){this.options={},t=t||this.options;var e={mix:.5,time:.01,decay:.01,reverse:!1};this.inputNode=n.context.createGain(),this.reverbNode=n.context.createConvolver(),this.outputNode=n.context.createGain(),this.wetGainNode=n.context.createGain(),this.dryGainNode=n.context.createGain(),this.inputNode.connect(this.reverbNode),this.reverbNode.connect(this.wetGainNode),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.wetGainNode.connect(this.outputNode);for(var o in e)this[o]=t[o],this[o]=void 0===this[o]||null===this[o]?e[o]:this[o];i.bind(this)()},n.Effects.Reverb.prototype=Object.create(null,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.mix=t,this.dryGainNode.gain.value=n.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=n.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(t){o.Util.isInRange(t,1e-4,10)&&(this.options.time=t,i.bind(this)())}},decay:{enumerable:!0,get:function(){return this.options.decay},set:function(t){o.Util.isInRange(t,1e-4,10)&&(this.options.decay=t,i.bind(this)())}},reverse:{enumerable:!0,get:function(){return this.options.reverse},set:function(t){o.Util.isBool(t)&&(this.options.reverse=t,i.bind(this)())}}}),n.Effects.DubDelay=function(t){this.options={},t=t||this.options;var e={feedback:.6,time:.7,mix:.5,cutoff:700};this.inputNode=n.context.createGain(),this.outputNode=n.context.createGain(),this.dryGainNode=n.context.createGain(),this.wetGainNode=n.context.createGain(),this.feedbackGainNode=n.context.createGain(),this.delayNode=n.context.createDelay(),this.bqFilterNode=n.context.createBiquadFilter(),this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.inputNode.connect(this.wetGainNode),this.inputNode.connect(this.feedbackGainNode),this.feedbackGainNode.connect(this.bqFilterNode),this.bqFilterNode.connect(this.delayNode),this.delayNode.connect(this.feedbackGainNode),this.delayNode.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode);for(var i in e)this[i]=t[i],this[i]=void 0===this[i]||null===this[i]?e[i]:this[i]},n.Effects.DubDelay.prototype=Object.create(null,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.mix=t,this.dryGainNode.gain.value=n.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=n.Util.getWetLevel(this.mix))}},time:{enumerable:!0,get:function(){return this.options.time},set:function(t){o.Util.isInRange(t,0,180)&&(this.options.time=t,this.delayNode.delayTime.value=t)}},feedback:{enumerable:!0,get:function(){return this.options.feedback},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.feedback=parseFloat(t,10),this.feedbackGainNode.gain.value=this.feedback)}},cutoff:{enumerable:!0,get:function(){return this.options.cutoff},set:function(t){o.Util.isInRange(t,0,4e3)&&(this.options.cutoff=t,this.bqFilterNode.frequency.value=this.cutoff)}}}),n.Effects.RingModulator=function(t){this.options={},t=t||this.options;var e={speed:30,distortion:1,mix:.5};this.inputNode=n.context.createGain(),this.outputNode=n.context.createGain(),this.dryGainNode=n.context.createGain(),this.wetGainNode=n.context.createGain(),this.vIn=n.context.createOscillator(),this.vIn.start(0),this.vInGain=n.context.createGain(),this.vInGain.gain.value=.5,this.vInInverter1=n.context.createGain(),this.vInInverter1.gain.value=-1,this.vInInverter2=n.context.createGain(),this.vInInverter2.gain.value=-1,this.vInDiode1=new h(n.context),this.vInDiode2=new h(n.context),this.vInInverter3=n.context.createGain(),this.vInInverter3.gain.value=-1,this.vcInverter1=n.context.createGain(),this.vcInverter1.gain.value=-1,this.vcDiode3=new h(n.context),this.vcDiode4=new h(n.context),this.outGain=n.context.createGain(),this.outGain.gain.value=3,this.compressor=n.context.createDynamicsCompressor(),this.compressor.threshold.value=-24,this.compressor.ratio.value=16,this.inputNode.connect(this.dryGainNode),this.dryGainNode.connect(this.outputNode),this.inputNode.connect(this.vcInverter1),this.inputNode.connect(this.vcDiode4.node),this.vcInverter1.connect(this.vcDiode3.node),this.vIn.connect(this.vInGain),this.vInGain.connect(this.vInInverter1),this.vInGain.connect(this.vcInverter1),this.vInGain.connect(this.vcDiode4.node),this.vInInverter1.connect(this.vInInverter2),this.vInInverter1.connect(this.vInDiode2.node),this.vInInverter2.connect(this.vInDiode1.node),this.vInDiode1.connect(this.vInInverter3),this.vInDiode2.connect(this.vInInverter3),this.vInInverter3.connect(this.compressor),this.vcDiode3.connect(this.compressor),this.vcDiode4.connect(this.compressor),this.compressor.connect(this.outGain),this.outGain.connect(this.wetGainNode),this.wetGainNode.connect(this.outputNode);for(var i in e)this[i]=t[i],this[i]=void 0===this[i]||null===this[i]?e[i]:this[i]};var h=function(t){this.context=t,this.node=this.context.createWaveShaper(),this.vb=.2,this.vl=.4,this.h=1,this.setCurve()};return h.prototype.setDistortion=function(t){return this.h=t,this.setCurve()},h.prototype.setCurve=function(){var t,e,i,n,o,s,a,r;for(e=1024,o=new Float32Array(e),t=s=0,a=o.length;a>=0?a>s:s>a;t=a>=0?++s:--s)i=(t-e/2)/(e/2),i=Math.abs(i),n=i<=this.vb?0:this.vb<i&&i<=this.vl?this.h*(Math.pow(i-this.vb,2)/(2*this.vl-2*this.vb)):this.h*i-this.h*this.vl+this.h*(Math.pow(this.vl-this.vb,2)/(2*this.vl-2*this.vb)),o[t]=n;return r=this.node.curve=o},h.prototype.connect=function(t){return this.node.connect(t)},n.Effects.RingModulator.prototype=Object.create(null,{mix:{enumerable:!0,get:function(){return this.options.mix},set:function(t){o.Util.isInRange(t,0,1)&&(this.options.mix=t,this.dryGainNode.gain.value=n.Util.getDryLevel(this.mix),this.wetGainNode.gain.value=n.Util.getWetLevel(this.mix))}},speed:{enumerable:!0,get:function(){return this.options.speed},set:function(t){o.Util.isInRange(t,0,2e3)&&(this.options.speed=t,this.vIn.frequency.value=t)}},distortion:{enumerable:!0,get:function(){return this.options.distortion},set:function(t){if(o.Util.isInRange(t,.2,50)){this.options.distortion=parseFloat(t,10);for(var e=[this.vInDiode1,this.vInDiode2,this.vcDiode3,this.vcDiode4],i=0,n=e.length;n>i;i++)e[i].setDistortion(t)}}}}),n}("undefined"!=typeof window?window:global);

/* Smoke.js */
(function(e,t){var n={smoketimeout:[],init:false,zindex:1e3,i:0,bodyload:function(e){var r=t.createElement("div");r.setAttribute("id","smoke-out-"+e);r.className="smoke-base";r.style.zIndex=9999999;n.zindex++;t.body.appendChild(r)},newdialog:function(){var t=(new Date).getTime();t=Math.random(1,99)+t;if(!n.init){n.listen(e,"load",function(){n.bodyload(t)})}else{n.bodyload(t)}return t},forceload:function(){},build:function(t,r){n.i++;r.stack=n.i;t=t.replace(/\n/g,"<br />");t=t.replace(/\r/g,"<br />");var i="",s="OK",o="Cancel",u="",a="",f;if(r.type==="prompt"){i='<div class="dialog-prompt">'+'<input id="dialog-input-'+r.newid+'" type="text" '+(r.params.value?'value="'+r.params.value+'"':"")+" />"+"</div>"}if(r.params.ok){s=r.params.ok}if(r.params.cancel){o=r.params.cancel}if(r.params.classname){u=r.params.classname}if(r.type!=="signal"){a='<div class="dialog-buttons">';if(r.type==="alert"){a+='<button id="alert-ok-'+r.newid+'">'+s+"</button>"}else if(r.type==="quiz"){if(r.params.button_1){a+='<button class="quiz-button" id="'+r.type+"-ok1-"+r.newid+'">'+r.params.button_1+"</button>"}if(r.params.button_2){a+='<button class="quiz-button" id="'+r.type+"-ok2-"+r.newid+'">'+r.params.button_2+"</button>"}if(r.params.button_3){a+='<button class="quiz-button" id="'+r.type+"-ok3-"+r.newid+'">'+r.params.button_3+"</button>"}if(r.params.button_cancel){a+='<button id="'+r.type+"-cancel-"+r.newid+'" class="cancel">'+r.params.button_cancel+"</button>"}}else if(r.type==="prompt"||r.type==="confirm"){if(r.params.reverseButtons){a+='<button id="'+r.type+"-ok-"+r.newid+'">'+s+"</button>"+'<button id="'+r.type+"-cancel-"+r.newid+'" class="cancel">'+o+"</button>"}else{a+='<button id="'+r.type+"-cancel-"+r.newid+'" class="cancel">'+o+"</button>"+'<button id="'+r.type+"-ok-"+r.newid+'">'+s+"</button>"}}a+="</div>"}f='<div id="smoke-bg-'+r.newid+'" class="smokebg"></div>'+'<div class="dialog smoke '+u+'">'+'<div class="dialog-inner">'+t+i+a+"</div>"+"</div>";if(!n.init){n.listen(e,"load",function(){n.finishbuild(t,r,f)})}else{n.finishbuild(t,r,f)}},finishbuild:function(e,r,i){var s=t.getElementById("smoke-out-"+r.newid);s.className="smoke-base smoke-visible  smoke-"+r.type;s.innerHTML=i;while(s.innerHTML===""){s.innerHTML=i}if(n.smoketimeout[r.newid]){clearTimeout(n.smoketimeout[r.newid])}n.listen(t.getElementById("smoke-bg-"+r.newid),"click",function(){n.destroy(r.type,r.newid);if(r.type==="prompt"||r.type==="confirm"||r.type==="quiz"){r.callback(false)}else if(r.type==="alert"&&typeof r.callback!=="undefined"){r.callback()}});switch(r.type){case"alert":n.finishbuildAlert(e,r,i);break;case"confirm":n.finishbuildConfirm(e,r,i);break;case"quiz":n.finishbuildQuiz(e,r,i);break;case"prompt":n.finishbuildPrompt(e,r,i);break;case"signal":n.finishbuildSignal(e,r,i);break;default:throw"Unknown type: "+r.type}},finishbuildAlert:function(r,i,s){n.listen(t.getElementById("alert-ok-"+i.newid),"click",function(){n.destroy(i.type,i.newid);if(typeof i.callback!=="undefined"){i.callback()}});t.onkeyup=function(t){if(!t){t=e.event}if(t.keyCode===13||t.keyCode===32||t.keyCode===27){n.destroy(i.type,i.newid);if(typeof i.callback!=="undefined"){i.callback()}}}},finishbuildConfirm:function(r,i,s){n.listen(t.getElementById("confirm-cancel-"+i.newid),"click",function(){n.destroy(i.type,i.newid);i.callback(false)});n.listen(t.getElementById("confirm-ok-"+i.newid),"click",function(){n.destroy(i.type,i.newid);i.callback(true)});t.onkeyup=function(t){if(!t){t=e.event}if(t.keyCode===13||t.keyCode===32){n.destroy(i.type,i.newid);i.callback(true)}else if(t.keyCode===27){n.destroy(i.type,i.newid);i.callback(false)}}},finishbuildQuiz:function(r,i,s){var o,u,a;n.listen(t.getElementById("quiz-cancel-"+i.newid),"click",function(){n.destroy(i.type,i.newid);i.callback(false)});if(o=t.getElementById("quiz-ok1-"+i.newid))n.listen(o,"click",function(){n.destroy(i.type,i.newid);i.callback(o.innerHTML)});if(u=t.getElementById("quiz-ok2-"+i.newid))n.listen(u,"click",function(){n.destroy(i.type,i.newid);i.callback(u.innerHTML)});if(a=t.getElementById("quiz-ok3-"+i.newid))n.listen(a,"click",function(){n.destroy(i.type,i.newid);i.callback(a.innerHTML)});t.onkeyup=function(t){if(!t){t=e.event}if(t.keyCode===27){n.destroy(i.type,i.newid);i.callback(false)}}},finishbuildPrompt:function(r,i,s){var o=t.getElementById("dialog-input-"+i.newid);setTimeout(function(){o.focus();o.select()},100);n.listen(t.getElementById("prompt-cancel-"+i.newid),"click",function(){n.destroy(i.type,i.newid);i.callback(false)});n.listen(t.getElementById("prompt-ok-"+i.newid),"click",function(){n.destroy(i.type,i.newid);i.callback(o.value)});t.onkeyup=function(t){if(!t){t=e.event}if(t.keyCode===13){n.destroy(i.type,i.newid);i.callback(o.value)}else if(t.keyCode===27){n.destroy(i.type,i.newid);i.callback(false)}}},finishbuildSignal:function(r,i,s){t.onkeyup=function(t){if(!t){t=e.event}if(t.keyCode===27){n.destroy(i.type,i.newid);if(typeof i.callback!=="undefined"){i.callback()}}};n.smoketimeout[i.newid]=setTimeout(function(){n.destroy(i.type,i.newid);if(typeof i.callback!=="undefined"){i.callback()}},i.timeout)},destroy:function(e,r){var i=t.getElementById("smoke-out-"+r);if(e!=="quiz"){var s=t.getElementById(e+"-ok-"+r)}var o=t.getElementById(e+"-cancel-"+r);i.className="smoke-base";if(s){n.stoplistening(s,"click",function(){});t.onkeyup=null}if(e==="quiz"){var u=t.getElementsByClassName("quiz-button");for(var a=0;a<u.length;a++){n.stoplistening(u[a],"click",function(){});t.onkeyup=null}}if(o){n.stoplistening(o,"click",function(){})}n.i=0;i.innerHTML=""},alert:function(e,t,r){if(typeof r!=="object"){r=false}var i=n.newdialog();n.build(e,{type:"alert",callback:t,params:r,newid:i})},signal:function(e,t,r){if(typeof r!=="object"){r=false}var i=5e3;if(r.duration!=="undefined"){i=r.duration}var s=n.newdialog();n.build(e,{type:"signal",callback:t,timeout:i,params:r,newid:s})},confirm:function(e,t,r){if(typeof r!=="object"){r=false}var i=n.newdialog();n.build(e,{type:"confirm",callback:t,params:r,newid:i})},quiz:function(e,t,r){if(typeof r!=="object"){r=false}var i=n.newdialog();n.build(e,{type:"quiz",callback:t,params:r,newid:i})},prompt:function(e,t,r){if(typeof r!=="object"){r=false}var i=n.newdialog();return n.build(e,{type:"prompt",callback:t,params:r,newid:i})},listen:function(e,t,n){if(e.addEventListener){return e.addEventListener(t,n,false)}if(e.attachEvent){return e.attachEvent("on"+t,n)}return false},stoplistening:function(e,t,n){if(e.removeEventListener){return e.removeEventListener(t,n,false)}if(e.detachEvent){return e.detachEvent("on"+t,n)}return false}};n.init=true;if(typeof module!="undefined"&&module.exports){module.exports=n}else if(typeof define==="function"&&define.amd){define("smoke",[],function(){return n})}else{this.smoke=n}})(window,document);


/*! Social Likes v3.0.15 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a,b){"use strict";function c(a,b){this.container=a,this.options=b,this.init()}function d(b,c){this.widget=b,this.options=a.extend({},c),this.detectService(),this.service&&this.init()}function e(a){function b(a,b){return b.toUpper()}var c={},d=a.data();for(var e in d){var f=d[e];"yes"===f?f=!0:"no"===f&&(f=!1),c[e.replace(/-(\w)/g,b)]=f}return c}function f(a,b){return g(a,b,encodeURIComponent)}function g(a,b,c){return a.replace(/\{([^\}]+)\}/g,function(a,d){return d in b?c?c(b[d]):b[d]:a})}function h(a,b){var c=l+a;return c+" "+c+"_"+b}function i(b,c){function d(g){"keydown"===g.type&&27!==g.which||a(g.target).closest(b).length||(b.removeClass(m),e.off(f,d),a.isFunction(c)&&c())}var e=a(document),f="click touchstart keydown";e.on(f,d)}function j(a){var b=10;if(document.documentElement.getBoundingClientRect){var c=parseInt(a.css("left"),10),d=parseInt(a.css("top"),10),e=a[0].getBoundingClientRect();e.left<b?a.css("left",b-e.left+c):e.right>window.innerWidth-b&&a.css("left",window.innerWidth-e.right-b+c),e.top<b?a.css("top",b-e.top+d):e.bottom>window.innerHeight-b&&a.css("top",window.innerHeight-e.bottom-b+d)}a.addClass(m)}var k="social-likes",l=k+"__",m=k+"_opened",n="https:"===location.protocol?"https:":"http:",o="https:"===n,p={facebook:{counterUrl:"https://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=?",convertNumber:function(a){return a.data[0].total_count},popupUrl:"https://www.facebook.com/sharer/sharer.php?u={url}",popupWidth:600,popupHeight:500},twitter:{popupUrl:"https://twitter.com/intent/tweet?url={url}&text={title}",popupWidth:600,popupHeight:450,click:function(){return/[\.\?:\-Ã¢â‚¬â€œÃ¢â‚¬â€]\s*$/.test(this.options.title)||(this.options.title+=":"),!0}},mailru:{counterUrl:n+"//connect.mail.ru/share_count?url_list={url}&callback=1&func=?",convertNumber:function(a){for(var b in a)if(a.hasOwnProperty(b))return a[b].shares},popupUrl:n+"//connect.mail.ru/share?share_url={url}&title={title}",popupWidth:550,popupHeight:360},vkontakte:{counterUrl:"https://vk.com/share.php?act=count&url={url}&index={index}",counter:function(b,c){var d=p.vkontakte;d._||(d._=[],window.VK||(window.VK={}),window.VK.Share={count:function(a,b){d._[a].resolve(b)}});var e=d._.length;d._.push(c),a.getScript(f(b,{index:e})).fail(c.reject)},popupUrl:n+"//vk.com/share.php?url={url}&title={title}",popupWidth:550,popupHeight:330},odnoklassniki:{counterUrl:o?b:"http://connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}",counter:function(b,c){var d=p.odnoklassniki;d._||(d._=[],window.ODKL||(window.ODKL={}),window.ODKL.updateCount=function(a,b){d._[a].resolve(b)});var e=d._.length;d._.push(c),a.getScript(f(b,{index:e})).fail(c.reject)},popupUrl:"http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",popupWidth:550,popupHeight:360},plusone:{counterUrl:o?b:"http://share.yandex.ru/gpp.xml?url={url}",counter:function(b,c){var d=p.plusone;return d._?void c.reject():(window.services||(window.services={}),window.services.gplus={cb:function(a){"string"==typeof a&&(a=a.replace(/\D/g,"")),d._.resolve(parseInt(a,10))}},d._=c,void a.getScript(f(b)).fail(c.reject))},popupUrl:"https://plus.google.com/share?url={url}",popupWidth:700,popupHeight:500},pinterest:{counterUrl:n+"//api.pinterest.com/v1/urls/count.json?url={url}&callback=?",convertNumber:function(a){return a.count},popupUrl:n+"//pinterest.com/pin/create/button/?url={url}&description={title}",popupWidth:630,popupHeight:270}},q={promises:{},fetch:function(b,c,d){q.promises[b]||(q.promises[b]={});var e=q.promises[b];if(!d.forceUpdate&&e[c])return e[c];var g=a.extend({},p[b],d),h=a.Deferred(),i=g.counterUrl&&f(g.counterUrl,{url:c});return i&&a.isFunction(g.counter)?g.counter(i,h):g.counterUrl?a.getJSON(i).done(function(b){try{var c=b;a.isFunction(g.convertNumber)&&(c=g.convertNumber(b)),h.resolve(c)}catch(d){h.reject()}}).fail(h.reject):h.reject(),e[c]=h.promise(),e[c]}};a.fn.socialLikes=function(b){return this.each(function(){var d=a(this),f=d.data(k);f?a.isPlainObject(b)&&f.update(b):(f=new c(d,a.extend({},a.fn.socialLikes.defaults,b,e(d))),d.data(k,f))})},a.fn.socialLikes.defaults={url:window.location.href.replace(window.location.hash,""),title:document.title,counters:!0,zeroes:!1,wait:500,timeout:1e4,popupCheckInterval:500,singleTitle:"Share"},c.prototype={init:function(){this.container.addClass(k),this.single=this.container.hasClass(k+"_single"),this.initUserButtons(),this.countersLeft=0,this.number=0,this.container.on("counter."+k,a.proxy(this.updateCounter,this));var b=this.container.children();this.makeSingleButton(),this.buttons=[],b.each(a.proxy(function(b,c){var e=new d(a(c),this.options);this.buttons.push(e),e.options.counterUrl&&this.countersLeft++},this)),this.options.counters?(this.timer=setTimeout(a.proxy(this.appear,this),this.options.wait),this.timeout=setTimeout(a.proxy(this.ready,this,!0),this.options.timeout)):this.appear()},initUserButtons:function(){!this.userButtonInited&&window.socialLikesButtons&&a.extend(!0,p,socialLikesButtons),this.userButtonInited=!0},makeSingleButton:function(){if(this.single){var b=this.container;b.addClass(k+"_vertical"),b.wrap(a("<div>",{"class":k+"_single-w"})),b.wrapInner(a("<div>",{"class":k+"__single-container"}));var c=b.parent(),d=a("<div>",{"class":h("widget","single")}),e=a(g('<div class="{buttonCls}"><span class="{iconCls}"></span>{title}</div>',{buttonCls:h("button","single"),iconCls:h("icon","single"),title:this.options.singleTitle}));d.append(e),c.append(d),d.on("click",function(){var a=k+"__widget_active";return d.toggleClass(a),d.hasClass(a)?(b.css({left:-(b.width()-d.width())/2,top:-b.height()}),j(b),i(b,function(){d.removeClass(a)})):b.removeClass(m),!1}),this.widget=d}},update:function(b){if(b.forceUpdate||b.url!==this.options.url){this.number=0,this.countersLeft=this.buttons.length,this.widget&&this.widget.find("."+k+"__counter").remove(),a.extend(this.options,b);for(var c=0;c<this.buttons.length;c++)this.buttons[c].update(b)}},updateCounter:function(a,b,c){c=c||0,(c||this.options.zeroes)&&(this.number+=c,this.single&&this.getCounterElem().text(this.number)),this.countersLeft--,0===this.countersLeft&&(this.appear(),this.ready())},appear:function(){this.container.addClass(k+"_visible")},ready:function(a){this.timeout&&clearTimeout(this.timeout),this.container.addClass(k+"_ready"),a||this.container.trigger("ready."+k,this.number)},getCounterElem:function(){var b=this.widget.find("."+l+"counter_single");return b.length||(b=a("<span>",{"class":h("counter","single")}),this.widget.append(b)),b}},d.prototype={init:function(){this.detectParams(),this.initHtml(),setTimeout(a.proxy(this.initCounter,this),0)},update:function(b){a.extend(this.options,{forceUpdate:!1},b),this.widget.find("."+k+"__counter").remove(),this.initCounter()},detectService:function(){var b=this.widget.data("service");if(!b){for(var c=this.widget[0],d=c.classList||c.className.split(" "),e=0;e<d.length;e++){var f=d[e];if(p[f]){b=f;break}}if(!b)return}this.service=b,a.extend(this.options,p[b])},detectParams:function(){var a=this.widget.data();if(a.counter){var b=parseInt(a.counter,10);isNaN(b)?this.options.counterUrl=a.counter:this.options.counterNumber=b}a.title&&(this.options.title=a.title),a.url&&(this.options.url=a.url)},initHtml:function(){var b=this.options,c=this.widget,d=c.find("a");d.length&&this.cloneDataAttrs(d,c);var e=a("<span>",{"class":this.getElementClassNames("button"),text:c.text()});if(b.clickUrl){var g=f(b.clickUrl,{url:b.url,title:b.title}),h=a("<a>",{href:g});this.cloneDataAttrs(c,h),c.replaceWith(h),this.widget=c=h}else c.on("click",a.proxy(this.click,this));c.removeClass(this.service),c.addClass(this.getElementClassNames("widget")),e.prepend(a("<span>",{"class":this.getElementClassNames("icon")})),c.empty().append(e),this.button=e},initCounter:function(){if(this.options.counters)if(this.options.counterNumber)this.updateCounter(this.options.counterNumber);else{var b={counterUrl:this.options.counterUrl,forceUpdate:this.options.forceUpdate};q.fetch(this.service,this.options.url,b).always(a.proxy(this.updateCounter,this))}},cloneDataAttrs:function(a,b){var c=a.data();for(var d in c)c.hasOwnProperty(d)&&b.data(d,c[d])},getElementClassNames:function(a){return h(a,this.service)},updateCounter:function(b){b=parseInt(b,10)||0;var c={"class":this.getElementClassNames("counter"),text:b};b||this.options.zeroes||(c["class"]+=" "+k+"__counter_empty",c.text="");var d=a("<span>",c);this.widget.append(d),this.widget.trigger("counter."+k,[this.service,b])},click:function(b){var c=this.options,d=!0;if(a.isFunction(c.click)&&(d=c.click.call(this,b)),d){var e=f(c.popupUrl,{url:c.url,title:c.title});e=this.addAdditionalParamsToUrl(e),this.openPopup(e,{width:c.popupWidth,height:c.popupHeight})}return!1},addAdditionalParamsToUrl:function(b){var c=a.param(a.extend(this.widget.data(),this.options.data));if(a.isEmptyObject(c))return b;var d=-1===b.indexOf("?")?"?":"&";return b+d+c},openPopup:function(b,c){var d=Math.round(screen.width/2-c.width/2),e=0;screen.height>c.height&&(e=Math.round(screen.height/3-c.height/2));var f=window.open(b,"sl_"+this.service,"left="+d+",top="+e+",width="+c.width+",height="+c.height+",personalbar=0,toolbar=0,scrollbars=1,resizable=1");if(f){f.focus(),this.widget.trigger("popup_opened."+k,[this.service,f]);var g=setInterval(a.proxy(function(){f.closed&&(clearInterval(g),this.widget.trigger("popup_closed."+k,this.service))},this),this.options.popupCheckInterval)}else location.href=b}},a(function(){a("."+k).socialLikes()})});



/* animateNumber */
(function(d){var q=function(b){return b.split("").reverse().join("")},m={numberStep:function(b,a){var e=Math.floor(b);d(a.elem).text(e)}},h=function(b){var a=b.elem;a.nodeType&&a.parentNode&&(a=a._animateNumberSetter,a||(a=m.numberStep),a(b.now,b))};d.Tween&&d.Tween.propHooks?d.Tween.propHooks.number={set:h}:d.fx.step.number=h;d.animateNumber={numberStepFactories:{append:function(b){return function(a,e){var g=Math.floor(a);d(e.elem).prop("number",a).text(g+b)}},separator:function(b,a,e){b=b||" ";
    a=a||3;e=e||"";return function(g,k){var c=Math.floor(g).toString(),t=d(k.elem);if(c.length>a){for(var f=c,l=a,m=f.split("").reverse(),c=[],n,r,p,s=0,h=Math.ceil(f.length/l);s<h;s++){n="";for(p=0;p<l;p++){r=s*l+p;if(r===f.length)break;n+=m[r]}c.push(n)}f=c.length-1;l=q(c[f]);c[f]=q(parseInt(l,10).toString());c=c.join(b);c=q(c)}t.prop("number",g).text(c+e)}}}};d.fn.animateNumber=function(){for(var b=arguments[0],a=d.extend({},m,b),e=d(this),g=[a],k=1,c=arguments.length;k<c;k++)g.push(arguments[k]);
    if(b.numberStep){var h=this.each(function(){this._animateNumberSetter=b.numberStep}),f=a.complete;a.complete=function(){h.each(function(){delete this._animateNumberSetter});f&&f.apply(this,arguments)}}return e.animate.apply(e,g)}})(jQuery);
getUniqueId = function () {
    var dateObject = new Date();
    var uniqueId = dateObject.getTime().toString().replace('14','');
    return uniqueId;
};

function ShareURL(soc, url, text) {

    url = encodeURIComponent(url);

    if (soc == 'fb') {
        //url = 'https:/facebook.com/share.php?url='+url;
        var app_id = '217598598309697';
        url = 'https://www.facebook.com/sharer/sharer.php?app_id='+app_id+'&sdk=joey&u='+url+'&display=popup&ref=plugin&src=share_button';
    }
    else if (soc == 'tw') {
        url = 'https://www.twitter.com/share?text='+text+'&amp;url='+url;
    }
    else if (soc == 'vk') {
        url = 'http://vk.com/share.php?url='+url;
    }
    socWindow = window.open(url,'','width=400,height=300');
    socWindow.focus();
}


function GoTo(line, t) {
    t = (t == undefined)  ? 100 : t;
    $('html, body').animate({
        scrollTop: $(line).offset().top-t
    }, 500);
}



function addBetLine(name, lvl, step, bet, profit) {
    var betsArea 	 = "#bets-area";
    var betsAreaLine = "#bets-area .line";
    var betType		 = (profit > 0) ? 'profit' : '';

    var template = '<div class="line '+betType+'">'+
        '<div class="b1">'+name+'</div>'+
        '<div class="b5"><img src="images/crank-'+lvl+'.svg" alt="level '+lvl+'"></div>'+
        '<div class="b4">'+step+'</div>'+
        '<div class="b3">'+profit+'<span class="flaticon-coin"></span></div>'+
        '<div class="b2">'+bet+'<span class="flaticon-coin"></span></div>'+
        '<div class="clr"></div>'+
        '</div>';

    $(betsArea).prepend(template);
    $(betsAreaLine).last().remove();
}


function UpdateBalance(sum) {
    $(".user-balance").numerator({
        easing: "linear",
        duration: 1e3,
        toValue: sum
    });
    return sum;
}

function NewBalance(sum) {
    window.config['balance'] = parseFloat(sum);
    $("#user-balance").val(window.config['balance']);
}


function verifyBox(boxVerify, iconVerify) {
    var status = $(boxVerify).css("display");
    if (status == 'none') {
        $(boxVerify).fadeIn(100);
        $(iconVerify).removeClass('flaticon-arr-down');
        $(iconVerify).addClass('flaticon-arr-up');
        GoTo(boxVerify, 50);
    }
    else {
        $(boxVerify).fadeOut(100);
        $(iconVerify).removeClass('flaticon-arr-up');
        $(iconVerify).addClass('flaticon-arr-down');
    }
}
function goProfile(){
    window.location.href = "/profile";
}

function sell(){
    $.ajax({
        url: "/sale2",
        type: "POST",
        data: {
            user: login
        },
        dataType: "json",
        success: function(response) {
            playSoundEffect('click');
            $(window.game['blocker']).fadeIn(0);
            $(window.game['loader']).fadeOut(0);
            $(window.game['btn_start']).prop("disabled", "");
            $(window.game['inp_amount']).prop("readonly", "");
            $(window.game['layout_game_end']).fadeOut(0);
            $(window.game['layout_game_win']).fadeOut(0);
            $(window.game['layout_game_lose']).fadeOut(0);
            gameNewTable();
            $(".user-balance").numerator({
                easing: "linear",
                duration: 1e3,
                toValue: response.balance
            });
        }
    });
}

function popupOpen(field, pos1) {

    var screenWidth = $(window).width();
    var screenHeight = $(window).height();

    if(field == '.pp-withdrawal' && login == 0 || field == '.pp-deposit' && login == 0){
        pos1 = (pos1 != undefined) ? pos1 : '50%';
        pos2 = (pos1 != undefined && pos1 != '50%') ? Math.round(parseInt(pos1.replace('%',''))/3)+'%' : '40%';



        $('.not-logged').css("top","200%");
        $('.not-logged').css("display","block");
        $('.overlay').fadeIn(300);

        $('.not-logged').animate({
            top: pos2
        }, 500, function() {

            $('.not-logged').animate({
                top: pos1
            }, 500, function() {

            });
        });

        window.opened_popup = field;
        return;
    }

    if (field == '.account' && screenWidth < 1024) {
        pos1 = '5%;'
    }

    pos1 = (pos1 != undefined) ? pos1 : '50%';
    pos2 = (pos1 != undefined && pos1 != '50%') ? Math.round(parseInt(pos1.replace('%',''))/3)+'%' : '40%';



    $(field).css("top","200%");
    $(field).css("display","block");
    $('.overlay').fadeIn(300);

    $(field).animate({
        top: pos2
    }, 500, function() {

        $(field).animate({
            top: pos1
        }, 500, function() {

        });
    });

    window.opened_popup = field;

}

function popupClose(field) {

    $(field).animate({
        top: "60%"
    }, 500, function() {

        $('.overlay').fadeOut(500);

        $(field).animate({
            top: "-500%"
        }, 500, function() {

        });
    });

    window.opened_popup = field;

}


function popupsClose() {
    popupClose(window.opened_popup);
}


function calcAmount(field1, field2, direction) {

    var rate = ($('.inp-d-rate').val() == 'usd') ? window.config['rate_usd'] : window.config['rate_rur'];

    if (direction == 1) {
        var amount = parseInt(parseFloat($(field1).val())/rate);
        $(field2).val(amount);
    }
    else if (direction == 2) {
        var amount = parseInt(parseFloat($(field2).val())*rate);
        $(field1).val(amount);
    }

}


function depositGate(gate, name, t) {
    $(".deposit-gates li").removeClass('active');
    $(t).addClass('active');

    $("#inp-deposit-name").html(name);
    $("#inp-d-gateway").val(gate);
    $("#inp-d-url").prop('action','/pay');
}


function withdrawalGate(gate, name, holder, t) {
    $(".withdrawal-gates li").removeClass('active');
    $(t).addClass('active');

    $("#inp-withdrawal-name").html(name);
    $("#inp-w-gateway").val(gate);
    $("#inp-w-holder").prop('placeholder',holder);
}

function withdrawal() {
    var withdrawalForm = 'form[name="form-withdrawal"]';
    var withdrawalData = $( withdrawalForm ).serialize();
    var loader = '#withdrawal-loader';
    $(loader).fadeIn(100);

    $.post("/vivod", withdrawalData ,function(data) {
        if (data['status'] == 1) {
            smoke.alert(data['message']);
            UpdateBalance(data['sum']*1);
            popupClose('.pp-withdrawal');
        }
        else {
            smoke.alert(data['message']);
        }

    }).done(function(){
        $(loader).fadeOut(500);
    });
}



function account_update(field, value, elm) {
    var update_data = '&field='+field+'&value='+value+'&key='+getUniqueId();

    $.post("?page_load=ajax&url=/ajax/account-update.ajax", update_data ,function(data) {
        data = JSON.parse(data);

        if (data['status'] == 1) {
            if (field == 'login') {
                $("#username-0").text(data['message']);
                $("#username-1").text(data['message']);
                window.config['login'] = data['message'];
            }
        }
        else {
            smoke.alert(data['message']);

            if (elm != undefined && field == 'login') {
                $(elm).val(window.config['login']);
            }
        }

    });

}


function getHistory(elm, htype) {

    var icons = {
        0: '<span class="flaticon-wait s-wait"></span>',
        1: '<span class="flaticon-check s-check"></span>',
        2: '<span class="flaticon-reload s-reload"></span>'
    };

    if (window.template['history'] == undefined || window.template['history'].length<1) {
        $.ajax({
            url: "?page_load=ajax&url=/ajax/getTemplate.ajax",
            type: 'POST',
            data: {"tpl": "history"},
            success: function(result) {
                window.template['history'] = JSON.parse(result);
            },
            async: false
        });

    }

    if (window.template['history'].length > 1) {

        $.post("?page_load=ajax&url=/ajax/history.ajax", "&type="+htype ,function(data) {
            data = JSON.parse(data);

            if (data['status'] == 1) {

                var list, item, item_data = '';

                $.each(data['message'], function(i) {

                    i_data = data['message'][i];
                    item = window.template['history'];

                    item = item.replace('%ID%', 	i_data['ID']);
                    item = item.replace('%uID%', 	i_data['uID']);
                    item = item.replace('%AM%', 	i_data['sign']+' '+i_data['am']);
                    item = item.replace('%DATA%', 	i_data['date']);
                    item = item.replace('%STATUS%', icons[i_data['status']]);
                    item = item.replace('%SIGN%', 	(i_data['sign'] == '-') ? 'minus' : '');
                    item = item.replace('%SIGN%', 	(i_data['sign'] == '-') ? 'minus' : '');
                    item = item.replace('%DESC%', 	(i_data['status'] == 2 && i_data['type'] == 4) ? '<s>'+i_data['desc']+'</s>' : i_data['desc']);

                    list += item;
                });

                $(elm).html(list);

            }
            else {
                $(elm).html('<tr><td colspan="5">'+data['message']+'</td></tr>');
            }

        });

    }
    else {
        var gh = setTimeout(function(){ getHistory(elm) }, 1000);
    }

}


function dailyBonus(loader, t) {

    $(loader).fadeIn(100);


    $.post("/bonus", '&user=' + login ,function(data) {
        if (data['status'] == 1) {
            UpdateBalance(data['amount']);
            $(t).prop("disabled", "disabled");
            $(t).text(data['btn']);
            smoke.alert(data['message']);
            popupClose('.free-coins');
        }
        else {
            smoke.alert(data['message']);
        }

    }).done(function(){
        $(loader).fadeOut(500);
    });

}


function isMobile() {
    var e = !1;
    return function(a) {
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) && (e = !0)
    }(navigator.userAgent || navigator.vendor || window.opera), e
}


function support(loader, area) {

    var supportForm = 'form[name="form-support"]';
    var supportData = $( supportForm ).serialize()+'&key='+getUniqueId();
    $(loader).fadeIn(100);


    $.post("?page_load=ajax&url=/ajax/support.ajax", supportData ,function(data) {
        data = JSON.parse(data);

        if (data['status'] == 1) {
            $(area).html(data['message']);
        }
        else {
            smoke.alert(data['message']);
        }

    }).done(function(){
        $(loader).fadeOut(500);
    });
}


function getStatic(page, lang) {
    lang = (lang == undefined) ? window.config['lang'] : lang;

    //$("#static-page-title .t").text('...');
    //$("#static-page-text").text('<div class="loader"></div>');
    if(page == 'terms'){
        popupOpen('.terms', '5%');
    }else{
        popupOpen('.static', '5%');
    }

    return false;
}





function gameChangeBet(pageload) {
    window.config['game_process_bet'] = parseInt($("#bet-amount").val());

    window.config['game_process_bet'] = (window.config['game_process_bet'] > window.config['game_max_bet'])
        ? window.config['game_max_bet'] : window.config['game_process_bet'];

    window.config['game_process_bet'] = (window.config['game_process_bet'] < window.config['game_min_bet'])
        ? window.config['game_min_bet'] : window.config['game_process_bet'];

    $("#bet-amount").val(window.config['game_process_bet']);



    window.config['game_process_more'] = Math.round(window.config['game_process_bet']*window.config['game_more']/100);


    var win_min_amount = window.config['game_process_bet'] * window.config['game_win_min'],
        win_max_amount = window.config['game_process_bet'] * window.config['game_win_max'],
        win_gua_amount = Math.round(window.config['game_process_bet'] / window.config['game_guaranteed']);



    $('#win-min-amount').html(win_min_amount);
    $('#win-max-amount').html(win_max_amount);


    if (pageload != true) {
        playSoundEffect('bet');
    }
}



function gamePlayAgain() {

    playSoundEffect('click');
    $(window.game['blocker']).fadeIn(0);
    $(window.game['loader']).fadeOut(0);
    $(window.game['btn_start']).prop("disabled", "");
    $(window.game['inp_amount']).prop("readonly", "");
    $(window.game['layout_game_end']).fadeOut(0);
    $(window.game['layout_game_win']).fadeOut(0);
    $(window.game['layout_game_lose']).fadeOut(0);
    gameNewTable();

}



function gameProcessing() {
    var t = setTimeout(function(){

        $('.winner-box.opened i').each(function() {
            var value = $(this).text();
        });

    }, 300);
}


function gameNewTable() {

    $(window.game['blocker']).fadeIn(0);
    $(window.game['loader']).fadeOut(0);
    $(window.game['btn_start']).prop("disabled", "");
    $(window.game['inp_amount']).prop("readonly", "");
    $(window.game['layout_game_end']).fadeOut(0);

    window.config['game_process_step_4'] = 0;
    window.config['game_process_step'] = 0;

    for (var k = 1; k <= 9; k++) {
        $('#scratch-can-'+k).fadeIn(0);
        $("#gabo-image-"+k).attr("src", '');
    }
    scratchCardsReload();
    $("#win-gua-amount").html('');
}

function gameStart() {

    $(window.game['blocker']).removeAttr(window.game['blocker_d']);
    $(window.game['blocker']).fadeOut(0);
    $(window.game['loader']).fadeIn(0);
    $(window.game['btn_start']).prop("disabled", "disabled");
    $(window.game['inp_amount']).prop("readonly", "readonly");
    if (window.user === undefined) {
        var game_data = "&user="+login+"&bet="+window.config['game_process_bet']+"&id="+$("#box_id").val()+"&demo="+window.config['game_process_demo'];

    }else{
        id: $("#box_id").val()
        var game_data = "&user="+window.user+"&id="+$("#box_id").val()+"&bet="+window.config['game_process_bet']+"&demo="+window.config['game_process_demo'];

    }

    $.post("/newGame", game_data ,function(data) {

        //data = JSON.parse(data);
        if (data['status'] == 1) {
            if(data['demo'] == 1){
                gameDemoON();
            }else{
                var socket = io.connect(':2020', {rememberTransport: false});
                socket.emit('update');
                gameDemoOFF();
                UpdateBalance(data['amount']);
            }
            var socket = io.connect(':2020', {rememberTransport: false});
            socket.emit('update');
            window.config['game_process_state'] = 1;
            $("#game-win-amount").html('');
            $("#game-win-namer").html('');
            $('#sell').html('Продать за ');
            $('#sell2').html('Продать гарант  за ');
            $("#win-gua-amount").html('');
            for (i = 1; i < 10; i++) { 
                $("#gabo-image-"+i).attr("src",'');
            }
            playSoundEffect('start');

        }
        else {

            smoke.alert(data['message']);

            $(window.game['blocker']).fadeIn(0);
            $(window.game['loader']).fadeOut(0);
            $(window.game['btn_start']).prop("disabled", "");
            $(window.game['inp_amount']).prop("readonly", "");

            window.config['game_process_state'] = 0;

            if(data['demo'] == 1){
                gameDemoON();
            }else{
                gameDemoOFF();
            }

        }

        $(window.game['loader']).fadeOut(0);

    });


}

function showCards(data){
    //data = JSON.parse(data);
    var socket = io.connect(':2020', {rememberTransport: false});
    socket.emit('update');
    $.each(data['cards'], function(i) {
        scratch_value = data['cards'][i]['steps'];
        if (scratch_value != '*') {
            var a = i + 1;
            $.get("/getImage", "id="+scratch_value  ,function(data2) {
                $("#gabo-image-"+a).attr("src", data2['image']);
            });
            $('#scratch-can-'+a).fadeOut(100);
            $(window.game['blocker']).fadeIn(0);

        }
    });
}

function gameStep(id) {

    playSoundEffect('click');

    if(window.config['game_process_step'] == 3 && window.config['game_process_step_4'] != 1){return smoke.alert('Choose option!');}
    if (window.config['game_process_step_4'] == 1) {

        if (window.user === undefined) {
            var game_data2 = "&user="+login+"&card="+id;

        }else{
            var game_data2 = "&user="+login+"&card="+id;
        }
        $.post("/checkCard2", game_data2 ,function(data) {

            data = JSON.parse(data);
            if (data['status'] == 1) {

                var t3 = setTimeout(function(){

                    if(data['win'] == 0){
                        $('#sell2').html('Продать гарант за ' + data['win2'] + ' Р');
                    }

                    if (data['win'] > 0) {
                        clearSoundEffects();
                        playSoundEffect('win');
                        var socket = io.connect(':2020', {rememberTransport: false});
                        socket.emit('update');
                        $('#sell').html('Продать за ' + data['win'] + ' Р');
                    } else {
                        clearSoundEffects();
                        playSoundEffect('lose');
                        var img = document.createElement("img");
                        img.src = data['garantimage'];
                        img.className = 'animated bounceIn';
                        $("#win-gua-amount").html(img);
                        $(window.game['layout_game_lose']).fadeIn(200);
                    }

                }, 0); //1000


                $.each(data['matrix'], function(i) {

                    scratch_value = data['matrix'][i]['steps'];
                    if (scratch_value != '*') {
                        var ac = i +1;
                        $.get("/getImage", "id="+scratch_value  ,function(data2) {
                            $("#gabo-image-"+ac).attr("src", data2['image']);
                        });

                        var t1 = setTimeout(function(){

                            if(data['ananas'] == 1){

                            }else{
                                $('#scratch-can-'+ac).fadeOut(100);
                            }

                            $(window.game['blocker']).fadeIn(0);


                            if (data['win'] > 0) {
                                $(window.game['layout_game_win']).fadeIn(0);
                                var img = document.createElement("img");
                                img.src = data['image'];
                                img.className = 'animated bounceIn';
                                $("#game-win-amount").html(img);
                                $("#game-win-namer").html(data['winname']);

                                if (data['demo'] == 0) {
                                    var b = UpdateBalance(data['amount']);
                                    if (b < window.config['game_min_bet']) { gameDemoON(); }
                                }

                                window.config['game_process_state'] = 0;
                            }else{
                                if(data['ananas'] == 1){

                                }else{
                                    showCards(data);
                                }
                            }

                            var t2 = setTimeout(function(){
                                $('.scratch-can').fadeOut(100);
                            }, 1000);//1000

                        }, 500);
                    }

                });

            }
            else {
                smoke.alert(data['message']);
            }

        });

    }
    else {
        if (window.user === undefined) {
            var game_data3 = "&user="+login+"&card="+id;

        }else{
            var game_data3 = "&user="+window.user+"&card="+id;
        }
        $.post("/checkCard", game_data3 ,function(data) {
            data = JSON.parse(data);
            window.config['game_process_step'] = window.config['game_process_step'] + 1;
            if (data['status'] == 1) {

                if (data['win'] > 0) {
                    clearSoundEffects();
                    playSoundEffect('win');
                    var socket = io.connect(':2020', {rememberTransport: false});
                    socket.emit('update');
                }

                var loop = 0;
                $.each(data['matrix'], function(i) {
                    scratch_value = data['matrix'][i]['steps'];
                    if (scratch_value != '*') {
                        var a = i + 1;
                        $.get("/getImage", "id="+scratch_value  ,function(data2) {
                            $("#gabo-image-"+a).attr("src", data2['image']);
                        });
                        if (data['step'] == 3) {

                            var t5 = setTimeout(function(){
                                if(data['ananas'] == 1){

                                }else{
                                    $('#scratch-can-'+ a).fadeOut(100);
                                }
                                $(window.game['blocker']).fadeIn(0);

                                if(data['win'] == -1){
                                    $('#sell2').html('Продать гарант за ' + data['win2'] + ' Р');
                                }
                                if (data['win'] > 0) {
                                    if (window.config['game_process_state'] == 1) {

                                        $(window.game['layout_game_win']).fadeIn(0);
                                        var img = document.createElement("img");
                                        img.src = data['image'];
                                        img.className = 'animated bounceIn';
                                        $("#game-win-amount").html(img);
                                        $("#game-win-namer").html(data['winname']);
                                        $('#sell').html('Продать за ' + data['win'] + ' Р');

                                        if (data['demo'] == 0) {
                                            var b = UpdateBalance(data['amount']);
                                            if (b < window.config['game_min_bet']) { gameDemoON(); }
                                        }

                                        window.config['game_process_state'] = 0;

                                    }
                                }
                                else {
                                    if(data['win'] == -1){
                                        clearSoundEffects();
                                        playSoundEffect('lose');
                                        //showCards(data);
                                        UpdateBalance(data['amount']);
                                        var img = document.createElement("img");
                                        img.src = data['garantimage'];
                                       img.className = 'animated bounceIn';
                                        $("#win-gua-amount").html(img);
                                        $(window.game['layout_game_lose']).fadeIn(200);
                                    }else{
                                        if (loop < 1) {

                                            playSoundEffect('choose');

                                            var t = setTimeout(function(){
                                                $('#win-more-amount').text(data['garant']);
                                                $(window.game['layout_game_end']).fadeIn(300);
                                            }, 1000);

                                            loop++;
                                        }
                                    }
                                }

                            }, 0); //500


                        }
                    }

                });

            }
            else {
                smoke.alert(data['message']);
                $(window.game['blocker']).fadeIn(0);
            }

        });

    }

}

function gameGrabGuaranteedPrize() {

    $(window.game['blocker']).fadeIn(0);
    $(window.game['loader']).fadeIn(0);
    $(window.game['layout_game_end']).fadeIn(0);

    if (window.user === undefined) {
        var game_data4 = "&user="+login;

    }else{
        var game_data4 = "&user="+window.user;
    }
    $.post("/getGarant", game_data4  ,function(data) {
        data = JSON.parse(data);
        var socket = io.connect(':2020', {rememberTransport: false});
        socket.emit('update');
        if(data['status'] == 0){
            smoke.alert(data['error']);
        }else{
            if(data['demo'] == 0){
                UpdateBalance(data['amount']);
            }else{
                gameDemoON();
            }
        }

        clearSoundEffects();
        playSoundEffect('win');

        gameNewTable();
    });
}


function gameAdditionalCard() {
    if (window.user === undefined) {
        var game_data5 = "&user="+login;

    }else{
        var game_data5 = "&user="+window.user;
    }
    $.post("/getCard", game_data5  ,function(data) {
        data = JSON.parse(data);
        if(data['status'] == 0){
            smoke.alert(window.config['err_0']);
        }else{
            if(data['demo'] == 0){
                playSoundEffect('click');

                $(window.game['blocker']).fadeOut(0);
                $(window.game['loader']).fadeOut(0);
                $(window.game['layout_game_end']).fadeOut(0);

                window.config['game_process_step_4'] = 1;
                UpdateBalance(data['amount']);
            }else{
                playSoundEffect('click');

                $(window.game['blocker']).fadeOut(0);
                $(window.game['loader']).fadeOut(0);
                $(window.game['layout_game_end']).fadeOut(0);
				UpdateBalance(data['amount']);
                window.config['game_process_step_4'] = 1;
            }
        }

    });

}


function gameDemoON() {
    window.config['game_process_demo'] = 1;
    $(".demo-label").fadeIn(100);
    smoke.alert(window.config['err_5']);
    $("#pbtn").text(window.config['pbtn_2']);
}
function gameDemoOFF() {
    window.config['game_process_demo'] = 0;
    $(".demo-label").fadeOut(100);
    $("#pbtn").text(window.config['pbtn_1']);
}



function clearSoundEffects() {

    if (window.config['sounds'] == 1) {
        $.each(window.sound_effects, function(i) {
            if (i != 'bg') {
                window.sound_effects[i].stop();
            }
        });
    }
}

function clearBackgroundMusic() {

    window.sound_effects['bg'].stop();

}

function playBackgroundMusic() {
    if (window.config['sounds'] == 1) {

        window.sound_effects['bg'] = new Pizzicato.Sound('/assets/audio/bg.mp3', function() {
            window.sound_effects['bg'].volume = 0.05;
            window.sound_effects['bg'].loop = true;
            window.sound_effects['bg'].play();
        });



    }
}

function playSoundEffect(effect) {
    if (window.config['sounds'] == 1) {

        window.sound_effects[effect] = new Pizzicato.Sound('/assets/audio/'+effect+'.mp3', function() {
            window.sound_effects[effect].play();
            window.sound_effects[effect].volume = 1;
        });

    }
}



// function SocialFollow() {
//
// 	$(".social-follow").animate({
// 		top: "40%"
// 	}, 500, function() {
//
// 	    $( ".social-follow" ).animate({
// 			top: "50%"
// 		}, 500, function() {
//
// 		});
// 	});
// }


function getVkBonus(elm, loader) {

    $(loader).fadeIn(0);

    $.post("/?page_load=ajax&url=/ajax/vk-subscr.ajax", "" ,function(data) {
        data = JSON.parse(data);

        if (data['status'] == 1) {
            $(elm).fadeOut(0);
            UpdateBalance(data['amount']);
            smoke.alert(data['message']);
        }
        else {
            smoke.alert(data['error']);
        }
        $(loader).fadeOut(0);

    });

}



function guaranteedBox() {

    var screenWidth = $(window).width();

    if (screenWidth <= 1024) {
        if ($(".guaranteed-box").hasClass('active')) {
            $(".guaranteed-box").removeClass('active');
        }
        else {
            $(".guaranteed-box").addClass('active');
        }
    }
}



/* ------------------------------------
 DOCUMENT READY
 ------------------------------------ */
$(document).ready(function(){

    window.sound_effects = {};

    var screenWidth = $(window).width();

    /*
     if (screenWidth <= 1024) {
     $(".canvas").prop("width", '126');
     $(".canvas").prop("height", '93');
     }
     */
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    if(login == 0){
        window.user = getRndInteger(1234588,123456789);
    }else{

    }
    /* Init on game page */
    if ($('#game-table').length > 0) {

        /* Game amount calculation at page start */
        gameChangeBet(true);

        /* Draw scratch cards */
        scratchCards();


        /* Continue started game */
        gameMatrixAtStart = window.config['game_process_matrix'];

        $.each(gameMatrixAtStart, function(i) {

            scratch_value = gameMatrixAtStart[i];
            if (scratch_value != '*') {
                var a = i + 1;
                $.get("/getImage", "id="+scratch_value  ,function(data2) {
                    $("#gabo-image-"+a).attr("src", data2['image']);
                });
                $('#scratch-can-'+a).fadeOut(0);
                $('#scratch-cn-'+a+' .winner-box').addClass('opened');
            }
        });

        /* Game end layout */
        if (window.config['game_process_step'] == 3) {
            $(window.game['layout_game_end']).fadeIn(0);
        }

    }



    var socket = io.connect(':2020', {rememberTransport: false});



    socket.on('last games', function (data_last_games) {
        var live_list = '';
        var data_last_game = '';
        var live_color = 1;
        $.each(data_last_games, function(i) {

            data_last_game = data_last_games[i];

            if (data_last_game['profit'] < 50) {
                live_color = 1;
            }
            else if (data_last_game['profit'] >= 50 && data_last_game['profit'] < 100) {
                live_color = 2;
            }
            else if (data_last_game['profit'] >= 100 && data_last_game['profit'] < 300) {
                live_color = 3;
            }
            else if (data_last_game['profit'] >= 300) {
                live_color = 4;
            }
            if (data_last_game['photo'] !== undefined) {
                live_list += '<a href="https://vk.com/'+data_last_game['vk']+'" rel="nofollow" target="_blank" class="item i'+live_color+' easf">'+
                    '<span class="amount easf">'+data_last_game['profit']+'</span>'+
                    '<img src="'+data_last_game['photo']+'" alt="Посмотреть профиль" class="easf">'+
                    '</a>';
            }

        });

        $("#live-area").html(live_list);
    });






    /* Tabs: users */


    $("#auth-btn-vk").click(function(){
        window.location.href = "/login";
    });

    if ($("#tabs-account-nav").length > 0) {
        $("#tabs-account-nav li").click(function(){
            var activate = $(this).data('tab');

            $("#tabs-account-nav li").removeClass("active");
            $(this).addClass("active");

            $("#tabs-account .tab").fadeOut(0);
            $("#tabs-account .tab-"+activate).fadeIn(500);
        });
    }


    /* Statistic page */
    if ($(".statistic-page").length > 0 && chart_1 !== undefined) {

        var options = {
            height: '500px',
            axisY: {
                labelInterpolationFnc: function(value) {
                    if (value > 1000000) {
                        value = Math.round(value/1000000) + 'M'
                    }
                    else if (value > 1000) {
                        value = Math.round(value/1000) + 'K'
                    }
                    return value;
                }
            }
        };

        var responsiveOptions = [
            ['screen and (min-width: 641px) and (max-width: 1024px)', {
                showPoint: false,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value;
                    }
                }
            }],
            ['screen and (max-width: 640px)', {
                showLine: false,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value;
                    }
                }
            }]
        ];

        new Chartist.Line('#total-bets', chart_1, options, responsiveOptions);
        new Chartist.Line('#win-bets', chart_2, options, responsiveOptions);

    }



});