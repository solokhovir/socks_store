Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
  <div class="product">
  <!--<h1 style="text-align: center; margin: 0; padding-top: 10px">Socks Store</h1>-->
    <div class="product" style="padding-top: 0">
        <div class="product-image">
            <img v-bind:src="image" v-bind:alt="altText"/>
        </div>
        <div class="product-info">
            <h2>{{ title }}</h2>
            <a v-bind:href="link" target="_blank">More products like this</a>

            <!------v-if---v-else----->
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>

            <p v-if="onSale">On sale!</p>
            <p v-else>Not on sale!</p>
            <!------------>
            <p>Shipping: {{ shipping }}</p>
            <!--<p v-if="inventory > 10">In stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else :class="{ outOfStock: !inStock }">Out of stock</p>-->
            <!--<span v-if="onSale">On Sale!</span>-->
            
            <p>Consist:</p>
            <product-details :details="details"></product-details>
            
            <ul>
                <p>Sizes:</p>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>
            <p>Point to change color:</p>
            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            >
            </div>
            <div class="cart" style="background-color: #1E95EA">
                <p>Cart({{ cart }})</p>
            </div>
            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Add to cart</button>
            <button v-on:click="removeFromCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Remove</button>



            <!------v-show------>
            <!--<p v-show="inStock">In Stock</p>-->
            <!------------>
        </div>
    </div>
  </div>
  `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            selectedVariantSale: 0,
            altText: "A pair of socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            //inStock: true,
            inventory: 100,
            //onSale: true,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: 'vmSocks_green.jpg',
                    variantQuantity: 10,
                    variantOnSale: true,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: 'vmSocks_blue.jpg',
                    variantQuantity: 0,
                    variantOnSale: false,
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeFromCart() {
            if ( this.cart > 0){
                this.cart -= 1
            }
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
                //return this.variants[this.selectedVariantSale].onSale;
            }
            return  this.brand + ' ' + this.product + ' are not on sale'
            //return this.variants[this.selectedVariantSale].onSale;
        },
        onSale(){
            return this.variants[this.selectedVariant].variantOnSale;
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },
    }
})

var app = new Vue ({
    el: '#app',
    data: {
        premium: false
    }
})

