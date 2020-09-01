// JS-ФУНКЦИЯ ОПРЕДЕЛЕНИЯ ПОДДЕРЖКИ WEBP
function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
    }); // Подключение скрипта для проверки поддержки webp формата и выбора правильного формата в css;

// Burger =====================================================

const burgerBtn = document.querySelector('.burger');
const burgerCenterBtn = document.querySelector('.burger__center');
const burgerStartBtn = document.querySelector('.burger__start');
const burgerEndBtn = document.querySelector('.burger__end');
const mainMenu = document.querySelector('.header');
const logo = document.querySelector('.logo');
const menu = document.querySelectorAll('.menu');
const socialBtn = document.querySelectorAll('.soc');

function displayBurgerMenu() {
        burgerCenterBtn.style.display = 'none';
        burgerStartBtn.style.transform = 'rotate(45deg) translateX(10px)';
        burgerEndBtn.style.transform = 'rotate(-45deg) translateX(10px)';

        logo.style.display = 'block';
        menu[0].style.display = 'block';
        socialBtn[0].style.display = 'block';
        menu[1].style.display = 'block';
        socialBtn[1].style.display = 'block';
        menu[2].style.display = 'block';
        socialBtn[2].style.display = 'block';

        mainMenu.style.height = '320px';
        mainMenu.style.width = '250px';
        
        burgerBtn.removeEventListener('click', displayBurgerMenu);
        burgerBtn.addEventListener('click', hideBurgerMenu);
    };

function hideBurgerMenu() {
        mainMenu.style.height = '70px';
        mainMenu.style.width = '90px';

        logo.style.display = 'none';
        menu[0].style.display = 'none';
        socialBtn[0].style.display = 'none';
        menu[1].style.display = 'none';
        socialBtn[1].style.display = 'none';
        menu[2].style.display = 'none';
        socialBtn[2].style.display = 'none';

        burgerCenterBtn.style.display = 'block';
        burgerStartBtn.style.transform = 'none';
        burgerEndBtn.style.transform = 'none';

        burgerBtn.removeEventListener('click', hideBurgerMenu);
        burgerBtn.addEventListener('click', displayBurgerMenu);
    };

burgerBtn.addEventListener('click', displayBurgerMenu);

// Slider ===================================================================================

var multiItemSlider = (function () {
    return function (selector, config) {
      var
        _mainElement = document.querySelector(selector), // основный элемент блока
        _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
        _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
        _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
        _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
        _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
        _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
        _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
        _positionLeftItem = 0, // позиция левого активного элемента
        _transform = 0, // значение транфсофрмации .slider_wrapper
        _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
        _items = []; // массив элементов

      // наполнение массива _items
      _sliderItems.forEach(function (item, index) {
        _items.push({ item: item, position: index, transform: 0 });
      });

      var position = {
        getItemMin: function () {
          var indexItem = 0;
          _items.forEach(function (item, index) {
            if (item.position < _items[indexItem].position) {
              indexItem = index;
            }
          });
          return indexItem;
        },
        getItemMax: function () {
          var indexItem = 0;
          _items.forEach(function (item, index) {
            if (item.position > _items[indexItem].position) {
              indexItem = index;
            }
          });
          return indexItem;
        },
        getMin: function () {
          return _items[position.getItemMin()].position;
        },
        getMax: function () {
          return _items[position.getItemMax()].position;
        }
      }

      var _transformItem = function (direction) {
        var nextItem;
        if (direction === 'right') {
          _positionLeftItem++;
          if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
            nextItem = position.getItemMin();
            _items[nextItem].position = position.getMax() + 1;
            _items[nextItem].transform += _items.length * 100;
            _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
          }
          _transform -= _step;
        }
        if (direction === 'left') {
          _positionLeftItem--;
          if (_positionLeftItem < position.getMin()) {
            nextItem = position.getItemMax();
            _items[nextItem].position = position.getMin() - 1;
            _items[nextItem].transform -= _items.length * 100;
            _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
          }
          _transform += _step;
        }
        _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
      }

      // обработчик события click для кнопок "назад" и "вперед"
      var _controlClick = function (e) {
        if (e.target.classList.contains('slider__control')) {
          e.preventDefault();
          var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
          _transformItem(direction);
        }
      };

      var _setUpListeners = function () {
        // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
        _sliderControls.forEach(function (item) {
          item.addEventListener('click', _controlClick);
        });
      }

      // инициализация
      _setUpListeners();

      return {
        right: function () { // метод right
          _transformItem('right');
        },
        left: function () { // метод left
          _transformItem('left');
        }
      }

    }
  }());

  var slider = multiItemSlider('.slider');


// Video buttons =============================================================================

const leftPlayBtn = document.querySelector('.online');

leftPlayBtn.addEventListener('click', openZenflix);

function openZenflix() {
  const link = 'https://www.netflix.com/ru/title/80189685';
  window.open(link, '_blank');
}

// Modal window for right button and video from slider======================================================

const bodyHTML = document.querySelector('body');
const mainModalWindow = document.querySelector('.modal');
const videoYoutubeWindow = document.querySelector('.modal-video');
const playVideoBtn = document.querySelector('.b-play');
const linkFromSlider = document.querySelectorAll('.slider__item a');
const videoFrame = videoYoutubeWindow.children[0];
const closeVideoBtn = document.querySelector('.close-modal-btn');
const videoArr = ['https://www.youtube.com/embed/ndl1W4ltcmg', 
'https://drive.google.com/file/d/1C813pAtth879vWaj96aU1l8UhaIqo3LC/preview',
'https://drive.google.com/file/d/15O-AfuVJey_LkfATdraC8DaQ9LHgwvHk/preview',
'https://drive.google.com/file/d/1eib2kcM62HtBdJ_JPF2TQXzUqXlnUKLO/preview',
'https://drive.google.com/file/d/1VQd-gv_sp-w-Z4LvNJiCBRd6AeJrNfDs/preview',
'https://drive.google.com/file/d/19VO4BF-W9wqL2LE2eOGaRUDY61kciODq/preview',
'https://drive.google.com/file/d/1DuPM9F0W1B_iSkLGiEHSwtW4bjP4ii2W/preview',
'https://drive.google.com/file/d/1KKd_2inexZbM34qY1N9VDY-KYkDSN3Oz/preview',
'https://drive.google.com/file/d/1xBRUX9W4PJesYHShrRmjHYn88gM7aq4v/preview'];

playVideoBtn.addEventListener('click', function() {
  displayModalWindow();
  addVideoLink(0);
});

for(let i = 0; i < linkFromSlider.length; i++) {
  linkFromSlider[i].addEventListener('click', function() {
    displayModalWindow();
    displaySeries(event);
  });
}

function displayModalWindow() {
  bodyHTML.classList.add('no-scroll');
  mainModalWindow.style.display = 'block';
  videoYoutubeWindow.style.display = 'block';
  closeVideoBtn.style.display = 'block';
}

function displaySeries(event) {
  event.preventDefault();

  let getVideoClass = event.target.classList[0];
  let getVideoNumber = getVideoClass[1];

  addVideoLink(getVideoNumber, getVideoNumber);
}

function addVideoLink(num) {
    videoFrame.setAttribute('src', videoArr[num]);
}

closeVideoBtn.addEventListener('click', function() {
  window.location.reload();
}); // основные скрипты
