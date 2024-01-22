// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {  IconBrandVercel, Icon123, IconCircleLetterU } from '@tabler/icons';

// constant
const icons = {
    IconBrandVercel,
    Icon123,
    IconCircleLetterU
};

// ==============================|| UI WillWin MENU ITEMS ||============================== //

const basicSettings = {
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
        },
        {
            id: 'unit',
            title: <FormattedMessage id="unit" />,
            type: 'item',
            url: 'basic-settings/unit',
            icon: icons.IconCircleLetterU
        },
    ]
};
export default basicSettings;
