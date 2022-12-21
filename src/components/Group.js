import { useState } from "react";
import $ from 'jquery';
import BASE_URL from "../http/url";
import ID from "./session/user";
import {setGroupDescription, setGroupName, getGroupName, getGroupDescription} from "./session/group-create";

let group_members = {}, group_name = "", group_description = "";

const Create = (props) => {
    return (
        <div className="w-full p-4 h-full space-y-4 overflow-y-auto">
            <svg className="w-60 h-60 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">               
                <path className="dark:fill-blue-600 fill-gray-800" d="M622.3 271.1l-115.2-45c-4.1-1.6-12.6-3.7-22.2 0l-115.2 45c-10.7 4.2-17.7 14-17.7 24.9 0 111.6 68.7 188.8 132.9 213.9 9.6 3.7 18 1.6 22.2 0C558.4 489.9 640 420.5 640 296c0-10.9-7-20.7-17.7-24.9zM496 462.4V273.3l95.5 37.3c-5.6 87.1-60.9 135.4-95.5 151.8zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm96 40c0-2.5.8-4.8 1.1-7.2-2.5-.1-4.9-.8-7.5-.8h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c6.8 0 13.3-1.5 19.2-4-54-42.9-99.2-116.7-99.2-212z"/>
            </svg>
            <span className="w-full py-2 font-bold text-blue-600 text-4xl">New Group</span>
            <input id="name" placeholder="Group name" type="text" className="w-full dark:text-white h-12 text-xl px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            <textarea id="description" placeholder="Group description" type="text" className="w-full dark:text-white h-24  px-2 py-1 border border-blue-600 rounded-md bg-inherit"></textarea>
            <button type="submit" onClick={() => { 
                let name = $("#name").val(), description = $("#description").val();
                setGroupDescription(description); setGroupName(name);
                if (name == "" || description == "") {
                    props.snack_bar("Invalid name or description", props.state_func);
                   // props.state_func(<></>);
                    return false;
                }
                group_name = name; group_description = description;
                props.state(false);
            }} className="w-full h-12 rounded-md text-gray-800 font-bold bg-blue-600">CREATE</button>
        </div>
    )
}

const Invite = (props) => {
    let arr = []; 
    for (const person in props.people) {
        if (props.people.hasOwnProperty(person)) {
            const user = props.people[person];
            if (user.id == ID()) continue;
            arr.push(
                <section className="w-full cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-900 hover:dark:border-gray-900 border-b items-center border-gray-200 dark:border-gray-900 h-fit p-3 flex flex-row space-x-4">
                    <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                        <path className="fill-blue-600" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"/>
                    </svg>
                    <div className="w-full h-full flex flex-row space-x-4">
                        <font className="text-md w-full font-bold dark:text-white text-gray-700">{user.name}</font>
                        <input id={user.id} onChange={(e) => {
                            let status = $(`#${user.id}`).is(':checked');
                            if (status) group_members[user.id] = user.id; else delete group_members[user.id];
                            console.log(group_members);
                        }} type="checkbox" className="w-6 h-6 dark:bg-blue-600 bg-gray-800"></input>
                    </div>
                </section>
            );
        }
    }
    return (
        <div className="w-full p-4 h-full bg-inherit space-y-4">
            <h3 className="w-full dark:border-b-4 border-b dark:border-blue-600 border-gray-300 py-2 font-bold text-blue-600 text-2xl">Add group participants</h3>
            <span className="w-full hidden items-center h-fit flex flex-row">
                <input placeholder="Search Contact" type="text" className="w-full dark:text-white h-12 text-xl px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <svg className="w-6 h-6 -ml-10 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path className="fill-gray-800 dark:fill-blue-600" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                </svg>
            </span>
            <section className="w-full h-[400px] overflow-y-auto">
                {arr}
            </section>
            <button onClick={() => {
                // http request to create group and add group members
                let url = BASE_URL + "group/create", data = {
                    name: getGroupName(), description: getGroupDescription(), "user_id": ID(),
                    members: group_members
                };
                props.progress_bar(true, props.closure);

                $.post(url, data, (data, status) => {
                    data = JSON.parse(data);
                    if (data.code === 200) {
                        props.snack_bar(data.status, props.closure);
                        return true;
                    }
                    props.alert_dialog(data.status, "Error message", props.closure, props.closure);
                    props.progress_bar(false, props.closure);
                });
                //props.closure(<></>);
            }} className="z-50 uppercase w-full text-xl -mt-24 h-12 rounded-full bg-blue-600">Create</button>
        </div>
    )
}

const Group = (props) => {
    const [group_var, group_func] = useState(true);
    group_members[ID()] = ID(); //adding the main creator as a member
    const users = props.users;
    return (
        <section className="w-full h-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-lg" id="alert-body">
            <section className="w-full h-full flex flex-col">
                <div className="lg:w-[40%] md:w-[60%] w-full bg-inherit flex flex-col space-y-4 h-[90%] border dark:border-gray-900 hover:shadow-lg hover:dark:shadow-black/10 dark:bg-gray-800 bg-white rounded-md shadow-lg mx-auto my-auto">
                    {/* cancelling button */}
                    <span className="w-full p-3 h-fit flex flex-row">
                        <span className="w-full py-2 font-bold text-blue-600 text-2xl"></span>
                        <svg onClick={() => {
                            props.state_func(<></>);
                        }}  className="w-5 h-5 my-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path className="dark:fill-blue-600 fill-gray-600" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                        </svg>
                    </span>
                    <section className="w-full h-fit">
                        {group_var ? <Create snack_bar={props.snack_bar} state_func={props.state_func} state={group_func}/> : <Invite progress_bar={props.progress_bar} people={users} closure={props.state_func} snack_bar={props.snack_bar}/>}
                    </section>
                </div>
                
            </section>
        </section>
    );
}

export default Group;