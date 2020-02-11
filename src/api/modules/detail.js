import axios from '../base';

function getPixById(id) {
  return axios({
    url: `/illusts/${id}`,
    method: 'get'
  });
}

function reqArtistIllust(params) {
  return axios({
    url: `/artists/${params.artistId}/illusts/${params.type}`,
    method: 'get',
    params: {
      page: params.page || 1,
      pageSize: params.pageSize || 30,
      maxSanityLevel: 10
    }
  });
}

function reqIllustDetail(pid) {
  return axios({
    url: `/illusts/${pid}`,
    method: 'get'
  });
}

function reqArtist(artistId) {
  return axios({
    url: `/artists/${artistId}`,
    method: 'get'
  });
}

// 获取关联画作
function reqRelatedIllust(param) {
  return axios({
    url: `https://api.pixivic.com/illusts/${param.illustId}/related?page=${param.page || 1}`,
    method: 'get'
  });
}

// 获取画师画作汇总
function reqSummary(artistId) {
  return axios({
    url: `/artists/${artistId}/summary`,
    method: 'get'
  });
}

export {
  getPixById,
  reqArtistIllust,
  reqIllustDetail,
  reqArtist,
  reqRelatedIllust,
  reqSummary
};
