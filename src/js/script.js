class Slider {
    constructor({ slider, sliderLine, prev, next, direction, autoPlay, autoPlayTime }) {
        this.slider = document.querySelector(slider);
        this.sliderLine = document.querySelector(sliderLine);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.dir = direction.toUpperCase() == "Y" ? "Y" : "X"
        this.slides = [...this.sliderLine.children]
        this.sliderLine.style = `height:${this.height()}px;overflow:hidden`
        this.moveSize = this.dir == "X" ? this.sliderLine.clientWidth : this.sliderLine.clientHeight
        this.active = 0
        this.slides.forEach(((img, i) => {
            if (i !== this.active) {
                img.style.transform = `translate${this.dir}(${this.moveSize}px)`
            }
            if (i == this.slides.length - 1) {
                img.style.transform = `translate${this.dir}(${-this.moveSize}px)`
            }
        }))
        this.next.addEventListener('click', () => this.move(this.next))
        this.prev.addEventListener('click', () => this.move(this.prev))

        if (autoPlay) {
            let interval = setInterval(() => this.move(this.next), 2000);
            this.slider.addEventListener('mouseover', () => clearInterval(interval))
            this.slider.addEventListener('mouseout', () => {
                interval = setInterval(() => this.move(this.next), 2000);
            })
        }

    }
    disableBtn() {
        this.prev.disabled = true
        this.next.disabled = true
        setTimeout(() => {
            this.prev.disabled = false
            this.next.disabled = false
        }, 1100);
    }
    move(btn) {
        this.disableBtn()
        const moveSlide = btn == this.next ? -this.moveSize : this.moveSize
        this.slides.forEach((img, i) => {
            if (this.active != i) {
                img.style.transform = `translate${this.dir}(${-moveSlide}px)`
                img.style.transition = `0s`
            }
        })
        this.slides[this.active].style.transform = `translate${this.dir}(${moveSlide}px)`
        this.slides[this.active].style.transition = `1s`
        if (this.next == btn) {
            this.active++
            if (this.slides.length == this.active) {
                this.active = 0
            }
        } else {
            this.active--
            if (this.active < 0) {
                this.active = this.slides.length - 1
            }
        }
        this.slides[this.active].style.transform = `translate${this.dir}(0px)`
        this.slides[this.active].style.transition = `1s`
    }
    height() {
        const size = this.slides.map(slide => slide.clientHeight)
        return Math.max(...size)
    }
}
new Slider({
    slider: ".slider",
    sliderLine: ".slider_line",
    prev: ".slider_prev",
    next: ".slider_next",
    direction: "y",
    autoPlay:true
})

