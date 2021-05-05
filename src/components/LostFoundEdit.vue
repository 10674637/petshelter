<template>
  <div>
    <b-modal
      id="bv-modal-example-lostfound"
      hide-header-close
      no-close-on-backdrop
      hide-footer
    >
      <template #modal-title>
        Edit Pet
      </template>
      <div class="card h-100 padding">
        <div
          style="
                margin: 0 auto;
                text-align: center;
                position: relative;
                top: 10%;
                "
        >
          <div class="input-group">
            <label
              for="inputGroupTextFile"
              class="input-group"
              style="color: black"
              >Add Description:</label
            >
            <textarea
              class="form-control"
              rows="5"
              id="inputGroupTextFile"
              aria-describedby="inputGroupTextFile"
              aria-label="Description"
              v-model="LostFoundObj.desc"
            ></textarea>
          </div>
          <div class="input-group">
            <label
              for="inputGroupLocation"
              class="input-group"
              style="color: black"
              >Location</label
            >
            <input
              type="text"
              placeholder="location"
              class="form-control"
              id="inputLocation"
              aria-describedby="location"
              aria-label="Location"
              v-model="LostFoundObj.location"
            />
          </div>
          <div class="input-group">
            <label
              for="inputPersonName"
              class="input-group"
              style="color: black"
              >Person Name</label
            >
            <input
              type="text"
              placeholder="Person Name"
              class="form-control"
              id="inputPersonName"
              aria-describedby="personName"
              aria-label="personName"
              v-model="LostFoundObj.personName"
            />
          </div>
          <div class="input-group">
            <label
              for="inputPersonContact"
              class="input-group"
              style="color: black"
              >Contact</label
            >
            <input
              type="text"
              placeholder="Contact"
              class="form-control"
              id="inputPersonContact"
              aria-describedby="Contact"
              aria-label="Contact"
              v-model="LostFoundObj.contact"
            />
          </div>
          <div class="input-group">
            <label for="inputPetType" class="input-group" style="color:black;">
              Pet Type
            </label>
            <b-form-select
              id="inputPetType"
              v-model="LostFoundObj.petType"
              :options="petOptions"
            ></b-form-select>
          </div>
          <br />
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioLostPet"
              v-model="LostFoundObj.type"
              value="1"
            />
            <label
              class="form-check-label"
              for="flexRadioLostPet"
              style="color: black"
            >
              Lost Pet
            </label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioFoundPet"
              v-model="LostFoundObj.type"
              value="2"
              checked
            />
            <label
              class="form-check-label"
              for="flexRadioFoundPet"
              style="color: black"
            >
              Found Pet
            </label>
          </div>
          <br />
        </div>
      </div>
      <div class="button-group">
        <b-button class="mt-3" block @click="onCancelClick">Cancel</b-button>
        <b-button class="mt-3" block @click="onUpdateClick">Update</b-button>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: {
    LostFoundEditObj: {
      type: Object,
    },
    onUpdate: {
      type: Function,
    },
  },
  data() {
    return {
      LostFoundObj: {
        fee: null,
        desc: null,
        image: null,
        location: "",
        petType: "-",
      },
      imageFile: "",

      petOptions: [
        { text: "-", value: "-" },
        { text: "Dog", value: "Dog" },
        { text: "Cat", value: "Cat" },
        { text: "Other", value: "Other" },
      ],
    };
  },
  methods: {
    setObj(value) {
      this.LostFoundObj = value;
      this.$bvModal.show("bv-modal-example-lostfound");
    },
    onUpdateClick() {
      this.onUpdate(this.LostFoundObj);
      this.$bvModal.hide("bv-modal-example-lostfound");
    },
    onCancelClick() {
      this.$bvModal.hide("bv-modal-example-lostfound");
      this.$emit("updateEditObj");
    },
  },
  watch: {
    LostFoundEditObj(newVal, oldVal) {
      console.log(oldVal);
      newVal &&
        newVal.desc != null &&
        newVal.petType != "-" &&
        this.setObj(newVal);
    },
  },
};
</script>
<style scoped>
.padding {
  padding: 1em;
}
.margin {
  margin-top: 1em;
  margin-bottom: 1em;
}
.form-card {
  margin: 0 auto;
  text-align: center;
  position: relative;
  top: 10%;
  padding: 1em;
}
.button-group {
  display: flex;
  flex-direction: row;
}
.button-group > button {
  margin: 1em;
}
</style>
