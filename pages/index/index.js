var app = getApp()

// userInfo: 用户信息
// tabs: tab标题
// activeIndex: 页面下标
// sliderOffset: !!!不要动!!!
// sliderLeft: !!!不要动!!!
// welcomeText: 欢迎text

Page({
  data: {
    userInfo: {},
    tabs: ["主页", "设置"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    welcomeText: '',
    days: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"],
  },

  onLoad: function () {

    // 初始化
    setUserInfo(this)
    openNav(this)
    openWelcomeText(this)

  },

  // 导航栏切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
})

// 必应图片URL并本地同步到'BingPhotoURL',
// 参数是图片天数
// 来源：https://github.com/xCss/bing
function syncBingPhotoURLSync(number) {
  wx.request({
    url: 'https://bing.ioliu.cn/v1',
    // 参数名	类型	是否必要	备注
    // d	Int	否	自今日起第d天前的数据
    // w	Int	否	图片宽度
    // h	Int	否	图片高度
    // p	Int	否	Page 页码:第x页
    // size	Int	否	Size 条数:每页条数
    // callback	String	否	JSONP的回调函数名
    data: { d: number },
    success: function (res) {
      let tmpUrl = res.data.data.url
      let tmpText = res.data.data.description
      wx.setStorageSync('BingPhotoURL', tmpUrl)
      wx.setStorageSync('BingPhotoText', tmpText)
    }
  })
}

// 同步今周是第几周到本地
function syncWeek() {
  let d = new Date(2017, 2, 20)
  let td = new Date()
  let d2 = new Date(td.getFullYear(), td.getMonth() + 1, td.getDate())
  let w = ((d2 - d) / (1000 * 60 * 60 * 24));
  wx.setStorageSync('week', (w - (w % 7)) / 7)
}

//打开图片,点右上角可下载
function previewImage(imageUrl) {
  wx.previewImage({
    urls: [
      'imageUrl'
    ]
  })
}

// 获取用户信息
function setUserInfo(that) {
  app.getUserInfo(function (userInfo) {
    that.setData({
      userInfo: userInfo
    })
  })
}

// 导航栏初始化
function openNav(that) {
  let sliderWidth = 96;
  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
        sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
      });
    }
  })
}

// 初始化welcometext
function openWelcomeText(that) {
  let h = new Date().getHours()
  that.setData({
    welcomeText: ((h < 3) ? '赶紧睡吧' : ((h < 12) ? '早上好' : ((h < 19) ? '下午好' : '晚上好')))
  })
}
