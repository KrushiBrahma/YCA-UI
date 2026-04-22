import { Box, Chip,Button, Icon, IconButton } from '@mui/material';
import styles from './plots.module.scss';
import actionIcon from '../../assets/action_icon.svg'
import plot_one from '../../assets/Container.svg'
import plot_two from '../../assets/Map View Highway Plot.svg'

import addplot from '../../assets/Background.svg'
import { plots } from './utils';

const Dashboard = () => {
    return <>
    <Box className={styles.container}>
        <Box className={styles.parent} sx={{ width: { xs: 'auto', sm: '50%' } }}>
            <Box className={styles.heading_info}>
                <Box className={styles.heading}>
                    <Box className={styles.label}>Agri Portfolio</Box>
                    <Box className={styles.sub_label} sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}>My Agriland</Box>
                    <Box className={styles.underline} />
                </Box>
                <Box className={styles.plot_info}>
                    <Box className={styles.label}>Total Area</Box>
                    <Box className={styles.value}>14.2 <span className={styles.label}>Acres</span></Box>
                </Box>
            </Box>
            {plots.map((plot)=><Plot plotInfo={plot}></Plot>)}
            <Box className={styles.new_plot}>
                <Box className={styles.add_plot}>
                <Box component={'img'} src={addplot} className={styles.logo}></Box>
                <Box className={styles.label}>Add Plot</Box>
                <Box className={styles.sub_label}>Add new plot to track the growth</Box>
                </Box>
            </Box>
            
        </Box>
    </Box>
    
    </>

};

const Plot = ({plotInfo}:any)=>{
    const {plotName,plot_image,crop_name,variety}=plotInfo
    return <Box className={styles.card}>
                <Box component={'img'} src={plot_image} className={styles.card_image}></Box>
                <Box className={styles.card_content}>
                    <Box className={styles.plot_details}>
                        <Box className={styles.plot_info}>
                            <Box className={styles.name_info}>
                                <Box className={styles.plot_name}>{plotName}</Box>
                                <Box className={styles.crop_info}>
                                    <Chip label={variety} className={styles.chip}></Chip>
                                    <Box className={styles.crop_name}>{crop_name}</Box>
                                </Box>
                            </Box>
                            <Icon><Box component={'img'} src={actionIcon} className={styles.image}></Box></Icon>
                        </Box>
                        <Box className={styles.plot_area}>
                            <Box className={styles.area}>
                                <Box className={styles.label}>Area</Box>
                                <Box className={styles.value}>14.5 <span className={styles.unit}>Acres</span></Box>
                            </Box>
                            <Chip label='Planned' className={styles.chip}></Chip>

                        </Box>
                    </Box>
                </Box>
            </Box>
}

export default Dashboard;