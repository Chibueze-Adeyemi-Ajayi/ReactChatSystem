let cname = "session";

function getCookie() {
  let name = cname, decodedCookie = decodeURIComponent(document.cookie), ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
 
const ID = () => {
    let id = getCookie(); 
    return id.substring(1);
}

module.exports = ID;