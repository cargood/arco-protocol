import React, { useState, useContext } from 'react';
import { Web3Context } from '../../context/Web3Context';
// import { makeStyles } from '@mui/styles';
import { Button, Box, Typography, Modal, useMediaQuery } from '@mui/material';

import MartianIcon from '../../asset/icons/Martian.jpg';
import PetraIcon from '../../asset/icons/Petra.jpg';
import { IconX } from '@tabler/icons';
import { formart } from '../../helper/formatAddress';


const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px'
};

const wallets = [
    {
        logo: MartianIcon,
        name: 'Martian'
    }, {
        logo: PetraIcon,
        name: 'Petra'
    }
]

function ConnectButton() {

    const isXs = useMediaQuery('(max-width:350px)');
    const [open, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false)
    }
    const web3 = useContext(Web3Context);
    const onConnectWallet = async (wallet: string) => {
        await web3?.connect(wallet);
        setOpen(false);
    }
    const userAddress = web3?.address;

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    bgcolor: '#5361DC0F',
                    borderRadius: '10000px',
                    padding: '3px 5px 5px',
                    marginRight: '20px',
                    boxShadow: '0px 1px 4px #ccc'
                }}
            >
                <Typography sx={{ color: '#666', lineHeight: '36px', px: '5px' }}>
                    Aptos
                </Typography>
                <Button
                    sx={{
                        bgcolor: '#FFF',
                        borderRadius: '10000px',
                        textTransform: 'none',
                        color: '#666',
                        boxShadow: '0px 1px 2px #ccc',
                        '&:hover': {
                            bgcolor: '#FFF'
                        }
                    }}
                    onClick={() => setOpen(!open)}
                >
                    {userAddress ? formart(userAddress as string) : isXs ? 'Connect' : 'Connect Wallet'}
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box sx={{ ...modalStyle, width: { xs: '95%', md: '400px' } }}>
                    <Box
                        sx={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
                        onClick={() => setOpen(false)}
                    >
                        <IconX />
                    </Box>
                    <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 3, color: '#333' }}>
                        Connect Wallet
                    </Typography>
                    {
                        wallets.map((wallet, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    bgcolor: '#FFF',
                                    boxShadow: '0px 1px 4px #ccc',
                                    padding: '20px',
                                    borderRadius: '15px',
                                    my: 2,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        boxShadow: '0px 1px 4px #5361DC60',
                                    }
                                }}
                                onClick={() => onConnectWallet(wallet.name.toLocaleLowerCase())}
                            >
                                <img src={wallet.logo} alt='martian_logo' style={{ width: '32px', height: '32px' }} />
                                <Typography sx={{ lineHeight: '30px', px: 3, color: '#333' }}>{wallet.name}</Typography>
                            </Box>
                        ))
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default ConnectButton;