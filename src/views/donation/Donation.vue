<template>
<div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
        <div class=" jumbotron custom-bg-dark">
            <p>Click the button below to donate </p>
            <form action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="business" value="KCE85G2UQUY7J" />
                <input type="hidden" name="item_name" value="create a animal rescue web donation testing." />
                <input type="hidden" name="currency_code" value="USD" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="10" height="10" />
            </form>
        </div>
    </div>

    <div class="col">
        <div class="jumbotron custom-bg-dark">
        <h6>Scan the code below to donate</h6>
        <br>
        <img src="../../assets/QRCode.png" width="100" height="100" alt="...">
        </div>
    </div>

    
    <div class="col">
        <div class="jumbotron custom-bg-dark">
    
            <p>
                Every little help is greatly appreciated. Your donation is helping us taking care of unpotunate animal at the shelter.
            </p>
                
                <br>
                Share this link to help us raise donation: <a href="https://www.paypal.com/donate?business=KCE85G2UQUY7J&item_name=create+a+animal+rescue+web+donation+testing.&currency_code=USD"> Donation Link</a>
        </div>  
    </div> 

</div>
</template>
<style scoped>
div {
    max-width: 60rem;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    }
</style>