import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn({ type: 'bigint' })
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    comment: '创建时间',
  })
  createDate: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_date',
    comment: '更新时间',
  })
  updateDate: Date;
}
