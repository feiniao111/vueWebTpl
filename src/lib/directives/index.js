let direct = {
  directives: {
    elInputFocus: {
      inserted: el => {
        let inputs = el.getElementsByTagName('input')
        if (inputs) {
          inputs[0].focus()
        }
      }
    },

    focus: {
      // 指令的定义
      inserted: el => {
        el.focus()
      }
    }
  }
}

export {
  direct
}
