// Radio Toggle
document.addEventListener('DOMContentLoaded', function () {
	const consideringRadio = document.getElementById('considering');
	const notConsideringRadio = document.getElementById('not-considering');
	const coatingOptions = document.getElementById('coating-options');

	function toggleCoatingOptions() {
		if (consideringRadio.checked) {
			coatingOptions.classList.add('visible');
		} else {
			coatingOptions.classList.remove('visible');
		}
	}

	consideringRadio.addEventListener('change', toggleCoatingOptions);
	notConsideringRadio.addEventListener('change', toggleCoatingOptions);
});

// File Upload preview
document.addEventListener('DOMContentLoaded', function () {
	const fileInputs = document.querySelectorAll('.file-input');

	fileInputs.forEach((input) => {
		input.addEventListener('change', function (e) {
			const fileName =
				e.target.files[0]?.name || 'ファイルが選択されていません';
			const fileNameElement = this.nextElementSibling.nextElementSibling;
			fileNameElement.textContent = fileName;
		});
	});
});

// Default Check all if parent is clicked
document.addEventListener('DOMContentLoaded', function () {
	function handleMainCheckbox(mainCheckboxId) {
		const mainCheckbox = document.getElementById(mainCheckboxId);
		const coatingGroup = mainCheckbox.closest('.coating-group');
		const subCheckboxes = coatingGroup.querySelectorAll('.sub-checkbox');

		mainCheckbox.addEventListener('change', function () {
			subCheckboxes.forEach((checkbox) => {
				checkbox.checked = this.checked;
			});
		});
	}

	handleMainCheckbox('water-coating');
	handleMainCheckbox('mold-coating');
	handleMainCheckbox('cross-coating');
	handleMainCheckbox('maintenance-preference');
	handleMainCheckbox('cost-preference');
	handleMainCheckbox('desired-coating-type');
});

// Form Validation
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('contactForm');
	form.setAttribute('novalidate', '');

	// Add error messages for required inputs
	const requiredInputs = form.querySelectorAll('input[required]');
	requiredInputs.forEach((input) => {
		if (!input.nextElementSibling?.classList.contains('error-message')) {
			const errorMessage = document.createElement('span');
			errorMessage.className = 'error-message';
			errorMessage.textContent = 'この項目は必須です';
			input.parentNode.insertBefore(errorMessage, input.nextSibling);
		}
	});

	// Add error messages for required radio groups
	const radioGroups = form.querySelectorAll('.radio-group');
	radioGroups.forEach((group) => {
		if (group.querySelector('input[required]')) {
			const errorMessage = document.createElement('span');
			errorMessage.className = 'error-message';
			errorMessage.textContent = '選択してください';
			group.appendChild(errorMessage);
		}
	});

	// Add error messages for required checkbox groups
	const checkboxGroups = form.querySelectorAll('.checkbox-group');
	checkboxGroups.forEach((group) => {
		if (group.querySelector('input[required]')) {
			const errorMessage = document.createElement('span');
			errorMessage.className = 'error-message';
			errorMessage.textContent = '1つ以上選択してください';
			group.appendChild(errorMessage);
		}
	});

	// Input validation
	form.addEventListener('input', function (e) {
		if (e.target.tagName === 'INPUT') {
			e.target.classList.add('touched');
			validateField(e.target);
		}
	});

	// Blur validation
	form.addEventListener(
		'blur',
		function (e) {
			if (e.target.tagName === 'INPUT') {
				e.target.classList.add('touched');
				validateField(e.target);
			}
		},
		true
	);

	// Form submission
	form.addEventListener('submit', function (e) {
		e.preventDefault();

		let isValid = true;

		// Validate all required inputs
		requiredInputs.forEach((input) => {
			input.classList.add('touched');
			if (!validateField(input)) {
				isValid = false;
			}
		});

		// Validate radio groups
		radioGroups.forEach((group) => {
			if (
				group.querySelector('input[required]') &&
				!validateRadioGroup(group)
			) {
				isValid = false;
			}
		});

		// Validate checkbox groups
		checkboxGroups.forEach((group) => {
			if (
				group.querySelector('input[required]') &&
				!validateCheckboxGroup(group)
			) {
				isValid = false;
			}
		});

		if (isValid) {
			// If valid, submit the form to confirmation page
			window.location.href = form.getAttribute('action');
		} else {
			// Scroll to first error
			const firstError = form.querySelector(
				'.error.touched, .radio-group.error, .checkbox-group.error'
			);
			if (firstError) {
				firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
				const firstInput = firstError.querySelector('input');
				if (firstInput) firstInput.focus();
			}
		}
	});

	function validateField(input) {
		input.classList.remove('error');

		if (!input.required && !input.value) {
			return true;
		}

		let isValid = true;
		const value = input.value.trim();

		// Required field validation
		if (input.required && !value) {
			isValid = false;
			input.nextElementSibling.textContent = 'この項目は必須です';
		}

		// Email validation
		if (input.type === 'email' && value) {
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailPattern.test(value)) {
				isValid = false;
				input.nextElementSibling.textContent =
					'有効なメールアドレスを入力してください';
			}
		}

		// Phone validation
		if (input.type === 'tel' && value) {
			const phonePattern = /^[0-9-]*$/;
			if (!phonePattern.test(value)) {
				isValid = false;
				input.nextElementSibling.textContent =
					'有効な電話番号を入力してください';
			}
		}

		if (!isValid) {
			input.classList.add('error');
		}

		return isValid;
	}

	function validateRadioGroup(group) {
		group.classList.remove('error');
		const radios = group.querySelectorAll('input[type="radio"]');
		const isChecked = Array.from(radios).some((radio) => radio.checked);

		if (!isChecked) {
			group.classList.add('error');
			return false;
		}
		return true;
	}

	function validateCheckboxGroup(group) {
		group.classList.remove('error');
		const checkboxes = group.querySelectorAll('input[type="checkbox"]');
		const isChecked = Array.from(checkboxes).some(
			(checkbox) => checkbox.checked
		);

		if (!isChecked) {
			group.classList.add('error');
			return false;
		}
		return true;
	}
});
