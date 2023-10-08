import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import {
  Cities,
  Conveniences,
  Offer,
  PlacesTypes,
  UserTypes,
} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
    // console.log(this.rawData);
  }

  public toArray(): Offer[] {
    // this.rawData = readFileSync(this.filename, { encoding: "utf-8" });
    // const rData = this.rawData;
    // console.log(rData);
    if (!this.rawData) {
      throw new Error('File was not read');
    }
    // console.log(rData);
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
          name,
          description,
          date,
          city,
          previewImage,
          placeImages,
          isPremium,
          isFavorite,
          rating,
          type,
          roomsAmount,
          guestsAmount,
          price,
          conveniences,
          authorName,
          email,
          avatarUrl,
          password,
          userType,
          latitude,
          longitude,
        ]) => ({
          name,
          description,
          date,
          city: city as Cities,
          previewImage,
          placeImages: placeImages.split(';'),
          isPremium: Boolean(isPremium),
          isFavorite: Boolean(isFavorite),
          rating: Number(rating),
          type: type as PlacesTypes,
          roomsAmount: Number(roomsAmount),
          guestsAmount: Number(guestsAmount),
          price: Number(price),
          conveniences: conveniences.split(';') as Conveniences[],
          author: {
            name: authorName,
            email,
            avatarUrl,
            password,
            type: userType as UserTypes,
          },
          cityCoordinates: {
            latitude: Number(latitude),
            longitude: Number(longitude),
          },
        })
      );
  }
}
