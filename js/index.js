const loadPhone = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones)
}

const displayPhones = phones =>{

    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';


    //display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }


    //display only first 12 phone
    phones = phones.slice(0, 12);
    
    phones.forEach(element => {
        
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-80 pt-6 bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${element.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${element.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard)
    });

    //hide loading spinner
    toggleLoadingSpinner(false);
}

//handle search button
const handleSearch = () =>{
    toggleLoadingSpinner(true);
    const searchText = document.getElementById('search-field').value;
    loadPhone(searchText);
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