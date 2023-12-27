// Reference by menu-items/forms.js

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {  IconBrandVercel } from '@tabler/icons';

// constant
const icons = {
    // IconClipboardCheck,
    // IconPictureInPicture,
    IconBrandVercel
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
        }
    ]
};
export default settings;
