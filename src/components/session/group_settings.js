let active = true, member_id = 0, group_id = 0, widget = "";

const setGroupActive = (bool) => active = bool;
const isGroupActive = (bool) => {return active};

const setMemberID = (id) => member_id = id;
const getMemberID = () => {return member_id;}

const setGroupID = (id) => group_id = id;
const getGroupID = () => {return group_id}


module.exports = {setGroupActive, isGroupActive, setMemberID, getMemberID, setGroupID, getGroupID};