Page({
  data:{
    content:'',
    title:''
  },
  onLoad:function(options){
    this.setData({
      id:options.id
    });
  },
  onReady:function(){
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url:'http://localhost/mock/detail.json',
      header: {
         'Content-Type': 'application/json'
     },
     success: function(res) {
       that.setData({
         title: res.data.title,
         content: res.data.content
       })
       wx.setNavigationBarTitle({
        title: res.data.title,
      });
      setTimeout(function(){
        wx.hideNavigationBarLoading();
      },500)
     }
    })
  }
})
