// Nightmare browser parody challenges, no real navigation, dialogs or downloads.
window.LevelModules = window.LevelModules || {};
(function () {
  const tr = () => (window.currentLanguage || 'tr') === 'tr';
  const lang = (a,b) => tr()?a:b;
  const base = 'background:#fff;color:#202124;border:1px solid #dadce0;border-radius:8px;padding:22px;width:min(100%,570px);box-shadow:0 16px 42px #0003;font-family:Arial,sans-serif';
  function register(id, url, trName, enName, play) {
    window.LevelModules[id] = {
      id, url, tabTitle: l => l === 'tr' ? trName : enName,
      root:null, handler:null, timers:[],
      cleanup() {
        this.timers.forEach(clearTimeout);this.timers=[];
        if(this.root && this.handler)this.root.removeEventListener('click',this.handler);
        this.root=null;this.handler=null;
      },
      render(container, complete, error) {
        this.cleanup();
        container.innerHTML='<div style="flex:1;min-height:0;overflow:auto;display:flex;align-items:center;justify-content:center;padding:16px;background:#e5e7eb"></div>';
        const root=container.firstElementChild;this.root=root;
        const later=(fn,ms)=>{const timer=setTimeout(()=>{this.timers=this.timers.filter(t=>t!==timer);if(this.root===root&&root.isConnected)fn();},ms);this.timers.push(timer);};
        const listen=fn=>{this.handler=fn;root.addEventListener('click',fn);};
        play(root,complete,error,later,listen);
      }
    };
  }
  register('download_manager','https://downloads.invalid/manager','İndirme Yöneticisi Kabusu','Download Manager Nightmare',(root,done,error,later,listen)=>{
    let step=0,ended=false;
    const render=()=>{
      const actual=(step*7+3)%5;
      const choices=Array.from({length:5},(_,i)=>'<button data-choice="'+i+'" style="text-align:left;cursor:pointer;padding:13px;border:1px solid #dadce0;border-radius:6px;background:'+(i===actual?'#e8f0fe':'#f8fafc')+';color:#202124">'+(i===actual?lang('Doğrudan indirme • reklamsız','Direct download • no ads'):[lang('Turbo kurucu','Turbo installer'),lang('İndirme hızlandırıcı','Download accelerator'),lang('Ücretsiz ödül','Free prize'),lang('Sponsorlu bağlantı','Sponsored link')][i<actual?i:i-1])+'</button>').join('');
      root.innerHTML='<section style="'+base+'"><h2>↓ '+lang('Dosyanız hazır','Your download is ready')+'</h2><p style="margin:14px 0;color:#5f6368">'+lang('Sponsorlu butonlardan kaç ve 10 doğrulama sayfasını geç.','Avoid sponsored buttons and clear 10 confirmation pages.')+'</p><p style="margin:12px 0">'+(step+1)+'/10</p><div style="display:grid;gap:9px">'+choices+'</div></section>';
    };
    listen(e=>{const b=e.target.closest('[data-choice]');if(!b||ended)return;const actual=(step*7+3)%5;if(Number(b.dataset.choice)!==actual){error();b.disabled=true;return;}step++;if(step===10){ended=true;root.innerHTML='<h2 style="color:#14532d">'+lang('İNDİRME ENGELLERİ AŞILDI','DOWNLOAD GATES CLEARED')+'</h2>';later(done,350);}else render();});render();
  });
  register('redirect_chain','https://redirect.invalid/verify','Yönlendirme Zinciri','Redirect Chain Nightmare',(root,done,error,later,listen)=>{
    let page=0,ended=false;
    const render=()=>{
      const safe=(page*3+1)%4;
      const opts=Array.from({length:4},(_,i)=>'<button data-option="'+i+'" style="padding:13px;cursor:pointer;color:#202124;background:#f8fafc;border:1px solid #dadce0;border-radius:6px">'+(i===safe?lang('Orijinal hedefe devam et ↗','Continue to original destination ↗'):[lang('Yeni reklama git','Visit another ad'),lang('Ödül kazan','Claim reward'),lang('İzinleri aç','Enable permissions')][i<safe?i:i-1])+'</button>').join('');
      root.innerHTML='<section style="'+base+'"><div style="font:13px monospace;background:#f1f3f4;padding:11px;border-radius:6px;overflow-wrap:anywhere">https://redirect-'+(page+1)+'.invalid/check</div><h2 style="margin:20px 0 8px">'+lang('Bağlantı kontrol ediliyor…','Checking your link…')+'</h2><p style="color:#5f6368;margin-bottom:18px">'+lang('15 yönlendirmede doğru hedefi bul.','Find the correct destination through 15 redirects.')+' '+page+'/15</p><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px">'+opts+'</div></section>';
    };
    listen(e=>{const b=e.target.closest('[data-option]');if(!b||ended)return;if(Number(b.dataset.option)!==(page*3+1)%4){error();b.disabled=true;return;}page++;if(page===15){ended=true;root.innerHTML='<h2 style="color:#14532d">'+lang('DOĞRU BAĞLANTIYA ULAŞTIN','DESTINATION REACHED')+'</h2>';later(done,350);}else render();});render();
  });
  register('support_bot','https://help.invalid/chat','Destek Botu Labirenti','Support Bot Maze',(root,done,error,later,listen)=>{
    let stage=0,ended=false;
    const answers=()=>[lang('İnsan temsilciye bağlan','Connect to a human'),lang('Sorunu yeniden başlat','Restart troubleshooting'),lang('Önerilen reklamları aç','Enable suggested ads')];
    const render=()=>{
      const safe=(stage+1)%3,arr=answers();
      root.innerHTML='<section style="'+base+'"><div style="background:#1a73e8;color:white;padding:14px;border-radius:7px 7px 0 0;font-weight:700">'+lang('Canlı Destek Merkezi','Live Support Center')+' ●</div><div style="margin:20px 0;background:#f1f3f4;border-radius:11px;padding:18px;line-height:1.5">'+lang('Merhaba! Sorununuzu çözmek için lütfen aşağıdaki seçeneklerden birini seçin.','Hello! Choose an option below so I can resolve your issue.')+' ('+(stage+1)+'/10)</div><div style="display:grid;gap:9px">'+[0,1,2].map((i)=>'<button data-ans="'+i+'" style="padding:13px;background:#e8f0fe;color:#174ea6;border:1px solid #d2e3fc;border-radius:18px;cursor:pointer;text-align:left">'+(i===safe?arr[0]:arr[i<safe?i+1:i])+'</button>').join('')+'</div></section>';
    };
    listen(e=>{const b=e.target.closest('[data-ans]');if(!b||ended)return;if(Number(b.dataset.ans)!==(stage+1)%3){error();b.disabled=true;return;}stage++;if(stage===10){ended=true;root.innerHTML='<h2 style="color:#14532d">'+lang('TEMSiLCiYE ULAŞTIN','AGENT CONNECTED')+'</h2>';later(done,350);}else render();});render();
  });
})();
