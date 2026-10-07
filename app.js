/**
 * Rocket Pizza Lunar - Sistema de Control de la SPA
 * Arquitectura Modular SDD (Gentle-AI) - Seminario iTec 2026
 *
 * Módulos implementados en T2:
 * 1. StorageManager: Persistencia segura con try...catch para tema y carrito.
 * 2. Store: Estado reactivo centralizado con patrón Observador (subscribe/notify).
 * 3. ThemeManager: Alternancia accesible de temas (Dark / Light) con SVG y ARIA.
 * 4. Inicialización y sincronización en DOMContentLoaded.
 */

// =============================================================================
// 1. GESTOR DE ALMACENAMIENTO SEGURO (StorageManager)
// =============================================================================

const StorageManager = {
  KEYS: {
    THEME: 'rocket_pizza_theme',
    CART: 'rocket_pizza_cart'
  },

  /**
   * Comprueba si localStorage está disponible y operativo en el entorno.
   * @returns {boolean}
   */
  isAvailable() {
    try {
      const testKey = '__rocket_storage_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      console.warn('[StorageManager] localStorage restringido o no disponible:', error);
      return false;
    }
  },

  /**
   * Recupera el tema guardado en localStorage.
   * @returns {'dark'|'light'|null}
   */
  getTheme() {
    try {
      if (!this.isAvailable()) return null;
      const savedTheme = window.localStorage.getItem(this.KEYS.THEME);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      return null;
    } catch (error) {
      console.warn('[StorageManager] Error al recuperar tema guardado:', error);
      return null;
    }
  },

  /**
   * Guarda la preferencia de tema en localStorage.
   * @param {'dark'|'light'} theme
   * @returns {boolean}
   */
  setTheme(theme) {
    if (theme !== 'dark' && theme !== 'light') return false;
    try {
      if (!this.isAvailable()) return false;
      window.localStorage.setItem(this.KEYS.THEME, theme);
      return true;
    } catch (error) {
      console.warn('[StorageManager] Error al persistir tema:', error);
      return false;
    }
  },

  /**
   * Recupera el estado guardado del carrito y pedido con manejo de excepciones (REQ-UNW-04).
   * Si la información está corrupta, purga la clave y retorna null de forma segura.
   * @returns {Object|null}
   */
  getCart() {
    try {
      if (!this.isAvailable()) return null;
      const raw = window.localStorage.getItem(this.KEYS.CART);
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      if (typeof parsed !== 'object' || parsed === null) {
        this.clearCart();
        return null;
      }
      return parsed;
    } catch (error) {
      console.warn('[StorageManager] Fallo de deserialización en rocket_pizza_cart. Purgando datos corruptos (REQ-UNW-04):', error);
      this.clearCart();
      return null;
    }
  },

  /**
   * Serializa y persiste el estado del carrito en localStorage.
   * @param {Object} cartData
   * @returns {boolean}
   */
  setCart(cartData) {
    try {
      if (!this.isAvailable()) return false;
      window.localStorage.setItem(this.KEYS.CART, JSON.stringify(cartData));
      return true;
    } catch (error) {
      console.warn('[StorageManager] Error al guardar rocket_pizza_cart:', error);
      return false;
    }
  },

  /**
   * Elimina la clave de carrito de localStorage.
   * @returns {boolean}
   */
  clearCart() {
    try {
      if (!this.isAvailable()) return false;
      window.localStorage.removeItem(this.KEYS.CART);
      return true;
    } catch (error) {
      console.warn('[StorageManager] Error al remover rocket_pizza_cart:', error);
      return false;
    }
  }
};

// =============================================================================
// 1.5 BIOVALIDATOR: MATRIZ DE TOXICIDAD Y BIOCOMPATIBILIDAD (Tarea T3)
// =============================================================================

