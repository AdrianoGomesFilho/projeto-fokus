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
<svg width="18" height="14" viewBox="0 0 18 14" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
        d="M6 11.1719L16.5938 0.578125L18 1.98438L6 13.9844L0.421875 8.40625L1.82812 7L6 11.1719Z"
        fill="white" />
</svg>
`

let tarefaSelecionada = null
let itemTarefaSelecionada = null

const selecionaTarefa = (tarefa) => {
        taskActiveDescription.textContent = tarefa.descricao
    
}

function createTask(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svgIcon = document.createElement('svg')
    svgIcon.innerHTML = taskIconSvg

    const paragraph = document.createElement('p')
    paragraph.classList.add('app__section-task-list-item-description')

    paragraph.textContent = tarefa.descricao

    li.onclick = () => {
        selecionaTarefa(tarefa, li)
    }

    li.appendChild(svgIcon)
    li.appendChild(paragraph)

    return li
}

// svgIcon.addEventListener('click', () => {
//     li.classList.add('concluido')
// })

tarefas.forEach(task =>
    {
        const taskItem = createTask(task)
        taskListContainer.appendChild(taskItem)
    })

cancelFormTaskBtn.addEventListener('click', () =>{
    formTask.classList.toggle('hidden')
    textarea.value = ''
}
)

toggleFormTaskBtn.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando tarefa'
    formTask.classList.toggle('hidden')
})

const updateLocalStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

formTask.addEventListener('submit', (evento) => {
    evento.preventDefault() //evita a página atualizar automaticamente após submite
    const task = {
        descricao: textarea.value,
        concluida: false
    }
    tarefas.push(task)
    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
    updateLocalStorage ()
    textarea.value = ''
})