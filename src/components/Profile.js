import { useEffect, useState } from "react";
import ID from "./session/user";
import $ from "jquery";
import "../asset/css/style.css"
import BASE_URL from "../http/url";
import URL from "./session/http";

const update_dp = (dp_func, src) => {
    dp_func(true);
    setTimeout(() => {$("#dp_image_src").attr("src", URL + "PASSPORT/" + src);}, 100);
}

const Progress = () => {
    return (<section className="w-full h-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-lg" id="alert-body">
                <section className="w-full h-full flex flex-col">
                    <div className="dot-bricks mx-auto my-auto w-fit h-fit"></div>
                </section>
            </section>);
}

const Basic = (props) => {
    // getting the data if existed
    useEffect(() => {
        props.progress_bar(true);
        $.post(BASE_URL + "information", {user_id : ID()}, (data, status) => {
            data = JSON.parse(data);
            if (data.code === 200) {
                const details = data.result.basic;
                for (const key in details) {
                    if (details.hasOwnProperty.call(details, key)) {
                        const detail = details[key];
                        $("#firstname").val(detail.firstname); $("#lastname").val(detail.lastname); 
                        $("#office_mail").val(detail.office_mail); $("#personal_mail").val(detail.personal_mail); 
                        $("#phone_number").val(detail.phone_number); $("#home_address").val(detail.home_address); 
                        $("#dob").val(detail.dob); $("#nin").val(detail.nin); 
                    }
                }
                const docs = data.result.document;
                for (const key in docs) {
                    if (Object.hasOwnProperty.call(docs, key)) {
                        const doc = docs[key];
                        update_dp(props.dp_func, doc.passport);
                    }
                }
                //docs.forEach(doc => { console.log(doc.passport); update_dp(props.dp_func, doc.passport); }); 
            } else console.log(data);
            setTimeout(() => {props.progress_bar(false);}, 1);
        });
    }, []);
    return (
        <section className="w-full h-full flex flex-col space-y-4 p-6">
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="firstname" placeholder="Firstname" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <input id="lastname" placeholder="Lastname" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="office_mail" placeholder="Office email" type="email" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <input id="personal_mail" placeholder="Personal email" type="email" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="phone_number" placeholder="Phone number" type="number" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <input id="home_address" placeholder="Home address" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="nin" maxLength={11} minLength={11} placeholder="NIN (Nigerian Staff)" type="number" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <div onClick={() => {
                    $("#dob").click(); console.log("hola");
                }} placeholder="Home address" type="text" className="w-[20rem] dark:text-white flex flex-row space-x-4 h-10 px-2 py-1 border border-transparent rounded-md bg-inherit">
                    <span className="h-fit my-auto text-white/50 w-full">Date of Birth</span>
                    <svg className="h-4 w-4 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path className="fill-white/50" d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"/>
                    </svg>
                </div>
                <input id="dob" placeholder="Date of Birth" type="date" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
            <button onClick={() => {
                    let firstname = $("#firstname").val(), lastname = $("#lastname").val(), nin = $("#nin").val(), 
                    office_mail = $("#office_mail").val(), personal_mail = $("#personal_mail").val(), 
                    phone_number = $("#phone_number").val(), home_address = $("#home_address").val(), 
                    dob = $("#dob").val(), user_id = ID(); 
                    props.progress_bar(true); let url = BASE_URL + "information/basic", data = {
                        firstname:firstname, lastname:lastname, office_mail:office_mail,
                        personal_mail:personal_mail, home_address:home_address, phone_number:phone_number,
                        dob:dob, user_id:user_id, nin:nin
                    };
                    $.post(url, data, (data, status) => {
                        data = JSON.parse(data);
                        if (data.code == 200) {
                            props.tab("payment");
                        } else {alert(data.status); props.progress_bar(false);}
                    });
                }} type="submit" className="w-full h-10 rounded-md text-gray-800 bg-blue-600">Proceed</button>
            </span>
        </section>
    );
}

