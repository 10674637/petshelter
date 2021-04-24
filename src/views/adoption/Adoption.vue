<template>
  <div>
    <div class="jumbotron custom-bg-dark">
      <h3>
        Please give us a call for adoption.
        <br />
        (801) 359-0990
      </h3>
    </div>

    <!--start - lost found pet form modal -->
    <b-modal
      id="bv-modal-example-adoption-add"
      no-close-on-backdrop
      hide-header-close
      hide-footer
    >
      <template #modal-title> Add Pet </template>
      <div v-if="$store.state.isLoggedIn" class="col margin">
        <form @submit.prevent="saveData" ref="Form">
          <div class="card h-100">
            <div class="form-card">
              <div class="input-group">
                <label
                  for="inputGroupFile"
                  class="input-group"
                  style="color: black"
                  >Upload Photo(s):
                </label>

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
                  >Add Description:
                </label>

                <textarea
                  class="form-control"
                  rows="5"
                  id="inputGroupTextFile"
                  aria-describedby="inputGroupTextFile"
                  aria-label="Description"
                  v-model="AdoptionObj.desc"
                >
                </textarea>
              </div>
              <br />
              <div class="input-group">
                <label
                  for="inputGroupTextFee"
                  class="input-group"
                  style="color: black"
                >
                  Adoption fee:
                </label>
                <input
                  type="text"
                  placeholder="$"
                  class="form-control"
                  id="inputGroupTextFee"
                  aria-describedby="inputGroupTextFee"
                  aria-label="Fee"
                  v-model="AdoptionObj.fee"
                />
              </div>
              <div class="input-group">
                <label
                  for="inputLocation"
                  class="input-group"
                  style="color: black"
                >
                  Location (city):
                </label>
                <input
                  type="text"
                  placeholder="location"
                  class="form-control"
                  id="inputLocation"
                  aria-describedby="location"
                  aria-label="Location"
                  v-model="AdoptionObj.location"
                />
              </div>
              <div class="input-group">
                <label
                  for="inputPetType"
                  class="input-group"
                  style="color: black"
                >
                  Pet Type:
                </label>
                <b-form-select
                  id="inputPetType"
                  v-model="AdoptionObj.petType"
                  :options="petOptions"
                ></b-form-select>
              </div>
              <br />

              <div class="button-group">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="inputGroupCancel"
                  @click="$bvModal.hide('bv-modal-example-adoption-add')"
                >
                  Cancel
                </button>

                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="adopInputGroupSummit"
                  @click="saveData"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </b-modal>
    <!--end - lost found pet form modal -->

    <!-- start-Search components -->
    <div class="flex-container">
      <div>
        <Search
          :isLostFound="false"
          @change="onSearchClick($event)"
          style="width: 100%"
        />
      </div>
      <div v-if="$store.state.role == 'admin'">
        <b-button
          id="show-btn"
          @click="$bvModal.show('bv-modal-example-adoption-add')"
          >Add Pet</b-button
        >
      </div>
    </div>
    <!-- end-Search components -->

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col margin" v-for="item in AllAdoption" :key="item._id">
        <div class="card h-100 padding">
          <div class="icon-button-group">
            <button
              v-show="
                $store.state.isLoggedIn &&
                (item.author == $store.state.userId ||
                  $store.state.role == 'admin')
              "
              type="button"
              aria-label="Edit"
              class="close"
              title="Edit"
              @click="onEdit(item)"
            >
              <i class="fa fa-edit fa-xs"></i>
            </button>
            <button
              v-show="
                $store.state.isLoggedIn &&
                (item.author == $store.state.userId ||
                  $store.state.role == 'admin')
              "
              type="button"
              aria-label="Close"
              class="close"
              title="Delete"
              @click="onDelete(item._id)"
            >
              <i class="fa fa-trash fa-xs"></i>
            </button>
          </div>
          <hr />
          <img
            v-show="item.image"
            :src="item.image"
            class="card-img-top img-card"
            alt="..."
          />
          <hr />
          <div class="card-body">
            <!-- <h5 class="card-title" style="color: black">Name: Benny</h5> -->
            <p style="color: black">
              <strong>Description:</strong>
              {{ item.desc }}
            </p>
            <p style="color: black">
              <strong>Fee:</strong>
              {{ item.fee }}
            </p>
            <p style="color: black">
              <strong>Pet Type:</strong>
              {{ item.petType }}
            </p>
            <p style="color: black">
              <strong>Location:</strong>
              {{ item.location }}
            </p>
          </div>
        </div>
      </div>

      <!-- Need to figure a way of telling if the card is a 4th card we need another row
         to create the space between the first and second row. -->
    </div>
    <!-- start - Adoption Edit modal -->
    <AdoptionEdit
      :adoptionEditObj="EditObj"
      :onUpdate="onUpdate"
      @updateEditObj="clearEditObj"
    />
    <!-- end- Adoption Edit modal -->
  </div>
