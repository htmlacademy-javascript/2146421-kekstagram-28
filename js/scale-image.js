const MAX_SCALE = 100;
const MIN_SCALE = 25;
const STEP_SCALE = 25;
const smallerControlButton = document.querySelector('.scale__control--smaller');
const biggerControlButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');


smallerControlButton.addEventListener('click', () => {
  if (getScaleValue () !== MIN_SCALE) {
    scaleControlValue.value = `${getScaleValue () - STEP_SCALE}%`;
    changeImgScale(scaleControlValue.value);
  }
});

biggerControlButton.addEventListener('click', () => {
  if (getScaleValue () !== MAX_SCALE) {
    scaleControlValue.value = `${getScaleValue () + STEP_SCALE}%`;
    changeImgScale (scaleControlValue.value);
  }
});

function getScaleValue () {
  const scaleValue = parseInt(scaleControlValue.value, 10);
  return scaleValue;
}

function changeImgScale (elem) {
  elem = parseInt(elem, 10);
  imgUploadPreview.style.transform = `scale(${elem / 100})`;
}

function resetScale() {
  imgUploadPreview.style.transform = 'scale(1)';
}

export { resetScale };