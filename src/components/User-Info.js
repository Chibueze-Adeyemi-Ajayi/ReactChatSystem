import URL from "./session/http";
import $ from "jquery";

const UserInfo = (props) => { //console.log(props);
    let passport = "", name = "", has_dp = false, email, telephone, address, dob;
    // document looping
    let id_card, psppt, cert, cv, bnk_stmt; 
    let docs = props.docs; for (const key in docs) {
        if (docs.hasOwnProperty(key)) {
            const doc = docs[key];
            passport = doc.passport; psppt = passport;
            id_card = doc.id_card; cert = doc.cert; cv = doc.cv; bnk_stmt = doc.bank_stmt;
            has_dp = passport.length > 3;
        }
    }
    // user looping
    let users = props.user; for (const key in users) {
        if (users.hasOwnProperty(key)) {
            const element = users[key];
            name = element.name;
        }
    }
    // details looping
    let details = props.basic; for (const key in details) {
        if (details.hasOwnProperty(key)) {
            const element = details[key];
            email = element.office_mail; telephone = element.phone_number;
            address = element.home_address; dob = element.dob;
        }
    }
    // emergency looping
    let e_name, e_address, e_number, e_email;
    let emergency = props.emergency; for (const key in emergency) {
        if (emergency.hasOwnProperty(key)) {
            const element = emergency[key];
            e_name = element.name; e_number = element.number; e_email = element.email; e_address = element.address;
        }
    }
    // kin looping
    let k_name, k_address, k_number, k_email, k_sex, k_city, k_relationship
    let kin = props.kin; for (const key in kin) {
        if (kin.hasOwnProperty(key)) {
            const element = kin[key];
            k_name = element.name; k_address = element.address; k_number = element.phone_number; 
            k_email = element.email; k_relationship = element.relationship; k_city = element.city;
            k_sex = element.sex;
        }
    }
    // reference looping
    let ref_name, ref_address, ref_number, ref_email, ref_sex, ref_city, ref_relationship
    let reference = props.reference; for (const key in reference) {
        if (reference.hasOwnProperty(key)) {
            const element = reference[key];
            ref_name = element.name; ref_address = element.address; ref_number = element.phone_number; 
            ref_email = element.email; ref_relationship = element.relationship; ref_city = element.city;
            ref_sex = element.sex;
        }
    }
    let icon = has_dp ? <img src={ URL + "PASSPORT/" + passport } className="w-10 hover:scale-150 transition-all duration-200 transform h-10 rounded-full"/>  : 
                        <svg className="w-8 transition-all duration-300 transform hover:scale-115 h-8 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path className="dark:fill-white fill-blue-600" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                        </svg>
   
    return (
        <section className="w-full h-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-lg">
            <section className="w-full h-full flex flex-col p-6">
                <div className="w-full h-fit mx-auto my-auto md:w-[400px] lg:md:w-[500px] md:h-fit rounded-md bg-white dark:bg-gray-800">
                    {/* cancelling button */}
                    <span className="w-full p-3 h-fit flex flex-row dark:border-b-4 border-b dark:border-blue-600 border-gray-100">
                        {icon}
                        <span className="w-full py-2 px-4 font-bold text-blue-600 text-xl">{name}</span>
                        <svg onClick={() => {
                            props.state_func(false);
                        }}  className="w-5 h-5 my-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path className="dark:fill-blue-600 fill-gray-600" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                        </svg>
                    </span>
                   {/* application body */}
                   <section className="w-full dark:text-white dark:color-white flex space-y-3 flex-col h-[450px] overflow-y-auto p-3">
                        <section className="w-full h-fit flex space-y-3 flex-col">
                            <h1 className="w-full font-bold border-b-2 dark:border-blue-600 border-gray-300 pb-2 text-xl">Contact Details</h1>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Email:</font><font id="email">{email}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Telephone:</font><font id="telephone">{telephone}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Address:</font><font id="address">{address}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">D.O.B:</font><font id="dob">{dob}</font>
                            </span>
                        </section>
                        
                        <section className="w-full h-fit flex space-y-3 flex-col">
                            <h1 className="w-full font-bold text-xl border-y-2 dark:border-blue-600 border-gray-300 py-2 pb-3">Emergency Details</h1>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Name:</font><font>{e_name}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Number:</font><font>{e_number}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Email:</font><font>{e_email}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Address:</font><font>{e_address}</font>
                            </span>
                        </section>

                        <section className="w-full h-fit flex space-y-3 flex-col">
                            <h1 className="w-full font-bold text-xl border-y-2 dark:border-blue-600 border-gray-300 py-2 pb-3">Next of Kin</h1>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Name:</font><font>{k_name}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Telephone:</font><font>{k_number}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Email:</font><font>{k_email}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Sex:</font><font>{k_sex}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Address:</font><font>{k_address}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">City:</font><font>{k_city}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Relationship:</font><font>{k_relationship}</font>
                            </span>
                        </section>

                        <section className="w-full h-fit flex space-y-3 flex-col">
                            <h1 className="w-full font-bold text-xl border-y-2 dark:border-blue-600 border-gray-300 py-2 pb-3">Reference Details</h1>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Name:</font><font>{ref_name}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Telephone:</font><font>{ref_number}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Email:</font><font>{ref_email}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Sex:</font><font>{ref_sex}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Address:</font><font>{ref_address}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">City:</font><font>{ref_city}</font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Relationship:</font><font>{ref_relationship}</font>
                            </span>
                        </section>

                        <section className="w-full h-fit flex space-y-3 flex-col">
                            <h1 className="w-full font-bold text-xl border-y-2 dark:border-blue-600 border-gray-300 py-2 pb-3">Documents</h1>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">ID Card:</font>
                                <font>
                                    <a download href={URL + "ID/" + id_card}>Download</a>
                                </font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Passport:</font><font>
                                    <a download href={URL + "PASSPORT/" + passport}>Download</a>
                                </font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Certificate:</font><font>
                                    <a download href={URL + "CERT/" + cert}>Download</a>
                                </font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">CV:</font><font>
                                    <a download href={URL + "CV/" + cv}>Download</a>  
                                </font>
                            </span>
                            <span className="w-full h-fit flex flex-row space-x-4">
                                <font className="font-bold">Bank Statement:</font><font>
                                    <a download href={URL + "BANK_STMT/" + bnk_stmt}>Download</a>
                                </font>
                            </span>
                        </section>
                   </section>
                </div>
            </section>
        </section>
    );
};

export default UserInfo;