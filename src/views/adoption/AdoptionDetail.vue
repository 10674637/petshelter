<template>
    <div class="container justify-content-center" v-if="this.adoptionDetail">
        <div class="row">
          <div class="col-6 card h-100 padding">
            <img :src="this.adoptionDetail.image" />
          </div>
          <div class="col-6 padding">
            <ul>
              <li class="item mb-4"> Description: 
                {{ this.adoptionDetail.desc }}
              </li>
              <li class="item mb-4"> Adoption Fee:
                {{ this.adoptionDetail.fee }}
              </li>
              <li class="item mb-4"> Pet Type:
                {{ this.adoptionDetail.petType }}
              </li>
              <li class="item mb-4"> Location:
                {{ this.adoptionDetail.location }}
              </li>
            </ul>

            <div class="d-flex justify-content-center">
              <router-link to="/adoption"  class="nav-link button col-4" exact>
                <b-btn>Go Back</b-btn>
              </router-link>
            </div>

          </div>
        </div>
    </div>
</template>
<script>

import { http } from '../../services/HttpService'
import { getAllAdoption } from "../../services/AdoptionService";
export default {
  name: "petDetail",
  components: {

  },
  data() {
    return {
      adoptionDetail: null,
        AllAdoption: [],
        imageFile: "",
        AdoptionObj: {
        fee: null,
        desc: null,
        image: null,
        location: "",
        petType: "-",
        uploadDate: ""
      },
    };
  },
  created() {
    http().get("/adoption/" + this.$route.params.id ).then(data => {
      console.log(data.data.adoption)
          this.adoptionDetail = data.data.adoption;
    })
  },
  methods: {
      async getData() {
      let result = await getAllAdoption(1, this.limit);
      if (result.status == 200) {
        this.AllAdoption = result.data.adoption;
      }
    },
  },
};
</script>
