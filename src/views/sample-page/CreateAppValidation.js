export const createAppValidation = data =>{

    const errors = {};

    if(!data.appName.trim()){
        errors.appName= true;
        errors.appNameMessage= "نام برنامه را وارد کنید";
    }else{
        delete errors.appName;
    }
    //appName validation

    if(!data.mode){ 
        errors.mode =true;
        errors.modeMessage = "یکی از موارد را انتخاب کنید";
    }else{
        delete errors.mode;
    }
    //mode validation

    if(!data.scale){ 
        errors.scale =true;
        errors.scaleMessage = "یکی از موارد را انتخاب کنید";
    }else{
        delete errors.scale;
    }
    //scale validation

    if(!data.scope.length){ 
        errors.scope =true;
        errors.scopeMessage ="یکی از موارد را انتخاب کنید"
    }else{
        delete errors.scope;
    }
    //scope validation

    if(!data.ip.length){ 
        errors.ip =true;
        errors.ipMessage ="ای پی وارد کنن"
    }else{
        delete errors.ip;
    }
    //ip validation


    return errors;
}