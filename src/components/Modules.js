import { useState } from "react";
import "../asset/css/style.css";
import $ from "jquery";
import BASE_URL from "../http/url";

const Modules = (props) => {
    const [loader_var, loader_func] = useState(true);
    const [app_var, app_func] = useState(false);

    let apps = []

    $.post(BASE_URL + "module/mesh", {}, (data, status) => {
        data = JSON.parse(data); if (data.code == 200) {
            let result = data.result, length = result.length; loader_func(false);
            for (const key in result) {
                if (Object.hasOwnProperty.call(result, key)) {
                    const app = result[key];
                    apps.push(
                        <a href={app.url} target="_blank" className="w-full h-fit cursor-pointer flex flex-col space-y-5">
                            <img className="w-18 h-18 mx-auto my-auto" src={app.icon}></img>
                            <font className="text-center dark:text-white">{app.name}</font>
                        </a>);
                }
            }
        } else alert(data.status);
    });

    return (
        <section className="w-full h-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-lg">
            <section className="w-full h-full flex flex-col p-6">
                <div className="w-full h-fit mx-auto my-auto md:w-[400px] lg:md:w-[500px] md:h-fit rounded-md bg-white dark:bg-gray-800">
                    {/* cancelling button */}
                    <span className="w-full p-3 h-fit flex flex-row dark:border-b-4 border-b dark:border-blue-600 border-gray-100">
                        <span className="w-full py-2 font-bold text-blue-600 text-xl">Company Applications</span>
                        <svg onClick={() => { props.state_func(<></>); }}  className="w-5 h-5 my-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path className="dark:fill-blue-600 fill-gray-600" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                        </svg>
                    </span>
                    <section className="p-6 flex flex-col text-gray-800 dark:text-white h-[300px] text-center w-full">
                        {
                            loader_var ? <div className="dot-bricks mx-auto my-auto w-fit h-fit"></div> : 
                            app_var ? <div className="w-full h-full overflow-y-auto grid grid-cols-3">
                                {apps}
                            </div> : <h1 className="w-fit flex flex-col space-y-6 h-fit mx-auto my-auto text-blue-600">
                                <svg className="w-32 h-32 mx-auto my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path className="fill-blue-600" d="M640 264v-16c0-8.84-7.16-16-16-16H344v-40h72c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32H224c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h72v40H16c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h104v40H64c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h304v40h-56c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32h-56v-40h104c8.84 0 16-7.16 16-16zM256 128V64h128v64H256zm-64 320H96v-64h96v64zm352 0h-96v-64h96v64z"/>
                                </svg>
                                <font className="text-3xl dark:text-blue-600 font-bold">No Modules Yet</font>
                            </h1>
                        }
                    </section>
                </div>
            </section>
        </section>
    );
};

export default Modules;