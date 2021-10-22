let postData;
let access_token =
  'EAAFwPmnyLdIBANJsZAvZAhComaZAEroIMs9IqVZBMWWu1iDM5zG8l2eXLMwbFR1I2uParNt7t8dBEN7EIADREsiZCCJTlbcqzmFv6wg2SySICfMYtCnFLeiZCdybWmxLkE6V7z2wl6hDu776eyIZCQEYkOoLSsuVWZBPy3701ZCXqjbyPCLOkaqq0YQFwjw7ThbRyMZBCMXeIKmS4uayZBKcNNAZCVOOfhcbk3oZD';

function getPostsFromFB() {
  fetch(
    `https://graph.facebook.com/v12.0/111418554661487_111447631325246/comments?access_token=${access_token}`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      postData = data.data;
      addPostsToPage();
    });
}

function addPostsToPage() {
  const postsDis = document.querySelector('.postsDis');
  for (const datum of postData) {
    const post = createNewPost(datum);
    postsDis.appendChild(post);
  }
}

function createNewPost(postDatum) {
  const post = document.createElement('div');
  post.setAttribute('class', 'post');

  const created = postDatum.created_time;
  const user = postDatum.from.name;
  const userID = postDatum.from.id;
  const message = postDatum.message;
  const postID = postDatum.id;

  post.textContent =
    created + ' | ' + user + ' | ' + userID + ' | ' + message + ' | ' + postID;

  return post;
}

function main() {
  getPostsFromFB();
}

main();
