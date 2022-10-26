import React from 'react';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Typography, Avatar, Box } from '@mui/material';
import { IconMenu2 } from '@tabler/icons';
import ConnectButton from './ConnectWallet';
import ClaimModal from './ClaimModal';
import { useLocation } from 'react-router-dom';

interface IHeader {
    handleDrawerToggle?: () => void;
    title: string;
}

const useStyles = makeStyles(theme => ({
    topBar: {
        position: "fixed",
        top: 0,
        left: 0,
        display: 'flex',
        backgroundColor: "#FFF",
        width: "100%",
        padding: "15px 0",
        zIndex: 100,
        borderBottom: "2px solid #eee",
    },
    topBarShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: 1000,
        }),
        marginLeft: 0,
    },
    toggleButton: {
        marginLeft: '15px'
    }
})) as any;

function Header({ handleDrawerToggle }: IHeader) {

    const is960 = useMediaQuery("(max-width:960px)");
    const classes = useStyles();
    const path = useLocation().pathname;

    return (
        <div className={classes.topBar}>
            {is960 && (
                <div onClick={handleDrawerToggle} className={classes.toggleButton}>
                    <Avatar
                        sx={{
                            bgcolor: '#FFF',
                            boxShadow: '0px 1px 4px #ccc',
                            mt: '3px'
                        }}

                    >
                        <IconMenu2 color='#888' />
                    </Avatar>
                </div>
            )}
            {!is960 && (
                <Box sx={{ ml: '320px' }}>
                    <Typography sx={{ fontSize: '20px', color: '#5361DC', lineHeight: '50px' }}>{path.split('/')[1].toLocaleUpperCase()}</Typography>
                </Box>
            )}
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'flex-end',
                    alignContent: 'center'
                }}
            >
                <ClaimModal />
                <ConnectButton />
            </Box>
        </div>
    )
}

export default Header;