import { Menu } from '../../menu/entities/menu.entity';
import { ApiProperty } from '@nestjs/swagger';
interface MenuWithStatus extends Menu {
  status: boolean;
}
export class UpdateRoleDto {
  @ApiProperty({ example: '助理', description: '角色名称' })
  roleName: string;
  @ApiProperty({
    example: [
      {
        id: 1,
        path: '/user',
        name: 'user',
        redirect: null,
        component: 'user',
        meta: {
          title: '用户',
          icon: 'Document',
        },
        level: 0,
        parentId: null,
        status: true,
        children: [],
      },
      {
        id: 2,
        path: '/form',
        name: 'form',
        redirect: null,
        component: 'form',
        meta: {
          title: 'from',
          icon: 'Document',
        },
        level: 0,
        parentId: null,
        status: false,
        children: [],
      },
      {
        id: 3,
        path: '/control',
        name: 'control',
        redirect: '/control/departmentControl',
        component: 'layout',
        meta: {
          title: '权限管理',
          icon: 'Stamp',
        },
        level: 0,
        parentId: null,
        status: false,
        children: [
          {
            id: 4,
            path: '/control/departmentControl',
            name: 'departmentControl',
            redirect: null,
            component: 'departmentControl',
            meta: {
              title: '部门管理',
              icon: 'Document',
            },
            level: 1,
            parentId: 3,
            status: false,
            children: [],
          },
          {
            id: 5,
            path: '/control/userControl',
            name: 'userControl',
            redirect: null,
            component: 'userControl',
            meta: {
              title: '用户管理',
              icon: 'Document',
            },
            level: 1,
            parentId: 3,
            status: false,
            children: [],
          },
          {
            id: 6,
            path: '/control/roleControl',
            name: 'roleControl',
            redirect: null,
            component: 'roleControl',
            meta: {
              title: '角色管理',
              icon: 'Document',
            },
            level: 1,
            parentId: 3,
            status: false,
            children: [],
          },
        ],
      },
    ],
    description: '菜单列表及其状态',
  })
  menusWithStatus: MenuWithStatus[];
}
