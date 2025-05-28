// script.js

document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentsDisplay = document.getElementById('comments-display');
    const nameInput = document.getElementById('name'); // Get the name input field
    // const deleteNameInput = document.createElement('input'); // New input for deletion name
    // deleteNameInput.setAttribute('type', 'text');
    // deleteNameInput.setAttribute('id', 'delete-name');
    // deleteNameInput.setAttribute('placeholder', 'Enter your name to delete comments');
    // commentsDisplay.before(deleteNameInput); // Add the input before the comments display

    // Load comments from local storage
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('summaries_comments')) || [];
        commentsDisplay.innerHTML = ''; // Clear current comments
        // const currentDeleteName = deleteNameInput.value.trim(); // Get the current name for deletion

        if (comments.length === 0) {
            commentsDisplay.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
        } else {
            comments.forEach((comment, index) => {
                // Create a wrapper div for the comment box
                const commentBoxElement = document.createElement('div');
                commentBoxElement.classList.add('comment-box'); // Add class for styling and animation

                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                // Add a data attribute to store the index for deletion
                commentElement.setAttribute('data-index', index);
                
                // Add a delete button next to each comment with the hidden class initially
                let commentHtml = `<p><strong>${comment.name}:</strong> ${comment.text} <button class="delete-btn hidden-delete-btn">Delete</button></p>`;

                // Only add delete button if the entered name matches the comment's name
                // if (currentDeleteName && comment.name.toLowerCase() === currentDeleteName.toLowerCase()) {
                //       commentHtml += '<button class="delete-btn">Delete</button>';
                //  }

                commentElement.innerHTML = commentHtml;
                commentBoxElement.appendChild(commentElement); // Append the comment inside the box
                commentsDisplay.appendChild(commentBoxElement); // Append the box to the display area
            });
        }
    }

    // Save comment to local storage
    function saveComment(name, text) {
        const comments = JSON.parse(localStorage.getItem('summaries_comments')) || [];
        comments.push({ name, text });
        localStorage.setItem('summaries_comments', JSON.stringify(comments));
        // The input clearing and display update are handled in the form submission listener
    }

    // Handle form submission
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('name'); // Re-get nameInput within scope
            const commentInput = document.getElementById('comment'); // Re-get commentInput within scope

            const name = nameInput.value.trim();
            const comment = commentInput.value.trim();

            if (name && comment) {
                saveComment(name, comment);
                commentInput.value = ''; // Clear only the comment input
                 // Reload comments to potentially show delete buttons for the newly added comment
                loadComments();
                 // Check delete button visibility after adding a new comment
                checkDeleteButtonVisibility();
            } else {
                alert('Please enter both your name and a comment.');
            }
        });
    }

    // Reload comments when the delete name input changes
    //  deleteNameInput.addEventListener('input', loadComments);

    // Function to check and toggle delete button visibility
    function checkDeleteButtonVisibility() {
        const currentName = nameInput.value.trim();
        const deleteButtons = commentsDisplay.querySelectorAll('.delete-btn');
        
        if (currentName.endsWith(':sayless')) {
            deleteButtons.forEach(button => {
                button.classList.remove('hidden-delete-btn');
            });
        } else {
            deleteButtons.forEach(button => {
                button.classList.add('hidden-delete-btn');
            });
        }
    }

    // Add event listener to the name input to check visibility on input
    if (nameInput) {
        nameInput.addEventListener('input', checkDeleteButtonVisibility);
    }

    // Handle comment deletion using event delegation
     if (commentsDisplay) {
         commentsDisplay.addEventListener('click', (e) => {
             if (e.target.classList.contains('delete-btn')) {
                 const commentElement = e.target.closest('.comment');
                 if (commentElement) {
                     const index = parseInt(commentElement.getAttribute('data-index'));
                     let comments = JSON.parse(localStorage.getItem('summaries_comments')) || [];
                    
                     // Get the current value of the name input field
                     const nameInput = document.getElementById('name');
                     const currentName = nameInput.value.trim();

                     // Check if the current name ends with ':sayless'
                     if (currentName.endsWith(':sayless')) {
                          // Remove the comment at the specified index
                         if (comments[index]) {
                              comments.splice(index, 1);

                             // Update local storage and reload comments
                             localStorage.setItem('summaries_comments', JSON.stringify(comments));
                             loadComments();
                             // Check delete button visibility after deleting a comment
                             checkDeleteButtonVisibility();
                         }
                     } else {
                         alert('You need to enter your name ending with ":sayless" to delete comments.');
                     }
                 }
             }
         });
     }

    // Initial load of comments and set initial delete button visibility
    loadComments();
    checkDeleteButtonVisibility();
}); 