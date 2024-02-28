const loadPhone = async (searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) =>{

    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';


    //display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }


    //display only first 12 phone
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
    
    phones.forEach(element => {
        // console.log(element)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-80 pt-6 bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${element.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${element.phone_name}</h2>
          <p>This is best phone for you. you can buy and enjoy with this phone </p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${element.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard)
    });

    //hide loading spinner
    toggleLoadingSpinner(false);
}

//
const handleShowDetails = async (id) => {
    // console.log("clicked show details", id)
    //load single phone data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)
}


const showPhoneDetails = (phone) => {
    console.log(phone);
    show_details_modal.showModal()
}

//handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchText = document.getElementById('search-field').value;
    loadPhone(searchText, isShowAll);
}


const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loader-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

const handleshowAll = () =>{
    handleSearch(true);
}