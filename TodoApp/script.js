const todoList = document.getElementById('list');
const createBtn = document.getElementById('create-btn');
const todoInput = document.getElementById('todoInput');

let todos = [];

const createNewTodo = () => {
    //새로운 아이템 객체 생성
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false
    }
    //배열 처음에 새로운 아이템을 추가
    todos.unshift(item);

    //요소 생성하기
    const {itemEl, inputEl, editBtnEl, removeBtnEl} = createTodoElement(item);

    //리스트 요소 안에 방금 생성한 아이템 요소 추가
    todoList.prepend(itemEl);

    inputEl.removeAttribute('disabled');
    inputEl.focus();
    saveToLocalStorage();
}

const createTodoElement = (item) => {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');
    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if(item.complete){
        itemEl.classList.add('complete');
    };

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionEl = document.createElement('div');
    actionEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'remove_circles';

    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;
        if(item.complete){
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete')
        }
        saveToLocalStorage();
    })

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
        saveToLocalStorage();
    })

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== item.id);
        itemEl.remove();
        saveToLocalStorage();
    })

    actionEl.append(editBtnEl);
    actionEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionEl);

    return {itemEl, inputEl, editBtnEl, removeBtnEl}
}
const saveToLocalStorage = () => {
    const data = JSON.stringify(todos);

    localStorage.setItem('my_todos', data)
}

const loadFromLocalStorage = () => {
    const data = localStorage.getItem('my_todos');
    if(data){
        todos = JSON.parse(data);
    }
}

const displayTodos = () => {
    loadFromLocalStorage();
    for(let i = 0; i < todos.length; i++){
        const item = todos[i];
        const {itemEl} = createTodoElement(item);
        todoList.append(itemEl);
    }
}
displayTodos();

createBtn.addEventListener('click', createNewTodo);