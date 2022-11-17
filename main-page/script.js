	function showPageContent(){
	let cart = [];
	let cartSum = 0;
	let root = document.querySelector(".root");

	let headerFragment = document.createDocumentFragment();
	let header = document.createElement("header");
	let headerContainer = document.createElement("div");
	headerContainer.className = "container";
	headerContainer.classList.add("header-container")
	header.appendChild(headerContainer);
	headerFragment.appendChild(header);
	headerContainer.innerHTML = `<div>
																<h1>Book shop</h1>
																<q class = "quot">Live as if you were to die tomorrow. Learn as if you were to live forever</q>
																<p class = "author">Mahatma Gandhi</p>
															</div>`;
	let cartWrapper = document.createElement("div");
	cartWrapper.innerHTML = `<img src="./images/shopping-bag.svg" class = "shopping-bag"></img>`;
	let shoppingBagCounter = document.createElement("div");
	shoppingBagCounter.className = "shopping-bag-counter";
	shoppingBagCounter.textContent= "0$";
	cartWrapper.appendChild(shoppingBagCounter);
	cartWrapper.className = "cart-wrapper"
	cartWrapper.addEventListener("click", showCart);
	headerContainer.appendChild(cartWrapper);
	let confirmOrderButton = document.createElement("button");
	let buttonLink = document.createElement("a");
	buttonLink.className = "button-link";
	buttonLink.setAttribute("href", "../form-page/index.html");
	buttonLink.appendChild(confirmOrderButton);
	confirmOrderButton.className = "confirm-order-button";
	confirmOrderButton.textContent = "Confirm order";
	cartWrapper.appendChild(buttonLink);
	let cartMenuBackground = document.createElement("div");
	cartMenuBackground.className = "cart-menu";
	let cartMenuWrapper = document.createElement("div");
	cartMenuWrapper.className = "cart-menu-wrapper";
	cartMenuBackground.appendChild(cartMenuWrapper);
	header.appendChild(cartMenuBackground);

	let mainFragment = document.createDocumentFragment();
	let main = document.createElement("main");
	let mainContainer = document.createElement("div");
	mainContainer.className = "container";
	let catalogWrapper = document.createElement("div");
	catalogWrapper.className = "catalog-wrapper";
	let catalogHeader = document.createElement("h3")
	catalogHeader.textContent = "Catalog";
	catalogHeader.className = "catalog-header";
	let catalog = document.createElement("div");
	catalog.className = "catalog";
	catalogWrapper.appendChild(catalogHeader);
	catalogWrapper.appendChild(catalog);
	main.appendChild(mainContainer);
	mainContainer.appendChild(catalogWrapper);
	mainFragment.appendChild(main)

	let footerFragment = document.createDocumentFragment();
	let footer = document.createElement("footer");
	footerFragment.appendChild(footer)
	footer.innerHTML = `<div class = "container footer-container">
												<ul class = "social-media">
													<li class = "social-media-item">
														<img src="./images/facebook.svg" class="social-media-img" alt="Facebook">
														<a href = "https://www.facebook.com/" class = "social-media-link">Facebook</a>
													</li>
													<li class = "social-media-item">
														<img src="./images/twitter.svg" class="social-media-img" alt="Twitter">
														<a href = "https://twitter.com/" class = "social-media-link">Twitter</a>
													</li>
													<li class = "social-media-item">	
														<img src="./images/instagram.svg" class="social-media-img" alt="Instagram">
														<a href = "https://www.instagram.com/" class = "social-media-link">Instagram</a>
													</li>
												</ul>
												<nav>
												<ul class="nav-list">
													<li class="nav-list-item"><a href="#" class="nav-list-item-link nav-list-item-link-active">About</a></li>
													<li class="nav-list-item"><a href="#" class="nav-list-item-link">Delivery</a></li>
													<li class="nav-list-item"><a href="#" class="nav-list-item-link">Contact us</a></li>
												</ul>
											</nav>
											</div>`

	root.appendChild(headerFragment);
	root.appendChild(mainFragment);
	root.appendChild(footerFragment);

	function displayCartContent(){
		if(cart.length>0){
			cart.forEach(el => {
				const bookBlock = document.createElement("div");
				bookBlock.classList = "cart-book-block";
				bookBlock.innerHTML = `<img src = "${el.imageLink}" alt = "${el.title}" class = "cart-book-img">
															<h4 class = "cart-book-title">${el.title}</h4>
															<h5 class = "cart-book-author">${el.author}</h5>
															<span class = "cart-book-price">${el.price}$</span>
															<span class = "cart-book-number">${el.number}</span>
															<span class = "cart-book-sum">${el.number*el.price}$</span>`;
				let removeBook = document.createElement("img");
				removeBook.setAttribute("src", "./images/trash.svg");
				removeBook.setAttribute("alt", "remove");
				removeBook.classList.add("remove-book")
				removeBook.addEventListener("click", ()=>{
					cart.splice(cart.indexOf(el),1);
					cartMenuWrapper.innerHTML= null;
					displayCartContent();
					updateCartSum();
				})
				bookBlock.appendChild(removeBook)
				cartMenuWrapper.appendChild(bookBlock)	
			})
			confirmOrderButton.disabled= false;
		} else {
			let message = document.createElement("p");
			message.textContent = "Your cart is empty(";
			message.classList = "message"
			cartMenuWrapper.appendChild(message);
			confirmOrderButton.disabled = true;
		}	

	}

	function showCart(){
		if(cartMenuBackground.classList.contains("cart-menu-active")){
			cartMenuBackground.classList.remove("cart-menu-active");
			document.querySelector("body").classList.remove("body-active-menu");
			cartWrapper.classList.remove("cart-wrapper-active");
			confirmOrderButton.classList.remove("confirm-order-button-active")
		} else {
			cartMenuBackground.classList.add("cart-menu-active");
			document.querySelector("body").classList.add("body-active-menu");		
			cartWrapper.classList.add("cart-wrapper-active");
			confirmOrderButton.classList.add("confirm-order-button-active")
			cartMenuWrapper.innerHTML = null;
			displayCartContent()
		}
	}

	function updateCartSum(){
		if(cart.length === 0){
			cartSum = 0;
		} else if(cart.length===1){
			cartSum = cart[0].price *cart[0].number;
		}else {
			cartSum = cart.reduce((accum,current)=>	accum + current.price * current.number,
			0)
		}
		shoppingBagCounter.textContent = cartSum +" $";
	}

	function showBooks(data){
		data.forEach((el, index)=>{

			function showPopUp(){
				popUpBackground.classList.add("pop-up-background-active");
				document.querySelector("body").classList.add("body-active-menu");

			}
			function closePopUp (){
				popUpBackground.classList.remove("pop-up-background-active");
				document.querySelector("body").classList.remove("body-active-menu");	
			}

			const bookBlock = document.createElement("div");
			bookBlock.classList = "book-block";
			bookBlock.innerHTML = `<img src = "${el.imageLink}" alt = "${el.title}" class = "book-img">
														<h4 class = "book-title">${el.title}</h4>
														<h5 class = "book-author">${el.author}</h5>
														`;
			let readMore = document.createElement("span");
			readMore.className = "read-more";
			readMore.textContent = "Read more";
			bookBlock.appendChild(readMore);			
			let popUpBackground = document.createElement("div");
			popUpBackground.className = "pop-up-background";
			let popUpBlock = document.createElement("div");
			popUpBlock.className = "pop-up-block";
			popUpBlock.textContent = el.description;
			let closePopUpButton = document.createElement("p");
			closePopUpButton .className = "close-pop-up";
			closePopUpButton .textContent = "x";
			closePopUpButton .addEventListener("click", closePopUp)
			popUpBackground.appendChild(popUpBlock);
			popUpBlock.appendChild(closePopUpButton );
			bookBlock.appendChild(popUpBackground);
			readMore.addEventListener("click", showPopUp);

			let bookPrice = document.createElement("span");
			bookPrice.className = "book-price";
			bookPrice.textContent = el.price+"$";
			bookBlock.appendChild(bookPrice);
			let buyButton = document.createElement("button");
			buyButton.className = "buy-button";
			buyButton.textContent = "Buy book";
			bookBlock.appendChild(buyButton);
			buyButton.addEventListener("click", ()=>{
				if(cart.includes(data[index])){
					cart[cart.indexOf(data[index])].number = cart[cart.indexOf(data[index])].number + 1;				
				}else {
					data[index].number = 1;
					cart.push(data[index]);
				}
				updateCartSum()
			})													 
			catalog.appendChild(bookBlock);	
		})

	}

	fetch('books.json')
		.then(response => {
			return response.json();
		})
		.then(data => {
			showBooks(data);
		});

}

showPageContent();
let readMore = Array.from(document.getElementsByClassName("read-more"));
console.log(readMore)
readMore.forEach(el => el.addEventListener("click", ()=>console.log("lll")))
// for(let el of readMore){
// 		el.addEventListener("click", (event)=>{
// 			event.preventDefault();
// 			console.log("KKK")
// 		})
// 	}
