<template>
  <div>
    <header class="general-actions-panel">
      <button id="reshuffle-btn" @click="updateGroupsMembers()">
        <img
          src="@/assets/reshuffle.png"
          :class="{animated: shuffleAnimated}"
          @animationend="shuffleAnimated = false"
        >
      </button>
      <div class="nav">
        <router-link to="/manage">Manage Members</router-link>
      </div>
      <div class="controls">
        <label>
          <input type="number" id="groups-count-input" v-model.number="groupsCount" placeholder="">
          Groups
        </label>
        <label>
          <input type="checkbox" v-model="showIds">
          Show IDs
        </label>
      </div>
    </header>
    <div ref="groupsContainer" class="groups">
      <Group ref="groups"
        v-for="index in groupsCount"
        :key="index"
        @rule-update="updateGroupsMembers()"
        :showIds="showIds"
      ></Group>
    </div>
  </div>
</template>

<script>

import config from "@/config.js";
import Group from "@/components/Group.vue";

export default {
  name: "Home",
  components: {
    Group
  },
  async mounted() {
    console.log(123);
    this.members = await fetch(`/members`).then(res => res.json());
  },
  data() {
    return {
      groupsCount: 3,
      shuffleAnimated: false,
      showIds: true,
      members: [],
    }
  },
  watch: {
    members() {
      this.updateGroupsMembers();
    },
    groupsCount() {
      this.updateGroupsMembers();
    },
  },
  methods: {
    addGroup() {
      this.groupsCount++;
    },
    clearGroupsMembers() {
      const groups = this.$refs.groups;
      groups.forEach(g => g.members = []);
    },
    updateGroupsMembers() {
      this.shuffleAnimated = true;
      this.$nextTick(() => {
        const groups = this.$refs.groups;
        let members = [...this.members];
        let successfulTry = false;
        
        this.clearGroupsMembers();
        for (let shuffleTry = 0; shuffleTry < this.members.length; shuffleTry++) {
          successfulTry = true;
          for (let memberIndex in members) {
            const member = members[memberIndex];
            
            const chosenGroup = this.getRandomGroupForMember(member, groups);
            if (!chosenGroup) {
              members.splice(memberIndex, 1);
              members = [member, ...members];
              successfulTry = false;
              break;
            }
            chosenGroup.members.push(member);
          }
          if (successfulTry) break;
        }
      })
    },
    getRandomGroupForMember(member, groups) {
      groups = groups || this.$refs.groups;
      let relevantGroups = 
        groups
        .filter(g => !g.limit || g.members.length < +g.limit)
        .filter(g => !g.preventedMembersIds.includes(member.id));
      
      const ensuredGroup = relevantGroups.find(g => g.ensuredMembersIds.includes(member.id));
      if (ensuredGroup) return ensuredGroup;

      const smallestLength = Math.min(...relevantGroups.map(g => g.members.length));
      const optionalGroups = relevantGroups.filter(g => g.members.length == smallestLength);
      return optionalGroups[Math.floor(Math.random() * optionalGroups.length)];
    }
  }
};

</script>

<style>
  .groups {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-gap: 1em;
    padding: 0 1em;
  }
  
  .general-actions-panel {
    background-color: #082004;
    color: #e1e1e1;
    font-size: 1.5em;
    padding: .5em;
    margin-bottom: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    position: relative;
  }

  #reshuffle-btn {
    background-color: #ff7d17;
    color: #151515;
    letter-spacing: 3px;
    font-size: 1em;
    font-weight: bold;
    border: 0 solid rgba(0,0,0,.4);

    position: absolute;
    left: 50%;
    top: 0;
    border-radius: 50%;
    width: 170px;
    height: 170px;
    transform: translate(-50%, -50%);
    transition: .3s;

    z-index: 10;
    outline: none;
  }

  #reshuffle-btn:active,
  #reshuffle-btn:focus {
    border: 3px solid rgba(0,0,0,.4);
  }

  #reshuffle-btn:hover {
    width: 200px;
    height: 200px;
  }

  #reshuffle-btn > img {
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
    width: 40%;
  }

  #reshuffle-btn > img.animated {
    animation: rotate-animation .5s linear;
  }

  @keyframes rotate-animation {
    0% { transform: translateX(-50%) rotate(0deg) }
    100% { transform: translateX(-50%) rotate(180deg) }
  }

  .nav > a {
    color: #e1e1e1;
  }

  .nav > a:hover {
    color: #b1b1b1;
  }

  #groups-count-input {
    font-size: 1.2em;
    width: 2em;
    background-color: rgba(255,255,255,.1);
    border: none;
    color: #e1e1e1;
    direction: rtl;
    -moz-appearance: textfield;
  }

  #groups-count-input::-webkit-outer-spin-button,
  #groups-count-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  @media print {
    .general-actions-panel {
      display: none;
    }

    .groups {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }

    .group {
      min-width: 30%;
      height: 100vh;
    }

    .group:nth-child(3) {
      page-break-after: always;
    }
  } 
</style>