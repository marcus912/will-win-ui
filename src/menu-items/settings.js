// Reference by menu-items/forms.js

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandVercel, Icon123, IconUsers, IconForms } from '@tabler/icons';

// constant
const icons = {
  IconBrandVercel,
  Icon123,
  IconUsers,
  IconForms
};

// ==============================|| UI WillWin MENU ITEMS ||============================== //

const settings = {
  id: 'settings',
  title: "基礎設定",
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
      id: 'customer',
      title: <FormattedMessage id="customer" />,
      type: 'item',
      url: 'basic-settings/customer',
      icon: icons.IconUsers
    },
    {
      id: 'form',
      title: <FormattedMessage id="form" />,
      type: 'item',
      url: 'basic-settings/form',
      icon: icons.IconForms
    }
  ]
};
export default settings;
