import React, { useCallback, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from '@mui/material';

import Logo from '../../asset/icons/Logo.png';
import SwapIcon from '../../asset/icons/swap.svg';
import FarmIcon from '../../asset/icons/farm.svg';
import DocsIcon from '../../asset/icons/docs.svg';
import LendIcon from '../../asset/icons/dashboard.svg';
import GovernIcon from '../../asset/icons/govern.svg';
import { Typography } from '@mui/material';

const useStyles = makeStyles(theme => ({
    menuList: {
        '& .MuiTypography-root': {
            color: '#FFF',
            fontSize: '20px',
            fontFamily: 'Square',
            fontWeight: 500,
            lineHeight: '55px'
        }
    }
})) as any;

const menuList = [
    {
        title: 'Lend',
        logo: LendIcon
    }, {
        title: 'Farm',
        logo: FarmIcon
    }, {
        title: 'Swap',
        logo: SwapIcon,
        external: true,
        url: 'https://liquidswap.com/#/'
    }, {
        title: 'Govern',
        logo: GovernIcon,
        external: true,
        url: 'https://snapshot.org/#/'
    }, {
        title: 'Docs',
        logo: DocsIcon,
        external: true,
        url: 'https://arcoprotocol.gitbook.io/arcogitbook/'
    }
]

function MenuList() {

    const classes = useStyles();
    const [menu, setMenu] = useState('lend');
    const location = useLocation();

    const checkPage = useCallback((url: string): string => {
        const path = url.replace("/", "");
        if (path.indexOf("lend") >= 0) {
            return 'Lend';
        }
        if (path.indexOf("farm") >= 0) {
            return 'Farm';
        }
        return '';
    }, []);

    useEffect(() => {
        const { pathname } = location;
        let menu = checkPage(pathname);
        setMenu(menu);
    }, [location])

    return (
        <div className={classes.menuList}>
            <img src={Logo} alt='logo' style={{ width: '220px' }} />
            <Box sx={{ mt: 5 }}>
                {
                    menuList?.map((item, index) => (

                        item.external ?
                            <Link
                                key={index}
                                target='_blank'
                                href={item.url}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 1,
                                    borderRadius: '15px',
                                    textDecoration: 'none',
                                    backgroundColor:
                                        (menu === item.title) ? 'rgba(255,255,255,0.1)' : 'transparent'
                                }}
                            >
                                <img
                                    src={item.logo}
                                    style={{ width: '16px', height: '16px', margin: '15px 20px' }}
                                    alt='menu_logo'
                                />
                                <Typography>{item.title}</Typography>
                            </Link> :
                            <Link
                                key={index}
                                component={NavLink}
                                to={`${item.title.toLocaleLowerCase()}`}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 1,
                                    borderRadius: '15px',
                                    textDecoration: 'none',
                                    backgroundColor:
                                        (menu === item.title) ? 'rgba(255,255,255,0.1)' : 'transparent'
                                }}
                            >
                                <img
                                    src={item.logo}
                                    style={{ width: '16px', height: '16px', margin: '15px 20px' }}
                                    alt='menu_logo'
                                />
                                <Typography>{item.title}</Typography>
                            </Link>
                    ))
                }
            </Box >
        </div >
    )
}

export default MenuList;