// Reference by menu-items/forms.js

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconClipboardCheck, IconPictureInPicture, IconForms, IconBorderAll, IconChartDots, IconStairsUp } from '@tabler/icons';

// constant
const icons = {
    IconClipboardCheck,
    IconPictureInPicture,
    IconForms,
    IconBorderAll,
    IconChartDots,
    IconStairsUp
};

// ==============================|| UI WILLWIN MENU ITEMS ||============================== //

const willwin = {
    id: 'ui-willwin',
    title: <FormattedMessage id="willwin" />,
    icon: icons.IconPictureInPicture,
    type: 'group',
    children: [
        {
            id: 'will-material',
            title: <FormattedMessage id="Material-List" />,
            type: 'item',
            url: '/material/materiallist',
            icon: icons.IconStairsUp
        }
    ]
};
export default willwin;
