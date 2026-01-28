    "use strict";

    // ============================================================
    // 1) Tu código (lista simplemente ligada) — SIN CAMBIOS LÓGICOS
    // ============================================================

    /**
     * Nodo de una lista simplemente ligada.
     * Contiene una entrada a un diario y la referencia al siguiente nodo.
     */
    class Node {
      /**
       * @param {Object} data - Evento
       */
      constructor(data) {
        this.data = data;   // entrada del diario
        this.next = null;   // Referencia al siguiente nodo
      }
    }

    /**
     * Lista simplemente ligada para un diario
     */
    class SinglyLinkedList {
      constructor() {
        this.head = null; // Primer nodo del diario
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
         * Inserta un nuevo evento
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
         * Inserta un evento al final del diario.
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
         * Recorre la lista y devuelve los eventos
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
         * Elimina el evento más reciente del diario.
         * Complejidad: O(1)
         */
        if (this.isEmpty()) {
          throw new Error("El diario está vacío");
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
         * Elimina el evento más antiguo
         * Complejidad: O(n)
         */
        if (this.isEmpty()) {
          throw new Error("El  diario está vacío");
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

    // ============================================================
    // 2) Capa de UI (DOM) — buenas prácticas
    // ============================================================

    /**
     * Decisión de diseño:
     * - Separamos "modelo" (lista) de "vista" (DOM) para que el estudiante
     *   vea claro qué parte es estructura de datos y qué parte es interfaz.
     */
    const diary = new SinglyLinkedList();

    // DOM refs
    const $form = document.getElementById("entryForm");
    const $title = document.getElementById("title");
    const $mood = document.getElementById("mood");
    const $content = document.getElementById("content");
    const $charCount = document.getElementById("charCount");

    const $entriesContainer = document.getElementById("entriesContainer");
    const $emptyState = document.getElementById("emptyState");
    const $badge = document.getElementById("entriesBadge");
    const $opsLog = document.getElementById("opsLog");

    const $toast = document.getElementById("toast");
    const $toastMsg = document.getElementById("toastMsg");
    const $toastIcon = document.getElementById("toastIcon");

    // Buttons
    const $btnInsertBegin = document.getElementById("btnInsertBegin");
    const $btnInsertEnd = document.getElementById("btnInsertEnd");
    const $btnRemoveBegin = document.getElementById("btnRemoveBegin");
    const $btnRemoveEnd = document.getElementById("btnRemoveEnd");
    const $btnTraverse = document.getElementById("btnTraverse");
    const $btnSeed = document.getElementById("btnSeed");
    const $btnClearUI = document.getElementById("btnClearUI");
    const $btnResetAll = document.getElementById("btnResetAll");

    /**
     * Genera un ID simple para keys de UI.
     * Nota: No es parte de la estructura ligada, solo ayuda a render.
     */
    const uid = () => (crypto?.randomUUID ? crypto.randomUUID() : `id_${Date.now()}_${Math.random().toString(16).slice(2)}`);

    /**
     * Devuelve fecha/hora legible (local).
     */
    const nowStamp = () => new Date().toLocaleString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    /**
     * Sanitiza texto para evitar inyección HTML al renderizar.
     * Decisión: usamos textContent cuando se puede, pero en algunos bloques
     * armamos plantillas; por eso escapamos.
     */
    const escapeHtml = (str) =>
      String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    /**
     * Valida el formulario y construye el objeto "entrada".
     * Decisión: el "data" del nodo es un objeto con campos claros,
     * útil para que el estudiante vea que una lista puede almacenar objetos complejos.
     */
    function buildEntryFromForm() {
      const title = $title.value.trim();
      const mood = $mood.value.trim();
      const content = $content.value.trim();

      if (!title) throw new Error("El título es obligatorio.");
      if (!content) throw new Error("La entrada no puede ir vacía.");

      return {
        id: uid(),
        title,
        mood,
        content,
        createdAt: nowStamp()
      };
    }

    /**
     * Renderiza la lista actual.
     * - Usa traverse() (obligatorio para conectar UI con la estructura).
     * - Mantiene un empty state.
     */
    function renderDiary() {
      const entries = diary.traverse();

      // Badge
      $badge.textContent = `Entradas: ${entries.length}`;

      // Empty state
      $emptyState.classList.toggle("hidden", entries.length > 0);

      // Clear container
      $entriesContainer.innerHTML = "";

      // Render cards
      entries.forEach((e, index) => {
        const safeTitle = escapeHtml(e.title);
        const safeMood = escapeHtml(e.mood);
        const safeContent = escapeHtml(e.content);
        const safeDate = escapeHtml(e.createdAt);

        const card = document.createElement("article");
        card.className = "rounded-2xl border bg-white p-5 shadow-sm";

        card.innerHTML = `
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="text-base font-bold text-gray-900">${safeTitle}</h3>
              <p class="mt-1 text-xs text-gray-500">${safeDate}</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                #${index + 1}
              </span>
              <span class="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                ${safeMood}
              </span>
            </div>
          </div>

          <p class="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">${safeContent}</p>

          <div class="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
            <span class="rounded bg-gray-50 px-2 py-1">Recorrido: head → tail</span>
            <span class="rounded bg-gray-50 px-2 py-1">Dato en nodo: Object</span>
          </div>
        `;

        $entriesContainer.appendChild(card);
      });
    }

    /**
     * Agrega una línea a la bitácora.
     * Decisión: bitácora refuerza el aprendizaje (qué operación y qué efecto tuvo).
     */
    function logOp(message) {
      const line = document.createElement("div");
      line.className = "flex items-start justify-between gap-3 rounded-lg border bg-white p-3";
      line.innerHTML = `
        <div class="min-w-0">
          <p class="font-semibold text-gray-900">${escapeHtml(message)}</p>
          <p class="mt-1 text-xs text-gray-500">${escapeHtml(nowStamp())}</p>
        </div>
        <span class="shrink-0 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">log</span>
      `;
      $opsLog.prepend(line);
    }

    /**
     * Muestra un toast (Flowbite) sin dependencias extra.
     * Decisión: feedback inmediato para UX y para que el alumno vea el efecto.
     */
    function showToast(type, message) {
      const icons = {
        success: `
          <svg class="h-4 w-4 text-emerald-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        `,
        warn: `
          <svg class="h-4 w-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.516 11.59c.75 1.334-.213 2.99-1.742 2.99H3.483c-1.53 0-2.492-1.656-1.742-2.99l6.516-11.59zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z" clip-rule="evenodd"/>
          </svg>
        `,
        error: `
          <svg class="h-4 w-4 text-rose-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm2.707-10.707a1 1 0 00-1.414-1.414L10 7.586 8.707 6.293a1 1 0 00-1.414 1.414L8.586 9l-1.293 1.293a1 1 0 101.414 1.414L10 10.414l1.293 1.293a1 1 0 001.414-1.414L11.414 9l1.293-1.293z" clip-rule="evenodd"/>
          </svg>
        `
      };

      $toastIcon.innerHTML = icons[type] ?? icons.success;
      $toastMsg.textContent = message;

      $toast.classList.remove("hidden");
      // Auto-cierre simple (sin timers complejos).
      window.clearTimeout(showToast._t);
      showToast._t = window.setTimeout(() => $toast.classList.add("hidden"), 2200);
    }

    /**
     * Resetea inputs manteniendo selección de emoción.
     */
    function resetFormFields() {
      $title.value = "";
      $content.value = "";
      $charCount.textContent = `0/600`;
      $title.focus();
    }

    /**
     * Solo limpia UI (no toca la lista): útil para demostrar desacople.
     */
    function clearUIOnly() {
      $entriesContainer.innerHTML = "";
      $emptyState.classList.remove("hidden");
    }

    // ============================================================
    // 3) Eventos
    // ============================================================

    // Contador de caracteres
    $content.addEventListener("input", () => {
      $charCount.textContent = `${$content.value.length}/600`;
    });

    // Evitar submit real
    $form.addEventListener("submit", (e) => e.preventDefault());

    // Insertar al inicio
    $btnInsertBegin.addEventListener("click", () => {
      try {
        const entry = buildEntryFromForm();
        diary.insertAtBeginning(entry);
        logOp(`insertAtBeginning(): Se agregó "${entry.title}" como la entrada más reciente (head).`);
        showToast("success", "Insertado al inicio.");
        renderDiary();
        resetFormFields();
      } catch (err) {
        showToast("error", err.message);
      }
    });

    // Insertar al final
    $btnInsertEnd.addEventListener("click", () => {
      try {
        const entry = buildEntryFromForm();
        diary.insertAtEnd(entry);
        logOp(`insertAtEnd(): Se agregó "${entry.title}" como la entrada más antigua (tail).`);
        showToast("success", "Insertado al final.");
        renderDiary();
        resetFormFields();
      } catch (err) {
        showToast("error", err.message);
      }
    });

    // Eliminar al inicio
    $btnRemoveBegin.addEventListener("click", () => {
      try {
        const removed = diary.removeFromBeginning();
        logOp(`removeFromBeginning(): Se eliminó "${removed.title}" (la más reciente).`);
        showToast("warn", "Eliminado del inicio.");
        renderDiary();
      } catch (err) {
        showToast("error", err.message);
      }
    });

    // Eliminar al final
    $btnRemoveEnd.addEventListener("click", () => {
      try {
        const removed = diary.removeFromEnd();
        logOp(`removeFromEnd(): Se eliminó "${removed.title}" (la más antigua).`);
        showToast("warn", "Eliminado del final.");
        renderDiary();
      } catch (err) {
        showToast("error", err.message);
      }
    });

    // Traverse explícito
    $btnTraverse.addEventListener("click", () => {
      const entries = diary.traverse();
      logOp(`traverse(): Se recorrieron ${entries.length} nodo(s) y se renderizó el resultado.`);
      showToast("success", "Recorrido completado.");
      renderDiary();
    });

    // Seed: carga ejemplo (rápido para demo en clase)
    $btnSeed.addEventListener("click", () => {
      const samples = [
        { title: "El bug apareció otra vez", mood: "Estrés", content: "Hoy el sistema se cayó cuando nadie lo estaba viendo. Sospecho de una condición de carrera.", createdAt: nowStamp() },
        { title: "Refactor con calma", mood: "Calma", content: "Simplifiqué el flujo y ahora todo se lee mejor. Menos magia, más claridad.", createdAt: nowStamp() },
        { title: "Una idea brillante", mood: "Inspiración", content: "Me di cuenta de que la lista ligada es perfecta para entradas que crecen sin necesidad de reubicar todo.", createdAt: nowStamp() }
      ].map(e => ({ ...e, id: uid() }));

      // Decisión: mezclamos operaciones para demostrar efectos.
      diary.insertAtEnd(samples[0]);
      diary.insertAtBeginning(samples[1]);
      diary.insertAtEnd(samples[2]);

      logOp("Seed: Se cargaron 3 entradas de ejemplo (combinando inicio y final).");
      showToast("success", "Ejemplo cargado.");
      renderDiary();
    });

    // Limpiar UI (no borra lista)
    $btnClearUI.addEventListener("click", () => {
      clearUIOnly();
      logOp("UI: Se limpió la interfaz (la lista sigue intacta). Usa traverse para volver a renderizar.");
      showToast("warn", "UI limpiada.");
    });

    // Reiniciar todo (borra lista)
    $btnResetAll.addEventListener("click", () => {
      // Decisión: reiniciar es crear nueva instancia para mantener el modelo simple.
      // Alternativa: iterar removiendo nodos, pero aquí lo pedagógico es UI y operaciones base.
      // Si quieres, lo cambiamos para que haga removeFromBeginning() hasta vaciar.
      window.location.reload();
    });

    // Render inicial
    renderDiary();
