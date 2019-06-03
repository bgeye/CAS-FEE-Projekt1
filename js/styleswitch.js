init();


function init() {
    setStyle();
    addEventListener();
}

function addEventListener() {

    document.querySelector('#styleswitch').addEventListener('change', switchStyle);

}


function setStyle() {
    const styleSwitcher = document.querySelector('#styleswitch');
    if (JSON.parse(localStorage.getItem('style')) !== null) {
        document.body.className = getStyleFromLocalStorage();
        styleSwitcher.value = getStyleFromLocalStorage();
    }
}


function switchStyle() {

    document.body.className = this.value;
    saveStyle();
}


function saveStyle() {
    const style = {
        name: document.body.className
    };

    const styles = [];

    styles.push(style);
    localStorage.setItem('style', JSON.stringify(styles));
    getStyleFromLocalStorage();
}


function getStyleFromLocalStorage() {
    const style = JSON.parse(localStorage.getItem('style'));

    return style[0].name
}