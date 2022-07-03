(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.classList.add("popup_opened"),document.addEventListener("keydown",o)}function n(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",o)}function o(e){"Escape"===e.key&&n(document.querySelector(".popup_opened"))}e.d({},{Pm:()=>C,Zw:()=>L,n_:()=>q,AU:()=>k,OP:()=>I,_u:()=>g,gg:()=>A,ro:()=>T,Po:()=>j,s1:()=>_,iX:()=>y,fS:()=>f,V:()=>m,NT:()=>w,e2:()=>P,vi:()=>O,f:()=>U,xG:()=>S,rC:()=>h,Hs:()=>B,iR:()=>N,xS:()=>d});var r={baseUrl:"https://nomoreparties.co/v1/plus-cohort-13",headers:{authorization:"d0237f44-6bee-4b11-b7b4-b67bb1856179","Content-Type":"application/json"}};function c(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}function a(e,o,c,a){function u(t){t.preventDefault(),j.textContent="Удаление...",function(e){return fetch("".concat(r.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:r.headers})}(a).then((function(t){return t.ok?(c.remove(),p(),d(),j.textContent="Удалено",n(e),Promise.resolve(t.json())):Promise.reject("Что-то пошло не так: ".concat(t.status))})).catch((function(e){console.log(e),p(),d()})).finally((function(){j.textContent="Да"}))}function i(e){"delete-action-submit-popup"===e.target.id&&(d(),p())}function s(e){"Escape"===e.key&&(d(),p())}function l(){d(),p()}function d(){e.removeEventListener("submit",u)}function p(){o.removeEventListener("mousedown",l),e.removeEventListener("mousedown",i),document.removeEventListener("keydown",s)}e.addEventListener("submit",u),e.addEventListener("mousedown",i),document.addEventListener("keydown",s),o.addEventListener("mousedown",l),t(e)}function u(e,n,o,r,c){var u=arguments.length>5&&void 0!==arguments[5]&&arguments[5],i=I.content.cloneNode(!0);i.id=c;var p=i.querySelector(".card__photo");p.src=n,p.alt="Изображние показывающее ".concat(e),p.addEventListener("click",(function(){t(w),P.src=n,P.alt="Изображние показывающее ".concat(e),O.textContent=e})),i.querySelector(".card__description").textContent=e;var f=i.querySelector(".card__like");!0===u&&f.classList.add("card__like_active"),f.addEventListener("click",(function(e){var t=i.id,n=e.target.closest(".card");e.target.classList.contains("card__like_active")?l(n,t):s(n,t)}));var m=i.querySelector(".card__likes-counter");m.textContent=o;var v=i.querySelector(".card__delete-button");return r===d?v.addEventListener("click",(function(e){var t=e.target.closest(".card"),n=i.id;a(A,T,t,n)})):v.remove(),i}function i(e){g.append(e)}function s(e,t){(function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers})})(t).then(c).then((function(t){e.querySelector(".card__like").classList.add("card__like_active"),e.querySelector(".card__likes-counter").textContent=t.likes.length})).catch((function(e){console.log(e)}))}function l(e,t){(function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:r.headers})})(t).then(c).then((function(t){e.querySelector(".card__like").classList.remove("card__like_active"),e.querySelector(".card__likes-counter").textContent=t.likes.length})).catch((function(e){console.log(e)}))}var d,p=document.querySelector(".profile__edit-button"),f=document.querySelector("#edit-profile-popup"),m=f.querySelector(".popup__submit"),v=document.querySelector("#edit-profile-form"),_=document.querySelector("#input-name"),h=document.querySelector(".profile__name"),y=document.querySelector("#input-work"),S=document.querySelector(".profile__info-about"),b=document.querySelector(".profile__add-button"),q=document.querySelector("#add-new-popup"),k=q.querySelector(".popup__submit"),E=document.querySelector("#add-new-form"),C=document.querySelector("#input-new-place"),L=document.querySelector("#input-new-place-link"),g=document.querySelector(".elements"),x=document.querySelectorAll(".popup"),w=document.querySelector("#photo-popup"),P=w.querySelector(".popup__image"),O=w.querySelector(".popup__description"),U=document.querySelector(".profile__avatar"),A=document.querySelector("#delete-action-submit-popup"),T=A.querySelector(".popup__close-icon"),j=A.querySelector(".popup__submit"),D=document.querySelector(".profile__avatar-overlay"),B=document.querySelector("#upload-new-avatar-popup"),N=B.querySelector(".popup__submit"),G=document.querySelector("#upload-new-avatar-form"),H=document.querySelector("#input-upload-avatar"),I=document.querySelector("#card-template");Promise.all([fetch("".concat(r.baseUrl,"/users/me"),{method:"GET",headers:r.headers}),fetch("".concat(r.baseUrl,"/cards"),{method:"GET",headers:r.headers})]).then((function(e){return e.some((function(e){return!0===e.ok}))?Promise.all(e.map((function(e){return e.json()}))):Promise.reject("Что-то пошло не так: ".concat(res.status))})).then((function(e){h.textContent=e[0].name,S.textContent=e[0].about,U.src=e[0].avatar,d=e[0]._id,e[1].forEach((function(e){if(0===e.likes.length)i(u(e.name,e.link,e.likes.length,e.owner._id,e._id,!1));else{var t=e.likes.some((function(e){return e._id===d}));i(u(e.name,e.link,e.likes.length,e.owner._id,e._id,t))}}))})).catch((function(e){console.log(e)})),x.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&n(e),t.target.classList.contains("popup__close-icon")&&n(e)}))})),p.addEventListener("click",(function(){_.value=h.textContent,y.value=S.textContent,t(f)})),v.addEventListener("submit",(function(e){var t,o;e.preventDefault(),m.textContent="Сохранение...",(t=_.value,o=y.value,fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:t,about:o})})).then(c).then((function(e){h.textContent=e.name,S.textContent=e.about,m.textContent="Сохранено"})).then((function(){n(f)})).catch((function(e){console.log(e)})).finally((function(){m.textContent="Сохранить"}))})),b.addEventListener("click",(function(){t(q)})),E.addEventListener("submit",(function(e){var t,o;e.preventDefault(),""!==C.value&&""!==L.value&&(k.textContent="Сохранение...",(t=C.value,o=L.value,fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:t,link:o})})).then(c).then((function(e){g.prepend(u(e.name,e.link,e.likes.length,e.owner._id,e._id,!1))})).then((function(){k.textContent="Сохранено",n(q)})).catch((function(e){console.log(e)})).finally((function(){k.textContent="Создать"})))})),D.addEventListener("click",(function(){t(B)})),G.addEventListener("submit",(function(e){var t;e.preventDefault(),t=H.value,N.textContent="Сохранение...",function(e){return fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:e})})}(t).then(c).then((function(e){U.src=e.avatar,N.textContent="Сохранено",n(B)})).catch((function(e){console.log(e)})).finally((function(){N.textContent="Сохранить"})),G.reset()})),function(e){function t(t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.classList.remove(e.submitButtonInactiveClass),n.removeAttribute("disabled",0)):(n.classList.add(e.submitButtonInactiveClass),n.setAttribute("disabled",0))}Array.from(document.querySelectorAll(e.formSelector)).forEach((function(n){!function(n){var o=Array.from(n.querySelectorAll(e.inputSelector)),r=n.querySelector(e.submitButtonSelector);n.addEventListener("submit",(function(e){e.preventDefault(),n.reset(),t(o,r)})),t(o,r),o.forEach((function(c){c.addEventListener("input",(function(){!function(t,n){n.validity.valid?function(t,n){var o=t.querySelector("#".concat(n.id,"-span"));n.classList.remove(e.inputErrorClass),o.classList.remove(e.errorSpanOpenedClass),o.textContent=""}(t,n):function(t,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"В поле ввода допущена ошибка",r=t.querySelector("#".concat(n.id,"-span"));n.classList.add(e.inputErrorClass),r.textContent=o,r.classList.add(e.errorSpanOpenedClass)}(t,n,n.validationMessage)}(n,c),t(o,r)}))}))}(n)}))}({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit",submitButtonInactiveClass:"popup__submit_disabled",inputErrorClass:"popup__input_error",errorSpanOpenedClass:"popup__error-message_opened"})})();