const Payment = (props) => {
     // getting the data if existed
     useEffect(() => {
        props.progress_bar(true);
        $.post(BASE_URL + "information", {user_id : ID()}, (data, status) => {
            data = JSON.parse(data);
            if (data.code === 200) {
                const details = data.result.payment;
                for (const key in details) {
                    if (details.hasOwnProperty.call(details, key)) {
                        const detail = details[key];
                        $("#account_name").val(detail.account_name);  
                        $("#account_number").val(detail.account_number);  
                        $("#bank_name").val(detail.bank_name);  
                        $("#dob").val(detail.dob); 
                        $("#social_insurance_no").val(detail.insurance_number);
                        $("#sort_code").val(detail.sort_code);
                    }
                }
                const docs = data.result.document;
                for (const key in docs) {
                    if (Object.hasOwnProperty.call(docs, key)) {
                        const doc = docs[key];
                        update_dp(props.dp_func, doc.passport);
                    }
                }
            } else {alert(data.status); props.progress_bar(false);}
            setTimeout(() => {props.progress_bar(false);}, 1);
        });
    }, []);
    return (
        <section className="w-full h-full flex flex-col space-y-4 p-6">
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="account_name" placeholder="Account name" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <input id="account_number" placeholder="Account number" type="number" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="sort_code" placeholder="Sort Code (UK Staffs only)" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <input id="social_insurance_no" placeholder="Social Insurance Number (US Staffs only)" type="number" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="bank_name" placeholder="Bank name" type="email" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <button onClick={() => { props.progress_bar(true);
                    let account_name = $("#account_name").val(), account_number = $("#account_number").val(), bank_name = $("#bank_name").val(), user_id = ID(),
                    insurance_number = $("#social_insurance_no").val(), sort_code = $("#sort_code").val();
                    let url = BASE_URL + "information/payment", 
                    data = {
                        account_name: account_name, account_number: account_number, 
                        bank_name: bank_name, user_id:ID(), insurance_number: insurance_number,
                        sort_code: sort_code
                    };
                    $.post(url, data, (data, status) => {
                        data = JSON.parse(data);
                        if (data.code == 200) {
                            props.tab("kin");
                        } else alert(data.status); props.progress_bar(false);
                    });
                }} type="submit" className="w-full h-10 rounded-md text-gray-800 bg-blue-600">Proceed</button>
            </span>
        </section>
    );
}

const Relative = (props) => {
    // getting the data if existed
    useEffect(() => {
        props.progress_bar(true);
        $.post(BASE_URL + "information", {user_id : ID()}, (data, status) => {
            data = JSON.parse(data);
            if (data.code === 200) {
                const details = data.result.kin;
                for (const key in details) {
                    if (details.hasOwnProperty.call(details, key)) {
                        const detail = details[key];
                        $("#name").val(detail.name); $("#phone_number").val(detail.phone_number); 
                        $("#email").val(detail.email); $("#sex").val(detail.sex); 
                        $("#address").val(detail.address); $("#city").val(detail.city); 
                        $("#relationship").val(detail.relationship); $("#kin-btn").fadeOut();
                    }
                }
                const docs = data.result.document;
                for (const key in docs) {
                    if (Object.hasOwnProperty.call(docs, key)) {
                        const doc = docs[key];
                        update_dp(props.dp_func, doc.passport);
                    }
                }
            } else {alert(data.status); props.progress_bar(false);}
            setTimeout(() => {props.progress_bar(false);}, 1);
        });
    }, []);
    return (
        <section className="w-full h-full flex flex-col space-y-4 p-6">
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="name" placeholder="Name" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <input id="phone_number" placeholder="Phone number" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="email" placeholder="email" type="email" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <select id="sex" placeholder="sex" type="email" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit">
                    <option className="text-black" value="">Choose gender</option>
                    <option className="text-black" value="female">Female</option>
                    <option className="text-black" value="male">Male</option>
                </select>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="address" placeholder="Home address" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <input id="city" placeholder="City/State" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="relationship" placeholder="Relationship" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <button id="kin-btn" onClick={() => {
                    let name = $("#name").val(), phone_number = $("#phone_number").val(), email = $("#email").val(), sex = $("#sex").val(), address = $("#address").val(),
                        city = $("#city").val(), relationship = $("#relationship").val(), user_id = ID();
                    let data = {name: name, phone_number: phone_number, email: email, sex: sex, address: address, city: city, relationship: relationship, user_id: user_id},
                        url = BASE_URL + "information/kin";
                        props.progress_bar(true);
                        $.post(url, data, (data, status) => {
                            data = JSON.parse(data);
                            if (data.code === 200) {
                                props.tab("emergency");
                            } else console.log(data);
                            setTimeout(() => {props.progress_bar(false);}, 100);
                        });
                }} type="submit" className="w-full h-10 rounded-md text-gray-800 bg-blue-600">Proceed</button>
            </span>
        </section>
    );
}


