export function getInstagramUser(accessToken = '') {
  return fetch(
    `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`,
  ).then(response => response.json());

  // return fetch(
  //   `https://api.instagram.com/v1/users/self/?access_token=${accessToken}`,
  // ).then(response => response.json());
}
