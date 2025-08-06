const bmiText = document.getElementById("bmi");
const descText = document.getElementById("desc");
const form = document.querySelector("form");
const userNameText = document.getElementById("userName");

form.addEventListener("submit", handleSubmit);
form.addEventListener("reset", handleReset);

function handleReset() {
  bmiText.textContent = 0;
  bmiText.className = "";
  descText.textContent = "N/A";
  userNameText.textContent = "Your BMI is";
}

function handleSubmit(e) {
  e.preventDefault();

  // Mengambil nilai dari input baru
  const name = form.name.value;
  const age = parseFloat(form.age.value);
  const gender = form.gender.value;
  
  const weight = parseFloat(form.weight.value);
  const height = parseFloat(form.height.value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("Please enter a valid weight and height");
    return;
  }

  const heightInMeters = height / 100; // cm -> m
  const bmi = weight / Math.pow(heightInMeters, 2);
  const desc = interpretBMI(bmi);
  
  // Mengubah teks judul dengan nama pengguna
  userNameText.textContent = name ? `${name}'s BMI is` : "Your BMI is";

  bmiText.textContent = bmi.toFixed(2);
  bmiText.className = desc;
  descText.innerHTML = `You are <strong>${desc}</strong>`;

  // Membuat objek untuk menyimpan semua data
  const userData = {
    name: name || "N/A",
    age: age || "N/A",
    gender: gender || "N/A",
    weight: weight,
    height: height,
    bmi: bmi.toFixed(2),
    bmiDescription: desc,
  };
  
  // Menyimpan objek data di localStorage
  localStorage.setItem("bmiUserData", JSON.stringify(userData));
}

function interpretBMI(bmi) {
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 25) {
    return "healthy";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
}