import { useState } from "react";
import "../asset/css/style.css";
import $ from "jquery";
import more from "../../src/asset/svg/more.svg";
import { getGroupID } from "./session/chat";
import BASE_URL from "../http/url";
import { isGroupActive, setGroupActive, setMemberID, getMemberID, setWidget, getWidget } from "./session/group_settings";
import URL from "./session/http";
import ID from "./session/user";

const Info = (props) => {
    props.dp_func(false);
    let groups = props.group[0];
    {setTimeout(() => {
        $("#name").val(groups.name); $("#description").val(groups.description);
    }, 1)}
    return (
        <section className="w-full h-fit p-3 flex flex-col space-y-3">
            <input id='name' placeholder="Group name" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            <textarea id="description" placeholder="Group description" className="w-full dark:text-white h-36 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></textarea>
            {props.is_admin ? <button onClick={()=>{ props.progress_bar(true, props.closure);
                let name = $("#name").val(), description = $("#description").val(), group_id = getGroupID(),
                data = {name  : name, description : description, group_id : group_id}, url = BASE_URL + "group/update/info";
                $.post(url, data, (data, status) => {
                    data = JSON.parse(data); if (data.code == 200) {
                        props.snack_bar(data.status, props.closure);
                    } else {
                        props.snack_bar(data.status, props.closure);
                    } 
                });
            }} className="w-full h-10 bg-blue-600 rounded-md">Update Info</button> : <></>}
            
        </section>
    );
}

