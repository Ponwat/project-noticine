// script.js

// ฟังก์ชันสำหรับ toggle แก้ไข input field
function toggleEdit(input, icon) {
    const isEditing = input.hasAttribute('readonly');
    if (isEditing) {
      input.removeAttribute('readonly');
      icon.classList.add('editing');
      input.focus();
    } else {
      input.setAttribute('readonly', 'readonly');
      icon.classList.remove('editing');
    }
  }
  
  // เลือก input fields และ icons ทั้งหมด
  const nameInput = document.querySelector('.name');
  const genderInput = document.querySelector('.gender');
  const ageInput = document.querySelector('.age');
  const weightInput = document.querySelector('.weight');
  const heightInput = document.querySelector('.height');
  const diseaseInput = document.querySelector('.disease');
  const allergyInput = document.querySelector('.allergy');
  const telInput = document.querySelector('.tel');
  
  const nameIcon = document.querySelector('.edit-name');
  const genderIcon = document.querySelector('.edit-gender');
  const ageIcon = document.querySelector('.edit-age');
  const weightIcon = document.querySelector('.edit-weight');
  const heightIcon = document.querySelector('.edit-height');
  const diseaseIcon = document.querySelector('.edit-disease');
  const allergyIcon = document.querySelector('.edit-allergy');
  const telIcon = document.querySelector('.edit-tel');
  
  // เพิ่ม event listeners ให้กับ icons
  nameIcon.addEventListener('click', () => toggleEdit(nameInput, nameIcon));
  genderIcon.addEventListener('click', () => toggleEdit(genderInput, genderIcon));
  ageIcon.addEventListener('click', () => toggleEdit(ageInput, ageIcon));
  weightIcon.addEventListener('click', () => toggleEdit(weightInput, weightIcon));
  heightIcon.addEventListener('click', () => toggleEdit(heightInput, heightIcon));
  diseaseIcon.addEventListener('click', () => toggleEdit(diseaseInput, diseaseIcon));
  allergyIcon.addEventListener('click', () => toggleEdit(allergyInput, allergyIcon));
  telIcon.addEventListener('click', () => toggleEdit(telInput, telIcon));
  
  // ทำให้ input fields เป็น readonly ตอนโหลดหน้าเว็บ
  nameInput.setAttribute('readonly', 'readonly');
  genderInput.setAttribute('readonly', 'readonly');
  ageInput.setAttribute('readonly', 'readonly');
  weightInput.setAttribute('readonly', 'readonly');
  heightInput.setAttribute('readonly', 'readonly');
  diseaseInput.setAttribute('readonly', 'readonly');
  allergyInput.setAttribute('readonly', 'readonly');
  telInput.setAttribute('readonly', 'readonly');