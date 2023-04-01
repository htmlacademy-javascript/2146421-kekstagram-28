const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: '',
  },
];

const sliderElement = document.querySelector('.effect-level__slider');
const filtersGroup = document.querySelector('.effects__list');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const effectLevel = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const unhideSlider = () => {
  sliderContainer.classList.remove('hidden');
};
const defaultEffectObject = EFFECTS[0];

let needfulEffectsItem = defaultEffectObject;
let prevFilterClass;

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: needfulEffectsItem.min,
      max: needfulEffectsItem.max,
    },
    start: needfulEffectsItem.start,
    step: needfulEffectsItem.step,
    connect: 'lower',
  });
};
createSlider();
hideSlider ();


//функция, которая создает новый слайдер по полученным данным о фильтре
const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: needfulEffectsItem.min,
      max: needfulEffectsItem.max,
    },
    start: needfulEffectsItem.start,
    step: needfulEffectsItem.step,
    connect: 'lower',
  });
};


//функция, которая находит нужный объект в массиве с объектами эффектов и создает под него слайдер
const changeEffects = (evt) => {
  needfulEffectsItem = EFFECTS.find((effect) => (evt.target.value === effect.name));
  if (prevFilterClass) {
    imgUploadPreview.classList.remove(prevFilterClass);
  }
  const currFilterClass = `effects__preview--${evt.target.value}`;
  imgUploadPreview.classList.add(currFilterClass);
  prevFilterClass = currFilterClass;
  unhideSlider();
  updateSlider ();
};

const resetEffects = () => {
  needfulEffectsItem = EFFECTS[0];
  imgUploadPreview.classList.remove(prevFilterClass);
  imgUploadPreview.classList.add(`effects__preview--${needfulEffectsItem.name}`);
  updateSlider();
};


//функция, которая связывает данные из слайдера с глубиной наложения фильтра
sliderElement.noUiSlider.on('update', () => {
  if(needfulEffectsItem === defaultEffectObject) {
    imgUploadPreview.style.filter = defaultEffectObject.style;
    hideSlider();
  } else {
    effectLevel.value = sliderElement.noUiSlider.get();
    imgUploadPreview.style.filter = `${needfulEffectsItem.style}(${effectLevel.value}${needfulEffectsItem.unit})`;
  }
});

filtersGroup.addEventListener ('change', changeEffects);

export { resetEffects };