const BioValidator = {
  /**
   * Catálogo maestro de ingredientes con metadatos toxicológicos por especie.
   */
  INGREDIENTS: {
    'muzzarella': {
      id: 'muzzarella',
      name: 'Muzzarella Lunar',
      iconSvg: '<svg class="w-4 h-4 text-amber-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 13.5C3 8 7 4 12 4c5 0 9 4 9 9.5a5.5 5.5 0 0 1-5.5 5.5H8.5A5.5 5.5 0 0 1 3 13.5z"/><circle cx="8" cy="11" r="1.5"/><circle cx="15" cy="13" r="2"/><circle cx="11" cy="15" r="1"/></svg>',
      emoji: '<svg class="w-4 h-4 text-amber-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 13.5C3 8 7 4 12 4c5 0 9 4 9 9.5a5.5 5.5 0 0 1-5.5 5.5H8.5A5.5 5.5 0 0 1 3 13.5z"/><circle cx="8" cy="11" r="1.5"/><circle cx="15" cy="13" r="2"/><circle cx="11" cy="15" r="1"/></svg>',
      price: 2.0,
      toxicFor: [],
      category: 'terrestrial',
      description: 'Lácteo cultivado en biosfera orbital'
    },
    'pepperoni': {
      id: 'pepperoni',
      name: 'Pepperoni Galáctico',
      iconSvg: '<svg class="w-4 h-4 text-red-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="9" r="6"/><circle cx="16" cy="15" r="5"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="10" cy="11" r="0.8" fill="currentColor"/><circle cx="15" cy="14" r="0.8" fill="currentColor"/><circle cx="17" cy="16" r="0.8" fill="currentColor"/></svg>',
      emoji: '<svg class="w-4 h-4 text-red-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="9" r="6"/><circle cx="16" cy="15" r="5"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="10" cy="11" r="0.8" fill="currentColor"/><circle cx="15" cy="14" r="0.8" fill="currentColor"/><circle cx="17" cy="16" r="0.8" fill="currentColor"/></svg>',
      price: 3.0,
      toxicFor: [],
      category: 'terrestrial',
      description: 'Curado al vacío con especias terrestres'
    },
    'bacon': {
      id: 'bacon',
      name: 'Bacon Cósmico',
      iconSvg: '<svg class="w-4 h-4 text-rose-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8c3-2 6 2 9 0s6-2 9 0v4c-3-2-6 2-9 0s-6-2-9 0V8z"/><path d="M3 15c3-2 6 2 9 0s6-2 9 0v2c-3-2-6 2-9 0s-6-2-9 0v-2z"/></svg>',
      emoji: '<svg class="w-4 h-4 text-rose-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8c3-2 6 2 9 0s6-2 9 0v4c-3-2-6 2-9 0s-6-2-9 0V8z"/><path d="M3 15c3-2 6 2 9 0s6-2 9 0v2c-3-2-6 2-9 0s-6-2-9 0v-2z"/></svg>',
      price: 3.0,
      toxicFor: [],
      category: 'terrestrial',
      description: 'Ahumado en hidroponia orbital'
    },
    'provolone': {
      id: 'provolone',
      name: 'Provolone de Asteroide',
      iconSvg: '<svg class="w-4 h-4 text-amber-200 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 19 18-3V9L3 12v7z"/><path d="m3 12 9-8 9 5"/><circle cx="8" cy="15" r="1"/><circle cx="14" cy="13" r="1.25"/></svg>',
      emoji: '<svg class="w-4 h-4 text-amber-200 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 19 18-3V9L3 12v7z"/><path d="m3 12 9-8 9 5"/><circle cx="8" cy="15" r="1"/><circle cx="14" cy="13" r="1.25"/></svg>',
      price: 2.5,
      toxicFor: [],
      category: 'terrestrial',
      description: 'Maduración en baja gravedad'
    },
    'morron': {
      id: 'morron',
      name: 'Morrón de Marte',
      iconSvg: '<svg class="w-4 h-4 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v4"/><path d="M9 4c2 .5 4 .5 6 0"/><path d="M6 9c0 7 2 12 6 12s6-5 6-12a4 4 0 0 0-4-3c-1.5 1-2.5 1-4 0a4 4 0 0 0-4 3z"/><path d="M10 9c0 6 1 10 2 10s2-4 2-10"/></svg>',
      emoji: '<svg class="w-4 h-4 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v4"/><path d="M9 4c2 .5 4 .5 6 0"/><path d="M6 9c0 7 2 12 6 12s6-5 6-12a4 4 0 0 0-4-3c-1.5 1-2.5 1-4 0a4 4 0 0 0-4 3z"/><path d="M10 9c0 6 1 10 2 10s2-4 2-10"/></svg>',
      price: 1.5,
      toxicFor: [],
      category: 'terrestrial',
      description: 'Vegetal crujiente de cúpula hidropónica'
    },
    'aceitunas': {
      id: 'aceitunas',
      name: 'Aceitunas de Ganímedes',
      iconSvg: '<svg class="w-4 h-4 text-lime-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="10" cy="13" rx="6" ry="7"/><ellipse cx="10" cy="13" rx="2" ry="2.5"/><ellipse cx="17" cy="9" rx="4" ry="5"/><circle cx="17" cy="9" r="1.2"/></svg>',
      emoji: '<svg class="w-4 h-4 text-lime-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="10" cy="13" rx="6" ry="7"/><ellipse cx="10" cy="13" rx="2" ry="2.5"/><ellipse cx="17" cy="9" rx="4" ry="5"/><circle cx="17" cy="9" r="1.2"/></svg>',
      price: 1.5,
      toxicFor: [],
      category: 'terrestrial',
      description: 'Encurtidas en salmuera joviana'
    },
    'space-rock': {
      id: 'space-rock',
      name: 'Roca Espacial',
      iconSvg: '<svg class="w-4 h-4 text-slate-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 3 10 1 4 7-3 9-11 1-5-7 5-11z"/><path d="m7 3 3 7 8-6"/><path d="M10 10v11"/><path d="m10 10 8 4 3-3"/></svg>',
      emoji: '<svg class="w-4 h-4 text-slate-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 3 10 1 4 7-3 9-11 1-5-7 5-11z"/><path d="m7 3 3 7 8-6"/><path d="M10 10v11"/><path d="m10 10 8 4 3-3"/></svg>',
      price: 4.0,
      toxicFor: ['human'],
      category: 'cosmic',
      description: 'Mineral ionizado Zogton',
      dangerReport: 'Mineral ionizado denso con isótopos de silicato marciano. Incompatible con el sistema digestivo humano; produce cristalización celular e insuficiencia digestiva aguda inmediata.'
    },
    'methane-drink': {
      id: 'methane-drink',
      name: 'Bebida Metano',
      iconSvg: '<svg class="w-4 h-4 text-cyan-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 2v5.5L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 7.5V2"/><path d="M8.5 2h7"/><path d="M7 15c2-1 4-1 6 0s4 1 6 0"/><circle cx="12" cy="11" r="1"/></svg>',
      emoji: '<svg class="w-4 h-4 text-cyan-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 2v5.5L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 7.5V2"/><path d="M8.5 2h7"/><path d="M7 15c2-1 4-1 6 0s4 1 6 0"/><circle cx="12" cy="11" r="1"/></svg>',
      price: 3.5,
      toxicFor: ['human'],
      category: 'cosmic',
      description: 'Hidrocarburo criogénico',
      dangerReport: 'Compuesto criogénico con hidrocarburos puros saturados. Provoca congelamiento fulminante de órganos internos y asfixia celular inmediata en humanos.'
    },
    'solar-sauce': {
      id: 'solar-sauce',
      name: 'Salsa Solar',
      iconSvg: '<svg class="w-4 h-4 text-amber-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/><path d="m4.2 4.2 2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
      emoji: '<svg class="w-4 h-4 text-amber-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/><path d="m4.2 4.2 2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
      price: 2.0,
      toxicFor: [],
      category: 'cosmic',
      description: 'Fotones picantes concentrados'
    },
    'plasma-crystals': {
      id: 'plasma-crystals',
      name: 'Cristales de Plasma',
      iconSvg: '<svg class="w-4 h-4 text-fuchsia-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M2 9h20"/><path d="m10 3 2 6-2 12"/><path d="m14 3-2 6 2 12"/></svg>',
      emoji: '<svg class="w-4 h-4 text-fuchsia-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M2 9h20"/><path d="m10 3 2 6-2 12"/><path d="m14 3-2 6 2 12"/></svg>',
      price: 4.5,
      toxicFor: ['human'],
      category: 'cosmic',
      description: 'Bio-lumínico ionizante',
      dangerReport: 'Estructura ionizada de alta energía plasmática. Emite radiación electromagnética no tolerable por tejidos de base carbono; riesgo crítico de bio-ionización tisular.'
    }
  },

  /**
   * Comprueba si un ingrediente es compatible con la especie activa.
   * @param {'human'|'alien'} species
   * @param {string} ingredientId
   * @returns {{ allowed: boolean, reason: string|null, ingredient: Object|null }}
   */
  isCompatible(species, ingredientId) {
    const item = this.INGREDIENTS[ingredientId];
    if (!item) {
      return { allowed: true, reason: null, ingredient: null };
    }
    if (item.toxicFor.includes(species)) {
      return {
        allowed: false,
        reason: item.dangerReport || `Ingrediente incompatible con la especie ${species}.`,
        ingredient: item
      };
    }
    return {
      allowed: true,
      reason: null,
      ingredient: item
    };
  },

  /**
   * Filtra los ingredientes que resultan tóxicos para la especie.
   * @param {'human'|'alien'} species
   * @param {string[]} ingredientIds
   * @returns {string[]} IDs incompatibles
   */
  getIncompatibleList(species, ingredientIds) {
    if (!Array.isArray(ingredientIds)) return [];
    return ingredientIds.filter((id) => !this.isCompatible(species, id).allowed);
  }
};

// =============================================================================
// 1.8 PRICINGENGINE: CÁLCULO EN CRÉDITOS LUNARES Y DESCUENTO ALIEN (Tarea T4)
// =============================================================================

const PricingEngine = {
  SIZES: {
    personal: { name: 'Personal (20 cm)', price: 8.0 },
    medium: { name: 'Mediana (30 cm)', price: 12.0 },
    large: { name: 'Familiar (40 cm)', price: 16.0 },
    interstellar: { name: 'Interestelar (50 cm)', price: 22.0 }
  },

  CRUSTS: {
    thin: { name: 'Fina Lunar', price: 0.0 },
    volcanic: { name: 'Volcánica (Picante)', price: 0.0 },
    stardust: { name: 'Polvo Estelar (Bio-crujiente)', price: 0.0 }
  },

  POWERUPS: {
    regen1: { name: 'Regen Nivel 1 (+30%)', badge: '+30% en 15m', price: 3.0 },
    regen2: { name: 'Regen Nivel 2 (+50%)', badge: '+50% en 30m', price: 5.0 },
    regen3: { name: 'Regen Nivel 3 (+80%)', badge: '+80% en 45m', price: 8.0 }
  },

  /**
   * Calcula el desglose completo de costos de la orden actual.
   * @param {Object} state Estado del Store
   * @returns {Object} Desglose financiero en Créditos Lunares (LC)
   */
  calculate(state) {
    const sizeData = this.SIZES[state.size] || this.SIZES.medium;
    const basePrice = sizeData.price;
    const isAlien = state.species === 'alien';
    
    // Bonificación Alienígena: 50% de descuento sobre el precio base de la pizza
    const discount = isAlien ? basePrice * 0.5 : 0.0;
    const baseEffective = basePrice - discount;

    let ingredientsCost = 0.0;
    const ingredientsDetails = [];
    if (Array.isArray(state.ingredients)) {
      state.ingredients.forEach((ingId) => {
        const item = BioValidator.INGREDIENTS[ingId];
        if (item) {
          ingredientsCost += item.price;
          ingredientsDetails.push({
            id: item.id,
            name: item.name,
            iconSvg: item.iconSvg || '',
            emoji: item.emoji || '',
            price: item.price
          });
        }
      });
    }

    let powerupCost = 0.0;
    let powerupData = null;
    if (isAlien && state.powerup && this.POWERUPS[state.powerup]) {
      powerupData = this.POWERUPS[state.powerup];
      powerupCost = powerupData.price;
    }

    const total = baseEffective + ingredientsCost + powerupCost;

    return {
      size: sizeData,
      basePrice,
      isAlien,
      discount,
      baseEffective,
      ingredientsCost,
      ingredientsDetails,
      powerup: powerupData,
      powerupCost,
      total: Number(total.toFixed(2))
    };
  }
};

// =============================================================================
// 2. MOTOR DE ESTADO CENTRALIZADO Y REACTIVO (Store)
// =============================================================================

