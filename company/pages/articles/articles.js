// pages/articles/articles.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0, //分类id
    total: 0, //总数
    page: 1, //当前页
    limit: 8, //一页有多少条数据
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
      this.setData({
        id: options.id
      });
      this.getLists();
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
  getLists(flag){ //flag如果存在，则是加载更多，否则是重新加载
    let self = this; 
    let data = { uid: this.data.id, page: this.data.page, limit: this.data.limit}
    wx.request({
      url: `http://www.mjpai.cn:3001/api/article/articleList`,
      data,
      method: 'get',
      success(res){
        res = res.data;
        if(res.error_code === 0){

          let list = res.data.results;
          self.setData({
            total: res.data.total
          });

          //console.log(list);
          list.forEach(item => {
            item.images = item.images.split(',');
          });

          //flag存在，则进行叠加
          if(flag){
            list = self.data.lists.concat(list);
          }else{
            wx.stopPullDownRefresh();
          }
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
  },

  //下拉刷新，重新加载
  onPullDownRefresh(){
    //console.log('下拉刷新');
    this.setData({
      page: 1
    });
    this.getLists();
  },

  //上拉刷新，加载更多
  onReachBottom(){
    //console.log('上拉刷新');
    this.setData({
      page: this.data.page+1
    });
    if(this.data.lists.length < this.data.total){
      this.getLists(true);
    }
  }

})