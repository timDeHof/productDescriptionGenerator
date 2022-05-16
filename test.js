function generateDescription(product) {
  const capitalizedProduct = product.split(" ");
  console.log("capitalizedProduct:", capitalizedProduct);
  console.log("capitalizedProduct[0][0]:", capitalizedProduct[0][0]);
  for (let i = 0; i < capitalizedProduct.length; i++) {
    capitalizedProduct[i] =
      capitalizedProduct[i][0].toUpperCase() + capitalizedProduct[i].substr(1);
  }

  return capitalizedProduct.join(" ").toString();
}
let product = "samsung galaxy s10";
console.log(generateDescription(product));
