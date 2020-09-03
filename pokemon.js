class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}
class Pokemon extends Selectors {
    constructor({ name, type, defaultHP, damageHP, selectors, attacks = [] }) {
        super(selectors);

        this.name = name;
        this.type = type;
        this.defaultHP = defaultHP;
        this.damageHP = damageHP;
        this.attacks = attacks,

            this.renderHP();
    }
    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife = () => {
        this.elHP.innerText = this.damageHP + '/' + this.defaultHP;
        // const { elHP, damageHP, defaultHP } = this;
        // elHP.innerText = damageHP + '/' + defaultHP;
    }

    renderProgressbarHP = () => {
        this.elProgressbar.style.width = this.damageHP + '%';
        // const { damageHP, defaultHP, elProgressbar } = this;
        // const procent = damageHP / (defaultHP / 100);
        // elProgressbar.style.width = procent + '%';
    }
    changeHP = (count, cb) => {
        this.damageHP -= count;
        if (this.damageHP <= 0) {
            this.damageHP = 0;
        }
        this.renderHP();
        cb && cb(count);
    }
}

export default Pokemon;