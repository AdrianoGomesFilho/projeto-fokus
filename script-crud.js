const taskListContainer = document.querySelector('.app__section-task-list')
const formTask = document.querySelector('.app__form-add-task')
const cancelFormTaskBtn = document.querySelector('.app__form-footer__button--cancel')
const taskActiveDescription = document.querySelector('.app__section-active-task-description')
const toggleFormTaskBtn = document.querySelector('.app__button--add-task')
const formLabel = document.querySelector('.app__form-label')
const textarea = document.querySelector('.app__form-textarea')

const localStorageTarefas = localStorage.getItem('tarefas')

let tarefas = localStorageTarefas ? JSON.parse(localStorageTarefas) : []

const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`

const limparForm = () => {
    textarea.value = ''
    formTask.classList.toggle('hidden')
}

const selecionaTarefa = (tarefa) => {
        taskActiveDescription.textContent = tarefa.descricao
    
}


const selecionaTarefaParaEditar = (tarefa, elemento) => {
    limparForm()

    formLabel.textContent='Editando tarefa'
    paragraphEmEdicao=elemento
    textarea.value = tarefa.descricao
    formTask.classList.remove('hidden')
}


function createTask(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svgIcon = document.createElement('svg')
    svgIcon.innerHTML = taskIconSvg

    const paragraph = document.createElement('p')
    paragraph.classList.add('app__section-task-list-item-description')

    paragraph.textContent = tarefa.descricao

    const button = document.createElement('button')
    button.classList.add('app_button-edit')
    const editIcon = document.createElement('img')
    editIcon.setAttribute('src', '/imagens/edit.png')

    button.appendChild(editIcon)

    button.addEventListener('click', (event) =>{
        event.stopPropagation()
        selecionaTarefaParaEditar(tarefa, paragraph)
    })

    li.onclick = () => {
        selecionaTarefa(tarefa, li)
    }
   
    svgIcon.addEventListener('click', (event) => {
        event.stopPropagation()
        li.classList.toggle('app__section-task-list-item-complete')
    })


    li.appendChild(svgIcon)
    li.appendChild(paragraph)
    li.appendChild(button)

    return li
}


tarefas.forEach(task =>
    {
        const taskItem = createTask(task)
        taskListContainer.appendChild(taskItem)
    })

cancelFormTaskBtn.addEventListener('click', () =>{
    limparForm();
}
)

toggleFormTaskBtn.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando tarefa'
    formTask.classList.toggle('hidden')
})

const updateLocalStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}


//entender esse trecho
formTask.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const task = {
        descricao: textarea.value,
        concluida: false
    }

    if (paragraphEmEdicao != null) {
        // EDITAR
        paragraphEmEdicao.textContent = task.descricao;
        paragraphEmEdicao = null;
    } else {
        // ADICIONAR
        tarefas.push(task);
        const taskItem = createTask(task);
        taskListContainer.appendChild(taskItem);
    }

    updateLocalStorage();
    limparForm();
});