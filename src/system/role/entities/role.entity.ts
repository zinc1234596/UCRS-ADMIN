import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectIdColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/system/user/entities/user.entity';

@Entity('role')
export class Role {
  @ObjectIdColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  role_name: string;

  @Column()
  level: number;

  @OneToMany((type) => User, (user) => user.role, { cascade: true })
  users: User[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
