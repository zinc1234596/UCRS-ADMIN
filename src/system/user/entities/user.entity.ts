import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '@/system/role/entities/role.entity';

@Entity('user')
export class User {
  @ObjectIdColumn({ type: 'bigint' })
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne((type) => Role, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
