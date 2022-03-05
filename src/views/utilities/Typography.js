import React, { useEffect, useState } from 'react';
import axios from 'axios';


//mui
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

//mui diolog
import PropTypes from 'prop-types';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
//mui table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
//mui icons
import MoreOutlinedIcon from '@mui/icons-material/MoreOutlined';



//style
import "./style/typography.scss";


const Typography = () => {
    
    
    const [tookenData, setTookenData] = useState(false)

    const [tookenDetails, setTookenDetails] = useState(false);

    useEffect(()=>{
        const URL = "https://dev3.satpay.ir/application/read?SDate=&EDate=Z&appName=&skip=0&userID="
        const config = {
            headers: {
                "Content-type": 'application/json; charset=UTF-8' ,
                "Authorization" : `bearer ${localStorage.getItem("refreshToken")}`,
            }
        }
        axios.get(URL, config)
            .then(response =>{
                console.log(response);
                setTookenData(response.data.output.data)   
            })
            .catch(error => console.log(error.response))
    },[])


    //============= Dialog ============================
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = (appName) => {
        setOpen(true);
        setTookenDetails(tookenData.find((item)=> item.appName === appName));
        console.log(tookenDetails);
    };
    const handleClose = () => {
        setOpen(false);
    };
    function SimpleDialog(props) {
        const { onClose, selectedValue, open} = props;
        
        const handleClose = () => {
            onClose(selectedValue);
        };
        
        
        return (
            <Dialog onClose={handleClose} open={open}>
            <DialogTitle> {tookenDetails && tookenDetails.appName}  اطلاعات برنامه  </DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                    <Grid container className='dialogRow'>
                        <Grid xs={12}>
                            <p>API key :</p>
                        </Grid>
                        <Grid xs={12} className='apiKeyGrid'>
                            <p>{tookenDetails && tookenDetails.apiKey}</p>
                        </Grid>
                    </Grid>
                    <Grid container className='dialogRow'>
                        <Grid xs={12}>
                            <p>refresh API key :</p>
                        </Grid>
                        <Grid xs={12} className='apiKeyGrid'>
                            <p>{tookenDetails && tookenDetails.refreshApiKey}</p>
                        </Grid>
                    </Grid>
                    <Grid container className='dialogRow'>
                        <Grid xs={12}>
                            <p>نوع فعالیت برنامه</p>
                        </Grid>
                        <Grid xs={12} className='apiKeyGrid'>
                            {tookenDetails && tookenDetails.scope.map( item =>{
                                return(
                                    <p>- {item}</p>
                                )
                            })}
                        </Grid>
                    </Grid>
                    <Grid container className='dialogRow'>
                        <Grid xs={12}>
                            <p>لیست ای پی ها</p>
                        </Grid>
                        <Grid xs={12} className='apiKeyGrid'>
                            { tookenDetails && tookenDetails.ip.map( item =>{
                                return(
                                    <p>- {item}</p>
                                )
                            })}
                        </Grid>
                    </Grid>
            </DialogContent>
            </Dialog>
        );
        }
        
        SimpleDialog.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        selectedValue: PropTypes.string.isRequired,
        };
        
        //============= Dialog ============================
        
        return (
            <Grid container spacing={2}>
            <Grid item xs={0} sm={0} md={2}></Grid>
            <Grid item xs={12} sm={12} md={8}>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">اطلاعات</TableCell>
                                <TableCell align="right">محیط</TableCell>
                                <TableCell align="right">سطح</TableCell>
                                <TableCell align="right">نام برنامه</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tookenData &&
                            tookenData.map(item=>{
                                return(
                                    <TableRow>
                                        <TableCell align="right" onClick={()=>handleClickOpen(item.appName)}>
                                            <MoreOutlinedIcon/>
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                item.mode === "sand" ? <p>تستی</p> : <p>عملیاتی</p>
                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                item.scale
                                            }
                                        </TableCell>
                                        <TableCell align="right">{item.appName}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* ========Dialog========== */}
                <SimpleDialog
                    open={open}
                    onClose={handleClose}
                />
                {/* ========Dialog========== */}
            </Grid>
            <Grid item xs={0} sm={0} md={2}></Grid>
        </Grid>
    );
};

export default Typography;
