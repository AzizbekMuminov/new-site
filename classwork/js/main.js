var all = [];

setUp();

function setUp(){
	var fromStorage = localStorage.getItem('items');

	if(fromStorage !== null)
		all = JSON.parse(fromStorage);

	render();
}

function add(){
	var elem = document.querySelector("#product");
	
	if(elem.value === "")
		return;
	var name = parseInt(elem.value);
	elem.value = "";

	name = {price: name};
	all.push(name);
	localStorage.setItem('items', JSON.stringify(all));
	
	render();	
}

function closeItem(itemIndex){
	all.splice(itemIndex, 1);
	localStorage.setItem('items', JSON.stringify(all));
	render();	
}

function clearAll(){
	all = [];
	localStorage.setItem('items', null);
	render();
}

function render(){
	document.querySelector("#product-list").innerHTML =  "";
	var sum = 0;
	var elem = document.querySelector("#sum");

	for(var i = 0; i < all.length; i ++){
		sum += all[i].price;
		document.querySelector("#product-list").innerHTML += 
			`<li class="list-group-item d-flex justify-content-between align-items-center"><h5>$  ${all[i].price}</h5> <a href="#" onClick="closeItem(${i});">X</a></li>`;	
	}
	
	var t = sum;
	elem.innerHTML = `<div class="d-flex justify-content-between align-items-center">
		<h3>Total sum:</h3> <h2><strong>${t}$</strong></h2>
		</div>`;
}

function downloadAll(){
	var content = "price\n";

	for (var i = 0;i < all.length; i++) {
		content += all[i].price + "\n";
	}

	content += "\n";

	download(content, "chto-to-tam.csv", 'text/csv');
}


function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) 
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

//https://github.com/AzizbekMuminov/new-site.git