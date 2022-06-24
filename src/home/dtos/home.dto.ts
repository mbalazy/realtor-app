import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Image } from 'src/image/image.entity';
import { User } from 'src/user/user.entity';
import { Home, PropertyType } from '../home.entity';

export class CreateHomeDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  number_of_bedrooms: number;

  @IsNumber()
  @IsNotEmpty()
  number_of_bathrooms: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsDate()
  @IsNotEmpty()
  listed_date: Date;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  land_size: number;
}

export class HomeResponseDto implements Home {
  id: number;
  address: string;
  city: string;
  price: number;
  propertyType: PropertyType;
  images: Image[];

  image?: string;

  @Exclude()
  realtor?: User;
  @Exclude()
  updated_at: Date;
  @Exclude()
  created_at: Date;

  @Exclude()
  listed_date: Date;
  @Exclude()
  land_size: number;
  @Exclude()
  number_of_bedrooms: number;
  @Exclude()
  number_of_bathrooms: number;

  @Expose({ name: 'landSize' })
  transformLandSize() {
    return this.land_size;
  }

  @Expose({ name: 'listedDate' })
  transformListedData() {
    return this.listed_date;
  }

  @Expose({ name: 'numberOfBedrooms' })
  transformNumberOfBedrooms() {
    return this.number_of_bedrooms;
  }

  @Expose({ name: 'numberOfBathrooms' })
  transformNumberOfBathrooms() {
    return this.number_of_bathrooms;
  }

  constructor(partial: Partial<HomeResponseDto>) {
    Object.assign(this, partial);
  }
}