const Members = (props) => {
    props.dp_func(false); //console.log(props.admin[0]);
    const admins = props.admin;
    const members = props.members, array = []; let x = -1;
    const [member_name_var, member_name_func] = useState("");
    setTimeout(() => {$("#msg_member_toggle").hide();}, 10)
    members.forEach(member => { x ++;
        let elem = <div onClick={() => {
            $("#admin_action").show();
            member_name_func(member.name);
            if (member.id == ID()) $("#admin_action").hide(); setMemberID(member.id);
            if (admins.contains((member.id).toString())) {
                $("#deny-admin").show(); $("#make-admin").hide();
            } else {
                $("#deny-admin").hide(); $("#make-admin").show();
            }
        }} className="w-full cursor-pointer border-b dark:border-gray-700 border-gray-300 h-fit px-2 py-3 flex flex-row space-x-3 items-center">
                        {
                            admins.contains((member.id).toString())? 
                            <svg id={"#user" + (member.id).toString()} className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="fill-gray-800 dark:fill-blue-600" d="M622.3 271.1l-115.2-45c-4.1-1.6-12.6-3.7-22.2 0l-115.2 45c-10.7 4.2-17.7 14-17.7 24.9 0 111.6 68.7 188.8 132.9 213.9 9.6 3.7 18 1.6 22.2 0C558.4 489.9 640 420.5 640 296c0-10.9-7-20.7-17.7-24.9zM496 462.4V273.3l95.5 37.3c-5.6 87.1-60.9 135.4-95.5 151.8zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm96 40c0-2.5.8-4.8 1.1-7.2-2.5-.1-4.9-.8-7.5-.8h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c6.8 0 13.3-1.5 19.2-4-54-42.9-99.2-116.7-99.2-212z"/>
                            </svg> : 
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"> 
                                <path className="dark:fill-blue-600 fill-gray-800" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"/>
                            </svg>
                        }
                        <font className="dark:text-white flex flex-row space-x-4 w-full text-gray-800">
                            <span>{member.name}</span> { admins.contains((member.id).toString())? <font className="text-xs mt-1 text-gray-300">(Admin)</font> : <></> }
                        </font>
                    </div>
        array.push(elem);
    });
    const footer = <section id="admin_action" className="w-full hidden h-fit border-t border-gray-700">
    <div className="w-full flex flex-row space-x-5 h-fit p-3">
        <button onClick={() => {
            let user_id = getMemberID();
            let url = BASE_URL + "group/member/remove", data = {
                "user_id": ID(), "member_id": user_id, "group_id": getGroupID()
            }; $("#msg_member_toggle").fadeIn(); $("#msg_member_toggle").html("Processing ...");
            $.post(url, data, (data, status) => {
                data = JSON.parse(data); if (data.code == 200) {
                    $("#msg_member_toggle").html(data.status);
                    setTimeout(() => {
                        $("#alert-body").hide();
                    }, 2000);
                } else $("#msg_member_toggle").html(data.status);
            });
        }} className="w-fit rounded-md bg-blue-600 px-4 py-2 flex flex-row space-x-3">Deny "{member_name_var.toUpperCase()}" Membership</button>
        <button id="deny-admin" onClick={() => {
            let user_id = getMemberID();
            let url = BASE_URL + "group/member/admin/remove", data = {
                "user_id": ID(), "member_id": user_id, "group_id": getGroupID()
            }; $("#msg_member_toggle").fadeIn(); $("#msg_member_toggle").html("Processing ...");
            $.post(url, data, (data, status) => {
                data = JSON.parse(data); if (data.code == 200) {
                    $("#msg_member_toggle").html(data.status);
                    setTimeout(() => {
                        $("#alert-body").hide();
                    }, 2000);
                } else $("#msg_member_toggle").html(data.status);
            });
        }} className="w-fit rounded-md bg-blue-600 px-4 py-2 flex flex-row space-x-3">Deny "{member_name_var.toUpperCase()}" Admin Privilege</button>
        <button id="make-admin" onClick={() => {
            let user_id = getMemberID();
            let url = BASE_URL + "group/member/admin/add", data = {
                "user_id": ID(), "member_id": user_id, "group_id": getGroupID()
            }; $("#msg_member_toggle").fadeIn(); $("#msg_member_toggle").html("Processing ...");
            $.post(url, data, (data, status) => {
                data = JSON.parse(data); if (data.code == 200) {
                    $("#msg_member_toggle").html(data.status);
                } else $("#msg_member_toggle").html(data.status);
            });
        }} className="w-fit rounded-md bg-blue-600 px-4 py-2 flex flex-row space-x-3">Make Admin</button>
    </div>
</section>
    return (
        <section className="w-full h-fit flex flex-col space-y-3">
            <div className="p-3">
                <section id="msg_member_toggle" className="w-full hidden h-fit p-3 bg-green-200 dark:bg-green-800 border border-green-900 rounded-md"></section>
            </div>
            <div className="w-full h-72 overflow-y-auto p-3 flex flex-col space-y-3">{array}</div>
            {props.is_admin ? footer : <></>}
        </section>
    );
}

