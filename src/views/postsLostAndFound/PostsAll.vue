<template>
    <div>
        <div class="jumbotron custom-bg-dark">
            <h3>
                Please give us a call for vaccination information and other questions.
                <br>
                (801) 359-0990
            </h3>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
                <div class="card h-100">                                            
                    <img src="../../assets/foundDog2.jpg" class="card-img-top" alt="...">
                    
                    <div class="card-body">
                    <h3 class="card-title" style="color:black; padding: 20px 38px 25px;" >
                        <router-link to="/AllFoundPet" class="nav-link" exact>
                            See All Found Pets
                        </router-link>
                        
                    </h3>
                    <p style="color:black"> 
                        <br> Please click this card to see all the found pets, 
                        <br> To report a pet you found, please login and upload a picture and description.
                    </p>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="card h-100">
                    <img src="../../assets/LostDog1.jpg" class="card-img-top" alt="...">
                    
                    <div class="card-body">
                    <h3 class="card-title" style="color:black; padding: 20px 55px 25px;">
                        <router-link to="/AllLostPet" class="nav-link" exact>
                            See All Lost Pets
                        </router-link>
                    </h3>
                    <p style="color:black"> 
                        <br> Please click this card to see all the lost pets, 
                        <br> To report a pet you lost, please login and upload a picture and description.
                    </p>>
                    </div>

                </div>
            </div>


            <div v-if="$store.state.isLoggedIn" class="col">
                <div class="card h-100" >
                    <div style="margin: 0 auto; text-align: center; position: relative;top: 10%;">
                        <div class="input-group">
                            <label for="inputGroupFile" class="input-group" style="color:black;">Upload Photo(s):</label>
                            <input type="file" class="form-control" id="inputGroupFile" aria-describedby="inputGroupFile" aria-label="Upload">
                        </div>
                        <br>
                        <div class="input-group">
                            <label for="inputGroupTextFile" class="input-group" style="color:black;">Add Description:</label>
                            <textarea class="form-control" rows="5" id="inputGroupTextFile" aria-describedby="inputGroupTextFile" aria-label="Description"></textarea>
                        </div>
                        <br>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioLostPet">
                            <label class="form-check-label" for="flexRadioLostPet" style="color:black;">
                                Lost Pet
                            </label>
                            </div>

                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioFoundPet" checked>
                            <label class="form-check-label" for="flexRadioFoundPet" style="color:black;">
                                Found Pet
                            </label>
                        </div>
                    <br>                    
                    <button class="btn btn-outline-secondary" type="button" id="inputGroupSummit">Upload</button>
                    </div>
                </div>
            </div>           
        </div>

        <br>
        <div class="row">           
        <AllFoundPet/>         
        </div>
        <br>
        <div class="row">           
        <AllLostPet/>         
        </div>

    </div>
</template>

<script>
import AllFoundPet from '../postsLostAndFound/AllFoundPets.vue'
import AllLostPet from '../postsLostAndFound/AllLostPets.vue'
export default {
    name: 'LostAndFound',
    components: {
      AllFoundPet,
      AllLostPet,
      
    },
    // methods: {
    //     logout: function() {
    //         auth.logout();
    //         this.$router.push({name: 'home'});
    //     }
    // }
}
</script>

<style scoped>
.card-title:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    width: 100%;
    border-radius: 12px;
    
}
.btn {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    width: 250px;
    border-radius: 12px;
}
.form-control{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
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