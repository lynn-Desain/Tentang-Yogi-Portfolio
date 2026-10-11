(function(){
  const root=document.documentElement;
  const themeToggle=document.getElementById('themeToggle');
  const menuToggle=document.getElementById('menuToggle');
  const mobileMenu=document.getElementById('mobileMenu');
  const year=document.getElementById('year');
  const saved=localStorage.getItem('theme');
  if(saved==='dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) root.classList.add('dark');
  function updateThemeLabel(){ if(themeToggle) themeToggle.setAttribute('aria-label', root.classList.contains('dark')?'Aktifkan mode terang':'Aktifkan mode gelap'); }
  updateThemeLabel();
  if(themeToggle){themeToggle.addEventListener('click',()=>{root.classList.toggle('dark');localStorage.setItem('theme',root.classList.contains('dark')?'dark':'light');updateThemeLabel();});}
  if(menuToggle){menuToggle.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});}
  if(mobileMenu){mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false')}));}
  if(year) year.textContent=new Date().getFullYear();
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const form=document.getElementById('contactForm'), success=document.getElementById('formSuccess');
  if(form){form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('name').value.trim();
    const email=document.getElementById('email').value.trim();
    const topic=document.getElementById('topic').value;
    const message=document.getElementById('message').value.trim();
    if(!name||!email||!message){success.textContent='Lengkapi nama, email, dan pesan terlebih dahulu.';return;}
    const subject=encodeURIComponent(`[Website] ${topic} — ${name}`);
    const body=encodeURIComponent(`Halo Yogi,\n\nNama: ${name}\nEmail: ${email}\nTopik: ${topic}\n\nPesan:\n${message}`);
    success.textContent='Membuka aplikasi email…';
    window.location.href=`mailto:Fluxylynn@gmail.com?subject=${subject}&body=${body}`;
  });}

  const modal=document.getElementById('cardModal'), openCard=document.getElementById('openCard'), closeCard=document.getElementById('closeCard');
  function setModal(open){if(!modal)return;modal.classList.toggle('open',open);modal.setAttribute('aria-hidden',String(!open));document.body.style.overflow=open?'hidden':'';}
  openCard?.addEventListener('click',()=>setModal(true)); closeCard?.addEventListener('click',()=>setModal(false)); modal?.querySelector('[data-close]')?.addEventListener('click',()=>setModal(false)); document.addEventListener('keydown',e=>{if(e.key==='Escape')setModal(false)});
})();
