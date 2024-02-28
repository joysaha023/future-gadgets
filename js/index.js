const loadPhone = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones)
}

const displayPhones = phones =>{

    const phoneContainer = document.getElementById('phone-container')
    
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
}



loadPhone();

