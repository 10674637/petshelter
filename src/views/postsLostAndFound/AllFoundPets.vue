<template>
  <div>
    <div class="jumbotron custom-bg-dark">
      <h3>This is the list of all the pet were found recently.</h3>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="item in AllFound" :key="item._id">
        <div class="card h-100">
          <button
            v-show="
              $store.state.isLoggedIn && item.author == $store.state.userId
            "
            type="button"
            aria-label="Close"
            class="close"
            title="Delete"
            @click="onDelete(item._id)"
          >
            ×
          </button>
          <img
            v-show="item.image"
            :src="item.image"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <!-- <h5 class="card-title" style="color: black">Name: Benny</h5> -->
            <p style="color: black">
              Description: <br />
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>

      
    </div>
  </div>
</template>

<script>
import {
  getAllLostFound,
  deleteLostFound,
} from "./../../services/LostFoundService";
export default {
  name: "AllFoundPet",
  data() {
    return {
      AllFound: [],
    };
  },
  methods: {
    async getData() {
       
      // let result = await getAllLostFound(2);
      let result = await getAllLostFound(2,1,this.limit);
      if (result.status == 200) {
        this.AllFound = result.data.lostFound;
      }
    },
    async onDelete(id) {
      let result = await deleteLostFound(id);
      console.log(result);
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
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
  padding: 1.8rem;
  margin: -1rem -1rem -1rem auto;
}
</style>