document.addEventListener("DOMContentLoaded", function() {
    const botonesMas = document.querySelectorAll(".botonMas");
    const botonesMenos = document.querySelectorAll(".botonMenos");
    const botonCompra = document.getElementById("botonCompra");

    botonesMas.forEach(botonMas => {
        botonMas.addEventListener("click", function() {
            const cantidadSpan = this.previousElementSibling;
            let cantidad = parseInt(cantidadSpan.textContent);
            cantidad++;
            cantidadSpan.textContent = cantidad;
        });
    });

    botonesMenos.forEach(botonMenos => {
        botonMenos.addEventListener("click", function() {
            const cantidadSpan = this.nextElementSibling;
            let cantidad = parseInt(cantidadSpan.textContent);
            if (cantidad > 0) {
                cantidad--;
                cantidadSpan.textContent = cantidad;
            }
        });
    });

    botonCompra.addEventListener("click", function() {
        let productosSeleccionados = document.querySelectorAll(".cantidad");
        let mensajeWhatsapp = "Buenas, me gustaría hacer el siguiente pedido:\n";

        let seleccionados = false;
        productosSeleccionados.forEach(producto => {
            const cantidad = parseInt(producto.textContent);
            if (cantidad > 0) {
                seleccionados = true;
                // Obtener el ID del set de bombones
                const setId = producto.getAttribute("id");
                // Obtener la descripción del set de bombones
                const descripcion = producto.previousElementSibling.textContent.trim();
                mensajeWhatsapp += `${descripcion} (${setId}): ${cantidad}\n`;
            }
        });

        if (seleccionados) {
            // Eliminar el último salto de línea del mensaje
            mensajeWhatsapp = mensajeWhatsapp.trim();
            
            // Construir el enlace de WhatsApp
            const phoneNumber = "+5352013170"; // Número de WhatsApp al que quieres enviar el mensaje
            const whatsappLink = `http://wa.me/${phoneNumber}?text=${encodeURIComponent(mensajeWhatsapp)}`;
            
            // Redirigir a la página de WhatsApp
            window.location.href = whatsappLink;
        } else {
            alert("!Ningún producto seleccionado!");
        }
    });
});
