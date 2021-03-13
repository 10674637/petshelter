<template>
  <main>
    <div class="jumbotron custom-bg-dark">

      <div class="card bg-dark text-white">
      <img src="../assets/img1.jpg" class="card-img img-responsive" alt="...">
      
      <div class="card-img-overlay">
        <h1 class="card-title" style="text-shadow:5px 5px 10px red">Did you know?</h1>
        <p class="card-text" style="font-size:15px; font-family: Verdana, serif;">Every day, more than 1,700 dogs and cats are killed in our nation’s shelters because they don’t have safe places to call home. But people like you are changing that.</p>
      </div>
    </div>
      <!-- <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="src/assets/cat.jpg" width="200px" height="430px" class="d-block w-100" alt="">
            <div class="carousel-caption d-none d-md-block">
              <h5>This will be the first message</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="src/assets/ausiedog.jpg" class="d-block w-100" alt="">
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="src/assets/pig.jpg" class="d-block w-100" alt="">
            <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel"  data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>

        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel"  data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>

    </div> -->

  </div>

  <div class="row row-cols-1 row-cols-md-3 g-4">

    <div class="col">
      <div class="card h-100">
        <img src="../assets/SA_LifeLearn.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title" style="color:black;" >Lost & Found</h5>
          <p style="color:black; text-shadow: yellow">Click to view all found pets or Login to post a lost or found a pet.</p>
        </div>
      </div>
    </div>

    <div class="col">
      <div class="card h-100">
        <img src="../assets/ShowImage.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title" style="color:black;" >Donation</h5>
          <p style="color:black;">Click to donate to our shelter.</p>
        </div>
      </div>
    </div>

    <div class="col">
      <div class="card h-100">
        <img src="../assets/cat2.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title" style="color:black;" >Adoption</h5>
          <p style="color:black;">Click to view all available pets for adoption. Please log in to send in your application or contact us via phone.</p>
        </div>
      </div>
    </div>

  </div>
<br>
  <div class="jumbotron custom-bg-dark">
    <h1 class="display-4">Contact Information</h1>
    <hr class="my-4">
    <p>
      Click below to begin managing task for users.
    </p>
    <router-link class="btn btn-sucess btn-lg" to="/tasks">
      Adoption
    </router-link>
  </div>

  

</main>
</template>