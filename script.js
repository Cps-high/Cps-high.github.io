// script.js

document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentsDisplay = document.getElementById('comments-display');
    const deleteNameInput = document.createElement('input'); // New input for deletion name
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
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                // Add a data attribute to store the index for deletion
                commentElement.setAttribute('data-index', index);
                
                let commentHtml = `<p><strong>${comment.name}:</strong> ${comment.text}</p>`;

                // Only add delete button if the entered name matches the comment's name
                // if (currentDeleteName && comment.name.toLowerCase() === currentDeleteName.toLowerCase()) {
                //       commentHtml += '<button class="delete-btn">Delete</button>';
                //  }

                commentElement.innerHTML = commentHtml;
                commentsDisplay.appendChild(commentElement);
            });
        }
    }

    // Save comment to local storage
    function saveComment(name, text) {
        const comments = JSON.parse(localStorage.getItem('summaries_comments')) || [];
        comments.push({ name, text });
        localStorage.setItem('summaries_comments', JSON.stringify(comments));
        loadComments(); // Reload comments after saving
    }

    // Handle form submission
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const commentInput = document.getElementById('comment');

            const name = nameInput.value.trim();
            const comment = commentInput.value.trim();

            if (name && comment) {
                saveComment(name, comment);
                nameInput.value = ''; // Clear form
                commentInput.value = '';
                 // Reload comments to potentially show delete buttons for the newly added comment
                loadComments();
            } else {
                alert('Please enter both your name and a comment.');
            }
        });
    }

    // Reload comments when the delete name input changes
    //  deleteNameInput.addEventListener('input', loadComments);

    // // Handle comment deletion using event delegation
    //  if (commentsDisplay) {
    //      commentsDisplay.addEventListener('click', (e) => {
    //          if (e.target.classList.contains('delete-btn')) {
    //              const commentElement = e.target.closest('.comment');
    //              if (commentElement) {
    //                  const index = parseInt(commentElement.getAttribute('data-index'));
    //                  let comments = JSON.parse(localStorage.getItem('summaries_comments')) || [];
                    
    //                  // Remove the comment at the specified index
    //                  // Add a check to ensure the name still matches before deleting
    //                  const currentDeleteName = deleteNameInput.value.trim();
    //                  if (comments[index] && comments[index].name.toLowerCase() === currentDeleteName.toLowerCase()) {
    //                       comments.splice(index, 1);

    //                      // Update local storage and reload comments
    //                      localStorage.setItem('summaries_comments', JSON.stringify(comments));
    //                      loadComments();
    //                  } else {
    //                      alert('You can only delete your own comments.');
    //                  }
    //              }
    //          }
    //      });
    //  }

    // Initial load of comments
    loadComments();
}); 