

const PostForm = () => {
  return (
    <form action="http://localhost:8000/user/post" encType="multipart/form-data" method="POST">
      <input type="file" name="thumbnailImage" />
      <input type="file" name="postImages" multiple />
      <button type="submit">Upload</button>
    </form>
  )
}

export default PostForm