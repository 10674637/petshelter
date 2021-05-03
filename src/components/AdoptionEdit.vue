<template>
    <div>
  <!-- <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">Open Modal</b-button> -->

  <b-modal id="bv-modal-example" hide-header-close no-close-on-backdrop hide-footer>
    <template #modal-title>
      Edit adoption post
    </template>    
               <div>
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
                    <div class="input-group">
                       <label 
                            for="inputLocation" 
                            class="input-group" 
                            style="color:black;">
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
                        >
                    </div>
                     <div class="input-group">
                        <label 
                            for="inputPetType" 
                            class="input-group" 
                            style="color:black;">
                            Pet Type:
                        </label>
                        <b-form-select id="inputPetType" v-model="AdoptionObj.petType" :options="petOptions"></b-form-select>                
                    </div>
                    <br>
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
    props:{
        adoptionEditObj:{
            type: Object
        },
        onUpdate:{
            type: Function
        }
    },
    data(){
        return{
            AdoptionObj: {
            fee: null,
            desc: null,
            image: null,
            location:"",
            petType:"-"      
            },
            imageFile: "",

              petOptions: [
                { text: '-', value: '-'  },
                { text: 'Dog', value: 'Dog'  },
                { text: 'Cat', value: 'Cat'  },
                { text: 'Other', value: 'Other'}
                ],   
    
        }
    },methods:{
        setObj(value){
            this.AdoptionObj=value;
             this.$bvModal.show('bv-modal-example');
        },
        onUpdateClick(){
            this.onUpdate(this.AdoptionObj);
            this.$bvModal.hide('bv-modal-example');
        },
        onCancelClick(){                    
            this.$bvModal.hide('bv-modal-example');
            this.$emit("updateEditObj");
        }
    },
    watch:{
        adoptionEditObj(newVal,oldVal){
            console.log(oldVal);
            newVal && newVal.fee!=null && newVal.petType!="-" && this.setObj(newVal);
            
        }
    }   

}
</script>
<style scoped>

.padding{
  padding:1em;
}
.margin{  
  margin-top: 1em;
  margin-bottom: 1em;
}
.form-card{
      margin: 0 auto; 
      text-align: center; 
      position: relative;
      top: 10%;
      padding:1em
}


.button-group{
  display: flex;
  flex-direction: row;
}

.button-group>button{
  margin: 1em;
}

</style>