// Three simulated, bounded nightmare levels. No system dialogs or external navigation.
window.LevelModules = window.LevelModules || {};
(() => {
 const label=(tr,en)=>(window.currentLanguage||'tr')==='tr'?tr:en;
 const shell='width:min(100%,600px);background:#fff;color:#202124;border:1px solid #dadce0;border-radius:9px;padding:24px;font-family:Arial,sans-serif;box-shadow:0 16px 45px #0003';
 const btn='border:1px solid #dadce0;background:#f8fafc;color:#202124;cursor:pointer;border-radius:7px;padding:13px;min-height:48px;text-align:left';
 function add(id, trName, enName, builder){
  window.LevelModules[id]={
   id,url:'https://nightmare.invalid/'+id,tabTitle:l=>l==='tr'?trName:enName,
   root:null,listener:null,timers:[],
   cleanup(){this.timers.forEach(clearTimeout);this.timers=[];if(this.root&&this.listener)this.root.removeEventListener('click',this.listener);this.root=null;this.listener=null;},
   render(container,complete,error){
    this.cleanup();container.innerHTML='<div style="flex:1;min-height:0;overflow:auto;display:flex;justify-content:center;align-items:center;padding:14px;background:#e5e7eb"></div>';
    const root=container.firstElementChild;this.root=root;
    const delay=(fn,ms)=>{const id=setTimeout(()=>{this.timers=this.timers.filter(t=>t!==id);if(this.root===root&&root.isConnected)fn();},ms);this.timers.push(id);};
    const on=fn=>{this.listener=fn;root.addEventListener('click',fn);};
    builder(root,complete,error,delay,on);
   }
  };
 }
 add('subscription_escape','Abonelik İptal Kabusu','Subscription Cancellation Nightmare',(root,done,error,delay,on)=>{
  let step=0,finished=false;const total=12;
  const draw=()=>{
   const safe=(step*5+1)%4;
   const traps=[label('Üyeliğimi koru','Keep my plan'),label('İndirim teklifini kabul et','Accept discount'),label('Bir ay ücretsiz devam et','Continue free for a month')];
   const buttons=Array.from({length:4},(_,i)=>'<button data-choice="'+i+'" style="'+btn+'">'+(i===safe?label('Hayır, iptale devam et','No thanks, continue cancelling'):traps[i<safe?i:i-1])+'</button>').join('');
   root.innerHTML='<section style="'+shell+'"><div style="color:#5f6368;font-size:12px">'+label('Hesap ve Faturalandırma','Account & Billing')+'</div><h2 style="margin:12px 0">'+label('Gitmenize üzüldük','We are sorry to see you go')+'</h2><p style="margin:12px 0;color:#5f6368">'+label('12 teklifi reddederek aboneliği iptal et.','Decline 12 retention offers to cancel.')+' '+step+'/'+total+'</p><div style="display:grid;gap:9px">'+buttons+'</div></section>';
  };
  on(e=>{const b=e.target.closest('[data-choice]');if(!b||finished)return;if(Number(b.dataset.choice)!==(step*5+1)%4){error();b.disabled=true;return;}if(++step===total){finished=true;root.innerHTML='<h2>'+label('ABONELİK İPTAL EDİLDİ','SUBSCRIPTION CANCELLED')+'</h2>';delay(done,350);}else draw();});draw();
 });
 add('overlay_stack','Reklam Katmanı Kabusu','Ad Overlay Stack',(root,done,error,delay,on)=>{
  let remaining=20,finished=false;
  const draw=()=>{
   const safe=(remaining*7+2)%4;
   let options=Array.from({length:4},(_,i)=>'<button data-choice="'+i+'" style="'+btn+'">'+(i===safe?label('Bu katmanı kapat ✕','Dismiss this layer ✕'):[label('Ödülü talep et','Claim reward'),label('Kabul et','Accept'),label('Bildirimi aç','Enable notifications')][i<safe?i:i-1])+'</button>').join('');
   root.innerHTML='<section style="'+shell+'"><div style="border-bottom:1px solid #dadce0;padding-bottom:13px;color:#5f6368">AD OVERLAY '+(21-remaining)+'/20</div><h2 style="margin:15px 0">'+label('İçeriği görmek için pencereyi kapat','Dismiss overlay to view content')+'</h2><div style="background:#f1f3f4;padding:22px;border-radius:6px;margin-bottom:15px">'+label('Kalan katman: ','Remaining layers: ')+remaining+'</div><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px">'+options+'</div></section>';
  };
  on(e=>{const b=e.target.closest('[data-choice]');if(!b||finished)return;if(Number(b.dataset.choice)!==(remaining*7+2)%4){error();b.disabled=true;return;}if(--remaining===0){finished=true;root.innerHTML='<h2>'+label('İÇERİK AÇILDI','CONTENT UNLOCKED')+'</h2>';delay(done,350);}else draw();});draw();
 });
 add('verification_codes','Doğrulama Kodu Labirenti','Verification Code Maze',(root,done,error,delay,on)=>{
  let round=0,finished=false;const total=10;
  const expected=()=>String(100000+((round*7919+45281)%900000));
  const draw=()=>{
   const code=expected();const correct=(round*3+2)%4;
   const options=Array.from({length:4},(_,i)=>{
    const offset=i<correct?i+1:i;const decoy=String(100000+(Number(code)+offset*123)%900000);
    return '<button data-code="'+i+'" style="'+btn+';text-align:center;font-family:monospace;font-size:18px">'+(i===correct?code:decoy)+'</button>';
   }).join('');
   root.innerHTML='<section style="'+shell+'"><div style="color:#1a73e8;font-weight:700">'+label('Hesabınızı doğrulayın','Verify your account')+'</div><p style="color:#5f6368;margin:15px 0">'+label('10 doğrulama kodunu eşleştir.','Match 10 verification codes.')+' '+(round+1)+'/'+total+'</p><div style="padding:16px;background:#f1f3f4;letter-spacing:4px;font:700 25px monospace;text-align:center;border-radius:6px">'+code+'</div><p style="margin:14px 0">'+label('Yukarıdaki kodu seçin:','Select the code above:')+'</p><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px">'+options+'</div></section>';
  };
  on(e=>{const b=e.target.closest('[data-code]');if(!b||finished)return;if(Number(b.dataset.code)!==(round*3+2)%4){error();b.disabled=true;return;}if(++round===total){finished=true;root.innerHTML='<h2>'+label('DOĞRULAMA TAMAMLANDI','VERIFICATION COMPLETE')+'</h2>';delay(done,350);}else draw();});draw();
 });
})();