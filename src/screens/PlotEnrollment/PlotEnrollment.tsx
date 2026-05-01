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
import {MapContainer,Marker,Polygon,Polyline,TileLayer,useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Coordinates = { longitude: number, latitude: number }

const PlotEnrollment = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [coordinates,] = useState<Coordinates[]>([]);
    const [isEnrollmentSucceded, setIsEnrollmentSucceded] = useState(false);

    const stepLabels = useMemo(() => getStepLabels(currentStep), [currentStep])
    const isLastStep = useMemo(() => currentStep === steps.length - 1, [currentStep]);

    const handleNext = () => {
        if (isLastStep) setIsEnrollmentSucceded(true)
        else setCurrentStep((prev) => prev + 1);
    }
    

    return <>
        <Box className={styles.header}>
            <Box className={styles.parent} >
                <IconButton className={styles.back_icon} onClick={() => navigate('/plots')}><ArrowBack /></IconButton>
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
                            {currentStep === 2 && <>
                                <MapPlotCoordinates></MapPlotCoordinates>
                            </>}


                        </Box>
                        {(!isLastStep || coordinates.length > 2) && <Button fullWidth className={styles.next} onClick={handleNext}>{isLastStep ? 'Submit' : 'Next'}</Button>}
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
                    <Button fullWidth className={styles.next} onClick={() => navigate('/plots')}>Back to Home</Button>

                </Box>}
            </Box>
        </Box>
    </>

};

const MapClickHandler = ({ onAddPoint,isFinished }:any) => {
  useMapEvents({
    click(e) {
     if(isFinished)return;
      const { lat, lng } = e.latlng;
      onAddPoint({ lat, lng });
    },
  });

  return null; // no UI
};
const MapPlotCoordinates = () => {

 const coordinates:[number,number][] = [
//   [18.6298, 73.7997],
//   [18.63, 73.80],
//   [18.628, 73.802],
];
const [points, setPoints] = useState(coordinates);
const [center,setCenter] = useState<[number, number]|undefined>(undefined)
const [isFinished,setIsFinished] = useState(false);
const handleAddPoint = (point:[number,number])=>{
    setPoints(prev=>[...prev,point])
}

const handleSaveUndo = ()=>{
    if(isFinished){
        setPoints([]);
    }
    setIsFinished(!isFinished);
}

 useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
        // fallback location
        setCenter([18.6298, 73.7997]);
      }
    );
  }, []);

  return (<>
    <MapContainer
      center={center}
      zoom={13}
      maxZoom={18}
      style={{ height: "500px", width: "100%",borderRadius:'0.5rem' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onAddPoint={handleAddPoint} isFinished={isFinished} />
      {points.map((p, i) => (
        <Marker key={i} position={p} /> 
      ))}
      {(points.length >1 && !isFinished)&& <Polyline positions={points} />}
      {isFinished && <Polygon positions={points} />}
    </MapContainer>
    <Button fullWidth className={styles.next} onClick={handleSaveUndo} disabled={(points.length<3)}>{(!isFinished) ?'Save Coordinates':'Undo'}</Button>
    </>
  );
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
                '&.Mui-focused fieldset': { border: '2px solid #0B6B2E' },
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
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px solid #0B6B2E' },
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
    const [value, setValue] = useState<any>(null);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={value}
                onChange={(newValue) => setValue(newValue)}
                sx={{
                    '&.MuiFormControl-root.MuiPickersTextField-root': {
                        '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root': {
                            backgroundColor: '#efefeb',
                            borderRadius: '0.75rem',
                            '& .MuiPickersOutlinedInput-notchedOutline': {
                                border: 'none',
                                outline: 'none',
                                // backgroundColor:'#efefeb',

                            },
                            '&:hover .MuiPickersOutlinedInput-notchedOutline': {

                                border: '1px solid #4CAF50'
                            },
                            '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
                                border: '2px solid #0B6B2E'
                            },
                        }
                    }

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