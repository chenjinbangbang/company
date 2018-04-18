//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    lists: [
      // {
      //   id: 1,
      //   name: "办公地址租赁",
      //   icon: "/server/public/images/icon1.png",
      //   create_time: "2018-04-17T14:37:51.000Z",
      //   update_time: "2018-04-18T08:03:01.000Z"
      // },
      // {
      //   id: 2,
      //   name: "办公地址挂靠",
      //   icon: "/server/public/images/icon2.png",
      //   create_time: "2018-04-17T14:38:21.000Z",
      //   update_time: "2018-04-18T15:31:22.000Z"
      // }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getLists();

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //获取分类列表
  getLists(){
    let self = this;
    wx.request({
      url: 'http://123.207.246.238:3001/api/classify/list',
      method: 'get',
      success(res){
        res = res.data;
        if(res.error_code === 0){
          self.setData({
            lists: res.data.results
          });
          console.log(self.data.lists);
        }
        
      }
    });
  }
})
