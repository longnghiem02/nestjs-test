import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../libs/common/abstract-base.model';

@Entity({ name: 'tasks' })
export class Task extends AbstractEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  detail: string;

  @Column({
    nullable: true,
  })
  assigned_id: number;

  @Column({
    default: false,
    nullable: false,
  })
  status: boolean;
}
