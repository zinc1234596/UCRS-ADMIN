import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '@/system/role/entities/role.entity';
import { Department } from '@/system/department/entities/department.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne((type) => Role, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'roleId', referencedColumnName: 'id' })
  role: Role;

  @ManyToOne((type) => Department, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'departmentId', referencedColumnName: 'id' })
  department: Department;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
