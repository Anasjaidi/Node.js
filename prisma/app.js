const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();


const addNewUser = async (newUser = {"email": "anas.jaidi@icloud.com"}) => {
  const user = await prisma.user.create({data: newUser})

  return user
}
const addNewPost = async (newPost = {
			content: "post1",
			author_uid: "65f21dc2-c61b-4f62-b782-fad2d0fca937",
		}) => {
  const user = await prisma.post.create({
		data: newPost
	});

  return user
}

const findAllUsers = async () => {
  return await prisma.user.findMany();
}


const main = async () => {
  // return await findAllUsers()
  const newUser = await addNewUser({"email": "ajaidi020@gmail.com"})

  const newPost = await addNewPost({"content": "new post", "author_uid": newUser.uid})
  return {newPost, newUser}
}

main().then(res => console.log(res)).catch(err => console.error(err)).finally(() => {
  prisma.$disconnect()
})