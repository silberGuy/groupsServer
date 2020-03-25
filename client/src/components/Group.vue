<template>
  <div class="group">
    <div class="group-rules">
      <label>
        Limit Members
        <input type="number" min="1" v-model="limit" @input="onRuleUpdate()" placeholder="no limit">
      </label>
      <label>
        Ensure Members
        <input type="text" class="ensure-members-input" @input="onRuleUpdate()" placeholder="By ids (i.e. 1-4,6,9...)" v-model="ensuredMembersRaw">
      </label>
      <label>
        Prevent Members
        <input type="text" class="ensure-members-input" @input="onRuleUpdate()" placeholder="By ids (i.e. 1-4,6,9...)" v-model="preventedMembersRaw">
      </label>
      <div class="title-input">
        <input type="text" placeholder="Group Title" v-model="title" tabindex="4">
      </div>
    </div>
    <div class="group-title">
      {{ title }}
    </div>
    <div class="group-members">
      <MemberRow
        v-for="member in members"
        :key="member.id"
        :member-id="member.id"
        :name="member.name"
        :gender="member.gender"
        :showId="showIds"
      ></MemberRow>
    </div>
  </div>
</template>

<script>

import MemberRow from "@/components/MemberRow.vue";

export default {
  name: "Group",
  components: {
    MemberRow
  },
  props: ["showIds"],
  data() {
    return {
      ensuredMembersRaw: "",
      preventedMembersRaw: "",
      members: [],
      limit: undefined,
      title: "",
    }
  },
  computed: {
    ensuredMembersIds() {
      return this.parseRawIdsString(this.ensuredMembersRaw);
    },
    preventedMembersIds() {
      return this.parseRawIdsString(this.preventedMembersRaw);
    },
  },
  methods: {
    onRuleUpdate() {
      this.$emit("rule-update");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .group {
    position: relative;
  }

  .group-rules {
    padding: .5em;
    background-color: #1e7a45;
    color: #e1e1e1;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }

  .group-rules > label {
    display: block;
    margin-bottom: 10px;
    text-align: center;
  }

  .title-input > input {
    width: 90%;
    text-align: center;
    font-size: 1.1em;
    letter-spacing: 3px;
  }

  .group-members {
    list-style: none;
    padding: none;
    border-left: dashed 2px rgba(0,0,0,.3);
    border-right: dashed 2px rgba(0,0,0,.3);
  }

  .group-member {
    padding: .5em 1em;
    font-size: 1.2em;
  }

  .group-title {
    font-size: 1.5em;
    font-weight: bold;
    display: none;
  }

  @media print {
    .group-rules {
      display: none;
    }

    .group-title {
      display: block;
    }

    .group-members {
      height: 100%;
    }
  }
</style>
