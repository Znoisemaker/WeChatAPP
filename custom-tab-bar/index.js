// custom-tab-bar/index.js
Component({
  data: {
    selected: 0,
    color: "#606060",
    selectedColor: "#FFFFFF",
    list: [{
      pagePath: "/pages/Tabars/Home/index",
      iconPath: "/pages/images/icon_tab_home.png",
      selectedIconPath: "/pages/images/icon_tab_home_select.png",
      text: "首页"
    }, {
      pagePath: "/pages/Tabars/Classify/index",
      iconPath: "/pages/images/exchange_select.png",
      selectedIconPath: "/pages/images/exchange_select.png",
      text: "兑换",
      bulge:true
    },{
      pagePath: "/pages/Tabars/Mine/index",
      iconPath: "/pages/images/Tabar_mine.png",
      selectedIconPath: "/pages/images/Tabar_mine_select.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})

