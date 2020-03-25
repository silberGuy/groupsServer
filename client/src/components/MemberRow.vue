<template>
	<div class="member-row" :class="{'no-index': !showId}">
		<div class="member-name">
			{{ name }}
		</div>
		<div class="member-id" v-show="showId">
			{{ memberId }}
		</div>
	</div>
</template>

<script>

export default {
  name: "MemberRow",
  props: {
  	memberId: Number,
  	name: String,
  	gender: String,
  	showId: { type: Boolean, default: true },
  },
};

</script>

<style>
	.member-row {
		display: grid;
		grid-template-columns: 6fr 1fr;
		margin: 2px 0;
		position: relative;
		--side-color: #e1e1e1;
	}

	.member-row.no-index {
		grid-template-columns: 1fr;
	}

	.member-row::before {
		content: "";
		position: absolute;
		background-color: var(--side-color);
		width: 0;
		height: 100%;
		right: 0;
		transition: width .3s;
		transition-delay: .05s;
	}
		
	.member-row.no-index:hover {
		background-color: var(--side-color);
	}

	.member-row:not(.no-index):hover::before {
		width: 100%;
	}

	.member-id {
		background-color: var(--side-color);
		position: relative;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		padding: 2px;
		font-weight: bold;
	}

	.member-name {
		position: relative;
		padding: 5px;
	}
	
	@media print {
		.member-row::before {
			display: none;
		}
		.member-row {
			background-color: transparent;
		}
	}
</style>