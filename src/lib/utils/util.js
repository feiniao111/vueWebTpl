import {t} from '../locale/index';
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
export function jumpToLogin() {
  if (location.href.indexOf("8080") >= 0) {
    // 开发环境
    if (window.CUR_ENV_TYPE == "primary") {
      location.href = "/login.html";
    } else {
      location.href = "/login_u.html";
    }
  } else {
    // 生产环境
    if (window.CUR_ENV_TYPE == "primary") {
      location.href = "/webapp/login.html";
    } else {
      location.href = "/webapp/login_u.html";
    }
  }
};
// 班级排序（针对小学到高中）
let numContrast = {
  // 数字对照表
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
  高一: 10,
  高二: 11,
  高三: 12
};
// 将数组转换成可比较的
function tranformArray(oldList) {
  let myStuClass = oldList.stuClass;
  // 获取第一个字符
  let grade = myStuClass.charAt(0);
  // 是高中，则截取前两个字符串
  if (grade == "高") {
    grade = myStuClass.substring(0, 2);
  }
  // 截取班级数字
  let stuClass = myStuClass.substring(
    myStuClass.indexOf("级") + 1,
    myStuClass.indexOf("班")
  );
  // num1匹配年级字段，num2匹配班级字段
  let num1, num2;
  // num1对照数字乘100
  num1 = numContrast[grade] * 100;
  // 班级数大于等于十
  if (stuClass.indexOf("十") != -1) {
    // 大于十
    if (stuClass.length > 1) {
      let tmp = stuClass.split("十");
      // 十一到十九
      if (tmp[0] == "" && tmp[1] != "") {
        num2 = 10 + numContrast[tmp[1]];
      } else if (tmp[0] != "" && tmp[1] == "") {
        // 整十类型，二十、三十...
        num2 = numContrast[tmp[0]] * 10;
      } else {
        // 二十一、二十二、二十三...
        num2 = numContrast[tmp[0]] * 10 + numContrast[tmp[1]];
      }
    } else {
      // 等于十
      num2 = 10;
    }
  } else {
    // 班级数小于十
    num2 = numContrast[stuClass];
  }
  return {
    id: num1 + num2,
    gid: oldList.gid,
    stuClass: myStuClass
  };
};
// 排序
function sortStudent(oldArray, newArray) {
  let myvm = this;
  for (let i = 0; i < oldArray.length; i++) {
    newArray.push(tranformArray(oldArray[i]));
  }
  newArray.sort(function (a, b) {
    return a.id - b.id;
  });
};
export function sortArray(array, flag) { // array是班级数组，flag 0为只排非其他类，1所有都排
  let oldArray = array;
  let flag1 = flag == 0 || flag == 1 ? flag : 0; // 默认只排非其他类
  let [newArray, midArray1, midArray2, midArray3, midArray4] = [
    [],
    [],
    [],
    [],
    []
  ];
  let [f1, f2, f3, f4] = [false, false, false, false];
  for (let i = 0; i < oldArray.length; i++) {
    let tmp = {};
    if (oldArray[i].section == "1") { // 小学
      f1 = true;
      tmp.gid = oldArray[i].gid;
      tmp.stuClass = oldArray[i].parent_info.name + oldArray[i].name;
      midArray1.push(tmp);
    } else if (oldArray[i].section == "2") { // 初中
      f2 = true;
      tmp.gid = oldArray[i].gid;
      tmp.stuClass = oldArray[i].parent_info.name + oldArray[i].name;
      midArray2.push(tmp);
    } else if (oldArray[i].section == "3") { // 高中
      f3 = true;
      tmp.gid = oldArray[i].gid;
      tmp.stuClass = oldArray[i].parent_info.name + oldArray[i].name;
      midArray3.push(tmp);
    } else { // 其他
      f4 = true;
      tmp.gid = oldArray[i].gid;
      tmp.stuClass = oldArray[i].parent_info.name + oldArray[i].name;
      midArray4.push(tmp);
    }
  }
  if (f1) {
    let priSchool = {};
    // priSchool.label = "小学";
    // console.log(11, t, t('comp.GradeArray.primary'), 22);
    priSchool.label = t('comp.GradeArray.primary'); /* 小学*/
    let newArray1 = [];
    sortStudent(midArray1, newArray1);
    priSchool.options = newArray1;
    newArray.push(priSchool);
  }
  if (f2) {
    let midSchool = {};
    midSchool.label = t('comp.GradeArray.juniorHigh'); /* 初中*/
    let newArray2 = [];
    sortStudent(midArray2, newArray2);
    midSchool.options = newArray2;
    newArray.push(midSchool);
  }
  if (f3) {
    let senSchool = {};
    senSchool.label = t('comp.GradeArray.seniorHighSchool'); /* 高中*/
    let newArray3 = [];
    sortStudent(midArray3, newArray3);
    senSchool.options = newArray3;
    newArray.push(senSchool);
  }
  if (f4 && flag1 == 1) {
    let highSchool = {};
    highSchool.label = t('comp.GradeArray.other'); // "其他";
    highSchool.options = midArray4.sort();
    newArray.push(highSchool);
  }
  return newArray;
}

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