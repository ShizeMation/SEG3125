
// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

// User prefs

let userLactoseFree = false;
let userNutFree = false;
let userOrganic = false;

document.getElementById("lactose-free").addEventListener("click", e => {
	userLactoseFree = e.currentTarget.checked;
	filterProducts();
});
document.getElementById("nut-free").addEventListener("click", e => {
	userNutFree = e.currentTarget.checked;
	filterProducts();
});
document.getElementById("organic").addEventListener("click", e => {
	userOrganic = e.currentTarget.checked;
	filterProducts();
});

// Product filtering

let filteredProducts = [];

function filterProducts() {

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
}

function updateProductsList() {
	
	let container = document.getElementById("displayProduct");

	container.innerHTML = "";
	for (const p of filteredProducts) {
		container.innerHTML += `
			<label data-price="${p.price}">
			<input type="checkbox">
			${p.name} ($${p.price.toFixed(2)})
			</label>
		`;
	}
}

filterProducts();

// Cart

document.getElementById("addCart-btn").addEventListener("click", e => {

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
			`;
		}
	}
	container.innerHTML += "</ul>";
	
	container.innerHTML += `<p>Total price: $${totalPrice.toFixed(2)}</p>`;
});