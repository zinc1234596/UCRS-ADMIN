import { Menu } from '../../menu/entities/menu.entity';
interface MenuWithStatus extends Menu {
  status: boolean;
}
export class UpdateRoleDto {
  roleName: string;
  menusWithStatus: MenuWithStatus[];
}
