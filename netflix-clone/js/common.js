/* image slider */
// 이미지 파일명 패턴
const dir = './images/'
const baseName = 'img-movie';
const totalImages = 10; // 이미지 총 개수 (예: 3개 이미지)
const imagesPerPage = 3;

let currentIndex = 0; // 첫 번째 이미지로 시작

const slideImage = document.querySelector('.slider');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

function loaderImages(){
    for (let i = 1; i <= totalImages; i++){
        const li = document.createElement('li');
        li.classList.add('slider-track-list');

        const a = document.createElement('a');
        a.href = "#";

        const img = document.createElement('img');
        img.src = `${dir}${baseName}${i}.jpg`;
        img.alt = `img-${i}`;
        a.appendChild(img);
        li.appendChild(a);
        slideImage.appendChild(li);
    }
}

function updateSlide(){
    const wrapperWidth = document.querySelector('.slider-content').clientWidth;
    const offset = -(currentIndex * wrapperWidth);

    slideImage.style.transform = `translateX(${offset}px)`;
    if (currentIndex === 0){
        btnPrev.classList.add('hide');
    } else {
        btnPrev.classList.remove('hide')
    }

    const maxIndex = Math.ceil(totalImages / imagesPerPage) - 1;
    if(currentIndex === maxIndex) {
        btnNext.classList.add('hide');
    } else {
        btnNext.classList.remove('hide');
    }
}

function handleButtonClick(direction){
    const maxIndex = Math.ceil(totalImages / imagesPerPage) - 1;

    if(direction === 'prev'){
        currentIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    } else if(direction === 'next'){
        currentIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
    }
    updateSlide();
};

document.getElementById('btn-prev').addEventListener('click', () => handleButtonClick('prev'));
document.getElementById('btn-next').addEventListener('click', () => handleButtonClick('next'));

document.addEventListener("DOMContentLoaded", () => {
    loaderImages();
    updateSlide();
});