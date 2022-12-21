import logo from '../asset/img/logo.png'
import logo_react from '../asset/img/logo192.png'
import Alert from './Dialog/Alert';
import Progress from './Dialog/Progress';
import $ from 'jquery';
import BASE_URL from '../http/url';
import Snackbar from './Dialog/Snackbar';
import { useState } from 'react';

let cname = "session";

const create_cookie = (cvalue) => {
    // register session with cookies
    let date = new Date(); date.setDate(date.getDate() + 1);
    let time = date.getUTCDate();
    document.cookie = cname + "=" + cvalue + ";" + time + ";path=/";
}
  
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

const Login = (props) => {

    const [snack_var, snack_func] = useState(<></>);
    const [alert_var, alert_func] = useState(<></>);
    const [progress_var, progress_func] = useState(<></>);

    return (
        <>{snack_var} {alert_var} {progress_var}
            <div className="w-full flex h-full bg-white dark:bg-gray-800">
                <section className="bg-inherit w-full h-fit p-6 mx-auto my-auto md:w-[400px] flex flex-col space-y-5">
                    <img src={logo_react} className="w-54 mx-auto h-40"></img>
                    <font className="font-bold text-3xl text-blue-600">Please Login</font>
                    <section className="w-full items-center h-fit flex flex-row space-x-4">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path className="fill-blue-600" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                        </svg>
                        <input id='uid' placeholder="Username or email" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                    </section>
                    <section className="w-full items-center h-fit flex flex-row space-x-4">
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path className="fill-blue-600" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"/>
                        </svg>
                        <input id='pwd' placeholder="Password" type="password" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                    </section>
                    <button onClick={() => {
                        let uid = $("#uid").val(), pwd = $("#pwd").val();

                        if (uid == "" || pwd == "") {
                            show_snackbar("Invalid entry", snack_func)
                            return false;
                        }

                        let url = BASE_URL + "authenticate/login", data = {
                            "user_name" : uid, "password" : pwd
                        }

                        show_progress(true, progress_func);

                        $.post(url, data, (data, status) => {
                            data = JSON.parse(data);
                            let code = data.code; 
                            
                            if (code == 200) { 

                                create_cookie(data.result);
                                show_snackbar("Organizing your workspace ....", snack_func);
                                props.func('chat');
                                console.log(data.result);

                            } else {

                                show_alert(data.status, "Login error", alert_func, alert_func);

                            }
                            console.log(data); 
                            show_progress(false, progress_func);
                        });

                    }} className="w-full h-10 bg-blue-600 rounded-md">Login</button>
                    <button onClick={() => {
                        props.func('recover');
                    }} className='text-gray-800 dark:text-white hover:underline'>Forgot password ?</button>
                    <button onClick={() => {
                        props.func('signup');
                    }} className='text-gray-800 dark:text-white hover:underline'>New here ?</button>
                </section>
            </div>
        </>
    );
}

export default Login;