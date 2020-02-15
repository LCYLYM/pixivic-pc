<template>
	<div
		@click="goDetail"
		class="item"
	>
		<div
			:style="column.style"
			class="item-content"
		>
			<img
				:src="column.src"
				:style="{opacity}"
				@load="opacity = 1"
			/>
		</div>
		<div
			class="count"
			v-if="column.pageCount > 1"
		>
			<img src="../../assets/images/count.svg" />
			<span>{{ column.pageCount }}</span>
		</div>
		<div
			:class="['like', {'is-like': isLiked}]"
			@click.stop="handleLike"
		/>
		<div
			class="setu-filter"
			v-if="column.xrestrict === 1 || column.sanityLevel > 6"
		>
			<img
				src="../../assets/images/error.svg"
				width="100%"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Item',
	props: {
		column: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			opacity: 0,
			isLiked: false,
		};
	},
	computed: {
		contentStyle() {
			return {
				backgroundColor: this.column.color,
				filter: this.column.xrestrict === 1 || this.column.sanityLevel > 6 ? `blur(20px)` : '',
			};
		},
	},
	methods: {
		goDetail() {
			if (this.column.xrestrict === 1 || this.column.sanityLevel > 6) return;
			this.$router.push(`/detail/${this.column.id}`);
		},
		handleLike() {
			this.isLiked = !this.isLiked;
			// this.$emit('handleLike', this.column);
		},
	},
};
</script>

<style lang="stylus" scope>
@keyframes heart {
	0% {
		background-position: left;
	}

	100% {
		background-position: right;
	}
}

.item {
	box-sizing: border-box;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 8px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;

	.item-content {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 5px;

		img {
			width: 100%;
			height: 100%;
			transition: opacity 0.3s;
			object-fit: cover;
			border-radius: 5px;
			// &:hover
			// transform scale(1.4)
		}
	}

	.count {
		position: absolute;
		display: inline-block;
		top: 15px;
		right: 15px;
		color: white;
		background-color: #0000009e;
		padding: 2px;
		border-radius: 4px;

		img {
			float: left;
			fill: white;
			height: 20px;
			width: 20px;
		}

		span {
			float: right;
			padding: 0 2px;
			line-height: 20px;
		}
	}

	.like {
		position: absolute;
		bottom: 5px;
		right: -10px;
		width: 80px;
		height: 40px;
		background: url('../../assets/images/like.png') no-repeat;
		background-position: left;
		background-size: 2900%;

		&.is-like {
			background-position: right;
			animation: heart 0.8s steps(28);
		}
	}

	.setu-filter {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 40px;
		height: 40px;
		margin: auto;
		z-index: 999;
	}
}
</style>
