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
        <div class="border">
          <h1>{{$t('page.examples.excel2json')}}</h1>
          {{$t('page.examples.uploadExcelHint')}}
          <input
            type="file"
            name="excelPackage"
            @change="handleChange"
          >
          <button @click="hanleGen">{{$t('page.examples.genLangFile')}}</button>
        </div>
      </li>
      <li>
        <div class="border">
          <h1>{{$t('page.examples.json2excel')}}</h1>
          {{$t('page.examples.uploadJsonHint')}}
          <input
            type="file"
            name="chLangPackage"
            class="chJsonUpload"
            @change="handleChange2"
          >
          {{$t('page.examples.optional')}}{{$t('page.examples.uploadJsonHint2')}}
          <input
            type="file"
            name="enLangPackage"
            class="enJsonUpload"
            @change="handleChange3"
          >
          <button @click="hanleGen2">{{$t('page.examples.genExcelFile')}}</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang='scss' scoped>
.border {
  padding: 10px;
  border: 1px solid #999;
}
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

<script>
import { joint, sheet2blob, downExcel, parseExcel } from "../lib/utils/util.js";
import chnJson from "../lib/locale/lang/zh-CN.js";
import enJson from "../lib/locale/lang/en.js";
import XLSX from "xlsx/dist/xlsx.core.min.js";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      excelFile: undefined,
      chJsonFile: undefined,
      enJsonFile: undefined,
      uploadChnJson: {},
      uploadEnJson: {}
    };
  },
  methods: {
    json2excel(chnJsonObj, enJsonObj = {}, filename = '中文语言包.xlsx') {
      let FlatJsonChn = {};
      let FlatJsonEn = {};
      // 将语言包扁平化
      joint(chnJsonObj, "", FlatJsonChn);
      joint(enJsonObj, "", FlatJsonEn);
      let data = Object.keys(FlatJsonChn).map(key => [
        key,
        FlatJsonChn[key],
        FlatJsonEn[key]
      ]);
      // 插入表头
      data.unshift(["字段", "中文", "英文"]);
      let worksheet = XLSX.utils.aoa_to_sheet(data);

      let blob = sheet2blob(worksheet);

      downExcel(blob, filename);
    },
    handleExport() {
      this.json2excel(chnJson);
    },
    handleExport2() {
      this.json2excel(chnJson, enJson, '中英文语言包.xlsx');
    },
    hanleGen() {
      if (!this.excelFile) {
        alert(this.$t("page.examples.uploadiFirst"));
        return;
      }
      let reader = new FileReader();
      reader.onload = e => {
        var data = e.target.result;
        var wb = XLSX.read(data, { type: "binary" });
        console.log(wb);
        let [chJson, enJson] = parseExcel(wb.Sheets["sheet1"]);
        console.log(11, chnJson, enJson, 22);

        // FileSaver.js:
        // https://github.com/eligrey/FileSaver.js
        let blob1 = new Blob([JSON.stringify(chnJson,"","\t")], {
          type: "text/plain;charset=utf-8"
        });
        saveAs(blob1, "zh-cn.js");
        let blob2 = new Blob([JSON.stringify(enJson,"","\t")], {
          type: "text/plain;charset=utf-8"
        });
        saveAs(blob2, "en.js");
      };
      reader.readAsBinaryString(this.excelFile);
    },
    hanleGen2() {
      if (!this.chJsonFile) {
        alert(this.$t("page.examples.uploadiFirst2"));
        return;
      }

      let uploadEn = this.enJsonFile != undefined;

      let reader = new FileReader();
      reader.onload = e => {
        var data = e.target.result;
        console.log(data);
        this.uploadChnJson = JSON.parse(data);
        if (!uploadEn) {
          this.json2excel(this.uploadChnJson)
        }
      };
      reader.readAsText(this.chJsonFile);

      let reader2 = new FileReader();
      reader2.onload = e => {
        var data = e.target.result;
        console.log(data);
        this.uploadEnJson = JSON.parse(data);
        if (uploadEn) {
          this.json2excel(this.uploadChnJson, this.uploadEnJson, '中英文语言包.xlsx');
        }
      };
      uploadEn && reader2.readAsText(this.enJsonFile);
    },
    handleChange(e) {
      this.excelFile = e.target.files[0];
      console.log(this.excelFile);
    },
    handleChange2(e) {
      this.chJsonFile = e.target.files[0];
      console.log(this.chJsonFile);
    },
    handleChange3(e) {
      this.enJsonFile = e.target.files[0];
      console.log(this.enJsonFile);
    }
  }
};
</script>