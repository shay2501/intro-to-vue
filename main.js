var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    description: 'product description',
    image: './assets/vmSocks-green-onWhite.jpg',
    link: 'http://www.shannonwhalen.com',
    inStock: true,
    inventory: 10,
    onSale: false,
    details: ['80% Cotton', '20% Polyester', 'Gender-neutral'],
    variants: [
      {
        variantId: 2234,
        variantColor: 'green',
        variantImage: './assets/vmSocks-green-onWhite.jpg'
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: './assets/vmSocks-blue-onWhite.jpg'
      }
    ],
    sizes: ['small', 'medium', 'large'],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    removeFromCart: function() {
      if (this.cart > 0) this.cart -= 1;
    },
    updateProduct: function(variantImage) {
      this.image = variantImage;
    }
  }
});
