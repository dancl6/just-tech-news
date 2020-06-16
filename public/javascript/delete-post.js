async function deleteFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    console.log("data for window:");
    console.log(window.location.toString());
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    // if (comment_text) {
        await fetch(`/api/posts/${id}`, {
            method: 'DELETE'
          });
    
    //   if (response.ok) {
    //     document.location.replace('/dashboard/')
    //   } else {
    //     alert(response.statusText);
    //   }
    // }

  }
  
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);