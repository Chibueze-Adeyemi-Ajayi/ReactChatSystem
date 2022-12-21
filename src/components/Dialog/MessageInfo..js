import $ from "jquery"
import BASE_URL from "../../http/url";
import { getGroupID, getStatus } from "../session/chat";
import ID from "../session/user";

const MessageInbox = (props) => {
    const message = props.message;
    setTimeout(() => { let x = props.event.pageX, y = props.event.pageY;
        $("#msg_box").fadeIn();
        $("#msg_box").animate({
            "min-width" : "350px", "min-height": "250px",
            top: y > 304 ? (y - 250) : y + "px", left: (x - 350) + "px"
        }, 100, () => {
            $("#msg_box").addClass("p-3");
        },);
    },250);
    return (
        <section id="msg_box" className="fixed z-40 border space-y-6 dark:border-gray-900 border-gray-300 dark:bg-gray-800 bg-white rounded-md shadow-xl flex flex-col">
            <span className="w-full p-3 h-fit flex flex-row border-b dark:border-blue-600 border-gray-100">
                <span className="w-full py-2 font-bold text-blue-600 text-xl">{props.title}</span>
                    <svg onClick={() => {
                            $("#msg_box").fadeOut();
                        }}  className="w-5 h-5 my-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                        <path className="dark:fill-blue-600 fill-gray-600" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                    </svg>
                </span>
            <div className="w-full flex flex-col space-y-3 max-w-full h-fit text-white p-3 bg-blue-600 rounded-l-3xl rounded-tr-3xl">
                <span>{message.message}</span>
                <span className="w-full h-fit flex flex-row">
                            <font className="w-full h-fit"></font>
                            <font className="text-sm">{message.time.replace("T", "")}</font>
                            { message.isGroup ? <></> : message.read ? 
                            <svg className="w-6 mx-6 mt-1 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="fill-white" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                            </svg> : 
                            <svg className="w-6 mx-6 mt-1 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="fill-white" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"/>
                            </svg>
                            }
                        </span>
            </div>
            <span className="w-full h-fit border-t border-gray-900 flex flex-row space-x-3 pt-4"> 
               <button onClick={() => {
                    props.show_progress(true, props.profile_func);
                    $.post(BASE_URL + (getStatus() == "group" ? "group/message/flag" : "message/flag"), {
                        user_id: ID(), message_id: props.message.id,
                        group_id: getGroupID()
                    }, (data, status) => {
                        data = JSON.parse(data);
                        let feedback = data.status;
                        if (data.code == 200) $("#msg_box").fadeOut();
                        props.show_snackbar(feedback, props.profile_func);
                        //props.show_progress(false, props.profile_func);
                    });
               }} className="w-fit px-4 bg-blue-600 text-white rounded-md py-2">Delete</button>
            </span>
        </section>
    );
}

export default MessageInbox