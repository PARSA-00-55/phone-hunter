const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = '';
  const showAll = document.getElementById('show-all')
  //display 10 phones only
  if(dataLimit && phones.length > 10){
      phones = phones.slice(0, 10);
      showAll.classList.remove('d-none')
  }else{
    showAll.classList.add('d-none');
  }

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
            <button onclick="loadPhoneDetails('${element.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            
        </div>
    </div>
  `;
  phoneContainer.appendChild(phoneDiv)
  });
  //stop loader
  toggleSippner(false);
};

const processSearch = (dataLimit) =>{
    toggleSippner(true);
    const searchFieldValue = document.getElementById('search-field')
    const searchText = searchFieldValue.value;
    loadPhones(searchText, dataLimit)
}

//handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    //start loader
    processSearch(10)

})

//search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(e){
  if(e.key === 'Enter'){
    processSearch(10)
  }
})

const toggleSippner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }else{
        loaderSection.classList.add('d-none')
    }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

const loadPhoneDetails = async id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data)

}

const displayPhoneDetails = phone => {
  console.log(phone)
  const modalTitle = document.getElementById('phoneDetailModalLabel');
  const phoneDetails = document.getElementById('phone-details');
  modalTitle.innerText = phone.name;
  phoneDetails.innerHTML = `
  <p>Relese Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
  <p>Brand Name: ${phone.brand}</p>
  <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'NO storage information found'}</p>
  <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth'} </p>
  `
    
}

loadPhones('apple')
