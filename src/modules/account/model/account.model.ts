import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../libs/common/abstract-base.model';

@Entity({ name: 'accounts' })
export class Account extends AbstractEntity {
  @Column({
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    default: 'member',
    nullable: false,
  })
  role: string;
}
