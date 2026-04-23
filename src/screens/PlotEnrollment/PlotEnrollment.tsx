import { useEffect, useMemo } from 'react';
import { Box, Button, Chip, IconButton, MenuItem, Select, Step, StepLabel, Stepper, TextField } from '@mui/material';
import styles from './PlotEnrollment.module.scss';
import { ArrowBack } from '@mui/icons-material'
import plot from '../../assets/plot_type.svg';
import crop from '../../assets/crop.svg';
import check from '../../assets/check.svg';
import calender from '../../assets/calender.svg';
import message from '../../assets/message.svg';
import { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import { getStepLabels, steps, } from './utils';

type Coordinates = { longitude: number, latitude: number }

const PlotEnrollment = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
    const [isEnrollmentSucceded, setIsEnrollmentSucceded] = useState(true);

    const stepLabels = useMemo(() => getStepLabels(currentStep), [currentStep])
    const isLastStep = useMemo(() => currentStep === steps.length - 1, [currentStep]);

    const handleNext = () => {
        if (isLastStep) console.log(currentStep)
        else setCurrentStep((prev) => prev + 1);
    }
    const getLocation = () => {
        if (!navigator.geolocation) {
            //   setError("Geolocation not supported");
            console.log('error in location')
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                console.log('location', pos)
                setCoordinates([...coordinates, { longitude: pos.coords.longitude, latitude: pos.coords.latitude }])
            },
            (err) => {
                console.log('error in location')
            },
            {
                enableHighAccuracy: true,
                timeout: 10000
            }
        );
    };




    return <>
        <Box className={styles.header}>
            <Box className={styles.parent} >
                <IconButton className={styles.back_icon} onClick={() => navigate('/dashboard')}><ArrowBack /></IconButton>
                <Box className={styles.font18}>Plot Registration</Box>
            </Box>
        </Box>
        <Box className={styles.container}>
            <Box className={styles.parent} sx={{ width: { xs: 'auto', sm: '50%' } }}>
                {!isEnrollmentSucceded ? <>
                    <Stepper alternativeLabel activeStep={currentStep}>
                        {steps.map((step) => {
                            return <Step key={step}>
                                <StepLabel
                                    slotProps={{
                                        stepIcon: {
                                            sx: {
                                                color: 'gray',
                                                '&.Mui-active': {
                                                    color: '#15803D',
                                                },
                                                '&.Mui-completed': {
                                                    color: '#15803D',
                                                },
                                            },
                                        },
                                    }}
                                >{step}</StepLabel>
                            </Step>
                        })}
                    </Stepper>
                    <Box className={styles.form}>
                        <Box className={styles.label_parent}>
                            <Box className={styles.formlabel}>{stepLabels?.label}</Box>
                            <Box className={styles.sub_label}>{stepLabels?.subLabel}</Box>
                        </Box>
                        <Box className={styles.fields}>
                            {currentStep === 0 && <>
                                <Box className={styles.field}>
                                    <Box className={styles.field_label}>
                                        <Box component={'img'} src={plot}></Box>
                                        <Box className={styles.field_label}>Plot Name</Box>
                                    </Box>
                                    <CustomTextfield />
                                </Box>
                                <Box className={styles.field}>
                                    <Box className={styles.field_label}>
                                        <Box component={'img'} src={crop}></Box>
                                        <Box className={styles.field_label}>Crop Variety</Box>
                                    </Box>
                                    <CustomSelect />
                                </Box>
                                <Box className={styles.field}>
                                    <Box className={styles.field_label}>
                                        <Box component={'img'} src={calender}></Box>
                                        <Box className={styles.field_label}>Plantation Date</Box>
                                    </Box>
                                    <CustomDatePicker />
                                </Box>
                            </>}
                            {currentStep === 2 && <Box>
                                <Button fullWidth className={styles.next} onClick={getLocation}>Get Location</Button>
                                {coordinates.map((coordinate) => <Box>{coordinate.longitude}</Box>)}
                            </Box>}


                        </Box>
                        <Button fullWidth className={styles.next} onClick={handleNext}>{isLastStep ? 'Submit' : 'Next'}</Button>
                    </Box>
                </> : <Box className={styles.success}>
                    <Box className={styles.logo_label}>
                        <Box className={`${styles.dot} ${styles.flex_center}`}><img src={check} className={styles.check} /></Box>
                        <Box className={styles.confirmation}>Registration Successful!</Box>
                        <Box className={styles.message}>Your plot has been registered. Please wait for approval</Box>
                    </Box>
                    <Box className={styles.plot_details}>
                        <Box className={`${styles.heading} ${styles.flex_between}`}>
                            <Box className={styles.label}>Plot Information</Box>
                            <Chip label='pending' className={styles.status}></Chip>
                        </Box>
                        <Box className={styles.crop_details}>
                            <Box className={styles.area}>
                                <Box className={styles.label}>Area</Box>
                                <Box className={styles.value}>2.5 Acres</Box>
                            </Box>
                            <Box className={styles.area}>
                                <Box className={styles.label}>Crop Type</Box>
                                <Box className={styles.value}>Sugarcane</Box>
                            </Box>
                        </Box>
                        <Box className={styles.crop_details}>
                             <Box className={styles.area}>
                                <Box className={styles.label}>Plot ID</Box>
                                <Box className={styles.value}>UAG-44298-PO</Box>
                            </Box>
                        </Box>
                        <Box className={styles.message}>
                            <img src={message} className={styles.icon}></img>
                            <Box className={styles.text}>Field officer will get in touch with you</Box>
                        </Box>

                    </Box>

                </Box>}
            </Box>
        </Box>
    </>

};



