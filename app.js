const tabs = [...document.querySelectorAll('[data-open]')];
const pages = [...document.querySelectorAll('[data-page]')];
const railTabs = [...document.querySelectorAll('.tab')];
const fileCode = document.getElementById('fileCode');
const pageCodes = { index:'00—INDEX', work:'01—WORK', lab:'02—LAB', space:'03—SPACE', people:'04—PEOPLE' };

function openPage(name, {updateHash=true} = {}) {
  if (!pageCodes[name]) return;
  pages.forEach(page => page.classList.toggle('active', page.dataset.page === name));
  railTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.open === name));
  fileCode.textContent = pageCodes[name];
  if (updateHash) history.replaceState(null, '', name === 'index' ? location.pathname : `#${name}`);
  document.querySelector('.folder').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
}

tabs.forEach(el => el.addEventListener('click', event => {
  if (el.tagName === 'A') return;
  event.preventDefault();
  openPage(el.dataset.open);
}));

const initial = location.hash.slice(1);
if (pageCodes[initial]) openPage(initial, {updateHash:false});

document.addEventListener('keydown', event => {
  if (/^[0-4]$/.test(event.key) && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
    openPage(['index','work','lab','space','people'][Number(event.key)]);
  }
});

document.getElementById('year').textContent = new Date().getFullYear();

// Cursor: quiet enough to disappear when you stop noticing it.
const cursor = document.getElementById('cursorDot');
if (matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hot'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hot'));
  });
}

// Release simulator: one healthy path, one "this is why we have logs" path.
const deployButton = document.getElementById('deployButton');
const releaseConsole = document.getElementById('releaseConsole');
let releaseRun = 0;
const healthy = [
  '$ deploy --target prod',
  '> preflight checks ............ PASS',
  '> database change ............. APPLIED',
  '> application deployment ...... HEALTHY',
  '> sanity tests ................ PASS',
  '> release confirmed in 00:22:14',
  '',
  '✓ go get coffee'
];
const spicy = [
  '$ deploy --target prod',
  '> preflight checks ............ PASS',
  '> application deployment ...... 404',
  '> comparing known-good UAT ...',
  '> config drift: datasource/JNDI',
  '> correcting configuration ...',
  '> sanity tests ................ PASS',
  '',
  '✓ evidence > guessing'
];
async function typeConsole(lines) {
  releaseConsole.textContent = '';
  deployButton.disabled = true;
  for (const line of lines) {
    releaseConsole.textContent += `${line}\n`;
    await new Promise(r => setTimeout(r, 115));
  }
  deployButton.disabled = false;
}
deployButton.addEventListener('click', () => {
  releaseRun += 1;
  typeConsole(releaseRun % 2 ? healthy : spicy);
});

// CleanListen demo.
const cleanToggle = document.getElementById('cleanToggle');
const paperPage = document.getElementById('paperPage');
const paperDemo = document.querySelector('.paper-demo');
const demoStatus = document.getElementById('demoStatus');
cleanToggle.addEventListener('click', () => {
  const pressed = cleanToggle.getAttribute('aria-pressed') === 'true';
  cleanToggle.setAttribute('aria-pressed', String(!pressed));
  paperPage.classList.toggle('cleaned', !pressed);
  paperDemo.classList.toggle('cleaned', !pressed);
  demoStatus.innerHTML = !pressed
    ? '<span>CLEAN OUTPUT</span><b>4 content lines · 3 artifacts removed</b>'
    : '<span>RAW PDF</span><b>4 content lines · 3 noise artifacts</b>';
});

// Cat easter egg.
const cat = document.getElementById('cat');
const toast = document.getElementById('toast');
let catPokes = 0;
function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}
cat.addEventListener('click', () => {
  catPokes += 1;
  const messages = ['meow.exe started', 'production cat says: have you checked the logs?', 'stop poking the incident commander', 'fine. you found the easter egg. 🐈'];
  showToast(messages[Math.min(catPokes - 1, messages.length - 1)]);
  if (catPokes >= 4) document.documentElement.style.setProperty('--folder', '#c89cb8');
});

// Desk lamp.
const themeButton = document.getElementById('themeButton');
themeButton.addEventListener('click', () => {
  const off = document.body.classList.toggle('lamp-off');
  themeButton.innerHTML = `desk lamp: <b>${off ? 'off' : 'on'}</b>`;
});
