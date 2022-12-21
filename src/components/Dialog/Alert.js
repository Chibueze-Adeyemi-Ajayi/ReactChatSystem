const Alert = (props) => {
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
                    <section className="p-6 text-gray-800 dark:text-white text-center w-full h-fit">
                        {props.message} 
                    </section>
                    <hr className="border-0 h-[0.5px] bg-gray-300 dark:bg-gray-700"></hr>
                    <section className="w-full h-fit p-4">
                        <button onClick={() => {
                            props.state_func(false);
                        }} className="w-fit h-fit px-8 py-2 bg-gray-300 text-gray-800 dark:text-white rounded-md dark:bg-blue-600">Ok</button>
                    </section>
                </div>
            </section>
        </section>
    );
};

export default Alert;