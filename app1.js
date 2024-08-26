const { createApp } = Vue;

createApp({
    data() {
        return {
            fraces: JSON.parse(localStorage.getItem('frases')) || [
                { texto: 'La vida es bella', autor: 'Desconocido' },
                { texto: 'El que no arriesga no gana', autor: 'Proverbio popular' },
                { texto: 'El conocimiento es poder', autor: 'Francis Bacon' },
                { texto: 'La imaginación lo es todo', autor: 'Albert Einstein' },
                { texto: 'La suerte favorece a los audaces', autor: 'Virgilio' }
            ],
            nuevaFrase: '',
            nuevoAutor: '',
            esEditando: false,
            indiceSeleccionado: null,
            mensaje: '',
            tipoMensaje: '' 
        };
    },
    methods: {
        guardarFrases() {
            localStorage.setItem('frases', JSON.stringify(this.fraces));
        },
        agregarFrase() {
            if (this.nuevaFrase && this.nuevoAutor) {
                this.fraces.push({ texto: this.nuevaFrase, autor: this.nuevoAutor });
                this.mostrarMensaje('Frase agregada con éxito', 'info');
                this.guardarFrases(); // Guardar en localStorage
            } else {
                this.mostrarMensaje('Por favor completa ambos campos', 'info');
            }
            this.nuevaFrase = '';
            this.nuevoAutor = '';
        },
        prepararEdicion(index) {
            const frase = this.fraces[index];
            this.nuevaFrase = frase.texto;
            this.nuevoAutor = frase.autor;
            this.indiceSeleccionado = index;
            this.esEditando = true;
        },
        actualizarFrase() {
            if (this.indiceSeleccionado !== null) {
                Object.assign(this.fraces[this.indiceSeleccionado], {
                    texto: this.nuevaFrase,
                    autor: this.nuevoAutor
                });
                this.mostrarMensaje('Frase actualizada con éxito', 'info');
                this.cancelarEdicion();
                this.guardarFrases(); // Guardar en localStorage
            }
        },
        eliminarFrase(index) {
            this.fraces.splice(index, 1);
            this.mostrarMensaje('Frase eliminada con éxito', 'error');
            this.guardarFrases(); // Guardar en localStorage
        },
        cancelarEdicion() {
            this.esEditando = false;
            this.nuevaFrase = '';
            this.nuevoAutor = '';
            this.indiceSeleccionado = null;
        },
        mostrarMensaje(texto, tipo) {
            this.mensaje = texto;
            this.tipoMensaje = tipo;
            setTimeout(() => this.mensaje = '', 3000);
        }
    }
}).mount('#myapp');

