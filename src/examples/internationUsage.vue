<template>
  <section>
    <ul>
      <li>
        <a
          href="https://feiniao111.github.io/2019/02/04/vue/vue%E6%A1%86%E6%9E%B6%E4%B8%8B%E7%9A%84%E5%9B%BD%E9%99%85%E5%8C%96-md/"
          target="__blank"
        >{{$t('page.examples.internationDoc')}}</a>
      </li>
      <li>
        <button @click="handleExport">{{$t('page.examples.onekeyExportChn')}}</button>
      </li>
      <li>
        <button @click="handleExport2">{{$t('page.examples.onekeyExportBoth')}}</button>
      </li>
    </ul>
    <ul>
      <li>
        <input type="file" name="langPackage" class="langUpload" @change="handleChange">
        <button @click="hanleGen">{{$t('page.examples.genLangFile')}}</button>
      </li>
    </ul>
  </section>
</template>

<script>
import { joint, sheet2blob, downExcel, parseExcel } from "../lib/utils/util.js";
import chnJson from "../lib/locale/lang/zh-CN.js";
import enJson from "../lib/locale/lang/en.js";
import XLSX from "xlsx/dist/xlsx.core.min.js";
import en from '../lib/locale/lang/en.js';
import { saveAs } from 'file-saver';

export default {
  data() {
    return {
      file: undefined
    }
  },
  methods: {
    handleExport() {
      let FlatJson = {};
      // 将语言包扁平化
      joint(chnJson, "", FlatJson);
      let data = Object.keys(FlatJson).map(key => [key, FlatJson[key]]);
      // 插入表头
      data.unshift(["字段", "中文", "英文"]);
      let worksheet = XLSX.utils.aoa_to_sheet(data);

      let blob = sheet2blob(worksheet);

      downExcel(blob);
    },
    handleExport2() {
      let FlatJsonChn = {};
      let FlatJsonEn = {};
      // 将语言包扁平化
      joint(chnJson, "", FlatJsonChn);
      joint(enJson, "", FlatJsonEn);
      let data = Object.keys(FlatJsonChn).map(key => [
        key,
        FlatJsonChn[key],
        FlatJsonEn[key]
      ]);
      // 插入表头
      data.unshift(["字段", "中文", "英文"]);
      let worksheet = XLSX.utils.aoa_to_sheet(data);

      let blob = sheet2blob(worksheet);

      downExcel(blob, "中英文语言包.xlsx");
    },
    hanleGen() {
      if (!this.file) {
        alert(this.$t('page.examples.uploadiFirst'));
        return;
      }
      let reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        var wb = XLSX.read(data, { type: "binary" });
        console.log(wb);
        let [chJson, enJson] = parseExcel(wb.Sheets['sheet1'])
        console.log(11, chnJson, enJson, 22)

        // FileSaver.js:
        // https://github.com/eligrey/FileSaver.js
        let blob1 = new Blob([JSON.stringify(chnJson)], {type: "text/plain;charset=utf-8"});
        saveAs(blob1, "zh-cn.js");
        let blob2 = new Blob([JSON.stringify(enJson)], {type: "text/plain;charset=utf-8"});
        saveAs(blob2, "en.js");
      }
      reader.readAsBinaryString(this.file);
    },
    handleChange() {
      let inputDom = this.$el.querySelector(".langUpload");
      this.file = inputDom.files[0];
      console.log(this.file);
    }
  }
};
</script>

<style scoped lang='scss'>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  cursor: pointer;
}
</style>