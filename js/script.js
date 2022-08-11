window.addEventListener('DOMContentLoaded', function() {
	'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

        function hideTabContent(a) {
            for (let i = a; i < tabContent.length; i++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
            }
        }
        hideTabContent(1);

        function showTabContent(b) {
            if (tabContent[b].classList.contains('hide')) {
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            }
        }

        info.addEventListener('click', function(e) {
            let t = e.target;

            if (t && t.classList.contains('info-header-tab')) {
                for (let i = 0; i < tab.length; i++) {
                    if (t == tab[i]) {
                        hideTabContent(0);
                        showTabContent(i);
                        break;
                    }
                }
            }
        });

        // timer 

    let deadline = '2022-03-23';

        function getTimeRemaining(endtime) {
            let t = Date.parse(endtime) - Date.parse(new Date()),
                seconds = Math.floor((t/1000) % 60),
                minutes = Math.floor((t/1000/60) % 60),
                hours = Math.floor(t/(1000 * 60 * 60));
                /* if i heed days in timer too
                hours = Math.floor((t/1000/60/60) % 24);
                days = Math.floor(t/(1000 * 60 * 60 * 24)); */
    
                return {
                    'total': t,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds  
                };
        }
    
        function setClock (id, endtime) {
            let timer = document.getElementById(id),
                hours = timer.querySelector('.hours'),
                minutes = timer.querySelector('.minutes'),
                seconds = timer.querySelector('.seconds'),
                timeInterval = setInterval(updateClock, 1000);
    
            function updateClock () {
                let t = getTimeRemaining(endtime);
                //hours.textContent = t.hours;
                //minutes.textContent = t.minutes;
                //seconds.textContent = t.seconds;
                if (t.hours < 10) {
                    hours.textContent = '0' + t.hours;
                } else {
                    hours.textContent = t.hours;
                }
    
                if (t.minutes < 10) {
                    minutes.textContent = '0' + t.minutes;
                } else {
                    minutes.textContent = t.minutes;
                }
    
                if (t.seconds < 10) {
                    seconds.textContent = '0' + t.seconds;
                } else {
                    seconds.textContent = t.seconds;
                }
                    
    
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
    
        }
    
        setClock('timer', deadline);

        let more = document.querySelector('.more'),
            overlay = document.querySelector('.overlay'),
            close = document.querySelector('.popup-close');
        
            more.addEventListener('click', function() {
                overlay.style.display = 'block';
                this.classList.add('more-splash');
                document.body.style.overflow = 'hidden';
            });
        
            close.addEventListener('click', function() {
                overlay.style.display = 'none';
                more.classList.remove('more-splash');
                document.body.style.overflow = '';
            }); 
        
            let message = {
                loadind: 'Loading...',
                success: 'Thank you!',
                failure: 'Something is wrong'
            };
        
            let form = document.querySelector('.main-form'),
                input = document.getElementsByTagName('input'),
                statusMessage = document.createElement('div');
        
            statusMessage.classList.add('status');
        
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                form.appendChild(statusMessage);
        
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                /* request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); */
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        
                let formData = new FormData(form);
        
                let obj = {};
                formData.forEach(function(value, key) {
                    obj[key] = value;
                });
        
                let json = JSON.stringify(obj);
        
                request.send(json);
                
                request.addEventListener('readystatechange', function() {
                    if (request.readyState < 4) {
                        statusMessage.innerHTML = message.loadind;
                    } else if (request.readyState === 4 && request.status == 200) {
                        statusMessage.innerHTML = message.success;
                    } else {
                        statusMessage.innerHTML = message.failure;
                    }
                });
        
                console.log(json);
        
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            });

 

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
            
        showSlides(slideIndex);
    
        function showSlides(n) {
    
            if (n > slides.length) {
                    slideIndex = 1;
            } 
            if (n < 1) {
                slideIndex = slides.length;
            }
    
            slides.forEach((item) => item.style.display = 'none');
    
            dots.forEach((item) => item.classList.remove('dot-active'));
    
            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].classList.add('dot-active');
        }
    
        function plusSlides (n) {
            showSlides(slideIndex += n);
        }
        function currentSlide (n){
            showSlides(slideIndex = n);
        }
    
        prev.addEventListener('click', function() {
            plusSlides(-1);
        });
        next.addEventListener('click', function() {
            plusSlides(1);
        });
    
        dotsWrap.addEventListener('click', function(event) {
            for (let i = 0; i < dots.length + 1; i++) {
                if (event.target.classList.contains('dot') && event.target == dots[i-1]){
                    currentSlide(i);
                }
            }
        });
 

    // calculator

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function() {
            personsSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change', function() {
            daysSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if(persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function() {
            if (restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        }); 
});