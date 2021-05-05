<template>
  <main>
    <div class="jumbotron custom-bg-dark">
      <div class="card bg-dark text-white">
        <img
          src="../assets/img1.jpg"
          class="card-img img-responsive"
          alt="..."
        />

        <div class="card-img-overlay">
          <h1 class="card-title" style="text-shadow:5px 5px 10px red">
            Did you know?
          </h1>
          <p
            class="card-text"
            style="font-size:15px; font-family: Verdana, serif;"
          >
            Every day, more than 1,700 dogs and cats are killed in our nation’s
            shelters because they don’t have safe places to call home. But
            people like you are changing that.
          </p>
        </div>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card h-100">
          <router-link to="/posts" class="nav-link" exact>
            <img
              src="../assets/SA_LifeLearn.jpg"
              class="card-img-top"
              alt="..."
            />

            <div class="card-body">
              <h5 class="card-title" style="color:black;">Lost & Found</h5>
              <p style="color:black; text-shadow: yellow">
                Click to view all found pets or Login to post a lost or found a
                pet.
              </p>
            </div>
          </router-link>
        </div>
      </div>

      <div class="col">
        <div class="card h-100">
          <router-link to="/donation" class="nav-link" exact>
            <img src="../assets/ShowImage.jpg" class="card-img-top" alt="..." />

            <div class="card-body">
              <h5 class="card-title" style="color:black;">Donation</h5>
              <p style="color:black;">Click to donate to our shelter.</p>
            </div>
          </router-link>
        </div>
      </div>

      <div class="col">
        <div class="card h-100">
          <router-link to="/adoption" class="nav-link" exact>
            <img src="../assets/cat2.jpg" class="card-img-top" alt="..." />

            <div class="card-body">
              <h5 class="card-title" style="color:black;">Adoption</h5>
              <p style="color:black;">
                Click to view all available pets for adoption. Please log in to
                send in your application or contact us via phone.
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <br />
    <div class="jumbotron custom-bg-dark">
      <img src="../assets/AdoptionCenter.jpg" class="card-img-top" alt="..." />
      <br />
      <h1 class="display-4">Contact Information</h1>
      <hr class="my-4" />
      <h3>
        Meet with the animals only by Appointment due to Covid-19.
      </h3>

      <p>
        Address:
        <br />
        200 Hope Avenue, Salt Lake City, Utah 84115.
        <br />
        Phone: (801) 359-0990
      </p>
    </div>
  </main>
</template>
