// Reference by menu-items/forms.js

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {  IconBrandVercel, Icon123 } from '@tabler/icons';

// constant
const icons = {
    IconBrandVercel,
    Icon123
};

// ==============================|| UI WillWin MENU ITEMS ||============================== //

const settings = {
    id: 'settings',
    title: <FormattedMessage id="basicSettings" />,
    icon: icons.IconPictureInPicture,
    type: 'group',
    children: [
        {
            id: 'material',
            title: <FormattedMessage id="material" />,
            type: 'item',
            url: 'basic-settings/material',
            icon: icons.IconBrandVercel
        },
        {
            id: 'item',
            title: <FormattedMessage id="item" />,
            type: 'item',
            url: 'basic-settings/item',
            icon: icons.Icon123
        }
    ]
};
export default settings;
