<template>
	<div class="member-row-edit">
		<div class="member-id-edit">
			<input class="member-id-input" type="number" v-model="memberId">
		</div>
		<input class="member-name-edit" type="text" v-model="name">
		<div class="member-controls">
			<label>
				<span class="toggle-gender" @click="toggleGender()">{{ gender }}</span>
			</label>
		</div>
		<button class="remove-member-btn" @click="emitRemoveRequest()">
			X
		</button>
	</div>
</template>

<script>

export default {
  name: "MemberRow",
  props: {
  	initMemberId: Number,
  	initName: String,
  	initGender: String,
  },
  data() {
  	return {
  	  memberId: 0,
	  name: "",
	  gender: "",
  	}
  },
  mounted() {
  	this.memberId = this.initMemberId;
	this.name = this.initName;
	this.gender = this.initGender;
  },
  methods: {
  	toggleGender() {
  		this.gender = this.gender == "male" ? "female" : "male";
  	},
  	emitRemoveRequest() {
  		this.$emit("remove-request");
  	}
  },
};

</script>

<style>
	.member-row-edit {
		display: grid;
		grid-template-columns: 100px 1fr 6fr 40px;
		column-gap: 1em;
		position: relative;
		--side-color: #e1e1e1;
		border-bottom: dashed 2px #e1e1e1;
		padding: 8px 0 8px 10px;
		transition: .3s;
		border-top-left-radius: 10px;
	}

	.member-row-edit:hover {
		border-bottom-style: solid;
	}

	.member-id-edit {
		background-color: var(--side-color);
		position: relative;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		padding: 2px;
		font-weight: bold;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.member-id-input {
		background: transparent;
		border: none;
		border-radius: 0;
		border-bottom: 2px solid rgba(0,0,0,.3);
		width: 4em;
		margin: 0 10px;
	}

	.member-name-edit {
		position: relative;
		padding: 5px;
		direction: rtl;
		border-color: var(--side-color);
	}

	.toggle-gender {
		text-decoration: underline;
		cursor: pointer;
		transition: .3s;
	}

	.toggle-gender:hover {
		color: #527e22;
		font-weight: bold;
		letter-spacing: 2px;
	}

	.remove-member-btn {
		background-color: #a41414;
		color: #e1e1e1;
		font-weight: bold;
		border: none;
	}
	
	.remove-member-btn:hover {
		background-color: #791111;
	}
</style>