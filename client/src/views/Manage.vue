<template>
  <div class="manage-page">
    <div class="save-or-shuffle-buttons">
	    <router-link class="shuffle-btn" to="/">Shuffle</router-link>
	    <div class="save-btn" @click="saveToServer">Save</div>
    </div>
    <div class="edit-members-list">
      <button class="add-member-button" @click="addMember">
      	+
      </button>
      <MemberRowEdit
      	ref="members"
        v-for="member in members"
        :key="member.id"
        :init-member-id="member.id"
        :init-name="member.name"
        :init-gender="member.gender"
        @remove-request="removeMember(member.id)"
      ></MemberRowEdit>
    </div>
  </div>
</template>

<script>

import config from "@/config.js";
import MemberRowEdit from "@/components/MemberRowEdit.vue";

export default {
  name: "Home",
  components: {
    MemberRowEdit
  },
  async mounted() {
    this.members = await fetch(`http://${config.serverName}/members`).then(res => res.json());
  },
  data() {
    return {
      members: [],
    }
  },
  methods: {
  	saveToServer() {
  		const newData = this.$refs.members.map(({memberId, name, gender}) => ({id: +memberId, name, gender}));
  		console.log(newData[0]);
  		fetch(`http://${config.serverName}/members`, {
  			method: "POST",
  			headers: { "content-type": "application/json" },
  			body: JSON.stringify(newData)
  		}).then(res => res.text()).then(alert);
  	},
  	removeMember(memberId) {
  		this.members.splice(this.members.find(m => m.initMemberId === memberId), 1);
  	},
  	addMember() {
  		this.members = [{id: 0, name: "", gender: "male"}, ...this.members];
  	}
  }
}

</script>

<style>
	.manage-page {
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(45deg, black, #192834);
		min-height: 100vh;
	}

	.edit-members-list {
		width: 90%;
		border-radius: 10px;
		overflow: hidden;
		background-color: white;
		margin-top: 1em;
		padding: 4em 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
		grid-template-rows: repeat(auto-fill, 50px);
		direction: rtl;
	}

	.add-member-button {
		border: none;
		background-color: #5783b5;
		font-size: 2em;
		margin: 5px .5em;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 0;
	}

	.save-or-shuffle-buttons {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #212121;
		width: 200px;
		height: 200px;
		display: flex;
		grid-gap: .3em;
		border-radius: 50%;
		overflow: hidden;
		z-index: 10;
	}
	
	.save-or-shuffle-buttons:hover > * {
		flex: unset;
		flex-grow: 1;
	}

	.save-btn,
	.shuffle-btn {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 60px;
		font-size: 1.3em;
		text-decoration: none;
		cursor: pointer;
		transition: .3s;
		width: auto;
		text-align: left;
		flex: 1;
		width: 50%;
	}
			
	.save-btn:hover,
	.shuffle-btn:hover {
		font-weight: bold;
		letter-spacing: 6px;
		width: 170px;
	}

	.save-btn {
		background-color: #1e7a45;
		color: #e1e1e1;
	}

	.shuffle-btn {
		background-color: #ff7d17;
		color: #313131;
	}
</style>