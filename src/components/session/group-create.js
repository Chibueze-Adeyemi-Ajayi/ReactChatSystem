let group_name = "", group_description = "";

const setGroupName = (value) => group_name = value;
const setGroupDescription = (value) => group_description = value;
const getGroupName = () => {return group_name}
const getGroupDescription = () => {return group_description}

module.exports = {setGroupDescription, setGroupName, getGroupName, getGroupDescription}