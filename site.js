const menuButton=document.getElementById('menuButton');
const mainNav=document.getElementById('mainNav');

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

menuButton?.addEventListener('click',()=>{
  mainNav?.classList.contains('open')?closeMenu():openMenu();
});

mainNav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
addEventListener('resize',()=>{if(innerWidth>900)closeMenu()});
addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});

document.addEventListener('click',event=>{
  if(!mainNav?.classList.contains('open'))return;
  if(mainNav.contains(event.target)||menuButton?.contains(event.target))return;
  closeMenu();
});

// Korrigiert ältere Impressums-Links aus der Übergangsphase der Website.
document.querySelectorAll('a[href="/#impressum"]').forEach(link=>link.setAttribute('href','/impressum/'));

// Favicon zentral einbinden, ohne jede Unterseite separat pflegen zu müssen.
if(!document.querySelector('link[rel="icon"]')){
  const icon=document.createElement('link');
  icon.rel='icon';
  icon.type='image/svg+xml';
  icon.href='/assets/favicon.svg';
  document.head.appendChild(icon);
}

// Kontaktformulare: Rückkehr auf die eigene Website, Bot-Falle und klare Rückmeldung.
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