class Store {
  /**
   * @param {Object} initialOverrides
   */
  constructor(initialOverrides = {}) {
    this.DEFAULT_STATE = {
      species: 'human',        // 'human' | 'alien'
      size: 'medium',          // 'personal' | 'medium' | 'large' | 'interstellar'
      crust: 'thin',           // 'thin' | 'volcanic' | 'stardust'
      ingredients: [],         // Array de IDs de ingredientes (strings)
      powerup: null,           // null | 'regen1' | 'regen2' | 'regen3'
      customer: {
        pilotName: '',
        sector: '',
        coords: ''
      },
      paymentMethod: 'credits',
      theme: 'dark',           // 'dark' | 'light'
      status: 'configuring'    // 'idle' | 'configuring' | 'ordering' | 'completed'
    };

    this.state = {
      ...this.DEFAULT_STATE,
      customer: { ...this.DEFAULT_STATE.customer },
      ingredients: [...this.DEFAULT_STATE.ingredients],
      ...initialOverrides
    };

    /** @type {Set<Function>} */
    this.listeners = new Set();
  }

  /**
   * Retorna una instantánea inmutable del estado global actual.
   * @returns {Object}
   */
  getState() {
    return {
      ...this.state,
      customer: { ...this.state.customer },
      ingredients: [...this.state.ingredients]
    };
  }

  /**
   * Extrae los datos relevantes del pedido para persistencia en 'rocket_pizza_cart'.
   * @returns {Object}
   */
  getCartData() {
    return {
      species: this.state.species,
      size: this.state.size,
      crust: this.state.crust,
      ingredients: [...this.state.ingredients],
      powerup: this.state.powerup,
      customer: { ...this.state.customer },
      paymentMethod: this.state.paymentMethod
    };
  }

  /**
   * Suscribe un listener a cambios del estado.
   * @param {Function} listener Función que recibe (currentState, prevState)
   * @returns {Function} Función para cancelar la suscripción
   */
  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('[Store] El listener debe ser una función ejecutable.');
    }
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notifica a todos los suscriptores sobre mutaciones del estado.
   * @private
   * @param {Object} prevState
   */
  notify(prevState) {
    const currentState = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(currentState, prevState);
      } catch (error) {
        console.error('[Store] Error en ejecución de listener suscrito:', error);
      }
    });
  }

  /**
   * Actualiza el estado mediante mutación parcial controlada.
   * @param {Object} partialState
   * @param {boolean} [shouldPersist=true]
   */
  setState(partialState, shouldPersist = true) {
    if (!partialState || typeof partialState !== 'object') return;

    const prevState = this.getState();

    // Fusión inmutable con soporte para sub-objetos y arrays
    const nextState = {
      ...this.state,
      ...partialState
    };

    if (partialState.customer) {
      nextState.customer = {
        ...this.state.customer,
        ...partialState.customer
      };
    }

    if (partialState.ingredients) {
      nextState.ingredients = Array.isArray(partialState.ingredients)
        ? [...partialState.ingredients]
        : this.state.ingredients;
    }

    this.state = nextState;

    // Persistencia automática
    if (shouldPersist) {
      StorageManager.setCart(this.getCartData());
      if (partialState.theme) {
        StorageManager.setTheme(this.state.theme);
      }
    }

    this.notify(prevState);
  }

  /**
   * Establece la especie activa ('human' | 'alien').
   * @param {'human'|'alien'} species
   */
  setSpecies(species) {
    if (species !== 'human' && species !== 'alien') return;
    const updates = { species };

    // Si cambia a humano, los PowerUps biológicos se limpian
    if (species === 'human' && this.state.powerup !== null) {
      updates.powerup = null;
    }

    // Purga automática de ingredientes tóxicos para humanos si se conmuta a humano (REQ-UNW-01)
    if (species === 'human' && Array.isArray(this.state.ingredients)) {
      const sanitized = this.state.ingredients.filter((id) => {
        return typeof BioValidator !== 'undefined' ? BioValidator.isCompatible('human', id).allowed : true;
      });
      if (sanitized.length !== this.state.ingredients.length) {
        updates.ingredients = sanitized;
      }
    }

    this.setState(updates);
  }

  /**
   * Establece el tamaño de la pizza.
   * @param {'personal'|'medium'|'large'|'interstellar'} size
   */
  setSize(size) {
    const validSizes = ['personal', 'medium', 'large', 'interstellar'];
    if (!validSizes.includes(size)) return;
    this.setState({ size });
  }

  /**
   * Establece el tipo de masa.
   * @param {'thin'|'volcanic'|'stardust'} crust
   */
  setCrust(crust) {
    const validCrusts = ['thin', 'volcanic', 'stardust'];
    if (!validCrusts.includes(crust)) return;
    this.setState({ crust });
  }

  /**
   * Reemplaza el listado completo de ingredientes.
   * @param {string[]} ingredients
   */
  setIngredients(ingredients) {
    if (!Array.isArray(ingredients)) return;
    this.setState({ ingredients: [...ingredients] });
  }

  /**
   * Alterna la selección de un ingrediente (agrega si no está, remueve si está).
   * @param {string} ingredientId
   * @returns {boolean} true si fue añadido, false si fue removido
   */
  toggleIngredient(ingredientId) {
    if (typeof ingredientId !== 'string') return false;
    const exists = this.state.ingredients.includes(ingredientId);
    let updated;
    if (exists) {
      updated = this.state.ingredients.filter((id) => id !== ingredientId);
    } else {
      if (typeof BioValidator !== 'undefined') {
        const check = BioValidator.isCompatible(this.state.species, ingredientId);
        if (!check.allowed) return false;
      }
      updated = [...this.state.ingredients, ingredientId];
    }
    this.setState({ ingredients: updated });
    return !exists;
  }

  /**
   * Establece o limpia el PowerUp celular.
   * @param {'regen1'|'regen2'|'regen3'|null} powerup
   */
  setPowerUp(powerup) {
    const validPowerups = [null, 'regen1', 'regen2', 'regen3'];
    if (!validPowerups.includes(powerup)) return;
    this.setState({ powerup });
  }

  /**
   * Alias de setPowerUp para consistencia de nomenclatura.
   */
  setPowerup(powerup) {
    this.setPowerUp(powerup);
  }

  /**
   * Actualiza los datos del cliente/piloto lunar.
   * @param {Object} customerData
   */
  setCustomerData(customerData) {
    if (!customerData || typeof customerData !== 'object') return;
    this.setState({ customer: customerData });
  }

  /**
   * Establece el método de pago seleccionado.
   * @param {string} paymentMethod
   */
  setPaymentMethod(paymentMethod) {
    if (typeof paymentMethod !== 'string') return;
    this.setState({ paymentMethod });
  }

  /**
   * Establece el tema visual de la aplicación.
   * @param {'dark'|'light'} theme
   */
  setTheme(theme) {
    if (theme !== 'dark' && theme !== 'light') return;
    this.setState({ theme });
  }

  /**
   * Establece el estado del flujo de la orden.
   * @param {'idle'|'configuring'|'ordering'|'completed'} status
   */
  setStatus(status) {
    const validStatuses = ['idle', 'configuring', 'ordering', 'completed'];
    if (!validStatuses.includes(status)) return;
    this.setState({ status }, false);
  }

  /**
   * Restaura el carrito previamente persistido en localStorage de forma segura.
   * @param {Object} savedCart
   */
  restoreCart(savedCart) {
    if (!savedCart || typeof savedCart !== 'object') return;

    const validated = {};

    if (savedCart.species === 'human' || savedCart.species === 'alien') {
      validated.species = savedCart.species;
    }

    const validSizes = ['personal', 'medium', 'large', 'interstellar'];
    if (validSizes.includes(savedCart.size)) {
      validated.size = savedCart.size;
    }

    const validCrusts = ['thin', 'volcanic', 'stardust'];
    if (validCrusts.includes(savedCart.crust)) {
      validated.crust = savedCart.crust;
    }

    if (Array.isArray(savedCart.ingredients)) {
      validated.ingredients = savedCart.ingredients.filter((id) => typeof id === 'string');
    }

    const validPowerups = [null, 'regen1', 'regen2', 'regen3'];
    if (validPowerups.includes(savedCart.powerup)) {
      validated.powerup = savedCart.powerup;
    }

    if (savedCart.customer && typeof savedCart.customer === 'object') {
      validated.customer = {
        pilotName: typeof savedCart.customer.pilotName === 'string' ? savedCart.customer.pilotName : '',
        sector: typeof savedCart.customer.sector === 'string' ? savedCart.customer.sector : '',
        coords: typeof savedCart.customer.coords === 'string' ? savedCart.customer.coords : ''
      };
    }

    if (typeof savedCart.paymentMethod === 'string') {
      validated.paymentMethod = savedCart.paymentMethod;
    }

    this.setState(validated, false);
  }

  /**
   * Reinicia la configuración del pedido a sus valores iniciales, preservando el tema actual.
   */
  resetOrder() {
    const currentTheme = this.state.theme;
    this.state = {
      ...this.DEFAULT_STATE,
      theme: currentTheme,
      customer: { ...this.DEFAULT_STATE.customer },
      ingredients: [...this.DEFAULT_STATE.ingredients]
    };
    StorageManager.setCart(this.getCartData());
    this.notify(this.getState());
  }
}

