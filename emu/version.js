// 获取版本号并赋值给全局的 app 对象
(function() {
  // 等待 DOM 加载完成
  document.addEventListener('DOMContentLoaded', function() {
    fetch('https://mpgame.lxyong.com/api/app/download-info')
      .then(response => response.json())
      .then(data => {
        if (data.success && data.code === 200) {
          // 将版本号赋值给全局 app 对象的 version 字段
          var version = data.data.version;
          app.appv=version;
          app.accp='application/json, application/octet-stream, */*; q=0.03; v='+version+'; dv=104;tpd=0;tpv=0';
          //alert('版本号获取成功:'+version);
        } else {
          console.error('接口返回错误:', data.msg);
        }
      })
      .catch(error => {
        console.error('请求失败:', error);
      });
  });
})();
