<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top custom-bg-dark">
            <router-link to="/" class="navbar-brand">
                <img style="max-height:50px;"
                src="../assets/logoanimal.png"/>Utah Animal Shelter
            </router-link>

            <button class="navbar-toggler" 
            type="button" data-toggle="collapse" 
            data-target="#navbarCollapse" 
            aria-controls="navbarCollapse"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" exact>
                            Home
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/adoption" class="nav-link" exact>
                            Adoption
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/donation" class="nav-link" exact>
                            Donation
                    </router-link>
                </li>

                <li v-if="$store.state.isLoggedIn" class="nav-item">
                    <router-link to="/posts" class="nav-link" exact>
                            Tasks
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/posts" class="nav-link" exact>
                            Lost & Found
                    </router-link>
                </li>

                <li v-if="!$store.state.isLoggedIn" class="nav-item">
                    <router-link to="/register" class="nav-link" exact>
                            Register
                    </router-link>
                </li>

                <li v-if="!$store.state.isLoggedIn" class="nav-item">
                    <router-link to="/login" class="nav-link" exact>
                            Login
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/contact" class="nav-link" exact>
                            Contact
                    </router-link>
                </li>
                
                <li v-if="$store.state.isLoggedIn" class="nav-item">
                    <a @click.prevent="logout()" class="nav-link" href="#">
                            Logout
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#">
                            {{this.$store.state.username ? this.$store.state.username: 'User'}}

                    </a>
                </li>

            </ul>

            </div>
        </nav>
    </header>
</template>

<script>
// import * as auth from '../services/AuthService'

export default {
    name: 'Navbar',
    methods: {
        logout: function() {
            // auth.logout();
            this.$router.push({name: 'Home'});
        }
    }
}
</script>
