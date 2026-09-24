(() => {
  const data = window.RESUME_DATA;
  let lang = localStorage.getItem("resume-lang") || "ru";
  const $ = (id) => document.getElementById(id);
  const t = (obj) => obj?.[lang] ?? obj?.ru ?? "";

  function setText(id, value){ const el=$(id); if(el) el.textContent=value ?? ""; }
  function link(label,url,primary=false){ return '<a class="action-link'+(primary?' primary':'')+'" href="'+url+'" target="_blank" rel="noreferrer">'+label+'</a>'; }
  function render(){
    document.documentElement.lang=lang;
    $("langSwitch").textContent=lang==="ru"?"EN":"RU";
    document.title=t(data.meta.title);

    const labels=data.labels;
    $("nav").innerHTML=[
      ["experience",t(labels.experience)],["education",t(labels.education)],["portfolio",t(labels.portfolio)],
      ["recommendations",t(labels.recommendations)],["about",t(labels.about)],["contacts",t(labels.contacts)]
    ].map(([id,label])=>'<a href="#'+id+'">'+label+'</a>').join("");

    setText("heroEyebrow",t(labels.profile));
    setText("heroName",t(data.profile.name));
    setText("heroRole",t(data.profile.role));
    setText("heroIntro",t(data.profile.intro));
    $("heroMeta").innerHTML=[
      t(data.profile.experience),t(data.profile.location),t(data.profile.workFormat)
    ].filter(Boolean).map(x=>'<span class="pill">'+x+'</span>').join("");
    $("heroActions").innerHTML=[
      data.contacts.email ? link(t(labels.emailAction),"mailto:"+data.contacts.email,true) : "",
      data.contacts.phone ? link(t(labels.phoneAction),"tel:"+data.contacts.phone.replace(/[^+\d]/g,"")) : ""
    ].join("");

    const portrait=data.profile.photo;
    if(portrait){$("portrait").src=portrait;$("portrait").style.display="block";$("portraitPlaceholder").style.display="none";}

    setText("experienceEyebrow",t(labels.career));
    setText("experienceTitle",t(labels.experience));
    $("experienceList").innerHTML=data.experience.map(job=>`
      <article class="job">
        <div class="job-period">${t(job.period)}</div>
        <div>
          <div class="job-head"><div><h3>${t(job.role)}</h3><div class="job-company">${job.company}</div></div></div>
          <div class="job-columns">
            <div><h4>${t(labels.responsibilities)}</h4><ul>${t(job.responsibilities).map(x=>'<li>'+x+'</li>').join("")}</ul></div>
            <div><h4>${t(labels.achievements)}</h4><ul>${t(job.achievements).map(x=>'<li>'+x+'</li>').join("")}</ul></div>
          </div>
        </div>
      </article>`).join("");

    setText("educationEyebrow",t(labels.background)); setText("educationTitle",t(labels.education));
    $("educationList").innerHTML=data.education.map(x=>'<article class="card"><h3>'+t(x.title)+'</h3><p>'+t(x.place)+'</p><p>'+x.year+'</p></article>').join("");
    setText("coursesEyebrow",t(labels.learning)); setText("coursesTitle",t(labels.courses));
    $("coursesList").innerHTML=data.courses.map(x=>'<article class="card"><h3>'+t(x.title)+'</h3><p>'+t(x.place)+'</p><p>'+x.year+'</p></article>').join("");

    setText("skillsEyebrow",t(labels.toolbox)); setText("skillsTitle",t(labels.skills));
    $("skillsList").innerHTML=t(data.skills).map(x=>'<span class="skill">'+x+'</span>').join("");
    $("languagesList").innerHTML=data.languages.map(x=>'<span>'+t(x.name)+' — '+x.level+'</span>').join("");

    setText("portfolioEyebrow",t(labels.selectedWork)); setText("portfolioTitle",t(labels.portfolio));
    renderMedia("portfolioList",data.portfolio,t(labels.portfolioEmpty));
    setText("recommendationsEyebrow",t(labels.references)); setText("recommendationsTitle",t(labels.recommendations));
    renderMedia("recommendationsList",data.recommendations,t(labels.recommendationsEmpty));

    setText("aboutEyebrow",t(labels.personal)); setText("aboutTitle",t(labels.about));
    $("aboutText").innerHTML=t(data.about.text).map(p=>'<p>'+p+'</p>').join("");
    if(data.about.photo){$("aboutPhoto").src=data.about.photo;$("aboutPhoto").style.display="block";$("aboutPhotoPlaceholder").style.display="none";}

    setText("contactsEyebrow",t(labels.contactEyebrow)); setText("contactsTitle",t(labels.contacts));
    const contactItems=[];
    if(data.contacts.phone) contactItems.push('<a class="contact-item" href="tel:'+data.contacts.phone.replace(/[^+\d]/g,"")+'">'+data.contacts.phone+'</a>');
    if(data.contacts.email) contactItems.push('<a class="contact-item" href="mailto:'+data.contacts.email+'">'+data.contacts.email+'</a>');
    if(data.contacts.telegram) contactItems.push('<a class="contact-item" href="'+data.contacts.telegram+'" target="_blank">Telegram</a>');
    if(data.contacts.linkedin) contactItems.push('<a class="contact-item" href="'+data.contacts.linkedin+'" target="_blank">LinkedIn</a>');
    $("contactsList").innerHTML=contactItems.join("");
    setText("footerText",t(data.footer));
  }
  function renderMedia(id,items,empty){
    const el=$(id);
    if(!items.length){el.innerHTML='<div class="empty-state">'+empty+'</div>';return;}
    el.innerHTML=items.map(item=>`<article class="media-card"><span class="type">${item.type||"FILE"}</span><h3>${t(item.title)}</h3><p>${t(item.description)}</p><a href="${item.url}" target="_blank" rel="noreferrer">${t(data.labels.open)}</a></article>`).join("");
  }
  $("langSwitch").addEventListener("click",()=>{lang=lang==="ru"?"en":"ru";localStorage.setItem("resume-lang",lang);render();});
  render();
})();