import React, { useState, useContext } from 'react';
import { Avatar } from '@mui/material';
import MineIcon from '../../asset/icons/pickaxe.svg';
import { Button, Box, Typography, Modal, useMediaQuery } from '@mui/material';
import { IconX } from '@tabler/icons';
import ArcoIcon from '../../asset/icons/arco.svg';
import { IAptosInterface, Web3Context } from '../../context/Web3Context';

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

function ClaimModal() {

    const isMd = useMediaQuery('(max-width:768px)');
    const aptosContext = useContext(Web3Context) as IAptosInterface;

    const userArcBalance = aptosContext.userInfo.tokenBalance.arc;

    const [open, setOpen] = useState(false)
    const onClose = () => {
        setOpen(false);
    }

    const datas = [
        {
            text: 'Waiting Claim',
            amount: 0
        }, {
            text: 'Wallet Balance',
            amount: userArcBalance
        }
    ]
    return (
        <div >
            <Avatar
                sx={{
                    bgcolor: '#FFF',
                    boxShadow: '0px 1px 4px #ccc',
                    margin: '3px 15px 0',
                    cursor: 'pointer'
                }}
                onClick={() => setOpen(!open)}
            >
                <img src={MineIcon} alt='mine_icon' />
            </Avatar>
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box sx={{ ...modalStyle, width: { xs: '95%', md: '400px' } }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => setOpen(false)}
                    >
                        {!isMd && <img src={ArcoIcon} alt='arco' />}
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <IconX />
                    </Box>
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            mb: 1,
                            color: '#333'
                        }}
                    >
                        Lend Mining
                    </Typography>
                    <Typography variant="subtitle1" component="h2" sx={{ px: 1, color: '#666', lineHeight: '25px' }}>
                        Deposit and borrow will automatically mined, and the display of mining rewards will be delayed, subject to the claim amount. Learn More
                    </Typography>
                    {
                        datas.map((item, index) => (
                            <Box
                                key={index}
                                sx={{

                                    width: '100%',
                                    bgcolor: '#FFF',
                                    boxShadow: '0px 1px 4px #ccc',
                                    padding: '10px 20px',
                                    borderRadius: '15px',
                                    my: 2,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        boxShadow: '0px 1px 4px #5361DC60',
                                    }
                                }}
                            >
                                <Typography sx={{ fontSize: '12px', color: '#333' }}>{item.text}</Typography>
                                <Typography sx={{ fontSize: '20px', color: '#333' }}>{item.amount} ARC</Typography>
                            </Box>
                        ))
                    }
                    <Button
                        sx={{
                            display: 'flex',
                            width: '100%',
                            backgroundColor: '#5361DC',
                            borderRadius: '20px',
                            py: 2,
                            '&:hover': {
                                backgroundColor: '#5361DC'
                            }

                        }}
                    >
                        <Typography sx={{ textAlign: 'center', color: '#FFF' }}>Claim</Typography>
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default ClaimModal;