// =============================================================================
// 3. SISTEMA DE TEMAS Y ACCESIBILIDAD VISUAL (ThemeManager)
// =============================================================================

const ThemeManager = {
  store: null,
  toggleButton: null,
  iconDark: null,
  iconLight: null,

  /**
   * Inicializa el sistema de temas conectándolo con el Store y el DOM.
   * @param {Store} store Instancia del Store global
   */
  init(store) {
    this.store = store;
    this.toggleButton = document.getElementById('theme-toggle');
    this.iconDark = document.getElementById('theme-icon-dark');
    this.iconLight = document.getElementById('theme-icon-light');

    // Determinar tema inicial: Almacenado > Preferencia de Sistema > Default ('dark')
    const initialTheme = this.resolveInitialTheme();
    this.applyTheme(initialTheme, false);

    // Conectar eventos del botón si existe en el DOM
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => {
        this.toggleTheme();
      });

      // Manejo estricto de teclado para la Prueba de la Mano Atada (Enter / Espacio)
      this.toggleButton.addEventListener('keydown', (event) => {
        if (event.key === ' ' || event.key === 'Spacebar') {
          event.preventDefault(); // Evitar scroll de la página al usar espacio
          this.toggleTheme();
        }
      });
    }

    // Escuchar cambios de preferencia del sistema operativo si el usuario no tiene preferencia forzada
    if (window.matchMedia) {
      try {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        mediaQuery.addEventListener('change', (e) => {
          // Solo alternar automáticamente si el usuario no guardó preferencia manual en localStorage
          if (!StorageManager.getTheme()) {
            const systemTheme = e.matches ? 'light' : 'dark';
            this.applyTheme(systemTheme, true);
          }
        });
      } catch (err) {
        console.warn('[ThemeManager] matchMedia listener no soportado:', err);
      }
    }
  },

  /**
   * Resuelve el tema que debe aplicarse al arrancar.
   * @returns {'dark'|'light'}
   */
  resolveInitialTheme() {
    const saved = StorageManager.getTheme();
    if (saved) return saved;

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return 'dark';
  },

  /**
   * Obtiene el tema activo actual.
   * @returns {'dark'|'light'}
   */
  getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  },

  /**
   * Alterna entre el tema Espacio Profundo (Dark) y Estación Espacial (Light).
   */
  toggleTheme() {
    const current = this.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next, true);
  },

  /**
   * Aplica el tema al elemento raíz <html>, actualiza iconos SVG y atributos WAI-ARIA.
   * @param {'dark'|'light'} theme
   * @param {boolean} [persist=true]
   */
  applyTheme(theme, persist = true) {
    const validTheme = theme === 'light' ? 'light' : 'dark';

    // 1. Alternar atributo data-theme en el documento raíz
    document.documentElement.setAttribute('data-theme', validTheme);

    // 2. Actualizar controles WAI-ARIA e iconos SVG en #theme-toggle
    if (this.toggleButton) {
      const isLight = validTheme === 'light';

      // aria-pressed indica si el modo alternativo (luz de estación) está presionado
      this.toggleButton.setAttribute('aria-pressed', isLight ? 'true' : 'false');

      const targetLabel = isLight
        ? 'Cambiar a tema Espacio Profundo (modo oscuro)'
        : 'Cambiar a tema Estación Espacial (modo claro)';

      this.toggleButton.setAttribute('aria-label', targetLabel);
      this.toggleButton.setAttribute('title', targetLabel);

      // Alternar visibilidad de iconos con clases block / hidden
      if (this.iconDark && this.iconLight) {
        if (isLight) {
          this.iconDark.classList.remove('block');
          this.iconDark.classList.add('hidden');
          this.iconLight.classList.remove('hidden');
          this.iconLight.classList.add('block');
        } else {
          this.iconLight.classList.remove('block');
          this.iconLight.classList.add('hidden');
          this.iconDark.classList.remove('hidden');
          this.iconDark.classList.add('block');
        }
      }
    }

    // 3. Sincronizar con el Store global
    if (this.store && this.store.state.theme !== validTheme) {
      this.store.setTheme(validTheme);
    }

    // 4. Persistir en localStorage
    if (persist) {
      StorageManager.setTheme(validTheme);
    }
  }
};

// =============================================================================
// 3.5 A11YMODALMANAGER: CONTROL ACCESIBLE WAI-ARIA CON FOCUS TRAP (Tarea T3)
// =============================================================================

