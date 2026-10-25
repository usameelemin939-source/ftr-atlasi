(() => {
  "use strict";
  const data = window.FTR_SKELETON;
  const search = document.querySelector("#bone-search");
  const filterRoot = document.querySelector("#bone-filters");
  const grid = document.querySelector("#bone-list");
  const count = document.querySelector("#bone-count");
  const empty = document.querySelector("#bone-empty");
  const labelByRegion = {
    skull:"Kafatası ve yüz", ear:"Kulak kemikçikleri", axial:"Hyoid",
    spine:"Omurga", thorax:"Göğüs kafesi", upper:"Omuz, kol ve el",
    pelvis:"Pelvis", lower:"Bacak ve ayak"
  };
  const filters = [
    ["all","Tüm kemikler"],["skull","Kafatası ve yüz"],["ear","Kulak kemikçikleri"],
    ["axial","Hyoid"],["spine","Omurga"],["thorax","Göğüs kafesi"],
    ["upper","Omuz, kol ve el"],["pelvis","Pelvis"],["lower","Bacak ve ayak"],
    ["appendicular","Appendiküler iskelet"]
  ];
  let active = "all";
  const normalize = (value) => value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ı/g,"i");
  function expand(bone) {
    const match = bone.tr.match(/^(C|T|L)(\d+)–(C|T|L)?(\d+)/);
    if (match && bone.region === "spine") {
      const start = Number(match[2]), end = Number(match[4]), prefix = match[1];
      const series = {C:["cervicalis","boyun omuru"],T:["thoracica","göğüs omuru"],L:["lumbalis","bel omuru"]}[prefix];
      return Array.from({length:end-start+1},(_,i)=>({...bone,tr:(start+i)+". "+series[1],la:"Vertebra "+series[0]+" "+roman(start+i),side:"Orta hat"}));
    }
    const ribs = bone.tr.match(/^(\d+)\.–(\d+)\. kaburgalar$/);
    if (ribs && bone.region === "thorax") {
      const out=[];
      for(let n=Number(ribs[1]);n<=Number(ribs[2]);n++) for(const side of ["Sağ","Sol"]) out.push({...bone,tr:n+". kaburga",la:"Costa "+roman(n),side});
      return out;
    }
    const floating = bone.tr.match(/^(\d+)\.–(\d+)\. yüzen kaburgalar$/);
    if (floating && bone.region === "thorax") {
      const out=[];
      for(let n=Number(floating[1]);n<=Number(floating[2]);n++) for(const side of ["Sağ","Sol"]) out.push({...bone,tr:n+". yüzen kaburga",la:"Costa fluctuans "+roman(n),side});
      return out;
    }
    const phalanx = bone.tr.match(/^(II|I)\.?–?(.+)?/);
    if (bone.count === 8 && /II\.–V\./.test(bone.tr)) {
      const position = bone.tr.includes("proksimal") ? "proksimal" : bone.tr.includes("orta") ? "orta" : "distal";
      const latinPosition = bone.la.includes("proximales") ? "proximalis" : bone.la.includes("mediae") ? "media" : "distalis";
      const foot = bone.la.includes("pedis") ? " pedis" : "";
      const out=[];
      for(const digit of ["II","III","IV","V"]) for(const side of ["Sağ","Sol"]) out.push({...bone,tr:side+" "+digit+". parmak "+position+" falanksı",la:"Phalanx "+latinPosition+" digiti "+digit+foot,side});
      return out;
    }
    if (bone.count === 2) return [
      {...bone,tr:"Sağ "+bone.tr,side:"Sağ"},
      {...bone,tr:"Sol "+bone.tr,side:"Sol"}
    ];
    return [{...bone,side:bone.count>1?"Grup · "+bone.count+" kemik":"Tek kemik"}];
  }
  function roman(number) {
    const values=[[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
    let result="";
    for(const [value,symbol] of values) while(number>=value){result+=symbol;number-=value}
    return result;
  }
  const entries=data.bones.flatMap(expand);
  function renderFilters() {
    filterRoot.replaceChildren();
    for(const [id,label] of filters) {
      const button=document.createElement("button");
      button.type="button";button.dataset.filter=id;button.textContent=label;
      button.setAttribute("aria-pressed",String(active===id));
      button.addEventListener("click",()=>{active=id;render()});
      filterRoot.append(button);
    }
  }
  function matches(bone,q) {
    const haystack=[bone.tr,bone.la,bone.region,...bone.landmarks.flatMap(p=>[p.latin,p.turkish])].join(" ");
    const regionMatch=active==="all"||bone.region===active||(active==="appendicular"&&["upper","pelvis","lower"].includes(bone.region));
    return regionMatch&&(!q||normalize(haystack).includes(q));
  }
  function render() {
    const q=normalize(search.value.trim());
    const shown=entries.filter(b=>matches(b,q));
    grid.replaceChildren();
    const fragment=document.createDocumentFragment();
    for(const bone of shown) {
      const card=document.createElement("article");card.className="bone";
      const top=document.createElement("div");top.className="bone-top";
      const heading=document.createElement("div");
      const title=document.createElement("h2");title.textContent=bone.tr;
      const latin=document.createElement("div");latin.className="latin";latin.lang="la";latin.textContent=bone.la;
      heading.append(title,latin);
      const region=document.createElement("span");region.className="region";region.textContent=labelByRegion[bone.region];
      top.append(heading,region);card.append(top);
      const side=document.createElement("p");side.className="side";side.textContent=bone.side;card.append(side);
      const details=document.createElement("details");
      const summary=document.createElement("summary");summary.textContent="Anatomik parçalar ve işaretler ("+bone.landmarks.length+")";
      const list=document.createElement("ul");
      for(const part of bone.landmarks) {
        const item=document.createElement("li");item.textContent=part.turkish;
        const term=document.createElement("span");term.lang="la";term.textContent=part.latin;
        item.append(term);list.append(item);
      }
      details.append(summary,list);card.append(details);fragment.append(card);
    }
    grid.append(fragment);grid.hidden=shown.length===0;empty.hidden=shown.length!==0;
    grid.setAttribute("aria-busy","false");
    count.textContent=shown.length+" kemik gösteriliyor · 206 erişkin kemiği";
    filterRoot.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.filter===active)));
  }
  search.addEventListener("input",render);
  data.sources.forEach(source=>{
    const item=document.createElement("li");const link=document.createElement("a");
    link.href=source.url;link.target="_blank";link.rel="noopener noreferrer";link.textContent=source.label;
    item.append(link);document.querySelector("#bone-sources").append(item);
  });
  renderFilters();render();
})();