import { Entity, Column } from 'typeorm';
import BaseEntity from '.';

@Entity()
export class ServiceCategory extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;
}
