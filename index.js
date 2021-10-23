window.fbAsyncInit = function () {
  FB.init({
    appId: '404888344473042',
    cookie: true,
    xfbml: true,
    version: 'v12.0',
  });

  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    setElements(true);
    console.log('Logged in and authenticated');
  } else {
    setElements(false);
    console.log(response);
  }
}

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

function setElements(isLoggedIn) {
  if (isLoggedIn) {
    document.querySelector('.profile').style.display = 'block';
    document.querySelector('.fb-btn').style.display = 'none';
    document.querySelector('.logout').style.display = 'block';
  } else {
    document.querySelector('.profile').style.display = 'none';
    document.querySelector('.fb-btn').style.display = 'block';
    document.querySelector('.logout').style.display = 'none';
  }
}

function logout() {
  FB.logout(function (response) {
    setElements(false);
  });
}
