/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import H2 from '../../components/styled/H2';

// const product = [{
//   "Parentage": 2,
//   "Id": "793283089106",
//   "IdType": "UPC",
//   "PackageQuantity": 1,
//   "Length": 3.0,
//   "LengthUnits": "Inches",
//   "Width": 3.0,
//   "WidthUnits": null,
//   "Height": 0.0,
//   "HeightUnits": null,
//   "Weight": 0.0,
//   "WeightUnits": "Ounces",
//   "Price": 9.99,
//   "ShippingFee": 4.75,
//   "Keywords": ["addicting home-made ", "exotic mini condiment", "mild red dip chile wing", "prime top popular chilli"],
//   "HashKey": "RU-6BD2F674",
//   "RangeKey": "3A3E5896-170112",
//   "RuahId": "RU-6BD2F674-3A3E5896-170112",
//   "SKU": "793283089106",
//   "SupplierId": "chili_beak",
//   "ManufacturerName": "Chili Beak",
//   "Name": "Chili Beak Hot Chili Oil Roasted Original Blend With Chili Flakes 6 oz - The Best Chili Sauce You Will Ever Taste",
//   "Brand": "Chili Beak",
//   "Description": "<b> Chili Beak was founded out of a love for spicy foods and a desire to have a non-vinegar based hot sauce alternative. Our products are built on quality, taste and versatility. Well balanced in flavor and heat.</b> <br><br> This original blend has a smooth smokey flavor with rich roasted pepper notes and a medium heat. It is a remarkable alternative to hot sauce and adds distinctive flavor to soups, mayonnaise, pastas and more. This smoky and spicy chilli oil is extremely versatile, as proven by one of our customers: <br><br> <em>”This is my favorite chili sauce product I have ever tried. I use it on everything, from omelets, fresh salsa, and stirfry to spiced brownies, chocolate sauce, and salad dressing. Chili Beak is a very versatile sauce. It lends excellent flavor to numerous types of dishes. I add it to pizza sauce, Indian and Thai curries, and of course burritos! You can taste the quality of the ingredients. I have found the flavor from jar to jar to be consistent, which speaks highly of the preparation and love which goes into the making of this sauce.I re-use the glass jars for glaze and stain containers (I'm a potter). My friends have used them for displaying candles, Q-tips, and paints. All over, a great product. If you haven't tried it yet, please treat yourself!” – Amanda Barker</em> <br><br> <b>You and your family will surely enjoy this excellent product:</b> <br> <ul> <li> Hand-roasted and made of all natural ingredients such as Mexican chillies, sunflower, sesame oils, garlic, Utah’s Real Salt and spices. <li> Less acidic since it does not contain vinegar and tomato, allowing consumers to enjoy the nuanced flavors of the roasted chile de arbol. <li> Try it on popcorn, olives and Laziz hummus for a satisfying treat! </ul> <b>In addition to its distinctive flavour, Chili Beak’s Spicy Roasted Chili Oil Original Blend is both vegan and gluten free. Indulge as many as you want without worrying about health implications.</b>",
//   "Bullets": ["HANDCRAFTED HOT CHILI OIL: Batches of Mexican chillies and spices are hand-roasted before blending them with sunflower and sesame oils and finishing with a touch of garlic and Utah’s Real Salt.", "EXCELLENT SPICY FOOD CONDIMENT: This American-style chili oil has a wonderful roasted pepper flavor and smooth smoky notes that adds distinctive flavor to soups, mayonnaise, pastas and more.", "LESS ACIDIC COMPARED TO OTHERS: No ginger or sugar is used and unlike in hot sauces or salsas, there is also no vinegar or tomato added on this chili paste. This makes the medium-heat condiment less abrasive and less acidic.", "VEGAN AND GLUTEN FREE: It is made of all-natural, high quality ingredients and is gluten free. This is a perfect addition on the diet of the vegetarians and health conscious.", "EXTREMELY VERSATILE: The chili oil is great as a topping on pizza, popcorn, eggs and quesadillas. Or you can use it as a mix in ranch, mayo and sour cream to dip your veggie sticks or even to marinade meats."],
//   "Type": "Food",
//   "TypeKeyword": null,
//   "BrowseNode": "6502777011",
//   "TaxCategory": "A_FOOD_GEN",
//   "MainImageUri": "http://teamruah.com/product_images/chili_beak/main_image.jpg",
//   "AltImageUris": ["http://teamruah.com/product_images/chili_beak/alt_image_1.jpg", "http://teamruah.com/product_images/chili_beak/alt_image_2.jpg"],
//   "Created": "2017-01-11T20:56:26-07:00",
//   "Updated": "0001-01-01T00:00:00",
//   "Version": null
// }];

export const HomePage = () => (
  <article>
    <Helmet
      title="Home"
      meta={[
        { name: 'description', content: 'Ruah Home Page' },
      ]}
    />
    <H2>Home</H2>
  </article>
);

HomePage.propTypes = {};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
