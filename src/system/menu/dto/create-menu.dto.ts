import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMenuDto {
  @ApiProperty({ description: '路径', example: '/home' })
  @IsString({ message: 'path 类型错误' })
  @IsNotEmpty({ message: '路径不能为空' })
  path: string;

  @ApiProperty({ description: '菜单名称/路由名称', example: '主页' })
  @IsString({ message: 'name 类型错误' })
  @IsNotEmpty({ message: '菜单名称/路由名称不能为空' })
  name: string;

  @ApiProperty({ description: '组件名称', example: 'home' })
  @IsString({ message: 'component 类型错误' })
  @IsNotEmpty({ message: '组件名称不能为空' })
  component: string;

  @ApiProperty({ description: '重定向地址', example: '/form/table' })
  redirect: string;

  @ApiProperty({
    description: '媒体信息',
    example: { title: '用户', icon: 'Document' },
  })
  @IsObject({ message: 'meta 类型错误' })
  @IsNotEmpty({ message: '媒体信息不能为空' })
  meta: {
    title: string;
    icon: string;
  };

  @ApiProperty({ description: '路由级别', example: 1 })
  @IsNumber({}, { message: 'level类型错误' })
  @IsNotEmpty({ message: '路由级别不能为空' })
  level: number;

  @ApiProperty({ description: '父级路由id', example: 1 })
  parentId: number;

  @ApiProperty({
    description: '子级路由',
    type: [CreateMenuDto],
    example: [
      {
        path: '/home/child1',
        name: '子菜单1',
        component: 'homeChild1',
        redirect: '',
        meta: { title: '子菜单1', icon: 'User' },
        level: 2,
        parentId: 1,
      },
      {
        path: '/home/child2',
        name: '子菜单2',
        component: 'homeChild2',
        redirect: '',
        meta: { title: '子菜单2', icon: 'User' },
        level: 2,
        parentId: 1,
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateMenuDto)
  children?: Array<CreateMenuDto>;
}

// export class CreateMenuArrayDto {
//   @ApiProperty({
//     description: '菜单列表',
//     type: [CreateMenuDto],
//     example: [
//       {
//         path: '/home',
//         name: '主页',
//         component: 'home',
//         redirect: '/form/table',
//         meta: { title: '用户', icon: 'Document' },
//         level: 1,
//         parentId: 1,
//         children: [
//           {
//             path: '/home/child1',
//             name: '子菜单1',
//             component: 'homeChild1',
//             redirect: '',
//             meta: { title: '子菜单1', icon: 'User' },
//             level: 2,
//             parentId: 1,
//           },
//           {
//             path: '/home/child2',
//             name: '子菜单2',
//             component: 'homeChild2',
//             redirect: '',
//             meta: { title: '子菜单2', icon: 'User' },
//             level: 2,
//             parentId: 1,
//           },
//         ],
//       },
//     ],
//   })
//   @ValidateNested({ each: true })
//   @Type(() => CreateMenuDto)
//   readonly menus: CreateMenuDto[];
// }
