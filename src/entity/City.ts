import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from '.';
import { Country } from './Country';
import { Offerer } from './Offerer';

@Entity()
export class City extends BaseEntity {
  @ManyToOne(() => Country, (country) => country.cities)
  country: Country;

  @Column()
  name: string;

  @Column()
  postal_code?: string;

  @Column()
  city_code?: string;

  @OneToMany(() => Offerer, (offerer) => offerer.city)
  offerers: Offerer[];
}
