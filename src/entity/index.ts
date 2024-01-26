import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
