<template>
  <div>
    <!--start - lost found pet form modal -->
    <b-modal
      id="bv-modal-example-lostfound-add"
      no-close-on-backdrop
      hide-header-close
      hide-footer
    >
      <template #modal-title>
        Add Pet
      </template>
      <div v-if="$store.state.isLoggedIn" class="col">
        <form @submit.prevent="saveData" ref="Form">
          <div class="card h-100 padding">
            <div class="form-card">
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
                  >Contact Number</label
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
                <label
                  for="inputPetType"
                  class="input-group"
                  style="color:black;"
                >
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
            <div class="button-group">
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="inputGroupCancel"
                @click="$bvModal.hide('bv-modal-example-lostfound-add')"
              >
                Cancel
              </button>

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
    </b-modal>
    <!--end - lost found pet form modal -->
     
    <!-- start-Search components -->
    <div class="flex-container">
      <div>
        <Search
          :isLostFound="true"
          @change="onSearchClick($event)"
          style="width: 100%"
      />
      </div>
      <div v-if="$store.state.isLoggedIn">
        <b-button
          id="show-btn"
          @click="$bvModal.show('bv-modal-example-lostfound-add')"
          >Add Pet</b-button
        >
      </div>
    </div>
    <!-- end-Search components -->

    <!-- start - LostFound Edit modal -->
    <LostFoundEdit
      :LostFoundEditObj="LostFoundEditObj"
      :onUpdate="onUpdate"
      @updateEditObj="clearEditObj"
    />
    <!-- end- LostFound Edit modal -->
    

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col margin" v-for="item in AllPosts" :key="item._id">
        <div class="card h-100 padding">
          <span class="thedate">{{ convert(item.createdAt) }}</span>
          <div class="icon-button-group">
            <b-badge
              style="width: 50px;
            line-height: 2.5;
            color: darkred;
            background-color: transparent;
            border: 1px solid;"
              v-show="item.type == 1"
              >Lost
            </b-badge>
            <b-badge
              style="width: 50px;
            line-height: 2.5;
            color: forestgreen;
            background-color: transparent;
            border: 1px solid;"
              v-show="item.type == 2"
              >Found
            </b-badge>
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
            <p style="color: black">
              <strong>Description:</strong>
              {{ item.desc }}
            </p>
            <p style="color: black">
              <strong>Person Name: </strong>
              {{ item.personName }}
            </p>
            <p style="color: black">
              <strong>Contact: </strong>
              {{ item.contact }}
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
    </div>
    <!-- <div class="d-flex justify-content-center">
      <b-btn class="button" v-on:click="load()">More Results</b-btn>
    </div> -->
  </div>
</template>

<script>
import Search from "../../components/Search.vue";
import moment from "moment";
import { http } from '../../services/HttpService'
import LostFoundEdit from "../../components/LostFoundEdit.vue";
import {
  createLostFound,
  search,
  updateLostFound,
  deleteLostFound,
} from "../../services/LostFoundService";
import imageCompression from "browser-image-compression";
export default {
  name: "LostAndFound",
  data() {
    return {
      totalPages: 0,
      limit: 3,
      
      AllPosts: [],
      LostFoundObj: {
        type: 2,
        desc: null,
        image: null,
        petType: "-",
        personName: "",
        location: "",
        contact: "",
      },

      LostFoundEditObj: {
        type: 2,
        desc: null,
        image: null,
        petType: "-",
        personName: "",
        location: "",
        contact: "",
      },

      petOptions: [
        { text: "-", value: "-" },
        { text: "Dog", value: "Dog" },
        { text: "Cat", value: "Cat" },
        { text: "Other", value: "Other" },
      ],
      imageFile: "",
    };
  },
  components: {
    Search,
    LostFoundEdit,
  },
  created() {
    http().get("/lost-found/count").then(data => {
      console.log('what is data here',data)
          this.totalPages = data.data['count'] / this.limit;
           console.log('totalpage',this.totalPages)
    })
  },
  methods: {
     load() {
      //  console.log('what is in allposts', this.AllPosts)
      var page = this.AllPosts.length + 1
      console.log('how many pages',page)
      http().get(`/lost-found?page`+ page + "&limit=" + this.limit).then(data => {
        console.log('I am here testing',data.data)
          this.AllPosts = this.AllPosts.concat(data.data.lostFound);
      })
    },
    convert(uploadDate){
      return moment(uploadDate).format('MM/DD/YYYY HH:mm ')
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
    async saveData() {
      this.LostFoundObj.image = await this.toBase64(
        this.$refs.imageFile.files[0]
      );
      let result = await createLostFound(this.LostFoundObj);
      if (result.status == 200) {
        this.clearForm();
        alert(result.data.message);
        this.$bvModal.hide("bv-modal-example-lostfound-add");
        this.onSearchClick({
          petType: "-",
          search: "",
          isShowLost: true,
          isShowFound: true,
        });
      }
    },
    clearForm() {
      this.LostFoundObj.type = 2;
      this.LostFoundObj.desc = null;
      this.LostFoundObj.image = null;
      (this.LostFoundObj.petType = "-"),
        (this.LostFoundObj.personName = ""),
        (this.LostFoundObj.location = ""),
        (this.LostFoundObj.contact = ""),
        this.$refs.Form.reset();
    },
    async onSearchClick(value) {
      var type = [];
      if (value.isShowLost) type.push(1);
      if (value.isShowFound) type.push(2);

      var sortType = 1;
      if(value.sort == 'desc')
      {sortType = -1;}

      let obj = {
        petType: value.petType == "-" ? "" : value.petType,
        search: value.search,
        type: type,
        sort: sortType
      };
      console.log(obj);
      let result = await search(obj);
      if (result.status == 200) {
        this.AllPosts = result.data.lostFound;
      }
    },
    onEdit(LostFoundPost) {
      this.LostFoundEditObj = LostFoundPost;
    },
    async onUpdate(data) {
      let result = await updateLostFound(data);
      if (result.status == 200) {
        alert(result.data.message);
        this.onSearchClick({
          petType: "-",
          search: "",
          isShowLost: true,
          isShowFound: true,
        });
      }
      this.clearEditObj();
    },
    clearEditObj() {
      this.LostFoundEditObj = {
        type: 2,
        desc: null,
        image: null,
        petType: "-",
        personName: "",
        location: "",
        contact: "",
      };
    },
    async onDelete(id) {
      let result = await deleteLostFound(id);
      console.log("I am here with delete results", result);
      if (result.status == 200) {
        alert(result.data.message);
        this.onSearchClick({
          petType: "-",
          search: "",
          isShowLost: true,
          isShowFound: true,
        });
      }
    },
  },
  mounted() {
    this.onSearchClick({
      petType: "-",
      search: "",
      isShowLost: true,
      isShowFound: true,
    });
  },
};
</script>

 
