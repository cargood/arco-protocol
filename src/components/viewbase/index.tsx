import { makeStyles } from '@mui/styles';
import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import Header from '../header';
import Sidebar from '../sidebar';
import clsx from 'clsx';


interface IViewBaseProps {
    children: React.ReactNode;
}

const useStyles = makeStyles(theme => ({
    content: {
        paddingTop: "120px",
        paddingLeft: "280px",
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: 1000,
        }),
        width: "100%",
        height: "100vh",
        overflow: "auto",
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: 1000,
        }),
        paddingLeft: 0,
    },
})) as any;

function ViewBase({ children }: IViewBaseProps) {

    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }
    const isUpMd = useMediaQuery("(min-width: 960px)");

    return (
        <div className='view-base-root'>
            <Header handleDrawerToggle={handleDrawerToggle} title='lend' />
            {
                isUpMd ?
                    <Sidebar drawerOpen={true} drawerToggle={handleDrawerToggle} />
                    :
                    <Sidebar drawerOpen={mobileOpen} drawerToggle={handleDrawerToggle} />
            }
            {/* main content */}
            <main
                className={clsx([
                    classes.content,
                    {
                        [classes.contentShift]: !isUpMd
                    }
                ])}
            >
                <div>{children}</div>
            </main>
        </div>
    )
}

export default ViewBase;