const Settings = (props) => {
    const [toggle_var, toggle_func] = useState(isGroupActive());
    return (
        <section className="w-full h-fit p-3 flex flex-col space-y-3">
            <div id="msg-err" className="w-full hidden text-center items-center h-fit p-3 bg-red-200 border dark:border-red-900  dark:bg-red-800 border-red-700 rounded-md"></div>
            <font className="text-gray-800 dark:text-blue-600"></font>
            <input onChange={event => {
                var input = event.target, reader = new FileReader();
                reader.onload = function(){
                  var dataURL = reader.result;
                  props.dp_func(true);
                  setTimeout(() => {
                    var output = document.getElementById('display_picture');
                    output.src = dataURL;
                  }, 100);
                };
                reader.readAsDataURL(input.files[0]);
            }} id='dp' placeholder="Group name" type="file" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            <div className="w-full hidden h-fit flex flex-row space-x-4">
                <font className="text-gray-800 w-full dark:text-blue-600">{!toggle_var ? "Deactivate Group" : "Activate Group"}</font>
                {toggle_var ? 
                    <svg onClick={() => {
                        toggle_func(true); setGroupActive(true)
                    }} className="dark:fill-blue-600 fill-gray-800 w-10 cursor-pointer h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">       
                        <path d="M384 64H192C86 64 0 150 0 256s86 192 192 192h192c106 0 192-86 192-192S490 64 384 64zm0 320c-70.8 0-128-57.3-128-128 0-70.8 57.3-128 128-128 70.8 0 128 57.3 128 128 0 70.8-57.3 128-128 128z"/>
                    </svg> : 
                    <svg onClick={() => {
                        toggle_func(false); setGroupActive(false)
                    }} className="dark:fill-blue-600 fill-gray-800 w-10 cursor-pointer h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                         <path d="M384 64H192C85.961 64 0 149.961 0 256s85.961 192 192 192h192c106.039 0 192-85.961 192-192S490.039 64 384 64zM64 256c0-70.741 57.249-128 128-128 70.741 0 128 57.249 128 128 0 70.741-57.249 128-128 128-70.741 0-128-57.249-128-128zm320 128h-48.905c65.217-72.858 65.236-183.12 0-256H384c70.741 0 128 57.249 128 128 0 70.74-57.249 128-128 128z"/>
                    </svg>
                }
            </div><br />
            <button onClick={()=>{
                // uploading the picture and setting group active
                let dp = $("#dp"), file_data = dp.prop('files')[0], group_id = getGroupID();
                var form_data = new FormData(); form_data.append('file', file_data);
                form_data.append('group_id', group_id); props.progress_bar(true, props.closure);
                let url = BASE_URL;
                $.ajax({
                    url: BASE_URL + "group/update/dp", // point to server-side controller method
                    dataType: 'text', // what to expect back from the server
                    cache: false, contentType: false, processData: false, data: form_data, type: 'post',
                    success: function (response) { props.progress_bar(false, props.closure);
                        let data = JSON.parse(response);
                        if (data.code == 200) {
                            let dp_url = data.result, uri = BASE_URL; uri = uri.toString();
                            //$("#dp_" + group_id).attr('src', '');
                            props.group_dp_func(true);
                            props.dp_func(true);
                            setTimeout(() => { console.log(BASE_URL);
                                $("#dp_" + group_id).attr('src', URL + dp_url);
                                $("#info-img").attr("src", URL + dp_url);
                                $("#display_picture").attr("src", URL + dp_url);
                            }, 100);
                            props.snack_bar(data.status, props.closure);
                            return;
                        }
                       alert("Unable to change Display Picture");
                    },
                    error: function (response) { props.progress_bar(false, props.closure);
                        props.snack_bar("Unable to change Display Picture", props.closure); // display error response from the server
                    }
                });

            }} className="w-full h-10 bg-blue-600 rounded-md">Change Display Picture</button> <br />
        </section>
    )
}

const Invite = (props) => {
    return (
        <section className="w-full h-fit p-3 flex flex-col space-y-3">
            <svg className="w-28 h-28 mx-auto my-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path className="fill-gray-800 dark:fill-blue-600" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/>
            </svg>
            <button onClick={
                () => {
                    const group = props.group[0], link = group.link;
                    const string = "https://bit.ly/invite/" + link;
                    navigator.clipboard.writeText(string);
                    props.snack_bar("Link copied successfully", props.closure);
                }
            } className="w-full h-10 rounded-full bg-blue-600 dark:text-black text-white">Copy Invitation Link</button>
            <br></br>
        </section>
    )
} 

