const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
};

export function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

/**
 * 禁用浏览器的拖曳事件
 */
export function banMove() {
  return false;
};

/**
 * 禁用浏览器的Backspace按钮回退事件
 *
 * @export
 * @param {*} e
 * @returns
 */
export function banBackSpace(e) {
  var ev = e || window.event;
  // 各种浏览器下获取事件对象
  var obj = ev.relatedTarget || ev.srcElement || ev.target || ev.currentTarget;
  // 按下Backspace键
  if (ev.keyCode == 8) {
    var tagName = obj.nodeName; // 标签名称
    // 如果标签不是input或者textarea则阻止Backspace
    if (tagName != 'INPUT' && tagName != 'TEXTAREA') {
      return stopIt(ev);
    }
    var tagType = obj.type.toUpperCase(); // 标签类型
    // input标签除了下面几种类型，全部阻止Backspace
    if (tagName == 'INPUT' && (tagType != 'TEXT' && tagType != 'TEXTAREA' && tagType != 'PASSWORD')) {
      return stopIt(ev);
    }
    // input或者textarea输入框如果不可编辑则阻止Backspace
    if ((tagName == 'INPUT' || tagName == 'TEXTAREA') && (obj.readOnly == true || obj.disabled == true)) {
      return stopIt(ev);
    }
  }
}

function stopIt(ev) {
  if (ev.preventDefault) {
    // preventDefault()方法阻止元素发生默认的行为
    ev.preventDefault();
  }
  if (ev.returnValue) {
    // IE浏览器下用window.event.returnValue = false;实现阻止元素发生默认的行为
    ev.returnValue = false;
    if (window.event) {
      window.event.returnValue = false;
    }
  }
  return false;
}

/**
 * 将html片段截取指定长度，长度按渲染出的内容进行计算，比如 &lt; 渲染为 <  ,长度为1
 * @param html
 * @param limit
 * @returns {*} 截取的html片段
 */
export function htmlTruncate(html, limit) {
  if (limit <= 0) {
    return html;
  }
  if (html && html.length < limit) {
    return html;
  }
  let truncateHtml = '';
  let sum = 0;

  let node = $(html);
  for (let i = 0; i < node.length; i++) {
    if (sum >= limit) {
      break;
    }

    //去除首尾的p标签
    let bHtml = node[i].innerHTML;
    //如果html片段中除了<br>还有其他字符，则要去除<br>(这是回车后但不继续输入，ueditor自动填充的)
    // if(bHtml.indexOf('<br>') > 0){
    bHtml = bHtml.replace('<br>', '');
    // }

    //根据img标签进行分割
    let imgSplitArray = bHtml.split(/<img[^>]*>/gi);
    let imgArray = bHtml.match(/<img[^>]*>/gi);

    //遍历分割后的数组，计算其渲染文本长度，直到总长度达到limit。
    //遍历过程中，拼接html片段

    let concatHtml = '<p>';
    for (let j = 0; j < imgSplitArray.length; j++) {
      let __text = $('<p>' + imgSplitArray[j] + '</p>')[0].innerText;
      if (sum + __text.length <= limit) {
        concatHtml += imgSplitArray[j];
        sum += __text.length;

        if (imgArray && j != imgSplitArray.length - 1 && sum < limit) {
          concatHtml += imgArray[j];
          sum += 1; //图片算一个字符
        }
      } else {
        let omit = limit - sum;
        if (omit > 0) {
          let __omitText = __text.substr(0, omit);
          let __omitHtml = $('<p>' + __omitText + '</p>')[0].innerHTML;
          concatHtml += __omitHtml;
          sum += omit;
        }
        break;
      }
    }
    concatHtml += '</p>';
    truncateHtml += concatHtml;
    sum++;
  }
  return truncateHtml;
}

//传入图片路径，返回base64
export function getBase64(img) {
  function getBase64Image(img, width, height) { //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
    var canvas = document.createElement("canvas");
    canvas.width = width ? width : img.width;
    canvas.height = height ? height : img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL();
    return dataURL;
  }
  var image = new Image();
  image.crossOrigin = '';
  image.src = img;
  var deferred = $.Deferred();
  if (img) {
    image.onload = function () {
      deferred.resolve(getBase64Image(image)); //将base64传给done上传处理
    }
    return deferred.promise(); //问题要让onload完成后再return sessionStorage['imgTest']
  }
};

// 替换字符串中所有空格(包括中间空格,需要设置第2个参数为:g) 为_, 除去所有非_符号
export function Trim(str, is_global) {
  var result;
  result = str.replace(/(^\s+)|(\s+$)/g, "_");
  if (is_global.toLowerCase() == "g") {
    result = result.replace(/\s/g, "_");
  }
  result = result.replace(/!/g, '');
  return result;
}

export function debounce(fn, delay) {
  delay = delay || 160;
  let timeout;
  return function() {
    let args = arguments;
    let context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log('---防抖函数，执行---');
      fn.apply(context, args);
    }, delay);
  }
}

export function throttle(fn, threshold) {
  let timeout;
  var start = new Date;
  threshold = threshold || 160
  return function() {
    let context = this;
    let args = arguments;
    let curr = new Date() - 0;
    clearTimeout(timeout) // 总是干掉事件回调
    if (curr - start >= threshold) {
      console.log('---节流函数，执行---');
      fn.apply(context, args);
      start = curr;
    } else {
      // 让方法在脱离事件后也能执行一次
      timeout = setTimeout(function() {
        fn.apply(context, args)
      }, threshold);
    }
  }
}