export function enableValidation(config) {
    const forms = Array.from(document.forms);
    forms.forEach((form) => {
      let formInputs = Array.from(form.elements).filter((element) => {
        return element.className === 'popup__input';
      });
      for(let i = 0; i < formInputs.length; i++) {
        isValid(formInputs[i]);
        formInputs[i].addEventListener('input', () => {
          isValid(formInputs[i]);
        });
      }
    });
  
    function showInputError(element, errorText = 'В поле ввода допущена ошибка') {
      let elementId = element.id;
      let elementSpan = document.querySelector(`#${elementId}-span`);
      let submitButton = element.closest(config.formSelector).querySelector(config.submitButtonSelector);
      element.classList.add(config.inputErrorClass);
      elementSpan.classList.add(config.errorSpanOpenedClass);
      elementSpan.textContent = errorText;
      submitButton.setAttribute('disabled', 0);
      submitButton.classList.add(config.submitButtonDisabledClass);
    }
    
    function hideInputError(element) {
      let elementId = element.id;
      let elementSpan = document.querySelector(`#${elementId}-span`);
      let submitButton = element.closest(config.formSelector).querySelector(config.submitButtonSelector);
      element.classList.remove(config.inputErrorClass);
      elementSpan.classList.remove(config.errorSpanOpenedClass);
      elementSpan.textContent = '';
      if(element.closest(config.formSelector).id === 'edit-profile-form') {
        if(element.closest(config.formSelector).querySelector(config.editFormNameInputId).validity.valid && element.closest(config.formSelector).querySelector(config.editFormWorkInputId).validity.valid) {
          submitButton.removeAttribute('disabled');
          submitButton.classList.remove(config.submitButtonDisabledClass);
        }
      } else if(element.closest(config.formSelector).id === 'add-new-form'){
        if(element.closest(config.formSelector).querySelector(config.addNewFormNewPlaceNameId).validity.valid && element.closest(config.formSelector).querySelector(config.addNewFormNewPlaceLinkId).validity.valid) {
          submitButton.removeAttribute('disabled');
          submitButton.classList.remove(config.submitButtonDisabledClass);
        }
      }
    }
    
    function isValid(input) {
      if(!input.validity.valid) {
        showInputError(input, input.validationMessage);
      } else {
        hideInputError(input);
      }
    }
  }