import { Type } from 'class-transformer';
import {
  ArrayMaxSize, ArrayMinSize, ArrayNotEmpty,
  IsArray, IsBoolean, IsDateString, IsEnum,
  IsInt, IsMongoId, IsOptional, Length, Max, MaxLength, Min,
  ValidateNested
} from 'class-validator';

import { Cities, Conveniences, PlacesTypes } from '../../../types/index.js';
import { OFFER_CONSTANT_VALUES } from '../offer.constant.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { OfferCoordinatesDto } from './offer-coordinates.dto.js';

export class UpdateOfferDto {
  @IsOptional()
  @Length(OFFER_CONSTANT_VALUES.Name.minLength, OFFER_CONSTANT_VALUES.Name.maxLength, { message: CreateOfferValidationMessage.name.lengthField })
  public name: string;

  @IsOptional()
  @Length(OFFER_CONSTANT_VALUES.Description.minLength, OFFER_CONSTANT_VALUES.Description.maxLength, { message: CreateOfferValidationMessage.description.lengthField })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate?: string;

  @IsOptional()
  @IsEnum(Cities, { message: CreateOfferValidationMessage.city.invalid })
  public city?: Cities;

  @IsOptional()
  @MaxLength(OFFER_CONSTANT_VALUES.PreviewImage.maxLength, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage?: string;

  @IsOptional()
  @ArrayMaxSize(OFFER_CONSTANT_VALUES.PlaceImages.imagesCount, { message: CreateOfferValidationMessage.placeImages.invalidCount })
  @ArrayMinSize(OFFER_CONSTANT_VALUES.PlaceImages.imagesCount, { message: CreateOfferValidationMessage.placeImages.invalidCount })
  public placeImages?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({ message: CreateOfferValidationMessage.isFavorite.invalidFormat })
  public isFavorite?: boolean;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.rating.invalidFormat })
  @Min(OFFER_CONSTANT_VALUES.Rating.minValue, { message: CreateOfferValidationMessage.rating.minValue })
  @Max(OFFER_CONSTANT_VALUES.Rating.maxValue, { message: CreateOfferValidationMessage.rating.maxValue })
  public rating?: number;

  @IsOptional()
  @IsEnum(PlacesTypes, { message: CreateOfferValidationMessage.type.invalid })
  public type?: PlacesTypes;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.roomsAmount.invalidFormat })
  @Min(OFFER_CONSTANT_VALUES.RoomsAmount.minValue, { message: CreateOfferValidationMessage.roomsAmount.minValue })
  @Max(OFFER_CONSTANT_VALUES.RoomsAmount.maxValue, { message: CreateOfferValidationMessage.roomsAmount.maxValue })
  public roomsAmount?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.guestsAmount.invalidFormat })
  @Min(OFFER_CONSTANT_VALUES.GuestsAmount.minValue, { message: CreateOfferValidationMessage.guestsAmount.minValue })
  @Max(OFFER_CONSTANT_VALUES.GuestsAmount.maxValue, { message: CreateOfferValidationMessage.guestsAmount.maxValue })
  public guestsAmount?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(OFFER_CONSTANT_VALUES.Price.minValue, { message: CreateOfferValidationMessage.price.minValue })
  @Max(OFFER_CONSTANT_VALUES.Price.maxValue, { message: CreateOfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Conveniences, { each: true, message: CreateOfferValidationMessage.conveniences.invalid })
  public conveniences?: Conveniences[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OfferCoordinatesDto)
  public location?: OfferCoordinatesDto;

  @IsOptional()
  @IsMongoId({ message: CreateOfferValidationMessage.authorId.invalidFormat })
  public authorId?: string;
}
