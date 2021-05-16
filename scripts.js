forButton.addEventListener('click', ev => {
	addReason(forReason, forList)
});

againstButton.addEventListener('click', ev => {
	addReason(againstReason, againstList)
});

forReason.addEventListener('keydown', ev => {
	if (ev.key == "Enter") {
		forButton.click();
	}
})

againstReason.addEventListener('keydown', ev => {
	if (ev.key == "Enter") {
		againstButton.click();
	}
})

function addReason(reasonInput, list) {
	const item = document.createElement('li');

	const span = document.createElement('span');
	span.textContent = reasonInput.value;
	reasonInput.value = null;

	const slider = document.createElement('input');
	slider.type = "range";
	slider.min = 1;
	slider.value = 100;
	slider.max = 100;

	const output = document.createElement('output');
	slider.addEventListener('input', ev => {
		output.textContent = slider.value;
		recalculate();
	})
	output.textContent = slider.value;

	const span2 = document.createElement('span');
	const span3 = document.createElement('span');
	span3.textContent = "%";

	item.appendChild(span);
	item.appendChild(slider);
	item.appendChild(span2);
	span2.appendChild(output);
	span2.appendChild(span3);
	list.appendChild(item);
	recalculate();
}

function recalculate() {
	const forPercent = sumThem(document.querySelectorAll("#forList input[type=range]"));
	const againstPercent = sumThem(document.querySelectorAll("#againstList input[type=range]"));
	const final = forPercent - againstPercent;
	document.documentElement.style.setProperty('--rotate', `${final/400}turn`);
	if(final > 0) {
		document.documentElement.style.setProperty('--color', "green");
	} else {
		document.documentElement.style.setProperty('--color', "red");
	}
	if (Math.abs(final) < 25) document.documentElement.style.setProperty('--color', "yellow");				

	conclusion.textContent = `For: ${forPercent}%, Against: ${againstPercent}% - on balance: ${final}%`
}

function sumThem(inputs) {
	if(!inputs.length) return 0;
	return Math.floor(Array.from(inputs).map((inp) => parseInt(inp.value)).reduce((a, b) => a + b, 0) / inputs.length);
}