const GroupInfo = (props) => {
    const [widget_var, widget_func] = useState("info");
    const [dp_var, dp_func] = useState(false);
    const [group_icon, group_func] = useState(false);
    
    const widgets = { 
        "invite": <Invite is_admin={props.admin.indexOf(ID()) > -1} group={props.group} snack_bar={props.snack_bar} closure={props.closure} />,
        "info": <Info is_admin={props.admin.indexOf(ID()) > -1} dp_func={dp_func} state_func={props.profile_func} snack_bar={props.snack_bar} closure={props.closure} progress_bar={props.progress_bar} admin={props.admin} group={props.group} />, 
        "settings": <Settings is_admin={props.admin.indexOf(ID()) > -1} group_func={group_func} group_dp_func={props.group_dp_func} dp_func={dp_func} snack_bar={props.snack_bar} admin={props.admin} group={props.group} closure={props.closure} progress_bar={props.progress_bar} />, 
        "members": <Members is_admin={props.admin.indexOf(ID()) > -1} dp_func={dp_func} snack_bar={props.snack_bar} admin={props.admin} members={props.member} closure={props.closure} progress_bar={props.progress_bar} /> }
    let icon = props.group[0]; icon = icon.icon;
    if (icon.indexOf(".png") > -1) setTimeout(()=>{$("#display_picture").attr("src", URL + icon)}, 100);
   
    return (
        <section className="w-full h-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-lg" id="alert-body">
            <section className="w-full h-full flex flex-col">
                <div className="w-[40%] flex flex-col space-y-0 h-fit border dark:border-gray-900 hover:shadow-lg hover:dark:shadow-black/10 dark:bg-gray-800 bg-white rounded-md shadow-lg mx-auto my-auto">
                    {/* cancelling button */}
                    <span className="w-full p-3 h-fit flex flex-row space-x-4 dark:border-b-4 border-b dark:border-blue-600 border-gray-100">
                        {(dp_var == false && icon.indexOf(".png") < 0)?
                            <svg className="w-12 h-12 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="fill-blue-600" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"/>
                            </svg> : <img className="w-12 h-12 rounded-full mx-auto my-auto" id="display_picture"/>
                        } 
                        <span className="w-full py-2 font-bold text-blue-600 text-2xl">{props.name}</span>
                        <svg onClick={() => { props.closure(<></>); console.log("Closed"); }} className="w-5 h-5 my-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path className="dark:fill-blue-600 fill-gray-600" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                        </svg>
                    </span>
                    <section className="w-full h-fit p-4 flex flex-col space-y-3">
                                             
                    </section>
                    <section className="w-full h-fit flex flex-col space-y-2">
                        <nav className={props.admin.indexOf(ID()) > -1 ? "w-full h-fit grid grid-cols-4 gap-2 p-3":"w-full h-fit grid grid-cols-2 gap-3 p-3"}>
                            <span onClick={() => {
                                widget_func("info");
                            }} className="w-full cursor-pointer h-fit flex flex-row space-x-3 items-center">
                               <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                 <path className="fill-gray-800 dark:fill-blue-600" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/>
                               </svg>
                               <font className="w-fit text-md text-gray-800 dark:text-blue-600">Info</font>
                            </span>
                            {
                                props.admin.indexOf(ID()) > -1? <span  onClick={() => {
                                    widget_func("settings");
                                }} className="w-full cursor-pointer h-fit flex flex-row space-x-3 items-center">
                                   <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                     <path className="fill-gray-800 dark:fill-blue-600" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"/>
                                   </svg>
                                   <font className="w-fit text-md text-gray-800 dark:text-blue-600">Settings</font>
                                </span> : <></>
                            }
                            <span onClick={() => {
                                widget_func("members")
                            }} className="w-full cursor-pointer h-fit flex flex-row space-x-3 items-center">
                               <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                 <path className="fill-gray-800 dark:fill-blue-600" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"/>
                               </svg>
                               <font className="w-fit text-md text-gray-800 dark:text-blue-600">Members</font>
                            </span>
                            {props.admin.indexOf(ID()) > -1? <span onClick={() => {
                                widget_func("invite");
                            }} className="w-full cursor-pointer h-fit flex flex-row space-x-3 items-center">
                               <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                 <path className="fill-gray-800 dark:fill-blue-600" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/>
                               </svg>
                               <font className="w-fit text-md text-gray-800 dark:text-blue-600">Invite</font>
                            </span>:<></>}
                        </nav>
                        { widgets[widget_var] }
                    </section>
                </div>
            </section>
        </section>
    );
}

export default GroupInfo;