const A11yModalManager = {
  lastFocusedElement: null,
  activeModalId: null,

  /**
   * Abre un modal accesible bajo WAI-ARIA Dialog.
   * Guarda lastFocusedElement y transfiere foco al control prioritario.
   * @param {string} modalId ID del elemento <dialog>
   * @param {HTMLElement} [triggerElement=null]
   */
  openModal(modalId, triggerElement = null) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    this.lastFocusedElement = triggerElement || document.activeElement;
    this.activeModalId = modalId;

    // Asignar aria-hidden al contenido exterior para lectores de pantalla
    const mainContent = document.getElementById('main-content');
    const header = document.querySelector('header[role="banner"]');
    const footer = document.querySelector('footer[role="contentinfo"]');
    if (mainContent) mainContent.setAttribute('aria-hidden', 'true');
    if (header) header.setAttribute('aria-hidden', 'true');
    if (footer) footer.setAttribute('aria-hidden', 'true');

    // Apertura nativa accesible o fallback
    if (typeof modal.showModal === 'function') {
      try {
        if (!modal.open) modal.showModal();
      } catch (err) {
        modal.setAttribute('open', '');
      }
    } else {
      modal.setAttribute('open', '');
    }

    // Focalizar el control prioritario (Botón primario de cierre o confirmación)
    const preferredFocus = modal.querySelector('#btn-close-bio-alert') ||
                           modal.querySelector('#btn-close-order-success') ||
                           modal.querySelector('.btn-primary') ||
                           this.getFocusableElements(modal)[0];

    requestAnimationFrame(() => {
      if (preferredFocus && typeof preferredFocus.focus === 'function') {
        preferredFocus.focus();
      }
    });
  },

  /**
   * Cierra el modal y restaura el foco al elemento disparador (CA-T3.3).
   * @param {string} [modalId=null]
   */
  closeModal(modalId = null) {
    const targetId = modalId || this.activeModalId;
    if (!targetId) return;

    const modal = document.getElementById(targetId);
    if (modal) {
      if (typeof modal.close === 'function' && modal.open) {
        try {
          modal.close();
        } catch (err) {
          modal.removeAttribute('open');
        }
      } else {
        modal.removeAttribute('open');
      }
    }

    // Restaurar aria-hidden exterior
    const mainContent = document.getElementById('main-content');
    const header = document.querySelector('header[role="banner"]');
    const footer = document.querySelector('footer[role="contentinfo"]');
    if (mainContent) mainContent.removeAttribute('aria-hidden');
    if (header) header.removeAttribute('aria-hidden');
    if (footer) footer.removeAttribute('aria-hidden');

    this.activeModalId = null;

    // RESTAURACIÓN PRECISA DE FOCO (CA-T3.3)
    const elementToFocus = this.lastFocusedElement;
    this.lastFocusedElement = null;

    if (elementToFocus && typeof elementToFocus.focus === 'function') {
      requestAnimationFrame(() => {
        try {
          elementToFocus.focus();
        } catch (err) {
          console.warn('[A11yModalManager] Error al restaurar foco:', err);
        }
      });
    }
  },

  /**
   * Recupera elementos enfocables dentro del modal.
   * @param {HTMLElement} container
   * @returns {HTMLElement[]}
   */
  getFocusableElements(container) {
    if (!container) return [];
    const selector = 'button:not([disabled]):not([aria-disabled="true"]), ' +
                     '[href]:not([tabindex="-1"]), ' +
                     'input:not([disabled]):not([type="hidden"]), ' +
                     'select:not([disabled]), ' +
                     'textarea:not([disabled]), ' +
                     '[tabindex]:not([tabindex="-1"]):not([disabled])';
    const elements = Array.from(container.querySelectorAll(selector));
    return elements.filter((el) => {
      return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
    });
  },

  /**
   * Trampa de Foco (Focus Trap) y captura de tecla Escape (CA-T3.2).
   * @param {KeyboardEvent} event
   */
  handleKeyDown(event) {
    if (!this.activeModalId) return;

    const modal = document.getElementById(this.activeModalId);
    if (!modal || (!modal.open && !modal.hasAttribute('open'))) return;

    // Tecla Escape: Cierre inmediato accesible
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      this.closeModal(this.activeModalId);
      return;
    }

    // Focus Trap con Tab / Shift+Tab
    if (event.key === 'Tab') {
      const focusables = this.getFocusableElements(modal);
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusables[0];
      const lastElement = focusables[focusables.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement || !modal.contains(document.activeElement)) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement || !modal.contains(document.activeElement)) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  },

  /**
   * Configura y abre el diálogo de advertencia toxicológica (#modal-bio-alert).
   * @param {string} ingredientId
   * @param {HTMLElement} triggerElement
   */
  openBioAlert(ingredientId, triggerElement = null) {
    const validation = BioValidator.isCompatible('human', ingredientId);
    const detailEl = document.getElementById('bio-alert-detail');
    const descEl = document.getElementById('bio-alert-desc');
    const titleEl = document.getElementById('bio-alert-title');

    const ingName = validation.ingredient ? validation.ingredient.name : ingredientId;

    if (titleEl) {
      titleEl.textContent = `¡ALERTA BIO-MÉDICA: ${ingName.toUpperCase()} RESTRINGIDO!`;
    }

    if (descEl) {
      descEl.innerHTML = `El protocolo de bioseguridad ha bloqueado la adición de <strong>${ingName}</strong>. Este compuesto contiene sustancias incompatibles con la fisiología activa de tu tripulante.`;
    }

    if (detailEl && validation.reason) {
      detailEl.textContent = validation.reason;
    }

    this.openModal('modal-bio-alert', triggerElement);
  },

  /**
   * Conecta escuchadores globales de modales.
   */
  init() {
    document.addEventListener('keydown', (event) => {
      this.handleKeyDown(event);
    });

    const modals = document.querySelectorAll('dialog.modal-dialog');
    modals.forEach((dialog) => {
      dialog.addEventListener('cancel', (e) => {
        e.preventDefault();
        this.closeModal(dialog.id);
      });

      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
          this.closeModal(dialog.id);
        }
      });
    });

    const btnCloseBioX = document.getElementById('btn-close-bio-alert-x');
    if (btnCloseBioX) {
      btnCloseBioX.addEventListener('click', () => this.closeModal('modal-bio-alert'));
    }

    const btnCloseBio = document.getElementById('btn-close-bio-alert');
    if (btnCloseBio) {
      btnCloseBio.addEventListener('click', () => this.closeModal('modal-bio-alert'));
    }

    const btnCloseSuccessX = document.getElementById('btn-close-order-success-x');
    if (btnCloseSuccessX) {
      btnCloseSuccessX.addEventListener('click', () => this.closeModal('modal-order-success'));
    }

    const btnCloseSuccess = document.getElementById('btn-close-order-success');
    if (btnCloseSuccess) {
      btnCloseSuccess.addEventListener('click', () => this.closeModal('modal-order-success'));
    }
  }
};

// =============================================================================
// 4. SINCRONIZADOR DE LA VISTA DOM CON EL ESTADO INICIAL / RESTAURADO
// =============================================================================

/**
 * Actualiza los elementos DOM existentes (selectores de radio de especie, tamaño y masa)
 * para garantizar que la vista refleje con precisión el estado restaurado (CA-T2.2).
 * @param {Object} state Estado actual del Store
 */
function syncDOMWithState(state) {
  const isHuman = state.species === 'human';

  // 1. Sincronizar selector de especie y banner hero
  const humanBtn = document.getElementById('species-human');
  const alienBtn = document.getElementById('species-alien');

  if (humanBtn && alienBtn) {
    humanBtn.setAttribute('aria-checked', isHuman ? 'true' : 'false');
    humanBtn.setAttribute('tabindex', isHuman ? '0' : '-1');
    humanBtn.classList.toggle('is-active', isHuman);

    alienBtn.setAttribute('aria-checked', !isHuman ? 'true' : 'false');
    alienBtn.setAttribute('tabindex', !isHuman ? '0' : '-1');
    alienBtn.classList.toggle('is-active', !isHuman);
  }

  // Banner dinámico de biocompatibilidad en el Hero
  const bioBanner = document.getElementById('hero-bio-banner');
  if (bioBanner) {
    const bannerSpeciesBadge = bioBanner.querySelector('.hero-species-badge');
    const bannerText = bioBanner.querySelector('.hero-bio-text');
    if (isHuman) {
      if (bannerSpeciesBadge) bannerSpeciesBadge.textContent = 'TRIPULACIÓN HUMANA (BIO-SEGURA)';
      if (bannerText) bannerText.textContent = 'Menú verificado 100% libre de compuestos de metano o radiación ionizante.';
    } else {
      if (bannerSpeciesBadge) bannerSpeciesBadge.textContent = 'ESPECIE ZOGTONIANA (SUBSIDIO 50%)';
      if (bannerText) bannerText.textContent = 'Protocolo celular activo: acceso exclusivo a PowerUps y compuestos cósmicos ionizados.';
    }
  }

  // Panel de PowerUps (Exclusivo Zogtoniano)
  const powerupPanel = document.getElementById('powerup-panel');
  if (powerupPanel) {
    if (isHuman) {
      powerupPanel.classList.add('opacity-40', 'pointer-events-none');
      powerupPanel.setAttribute('aria-hidden', 'true');
    } else {
      powerupPanel.classList.remove('opacity-40', 'pointer-events-none');
      powerupPanel.removeAttribute('aria-hidden');
    }
  }

  // 2. Sincronizar selector de tamaño
  const sizeCards = document.querySelectorAll('.size-card');
  sizeCards.forEach((card) => {
    const isSelected = card.dataset.size === state.size;
    card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    card.setAttribute('tabindex', isSelected ? '0' : '-1');
    card.classList.toggle('is-selected', isSelected);
  });

  // 3. Sincronizar selector de tipo de masa
  const crustCards = document.querySelectorAll('.crust-card');
  crustCards.forEach((card) => {
    const isSelected = card.dataset.crust === state.crust;
    card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    card.setAttribute('tabindex', isSelected ? '0' : '-1');
    card.classList.toggle('is-selected', isSelected);
  });

  // 4. Sincronizar catálogo de ingredientes
  const ingredientCards = document.querySelectorAll('.ingredient-card');
  ingredientCards.forEach((card) => {
    const id = card.dataset.ingredientId;
    const isSelected = Array.isArray(state.ingredients) && state.ingredients.includes(id);
    card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    card.classList.toggle('is-selected', isSelected);

    const checkIndicator = card.querySelector('.ingredient-check-text') || card.querySelector('.status-indicator');
    if (checkIndicator) {
      checkIndicator.textContent = isSelected ? 'Añadido' : 'Añadir';
    }
  });

  // 5. Sincronizar selección de PowerUps celulares (Exclusivo Zogtoniano)
  const powerupCards = document.querySelectorAll('.powerup-card');
  powerupCards.forEach((card) => {
    const isSelected = !isHuman && state.powerup === card.dataset.powerup;
    card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    card.classList.toggle('is-selected', isSelected);
    if (isHuman) {
      card.setAttribute('tabindex', '-1');
      card.disabled = true;
    } else {
      card.disabled = false;
      card.setAttribute('tabindex', isSelected || !state.powerup ? '0' : '-1');
    }
  });

  // 6. CÁLCULO FINANCIERO REACTIVO Y DESGLOSE EN VIVO (PricingEngine · Tarea T4)
  const pricing = PricingEngine.calculate(state);

  // Sincronizar tamaño y precio base
  const summarySize = document.getElementById('summary-size');
  if (summarySize) {
    summarySize.textContent = pricing.size.name;
  }

  const summaryBasePrice = document.getElementById('summary-base-price');
  if (summaryBasePrice) {
    summaryBasePrice.textContent = `${pricing.basePrice.toFixed(2)} LC`;
  }

  // Sincronizar tipo de masa
  const summaryCrust = document.getElementById('summary-crust');
  if (summaryCrust) {
    const crustNames = {
      thin: 'Fina Lunar',
      volcanic: 'Volcánica (Picante)',
      stardust: 'Polvo Estelar (Bio-crujiente)'
    };
    summaryCrust.textContent = crustNames[state.crust] || state.crust;
  }

  // Fila de Bonificación Alienígena (50% OFF base)
  const discountRow = document.getElementById('summary-discount-row');
  const discountAmount = document.getElementById('summary-discount-amount');
  if (discountRow) {
    if (pricing.isAlien) {
      discountRow.classList.remove('hidden');
      discountRow.classList.add('flex');
      if (discountAmount) {
        discountAmount.textContent = `-${pricing.discount.toFixed(2)} LC`;
      }
    } else {
      discountRow.classList.remove('flex');
      discountRow.classList.add('hidden');
    }
  }

  // Desglose de Toppings e Ingredientes
  const summaryIngCost = document.getElementById('summary-ingredients-cost');
  if (summaryIngCost) {
    summaryIngCost.textContent = `${pricing.ingredientsCost.toFixed(2)} LC`;
  }

  const summaryIngList = document.getElementById('summary-ingredients-list');
  if (summaryIngList) {
    if (pricing.ingredientsDetails.length === 0) {
      summaryIngList.innerHTML = '<li class="italic text-[var(--color-text-muted)]/70">Ningún ingrediente seleccionado</li>';
    } else {
      summaryIngList.innerHTML = pricing.ingredientsDetails.map((ing) => {
        return `
          <li class="flex items-center justify-between py-0.5">
            <span class="flex items-center gap-1.5">
              <span class="inline-flex items-center flex-shrink-0" aria-hidden="true">${ing.iconSvg || ing.emoji}</span>
              <span class="text-[var(--color-text)] font-medium">${ing.name}</span>
            </span>
            <div class="flex items-center gap-2">
              <span class="font-bold text-[var(--color-text)]">+${ing.price.toFixed(2)} LC</span>
              <button type="button" 
                      data-remove-ingredient="${ing.id}" 
                      aria-label="Quitar ${ing.name} de la orden"
                      class="text-xs text-red-400 hover:text-red-300 transition-colors p-0.5 flex items-center justify-center">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </li>
        `;
      }).join('');

      // Conectar botones individuales de remover ingrediente
      const removeButtons = summaryIngList.querySelectorAll('[data-remove-ingredient]');
      removeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const ingId = btn.dataset.removeIngredient;
          if (ingId) {
            window.RocketPizza.Store.toggleIngredient(ingId);
          }
        });
      });
    }
  }

  // Fila de PowerUp Celular
  const summaryPowerup = document.getElementById('summary-powerup');
  const summaryPowerupCost = document.getElementById('summary-powerup-cost');
  if (summaryPowerup) {
    summaryPowerup.textContent = pricing.powerup ? pricing.powerup.name : 'Ninguno';
  }
  if (summaryPowerupCost) {
    summaryPowerupCost.textContent = `${pricing.powerupCost.toFixed(2)} LC`;
  }

  // Fila Total Estimado en Créditos Lunares (LC)
  const summaryTotal = document.getElementById('summary-total');
  if (summaryTotal) {
    summaryTotal.textContent = pricing.total.toFixed(2);
  }

  // Actualizar badges rápidos del Header
  const cartBadgeCount = document.getElementById('cart-badge-count');
  if (cartBadgeCount) {
    const totalItems = state.ingredients.length + (state.powerup ? 1 : 0) + 1;
    cartBadgeCount.textContent = totalItems.toString();
  }

  const cartBadgeTotal = document.getElementById('cart-badge-total');
  if (cartBadgeTotal) {
    cartBadgeTotal.textContent = `${pricing.total.toFixed(2)} LC`;
  }
}

