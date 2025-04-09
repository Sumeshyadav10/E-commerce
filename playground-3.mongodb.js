/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use("E-mandi");

db.products.insertMany(products: [
    {
      name: "MYao Magnetic Wireless Power Bank, 15W Wireless Portable Phone Charger 10000mAh, 4 Output PD 20W",
      image: "https://s.alicdn.com/@sc04/kf/Hdcb7ea9a3c8b4767bc46f8fde3a99ad9u.png_300x300.png",
      brand: "Syska",
      category: "Electronics",
      description: "Good Product",
      price: 49.99,
      numReviews: 237,
      rating: 2,
      countInStock: 19,
      department: "67f5569824e7d6539652f2fc", // Syska
    },
    {
      name: "ADCB POW1 - Emergency USB Battery Powered Power Bank Compact Portable 4 AA Batteries Ideal",
      image: "https://gardibazar.com/wp-content/uploads/2019/04/full_1301-250x300.jpg",
      brand: "Syska",
      category: "Electronics",
      description: "Good Product",
      price: 24.99,
      numReviews: 68,
      rating: 5,
      countInStock: 0,
      department: "67f5569824e7d6539652f2fc", // Syska
    },
    {
      name: "mophie snap+ juice pack mini - Magnetic and portable wireless charger containing a 5,000mAh internal battery. - Black",
      image: "https://20fd661yccar325znz1e9bdl-wpengine.netdna-ssl.com/wp-content/uploads/2020/04/anker-20100mah-powercore-high-capacity-power-bank-power-bank-250x300.jpg",
      brand: "Syska",
      category: "Electronics",
      description: "Good Product",
      price: 18.56,
      numReviews: 492,
      rating: 4.5,
      countInStock: 25,
      department: "67f5569824e7d6539652f2fc", // Syska
    },
    {
      name: "Hermitshell Hard EVA Travel Case Fits Anker PowerCore 13000 Portable Charger - Compact 13000mAh",
      image: "https://images-eu.ssl-images-amazon.com/images/I/3173lBxbF3L._SX300_SY300_QL70_ML2_.jpg",
      brand: "Syska",
      category: "Electronics",
      description: "Good Product",
      price: 32.27,
      numReviews: 1354,
      rating: 3,
      countInStock: 12,
      department: "67f5569824e7d6539652f2fc", // Syska
    },
    {
      name: "Portable Bluetooth Speakers, IPX7 Waterproof Wireless Bluetooth Speaker, Outdoor Mini Speaker",
      image: "https://s.alicdn.com/@sc04/kf/Hdcb7ea9a3c8b4767bc46f8fde3a99ad9u.png_300x300.png",
      brand: "Syska",
      category: "Electronics",
      description: "Good Product",
      price: 149.98,
      numReviews: 674,
      rating: 3.5,
      countInStock: 5,
      department: "67f5569824e7d6539652f2fd", // Smartwatches
    },
    {
      name: "Sony SRS-XB13 Extra BASS Wireless Portable Compact Speaker IP67 Waterproof Bluetooth, Light Blue",
      image: "https://i.ebayimg.com/thumbs/images/g/FJcAAOSwRglhWFGi/s-l300.jpg",
      brand: "Syska",
      category: "Electronics",
      description: "Good Product",
      price: 312.95,
      numReviews: 4859,
      rating: 4.5,
      countInStock: 53,
      department: "67f5569824e7d6539652f2fd", // Smartwatches
    },
    {
      name: "New Bose SoundLink Flex Bluetooth Portable Speaker, Wireless Waterproof Speaker for Outdoor Travel - Black",
      image: "https://images-na.ssl-images-amazon.com/images/I/81WI54kMFoL.__AC_SX300_SY300_QL70_ML2_.jpg",
      brand: "Syska",
      category: "Electronics",
      description: "Good Product",
      price: 499.99,
      numReviews: 4,
      rating: 4,
      countInStock: 43,
      department: "67f5569824e7d6539652f2fe", // Laptops
    },
    {
      name: "JBL Flip 4, Black - Waterproof, Portable & Durable Bluetooth Speaker - Up to 12 Hours of Wireless Streaming",
      image: "https://www.cellcom.com/resources/phones/5706_JBL_Flip5_big.jpg",
      brand: "Syska",
      category: "Electronics",
      description: "Good Product",
      price: 278.99,
      numReviews: 912,
      rating: 5,
      countInStock: 34,
      department: "67f5569824e7d6539652f2fe", // Laptops
    },
  ];);