// Reference by menu-items/forms.js

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconClipboardCheck, IconPictureInPicture, IconBrandVercel } from '@tabler/icons';

// constant
const icons = {
    IconClipboardCheck,
    IconPictureInPicture,
    IconBrandVercel
};

// ==============================|| UI WillWin MENU ITEMS ||============================== //

const basicSettings = {
    id: 'basicSettings',
    title: <FormattedMessage id="基礎設定" />,
    icon: icons.IconPictureInPicture,
    type: 'group',
    children: [
        {
            id: 'material',
            title: <FormattedMessage id="材質" />,
            type: 'item',
            url: 'basic-settings/material',
            icon: icons.IconBrandVercel
        }
    ]
};
export default basicSettings;
