import { useEffect, useState } from "react";
import logo from '../asset/img/logo.png';
import Notification from "./Notification";
import Profile from "./Profile";
import Settings from "./Settings";
import Alert from './Dialog/Alert';
import Progress from './Dialog/Progress';
import $ from 'jquery';
import BASE_URL from '../http/url';
import Snackbar from './Dialog/Snackbar';
import Confirm from "./Dialog/Confirm";
import ListAlert from "./Dialog/ListAlert";
import ID from "./session/user";
import { getReceiverID, getSenderID, lastSenderID, updateLastSenderID, setReceiverID, setSenderID, updateReceiverID, getTabSection, setTabSection, loadedGroups, setLoadedGroups, setToPersonalChat, setToGroupChat, isChatPersonal, hasGroupWorkerEffect, loadGroupEffect, hasLoadedWorkerEffect, loadWorkerEffect, hasPersonalMessageEffect, loadPersonalMessageEffect, hasGroupMessageEffect, loadGroupMessageEffect, getGroupID, setGroupID, setStatus, getStatus, getMessageType, getRawMessageType, setMessageType, getRawMessageType_, IsMessageLast } from "./session/chat";
import EmptyChat from "./EmptyChat";
import GroupInfo from "./Group-Info";
import { getGroupName, setGroupName } from "./session/group-create";
import FineAlert from "./Dialog/FineAlert";
import URL from "./session/http";
import Prompt from "./Dialog/Prompt";
import Invite from "./Dialog/Invite";
import MessageInbox from "./Dialog/MessageInfo.";
import UserInfo from "./User-Info";
import Modules from "./Modules";
import { ShowNotification } from "./session/notification";

const show_snackbar = function (message, func) {
    func(<Snackbar message={message} />);
    setTimeout(() => {
        func(<></>);
    }, 2000);
}

const show_alert = function (message, title, func, exit) {
    func(<Alert title={title} message={message} state_func={exit}/>);
}

const show_progress = (status, func) => {
    func(status ? <Progress/> : <></>);
}

const show_invite = function (func, exit) {
    func(<Invite show_progress={show_progress} show_snackbar={show_snackbar} state_func={exit}/>);
}

const show_fine_alert = function (message, title, id, func, exit) {
    func(<FineAlert show_snackbar={show_snackbar} progress_bar={show_progress} title={title} raw={id} message={message} state_func={exit}/>);
}

const show_confirm = (title, message, exit, callback, func) => {
    func(<Confirm title={title} message={message} state_func={exit} callback={callback}/>);
}

const show_list = (title, data, exit, func) => {
    func(<ListAlert title={title} data={data} state_func={exit} />);
}

//listing co worker functions
const StaffList = (props) => {
    const [passport_var, passport_func] = useState("");
    let image = <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path className="fill-blue-600" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"/>
                </svg>;
    let passports = props.passports;
    let has_dp = typeof passports[props.id] == "string";
    
    if (has_dp) image = <img src={URL + "PASSPORT/" + passports[props.id]} className="w-10 h-10 rounded-full my-auto mx-auto"/>;

    return (
        <section id={"list-" + props.id} onClick={() => { let receiver_id = props.id; 
            setSenderID(receiver_id); updateReceiverID(receiver_id);
            $("#co-worker-name").html(props.username);
            $("#co-worker-icon").fadeIn(); $("#info-icon").fadeIn();
            show_snackbar("Loading message ....", props.closure);
            $("#menu-tab").fadeIn(); props.chat_func(<EmptyChat/>);
            if (has_dp){ 
                props.group_dp_func(true);
                setTimeout(() => { $("#info-img").attr("src", URL + "PASSPORT/" + passports[props.id]) }, 100);
            } else {
                props.group_dp_func(false);
                setTimeout(() => { $("#co-worker-icon").fadeIn(); }, 100);
            }

        }} className="w-full cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-900 hover:dark:border-gray-900 border-b items-center border-gray-200 dark:border-gray-900 h-fit p-3 flex flex-row space-x-4">
            {image}
            <div className="w-full h-full flex flex-col space-y-1">
                <font className="text-md capitalize font-bold dark:text-white text-gray-700">{props.username}</font>
                <font className="dark:text-gray-200 text-gray-600 dark:text-white/50 text-sm">{props.message}</font>
            </div>
            <div className="w-fit h-full flex flex-col space-y-1">
                <font className="text-sm dark:text-white text-gray-700">{props.time}</font>
                <font className="dark:text-white text-white rounded-full text-center text-sm">
                    {! props.read ? 
                      <svg className="w-4 mx-auto h-4 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path className="fill-blue-600" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/>
                      </svg>
                    : <></>}
                </font>
            </div>
        </section>
    );
}

// listing groups functions
const GroupList = (props) => {
    return (
        <section id={"list-" + props.id} onClick={() => {
            let group_id = props.id
            if (props.icon.indexOf(".png") > -1){ 
                props.group_dp_func(true);
                setTimeout(() => { $("#info-img").attr("src", BASE_URL.replace("api/", "") + props.icon) }, 100);
            } else {
                props.group_dp_func(false);
                setTimeout(() => { $("#co-worker-icon").fadeIn(); }, 100);
            }
            $("#co-worker-name").html(props.username);
            setGroupName(props.username); updateReceiverID(group_id);
            setGroupID(group_id); $("#info-icon").fadeIn();
            show_snackbar("Loading message ....", props.closure);
            $("#menu-tab").fadeIn(); props.chat_func(<EmptyChat/>);
        }} className="w-full cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-900 hover:dark:border-gray-900 border-b items-center border-gray-200 dark:border-gray-900 h-fit p-3 flex flex-row space-x-4">
            {
                (props.icon.indexOf(".png") > -1)? <img id={"dp_" + props.id} className="w-12 rounded-full h-12" src={BASE_URL.replace("api/", "") + props.icon}></img> : <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                <path className="fill-blue-600" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"/>
            </svg>
            }
            <div className="w-full h-full flex flex-col space-y-1">
                <font className="text-md capitalize font-bold dark:text-white text-gray-700">{props.username}</font>
                <font className="dark:text-gray-200 text-gray-600 dark:text-white/50 text-sm">{
                    (props.message.length > 50) ? props.message.slice(0, 50) + "..." : props.message
                }</font>
            </div>
            <div className="w-fit h-full flex flex-col space-y-1">
                <font className="text-sm dark:text-white text-gray-700">{props.time}</font>
                <font className="dark:text-white text-white rounded-full text-center text-sm">
                    {! props.read ? 
                      <svg className="w-4 mx-auto h-4 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path className="fill-blue-600" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/>
                      </svg>
                    : <></>}
                </font>
            </div>
        </section>
    );
}

