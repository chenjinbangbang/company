// pages/details/details.js

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: '', //ip地址
    server: '', //服务地址

    id: null, //文章id
    details: {
      // imgUrls: ['/images/articleImg1.png', '/images/articleImg2.png', '/images/articleImg1.png', '/images/articleImg2.png'],
      // price: '￥103.50/方',
      // price_original: '￥127.9/方',
      // title: '广州越秀区，新市，公寓式办公，1000方',
      // content: '地理位置：广州越秀区\n物业费用：28元/月',
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      host: app.globalData.host, //设置ip地址
      server: app.globalData.server,  //设置服务地址
    });

    console.log(options.id);
    if (options.id) {
      this.setData({
        id: options.id
      });
      this.getDetails();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //联系我们，拨打电话
  phoneCall(e) {
    console.log(e);
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    });
  },
  //根据文章id，获取文章详情
  getDetails() {
    let self = this;
    let data = {id: this.data.id};
    wx.request({
      url: `${self.data.server}/api/article/getInfo`,
      data,
      method: 'get',
      success(res) {
        res = res.data;
        if (res.error_code === 0) {

          let detail = res.data;
          detail.images = detail.images.split(',');

          self.setData({
            details: detail
          });
          console.log(self.data.details);

          //wxParse-富文本解析组件
          let WxParse = require('../../wxParse/wxParse.js');
          let article = self.data.details.content;
          WxParse.wxParse('article', 'html', article, self, 5);

          wx.stopPullDownRefresh();
        }
      }
    });
  },

  //下拉刷新，重新加载
  onPullDownRefresh() {
    //console.log('下拉刷新');
    this.getDetails();
  },

})