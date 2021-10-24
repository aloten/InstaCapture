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
  FB.api('/me?fields=name,email,birthday,posts', function (response) {
    if (response && !response.error) {
      buildProfile(response);
    }

    FB.api('/me/posts', function (response) {
      if (response && !response.error) {
        buildPosts(response);
      }
    });
  });
}

function buildProfile(user) {
  const profile = document.querySelector('.profile');

  const name = document.createElement('h3');
  const profileAttributes = document.createElement('ul');
  const userID = document.createElement('li');
  const email = document.createElement('li');
  const birthday = document.createElement('li');

  name.textContent = user.name;
  userID.textContent = `User ID: ${user.id}`;
  email.textContent = `Email: ${user.email}`;
  birthday.textContent = `Birthday: ${user.birthday}`;

  profileAttributes.setAttribute('class', 'attr-list');
  name.setAttribute('class', 'profile-name');
  userID.setAttribute('class', 'attr');
  email.setAttribute('class', 'attr');
  birthday.setAttribute('class', 'attr');

  profile.appendChild(name);
  profileAttributes.appendChild(userID);
  profileAttributes.appendChild(email);
  profileAttributes.appendChild(birthday);
  profile.appendChild(profileAttributes);

  console.log(profile);
}

function buildPosts(posts) {
  let output = '<h3>Latest Posts</h3>';
  for (let i in posts.data) {
    if (posts.data[i].message) {
      output += `
      <div class="post">
        ${posts.data[i].message} <span>${posts.data[i].created_time}</span>
      </div>
      `;
    }
  }

  document.querySelector('.posts').innerHTML = output;
}

function setElements(isLoggedIn) {
  if (isLoggedIn) {
    document.querySelector('.profile').style.display = 'block';
    document.querySelector('.profile-heading').style.display = 'none';
    document.querySelector('.fb-btn').style.display = 'none';
    document.querySelector('.logout').style.display = 'block';
    document.querySelector('.posts').style.display = 'block';
  } else {
    document.querySelector('.profile').style.display = 'none';
    document.querySelector('.profile-heading').style.display = 'block';
    document.querySelector('.fb-btn').style.display = 'block';
    document.querySelector('.logout').style.display = 'none';
    document.querySelector('.posts').style.display = 'none';
  }
}

function logout() {
  FB.logout(function (response) {
    setElements(false);
  });
}
