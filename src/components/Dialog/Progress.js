import "../../asset/css/style.css";

const Progress = () => {
    return (
        <section className="w-full h-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-lg">
            <section className="w-full h-full flex flex-col p-6">
                <div className="w-full p-10 flex flex-row space-x-8 h-fit mx-auto my-auto md:w-[300px] lg:md:w-[400px] md:h-fit rounded-md bg-white dark:bg-gray-800">
                    <div className="dot-bricks my-auto w-fit h-fit"></div>
                    <font className="dark:text-white text-xl text-gray-800">Processing ....</font>
                </div>
            </section>
        </section>
    );
};

export default Progress;