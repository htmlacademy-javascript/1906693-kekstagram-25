const imgUploadScale = document.querySelector('.img-upload__scale');
const scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');

const scaleControl = {
  step: 25,
  maxValue: 100,
  minValue: 25,
  defaultValue: 100
};

const scaleControlDefaultValue =`${scaleControl.defaultValue}%`;

const changeScaleMin = () => {
  if (parseInt(scaleControlValue.value, 10) > scaleControl.minValue) {
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) - scaleControl.step}%`;
    imgUploadPreview.style.transform = `scale(${parseInt(scaleControlValue.value, 10)/100})`;
  }
};

const changeScaleMax = () => {
  if (parseInt(scaleControlValue.value, 10) < scaleControl.maxValue) {
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) + scaleControl.step}%`;
    imgUploadPreview.style.transform = `scale(${parseInt(scaleControlValue.value, 10)/100})`;
  }

  if (parseInt(scaleControlValue.value, 10) === scaleControl.maxValue) {
    scaleControlValue.value = `${scaleControl.maxValue}%`;
    imgUploadPreview.removeAttribute('style');
  }
};

const initResizingImage = () => {
  if (parseInt(scaleControlValue.value, 10) === scaleControl.maxValue) {
    imgUploadPreview.removeAttribute('style');
  } else {
    imgUploadPreview.style.transform = `scale(${scaleControl.defaultValue/100})`;
  }
  scaleControlSmaller.addEventListener('click', changeScaleMin);
  scaleControlBigger.addEventListener('click', changeScaleMax);
};

const deleteResizingImage = () => {
  imgUploadPreview.removeAttribute('style');
  scaleControlSmaller.removeEventListener('click', changeScaleMin);
  scaleControlBigger.removeEventListener('click', changeScaleMax);
};

export { initResizingImage, deleteResizingImage, scaleControlDefaultValue };
