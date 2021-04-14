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

      <!-- <div class="col">
                <div class="card h-100">                                            
                    <img src="../../assets/foundDog1.jpg" class="card-img-top" alt="...">
                    
                    <div class="card-body">
                    <h5 class="card-title" style="color:black;">Name: Unknown</h5>
                    <p style="color:black">Description: 
                        <br> Male Aussie Dog, collar has no tag. Found at Dry Creek                     
                    </p>
                    </div>
                </div>
            </div> -->

      <!-- <div class="col">
                <div class="card h-100">
                    <img src="../../assets/pig.jpg" class="card-img-top" alt="...">
                    
                    <div class="card-body">
                    <h5 class="card-title" style="color:black;" >Name: Donald</h5>
                    <p style="color:black">Description: 
                        <br> pot belly pig, she is 1 year old.
                        <br> Adoption fee: $150
                    </p>>
                    </div>

                </div>
            </div> -->

      <!-- <div class="col">
                <div class="card h-100">
                    <img src="../../assets/1915.jpg" class="card-img-top" alt="...">

                    <div class="card-body">
                    <h5 class="card-title" style="color:black;" >Toby</h5>
                    <p style="color:black">Description: 
                        <br> Basset Hound mixed dog, he is 7 months.
                        <br> Adoption fee: $250
                    </p>
                    </div>
                </div>
            </div> -->

      <!-- <div v-if="$store.state.isLoggedIn" class="col">
        <div class="card h-100">
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
              ></textarea>
            </div>
            <br />
            <div class="input-group">
              <label
                for="inputGroupTextFee"
                class="input-group"
                style="color: black"
                >Adoption fee:</label
              >
              <input
                type="text"
                placeholder="$"
                class="form-control"
                id="inputGroupTextFee"
                aria-describedby="inputGroupTextFee"
                aria-label="Fee"
              />
            </div>
            <br />

            <button
              class="btn btn-outline-secondary"
              type="button"
              id="inputGroupSummit"
            >
              Upload
            </button>
          </div>
        </div>
      </div> -->
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
      let result = await getAllLostFound(2);
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