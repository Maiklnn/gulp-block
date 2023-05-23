class Сommon {

	constructor() {
		this.events();
	}

	events() {
		document.addEventListener('click', e => {
			this.target = e.target;
			// close
			this.close = this.target.dataset.close || this.target.dataset.target
			if (this.close) this.closes();
		});
	}

	closes() {
		this.windowClose = this.target.closest(`[data-target]`)
		this.windowClose.classList.remove('is-open')
		let arrClose = this.windowClose.dataset.target.split('--')
		if(!arrClose[1]) setTimeout(() => { this.windowClose.remove(); }, 1000);
	}
}

new Сommon();






class Gallery {

	constructor() {
		this.events();
	}

	events() {
		document.addEventListener('click', e => {
			this.target = e.target;

			// click
			this.clickedElement = this.target.closest('[data-gallery]');
			if (this.clickedElement) {
				e.preventDefault();
				this.gallery();
			}


		});


	}

	gallery() {

		if (this.clickedElement.dataset.gallery) {

			this.gal = document.querySelector(this.clickedElement.dataset.gallery)
			this.images = [...this.gal.querySelectorAll('[data-gallery]')]
			this.images.forEach(item => {
				if(item.dataset.click) item.removeAttribute('data-click')
			})
			this.clickedElement.setAttribute('data-click', '1')
			this.indexClick = this.images.findIndex(item => {
				if(item.dataset.click) return true
			})
		}

		this.loadModal()
	}

	loadModal() {
		let parentLoad = this.clickedElement.parentElement.dataset.load
		const imgSrc = (parentLoad) ? parentLoad : this.clickedElement.src
		const modal = 'path1';

		let popup = {
				path1 : `
			            <div class="modal-popup" data-target="gallery">
		                    <div class="modal-popup__close" data-close="1"></div>
		                    <div class="modal-popup__container modal-popup__load">
		                        <img src="${imgSrc}" alt="">
		                    </div>
		                </div>	
						`,
		};


		document.body.insertAdjacentHTML('beforeend', eval(`popup.${modal}`))
		this.modal = document.querySelector(`[data-target="gallery"]`); // search modal in dom
		setTimeout(() => { this.modal.classList.add('is-open'); }, 10);
	}
}

new Gallery({});



class Modal{

	constructor(options) {
		this.modalShow = options.show;
		this.modalShow ? this.open() : this.events();

	}

	events() {
		document.addEventListener('click', e => {
			this.target = e.target;
			// click
			this.clickedElement = this.target.closest('[data-path]');
			if (this.clickedElement) {
				e.preventDefault();
				this.open();
			}
		});
	}

	open() {
		this.path = (this.modalShow) ? this.modalShow : this.clickedElement.dataset.path;
		this.arrData = this.path.split('--')
		const dom = this.arrData.find(item => item === "dom");

		if(!dom) {
			this.popup()
		}
		console.log(this.arrData[0]);
		this.modal = document.querySelector(`[data-target*="${this.arrData[0]}"]`); // search modal in dom
		setTimeout(() => { this.modal.classList.add('is-open'); }, 10);

	}

	popup() {
		let popup = {
			first : `
		            <div class="modal-popup" data-target="first">
	                    <div class="modal-popup__close" data-close="1"></div>
	                    <div class="modal-popup__container"><div data-path = 'confirm'>Заказать</div>
	                    </div>
	                </div>	
				  `,
			confirm : `
		            <div class="modal-popup" data-target="confirm">
	                    <div class="modal-popup__close" data-close="1"></div>
	                    <div class="modal-popup__container"><div data-path = 'confirm'>Спасибо за заказ</div>
	                    </div>
	                </div>	
				  `,
		};

		document.body.insertAdjacentHTML('beforeend', eval(`popup.${this.arrData[0]}`))

	}
}

new Modal({
	options: {
		timeout: '300',
		inDom: true,
	},
	// show: 'free--dom',
});
