import axios from '../base';

// 获取图形验证码
function verificationCode() {
  return axios({
    url: `/verificationCode`,
    method: 'get'
  });
}

function register(data) {
  return axios({
    url: `/users?vid=${data.vid}&value=${data.value}`,
    method: 'post',
    data: data.userInfo
  });
}

function login(data) {
  return axios({
    url: `/users/token?vid=${data.vid}&value=${data.value}`,
    method: 'post',
    data: data.userInfo
  });
}

// 发送密码重置邮件
function resetPasswordEmail(email) {
  return axios({
    url: `/users/emails/${email}/resetPasswordEmail`,
    method: 'get'
  });
}

// 用户重置密码
function resetPassword(data) {
  return axios({
    // url: `/users/password?password=${data.password}&vid=${data.vid}&value=${data.value}`,
    url: `/users/password`,
    method: 'put',
    data
  });
}

// 效验邮箱可用性
function checkEmail(email) {
  return axios({
    url: `/users/emails/${email}`,
    method: 'get'
  });
}

// 校验用户名可用性
function checkUser(user) {
  return axios({
    url: `/users/usernames/${user}`,
    method: 'get'
  });
}

// 收藏画作
function collectIllust(data) {
  return axios({
    url: `/bookmarked`,
    method: 'post',
    data
  });
}

// 收藏画作列表
function getCollectList(params) {
  return axios({
    url: `/${params.userId}/bookmarked/${params.type}`,
    method: 'get',
    params: { page: params.page, pageSize: params.pageSize || 30 }
  });
}

// 取消收藏
function deleteCollect(data) {
  return axios({
    url: `/bookmarked`,
    method: 'delete',
    data
  });
}

// 关注和取消关注画师
function followArtist(data) {
  return axios({
    url: `/followed`,
    method: data.follow ? 'post' : 'delete',
    data: { artistId: data.artistId, userId: data.userId }
  });
}

export {
  verificationCode,
  register,
  login,
  resetPasswordEmail,
  checkEmail,
  checkUser,
  resetPassword,
  collectIllust,
  getCollectList,
  deleteCollect,
  followArtist
};
