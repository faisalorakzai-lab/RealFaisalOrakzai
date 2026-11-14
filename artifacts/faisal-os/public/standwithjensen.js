const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('#primary-nav');menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav?.classList.toggle('is-open',open)});nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Open navigation');nav.classList.remove('is-open')}));
const form=document.querySelector('#signature-form');const status=document.querySelector('#form-status');const button=form?.querySelector('button[type="submit"]');form?.addEventListener('submit',async(event)=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);if(String(data.get('website')||'').trim()){status.textContent='Submission could not be accepted.';status.dataset.state='error';return}if(!data.get('consent')){status.textContent='Please confirm the submission and publication terms.';status.dataset.state='error';return}const payload={name:String(data.get('name')||'').trim(),country:String(data.get('country')||'').trim(),role:String(data.get('role')||'').trim(),message:String(data.get('message')||'').trim(),consent:true,website:''};if(payload.name.length<2||payload.country.length<2||payload.role.length<2||payload.name.length>80||payload.country.length>80||payload.role.length>100||payload.message.length>500){status.textContent='Please check the required fields and character limits.';status.dataset.state='error';return}button.disabled=true;status.textContent='Sending securely…';status.dataset.state='';try{const response=await fetch('/api/standwithjensen',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),credentials:'same-origin'});const result=await response.json().catch(()=>({}));if(!response.ok)throw new Error(result.error||'The campaign submission service is not available yet. Please try again later.');form.reset();status.textContent='Thank you. Your message was received and will be reviewed before publication.';status.dataset.state='success';}catch(error){status.textContent=error.message||'The campaign submission service is temporarily unavailable. No support count has been added.';status.dataset.state='error'}finally{button.disabled=false}});
document.querySelector('[data-copy-link]')?.addEventListener('click',async(event)=>{event.preventDefault();try{await navigator.clipboard.writeText(location.href);const status=document.querySelector('#form-status');if(status){status.textContent='Story link copied to clipboard.';status.dataset.state='success'}}catch{location.href='mailto:?subject='+encodeURIComponent('Stand for innovation')+'&body='+encodeURIComponent(location.href)}});

// Editorial story cards: tap/click to reveal the illustrative human scenario.
document.querySelectorAll('.story-card').forEach((card) => {
  card.addEventListener('click', () => {
    const expanded = card.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.story-card[aria-expanded="true"]').forEach((openCard) => {
      if (openCard !== card) openCard.setAttribute('aria-expanded', 'false');
    });
    card.setAttribute('aria-expanded', String(!expanded));
  });
});

// Keep the gentle chapter reveal while respecting reduced-motion preferences.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((section) => revealObserver.observe(section));
}
