Vue.config.devtools = true;
//@review-submitted="addReview"
var eventBus = new Vue();

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Array,
      required: true
    }
  },
  template: `<div class="product">
  <div class="prodcut-image">
    <img v-bind:src="image" style="width:200px" />
  </div>
  <div class="product-info">
    <h1>{{ title }}</h1>
    <a :href="link">{{ link }}</a>
    <p v-if="inStock > 10">In Stock</p>
    <p v-else-if="inStock <= 10 && inStock > 0">Almost out!</p>
    <p v-else :class="{strikethrough: !inStock }">Out of Stock</p>
    <span v-if="onSale==true && inventory > 0">On Sale!</span>
    <p>{{ sale}}</p>
    <p>Shipping: {{shipping}}</p>
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
    <div
      v-for="(variant, index) in variants"
      :key="variant.variantId"
      class="color-box"
      :style="{backgroundColor: variant.variantColor}"
      @mouseover="updateProduct(index)"
    ></div>
    <h5>Sizes Available</h5>
    <ul>
      <li v-for="size in sizes">{{ size }}</li>
    </ul>

    <button
      v-on:click="addToCart"
      :disabled="!inStock"
      :class="{ disabledButton: !inStock }"
    >
      Add to Cart
    </button>
    <button
      v-on:click="removeFromCart"
      :disabled="cart.length == 0"
      :class="{ disabledButton: cart.length == 0 }"
    >
      Remove item
    </button>

    <product-tabs :reviews="reviews" :details="details" :shipping="shipping"></product-tabs>

  
  </div>
</div>`,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      selectedVariant: 0,
      description: 'product description',
      link: 'http://www.shannonwhalen.com',
      inventory: 15,
      onSale: false,
      details: ['80% Cotton', '20% Polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: './assets/vmSocks-green-onWhite.jpg',
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: './assets/vmSocks-blue-onWhite.jpg',
          variantQuantity: 20
        }
      ],
      sizes: ['small', 'medium', 'large'],
      reviews: []
    };
  },
  methods: {
    addToCart: function() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
      this.inventory -= 1;
      if (this.inventory == 0) this.inStock = false;
    },
    removeFromCart: function() {
      this.$emit(
        'remove-from-cart',
        this.variants[this.selectedVariant].variantId
      );

      this.inventory += 1;
      this.inStock = true;
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    sale() {
      return this.onSale
        ? this.brand + ' ' + this.product + ' are on SALE!'
        : '';
    },
    shipping() {
      return this.premium ? 'Free' : '2.99';
    }
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview);
    });
  }
});

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    },
    template: `<ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>`
  }
});

Vue.component('product-review', {
  template: `<form class="review-form" @submit.prevent="onSubmit">
  <p v-if="errors.length">
  <b>Please correct the following error(s):</b>
    <ul>
    <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>

  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>
  </p>
  
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>

  <p>
    Would you recommend this product?<br/>
    <label for="Yes">Yes
    <input type="radio" id="Yes" value="Yes" v-model="recommendation">
    </label>
    <label for="No">No
    <input type="radio" id="No" value="No" v-model="recommendation">
    </label>
    
  </p>
      
  <p>
    <input type="submit" value="Submit">  
  </p>    

</form>`,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommendation: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating && this.recommendation) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommendation: this.recommendation
        };
        eventBus.$emit('review-submitted', productReview);
        this.rating = this.name = this.review = this.recommendation = null;
      } else {
        if (!this.name) this.errors.push('Name required.');
        if (!this.review) this.errors.push('Review required.');
        if (!this.rating) this.errors.push('Rating required.');
        if (!this.recommendation) this.errors.push('Recommendation required.');
      }
    }
  }
});

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true
    },
    details: {
      type: Array,
      required: true
    },
    shipping: {
      type: String,
      required: true
    }
  },
  template: `<div>
    <span class="tab" v-for="(tab,index) in tabs" 
    :class="{activeTab: selectedTab ===  tab}"
    :key="index"
    @click="selectedTab = tab">
    {{ tab }}</span>

    <div v-show="selectedTab === 'Reviews'">
    <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul>
        <li v-for="(review, index) in reviews" :key="index">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
        </li>
      </ul>
    </div>
    <product-review v-show="selectedTab === 'Make a Review'"></product-review>
    <div v-show="selectedTab === 'Shipping'">
      <p>Shipping: {{ shipping }}</p>
    </div>
    <div v-show="selectedTab === 'Details'">
    <ul>
        <li v-for="(detail, index) in details" :key="index">
          <p>{{ detail }}</p>
        </li>
      </ul>
    </div>
  </div>`,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
      selectedTab: 'Reviews'
    };
  }
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeFromCart(id) {
      if (this.cart.includes(id)) {
        this.cart.splice(this.cart.indexOf(id), 1);
      }
    }
  }
});
