const steps = ['Information', 'Photo','Location'];

const getStepLabels = (stepNumber:number)=>{

    switch(stepNumber){
        case 0 :
        return { label:'Plot Information',subLabel:'Fill the below information to register'};
        case 1 :
        return { label:'Plot Information',subLabel:'Fill the below information to register'};
        case 2 :
        return { label:'Plot Location',subLabel:'Select location from your plot'};
    }

}

export {steps,getStepLabels};