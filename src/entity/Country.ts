import { Entity, Column, OneToMany } from 'typeorm';
import BaseEntity from '.';
import { City } from './City';

@Entity()
export class Country extends BaseEntity {
  @Column()
  name: string;

  @Column()
  code?: string;

  @OneToMany(() => City, (city) => city.country)
  cities: City[];
}
