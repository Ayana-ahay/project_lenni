// (function () {
//     "use strict";

//     const root = document.documentElement;
//     const navToggle = document.querySelector("#js-navToggle");
//     navToggle.addEventListener("click", function () {
//         root.classList.toggle("show-nav");
//     });

//     // работа с попапом
//     const eventPP = document.querySelector("#js-eventPP");
//     if (eventPP) {
//         const eventOpenBtn = document.querySelector("#js-eventOpenBtn");

//         // кнопка открытия
//         eventOpenBtn.addEventListener("click", function () {
//             root.classList.add("show-event-popup");
//         });

//         // кнопка закрытия
//         eventPP.addEventListener("click", function (event) {

//             // если кликнули по самому попапу либо кликнули по кнопке закрытия
//             if (
//                 event.target === this || 
//                 event.target.classList.contains("js-ppCloseBtn")
//             ) {
//                 root.classList.remove("show-event-popup");
//             }
//         });

//         // кнопка закрытия c помощью esc
//         document.addEventListener("keyup", function (event) {
//             if (event.key === "Escape" || event.keyCode === 27) {
//                 root.classList.remove("show-event-popup");
//             }
//         });

//     }
// })();


(function () {
    "use strict"

    const root = document.documentElement;

    // работа с гамбургером
    const navToggle = document.querySelector("#js-navToggle");
    navToggle.addEventListener("click", function () {
        root.classList.toggle("show-nav");
    });


    // работа с попапом
    const eventPP = document.querySelector("#js-eventPP");
    if (eventPP) {
        const eventOpenBtn = document.querySelector("#js-eventOpenBtn");

        const closeEventPP = function (event) {
            function close() {
                document.removeEventListener("keyup", closeEventPP);
                eventPP.removeEventListener("click", closeEventPP);
                root.classList.remove("show-event-popup");
            }
    
            switch (event.type) {
                case "keyup":
                    if (event.key === "Escape" || event.keyCode === 27) close();
                    break;
                case "click":
                    if (
                        event.target === this ||
                        event.target.classList.contains("js-ppCloseBtn")
                    )
                        close();
                    break;
            }
        };
    
        eventOpenBtn.addEventListener("click", function () {
            root.classList.add("show-event-popup");
    
            // добавляем прослушиватели на кнопку закрытия и на документ keyup
            document.addEventListener("keyup", closeEventPP);
            eventPP.addEventListener("click", closeEventPP);
        });
    }

    // слайдер на главной странице
    const swipers = document.querySelectorAll(".js-swiper");
    swipers.forEach(function (swpr) {
        new Swiper(swpr, {
            updateOnWindowResize: true,
            slidesPerView: "auto",
            freeMode: true,
            spaceBetween: 0,
            speed: 500,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
        navigation: {
            nextEl: ".swiper-arrow-next",
            prevEl: ".swiper-arrow-prev",
            disabledClass: "arrow--disabled"
        }
    });

    // гугл карта на главной странице
    const contactsMap = document.querySelector("#js-contactsMap"); // ищем js-contactsMap

    // проверяем наличие блока на странице
    if (contactsMap) {
        // JSON со стилями карты
        const mapStyles = [
            {
                elementType: "geometry",
                stylers: [
                  {
                    color: "#242f3e"
                  }
                ]
              },
              {
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#746855"
                  }
                ]
              },
              {
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#242f3e"
                  }
                ]
              },
              {
                featureType: "administrative",
                elementType: "geometry",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#d59563"
                  }
                ]
              },
              {
                featureType: "poi",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#d59563"
                  }
                ]
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#263c3f"
                  }
                ]
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#6b9a76"
                  }
                ]
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#38414e"
                  }
                ]
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    color: "#212a37"
                  }
                ]
              },
              {
                featureType: "road",
                elementType: "labels.icon",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#9ca5b3"
                  }
                ]
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#746855"
                  }
                ]
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    color: "#1f2835"
                  }
                ]
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#f3d19c"
                  }
                ]
              },
              {
                featureType: "transit",
                stylers: [
                  {
                    visibility: "off"
                  }
                ]
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#2f3948"
                  }
                ]
              },
              {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#d59563"
                  }
                ]
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#17263c"
                  }
                ]
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#515c6d"
                  }
                ]
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#17263c"
                  }
                ]
              }
        ];

        // значения взяты с геолокатора яндекс
        const mapCenter = new google.maps.LatLng(56.49387, 84.96274);

        // объект с опциями
        const mapOptions = {
            center: mapCenter,
            disableDefaultUI: true,
            draggable: true,
            gestureHandling: "cooperative",
            scrollwheel: false,
            styles: mapStyles,
            zoom: 15,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            }
        };

        // инициализация нашей карты
        const map = new google.maps.Map(contactsMap, mapOptions);

        // точка на карте
        const point = new google.maps.LatLng(56.49385, 84.96274);

        const mapPin = new google.maps.MarkerImage(
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABHCAMAAABf/MtLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAADAUExURUdwTK8wILwyJL0zI70yJbwyI79AIL0yJL8wILs0JLw0JLsyJL0zJbwyJbwzJB8eHv///3Nycjs6OldWVsRMP4+OjsRNP8fHx+Pj492ZkUlISOazrauqqu7MyMfGxsBAMS0sLMlZTc1mW/vy8sBAMvvy8WVkZMVMQPbl48lZTtmMg81mWtmMhMxmW4+Pj/fm4/fl5OGmnvHx8Z2cnMVNQPLZ1tWAdt6ZktBzaHNzc9V/duq/u+Gmn8hZTNFzabm5uYZR+N4AAAAOdFJOUwAQz9/f3xB/EIDPz9/ftWbT5QAAAWxJREFUWMPt1VlTwjAQAGDEaluPJiQhYGjtAeUQxPu+/v+/cpO2DC+OI7PRYcw+JOlO55vMdpO2WmtBNo3W9+FsZzvb2c529l/Y45hXi/iG6yA8fuKMkGUMqS5X1RvLONvA7tJOtaD9au5AginSo5A6hUem3+hRhmUTwhubjNFttbKzDwT7GqqtGpv0G5vE2Ptes9FrsvqW/9FmXDGIjHCuZwYJc0wUHCn9aYlJKO7uKmf/sh39LJxtxx7lObJ9e1emMA1oISN5OUmFmNMrIQSGnd/TM2M/w3iRwCDpCdK+i9EwMfY5jMkU056l0SvNtf0GT0PUfT9K+a6tAYUKP0wFpl3oSpTansuXchIh2jM9LKDWet/SlATNLkxjg2lqsjAtg9cnOqCbU1Ev9Ji6+wTTdv/LLbJdbHnsh160GwZW6ANz+Ns28LC+WXwL9lFt71mwv7gSUcKzuG/fYr2DtqEPd2w0YeAfR55vg/4EpN3f8dlAXnoAAAAASUVORK5CYII=",
            // размеры иконки и смещение относительно точки
            new google.maps.Size(91, 71), //size
            new google.maps.Point(0, 0),  //origin point
            new google.maps.Point(0, 71)  //offset point
        );

        // инициализация точки на карте
        new google.maps.Marker({
            position: point,
            map: map,
            icon: mapPin,
            title: "TAGREE digital"
        });
    }

    // попап jQuery
    const jsSelectric = $(".js-selectric");
    // возвращается всегда именно коллекция. Она будет пустой, если элементы не найдены. 
    // А значит, чтобы проверить наличие элементов на странице, мы должны обратиться к свойству length, \
    // чтобы убедится, что его значение больше нуля.
    if (jsSelectric.length) {
        jsSelectric.selectric({
            nativeOnMobile: false
        });
    }

    // попап телефон
    const mobileMask = $('.js-mobileMask');
    if (mobileMask.length) {
        mobileMask.mask('+7 (000) 000 00 00', { placeholder: "+7 (___) ___ __ __" });
    }

    // попап календарь
    const dateField = $(".js-dateField");
    if (dateField.length) {
        // pick - поле (внутри поля ищем наши элементы)
        const pickerInit = function (pick) {
            const dateInput = pick.find(".js-dateInput");
            const dateDay = pick.find(".js-dateDay");
            const dateMonth = pick.find(".js-dateMonth");
            const dateYear = pick.find(".js-dateYear");
            const dateConfig = {
                autoClose: true,
                minDate: new Date(),
                navTitles: {
                    days: "MMMM <i>yyyy</i>"
                },
                onSelect: function ({ date }) {
                    dateDay.val(date ? ("0" + date.getDate()).slice(-2) : "");
                    dateMonth.val(date ? ("0" + (date.getMonth() + 1)).slice(-2) : "");
                    dateYear.val(date ? date.getFullYear() : "");
                }
            };
            new AirDatepicker(dateInput[0], dateConfig);
        };

        // цикл для каждого элемента (вызов метода)
        $.each(dateField, function (i) {
            pickerInit($(this));
        });
    }
});

})();