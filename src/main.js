import './assets/style.css';
import magnifyImg from './lib/index';
import img from './assets/waterDrop.jpg';

const { createApp } = Vue

createApp({
  data() {
    return {
      form: {
        src: img,
        zoom: 5,
        target: undefined,
        width: 500,
        MagnifyDomWidth: 200,
        MagnifyDomStyles: {},
        overflow: true
      },
      useMagnifyDomStyles: false,
      useMagnifyDom: false,
      MagnifyDomStyles: {
        borderRadius: '50%',
        border: '4px solid red'
      }
    }
  },
  watch: {
    useMagnifyDomStyles(n) {
      this.form.MagnifyDomStyles = n ? this.MagnifyDomStyles : {}
    },
    useMagnifyDom(n) {
      if (n) {
        this.$nextTick(() => {
          this.form.MagnifyDom = document.getElementById('show')
        })
      } else {
        delete this.form.MagnifyDom
      }
    },
    form: {
      handler() {
        // console.log(this.form);
        this.form.target.innerHTML = ''
        magnifyImg(this.form)
      },
      deep: true
    }
  },
  mounted() {
    this.form.target = document.getElementById('example')

  },
}).mount('#app')