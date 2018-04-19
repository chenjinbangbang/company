// pages/articles/articles.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      // {
      //   id: 1,
      //   img: '/images/articleImg1.png',
      //   title: '广州越秀区，新市，公寓式办公，1000方',
      //   price: '￥33.5/m²/月'
      // },
      // {
      //   id: 2,
      //   img: '/images/articleImg2.png',
      //   title: '广州白云区，新市，公寓式办公，1000方',
      //   price: '￥20/m²/月'
      // },
      // {
      //   id: 3,
      //   img: '/images/articleImg1.png',
      //   title: '广州越秀区，新市，公寓式办公，1000方',
      //   price: '￥33.5/m²/月'
      // },
      // {
      //   id: 4,
      //   img: '/images/articleImg2.png',
      //   title: '广州白云区，新市，公寓式办公，1000方',
      //   price: '￥20/m²/月'
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    if (options.id){
      this.getLists(options.id);
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
  //根据分类编号id，对应文章的分类编号uid来获取文章列表
  getLists(id){
    //console.log(id);
    let self = this; 
    wx.request({
      url: `http://localhost:3001/api/article/articleList?uid=${id}`,
      method: 'get',
      success(res){
        res = res.data;
        if(res.error_code === 0){

          let list = res.data.results;
          list.forEach(item => {
            item.images = item.images.split(',');
          });

          self.setData({
            lists: list
          });
          //console.log(self.data.lists);
        }
        
      }
    });
  },

  //跳转到文章详情页
  details(e){
    //console.log(e);
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/details/details?id='+id,
    })
  }
})