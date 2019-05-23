import ElBigTable from './src/table';

/* istanbul ignore next */
ElBigTable.install = function(Vue) {
  Vue.component(ElBigTable.name, ElBigTable);
};

export default ElBigTable;
