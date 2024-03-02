const loadData = async (searchField = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchField}`)
    const data = await res.json()
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones, isShowAll)
}


const displayPhones = (phones, isShowAll) => {
    // console.log(phones)

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''

    const showAllBtn = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden')
    }
    else{
        showAllBtn.classList.add('hidden')
    }
    
    // console.log("isshow all is open ", isShowAll)

    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach((item) => {
        // console.log(item)
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card w-80 bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
            <figure><img src="${item.image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${item.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${item.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
            </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard)
    })
    toggleLoaderSpinner(false);
};


const handleSearch = (isShowAll) => {
    toggleLoaderSpinner(true);
    const searchField = document.getElementById('search-field').value;
    loadData(searchField, isShowAll)
}


const toggleLoaderSpinner = (isLoading)  => {
    const loadingBar = document.getElementById('loader-spinner')
    if(isLoading){
        loadingBar.classList.remove('hidden')
    }
    else{
        loadingBar.classList.add('hidden')
    }
}

const handleShowAll = () => {
    handleSearch(true);
}

const handleShowDetails = async (id) => {
    console.log(id)
    // const showModal = document.getElementById('show_details_modal')
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    const featuresAdd = document.getElementById('show-modal-detail-container')
    featuresAdd.innerHTML = `
        <img src="${phone.image}" alt="Shoes" />
        <h3 id="modal-phone-name" class="font-bold text-lg">${phone.name}</h3>
        <p>${phone.mainFeatures.storage}</p>
    `;
}

loadData();