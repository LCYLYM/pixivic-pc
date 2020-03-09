<!--
 * @Author: Dongzy
 * @since: 2020-02-02 14:52:15
 * @lastTime: 2020-03-09 10:17:18
 * @LastAuthor: Dongzy
 * @FilePath: \pixiciv-pc\src\views\Detail\Detail.vue
 * @message:
 -->
<template>
  <div
    v-if="illustDetail"
    class="detail"
  >
    <div class="page-padding">
      <main class="detail-content">
        <figure class="detail-content__figure">
          <el-image
            :src="illustDetail.mediumSrc"
            fit="contain"
            style="width:100%;height:80vh;"
          />
        </figure>
        <div class="detail-content__action">
          <div
            :class="['like', {'is-like': isLiked}]"
            @click.stop="handleLike"
          />
        </div>
        <figcaption class="detail-content__info">
          <div class="card">
            <h1>{{ illustDetail.title }}</h1>
            <div class="disc">{{ illustDetail.caption }}</div>
            <div class="tags">
              <ul>
                <li
                  v-for="item of illustDetail.tags"
                  :key="item.id"
                  :title="item.translatedName"
                  @click="openTag(item)"
                >#{{ item.name }}</li>
              </ul>
            </div>
            <ul class="populor">
              <li title="阅读数">
                <i class="el-icon-view" />
                {{ illustDetail.totalView }}
              </li>
              <li title="收藏数">
                <i class="el-icon-star-off" />
                {{ illustDetail.totalBookmarks }}
              </li>
            </ul>
            <div
              class="date"
              title="投稿时间"
            >{{ illustDetail.createDate }}</div>
          </div>
        </figcaption>
      </main>
      <aside class="detail-author">
        <section class="artist-info" @click="goArtistPage">
          <el-avatar
            :src="illustDetail.avatarSrc"
            size="medium"
          />
          <h2>{{ illustDetail.artistPreView.name }}</h2>
        </section>
        <section style="margin:10px 20px;text-align:center;">
          <el-button
            round
            size="small"
            type="primary"
          >添加关注</el-button>
        </section>
        <section class="artist-preview">
          <el-image
            v-for="url in urls"
            :key="url"
            :src="url"
            class="small-img"
            lazy
          />
        </section>
      </aside>
    </div>
  </div>
</template>

<script>
import { IMG_PREFIX } from '@/util/constants';
import dayjs from 'dayjs';
export default {
  name: 'Detail',
  components: {},
  props: {
    pid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      illustDetail: null,
      imageList: [],
      isLiked: false,
      type: 'illust',
      pictureList: [],
      urls: []
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getIllustDetail();
  },
  methods: {
    goArtistPage() {
      this.$router.push(`/artist/${this.illustDetail.artistId}`);
    },
    handleLike() {
      this.isLiked = !this.isLiked;
      // this.$emit('handleLike', this.column);
    },
    openTag(item) {
      this.$router.push({
        path: `/tag/${item.name}`,
        query: {
          illustType: this.type
        }
      });
    },
    // 请求数据
    getIllustDetail() {
      this.$api.detail.reqIllustDetail(this.pid).then(res => {
        const data = res.data.data;
        this.illustDetail = {
          ...data,
          itemHeight: parseInt((data.height / data.width) * document.body.clientWidth),
          src: IMG_PREFIX + data.imageUrls[0].original.replace('_webp', ''),
          avatarSrc: IMG_PREFIX + data.artistPreView.avatar,
          mediumSrc: IMG_PREFIX + data.imageUrls[0].medium,
          createDate: dayjs(data.createDate).format('YYYY-MM-DD HH:mm:ss'),
          setu:
						!!(data.xrestrict === 1 || data.sanityLevel > 6) && this.user.username !== 'pixivic'
        };
        this.getArtistIllust();
      });
    },
    getArtistIllust() {
      this.$api.detail
        .reqArtistIllust({
          page: 1,
          artistId: this.illustDetail.artistPreView.id,
          type: this.type,
          pageSize: 10
        })
        .then(res => {
          if (res.data.data) {
            const {
              data: { data }
            } = res;
            this.pictureList = this.pictureList.concat(data);
            console.log(this.pictureList, '*************');
            this.urls = this.pictureList.map(item => IMG_PREFIX + item.imageUrls[0].squareMedium);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    infinite($state) {
      this.$api.detail
        .reqRelatedIllust({
          page: this.page++,
          illustId: this.pid
        })
        .then(res => {
          if (!res.data.data) {
            $state.complete();
          } else {
            this.pictureList = this.pictureList.concat(res.data.data);
            $state.loaded();
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style scoped lang="less">
@keyframes heart {
	0% {
		background-position: left;
	}

	100% {
		background-position: right;
	}
}
.detail {
	height: calc(~'100vh - 60px');
	width: calc(~'100vh-65px');
	overflow: auto;
	display: flex;
	background: #f5f5f5;
	.page-padding {
		padding: 20px;
		display: flex;
	}
	&-content {
		width: 1000px;
		flex: 0 0 auto;
		background-color: #fff;
		&__figure {
			margin: 20px;
		}
		&__action {
			display: flex;
			justify-content: flex-end;
			background: #fff;
			.like {
				width: 80px;
				height: 40px;
				background: url('../../assets/images/like.png') no-repeat;
				background-position: left;
				background-size: 2900%;
			}
			.is-like {
				background-position: right;
				animation: heart 0.8s steps(28);
			}
		}

		&__info {
			padding: 48px 16px;
			display: flex;
			justify-content: center;
			margin: 0 auto;
			background: #fff;
			.card {
				width: 600px;
				h1 {
					color: rgb(28, 28, 28);
					font-size: 20px;
					line-height: 24px;
					font-weight: bold;
					margin: 0px 0px 8px;
				}
				.disc {
					color: rgb(92, 92, 92);
					line-height: 1.33;
					margin: 0px;
					overflow: hidden;
				}
				.tags {
					display: flex;
					color: rgb(61, 118, 153);
					line-height: 18px;
					margin: 16px 0px;
					ul {
						margin: 0 -6px 0 0;
						list-style: none;
						padding-left: 0;
						word-break: break-all;
						li {
							display: inline;
							margin: 0 12px 0 0;
							cursor: pointer;
						}
					}
				}
				.populor {
					display: flex;
					-webkit-box-align: center;
					align-items: center;
					margin: 16px -4px;
					list-style: none;
					padding: 0px;
					li {
						flex: 0 0 auto;
						margin: 0px 8px;
						display: list-item;
						text-align: -webkit-match-parent;
						font-size: 12px;
						color: rgb(173, 173, 173);
					}
				}
				.date {
					color: rgb(173, 173, 173);
					font-size: 12px;
					line-height: 1;
				}
			}
		}
	}
	&-author {
		margin-left: 24px;
		width: 288px;
		flex: 0 0 auto;
		background: #fdfdfd;
		.artist-info {
			display: flex;
			padding: 16px;
			border-radius: 8px;
			align-items: center;
			h2 {
				font-size: 1em;
				font-weight: bold;
				margin-left: 6px;
				word-break: break-all;
				color: rgb(31, 31, 31);
				text-decoration: none;
			}
		}
		.artist-preview {
			padding: 16px;
			display: flex;
			flex-wrap: wrap;
			.small-img {
				width: 80px;
				height: 80px;
			}
		}
	}
}
</style>
