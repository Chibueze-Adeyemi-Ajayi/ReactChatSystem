import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import Recover from './components/Recover';
import Alert from './components/Dialog/Alert';
import Progress from './components/Dialog/Progress';
import $ from 'jquery';
import BASE_URL from './http/url';
import Snackbar from './components/Dialog/Snackbar';

let cname = "session";

function getCookie() {
  let name = cname, decodedCookie = decodeURIComponent(document.cookie), ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
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

function App() {

  const [snack_var, snack_func] = useState(<></>);
  const [alert_var, alert_func] = useState(<></>);
  const [progress_var, progress_func] = useState(<></>);

  let [app_var, app_func] = useState("login");

  useEffect(() => {
    // checking if the user already has a session logged in
    let id = getCookie(); 

    if (id != "") { id = id.substring(1);
      let url = BASE_URL + "authenticate/", data = { "id" : id }
      //remote calling
      show_progress(true, progress_func);
      $.post(url, data, (data, status) => {
          data = JSON.parse(data);
          let code = data.code; 
          
          if (code == 200) { 

              show_snackbar("Organizing your workspace ....", snack_func);
              app_func('chat');
              console.log(data.result);

          } else { show_snackbar("Welcome please login ....", snack_func); }
          console.log(data); 
          show_progress(false, progress_func);
      });

    }

  }, []);

  let components = {
    "signup": <Signup func={app_func}/>, "login": <Login func={app_func}/>, 
    "chat": <Chat func={app_func}/>, "recover": <Recover func={app_func}/>
  }
  
  return (
    <>
    {snack_var} {alert_var} {progress_var}
    <div className="w-full h-[100%] flex flex-col bg-white  dark:bg-gray-800">
      {components[app_var]}
    </div>
    </>
  );
}

export default App;
