export class StyleSwitcher {
    constructor() {

    }

    setStyle(styleSwitch) {
        if (this.getLocalStorage() !== null) {

            const localStorageStyle = this.getStyleFromLocalStorage();
            document.body.className = localStorageStyle;
            if (styleSwitch) {
                styleSwitch.value = localStorageStyle;
            }
        }
    }

    switchStyle(event) {

        document.body.className = event.target.value;
        this.saveStyle();
    }

    saveStyle() {
        const style = {
            name: document.body.className
        };

        const styles = [];

        styles.push(style);
        this.setLocalStorage(styles);
        this.getStyleFromLocalStorage();
    }

    getStyleFromLocalStorage() {
        const style = this.getLocalStorage();

        return style[0].name
    }

    setLocalStorage(styles) {
        return localStorage.setItem('style', JSON.stringify(styles));
    }

    getLocalStorage() {
        return JSON.parse(localStorage.getItem('style'));
    }
}