/**
 * Conecta los escuchadores básicos de los controles base presentes en el DOM.
 * @param {Store} store
 */
function bindBaseEventListeners(store) {
  // Selector de especie con navegación accesible por flechas WAI-ARIA
  const speciesRadios = Array.from(document.querySelectorAll('.species-option-btn'));
  speciesRadios.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const species = btn.dataset.species;
      if (species) store.setSpecies(species);
    });

    btn.addEventListener('keydown', (e) => {
      let targetIndex = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        targetIndex = (index + 1) % speciesRadios.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        targetIndex = (index - 1 + speciesRadios.length) % speciesRadios.length;
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const species = btn.dataset.species;
        if (species) store.setSpecies(species);
        return;
      }

      if (targetIndex !== null) {
        const targetBtn = speciesRadios[targetIndex];
        const species = targetBtn.dataset.species;
        if (species) {
          store.setSpecies(species);
          targetBtn.focus();
        }
      }
    });
  });

  // Selector de tamaño
  const sizeCards = document.querySelectorAll('.size-card');
  sizeCards.forEach((card) => {
    card.addEventListener('click', () => {
      const size = card.dataset.size;
      if (size) store.setSize(size);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const size = card.dataset.size;
        if (size) store.setSize(size);
      }
    });
  });

  // Selector de masa
  const crustCards = document.querySelectorAll('.crust-card');
  crustCards.forEach((card) => {
    card.addEventListener('click', () => {
      const crust = card.dataset.crust;
      if (crust) store.setCrust(crust);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const crust = card.dataset.crust;
        if (crust) store.setCrust(crust);
      }
    });
  });

  // Panel de PowerUps Celulares (CA-T4.2)
  const powerupCards = document.querySelectorAll('.powerup-card');
  powerupCards.forEach((card) => {
    const onActivate = (e) => {
      e.preventDefault();
      const currentState = store.getState();
      if (currentState.species !== 'alien') return; // Bloqueado para humanos

      const powerupId = card.dataset.powerup;
      if (!powerupId) return;

      // Si ya está seleccionado, lo deselecciona; si no, lo activa
      const nextPowerup = currentState.powerup === powerupId ? null : powerupId;
      store.setPowerUp(nextPowerup);
    };

    card.addEventListener('click', onActivate);
    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        onActivate(e);
      }
    });
  });

  // Catálogo de Ingredientes con Intercepción BioValidator y Accesibilidad (CA-T3.1)
  const ingredientCards = document.querySelectorAll('.ingredient-card');
  ingredientCards.forEach((card) => {
    const onActivate = (e) => {
      e.preventDefault();
      const ingredientId = card.dataset.ingredientId;
      if (!ingredientId) return;

      const currentState = store.getState();
      const isSelected = currentState.ingredients.includes(ingredientId);

      // Si no está seleccionado y se intenta agregar, validar biocompatibilidad
      if (!isSelected) {
        const check = BioValidator.isCompatible(currentState.species, ingredientId);
        if (!check.allowed) {
          // CA-T3.1: Detener adición, mantener checkbox desmarcado y abrir modal
          card.setAttribute('aria-checked', 'false');
          card.classList.remove('is-selected');
          A11yModalManager.openBioAlert(ingredientId, card);
          return;
        }
      }

      store.toggleIngredient(ingredientId);
    };

    card.addEventListener('click', onActivate);
    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        onActivate(e);
      }
    });
  });

  // Botón de reinicio de orden
  const btnReset = document.getElementById('btn-reset-order');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      store.resetOrder();
    });
  }
}

// =============================================================================
// 4.4 CUSTOMCOMBOBOXMANAGER: SELECTORES DESPLEGABLES WAI-ARIA ACCESIBLES (Tarea T2)
// =============================================================================

