const API_BASE = "https://growafter-server.onrender.com/api";

var app = new Vue({
  el: "#app",
  data: {
    page: "homePage",
    sortCriteria: "name",
    sortOrder: "ascending",
    searchQuery: "",
    showCheckOut: true,
    showModal: false,
    submitted: false,

    lessons: [],
    filteredLessons: [],

    order: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
      deliveryMethod: ""
    },

    states: {
      AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
      FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky",
      LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
      MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico",
      NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
      RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
      VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming"
    },

    cart: [],
    message: "Vue is working!"
  },

  methods: {
    async fetchLessons() {
      try {
        const response = await fetch(`${API_BASE}/lessons`);
        if (!response.ok) throw new Error("Failed to fetch lessons");
        const data = await response.json();
        this.lessons = data;
        this.filteredLessons = [...data];
      } catch (err) {
        console.error("❌ Failed to fetch lessons:", err.message);
      }
    },

    sortLessons() {
      const modifier = this.sortOrder === "ascending" ? 1 : -1;
      this.filteredLessons.sort((a, b) => {
        if (this.sortCriteria === "name") return modifier * a.subject.localeCompare(b.subject);
        if (this.sortCriteria === "location") return modifier * a.location.localeCompare(b.location);
        if (this.sortCriteria === "space") return modifier * (a.spaces - b.spaces);
        if (this.sortCriteria === "price") return modifier * (a.price - b.price);
        if (this.sortCriteria === "rating") return modifier * (a.ratings - b.ratings);
        return 0;
      });
    },

    navigatePages(page) {
      this.page = page;
    },

    addToCart(lessonId) {
      const lesson = this.lessons.find(l => l._id === lessonId);
      if (lesson && lesson.spaces > 0) {
        const cartItem = { ...lesson };
        cartItem.spaces--;
        this.cart.push(cartItem);
        lesson.spaces--;
      }
    },

    removeItem(index) {
      const removed = this.cart[index];
      const original = this.lessons.find(l => l._id === removed._id);
      if (original) {
        original.spaces++;
      }
      this.cart.splice(index, 1);
    },

    async handleSubmit() {
      try {
        const response = await fetch(`${API_BASE}/lessons/order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...this.order,
            cart: this.cart.map(item => ({
              id: item._id,
              subject: item.subject,
              price: item.price,
              location: item.location
            }))
          })
        });

        if (!response.ok) throw new Error("Order submission failed");

        // Update lesson spaces
        await Promise.all(
          this.cart.map(lesson =>
            fetch(`${API_BASE}/lessons/${lesson._id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ spaces: lesson.spaces })
            })
          )
        );

        this.submitted = true;
        this.fetchLessons();

        setTimeout(() => {
          this.order = {
            firstName: "", lastName: "", email: "", city: "", state: "", zipCode: "", phoneNumber: "", deliveryMethod: ""
          };
          this.cart = [];
        }, 10000);

        this.showModal = true;
      } catch (err) {
        console.error("❌ Failed to submit order:", err.message);
      }
    },

    doneWithOrder() {
      this.page = "homePage";
      this.showModal = false;
      this.submitted = false;
    },

    async searchLessons() {
      const query = this.searchQuery.trim();
      if (!query) {
        this.filteredLessons = [...this.lessons];
        return;
      }
      try {
        const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        this.filteredLessons = data;
      } catch (err) {
        console.error("❌ Failed to search lessons:", err.message);
      }
    }
  },

  computed: {
    countCartItems() {
      return this.cart.length || "";
    },
    isCartEmpty() {
      return this.cart.length === 0;
    },
    totalAvailableSpaces() {
      return this.lessons.reduce((sum, lesson) => sum + lesson.spaces, 0);
    }
  },

  mounted() {
    this.fetchLessons();
  }
});