const Reference = (props) => {
    useEffect(() => {
        props.progress_bar(true);
        $.post(BASE_URL + "information", {user_id : ID()}, (data, status) => {
            data = JSON.parse(data);
            if (data.code === 200) {
                const details = data.result.reference;
                for (const key in details) {
                    if (Object.hasOwnProperty.call(details, key)) {
                        const detail = details[key];
                        $("#name").val(detail.name); $("#phone_number").val(detail.phone_number); 
                        $("#email").val(detail.email); $("#sex").val(detail.sex); 
                        $("#address").val(detail.address); $("#city").val(detail.city); 
                        $("#relationship").val(detail.relationship); 
                        $("#kin-btn").fadeOut();
                    }
                }
                const docs = data.result.document;
                for (const key in docs) {
                    if (Object.hasOwnProperty.call(docs, key)) {
                        const doc = docs[key];
                        update_dp(props.dp_func, doc.passport);
                    }
                }
            } else {alert(data.status); props.progress_bar(false);}
            setTimeout(() => {props.progress_bar(false);}, 1);
        });
    }, []);
    return (
        <section className="w-full h-full flex flex-col space-y-4 p-6">
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="name" placeholder="Name" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <input id="phone_number" placeholder="Phone number" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="email" placeholder="email" type="email" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <select id="sex" placeholder="sex" type="email" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit">
                    <option className="text-black" value="">Choose gender</option>
                    <option className="text-black" value="female">Female</option>
                    <option className="text-black" value="male">Male</option>
                </select>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="address" placeholder="Home address" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <input id="city" placeholder="City/State" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="relationship" placeholder="Relationship" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <button  onClick={() => {
                    let name = $("#name").val(), phone_number = $("#phone_number").val(), email = $("#email").val(), sex = $("#sex").val(), address = $("#address").val(),
                        city = $("#city").val(), relationship = $("#relationship").val(), user_id = ID();
                    let data = {name: name, phone_number: phone_number, email: email, sex: sex, address: address, city: city, relationship: relationship, user_id: user_id},
                        url = BASE_URL + "information/reference";
                        props.progress_bar(true);
                        $.post(url, data, (data, status) => {
                            data = JSON.parse(data);
                            if (data.code === 200) {
                                props.tab("document");
                            } else console.log(data.status);
                            setTimeout(() => {props.progress_bar(false);}, 100);
                        });
                }} type="submit" className="w-full h-10 rounded-md text-gray-800 bg-blue-600">Proceed</button>
            </span>
        </section>
    );
}


