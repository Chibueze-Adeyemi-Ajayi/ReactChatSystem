import { useState } from 'react';
import logo from '../asset/img/logo.png'
import Alert from './Dialog/Alert';
import Progress from './Dialog/Progress';
import $ from 'jquery';
import BASE_URL from '../http/url';
import Snackbar from './Dialog/Snackbar';

let index = 0; 

const show_snackbar = function (message, func) {
    func(<Snackbar message={message} />);
    setTimeout(() => {
        func(<></>);
    }, 2000);
}

const Signup = (props) => {

    const [alert, func] = useState(false);
    const [alert_message, alert_func] = useState(false);
    const [progress, func_] = useState(false);
    const [snack_var, snack_func] = useState(<></>);

    return (
        <>{snack_var}
        {alert ? <Alert state_func={func} title="Registration Error" message="Invalide invitation code"/> : <></>}
        {progress ? <Progress/> : <></>} 
        <div className="w-full flex h-full bg-white dark:bg-gray-800">
            <section className="bg-inherit w-full h-fit p-6 mx-auto my-auto md:w-[400px] flex flex-col space-y-5">
                <img src={logo} className="w-54 mx-auto h-40"></img>
                <font className="font-bold text-3xl text-blue-600">Welcome to T21</font>
                <section className="w-full items-center h-fit flex flex-row space-x-4">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path className="fill-blue-600" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                    </svg>
                    <input id='uid' placeholder="Username" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                </section>
                <section className="w-full items-center h-fit flex flex-row space-x-4">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 512">
                        <path className="fill-blue-600" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/>
                    </svg>
                    <input id='code' placeholder="Invitation code" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                </section>
                <section className="w-full items-center h-fit flex flex-row space-x-4">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path className="fill-blue-600" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"/>
                    </svg>
                    <input id='pwd' placeholder="Create password" type="password" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                    <svg onClick={() => {
                        index = (index == 0)? 1 : 0;
                        let d = [
                            "M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z",
                            "M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                        ];
                        $("#eye").attr("d", d[index]);
                        if (index == 1) $("#pwd").attr("type", "text");
                        else $("#pwd").attr("type", "password");
                    }} className='w-6 cursor-pointer h-6 -ml-12' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                        <path id='eye' className='dark:fill-blue-600 fill-gray-800' d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/>
                    </svg>
                </section>
                <button onClick={() => { //func_(true); 
                     
                    try {

                        const uid = $("#uid").val(), code = $("#code").val(), pwd = $("#pwd").val();
                        
                        if (uid == "" || uid.length <= 3) {
                            show_snackbar("Username should exceed 3 characters", snack_func);
                            return false;
                        }

                        if (pwd == "" || pwd.length < 4) {
                            show_snackbar("Your password should exceed 5 charactres", snack_func);
                            return false;
                        } 

                        if (code == "" || code.length <= 5) {
                            show_snackbar("Invalid invitation code", snack_func);
                            return false;
                        }

                        func_(true);

                        let data = {user_name : uid, invite_code : code, password : pwd}
                        $.post(BASE_URL + "authenticate/signup/", data, (data, status) => {
                            data = JSON.parse(data);
                            let code = data.code; 
                            
                            if (code == 200) { 
                                show_snackbar("Organizing your workspace ....", snack_func);
                                props.func('login');
                            } else {

                                alert_func(data.message);
                                func(true);

                            }
                            console.log(data.code); func_(false);
                        });

                    } catch (error) { console.log(error); func(false); } finally {  }
    
                }} className="w-full h-10 bg-blue-600 rounded-md">Create Account</button>
                <button onClick={() => { props.func('login'); }} className='text-gray-800 dark:text-white hover:underline'>Already have account ?</button>
            </section>
        </div>
     
        </>
    );
}

export default Signup;