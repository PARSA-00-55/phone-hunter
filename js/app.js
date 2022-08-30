const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = '';
  //display 20 phones only
  phones = phones.slice(0, 10);

  //display no phones found
  const noPhone = document.getElementById('no-found-message');
  if(phones.length === 0){
    noPhone.classList.remove('d-none')
  }else{
    noPhone.classList.add('d-none');
  }
  //display all phones
  phones.forEach((element) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
    <div class="card p-5">
        <img src="${element.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${element.phone_name}</h5>
            <p class="card-text">${element.slug}</p>
        </div>
    </div>
  `;
  phoneContainer.appendChild(phoneDiv)
  });
  //stop loader
  toggleSippner(false);
};

//handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    //start loader
    toggleSippner(true);
    const searchFieldValue = document.getElementById('search-field')
    const searchText = searchFieldValue.value;
    loadPhones(searchText)
})

const toggleSippner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }else{
        loaderSection.classList.add('d-none')
    }
}

// loadPhones();
