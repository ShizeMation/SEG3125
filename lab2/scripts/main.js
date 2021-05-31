
// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

let profileBtn = document.getElementById("profile-btn");
let productsBtn = document.getElementById("products-btn");
let cartBtn = document.getElementById("cart-btn");

function openInfo(tabName) {

	// Get all elements with class="tabcontent" and hide them
	let tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	let tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
}

profileBtn.addEventListener("click", e => {
	openInfo('Client');
	e.currentTarget.className += " active";
});
productsBtn.addEventListener("click", e => {
	openInfo('Products');
	e.currentTarget.className += " active";
});
cartBtn.addEventListener("click", e => {
	openInfo('Cart');
	e.currentTarget.className += " active";
});

// User prefs

let userLactoseFree = false;
let userNutFree = false;
let userOrganic = false;

document.getElementById("lactose-free").addEventListener("click", e => {
	userLactoseFree = e.currentTarget.checked;
});
document.getElementById("nut-free").addEventListener("click", e => {
	userNutFree = e.currentTarget.checked;
});
document.getElementById("organic").addEventListener("click", e => {
	userOrganic = e.currentTarget.checked;
});

// Product filtering

let filteredProducts = [];

productsBtn.addEventListener("click", e => {

	filteredProducts = products.filter(p => {
		if (userLactoseFree && !p.lactoseFree) {
			return false;
		}
		if (userNutFree && !p.nutFree) {
			return false;
		}
		if (userOrganic && !p.organic) {
			return false;
		}
		return true;
	});

	filteredProducts.sort((a, b) => {
		if (a.price < b.price) {
			return -1;
		}
		if (a.price > b.price) {
			return 1;
		}
		return 0;
	});

	updateProductsList();
});

function updateProductsList() {
	
	let container = document.getElementById("displayProduct");

	container.innerHTML = "";	
	for (const p of filteredProducts) {
		container.innerHTML += `
			<label data-price="${p.price}">
			<input type="checkbox">
			${p.name} ($${p.price.toFixed(2)})
			</label>
		`
	}
}

// Cart

document.getElementById("addCart").addEventListener("click", e => {

	let container = document.getElementById("displayCart");

	let selections = document.getElementById("displayProduct");

	let totalPrice = 0;
	
	container.innerHTML = "<ul>";
	for (const p of selections.children) {
		if (p.children[0].checked) {
			totalPrice += Number(p.dataset.price);
			container.innerHTML += `
				<li>
				${p.textContent.trim()}
				</li>
			`
		}
	}
	container.innerHTML += "</ul>";
	
	container.innerHTML += `<p>Total price: $${totalPrice.toFixed(2)}</p>`;
});