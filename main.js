import Pokemon from './pokemon.js';
import random from './utils.js';
import { pokemons } from './pokemons.js';

function getElById(id) {
    return document.getElementById(id);
}

const btn = getElById('btn-kick');
const btn1 = getElById('btn-kick1');

const pikachu = pokemons.find(item => item.name === 'Pikachu');
console.log(pikachu);
// объект героя
const player1 = new Pokemon({
    ...pikachu,
    selectors: 'player1',
});
console.log(player1);

const player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    damageHP: 100,
    defaultHP: 100,
    selectors: 'player2',
});
console.log(player1);
console.log(player2);
const control = document.querySelector('.control');
player1.attacks.forEach(item => {
    console.log(item);
    const btn = document.createElement('button');
    btn.classList.add('button');
    btn.innerText = item.name;
    const btnCount = countBtn(item.maxCount, btn);
    btn.addEventListener('click', () => {
        console.log('Click button', btn.innerText);
        btnCount();
    });
    control.appendChild(btn);

});
// кнопка удара
const btnCountJolt = countBtn(10, btn);
btn.addEventListener('click', function() {
    btnCountJolt();
    player1.changeHP(random(30, 20), function(count) {
        console.log('Some change after change HP', count);
        console.log(generateLog(player1, player2, count));
    });
    player2.changeHP(random(30, 20), function(count) {
        console.log('Some change after change HP', count);
        console.log(generateLog(player1, player2, count));
    });
});
const btnElectroBall = countBtn(10, btn1);
btn1.addEventListener('click', function() {
    btnElectroBall();
    player1.changeHP(random(20), function(count) {
        console.log('Some change after change HP', count);
        console.log(generateLog(player1, player2, count));
    });
    player2.changeHP(random(20), function(count) {
        console.log('Some change after change HP', count);
        console.log(generateLog(player1, player2, count));
    });
});

function countBtn(count = 6, el) {
    const innerText = el.innerText;
    el.innerText = `${innerText} (${count})`;
    return function() {
        count--;
        if (count === 0) {
            el.disabled = true;
        }
        el.innerText = `${innerText} (${count})`;
        return count;
    }
};

function changeHP(count) {
    this.damageHP -= count;
    const log = this === enemy ? generateLog(this, character) : generateLog(this, enemy);
    console.log(log);
    if (this.damageHP <= 0) {
        this.damageHP = 0;
        alert('Бедный' + this.name + 'проиграл бой!')
        btn.disabled = true;
    }
    this.renderHP();
};


function generateLog(player1, player2, count) {
    const { name, damageHP, defaultHP } = player2;
    const logs = [
        `${player1.name} вспомнил что-то важное, но неожиданно ${player2.name}, не помня себя от испуга, ударил в предплечье врага. ${player1.damageHP} / ${player2.damageHP}`,
        `${player1.name} поперхнулся, и за это ${player2.name} с испугу приложил прямой удар коленом в лоб врага. ${player1.damageHP} / ${player2.damageHP}`,
        `${player1.name} забылся, но в это время наглый ${player2.name}, приняв волевое решение, неслышно подойдя сзади, ударил. ${player1.damageHP} / ${player2.damageHP}}`,
        `${player1.name} пришел в себя, но неожиданно ${player2.name} случайно нанес мощнейший удар. ${player1.damageHP} / ${player2.damageHP}`,
        `${player1.name} поперхнулся, но в это время ${player2.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. ${player1.damageHP} / ${player2.damageHP}`,
        `${player1.name} удивился, а ${player2.name} пошатнувшись влепил подлый удар. ${player1.damageHP} / ${player2.damageHP}`,
        `${player1.name} высморкался, но неожиданно ${player2.name} провел дробящий удар.${player1.damageHP} / ${player2.damageHP}`,
        `${player1.name} пошатнулся, и внезапно наглый ${player2.name} беспричинно ударил в ногу противника ${player1.damageHP} / ${player2.damageHP}`,
        `${player1.name} расстроился, как вдруг, неожиданно ${player2.name} случайно влепил стопой в живот соперника.${player1.damageHP} / ${player2.damageHP}`,
        `${player1.name} пытался что-то сказать, но вдруг, неожиданно ${player2.name} со скуки, разбил бровь сопернику ${player1.damageHP} / ${player2.damageHP}`,
    ];
    return logs[(random(logs.length) - 1)];


};




// const character = {
//     name: 'Charmander',
//     type: 'electro',
//     weakness: ['fire', 'thunder'],
//     resistance: ['steel'],
//     damageHP: 100,
//     defaultHP: 100,
//     elHP: getElById('health-character'),
//     elProgressbar: getElById('progressbar-character'),
//     changeHP: changeHP,
//     renderHP: renderHP,
//     rederHPLife: renderHPLife,
//     renderProgressbarHP: renderProgressbarHP,
// }
// const enemy = {
//     name: 'Charmander',
//     type: 'fire',
//     weakness: ['fighting', 'water'],
//     resistance: ['steel'],
//     damageHP: 100,
//     defaultHP: 100,
//     elHP: getElById('health-enemy'),
//     elProgressbar: getElById('progressbar-enemy'),
//     changeHP: changeHP,
//     renderHP: renderHP,
//     rederHPLife: renderHPLife,
//     renderProgressbarHP: renderProgressbarHP,
// }