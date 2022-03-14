// assets
import { IconPackage } from '@tabler/icons';

// constant
const icons = {
  IconPackage
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const purchase = {
  id: 'purchase',
  title: '進貨',
  type: 'group',
  children: [
    {
      id: 'purchase-item',
      title: '品名',
      type: 'item',
      url: '/purchase/item',
      icon: icons.IconPackage,
      breadcrumbs: false
    }
  ]
};

export default purchase;
