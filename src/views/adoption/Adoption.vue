<template>
  <div>
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
            <div class="form-card-adoption">
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
          <span class="thedate">{{ convert(item.createdAt) }}</span>
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
          <!-- the onclick for the detail page  -->
          <img
            v-on:click="goto(item._id)"
            v-show="item.image"
            :src="item.image"
            class="card-img-top img-card"
            alt="..."
          />
          <hr />
          <div class="card-body">
            
            <p>
              <strong>Description:</strong>
              {{ item.desc }}
            </p>
            <p>
              <strong>Fee:</strong>
              {{ item.fee }}
            </p>
            <p>
              <strong>Pet Type:</strong>
              {{ item.petType }}
            </p>
            <p>
              <strong>Location:</strong>
              {{ item.location }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- start - Adoption Edit modal -->
    <AdoptionEdit
      :adoptionEditObj="EditObj"
      :onUpdate="onUpdate"
      @updateEditObj="clearEditObj"
    />
    <!-- end- Adoption Edit modal -->
    <div class="d-flex justify-content-center">
      <b-btn class="button" v-on:click="load()">More Results</b-btn>
    </div>
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
import moment from "moment";
import { http } from '../../services/HttpService'
export default {
  name: "Adoption",
  components: {
    Search,
    AdoptionEdit,
  },
  data() {
    return {
      totalPages: 0,
      limit: 20,
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
  created() {
    http().get("/adoption/count").then(data => {
      console.log(data)
          this.totalPages = data.data['count'] / this.limit;
          
    })
  },
  methods: {
    load() {
      var page = this.AllAdoption.length + 1
      console.log('this is page testing', page)
      http().get("/adoptions?page="+ page + "&limit=" + this.limit).then(data => {
        console.log('loggin the data',data.data.adoption)
            this.AllAdoption = this.AllAdoption.concat(data.data.adoption);
      })
    },
    goto(id) {
      console.log(id)
      this.$router.push('/adoption/' + id)
    },
    convert(uploadDate){
      return moment(uploadDate).format('MM/DD/YYYY HH:mm ')
    },
    async onSearchClick(value) {
       var sortType = 1;
      if(value.sort == 'desc')
       {sortType = -1;}

      let obj = {
        petType: value.petType == "-" ? "" : value.petType,
        search: value.search,
        sort: sortType
      };
      console.log(obj);
      let result = await search(obj);
      if (result.status == 200) {
        this.AllAdoption = result.data.adoption;
      }
    },
    async toBase64(file) {
      //file compression
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
      let result = await getAllAdoption(1, this.limit);
      if (result.status == 200) {
        this.AllAdoption = result.data.adoption;
      }
    },
    async saveData() {
      //getting image
      this.AdoptionObj.image = await this.toBase64(
        this.$refs.imageFile.files[0]
      );

      //Saving to database
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
 