const CustomComboboxManager = {
  instances: [],

  init() {
    this.instances = [];
    const containers = document.querySelectorAll('.custom-combobox');
    containers.forEach((container) => {
      const instance = this.setupCombobox(container);
      if (instance) {
        this.instances.push(instance);
      }
    });

    // Cierre al hacer click fuera de cualquier combobox (click-outside)
    document.addEventListener('click', (e) => {
      this.instances.forEach((inst) => {
        if (!inst.container.contains(e.target) && inst.isOpen()) {
          inst.close(false);
        }
      });
    });
  },

  setupCombobox(container) {
    const hiddenInput = container.querySelector('input[type="hidden"]');
    const trigger = container.querySelector('.combobox-trigger');
    const triggerText = container.querySelector('.combobox-trigger-text');
    const menu = container.querySelector('.combobox-menu');
    const options = Array.from(container.querySelectorAll('.combobox-option'));

    if (!hiddenInput || !trigger || !menu || options.length === 0) return null;

    // Guardar valores y estados iniciales por defecto para resetAll
    const defaultVal = hiddenInput.value;
    const defaultText = triggerText ? triggerText.textContent : '';
    const isDefaultMuted = triggerText ? triggerText.classList.contains('text-[var(--color-text-muted)]') : false;

    let focusedIndex = -1;

    // Configurar tabindex="-1" en las opciones para permitir foco programático accesible
    options.forEach((opt) => {
      opt.setAttribute('tabindex', '-1');
    });

    const isOpen = () => trigger.getAttribute('aria-expanded') === 'true';

    const setFocusIndex = (newIndex) => {
      options.forEach((opt, idx) => {
        if (idx === newIndex) {
          opt.classList.add('is-focused');
          opt.focus();
          opt.scrollIntoView({ block: 'nearest' });
        } else {
          opt.classList.remove('is-focused');
        }
      });
      focusedIndex = newIndex;
    };

    const open = () => {
      // Cerrar cualquier otro combobox abierto
      CustomComboboxManager.instances.forEach((other) => {
        if (other.container !== container && other.isOpen()) {
          other.close(false);
        }
      });

      trigger.setAttribute('aria-expanded', 'true');
      menu.classList.remove('hidden');

      // Si hay una opción previamente seleccionada, mover el foco a ella; si no, a la primera
      const selectedIndex = options.findIndex((opt) => opt.getAttribute('aria-selected') === 'true');
      if (selectedIndex !== -1) {
        setFocusIndex(selectedIndex);
      } else if (options.length > 0) {
        setFocusIndex(0);
      }
    };

    const close = (returnFocus = true) => {
      trigger.setAttribute('aria-expanded', 'false');
      menu.classList.add('hidden');
      options.forEach((opt) => opt.classList.remove('is-focused'));
      focusedIndex = -1;
      if (returnFocus) {
        trigger.focus();
      }
    };

    const selectOption = (optionEl) => {
      const val = optionEl.dataset.value || '';
      const textSpan = optionEl.querySelector('span');
      const text = textSpan ? textSpan.textContent.trim() : optionEl.textContent.trim();

      // 1. Actualizar el valor del input hidden asociado
      hiddenInput.value = val;

      // 2. Actualizar el texto visible del disparador
      if (triggerText) {
        triggerText.textContent = text;
        if (val) {
          triggerText.classList.remove('text-[var(--color-text-muted)]');
          triggerText.classList.add('text-[var(--color-text)]');
        } else {
          triggerText.classList.remove('text-[var(--color-text)]');
          triggerText.classList.add('text-[var(--color-text-muted)]');
        }
      }

      // 3. Actualizar aria-selected y visibilidad de checkmark
      options.forEach((opt) => {
        const isMatch = (opt === optionEl);
        opt.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        const checkmark = opt.querySelector('.checkmark-icon');
        if (checkmark) {
          if (isMatch) {
            checkmark.classList.remove('hidden');
          } else {
            checkmark.classList.add('hidden');
          }
        }
      });

      // 4. Limpiar estado de error si lo tenía
      trigger.classList.remove('is-invalid');
      trigger.removeAttribute('aria-invalid');

      // 5. Despachar eventos input y change en el input hidden
      hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
      hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));

      // 6. Cerrar menú y devolver el foco al disparador
      close(true);
    };

    // Escuchadores de eventos para el botón disparador (Trigger)
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (isOpen()) {
        close(true);
      } else {
        open();
      }
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!isOpen()) {
          open();
          if (e.key === 'ArrowUp') {
            const selectedIdx = options.findIndex((opt) => opt.getAttribute('aria-selected') === 'true');
            if (selectedIdx === -1) {
              setFocusIndex(options.length - 1);
            }
          }
        } else {
          if ((e.key === 'Enter' || e.key === ' ') && focusedIndex >= 0 && focusedIndex < options.length) {
            selectOption(options[focusedIndex]);
          }
        }
      } else if (e.key === 'Escape') {
        if (isOpen()) {
          e.preventDefault();
          close(true);
        }
      }
    });

    // Escuchadores de eventos para cada opción del menú
    options.forEach((opt, index) => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectOption(opt);
      });

      opt.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (index + 1) % options.length;
          setFocusIndex(nextIndex);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (index - 1 + options.length) % options.length;
          setFocusIndex(prevIndex);
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectOption(opt);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          close(true);
        } else if (e.key === 'Tab') {
          close(false);
        } else if (e.key === 'Home') {
          e.preventDefault();
          setFocusIndex(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          setFocusIndex(options.length - 1);
        }
      });

      opt.addEventListener('mouseenter', () => {
        options.forEach((o) => o.classList.remove('is-focused'));
        opt.classList.add('is-focused');
        focusedIndex = index;
      });
    });

    const reset = () => {
      hiddenInput.value = defaultVal;
      if (triggerText) {
        triggerText.textContent = defaultText;
        if (isDefaultMuted) {
          triggerText.classList.remove('text-[var(--color-text)]');
          triggerText.classList.add('text-[var(--color-text-muted)]');
        } else {
          triggerText.classList.remove('text-[var(--color-text-muted)]');
          triggerText.classList.add('text-[var(--color-text)]');
        }
      }

      options.forEach((opt) => {
        const val = opt.dataset.value || '';
        const isSelected = (defaultVal !== '' && val === defaultVal);
        opt.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        const checkmark = opt.querySelector('.checkmark-icon');
        if (checkmark) {
          if (isSelected) {
            checkmark.classList.remove('hidden');
          } else {
            checkmark.classList.add('hidden');
          }
        }
      });

      trigger.classList.remove('is-invalid');
      trigger.removeAttribute('aria-invalid');
      close(false);
    };

    return {
      container,
      trigger,
      menu,
      hiddenInput,
      isOpen,
      open,
      close,
      selectOption,
      reset
    };
  },

  resetAll() {
    this.instances.forEach((inst) => inst.reset());
  }
};

// =============================================================================
// 4.5 ORDERFORMMANAGER: VALIDACIÓN ACCESIBLE Y LANZAMIENTO ESPACIAL (Tarea T5)
// =============================================================================

