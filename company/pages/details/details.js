// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {
      imgUrls: ['/images/articleImg1.png', '/images/articleImg2.png', '/images/articleImg1.png', '/images/articleImg2.png'],
      price: '￥103.50/方',
      price_original: '￥127.9/方',
      title: '广州越秀区，新市，公寓式办公，1000方',
      content: '地理位置：广州越秀区\n物业费用：28元/月',
    },
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  phoneCall(e){
    wx.makePhoneCall({
      phoneNumber: '13570648982'
    });
  }
})