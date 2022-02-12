export const createAppValidation = data =>{

    const errors = {};

    if(!data.appName.trim()){
        errors.appName= "نام برنامه را وارد کنید";
    }else{
        delete errors.appName;
    }
    //appName validation

    if(!data.scope.length){ 
        errors.scope ="یکی از موارد را انتخاب کنید"
    }else{
        delete errors.scope;
    }
    //scope validation

    return errors;
}