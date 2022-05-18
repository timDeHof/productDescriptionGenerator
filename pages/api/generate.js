const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env["OPENAI_API_KEY"],
});
const openai = new OpenAIApi(configuration);
export default async function (req, res) {
  const response = await openai.createCompletion("text-curie-001", {
    prompt: generateDescription(req.body.product),
    temperature: 0.8,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.status(200).json({ result: response.data.choices[0].text });
}

function generateDescription(product) {
  const capitalizedProduct = product.split(" ");
  for (let i = 0; i < capitalizedProduct.length; i++) {
    capitalizedProduct[i] =
      capitalizedProduct[i][0].toUpperCase() + capitalizedProduct[i].substr(1);
  }
  let newCapitalizedProduct = capitalizedProduct.join(" ").toString();

  return `Generate a product description explanation for the following product:
    
    Product: Samsung Galaxy S22
    Description: Samsung Galaxy S22 is a smart phone that has a 5.2" HD Super AMOLED display, a Qualcomm Snapdragon 820 processor, 4GB of RAM, and 64GB of storage. It also has a 12MP rear camera and an 8MP front-facing camera.

    Product: Nintendo Switch
    Description: 
    The Nintendo Switch is a game console that allows gamers to enjoy their favorite games wherever they are. The system features a 6.2-inch screen and can be connected to the internet so users can download games, add new friends, and compete in online tournaments. The Nintendo Switch also has a built-in NFC reader/writer so players can download amiibo figures and use them in games.

    Product: ${newCapitalizedProduct}
    Description:`;
}
