document.addEventListener('DOMContentLoaded', function () {
	const countUser = document.querySelector('.count-user'),
	countComp = document.querySelector('.count-comp'),
	userField = document.querySelector('.user-field'),
	compField = document.querySelector('.comp-field'),
	sound = document.querySelector('.sound'),
	play = document.querySelector('.play'),
	out = document.querySelector('.out');

	let res = document.querySelector('.result');
	let countU = 0;
	let countC = 0;

	function choiceComp(userCh) {
		let rand = Math.floor(Math.random() * 3);	
		let fields = compField.querySelectorAll('.field');
		let fieldsUser = userField.querySelectorAll('.field'); // решение накликивания на иконку
		for (let element of fieldsUser) {
			if (element.classList.contains('active')) {
				element.classList.add('block')
			}
		}
		let button = document.querySelector('.play')
		button.classList.add('block')
		compField.classList.add('blink');
		setTimeout(() => {
			compField.classList.remove('blink');
			let compCh = fields[rand].dataset.field;
			fields.forEach(item => item.classList.remove('active'));
			fields[rand].classList.add('active');
			winner(userCh, compCh);
		}, 1000);
		
	}

	function choiceUser(e) {
		let target = e.target;
		if (target.classList.contains('field')) {
			let fields = document.querySelectorAll('.field');
			fields.forEach(item => item.classList.remove('active', 'error', 'block'));
			let userCh = target.dataset.field;
			target.classList.add('active');
			for (let element of fields) { // решение возможности клика на другие иконки
				if (element.classList.contains('active') == false) {
					element.classList.add('block')
				}
			}
			choiceComp(userCh);
		}
	}

	function winner(userCh, compCh) {
		let comb = userCh + compCh;
		let fields = document.querySelectorAll('.field');
		let button = document.querySelector('.play')
		button.classList.remove('block')

		switch (comb) {
			case 'pp':
			case 'ss':
			case 'rr':
			res.innerText = 'НИЧЬЯ!';
			fields.forEach(item => item.classList.remove('block'));
			sound.setAttribute('src', 'SOUND/Ничья.mp3');
			sound.play();
			break;
			
			case 'rs':
			case 'sp':
			case 'pr':
			res.innerText = 'ВЫ ПОБЕДИЛИ!';
			fields.forEach(item => item.classList.remove('block'));
			countU++;
			countUser.innerText = countU;
			compField.querySelector('[data-field="' + compCh + '"]').classList.add('error');
			sound.setAttribute('src', 'SOUND/Победа.mp3');
			sound.play();
			break;
			
			case 'sr':
			case 'ps':
			case 'rp':
			res.innerText = 'ПОБЕДИЛ КОМПЬЮТЕР!';
			fields.forEach(item => item.classList.remove('block'));
			countC++;
			countComp.innerText = countC;
			userField.querySelector('[data-field="' + userCh + '"]').classList.add('error');
			sound.setAttribute('src', 'SOUND/Проигрыш.mp3');
			sound.play();
			break;

			default:
			break;
		}
	}

	function playGame() {
		countU = 0;
		countC = 0;
		res.innerText = '!СДЕЛАЙТЕ ВЫБОР!';
		countUser.innerText = '0';
		countComp.innerText = '0';
		let fields = document.querySelectorAll('.field');
		fields.forEach(item => item.classList.remove('active', 'error', 'block'));
	}

	userField.addEventListener('click', choiceUser);
	play.addEventListener('click', playGame);


});
