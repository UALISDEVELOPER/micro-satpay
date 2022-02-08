export const validate = data =>{

    const errors = {};

    if(!data.name.trim()){
        errors.name= "نام و نام خانوادگی خود را وارد کنید"
    }else if(data.name.length < 6){
        errors.name="نام و نام خانوادگی کوتاه است"
    }else{
        delete errors.name
    }
    //user name validation
    if(!data.email.trim()){
        errors.email= "ایمیل خود را وارد کنید";
    }else if (data.email.indexOf("@")=== -1 || data.email.indexOf(".")=== -1 || data.email.indexOf("com")=== -1 ){
        errors.email= "ایمیل معتبر نمیباشد";
    }else{
        delete errors.email;
    }
    //email validation

    if(!data.password.trim()){ 
        errors.password ="رمزعبور خود را وارد کنید"
    }else if (data.password.length < 8){
        errors.password = "رمز عبور باید حداقل 8 کاراکتر باشد"
    }else{
        delete errors.password;
    }
    //password validation

    if(!data.confirmPassword.trim()){
        errors.confirmPassword="رمز عبور را تکرار کنید"
    }else if(!(data.confirmPassword === data.password)){
        errors.confirmPassword="پسورد وارد شده مطابقت ندارد"
    }else{
        delete errors.confirmPassword;
    }
    //password confimation validation


    if(!data.companyName.trim()){
        errors.companyName= "نام شرکت خود را وارد کنید"
    }else if(data.companyName.length < 6){
        errors.companyName="نام شرکت باید حداقل 6 کاراکتر باشد"
    }else{
        delete errors.companyName
    }
    //companyName name validation

    if(!data.nationalCode.trim()){
        errors.nationalCode= "کد ملی خود را وارد کنید"
    }else if(data.nationalCode.length < 9){
        errors.nationalCode="کد ملی شما کوتاه است"
    }else{
        delete errors.nationalCode
    }
    //nationalCode validation

    if(!data.postalCode.trim()){
        errors.postalCode= "کد پستی خود را وارد کنید"
    }else if(data.postalCode.length < 5){
        errors.postalCode="کد پستی شما کوتاه است"
    }else{
        delete errors.postalCode
    }
    //postalCode validation

    if(!data.mobile.trim()){
        errors.mobile= "شماره تلفن همراه خود را وارد کنید"
    }else if(data.mobile.length < 9){
        errors.mobile="شماره تلفن همراه باید حداقل 9 کاراکتر باشد"
    }else{
        delete errors.mobile
    }
    //mobile validation

    if(!data.activity){
        errors.activity= "نوع فعالیت خود را وارد کنید"
    }
    // else if(data.activity.length < 6){
    //     errors.activity=""
    // }
    else{
        delete errors.activity
    }
    //activity validation

    if(!data.address.trim()){
        errors.address= "آدرس خود را وارد کنید"
    }else if(data.address.length <12){
        errors.address="آدرس شما کوتاه میباشد"
    }else{
        delete errors.address
    }
    //address validation


    return errors;
}