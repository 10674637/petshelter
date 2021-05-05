<template>
  <b-container fluid>
    <div class="flex-container">
      <div>
        <label for="petType">Animal Type </label>
      </div>
      <div>
        <b-form-select
          id="petType"
          v-on:change="$emit('change', res)"
          v-model="res.petType"
          v-bind:options="options"
        ></b-form-select>
      </div>
      <!-- <div>     
                <label for="location">Search: </label>
            </div>      -->
      <div>
        <b-form-input
          type="search"
          v-on:keyup="$emit('change', res)"
          v-model="res.search"
          placeholder="Search"
        ></b-form-input>
      </div>
      <div v-show="isLostFound" class="flex-container">
        <div>
          <b-form-checkbox
            id="showLost"
            v-on:change="$emit('change', res)"
            v-model="res.isShowLost"
            name="showLost"
          >
            Lost
          </b-form-checkbox>
        </div>
        <div>
          <b-form-checkbox
            id="showFound"
            v-on:change="$emit('change', res)"
            v-model="res.isShowFound"
            name="showFound"
          >
            Found
          </b-form-checkbox>
        </div>
      </div>

      <div>
        <input
          type="radio"
          id="asc"
          value="asc"
          v-on:change="$emit('change', res)"
          v-model="res.sort"
        />
        <label for="asc">ASC</label>
        <input
          type="radio"
          id="desc"
          value="desc"
          v-on:change="$emit('change', res)"
          v-model="res.sort"
        />
        <label for="desc">DESC</label>
        <br />
      </div>
    </div>
  </b-container>
</template>
<style scoped>
select,
option,
input {
  color: black;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.3rem;
  margin-bottom: 2rem;
  border: 2px solid white;
}

.flex-container > div {
  margin: 10px;
  text-align: center;
  flex-grow: 1;
}

.flex-container > div > label {
  padding: 0.375rem 0.75rem;
}
</style>
<script>
export default {
  props: {
    isLostFound: { type: Boolean, required: true },
  },
  data() {
    return {
      options: [
        { text: "-", value: "-" },
        { text: "Dog", value: "Dog" },
        { text: "Cat", value: "Cat" },
        { text: "Other", value: "Other" },
      ],

      res: {
        petType: "-",
        search: "",
        isShowLost: true,
        isShowFound: true,
        sort: "asc",
      },
    };
  },
};
</script>
