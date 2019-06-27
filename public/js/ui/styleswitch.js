export class StyleSwitcher {
    constructor(dataService) {
        this.dataService = dataService;
        this.dataType = 'style';
    }

    setStyle(styleSwitch) {
        if (this.dataService.getLocalData(this.dataType) !== null) {

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
        const styleTheme = {
            name: document.body.className
        };

        const styles = [];

        styles.push(styleTheme);
        this.dataService.updateData(this.dataType, styles);
    }

    getStyleFromLocalStorage() {

        return this.dataService.getLocalData(this.dataType)[0].name;
    }
}