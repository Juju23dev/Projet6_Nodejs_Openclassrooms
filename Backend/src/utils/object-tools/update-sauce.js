import { typeVerificator } from './object-verifier.js';
import { sauceTypeSchema } from './type-checker/sauce-type-checker.js';

export const updateSauceFormat = (sauceObject) => {
  const { imgUrl, sauce } = sauceObject;
  const sauceDataObject = typeof(sauce) === 'string' 
    ? JSON.parse(sauce)
    : sauce;
  const isDataValid = typeVerificator(sauceTypeSchema, sauceDataObject);

  return isDataValid
  ? {
      name: sauceDataObject.name,
      manufacturer: sauceDataObject.manufacturer,
      description: sauceDataObject.description,
      heat: sauceDataObject.heat,
      userId: sauceDataObject.userId,
      mainPepper: sauceDataObject.mainPepper,
      imageUrl: imgUrl
    } 
  : false;
}
