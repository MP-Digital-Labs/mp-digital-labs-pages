const modernStyle=document.createElement('link');
modernStyle.rel='stylesheet';
modernStyle.href='/site-modern.css';
document.head.appendChild(modernStyle);

const menuButton=document.getElementById('menuButton');
const mainNav=document.getElementById('mainNav');

function isPath(prefix){return location.pathname===prefix||location.pathname.startsWith(prefix.endsWith('/')?prefix:`${prefix}/`)}

const icons={
  home:'<svg viewBox="0 0 24 24"><path d="M4 10.5 12 4l8 6.5v8.2a1.3 1.3 0 0 1-1.3 1.3H5.3A1.3 1.3 0 0 1 4 18.7z"/><path d="M9 20v-6h6v6"/></svg>',
  apps:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg>',
  service:'<svg viewBox="0 0 24 24"><path d="M12 3a7 7 0 0 0-7 7v2a3 3 0 0 0 3 3h1v-5H5"/><path d="M12 3a7 7 0 0 1 7 7v2a3 3 0 0 1-3 3h-1v-5h4"/><path d="M15 18c-.8 1.2-1.8 2-3.5 2H10"/></svg>',
  legal:'<svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5"/><path d="M10 12h5M10 16h5"/></svg>',
  dot:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/></svg>'
};
function label(icon,text){return `<span class="nav-label"><span class="nav-symbol">${icons[icon]||icons.dot}</span><span>${text}</span></span>`}

function buildExplorerNav(){
  if(!mainNav)return;
  const onHome=location.pathname==='/';
  const onApps=isPath('/apps');
  const onSupport=isPath('/support');
  const onPrivacy=location.pathname.includes('datenschutz');
  const onImprint=isPath('/impressum');
  mainNav.innerHTML=`
    <div class="nav-caption">Bereiche</div>
    <a href="/" class="${onHome?'is-active':''}">${label('home','Start')}</a>
    <details class="nav-folder" ${onApps||onHome?'open':''}>
      <summary>${label('apps','Apps')}</summary>
      <div class="nav-children">
        <a class="nav-child ${location.pathname==='/apps/'?'is-active':''}" href="/apps/">Alle Apps</a>
        <a class="nav-child ${isPath('/apps/baurechner-de')?'is-active':''}" href="/apps/baurechner-de/">BauRechner DE</a>
        <a class="nav-child ${isPath('/apps/verbrauchsmonitor-de')?'is-active':''}" href="/apps/verbrauchsmonitor-de/">VerbrauchsMonitor DE</a>
      </div>
    </details>
    <details class="nav-folder" ${onSupport?'open':''}>
      <summary>${label('service','Service')}</summary>
      <div class="nav-children">
        <a class="nav-child ${onSupport?'is-active':''}" href="/support/">Support</a>
        <a class="nav-child" href="/#kontakt">Kontakt</a>
      </div>
    </details>
    <details class="nav-folder" ${onPrivacy||onImprint?'open':''}>
      <summary>${label('legal','Rechtliches')}</summary>
      <div class="nav-children">
        <a class="nav-child ${location.pathname==='/datenschutz.html'?'is-active':''}" href="/datenschutz.html">Website-Datenschutz</a>
        <a class="nav-child ${location.pathname==='/datenschutz-baurechner.html'?'is-active':''}" href="/datenschutz-baurechner.html">Datenschutz BauRechner</a>
        <a class="nav-child ${location.pathname==='/datenschutz-verbrauchsmonitor.html'?'is-active':''}" href="/datenschutz-verbrauchsmonitor.html">Datenschutz VerbrauchsMonitor</a>
        <a class="nav-child ${onImprint?'is-active':''}" href="/impressum/">Impressum</a>
      </div>
    </details>
  `;
}

buildExplorerNav();

function closeMenu(){
  mainNav?.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded','false');
  menuButton?.setAttribute('aria-label','Menü öffnen');
}

function openMenu(){
  mainNav?.classList.add('open');
  document.body.classList.add('menu-open');
  menuButton?.setAttribute('aria-expanded','true');
  menuButton?.setAttribute('aria-label','Menü schließen');
}

menuButton?.addEventListener('click',()=>{mainNav?.classList.contains('open')?closeMenu():openMenu()});
mainNav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
addEventListener('resize',()=>{if(innerWidth>900)closeMenu()});
addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});

document.addEventListener('click',event=>{
  if(!mainNav?.classList.contains('open'))return;
  if(mainNav.contains(event.target)||menuButton?.contains(event.target))return;
  closeMenu();
});

document.querySelectorAll('a[href="/#impressum"]').forEach(link=>link.setAttribute('href','/impressum/'));

if(!document.querySelector('link[rel="icon"]')){
  const icon=document.createElement('link');
  icon.rel='icon';
  icon.type='image/svg+xml';
  icon.href='/assets/favicon.svg';
  document.head.appendChild(icon);
}

document.querySelectorAll('form[action^="https://formsubmit.co/"]').forEach(form=>{
  if(!form.querySelector('input[name="_next"]')){
    const next=document.createElement('input');
    next.type='hidden';
    next.name='_next';
    next.value=`${location.origin}${location.pathname}?sent=1${location.hash}`;
    form.appendChild(next);
  }

  if(!form.querySelector('input[name="_honey"]')){
    const honey=document.createElement('input');
    honey.type='text';
    honey.name='_honey';
    honey.tabIndex=-1;
    honey.autocomplete='off';
    honey.className='form-honeypot';
    honey.setAttribute('aria-hidden','true');
    form.appendChild(honey);
  }

  form.addEventListener('submit',()=>{
    const button=form.querySelector('button[type="submit"]');
    if(button){
      button.disabled=true;
      button.setAttribute('aria-busy','true');
      button.textContent='Wird gesendet …';
    }
  });
});

if(new URLSearchParams(location.search).get('sent')==='1'){
  const form=document.querySelector('form[action^="https://formsubmit.co/"]');
  if(form){
    const message=document.createElement('div');
    message.className='form-success';
    message.setAttribute('role','status');
    message.textContent='Danke. Deine Nachricht wurde gesendet.';
    form.prepend(message);
  }
}
