<template>
  <div>
    <div class="jumbotron custom-bg-dark">
      <h3>
        Please give us a call for vaccination information and other questions.
        <br />
        (801) 359-0990
      </h3>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card h-100">
          <img
            src="../../assets/foundDog2.jpg"
            class="card-img-top"
            alt="..."
          />

          <div class="card-body">
            <h3
              class="card-title"
              style="color: black; padding: 20px 38px 25px"
            >
              <router-link to="/AllFoundPet" class="nav-link" exact>
                See All Found Pets
              </router-link>
            </h3>
            <p style="color: black">
              <br />
              Please click this card to see all the found pets, <br />
              To report a pet you found, please login and upload a picture and
              description.
            </p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card h-100">
          <img src="../../assets/LostDog1.jpg" class="card-img-top" alt="..." />

          <div class="card-body">
            <h3
              class="card-title"
              style="color: black; padding: 20px 55px 25px"
            >
              <router-link to="/AllLostPet" class="nav-link" exact>
                See All Lost Pets
              </router-link>
            </h3>
            <p style="color: black">
              <br />
              Please click this card to see all the lost pets, <br />
              To report a pet you lost, please login and upload a picture and
              description.
            </p>
            >
          </div>
        </div>
      </div>

      <div v-if="$store.state.isLoggedIn" class="col">
        <form @submit.prevent="saveData" ref="Form">
          <div class="card h-100">
            <div
              style=
                "
                margin: 0 auto;
                text-align: center;
                position: relative;
                top: 10%;
                "
            >
              <div class="input-group">
                <label
                  for="inputGroupFile"
                  class="input-group"
                  style="color: black"
                  >Upload Photo(s):</label
                >
                <input
                  type="file"
                  class="form-control"
                  id="inputGroupFile"
                  aria-describedby="inputGroupFile"
                  aria-label="Upload"
                  ref="imageFile"
                />
              </div>
              <br />
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

              <button
                class="btn btn-outline-secondary"
                type="button"
                id="inputGroupSummit"
                @click="saveData"
              >
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <br />
    <div class="row">
      <AllFoundPet />
    </div>
    <br />
    <div class="row">
      <AllLostPet />
    </div>
  </div>
</template>

<script>
import AllFoundPet from "../postsLostAndFound/AllFoundPets.vue";
import AllLostPet from "../postsLostAndFound/AllLostPets.vue";
import { createLostFound } from "../../services/LostFoundService";
export default {
  name: "LostAndFound",
  data() {
    return {
      LostFoundObj: {
        type: 2,
        desc: null,
        image: null,
      },
      imageFile: "",
    };
  },
  components: {
    AllFoundPet,
    AllLostPet,
  },
  methods: {
    async toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    async saveData() {
      this.LostFoundObj.image = await this.toBase64(this.$refs.imageFile.files[0]);
      let result = await createLostFound(this.LostFoundObj);
      if (result.status == 200) {
        this.clearForm();
        alert(result.data.message);
      }
    },
    clearForm(){
      this.LostFoundObj.type= 2;
       this.LostFoundObj.desc= null;
       this.LostFoundObj.image= null;
      this.$refs.Form.reset();
    }
  },
};
</script>

<style scoped>
.card-title:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 100%;
  border-radius: 12px;
}
.btn {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 250px;
  border-radius: 12px;
}
.form-control {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

/* div {
    /* max-width: 100%; */
/* display: flex; */
/* flex-direction: row; */
/*   margin-left: auto;
    margin-right: auto;
    align-items: center;
    } */
</style>