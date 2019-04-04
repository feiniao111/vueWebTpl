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

  // 账号校验(数字、字母、中文、下划线)
  checkUid: value => {
    let reg = /^[A-Za-z0-9_\u4e00-\u9fa5]{1,16}$/;
    if (reg.test(value)) {
      return false;
    }
    return true;
  },

  // 用户名校验（文本、数字、下划线，中间允许有空格）
  checkUsername: (value) => {
    value += '';
    let reg = /^[A-Za-z0-9_\u4e00-\u9fa5\s]{1,16}$/;
    if (reg.test(value) && value.trim() == value) {
      return false;
    }
    return true;
  },

  // 用户名校验（文本、数字、下划线，中间允许有空格）
  checkWeikename: (value) => {
    return !strategies.isKeyboardValid(value);
  },

  checkClassname: (value) => {
    value += '';
    let reg = /^[A-Za-z0-9_\u4e00-\u9fa5\s]{1,32}$/;
    if (reg.test(value) && value.trim() == value) {
      return false;
    }
    return true;
  },

  // 密码校验
  checkPwd: (value) => {
    value += '';
    let reg = /^[A-Za-z0-9_]{3,16}$/;
    if (reg.test(value)) {
      return true;
    }
    return false;
  },

  // 密码强度校验  1-弱  2-中 3-强
  checkPwdSeverity: (value) => {
    value += '';
    if (strategies.checkPwd(value) == false) {
      return 0;
    }
    let count = 0;
    if (/[A-Za-z]/.test(value)) {
      count++;
    }
    if (/[0-9]/.test(value)) {
      count++;
    }
    if (/[_]/.test(value)) {
      count++;
    }
    return count;
  },

  isFileNameValid: name => {
    if (name === '.') {
      throw t('page.netDisk.invalidFile1');
    }
    let invalid_characters = ['\\', '/', '<', '>', ':', '"', '|', '?', '*', '..'];
    for (var i = 0; i < invalid_characters.length; i++) {
      if (name.indexOf(invalid_characters[i]) !== -1) {
        // throw new Error(t('page.netDisk.invalidFile2'));
        throw t('page.netDisk.invalidFile2');
      }
    }
    return true;
  },

  // 新的密码验证规则
  checkZh2: str => {
    let reg = /^[A-Za-z0-9]*$/;
    return (!reg.test(str));
  },

  // validateEmailPrefix: email => {
  //   //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   //var re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  //   var re = /^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/;
  //   return re.test(email);
  // },

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
    // if (name === '.') {
    //   return false;
    // }
    // if (name.trim().length != name.length) {
    //   return false;
    // }
    // let invalid_characters = ['\\', '/', '<', '>', ':', '"', '|', '?', '*', '..'];
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
  },

  // 测试字符长度
  fucCheckLength: function(strTemp) {
    var i, sum;
    sum = 0;
    for (i = 0; i < strTemp.length; i++) {
      if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255)) {
        sum = sum + 1;
      } else {
        sum = sum + 3;
      }
    }
    return sum;
  },

  // 判断新文件名是否符合规则
  checkInput: (filename, diskFiles, type) => {
    filename = strategies.trim(filename);
    if (filename == '') {
      if (type == 'dir') {
        throw new Error(t('page.studentHomework.emptyError'));
      } else {
        throw new Error(t('page.studentWork_u.nameempty'));
      }
    }
    if (!strategies.isFileNameValid(filename)) {
      console.log('invalid file name');
    } else {
      for (let item of diskFiles || []) {
        if (item.name == filename) {
          let filename_escape = strategies.escape(filename);
          throw new Error(
            t('page.studentHomework.exist', {name: filename_escape})
          );
        }
      }
    }
    // 限制长度
    // let length = strategies.fucCheckLength(filename);
    let length = filename.length;
    if (length > strategies.MAX_FILE_NAME_LEN) {
      throw new Error(
        t('page.studentHomework.longer', {num: strategies.MAX_FILE_NAME_LEN})
      );
    }
    return true;
  },
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

  validateUid: (rule, value, callback) => {
    if (value === '' || value === undefined) {
      validator.handleStyle('uid');
      callback(new Error(t('comp.ElForm.accountNotEmpty')));
    } else {
      let warning = strategies.checkUid(value);
      if (warning) {
        validator.handleStyle('uid', true);
        callback(new Error(t('comp.ElForm.invalidInput2')));
      } else {
        callback();
      }
    }
  },

  validateUidLogin: (rule, value, callback) => {
    if (value == '') {
      return callback(new Error(t('page.Login.accEmpty')));
    } else {
      if (value.length > 64) {
        return callback(new Error(t('page.Login.Namelength')));
      } else {
        return callback();
      }
    }
  },



  // 服务端查重
  validateUidExist: (rule, value, callback) => {
    let paras = {
      method: '1-11',
      params: {
        uid: value
      }
    };

    if (validator.__vm) {
      backManage.checkUserExist(paras, ret => {
        let result = JSON.parse(ret);
        if (result.status == 'success' && result.data === true) {
          validator.handleStyle('uid');
          callback(new Error(t('comp.InputFrame.accountExist')));
        } else {
          validator.handleStyle('uid');
          callback();
        }
      });
    } else {
      callback();
    }
  },

  validateName: (rule, value, callback) => {
    if (value === '' || value === undefined) {
      validator.handleStyle('name');
      return callback(new Error(t('comp.ElForm.unameNotEmpty')));
    } else {
      let warning = strategies.checkUsername(value);
      if (warning) {
        validator.handleStyle('name', true);
        return callback(new Error(t('comp.ElForm.invalidInput')));
      }
      validator.handleStyle('name');
      return callback();
    }
  },

  validateAdName: (rule, value, callback) => {
    validator.handleStyle('AdName', false);
    if (value === '' || value === undefined) {
      callback(new Error(t('comp.ElForm.adNameNotEmpty')));
    } else {
      let warning = strategies.checkUsername(value);
      if (warning) {
        validator.handleStyle('AdName', true);
        callback(new Error(t('comp.ElForm.invalidInput')));
      }
      callback();
    }
  },

  validatePass: (rule, value, callback) => {
    if (value == '') { // 注意编辑态允许为空
      validator.handleStyle('pass');
      return callback(new Error(t('comp.ElForm.pwdNotEmpty')));
    } else if (strategies.checkPwd(value) == false) {
      validator.handleStyle('pass', true);
      return callback(t('page.Login.pwdFormat'));
    } else {
      validator.handleStyle('pass');
      return callback();
    }
  },

  validatePass2: (rule, value, callback) => {
    if (value == '') { // 注意编辑态允许为空
      validator.handleStyle('pass');
      return callback();
    } else if (strategies.checkPwd(value) == false) {
      validator.handleStyle('pass', true);
      return callback(t('page.Login.pwdFormat'));
    } else {
      validator.handleStyle('pass');
      return callback();
    }
  },

  validatePassLogin: (rule, value, callback) => {
    if (value == '' || value.trim() == '') {
      return callback(new Error(t('page.Login.pwdEmpty')));
    } else {
      if (value.length < 3 || value.length > 64) {
        return callback(new Error(t('page.Login.Pwdlength2')));
      } 
      // if (strategies.checkPwd(value) == false) {
      //   return callback(new Error(t('page.Login.Pwdlength')));
      // } 
      else {
        return callback();
      }
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
  },

  validateWarnPercent: (rule, value, callback) => {
    if (value === '') {
      callback(new Error(t('comp.InputFrame.numberInteger')));
    } else if (parseInt(value, 10) + '' != value) {
      // callback(new Error(t('page.admin_u.systemSetting.diskWarn')));
      callback(new Error(t('comp.InputFrame.numberInteger')));
    } else {
      if (value < 1 || value > 99) {
        // callback(new Error(t('page.admin_u.systemSetting.diskWarn')));
        callback(new Error(t('comp.InputFrame.numberInteger')));
      }
      callback();
    }
  },

  validateGrade: (rule, value, callback) => {
    if (value == '') {
      validator.handleStyle('grade');
      return callback(new Error(t('comp.ElForm.gradeNotEmpty')));
    } else {
      if (strategies.checkClassname(value)) {
        validator.handleStyle('grade', true);
        return callback(new Error(t('comp.ElForm.invalidInput')));
      } else {
        validator.handleStyle('grade');
        return callback();
      }
    }
  },

  validateClass: (rule, value, callback) => {
    if ((value == '')) {
      validator.handleStyle('class');
      return callback(new Error(t('comp.ElForm.classNotEmpty')));
    } else {
      if (strategies.checkClassname(value)) { 
        validator.handleStyle('class', true);
        return callback(new Error(t('comp.ElForm.invalidInput')));
      } else {
        validator.handleStyle('class');
        return callback();
      }
    }
  },

  validateCourname: (rule, value, callback) => {
    value = value + '';
    if (!value || value == 'undefined') {
      return callback(new Error(t('page.teacherWork_u.courseNameEmpty')));
    }

    if (value.trim() == '') {
      return callback(new Error(t('page.teacherWork_u.courseSpaces')));
    }

    // try {
    //   strategies.isFileNameValid(value);
    // } catch (errorMessage) {
    //   callback(new Error(t('comp.ElForm.specialFormat')));
    // }

    if (!strategies.isKeyboardValid(value)) {
      return callback(new Error(t('comp.ElForm.specialFormat')));
    }
    callback();
  },

  validateHomeworkName: (rule, value, callback) => {
    if (!value) {
      return callback(new Error(t('page.teacherWork_u.jobnameempty')));
    }

    if (value.trim() == '') {
      return callback(new Error(t('page.teacherWork_u.spaces')));
    }

    try {
      strategies.isFileNameValid(value);
    } catch (errorMessage) {
      callback(new Error(errorMessage));
    }
    callback();
  },

  validateBackupName: (rule, value, callback) => {
    if (!value) {
      return callback(new Error(t('page.teacherHomework.null')));
    }

    if (value.trim() == '') {
      return callback(new Error(t('page.teacherWork_u.spaces2')));
    }

    try {
      strategies.isFileNameValid(value);
    } catch (errorMessage) {
      callback(new Error(errorMessage));
    }
    callback();
  },
};

export {
  strategies,
  validator
};
