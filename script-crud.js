const taskListContainer = document.querySelector('app_section-task-list')

let tarefas = [
    {
        descricao: 'Tarefa concluída',
        concluida: true
    },
    {
        descricao: 'Tarefa pendente',
        concluida: false
    }
]

const taskIconSvg = `
<svg width="18" height="14" viewBox="0 0 18 14" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
        d="M6 11.1719L16.5938 0.578125L18 1.98438L6 13.9844L0.421875 8.40625L1.82812 7L6 11.1719Z"
        fill="white" />
</svg>
`

function createTask(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app')
}