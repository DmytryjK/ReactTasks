import errorImg from './error.gif'

const ErrorMessage = () => {
    return(
        // <img src={process.env.PUBLIC_URL + '/error.gif'} alt="Error img"/> Если бы нужно было из папки Public достать эту гифку
        <img style={{display: "block", width: "150px", margin: "0 auto", borderRadius: '50%', height: "150px"}} src={errorImg} alt="Error img"/>
    )
}

export default ErrorMessage;