</template>

<script>
import {
  createAdoption,
  getAllAdoption,
  deleteAdoptionById,
  search,
  updateAdoption,
} from "../../services/AdoptionService";
import Search from "../../components/Search.vue";
import AdoptionEdit from "../../components/AdoptionEdit";
import imageCompression from "browser-image-compression";
export default {
  name: "Adoption",
  components: {
    Search,
    AdoptionEdit,
  },
  data() {
    return {
      AllAdoption: [],
      petOptions: [
        { text: "-", value: "-" },
        { text: "Dog", value: "Dog" },
        { text: "Cat", value: "Cat" },
        { text: "Other", value: "Other" },
      ],

      AdoptionObj: {
        fee: null,
        desc: null,
        image: null,
        location: "",
        petType: "-",
      },
      imageFile: "",

      EditObj: {
        fee: null,
        desc: null,
        image: null,
        location: "",
        petType: "-",
      },
    };
  },
  methods: {
    async onSearchClick(value) {
      let obj = {
        petType: value.petType == "-" ? "" : value.petType,
        location: value.location,
      };
      console.log(obj);
      let result = await search(obj);
      if (result.status == 200) {
        this.AllAdoption = result.data.adoption;
      }
    },
    async toBase64(file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    async getData() {
      let result = await getAllAdoption();
      if (result.status == 200) {
        this.AllAdoption = result.data.adoption;
      }
    },
    async saveData() {
      this.AdoptionObj.image = await this.toBase64(
        this.$refs.imageFile.files[0]
      );
      let result = await createAdoption(this.AdoptionObj);
      if (result.status == 200) {
        this.clearForm();
        alert(result.data.message);
        this.getData();
        this.$bvModal.hide("bv-modal-example-adoption-add");
      }
    },
    clearForm() {
      this.AdoptionObj.fee = null;
      this.AdoptionObj.desc = null;
      this.AdoptionObj.image = null;
      this.$refs.Form.reset();
    },
    onEdit(adoptionPost) {
      this.EditObj = adoptionPost;
    },
    async onUpdate(data) {
      let result = await updateAdoption(data);
      if (result.status == 200) {
        alert(result.data.message);
        this.getData();
      }
      this.clearEditObj();
    },
    clearEditObj() {
      this.EditObj = {
        fee: null,
        desc: null,
        image: null,
        location: "",
        petType: "-",
      };
    },
    async onDelete(id) {
      let result = await deleteAdoptionById(id);
      console.log("I am here with delete results", result);
      if (result.status == 200) {
        alert(result.data.message);
        this.getData();
      }
    },
  },
  mounted() {
    this.getData();
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

.btn {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 250px;
  border-radius: 12px;
}
.form-control {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.close {
  float: right;
  /* font-size: 1.5rem;
  font-weight: 700; */
  /* line-height: 1; */
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
  /* padding: 1em; */
  /* margin: -1rem -1rem -1rem auto; */
}
button-group {
  display: flex;
  flex-direction: row;
}

.icon-button-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.icon-button-group > button {
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
}
.icon-button-group > button > i {
  color: #6c757d !important;
}
.button-group > button {
  margin: 1em;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
}
</style>