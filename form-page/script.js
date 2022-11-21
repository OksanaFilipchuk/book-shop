function focusHandler (event){
	if(event.target.classList.contains("input-invalid")){
		event.target.classList.remove("input-invalid");
		event.target.nextElementSibling.innerHTML = "";
	}
}

function getInvalidStyles(event){
	event.target.classList.add("input-invalid");
	event.target.nextElementSibling.innerHTML = "The field is invalid";
}

function checkFormValidation(){
	if(fields.every(el => el.validation === true)){
		document.querySelector("input[type = submit]").removeAttribute("disabled");
	} else document.querySelector("input[type=submit]").setAttribute("disabled", "disabled");
}

let fields = [
	{
		id: "#name",
		validation: false,
		validCondision: function(event){
			return event.target.value.length<4 || !(/^[a-zA-Z()]+$/).test(event.target.value)
		},
	},
	{
		id: "#surname",
		validation: false,
		validCondision: function(event){
			return event.target.value.length<5 || !(/^[a-zA-Z()]+$/).test(event.target.value)
		},
	},
	{
		id: "#delivery-date",
		validation: false,
		validCondision: function(event){
			let today = new Date();
			let tommorow = new Date(today.getTime() - today.getHours()*60*60*1000 - today.getMinutes()*60*1000 - today.getSeconds()*1000 + 24*60*60*1000);
			return new Date(event.target.value) < tommorow
		},
	},
	{
		id: "#street",
		validation: false,
		validCondision: function(event){
			return event.target.value.length<5 || !(/^[a-zA-Z()0-9]+$/).test(event.target.value)
		}
	},
	{
		id: "#house-number",
		validation: false,
		validCondision: function(event){
			return !(/^[0-9]+$/).test(event.target.value)
		}
	},
	{
		id: "#flat-number",
		validation: false,
		validCondision: function(event){
			return !(/^[0-9]+\x2d?[0-9]*$/).test(event.target.value)
		}
	},
]

fields.forEach(elem => {
	document.querySelector(elem.id).addEventListener("focus", focusHandler);
	document.querySelector(elem.id).addEventListener("blur", (event) => {
		if(elem.validCondision(event)){
			getInvalidStyles(event);
			elem.validation = false;
		}else {
			elem.validation = true;
		}
		checkFormValidation();
	})
})

//only 2 gifts available to choose
let giftInputs = document.querySelectorAll("input[name = gift]");
giftInputs.forEach(el => el.addEventListener("change", ()=>{
	let checkedGiftValue = Array.from(giftInputs).reduce((ac,curr) =>ac+(curr.checked?1:0), 0)
	if(checkedGiftValue === 2){
		Array.from(giftInputs).forEach(el => {if(!el.checked)el.setAttribute("disabled", "disabled")})
	}else{
		Array.from(giftInputs).forEach(el => {if(!el.checked)el.removeAttribute("disabled")})
	}
}))

