import {Box, Button} from '@mui/material';
import styles from './header.module.scss'
import logo from '../../assets/Farmer Profile.svg'


const Header = ()=>{
    return <Box className={styles.container}>
        {/* <Grid container> */}
            {/* <Grid size={{xs:12,sm:6}}> */}
                <Box className={styles.flex_center}>
                <Box className={`${styles.flex_between}`} sx={{width:{xs:'100%', sm:'50%'},padding:'0.5rem'}}>
                    <Box className={styles.username_logo}>
                        <img src={logo} className={styles.logo}></img>
                        <Box className={styles.username}>Resilent Farmer</Box>
                    </Box>
                    <Button className={styles.chip}>English</Button>
                </Box>
                </Box>
            {/* </Grid> */}
        {/* </Grid> */}
    </Box>
}

export default Header;