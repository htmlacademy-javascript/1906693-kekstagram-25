const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');

const uploadFile = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
};

const initUploadFile = () => {
  fileChooser.addEventListener('change', uploadFile);
};

export { initUploadFile };
