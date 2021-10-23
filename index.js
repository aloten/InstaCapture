window.fbAsyncInit = function () {
  FB.init({
    appId: '404888344473042',
    cookie: true,
    xfbml: true,
    version: 'v12.0',
  });

  FB.AppEvents.logPageView();

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
    testAPI();
  } else {
    setElements(false);
    console.log('Not authenticated');
    console.log(response);
  }
}

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

function testAPI() {
  FB.api('/me?fields=name,email,birthday', function (response) {
    if (response && !response.error) {
      // console.log(response);
      buildProfile(response);
    }
  });
}

function buildProfile(user) {
  const profile = document.createElement('div');
  const name = document.createElement('h3');
  const profileAttributes = document.createElement('ul');
  const email = document.createElement('li');
  const birthday = document.createElement('li');
  const userID = document.createElement('li');

  name.textContent = user.name;
  email.textContent = user.email;
  birthday.textContent = user.birthday;
  userID.textContent = user.id;

  profile.appendChild(name);
  profileAttributes.appendChild(email);
  profileAttributes.appendChild(birthday);
  profileAttributes.appendChild(userID);
  profile.appendChild(profileAttributes);
}

function setElements(isLoggedIn) {
  if (isLoggedIn) {
    document.querySelector('.profile').style.display = 'block';
    document.querySelector('.profile-heading').style.display = 'none';
    document.querySelector('.fb-btn').style.display = 'none';
    document.querySelector('.logout').style.display = 'block';
  } else {
    document.querySelector('.profile').style.display = 'none';
    document.querySelector('.profile-heading').style.display = 'block';
    document.querySelector('.fb-btn').style.display = 'block';
    document.querySelector('.logout').style.display = 'none';
  }
}

function logout() {
  FB.logout(function (response) {
    setElements(false);
  });
}
