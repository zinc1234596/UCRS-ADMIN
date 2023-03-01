import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ObjectIdColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/system/user/entities/user.entity';
import { Menu } from '@/system/menu/entities/menu.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  roleName: string;

  @Column({ unique: true })
  roleLevel: number;

  @OneToMany((type) => User, (user) => user.role, { cascade: true })
  users: User[];

  @ManyToMany(() => Menu)
  @JoinTable()
  menus: Menu[];
  // @ManyToMany((type) => Menu, (menu) => menu.roles)
  // @JoinTable({
  //   name: 'role_menu',
  //   joinColumn: {
  //     name: 'role_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'menu_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // menus: Menu[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
