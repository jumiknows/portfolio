const tabs = [...document.querySelectorAll('.folder-tab')];
const sheets = [...document.querySelectorAll('.sheet')];
const shell = document.getElementById('folderShell');

function openSheet(name) {
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.view === name));
  sheets.forEach(sheet => sheet.classList.toggle('active', sheet.dataset.sheet === name));
  shell.dataset.open = name;
  history.replaceState(null, '', name === 'cover' ? location.pathname : `#${name}`);
}

tabs.forEach(tab => tab.addEventListener('click', () => openSheet(tab.dataset.view)));

const hash = location.hash.replace('#','');
if (hash && tabs.some(tab => tab.dataset.view === hash)) openSheet(hash);

const clock = document.getElementById('clock');
function updateClock(){
  clock.textContent = new Intl.DateTimeFormat('en-CA',{hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());
}
updateClock(); setInterval(updateClock, 30000);
document.getElementById('year').textContent = new Date().getFullYear();

const cat = document.getElementById('catPeek');
let catCount = 0;
cat.addEventListener('click', () => {
  catCount += 1;
  const messages = ['ᵔᴗᵔ','meow.exe','stop poking me','okay fine: 🐈'];
  cat.textContent = messages[Math.min(catCount - 1, messages.length - 1)];
  if (catCount >= 4) document.body.style.setProperty('--folder','#c9a0cb');
});

const dialog = document.getElementById('cleanlistenDialog');
document.querySelector('[data-modal="cleanlisten"]').addEventListener('click', () => dialog.showModal());
document.getElementById('dialogClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

document.addEventListener('keydown', e => {
  const keyMap = {'1':'cover','2':'work','3':'builds','4':'space','5':'people','6':'misc'};
  if (keyMap[e.key] && !dialog.open) openSheet(keyMap[e.key]);
});
