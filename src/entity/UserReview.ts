import { Entity, Column, ManyToOne } from 'typeorm';
import BaseEntity from '.';
import { Offerer } from './Offerer';

@Entity()
export class UserReview extends BaseEntity {
  @Column()
  name: string;

  @Column()
  postal_code?: string;

  @Column()
  city_code?: string;

  @ManyToOne(() => Offerer, (offerer) => offerer.reviews)
  offerer: Offerer;
}
