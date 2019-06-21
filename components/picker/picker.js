var address = require('./address.js').address;
let addressDefault = [];
addressDefault[0] = address[0];
addressDefault[1] = address[1][0];
addressDefault[2] = address[2][0][0];

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },   
  behaviors: [],
  properties:{
    'title': {
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '温馨提示', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) { // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：

      }
    },
    disabled:{
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) { // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：

      }
    },
    'datas':{
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: [], // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) { // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：

      }
    },
    'item': {
      type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: {}, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) { // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：

      }
    },
    'index':{
      type: null, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 0, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) { // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：

      }
    },
    //单个选择
    'mode': {
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 'selector', //  selector, multiSelector
      observer: function (newVal, oldVal) { // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：

      }
    },
    //关联选择
    'key':{
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', //  selector, multiSelector
      observer: function (newVal, oldVal) { // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：

      }
    },

    'start': {
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', //  selector, multiSelector
      observer: function (newVal, oldVal) { // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：

      }
    },
    'end': {
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', //  selector, multiSelector
      observer: function (newVal, oldVal) { // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：
 
      }
    }
  },
  data:{
    index: 0,
    array: [],  //单选模式
    result:null,
    columnResult:[],
    //多选
    multiIndex:{
      column:0,
      value:0
    }, 
    startTime:'',
    endTime:'',
    multiAddress:[0,0,0],
    address: address,
    addressDefault: addressDefault,
  },
  methods:{
    _onChange:function(e){
      let _this = this,
          _mode = this.properties.mode,
          _datas = this.properties.datas,
          _array = _this.data.array,
          _result = _this.data.result,
          _columnResult = _this.data.columnResult;
      if ( _mode == 'selector' ){
        _result = _datas[e.detail.value];
        _this.setData({
          index: e.detail.value
        });
      } else if ( _mode == 'multiSelector' ){
        
      } else if (_mode == 'region' ){
        _result.result = e.detail.value;
      } else if (_mode == 'city') {
        _result = _result;
      }else{
        _result = e.detail.value
      }

      this.triggerEvent('onChange', _result);
    },
    //关联选择触发的col列事件
    _onColumnChange:function(e){
      let _this = this,
          _mode = this.properties.mode,
          _datas = this.properties.datas,
          _array = _this.data.array,
          result = null,
          _columnResult = _this.data.columnResult; 
      if (_mode == 'multiSelector'){ 
        _this.setData({
          _result: result
        });
      } else if (_mode == 'city'){
          var data = {
            address: this.data.address,
            addressDefault: this.data.addressDefault,
            multiAddress: this.data.multiAddress,
            result: []
          };
          //设置当前操作制
          data.multiAddress[e.detail.column] = e.detail.value;
          switch (e.detail.column) {
            case 0:
              if (data.address[1][e.detail.value]) {
                 data.addressDefault[1] = data.address[1][e.detail.value];
              }
              if (data.address[2][e.detail.value] && data.address[2][e.detail.value].length != 0 && data.address[2][e.detail.value][0]) {
                 data.addressDefault[2] = data.address[2][e.detail.value][0];
              }
              data.multiAddress[1] = 0;
              data.multiAddress[2] = 0;
              break;
            case 1:
              if (data.address[2] && data.address[2].length != 0 && data.address[2][data.multiAddress[0]] && data.address[2][data.multiAddress[0]][e.detail.value]) {
                 data.addressDefault[2] = data.address[2][data.multiAddress[0]][e.detail.value];
              } else {
                   
              }
              data.multiAddress[2] = 0;
              break;
            case 2:
              break;
            default:
          } 
          
          data.result[0] = data.addressDefault[0][data.multiAddress[0]];
          data.result[1] = data.addressDefault[1][data.multiAddress[1]];
          data.result[2] = data.addressDefault[2][data.multiAddress[2]];
          result = data.result;
          this.setData(data);
      }
      
      this.triggerEvent('onColumnChange', result);
    }
    
  },
  

  created:function(){
     
  },
  attached:function(){
     //可以在这里发起网络请求
  },
  ready:function(){
    let _this = this, 
      _mode = _this.properties.mode,
      _datas = _this.properties.datas,
      _array = _this.data.array,
      _index = _this.data.index,
      _item = _this.properties.item,
      _key = _this.properties.key;
    
    if (_mode == 'selector') {
      
      if (_key != ''){
        this.properties.datas.forEach((item, index) => {
          if ((item[_key] && _item[_key] && item[_key] == _item[_key]) || (item.id && _item.id && item.id == _item.id)) {
            _index = index;
          }
          _array.push(item[_key]);
        });
        
      }else{
        this.properties.datas.forEach((item, index) => {
          if (_item == item) {
            _index = index;
          }
          _array.push(item);
        });
      }
       
      _this.setData({
        array: _array,
        index: _index
      });  
         
      
    } else if (_mode == 'multiSelector') {
      
      
    } else if (_mode == 'date') {
      let _start = _this.properties.start || '',
          _end = _this.properties.end || '';
      if (_start == ''){
          _start = (function () {
            var nows = new Date(new Date().getTime());
            var y = nows.getFullYear(),
              h = (nows.getMonth() + 1),
              d = nows.getDate();
            if (h < 10) {
              h = '0' + h
            }
            if (d < 10) {
              d = '0' + d
            }
            return y + '-' + h + '-' + d
         })();
      }
      if (_end == ''){
         _end = (function () {
          var nows = new Date(new Date().getTime());
          var y = nows.getFullYear(),
            h = (nows.getMonth() + 1),
            d = nows.getDate();
          if (h < 10) {
            h = '0' + h
          }
          if (d < 10) {
            d = '0' + d
          }
          return y + '-' + h + '-' + d
        })();
      }
      if (_start != '' && _end != ''){
          _this.setData({
            startTime: _start,
            endTime: _end,
          })
      }

    } else if (_mode == 'region'){

       
    } else if (_mode == 'city'){
      if (address.length != _item.length) {
        throw new Error('数组长度不一致');
        return;
      } else {
        let multiAddress = [0, 0, 0],
          addressResult = [],
          province = 0,
          city = 0,
          area = 0;
        if (addressDefault[0].length != 0) {
          addressDefault[0].forEach((item, index) => {
            if (item.value == _item[0].value) {
              province = index;
            }
          });
        }
        if (address[1][province] && address[1][province].length != 0) {
          address[1][province].forEach((item, index) => {
            if (_item[1] && _item[1].value && item.value == _item[1].value) {
              city = index;
            }
          });
        }
        if (address[2][province][city] && address[2][province][city] != 0) {
          address[2][province][city].forEach((item, index) => {
            if (_item[2] && _item[2].value && item.value == _item[2].value) {
              area = index;
            }
          });
        }
        multiAddress[0] = province;
        multiAddress[1] = city;
        multiAddress[2] = area;
        addressResult[0] = address[0];
        addressResult[1] = address[1][province];
        addressResult[2] = address[2][province][city];
        this.setData({
          multiAddress: multiAddress,
          addressDefault: addressResult
        });
      }
    }

     
   
  },
  moved:function(){

  },
  detached:function(){

  },
  relations:{},
  //  外部样式类
  externalClasses: ['cell-class','left-class','right-class'],
  //一些组件选项
  //options:{}
})