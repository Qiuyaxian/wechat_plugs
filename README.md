## 自定义小程序省市区三级联动

<h1>用法</h1>

<h3>参数说明</h3>

``` bash

{
	/* 标题 */
	"title": "String", 
	/* 是否禁用 */
	"disabled": "Boolean", 
	/* 数据 */
	"datas": "Array", 
	/* 子项数据 */
	"item": "Object",
	/* 索引 */ 
	"index": "null", 
	/* picker模式 */
	"mode": "String", 
	/* 多例滚动选择关联的key值 */
	"key": "String", 
	/* 开始时间 */
	"start": "String",
	/* 结束时间 */
	"end": "String" 
}

```

<h3>引入组件</h3>

``` bash

{
  'usingComponents': {
    'v-picker': '/components/picker/picker'
  }
}

```

<h3>wxml中使用</h3>

``` bash

<v-picker bind:onChange="bindMultiPickerChange" bind:onColumnChange="bindMultiPickerColumnChange" datas="{{ datas }}" mode="city" key="key" item="{{ multiResult }}" class="width">
    <view class="" wx:if="{{ multiResult[2] && multiResult[2].value !== '' }}">{{ multiResult[0].name }}-{{ multiResult[1].name }}-{{ multiResult[2].name }}</view>
    <view class="" wx:elif="{{ multiResult[1] && multiResult[1].value !== '' }}">{{ multiResult[0].name }}-{{ multiResult[1].name }}</view>
    <view class="" wx:elif="{{ multiResult[0] && multiResult[0].value !== '' }}">{{ multiResult[0].name }}</view>
    <view wx:else class="">请选择</view>
</v-picker> 

```

<h3>js中数据及回调函数</h3>

``` bash
Page({
  data: {
    multiResult: [
      { "name": "", "value": "" },
      { "name": "", "value": "", "parent": "" },
      { "name": "", "value": "", "parent": "" }
    ],
  },
  bindMultiPickerColumnChange: function (e) { 
  },
  bindMultiPickerChange: function (e) {
    console.log('detail =>', e.detail)
    if (e.detail) {
      this.setData({
        multiResult: e.detail
      });
    }
  },
})
```