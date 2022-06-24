export function enableValidation(config) {
    const editFormFirstInput = Array.from(document.forms.editForm.elements)[0];
    const editFormSecondInput = Array.from(document.forms.editForm.elements)[1];
    const addNewFormFirstInput = Array.from(document.forms.addNewform.elements)[0];
    const addNewFormSecondInput = Array.from(document.forms.addNewform.elements)[1];
  
    isValid(editFormFirstInput);
    isValid(editFormSecondInput);
    isValid(addNewFormFirstInput);
    isValid(addNewFormSecondInput);
  
    editFormFirstInput.addEventListener('input', () => {
      isValid(editFormFirstInput);
    });
    
    editFormSecondInput.addEventListener('input', () => {
      isValid(editFormSecondInput);
    });
    
    addNewFormFirstInput.addEventListener('input', () => {
      isValid(addNewFormFirstInput);
    });
    
    addNewFormSecondInput.addEventListener('input', () => {
      isValid(addNewFormSecondInput);
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