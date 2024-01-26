import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import BaseEntity from '.';
import { City } from './City';
import { ServiceCategory } from './ServiceCategory';
import { UserReview } from './UserReview';

@Entity()
export class Offerer extends BaseEntity {
  @Column()
  username: string;

  @ManyToOne(() => City, (city) => city.offerers)
  city: City;

  @ManyToOne(() => UserReview, (userReview) => userReview.offerer)
  reviews: UserReview[];

  @Column()
  geoAddress?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  profileDescription?: string;

  @Column()
  phone?: string;

  @Column()
  instagramAccount?: string;

  @Column()
  facebookAccount?: string;

  @ManyToMany(() => ServiceCategory)
  @JoinTable()
  serviceCategories: ServiceCategory[];
}
