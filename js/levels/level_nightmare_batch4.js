// Nightmare parody levels. All forms and actions are local simulations.
window.LevelModules=window.LevelModules||{};
(()=>{
 const t=(tr,en)=>(window.currentLanguage||'tr')==='tr'?tr:en;
 const panel='width:min(100%,570px);padding:22px;background:white;color:#202124;border:1px solid #dadce0;border-radius:9px;box-shadow:0 15px 40px #0003;font-family:Arial,sans-serif';
 function add(id,tr,en,rounds,title,description,correctText,decoys){
  window.LevelModules[id]={
   id,url:'https://game-gate.invalid/'+id,tabTitle:l=>l==='tr'?tr:en,
   root:null,handler:null,timeout:null,
   cleanup(){if(this.timeout!==null)clearTimeout(this.timeout);this.timeout=null;if(this.root&&this.handler)this.root.removeEventListener('click',this.handler);this.root=null;this.handler=null;},
   render(container,complete,error){
    this.cleanup();let step=0,finished=false;const self=this;
    container.innerHTML='<div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center;overflow:auto;background:#e5e7eb;padding:15px"></div>';
    const root=container.firstElementChild;this.root=root;
    const draw=()=>{
     const safe=(step*7+2)%4;
     const opts=Array.from({length:4},(_,i)=>{
      const good=i===safe;
      const label=good?correctText():decoys[(i<safe?i:i-1)%decoys.length]();
      return '<button type="button" data-option="'+i+'" style="text-align:left;min-height:50px;background:'+(good?'#e8f0fe':'#f8fafc')+';color:#202124;border:1px solid #dadce0;border-radius:7px;cursor:pointer;padding:12px">'+label+'</button>';
     }).join('');
     root.innerHTML='<section style="'+panel+'"><small style="color:#5f6368">GAME SIMULATION · '+(step+1)+' / '+rounds+'</small><h2 style="margin:14px 0">'+title()+'</h2><p style="color:#5f6368;line-height:1.5;margin-bottom:18px">'+description()+'</p><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px">'+opts+'</div></section>';
    };
    this.handler=e=>{
     const button=e.target.closest('button[data-option]');if(!button||finished)return;
     if(Number(button.dataset.option)!==(step*7+2)%4){error();button.disabled=true;button.style.opacity='.4';return;}
     step++;if(step===rounds){finished=true;root.innerHTML='<section style="'+panel+'"><h2>✓ '+t('TAMAMLANDI','COMPLETED')+'</h2></section>';self.timeout=setTimeout(()=>{self.timeout=null;if(self.root===root&&root.isConnected)complete();},350);}else draw();
    };
    root.addEventListener('click',this.handler);draw();
   }
  };
 }
 add('checkout_trap','Sahte Ödeme Duvarı','Fake Checkout Wall',10,
 ()=>t('Ödeme adımını atla','Skip payment step'),
 ()=>t('Hiçbir kart bilgisi girme. 10 sahte satın alma teklifinde ücretsiz devam etme yolunu bul.','Do not enter payment details. Find the free route through 10 checkout offers.'),
 ()=>t('Ücretsiz devam et','Continue for free'),
 [()=>t('Kart ekle','Add card'),()=>t('Premium satın al','Buy premium'),()=>t('Teklifi etkinleştir','Activate offer')]);
 add('upload_errors','Dosya Yükleme Hataları','Upload Error Maze',12,
 ()=>t('Dosya gönderilemedi','Upload failed'),
 ()=>t('Yükleme yapmadan 12 hata penceresinden güvenli şekilde çık.','Dismiss 12 fake upload errors without uploading any file.'),
 ()=>t('Dosya göndermeden kapat','Dismiss without uploading'),
 [()=>t('Dosya seç','Choose file'),()=>t('İzinleri aç','Grant access'),()=>t('Buluta bağlan','Connect cloud')]);
 add('survey_escape','Bitmeyen Anket','Endless Survey Escape',15,
 ()=>t('Kısa bir anketimiz var!','Just a quick survey!'),
 ()=>t('15 anket ekranında atlama bağlantısını bul. Yanlış seçenekler zaman kaybettirir.','Find the skip link through 15 survey screens. Wrong options cost attempts.'),
 ()=>t('Anketi geç','Skip survey'),
 [()=>t('Çok memnunum','Very satisfied'),()=>t('Teklifleri göster','Show offers'),()=>t('Yanıt gönder','Submit answer')]);
})();