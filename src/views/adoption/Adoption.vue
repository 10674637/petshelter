<template>
    <div>
        <div class="jumbotron custom-bg-dark">
            <h3>
                Please give us a call for adoption.
                <br>
                (801) 359-0990
            </h3>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">

            <div class="col" v-for="item in  AllAdoption" :key="item._id">
                <div class="card h-100">
                <div class="btn-group" role="group">
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
                    <i class="fa fa-trash"></i>
                    </button>
                    <!-- <button
                    v-show="
                    $store.state.isLoggedIn && item.author == $store.state.userId
                    "
                    type="button"
                    aria-label="Close"
                    class="close"
                    title="Update"
                    @click="onUpdate(item._id)"
                    >
                    <i class="fa fa-pencil-alt"></i>
                    </button> -->
                
                </div>
                
                
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
                    <p style="color: black">
                    Fee: <br />
                    {{ item.fee }}
                    </p>
                </div>
                
                </div>
        </div>





            
            <div v-if="$store.state.isLoggedIn" class="col">
                <form @submit.prevent="saveData" ref="Form">
                <div class="card h-100" >
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
                            style="color:black;"
                            >Upload Photo(s):
                        </label>

                        <input type="file" 
                            class="form-control" 
                            id="inputGroupFile" 
                            aria-describedby="inputGroupFile" 
                            aria-label="Upload"
                            ref="imageFile"
                        >

                    </div>
                    <br>
                    <div class="input-group">
                        <label 
                            for="inputGroupTextFile" 
                            class="input-group" 
                            style="color:black;">Add Description:
                        </label>

                        <textarea 
                            class="form-control" 
                            rows="5" 
                            id="inputGroupTextFile" 
                            aria-describedby="inputGroupTextFile" 
                            aria-label="Description"
                            v-model="AdoptionObj.desc">
                        </textarea>
                    </div>
                    <br>
                    <div class="input-group">
                        <label 
                            for="inputGroupTextFee" 
                            class="input-group" 
                            style="color:black;">
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
                        >
                    </div>
                    <br>
                    
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
                 </form>
            </div>
        </div>
    </div>
</template>
<script>
  import {createAdoption, getAllAdoption,deleteAdoptionById} from "../../services/AdoptionService";
  export default {
  name: "Adoption",
  data() {
      return {
    AllAdoption: [],   

      AdoptionObj: {
        fee: null,
        desc: null,
        image: null,
      },
      imageFile: "",
    };
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
    async getData() {
      let result = await getAllAdoption();
      if (result.status == 200) {
        this.AllAdoption = result.data.adoption;
      }
    },
    async saveData() {
      this.AdoptionObj.image = await this.toBase64(this.$refs.imageFile.files[0]);
      let result = await createAdoption(this.AdoptionObj);
      if (result.status == 200) {
        this.clearForm();
        alert(result.data.message);
      }
    },
    clearForm(){
      this.AdoptionObj.fee= null;
       this.AdoptionObj.desc= null;
       this.AdoptionObj.image= null;
      this.$refs.Form.reset();
    },
    async onUpdate(){

    },
    async onDelete(id) {
      let result = await deleteAdoptionById(id);
      console.log('I am here with delete results',result);
      if (result.status == 200) {
        alert(result.data.message);
        this.getData();
      }
    },
    
  },
   mounted() {
    this.getData();
  },

}
</script>
 

<style scoped>

.btn {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    width: 250px;
    border-radius: 12px;
}
.form-control{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
</style>