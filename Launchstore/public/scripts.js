// Formatando moeda
const Mask = {
  apply(input, func) {
    setTimeout(() => {
      input.value = Mask[func](input.value);
    }, 1);
  },
  formatBRL(value) {
    value = value.replace(/\D/g, "");
    // Máscara de campo
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value) / 100);
  },
};

const PhotosUpload = {
  preview: document.querySelector("#photos-preview"),
  uploadLimit: 6,
  files: [],
  input: "",
  handleFileInput(event) {
    const { files: fileList } = event.target;
    const {
      preview,
      getContainer,
      hasLimit,
      files,
      getAllFiles,
    } = PhotosUpload;

    PhotosUpload.input = event.target;

    if (hasLimit(event)) return;

    Array.from(fileList).forEach((file) => {
      files.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const container = getContainer(image);

        preview.appendChild(container);
      };

      reader.readAsDataURL(file);
    });

    PhotosUpload.input.files = getAllFiles();
  },
  getContainer(image) {
    const { getRemoveButton, removePhoto } = PhotosUpload;

    const container = document.createElement("div");
    container.classList.add("photo");
    container.onclick = removePhoto;

    container.appendChild(image);
    container.appendChild(getRemoveButton());

    return container;
  },
  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload;
    const { files: fileList } = input;

    if (fileList.legth > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos.`);
      event.preventDefault();
      return true;
    }

    const photosDiv = [];

    preview.childNodes.forEach((item) => {
      if (item.classList && item.classList.value == "photo")
        photosDiv.push(item);
    });

    const totalPhotos = fileList.length + photosDiv.length;

    if (totalPhotos > uploadLimit) {
      alert("Você atingiu o limite máximo de fotos.");
      event.preventDefault();
      return true;
    }

    return false;
  },
  getRemoveButton() {
    const button = document.createElement("i");
    button.classList.add("material-icons");
    button.innerHTML = "close";

    return button;
  },
  removePhoto(event) {
    const { preview, files, getAllFiles } = PhotosUpload;

    const photoDiv = event.target.parentNode; // div.photo
    const photoArray = Array.from(preview.children);

    const index = photoArray.indexOf(photoDiv);

    files.splice(index, 1);
    PhotosUpload.input.files = getAllFiles();

    photoDiv.remove();
  },
  getAllFiles() {
    const { files } = PhotosUpload;

    // ClipboardEvent.clipboardData() para mozilla
    const dataTransfer = new DataTransfer();

    files.forEach((file) => dataTransfer.items.add(file));

    return dataTransfer.files;
  },
  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode;

    if (photoDiv.id) {
      const removedFiles = document.querySelector(
        'input[name="removed_files"]'
      );
      if (removedFiles) {
        removedFiles.value += `${photoDiv.id},`;
      }
    }

    photoDiv.remove();
  },
};

const ImageGallery = {
  highlight: document.querySelector(".gallery .highlight > img"),
  previews: document.querySelectorAll(".gallery-preview img"),
  setImage(event) {
    const { target } = event;

    ImageGallery.previews.forEach((preview) =>
      preview.classList.remove("active")
    );
    target.classList.add("active");

    ImageGallery.highlight.src = target.src;
    LightBox.image.src = target.src;
  },
};

const LightBox = {
  target: document.querySelector(".lightbox-target"),
  image: document.querySelector(".lightbox-target img"),
  closeButton: document.querySelector(".lightbox-target a.lightbox-close"),
  open() {
    LightBox.target.style.opacity = 1;
    LightBox.target.style.top = 0;
    LightBox.target.style.bottom = 0;
    LightBox.closeButton.style.top = 0;
  },
  close() {
    LightBox.target.style.opacity = 0;
    LightBox.target.style.top = "-100%";
    LightBox.target.style.bottom = "initial";
    LightBox.closeButton.style.top = "-80px";
  },
};