const OrderFormManager = {
  form: null,
  store: null,
  errorContainer: null,

  init(store) {
    this.store = store;
    this.form = document.getElementById('order-form');
    this.errorContainer = document.getElementById('form-errors');
    if (!this.form) return;

    this.bindEvents();
  },

  bindEvents() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Limpiar errores en tiempo real al escribir/cambiar valor
    const fields = ['pilot-name', 'lunar-sector', 'orbital-coords'];
    fields.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.clearFieldError(id));
        el.addEventListener('change', () => this.clearFieldError(id));
      }
    });

    // Botones del Modal de Confirmación
    const btnNewOrder = document.getElementById('btn-new-order');
    if (btnNewOrder) {
      btnNewOrder.addEventListener('click', () => {
        A11yModalManager.closeModal('modal-order-success');
        this.resetEverything();
      });
    }

    const btnCloseSuccess = document.getElementById('btn-close-order-success');
    if (btnCloseSuccess) {
      btnCloseSuccess.addEventListener('click', () => {
        A11yModalManager.closeModal('modal-order-success');
      });
    }
  },

  clearFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    const errorMsg = document.getElementById(`${fieldId}-error`);
    if (input) {
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
    }
    if (fieldId === 'lunar-sector') {
      const trigger = document.getElementById('lunar-sector-trigger');
      if (trigger) {
        trigger.classList.remove('is-invalid');
        trigger.removeAttribute('aria-invalid');
      }
    }
    if (errorMsg) {
      errorMsg.textContent = '';
      errorMsg.classList.add('hidden');
    }
    // Si no quedan errores individuales, ocultar contenedor general
    const remainingInvalid = this.form.querySelectorAll('.is-invalid');
    if (remainingInvalid.length === 0 && this.errorContainer) {
      this.errorContainer.classList.add('hidden');
      this.errorContainer.innerHTML = '';
    }
  },

  setFieldError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorMsg = document.getElementById(`${fieldId}-error`);
    if (input) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
    }
    if (fieldId === 'lunar-sector') {
      const trigger = document.getElementById('lunar-sector-trigger');
      if (trigger) {
        trigger.classList.add('is-invalid');
        trigger.setAttribute('aria-invalid', 'true');
      }
    }
    if (errorMsg) {
      errorMsg.textContent = message;
      errorMsg.classList.remove('hidden');
    }
  },

  validate() {
    const errors = [];
    const pilotInput = document.getElementById('pilot-name');
    const sectorInput = document.getElementById('lunar-sector');
    const coordsInput = document.getElementById('orbital-coords');

    const pilotVal = pilotInput ? pilotInput.value.trim() : '';
    const sectorVal = sectorInput ? sectorInput.value.trim() : '';
    const coordsVal = coordsInput ? coordsInput.value.trim().toUpperCase() : '';

    // 1. Validar Nombre de Piloto (mínimo 2 caracteres)
    if (!pilotVal || pilotVal.length < 2) {
      errors.push({
        id: 'pilot-name',
        element: pilotInput,
        message: 'Por favor, ingresa el nombre o rango del comandante (mínimo 2 caracteres).'
      });
    }

    // 2. Validar Sector Lunar
    if (!sectorVal) {
      errors.push({
        id: 'lunar-sector',
        element: document.getElementById('lunar-sector-trigger') || sectorInput,
        message: 'Selecciona un sector espacial de entrega para trazar la trayectoria.'
      });
    }

    // 3. Validar Coordenadas Espaciales (formato SEC-XX-YYY)
    const coordsPattern = /^[A-Z]{3}-\d{2}-[A-Z0-9]+$/;
    if (!coordsVal) {
      errors.push({
        id: 'orbital-coords',
        element: coordsInput,
        message: 'Las coordenadas espaciales son obligatorias para el lanzamiento.'
      });
    } else if (!coordsPattern.test(coordsVal)) {
      errors.push({
        id: 'orbital-coords',
        element: coordsInput,
        message: 'Formato inválido. Debe cumplir el patrón SEC-XX-YYY (ej: SEC-04-ALPHA).'
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      values: {
        pilotName: pilotVal,
        lunarSector: sectorVal,
        orbitalCoords: coordsVal,
        paymentMethod: document.getElementById('payment-method')?.value || 'credits'
      }
    };
  },

  handleSubmit() {
    const result = this.validate();

    if (!result.isValid) {
      // CA-T5.1: Mostrar resumen de errores en contenedor con role="alert" y aria-live="polite"
      if (this.errorContainer) {
        this.errorContainer.innerHTML = `
          <strong class="flex items-center gap-1.5 font-bold mb-1">
            <svg class="w-4 h-4 text-red-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>Error en los parámetros de telemetría:</span>
          </strong>
          <ul class="list-disc list-inside space-y-0.5">
            ${result.errors.map(err => `<li>${err.message}</li>`).join('')}
          </ul>
        `;
        this.errorContainer.classList.remove('hidden');
      }

      // Aplicar errores individuales
      result.errors.forEach(err => {
        this.setFieldError(err.id, err.message);
      });

      // Mover foco accesible al primer campo inválido
      if (result.errors[0]?.element) {
        result.errors[0].element.focus();
      }
      return;
    }

    // Si es válido, ocultar contenedor de errores
    if (this.errorContainer) {
      this.errorContainer.classList.add('hidden');
      this.errorContainer.innerHTML = '';
    }

    // CA-T5.2: Generar voucher espacial, calcular y desplegar Modal de Confirmación
    this.processSuccessfulOrder(result.values);
  },

  processSuccessfulOrder(customerData) {
    // 1. Guardar datos en Store
    this.store.setCustomerData({
      pilotName: customerData.pilotName,
      sector: customerData.lunarSector,
      coords: customerData.orbitalCoords
    });
    this.store.setPaymentMethod(customerData.paymentMethod);

    // 2. Generar Voucher Espacial único
    const voucherNum = Math.floor(1000 + Math.random() * 9000);
    const voucherCode = `#LUNAR-${voucherNum}`;

    // 3. Obtener cálculo financiero actual
    const pricing = PricingEngine.calculate(this.store.getState());

    // 4. Mapear nombres de sector
    const sectorNames = {
      'domo-alfa': 'Domo Alfa (Base Minera)',
      'crater-tycho': 'Cráter Tycho (Complejo Científico)',
      'mar-tranquilidad': 'Mar de la Tranquilidad (Muelle Comercial)',
      'estacion-mir3': 'Estación Orbital Mir-3 (Órbita Baja)',
      'colonia-zogton': 'Colonia Zogtoniana Subterránea (Nivel Bio-4)'
    };
    const sectorLabel = sectorNames[customerData.lunarSector] || customerData.lunarSector;

    // 5. Poblar datos en el Modal de Confirmación (#modal-order-success)
    const voucherEl = document.getElementById('success-voucher-code');
    const pilotEl = document.getElementById('success-pilot-name');
    const destEl = document.getElementById('success-destination');
    const totalEl = document.getElementById('success-total');
    const etaEl = document.getElementById('success-eta');

    if (voucherEl) voucherEl.textContent = voucherCode;
    if (pilotEl) pilotEl.textContent = customerData.pilotName;
    if (destEl) destEl.textContent = `${sectorLabel} · [${customerData.orbitalCoords}]`;
    if (totalEl) totalEl.textContent = `${pricing.total.toFixed(2)} LC`;
    if (etaEl) {
      etaEl.textContent = this.store.state.species === 'alien' ? '8-12 minutos luz (Propulsión Warp)' : '15-20 minutos luz (Lanzamiento Orbital)';
    }

    // 6. Abrir modal accesible transfiriendo el foco al control primario y guardando el botón de envío como trigger
    const submitBtn = document.getElementById('btn-submit-order');
    A11yModalManager.openModal('modal-order-success', submitBtn);
  },

  resetEverything() {
    if (this.form) this.form.reset();
    if (this.errorContainer) {
      this.errorContainer.classList.add('hidden');
      this.errorContainer.innerHTML = '';
    }
    const invalidInputs = this.form ? this.form.querySelectorAll('.is-invalid') : [];
    invalidInputs.forEach(el => {
      el.classList.remove('is-invalid');
      el.removeAttribute('aria-invalid');
    });
    if (typeof CustomComboboxManager !== 'undefined' && CustomComboboxManager.resetAll) {
      CustomComboboxManager.resetAll();
    }
    this.store.resetOrder();

    // Scroll suave y foco inicial
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const heroBtn = document.getElementById('species-human') || document.querySelector('.species-option-btn');
    if (heroBtn) {
      requestAnimationFrame(() => heroBtn.focus());
    }
  }
};

// =============================================================================
// 5. INICIALIZACIÓN EN DOMContentLoaded
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Instanciar Store global
  const appStore = new Store();

  // 2. Recuperar y restaurar tema guardado
  const savedTheme = StorageManager.getTheme();
  if (savedTheme) {
    appStore.state.theme = savedTheme;
  }

  // 3. Recuperar y restaurar estado previo del carrito / configuración
  const savedCart = StorageManager.getCart();
  if (savedCart) {
    appStore.restoreCart(savedCart);
    console.log('[Rocket Pizza Lunar] Estado del carrito restaurado exitosamente desde localStorage.');
  }

  // 4. Inicializar ThemeManager, A11yModalManager, CustomComboboxManager y OrderFormManager
  ThemeManager.init(appStore);
  A11yModalManager.init();
  CustomComboboxManager.init();
  OrderFormManager.init(appStore);

  // 5. Conectar sincronizador reactivo entre el Store y el DOM
  appStore.subscribe((currentState) => {
    syncDOMWithState(currentState);
  });

  // 6. Conectar escuchadores de eventos base para interacción y teclado
  bindBaseEventListeners(appStore);

  // 7. Sincronización inicial del DOM con el estado restaurado
  syncDOMWithState(appStore.getState());

  // 8. Exponer en el objeto global window para interoperabilidad y pruebas
  window.RocketPizza = {
    Store: appStore,
    StorageManager,
    ThemeManager,
    BioValidator,
    A11yModalManager,
    PricingEngine,
    CustomComboboxManager,
    OrderFormManager
  };

  console.log('[Rocket Pizza Lunar] Módulos inicializados: Store, StorageManager, ThemeManager, BioValidator, A11yModalManager, PricingEngine, CustomComboboxManager, OrderFormManager.');
});
