/**
 * Nodo de una lista simplemente ligada.
 * Contiene un evento médico y la referencia al siguiente nodo.
 */
class Node {
    /**
     * @param {Object} data - Evento médico (consulta, urgencia, laboratorio, etc.)
     */
    constructor(data) {
        this.data = data;   // Información del evento médico
        this.next = null;   // Referencia al siguiente nodo
    }
}

/**
 * Lista simplemente ligada para historial médico.
 */
class SinglyLinkedList {
    constructor() {
        this.head = null; // Primer nodo del historial
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
        /**
         * Inserta un nuevo evento médico al inicio del historial.
         * Complejidad: O(1)
         */
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    // ---------------------------------
    // Insertar al final
    // ---------------------------------
    insertAtEnd(data) {
        /**
         * Inserta un evento médico al final del historial.
         * Complejidad: O(n)
         */
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            return;
        }

        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }

        current.next = newNode;
    }

    // ---------------------------------
    // Consultar / recorrer
    // ---------------------------------
    traverse() {
        /**
         * Recorre la lista y devuelve los eventos médicos en orden.
         * Complejidad: O(n)
         */
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
        /**
         * Elimina el evento más reciente del historial.
         * Complejidad: O(1)
         */
        if (this.isEmpty()) {
            throw new Error("El historial médico está vacío");
        }

        const removedData = this.head.data;
        this.head = this.head.next;
        return removedData;
    }

    // ---------------------------------
    // Eliminar al final
    // ---------------------------------
    removeFromEnd() {
        /**
         * Elimina el evento más antiguo del historial.
         * Complejidad: O(n)
         */
        if (this.isEmpty()) {
            throw new Error("El historial médico está vacío");
        }

        // Caso: un solo nodo
        if (this.head.next === null) {
            const removedData = this.head.data;
            this.head = null;
            return removedData;
        }

        let current = this.head;
        while (current.next.next !== null) {
            current = current.next;
        }

        const removedData = current.next.data;
        current.next = null;
        return removedData;
    }
}

// ---------------------------------------------------------
// EJEMPLO DE USO (DnD / Mundo medieval)
// Tema: Bitácora de aventuras de un personaje
// Estructura: Lista simplemente ligada (SinglyLinkedList)
// ---------------------------------------------------------

// 1) Creamos la bitácora (historial) del personaje
const adventureLog = new SinglyLinkedList();

// 2) Creamos eventos narrativos (misiones, hallazgos, combates, etc.)
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
    notes: "Tres bandidos y un lobo hambriento. El carruaje sufrió daños menores.",
    loot: ["Daga oxidada", "Mapa rasgado", "3 monedas de cobre"],
    location: "Bosque de Bruma"
};

const entry3 = {
    date: "Jueves 5 de la Luna Roja",
    type: "HALLAZGO",
    title: "Runas bajo el puente viejo",
    notes: "Encontré símbolos arcanos grabados. Algo vibra cuando acerco mi amuleto.",
    clue: "Las runas coinciden con el mapa rasgado",
    location: "Puente de Piedra Negra"
};

const entry4 = {
    date: "Viernes 6 de la Luna Roja",
    type: "NPC",
    title: "Trato con la boticaria",
    notes: "La boticaria Nyra ofreció una poción a cambio de una pluma de cuervo blanco.",
    npc: "Nyra la Boticaria",
    location: "Aldea de Dunmire"
};

// ---------------------------------------------------------
// 3) Insertamos entradas al inicio (más reciente arriba)
// ---------------------------------------------------------
adventureLog.insertAtBeginning(entry1);
adventureLog.insertAtBeginning(entry2);
adventureLog.insertAtBeginning(entry3);
adventureLog.insertAtBeginning(entry4);

// ---------------------------------------------------------
// 4) Consultar / recorrer el diario de aventuras
// ---------------------------------------------------------
console.log("📜 Diario de Aventuras (más reciente primero):");
for (const entry of adventureLog.traverse()) {
    console.log(`- [${entry.type}] ${entry.title} (${entry.date}) @ ${entry.location}`);
}

// ---------------------------------------------------------
// 5) Eliminar el evento más reciente (corregir la última entrada)
// ---------------------------------------------------------
const removedRecent = adventureLog.removeFromBeginning();
console.log("\n🧹 Se eliminó la entrada más reciente (corrección):");
console.log(`  -> [${removedRecent.type}] ${removedRecent.title} (${removedRecent.date})`);

// ---------------------------------------------------------
// 6) Insertar al final (si quieres registrar cronológicamente)
//    Ejemplo: una entrada "prólogo" más antigua
// ---------------------------------------------------------
const prologue = {
    date: "Domingo 1 de la Luna Roja",
    type: "PRÓLOGO",
    title: "El juramento del Errante",
    notes: "Prometí no volver a huir. Si hay oscuridad, la enfrentaré.",
    location: "Capilla en ruinas de Asterhold"
};

adventureLog.insertAtEnd(prologue);

// ---------------------------------------------------------
// 7) Eliminar el evento más antiguo (borrar el prólogo por retcon)
// ---------------------------------------------------------
const removedOldest = adventureLog.removeFromEnd();
console.log("\n🗑️ Se eliminó la entrada más antigua (retcon / reescritura):");
console.log(`  -> [${removedOldest.type}] ${removedOldest.title} (${removedOldest.date})`);

// ---------------------------------------------------------
// 8) Mostrar el diario final
// ---------------------------------------------------------
console.log("\n📘 Diario Final:");
console.log(adventureLog.traverse());
