import $ from 'jquery';
import BASE_URL from '../../http/url';

const Invite = (props) => {
    return (
        <section className="w-full h-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-lg">
            <section className="w-full h-full flex flex-col p-6">
                <div className="w-full h-fit mx-auto my-auto md:w-[300px] lg:md:w-[400px] md:h-fit rounded-md bg-white dark:bg-gray-800">
                    {/* cancelling button */}
                    <span className="w-full p-3 h-fit flex flex-row dark:border-b-4 border-b dark:border-blue-600 border-gray-100">
                        <span className="w-full py-2 font-bold text-blue-600 text-xl">Onboarding Staff</span>
                        <svg onClick={() => {
                            props.state_func(false);
                        }}  className="w-5 h-5 my-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path className="dark:fill-blue-600 fill-gray-600" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                        </svg>
                    </span>
                    <section className="p-6 flex flex-col space-y-4 text-gray-800 dark:text-white text-center w-full h-fit">
                        <input id="email" className="w-full rounded-md bg-inherit h-10 px-2 border border:gray-300 dark:border-blue-600" placeholder="Staff Email" />
                        <input id="office_email" className="w-full rounded-md bg-inherit h-10 px-2 border border:gray-300 dark:border-blue-600" placeholder="Office email" />
                        <input id="id" className="w-full rounded-md bg-inherit h-10 px-2 border border:gray-300 dark:border-blue-600" placeholder="ID" />
                    </section>
                    <hr className="border-0 h-[0.5px] bg-gray-300 dark:bg-gray-700"></hr>
                    <section className="w-full space-x-4 h-fit p-4">
                    <button onClick={() => {
                            let staff_mail = $("#email").val(), office_email = $("#office_email").val(), id = $("#id").val();
                            let url = BASE_URL +"invite", data = {
                                expected_mail: office_email, main_mail: staff_mail, code:id
                            };
                            if (staff_mail.length < 4 || office_email.length < 4 || id.length == "") {
                                return;
                            } props.show_progress(true, props.state_func);
                            $.post(url, data, (data, status) => {
                                data = JSON.parse(data);
                                props.show_snackbar(data.status, props.state_func);
                            });
                            //props.state_func(false);
                        }} className="w-fit h-fit px-8 py-2 bg-gray-300 text-gray-800 dark:text-white rounded-md dark:bg-blue-600">Send Invitation</button>
                        <button onClick={() => {
                            props.state_func(false);
                        }} className="w-fit h-fit px-8 py-2 bg-gray-300 text-gray-800 dark:text-white rounded-md dark:bg-blue-600">Exit</button>
                    </section>
                </div>
            </section>
        </section>
    );
};

export default Invite;