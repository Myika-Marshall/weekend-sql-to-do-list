$(document).ready(onReady);

function onReady() {
    renderTasks();
    $('#addButton').on('click', addTask);
    $('#tasksTableBody').on('click', '.update-btn', upvoteTask);
    $('#tasksTableBody').on('click', '.delete-btn', deleteSong);
    $('#update-button').on('click', updateTask);
}

function renderTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then ((response) => {
        $('#tasksTableBody').empty();
        console.log(' in GET /tasks response', response);
        for (let task of response) {
            $('tasksTableBody').append(`
            <tr>
            <td>${task.taskName}</td>
            <td>${task.Status}</td>
            <td><button class="update-btn" data-id="${song.id}" data-rank="${song.rank}">^^</button></td>
            <td><button class="delete-btn" data-id="${song.id}">X</button></td>
            </tr>
            `);
        }
    });
}

function addTask() {
    const newTask = {
        taskName: $('#Task').val(),
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask
    }).then((response) => {
        console.log ('in POST /tasks succeeded')
        $('#Task').val(''),
        renderTasks();
    });
}

function deleteSong() {
    const taskIdToDelete = $(this).data('id');
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskIdToDelete}`
    }).then((response)=> {
        console.log('delete response', response);
        renderTasks();
    })
};

function upVoteTask() {
    const taskIdToUpvote = $(this).data('id');
    const currentTask = $(this).data('task');

    console.log('taskIdToUpvote', taskIdToUpvote);
    console.log('currentTask', currentTask);
    $.ajax({
        type: 'PUT',
        url: `/tasks/upvotes/${taskIdToUpvote}`,
        data: {currentTask: currentTask }
    }).then((res) => {
        renderTasks();
    }).catch((err)=>{
        console.error(err);
    })
}

function updateSong() {
    console.log('updateTaskClicked!')
    const updateTask = {
}
$.ajax({
    method: 'PUT',
    url: `/tasks/${updatedTask.id}`,
    data: updatedTask
}).then((res)=> {
    console.log('PUT in Update Song')
    renderTasks();
}).catch((err)=>{
    console.error(err)
});
}