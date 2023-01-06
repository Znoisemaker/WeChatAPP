// components/calendar/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultValue:{
      type: String,
      value:''
    },
    weekText : {
      type: Array,
      value: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    },
    lastMonth:{
      type: String,
      value: '上个月'
    },
    nextMonth:{
      type: String,
      value:'下个月'
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    //当月格子
    thisMonthDays: [],
    //上月格子
    empytGridsBefore: [],
    //下月格子
    empytGridsAfter: [],
    title:'',
    select:'',
    year:0,
    month:0,
    date:0,

    YEAR: 0,
    MONTH:0,
    DATE:0,
  },

  lifetimes:{
    ready: function () {
      this.today()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //上个月
    lastMonth: function () {
      let month = this.data.month == 1 ? 12 : this.data.month - 1;
      let year = this.data.month == 1 ? this.data.year - 1 : this.data.year;
      //初始化日历组件UI
      this._display(year, month, 0);
    },

    //下个月
    nextMonth: function () {
      let month = this.data.month == 12 ? 1 : this.data.month + 1;
      let year = this.data.month == 12 ? this.data.year + 1 : this.data.year;
      //初始化日历组件UI
      this._display(year, month, 0);
    },

    //默认选中当天 并初始化组件
    today: function () {
      let date_today = this.data.defaultValue ? new Date(this.data.defaultValue) : new Date(),
        year = date_today.getFullYear(),
        month = date_today.getMonth() + 1,
        date = date_today.getDate(),
        select = year + '-' + this._zero(month) + '-' + this._zero(date);

      this.setData({
        select: select,
        year: year,
        month: month,
        date: date,
        YEAR: year,
        MONTH: month,
        DATE: date,
      })

      //初始化日历组件UI
      this._display(year, month, date);

      //发送事件监听
      this.triggerEvent('select', select);
    },

    //选择 并格式化数据
    select: function (e) {
      let date = e.currentTarget.dataset.date,
        select = this.data.year + '-' + this._zero(this.data.month) + '-' + this._zero(date);
      this.setData({
        title: this.data.year + '年' + this._zero(this.data.month) + '月' + this._zero(date) + '日',
        select: select,
        year: this.data.year,
        month: this.data.month,
        date: date
      });

      //发送事件监听
      this.triggerEvent('select', select);
    },

    //初始化
    _display: function (year, month, date) {
      this.setData({
        year,
        month,
        date,
        title: year + '年' + this._zero(month) + '月'
      })
      this._createDays(year, month);
      this._createEmptyGrids(year, month);
    },

    //获取当月天数
    _getThisMonthDays: function (year, month) {
      return new Date(year, month, 0).getDate();
    },

    // 绘制当月天数占的格子
    _createDays: function (year, month) {
      let thisMonthDays = [],
        days = this._getThisMonthDays(year, month);
      for (let i = 1; i <= days; i++) {
        thisMonthDays.push({
          date: i,
          dateFormat: this._zero(i),
          monthFormat: this._zero(month),
          week: this.data.weekText[new Date(Date.UTC(year, month - 1, i)).getDay()]
        });
      }
      this.setData({
        thisMonthDays
      })
    },
    
    //获取当月空出的天数
    _createEmptyGrids: function (year, month) {
      let week = new Date(Date.UTC(year, month - 1, 1)).getDay(),
        empytGridsBefore = [],
        empytGridsAfter = [],
        emptyDays = (week == 0 ? 7 : week);
      //当月天数
      var thisMonthDays = this._getThisMonthDays(year, month);

      //上月天数
      var preMonthDays = month - 1 < 0
        ? this._getThisMonthDays(year - 1, 12)
        : this._getThisMonthDays(year, month - 1);

      //空出日期
      for (let i = 1; i <= emptyDays; i++) {
        empytGridsBefore.push(preMonthDays - (emptyDays - i));
      }

      var after = (42 - thisMonthDays - emptyDays) - 7 >= 0
        ? (42 - thisMonthDays - emptyDays) - 7
        : (42 - thisMonthDays - emptyDays);
      for (let i = 1; i <= after; i++) {
        empytGridsAfter.push(i);
      }
      this.setData({
        empytGridsAfter,
        empytGridsBefore
      })
    },

    //补全0
    _zero: function (i) {
      return i >= 10 ? i : '0' + i;
    },
  }

})
