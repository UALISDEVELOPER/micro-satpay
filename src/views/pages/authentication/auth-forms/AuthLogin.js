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
import {loginValidate} from "./LoginValidation"

//styles 
import "../styles/login.scss"

const FirebaseLogin = ({ ...others }) => {

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

    const [loginData, setLoginData] = useState({
        // email: 'alizadea123@gmail.com',
        // password: '12345678',
        email: '',
        password: '',
        mode: "sand"
    });
    
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(loginValidate(loginData));
        //validation
        console.log(loginData);
    }, [loginData]);

    const valueHandler = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    };
    //valueHandler fonction helps input to work properly

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

        
        if(!( errors.email || errors.password )){
            console.log("succed")
            axios.post("https://dev3.satpay.ir/login", loginData)
            .then(response => {
                console.log(response);
                if(response.status ==200){
                    localStorage.setItem("userEmail", loginData.email);
                    localStorage.setItem("accessToken", response.data.output.accessToken);
                    localStorage.setItem("refreshToken", response.data.output.refreshToken);
                    console.log("loged in")
                    handleOpenSucceedSnackBar("ورود انجام شد")
                    navigate('/free' , {replace : true})
                }
                setLoading(false)
            })
            .catch((error)=> {
                console.log(error.response.data);
                if(error.response.data.error =="Invalid email or password!"){
                    handleOpenFailedSnackBar("ایمیل یا رمزعبور وارد شده اشتباه میباشد");
                }else if (error.response.data.error =='Operation `users.findOne()` buffering timed out after 10000ms!'){
                    handleOpenFailedSnackBar("عملایت ناموفق مجدد تلاش کنید");
                }
                else{
                    handleOpenFailedSnackBar("مشکلی پیش آمده است اطلاعات وارد شده را بررسی کنید");
                }
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
            <div dir="rtl">
                <CacheProvider value={cacheRtl}> 
                    <Container>
                        <Grid>
                            <Grid item xs={12} className="inputDiv">
                                <TextField
                                    type="email"
                                    id="filled-basic"
                                    label="ایمیل"
                                    variant="filled"
                                    onChange={valueHandler}
                                    name="email"
                                    value={loginData.email}
                                    onBlur={touchedHandler}
                                    fullWidth
                                    id="email-input"
                                    />
                                <span>{errors.email && touched.email && <p>{errors.email}</p>} </span>
                            </Grid>
                            <Grid item xs={12} className="inputDiv">
                                <TextField
                                    id="filled-password-input"
                                    label="رمز عبور"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="filled"
                                    fullWidth
                                    onChange={valueHandler}
                                    name="password"
                                    value={loginData.password}
                                    onBlur={touchedHandler}
                                    />
                                <span>{errors.password && touched.password && <p>{errors.password}</p>} </span>
                            </Grid>
                            <Grid item xs={12} className="inputDiv">
                                <Button variant="contained" color="success" fullWidth onClick={loginHandler}>
                                   ورود
                                </Button>
                            </Grid>
                        </Grid>

                    </Container>
                </CacheProvider>
            </div>
        </>
    );
};

export default FirebaseLogin;
