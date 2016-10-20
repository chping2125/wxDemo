var app = getApp();
Page({
  data: {
    userInfo: {
      username:'',
      password:'',
      avatarImg:'/images/outh_header.png',
      province:'',
      city:'未登录',
    },
    loginHidden:true,
    text:'立即登陆'
  },
  usernameChange:function(e){
    this.setData({
      'userInfo.username':e.detail.value
    })
  },
  passwordChange:function(e){
    this.setData({
      'userInfo.password':e.detail.value
    })
  },
  confirmChange:function(){
    console.log('confirm');
    var that = this;
    wx.setStorageSync('password', this.data.userInfo.password);
    app.getUserInfo(function(userInfo){
      wx.setStorageSync('username', userInfo.nickName);
      wx.setStorageSync('avatarUrl', userInfo.avatarUrl);
      wx.setStorageSync('province', userInfo.province);
      wx.setStorageSync('city', userInfo.city);
      that.setData({
        'userInfo.username':userInfo.nickName,
        'userInfo.avatarImg':userInfo.avatarUrl,
        'userInfo.province':userInfo.province,
        'userInfo.city':userInfo.city,
        loginHidden:true,
        text:'退出'
      })
    })
  },
  cancelChange:function(){
    console.log('cancel');
    this.setData({
      'userInfo.username': '',
      'userInfo.password': '',
      loginHidden:true,
    })
  },
  bindUserTap:function(){
    var u = wx.getStorageSync('username');
    if(u === ''){
      this.setData({
        loginHidden:false
      })
    }
  },
  btn:function(e){
    if(e.target.dataset.type==='退出'){
      wx.clearStorage();
      this.setData({
        userInfo: {
          username:'',
          password:'',
          avatarImg:'/images/outh_header.png',
          province:'',
          city:'未登录'
        },
        text:'立即登陆'
      })
    }else{
      this.setData({
        loginHidden:false
      })
    }
  },
  onShow: function () {
    var u = wx.getStorageSync('username');
    if(u !== ''){
      var p = wx.getStorageSync('password');
      var a = wx.getStorageSync('avatarUrl');
      this.setData({
        'userInfo.username': u,
        'userInfo.password': p,
        'userInfo.avatarImg': a,
        loginHidden:true,
        text:'退出'
      })
    }

  }
})
