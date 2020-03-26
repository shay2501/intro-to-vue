var app = new Vue({
  el: '#app',
  data: {
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
        variantQuantity: 0
      }
    ],
    sizes: ['small', 'medium', 'large'],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
      this.inventory -= 1;
      if (this.inventory == 0) this.inStock = false;
    },
    removeFromCart: function() {
      if (this.cart > 0) {
        this.cart -= 1;
        this.inventory += 1;
        this.inStock = true;
      }
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
    }
  }
});
