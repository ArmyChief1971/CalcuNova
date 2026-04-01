const root = document.documentElement;
const display = document.getElementById('display');
const equation = document.getElementById('equation');
const historyList = document.getElementById('historyList');
const keypad = document.getElementById('keypad');
const historyCard = document.getElementById('historyCard');
const tabbar = document.getElementById('tabbar');
const contextAlert = document.getElementById('contextAlert');

let expression = '0';
let lastY = 0;

const keys = [
  ['C', 'op'], ['±', 'op'], ['%', 'op'], ['÷', 'op'],
  ['7', 'num'], ['8', 'num'], ['9', 'num'], ['×', 'op'],
  ['4', 'num'], ['5', 'num'], ['6', 'num'], ['−', 'op'],
  ['1', 'num'], ['2', 'num'], ['3', 'num'], ['+', 'op'],
  ['0', 'num span-2'], ['.', 'num'], ['=', 'eq']
];

function buildKeys() {
  keys.forEach(([label, kind]) => {
    const btn = document.createElement('button');
    btn.className = `key ${kind.includes('span-2') ? 'span-2' : ''}`.trim();
    btn.dataset.kind = kind.includes('eq') ? 'eq' : (kind.includes('op') ? 'op' : 'num');
    btn.textContent = label;
    btn.addEventListener('pointerdown', (e) => {
      btn.classList.add('pressed');
      onKey(label, e);
    });
    btn.addEventListener('pointerup', () => btn.classList.remove('pressed'));
    btn.addEventListener('pointerleave', () => btn.classList.remove('pressed'));
    keypad.appendChild(btn);
  });
}

function normalize(expr) {
  return expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
}

function compute(expr) {
  try {
    const result = Function(`"use strict";return (${normalize(expr)})`)();
    if (!Number.isFinite(result)) return 'Error';
    return Number(result.toFixed(8)).toString();
  } catch {
    return 'Error';
  }
}

function onKey(label, event) {
  if (label === 'C') {
    expression = '0';
    render();
    showContextAlert('Cleared', event.clientX, event.clientY);
    return;
  }

  if (label === '=') {
    const result = compute(expression);
    historyList.insertAdjacentHTML('afterbegin', `<li>${expression} = ${result}</li>`);
    expression = result;
    render();
    return;
  }

  if (label === '±') {
    expression = expression.startsWith('-') ? expression.slice(1) : `-${expression}`;
    render();
    return;
  }

  if (label === '%') {
    expression = (Number(compute(expression)) / 100).toString();
    render();
    return;
  }

  expression = expression === '0' ? label : expression + label;
  render();
}

function render() {
  equation.textContent = expression;
  display.textContent = compute(expression === '' ? '0' : expression);
}

function showContextAlert(text, x, y) {
  contextAlert.textContent = text;
  contextAlert.style.left = `${x}px`;
  contextAlert.style.top = `${y}px`;
  contextAlert.classList.add('show');
  clearTimeout(showContextAlert.tid);
  showContextAlert.tid = setTimeout(() => contextAlert.classList.remove('show'), 760);
}

function initThemeSwitching() {
  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelector('.chip.active')?.classList.remove('active');
      chip.classList.add('active');
      root.dataset.theme = chip.dataset.theme;
    });
  });
}

function initLighting() {
  document.addEventListener('pointermove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    root.style.setProperty('--mx', `${x}%`);
    root.style.setProperty('--my', `${y}%`);
  });
}

function initScrollEffects() {
  historyCard.addEventListener('scroll', () => {
    const y = historyCard.scrollTop;
    tabbar.classList.toggle('shrink', y > lastY + 4);
    if (y < lastY - 4) tabbar.classList.remove('shrink');
    lastY = y;
  });
}

buildKeys();
initThemeSwitching();
initLighting();
initScrollEffects();
render();
