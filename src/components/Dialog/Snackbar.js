const Snackbar = (props) => {
    return (<section className="fixed md:p-0 md:top-[90%] top-[78%] border-gray-300 shadow-xl h-fit bg-inherit dark:bg-gray-900 rounded-md z-50 border dark:border-gray-900 md:w-[350px] md:left-[72%] w-full p-2">
                <div className="w-full px-4 py-2 h-full text-gray-800 dark:text-white">
                    {props.message}
                </div>
          </section>)
}

export default Snackbar;