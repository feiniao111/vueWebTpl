import {
  t
} from '../locale/index';
import backManage from '../../../primary/api/backmanage/backmanage';

/**
 * 策略
 */
let strategies = {
  MAX_FILE_NAME_LEN: 16,
  // 是否包含特殊字符校验
  containSpecial: s => {
    let containSpecial = new RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
    return (containSpecial.test(s));
  },

  // 新的密码验证规则
  checkZh2: str => {
    let reg = /^[A-Za-z0-9]*$/;
    return (!reg.test(str));
  },

  validateEmail: email => {
    //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //var re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var re = /^[a-zA-Z0-9_-]+[\.a-zA-Z0-9_-]*@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    return re.test(email);
  },

  validatePhone: (phone) => {
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      return false;
    }
    return true;
  },
  validateTel: (tel) => {
    if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)) {
      return false;
    }
    return true;
  },

  isHomeworkNameValid: name => {
    let invalid_characters = strategies.invalid_characters;
    for (var i = 0; i < invalid_characters.length; i++) {
      if (name.indexOf(invalid_characters[i]) !== -1) {
        return false;
      }
    }
    return true;
  },

  numReg: new RegExp("^(0|[1-9][0-9]*)$"),

  reg: /^[A-Za-z0-9_\u4e00-\u9fa5]{1,32}$/,

  // 键盘上的特殊字符  [~!@#$%^&*()_+{}:"|<>?`\-=[\];'\,./！￥…（）【】、。？，]
  keyboardReg: /^[A-Za-z0-9_\u4e00-\u9fa5 ~!@#$%^&*()_+{}:"|<>?`\-=[\];；'\,./！￥…（）【】、。？，]{1,32}$/,

  keyboardReg16: /^[A-Za-z0-9_\u4e00-\u9fa5 ~!@#$%^&*()_+{}:"|<>?`\-=[\];；'\,./！￥…（）【】、。？，]{1,16}$/,

  invalid_characters: ['\\', '/', '<', '>', ':', '"', '|', '?', '*', '..'],

  isKeyBoardValidChar(codePoint) { // 是否是键盘上的字符，是返回true，否则为false (from安卓)
    if ([0x263A, 0x231A, 0x26EA, 0x26F2, 0x2693].includes(codePoint)) {
      return false;
    }
    return [0x0, 0x9, 0xA, 0xD].includes(codePoint) || (codePoint >= 0x20 && codePoint <= 0xD7FF) || (codePoint >= 0xE000 && codePoint <= 0xFFFD);
  },

  isKeyboardValid(str, len = 32) {
    if (str == '') {
      return true;
    }
    if (str.trim() == '') {
      return true;
    }

    if (len == 32) {
      return this.keyboardReg.test(str);
    } else if (len == 16) {
      return this.keyboardReg16.test(str);
    }
    return true;
  },

  trim: (str) => { // 删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, '');
  },

  // 将HTML转义为实体
  escape: function(str) {
    var elem = document.createElement('div');
    var txt = document.createTextNode(str);
    elem.appendChild(txt);
    return elem.innerHTML;
  }
};

/**
 * 校验函数
 */
let validator = {
  __vm: undefined,
  /** 设置vue实例, 需要时调用 */
  setVm: inst => {
    validator.__vm = inst;
  },
  /** 调整样式使用，防止警示语因太长被遮挡 */
  handleStyle: (prop, flag = false) => {
    if (validator.__vm && validator.__vm.handleStyle) {
      validator.__vm.handleStyle(prop, flag);
    }
  },

  validateInteger: (rule, value, callback) => {
    if (strategies.numReg.test(value)) {
      callback();
    } else {
      callback(new Error(t('comp.InputFrame.integer')));
    }
  },

  validateEmail: (rule, value, callback) => {
    if (value == '') {
      return callback(t('comp.ElForm.mailNotEmpty'));
    } else {
      if (!strategies.validateEmail(value)) {
        return callback(t('comp.ElForm.invalidMail'));
      } else if (value.length > 32) {
        return callback(t('comp.ElForm.invalidMailLen'));
      } else {
        return callback();
      }
    }
  },

  validatePhone: (rule, value, callback) => {
    if (value == '') {
      return callback(t('comp.ElForm.contactNotEmpty'));
    } else {
      if (
        !strategies.validatePhone(value) &&
        !strategies.validateTel(value)
      ) {
        return callback(t('comp.ElForm.contactFormat'));
      } else {
        return callback();
      }
    }
  }
};

export {
  strategies,
  validator
};
