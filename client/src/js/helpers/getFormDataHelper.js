export default function getFormDataHelper(form) {
    const formData = new FormData(form);
    const formDataObj = {};
    formData.forEach((value, name) => formDataObj[name] = value);
    return formDataObj;
}