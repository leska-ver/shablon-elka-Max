document.addEventListener('DOMContentLoaded', function() {
  // console.log(); находит в js-ce ошибку. Deftools

  
  /* ---------------//- Модалки -//--------------- */
  
  //- Модалки -//
  let $window = window,
      $modalOpenButton = document.querySelectorAll('.sample-btnJs'),
      $modals = document.querySelector('.modals'),
      $modalClose = document.querySelectorAll('.closeX'),
      $modal = document.querySelectorAll('.modal'),
      $modalOverlay = document.querySelector('.modals__overlay'),
      $mobileOverlay = document.querySelector('.mobile--overlay');   

  // отключить включение прокрутки BODY
  let disableScroll = function disableScroll() {
    document.body.classList.add('disable--scroll');
  };

  let enableScroll = function enableScroll() {
    document.body.classList.remove('disable--scroll');
  }; 
  
  // Открывашка модалки(modal) //
  $modalOpenButton.forEach(function (el) {
    el.addEventListener('click', function (e) {
      disableScroll();
      let modalTarget = e.currentTarget.getAttribute('data-modal');

      if (modalTarget == 'order') {
        var bilette = e.currentTarget.closest('.sample-modalJs').querySelector('h3').textContent;

        if ($window.innerWidth > 787) {
          let cost = e.currentTarget.parentElement.innerHTML;
          document.querySelector('[data-modal-open="' + modalTarget + '"]').querySelector('.modal__ord').innerHTML = cost;
          $modals.style.display = 'flex';
          setTimeout(function () {
            $modals.classList.add('modal--visible');
          }, 100);
          document.querySelector('[data-modal-open="' + modalTarget + '"]').style.display = 'flex';
        } else {
          let _cost = e.currentTarget.closest('.sample-modalJs').querySelector('h3').textContent;
          console.log(_cost);
          document.querySelector('[data-modal-open="' + modalTarget + '"]').querySelector('.tariff').innerHTML = "\u0422\u043E\u0432\u0430\u0440: \"".concat(_cost, "\"");
          $modals.style.display = 'flex';
          setTimeout(function () {
            $modals.classList.add('modal--visible');
          }, 100);
          document.querySelector('[data-modal-open="' + modalTarget + '"]').style.display = 'block';
          setTimeout(function () {
            document.querySelector('[data-modal-open="' + modalTarget + '"]').classList.add('mobile--open');
          }, 300);
        }
      } else {
        if ($window.innerWidth > 787) {
          $modals.style.display = 'flex';
          setTimeout(function () {
            $modals.classList.add('modal--visible');
          }, 100);
          document.querySelector('[data-modal-open="' + modalTarget + '"]').style.display = 'block';
        } else {
          $modals.style.display = 'flex';
          setTimeout(function () {
            $modals.classList.add('modal--visible');
          }, 100);
          document.querySelector('[data-modal-open="' + modalTarget + '"]').style.display = 'block';
          setTimeout(function () {
            document.querySelector('[data-modal-open="' + modalTarget + '"]').classList.add('mobile--open');
          }, 300);
        }
      }
    });
  }); 
  
  
  // Закрывашка в декстопной версии модалки(modal) //
  let closeModal = function closeModal() {
    $modals.classList.remove('modal--visible');
    enableScroll();

    if ($window.innerWidth > 787) {
      setTimeout(function () {
        $modal.forEach(function (el) {
          el.style.display = 'none';
        });
        $modals.style.display = 'none';
      }, 400);
    } else {
      $modal.forEach(function (el) {
        el.classList.remove('mobile--open');
      });
      setTimeout(function () {
        $modals.classList.remove('modal--visible');
      }, 300);
      setTimeout(function () {
        $modal.forEach(function (el) {
          el.style.display = 'none';
        });
        $modals.style.display = 'none';
      }, 400);
    }
  };

  $modalClose.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      closeModal();
    });
  });
  $modalOverlay.addEventListener('click', function (e) {
    e.preventDefault();
    closeModal();
  });  



  // Закрывашка в мобильной версии //
  let closeMobile = document.querySelectorAll('.modal__close-mobile');
  closeMobile.forEach(function (el) {
    el.addEventListener('click', function (e) {
      console.log('Down!');
      enableScroll();
      $modal.forEach(function (el) {
        el.classList.remove('mobile--open');
      });
      setTimeout(function () {
        $modals.classList.remove('modal--visible');
      }, 300);
      setTimeout(function () {
        $modal.forEach(function (el) {
          el.style.display = 'none';
        });
        $modals.style.display = 'none';
      }, 400);
    });
  });


  /* --------------//- Елки закажи Шаблон модалки - modal-order + Валидация -//---------------- */

  // Елки закажи Шаблон модалки - modal-order
  const btnCloseBuyZ = document.querySelector('.closeX_js');
  const modalBuyZ = document.querySelector('.modals__thanks_js');
  if (modalBuyZ) {
    btnCloseBuyZ.addEventListener('click', function () {
      document.querySelector('.modals__thanks_js').classList.toggle('modals__thanks_js_active');
    });
    modalBuyZ.addEventListener('click', function (event) {
      if (event._notClick) return;
      modalBuyZ.classList.remove('modals__thanks_js_active');
      document.querySelector('.modals__sps_js').classList.remove('modals__sps_js_active');
    });    
  }

  // inputmask - Телефон/modal-order
  const formJsZ = document.querySelector('.modal__form_js');
  if (formJsZ) { // Обёртка if. Спасение Gulp-а от null в браузере
    const telSelector = formJsZ.querySelector('input[type="tel"]');
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);

    new window.JustValidate('.modal__form_js', {
      rules: {
        name: {
          required: true,
          minLength: 2,
          maxLenght: 10,
          strength: {
            custom: '^[А-яёЁ\s-]' //только по русски текст
            //custom: '^[а-яёЁ\s]+$'только по русски и маленькими буквами
            //custom: '^[a-yeO\s]+$'только по английски текст
          }
        },
        tel: {
          required: true,
          function: () => {
            const phone = telSelector.inputmask.unmaskedvalue();
            return Number(phone) && phone.length === 10;
          }
        },
        /*checkbox: { // Обязательная галка
          required: true
        }*/
      },
      colorWrong: 'red',

      messages: {
        name: {
          required: 'Введите ваше имя',
          minLength: 'Введите 3 и более символов',
          maxLength: 'Запрещено вводить более 15 символов',
          strength: 'Текст только по русски'
          //strength: 'Текст только по русски и маленькими буквами'
          //strength: 'Текст только по английски'
        },
        email: {
          email: 'Недопустимый формат',
          required: 'Введите email'
        },
        tel: {
          required: 'Введите ваш телефон',
          function: 'Здесь должно быть 11 симв..'
        },
        text: {
          required: 'Введите: адрес места жительства, название товара, размер и количество',
          minLength: 'Введите 15 и более символов',
          maxLength: 'Запрещено вводить более 1000 символов'
        }
        //, checkbox: {
        //   required: 'Поставьте галочку',
        //   function: 'Здесь должна быть галка'
        // }
      },

      //*отправка формы modal-order*/
      submitHandler: function (thisForm) {
        let formData = new FormData(thisForm);
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
            } //if xhr
          }
        }

        xhr.open('POST', 'mail.php', 'list.php', true);
        xhr.send(formData);
        thisForm.reset();
        document.querySelector('.modals__thanks_js').classList.toggle('modals__thanks_js_active');
        document.querySelector('.modals__sps_js').classList.toggle('modals__sps_js_active');
      }
    })
  }

  /* ------------------------------ */



  
});




