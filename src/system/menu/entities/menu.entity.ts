import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: null })
  redirect: string;

  @Column()
  component: string;

  @Column('simple-json')
  meta: {
    title: string;
    icon: string;
  };

  @Column()
  level: number;

  @Column({ default: null })
  parentId: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
