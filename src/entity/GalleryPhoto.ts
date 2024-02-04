import { Entity, Column, ManyToOne } from 'typeorm';
import BaseEntity from '.';
import { Offerer } from './Offerer';

@Entity()
export class GalleryPhoto extends BaseEntity {
  @Column()
  url: string;

  @ManyToOne(() => Offerer, (offerer) => offerer.galleryPhotos)
  offerer: Offerer;
}