const User = (props) => {
    return (
        <section onClick={() => {
            if (!props.me) {
                let list = `#list-${props.id}`;
                $(list).click();
                props.user_search_func(<></>);
            }
        }} className="w-full cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-900 hover:dark:border-gray-900 border-b items-center border-gray-200 dark:border-gray-900 h-fit p-3 flex flex-row space-x-6">
            <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                <path className="fill-blue-600" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"/>
            </svg>
            <div className="w-full h-full flex flex-col space-y-1">
                <font className="text-md my-auto uppercase font-bold dark:text-white text-gray-700">
                    {props.name} {props.me ? <span>(ME)</span> : <></>}
                </font>
            </div>
            
            {/* <div className="w-fit h-full flex flex-row space-x-4">
                <button className="px-4 py-2 flex flex-row space-x-2 bg-blue-600 rounded-md text-white my-auto">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"> 
                    <path className="dark:fill-white fill-gray-800" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"/>
                </svg>
                <font className="my-auto">Profile</font>
                </button>
                { ! props.me ? 
                <button className="px-4 py-2 flex flex-row space-x-2 bg-blue-600 rounded-md text-white my-auto">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> 
                        <path className="dark:fill-white fill-gray-800" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/>
                    </svg>
                    <font className="my-auto">inbox</font>
                </button>
                 : <></>}
            </div> */}
            
        </section>
    );
}

const getAttachmentIcon = (raw) => {
    if (raw == "attachment") return <svg className="w-16 h-16 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path className="fill-white" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"/>
                                    </svg>;
    if (raw == "video") return <svg className="w-16 h-16 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path className="fill-white" d="M384 121.941V128H256V0h6.059c6.365 0 12.47 2.529 16.971 7.029l97.941 97.941A24.005 24.005 0 0 1 384 121.941zM224 136V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248c-13.2 0-24-10.8-24-24zm96 144.016v111.963c0 21.445-25.943 31.998-40.971 16.971L224 353.941V392c0 13.255-10.745 24-24 24H88c-13.255 0-24-10.745-24-24V280c0-13.255 10.745-24 24-24h112c13.255 0 24 10.745 24 24v38.059l55.029-55.013c15.011-15.01 40.971-4.491 40.971 16.97z"/>
                                </svg>;
    if (raw == "image") return <svg className="w-16 h-16 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path className="fill-white" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"/>
                                </svg>;
}

