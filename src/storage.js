export default class Storage {

    static setCheckboxesSelected(checkboxesIds) {

        checkboxesIds.length > 0 ? sessionStorage.setItem('checkboxes', checkboxesIds) : sessionStorage.setItem('checkboxes', []);
    }

    static getCheckboxesChecked() {
        return sessionStorage.getItem('checkboxes');
    }

}