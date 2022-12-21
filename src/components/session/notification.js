const ShowNotification = (title, body) => {
    let url = window.location.href; url = url.toString(); url += "logo.png";
    let body_ = "Jilo Billionaire";
    var notification = new Notification('Title', { body_, url });
    notification.onclick = () => {
            notification.close();
            window.parent.focus();
    }
}

module.exports = {
    ShowNotification
}