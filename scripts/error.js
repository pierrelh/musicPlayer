const _error = new class {
    constructor() {
        this.ClassName  = 'appear';
        this.Elements   = {
            Main:   document.getElementById('Error'),
            Title:  document.getElementById('ErrorTitle'),
            BTN:    document.getElementById('ErrorBTN')
        }

        this.Elements.BTN.addEventListener('click', evt => this.Hide(), false);
    }

    Show() {
        this.Elements.Main.classList.add(this.ClassName);
    }

    Hide() {
        this.Elements.Main.classList.remove(this.ClassName);
    }

    SetTitle(text, color) {
        this.Elements.Title.innerHTML = text;
        this.Elements.Title.style.color = color;
    }
}