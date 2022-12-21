let sender_id = 0, lastSenderID = 0;
let receiver_id = 0, tab_section = false, loaded_groups = false;
let isPersonalChat = true;

// personal chat
const setSenderID = (id) => sender_id = id;
const getSenderID = () => {return sender_id;}

// group chat
const setToGroupChat = () => isPersonalChat = false;
const setToPersonalChat = () => isPersonalChat = true;
const isChatPersonal = () => {return isPersonalChat}

const updateLastSenderID = id => lastSenderID = sender_id;
const updateReceiverID = id => receiver_id = id;
const getReceiverID = () => {return receiver_id;}

const setTabSection = (section) => tab_section = section;
const getTabSection = () => {return tab_section}
const loadedGroups = () => {return loaded_groups}
const setLoadedGroups = () => loaded_groups = true;

let loaded_worker_effect = false;
const loadWorkerEffect = () => loaded_worker_effect = true;
const hasLoadedWorkerEffect = () => {return loaded_worker_effect}

let loaded_group_effect = false;
const loadGroupEffect = () => loaded_group_effect = true;
const hasGroupWorkerEffect = () => {return loaded_group_effect}

let loaded_group_message_effect = false;
const loadGroupMessageEffect = () => loaded_group_message_effect = true;
const hasGroupMessageEffect = () => {return loaded_group_message_effect}

let loaded_personal_message_effect = false;
const loadPersonalMessageEffect = () => loaded_personal_message_effect = true;
const hasPersonalMessageEffect = () => {return loaded_personal_message_effect}

let group_id = 0, group_name = "";
const setGroupID = (id) => group_id = id;
const getGroupID = () => {return group_id}
const setGroupName = (name) => group_name = name;
const getGroupName = () => {return group_name}

let status = "co-worker";
const setStatus = (status__) => status = status__;
const getStatus = () => status

let message_type = " text", message_type_raw = "";
const setMessageType = (type) => {message_type = type; message_type_raw = type;}
let getRawMessageType = () => {return message_type_raw},
getMessageType = (text) => { 
    if (text.indexOf("https://bit.ly/invite/") >= 0) message_type = "invite-link";
    if (text.indexOf("https://bit.ly/attachment/") >= 0) message_type = "attachment";
    if (text.indexOf("https://bit.ly/video/") >= 0) message_type = "video";
    if (text.indexOf("https://bit.ly/image/") >= 0) message_type = "image";
    if (text.indexOf("https://bit.ly/link/") >= 0) message_type = "link";
    return message_type 
},
getRawMessageType_ = (raw) => {
    if (raw == "attachment") return "https://bit.ly/attachment/";
    if (raw == "video") return "https://bit.ly/video/";
    if (raw == "image") return "https://bit.ly/image/";
    if (raw == "link") return "https://bit.ly/link/";
}

let last_msg_id = -1;
const IsMessageLast = (id) => {
    if (last_msg_id >= id) return false;
    else last_msg_id = id; return true;
}

module.exports = {
    setSenderID, getSenderID, lastSenderID, updateLastSenderID, 
    updateReceiverID, getReceiverID, setTabSection, getTabSection,
    loadedGroups, setLoadedGroups, setToGroupChat, setToPersonalChat,
    isChatPersonal, loadWorkerEffect, hasLoadedWorkerEffect, IsMessageLast,
    loadGroupEffect, hasGroupWorkerEffect, loadGroupMessageEffect,
    hasGroupMessageEffect, loadPersonalMessageEffect, hasPersonalMessageEffect,
    setGroupID, getGroupID, setStatus, getStatus, getGroupName, setGroupName,
    setMessageType, getMessageType, getRawMessageType, getRawMessageType_
}