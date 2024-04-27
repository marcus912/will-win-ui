import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import {
    Button,
    Box,
    Grid,
    Stack,
    Tab,
    Tabs,
    useScrollTrigger
} from '@mui/material';

import Profile from './CustomerDialogProfile';
import PersonalAccount from 'views/application/users/account-profile/Profile1/PersonalAccount';

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// sticky edit card
function ElevationScroll({ children, window }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 230,
        target: window || undefined
    });

    return React.cloneElement(children, {
        style: {
            position: trigger ? 'fixed' : 'relative',
            top: trigger ? 83 : 0,
            width: trigger ? 318 : '100%'
        }
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.node,
    window: PropTypes.object
};


// tabs panel
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const tabsOption = [
    {
        label: 'Profile',
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Personal Details',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    }
];

const CustomerDialog = ({ ...others }) => {
    const theme = useTheme();

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { open, onClose } = others;
    const handleClose = () => {
        onClose();
    };

    return (
        <ElevationScroll open={open}>
            <SubCard
                sx={{
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    width: '100%',
                    maxWidth: 800
                }}
                content={false}
            >
            <Grid  spacing={gridSpacing} sx={{ p: 3 }}>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="simple tabs example"
                    variant="scrollable"
                    sx={{
                        mb: 3,
                        '& a': {
                            minHeight: 'auto',
                            minWidth: 10,
                            py: 1.5,
                            px: 1,
                            mr: 2.25,
                            color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        '& a.Mui-selected': {
                            color: theme.palette.primary.main
                        },
                        '& .MuiTabs-indicator': {
                            bottom: 2
                        },
                        '& a > svg': {
                            marginBottom: '0px !important',
                            mr: 1.25
                        }
                    }}
                >
                    {tabsOption.map((tab, index) => (
                        <Tab key={index} component={Link} to="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
                    ))}
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Profile></Profile>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PersonalAccount />
                </TabPanel>
                <Stack spacing={3}>
                    <Button onClick={handleClose}>Cancel</Button>
                </Stack>
                </Grid>
            </SubCard>
        </ElevationScroll>
    );
};

export default CustomerDialog;
