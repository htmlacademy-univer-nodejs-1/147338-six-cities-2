import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { getRandomItem, getRandomItems, generateRandomValue } from '../../helpers/index.js';
import {
  AMOUNT_OF_PLACE_IMAGES,
  AvailablePlaceRooms,
  OfferRatings,
  PlaceGuestsAmount,
  PlaceRentPrices
} from './const.js';


export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockData: MockServerData,
  ) { }

  public generate(): string {
    const name = getRandomItem(this.mockData.names);
    const description = getRandomItem(this.mockData.descriptions);
    const date = new Date().toISOString();
    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const placeImages = getRandomItems(this.mockData.placeImages, AMOUNT_OF_PLACE_IMAGES).join(';');
    const isPremium = Boolean(generateRandomValue(0, 1));
    const isFavorite = Boolean(generateRandomValue(0, 1));
    const rating = generateRandomValue(OfferRatings.Min, OfferRatings.Max);
    const placeType = getRandomItem(this.mockData.placesTypes);
    const roomsAmount = generateRandomValue(AvailablePlaceRooms.Min, AvailablePlaceRooms.Max);
    const guestsAmount = generateRandomValue(PlaceGuestsAmount.Min, PlaceGuestsAmount.Max);
    const price = generateRandomValue(PlaceRentPrices.Min, PlaceRentPrices.Max);
    const conveniences = getRandomItems(this.mockData.conveniences).join(';');
    const username = getRandomItem(this.mockData.usernames);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const password = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem(this.mockData.userTypes);
    const latitude = getRandomItem(this.mockData.coordinates);
    const longitude = getRandomItem(this.mockData.coordinates);

    return [
      name, description, date, city,
      previewImage, placeImages, isPremium,
      isFavorite, rating, placeType,
      roomsAmount, guestsAmount, price,
      conveniences, username, email,
      avatar, password, userType, latitude,
      longitude
    ].join('\t');
  }
}