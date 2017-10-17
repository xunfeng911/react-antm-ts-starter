import wx from 'weixin-js-sdk';
import http from './axios';
/**
 * @description 微信sdk配置config
 * 
 * @param {any} data 配置参数
 * @param {function} [fn=() => console.log('err')]  回调函数
 */
const setWxConfig = (fn: Function = () => { window.console.log('nothing'); }) => {
  let url = window.location.href;
  http
    .get('/wx/js/sign', { url: url })
    .then((res: any) => {
      // 配置
      const data = res.result;
      wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getLocalImgData',
          'chooseWXPay'
        ]
      });
      // 成功后回调
      wx.ready(() => {
        return fn();
      });
    });
};

/**
 * @description 生成订单 返回配置参数 
 * 
 * @param {any} url 
 * @param {any} describe 
 * @param {any} currentPrice 
 */
const generateOrder = (url: string) => {
  return http.get(url)
    .then((res: any) => {
      window.console.log(res);
      // window.alert('generateOrder' + JSON.stringify(res))
      return res;
    });
};

/**
 * @description 支付确认情况
 * 
 * @param {any} data 
 * @param {any} [fn=(res) => { console.log(res) }] 
 */
const getPayRequest = (data: any, orderNo: any, fn: Function = (res: any) => { window.console.log(res); }) => {
  const { timeStamp, nonceStr, paySign, signType } = data;
  const _package = data.package;
  return wx.chooseWXPay({
    timestamp: timeStamp || '',
    nonceStr: nonceStr || '',
    package: _package || '',
    signType: signType || '',
    paySign: paySign || '',
    success: (res: any) => {
      window.console.log(res);
      return fn(orderNo);
    },
    fail: (err: Error) => {
      alert(err);
      window.console.log(err);
      return err;
    }
  })
}

/**
 * 分享到朋友圈
 * 
 * @param {any} data = {title, link, imgUrl} 标题，链接，图标链接
 * @param {any} fn 
 * @returns 
 */
const ShareOnMoments = (data: any, fn: Function = () => { window.console.log('shareOnMoments'); }) => {
  const { title, link, imgUrl } = data;
  return wx.onMenuShareTimeline({
    title: title,
    link: '' + link,
    imgUrl: imgUrl,
    success: () => {
      // window.alert(title,link,imgUrl)
      return fn();
    },
    cancel: () => {
      return false;
    }
  });
};

/**
 * @description 分享给好友
 * 
 * @param {any} data 
 * @param {any} fn 
 * @returns 
 */
const ShareOnMessage = (data: any, fn: Function = () => { window.console.log('a'); }) => {
  const { title, desc, link, imgUrl, type } = data;
  return wx.onMenuShareAppMessage({
    title: title,
    desc: desc,
    link: '' + link,
    imgUrl: imgUrl,
    type: type,
    dataUrl: data.dataUrl || '',
    success: () => {
      // window.alert(title,link,imgUrl)
      return fn();
    },
    cancel: () => {
      window.console.log('cancel');
      return false;
    }
  })
}

const onBridgeReady = (data: any, fn: Function = () => window.console.log('onBridgeReady')) => {
  const { timeStamp, nonceStr, paySign, signType, appId } = data;
  const _package = data.package;
  WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
          'appId': appId,     // 公众号名称，由商户传入
          'timeStamp': timeStamp,         // 时间戳，自1970年以来的秒数
          'nonceStr': nonceStr, // 随机串
          'package': _package,
          'signType': signType,         // 微信签名方式：
          'paySign': paySign // 微信签名
      },
      function (res: any) {
        // window.alert(JSON.stringify(data))
        // window.alert(JSON.stringify(res))
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          return fn();
          }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
      }
  );
}

const weChatPay = (data: any, fn = () => window.console.log()) => {
  if (typeof (window.WeixinJSBridge) === 'undefined' || typeof (window.WeixinJSBridge.invoke) === 'undefined') {
    if( document.addEventListener ) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady(data, fn);
  }
};

// const testWeChatPay = () => {
//   window.alert('wechatpay')
//   onBridgeReady();
// }

export {
  setWxConfig,
  weChatPay,
  generateOrder,
  getPayRequest,
  ShareOnMoments,
  ShareOnMessage
};