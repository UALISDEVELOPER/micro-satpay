/* eslint-disable */
import { useState, useEffect, React } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

//MUI components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//RTL MUI
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});


//validation file
import {createAppValidation} from "./CreateAppValidation"

//styles 
import "./styles/createApp.scss"


const SamplePage = () => {
    const navigate = useNavigate()
    
    // =====================MUI snackBar================================

    const [snackBarDetails, setSnackBarDetails] = useState({
        message : "",
        severity : "",
        autoHideDuration : 11000
    })

    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleOpenSucceedSnackBar = (successMessage)=> {
        setOpenSnackBar(true);
        setSnackBarDetails({
            ...snackBarDetails,
            message : successMessage,
            severity : "success",
            autoHideDuration : 20000
        })
    };

    const handleOpenFailedSnackBar = (errorMessage) => {
        setOpenSnackBar(true);
        setSnackBarDetails({
            ...snackBarDetails,
            message : errorMessage,
            severity : "error",
            autoHideDuration : 7000
        })
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenSnackBar(false);
    };

    // =====================MUI snackBar================================

    const [loading, setLoading] = useState(false);

    const [createApp, setCreateApp] = useState({
        // email: 'alizadea123@gmail.com',
        // password: '12345678',
        mode: "sand",
        appName:"",
        scope: []
    });
    
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(createAppValidation(createApp));
        //validation
        console.log(createApp);
        console.log(errors);
    }, [createApp]);

    const valueHandler = (event) => {
        setCreateApp({
            ...createApp,
            [event.target.name]: event.target.value
        });
    };
    //valueHandler fonction helps input to work properly

    const handleChange = (event) => {
        setCreateApp({
            ...createApp,
            scope :[event.target.value]
        });
      };
    //this function helps select form to work properly

    const [touched , setTouched] = useState({})
    //use setTouched to know if client has clicked on any input
    const touchedHandler = event =>{
        setTouched({
            ...touched,
            [event.target.name] : true,
        })
    }
    //by using this eventHandler we can know if client has focused on an input

    const loginHandler = (event) =>{
        event.preventDefault();

        setLoading(true)
        console.log(errors);

        const config = {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization' : `${localStorage.getItem("accessToken")}` ,
            }
        }
        
        if(!(errors.appName || errors.scope==='یکی از موارد را انتخاب کنید')){
            console.log("succed");
            axios.post("https://dev3.satpay.ir/create-app", createApp, config)
            .then(response => {
                console.log(response)
                setLoading(false)
                })
            .catch((error)=> {
                console.log(error.response.data);
                setLoading(false)
            })
        }else{
            handleOpenFailedSnackBar("فرم را تکمیل کنید");
            console.log("fail");
            setLoading(false)
        }
    }


    return (
        <>
           {/*=================== snackBar =================*/}

           <div>
                <Snackbar
                 open={openSnackBar}
                 autoHideDuration={snackBarDetails.autoHideDuration} 
                 onClose={handleCloseSnackBar} 
                 anchorOrigin={{ vertical: "top", horizontal: "right" }}
                 TransitionComponent={Slide}
                 >
                    <Alert onClose={handleCloseSnackBar} severity={snackBarDetails.severity} sx={{ width: '100%' }}>
                        {snackBarDetails.message}
                    </Alert>
                </Snackbar>
            </div>

            {/*=================== snackBar =================*/}

            {/* ==============loading Progress================ */}

            {loading &&
                <Box
                sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                }}
                >
                    <div className='circularProgressDiv'>
                        <CircularProgress />
                        <p>لطفا منتظر بمانید</p>
                    </div>
                </Box>
            
            }

            {/* ==============loading Progress================ */}
            <div dir="rtl" className='createApp-container'>
            <Grid container spacing={2}>
                <Grid item xs={0} sm={0} md={2}>

                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <CacheProvider value={cacheRtl}> 
                        <Container>
                            <Grid>
                                <Grid item xs={12} className="inputDiv">
                                    <TextField
                                        type="text"
                                        id="filled-basic"
                                        label="نام برنامه"
                                        variant="filled"
                                        onChange={valueHandler}
                                        name="appName"
                                        value={createApp.appName}
                                        onBlur={touchedHandler}
                                        fullWidth
                                        id="name-input"
                                        />
                                    <span>{errors.appName && touched.appName && <p>{errors.appName}</p>} </span>
                                </Grid>
                                <Grid item xs={12} className="inputDiv">
                                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} fullWidth className='formControl'>
                                        <InputLabel id="demo-simple-select-filled-label" fullWidth>نوع فعالیت</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={createApp.scope}
                                        onChange={handleChange}
                                        onBlur={touchedHandler}
                                        name="scope"
                                        fullWidth
                                        >
                                            <MenuItem value={"Blockchain"}>بلاک چین</MenuItem>
                                            <MenuItem value={"GOV"}>GOV</MenuItem>
                                            <MenuItem value={"City Services"}>خدمات شهری</MenuItem>
                                            <MenuItem value={"AI"}>AI</MenuItem>
                                            <MenuItem value={"Open Banking"}>بانکداری باز</MenuItem>
                                            <MenuItem value={"IOT"}>IOT</MenuItem>
                                            <MenuItem value={"Tourism"}>گردشگری</MenuItem>
                                            <MenuItem value={"Investment"}>سرمایه گذاری</MenuItem>
                                            <MenuItem value={"Other"}>دیگر</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <span>{errors.scope && touched.scope && <p>{errors.scope}</p>} </span>
                                </Grid>
                                <Grid item xs={12} className="inputDiv">
                                    <Button variant="contained" color="success" fullWidth onClick={loginHandler}>
                                    ساخت برنامه
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </CacheProvider>
                </Grid>
                <Grid item xs={0} sm={0} md={2}>

                </Grid>
            </Grid>
            </div>
        </>
    );
};

export default SamplePage;
