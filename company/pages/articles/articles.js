// pages/articles/articles.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      {
        id: 1,
        img: '/images/articleImg1.png',
        title: '广州越秀区，新市，公寓式办公，1000方',
        price: '￥33.5/m²/月'
      },
      {
        id: 2,
        img: '/images/articleImg2.png',
        title: '广州白云区，新市，公寓式办公，1000方',
        price: '￥20/m²/月'
      },
      {
        id: 3,
        img: '/images/articleImg1.png',
        title: '广州越秀区，新市，公寓式办公，1000方',
        price: '￥33.5/m²/月'
      },
      {
        id: 4,
        img: '/images/articleImg2.png',
        title: '广州白云区，新市，公寓式办公，1000方',
        price: '￥20/m²/月'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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
  //跳转到文章详情页
  details(e){
    //console.log(e);
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/details/details?id'+id,
    })
  }
})