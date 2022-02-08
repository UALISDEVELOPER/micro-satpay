export const loginValidate = data =>{

    const errors = {};

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

    return errors;
}