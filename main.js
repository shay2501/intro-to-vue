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
      { variantId: 2234, variantColor: 'green' },
      { variantId: 2235, variantColor: 'blue' }
    ],
    sizes: ['small', 'medium', 'large']
  }
});
