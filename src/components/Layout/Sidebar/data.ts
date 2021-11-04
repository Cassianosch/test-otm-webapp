import { IconType } from 'react-icons/lib';
import { GoTag } from 'react-icons/go';

interface MenuData {
    id: number;
    to: string;
    label: string;
    icon: IconType;
}

export const sidebarMenus: MenuData[] = [
    {
        id: 0,
        to: '/',
        label: 'Student',
        icon: GoTag,
    },
];
