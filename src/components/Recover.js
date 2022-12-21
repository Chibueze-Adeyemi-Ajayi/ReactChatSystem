import logo from '../asset/img/logo.png'
import Alert from './Dialog/Alert';
import Progress from './Dialog/Progress';
import $ from 'jquery';
import BASE_URL from '../http/url';
import Snackbar from './Dialog/Snackbar';
import { useState } from 'react';

const show_snackbar = function (message, func) {
    func(<Snackbar message={message} />);
    setTimeout(() => {
        func(<></>);
    }, 2000);
}

const show_alert = function (message, title, func, exit) {
    func(<Alert title={title} message={message}  state_func={exit}/>);
}

const show_progress = (status, func) => {
    func(status ? <Progress/> : <></>);
}

const Recover = (props) => {
    
    const [snack_var, snack_func] = useState(<></>);
    const [alert_var, alert_func] = useState(<></>);
    const [progress_var, progress_func] = useState(<></>);

    return (
        <>
            {snack_var} {alert_var} {progress_var}
            <div className="w-full flex h-full bg-white dark:bg-gray-800">
                <section className="bg-inherit w-full h-fit p-6 mx-auto my-auto md:w-[400px] flex flex-col space-y-5">
                    <img src={logo} className="w-54 mx-auto h-40"></img>
                    <font className="font-bold text-3xl text-blue-600">Recover Password</font>
                    <section className="w-full items-center h-fit flex flex-row space-x-4">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 512">
                            <path className="fill-blue-600" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/>
                        </svg>
                        <input id='code' placeholder="Invite code" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                    </section>
                    <section className="w-full items-center h-fit flex flex-row space-x-4">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path className="fill-blue-600" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"/>
                        </svg>
                        <input id='pwd' placeholder="New password" type="password" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                    </section>
                    <button onClick={() => {
                        let code = $("#code").val(), pwd = $("#pwd").val();
                        
                        if (code == "" || pwd == "") {
                            show_snackbar("Invalid entry", snack_func)
                            return false;
                        }

                        
                        let url = BASE_URL + "authenticate/recover", data = {
                            "invite_code" : code, "password" : pwd
                        }

                        show_progress(true, progress_func);

                        $.post(url, data, (data, status) => {
                            data = JSON.parse(data);
                            let code = data.code; 
                            
                            if (code == 200) { 

                                show_alert(data.status, "Login error", alert_func, alert_func);
                                setTimeout(function () {
                                    props.func('login');
                                }, 2000) 
                                show_snackbar("Please wait ....", snack_func);
                               
                            } else {

                                show_alert(data.status, "Login error", alert_func, alert_func);

                            }
                            console.log(data); 
                            show_progress(false, progress_func);
                        });


                    }} className="w-full h-10 bg-blue-600 rounded-md">Change Password</button>
                    <button onClick={() => {
                        props.func('login');
                    }} className='text-gray-800 dark:text-white hover:underline'>Remembered password ?</button>
                    <button onClick={() => {
                        props.func('signup');
                    }} className='text-gray-800 dark:text-white hover:underline'>Create account ?</button>
                </section>
            </div>
        </>
    );
}

export default Recover;