const CustomTextfield = () => {

    return <TextField
        fullWidth
        placeholder='Enter Here'
        className={styles.custom_textfield}
        sx={{
            '& .MuiOutlinedInput-root': {
                background: '#efefeb',
                borderRadius: '0.75rem',
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: '1px solid #4CAF50' },
                '&.Mui-focused fieldset': { border: '1px solid #0B6B2E' },
            },
        }}
    />
}

const CustomSelect = () => {
    const cropTypes = ['CO86032', 'VSI0805']
    const [value, setValue] = useState('');
    return <Select
        value={value}
        sx={{
            background: '#efefeb',
            borderRadius: '0.75rem',
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid #4CAF50' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '1px solid #0B6B2E' },
        }}
        onChange={(event) => setValue(event.target.value)}
        renderValue={(selected) => {
            if (!selected) { return <span className={styles.placeholder}>Select variety</span> }
            return value
        }}
        displayEmpty
    >
        {cropTypes.map((cropType) => <MenuItem value={cropType}>{cropType}</MenuItem>)}
    </Select>
}

const CustomDatePicker = () => {
    const [value, setValue] = useState(null);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={value}
                sx={{
                    '& .MuiPickersOutlinedInput-root': {
                        background: '#efefeb',
                        borderRadius: '0.75rem',
                    },
                    '& .MuiPickersOutlinedInput-root .MuiPickersOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiPickersOutlinedInput-root:hover .MuiPickersOutlinedInput-notchedOutline': {
                        border: '1px solid #4CAF50',
                    },
                    // Add the parent class to increase specificity
                    '& .MuiPickersTextField-root .MuiPickersOutlinedInput-root.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
                        border: '1px solid #0B6B2E',
                    },
                    // Also override the direct MUI variable that drives the blue color
                    '& .MuiPickersOutlinedInput-root.Mui-focused': {
                        '--mui-palette-primary-main': '#0B6B2E',
                    },
                }}
                slotProps={{
                    popper: {
                        placement: 'bottom-end',
                    },
                }}
            />
        </LocalizationProvider>
    );
};


export default PlotEnrollment;