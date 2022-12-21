import Group from "./Group";
import Profile from "./Profile";
import $ from "jquery";
import BASE_URL from "../http/url";
import Modules from "./Modules";

const Settings = (props) => {
    return (
        <section className="w-full h-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-lg" id="alert-body">
            <section className="w-full h-full flex flex-col">
                <div className="w-[40%] flex flex-col space-y-0 h-fit border dark:border-gray-900 hover:shadow-lg hover:dark:shadow-black/10 dark:bg-gray-800 bg-white rounded-md shadow-lg mx-auto my-auto">
                    {/* cancelling button */}
                    <span className="w-full p-3 h-fit flex flex-row dark:border-b-4 border-b dark:border-blue-600 border-gray-100">
                        <span className="w-full py-2 font-bold text-blue-600 text-2xl">Settings</span>
                        <svg onClick={() => {
                            props.state_func(<></>);
                        }}  className="w-5 h-5 my-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path className="dark:fill-blue-600 fill-gray-600" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                        </svg>
                    </span>
                    {/* options */}
                    <div className="w-full h-full overflow-y-auto">
                        <span onClick={() => {
                            props.state_func(<Profile dp_func={props.dp_func} state_func={props.state_func}/>);
                        }} className="w-full p-6 hover:bg-gray-300 hover:dark:bg-gray-900 cursor-pointer hover:dark: border-b dark:border-gray-900 border-gray-300 h-fit px-4 flex flex-row space-x-4">
                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="dark:fill-blue-600 fill-gray-800" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                            </svg>
                            <font className="text-xl dark:text-white text-gray-900">Profile</font>
                        </span>
                        <span onClick={() => {
                            props.progress_bar(true, props.state_func);
                            // fetch co-workers from 
                            let url = BASE_URL + "user", data = {offset: 0};
                            $.post(url, data, (data, status) => {
                                data = JSON.parse(data);
                                if (data.code == 200) {
                                    props.state_func(<Group alert_dialog={props.alert_dialog} progress_bar={props.progress_bar} users={data.result} snack_bar={props.snack_bar} state_func={props.state_func}/>);
                                } else {
                                    props.alert_dialog("Error fetching co-worker data, please retry","Error",props.state_func,props.state_func);
                                }
                            });
                        }} className="w-full p-6 hover:bg-gray-300 hover:dark:bg-gray-900 cursor-pointer hover:dark: border-b dark:border-gray-900 border-gray-300 h-fit px-4 flex flex-row space-x-4">
                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="dark:fill-blue-600 fill-gray-800" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"/>
                            </svg>
                            <font className="text-xl dark:text-white text-gray-900">New group</font>
                        </span>
                        <span onClick={() => {
                            props.show_invite(props.state_func, props.state_func)
                        }} className="w-full p-6 hover:bg-gray-300 hover:dark:bg-gray-900 cursor-pointer hover:dark: border-b dark:border-gray-900 border-gray-300 h-fit px-4 flex flex-row space-x-4">
                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="dark:fill-blue-600 fill-gray-800"  d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                            </svg>
                            <font className="text-xl dark:text-white text-gray-900">Invite</font>
                        </span>
                        <span onClick={() => {
                            props.state_func(<></>);
                        }} className="w-full hidden p-6 hover:bg-gray-300 hover:dark:bg-gray-900 cursor-pointer hover:dark: border-b dark:border-gray-900 border-gray-300 h-fit px-4 flex flex-row space-x-4">
                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="dark:fill-blue-600 fill-gray-800" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
                            </svg>
                            <font className="text-xl dark:text-white text-gray-900">Starred Messages</font>
                        </span>
                        <span onClick={() => {
                            props.state_func(<></>);
                        }} className="w-full hidden p-6 hover:bg-gray-300 hover:dark:bg-gray-900 cursor-pointer hover:dark: border-b dark:border-gray-900 border-gray-300 h-fit px-4 flex flex-row space-x-4">
                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="dark:fill-blue-600 fill-gray-800" d="M349.565 98.783C295.978 98.783 251.721 64 184.348 64c-24.955 0-47.309 4.384-68.045 12.013a55.947 55.947 0 0 0 3.586-23.562C118.117 24.015 94.806 1.206 66.338.048 34.345-1.254 8 24.296 8 56c0 19.026 9.497 35.825 24 45.945V488c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-94.4c28.311-12.064 63.582-22.122 114.435-22.122 53.588 0 97.844 34.783 165.217 34.783 48.169 0 86.667-16.294 122.505-40.858C506.84 359.452 512 349.571 512 339.045v-243.1c0-23.393-24.269-38.87-45.485-29.016-34.338 15.948-76.454 31.854-116.95 31.854z"/>
                            </svg>
                            <font className="text-xl dark:text-white text-gray-900">Flagged Messages</font>
                        </span>
                        <span onClick={() => {
                            props.state_func(<></>);
                            props.modules_func(<Modules state_func={props.modules_func}/>);
                        }} className="w-full p-6 hover:bg-gray-300 hover:dark:bg-gray-900 cursor-pointer hover:dark: border-b dark:border-gray-900 border-gray-300 h-fit px-4 flex flex-row space-x-4">
                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="dark:fill-blue-600 fill-gray-800" d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"/>
                            </svg>
                            <font className="text-xl dark:text-white text-gray-900">T21 Applications</font>
                        </span>
                        <span onClick={() => {
                            props.confirm("logging out", "Are you sure you want to log out?", props.state_func, props.callback, props.state_func);
                        }} className="w-full p-6 hover:bg-gray-300 hover:dark:bg-gray-900 cursor-pointer hover:dark: border-b dark:border-gray-900 border-gray-300 h-fit px-4 flex flex-row space-x-4">
                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path className="dark:fill-blue-600 fill-gray-800" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"/>
                            </svg>
                            <font className="text-xl dark:text-white text-gray-900">Logout</font>
                        </span>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default Settings;