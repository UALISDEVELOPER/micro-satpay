/* eslint-disable */
import { useState, useEffect, React } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

//MUI components
import { styled } from '@mui/material/styles';
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
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


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


//================ Accordion ============================

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  
//================ Accordion ============================


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

    //================ Accordion ============================


    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    //================ Accordion ============================


    const [loading, setLoading] = useState(false);


    //================= activity type (scope) ========================
    const [scopeChecked , setScopeCheked] = useState({
        GOV : "",
        smartCity: "",
        wallet : "",
        bourse : "",
        openBanking : "",
        blockChain : "",
        tourism : "",
    });

    const scopeHandler = (event) =>{
        setScopeCheked({
            ...scopeChecked,
            [event.target.value] : event.target.checked,
        })
        // console.log(scopeChecked);
    }

    let finalScope = [];

    useEffect(()=>{
        finalScope.indexOf("GOV")== -1 && scopeChecked.GOV && finalScope.push("GOV");
        finalScope.indexOf("smartCity")== -1 && scopeChecked.smartCity && finalScope.push("smartCity");
        finalScope.indexOf("wallet")== -1 && scopeChecked.wallet && finalScope.push("wallet");
        finalScope.indexOf("bourse")== -1 && scopeChecked.bourse && finalScope.push("bourse");
        finalScope.indexOf("openBanking")== -1 && scopeChecked.openBanking && finalScope.push("openBanking");
        finalScope.indexOf("blockChain")== -1 && scopeChecked.blockChain && finalScope.push("blockChain");
        finalScope.indexOf("tourism")== -1 && scopeChecked.tourism && finalScope.push("tourism");


        setCreateApp({
            ...createApp,
            scope : finalScope
        })
    },[scopeChecked])

    //================= activity type (scope) ========================

    //==================== adding IP =================================

    const [ipState , setIpState] = useState("");

    const [ipArray, setIpArray] = useState([]);
    
    const ipValueHandler = (event) =>{
        setIpState(event.target.value)
    }
    
    const addIpHandler = () =>{
        if(ipState!==""){
            setIpArray([
                ...ipArray,
                ipState
            ])
            setIpState("")
            // console.log(ipArray);
        }
    }

    useEffect(()=>{
        setCreateApp({
            ...createApp,
            ip : ipArray
        })
    },[ipArray])

    //==================== adding IP =================================

    //===================== scale =========================

    const scaleHandler = (event) => {
        setCreateApp({
            ...createApp,
            scale : event.target.value
        });
    };
    //this function helps select form to work properly

    //===================== scale =========================

    const [createApp, setCreateApp] = useState({
        mode: "",
        appName:"",
        scope: [],
        ip :[],
        scale:""
    });
    
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(createAppValidation(createApp));
        console.log(createApp);
        // console.log(errors);
    }, [createApp]);


    const valueHandler = (event) => {
        setCreateApp({
            ...createApp,
            [event.target.name]: event.target.value
        });
    };
    //valueHandler fonction helps input to work properly

    const modeHandler = (event) => {
        setCreateApp({
            ...createApp,
            mode : event.target.value
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

    const createAppHandler = (event) =>{
        event.preventDefault();
        


        setLoading(true);
        console.log(errors);
        console.log(createApp);

        const config = {
            headers: {
                "Content-type": 'application/json; charset=UTF-8' ,
                "Authorization" : `bearer ${localStorage.getItem("refreshToken")}`,
            }
        }
        
        if(errors.appName===true || errors.scope===true || errors.mode===true || errors.scale ===true || errors.ip === true){
            handleOpenFailedSnackBar("فرم را تکمیل کنید");
            console.log("fillout form");
            setLoading(false)
        }else{
            console.log("sending data");
            axios.post("https://dev3.satpay.ir/create-app", createApp, config)
            .then(response => {
                if(response.status==201){
                    handleOpenSucceedSnackBar("برنامه با موفقیت ساخته شد ")
                }
                console.log(response)
                setLoading(false)
                })
            .catch((error)=> {
                if(error.response.data.error=='This application name exsits, Please enter a valid one.!'){
                    handleOpenFailedSnackBar("این نام برنامه قبل انتخاب شده است");
                }
                console.log(error.response.data);
                setLoading(false)
            })
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
                                    <span className='error-span'>{errors.appName && touched.appName && <p>{errors.appName}</p>} </span>
                                </Grid>
                                <Grid item xs={12} className="inputDiv">
                                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} fullWidth className='formControl'>
                                        <InputLabel id="demo-simple-select-filled-label" fullWidth>محیط برنامه</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={createApp.mode}
                                        onChange={modeHandler}
                                        onBlur={touchedHandler}
                                        name="mode"
                                        fullWidth
                                        >
                                            <MenuItem value={"sand"}>تستی</MenuItem>
                                            <MenuItem value={"operational"}>عملیاتی</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <span className='error-span'>{errors.mode && touched.mode && <p>{errors.modeMessage}</p>} </span>
                                </Grid>
                                <Grid item xs={12} className="inputDiv">
                                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} fullWidth className='formControl'>
                                        <InputLabel id="demo-simple-select-filled-label" fullWidth>پلن برنامه</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={createApp.scale}
                                        onChange={scaleHandler}
                                        onBlur={touchedHandler}
                                        name="scale"
                                        fullWidth
                                        >
                                            <MenuItem value={"startUp"}>استارت آپ</MenuItem>
                                            <MenuItem value={"smb"}>کسب و کار های کوچک</MenuItem>
                                            <MenuItem value={"mdb"}>کسب و کار های متوسط</MenuItem>
                                            <MenuItem value={"lgb"}>کسب و کار های بزرگ</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <span className='error-span'>{errors.scale && touched.scale && <p>{errors.scaleMessage}</p>} </span>
                                </Grid>
                                <Grid item xs={12} className="inputDiv">
                                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                            <Typography className='section-headers'>مشاهده و اضافه کردن آی پی</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid container className='adding-ip-inputs-div'>
                                                <Grid item xs={12} sm={8}>
                                                    <TextField
                                                        type="text"
                                                        id="filled-basic"
                                                        label="آی پی"
                                                        variant="filled"
                                                        onChange={ipValueHandler}
                                                        name="appName"
                                                        value={ipState}
                                                        onBlur={touchedHandler}
                                                        fullWidth
                                                        id="name-input"
                                                        className="ipInput"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <Button variant="contained" spacing={2} onClick={addIpHandler} >
                                                        افزودن آی پی
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            <hr/>
                                            <Grid item xs={12}>
                                                <h3>لیست آی پی ها</h3>
                                                {
                                                    ipArray.map(item=> 
                                                        <Grid container className='ip-list' key={item}>
                                                            <Grid item xs={6} className='itemGrid'>
                                                                {item}
                                                            </Grid>
                                                            <Grid item xs={6} className='buttonGrid'>
                                                                <Button variant="contained" spacing={2}>
                                                                    حذف آی پی
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                }
                                            </Grid>
                                        </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                    <span>{errors.ip && touched.ip && <p>{errors.ip}</p>} </span>
                                </Grid>
                                <Grid item xs={12} className="inputDiv">
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} name="scope">
                                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                            <Typography className='section-headers'>انتخاب نوع فعالیت برنامه</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container spacing={2}>
                                                <FormGroup aria-label="position" row>
                                                    <Grid item xs={6} sm={4} className='checkbox-grid'>
                                                        <FormControlLabel
                                                        value="GOV"
                                                        control={<Checkbox />}
                                                        label="GOV"
                                                        labelPlacement="start"
                                                        onClick={scopeHandler}
                                                        removeScope="GOV"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={4} className='checkbox-grid'>
                                                        <FormControlLabel
                                                        value="smartCity"
                                                        control={<Checkbox />}
                                                        label="smartCity"
                                                        labelPlacement="start"
                                                        onClick={scopeHandler}
                                                        removeScope="smartCity"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={4} className='checkbox-grid'>
                                                        <FormControlLabel
                                                        value="wallet"
                                                        control={<Checkbox />}
                                                        label="wallet"
                                                        labelPlacement="start"
                                                        onClick={scopeHandler}
                                                        removeScope={"wallet"}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={4} className='checkbox-grid'>
                                                        <FormControlLabel
                                                        value="bourse"
                                                        control={<Checkbox />}
                                                        label="bourse"
                                                        labelPlacement="start"
                                                        onClick={scopeHandler}
                                                        removeScope="bourse"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={4} className='checkbox-grid'>
                                                        <FormControlLabel
                                                        value="openBanking"
                                                        control={<Checkbox />}
                                                        label="openBanking"
                                                        labelPlacement="start"
                                                        onClick={scopeHandler}
                                                        removeScope="openBanking"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={4} className='checkbox-grid'>
                                                        <FormControlLabel
                                                        value="blockChain"
                                                        control={<Checkbox />}
                                                        label="blockChain"
                                                        labelPlacement="start"
                                                        onClick={scopeHandler}
                                                        removeScope="blockChain"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={4} className='checkbox-grid'>
                                                        <FormControlLabel
                                                        value="tourism"
                                                        control={<Checkbox />}
                                                        label="tourism"
                                                        labelPlacement="start"
                                                        onClick={scopeHandler}
                                                        removeScope="tourism"
                                                        />
                                                    </Grid>
                                                </FormGroup>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                    <span>{errors.scope && touched.scope && <p>{errors.scope}</p>} </span>
                                </Grid>
                                <Grid item xs={12} className="inputDiv">
                                    <Button variant="contained" color="success" fullWidth onClick={createAppHandler} className='submitButton'>
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