const ChatList = (props) => {
    const type = props.type;
    //console.log(props.id, IsMessageLast(props.id));
    if (IsMessageLast(props.id)) if (!props.me) ShowNotification(props.sender, props.message);
    
    const msg_box = <div onDoubleClick={(e) => {
        props.msg_info_func(<MessageInbox show_snackbar={show_snackbar} event={e} message={props} show_progress={show_progress} profile_func={props.profile_func}/>);
    }} className="w-full text-white flex flex-col bg-gray-400 p-4 rounded-l-3xl rounded-tr-3xl dark:bg-gray-600">
                        <font className="w-full h-fit flex flex-col space-y-4">
                            <span>{(type == "link")? <a target="_blank" className="text-blue-300 underline" href={"https://" + props.message.replace("https://bit.ly/link/", "")}>{props.message.replace("https://bit.ly/link/", "")}</a> : props.message}</span>
                            {(type == "link")? <span className="w-full h-fit flex flex-row pb-3 space-x-4">
                                <font className="w-full"></font>
                                <a target="_blank" className="text-blue-300 underline" href={"https://" + props.message.replace("https://bit.ly/link/", "")}>
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                    <path className="fill-white" d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm160 215.5v6.93c0 5.87-3.32 11.24-8.57 13.86l-15.39 7.7a15.485 15.485 0 0 1-15.53-.97l-18.21-12.14a15.52 15.52 0 0 0-13.5-1.81l-2.65.88c-9.7 3.23-13.66 14.79-7.99 23.3l13.24 19.86c2.87 4.31 7.71 6.9 12.89 6.9h8.21c8.56 0 15.5 6.94 15.5 15.5v11.34c0 3.35-1.09 6.62-3.1 9.3l-18.74 24.98c-1.42 1.9-2.39 4.1-2.83 6.43l-4.3 22.83c-.62 3.29-2.29 6.29-4.76 8.56a159.608 159.608 0 0 0-25 29.16l-13.03 19.55a27.756 27.756 0 0 1-23.09 12.36c-10.51 0-20.12-5.94-24.82-15.34a78.902 78.902 0 0 1-8.33-35.29V367.5c0-8.56-6.94-15.5-15.5-15.5h-25.88c-14.49 0-28.38-5.76-38.63-16a54.659 54.659 0 0 1-16-38.63v-14.06c0-17.19 8.1-33.38 21.85-43.7l27.58-20.69a54.663 54.663 0 0 1 32.78-10.93h.89c8.48 0 16.85 1.97 24.43 5.77l14.72 7.36c3.68 1.84 7.93 2.14 11.83.84l47.31-15.77c6.33-2.11 10.6-8.03 10.6-14.7 0-8.56-6.94-15.5-15.5-15.5h-10.09c-4.11 0-8.05-1.63-10.96-4.54l-6.92-6.92a15.493 15.493 0 0 0-10.96-4.54H199.5c-8.56 0-15.5-6.94-15.5-15.5v-4.4c0-7.11 4.84-13.31 11.74-15.04l14.45-3.61c3.74-.94 7-3.23 9.14-6.44l8.08-12.11c2.87-4.31 7.71-6.9 12.89-6.9h24.21c8.56 0 15.5-6.94 15.5-15.5v-21.7C359.23 71.63 422.86 131.02 441.93 208H423.5c-8.56 0-15.5 6.94-15.5 15.5z"/>
                                </svg>
                                </a>
                                <svg className="w-6 h-6 cursor-pointer" onClick={() => {
                                    navigator.clipboard.writeText("https://" + props.message.replace("https://bit.ly/link/", ""));
                                    show_snackbar("Copied ...", props.profile_func);
                                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path className="fill-white" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"/>
                                </svg>
                            </span> : <></>}
                        </font>
                        <span className="w-full h-fit flex flex-row">
                            <font className="w-full h-fit"></font>
                            <font className="text-sm">{props.time.replace("T", "")}</font>
                            { props.isGroup ? <></> : props.read ? 
                            <svg className="w-4 mx-4 mt-1 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="fill-white" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                            </svg> : 
                            <svg className="w-4 mx-4 mt-1 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="fill-white" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/>
                            </svg>
                            }
                        </span>
                    </div>
    const invite_link = <div onDoubleClick={(e) => {
                            props.msg_info_func(<MessageInbox show_snackbar={show_snackbar} event={e} message={props} show_progress={show_progress} profile_func={props.profile_func}/>);
                            }} className="w-full text-white flex flex-col space-y-2 bg-gray-400 p-4 rounded-md dark:bg-gray-600">
                            <h1 className="w-full bg-[#00000020] text-white font-bold h-fit p-3">Group Invitation Link</h1>
                            <button onClick={() => {
                                let url = BASE_URL + "group/link", data = {"link": props.message.replace("https://bit.ly/invite/", "")}
                                show_progress(true, props.profile_func);
                                $.post(url, data, (data, status) => {
                                    data = JSON.parse(data);
                                    if (data.code === 200) {
                                        show_alert(data.status, data.title, props.profile_func, props.profile_func);
                                    } else show_alert(data.status, "Group Invite Error", props.profile_func, props.profile_func);
                                });
                            }} className="bg-blue-600 font-bold w-full h-10 rounded-md">See Group</button>
                            <span className="w-full h-fit flex flex-row">
                            <font className="w-full h-fit"></font>
                            <font className="text-sm">{props.time.replace("T", "")}</font>
                            { props.isGroup ? <></> : props.read ? 
                            <svg className="w-4 mx-4 mt-1 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="fill-white" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                            </svg> : 
                            <svg className="w-4 mx-4 mt-1 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="fill-white" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/>
                            </svg>
                            }
                            </span>
                        </div>;
    const attachment = <div  onDoubleClick={(e) => {
                            props.msg_info_func(<MessageInbox show_snackbar={show_snackbar} event={e} message={props} show_progress={show_progress} profile_func={props.profile_func}/>);
                            }} className="w-full text-white flex flex-col space-y-2 bg-gray-400 p-4 rounded-md dark:bg-gray-600">
                            <h1 className="w-full bg-[#00000020] text-white flex flex-col space-y-4 font-bold h-fit p-3">
                               <span>File attachment</span>
                               {getAttachmentIcon(props.type)}
                            </h1>
                            <button onClick={() => {
                                let type_ = props.message; type_ = type_.replace("https://bit.ly/attachment/", "")
                                                                        .replace("https://bit.ly/video/", "")
                                                                        .replace("https://bit.ly/image/", "");
                                let docs = URL + "ATTACHMENTS/" + type_; window.open(docs);
                                console.log(type_);
                            }} className="bg-blue-600 px-4 capitalize flex flex-row items-center space-x-4 font-bold w-full h-10 rounded-md">
                                <font className="w-full">Download {props.type}</font>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">                                 
                                    <path className="fill-white" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
                                </svg>
                            </button>
                            <span className="w-full h-fit flex flex-row">
                            <font className="w-full h-fit"></font>
                            <font className="text-sm">{props.time.replace("T", "")}</font>
                            { props.isGroup ? <></> : props.read ? 
                            <svg className="w-4 mx-4 mt-1 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="fill-white" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                            </svg> : 
                            <svg className="w-4 mx-4 mt-1 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="fill-white" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/>
                            </svg>
                            }
                            </span>
                        </div>;
    const inbox = <div className="w-full flex flex-col space-y-2 text-white p-4 rounded-r-3xl rounded-tl-3xl bg-blue-600">
                        <b>{props.sender}</b>
                        <font className="w-full h-fit flex flex-col space-y-4">
                            <span>{(type == "link")? <a target="_blank" className="text-white underline" href={"https://" + props.message.replace("https://bit.ly/link/", "")}>{props.message.replace("https://bit.ly/link/", "")}</a> : props.message}</span>
                            {(type == "link")? <span className="w-full h-fit flex flex-row pb-3 space-x-4">
                                <font className="w-full"></font>
                                <a target="_blank" className="text-blue-300 underline" href={"https://" + props.message.replace("https://bit.ly/link/", "")}>
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                    <path className="fill-white" d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm160 215.5v6.93c0 5.87-3.32 11.24-8.57 13.86l-15.39 7.7a15.485 15.485 0 0 1-15.53-.97l-18.21-12.14a15.52 15.52 0 0 0-13.5-1.81l-2.65.88c-9.7 3.23-13.66 14.79-7.99 23.3l13.24 19.86c2.87 4.31 7.71 6.9 12.89 6.9h8.21c8.56 0 15.5 6.94 15.5 15.5v11.34c0 3.35-1.09 6.62-3.1 9.3l-18.74 24.98c-1.42 1.9-2.39 4.1-2.83 6.43l-4.3 22.83c-.62 3.29-2.29 6.29-4.76 8.56a159.608 159.608 0 0 0-25 29.16l-13.03 19.55a27.756 27.756 0 0 1-23.09 12.36c-10.51 0-20.12-5.94-24.82-15.34a78.902 78.902 0 0 1-8.33-35.29V367.5c0-8.56-6.94-15.5-15.5-15.5h-25.88c-14.49 0-28.38-5.76-38.63-16a54.659 54.659 0 0 1-16-38.63v-14.06c0-17.19 8.1-33.38 21.85-43.7l27.58-20.69a54.663 54.663 0 0 1 32.78-10.93h.89c8.48 0 16.85 1.97 24.43 5.77l14.72 7.36c3.68 1.84 7.93 2.14 11.83.84l47.31-15.77c6.33-2.11 10.6-8.03 10.6-14.7 0-8.56-6.94-15.5-15.5-15.5h-10.09c-4.11 0-8.05-1.63-10.96-4.54l-6.92-6.92a15.493 15.493 0 0 0-10.96-4.54H199.5c-8.56 0-15.5-6.94-15.5-15.5v-4.4c0-7.11 4.84-13.31 11.74-15.04l14.45-3.61c3.74-.94 7-3.23 9.14-6.44l8.08-12.11c2.87-4.31 7.71-6.9 12.89-6.9h24.21c8.56 0 15.5-6.94 15.5-15.5v-21.7C359.23 71.63 422.86 131.02 441.93 208H423.5c-8.56 0-15.5 6.94-15.5 15.5z"/>
                                </svg>
                                </a>
                                <svg className="w-6 h-6 cursor-pointer" onClick={() => {
                                    navigator.clipboard.writeText("https://" + props.message.replace("https://bit.ly/link/", ""));
                                    show_snackbar("Copied ...", props.profile_func);
                                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path className="fill-white" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"/>
                                </svg>
                            </span> : <></>}
                        </font>
                        <span className="w-full h-fit flex flex-row">
                            <font className="w-full h-fit"></font>
                            <font className="text-sm">{props.time.replace("T", "")}</font>
                        </span>
                   </div>;
    const invite_link_join = <div className="w-full flex flex-col space-y-2 text-white p-4 rounded-md bg-blue-600">
                                <h1 className="w-full bg-[#00000020] text-white font-bold h-fit p-3">Group Invitation Link</h1>
                                <button onClick={() => {
                                    let url = BASE_URL + "group/link", data = {"link": props.message.replace("https://bit.ly/invite/", "")}
                                    show_progress(true, props.profile_func);
                                    $.post(url, data, (data, status) => {
                                        data = JSON.parse(data);
                                        if (data.code === 200) {
                                            show_fine_alert(data.status, data.title, data.raw, props.profile_func, props.profile_func);
                                        } else show_alert(data.status, "Group Invite Error", props.profile_func, props.profile_func);
                                    });
                                }} className="bg-white text-black font-bold w-full h-10 rounded-md">Join Group</button>
                                <span className="w-full h-fit flex flex-row">
                                    <font className="w-full h-fit"></font>
                                    <font className="text-sm">{props.time.replace("T", "")}</font>
                                    { props.isGroup ? <></> : props.read ? 
                                    <svg className="w-4 mx-4 mt-1 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                        <path className="fill-white" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                                    </svg> : 
                                    <svg className="w-4 mx-4 mt-1 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                        <path className="fill-white" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/>
                                    </svg>
                                    }
                                </span>
                             </div>;
    const attachment__ = <div className="w-full text-white flex flex-col space-y-2 p-4 rounded-md bg-blue-600">
                            <h1 className="w-full bg-[#00000020] text-white flex flex-col space-y-4 font-bold h-fit p-3">
                            <span>File attachment</span>
                            {getAttachmentIcon(props.type)}
                            </h1>
                            <button onClick={() => {
                                let type_ = props.message; type_ = type_.replace("https://bit.ly/attachment/", "")
                                                                        .replace("https://bit.ly/video/", "")
                                                                        .replace("https://bit.ly/image/", "");
                                let docs = URL + "ATTACHMENTS/" + type_; window.open(docs);
                                console.log(type_);
                            }} className="text-gray-900 bg-white px-4 capitalize flex flex-row items-center space-x-4 font-bold w-full h-10 rounded-md">
                                <font className="w-full">Download {props.type}</font>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">                                 
                                    <path className="fill-white" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
                                </svg>
                            </button>
                            <span className="w-full h-fit flex flex-row">
                            <font className="w-full h-fit"></font>
                            <font className="text-sm">{props.time.replace("T", "")}</font>
                            { props.isGroup ? <></> : props.read ? 
                            <svg className="w-4 mx-4 mt-1 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="fill-white" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                            </svg> : 
                            <svg className="w-4 mx-4 mt-1 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="fill-white" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/>
                            </svg>
                            }
                            </span>
                        </div>;
    return (
        <div className="w-full h-fit grid grid-cols-2 gap-3 bg-inherit">
            { ! props.me ? 
                type.indexOf("invite-link") > -1? invite_link_join : (type.indexOf("image") > -1 || type.indexOf("video") > -1 || type.indexOf("attachment") > -1)? attachment__ : inbox : <> <div></div>
                {type.indexOf("invite-link") > -1? invite_link : (type.indexOf("image") > -1 || type.indexOf("video") > -1 || type.indexOf("attachment") > -1)? attachment : msg_box}
                </> 
            }
            </div>
    );
}

const update_dp = (dp_func, src) => {
    dp_func(true);
    setTimeout(() => {$("#dp_image_src").attr("src", URL + "PASSPORT/" + src);}, 1);
}

const Chat = (props) => { 
    
    const [tab_switch_var, tab_switch_func] = useState(false);
    const [group_var, group_func] = useState(<></>);
    const [snack_var, snack_func] = useState(<></>);
    const [alert_var, alert_func] = useState(<></>);
    const [fine_alert_var, fine_alert_func] = useState(<></>);
    const [progress_var, progress_func] = useState(<></>);
    const [confirm_var, confirm_func] = useState(<></>);
    const [user_search_var, user_search_func] = useState(<></>);
    const [user_message_var, user_message_func] = useState(<></>);
    const [chat_var, chat_func] = useState(<></>);
    const [profile_var, profile_func] = useState(<></>);
    const [group_info_var, group_info_func] = useState(<></>);
    const [group_dp_var, group_dp_func] = useState(false);
    const [link_prompt_var, link_prompt_func] = useState(<></>);
    const [dp_var, dp_func] = useState(false);
    const [msg_info_var, msg_info_func] = useState(<></>);
    const [user_profile_var, user_profile_func] = useState(<></>);
    const [modules_var, modules_func] = useState(<></>);

    //loading dp
    useEffect(() => {
        $.post(BASE_URL + "information", {user_id : ID()}, (data, status) => {
            data = JSON.parse(data);
            if (data.code === 200) {
                const docs = data.result.document;
                for (const key in docs) {
                    if (Object.hasOwnProperty.call(docs, key)) {
                        const doc = docs[key];
                        update_dp(dp_func, doc.passport);
                    }
                }
                //docs.forEach(doc => { console.log(doc.passport); update_dp(dp_func, doc.passport); }); 
            } else console.log(data);
        });
    }, []);

    //loading messages per group
    useEffect(() => {
        if (!hasGroupMessageEffect()) loadGroupMessageEffect(); else return ()=>{};
        let group_chat_loader = () => {
            if (isChatPersonal() == true) { setTimeout(group_chat_loader, 1000); return false; }
            let url = BASE_URL + "group/message", data = {"group_id": getGroupID(), offset: 0}
            if (getGroupID() == 0) { setTimeout(group_chat_loader, 2000); return false; }
            try {
                $.post(url, data, (data, status) => {
                    data = JSON.parse(data); let x = -1;
                    if (data.code == 200) { let message_box = [];
                        let messages = data.result;
                        messages.forEach(message => { x ++;
                            let sender = data.members[x]; sender = sender.name;
                            let msg = message.message, time = message.created_at.slice(("2022-12-06").length, ("15:39").length + ("2022-12-06").length + 1);
                            message_box.push(<ChatList id={message.id} msg_info_func={msg_info_func} fine_alert_func={fine_alert_func}  profile_func={profile_func} type={message.type} sender={sender} isGroup={true} read={message.read} time={time} me={message.user_id == ID()} message={msg} />);
                        });
                        setSenderID(getGroupID());
                        chat_func(message_box);
                    }
                    setTimeout(group_chat_loader, 3500);
                });
            } catch (error) {setTimeout(group_chat_loader, 3500);}
        }
        group_chat_loader();
    }, []);

    // loading messages per chat 
    useEffect(() => {
        if (!hasPersonalMessageEffect()) loadPersonalMessageEffect(); else return ()=>{};
        let hasShown = false;
        // setting the chat option for the current receiver
        let chat_loader = () => {
            //if (isChatPersonal() == false) { setTimeout(chat_loader, 500); return false; }
             let sender_id = getSenderID();
            // loading empty chat session
            if (sender_id == 0) { chat_func(<EmptyChat />); setTimeout(chat_loader, 1000); return false; }
            // loading real chat session from http request
            let url = BASE_URL + "message/list"; let data = { "sender_id": sender_id, "receiver_id": ID(), "offset": 0 }
            try {
                $.post(url, data, (data, status) => {
                    
                    data = JSON.parse(data); let code = data.code; 
                    if (code == 200) { let message_box = [];
                        let messages = data.results; messages = messages.reverse();
                        messages.forEach(message => {
                            //console.log(message.flagged);
                            let inbox = message.message; inbox = (inbox.length > 35)? inbox.substring(0, 35) + " ..." : inbox;
                            let time = message.created_at.slice(("2022-12-06").length, ("15:39").length + ("2022-12-06").length + 1);
                            message_box.push(<ChatList id={message.id} msg_info_func={msg_info_func} fine_alert_func={fine_alert_func} profile_func={profile_func} type={message.type} group_dp_func={group_dp_func} isGroup={false} read={message.read} time={time} me={message.sender_id == ID()} message={message.message} />);
                            if (message.sender_id != ID()) updateReceiverID(message.sender_id);
                            if (getStatus() == "co-worker") chat_func(message_box);
                        });
                    } else { show_alert("Error loading message", "System Error", profile_func, profile_func); }
                    setTimeout(chat_loader, 3000); 
                });
            } catch (error) { setTimeout(chat_loader, 3000); }
                
            
            if (lastSenderID == sender_id) {
                show_snackbar("Loading messages ....", profile_func);
                updateLastSenderID(sender_id);
            }
            //marking loaded messages as read
            $.post(BASE_URL + "message/mark/read", {sender_id: getSenderID(), receiver_id: ID()}, (data, status) => {});
        }; chat_loader();
    }, []);

    // fetch co-workers
    useEffect(() => { let event = "";
        if (!hasLoadedWorkerEffect()) loadWorkerEffect(); else return ()=>{};
        try {
            // load user messages
            let my_id = ID(), url = BASE_URL + "user"; event = () => {let x = -1;
                if (getTabSection() == true) {setTimeout(event, 1000); return false}
                $.post(url, {"receiver_id": my_id, "offset": 0}, (data, status) => {
                    let output = JSON.parse(data); let array = []; 
                    if (output.code == 200) {
                        let users = output.result;
                        if (users.length > 0) {           
                            users.forEach(user => { x ++;
                                let uid = user.id, name = user.name;
                                if (uid != my_id) { 
                                    let msgs = output.message[x];  let passport = output.passports; //console.log(passport);
                                    let time = msgs.created_at.slice(("2022-12-06").length, ("15:39").length + ("2022-12-06").length + 1);
                                    array.push(<StaffList group_dp_func={group_dp_func} passports={passport} chat_func={chat_func} closure={profile_func} read={msgs.read} id={uid} username={name} message={msgs.message} time={time} />);
                                }
                            });     
                            if (getTabSection() == false) {
                                tab_switch_func(false);  
                                user_message_func(array);   
                            }
                        } else  user_message_func(
                            <section className="w-full h-fit p-4">
                                <button onClick={() => {
                                    // search for all co-workers
                                    show_progress(true, profile_func);
                                    //http request call
                                    let url = BASE_URL + "user";
                                    let data = {"offset" : 0 }
                                    
                                    $.post(url, data, (data, status) => {
                                        data = JSON.parse(data);
                                        let code = data.code; 
                                        
                                        if (code == 200) { 
                            
                                            console.log(data.result.length); let result = data.result;

                                            if (result.length < 1) {    
                                                show_progress(false, profile_func);
                                                show_alert(`No user yet`, 'Workspace users', alert_func, alert_func);
                                                return false;
                                            }

                                            let array = []; result.forEach(user => {
                                                let user_id = ID(); 
                                                let username = user.name;
                                                array.push(<User name={username} me={user_id == user.id}/> );
                                            }); let noun = result.length > 1 ? "Co-workers" : "Co-worker"; 
                                            show_list(`${noun}`, array, user_search_func, user_search_func);
                            
                                        } else {
                            
                                            show_snackbar("Welcome please login ....", snack_func);
                            
                                        }
                                        // console.log(data); 
                                        show_progress(false, profile_func);
                                    });
                                }} className="bg-blue-600 px-4 py-2 w-full h-full rounded-md dark:text-white text-gray-800 flex flex-row space-x-5">
                                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path className="fill-white" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"/>
                                </svg>
                                    <font className="uppercase font-bold">see Co-workers</font>
                                </button>
                            </section>    
                        );
                    }
                    setTimeout(event, 5000);
                });
            }
            event();
        } catch (err) {setTimeout(event, 5000);}
    }, []);

    // fetching groups
    useEffect(() => {
        if (!hasGroupWorkerEffect()) loadGroupEffect(); else return ()=>{};
        function fetchGroups() {
            try {
                if (getTabSection() == false) {setTimeout(fetchGroups, 1000); return true} let x = -1;
                    let url = BASE_URL + "group", data = {user_id : ID(), offset : 0}; 
                    $.post(url, data, (data, result) => {
                        data = JSON.parse(data); let array__ = [];
                        if (data.code === 200) { let x = -1;
                            let groups = data.group, messages = data.message;
                            groups.forEach(group__ => {x ++;
                                let name = group__.name, description = group__.description, time = messages[x].created_at;
                                    time = time.slice(("2022-12-06").length, ("15:39").length + ("2022-12-06").length + 1);
                                    array__.push(<GroupList chat_func={chat_func} type={messages[x].type} group_dp_func={group_dp_func} icon={group__.icon} closure={profile_func} read={true} id={group__.id} username={group__.name} message={messages[x].message} time={time} />);
                            });
                            if (getTabSection() == true) {
                                tab_switch_func(true); group_func(array__); 
                                show_progress(false, progress_func);
                            }
                        } else console.log(data);
                        setTimeout(fetchGroups, 5000);
                    });
            } catch (error) {}
        }
        fetchGroups();
    }, []);

    return (
        <>
        {snack_var} {alert_var} {progress_var} {profile_var} {confirm_var} {user_search_var} {group_info_var} 
        {fine_alert_var} {link_prompt_var} {msg_info_var} {user_profile_var} {modules_var}
        {/* nav bar */}
            <section className="fixed shadow-md dark:shadow-lg w-full h-fit grid grid-cols-3 dark:bg-gray-900 bg-white">
            {/* normal menu */}
                <section className="w-full col-span-3 items-center bg-inherit px-2 py-3 h-fit flex flex-row space-x-6">
                    <section className="w-full h-full grid grid-cols-4">
                        <section className="w-full items-center bg-inherit px-2 py-3 flex flex-row space-x-6 h-full col-span-4">
                            
                            {
                                !dp_var ? <svg onClick={()=>{ profile_func(<Profile dp_func={dp_func} state_func={profile_func}/>); }} className="w-10 cursor-pointer h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                            <path className="fill-blue-600" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"/>
                                         </svg> : <img onClick={()=>{ profile_func(<Profile dp_func={dp_func} state_func={profile_func}/>); }} className="w-10 h-10 rounded-full" id="dp_image_src"/>
                            }
                            
                            <input id="query" placeholder="Search for co-staffs or groups" className="dark:text-white w-full h-10 border dark:border-gray-800 border-gray-200 rounded-full bg-inherit px-6"></input>
                            <svg onClick={()=>{
                                // search function
                                let qry = $('#query').val();
                                if (qry == "") { show_snackbar("Please enter a name", snack_func); return false; }
                                show_progress(true, profile_func);
                                //http request call
                                let url = BASE_URL + "user/search";
                                let data = { "query" : qry, "offset" : 0 }
                                
                                $.post(url, data, (data, status) => {
                                    data = JSON.parse(data);
                                    let code = data.code; 
                                    
                                    if (code == 200) { 
                        
                                        console.log(data.result.length); let result = data.result;

                                        if (result.length < 1) {    
                                            show_progress(false, profile_func);
                                            show_alert(`No reseult found for '${qry}'`, 'Workspace users', alert_func, alert_func);
                                            return false;
                                        }

                                        let array = []; result.forEach(user => {
                                            let user_id = ID(); 
                                            let username = user.name;
                                            array.push(<User user_search_func={user_search_func} id={user.id} name={username} me={user_id == user.id}/> );
                                        }); let noun = result.length > 1 ? "Results" : "Result"; 
                                        
                                        show_list(`${noun} for '${qry}'`, array, user_search_func, user_search_func);
                        
                                    } else {
                        
                                        show_snackbar("Welcome please login ....", snack_func);
                        
                                    }
                                    // console.log(data); 
                                    show_progress(false, profile_func);
                                });

                            }} className="w-7 cursor-pointer h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                <path className="fill-blue-600" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                            </svg>
                            <svg onClick={()=>{
                                profile_func(<Settings modules_func={modules_func} dp_func={dp_func} show_invite={show_invite} alert_dialog={show_alert} progress_bar={show_progress} snack_bar={show_snackbar} confirm={show_confirm} state_func={profile_func}/>);
                            }} className="w-7 h-7 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path className="fill-blue-600" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"/>
                            </svg>
                            <svg onClick={()=>{
                                profile_func(<Notification state_func={profile_func}/>);
                            }} className="w-7 h-7  hidden cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path className="fill-blue-600" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"/>
                            </svg>
                            <svg className="w-7 h-7  hidden cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path className="fill-blue-600" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/>
                            </svg>
                            <svg className="w-7 h-7  hidden cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path className="fill-blue-600" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/>
                            </svg>
                        </section>
                    </section>
                </section>
                {/* T21 applications menu */}
                <section className="w-full h-full flex items-center border-gray-200 border-l dark:border-gray-900 px-6 flex-row space-x-10">

                </section>
            </section>
           
            {/* main body */}
            <div className="w-full h-full dark:bg-gray-800 overflow-hidden grid grid-cols-3">
                {/* staff list tab */}
                <nav className="w-full bg-inherit col-span-1 h-full overflow-x-hidden overflow-y-scroll border-gray-200 border-r dark:border-gray-900">
                    <div className="w-full pt-[5.4rem] h-full">
                        <section id="menu" className="w-full h-fit">
                           {/* listing staff messages */}
                           {/* check if the selected option is co-workers or groups */}
                           {!tab_switch_var ? user_message_var : group_var }
                        </section>
                    </div>
                </nav>
                {/* chat section */}
                <section className="w-full h-full flex flex-col space-y-0 mt-28 pb-32 col-span-2 overflow-y-auto">
                    {/* chat listing section */}
                    <section className="w-full h-full flex flex-col">
                        <section className="w-full h-full flex flex-col">
                            <section className="p-6 w-full space-y-5 bg-inherit  pb-16 dark:bg-inherit h-full">
                                {/* chat section - */}
                                {chat_var}
                                <br></br><br></br><br></br><br></br><br></br><br></br>
                            </section>
                        </section>
                    </section>
                </section>
            </div>
            {/* sending message section */}
            <section className="w-full bg-transparent h-fit">
                {/* Group or worker button */}
                <section className="w-full h-fit bg-transparent grid grid-cols-3">
                    <section className="w-full border-r border-t dark:border-blue-600 border-gray-800 h-fit flex flex-row space-x-2">
                        <button onClick={() => {
                            let btn_1 = $("#btn-1"), btn_2 = $("#btn-2"); 
                            btn_2.removeClass("dark:bg-blue-600 bg-gray-300 dark:text-white text-gray-800");
                            btn_2.addClass("bg-inherit dark:text-white text-gray-800");
                            btn_1.addClass("dark:bg-blue-600 bg-gray-300 dark:text-white text-gray-800");
                            tab_switch_func(false); setTabSection(false); chat_func(<EmptyChat />); setSenderID(0);
                            $("#co-worker-name").html(""); $("#co-worker-icon").fadeOut(); setToPersonalChat();
                            setGroupID(0); setStatus("co-worker"); $("#info-icon").fadeOut(); group_dp_func(false);
                            $("#menu-tab").fadeOut(); $("#attachment").animate({
                                top : "65%"
                            }); $("#attachment").fadeOut(); setMessageType("text");
                        }} id="btn-1" className="w-full dark:bg-blue-600 py-2 h-10 dark:text-white text-gray-800">Co-workers</button>
                        <button onClick={() => {
                            let btn_1 = $("#btn-2"), btn_2 = $("#btn-1"); 
                            btn_2.removeClass("dark:bg-blue-600 bg-gray-300 dark:text-white text-gray-800");
                            btn_2.addClass("bg-inherit dark:text-white text-gray-800");
                            btn_1.addClass("dark:bg-blue-600 bg-gray-300 dark:text-white text-gray-800");
                            tab_switch_func(true); setTabSection(true); chat_func(<EmptyChat />); setSenderID(0);
                            $("#co-worker-name").html(""); $("#co-worker-icon").fadeOut(); setToGroupChat();
                            setGroupID(0); setStatus("group"); $("#info-icon").fadeOut();
                            $("#menu-tab").fadeOut(); $("#attachment").animate({
                                top : "65%"
                            }); $("#attachment").fadeOut(); setMessageType("text");
                        }} id="btn-2" className="w-full py-2 inherit h-10 dark:text-white text-gray-800">Groups</button>
                    </section>
                </section>
                <section className="w-full col-span-2 px-5 items-center flex flex-row p-6 border-t border-gray-200 dark:border-gray-900 space-x-5 h-20 dark:bg-gray-800 bg-gray-300">
                    <svg id="module-btn" onClick={() => {
                        modules_func(<Modules state_func={modules_func} />);
                    }} className="w-7 h-7 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path className="fill-blue-600" d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"/>
                    </svg>
                    <svg onClick={() => {
                        if (getSenderID() == 0) return; 
                        if ($("#attachment").is(":hidden")) {
                            $("#attachment").fadeIn(); $("#attachment").animate({
                                top : "50%"
                            }); return false;
                        }
                        $("#attachment").animate({
                            top : "65%"
                        }); $("#attachment").fadeOut(); 
                    }} className="w-7 h-7 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path className="fill-blue-600" d="M43.246 466.142c-58.43-60.289-57.341-157.511 1.386-217.581L254.392 34c44.316-45.332 116.351-45.336 160.671 0 43.89 44.894 43.943 117.329 0 162.276L232.214 383.128c-29.855 30.537-78.633 30.111-107.982-.998-28.275-29.97-27.368-77.473 1.452-106.953l143.743-146.835c6.182-6.314 16.312-6.422 22.626-.241l22.861 22.379c6.315 6.182 6.422 16.312.241 22.626L171.427 319.927c-4.932 5.045-5.236 13.428-.648 18.292 4.372 4.634 11.245 4.711 15.688.165l182.849-186.851c19.613-20.062 19.613-52.725-.011-72.798-19.189-19.627-49.957-19.637-69.154 0L90.39 293.295c-34.763 35.56-35.299 93.12-1.191 128.313 34.01 35.093 88.985 35.137 123.058.286l172.06-175.999c6.177-6.319 16.307-6.433 22.626-.256l22.877 22.364c6.319 6.177 6.434 16.307.256 22.626l-172.06 175.998c-59.576 60.938-155.943 60.216-214.77-.485z"/>
                    </svg>
                    <input onChange={(e) => {
                        let btn = $("#send-btn"), text = e.target.value;
                        if (text.length > 0 && text != " " && getSenderID() != 0) {btn.fadeIn(); return false; } btn.fadeOut(); 
                    }} id="message" type="text" placeholder="Type a message" className="w-full dark:text-white h-11 px-4 py-1 dark:bg-gray-900 rounded-md"></input>
                    <svg id="send-btn" onClick={() => {
                        let status = getStatus(); $("#send-btn").fadeIn(); 

                        if (status == "group") { 
                            // getting the group ID
                            let groupID = getGroupID(), message = $('#message').val(); 
                            let url = BASE_URL + "group/message/send", my_msg = $('#message').val(), data__ = {
                                "group_id": groupID, "user_id": ID(), "message": my_msg,  "type" : getMessageType(message)
                            };
                            console.log(data__); $('#message').val("");
                            $.post(url, data__, (data, status) => {
                                data = JSON.parse(data);
                                if (data.code == 200) {
                                    show_snackbar(data.status, profile_func);
                                } else {
                                    show_snackbar("Unable to send message", profile_func);
                                    $('#message').val(message);
                                    console.log(data.status);
                                }
                                setMessageType("text");
                            });
                            return false;
                        } //console.log(getReceiverID());

                        let message = $('#message').val(); $('#message').val("");
                        show_snackbar("Sending ....", profile_func);
                        let block = { "sender_id" : ID(), "message" : message, "receiver_id" : getSenderID() , "type" : getMessageType(message) }, url = BASE_URL + "message/send";
                        $.post(url, block, (data, status) => {
                            data = JSON.parse(data);
                            if (data.code == 200) { // success
                                show_snackbar("Message delivered successfully", profile_func);
                            } else { /* error */ $('#message').val(message); show_alert("Unable to send message", "Send failed", profile_func, profile_func)};
                            setMessageType("text");
                        });
                    }} className="w-7 hidden h-7 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path className="fill-blue-600" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"/>
                    </svg>
                </section>
            </section>
            <section id="menu-tab" className="hidden">
                <section className="p-2 rounded-3xl fixed flex flex-row space-x-6 top-24 lg:left-[26rem] xl:left-[34rem] bg-gray-900 text-white w-fit h-fit hover:scale-110 duration-300 hover:shadow-lg">
                    &nbsp;
                    {
                        group_dp_var ? <img className="w-10 hover:scale-150 transition-all duration-200 transform h-10 rounded-full" id="info-img"/>  : 
                        <svg id="co-worker-icon" className="w-8 transition-all duration-300 transform hover:scale-115 hidden h-8 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path className="dark:fill-white fill-blue-600" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                        </svg>
                    }
                    <span id="co-worker-name" className="dark:text-white uppercase h-fit my-auto text-gray-800 font-bold text-xl w-full"></span>
                    <svg onClick={() => {
                                    let status = getStatus();

                                    if (status === "group") { //loading group info tab
                                        // loading basic group info
                                        let group_id = getGroupID(); show_progress(true, profile_func);
                                        let url = BASE_URL + "group/settings", data = {"group_id" : group_id};
                                        $.post(url, data, (data, status) => {
                                            data = JSON.parse(data);
                                            if (data.code === 200) {
                                                const group_info = data.group,
                                                    member_info = data.result,
                                                    admin_info = data.admins;
                                                group_info_func(<GroupInfo group_dp_func={group_dp_func} state_func={profile_func} snack_bar={show_snackbar} progress_bar={show_progress} admin={admin_info} group={group_info} member={member_info} closure={group_info_func} name={getGroupName()} />);
                                            } else {
                                                show_alert(data.status, "Group Error", profile_func, profile_func);
                                            } show_progress(false, profile_func);
                                        });
                                    } else { show_progress(true, profile_func);
                                        let url = BASE_URL + "information", data = {"user_id" : getReceiverID()};
                                        $.post(url, data, (data, status) => { show_progress(false, profile_func);
                                            data = JSON.parse(data);
                                            if (data.code === 200) { 
                                                let result = data.result, docs = result.document, basic = result.basic, user = result.user,
                                                payment = result.payment, kin = result.kin, emergency = result.emergency, reference = result.reference;
                                                user_profile_func(<UserInfo user={user} reference={reference} emergency={emergency} kin={kin} payment={payment} basic={basic} docs={docs} state_func={user_profile_func}/>);
                                                return;
                                            }
                                            show_snackbar(data.status, profile_func);
                                        });
                                    }

                                }} id="info-icon" className="w-10 ml-3 hidden h-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">                  
                                    <path className="dark:fill-white fill-blue-600" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"/>
                    </svg>
                    <svg onClick={() => {
                        window.location.reload(true);
                    }} className="w-11 cursor-pointer h-11 -mt-[0.13rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path className="dark:fill-white fill-blue-600" d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"/>
                    </svg>&emsp;
                </section>
            </section>
            <section id="attachment" className="w-24 h-[30%] hidden fixed top-[65%] left-12">
                <section className="w-full cursor-pointer h-full flex flex-col space-y-4">
                    <section onClick={() => {
                        link_prompt_func(<Prompt show_snackbar={show_snackbar} profile_func={profile_func} state_func_={link_prompt_func}/>);
                        setMessageType("link"); 
                        if ($("#attachment").is(":hidden")) {
                            $("#attachment").fadeIn(); $("#attachment").animate({
                                top : "50%"
                            }); return false;
                        }
                        $("#attachment").animate({
                            top : "65%"
                        }); $("#attachment").fadeOut(); 
                    }} onMouseLeave={() => {let link = $("#link"); link.fadeOut()}} onMouseEnter={() => {
                        let link = $("#link"); link.fadeIn(); link.html("Link")
                    }} className="w-fit duration-300 transition-all hover:scale-105 transform shadow-lg items-center p-3 py-3 bg-blue-600 rounded-full h-fit flex flex-row space-x-3">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path className="fill-white" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/>
                        </svg>
                        <font id="link" className="text-white text-xs pr-3 h-fit hidden my-auto">Link</font>
                    </section>
                    <section onClick={() => {
                        let file = $("#file"); file.attr("accept", "/*"); file.click();
                        setMessageType("attachment"); if ($("#attachment").is(":hidden")) {
                            $("#attachment").fadeIn(); $("#attachment").animate({
                                top : "50%"
                            }); return false;
                        }
                        $("#attachment").animate({
                            top : "65%"
                        }); $("#attachment").fadeOut(); 
                    }} onMouseLeave={() => {let link = $("#docs"); link.fadeOut(1)}} onMouseEnter={() => {
                        let link = $("#docs"); link.fadeIn(1); link.html("Documents")
                    }} className="w-fit duration-300 transition-all transform hover:scale-105 cursor-pointer shadow-lg items-center p-3 bg-blue-600 rounded-full h-fit flex flex-row space-x-3">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path className="fill-white" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"/>
                        </svg>
                        <font id="docs" className="text-white mx-auto text-xs pr-3 h-fit hidden my-auto">Documents</font>
                    </section>
                    <section onClick={() => {
                        let file = $("#file"); file.attr("accept", "image/*"); file.click();
                        setMessageType("image"); if ($("#attachment").is(":hidden")) {
                            $("#attachment").fadeIn(); $("#attachment").animate({
                                top : "50%"
                            }); return false;
                        }
                        $("#attachment").animate({
                            top : "65%"
                        }); $("#attachment").fadeOut(); 
                    }} onMouseLeave={() => {let link = $("#img"); link.fadeOut()}} onMouseEnter={() => {
                        let link = $("#img"); link.fadeIn(); link.html("Image")
                    }} className="w-fit duration-300 transition-all transform hover:scale-105 cursor-pointer shadow-lg items-center p-3 bg-blue-600 rounded-full h-fit flex flex-row space-x-3">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path className="fill-white" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"/>
                        </svg>
                        <font id="img" className="text-white text-xs pr-3 h-fit hidden my-auto">Image</font>
                    </section>
                    <section onClick={() => {
                        let file = $("#file"); file.attr("accept", "video/*"); file.click();
                        setMessageType("video"); if ($("#attachment").is(":hidden")) {
                            $("#attachment").fadeIn(); $("#attachment").animate({
                                top : "50%"
                            }); return false;
                        }
                        $("#attachment").animate({
                            top : "65%"
                        }); $("#attachment").fadeOut(); 
                    }} onMouseLeave={() => {let link = $("#vid"); link.fadeOut()}} onMouseEnter={() => {
                        let link = $("#vid"); link.fadeIn(); link.html("Video")
                    }} className="w-fit duration-300 transition-all transform hover:scale-105 cursor-pointer shadow-lg items-center p-3  bg-blue-600 rounded-full h-fit flex flex-row space-x-3">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path className="fill-white" d="M384 121.941V128H256V0h6.059c6.365 0 12.47 2.529 16.971 7.029l97.941 97.941A24.005 24.005 0 0 1 384 121.941zM224 136V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248c-13.2 0-24-10.8-24-24zm96 144.016v111.963c0 21.445-25.943 31.998-40.971 16.971L224 353.941V392c0 13.255-10.745 24-24 24H88c-13.255 0-24-10.745-24-24V280c0-13.255 10.745-24 24-24h112c13.255 0 24 10.745 24 24v38.059l55.029-55.013c15.011-15.01 40.971-4.491 40.971 16.97z"/>
                        </svg>
                        <font id="vid" className="text-white text-xs pr-3 h-fit hidden my-auto">Video</font>
                    </section>
                </section>                
            </section>
            <input id="file" onChange={() => {
                const url = (getStatus() == "group")? "group/message/attachment" : "message/send/attachment";
                let file = $("#file"), form_data = new FormData(); show_progress(true, profile_func);
                form_data.append('type', getRawMessageType()); form_data.append('file', file.prop('files')[0]);
                form_data.append('message', getRawMessageType_(getRawMessageType()));
                form_data.append('group_id', getGroupID());
                form_data.append('sender_id', ID()); 
                form_data.append('receiver_id', getReceiverID());
                $.ajax({
                    url: BASE_URL + url, // point to server-side controller method
                    dataType: 'text', // what to expect back from the server
                    cache: false, contentType: false, processData: false, data: form_data, type: 'post',
                    success: function (response) { 
                        let data = JSON.parse(response);
                        show_snackbar(data.status,profile_func);
                        console.log(data.status);
                    },
                    error: function (response) { show_progress(false, profile_func); }
                });
            }} className="hidden" type="file"/>
        </>
    );
}

export default Chat;