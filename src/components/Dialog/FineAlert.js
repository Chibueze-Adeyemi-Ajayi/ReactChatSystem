import { useState } from "react";
import $ from "jquery";
import ID from "../session/user";
import BASE_URL from "../../http/url";

const FineAlert = (props) => {
    const [group_icon_var, group_icon_func] = useState(false);
    return (
        <section className="w-full h-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-lg">
            <section className="w-full h-full flex flex-col p-6">
                <div className="w-full h-fit mx-auto my-auto md:w-[300px] lg:md:w-[400px] md:h-fit rounded-md bg-white dark:bg-gray-800">
                    {/* cancelling button */}
                    <span className="w-full p-3 h-fit flex flex-row dark:border-b-4 border-b dark:border-blue-600 border-gray-100">
                        <span className="w-full py-2 font-bold text-blue-600 text-xl">{props.title}</span>
                        <svg onClick={() => {
                            props.state_func(false);
                        }}  className="w-5 h-5 my-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path className="dark:fill-blue-600 fill-gray-600" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                        </svg>
                    </span>
                    <section id="" className="p-6 text-gray-800 flex flex-col space-y-3 dark:text-white w-full h-fit">
                        {
                            !group_icon_var ? <svg className="w-24 h-24 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path className="fill-blue-600" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"/>
                                </svg> : 
                            <img id="group-logo" className="w-24 h-24 mx-auto rounded-full"/> 
                        }
                        <hr></hr>
                        <span className="w-full h-fit flex flex-col space-y-2">
                            <section className="w-full h-fit flex flex-row space-x-3">
                                <font>Name:</font><span id="name">{props.raw.name}</span>
                            </section>
                            <section className="w-full h-fit flex flex-row space-x-3">
                                <font>Description:</font><span id="desc">{props.raw.description}</span>
                            </section>
                        </span>
                    </section>
                    <hr className="border-0 h-[0.5px] bg-gray-300 dark:bg-gray-700"></hr>
                    <section className="w-full h-fit p-4">
                        <button onClick={() => {
                            const id = props.raw.id;
                            props.progress_bar(true, props.state_func);
                            const url = BASE_URL + "group/member/add", data = { user_id: ID(), member_id: ID(), group_id: id }
                            $.post(url, data, (data, status) => {
                                data = JSON.parse(data);
                                props.show_snackbar(data.status, props.state_func); 
                            });
                        }} className="w-fit h-fit px-36 py-2 bg-gray-300 text-gray-800 dark:text-white rounded-md dark:bg-blue-600">Join Group</button>
                    </section>
                </div>
            </section>
        </section>
    );
};

export default FineAlert;