const Emergency = (props) => {
    // getting the data if existed
    useEffect(() => {
        props.progress_bar(true);
        $.post(BASE_URL + "information", {user_id : ID()}, (data, status) => {
            data = JSON.parse(data);
            if (data.code === 200) {
                const details = data.result.emergency;
                for (const key in details) {
                    if (Object.hasOwnProperty.call(details, key)) {
                        const detail = details[key];
                        $("#name").val(detail.name); $("#number").val(detail.number); 
                        $("#email").val(detail.email); $("#address").val(detail.address); 
                        $("#emergency-btn").fadeOut();
                    }
                }
                const docs = data.result.document;
                for (const key in docs) {
                    if (Object.hasOwnProperty.call(docs, key)) {
                        const doc = docs[key];
                        update_dp(props.dp_func, doc.passport);
                    }
                }
            } else {alert(data.status); props.progress_bar(false);}
            setTimeout(() => {props.progress_bar(false);}, 1);
        });
    }, []);
    return (
        <section className="w-full h-full flex flex-col space-y-4 p-6">
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="name" placeholder="Name" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <input id="number" placeholder="Number" type="number" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
                <input id="email" placeholder="Email address" type="email" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
                <input id="address" placeholder="Home address" type="text" className="w-full dark:text-white h-10 px-2 py-1 border border-blue-600 rounded-md bg-inherit"></input>
            </span>
            <span className="w-full h-fit flex flex-row space-x-4">
                <button onClick={() => {props.progress_bar(true)
                    let name = $("#name").val(), number = $("#number").val(), user_id = ID();
                    let email = $("#email").val(), address = $("#address").val();
                    let url = BASE_URL + "information/emergency", data = {name: name, number:number, user_id: user_id, email: email, address: address};
                    $.post(url, data, (data, status) => {
                        data = JSON.parse(data);
                        if (data.code === 200) {
                            props.tab("reference");
                        } else console.log(data);
                        setTimeout(() => {props.progress_bar(false);}, 1);
                    });
                }} type="submit" id="emergency-btn" className="w-full h-10 rounded-md text-gray-800 bg-blue-600">Proceed</button>
            </span>
        </section>
    );
}

const Document = (props) => {
    const [docs_var, docs_func] = useState(true)
    // getting the data if existed
    useEffect(() => {
        props.progress_bar(true);
        $.post(BASE_URL + "information", {user_id : ID()}, (data, status) => {
            data = JSON.parse(data);
            if (data.code === 200) {
                const details = data.result.document;
                for (const key in details) {
                    if (Object.hasOwnProperty.call(details, key)) {
                        docs_func(false);
                    } else docs_func(true);
                }
            } else {alert(data.status); props.progress_bar(false);}
            setTimeout(() => {props.progress_bar(false);}, 1);
        });
    }, []);

    const docs_file_form = <section className="w-full h-full space-y-8 p-6">
            <span className="w-full h-fit flex flex-col space-y-2">
                <font className="dark:text-white text-gray-800">Passport photographs</font>
                <input id="passport" type="file"></input>
            </span>
            <span className="w-full h-fit flex flex-col space-y-2">
                <font className="dark:text-white text-gray-800">Form of identity (Intl. passport, National ID Card, Driving License)</font>
                <input id="id" type="file"></input>
            </span>
            <span className="w-full h-fit flex flex-col space-y-2">
                <font className="dark:text-white text-gray-800">Highest Qualification Certificate</font>
                <input id="cert" type="file"></input>
            </span>
            <span className="w-full h-fit flex flex-col space-y-2">
                <font className="dark:text-white text-gray-800">CV</font>
                <input id="cv" type="file"></input>
            </span>
            <span className="w-full h-fit flex flex-col space-y-2">
                <font className="dark:text-white text-gray-800">Bank Statement</font>
                <input id="bnk_stmt" type="file"></input>
            </span>
            <button id="docs_upload_btn" onClick={() => {
                
                    let passport = $("#passport"), id = $("#id"),
                        cert = $("#cert"), cv = $("#cv"), bnk_stmt = $("#bnk_stmt"),  user_id = ID();

                        if (passport.val().length < 5 || id.val().length < 5 || cert.val().length < 5 || cv.val().length < 5 || bnk_stmt.val().length < 5) {
                            alert("Please choose all the required fields.");
                            return;
                        }  props.progress_bar(true);

                        const url = "information/document";
                        let form_data = new FormData(); 
                        form_data.append("user_id", user_id); form_data.append("id", id.prop("files")[0]);
                        form_data.append("passport", passport.prop('files')[0]); form_data.append("identity", id.prop('files')[0]);
                        form_data.append("cert", cert.prop('files')[0]); form_data.append("cv", cv.prop('files')[0]);
                        form_data.append("bank_stmt", bnk_stmt.prop('files')[0]);
                        $.ajax({
                            url: BASE_URL + url, // point to server-side controller method
                            dataType: 'text', // what to expect back from the server
                            cache: false, contentType: false, processData: false, data: form_data, type: 'post',
                            success: function (response) { 
                                let data = JSON.parse(response);
                                if (data.code === 200) {
                                    props.tab("basic");
                                } else console.log(data.status);
                                props.progress_bar(false);
                            },
                            error: function (response) { alert("unexpected error occured"); props.progress_bar(false);}
                        });
                }} type="submit" className="w-full h-10 rounded-md text-gray-800 bg-blue-600">Submit</button> <br></br><br></br>
        </section>

    const docs_file_msg = <section className="w-full h-full space-y-8 p-6">
        <svg className="w-56 h-56 mx-auto my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
            <path className="fill-blue-600" d="M0 256c0 137 111 248 248 248s248-111 248-248S385 8 248 8 0 119 0 256zm200-48c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm158.5 16.5c-14.8-13.2-46.2-13.2-61 0L288 233c-8.3 7.4-21.6.4-19.8-10.8 4-25.2 34.2-42.1 59.9-42.1S384 197 388 222.2c1.7 11.1-11.4 18.3-19.8 10.8l-9.7-8.5zM157.8 325.8C180.2 352.7 213 368 248 368s67.8-15.4 90.2-42.2c13.6-16.2 38.1 4.2 24.6 20.5C334.3 380.4 292.5 400 248 400s-86.3-19.6-114.8-53.8c-13.5-16.3 11.2-36.7 24.6-20.4z"/>
        </svg>
        <h1 className="text-4xl text-blue-600 w-full text-center font-bold">We got your document covered</h1>
    </section>; 
    
    if (docs_var) return docs_file_form; return docs_file_msg;
}

