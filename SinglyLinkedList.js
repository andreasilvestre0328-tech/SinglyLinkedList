/**
 * Nodo de una lista doblemente ligada.
 * Contiene un evento médico y referencias al siguiente y anterior nodo.
 */
class Node {
    /**
     * @param {Object} data - Evento médico (consulta, urgencia, laboratorio, etc.)
     */
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

/**
 * Lista doblemente ligada para historial médico.
 */
class SinglyLinkedList {
    constructor() {
        this.head = null; // Primer nodo
        this.tail = null; // Último nodo
    }

    /**
     * Verifica si la lista está vacía.
     * @returns {boolean}
     */
    isEmpty() {
        return this.head === null;
    }

    // ---------------------------------
    // Insertar al inicio
    // ---------------------------------
    insertAtBeginning(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }

    // ---------------------------------
    // Insertar al final
    // ---------------------------------
    insertAtEnd(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
            return;
        }

        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
    }

    // ---------------------------------
    // Consultar / recorrer
    // ---------------------------------
    traverse() {
        const elements = [];
        let current = this.head;

        while (current !== null) {
            elements.push(current.data);
            current = current.next;
        }

        return elements;
    }

    // ---------------------------------
    // Eliminar al inicio
    // ---------------------------------
    removeFromBeginning() {
        if (this.isEmpty()) {
            throw new Error("El historial médico está vacío");
        }

        const removedData = this.head.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }

        return removedData;
    }

    // ---------------------------------
    // Eliminar al final
    // ---------------------------------
    removeFromEnd() {
        if (this.isEmpty()) {
            throw new Error("El historial médico está vacío");
        }

        const removedData = this.tail.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }

        return removedData;
    }
}

// ---------------------------------------------------------
// EJEMPLO DE USO (DnD / Mundo medieval)
// ---------------------------------------------------------

const adventureLog = new SinglyLinkedList();

// Eventos narrativos
const entry1 = {
    date: "Martes 3 de la Luna Roja",
    type: "MISIÓN",
    title: "Encargo del gremio",
    notes: "El gremio de mercenarios pidió escoltar un carruaje hacia Dunmire.",
    reward: "25 monedas de plata",
    location: "Puerto de Vellum"
};

const entry2 = {
    date: "Miércoles 4 de la Luna Roja",
    type: "COMBATE",
    title: "Emboscada en el bosque",
    notes: "Tres bandidos y un lobo hambriento.",
    location: "Bosque de Bruma"
};

const entry3 = {
    date: "Jueves 5 de la Luna Roja",
    type: "HALLAZGO",
    title: "Runas bajo el puente viejo",
    notes: "Runas arcanas grabadas.",
    location: "Puente de Piedra Negra"
};

adventureLog.insertAtBeginning(entry1);
adventureLog.insertAtBeginning(entry2);
adventureLog.insertAtBeginning(entry3);

console.log("📜 Diario:");
console.log(adventureLog.traverse());

adventureLog.removeFromBeginning();
adventureLog.insertAtEnd({
    date: "Domingo 1 de la Luna Roja",
    type: "PRÓLOGO",
    title: "El juramento del Errante",
    location: "Asterhold"
});

console.log("\n📘 Diario Final:");
console.log(adventureLog.traverse());
