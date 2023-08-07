Vue.createApp({
  data() {
    return {
      goals: [],
      riderName: '',
      courier: '',
      enteredName: '',
      enteredUnitNum: '',
      enteredDescItem: '',
      enteredContactNum: ''
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.enteredName + ' ' + this.enteredContactNum);
      this.enteredName = '';
      this.enteredUnitNum = '';
      this.enteredDescItem = '';
      this.enteredContactNum = '';
    },
    clearFields() {
      this.riderName = '';
      this.courier = '';
      this.enteredName = '';
      this.enteredUnitNum = '';
      this.enteredDescItem = '';
      this.enteredContactNum = '';
    },
    submit() {
      
    }
  }
}).mount('#app');

// const buttonEl = document.querySelector('button');
// const inputEl = document.querySelector('input');
// const listEl = document.querySelector('ul');

// function addGoal() {
//   const enteredValue = inputEl.value;
//   const listItemEl = document.createElement('li');
//   listItemEl.textContent = enteredValue;
//   listEl.appendChild(listItemEl);
//   inputEl.value = '';
// }

// buttonEl.addEventListener('click', addGoal);