const populate_fields = (identifier, progress_bar, tab, dp_func) => {
    switch (identifier) {
        case "basic": return <Basic dp_func={dp_func} tab={tab} progress_bar={progress_bar}/>;
        case "payment": return <Payment dp_func={dp_func} tab={tab} progress_bar={progress_bar}/>;
        case "kin": return <Relative dp_func={dp_func} tab={tab} progress_bar={progress_bar}/>;
        case "emergency": return <Emergency dp_func={dp_func} tab={tab} progress_bar={progress_bar}/>;
        case "reference": return <Reference dp_func={dp_func} tab={tab} progress_bar={progress_bar}/>;
        case "document": return <Document dp_func={dp_func} tab={tab} progress_bar={progress_bar}/>;
        default: return <Basic dp_func={dp_func} tab={tab} progress_bar={progress_bar}/>;
    }
}

const Profile = (props) => {
    const [profile_var, profile_func] = useState("basic");
    const [progress_var, progress_func] = useState(false);
    return (
        <> 
        <section className="w-full h-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-lg" id="alert-body">  
        {progress_var? <Progress /> : <></>} 
            <section className="w-full h-full flex flex-col">
                <div className="w-[90%] flex flex-col space-y-2 h-[90%] border dark:border-gray-900 hover:shadow-lg hover:dark:shadow-black/10 dark:bg-gray-800 bg-white rounded-md shadow-lg mx-auto my-auto">
                    {/* cancelling button */}
                    <span className="w-full p-3 h-fit flex flex-row dark:border-b-4 border-b dark:border-blue-600 border-gray-100">
                        <span className="w-full py-2 font-bold text-blue-600 text-2xl">My Bio-Data</span>
                        <svg onClick={() => {
                            props.state_func(<></>);
                        }}  className="w-5 h-5 my-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path className="dark:fill-blue-600 fill-gray-600" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                        </svg>
                    </span>
                    {/* sectionings */}
                    <section className="w-full h-fit flex space-x-4 px-4 py-2">
                        <span onClick={() => {
                            profile_func("basic");
                        }} className={
                            (profile_var == "basic") ? "w-full hover:bg-gray-200 dark:bg-blue-600 bg-gray-300 hover:dark:bg-blue-600 hover:dark:text-white cursor-pointer h-fit py-2 text-center rounded-full border border-gray-200 dark:text-white text-gray-800 dark:border-blue-600" :
                            "w-full hover:bg-gray-200 hover:dark:bg-blue-600 hover:dark:text-white cursor-pointer h-fit py-2 text-center rounded-full border border-gray-200 dark:text-white text-gray-800 dark:border-blue-600"
                            }>
                            Basic
                        </span>
                        <span onClick={() => {
                            profile_func("payment")
                        }} className={
                            (profile_var == "payment") ? "w-full hover:bg-gray-200 dark:bg-blue-600 bg-gray-300 hover:dark:bg-blue-600 hover:dark:text-white cursor-pointer h-fit py-2 text-center rounded-full border border-gray-200 dark:text-white text-gray-800 dark:border-blue-600" :
                            "w-full hover:bg-gray-200 hover:dark:bg-blue-600 hover:dark:text-white cursor-pointer h-fit py-2 text-center rounded-full border border-gray-200 dark:text-white text-gray-800 dark:border-blue-600"
                        }>
                            Payment
                        </span>
                        <span onClick={() => {
                            profile_func("kin")
                        }} className={
                            (profile_var == "kin") ? "w-full hover:bg-gray-200 dark:bg-blue-600 bg-gray-300 hover:dark:bg-blue-600 hover:dark:text-white cursor-pointer h-fit py-2 text-center rounded-full border border-gray-200 dark:text-white text-gray-800 dark:border-blue-600" :
                            "w-full hover:bg-gray-200 hover:dark:bg-blue-600 hover:dark:text-white cursor-pointer h-fit py-2 text-center rounded-full border border-gray-200 dark:text-white text-gray-800 dark:border-blue-600"
                        }>
                            Next of kin
                        </span>
                        <span onClick={() => {
                            profile_func("emergency")
                        }} className={
                            (profile_var == "emergency") ? "w-full hover:bg-gray-200 dark:bg-blue-600 bg-gray-300 hover:dark:bg-blue-600 hover:dark:text-white cursor-pointer h-fit py-2 text-center rounded-full border border-gray-200 dark:text-white text-gray-800 dark:border-blue-600" :
                            "w-full hover:bg-gray-200 hover:dark:bg-blue-600 hover:dark:text-white cursor-pointer h-fit py-2 text-center rounded-full border border-gray-200 dark:text-white text-gray-800 dark:border-blue-600"
                        }>
                            Emergency
                        </span>
                        <span onClick={() => {
                            profile_func("reference")
                        }} className={
                            (profile_var == "reference") ? "w-full hover:bg-gray-200 dark:bg-blue-600 bg-gray-300 hover:dark:bg-blue-600 hover:dark:text-white cursor-pointer h-fit py-2 text-center rounded-full border border-gray-200 dark:text-white text-gray-800 dark:border-blue-600" :
                            "w-full hover:bg-gray-200 hover:dark:bg-blue-600 hover:dark:text-white cursor-pointer h-fit py-2 text-center rounded-full border border-gray-200 dark:text-white text-gray-800 dark:border-blue-600"
                        }>
                            Reference
                        </span>
                        <span onClick={() => {
                            profile_func("document")
                        }} className={
                            (profile_var == "document") ? "w-full hover:bg-gray-200 dark:bg-blue-600 bg-gray-300 hover:dark:bg-blue-600 hover:dark:text-white cursor-pointer h-fit py-2 text-center rounded-full border border-gray-200 dark:text-white text-gray-800 dark:border-blue-600" :
                            "w-full hover:bg-gray-200 hover:dark:bg-blue-600 hover:dark:text-white cursor-pointer h-fit py-2 text-center rounded-full border border-gray-200 dark:text-white text-gray-800 dark:border-blue-600"
                        }>
                            Document upload
                        </span>
                    </section>
                    {/* section frame */}
                    <div className="w-full h-full overflow-y-auto">
                        {populate_fields(profile_var, progress_func, profile_func, props.dp_func)}
                    </div>
                </div>
            </section>
        </section>
        </>
    );
}

export default Profile;