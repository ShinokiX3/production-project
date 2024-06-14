import { DropdownDirection } from '../../../types/ui';
import cls from './popup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.options_b_l,
    'top left': cls.options_t_l,
    'bottom right': cls.options_b_r,
    'top right': cls.options_t_r,
};
