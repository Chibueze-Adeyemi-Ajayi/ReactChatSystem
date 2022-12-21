import BASE_URL from "../../http/url";
import $ from "jquery";
import { getGroupID, getMessageType, getRawMessageType, getRawMessageType_, getReceiverID, getStatus, setMessageType } from "../session/chat";
import ID from "../session/user";

const Prompt = (props) => {
    return (
        <section className="w-full h-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-lg">
            <section className="w-full h-full flex flex-col p-6">
                <div className="w-full h-fit mx-auto my-auto md:w-[300px] lg:md:w-[400px] md:h-fit rounded-md bg-white dark:bg-gray-800">
                    {/* cancelling button */}
                    <span className="w-full p-3 h-fit flex flex-row dark:border-b-4 border-b dark:border-blue-600 border-gray-100">
                        <span className="w-full py-2 font-bold text-blue-600 text-xl">Add Link</span>
                        <svg onClick={() => {
                            props.state_func_(<></>);
                        }}  className="w-5 h-5 my-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path className="dark:fill-blue-600 fill-gray-600" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                        </svg>
                    </span>
                    <section className="p-6 text-gray-800 dark:text-white text-center w-full h-fit">
                        <input id="link__" className="w-full bg-inherit h-10 px-2 border border:gray-300 dark:border-blue-600" placeholder="https://" />
                    </section>
                    <hr className="border-0 h-[0.5px] bg-gray-300 dark:bg-gray-700"></hr>
                    <section className="w-full space-x-4 h-fit p-4">
                    <button onClick={() => {
                            let link = $("#link__").val(); setMessageType(); props.show_snackbar("Sending link", props.profile_func);
                            if (link.length > 5) { props.state_func_(<></>);
                                let status = getStatus(); 

                                if (status == "group") { 
                                    // getting the group ID
                                    let groupID = getGroupID(), message = "https://bit.ly/link/" + link;
                                    let url = BASE_URL + "group/message/send", data = {
                                        "group_id": groupID, "user_id": ID(), "message": message,  "type" : getMessageType(message)
                                    };
                                    $.post(url, data, (data, status) => {
                                        data = JSON.parse(data);
                                        if (data.code == 200) {
                                            props.show_snackbar(data.status, props.profile_func);
                                        } else {
                                            props.show_snackbar("Unable to send message", props.profile_func);
                                            $('#message').val(message);
                                        }
                                    });
                                    return false;
                                }

                                let message = "https://bit.ly/link/" + link
                                props.show_snackbar("Sending ....", props.profile_func);
                                let block = { "sender_id" : ID(), "message" : message, "receiver_id" : getReceiverID(), "type" : getMessageType(message) }, url = BASE_URL + "message/send";
                                $.post(url, block, (data, status) => {
                                    data = JSON.parse(data);
                                    if (data.code == 200) { // success
                                        props.show_snackbar("Message delivered successfully", props.profile_func);
                                    } else { /* error */ props.show_snackbar("Unable to send message", "Send failed", props.profile_func)};
                                });
                            } 
                        }} className="w-fit h-fit px-8 py-2 bg-gray-300 text-gray-800 dark:text-white rounded-md dark:bg-blue-600">Send</button>
                        <button onClick={() => {
                            props.state_func_(<></>);
                        }} className="w-fit h-fit px-8 py-2 bg-gray-300 text-gray-800 dark:text-white rounded-md dark:bg-blue-600">Cancel</button>
                    </section>
                </div>
            </section>
        </section>
    );
};

export default Prompt;